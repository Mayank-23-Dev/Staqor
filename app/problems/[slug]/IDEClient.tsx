"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  Loader2,
  Play,
  Send,
  Code2,
  FileCode,
  Palette,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Eye,
  Image as ImageIcon,
  ArrowLeft,
  Maximize2,
  ZoomIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageLightboxModal } from "@/components/problems/ImageLightboxModal";

interface IDEClientProps {
  problem: any;
  user: any;
}

export default function IDEClient({ problem, user }: IDEClientProps) {
  const initialHtml =
    problem.starter_code?.html ||
    `<!-- Write your HTML code here -->\n<div class="container">\n  <!-- Build your interface here -->\n</div>`;

  const initialCss =
    problem.starter_code?.css ||
    `/* Write your CSS styling here */\n:root {\n  --primary: #A7DDC9;\n  --bg-dark: #0A0A0F;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: sans-serif;\n  background-color: var(--bg-dark);\n  color: #fff;\n  padding: 2rem;\n}`;

  const initialJs =
    problem.starter_code?.js ||
    `// Write your JavaScript code here\ndocument.addEventListener("DOMContentLoaded", () => {\n  // Write your interactive logic here\n});`;

  const screenshotUrl =
    problem.screenshot_url ||
    `/screenshots/${problem.folder || problem.slug}.png`;

  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);

  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [previewTab, setPreviewTab] = useState<"sandbox" | "target">("sandbox");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [sandboxError, setSandboxError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Update Sandbox IFrame
  const updateSandbox = (showToast = false) => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    setSandboxError(null);

    const source = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Fira+Code:wght@400;600&family=Inter:wght@300;400;600;800&family=Merriweather:ital,wght@0,300;0,700;1,400&family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@0,600;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;600;700;800&family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            window.onerror = function(msg, url, line) {
              window.parent.postMessage({ type: 'SANDBOX_ERROR', message: msg, line: line }, '*');
            };
            try {
              ${jsCode}
              window.parent.postMessage({ type: 'SANDBOX_SUCCESS' }, '*');
            } catch (err) {
              window.parent.postMessage({ type: 'SANDBOX_ERROR', message: err.message || err.toString() }, '*');
            }
          </script>
        </body>
      </html>
    `;

    try {
      doc.open();
      doc.write(source);
      doc.close();
      if (showToast) {
        toast.success("Sandbox reloaded with latest code changes.");
      }
    } catch (e: any) {
      setSandboxError(e.message || "Failed to render sandbox.");
    }
  };

  // Listen to sandbox events
  useEffect(() => {
    const handleSandboxMessage = (event: MessageEvent) => {
      if (event.data?.type === "SANDBOX_ERROR") {
        setSandboxError(event.data.message);
      } else if (event.data?.type === "SANDBOX_SUCCESS") {
        setSandboxError(null);
      }
    };

    window.addEventListener("message", handleSandboxMessage);
    return () => window.removeEventListener("message", handleSandboxMessage);
  }, []);

  // Initial Sandbox Render
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSandbox();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Reset to Starter Code
  const handleReset = () => {
    if (confirm("Reset editor to initial starter template?")) {
      setHtmlCode(initialHtml);
      setCssCode(initialCss);
      setJsCode(initialJs);
      setEvaluationResult(null);
      setSandboxError(null);
      setTimeout(() => updateSandbox(true), 100);
    }
  };

  // Run & Preview Button
  const handleRun = () => {
    setIsRunning(true);
    setPreviewTab("sandbox");
    updateSandbox(true);
    setTimeout(() => setIsRunning(false), 300);
  };

  // Submit Solution: Compile in Sandbox -> Send to AI Evaluator with Benchmark Solution
  const handleSubmit = async () => {
    setIsEvaluating(true);
    setEvaluationResult(null);

    // 1. Compile in sandbox first
    updateSandbox();

    try {
      const payload = {
        userId: user?.id || "anonymous",
        challengeSlug: problem.slug,
        problemTitle: problem.title,
        specMarkdown: problem.description,
        userCode: {
          html: htmlCode,
          css: cssCode,
          js: jsCode,
        },
        modelSolution: problem.model_solution,
        attemptType: "submit",
      };

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Evaluation failed");
      }

      const evaluation = data.evaluation || data;
      setEvaluationResult(evaluation);

      if (evaluation.passed) {
        toast.success(`🎉 Solution Passed! Score: ${evaluation.score}/100 (+10 Staqor Coins)`);

        // If user logged in, update stats
        if (user) {
          const { data: statsData } = await supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .single();

          const today = new Date().toISOString().split("T")[0];

          if (!statsData) {
            await supabase.from("user_stats").insert({
              user_id: user.id,
              current_streak: 1,
              total_solved: 1,
              coins: 10,
              last_active_date: today,
            });
          } else {
            let newStreak = statsData.current_streak || 1;
            if (statsData.last_active_date !== today) {
              newStreak += 1;
            }
            await supabase
              .from("user_stats")
              .update({
                current_streak: newStreak,
                total_solved: (statsData.total_solved || 0) + 1,
                coins: (statsData.coins || 0) + 10,
                last_active_date: today,
              })
              .eq("user_id", user.id);
          }
        }
      } else {
        toast.error(`Solution scored ${evaluation.score}/100. Check the AI feedback to refine!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to evaluate solution.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0A0A0F]">
      {/* Top Editor Tab Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#111117] border-b border-border/80">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("html")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === "html"
                ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-orange-400" />
            <span>index.html</span>
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === "css"
                ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span>style.css</span>
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === "js"
                ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>script.js</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="h-7 px-2 text-[11px] font-mono text-zinc-400 hover:text-white"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Split: Monaco Editor & Sandbox / Target Preview */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[420px] overflow-hidden">
        {/* Monaco Editor Pane */}
        <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r border-border/80 bg-[#0E0E14] relative">
          {activeTab === "html" && (
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={htmlCode}
              onChange={(val) => setHtmlCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "Fira Code, Consolas, monospace",
                padding: { top: 14, bottom: 14 },
                scrollBeyondLastLine: false,
                tabSize: 2,
                automaticLayout: true,
              }}
            />
          )}

          {activeTab === "css" && (
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={cssCode}
              onChange={(val) => setCssCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "Fira Code, Consolas, monospace",
                padding: { top: 14, bottom: 14 },
                scrollBeyondLastLine: false,
                tabSize: 2,
                automaticLayout: true,
              }}
            />
          )}

          {activeTab === "js" && (
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={jsCode}
              onChange={(val) => setJsCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "Fira Code, Consolas, monospace",
                padding: { top: 14, bottom: 14 },
                scrollBeyondLastLine: false,
                tabSize: 2,
                automaticLayout: true,
              }}
            />
          )}
        </div>

        {/* Live Sandbox Preview & AI Evaluation Pane */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-[#0D0D12] overflow-hidden">
          {/* Sandbox & Target Mode Selector Bar */}
          <div className="px-3 py-1.5 bg-[#14141E] border-b border-border/70 flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewTab("sandbox")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  previewTab === "sandbox"
                    ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3 text-[#A7DDC9]" />
                <span>Live Sandbox</span>
              </button>

              <button
                onClick={() => setPreviewTab("target")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  previewTab === "target"
                    ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-3 h-3 text-sky-400" />
                <span>Target Screenshot</span>
              </button>
            </div>

            {previewTab === "sandbox" ? (
              sandboxError ? (
                <span className="text-rose-400 text-[10px] flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3 h-3" /> Runtime Error
                </span>
              ) : (
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                </span>
              )
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsLightboxOpen(true)}
                  className="h-6 px-2 text-[10px] font-mono border-border bg-[#0A0A0F] text-zinc-300 hover:text-white gap-1"
                >
                  <Maximize2 className="w-2.5 h-2.5 text-[#A7DDC9]" /> Inspect
                </Button>
                <Button
                  size="sm"
                  onClick={() => setPreviewTab("sandbox")}
                  className="h-6 px-2 text-[10px] font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1 shadow-sm"
                >
                  <ArrowLeft className="w-2.5 h-2.5" /> Back to Sandbox
                </Button>
              </div>
            )}
          </div>

          {/* Sandbox Iframe or Target Screenshot View */}
          <div className="flex-1 bg-[#0A0A0F] relative min-h-[220px] overflow-auto">
            {previewTab === "sandbox" ? (
              <iframe
                ref={iframeRef}
                title="Live Sandbox Preview"
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-modals"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-between p-4 bg-[#0A0A0F] overflow-y-auto space-y-4">
                {/* Top Return Reminder */}
                <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#111117] border border-[#26262E] text-xs">
                  <span className="text-zinc-300 font-mono text-[11px]">
                    Expected Design Benchmark
                  </span>
                  <Button
                    size="sm"
                    onClick={() => setPreviewTab("sandbox")}
                    className="h-6 px-2.5 text-[10px] font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" /> Return to Live Editor
                  </Button>
                </div>

                {/* Main Screenshot with Click-to-Zoom */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="cursor-pointer group relative max-w-full rounded-lg overflow-hidden border border-border shadow-2xl"
                  title="Click for full-screen zoomable lightbox"
                >
                  <img
                    src={screenshotUrl}
                    alt={`${problem.title} Target Screenshot`}
                    className="max-w-full h-auto rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-3 py-1.5 rounded-lg bg-[#111117]/90 border border-[#26262E] text-xs font-mono text-white flex items-center gap-1.5 shadow-xl">
                      <ZoomIn className="w-3.5 h-3.5 text-[#A7DDC9]" /> Click to Inspect with Zoom
                    </span>
                  </div>
                </div>

                {/* Bottom Return Button */}
                <Button
                  onClick={() => setPreviewTab("sandbox")}
                  className="h-8 px-4 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5 shadow-xl shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Live Sandbox Editor</span>
                </Button>
              </div>
            )}
          </div>

          {/* Sandbox Error Box (if runtime throw) */}
          {sandboxError && previewTab === "sandbox" && (
            <div className="p-3 bg-rose-950/40 border-t border-rose-500/30 text-rose-300 text-xs font-mono">
              <div className="font-bold flex items-center gap-1 mb-0.5 text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" /> Sandbox Execution Error:
              </div>
              <p className="leading-snug text-[11px]">{sandboxError}</p>
            </div>
          )}

          {/* AI Rubric Evaluation Result Sheet */}
          {evaluationResult && (
            <div className="max-h-64 bg-[#111117] border-t border-border/80 p-4 overflow-y-auto font-sans scrollbar-thin">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A7DDC9]" />
                  <h3 className="font-bold text-sm text-white font-mono">AI Rubric Evaluation</h3>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Badge
                    variant="outline"
                    className={`text-xs px-2.5 py-0.5 font-bold ${
                      evaluationResult.passed
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    SCORE: {evaluationResult.score}/100 {evaluationResult.passed ? "PASSED" : "NEEDS WORK"}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                {evaluationResult.overall_feedback}
              </p>

              {/* Rubric Breakdown Progress */}
              <div className="space-y-2">
                {evaluationResult.breakdown?.map((item: any, i: number) => (
                  <div key={item.rubric_id || i} className="p-2.5 rounded-lg bg-[#0E0E14] border border-[#26262E]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="font-mono text-[11px] text-[#A7DDC9] font-bold">
                        {item.score}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-snug">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 bg-[#111117] border-t border-border/80 flex items-center justify-between gap-3">
        <div className="text-[11px] text-zinc-400 font-mono hidden sm:block">
          All 50 challenges scored by automated AI rubrics in &lt;2.5s
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRun}
            disabled={isRunning || isEvaluating}
            className="h-9 px-3.5 text-xs font-mono font-medium border-[#26262E] hover:border-[#A7DDC9] text-zinc-300 hover:text-white bg-[#0A0A0F] gap-1.5"
          >
            {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 text-[#A7DDC9]" />}
            <span>Run & Preview</span>
          </Button>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isEvaluating}
            className="h-9 px-4 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5 shadow-sm"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Solution</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal with explicit Back button */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={screenshotUrl}
        title={problem.title}
      />
    </div>
  );
}
