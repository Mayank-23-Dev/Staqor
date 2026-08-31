import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AttemptCount } from "@/models/AttemptCount";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const challengeId = searchParams.get("challengeId");

    if (!userId || !challengeId) {
      return NextResponse.json(
        { error: "userId and challengeId are required" },
        { status: 400 }
      );
    }

    const attempt = await AttemptCount.findOne({
      user_id: userId,
      challenge_id: challengeId,
    });

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
