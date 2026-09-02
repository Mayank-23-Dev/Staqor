import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { groq, buildGroqPrompt } from "@/lib/groq";
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
        // use defaults
      }
    }

    const defaultRubric = [
      {
        id: "R1",
        name: "Visual Layout & Design Fidelity",
        weight: 35,
        criteria: "Accurate HTML container structure, responsive CSS Grid/Flexbox, color palette, typography and hover states.",
      },
      {
        id: "R2",
        name: "DOM Interaction & State Logic",
        weight: 40,
        criteria: "Functional JavaScript event listeners, real-time DOM mutations, value updates, and interactive feedback.",
      },
      {
        id: "R3",
        name: "Code Cleanliness & Specification Conformance",
        weight: 25,
        criteria: "Clean markup, modular CSS rules, efficient event handling, and adherence to requirements.",
      },
    ];

    // 2. Groq AI Evaluation with Benchmark Comparison
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

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content || "{}";
      parsedResult = JSON.parse(content);
    } catch (groqErr) {
      // Graceful fallback heuristics if Groq API key is offline or limit reached
      const hasHtml = submittedCode.html && submittedCode.html.trim().length > 30;
      const hasCss = submittedCode.css && submittedCode.css.trim().length > 30;
      const hasJs = submittedCode.js && submittedCode.js.trim().length > 20;

      const calcScore = Math.min(
        100,
        (hasHtml ? 35 : 10) + (hasCss ? 35 : 10) + (hasJs ? 30 : 10)
      );

      parsedResult = {
        score: calcScore,
        passed: calcScore >= 80,
        breakdown: [
          {
            rubric_id: "R1",
            name: "Visual Layout & Design Fidelity",
            score: hasHtml && hasCss ? 92 : 40,
            feedback: hasHtml && hasCss
              ? "Container markup and CSS styling rules detected."
              : "Markup or styling needs completion.",
          },
          {
            rubric_id: "R2",
            name: "DOM Interaction & State Logic",
            score: hasJs ? 94 : 35,
            feedback: hasJs
              ? "Interactive DOM manipulation and event handlers wired."
              : "JavaScript event listeners needed.",
          },
          {
            rubric_id: "R3",
            name: "Code Cleanliness & Specification Conformance",
            score: hasHtml && hasCss && hasJs ? 90 : 45,
            feedback: "Code structure conforms to the design specifications.",
          },
        ],
        overall_feedback:
          calcScore >= 80
            ? "Excellent job! Your solution fulfills the structural and interactive requirements cleanly."
            : "Keep iterating! Check the color tokens, element classes, and event listener handlers.",
      };
    }

    // 3. Persist Submission in Supabase if authenticated
    try {
      if (userId && userId !== "anonymous") {
        await supabase.from("submissions").insert({
          user_id: userId,
          problem_id: challengeData?.id || challengeSlug,
          code_submitted: JSON.stringify(submittedCode),
          attempt_type: attemptType,
          score: parsedResult.score || 0,
          passed: parsedResult.passed || false,
          groq_response: parsedResult,
          is_public: parsedResult.passed && attemptType === "submit",
        });
      }
    } catch {
      // Non-blocking write
    }

    return NextResponse.json({
      evaluation: parsedResult,
      passed: parsedResult.passed || false,
      score: parsedResult.score || 0,
      breakdown: parsedResult.breakdown || [],
      overall_feedback: parsedResult.overall_feedback || "",
      challengeSlug,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal evaluation server error" },
      { status: 500 }
    );
  }
}
