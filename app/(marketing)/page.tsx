"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronRight,
  Users,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Code2,
  Rocket,
  Layers,
  Terminal,
  Trophy,
  Briefcase,
  HelpCircle,
  ChevronDown,
  X,
  Mail,
  MessageSquare,
  Menu,
  Cpu,
  Lock,
  Play,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Zap,
  Server,
  Bug,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";
import { ScrollGlowingLine } from "@/components/ScrollGlowingLine";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UserNav } from "@/components/navigation/UserNav";
import { LogoCloud } from "@/components/logo-cloud";
import { Integrations } from "@/components/integrations";
import { DecorIcon } from "@/components/decor-icon";

// ---------------------------------------------------------------------------
// 8 Tracks Data
// ---------------------------------------------------------------------------
const TRACKS_DATA = [
  {
    id: "html-css",
    title: "HTML & CSS Layouts",
    tag: "UI & STYLING",
    icon: Code2,
    desc: "Master Flexbox, CSS Grid, animations, fluid typography, and responsive micro-interactions.",
    challengesCount: 14,
    accent: "aqua" as const,
    sample: "Responsive Pricing Matrix with Annual Switch",
  },
  {
    id: "javascript",
    title: "JavaScript & DOM",
    tag: "LOGIC & EVENTS",
    icon: Terminal,
    desc: "Build interactive widgets, stateful DOM mutations, event delegations, and client-side storage.",
    challengesCount: 18,
    accent: "emerald" as const,
    sample: "Drag-and-Drop Kanban Task Board",
  },
  {
    id: "react",
    title: "React Components",
    tag: "MODERN SPA",
    icon: Zap,
    desc: "Author custom hooks, compound components, virtualized lists, and accessible modal dialogs.",
    challengesCount: 16,
    accent: "aqua" as const,
    sample: "Virtualized Infinite Scroll Product Grid",
  },
  {
    id: "vue",
    title: "Vue.js Reactive UI",
    tag: "COMPOSITION API",
    icon: Sparkles,
    desc: "Leverage Vue 3 Composition API, custom directives, computed watchers, and reactive store patterns.",
    challengesCount: 10,
    accent: "amber" as const,
    sample: "Dynamic Multi-Step Form with Schema Validation",
  },
  {
    id: "node-api",
    title: "Node.js & Mock APIs",
    tag: "DATA & REST",
    icon: Server,
    desc: "Build RESTful route handlers, request payload validation, pagination algorithms, and rate limiters.",
    challengesCount: 8,
    accent: "blue" as const,
    sample: "In-Memory Rate Limiter Token Bucket",
  },
  {
    id: "bug-fix",
    title: "Real-World Bug Fixes",
    tag: "DIAGNOSTICS",
    icon: Bug,
    desc: "Inspect broken codebases, identify layout glitches, patch event memory leaks, and fix race conditions.",
    challengesCount: 12,
    accent: "purple" as const,
    sample: "Patching Async Race Conditions in Autocomplete",
  },
  {
    id: "full-stack",
    title: "Full-Stack Scenarios",
    tag: "END-TO-END",
    icon: Layout,
    desc: "Connect frontend components with mock API backends, handling loading, optimistic updates, and errors.",
    challengesCount: 7,
    accent: "emerald" as const,
    sample: "Optimistic Comment Thread with Offline Queue",
  },
];

// ---------------------------------------------------------------------------
// Interactive Hero Simulation Data
// ---------------------------------------------------------------------------
const HERO_CHALLENGES = [
  {
    id: "pricing",
    label: "Pricing Switcher",
    track: "HTML & CSS",
    difficulty: "EASY",
    score: 94,
    time: "1.8s",
    title: "Interactive Pricing Table with Monthly/Annual Switch",
    desc: "Build a responsive 3-tier card layout with an annual billing toggle that updates prices dynamically with zero layout shifts.",
    rubricDesign: "35/35%",
    rubricLogic: "34/35%",
    rubricQuality: "25/30%",
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
  box-shadow: 3px 3px 0px #26262E;
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
    score: 96,
    time: "2.1s",
    title: "Drag-and-Drop Task Board with State Persistence",
    desc: "Implement HTML5 Drag and Drop event delegation to reorder sprint tasks across To Do, In Progress, and Done columns.",
    rubricDesign: "34/35%",
    rubricLogic: "35/35%",
    rubricQuality: "27/30%",
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

// ---------------------------------------------------------------------------
// FAQ List
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: "What is Staqor and how is it different from LeetCode?",
    a: "LeetCode tests abstract algorithmic puzzle solving through stdout return values. Staqor tests real frontend craftsmanship: responsive CSS Grid/Flexbox layouts, DOM event delegation, and React component state—graded by Groq AI against multi-criteria rubrics in under 2.5 seconds.",
  },
  {
    q: "Is Staqor free for developers and students?",
    a: "Yes! Every challenge comes with a generous lifetime free quota (5 Runs & 3 Submits per challenge). You get instant client-side execution, live Groq AI rubric feedback, and verified public portfolio replays at $0.",
  },
  {
    q: "How does Groq AI evaluate frontend code without server lag?",
    a: "Staqor compiles code 100% in the client browser inside an isolated iframe with a 2000ms loop-killer wrapper. Submissions pass through a zero-cost syntax pre-filter gate before Groq LPU models evaluate visual design (35%), DOM/state logic (35%), and semantic cleanliness (30%) in <2.5 seconds.",
  },
  {
    q: "How do recruiters and hiring teams verify candidate work?",
    a: "When you pass a challenge, Staqor publishes a verified candidate showcase on your profile. Recruiters and engineering leads test your live component in an interactive sandbox and inspect your Monaco code tabs with one click—no repository cloning required.",
  },
  {
    q: "What practice tracks and difficulty levels are available?",
    a: "Staqor offers 8 specialized tracks spanning HTML & CSS Layouts, JavaScript & DOM Events, React Components, Vue.js, Node.js Mock APIs, Real-World Bug Fixes, and Full-Stack Scenarios across Easy, Medium, and Hard tiers.",
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive IDE Mockup State
  const [heroChallengeIdx, setHeroChallengeIdx] = useState(0);
  const currentHeroChallenge = HERO_CHALLENGES[heroChallengeIdx];
  const [mockupEditorTab, setMockupEditorTab] = useState<"html" | "css" | "js">("html");
  const [mockupLeftTab, setMockupLeftTab] = useState<"spec" | "rubric" | "preview" | "feedback">("spec");
  const [mockupViewport, setMockupViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalTimer, setEvalTimer] = useState(currentHeroChallenge.time);
  const [mockupAnnualBilling, setMockupAnnualBilling] = useState(true);
  const [mockupScore, setMockupScore] = useState(currentHeroChallenge.score);
  const [mockupLogs, setMockupLogs] = useState<string[]>([
    "[Sandbox Engine] Isolated iframe sandbox mounted with 2000ms loop-killer.",
    "[Pre-Filter Gate] Checking syntax & locked scaffolding: PASSED (0.02s).",
    "[Groq LPU] Ready for diagnostic Run or official Submit.",
  ]);

  // GSAP Animation Refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMockupRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

  const progHeaderRef = useRef<HTMLDivElement>(null);
  const progGridRef = useRef<HTMLDivElement>(null);
  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyGridRef = useRef<HTMLDivElement>(null);
  const faqHeaderRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  // Simulate IDE Evaluation
  const handleRunEvaluation = (type: "run" | "submit") => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    setMockupLogs((prev) => [
      ...prev,
      `[Trigger] ${type.toUpperCase()} initiated on challenge: ${currentHeroChallenge.title.slice(0, 30)}...`,
      `[Pre-Filter] Structural syntax check: PASSED (0.02s)`,
      `[Groq LPU] Dispatching weighted prompt to LPU inference stream...`,
    ]);

    setTimeout(() => {
      setIsEvaluating(false);
      const newScore = type === "submit" ? currentHeroChallenge.score : currentHeroChallenge.score - 2;
      setMockupScore(newScore);
      setEvalTimer(type === "submit" ? "2.1s" : "1.8s");
      setMockupLeftTab("feedback");
      setMockupLogs((prev) => [
        ...prev,
        `[Groq LPU] Response received (200 OK) in ${type === "submit" ? "2.1s" : "1.8s"}. Score: ${newScore}/100 PASSED.`,
      ]);
    }, 1800);
  };

  // GSAP Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      // 2. Infinite Floating Loops for 4 Badges
      const badges = [
        { ref: badge1Ref, duration: 4.2, delay: 0 },
        { ref: badge2Ref, duration: 3.8, delay: 0.6 },
        { ref: badge3Ref, duration: 4.6, delay: 1.2 },
        { ref: badge4Ref, duration: 4.0, delay: 1.8 },
      ];

      badges.forEach(({ ref, duration, delay }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            y: -8,
            duration: duration / 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay,
          });
        }
      });

      // 3. Section Entrance ScrollTriggers
      const animateSection = (header: React.RefObject<HTMLDivElement>, grid: React.RefObject<HTMLDivElement>) => {
        if (header.current) {
          gsap.from(header.current.children, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header.current,
              start: "top 90%",
              once: true,
            },
          });
        }
        if (grid.current) {
          gsap.from(grid.current.children, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid.current,
              start: "top 88%",
              once: true,
            },
          });
        }
      };

      animateSection(progHeaderRef, progGridRef);
      animateSection(whyHeaderRef, whyGridRef);
      animateSection(faqHeaderRef, faqListRef);

      ScrollTrigger.refresh();
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. SCROLL-RESPONSIVE GLOWING ACCENT LINE (Real-time Framer Motion Spring) */}
      {/* ========================================================================= */}
      <ScrollGlowingLine />

      {/* 2. Background Texture & Ambient Multi-Stop Gradients */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #26262E 1px, transparent 1px),
            linear-gradient(to bottom, #26262E 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#ABDAC8]/18 via-[#ABDAC8]/6 to-transparent blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#ABDAC8]/8 blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,#ABDAC826_0%,#ABDAC808_60%,transparent_100%)] blur-[110px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/90 border-b border-[#26262E] transition-all">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center shadow-[0_0_15px_rgba(171,218,200,0.15)] group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-[#ABDAC8]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#F5F5F7]">Staqor</span>
            <Badge
              variant="outline"
              className="text-[10px] uppercase font-mono text-[#ABDAC8] border-[#ABDAC8]/30 ml-1 py-0 px-2 bg-[#111614]"
            >
              v1.0 MVP
            </Badge>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
            <a
              href="#tracks"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              8 Tracks
            </a>
            <a
              href="#how-it-works"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              How It Works
            </a>
            <a
              href="#why-staqor"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              Why Staqor
            </a>
            <a
              href="#ecosystem"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              Ecosystem
            </a>
            <a
              href="#faq"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/challenges" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-bold rounded-xl px-5 py-2.5 text-sm shadow-lg shadow-[#ABDAC8]/25 hover:shadow-xl hover:shadow-[#ABDAC8]/40 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Browse Catalog</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </Button>
            </Link>

            <UserNav />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#111117] border border-[#26262E] text-zinc-300 hover:text-white transition-all active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#26262E] bg-[#0A0A0F] px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-zinc-300"
            >
              <a href="#tracks" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ABDAC8] transition-colors py-1">
                8 Tracks
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ABDAC8] transition-colors py-1">
                How It Works
              </a>
              <a href="#why-staqor" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ABDAC8] transition-colors py-1">
                Why Staqor
              </a>
              <a href="#ecosystem" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ABDAC8] transition-colors py-1">
                Ecosystem
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ABDAC8] transition-colors py-1">
                FAQ
              </a>
              <Link href="/challenges" onClick={() => setMobileMenuOpen(false)} className="pt-2">
                <Button size="sm" className="w-full bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] text-[#0A0A0F] font-bold rounded-xl py-2.5">
                  Browse Catalog
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-4">
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center flex flex-col items-center relative">
          {/* Floating Badge 1 (Mid-Left) */}
          <div
            ref={badge1Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/95 backdrop-blur-xl border border-[#ABDAC8]/40 hover:border-[#ABDAC8] shadow-xl text-xs font-bold text-white absolute -left-6 xl:-left-16 top-72 xl:top-[22rem] z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#ABDAC8]/30 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ABDAC8]/20 text-[#ABDAC8] border border-[#ABDAC8]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white group-hover:text-[#ABDAC8] transition-colors">
                Sub-2.5s Groq AI
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-9 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Weighted multi-criteria rubrics graded instantly
            </p>
          </div>

          {/* Floating Badge 2 (Top-Right) */}
          <div
            ref={badge2Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-[#26262E] hover:border-[#ABDAC8] shadow-xl text-xs font-bold text-white absolute right-4 xl:right-8 top-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#ABDAC8]/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ABDAC8]/20 text-[#ABDAC8] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="group-hover:text-[#ABDAC8] transition-colors">100% Client Sandbox</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-9 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Isolated iframe execution with 2000ms loop-killer
            </p>
          </div>

          {/* Floating Badge 3 (Bottom-Left) */}
          <div
            ref={badge3Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 shadow-xl text-xs font-bold text-emerald-400 absolute left-4 xl:left-8 bottom-4 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>Locked Scaffolding</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Scoped read-only tabs enforce focused UI practice
            </p>
          </div>

          {/* Floating Badge 4 (Bottom-Right) */}
          <div
            ref={badge4Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 shadow-xl text-xs font-bold text-amber-300 absolute right-4 xl:right-8 bottom-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>8 Practice Tracks</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              HTML/CSS, JS DOM, React, Vue, APIs &amp; Bug Fixes
            </p>
          </div>

          {/* Hero Content Elements */}
          <div ref={heroRef} className="flex flex-col items-center max-w-5xl">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111614] border border-[#26352E] text-xs font-mono text-[#ABDAC8] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span>GROQ LPU AI GRADING • SUB-2.5S • 100% IN-BROWSER WORKSPACE</span>
            </div>

            {/* Main Headline with GSAP Animated Box */}
            <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
              <h1 className="flex flex-col sm:block items-center">
                <span>The in-browser IDE for modern frontend </span>
                <GSAPAnimatedBox text="craftsmanship." />
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed mb-8 font-normal">
              Solve real HTML/CSS, JS DOM, and React component challenges inside a split Monaco IDE. Graded against weighted rubrics in &lt;2.5s by Groq AI with zero server latency.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold px-10 py-7 text-lg rounded-xl shadow-2xl shadow-[#ABDAC8]/35 hover:shadow-2xl hover:shadow-[#ABDAC8]/50 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Start Practicing Free</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/challenges" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#26262E] bg-[#111117] hover:bg-[#16161F] text-white font-bold px-8 py-7 text-base rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore 8 Tracks Catalog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE HERO IDE SIMULATION WINDOW */}
        {/* ========================================================================= */}
        <section className="pb-16 md:pb-24">
          <div className="relative max-w-5xl mx-auto">
            {/* Floating AI Verdict Card */}
            <div
              ref={floatingBadgeRef}
              className="mb-4 lg:mb-0 lg:absolute lg:-top-8 lg:-right-4 z-30 w-full lg:w-80 p-4 rounded-2xl bg-[#16161F]/95 backdrop-blur-md border border-[#ABDAC8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(171,218,200,0.15)] text-left transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-[#4ADE80]">
                    SCORE {mockupScore}/100 • PASSED
                  </span>
                </div>
                <Badge variant="outline" className="text-[9px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 py-0 px-1.5">
                  {evalTimer} INFERENCE
                </Badge>
              </div>
              <h4 className="text-xs font-bold text-[#F5F5F7] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" />
                <span>Groq AI Multi-Criteria Rubric</span>
              </h4>
              <div className="space-y-1.5 text-[11px] font-mono text-[#9CA3AF]">
                <div className="flex justify-between items-center">
                  <span>Layout &amp; Visual Fidelity:</span>
                  <span className="text-[#ABDAC8] font-semibold">{currentHeroChallenge.rubricDesign}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>DOM &amp; State Logic:</span>
                  <span className="text-[#ABDAC8] font-semibold">{currentHeroChallenge.rubricLogic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Semantic Cleanliness:</span>
                  <span className="text-[#ABDAC8] font-semibold">{currentHeroChallenge.rubricQuality}</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#26262E] flex items-center justify-between text-[10px] font-mono text-[#9CA3AF]">
                <span className="text-[#4ADE80]">⚡ Pre-Filter Gate: PASSED</span>
                <span>🔒 Scaffolding Valid</span>
              </div>
            </div>

            {/* Main Interactive IDE Window */}
            <div
              ref={heroMockupRef}
              className="rounded-2xl border border-[#26262E] bg-[#111117] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_30px_rgba(171,218,200,0.06)] overflow-hidden text-left relative"
            >
              <DecorIcon position="top-left" className="text-[#ABDAC8]/40" />
              <DecorIcon position="top-right" className="text-[#ABDAC8]/40" />

              {/* Top Workspace Header Bar */}
              <div className="border-b border-[#26262E] bg-[#0E0E14] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F87171]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#4ADE80]/80" />

                  {/* Challenge Switcher Pills */}
                  <div className="ml-2 flex items-center gap-1.5 bg-[#16161F] p-1 rounded-lg border border-[#26262E]">
                    {HERO_CHALLENGES.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setHeroChallengeIdx(idx);
                          setMockupScore(ch.score);
                          setEvalTimer(ch.time);
                          setMockupLogs((prev) => [
                            ...prev,
                            `[Workspace] Switched challenge to: ${ch.title}`,
                          ]);
                        }}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded transition-all cursor-pointer ${
                          heroChallengeIdx === idx
                            ? "bg-[#ABDAC8] text-[#0A0A0F] font-bold"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 bg-[#111614] flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                    CLIENT SANDBOX ACTIVE
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono border-[#26262E] text-[#9CA3AF]">
                    2000MS LOOP-KILLER
                  </Badge>
                </div>
              </div>

              {/* Split Layout: 40% Left Spec / 60% Right Monaco + Console */}
              <div className="grid md:grid-cols-12 min-h-[460px]">
                {/* 40% Left Panel */}
                <div className="md:col-span-5 p-4 sm:p-5 border-r border-[#26262E] bg-[#0F0F16]/70 flex flex-col justify-between">
                  <div>
                    {/* Tabs Bar */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-[#111117] border border-[#26262E] rounded-lg mb-4 text-[11px] font-mono">
                      <button
                        onClick={() => setMockupLeftTab("spec")}
                        className={`py-1.5 rounded text-center transition-all ${
                          mockupLeftTab === "spec"
                            ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        Spec
                      </button>
                      <button
                        onClick={() => setMockupLeftTab("rubric")}
                        className={`py-1.5 rounded text-center transition-all ${
                          mockupLeftTab === "rubric"
                            ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        Rubric
                      </button>
                      <button
                        onClick={() => setMockupLeftTab("preview")}
                        className={`py-1.5 rounded text-center transition-all ${
                          mockupLeftTab === "preview"
                            ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setMockupLeftTab("feedback")}
                        className={`py-1.5 rounded text-center transition-all ${
                          mockupLeftTab === "feedback"
                            ? "bg-[#16161F] text-[#ABDAC8] font-bold border border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        Feedback
                      </button>
                    </div>

                    {/* Tab Content */}
                    {mockupLeftTab === "spec" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono text-[#4ADE80] border-[#4ADE80]/30">
                            {currentHeroChallenge.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                            {currentHeroChallenge.track}
                          </Badge>
                          <span className="text-[11px] font-mono text-[#9CA3AF]">Runs: 1/5 • Submits: 1/3</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#F5F5F7]">
                          {currentHeroChallenge.title}
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          {currentHeroChallenge.desc}
                        </p>

                        <div className="p-3 rounded-lg bg-[#16161F] border border-[#26262E] space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block">
                            Requirement Checklist
                          </span>
                          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Verified responsive layout &amp; grid alignment
                          </p>
                          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Event delegation &amp; dynamic state transitions
                          </p>
                          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Clean semantic HTML &amp; accessibility ARIA
                          </p>
                        </div>
                      </div>
                    )}

                    {mockupLeftTab === "rubric" && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#ABDAC8] uppercase tracking-wider">
                          Official Evaluation Rubric (100 pts)
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-md bg-[#16161F] border border-[#26262E]">
                            <div className="flex justify-between font-mono font-bold text-[#F5F5F7] mb-1">
                              <span>1. Visual Layout Fidelity</span>
                              <span className="text-[#ABDAC8]">35%</span>
                            </div>
                            <p className="text-[11px] text-[#9CA3AF]">
                              Clean grid spacing, mobile breakpoints, and consistent theme contrast.
                            </p>
                          </div>
                          <div className="p-2.5 rounded-md bg-[#16161F] border border-[#26262E]">
                            <div className="flex justify-between font-mono font-bold text-[#F5F5F7] mb-1">
                              <span>2. DOM State &amp; Event Logic</span>
                              <span className="text-[#ABDAC8]">35%</span>
                            </div>
                            <p className="text-[11px] text-[#9CA3AF]">
                              Event listener toggles price values smoothly and handles keyboard access.
                            </p>
                          </div>
                          <div className="p-2.5 rounded-md bg-[#16161F] border border-[#26262E]">
                            <div className="flex justify-between font-mono font-bold text-[#F5F5F7] mb-1">
                              <span>3. Semantic Code Quality</span>
                              <span className="text-[#ABDAC8]">30%</span>
                            </div>
                            <p className="text-[11px] text-[#9CA3AF]">
                              No redundant styles, proper HTML landmarks, clean variable naming.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {mockupLeftTab === "preview" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#26262E]">
                          <span className="text-xs font-mono text-[#9CA3AF]">Viewport Mode</span>
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setMockupViewport("desktop")}
                              className={`w-7 h-7 ${mockupViewport === "desktop" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"}`}
                            >
                              <Monitor className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setMockupViewport("tablet")}
                              className={`w-7 h-7 ${mockupViewport === "tablet" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"}`}
                            >
                              <Tablet className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setMockupViewport("mobile")}
                              className={`w-7 h-7 ${mockupViewport === "mobile" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"}`}
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0A0A0F] border border-[#26262E] text-center">
                          <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 rounded bg-[#16161F] border border-[#26262E] text-[10px] font-mono">
                            <span>Billing:</span>
                            <button
                              onClick={() => setMockupAnnualBilling(!mockupAnnualBilling)}
                              className="px-2 py-0.5 rounded bg-[#ABDAC8] text-[#0A0A0F] font-bold cursor-pointer hover:scale-105 transition-transform"
                            >
                              {mockupAnnualBilling ? "Annual (Save 20%)" : "Monthly"}
                            </button>
                          </div>
                          <div className="p-4 rounded-lg bg-[#111614] border border-[#ABDAC8]/40 shadow-lg">
                            <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block mb-1">
                              PRO CANDIDATE
                            </span>
                            <div className="text-2xl font-extrabold text-[#F5F5F7] mb-1">
                              ${mockupAnnualBilling ? "15" : "19"}
                              <span className="text-xs text-[#9CA3AF] font-normal"> / mo</span>
                            </div>
                            <p className="text-[10px] text-[#9CA3AF] mb-3">Unlimited AI runs + recruiter portfolio</p>
                            <button className="w-full py-1.5 text-xs font-bold rounded bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-colors">
                              Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {mockupLeftTab === "feedback" && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-[#111614] border border-[#4ADE80]/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#4ADE80] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> SUBMISSION PASSED
                            </span>
                            <span className="text-xs font-mono text-[#ABDAC8] font-bold">{mockupScore}/100</span>
                          </div>
                          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                            Exceptional craft! The solution passes all criteria with zero token waste on syntax errors and complete responsive fidelity.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#26262E]/70 flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#ABDAC8]" /> Scaffolding Locked
                    </span>
                    <span className="text-[#ABDAC8]">Ready for Run / Submit</span>
                  </div>
                </div>

                {/* 60% Right Monaco Editor */}
                <div className="md:col-span-7 flex flex-col bg-[#0A0A0F]">
                  <div className="h-10 border-b border-[#26262E] bg-[#111117] flex items-center justify-between px-3">
                    <div className="flex items-center gap-1 text-xs font-mono">
                      <button
                        onClick={() => setMockupEditorTab("html")}
                        className={`px-3 py-1.5 rounded-t font-semibold transition-all ${
                          mockupEditorTab === "html"
                            ? "bg-[#0B0B10] text-[#ABDAC8] border-t border-x border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        index.html
                      </button>
                      <button
                        onClick={() => setMockupEditorTab("css")}
                        className={`px-3 py-1.5 rounded-t font-semibold transition-all ${
                          mockupEditorTab === "css"
                            ? "bg-[#0B0B10] text-[#ABDAC8] border-t border-x border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        styles.css
                      </button>
                      <button
                        onClick={() => setMockupEditorTab("js")}
                        className={`px-3 py-1.5 rounded-t font-semibold transition-all ${
                          mockupEditorTab === "js"
                            ? "bg-[#0B0B10] text-[#ABDAC8] border-t border-x border-[#26262E]"
                            : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                        }`}
                      >
                        script.js
                      </button>
                    </div>
                    <span className="text-[10px] font-mono text-[#9CA3AF]">Monaco Editor v0.46</span>
                  </div>

                  <div className="p-4 font-mono text-[11px] text-[#9CA3AF] bg-[#0B0B10] flex-1 overflow-x-auto leading-relaxed border-b border-[#26262E]">
                    <pre className="text-[#F5F5F7]/90">{currentHeroChallenge.code[mockupEditorTab]}</pre>
                  </div>

                  {/* Interactive Console */}
                  <div className="p-3 bg-[#0E0E14] border-b border-[#26262E] flex flex-col justify-between max-h-32 overflow-y-auto font-mono text-[10px]">
                    <div className="flex items-center justify-between pb-1 border-b border-[#26262E]/60 text-[#9CA3AF] mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#ABDAC8]" /> Runtime Logs &amp; Diagnostics
                      </span>
                    </div>
                    <div className="space-y-0.5 text-[#9CA3AF]">
                      {mockupLogs.slice(-3).map((log, i) => (
                        <div key={i} className="truncate">
                          <span className={log.includes("PASSED") ? "text-[#4ADE80]" : "text-[#ABDAC8]"}>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 bg-[#111117] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#9CA3AF]">Isolated Sandbox Engine</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isEvaluating}
                        onClick={() => handleRunEvaluation("run")}
                        className="h-8 text-xs font-mono border-[#ABDAC8]/50 text-[#ABDAC8] hover:bg-[#ABDAC8]/10 cursor-pointer"
                      >
                        {isEvaluating ? "GRADING..." : "RUN (DIAGNOSTIC)"}
                      </Button>
                      <button
                        disabled={isEvaluating}
                        onClick={() => handleRunEvaluation("submit")}
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

        {/* ========================================================================= */}
        {/* 3. METRICS STRIP & LOGO CLOUD */}
        {/* ========================================================================= */}
        <section className="py-10 border-y border-[#26262E]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] hover:border-[#ABDAC8]/40 hover:-translate-y-1 transition-all">
              <span className="text-2xl font-bold font-mono text-[#ABDAC8] block">&lt; 2.5s</span>
              <span className="text-xs text-zinc-400">Groq AI Latency</span>
            </div>
            <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] hover:border-[#ABDAC8]/40 hover:-translate-y-1 transition-all">
              <span className="text-2xl font-bold font-mono text-[#ABDAC8] block">8 Tracks</span>
              <span className="text-xs text-zinc-400">Full UI Curriculum</span>
            </div>
            <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] hover:border-[#4ADE80]/40 hover:-translate-y-1 transition-all">
              <span className="text-2xl font-bold font-mono text-[#4ADE80] block">100% Client</span>
              <span className="text-xs text-zinc-400">Zero Docker Lag</span>
            </div>
            <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] hover:border-[#ABDAC8]/40 hover:-translate-y-1 transition-all">
              <span className="text-2xl font-bold font-mono text-[#ABDAC8] block">35/35/30%</span>
              <span className="text-xs text-zinc-400">Weighted Rubrics</span>
            </div>
          </div>

          <LogoCloud />
        </section>

        {/* ========================================================================= */}
        {/* 4. 8 PRACTICE TRACKS CATALOG (Curriculum Explorer) */}
        {/* ========================================================================= */}
        <section id="tracks" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={progHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">Curriculum Catalog</div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                Practice Across <GSAPAnimatedBox text="8 Tracks" />
              </h2>
            </div>
            <p className="text-base text-zinc-300 max-w-md font-normal">
              From core HTML &amp; CSS fundamentals to advanced React state machines and realistic bug-fixing scenarios.
            </p>
          </div>

          <div
            ref={progGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {TRACKS_DATA.map((tr) => {
              const Icon = tr.icon;
              return (
                <div key={tr.id} className="h-full">
                  <SpotlightCard accentColor={tr.accent} watermark={tr.title.slice(0, 3).toUpperCase()}>
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-mono font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-[#16161F] text-[#ABDAC8] border border-[#26262E]">
                            {tr.challengesCount} Challenges
                          </span>
                          <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#ABDAC8] group-hover:scale-110 transition-all duration-300" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#ABDAC8] transition-colors">
                          {tr.title}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-normal">
                          {tr.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#26262E]">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Example Challenge</span>
                        <p className="text-xs font-semibold text-zinc-200 truncate mb-3">{tr.sample}</p>
                        <Link href={`/challenges?track=${tr.id}`} className="block">
                          <Button size="sm" variant="outline" className="w-full text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8] transition-all hover:scale-[1.02] active:scale-[0.98]">
                            Browse Track
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. HOW STAQOR WORKS (Tree Diagram with Animated Branches & Cards) */}
        {/* ========================================================================= */}
        <HowItWorks />

        {/* ========================================================================= */}
        {/* 6. WHY STAQOR COMPARISON */}
        {/* ========================================================================= */}
        <section id="why-staqor" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={whyHeaderRef} className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">The Proof of Work Loop</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Why Staqor Wins Over <GSAPAnimatedBox text="LeetCode" />
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg">
              Stop solving abstract tree puzzles. Start building real, verified engineering portfolios that get you hired.
            </p>
          </div>

          <div ref={whyGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional LeetCode */}
            <SpotlightCard accentColor="purple" watermark="OLD">
              <div className="p-8 h-full">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 font-mono">Traditional Platforms</div>
                <h3 className="font-display text-2xl font-bold text-white mb-6">Algorithmic Math Puzzles</h3>
                <div className="space-y-4 text-sm text-zinc-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span>Abstract stdout tests that ignore responsive UI and CSS Grid</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span>Copy-pasted tutorial projects that recruiters instantly skip</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span>Static resume PDFs with zero provable interactive work</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* The Staqor Way */}
            <SpotlightCard accentColor="aqua" watermark="STAQ">
              <div className="p-8 h-full bg-gradient-to-b from-[#ABDAC8]/10 to-transparent">
                <div className="text-xs font-bold text-[#ABDAC8] uppercase tracking-wider mb-3 font-mono">The Staqor Way</div>
                <h3 className="font-display text-2xl font-bold text-white mb-6">Daily Frontend Proof of Work</h3>
                <div className="space-y-4 text-sm text-zinc-200 font-medium">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>Real component code with sub-2.5s Groq AI multi-rubric feedback</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>One-click candidate sandboxes that recruiters can interact with</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>Direct visibility to tech recruiters and engineering leaders</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. DEVELOPER TOOLING ECOSYSTEM */}
        {/* ========================================================================= */}
        <section id="ecosystem" className="py-16 md:py-24 border-t border-[#26262E]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2 font-mono">Developer Ecosystem</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Modern Runtime Architecture
            </h2>
            <p className="text-zinc-300 text-base font-normal">
              Built on industry-standard editor runtimes and high-throughput Groq LPU inference.
            </p>
          </div>

          <Integrations />
        </section>

        {/* ========================================================================= */}
        {/* 8. FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section id="faq" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={faqHeaderRef} className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2 flex items-center justify-center gap-1.5 font-mono">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-zinc-300 text-base font-normal">
              Everything you need to know about Staqor challenges, Groq AI rubric evaluation, and verified recruiter replays.
            </p>
          </div>

          <div ref={faqListRef} className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <SpotlightCard key={index} accentColor="aqua">
                <div className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-white hover:text-[#ABDAC8] transition-colors group cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-[#16161F] group-hover:bg-[#ABDAC8]/20 flex items-center justify-center transition-colors shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 group-hover:text-[#ABDAC8] transition-transform duration-300 ${
                          openFaq === index ? "rotate-180 text-[#ABDAC8]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4 animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. COMMUNITY CTA BAND */}
        {/* ========================================================================= */}
        <section id="community" className="py-12">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#ABDAC8]/20 via-[#111117] to-[#0A0A0F] border border-[#ABDAC8]/40 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ABDAC8]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
              Ready to prove your frontend <GSAPAnimatedBox text="craftsmanship?" />
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Join thousands of developers solving real UI challenges, passing sub-2.5s Groq AI rubrics, and getting hired.
            </p>

            <Link href="/signup" className="inline-block">
              <Button
                size="lg"
                className="bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold px-10 py-7 text-lg rounded-xl shadow-2xl shadow-[#ABDAC8]/40 hover:shadow-2xl hover:shadow-[#ABDAC8]/60 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Start Free Practice Now</span>
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 10. FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#26262E] bg-[#0A0A0F] py-12 text-xs text-zinc-400 relative z-10 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" />
            </div>
            <span className="font-bold text-base text-white">Staqor</span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-zinc-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#111117] border border-[#26262E] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#111117] border border-[#26262E] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#111117] border border-[#26262E] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1 1.4-1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3v6z"/></svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#111117] border border-[#26262E] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="X"
            >
              <span className="font-bold text-xs font-sans">X</span>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#111117] border border-[#26262E] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Discord"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Contact Line */}
          <div className="flex items-center gap-2 text-zinc-400">
            <Mail className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>
              For any enquiry:{" "}
              <a href="mailto:team@staqor.dev" className="text-white hover:underline font-semibold">
                team@staqor.dev
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
