import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const current = await getCurrentUser();
  if (!current) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: current.user.id,
      email: current.profile?.email || current.user.email,
      username: current.profile?.username,
      role: current.profile?.role || "free",
      total_solves: current.profile?.total_solves || 0,
      avatar_url: current.profile?.avatar_url,
    },
  });
}

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    if (action === "logout") {
      const supabase = await createClient();
      await supabase.auth.signOut();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Auth action failed" },
      { status: 500 }
    );
  }
}
