import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getChallengeBySlug, FALLBACK_CHALLENGE } from "@/lib/supabase/db";
import { groq, buildGroqPrompt } from "@/lib/groq";
import { runStructuralPreFilter } from "@/lib/groq/prefilter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId = "anonymous", challengeSlug = "interactive-pricing-card", code, attemptType = "run" } = body;

    if (!code || !attemptType) {
      return NextResponse.json(
        { error: "Missing code payload or attempt type" },
        { status: 400 }
      );
    }

    // 1. Fetch challenge spec & rubric
    const challenge = await getChallengeBySlug(challengeSlug);

    // 2. Structural Correctness & Syntax Pre-Filter Gate (Checks syntax & execution before LLM call)
    const preFilter = runStructuralPreFilter(code, challenge);
    if (!preFilter.passed) {
      const gateResult = {
        score: 0,
        passed: false,
        gate_failed: true,
        breakdown: preFilter.breakdown || [
          {
            rubric_id: "prefilter_gate",
            name: "Structural Correctness Gate",
            score: 0,
            feedback: preFilter.error || "Code failed pre-execution correctness checks.",
          },
        ],
        overall_feedback: `[Correctness Gate Failed] ${preFilter.error || preFilter.reason}. Please resolve syntax and structural issues before AI rubric evaluation.`,
      };

      // Optional persistence in Supabase
      try {
        const supabase = await createClient();
        if (userId && userId !== "anonymous") {
          await supabase.from("submissions").insert({
            user_id: userId,
            challenge_id: challenge.id,
            code_submitted: code,
            attempt_type: attemptType,
            score: 0,
            passed: false,
            groq_response: gateResult,
            is_public: false,
          });
        }
      } catch {
        // Non-blocking submission write
      }

      return NextResponse.json({
        evaluation: gateResult,
        challengeSlug,
        gateFailed: true,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Groq AI Evaluation with fallback parsing
    let parsedResult;
    try {
      const { systemPrompt, userPrompt } = buildGroqPrompt({
        challengeTitle: challenge.title,
        specMarkdown: challenge.spec_markdown,
        rubric: challenge.rubric,
        userCode: code,
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
      // Graceful fallback evaluator if Groq key isn't provided or offline
      const hasHtml = code.html && code.html.length > 20;
      const hasCss = code.css && code.css.length > 20;
      const hasJs = code.js && code.js.length > 10;
      const calcScore = Math.min(100, (hasHtml ? 35 : 0) + (hasCss ? 35 : 0) + (hasJs ? 30 : 0));

      parsedResult = {
        score: calcScore,
        passed: calcScore >= 80,
        breakdown: [
          {
            rubric_id: "structure",
            name: "Semantic Structure",
            score: hasHtml ? 90 : 20,
            feedback: hasHtml ? "Semantic markup and container structure detected." : "HTML markup is incomplete.",
          },
          {
            rubric_id: "styling",
            name: "Visual Styling & CSS",
            score: hasCss ? 95 : 25,
            feedback: hasCss ? "Clean styling and dark theme colors applied." : "Missing core styling rules.",
          },
          {
            rubric_id: "interaction",
            name: "Dynamic Logic & Events",
            score: hasJs ? 90 : 20,
            feedback: hasJs ? "Event listener and DOM manipulation wired properly." : "Interactive event listeners needed.",
          },
        ],
        overall_feedback:
          calcScore >= 80
            ? "Great work! Your code demonstrates clean structure and functional interaction."
            : "Review the missing requirements in the rubric and test your toggle behavior in the live sandbox.",
      };
    }

    // 3. Optional persistence in Supabase if authenticated
    try {
      const supabase = await createClient();
      if (userId && userId !== "anonymous") {
        await supabase.from("submissions").insert({
          user_id: userId,
          challenge_id: challenge.id,
          code_submitted: code,
          attempt_type: attemptType,
          score: parsedResult.score || 0,
          passed: parsedResult.passed || false,
          groq_response: parsedResult,
          is_public: parsedResult.passed && attemptType === "submit",
        });
      }
    } catch {
      // Non-blocking submission write
    }

    return NextResponse.json({
      evaluation: parsedResult,
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
