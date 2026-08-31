"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function IDEClient({ problem, user }: { problem: any; user: any }) {
  const [code, setCode] = useState(
    problem.starter_code?.javascript || "// Write your solution here...\n"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // 1. Insert submission
      const { error: subError } = await supabase.from("submissions").insert({
        user_id: user.id,
        problem_id: problem.id,
        status: "solved",
        submitted_code: code,
      });

      if (subError) throw subError;

      // 2. Fetch user stats
      const { data: statsData, error: statsError } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const today = new Date().toISOString().split('T')[0];

      if (statsError && statsError.code === "PGRST116") {
        // No stats exist, create them
        await supabase.from("user_stats").insert({
          user_id: user.id,
          current_streak: 1,
          total_solved: 1,
          coins: 10,
          last_active_date: today,
        });
      } else if (statsData) {
        // Update existing stats
        let newStreak = statsData.current_streak;
        if (statsData.last_active_date !== today) {
          const lastActive = new Date(statsData.last_active_date);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
            newStreak += 1;
          } else {
            newStreak = 1; // streak broken
          }
        }

        await supabase
          .from("user_stats")
          .update({
            current_streak: newStreak,
            total_solved: statsData.total_solved + 1,
            coins: statsData.coins + 10,
            last_active_date: today,
          })
          .eq("user_id", user.id);
      }

      toast.success("Solution submitted successfully!");
      router.refresh(); // Refresh to update layout if needed
    } catch (err: any) {
      toast.error(err.message || "Failed to submit code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1E1E]">
      <div className="flex-1 min-h-[400px]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
          }}
        />
      </div>
      <div className="p-4 border-t border-white/10 flex justify-end bg-background">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Code
        </Button>
      </div>
    </div>
  );
}
