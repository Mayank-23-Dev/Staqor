"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Play, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function IDEClient({ problem, user }: { problem: any; user: any }) {
  const defaultHtml = problem.starter_code?.html || "<!-- Write HTML here -->\n";
  const defaultCss = problem.starter_code?.css || "/* Write CSS here */\n";
  const defaultJs = problem.starter_code?.js || "// Write JavaScript here\n";

  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("js");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const activeCode = 
    activeTab === "html" ? htmlCode : 
    activeTab === "css" ? cssCode : jsCode;

  const handleEditorChange = (val: string | undefined) => {
    if (!val) return;
    if (activeTab === "html") setHtmlCode(val);
    else if (activeTab === "css") setCssCode(val);
    else setJsCode(val);
  };

  const updatePreview = () => {
    if (!iframeRef.current) return;
    
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    const source = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(source);
    doc.close();
  };

  // Update preview automatically on load or when code changes (debounced if preferred, but for now manual or on tab switch is okay. Let's do it on run click)

  useEffect(() => {
    updatePreview();
  }, []);

  const handleSubmit = async (attemptType: "run" | "submit") => {
    if (!user && attemptType === "submit") {
      toast.error("You must be logged in to submit.");
      return;
    }
    
    setIsSubmitting(true);
    setEvaluationResult(null);
    updatePreview();

    try {
      // Call Groq API
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest",
          challengeSlug: problem.slug,
          code: { html: htmlCode, css: cssCode, js: jsCode },
          attemptType
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Evaluation failed");
      }

      setEvaluationResult(data.evaluation);

      if (attemptType === "submit" && data.passed) {
        // Save to Supabase
        const { error: subError } = await supabase.from("submissions").insert({
          user_id: user.id,
          problem_id: problem.id,
          status: "solved",
          submitted_code: JSON.stringify({ html: htmlCode, css: cssCode, js: jsCode }),
        });

        if (subError) throw subError;

        // Update stats
        const { data: statsData, error: statsError } = await supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", user.id)
          .single();

        const today = new Date().toISOString().split('T')[0];

        if (statsError && statsError.code === "PGRST116") {
          await supabase.from("user_stats").insert({
            user_id: user.id,
            current_streak: 1,
            total_solved: 1,
            coins: 10,
            last_active_date: today,
          });
        } else if (statsData) {
          let newStreak = statsData.current_streak;
          if (statsData.last_active_date !== today) {
            const lastActive = new Date(statsData.last_active_date);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
              newStreak += 1;
            } else {
              newStreak = 1;
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

        toast.success("Solution accepted! +10 Coins");
        router.refresh();
      } else if (attemptType === "submit") {
        toast.error("Solution failed tests. See feedback below.");
      } else {
        toast.info("Run evaluation complete");
      }

    } catch (err: any) {
      toast.error(err.message || "Failed to process code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1E1E]">
      <div className="flex items-center gap-2 p-2 bg-[#2D2D2D] border-b border-white/10">
        <button
          onClick={() => setActiveTab("html")}
          className={`px-3 py-1 rounded text-sm \${activeTab === "html" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          HTML
        </button>
        <button
          onClick={() => setActiveTab("css")}
          className={`px-3 py-1 rounded text-sm \${activeTab === "css" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          CSS
        </button>
        <button
          onClick={() => setActiveTab("js")}
          className={`px-3 py-1 rounded text-sm \${activeTab === "js" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          JavaScript
        </button>
      </div>

      <div className="flex-1 flex min-h-[400px]">
        {/* Editor Area */}
        <div className="w-1/2 h-full border-r border-white/10">
          <Editor
            height="100%"
            language={activeTab === "js" ? "javascript" : activeTab}
            theme="vs-dark"
            value={activeCode}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
            }}
          />
        </div>
        
        {/* Live Preview & Evaluation Area */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="flex-1 bg-white relative">
            <iframe
              ref={iframeRef}
              title="Live Preview"
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          
          {evaluationResult && (
            <div className="h-64 bg-[#2D2D2D] border-t border-white/10 p-4 overflow-y-auto">
              <h3 className="font-semibold text-lg mb-2">
                Score: {evaluationResult.score}/100 
                <span className={`ml-2 text-sm px-2 py-1 rounded \${evaluationResult.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {evaluationResult.passed ? "PASSED" : "FAILED"}
                </span>
              </h3>
              <p className="text-sm text-gray-300 mb-4">{evaluationResult.overall_feedback}</p>
              
              <div className="space-y-3">
                {evaluationResult.breakdown?.map((b: any) => (
                  <div key={b.rubric_id} className="bg-black/20 p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{b.name}</span>
                      <span className="text-xs">{b.score}/100</span>
                    </div>
                    <p className="text-xs text-gray-400">{b.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-background">
        <Button variant="secondary" onClick={() => handleSubmit("run")} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
          Run & Preview
        </Button>
        <Button onClick={() => handleSubmit("submit")} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Submit Solution
        </Button>
      </div>
    </div>
  );
}
