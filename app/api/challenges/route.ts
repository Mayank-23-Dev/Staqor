import { NextResponse } from "next/server";
import { getAllChallenges } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const challenges = await getAllChallenges();
    return NextResponse.json({ challenges });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
