"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TrackButtonProps {
  trackId: string;
  className?: string;
  children?: React.ReactNode;
}

export function TrackButton({
  trackId,
  className = "",
  children = "Browse Track",
}: TrackButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleClick = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const targetUrl = `/problems?track=${encodeURIComponent(trackId)}`;

      if (user) {
        // User is logged in -> proceed directly
        router.push(targetUrl);
      } else {
        // User is not logged in -> redirect to login with return path
        router.push(`/login?redirectTo=${encodeURIComponent(targetUrl)}`);
      }
    } catch (err) {
      router.push(`/login?redirectTo=/problems?track=${encodeURIComponent(trackId)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className={`w-full text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-1.5 justify-center">
          <Loader2 className="w-3 h-3 animate-spin text-[#ABDAC8]" />
          <span>Verifying...</span>
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
