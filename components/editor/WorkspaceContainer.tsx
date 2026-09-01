"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Send,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Terminal,
  Monitor,
  AlertTriangle,
  Lock,
  Code2,
  Layers,
  Cpu,
  Eye,
  Check,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeEditor, EditorTab } from "./CodeEditor";
import { SandboxPreview } from "./SandboxPreview";
import { ConsoleOutput, ConsoleLog } from "./ConsoleOutput";
import { IChallenge, IChallengeCode } from "@/lib/supabase/db";

interface WorkspaceContainerProps {
  challenge: IChallenge;
}

export function WorkspaceContainer({ challenge }: WorkspaceContainerProps) {
  const [code, setCode] = useState<IChallengeCode>(() => {
    // Check localStorage cache
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(`staqor_code_${challenge.slug}`);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {}
      }
    }
    return challenge.starter_code;
  });

  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      id: "init-1",
      type: "info",
      message: "[Sandbox] In-browser execution runtime initialized with 2000ms loop-killer.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "init-2",
      type: "info",
      message: "[Pre-Filter] Zero-token structural pre-filter armed & ready.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [activeLeftTab, setActiveLeftTab] = useState<string>("spec");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleHeight, setConsoleHeight] = useState(190);
  const [isDraggingConsole, setIsDraggingConsole] = useState(false);

  // Auto-save code to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`staqor_code_${challenge.slug}`, JSON.stringify(code));
    }
  }, [code, challenge.slug]);

  const handleCodeChange = (tab: EditorTab, value: string) => {
    setCode((prev) => ({
      ...prev,
      [tab]: value,
    }));
  };

  const handleConsoleLog = useCallback((log: ConsoleLog) => {
    setLogs((prev) => [...prev.slice(-49), log]);
  }, []);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const handleReset = () => {
    if (confirm("Reset code back to original challenge starter files?")) {
      setCode(challenge.starter_code);
      setLogs([
        {
          id: Math.random().toString(),
          type: "warn",
          message: "[Reset] Starter code restored to original templates.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setEvaluation(null);
    }
  };

  const lockedFiles = challenge.locked_files || challenge.starter_code.locked_files || [];

  const handleRunEvaluation = async (attemptType: "run" | "submit" = "run") => {
    if (attemptType === "run") {
      setIsRunning(true);
    } else {
      setIsSubmitting(true);
    }

    try {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "info",
          message: `[Execution Engine] Compiling & running ${attemptType.toUpperCase()} test suite...`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeSlug: challenge.slug,
          code,
          attemptType,
        }),
      });

      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
        setActiveLeftTab("feedback");
        if (data.gateFailed) {
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: "error",
              message: `[Correctness Gate] Check Failed: ${data.evaluation.overall_feedback}`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } else {
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: data.evaluation.passed ? "info" : "warn",
              message: `[AI Evaluation] Complete in <2.5s: Score ${data.evaluation.score}/100 — ${
                data.evaluation.passed ? "PASSED" : "NEEDS REFINEMENT"
              }`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      }
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "error",
          message: `[Evaluation Error] ${err?.message || "Failed to reach evaluator"}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsRunning(false);
      setIsSubmitting(false);
    }
  };

  // Draggable console divider logic
  const startDraggingConsole = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingConsole(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingConsole) return;
      const container = document.getElementById("right-workspace-panel");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newHeight = rect.bottom - e.clientY;
      if (newHeight >= 80 && newHeight <= rect.height - 120) {
        setConsoleHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingConsole(false);
    };

    if (isDraggingConsole) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingConsole]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#07070A] text-foreground overflow-hidden select-none font-sans">
      {/* Top VS Code / macOS Style Window Header */}
      <header className="h-13 border-b border-[#26262E] bg-[#0A0A0F] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          {/* Mac Traffic Lights */}
          <div className="hidden sm:flex items-center gap-1.5 mr-1">
            <div className="w-3 h-3 rounded-full bg-[#F87171] opacity-85" />
            <div className="w-3 h-3 rounded-full bg-[#FBBF24] opacity-85" />
            <div className="w-3 h-3 rounded-full bg-[#4ADE80] opacity-85" />
          </div>

          <Link
            href="/challenges"
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Challenges</span>
          </Link>
          <div className="h-4 w-[1px] bg-[#26262E]" />
          <span className="font-bold text-xs sm:text-sm text-white tracking-tight truncate max-w-[200px] sm:max-w-xs">
            {challenge.title}
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] uppercase font-mono font-bold ${
              challenge.difficulty === "easy"
                ? "text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10"
                : challenge.difficulty === "medium"
                ? "text-[#FBBF24] border-[#FBBF24]/30 bg-[#FBBF24]/10"
                : "text-[#F87171] border-[#F87171]/30 bg-[#F87171]/10"
            }`}
          >
            {challenge.difficulty}
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-mono border-[#26262E] text-zinc-400 bg-[#111117] hidden lg:inline-flex"
          >
            {challenge.track}
          </Badge>
        </div>

        {/* Action Controls (Reset, Run, Submit) */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 text-xs font-mono border-[#26262E] bg-[#111117] hover:bg-[#16161F] text-zinc-400 hover:text-white gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRunEvaluation("run")}
            disabled={isRunning || isSubmitting}
            className="h-8 text-xs font-mono border-[#ABDAC8]/40 bg-[#111614] text-[#ABDAC8] hover:bg-[#ABDAC8]/20 gap-1.5 font-bold cursor-pointer transition-all shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running (1.8s)..." : "RUN DIAGNOSTIC"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => handleRunEvaluation("submit")}
            disabled={isRunning || isSubmitting}
            className="h-8 text-xs font-mono bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] text-[#0A0A0F] hover:from-[#c2e8dc] hover:to-[#8cd4b9] font-extrabold gap-1.5 shadow-md shadow-[#ABDAC8]/20 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
            <span>{isSubmitting ? "Submitting..." : "SUBMIT"}</span>
          </Button>
        </div>
      </header>

      {/* Main Workspace: 40/60 Outer Split */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. LEFT PANEL (40%): Problem Spec, Rubric, AI Feedback & Live Preview     */}
        {/* ========================================================================= */}
        <div className="w-full md:w-[42%] border-r border-[#26262E] bg-[#0A0A0F] flex flex-col overflow-hidden">
          <Tabs
            value={activeLeftTab}
            onValueChange={setActiveLeftTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Tab Bar Header (4 Tabs) */}
            <div className="border-b border-[#26262E] px-3 bg-[#0E0E14] shrink-0">
              <TabsList className="h-10 bg-transparent p-0 gap-2 sm:gap-3 overflow-x-auto">
                <TabsTrigger
                  value="spec"
                  className="data-[state=active]:bg-[#16161F] data-[state=active]:text-[#ABDAC8] border border-transparent data-[state=active]:border-[#26262E] rounded-lg px-2.5 py-1 text-xs font-mono font-semibold"
                >
                  Problem Spec
                </TabsTrigger>
                <TabsTrigger
                  value="rubric"
                  className="data-[state=active]:bg-[#16161F] data-[state=active]:text-[#ABDAC8] border border-transparent data-[state=active]:border-[#26262E] rounded-lg px-2.5 py-1 text-xs font-mono font-semibold"
                >
                  Rubrics
                </TabsTrigger>
                <TabsTrigger
                  value="feedback"
                  className="data-[state=active]:bg-[#16161F] data-[state=active]:text-[#ABDAC8] border border-transparent data-[state=active]:border-[#26262E] rounded-lg px-2.5 py-1 text-xs font-mono font-semibold relative"
                >
                  <span>AI Feedback</span>
                  {evaluation && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] absolute -top-0.5 right-0 animate-pulse" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-[#16161F] data-[state=active]:text-[#ABDAC8] border border-transparent data-[state=active]:border-[#26262E] rounded-lg px-2.5 py-1 text-xs font-mono font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                    Live Preview
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Problem Spec */}
            <TabsContent
              value="spec"
              className="flex-1 overflow-y-auto p-5 m-0 text-sm space-y-4 select-text bg-[#0B0B10]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#26262E]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ABDAC8] font-bold block mb-1">
                      Challenge Requirements
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {challenge.title}
                    </h2>
                  </div>
                </div>
                <div className="whitespace-pre-line text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {challenge.spec_markdown}
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Rubric Criteria */}
            <TabsContent
              value="rubric"
              className="flex-1 overflow-y-auto p-5 m-0 space-y-4 select-text bg-[#0B0B10]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#26262E]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] font-mono">
                  Multi-Criteria Rubrics (100 Pts)
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">Sub-2.5s Automated Grading</span>
              </div>
              <div className="space-y-3">
                {challenge.rubric.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-xl bg-[#111117] border border-[#26262E] hover:border-[#ABDAC8]/40 transition-colors flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{r.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-[#ABDAC8] border-[#ABDAC8]/30 font-mono font-bold bg-[#111614]"
                      >
                        {r.weight}% WEIGHT
                      </Badge>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {r.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3: AI Diagnostic Feedback */}
            <TabsContent
              value="feedback"
              className="flex-1 overflow-y-auto p-5 m-0 space-y-4 select-text bg-[#0B0B10]"
            >
              {evaluation ? (
                <div className="space-y-4">
                  {/* Gate Failure Banner or Standard Score Card */}
                  {evaluation.gate_failed ? (
                    <div className="p-4 rounded-2xl border bg-rose-950/20 border-rose-500/40 text-rose-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                        <span className="font-bold text-sm text-rose-300">
                          Syntax / Structural Pre-Filter Failed
                        </span>
                      </div>
                      <p className="text-xs text-rose-200/90 leading-relaxed font-mono bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20">
                        {evaluation.overall_feedback}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Please resolve syntax and structural errors in your code before requesting full AI evaluation.
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`p-5 rounded-2xl border flex items-center justify-between ${
                        evaluation.passed
                          ? "bg-[#111614] border-[#4ADE80]/40 text-[#4ADE80]"
                          : "bg-[#161410] border-amber-500/40 text-amber-400"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {evaluation.passed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                          ) : (
                            <XCircle className="w-5 h-5 text-amber-400" />
                          )}
                          <span className="font-bold text-sm text-white">
                            {evaluation.passed ? "Verdict: PASSED" : "Attempt Completed"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300">
                          {evaluation.overall_feedback}
                        </p>
                      </div>
                      <div className="text-right pl-4">
                        <span className="text-3xl font-black font-mono text-[#ABDAC8]">
                          {evaluation.score}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">/100</span>
                      </div>
                    </div>
                  )}

                  {/* Rubric Breakdown List */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] font-mono">
                      Rubric Breakdown
                    </h4>
                    {evaluation.breakdown?.map((b: any, i: number) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#111117] border border-[#26262E] space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{b.name}</span>
                          <span className="font-mono text-[#ABDAC8] font-bold">{b.score}%</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{b.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-400 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-[#ABDAC8]/60 mb-2 animate-pulse" />
                  <p className="text-sm font-bold text-white">
                    No Evaluation Triggered Yet
                  </p>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Click <strong>RUN DIAGNOSTIC</strong> or <strong>SUBMIT</strong> to evaluate your solution in &lt;2.5s with multi-criteria AI rubrics.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Tab 4: Live Preview (Sandboxed Iframe Runtime) */}
            <TabsContent value="preview" className="flex-1 overflow-hidden p-0 m-0 bg-[#0B0B10]">
              <SandboxPreview
                html={code.html}
                css={code.css}
                js={code.js}
                onConsoleLog={handleConsoleLog}
                onClearLogs={handleClearLogs}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* ========================================================================= */}
        {/* 2. RIGHT PANEL (58%): Full-Width Code Editor + Docked Sandbox Console     */}
        {/* ========================================================================= */}
        <div
          id="right-workspace-panel"
          className="w-full md:w-[58%] flex flex-col overflow-hidden bg-[#07070A] relative"
        >
          {/* Upper Section: Monaco Code Editor */}
          <div className="flex-1 min-h-[140px] w-full overflow-hidden flex flex-col">
            <CodeEditor
              code={code}
              lockedFiles={lockedFiles}
              onChange={handleCodeChange}
              onRun={() => handleRunEvaluation("run")}
            />
          </div>

          {/* Resizable Divider Handle */}
          <div
            onMouseDown={startDraggingConsole}
            className="h-1.5 bg-[#16161F] hover:bg-[#ABDAC8]/50 active:bg-[#ABDAC8] cursor-row-resize transition-colors shrink-0 flex items-center justify-center group relative z-10"
            title="Drag to resize console"
          >
            <div className="w-10 h-0.5 rounded-full bg-zinc-600 group-hover:bg-[#ABDAC8] transition-colors" />
          </div>

          {/* Lower Section: Full-Width Sandbox Console (Docked below Code Editor) */}
          <div
            style={{ height: showConsole ? `${consoleHeight}px` : "28px" }}
            className="w-full shrink-0 transition-[height] duration-150 flex flex-col overflow-hidden bg-[#08080C] border-t border-[#26262E]"
          >
            <div className="flex flex-col h-full relative">
              {/* Collapse/Expand Toggle button */}
              <button
                onClick={() => setShowConsole(!showConsole)}
                className="absolute top-1.5 right-16 z-10 text-zinc-400 hover:text-white text-[10px] flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#111117] border border-[#26262E] transition-colors cursor-pointer"
                title={showConsole ? "Collapse Console" : "Expand Console"}
              >
                {showConsole ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5" />
                )}
              </button>

              {showConsole ? (
                <ConsoleOutput logs={logs} onClear={handleClearLogs} />
              ) : (
                <div
                  onClick={() => setShowConsole(true)}
                  className="h-7 bg-[#0E0E14] px-3 flex items-center justify-between cursor-pointer text-[11px] text-zinc-400 hover:text-white select-none"
                >
                  <span className="flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" />
                    <span className="font-semibold uppercase tracking-wider text-zinc-200">
                      Execution Console
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#16161F] text-[#ABDAC8] font-bold">
                      {logs.length} logs
                    </span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Click to expand
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
