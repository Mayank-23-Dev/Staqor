import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROBLEMS_DATA } from "@/lib/problems-data";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const formattedProblems = PROBLEMS_DATA.map((p) => ({
    id: p.id,
    title: `${p.number}. ${p.title}`,
    slug: p.slug,
    difficulty: p.difficulty,
    topic: p.tags[0] || "HTML & CSS",
    category: p.category,
    acceptance_rate: parseFloat(p.acceptance),
    description: p.description,
    starter_code: p.starter_code,
    model_solution: p.model_solution,
  }));

  try {
    for (const prob of formattedProblems) {
      await supabase.from("problems").upsert(prob, { onConflict: "slug" });
    }
    return NextResponse.json({ success: true, count: formattedProblems.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
