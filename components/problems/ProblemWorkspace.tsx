"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
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
  Maximize2,
  ZoomIn,
  FileText,
  Terminal,
  RefreshCw,
} from "lucide-react";
import { ImageLightboxModal } from "./ImageLightboxModal";

interface ProblemWorkspaceProps {
  problem: any;
  user: any;
}

export function ProblemWorkspace({ problem, user }: ProblemWorkspaceProps) {
  // Starter Codes
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

  // Code state
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);

  // Layout & Tabs state
  const [activeLeftTab, setActiveLeftTab] = useState<"description" | "target" | "preview">("description");
  const [activeEditorTab, setActiveEditorTab] = useState<"html" | "css" | "js">("html");
  const [activeBottomTab, setActiveBottomTab] = useState<"sandbox" | "target" | "evaluation">("sandbox");

  // Resizable Split States
  const [splitRatio, setSplitRatio] = useState<number>(40); // 40% left, 60% right
  const [editorHeightRatio, setEditorHeightRatio] = useState<number>(55); // 55% top editor, 45% bottom preview
  const [isDraggingH, setIsDraggingH] = useState(false);
  const [isDraggingV, setIsDraggingV] = useState(false);

  // Execution & AI Evaluation State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [sandboxError, setSandboxError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const leftIframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Load saved code from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem(`staqor_prob_${problem.slug}`);
      if (savedCode) {
        try {
          const parsed = JSON.parse(savedCode);
          if (parsed.html) setHtmlCode(parsed.html);
          if (parsed.css) setCssCode(parsed.css);
          if (parsed.js) setJsCode(parsed.js);
        } catch {}
      }
    }
  }, [problem.slug]);

  // Auto-save code to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `staqor_prob_${problem.slug}`,
        JSON.stringify({ html: htmlCode, css: cssCode, js: jsCode })
      );
    }
  }, [htmlCode, cssCode, jsCode, problem.slug]);

  // Update Sandbox Iframes (both bottom and left preview)
  const updateSandbox = useCallback((showToast = false) => {
    const renderToIframe = (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

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
      } catch (e: any) {
        setSandboxError(e.message || "Failed to render sandbox.");
      }
    };

    setSandboxError(null);
    renderToIframe(iframeRef.current);
    renderToIframe(leftIframeRef.current);

    if (showToast) {
      toast.success("Sandbox reloaded with latest code changes.");
    }
  }, [htmlCode, cssCode, jsCode]);

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
  }, [updateSandbox]);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter to Run & Submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Resizable Horizontal Split (Left / Right)
  const handleMouseDownH = () => {
    setIsDraggingH(true);
  };

  // Resizable Vertical Split (Editor / Preview)
  const handleMouseDownV = () => {
    setIsDraggingV(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingH && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
        if (newPercent >= 25 && newPercent <= 70) {
          setSplitRatio(newPercent);
        }
      }
      if (isDraggingV && rightPaneRef.current) {
        const rect = rightPaneRef.current.getBoundingClientRect();
        const newPercent = ((e.clientY - rect.top) / rect.height) * 100;
        if (newPercent >= 20 && newPercent <= 80) {
          setEditorHeightRatio(newPercent);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingH(false);
      setIsDraggingV(false);
    };

    if (isDraggingH || isDraggingV) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = isDraggingH ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingH, isDraggingV]);

  // Reset Code
  const handleReset = () => {
    if (confirm("Reset editor back to initial starter code template?")) {
      setHtmlCode(initialHtml);
      setCssCode(initialCss);
      setJsCode(initialJs);
      setEvaluationResult(null);
      setSandboxError(null);
      setTimeout(() => updateSandbox(true), 100);
    }
  };

  // Run & Preview
  const handleRun = () => {
    setIsRunning(true);
    updateSandbox(true);
    setTimeout(() => setIsRunning(false), 300);
  };

  // Submit Solution to AI Evaluation
  const handleSubmit = async () => {
    setIsEvaluating(true);
    setActiveBottomTab("evaluation");
    setEvaluationResult(null);

    // 1. Sandbox compile first
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
        toast.success(`🎉 Accepted! Score: ${evaluation.score}/100 (+10 Staqor Coins)`);

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
        toast.error(`Scored ${evaluation.score}/100. Review AI feedback to polish your code.`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to evaluate code.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="h-screen max-h-screen w-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col overflow-hidden select-none font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP FIXED HEADER                                                       */}
      {/* ========================================================================= */}
      <header className="h-12 border-b border-[#26262E] bg-[#111117] px-3.5 flex items-center justify-between shrink-0 z-30">
        {/* Left: Back Link & Problem Title / Difficulty */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/problems"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            title="Back to Problems Catalog"
          >
            <LogoIcon variant="aqua" className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>

          <div className="h-4 w-px bg-[#26262E]" />

          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-xs sm:text-sm text-white tracking-tight truncate">
              {problem.title}
            </span>

            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded border shrink-0 ${
                problem.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : problem.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/30"
              }`}
            >
              {problem.difficulty}
            </span>

            <Badge
              variant="outline"
              className="text-[10px] font-mono text-zinc-400 border-[#26262E] bg-background/50 hidden md:inline-flex"
            >
              {problem.category || "HTML & CSS"}
            </Badge>
          </div>
        </div>

        {/* Right: Actions (Run, Submit, Reset) */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="h-7 px-2 text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-white/5"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <div className="h-4 w-px bg-[#26262E]" />

          <Button
            size="sm"
            variant="outline"
            onClick={handleRun}
            disabled={isRunning || isEvaluating}
            className="h-7 px-3 text-xs font-mono font-medium border-[#26262E] hover:border-[#A7DDC9] text-zinc-300 hover:text-white bg-[#0A0A0F] gap-1.5"
            title="Run code in Sandbox (Ctrl+S)"
          >
            {isRunning ? (
              <RefreshCw className="w-3 h-3 animate-spin text-[#A7DDC9]" />
            ) : (
              <Play className="w-3 h-3 text-[#A7DDC9]" />
            )}
            <span>Run</span>
          </Button>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isEvaluating}
            className="h-7 px-3.5 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5 shadow-sm"
            title="Submit to AI Evaluator (Ctrl+Enter)"
          >
            {isEvaluating ? (
              <>
                <Loader2Icon className="w-3 h-3 animate-spin" />
                <span>Judging...</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Submit</span>
              </>
            )}
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN RESIZABLE SPLIT WORKSPACE                                         */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col lg:flex-row overflow-hidden relative"
      >
        {/* ======================================================================= */}
        {/* LEFT PANEL: Description | Target Screenshot | Live Preview              */}
        {/* ======================================================================= */}
        <div
          style={{ width: `${splitRatio}%` }}
          className="h-full flex flex-col border-b lg:border-b-0 lg:border-r border-[#26262E] bg-[#0D0D12] overflow-hidden min-w-[280px]"
        >
          {/* Left Panel Tabs Bar */}
          <div className="h-9 px-3 bg-[#111117] border-b border-[#26262E] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveLeftTab("description")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeLeftTab === "description"
                    ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#A7DDC9]" />
                <span>Description</span>
              </button>

              <button
                onClick={() => setActiveLeftTab("target")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeLeftTab === "target"
                    ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Target Screenshot</span>
              </button>

              <button
                onClick={() => {
                  setActiveLeftTab("preview");
                  setTimeout(() => updateSandbox(), 50);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeLeftTab === "preview"
                    ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Preview</span>
              </button>
            </div>

            {activeLeftTab === "target" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLightboxOpen(true)}
                className="h-6 px-2 text-[10px] font-mono text-zinc-400 hover:text-white gap-1"
                title="Open in Zoomable Lightbox"
              >
                <Maximize2 className="w-3 h-3 text-[#A7DDC9]" />
                <span>Fullscreen</span>
              </Button>
            )}
          </div>

          {/* Left Panel Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none text-zinc-300 select-text">
            {/* 1. Description View (Clean text specifications without duplicate screenshot) */}
            {activeLeftTab === "description" && (
              <div className="p-4 lg:p-5 space-y-4">
                {problem.description && (
                  <div
                    className="prose prose-invert max-w-none text-zinc-300 text-xs"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                )}
              </div>
            )}

            {/* 2. Target Screenshot Dedicated View */}
            {activeLeftTab === "target" && (
              <div className="h-full flex flex-col items-center justify-start p-4 bg-[#0A0A0F] overflow-y-auto space-y-3">
                <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#111117] border border-[#26262E] text-xs font-mono">
                  <span className="text-zinc-400 text-[11px]">Expected Design Benchmark</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsLightboxOpen(true)}
                    className="h-5 px-2 text-[10px] text-[#A7DDC9] hover:bg-[#A7DDC9]/10 gap-1"
                  >
                    <ZoomIn className="w-3 h-3" /> Zoom & Inspect
                  </Button>
                </div>

                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="rounded-xl overflow-hidden border border-[#26262E] bg-[#000] shadow-2xl group relative cursor-pointer"
                  title="Click to open interactive lightbox"
                >
                  <img
                    src={screenshotUrl}
                    alt={`${problem.title} Target Screenshot`}
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-200 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-3 py-1.5 rounded-lg bg-[#111117]/90 border border-[#26262E] text-xs font-mono text-white flex items-center gap-1.5 shadow-xl">
                      <Maximize2 className="w-3.5 h-3.5 text-[#A7DDC9]" /> Click to Inspect in Fullscreen
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Left Live Preview View */}
            {activeLeftTab === "preview" && (
              <div className="h-full w-full flex flex-col relative bg-white">
                <iframe
                  ref={leftIframeRef}
                  title="Left Live Sandbox Preview"
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-scripts allow-same-origin allow-modals"
                />
              </div>
            )}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* VERTICAL DRAG HANDLE / DIVIDER                                          */}
        {/* ======================================================================= */}
        <div
          onMouseDown={handleMouseDownH}
          onDoubleClick={() => setSplitRatio(40)}
          className="hidden lg:flex w-1.5 hover:w-2 bg-[#0A0A0F] hover:bg-[#A7DDC9]/40 cursor-col-resize items-center justify-center transition-colors z-20 group select-none"
          title="Drag to resize left/right split (Double-click to reset)"
        >
          <div className="w-0.5 h-8 rounded-full bg-[#26262E] group-hover:bg-[#A7DDC9]" />
        </div>

        {/* ======================================================================= */}
        {/* RIGHT PANEL (~60%): Monaco Editor (Top) & Preview / Results (Bottom)    */}
        {/* ======================================================================= */}
        <div
          ref={rightPaneRef}
          style={{ width: `${100 - splitRatio}%` }}
          className="flex-1 flex flex-col h-full overflow-hidden bg-[#0A0A0F]"
        >
          {/* --------------------------------------------------------------------- */}
          {/* TOP SECTION: MONACO CODE EDITOR                                       */}
          {/* --------------------------------------------------------------------- */}
          <div
            style={{ height: `${editorHeightRatio}%` }}
            className="flex flex-col overflow-hidden bg-[#0E0E14] min-h-[140px]"
          >
            {/* Editor File Tabs Bar */}
            <div className="h-9 px-3 bg-[#111117] border-b border-[#26262E] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveEditorTab("html")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    activeEditorTab === "html"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-orange-400" />
                  <span>index.html</span>
                </button>

                <button
                  onClick={() => setActiveEditorTab("css")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    activeEditorTab === "css"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-sky-400" />
                  <span>style.css</span>
                </button>

                <button
                  onClick={() => setActiveEditorTab("js")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    activeEditorTab === "js"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>script.js</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 hidden sm:block">
                Auto-saved locally
              </div>
            </div>

            {/* Monaco Editor Component */}
            <div className="flex-1 w-full overflow-hidden relative">
              {activeEditorTab === "html" && (
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
                    padding: { top: 10, bottom: 10 },
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                    automaticLayout: true,
                  }}
                />
              )}

              {activeEditorTab === "css" && (
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
                    padding: { top: 10, bottom: 10 },
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                    automaticLayout: true,
                  }}
                />
              )}

              {activeEditorTab === "js" && (
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
                    padding: { top: 10, bottom: 10 },
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                    automaticLayout: true,
                  }}
                />
              )}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* HORIZONTAL DRAG HANDLE / DIVIDER                                      */}
          {/* --------------------------------------------------------------------- */}
          <div
            onMouseDown={handleMouseDownV}
            onDoubleClick={() => setEditorHeightRatio(55)}
            className="h-1.5 hover:h-2 bg-[#0A0A0F] hover:bg-[#A7DDC9]/40 cursor-row-resize flex items-center justify-center transition-colors z-20 group select-none"
            title="Drag to resize Editor / Preview height (Double-click to reset)"
          >
            <div className="h-0.5 w-10 rounded-full bg-[#26262E] group-hover:bg-[#A7DDC9]" />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* BOTTOM SECTION: LIVE SANDBOX & AI EVALUATION RESULTS                  */}
          {/* --------------------------------------------------------------------- */}
          <div
            style={{ height: `${100 - editorHeightRatio}%` }}
            className="flex flex-col overflow-hidden bg-[#0D0D12] min-h-[140px]"
          >
            {/* Bottom Tabs Bar */}
            <div className="h-9 px-3 bg-[#111117] border-b border-[#26262E] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveBottomTab("sandbox")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    activeBottomTab === "sandbox"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#A7DDC9]" />
                  <span>Live Sandbox</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab("target")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    activeBottomTab === "target"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Target Screenshot</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab("evaluation")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    activeBottomTab === "evaluation"
                      ? "bg-[#1E1E2E] text-[#A7DDC9] border border-[#A7DDC9]/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A7DDC9]" />
                  <span>AI Evaluation</span>
                  {evaluationResult && (
                    <span
                      className={`text-[9px] px-1 py-0 rounded font-bold ${
                        evaluationResult.passed
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {evaluationResult.score}/100
                    </span>
                  )}
                </button>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                {activeBottomTab === "sandbox" && (
                  sandboxError ? (
                    <span className="text-rose-400 text-[10px] flex items-center gap-1 font-bold">
                      <AlertTriangle className="w-3 h-3" /> Error
                    </span>
                  ) : (
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                    </span>
                  )
                )}
                {activeBottomTab === "target" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsLightboxOpen(true)}
                    className="h-6 px-2 text-[10px] font-mono text-zinc-400 hover:text-white gap-1"
                  >
                    <Maximize2 className="w-3 h-3 text-[#A7DDC9]" />
                    <span>Fullscreen</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Bottom Tab Content View */}
            <div className="flex-1 bg-[#0A0A0F] relative overflow-auto select-text">
              {/* 1. Live Sandbox Frame */}
              {activeBottomTab === "sandbox" && (
                <div className="w-full h-full flex flex-col relative bg-white">
                  <iframe
                    ref={iframeRef}
                    title="Live Sandbox Preview"
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts allow-same-origin allow-modals"
                  />
                  {sandboxError && (
                    <div className="p-2.5 bg-rose-950/70 border-t border-rose-500/30 text-rose-300 text-xs font-mono absolute bottom-0 inset-x-0 backdrop-blur-md">
                      <div className="font-bold flex items-center gap-1 text-rose-400 mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Runtime Error:
                      </div>
                      <p className="leading-snug text-[11px]">{sandboxError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Target Screenshot Reference */}
              {activeBottomTab === "target" && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0A0A0F] overflow-y-auto">
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="cursor-pointer group relative max-w-full rounded-lg overflow-hidden border border-[#26262E] shadow-2xl"
                    title="Click for full-screen zoom"
                  >
                    <img
                      src={screenshotUrl}
                      alt={`${problem.title} Target Screenshot`}
                      className="max-w-full max-h-[30vh] h-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <span className="px-3 py-1.5 rounded-lg bg-[#111117]/90 border border-[#26262E] text-xs font-mono text-white flex items-center gap-1.5 shadow-xl">
                        <ZoomIn className="w-3.5 h-3.5 text-[#A7DDC9]" /> Click to Inspect with Zoom
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. AI Evaluation Scorecard */}
              {activeBottomTab === "evaluation" && (
                <div className="p-4 overflow-y-auto font-sans space-y-4 max-w-3xl">
                  {isEvaluating ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <RefreshCw className="w-6 h-6 text-[#A7DDC9] animate-spin" />
                      <div className="font-mono text-sm font-bold text-white">
                        AI Judge is analyzing your solution...
                      </div>
                      <p className="text-xs text-zinc-400 max-w-xs">
                        Comparing semantic markup, responsive CSS layout, font/color tokens, and DOM event logic in &lt;2.5s.
                      </p>
                    </div>
                  ) : evaluationResult ? (
                    <>
                      <div className="flex items-center justify-between pb-2 border-b border-[#26262E]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#A7DDC9]" />
                          <h3 className="font-bold text-sm text-white font-mono">
                            AI Evaluation Report
                          </h3>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2.5 py-0.5 font-mono font-bold ${
                            evaluationResult.passed
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          SCORE: {evaluationResult.score}/100{" "}
                          {evaluationResult.passed ? "PASSED" : "NEEDS REVISION"}
                        </Badge>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {evaluationResult.overall_feedback}
                      </p>

                      <div className="space-y-2.5 pt-1">
                        {evaluationResult.breakdown?.map((item: any, i: number) => (
                          <div
                            key={item.rubric_id || i}
                            className="p-3 rounded-lg bg-[#111117] border border-[#26262E]"
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-white">{item.name}</span>
                              <span className="font-mono text-[11px] text-[#A7DDC9] font-bold">
                                {item.score}/100
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-snug">
                              {item.feedback}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="py-12 text-center text-zinc-400 space-y-2">
                      <Terminal className="w-7 h-7 mx-auto text-zinc-600" />
                      <p className="text-xs font-mono">No evaluation submitted yet.</p>
                      <p className="text-[11px] text-zinc-500">
                        Click &quot;Submit&quot; (or press <kbd className="px-1.5 py-0.5 rounded bg-[#16161F] border border-[#26262E] text-zinc-300">Ctrl+Enter</kbd>) to benchmark your code against the reference solution.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX MODAL                                                         */}
      {/* ========================================================================= */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={screenshotUrl}
        title={problem.title}
      />
    </div>
  );
}

function Loader2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
