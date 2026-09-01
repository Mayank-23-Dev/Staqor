/**
 * Returns the base application URL.
 * Priority: NEXT_PUBLIC_APP_URL -> NEXT_PUBLIC_VERCEL_URL / VERCEL_URL -> window.location.origin -> fallback.
 * Safe to import in both Client and Server components.
 */
export function getAppUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "http://localhost:3000");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, "");
}
