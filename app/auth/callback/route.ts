import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAppUrl } from "@/lib/auth";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/challenges";
  const baseUrl = getAppUrl();
  const cleanNext = next.startsWith("/") ? next : `/${next}`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Exchange succeeded, session cookie is set via createClient
      // Redirect cleanly to post-login destination stripping ?code=
      return NextResponse.redirect(new URL(cleanNext, baseUrl));
    }
  }

  // If code exchange failed or missing, redirect to login with error
  return NextResponse.redirect(new URL("/login?error=auth-code-error", baseUrl));
}

