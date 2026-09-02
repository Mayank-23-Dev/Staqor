import { NextRequest, NextResponse } from "next/server";
import { getAttemptCount } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "anonymous-dev";
    const challengeId = searchParams.get("challengeId") || "interactive-pricing-card";

    const attempt = await getAttemptCount(userId, challengeId);

    return NextResponse.json({
      run_count: attempt?.run_count || 0,
      submit_count: attempt?.submit_count || 0,
      max_runs: 5,
      max_submits: 3,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attempt counts" },
      { status: 500 }
    );
  }
}
