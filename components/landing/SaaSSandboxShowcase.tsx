"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Zap,
  Play,
  Share2,
  ExternalLink,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CHALLENGES = [
  {
    id: "pricing",
    label: "Pricing Switcher",
    track: "HTML & CSS",
    difficulty: "EASY",
    score: 96,
    time: "1.8s",
    title: "Interactive Pricing Table with Annual Toggle",
    desc: "Build a responsive 3-tier card matrix with an annual switch that updates prices dynamically with zero layout shifts.",
    rubricDesign: "35/35%",
    rubricLogic: "34/35%",
    rubricQuality: "27/30%",
    code: {
      html: `<!-- 3-Tier Responsive Pricing Matrix -->
<div class="pricing-container">
  <div class="billing-toggle">
    <span>Monthly</span>
    <button id="toggleBtn" class="switch active" aria-label="Toggle annual billing"></button>
    <span>Annual <span class="badge">Save 20%</span></span>
  </div>

  <div class="pricing-grid">
    <div class="card card-popular">
      <div class="tag">MOST POPULAR</div>
      <h3 class="tier-title">Pro Candidate</h3>
      <p class="desc">Unlimited Groq AI evaluations & verified portfolio.</p>
      <div class="price-wrap">
        <span class="currency">$</span>
        <span id="priceVal" class="amount">15</span>
        <span class="period">/month</span>
      </div>
      <button class="cta-btn">Start 14-Day Trial</button>
    </div>
  </div>
</div>`,
      css: `/* Responsive Grid & 3D Tactile Buttons */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.card-popular {
  background: #111614;
  border: 2px solid #ABDAC8;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(171,218,200,0.15);
}

.cta-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ABDAC8;
  color: #0A0A0F;
  font-weight: 700;
  border-radius: 0.75rem;
  cursor: pointer;
}`,
      js: `// Annual Billing Toggle State Handler
const toggleBtn = document.getElementById('toggleBtn');
const priceVal = document.getElementById('priceVal');

let isAnnual = true;

toggleBtn.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggleBtn.classList.toggle('active', isAnnual);
  priceVal.textContent = isAnnual ? '15' : '19';
  console.log('[Event] Switched billing cycle to:', isAnnual ? 'Annual' : 'Monthly');
});`,
    },
  },
  {
    id: "kanban",
    label: "Kanban Task Board",
    track: "JS / DOM",
    difficulty: "MEDIUM",
    score: 94,
    time: "2.1s",
    title: "Drag-and-Drop Task Board with State Persistence",
    desc: "Implement HTML5 Drag and Drop event delegation to reorder sprint tasks across To Do, In Progress, and Done columns.",
    rubricDesign: "34/35%",
    rubricLogic: "35/35%",
    rubricQuality: "25/30%",
    code: {
      html: `<!-- Kanban Column Layout -->
<div class="kanban-board">
  <div class="column" id="col-todo" data-status="todo">
    <h3>To Do</h3>
    <div class="card" draggable="true" id="task-1">
      <span class="badge">UI Design</span>
      <p>Build accessible modal dialog</p>
    </div>
  </div>
  <div class="column" id="col-done" data-status="done">
    <h3>Done</h3>
  </div>
</div>`,
      css: `.kanban-board {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.column {
  background: #111117;
  border: 1px solid #26262E;
  border-radius: 0.75rem;
  padding: 1rem;
  min-height: 180px;
}
.card {
  background: #16161F;
  border: 1px solid #ABDAC8/40;
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: grab;
}`,
      js: `// Drag and Drop Event Listeners
const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');

cards.forEach(card => {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', card.id);
    console.log('[Drag] Started dragging:', card.id);
  });
});`,
    },
  },
  {
    id: "virtual-scroll",
    label: "Virtual Grid",
    track: "React Components",
    difficulty: "HARD",
    score: 98,
    time: "2.3s",
    title: "Virtualized Infinite Scroll Product Grid",
    desc: "Build a windowed product list that recycles DOM elements using IntersectionObserver to maintain 60 FPS under 10,000 items.",
    rubricDesign: "35/35%",
    rubricLogic: "35/35%",
    rubricQuality: "28/30%",
    code: {
      html: `<!-- React Windowing Scaffolding -->
<div id="root">
  <div class="virtual-viewport" style="height: 320px; overflow-y: auto;">
    <div class="virtual-spacer" style="height: 12000px; position: relative;">
      <!-- Recycled DOM Item Tiles Rendered Here -->
    </div>
  </div>
</div>`,
      css: `.virtual-viewport {
  position: relative;
  border: 1px solid #26262E;
  border-radius: 0.75rem;
  background: #0B0B10;
}
.virtual-item {
  position: absolute;
  left: 0; right: 0;
  height: 60px;
  border-bottom: 1px solid #26262E;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`,
      js: `// Custom Virtual List Hook
function useVirtualList(itemCount, itemHeight, viewportHeight) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(itemCount, Math.ceil((scrollTop + viewportHeight) / itemHeight) + 2);
  return { startIndex, endIndex };
}`,
    },
  },
];

export function SaaSSandboxShowcase() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const activeChallenge = CHALLENGES[challengeIdx];

  const [editorTab, setEditorTab] = useState<"html" | "css" | "js">("html");
  const [leftTab, setLeftTab] = useState<"preview" | "spec" | "rubric" | "feedback">("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isAnnual, setIsAnnual] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalProgress, setEvalProgress] = useState(100);
  const [currentScore, setCurrentScore] = useState(activeChallenge.score);

  const [logs, setLogs] = useState<string[]>([
    "[Sandbox] Client iframe initialized with 2000ms loop-killer.",
    "[Pre-Filter] Syntax & Scaffolding check: PASSED (0.02s).",
    "[Groq LPU] Ready for diagnostic Run or official Submit.",
  ]);

  const handleRun = (type: "run" | "submit") => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    setEvalProgress(15);
    setLogs((prev) => [
      ...prev,
      `[Trigger] ${type.toUpperCase()} initiated on: ${activeChallenge.title.slice(0, 32)}...`,
      `[Pre-Filter] Syntax tree verification: PASSED (0.02s)`,
    ]);

    setTimeout(() => {
      setEvalProgress(65);
      setLogs((prev) => [
        ...prev,
        `[Groq LPU] Analyzing visual fidelity, DOM events, and semantic cleanliness...`,
      ]);
    }, 600);

    setTimeout(() => {
      setIsEvaluating(false);
      setEvalProgress(100);
      const newScore = type === "submit" ? activeChallenge.score : activeChallenge.score - 2;
      setCurrentScore(newScore);
      setLeftTab("feedback");
      setLogs((prev) => [
        ...prev,
        `[Groq LPU] Evaluation Complete in ${type === "submit" ? "2.1s" : "1.8s"}. Score: ${newScore}/100 PASSED.`,
      ]);
    }, 1500);
  };

  return (
    <section className="pb-16 md:pb-24 relative">
      <div className="relative max-w-5xl mx-auto">
        {/* Floating AI Verdict Card (SaaS Style Pill) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 lg:mb-0 lg:absolute lg:-top-9 lg:-right-4 z-30 w-full lg:w-80 p-4 rounded-2xl bg-[#16161F]/95 backdrop-blur-xl border border-[#ABDAC8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(171,218,200,0.15)] text-left transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#4ADE80]">
                SCORE {currentScore}/100 • PASSED
              </span>
            </div>
            <Badge variant="outline" className="text-[9px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 py-0 px-2 bg-[#111614]">
              {activeChallenge.time} INFERENCE
            </Badge>
          </div>

          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>Groq AI Multi-Criteria Rubric</span>
          </h4>

          <div className="space-y-1.5 text-[11px] font-mono text-zinc-400">
            <div className="flex justify-between items-center">
              <span>Layout Fidelity:</span>
              <span className="text-[#ABDAC8] font-bold">{activeChallenge.rubricDesign}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>DOM &amp; State Logic:</span>
              <span className="text-[#ABDAC8] font-bold">{activeChallenge.rubricLogic}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Clean Semantics:</span>
              <span className="text-[#ABDAC8] font-bold">{activeChallenge.rubricQuality}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#26262E] flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="text-[#4ADE80] flex items-center gap-1">
              <Check className="w-3 h-3 text-[#4ADE80]" /> Zero-Token Gate
            </span>
            <span className="text-[#ABDAC8]">Locked Scaffolding</span>
          </div>
        </motion.div>

        {/* Main Sleek SaaS IDE Window Frame */}
        <div className="rounded-3xl border border-[#26262E] bg-[#111117] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(171,218,200,0.08)] overflow-hidden text-left relative">
          {/* Top macOS Style Window Header */}
          <div className="border-b border-[#26262E] bg-[#0E0E14] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* Traffic Light Dots & Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#F87171] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#FBBF24] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#4ADE80] opacity-80" />
              </div>

              {/* URL Address Bar */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161F] border border-[#26262E] text-[11px] font-mono text-zinc-400">
                <Lock className="w-3 h-3 text-[#ABDAC8]" />
                <span>staqor.dev/sandbox/{activeChallenge.id}</span>
              </div>
            </div>

            {/* Challenge Switcher Pills */}
            <div className="flex items-center gap-1 bg-[#16161F] p-1 rounded-xl border border-[#26262E]">
              {CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setChallengeIdx(idx);
                    setCurrentScore(ch.score);
                    setLogs((prev) => [
                      ...prev,
                      `[Workspace] Switched challenge to: ${ch.title}`,
                    ]);
                  }}
                  className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                    challengeIdx === idx
                      ? "bg-[#ABDAC8] text-[#0A0A0F] font-extrabold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 bg-[#111614] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                LIVE SANDBOX
              </Badge>
            </div>
          </div>

          {/* Split Body: 45% Interactive Preview / 55% Monaco Tabs */}
          <div className="grid md:grid-cols-12 min-h-[480px]">
            {/* Left 45% (Live Preview & Specs) */}
            <div className="md:col-span-5 p-5 border-r border-[#26262E] bg-[#0F0F16]/80 flex flex-col justify-between">
              <div>
                {/* Tab Switcher */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#111117] border border-[#26262E] rounded-xl mb-4 text-[11px] font-mono">
                  {(["preview", "spec", "rubric", "feedback"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLeftTab(tab)}
                      className={`py-1.5 rounded-lg capitalize text-center transition-all cursor-pointer ${
                        leftTab === tab
                          ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E] shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Live Interactive Preview */}
                {leftTab === "preview" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#26262E]/70">
                      <span className="text-xs font-mono text-zinc-400">Interactive Canvas</span>
                      <div className="flex items-center gap-1 bg-[#111117] p-0.5 rounded-lg border border-[#26262E]">
                        <button
                          onClick={() => setViewport("desktop")}
                          className={`p-1.5 rounded ${viewport === "desktop" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewport("tablet")}
                          className={`p-1.5 rounded ${viewport === "tablet" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                        >
                          <Tablet className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewport("mobile")}
                          className={`p-1.5 rounded ${viewport === "mobile" ? "text-[#ABDAC8] bg-[#16161F]" : "text-zinc-500"}`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Interactive UI Card Simulation inside canvas */}
                    <div className="p-4 rounded-2xl bg-[#0B0B10] border border-[#26262E] text-center shadow-inner">
                      {/* Annual billing switch */}
                      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#16161F] border border-[#26262E] text-[11px] font-mono">
                        <span className="text-zinc-400">Monthly</span>
                        <button
                          onClick={() => {
                            setIsAnnual(!isAnnual);
                            setLogs((prev) => [
                              ...prev,
                              `[DOM Event] User toggled billing: ${!isAnnual ? "Annual ($15/mo)" : "Monthly ($19/mo)"}`,
                            ]);
                          }}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                            isAnnual ? "bg-[#ABDAC8]" : "bg-zinc-700"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-[#0A0A0F] transition-transform ${
                              isAnnual ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className="text-white font-bold">
                          Annual <span className="text-[#ABDAC8] text-[9px] font-mono px-1 py-0.5 bg-[#ABDAC8]/15 rounded">Save 20%</span>
                        </span>
                      </div>

                      {/* Interactive Tier Card */}
                      <div className="p-5 rounded-2xl bg-[#111614] border-2 border-[#ABDAC8]/50 shadow-xl text-left relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#ABDAC8] bg-[#ABDAC8]/15 px-2 py-0.5 rounded-full">
                            MOST POPULAR
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">Zero Layout Shift</span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-1">Pro Candidate Plan</h4>
                        <div className="text-3xl font-extrabold text-white mb-2 font-mono flex items-baseline gap-1">
                          <span>${isAnnual ? "15" : "19"}</span>
                          <span className="text-xs text-zinc-400 font-normal">/ month</span>
                        </div>
                        <p className="text-xs text-zinc-300 mb-4">Unlimited Groq AI evaluations &amp; verified portfolio.</p>
                        <button
                          onClick={() => handleRun("run")}
                          className="w-full py-2 text-xs font-bold rounded-xl bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-all cursor-pointer shadow-md"
                        >
                          Test Diagnostic Run
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Spec */}
                {leftTab === "spec" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono text-[#4ADE80] border-[#4ADE80]/30">
                        {activeChallenge.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                        {activeChallenge.track}
                      </Badge>
                      <span className="text-[11px] font-mono text-zinc-400">Free Quota: 5 Runs</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">{activeChallenge.desc}</p>
                    <div className="p-3.5 rounded-xl bg-[#16161F] border border-[#26262E] space-y-2 text-xs">
                      <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block">
                        Requirements
                      </span>
                      <p className="text-zinc-300 text-[11px] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Fluid CSS Grid and responsive typography
                      </p>
                      <p className="text-zinc-300 text-[11px] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Clean state toggle handler with zero layout shifts
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Rubric */}
                {leftTab === "rubric" && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold text-[#ABDAC8] uppercase tracking-wider">
                      Evaluation Criteria (100 pts)
                    </h4>
                    <div className="p-3 rounded-xl bg-[#16161F] border border-[#26262E]">
                      <div className="flex justify-between font-mono font-bold text-white mb-1 text-xs">
                        <span>1. Visual Layout Fidelity</span>
                        <span className="text-[#ABDAC8]">35%</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Responsive spacing, breakpoints, contrast.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#16161F] border border-[#26262E]">
                      <div className="flex justify-between font-mono font-bold text-white mb-1 text-xs">
                        <span>2. DOM Event Logic</span>
                        <span className="text-[#ABDAC8]">35%</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Event listeners update prices cleanly.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#16161F] border border-[#26262E]">
                      <div className="flex justify-between font-mono font-bold text-white mb-1 text-xs">
                        <span>3. Semantic Cleanliness</span>
                        <span className="text-[#ABDAC8]">30%</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">No CSS bloat, clean ARIA landmarks.</p>
                    </div>
                  </div>
                )}

                {/* Tab 4: Feedback */}
                {leftTab === "feedback" && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#111614] border border-[#4ADE80]/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#4ADE80] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> VERDICT: PASSED
                        </span>
                        <span className="text-xs font-mono text-[#ABDAC8] font-bold">{currentScore}/100</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Flawless component implementation! Layout adapts responsively across viewports with zero layout shift on state updates.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Scaffolding Status */}
              <div className="pt-3 border-t border-[#26262E]/70 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-[#ABDAC8]">
                  <Lock className="w-3.5 h-3.5" /> Scaffolding Locked
                </span>
                <span>Ready for Run / Submit</span>
              </div>
            </div>

            {/* Right 55% (Monaco Code & Diagnostics) */}
            <div className="md:col-span-7 flex flex-col bg-[#0A0A0F]">
              {/* Tab Bar */}
              <div className="h-11 border-b border-[#26262E] bg-[#111117] flex items-center justify-between px-3">
                <div className="flex items-center gap-1 text-xs font-mono">
                  {(["html", "css", "js"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setEditorTab(tab)}
                      className={`px-3.5 py-2 rounded-t-lg font-semibold transition-all cursor-pointer ${
                        editorTab === tab
                          ? "bg-[#0B0B10] text-[#ABDAC8] border-t-2 border-[#ABDAC8]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {tab === "html" ? "index.html" : tab === "css" ? "styles.css" : "script.js"}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Monaco Editor v0.46</span>
              </div>

              {/* Code Area with Line Numbers */}
              <div className="p-4 font-mono text-[11px] text-zinc-300 bg-[#0B0B10] flex-1 overflow-x-auto leading-relaxed border-b border-[#26262E]">
                <div className="flex gap-4">
                  <div className="select-none text-zinc-600 text-right pr-2 border-r border-zinc-800/80">
                    {activeChallenge.code[editorTab]
                      .split("\n")
                      .slice(0, 16)
                      .map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                  </div>
                  <pre className="text-zinc-200">
                    <code>{activeChallenge.code[editorTab]}</code>
                  </pre>
                </div>
              </div>

              {/* Live Console Output */}
              <div className="p-3 bg-[#0E0E14] border-b border-[#26262E] flex flex-col justify-between max-h-32 overflow-y-auto font-mono text-[10px]">
                <div className="flex items-center justify-between pb-1 border-b border-[#26262E]/60 text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" /> Runtime Diagnostics &amp; Events
                  </span>
                </div>
                <div className="space-y-0.5">
                  {logs.slice(-3).map((log, i) => (
                    <div key={i} className="truncate">
                      <span className={log.includes("PASSED") ? "text-[#4ADE80]" : "text-[#ABDAC8]"}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-[#111117] flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Client Sandbox Active</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isEvaluating}
                    onClick={() => handleRun("run")}
                    className="h-8 text-xs font-mono border-[#ABDAC8]/50 text-[#ABDAC8] hover:bg-[#ABDAC8]/10 cursor-pointer"
                  >
                    {isEvaluating ? "GRADING..." : "RUN (DIAGNOSTIC)"}
                  </Button>
                  <button
                    disabled={isEvaluating}
                    onClick={() => handleRun("submit")}
                    className="px-4 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#ABDAC8] text-[#0A0A0F] shadow-[3px_3px_0px_#26262E] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
