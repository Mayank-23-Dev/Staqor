/**
 * Returns the base application URL.
 * - In the browser: window.location.origin is always the exact active domain (e.g. https://staqor.vercel.app).
 * - On the server: reads NEXT_PUBLIC_APP_URL -> VERCEL_URL -> localhost fallback.
 */
export function getAppUrl(): string {
  // 1. In browser runtime: window.location.origin is the absolute source of truth
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  // 2. In server / SSR runtime: read from environment variables
  let url =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, "");
}

