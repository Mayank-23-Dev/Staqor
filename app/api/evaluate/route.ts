import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { groq, buildGroqPrompt } from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, challengeSlug, code, attemptType } = body;

    if (!userId || !challengeSlug || !code || !attemptType) {
      return NextResponse.json(
        { error: "Missing required evaluation fields" },
        { status: 400 }
      );
    }

    // Initialize Supabase Admin client to fetch problem
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Should use service role in real app
    );

    // Fetch challenge spec
    const { data: challenge, error } = await supabase
      .from("problems")
      .select("*")
      .eq("slug", challengeSlug)
      .single();

    if (error || !challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    // Dummy rubric for now, since it's not in the problems table schema
    const dummyRubric = [
      { id: "R1", name: "Functionality", weight: 50, criteria: "Code fulfills the core requirements." },
      { id: "R2", name: "UI/UX", weight: 30, criteria: "Looks somewhat like the description." },
      { id: "R3", name: "Code Quality", weight: 20, criteria: "Clean and readable code." }
    ];

    // Assemble Groq Prompt
    const { systemPrompt, userPrompt } = buildGroqPrompt({
      challengeTitle: challenge.title,
      specMarkdown: challenge.description,
      rubric: dummyRubric,
      userCode: code,
      attemptType,
    });

    // Groq Evaluation
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
      console.error(groqErr);
      return NextResponse.json(
        { error: "AI Evaluation service is temporarily unavailable." },
        { status: 503 }
      );
    }

    return NextResponse.json({
      evaluation: parsedResult,
      passed: parsedResult.passed || false,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal evaluation server error" },
      { status: 500 }
    );
  }
}
