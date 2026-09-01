"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Terminal,
  FileCode2,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Lock,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Check,
  Zap,
  GitBranch,
  Split,
  Eye,
  Sliders,
  Cpu,
  Database,
  Server,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CodeEditorHeroShowcase() {
  const [activeFile, setActiveFile] = useState<"frontend" | "backend" | "database">("frontend");
  const [isAnnual, setIsAnnual] = useState(true);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalScore, setEvalScore] = useState(96);

  // 3D Tilt Card Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Tilt Animation Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      scale: 1.01,
      duration: 0.35,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  const handleRunEvaluation = () => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvalScore(98);
    }, 1400);
  };

  return (
    <section className="mt-4 pb-16 md:pb-24 relative" style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0B0B10] border border-[#26262E] shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(171,218,200,0.08)] relative overflow-hidden text-left transition-colors duration-300 hover:border-[#ABDAC8]/50 will-change-transform cursor-default"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Mouse Cursor Spotlight Glow */}
        <div
          ref={glowRef}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            background: "radial-gradient(circle, rgba(171,218,200,0.22) 0%, rgba(123,196,168,0.08) 50%, transparent 70%)",
            left: "50%",
            top: "50%",
          }}
        />

        {/* ========================================================================= */}
        {/* 1. TOP MAC/VS CODE WINDOW HEADER BAR */}
        {/* ========================================================================= */}
        <div className="border-b border-[#26262E] bg-[#0A0A0F] px-4 py-2.5 flex items-center justify-between relative z-20 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#F87171] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#FBBF24] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#4ADE80] opacity-80" />
            </div>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500">
              <span className="text-zinc-400">staqor-workspace</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span>src</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span>
                {activeFile === "frontend"
                  ? "frontend"
                  : activeFile === "backend"
                  ? "backend-api"
                  : "database"}
              </span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-[#ABDAC8] font-bold">
                {activeFile === "frontend"
                  ? "PricingCard.tsx"
                  : activeFile === "backend"
                  ? "rate_limiter.ts"
                  : "schema_queries.sql"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block">
              Multi-Domain IDE v1.0
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#111614] border border-[#ABDAC8]/30 text-[#ABDAC8] text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span>DEVELOPMENT WORKSPACE</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN 3-PANEL IDE BODY */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 min-h-[460px] bg-[#0E0E14] relative z-20">
          {/* Panel A: Explorer Sidebar (25% on desktop) */}
          <div className="hidden md:flex md:col-span-3 border-r border-[#26262E] bg-[#0A0A0F] flex-col justify-between p-3 font-mono text-xs text-zinc-400">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 px-2 pb-2">
                EXPLORER: DOMAINS
              </div>

              {/* Folder: Development Domains */}
              <div className="space-y-0.5 pt-1">
                <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[11px] font-semibold">
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                  <FolderOpen className="w-3.5 h-3.5 text-[#ABDAC8]" />
                  <span>src/domains</span>
                </div>

                {/* File Items Across Development Disciplines */}
                <div className="pl-4 space-y-0.5">
                  {/* Frontend */}
                  <button
                    onClick={() => setActiveFile("frontend")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-[11px] transition-all cursor-pointer ${
                      activeFile === "frontend"
                        ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">PricingCard.tsx (UI)</span>
                  </button>

                  {/* Backend */}
                  <button
                    onClick={() => setActiveFile("backend")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-[11px] transition-all cursor-pointer ${
                      activeFile === "backend"
                        ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                    }`}
                  >
                    <Server className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">rate_limiter.ts (API)</span>
                  </button>

                  {/* Database */}
                  <button
                    onClick={() => setActiveFile("database")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-[11px] transition-all cursor-pointer ${
                      activeFile === "database"
                        ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">queries.sql (Data)</span>
                  </button>
                </div>

                {/* Folder: Rubrics */}
                <div className="flex items-center gap-1.5 px-2 py-1 pt-2 text-zinc-500 text-[11px]">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  <Folder className="w-3.5 h-3.5 text-zinc-500" />
                  <span>groq_rubrics/</span>
                </div>
              </div>
            </div>

            {/* Bottom Scaffolding Lock indicator */}
            <div className="p-2.5 rounded-xl bg-[#111117] border border-[#26262E] text-[10px] space-y-1">
              <div className="flex items-center gap-1.5 text-[#ABDAC8] font-bold">
                <Lock className="w-3 h-3" /> Scaffolding Protected
              </div>
              <p className="text-zinc-500 text-[9px] leading-tight">
                Contracts locked across Frontend, Backend &amp; Database challenges.
              </p>
            </div>
          </div>

          {/* Panel B: Monaco Code Editor Canvas (45% on desktop) */}
          <div className="col-span-12 md:col-span-5 flex flex-col border-r border-[#26262E] bg-[#0E0E14]">
            {/* Editor File Tab */}
            <div className="h-10 border-b border-[#26262E] bg-[#0A0A0F] flex items-center px-2 text-xs font-mono">
              <div className="px-3.5 py-1.5 rounded-t-lg font-semibold flex items-center gap-1.5 bg-[#0E0E14] text-[#ABDAC8] border-t-2 border-[#ABDAC8] border-x border-[#26262E]">
                {activeFile === "frontend" && <Code2 className="w-3.5 h-3.5 text-cyan-400" />}
                {activeFile === "backend" && <Server className="w-3.5 h-3.5 text-amber-400" />}
                {activeFile === "database" && <Database className="w-3.5 h-3.5 text-purple-400" />}
                <span>
                  {activeFile === "frontend"
                    ? "PricingCard.tsx"
                    : activeFile === "backend"
                    ? "rate_limiter.ts"
                    : "schema_queries.sql"}
                </span>
              </div>
            </div>

            {/* Monaco Syntax Code Canvas with Line Numbers */}
            <div className="p-4 font-mono text-[11px] text-zinc-300 bg-[#0E0E14] flex-1 overflow-x-auto leading-relaxed border-b border-[#26262E]">
              <div className="flex gap-3">
                {/* Line Numbers Gutter */}
                <div className="select-none text-zinc-600 text-right pr-2 border-r border-zinc-800/80 space-y-0.5">
                  {[...Array(13)].map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Syntax Code Body */}
                <div className="space-y-0.5 text-zinc-300 flex-1">
                  {activeFile === "frontend" && (
                    <>
                      <div>
                        <span className="text-purple-400">import</span> &#123; useState &#125;{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-emerald-400">&apos;react&apos;</span>;
                      </div>
                      <div>
                        <span className="text-purple-400">export function</span>{" "}
                        <span className="text-yellow-300 font-bold">PricingCard</span>() &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">const</span> [isAnnual, setIsAnnual] ={" "}
                        <span className="text-cyan-400">useState</span>(
                        <span className="text-amber-400">{isAnnual ? "true" : "false"}</span>);
                      </div>
                      <div className="pl-4 pt-1">
                        <span className="text-purple-400">return</span> (
                      </div>
                      <div className="pl-8">
                        &lt;<span className="text-cyan-400">div</span>{" "}
                        <span className="text-[#ABDAC8]">className</span>=
                        <span className="text-emerald-400">&quot;pricing-card border-mint&quot;</span>&gt;
                      </div>
                      <div className="pl-12">
                        &lt;<span className="text-cyan-400">h3</span>&gt;Pro Engineer Plan&lt;/
                        <span className="text-cyan-400">h3</span>&gt;
                      </div>
                      <div className="pl-12">
                        &lt;<span className="text-cyan-400">span</span>{" "}
                        <span className="text-[#ABDAC8]">className</span>=
                        <span className="text-emerald-400">&quot;price&quot;</span>&gt;
                      </div>
                      <div className="pl-16 text-[#ABDAC8] font-bold">
                        $&#123;isAnnual ? 15 : 19&#125; / month
                      </div>
                      <div className="pl-12">&lt;/<span className="text-cyan-400">span</span>&gt;</div>
                      <div className="pl-8">&lt;/<span className="text-cyan-400">div</span>&gt;</div>
                      <div className="pl-4">);</div>
                      <div>&#125;</div>
                    </>
                  )}

                  {activeFile === "backend" && (
                    <>
                      <div>
                        <span className="text-purple-400">import</span> &#123; Request, Response, NextFunction &#125;{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-emerald-400">&apos;express&apos;</span>;
                      </div>
                      <div>
                        <span className="text-purple-400">export function</span>{" "}
                        <span className="text-yellow-300 font-bold">tokenBucketLimiter</span>(capacity = 60) &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">return async</span> (req: Request, res: Response, next: NextFunction) =&gt; &#123;
                      </div>
                      <div className="pl-8">
                        <span className="text-purple-400">const</span> tokens = <span className="text-cyan-400">await</span> redis.get(`rate:$&#123;req.ip&#125;`);
                      </div>
                      <div className="pl-8">
                        <span className="text-purple-400">if</span> (tokens &lt;= 0) &#123;
                      </div>
                      <div className="pl-12">
                        <span className="text-purple-400">return</span> res.<span className="text-cyan-400">status</span>(429).<span className="text-cyan-400">json</span>(&#123; error: &quot;Rate limit exceeded&quot; &#125;);
                      </div>
                      <div className="pl-8">&#125;</div>
                      <div className="pl-8">
                        <span className="text-cyan-400">await</span> redis.decr(`rate:$&#123;req.ip&#125;`);
                      </div>
                      <div className="pl-8">next();</div>
                      <div className="pl-4">&#125;;</div>
                      <div>&#125;</div>
                    </>
                  )}

                  {activeFile === "database" && (
                    <>
                      <div>
                        <span className="text-purple-400">-- High-performance transactional user analytics index</span>
                      </div>
                      <div>
                        <span className="text-yellow-300 font-bold">CREATE INDEX CONCURRENTLY</span> idx_submissions_user
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">ON</span> challenge_submissions (user_id, created_at <span className="text-amber-400">DESC</span>);
                      </div>
                      <div className="pt-1">
                        <span className="text-yellow-300 font-bold">SELECT</span> u.id, u.username,
                      </div>
                      <div className="pl-4">
                        <span className="text-cyan-400">COUNT</span>(s.id) <span className="text-purple-400">FILTER</span> (<span className="text-purple-400">WHERE</span> s.verdict = <span className="text-emerald-400">&apos;PASSED&apos;</span>) <span className="text-purple-400">AS</span> solved_count
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">FROM</span> users u
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">LEFT JOIN</span> challenge_submissions s <span className="text-purple-400">ON</span> s.user_id = u.id
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">GROUP BY</span> u.id;
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Inline AI Code Lens / Code Annotation Pill */}
              <div className="mt-4 p-2 rounded-lg bg-[#16161F] border border-[#ABDAC8]/30 flex items-center justify-between text-[10px]">
                <span className="text-[#ABDAC8] flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" /> Groq LPU Judge: 98/100 (Passed in 1.8s)
                </span>
                <span className="text-zinc-400 font-mono">
                  {activeFile === "frontend"
                    ? "Zero Layout Shifts"
                    : activeFile === "backend"
                    ? "Safe Concurrency"
                    : "Zero Full Table Scan"}
                </span>
              </div>
            </div>

            {/* Terminal Drawer Bottom Bar */}
            <div className="p-2.5 bg-[#0A0A0F] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" /> Execution Sandbox Console
              </span>
              <button
                onClick={handleRunEvaluation}
                disabled={isEvaluating}
                className="px-3 py-1 rounded-md bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[11px] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                {isEvaluating ? "GRADING (1.8s)..." : "RUN DIAGNOSTIC"}
              </button>
            </div>
          </div>

          {/* Panel C: Live Interactive Sandbox Preview (30% on desktop) */}
          <div className="col-span-12 md:col-span-4 p-5 bg-[#0B0B10] flex flex-col justify-between">
            <div>
              {/* Preview Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#26262E] mb-4">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#ABDAC8]" />
                  <span className="text-xs font-mono font-bold text-white">LIVE PREVIEW</span>
                </div>

                {/* Viewport controls */}
                <div className="flex items-center gap-1 bg-[#111117] p-0.5 rounded-lg border border-[#26262E]">
                  <button
                    onClick={() => setViewport("desktop")}
                    className={`p-1 rounded ${viewport === "desktop" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                  >
                    <Monitor className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewport("tablet")}
                    className={`p-1 rounded ${viewport === "tablet" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewport("mobile")}
                    className={`p-1 rounded ${viewport === "mobile" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Interactive Component Live Output */}
              <div className="p-4 rounded-2xl bg-[#111117] border border-[#26262E] text-center shadow-inner">
                {activeFile === "frontend" && (
                  <>
                    {/* Billing toggle switch */}
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16161F] border border-[#26262E] text-[10px] font-mono">
                      <span className="text-zinc-400">Monthly</span>
                      <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${
                          isAnnual ? "bg-[#ABDAC8]" : "bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-[#0A0A0F] transition-transform ${
                            isAnnual ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="text-white font-bold">
                        Annual <span className="text-[#ABDAC8] text-[9px] font-mono px-1 py-0.5 bg-[#ABDAC8]/15 rounded">-20%</span>
                      </span>
                    </div>

                    {/* Rendered Live Card */}
                    <div className="p-4 rounded-xl bg-[#111614] border-2 border-[#ABDAC8]/40 text-left relative overflow-hidden shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono font-bold text-[#ABDAC8] bg-[#ABDAC8]/15 px-2 py-0.5 rounded-full">
                          SOFTWARE ENGINEER
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">Live Component</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Development Pro Plan</h4>
                      <div className="text-2xl font-black text-white mb-2 font-mono flex items-baseline gap-1">
                        <span>${isAnnual ? "15" : "19"}</span>
                        <span className="text-xs text-zinc-400 font-normal">/ mo</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mb-3">
                        Sub-2.5s Groq AI evaluation &amp; verified candidate sandbox link.
                      </p>
                      <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-full py-1.5 text-xs font-bold rounded-lg bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-all cursor-pointer"
                      >
                        Click to Toggle State
                      </button>
                    </div>
                  </>
                )}

                {activeFile === "backend" && (
                  <div className="p-4 rounded-xl bg-[#111614] border border-amber-500/40 text-left space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5" /> Express 200 OK
                      </span>
                      <span className="text-[10px] text-zinc-400">12ms Latency</span>
                    </div>
                    <p className="text-zinc-300 text-[11px]">
                      Rate limiter successfully throttled 140 bursts / sec with zero memory leaks.
                    </p>
                    <div className="p-2 rounded bg-[#0A0A0F] text-[10px] text-zinc-400">
                      <code>X-RateLimit-Remaining: 58/60</code>
                    </div>
                  </div>
                )}

                {activeFile === "database" && (
                  <div className="p-4 rounded-xl bg-[#111614] border border-purple-500/40 text-left space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5" /> Query Planner
                      </span>
                      <span className="text-[10px] text-[#4ADE80]">Index Scan (~0.4ms)</span>
                    </div>
                    <p className="text-zinc-300 text-[11px]">
                      PostgreSQL query planner executed optimal Index Only Scan with zero seq scan.
                    </p>
                    <div className="p-2 rounded bg-[#0A0A0F] text-[10px] text-[#4ADE80]">
                      <code>Cost: 0.28..4.29 rows=1 (PASSED)</code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Score verdict chip */}
            <div className="pt-3 border-t border-[#26262E] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#4ADE80] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" /> VERDICT: PASSED
              </span>
              <span className="text-[#ABDAC8] font-bold">{evalScore}/100</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. IDE BOTTOM STATUS BAR */}
        {/* ========================================================================= */}
        <div className="px-4 py-1.5 bg-[#0A0A0F] border-t border-[#26262E] flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 gap-2 relative z-20">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-300">
              <GitBranch className="w-3 h-3 text-[#ABDAC8]" /> main
            </span>
            <span className="text-[#4ADE80] flex items-center gap-1">
              <Check className="w-3 h-3 text-[#4ADE80]" /> 0 errors, 0 warnings
            </span>
            <span className="text-zinc-500 hidden sm:inline-block">
              Groq LPU: &lt;2.5s
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Full Development Scope</span>
            <span className="text-zinc-500">UTF-8</span>
            <span className="text-[#ABDAC8] font-bold">100% In-Browser</span>
          </div>
        </div>
      </div>
    </section>
  );
}
