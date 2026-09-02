import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { groq, buildGroqPrompt } from "@/lib/groq";
import { runStructuralPreFilter } from "@/lib/groq/prefilter";
import { getProblemBySlug } from "@/lib/problems-data";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = "anonymous",
      challengeSlug = "typography-font-showcase",
      problemTitle,
      specMarkdown,
      code,
      userCode,
      modelSolution,
      attemptType = "run",
    } = body;

    const submittedCode = userCode || (typeof code === "object" ? code : { html: "", css: "", js: code || "" });

    if (!submittedCode || !attemptType) {
      return NextResponse.json(
        { error: "Missing code payload or attempt type" },
        { status: 400 }
      );
    }

    // Payload size safety check (< 1MB)
    const totalPayloadBytes =
      (submittedCode.html || "").length +
      (submittedCode.css || "").length +
      (submittedCode.js || "").length;

    if (totalPayloadBytes > 1000000) {
      return NextResponse.json(
        { error: "Payload exceeds 1MB limit" },
        { status: 413 }
      );
    }

    const supabase = await createClient();

    // 1. Fetch challenge/problem spec & reference model
    let challengeData: any = getProblemBySlug(challengeSlug);
    let title = problemTitle || challengeData?.title || challengeSlug;
    let description = specMarkdown || challengeData?.description || "";
    let referenceModel = modelSolution || challengeData?.model_solution;

    if (!challengeData) {
      try {
        const { data: dbProb } = await supabase
          .from("problems")
          .select("*")
          .eq("slug", challengeSlug)
          .single();

        if (dbProb) {
          title = dbProb.title;
          description = dbProb.description;
          referenceModel = referenceModel || dbProb.model_solution;
        }
      } catch {
        // use fallback data
      }
    }

    // 2. Run Structural Pre-Filter Gate (Checks empty code, starter boilerplate, JS syntax errors)
    const preFilterResult = runStructuralPreFilter(submittedCode, {
      title,
      track: challengeData?.category || "HTML & CSS",
      spec_markdown: description,
      starter_code: challengeData?.starter_code,
    });

    if (!preFilterResult.passed) {
      const failScore = preFilterResult.score ?? 0;
      return NextResponse.json({
        evaluation: {
          score: failScore,
          passed: false,
          breakdown: preFilterResult.breakdown || [],
          overall_feedback:
            preFilterResult.overall_feedback ||
            preFilterResult.reason ||
            "Your code did not pass the structural pre-filter checks.",
        },
        passed: false,
        score: failScore,
        breakdown: preFilterResult.breakdown || [],
        overall_feedback:
          preFilterResult.overall_feedback ||
          preFilterResult.reason ||
          "Your code did not pass the structural pre-filter checks.",
        challengeSlug,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Define Rubric
    const defaultRubric = [
      {
        id: "R1",
        name: "Visual Layout & Markup Fidelity",
        weight: 35,
        criteria: "Accurate HTML semantic container structure, CSS Flexbox/Grid alignment, typography specifications, colors, and responsive card styling.",
      },
      {
        id: "R2",
        name: "DOM Interaction & State Logic",
        weight: 40,
        criteria: "Functional JavaScript event listeners, dynamic DOM updates, real-time value changes, input binding, and responsive controls.",
      },
      {
        id: "R3",
        name: "Code Cleanliness & Specification Conformance",
        weight: 25,
        criteria: "Clean modular code, proper naming, no broken syntax or runtime exceptions, and adherence to requirements.",
      },
    ];

    // 4. Groq AI Evaluation with Model Solution Benchmark
    let parsedResult: any;
    try {
      const { systemPrompt, userPrompt } = buildGroqPrompt({
        challengeTitle: title,
        specMarkdown: description,
        rubric: defaultRubric,
        userCode: submittedCode,
        modelSolution: referenceModel,
        attemptType,
      });

      const candidateModels = [
        "openai/gpt-oss-120b",
        "qwen/qwen3.8-27b",
        "openai/gpt-oss-20b",
        "groq/compound",
      ];

      let response: any = null;
      let lastErr: any = null;

      for (const modelName of candidateModels) {
        try {
          response = await groq.chat.completions.create({
            model: modelName,
            temperature: 0.1,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
          });
          if (response?.choices?.[0]?.message?.content) {
            break;
          }
        } catch (e: any) {
          lastErr = e;
          continue;
        }
      }

      if (!response?.choices?.[0]?.message?.content) {
        throw lastErr || new Error("Failed to get evaluation response from AI models");
      }

      const content = response.choices[0]?.message?.content || "{}";
      const rawParsed = JSON.parse(content);

      // Server-Side Score & Pass Verification
      let validatedScore = typeof rawParsed.score === "number" ? Math.round(rawParsed.score) : 0;
      validatedScore = Math.max(0, Math.min(100, validatedScore));

      // Strictly enforce passed criteria: score >= 80 ONLY
      const validatedPassed = Boolean(validatedScore >= 80);

      // Validate Breakdown
      const validatedBreakdown = Array.isArray(rawParsed.breakdown)
        ? rawParsed.breakdown.map((item: any) => ({
            rubric_id: String(item.rubric_id || "R1"),
            name: String(item.name || "Rubric Criterion"),
            score: typeof item.score === "number" ? Math.max(0, Math.min(100, Math.round(item.score))) : 0,
            feedback: String(item.feedback || ""),
          }))
        : [];

      parsedResult = {
        score: validatedScore,
        passed: validatedPassed,
        breakdown: validatedBreakdown,
        overall_feedback:
          String(rawParsed.overall_feedback || "").trim() ||
          (validatedPassed
            ? "Great job! Your implementation satisfies the challenge requirements."
            : "Review the feedback and refine your markup, styles, or event listeners."),
      };
    } catch (groqErr: any) {
      // Fail safely if AI service is unavailable - NEVER award pass on failure
      console.error("[Groq Evaluation Error]:", groqErr?.message || groqErr);
      return NextResponse.json(
        {
          error: "Evaluation service encountered an issue. Please try again.",
          evaluation: {
            score: 0,
            passed: false,
            breakdown: [],
            overall_feedback: "AI Evaluation service is temporarily unavailable. Your submission was not marked as passed. Please retry in a few moments.",
          },
          passed: false,
          score: 0,
          breakdown: [],
          overall_feedback: "AI Evaluation service is temporarily unavailable. Your submission was not marked as passed. Please retry in a few moments.",
          challengeSlug,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    // 5. Persist Submission in Supabase if authenticated
    try {
      if (userId && userId !== "anonymous") {
        await supabase.from("submissions").insert({
          user_id: userId,
          problem_id: challengeData?.id || challengeSlug,
          code_submitted: JSON.stringify(submittedCode),
          attempt_type: attemptType,
          score: parsedResult.score,
          passed: parsedResult.passed,
          groq_response: parsedResult,
          is_public: parsedResult.passed && attemptType === "submit",
        });
      }
    } catch {
      // Non-blocking write
    }

    return NextResponse.json({
      evaluation: parsedResult,
      passed: parsedResult.passed,
      score: parsedResult.score,
      breakdown: parsedResult.breakdown,
      overall_feedback: parsedResult.overall_feedback,
      challengeSlug,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Internal evaluation server error",
        passed: false,
        score: 0,
      },
      { status: 500 }
    );
  }
}
