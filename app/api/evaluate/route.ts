import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Challenge } from "@/models/Challenge";
import { AttemptCount } from "@/models/AttemptCount";
import { Submission } from "@/models/Submission";
import { groq, buildGroqPrompt } from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, challengeId, code, attemptType } = body;

    if (!userId || !challengeId || !code || !attemptType) {
      return NextResponse.json(
        { error: "Missing required evaluation fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 1. Server-side quota check
    let attemptRecord = await AttemptCount.findOne({
      user_id: userId,
      challenge_id: challengeId,
    });

    if (!attemptRecord) {
      attemptRecord = new AttemptCount({
        user_id: userId,
        challenge_id: challengeId,
        run_count: 0,
        submit_count: 0,
      });
    }

    if (attemptType === "run" && attemptRecord.run_count >= 5) {
      return NextResponse.json(
        {
          error: "Lifetime Run limit reached for this challenge",
          isCapped: true,
          notifier: {
            title: "Run Limit Reached",
            message: "You have reached your 5 diagnostic runs. Upgrade to Pro for unlimited AI evaluations.",
          },
        },
        { status: 429 }
      );
    }

    if (attemptType === "submit" && attemptRecord.submit_count >= 3) {
      return NextResponse.json(
        {
          error: "Lifetime Submit limit reached for this challenge",
          isCapped: true,
          notifier: {
            title: "Submit Limit Reached",
            message: "You have reached your 3 formal submits. Upgrade to Pro for unlimited submissions.",
          },
        },
        { status: 429 }
      );
    }

    // 2. Fetch challenge spec & rubric
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    // 3. Assemble Groq Prompt
    const { systemPrompt, userPrompt } = buildGroqPrompt({
      challengeTitle: challenge.title,
      specMarkdown: challenge.spec_markdown,
      rubric: challenge.rubric,
      userCode: code,
      attemptType,
    });

    // 4. Groq Evaluation (Tier 1 + Tier 2 retry)
    let parsedResult;
    try {
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
      // Outage or parse fallback: do NOT deduct quota
      return NextResponse.json(
        {
          error: "AI Evaluation service is temporarily unavailable. No attempts were deducted.",
          serviceUnavailable: true,
        },
        { status: 503 }
      );
    }

    // 5. Successful evaluation -> increment attempt count & write submission
    if (attemptType === "run") {
      attemptRecord.run_count += 1;
    } else {
      attemptRecord.submit_count += 1;
    }
    await attemptRecord.save();

    const submission = await Submission.create({
      user_id: userId,
      challenge_id: challengeId,
      code_submitted: code,
      attempt_type: attemptType,
      score: parsedResult.score || 0,
      passed: parsedResult.passed || false,
      groq_response: parsedResult,
      is_public: parsedResult.passed && attemptType === "submit",
    });

    return NextResponse.json({
      evaluation: parsedResult,
      submissionId: submission._id,
      attempts: {
        run_count: attemptRecord.run_count,
        submit_count: attemptRecord.submit_count,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal evaluation server error" },
      { status: 500 }
    );
  }
}
