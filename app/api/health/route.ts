import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const timestamp = new Date().toISOString();
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("challenges").select("id").limit(1);

    return NextResponse.json(
      {
        status: "ok",
        service: "staqor-api",
        database: error ? "fallback_ready" : "connected",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "ok",
        service: "staqor-api",
        database: "fallback_ready",
        error: error?.message || "Running in offline fallback mode",
        timestamp,
      },
      { status: 200 }
    );
  }
}
