import { createClient } from "@/lib/supabase/server";

export interface Profile {
  id: string;
  email: string;
  username: string;
  role: "free" | "pro" | "admin";
  total_solves: number;
  avatar_url?: string;
}

/**
 * Get the currently authenticated Supabase user and their public profile.
 */
export async function getCurrentUser(): Promise<{
  user: any;
  profile: Profile | null;
} | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return {
      user,
      profile: profile || {
        id: user.id,
        email: user.email || "",
        username: user.user_metadata?.username || (user.email ? user.email.split("@")[0] : "developer"),
        role: (user.user_metadata?.role as any) || "free",
        total_solves: 0,
        avatar_url: user.user_metadata?.avatar_url,
      },
    };
  } catch (err: any) {
    if (err?.digest === "DYNAMIC_SERVER_USAGE" || err?.message?.includes("Dynamic server usage")) {
      throw err;
    }
    console.error("Error retrieving current user:", err);
    return null;
  }
}

export { getAppUrl } from "./url";


