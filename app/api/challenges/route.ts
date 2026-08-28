import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Challenge } from "@/models/Challenge";

export async function GET() {
  try {
    await connectToDatabase();
    const challenges = await Challenge.find({ is_active: true })
      .select("slug title track difficulty order")
      .sort({ order: 1 });

    return NextResponse.json({ challenges });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
