import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh user session token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isStrictlyProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  const createRedirectResponse = (targetUrl: URL) => {
    const redirectResponse = NextResponse.redirect(targetUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
      });
    });
    return redirectResponse;
  };

  // If Supabase OAuth redirected with ?code= to any route other than /auth/callback (e.g. landing page /)
  if (request.nextUrl.searchParams.has("code") && !pathname.startsWith("/auth/callback")) {
    const code = request.nextUrl.searchParams.get("code")!;
    const next = pathname === "/" ? "/problems" : pathname;
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    url.searchParams.set("code", code);
    url.searchParams.set("next", next);
    return createRedirectResponse(url);
  }

  if (!user && isStrictlyProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return createRedirectResponse(url);
  }

  // Auto-login: If user is already logged in, redirect directly to /problems (or custom redirectTo if safe)
  if (user && isAuthRoute) {
    const redirectToParam = request.nextUrl.searchParams.get("redirectTo");
    const destination =
      redirectToParam &&
      redirectToParam.startsWith("/") &&
      !redirectToParam.startsWith("/login") &&
      !redirectToParam.startsWith("/signup")
        ? redirectToParam
        : "/problems";
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.searchParams.delete("redirectTo");
    return createRedirectResponse(url);
  }

  // If user visits legacy /challenges or /dashboard aliases, route cleanly to /problems
  if (pathname === "/challenges" || pathname === "/dashboard") {
    const url = request.nextUrl.clone();
    url.pathname = "/problems";
    return createRedirectResponse(url);
  }

  return supabaseResponse;
}
