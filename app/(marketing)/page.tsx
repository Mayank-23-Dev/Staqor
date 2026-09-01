"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Terminal,
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Play,
  Layers,
  Cpu,
  Eye,
  ExternalLink,
  Award,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
  Lock,
  Server,
  Bug,
  Layout,
  CheckCircle2,
  Star,
  Menu,
  X,
} from "lucide-react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserNav } from "@/components/navigation/UserNav";
import { DecorIcon } from "@/components/decor-icon";

// ---------------------------------------------------------------------------
// 8 Tracks Data (Matches App Catalog)
// ---------------------------------------------------------------------------
const TRACKS_DATA = [
  {
    id: "html-css",
    title: "HTML & CSS Layouts",
    tag: "UI & STYLING",
    icon: Code2,
    desc: "Master Flexbox, CSS Grid, animations, fluid typography, and responsive micro-interactions.",
    challengesCount: 14,
    sample: {
      name: "Responsive Pricing Matrix with Annual Switch",
      difficulty: "EASY",
      estTime: "25m",
      rubricFocus: "CSS Flex/Grid alignment & responsive breakpoint shifts",
    },
  },
  {
    id: "javascript",
    title: "JavaScript & DOM",
    tag: "LOGIC & EVENTS",
    icon: Terminal,
    desc: "Build interactive widgets, stateful DOM mutations, event delegations, and client-side storage.",
    challengesCount: 18,
    sample: {
      name: "Drag-and-Drop Kanban Task Board",
      difficulty: "MEDIUM",
      estTime: "40m",
      rubricFocus: "HTML5 Drag & Drop API, column re-ordering, state persistence",
    },
  },
  {
    id: "react",
    title: "React Components",
    tag: "MODERN SPA",
    icon: Zap,
    desc: "Author custom hooks, compound components, virtualized lists, and accessible modal dialogs.",
    challengesCount: 16,
    sample: {
      name: "Virtualized Infinite Scroll Product Grid",
      difficulty: "HARD",
      estTime: "50m",
      rubricFocus: "Intersection Observer hook, windowing, memory recycling",
    },
  },
  {
    id: "vue",
    title: "Vue.js Reactive UI",
    tag: "COMPOSITION API",
    icon: Sparkles,
    desc: "Leverage Vue 3 Composition API, custom directives, computed watchers, and reactive store patterns.",
    challengesCount: 10,
    sample: {
      name: "Dynamic Multi-Step Form with Schema Validation",
      difficulty: "MEDIUM",
      estTime: "35m",
      rubricFocus: "Reactivity transform, custom v-model modifiers, validation errors",
    },
  },
  {
    id: "node-api",
    title: "Node.js & Mock APIs",
    tag: "DATA & REST",
    icon: Server,
    desc: "Build RESTful route handlers, request payload validation, pagination algorithms, and rate limiters.",
    challengesCount: 8,
    sample: {
      name: "In-Memory Rate Limiter Token Bucket",
      difficulty: "MEDIUM",
      estTime: "30m",
      rubricFocus: "Sliding window rate algorithm, header serialization",
    },
  },
  {
    id: "bug-fix",
    title: "Real-World Bug Fixes",
    tag: "DIAGNOSTICS",
    icon: Bug,
    desc: "Inspect broken codebases, identify layout glitches, patch event memory leaks, and fix race conditions.",
    challengesCount: 12,
    sample: {
      name: "Patching Async Race Conditions in Autocomplete",
      difficulty: "HARD",
      estTime: "35m",
      rubricFocus: "AbortController signal cancellation & stale promise drops",
    },
  },
  {
    id: "full-stack",
    title: "Full-Stack Scenarios",
    tag: "END-TO-END",
    icon: Layout,
    desc: "Connect frontend components with mock API backends, handling loading, optimistic updates, and errors.",
    challengesCount: 7,
    sample: {
      name: "Optimistic Comment Thread with Offline Queue",
      difficulty: "HARD",
      estTime: "60m",
      rubricFocus: "Optimistic UI rendering, rollback on 500 error, queue sync",
    },
  },
];

// ---------------------------------------------------------------------------
// How It Works Steps
// ---------------------------------------------------------------------------
const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    tag: "DISCOVER",
    title: "Choose a Real-World Challenge",
    desc: "Filter across 8 tracks (HTML/CSS, JS/DOM, React, Vue, Node.js, Bug-Fix, Full-Stack) and difficulty levels. Study comprehensive Figma-aligned specs and rubrics.",
    preview: {
      track: "HTML & CSS",
      title: "Responsive Pricing Table with Annual Toggle",
      difficulty: "EASY",
      time: "25 MINS",
    },
  },
  {
    num: "02",
    tag: "IN-BROWSER IDE",
    title: "Code in Split Monaco + Live Preview",
    desc: "Write HTML, CSS, and JS across dedicated tabs with locked scaffolding enforcement. Watch real-time component updates inside an isolated sandbox with loop protection.",
    preview: {
      track: "LIVE WORKSPACE",
      title: "Monaco v0.46 + Debounced Sandboxed Iframe",
      difficulty: "CLIENT-SIDE",
      time: "ZERO LAG",
    },
  },
  {
    num: "03",
    tag: "PRE-FILTER & AI RUBRIC",
    title: "Sub-2.5s Groq AI Evaluation",
    desc: "Instant syntax pre-filter gate prevents quota waste on typos. Groq LPU evaluates visual fidelity, DOM events, and semantic cleanliness against weighted rubrics in <2.5s.",
    preview: {
      track: "GROQ LPU CLOUD",
      title: "Weighted JSON Rubric (Design 35% • Logic 35% • Quality 30%)",
      difficulty: ">= 80% TO PASS",
      time: "< 2.5 SECONDS",
    },
  },
  {
    num: "04",
    tag: "RECRUITER PROOF",
    title: "Build Verified Public Portfolios",
    desc: "Passed solutions generate interactive read-only sandboxes. Hiring managers and recruiters test your live components with one click without cloning repositories.",
    preview: {
      track: "LIVE PORTFOLIO",
      title: "Verified Candidate Sandbox + Read-Only Replay",
      difficulty: "PROVABLE CRAFT",
      time: "ONE-CLICK DEMO",
    },
  },
];

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    id: "faq-1",
    q: "How is Staqor different from LeetCode or HackerRank?",
    a: "LeetCode tests abstract algorithmic puzzle solving (trees, dynamic programming) through stdout return values. Staqor tests actual frontend engineering: responsive layout fidelity, CSS Grid/Flexbox architecture, DOM event handling, component state management, and code cleanliness—graded by Groq AI in real time.",
  },
  {
    id: "faq-2",
    q: "How does Groq AI evaluate frontend UI without a headless browser?",
    a: "Staqor utilizes high-throughput Groq LPU models conditioned on exact UI specifications, design guidelines, and weighted multi-criteria rubrics (35% Visual Design, 35% DOM/State Logic, 30% Semantic Code Quality). It analyzes your structural HTML, CSS rules, and JavaScript logic to provide actionable, line-specific feedback in under 2.5 seconds.",
  },
  {
    id: "faq-3",
    q: "What is the Structural Correctness Pre-Filter Gate?",
    a: "Before spending a Groq AI call, Staqor's client-side pre-filter analyzes JavaScript syntax, unclosed HTML tags, and track-specific code presence. If a syntax error or empty submission is detected, you get instant diagnosis with zero quota deduction.",
  },
  {
    id: "faq-4",
    q: "Why is there a limit of 5 Runs and 3 Submits on the Free plan?",
    a: "The free lifetime quota (5 Runs & 3 Submits per challenge) encourages disciplined, thoughtful coding while keeping high-speed Groq AI infrastructure free for everyone. Pro members receive unlimited AI runs, submissions, and instant model solution unlocks.",
  },
  {
    id: "faq-5",
    q: "Is my code executed on a backend server?",
    a: "No. Staqor uses 100% client-side execution. Your code runs inside an isolated iframe sandbox with `allow-scripts allow-modals` and an automatic 2000ms loop-killer wrapper. There is zero server spin-up latency and zero remote attack surface.",
  },
  {
    id: "faq-6",
    q: "How do hiring managers and recruiters view my portfolio?",
    a: "When you pass a challenge, it generates a verified public showcase on your profile. Recruiters receive a shareable link where they can inspect your read-only Monaco code tabs and interactively test your live component in a sandbox without installing dependencies or cloning repos.",
  },
];

// ---------------------------------------------------------------------------
// Testimonials Data
// ---------------------------------------------------------------------------
const TESTIMONIALS = [
  {
    name: "Elena Rostova",
    role: "Senior Frontend Engineer",
    company: "FinTech Scaleup",
    content:
      "Traditional coding interviews never felt representative of building production design systems. Staqor's rubric feedback on CSS specificity and accessibility caught habits that algorithmic platforms completely ignore.",
    avatar: "ER",
  },
  {
    name: "Marcus Vance",
    role: "Bootcamp Graduate",
    company: "Hired at SaaS Platform",
    content:
      "Instead of sending static screenshots on my resume, I sent my Staqor profile link. The hiring manager told me in the interview that playing with my interactive sandboxes gave them instant confidence in my UI craft.",
    avatar: "MV",
  },
  {
    name: "Priya Sharma",
    role: "Technical Recruiter",
    company: "Global Talent Partner",
    content:
      "Staqor solves our biggest headache: verifying whether a candidate actually writes clean frontend code or just copied boilerplate. The verified badges and read-only replays save our engineering team hours of initial screening.",
    avatar: "PS",
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMockupRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);

  // Interactive IDE Mockup State
  const [mockupEditorTab, setMockupEditorTab] = useState<"html" | "css" | "js">("html");
  const [mockupLeftTab, setMockupLeftTab] = useState<"spec" | "rubric" | "preview" | "feedback">("spec");
  const [mockupViewport, setMockupViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalTimer, setEvalTimer] = useState("1.8s");
  const [mockupAnnualBilling, setMockupAnnualBilling] = useState(true);
  const [mockupScore, setMockupScore] = useState(94);
  const [mockupLogs, setMockupLogs] = useState<string[]>([
    "[Sandbox] DOM container mounted in isolated iframe.",
    "[Pre-Filter] Syntax validation passed. Zero parse errors.",
    "[Groq LPU] Ready for diagnostic Run or official Submit.",
  ]);

  // Code Snippets for Mockup
  const codeSnippets = {
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card-popular {
  background: #111614;
  border: 2px solid #ABDAC8;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(171,218,200,0.15);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.cta-btn {
  width: 100%;
  padding: 0.875rem;
  background: #ABDAC8;
  color: #0A0A0F;
  font-weight: 700;
  border-radius: 0.75rem;
  box-shadow: 4px 4px 0px #26262E;
  cursor: pointer;
}`,
    js: `// Billing Toggle State Handler
const toggleBtn = document.getElementById('toggleBtn');
const priceVal = document.getElementById('priceVal');

let isAnnual = true;

toggleBtn.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggleBtn.classList.toggle('active', isAnnual);
  
  // Update price with smooth count transition
  priceVal.textContent = isAnnual ? '15' : '19';
  console.log('[Event] Switched billing cycle to:', isAnnual ? 'Annual' : 'Monthly');
});`,
  };

  // Simulate IDE Evaluation
  const handleRunEvaluation = (type: "run" | "submit") => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    setMockupLogs((prev) => [
      ...prev,
      `[Trigger] ${type.toUpperCase()} initiated by user...`,
      `[Pre-Filter] Checking syntax & locked scaffolding: PASSED (0.02s)`,
      `[Groq LPU] Dispatching weighted prompt to LPU inference stream...`,
    ]);

    setTimeout(() => {
      setIsEvaluating(false);
      setMockupScore(type === "submit" ? 96 : 94);
      setEvalTimer(type === "submit" ? "2.1s" : "1.8s");
      setMockupLeftTab("feedback");
      setMockupLogs((prev) => [
        ...prev,
        `[Groq LPU] Response received (200 OK) in ${type === "submit" ? "2.1s" : "1.8s"}. Score: ${
          type === "submit" ? "96" : "94"
        }/100 PASSED.`,
      ]);
    }, 1800);
  };

  // Smooth scroll handler for anchor links
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (lenisRef.current) {
      const el = document.querySelector(targetId);
      if (el) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: -70 });
      }
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline (Subtle, confident easing)
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      heroTl
        .from(".hero-badge", { y: -16, opacity: 0, duration: 0.5 })
        .from(".hero-title", { y: 20, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".hero-doodle", { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from(".hero-subhead", { y: 16, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(heroMockupRef.current, { y: 25, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(floatingBadgeRef.current, { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-connector", { opacity: 0, duration: 0.6 }, "-=0.2");

      // 2. Floating Badge & Mockup Parallax (Desktop Only)
      if (window.innerWidth > 768 && heroMockupRef.current && floatingBadgeRef.current) {
        gsap.to(heroMockupRef.current, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(floatingBadgeRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // 3. Scroll-Responsive Glowing Accent Line Scrub
      if (glowPathRef.current && containerRef.current) {
        const path = glowPathRef.current;
        const length = path.getTotalLength ? path.getTotalLength() : 5000;

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
      }

      // 4. Section Reveals (Fixed Dead-Space Bug: start "top 94%", subtle y: 20, once: true)
      const revealSections = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      revealSections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 94%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // 5. Staggered Cards Reveal (Fixed Dead-Space Bug: start "top 92%", subtle y: 16)
      const cardGrids = gsap.utils.toArray<HTMLElement>(".gsap-stagger-grid");
      cardGrids.forEach((grid) => {
        const cards = grid.querySelectorAll(".gsap-card");
        gsap.fromTo(
          cards,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Refresh ScrollTrigger to calculate accurate layout boundaries
      ScrollTrigger.refresh();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mode-landing min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] relative overflow-x-hidden font-sans"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND TEXTURE & AMBIENT AQUA/MINT GLOW LAYERS */}
      {/* ========================================================================= */}

      {/* 1. Subtle Low-Opacity Background Grid Texture (#26262E on #0A0A0F) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
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

      {/* 2. Background Multi-Stop Ambient Aqua/Mint Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[#ABDAC8]/10 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[1800px] left-1/4 -translate-x-1/2 w-[750px] h-[450px] bg-[#7BC4A8]/6 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[3400px] right-1/4 translate-x-1/2 w-[850px] h-[500px] bg-[#ABDAC8]/7 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#ABDAC8]/12 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* 3. Scattered Low-Opacity Particle Dots */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[
          { top: "6%", left: "12%", size: 4, color: "#ABDAC8", opacity: 0.35 },
          { top: "14%", left: "86%", size: 3, color: "#D4EDE3", opacity: 0.25 },
          { top: "24%", left: "7%", size: 5, color: "#7BC4A8", opacity: 0.2 },
          { top: "34%", left: "93%", size: 4, color: "#ABDAC8", opacity: 0.3 },
          { top: "46%", left: "16%", size: 3, color: "#6B7280", opacity: 0.25 },
          { top: "58%", left: "84%", size: 5, color: "#ABDAC8", opacity: 0.2 },
          { top: "70%", left: "9%", size: 4, color: "#D4EDE3", opacity: 0.3 },
          { top: "82%", left: "90%", size: 3, color: "#7BC4A8", opacity: 0.25 },
          { top: "92%", left: "18%", size: 5, color: "#ABDAC8", opacity: 0.35 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              top: dot.top,
              left: dot.left,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              boxShadow: `0 0 8px ${dot.color}`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 4. SCROLL-RESPONSIVE GLOWING ACCENT LINE (SVG Scrubbed with GSAP) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 5200"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mintGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ABDAC8" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#7BC4A8" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#D4EDE3" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#ABDAC8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7BC4A8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="mintGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base faint dotted trail */}
          <path
            d="M 500 80 C 800 320, 880 750, 800 1150 C 700 1600, 180 1850, 200 2350 C 220 2850, 820 3150, 800 3650 C 760 4150, 250 4450, 500 5150"
            stroke="#26262E"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeOpacity="0.4"
          />

          {/* Animated Glowing Foreground Path (Syncs with scroll) */}
          <path
            ref={glowPathRef}
            d="M 500 80 C 800 320, 880 750, 800 1150 C 700 1600, 180 1850, 200 2350 C 220 2850, 820 3150, 800 3650 C 760 4150, 250 4450, 500 5150"
            stroke="url(#mintGlowGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#mintGlowFilter)"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 1. NAVBAR */}
      {/* ========================================================================= */}
      <header className="border-b border-[#26262E]/80 bg-[#0A0A0F]/85 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center shadow-[0_0_15px_rgba(171,218,200,0.15)] group-hover:border-[#ABDAC8] transition-colors">
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

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wide text-[#9CA3AF]">
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollTo(e, "#how-it-works")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              HOW IT WORKS
            </a>
            <a
              href="#workspace-demo"
              onClick={(e) => handleScrollTo(e, "#workspace-demo")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              IDE DEMO
            </a>
            <a
              href="#tracks"
              onClick={(e) => handleScrollTo(e, "#tracks")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              8 TRACKS
            </a>
            <a
              href="#features"
              onClick={(e) => handleScrollTo(e, "#features")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              ARCHITECTURE
            </a>
            <a
              href="#comparison"
              onClick={(e) => handleScrollTo(e, "#comparison")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              COMPARISON
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "#pricing")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              PRICING
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollTo(e, "#faq")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs & User Nav */}
          <div className="flex items-center gap-3">
            <Link href="/challenges" className="hidden sm:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 text-xs font-mono border-[#26262E] text-[#ABDAC8] bg-[#111117] hover:border-[#ABDAC8]/50 hover:bg-[#16161F]"
              >
                Catalog
              </Button>
            </Link>

            <UserNav />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-[#F5F5F7] border border-[#26262E] bg-[#111117]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#26262E] bg-[#0E0E14] px-6 py-4 space-y-3 text-sm font-mono">
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollTo(e, "#how-it-works")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              01 // HOW IT WORKS
            </a>
            <a
              href="#workspace-demo"
              onClick={(e) => handleScrollTo(e, "#workspace-demo")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              02 // IDE WORKSPACE DEMO
            </a>
            <a
              href="#tracks"
              onClick={(e) => handleScrollTo(e, "#tracks")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              03 // 8 TRACKS CATALOG
            </a>
            <a
              href="#features"
              onClick={(e) => handleScrollTo(e, "#features")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              04 // CORE ARCHITECTURE
            </a>
            <a
              href="#comparison"
              onClick={(e) => handleScrollTo(e, "#comparison")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              05 // WHY STAQOR
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "#pricing")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              06 // PRICING
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollTo(e, "#faq")}
              className="block py-1.5 text-[#9CA3AF] hover:text-[#ABDAC8]"
            >
              07 // FAQ
            </a>
            <div className="pt-2 border-t border-[#26262E] flex gap-2">
              <Link href="/challenges" className="flex-1">
                <Button variant="outline" className="w-full text-xs font-mono border-[#26262E]">
                  Browse Challenges
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="container mx-auto px-6 pt-16 sm:pt-20 pb-20 text-center relative z-10">
        {/* Eyebrow Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111614] border border-[#26352E] text-xs font-mono text-[#ABDAC8] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" />
          <span>SUB-2.5S GROQ AI EVALUATION • 100% CLIENT-SIDE SANDBOX</span>
        </div>

        {/* Editorial Headline + Hand-Drawn Squiggle Accent */}
        <div className="relative max-w-5xl mx-auto mb-6">
          <div className="hero-doodle absolute -top-8 right-8 hidden md:block pointer-events-none">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 0L20.5 13.5L34 16L20.5 18.5L18 32L15.5 18.5L2 16L15.5 13.5L18 0Z"
                fill="#ABDAC8"
                fillOpacity="0.8"
              />
            </svg>
          </div>

          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-[#F5F5F7]">
            The in-browser IDE for modern frontend{" "}
            <span className="relative inline-block">
              <span className="font-serif italic font-normal text-[#ABDAC8]">craftsmanship.</span>
              <svg
                className="hero-doodle absolute -bottom-3 left-0 w-full h-3 text-[#ABDAC8] opacity-80"
                viewBox="0 0 250 12"
                fill="none"
              >
                <path
                  d="M3 8.5C45 2.5 85 11 125 7C165 3 205 10 247 4.5"
                  stroke="#ABDAC8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Subhead */}
        <p className="hero-subhead text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-10 leading-relaxed">
          Solve real HTML/CSS, JS DOM, and React component challenges inside a split Monaco IDE. Graded against
          multi-criteria rubrics in &lt;2.5s by Groq AI with zero server latency, and proven with live recruiter replay
          sandboxes.
        </p>

        {/* Hero CTA Button Group */}
        <div className="hero-cta relative inline-flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup">
            <button className="px-8 py-4 text-sm font-bold rounded-xl bg-[#ABDAC8] text-[#0A0A0F] border-2 border-[#ABDAC8] shadow-[5px_5px_0px_#26262E] hover:shadow-[2px_2px_0px_#26262E] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px] transition-all flex items-center gap-2 cursor-pointer">
              <span>Start Practicing Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <Link href="/challenges">
            <Button
              size="lg"
              variant="outline"
              className="h-[52px] px-8 text-sm font-semibold rounded-xl bg-[#111117] border-[#26262E] text-[#F5F5F7] hover:border-[#ABDAC8]/50 hover:bg-[#16161F] transition-all"
            >
              Explore 8 Tracks Catalog
            </Button>
          </Link>

          <div className="hero-doodle absolute -bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 text-xs font-mono text-[#ABDAC8]/90 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5 Runs & 3 Submits Free • Zero Server Lag • Lifetime Quota</span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* INTERACTIVE HERO WORKSPACE SIMULATION (Lawtrades Signature Overlap) */}
        {/* ===================================================================== */}
        <div id="workspace-demo" className="relative max-w-5xl mx-auto pt-6">
          {/* Dotted Connector Line */}
          <svg
            className="hero-connector absolute -top-10 right-24 w-48 h-32 hidden lg:block pointer-events-none z-20"
            viewBox="0 0 200 120"
            fill="none"
          >
            <path
              d="M10 10 C 80 10, 150 50, 180 110"
              stroke="#ABDAC8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Floating AI Verdict Card */}
          <div
            ref={floatingBadgeRef}
            className="mb-4 lg:mb-0 lg:absolute lg:-top-8 lg:-right-4 z-30 w-full lg:w-80 p-4 rounded-2xl bg-[#16161F]/95 backdrop-blur-md border border-[#ABDAC8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(171,218,200,0.15)] text-left transition-all"
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
                <span>Layout & Visual Fidelity:</span>
                <span className="text-[#ABDAC8] font-semibold">35/35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DOM & Toggle State:</span>
                <span className="text-[#ABDAC8] font-semibold">34/35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Semantic Cleanliness:</span>
                <span className="text-[#ABDAC8] font-semibold">25/30%</span>
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
            {/* Extended Corner Decor */}
            <DecorIcon position="top-left" className="text-[#ABDAC8]/40" />
            <DecorIcon position="top-right" className="text-[#ABDAC8]/40" />

            {/* Top Workspace Bar */}
            <div className="h-11 border-b border-[#26262E] bg-[#0E0E14] px-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F87171]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FBBF24]/80" />
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]/80" />
                <span className="text-xs font-mono text-[#9CA3AF] ml-2 hidden sm:inline">
                  staqor-workspace // interactive-pricing-card
                </span>
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

            {/* Split Layout: 40% Left Spec/Rubric/Feedback / 60% Right Monaco + Console */}
            <div className="grid md:grid-cols-12 min-h-[460px]">
              {/* 40% Left Panel (4 Tabs: Spec, Rubric, Preview, Feedback) */}
              <div className="md:col-span-5 p-4 sm:p-5 border-r border-[#26262E] bg-[#0F0F16]/70 flex flex-col justify-between">
                <div>
                  {/* Left Tabs Bar */}
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

                  {/* Left Tab Content */}
                  {mockupLeftTab === "spec" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono text-[#4ADE80] border-[#4ADE80]/30">
                          EASY
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                          HTML & CSS
                        </Badge>
                        <span className="text-[11px] font-mono text-[#9CA3AF]">Runs: 1/5 • Submits: 1/3</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#F5F5F7]">
                        Interactive Pricing Table with Monthly/Annual Switch
                      </h3>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">
                        Construct a responsive pricing matrix featuring an annual billing toggle that updates prices
                        dynamically with accessible semantics and CSS transitions.
                      </p>

                      <div className="p-3 rounded-lg bg-[#16161F] border border-[#26262E] space-y-1.5 text-xs">
                        <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block">
                          Requirement Checklist
                        </span>
                        <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Responsive CSS Grid (1-col on mobile, 3 on
                          desktop)
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Click listener updates rate without full
                          page reload
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> Semantic button tags with ARIA labels
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
                            <span>2. DOM State & Event Logic</span>
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
                            className={`w-7 h-7 ${
                              mockupViewport === "desktop" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"
                            }`}
                          >
                            <Monitor className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setMockupViewport("tablet")}
                            className={`w-7 h-7 ${
                              mockupViewport === "tablet" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"
                            }`}
                          >
                            <Tablet className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setMockupViewport("mobile")}
                            className={`w-7 h-7 ${
                              mockupViewport === "mobile" ? "text-[#ABDAC8] bg-[#16161F]" : "text-[#9CA3AF]"
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Interactive Simulated Component Render */}
                      <div className="p-4 rounded-xl bg-[#0A0A0F] border border-[#26262E] text-center">
                        <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 rounded bg-[#16161F] border border-[#26262E] text-[10px] font-mono">
                          <span>Billing:</span>
                          <button
                            onClick={() => {
                              setMockupAnnualBilling(!mockupAnnualBilling);
                              setMockupLogs((prev) => [
                                ...prev,
                                `[Preview Event] Toggle switched: ${!mockupAnnualBilling ? "Annual ($15)" : "Monthly ($19)"}`,
                              ]);
                            }}
                            className="px-2 py-0.5 rounded bg-[#ABDAC8] text-[#0A0A0F] font-bold cursor-pointer hover:opacity-90"
                          >
                            {mockupAnnualBilling ? "Annual (Save 20%)" : "Monthly"}
                          </button>
                        </div>

                        <div className="p-4 rounded-lg bg-[#111614] border border-[#ABDAC8]/40">
                          <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block mb-1">
                            PRO CANDIDATE
                          </span>
                          <div className="text-2xl font-extrabold text-[#F5F5F7] mb-1">
                            ${mockupAnnualBilling ? "15" : "19"}
                            <span className="text-xs text-[#9CA3AF] font-normal"> / mo</span>
                          </div>
                          <p className="text-[10px] text-[#9CA3AF] mb-3">Unlimited AI runs + recruiter portfolio</p>
                          <button className="w-full py-1.5 text-xs font-bold rounded bg-[#ABDAC8] text-[#0A0A0F] shadow-[2px_2px_0px_#26262E]">
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
                          Exceptional implementation! The annual billing state changes flawlessly without layout shift.
                          CSS Grid alignment holds robustly across responsive breakpoints.
                        </p>
                      </div>

                      <div className="text-[11px] font-mono space-y-1 text-[#9CA3AF]">
                        <p className="text-[#ABDAC8]">💡 Recommendation for production:</p>
                        <p>Consider adding `aria-pressed=&quot;true&quot;` to the toggle switch for enhanced screen reader feedback.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Left Status */}
                <div className="pt-3 border-t border-[#26262E]/70 flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#ABDAC8]" /> Scaffolding Locked
                  </span>
                  <span className="text-[#ABDAC8]">Ready for Run / Submit</span>
                </div>
              </div>

              {/* 60% Right Monaco Editor + Interactive Console */}
              <div className="md:col-span-7 flex flex-col bg-[#0A0A0F]">
                {/* Monaco Tab Bar */}
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

                {/* Monaco Code Pane */}
                <div className="p-4 font-mono text-[11px] text-[#9CA3AF] bg-[#0B0B10] flex-1 overflow-x-auto leading-relaxed border-b border-[#26262E]">
                  <pre className="text-[#F5F5F7]/90">{codeSnippets[mockupEditorTab]}</pre>
                </div>

                {/* Stacked LeetCode-Style Interactive Console Drawer */}
                <div className="p-3 bg-[#0E0E14] border-b border-[#26262E] flex flex-col justify-between max-h-32 overflow-y-auto font-mono text-[10px]">
                  <div className="flex items-center justify-between pb-1 border-b border-[#26262E]/60 text-[#9CA3AF] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-[#ABDAC8]" /> Interactive Output & Runtime Logs
                    </span>
                    <button
                      onClick={() =>
                        setMockupLogs(["[Sandbox] Logs cleared.", "[Groq LPU] Ready for diagnostic Run or Submit."])
                      }
                      className="hover:text-[#F5F5F7]"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-0.5 text-[#9CA3AF]">
                    {mockupLogs.slice(-3).map((log, i) => (
                      <div key={i} className="truncate">
                        <span className="text-[#6B7280]">{new Date().toLocaleTimeString()} </span>
                        <span className={log.includes("PASSED") ? "text-[#4ADE80]" : "text-[#ABDAC8]"}>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Bar (RUN / SUBMIT) */}
                <div className="p-3 bg-[#111117] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                    <span className="text-xs font-mono text-[#9CA3AF]">Isolated Sandbox Engine</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isEvaluating}
                      onClick={() => handleRunEvaluation("run")}
                      className="h-8 text-xs font-mono border-[#ABDAC8]/50 text-[#ABDAC8] hover:bg-[#ABDAC8]/10"
                    >
                      {isEvaluating ? (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 animate-spin" /> GRADING...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" /> RUN (DIAGNOSTIC)
                        </span>
                      )}
                    </Button>

                    <button
                      disabled={isEvaluating}
                      onClick={() => handleRunEvaluation("submit")}
                      className="px-4 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#ABDAC8] text-[#0A0A0F] shadow-[3px_3px_0px_#26262E] hover:shadow-[1px_1px_0px_#26262E] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer disabled:opacity-50"
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
      {/* 3. TRUST STRIP / TECH STACK MARQUEE */}
      {/* ========================================================================= */}
      <section className="gsap-reveal border-y border-[#26262E]/70 py-10 bg-[#0E0E14]/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]/70 mb-6">
            Targeting modern frontend roles at engineering-led tech teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            {["VERCEL", "STRIPE", "LINEAR", "SUPABASE", "RETOOL", "SHOPIFY", "AIRBNB", "GITHUB"].map((brand) => (
              <span
                key={brand}
                className="text-sm md:text-base font-bold font-mono tracking-widest text-[#9CA3AF] hover:text-[#ABDAC8] transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "HOW IT WORKS" — 4-STEP WORKFLOW */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="gsap-reveal container mx-auto px-6 py-20 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
              STEP-BY-STEP WORKFLOW
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
              From Challenge Spec to <span className="font-serif italic font-normal text-[#ABDAC8]">Provable Proof.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : HOW_IT_WORKS_STEPS.length - 1))}
              className="w-10 h-10 rounded-xl border-[#26262E] bg-[#111117] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
              aria-label="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveStep((prev) => (prev < HOW_IT_WORKS_STEPS.length - 1 ? prev + 1 : 0))}
              className="w-10 h-10 rounded-xl border-[#26262E] bg-[#111117] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
              aria-label="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {HOW_IT_WORKS_STEPS.map((st, idx) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? "bg-[#16161F] border-[#ABDAC8] shadow-[0_0_20px_rgba(171,218,200,0.1)]"
                  : "bg-[#111117] border-[#26262E] text-[#9CA3AF] hover:border-[#26262E]/90 hover:text-[#F5F5F7]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${activeStep === idx ? "text-[#ABDAC8]" : "text-[#6B7280]"}`}>
                  {st.num}
                </span>
                <span className="text-[10px] font-mono uppercase">{st.tag}</span>
              </div>
              <p className="text-xs font-semibold truncate text-[#F5F5F7]">{st.title}</p>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        <div className="p-8 rounded-2xl bg-[#111117] border border-[#26262E] shadow-2xl grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <DecorIcon position="top-right" className="text-[#ABDAC8]/30" />
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16161F] border border-[#26262E] text-xs font-mono text-[#ABDAC8]">
              <span>PHASE {HOW_IT_WORKS_STEPS[activeStep].num} OF 04</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">{HOW_IT_WORKS_STEPS[activeStep].title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{HOW_IT_WORKS_STEPS[activeStep].desc}</p>
          </div>

          <div className="md:col-span-5 p-6 rounded-xl bg-[#0A0A0F] border border-[#26262E] space-y-4">
            <div className="flex items-center justify-between border-b border-[#26262E] pb-3 text-xs font-mono">
              <span className="text-[#9CA3AF]">TARGET TRACK</span>
              <span className="text-[#ABDAC8] font-bold">{HOW_IT_WORKS_STEPS[activeStep].preview.track}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#6B7280] block mb-1">Focus Domain</span>
              <p className="text-sm font-semibold text-[#F5F5F7]">{HOW_IT_WORKS_STEPS[activeStep].preview.title}</p>
            </div>
            <div className="flex items-center justify-between pt-2 text-xs font-mono">
              <Badge variant="outline" className="text-[10px] text-[#4ADE80] border-[#4ADE80]/30">
                {HOW_IT_WORKS_STEPS[activeStep].preview.difficulty}
              </Badge>
              <span className="text-[#9CA3AF]">{HOW_IT_WORKS_STEPS[activeStep].preview.time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE 8-TRACK EXPLORER */}
      {/* ========================================================================= */}
      <section id="tracks" className="gsap-reveal container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            EXPANSIVE CURRICULUM
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Practice Across <span className="font-serif italic font-normal text-[#ABDAC8]">8 Specialized Tracks.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            From core HTML & CSS fundamentals to advanced React state machines and realistic bug-fixing scenarios.
          </p>
        </div>

        {/* Track Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {TRACKS_DATA.map((tr, idx) => {
            const Icon = tr.icon;
            return (
              <button
                key={tr.id}
                onClick={() => setSelectedTrack(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                  selectedTrack === idx
                    ? "bg-[#ABDAC8] text-[#0A0A0F] font-bold shadow-[3px_3px_0px_#26262E]"
                    : "bg-[#111117] border border-[#26262E] text-[#9CA3AF] hover:text-[#F5F5F7] hover:border-[#ABDAC8]/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tr.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Highlight Banner */}
        <div className="p-8 rounded-3xl bg-[#111117] border border-[#26262E] shadow-2xl grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <DecorIcon position="bottom-right" className="text-[#ABDAC8]/30" />
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                {TRACKS_DATA[selectedTrack].tag}
              </Badge>
              <span className="text-xs font-mono text-[#9CA3AF]">
                {TRACKS_DATA[selectedTrack].challengesCount} Challenges Available
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7]">{TRACKS_DATA[selectedTrack].title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{TRACKS_DATA[selectedTrack].desc}</p>

            <div className="pt-2">
              <Link href="/challenges">
                <Button className="bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 font-bold text-xs font-mono">
                  <span>Browse {TRACKS_DATA[selectedTrack].title}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sample Challenge Card Preview */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0A0A0F] border border-[#26262E] space-y-4">
            <div className="flex items-center justify-between border-b border-[#26262E] pb-3">
              <span className="text-xs font-mono text-[#9CA3AF]">FEATURED CHALLENGE</span>
              <Badge
                variant="outline"
                className={`text-[10px] font-mono ${
                  TRACKS_DATA[selectedTrack].sample.difficulty === "EASY"
                    ? "text-[#4ADE80] border-[#4ADE80]/30"
                    : TRACKS_DATA[selectedTrack].sample.difficulty === "MEDIUM"
                    ? "text-[#FBBF24] border-[#FBBF24]/30"
                    : "text-[#F87171] border-[#F87171]/30"
                }`}
              >
                {TRACKS_DATA[selectedTrack].sample.difficulty} • {TRACKS_DATA[selectedTrack].sample.estTime}
              </Badge>
            </div>

            <h4 className="text-base font-bold text-[#F5F5F7]">{TRACKS_DATA[selectedTrack].sample.name}</h4>

            <div className="p-3 rounded-lg bg-[#16161F] border border-[#26262E] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block">
                Primary Rubric Weight
              </span>
              <p className="text-xs text-[#9CA3AF]">{TRACKS_DATA[selectedTrack].sample.rubricFocus}</p>
            </div>

            <Link href="/challenges" className="block pt-2">
              <Button
                variant="outline"
                className="w-full text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
              >
                Open in Workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CORE ARCHITECTURE PILLARS */}
      {/* ========================================================================= */}
      <section id="features" className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            CORE ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Engineered for Provable <span className="font-serif italic font-normal text-[#ABDAC8]">Product Craft.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Three uncompromising pillars that set Staqor apart from traditional puzzle platforms.
          </p>
        </div>

        <div className="gsap-stagger-grid grid md:grid-cols-3 gap-8 relative">
          {/* Feature Card 1 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <DecorIcon position="top-left" className="text-[#ABDAC8]/30" />
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                ZERO-SERVER SANDBOX
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">100% Client-Side Iframe Execution</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Code compiles and executes entirely in the client using an isolated iframe with a 2000ms loop-killer wrapper.
                Zero Docker spin-up lag and zero server execution attack surface.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <DecorIcon position="top-left" className="text-[#ABDAC8]/30" />
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                GROQ LPU & PRE-FILTER GATE
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">Sub-2.5s Multi-Criteria AI Rubrics</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Structural pre-filters eliminate token waste on typos before Groq LPU evaluates layout fidelity, DOM event
                mutations, and semantic cleanliness against weighted JSON rubrics.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <DecorIcon position="top-left" className="text-[#ABDAC8]/30" />
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                LIVE PORTFOLIOS
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">Interactive Recruiter Replay Sandboxes</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Passed solutions publish to your public portfolio with interactive read-only Monaco tabs and live iframe
                replays for recruiters to test with one click—no repository cloning required.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FEATURE COMPARISON TABLE (Why Staqor) */}
      {/* ========================================================================= */}
      <section id="comparison" className="gsap-reveal container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            BENCHMARK
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Why Frontend Engineers <span className="font-serif italic font-normal text-[#ABDAC8]">Choose Staqor.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Algorithmic platforms evaluate abstract math puzzles. Staqor evaluates what you actually build on the job.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#26262E] bg-[#111117] shadow-2xl relative">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#26262E] bg-[#0E0E14] text-[#9CA3AF] font-mono text-[11px]">
                <th className="p-4 sm:p-5">CAPABILITY</th>
                <th className="p-4 sm:p-5 text-[#ABDAC8] font-bold">STAQOR</th>
                <th className="p-4 sm:p-5">LEETCODE / HACKERRANK</th>
                <th className="p-4 sm:p-5">GITHUB / PORTFOLIOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26262E] text-[#9CA3AF]">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#F5F5F7]">Real UI & Design System Testing</td>
                <td className="p-4 sm:p-5 text-[#4ADE80] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Full Visual Evaluation
                </td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Algorithm / stdout only</td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Static code only</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#F5F5F7]">Sub-2.5s AI Multi-Criteria Rubric</td>
                <td className="p-4 sm:p-5 text-[#4ADE80] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Groq LPU (35/35/30%)
                </td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Unit test assertions</td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ No automated grading</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#F5F5F7]">Zero Token-Waste Pre-Filter Gate</td>
                <td className="p-4 sm:p-5 text-[#4ADE80] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Instant Syntax Guard
                </td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Compiles on remote VM</td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ N/A</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#F5F5F7]">One-Click Recruiter Replay Sandbox</td>
                <td className="p-4 sm:p-5 text-[#4ADE80] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Interactive Live Replay
                </td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Code snippet text</td>
                <td className="p-4 sm:p-5 text-[#6B7280]">⚠️ Must clone & run `npm i`</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#F5F5F7]">Scoped Scaffolding & Lock Enforcement</td>
                <td className="p-4 sm:p-5 text-[#4ADE80] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Read-Only Scaffolding
                </td>
                <td className="p-4 sm:p-5 text-[#6B7280]">⚠️ Single function stub</td>
                <td className="p-4 sm:p-5 text-[#6B7280]">❌ Unstructured repository</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. DEVELOPER & RECRUITER TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="gsap-reveal container mx-auto px-6 py-16 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            COMMUNITY & PRAISE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Trusted by Builders & <span className="font-serif italic font-normal text-[#ABDAC8]">Hiring Teams.</span>
          </h2>
        </div>

        <div className="gsap-stagger-grid grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Card
              key={idx}
              className="gsap-card bg-[#111117] border-[#26262E] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <DecorIcon position="top-right" className="text-[#ABDAC8]/25" />
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#ABDAC8]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed italic">&ldquo;{t.content}&rdquo;</p>
              </div>

              <div className="pt-6 border-t border-[#26262E] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#16161F] border border-[#ABDAC8]/30 flex items-center justify-center font-mono font-bold text-xs text-[#ABDAC8]">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F5F7]">{t.name}</h4>
                  <p className="text-[10px] font-mono text-[#9CA3AF]">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PRICING PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section id="pricing" className="gsap-reveal container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            TRANSPARENT TIERS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Practice for Free. Upgrade for <span className="font-serif italic font-normal text-[#ABDAC8]">Pro Speed.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Generous lifetime free quotas with instant Pro upgrades for active job seekers.
          </p>
        </div>

        <div className="gsap-stagger-grid grid md:grid-cols-3 gap-8 items-stretch">
          {/* Free Starter */}
          <div className="gsap-card p-8 rounded-2xl bg-[#111117] border border-[#26262E] flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold font-mono text-[#9CA3AF]">FREE STARTER</span>
                <Badge variant="outline" className="text-[10px] border-[#26262E]">
                  $0 / FOREVER
                </Badge>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#F5F5F7]">$0</span>
                <span className="text-xs text-[#9CA3AF]"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#9CA3AF] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Access all core free challenges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>5 Runs & 3 Submits lifetime per challenge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Groq AI rubric scoring & feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Public recruiter portfolio replay</span>
                </li>
              </ul>
            </div>

            <Link href="/signup">
              <Button variant="outline" className="w-full h-11 border-[#26262E] hover:bg-[#16161F] text-xs font-semibold">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Staqor Pro (Highlighted) */}
          <div className="gsap-card p-8 rounded-2xl bg-[#111614] border-2 border-[#ABDAC8] relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(171,218,200,0.15)] overflow-hidden">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[10px] px-3 py-0.5">MOST POPULAR</Badge>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold font-mono text-[#ABDAC8]">STAQOR PRO</span>
                <Badge variant="outline" className="text-[10px] text-[#ABDAC8] border-[#ABDAC8]/30">
                  ACTIVE DEV
                </Badge>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#F5F5F7]">$15</span>
                <span className="text-xs text-[#9CA3AF]"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#F5F5F7] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span className="font-semibold">Unlimited Runs & Submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Instant Model Solution Unlocking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Verified Candidate Recruiter Badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>All 8 Track Challenges Unlocked</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Priority Groq LPU inference queue</span>
                </li>
              </ul>
            </div>

            <Link href="/signup?plan=pro">
              <button className="w-full py-3 text-xs font-bold rounded-xl bg-[#ABDAC8] text-[#0A0A0F] border border-[#ABDAC8] shadow-[4px_4px_0px_#26262E] hover:shadow-[1px_1px_0px_#26262E] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer">
                Upgrade to Pro
              </button>
            </Link>
          </div>

          {/* Enterprise / Team */}
          <div className="gsap-card p-8 rounded-2xl bg-[#111117] border border-[#26262E] flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold font-mono text-[#9CA3AF]">ENTERPRISE</span>
                <Badge variant="outline" className="text-[10px] border-[#26262E]">
                  HIRING TEAMS
                </Badge>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#F5F5F7]">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-[#9CA3AF] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Custom company interview rubrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Dedicated candidate assessment portals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Team grading analytics & audit logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Dedicated Slack & SLA support</span>
                </li>
              </ul>
            </div>

            <a href="mailto:sales@staqor.dev?subject=Staqor%20Enterprise%20Inquiry">
              <Button variant="outline" className="w-full h-11 border-[#26262E] hover:bg-[#16161F] text-xs font-semibold">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) — Radix UI Accordion */}
      {/* ========================================================================= */}
      <section id="faq" className="gsap-reveal container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            GOT QUESTIONS?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            Frequently Asked <span className="font-serif italic font-normal text-[#ABDAC8]">Questions.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-2xl border border-[#26262E] bg-[#111117] px-6 transition-all overflow-hidden"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-[#F5F5F7] hover:no-underline py-5 focus-visible:outline-none">
                <span>{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-1 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed border-t border-[#26262E]/50">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL CTA BANNER & FOOTER */}
      {/* ========================================================================= */}
      <section className="gsap-reveal container mx-auto px-6 py-20 max-w-5xl">
        <div className="p-10 md:p-16 rounded-3xl bg-[#111614] border border-[#ABDAC8]/40 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(171,218,200,0.1)] text-center relative overflow-hidden">
          <div className="absolute top-8 left-8 hidden sm:block opacity-40">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 0L20.5 13.5L34 16L20.5 18.5L18 32L15.5 18.5L2 16L15.5 13.5L18 0Z"
                fill="#ABDAC8"
              />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4 max-w-2xl mx-auto leading-tight">
            Ready to prove your frontend{" "}
            <span className="font-serif italic font-normal text-[#ABDAC8]">craftsmanship?</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto mb-8 leading-relaxed">
            Join developers practicing real UI components, receiving sub-2.5s Groq AI feedback, and landing offers with live recruiter portfolios.
          </p>

          <Link href="/signup">
            <button className="px-8 py-4 text-sm font-bold rounded-xl bg-[#ABDAC8] text-[#0A0A0F] border border-[#ABDAC8] shadow-[5px_5px_0px_#26262E] hover:shadow-[2px_2px_0px_#26262E] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px] transition-all inline-flex items-center gap-2 cursor-pointer">
              <span>Start Free Practice Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#26262E]/70 py-12 bg-[#0E0E14]/70 text-xs font-mono text-[#9CA3AF]">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#ABDAC8]/20 border border-[#ABDAC8]/40 flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#ABDAC8]" />
            </div>
            <span className="font-bold text-[#F5F5F7]">STAQOR</span>
            <span>• In-Browser IDE & AI Rubric Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollTo(e, "#how-it-works")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              Workflow
            </a>
            <a
              href="#tracks"
              onClick={(e) => handleScrollTo(e, "#tracks")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              Tracks
            </a>
            <a
              href="#features"
              onClick={(e) => handleScrollTo(e, "#features")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              Architecture
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "#pricing")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollTo(e, "#faq")}
              className="hover:text-[#F5F5F7] transition-colors"
            >
              FAQ
            </a>
            <span className="inline-flex items-center gap-1.5 text-[#4ADE80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
