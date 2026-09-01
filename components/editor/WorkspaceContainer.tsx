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

  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [activeLeftTab, setActiveLeftTab] = useState<string>("spec");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleHeight, setConsoleHeight] = useState(200);
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
      setLogs([]);
      setEvaluation(null);
    }
  };

  const handleRunEvaluation = async (attemptType: "run" | "submit" = "run") => {
    if (attemptType === "run") {
      setIsRunning(true);
    } else {
      setIsSubmitting(true);
    }

    try {
      // Add trigger log to console
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "info",
          message: `[Sandbox Engine] Compiling & running ${attemptType.toUpperCase()} test suite...`,
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
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: data.evaluation.passed ? "info" : "warn",
            message: `[AI Judge] Evaluation Complete: Score ${data.evaluation.score}/100 — ${
              data.evaluation.passed ? "PASSED" : "NEEDS REFINEMENT"
            }`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
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
    <div className="flex flex-col h-screen w-screen bg-[#07070A] text-foreground overflow-hidden select-none">
      {/* Top Workspace Navigation Bar */}
      <header className="h-12 border-b border-[#26262E] bg-[#0C0C12] px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/challenges"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Challenges</span>
          </Link>
          <div className="h-4 w-[1px] bg-[#26262E]" />
          <span className="font-semibold text-xs text-foreground tracking-tight">
            {challenge.title}
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] uppercase font-mono ${
              challenge.difficulty === "easy"
                ? "text-emerald-400 border-emerald-500/30"
                : challenge.difficulty === "medium"
                ? "text-amber-400 border-amber-500/30"
                : "text-rose-400 border-rose-500/30"
            }`}
          >
            {challenge.difficulty}
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-mono border-[#26262E] text-muted-foreground hidden sm:inline-flex"
          >
            {challenge.track}
          </Badge>
        </div>

        {/* Action Controls (Reset, Run, Submit) */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 text-xs border-[#26262E] bg-[#111117] hover:bg-[#1A1A22] text-[#9CA3AF] hover:text-[#F5F5F7] gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRunEvaluation("run")}
            disabled={isRunning || isSubmitting}
            className="h-8 text-xs border-[#ABDAC8]/40 bg-[#111117] text-[#ABDAC8] hover:bg-[#ABDAC8]/10 gap-1.5 font-medium"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running..." : "RUN"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => handleRunEvaluation("submit")}
            disabled={isRunning || isSubmitting}
            className="h-8 text-xs bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 font-semibold gap-1.5 shadow-sm shadow-[#ABDAC8]/20"
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
        <div className="w-full md:w-[40%] border-r border-[#26262E] bg-[#09090E] flex flex-col overflow-hidden">
          <Tabs
            value={activeLeftTab}
            onValueChange={setActiveLeftTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Tab Bar Header (4 Tabs) */}
            <div className="border-b border-[#26262E] px-3 bg-[#0C0C12] shrink-0">
              <TabsList className="h-10 bg-transparent p-0 gap-3 sm:gap-4 overflow-x-auto">
                <TabsTrigger
                  value="spec"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ABDAC8] border-b-2 border-transparent data-[state=active]:border-[#ABDAC8] rounded-none px-2 text-xs font-medium"
                >
                  Problem Spec
                </TabsTrigger>
                <TabsTrigger
                  value="rubric"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ABDAC8] border-b-2 border-transparent data-[state=active]:border-[#ABDAC8] rounded-none px-2 text-xs font-medium"
                >
                  Rubric Criteria
                </TabsTrigger>
                <TabsTrigger
                  value="feedback"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ABDAC8] border-b-2 border-transparent data-[state=active]:border-[#ABDAC8] rounded-none px-2 text-xs font-medium relative"
                >
                  <span>AI Feedback</span>
                  {evaluation && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ABDAC8] absolute -top-0.5 right-0" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ABDAC8] border-b-2 border-transparent data-[state=active]:border-[#ABDAC8] rounded-none px-2 text-xs font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Preview
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Problem Spec */}
            <TabsContent
              value="spec"
              className="flex-1 overflow-y-auto p-5 m-0 text-sm space-y-4 select-text"
            >
              <div className="prose prose-invert prose-sm max-w-none">
                <h2 className="text-base font-bold text-foreground mb-2">{challenge.title}</h2>
                <div className="whitespace-pre-line text-muted-foreground text-xs leading-relaxed">
                  {challenge.spec_markdown}
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Rubric Criteria */}
            <TabsContent
              value="rubric"
              className="flex-1 overflow-y-auto p-5 m-0 space-y-3 select-text"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Grading Rubric
              </h3>
              <div className="space-y-2.5">
                {challenge.rubric.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-lg bg-[#11111A] border border-[#26262E] flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{r.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-[#ABDAC8] border-[#ABDAC8]/30 font-mono"
                      >
                        {r.weight}%
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {r.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3: AI Diagnostic Feedback */}
            <TabsContent
              value="feedback"
              className="flex-1 overflow-y-auto p-5 m-0 space-y-4 select-text"
            >
              {evaluation ? (
                <div className="space-y-4">
                  {/* Score Card */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      evaluation.passed
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                        : "bg-amber-950/20 border-amber-500/40 text-amber-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {evaluation.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-400" />
                        )}
                        <span className="font-bold text-sm">
                          {evaluation.passed ? "Submission Passed!" : "Attempt Completed"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {evaluation.overall_feedback}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold font-mono">{evaluation.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>

                  {/* Rubric Breakdown List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Rubric Breakdown
                    </h4>
                    {evaluation.breakdown?.map((b: any, i: number) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#11111A] border border-[#26262E] space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">{b.name}</span>
                          <span className="font-mono text-[#ABDAC8] font-semibold">{b.score}%</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{b.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-[#ABDAC8]/40 mb-2" />
                  <p className="text-xs font-medium text-foreground/80">
                    No Evaluation Performed Yet
                  </p>
                  <p className="text-[11px] max-w-xs mx-auto">
                    Click <strong>RUN</strong> to test your code live in the sandbox and trigger instant
                    AI rubric analysis.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Tab 4: Live Preview (Sandboxed Iframe Runtime) */}
            <TabsContent value="preview" className="flex-1 overflow-hidden p-0 m-0">
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
        {/* 2. RIGHT PANEL (60%): Full-Width Code Editor + Docked Sandbox Console     */}
        {/* ========================================================================= */}
        <div
          id="right-workspace-panel"
          className="w-full md:w-[60%] flex flex-col overflow-hidden bg-[#07070A] relative"
        >
          {/* Upper Section: Monaco Code Editor (Full width of the 60% column) */}
          <div className="flex-1 min-h-[140px] w-full overflow-hidden flex flex-col">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onRun={() => handleRunEvaluation("run")}
            />
          </div>

          {/* Resizable Divider Handle */}
          <div
            onMouseDown={startDraggingConsole}
            className="h-1 bg-[#26262E] hover:bg-[#ABDAC8]/50 active:bg-[#ABDAC8] cursor-row-resize transition-colors shrink-0 flex items-center justify-center group relative z-10"
            title="Drag to resize console"
          >
            <div className="w-8 h-0.5 rounded-full bg-[#3C3C3C] group-hover:bg-[#ABDAC8] transition-colors" />
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
                className="absolute top-1.5 right-16 z-10 text-muted-foreground hover:text-foreground text-[10px] flex items-center gap-0.5 px-1 rounded hover:bg-[#1A1A22] transition-colors"
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
                  className="h-7 bg-[#0E0E14] px-3 flex items-center justify-between cursor-pointer text-[11px] text-muted-foreground hover:text-foreground select-none"
                >
                  <span className="flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" />
                    <span className="font-semibold uppercase tracking-wider text-foreground/80">
                      Sandbox Console
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                      {logs.length} logs
                    </span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
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
