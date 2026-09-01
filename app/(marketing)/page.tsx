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
  GitCommitHorizontal,
  Code2,
  Rocket,
  Layers,
  Terminal,
  Trophy,
  Briefcase,
  HelpCircle,
  ChevronDown,
  X,
  Star,
  Quote,
  Mail,
  MessageSquare,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/SpotlightCard";
import { UserNav } from "@/components/navigation/UserNav";

// ---------------------------------------------------------------------------
// Dynamic Hero Live Proof Submissions
// ---------------------------------------------------------------------------
const PROOF_SUBMISSIONS = [
  {
    id: 1,
    tag: "// Daily Challenge #48 — React & State Cohort",
    command: '$ staqor submit --challenge="virtualized-infinite-scroll"',
    streak: 48,
    name: "Aarav Sharma",
    role: "Frontend Engineer '25",
    track: "React Components",
    score: "96/100",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 2,
    tag: "// Daily Challenge #23 — JavaScript & DOM Events",
    command: '$ staqor submit --challenge="drag-and-drop-kanban-board"',
    streak: 23,
    name: "Priya Patel",
    role: "UI Engineer '26",
    track: "JS / DOM Logic",
    score: "94/100",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 3,
    tag: "// Daily Challenge #60 — HTML & CSS Layouts",
    command: '$ staqor submit --challenge="responsive-pricing-matrix"',
    streak: 60,
    name: "Rohan Gupta",
    role: "Full-Stack Dev '25",
    track: "CSS Architecture",
    score: "98/100",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 4,
    tag: "// Daily Challenge #34 — Vue.js Composition API",
    command: '$ staqor submit --challenge="multi-step-form-validation"',
    streak: 34,
    name: "Ananya Iyer",
    role: "Frontend Specialist '26",
    track: "Vue 3 Reactive UI",
    score: "92/100",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 5,
    tag: "// Daily Challenge #14 — Node.js & Mock APIs",
    command: '$ staqor submit --challenge="in-memory-rate-limiter"',
    streak: 14,
    name: "Vikram Verma",
    role: "API Engineer '25",
    track: "Node.js & APIs",
    score: "95/100",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

// ---------------------------------------------------------------------------
// FAQ List
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: "What is Staqor and how does it work?",
    a: "Staqor is the in-browser IDE for modern frontend engineering. Instead of testing abstract math algorithms, Staqor tests real frontend skills: responsive CSS Grid/Flexbox layouts, DOM event handling, and React component state—graded by Groq AI against multi-criteria rubrics in under 2.5 seconds.",
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
    q: "How are submissions verified for hiring teams?",
    a: "When you pass a challenge, Staqor publishes a verified candidate showcase on your profile. Recruiters and engineering leads test your live component in an interactive sandbox and inspect your Monaco code tabs with one click—no repository cloning required.",
  },
  {
    q: "What practice formats and tracks are available?",
    a: "Staqor offers 8 specialized tracks spanning HTML & CSS Layouts, JavaScript & DOM Events, React Components, Vue.js, Node.js Mock APIs, Real-World Bug Fixes, and Full-Stack Scenarios across self-paced daily tasks and weekend hackathons.",
  },
];

export default function HomePage() {
  const [activeEntryIndex, setActiveEntryIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentEntry = PROOF_SUBMISSIONS[activeEntryIndex];

  // GSAP Animation Refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

  const trustHeaderRef = useRef<HTMLDivElement>(null);
  const trustGridRef = useRef<HTMLDivElement>(null);
  const progHeaderRef = useRef<HTMLDivElement>(null);
  const progGridRef = useRef<HTMLDivElement>(null);
  const howHeaderRef = useRef<HTMLDivElement>(null);
  const howCardsRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const dot3Ref = useRef<SVGCircleElement>(null);
  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyGridRef = useRef<HTMLDivElement>(null);
  const testHeaderRef = useRef<HTMLDivElement>(null);
  const testGridRef = useRef<HTMLDivElement>(null);
  const faqHeaderRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

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

      // 2. Terminal Entrance
      if (terminalRef.current) {
        gsap.from(terminalRef.current, {
          opacity: 0,
          y: 45,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
        });
      }

      // 3. Infinite Floating Loops for 4 Badges
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

      // 4. Scroll-Responsive Glowing Accent Line Scrub
      const glowPaths = pageContainerRef.current?.querySelectorAll<SVGPathElement>(".glow-scroll-path");
      if (glowPaths && glowPaths.length > 0 && pageContainerRef.current) {
        glowPaths.forEach((path) => {
          const length = path.getTotalLength ? path.getTotalLength() : 6000;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: pageContainerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        });
      }

      // 5. How It Works SVG Connectors
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;
      if (p1 && p2) {
        const len1 = p1.getTotalLength();
        const len2 = p2.getTotalLength();

        gsap.set(p1, { strokeDasharray: len1, strokeDashoffset: len1 });
        gsap.set(p2, { strokeDasharray: len2, strokeDashoffset: len2 });

        if (dot1Ref.current) gsap.set(dot1Ref.current, { scale: 0, opacity: 0, transformOrigin: "center" });
        if (dot2Ref.current) gsap.set(dot2Ref.current, { scale: 0, opacity: 0, transformOrigin: "center" });
        if (dot3Ref.current) gsap.set(dot3Ref.current, { scale: 0, opacity: 0, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#how-it-works",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(dot1Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" })
          .to(p1, { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" })
          .to(dot2Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
          .to(p2, { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, "-=0.2")
          .to(dot3Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2");
      }

      // 6. Section Entrance ScrollTriggers
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
              start: "top 88%",
              once: true,
            },
          });
        }
        if (grid.current) {
          gsap.from(grid.current.children, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid.current,
              start: "top 85%",
              once: true,
            },
          });
        }
      };

      animateSection(trustHeaderRef, trustGridRef);
      animateSection(progHeaderRef, progGridRef);
      animateSection(howHeaderRef, howCardsRef);
      animateSection(whyHeaderRef, whyGridRef);
      animateSection(testHeaderRef, testGridRef);
      animateSection(faqHeaderRef, faqListRef);

      ScrollTrigger.refresh();
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Typewriter Effect for Terminal
  useEffect(() => {
    setTypedText("");
    const fullCommand = currentEntry.command;
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullCommand.length) {
        setTypedText(fullCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [activeEntryIndex]);

  // Auto-cycle Terminal entries every 5.5s
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveEntryIndex((prev) => (prev + 1) % PROOF_SUBMISSIONS.length);
    }, 5500);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-hidden"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND TEXTURE & AMBIENT AQUA/MINT GLOW LAYERS */}
      {/* ========================================================================= */}

      {/* 1. Subtle Background Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
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

      {/* 2. Multi-Stop Ambient Background Aqua Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#ABDAC8]/18 via-[#ABDAC8]/6 to-transparent blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#ABDAC8]/8 blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,#ABDAC826_0%,#ABDAC808_60%,transparent_100%)] blur-[110px] pointer-events-none z-0" />

      {/* 3. SCROLL-RESPONSIVE GLOWING ACCENT LINE (SVG Scrubbed with GSAP) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="thickLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="thickNeonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ABDAC8" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#D4EDE3" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#ABDAC8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7BC4A8" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="thickTrackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#26262E" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ABDAC8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#26262E" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background Inactive Curvy Guide Track */}
          <path
            d="M 50,0 C 12,90 88,180 50,270 C 12,360 8,450 15,540 C 24,630 48,700 68,780 C 84,850 70,930 50,1000"
            stroke="url(#thickTrackGradient)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />

          {/* Active Thick Curvy Glowing Laser Line */}
          <path
            className="glow-scroll-path"
            d="M 50,0 C 12,90 88,180 50,270 C 12,360 8,450 15,540 C 24,630 48,700 68,780 C 84,850 70,930 50,1000"
            stroke="url(#thickNeonGradient)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            filter="url(#thickLaserGlow)"
          />

          {/* Outer Atmospheric Light Aura Trace */}
          <path
            className="glow-scroll-path"
            d="M 50,0 C 12,90 88,180 50,270 C 12,360 8,450 15,540 C 24,630 48,700 68,780 C 84,850 70,930 50,1000"
            stroke="#ABDAC8"
            strokeWidth="4.5"
            strokeOpacity="0.25"
            strokeLinecap="round"
            fill="none"
            filter="blur(8px)"
          />
        </svg>
      </div>

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
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
            <a
              href="#challenges"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              Programs
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
              href="#testimonials"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              Wall of Proof
            </a>
            <a
              href="#faq"
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ABDAC8] hover:after:w-full after:transition-all after:duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action & User Nav */}
          <div className="flex items-center gap-3">
            <Link href="/challenges" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-bold rounded-xl px-5 py-2.5 text-sm shadow-lg shadow-[#ABDAC8]/25 hover:shadow-xl hover:shadow-[#ABDAC8]/40 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Join Challenge</span>
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
              <a
                href="#challenges"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#ABDAC8] transition-colors py-1"
              >
                Programs
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#ABDAC8] transition-colors py-1"
              >
                How It Works
              </a>
              <a
                href="#why-staqor"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#ABDAC8] transition-colors py-1"
              >
                Why Staqor
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#ABDAC8] transition-colors py-1"
              >
                Wall of Proof
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#ABDAC8] transition-colors py-1"
              >
                FAQ
              </a>
              <Link href="/challenges" onClick={() => setMobileMenuOpen(false)} className="pt-2">
                <Button size="sm" className="w-full bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] text-[#0A0A0F] font-bold rounded-xl py-2.5">
                  Join Challenge
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-4">
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center flex flex-col items-center relative">
          {/* Floating Badge 1 (Mid-Left) */}
          <div
            ref={badge1Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#111117]/95 backdrop-blur-xl border border-[#ABDAC8]/40 hover:border-[#ABDAC8] shadow-xl text-xs font-bold text-white absolute -left-6 xl:-left-16 top-72 xl:top-[22rem] z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#ABDAC8]/30 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ABDAC8]/20 text-[#ABDAC8] border border-[#ABDAC8]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-white group-hover:text-[#ABDAC8] transition-colors">
                Verified Proof of Work
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-8 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Auto-validated candidate sandbox &amp; recruiter proof
            </p>
          </div>

          {/* Floating Badge 2 (Top-Right) */}
          <div
            ref={badge2Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-[#26262E] hover:border-[#ABDAC8] shadow-xl text-xs font-bold text-white absolute right-4 xl:right-8 top-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#ABDAC8]/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ABDAC8]/20 text-[#ABDAC8] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="group-hover:text-[#ABDAC8] transition-colors">10,000+ Active Builders</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-8 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Frontend engineers practicing real UI specs
            </p>
          </div>

          {/* Floating Badge 3 (Bottom-Left) */}
          <div
            ref={badge3Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 shadow-xl text-xs font-bold text-emerald-400 absolute left-4 xl:left-8 bottom-4 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>100% Free for Students</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              5 Runs &amp; 3 Submits lifetime per challenge
            </p>
          </div>

          {/* Floating Badge 4 (Bottom-Right) */}
          <div
            ref={badge4Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 shadow-xl text-xs font-bold text-amber-300 absolute right-4 xl:right-8 bottom-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>8 Practice Tracks</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              HTML/CSS, JS DOM, React, Vue, APIs &amp; Bug Fixes
            </p>
          </div>

          {/* Hero Content */}
          <div ref={heroRef} className="flex flex-col items-center max-w-5xl">
            {/* Eyebrow Tag */}
            <h4 className="uppercase text-[#ABDAC8] text-sm sm:text-base md:text-lg font-bold tracking-widest mb-4">
              PRACTICE. &nbsp;EVALUATE. &nbsp;GET PLACED.
            </h4>

            {/* Main Headline */}
            <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
              <h1 className="flex flex-col sm:block items-center">
                <span>Become the Frontend Engineer that </span>
                <span className="inline-block px-3 py-1 my-1 rounded-2xl bg-[#111614] border-2 border-[#ABDAC8] text-[#ABDAC8] shadow-[0_0_35px_rgba(171,218,200,0.35)]">
                  Companies
                </span>
                <span> Want to Hire!</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed mb-8 font-normal">
              Join a growing community of developers mastering real UI components, passing sub-2.5s Groq AI rubrics, and building verified portfolios at Staqor.
            </p>

            {/* Dev Community Avatars & Proof Strip */}
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-zinc-300 font-medium mb-8">
              <div className="flex -space-x-2.5 items-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Staqor Builder"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0A0A0F] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                />
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Staqor Builder"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0A0A0F] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                />
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Staqor Builder"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0A0A0F] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                />
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Staqor Builder"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0A0A0F] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-1.5 text-zinc-200">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="font-bold text-white">10,000+</span>
                <span>Engineers Enrolled</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/challenges" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold px-10 py-7 text-lg rounded-xl shadow-2xl shadow-[#ABDAC8]/35 hover:shadow-2xl hover:shadow-[#ABDAC8]/50 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Explore Challenges</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* DYNAMIC HERO PROOF-OF-WORK SHOWCASE TERMINAL */}
        <section className="pb-16 md:pb-24">
          <div
            ref={terminalRef}
            className="w-full max-w-4xl mx-auto rounded-2xl bg-[#111117] border border-[#26262E] p-4 sm:p-6 shadow-2xl shadow-[#ABDAC8]/10 relative overflow-hidden group"
          >
            {/* CRT Terminal Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-25 z-10" />

            {/* Ambient Terminal Glow Auras */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#ABDAC8]/10 blur-[90px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

            {/* Terminal Header Bar */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#26262E] mb-5 gap-3 relative z-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                <span className="text-xs font-mono text-zinc-400 ml-2 font-semibold flex items-center gap-1.5">
                  <GitCommitHorizontal className="w-3.5 h-3.5 text-[#ABDAC8]" />
                  <span>Staqor Proof-of-Work Terminal v2.4</span>
                </span>
              </div>

              {/* Pulsing Live Commit Stream Indicator */}
              <div className="flex items-center gap-2 text-xs text-[#ABDAC8] font-mono bg-[#111614] px-2.5 py-1 rounded-full border border-[#ABDAC8]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ABDAC8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ABDAC8]" />
                </span>
                <span className="font-bold tracking-wide">Live Evaluation Stream</span>
              </div>
            </div>

            {/* Terminal Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono text-xs relative z-20">
              {/* Left Code Console Panel */}
              <div className="md:col-span-2 bg-[#09090D] p-4 sm:p-5 rounded-xl border border-zinc-800/90 text-zinc-300 leading-relaxed min-h-[175px] flex flex-col justify-between shadow-inner">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-zinc-500 mb-2 font-mono flex items-center justify-between">
                      <span>{currentEntry.tag}</span>
                      <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-wider">{currentEntry.track}</span>
                    </div>

                    {/* Animated GSAP Typewriter Command Line */}
                    <div className="text-[#ABDAC8] font-mono font-bold min-h-[2.5rem] flex items-center flex-wrap">
                      <span>{typedText}</span>
                      <span className="inline-block w-2 h-4 bg-[#ABDAC8] ml-1 animate-pulse" />
                    </div>

                    <div className="text-zinc-400 mt-2 text-[11px] space-y-0.5">
                      <div className="flex items-center gap-1.5 text-emerald-400/90">
                        <span>✔</span>
                        <span>Validating JavaScript syntax &amp; locked scaffolding... OK</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#ABDAC8]">
                        <span>✔</span>
                        <span>Groq LPU multi-criteria rubric evaluation... {currentEntry.score} PASSED</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[#ABDAC8] font-bold mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#ABDAC8] animate-bounce" />
                      <span>Streak updated: {currentEntry.streak} Days Active!</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-sans">Verified Attempt #{48900 + currentEntry.id}</span>
                  </div>
                </div>
              </div>

              {/* Right Active Builder Info Card */}
              <div className="bg-[#09090D] p-4 sm:p-5 rounded-xl border border-zinc-800/90 flex flex-col justify-between min-h-[175px] shadow-inner">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 font-sans font-bold">
                        Active Engineer
                      </div>
                      <div className="text-white font-extrabold text-base font-sans tracking-tight">
                        {currentEntry.name}
                      </div>
                      <div className="text-xs text-[#ABDAC8] font-bold mt-0.5 font-sans">
                        {currentEntry.role}
                      </div>
                    </div>

                    <img
                      src={currentEntry.avatar}
                      alt={currentEntry.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#ABDAC8]/60 shadow-lg"
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-sans font-semibold">Verified Proof</span>
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-5 relative z-20">
              {PROOF_SUBMISSIONS.map((entry, index) => (
                <button
                  key={entry.id}
                  onClick={() => setActiveEntryIndex(index)}
                  aria-label={`View entry ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeEntryIndex ? "w-6 bg-[#ABDAC8]" : "w-1.5 bg-zinc-800 hover:bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. STATS TRUST STRIP */}
        {/* ========================================================================= */}
        <section className="py-10 border-y border-[#26262E]">
          <div ref={trustGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="h-full">
              <div className="p-6 rounded-2xl bg-[#111117] border border-[#26262E] flex items-center gap-5 hover:border-[#ABDAC8]/50 transition-all group relative overflow-hidden shadow-lg h-full">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ABDAC8]/10 rounded-full blur-xl group-hover:bg-[#ABDAC8]/20 transition-all pointer-events-none" />
                <div className="w-14 h-14 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] group-hover:scale-110 transition-transform relative z-10">
                  <Users className="w-7 h-7" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight font-mono">
                    10,000+
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">Active Frontend Engineers</div>
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="h-full">
              <div className="p-6 rounded-2xl bg-[#111117] border border-[#26262E] flex items-center gap-5 hover:border-[#ABDAC8]/50 transition-all group relative overflow-hidden shadow-lg h-full">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ABDAC8]/10 rounded-full blur-xl group-hover:bg-[#ABDAC8]/20 transition-all pointer-events-none" />
                <div className="w-14 h-14 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] group-hover:scale-110 transition-transform relative z-10">
                  <Code2 className="w-7 h-7" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight font-mono">
                    250,000+
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">Verified UI Runs &amp; Submissions</div>
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="h-full">
              <div className="p-6 rounded-2xl bg-[#111117] border border-[#26262E] flex items-center gap-5 hover:border-[#ABDAC8]/50 transition-all group relative overflow-hidden shadow-lg h-full">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ABDAC8]/10 rounded-full blur-xl group-hover:bg-[#ABDAC8]/20 transition-all pointer-events-none" />
                <div className="w-14 h-14 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] group-hover:scale-110 transition-transform relative z-10">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight font-mono">
                    50+
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">Hiring Recruiter Partners</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED PROGRAMS & CHALLENGES */}
        {/* ========================================================================= */}
        <section id="challenges" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={progHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">Platform Programs</div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                Active Challenges &amp; Cohorts
              </h2>
            </div>
            <p className="text-base text-zinc-300 max-w-md font-normal">
              Choose your format and level up through daily interactive proof of work.
            </p>
          </div>

          <div
            ref={progGridRef}
            className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0"
          >
            {/* Card 1: 60-Day Frontend Mastery */}
            <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
              <SpotlightCard accentColor="aqua" watermark="60D">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-full bg-[#ABDAC8]/15 text-[#ABDAC8] border border-[#ABDAC8]/30">
                        Enrolling now
                      </span>
                      <Code2 className="w-5 h-5 text-zinc-400 group-hover:text-[#ABDAC8] transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">
                      60-Day Frontend Mastery
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                      One real UI task every day across HTML/CSS, JS DOM, and React. Build a streak and a verified public portfolio.
                    </p>
                  </div>
                  <div>
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#16161F] text-zinc-200 border border-[#26262E]">
                        60 days
                      </span>
                    </div>
                    <Link href="/challenges" className="block">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-bold rounded-xl py-3 text-sm shadow-md shadow-[#ABDAC8]/25 hover:shadow-lg hover:shadow-[#ABDAC8]/40 border border-[#ABDAC8]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Start the challenge
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </SpotlightCard>
            </div>

            {/* Card 2: 48-Hour UI Hackathon */}
            <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
              <SpotlightCard accentColor="amber" watermark="48H">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        Registration open
                      </span>
                      <Rocket className="w-5 h-5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">
                      48-Hour UI Hackathon
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                      Build full-featured web applications in 48 hours. Compete solo or in teams of up to 3 and ship production UI.
                    </p>
                  </div>
                  <div>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#16161F] text-zinc-200 border border-[#26262E]">
                        48 hours
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#16161F] text-zinc-200 border border-[#26262E]">
                        Teams 1–3
                      </span>
                    </div>
                    <Link href="/challenges" className="block">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border border-[#26262E] bg-[#16161F] hover:bg-zinc-800 hover:border-zinc-500 text-white font-bold rounded-xl py-3 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Explore Staqor
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </SpotlightCard>
            </div>

            {/* Card 3: 31 Days React & State */}
            <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
              <SpotlightCard accentColor="emerald" watermark="31D">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Applications open
                      </span>
                      <Sparkles className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">
                      31 Days React &amp; State
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                      Build production React components in 31 days. Master custom hooks, virtualized windowing, and state machines.
                    </p>
                  </div>
                  <div>
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#16161F] text-zinc-200 border border-[#26262E]">
                        31 days
                      </span>
                    </div>
                    <Link href="/challenges" className="block">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-bold rounded-xl py-3 text-sm shadow-md shadow-[#ABDAC8]/25 hover:shadow-lg hover:shadow-[#ABDAC8]/40 border border-[#ABDAC8]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Apply for cohort
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </SpotlightCard>
            </div>

            {/* Card 4: Full-Stack Mock API Sprint */}
            <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
              <SpotlightCard accentColor="blue" watermark="14D">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-full bg-[#0a6df0]/15 text-[#60a5fa] border border-[#0a6df0]/30">
                        Sprint format
                      </span>
                      <Layers className="w-5 h-5 text-zinc-400 group-hover:text-[#60a5fa] transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">
                      Full-Stack Mock API Sprint
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                      Connect client-side components with mock backends, optimistic cache updates, and error rollback queues.
                    </p>
                  </div>
                  <div>
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#16161F] text-zinc-200 border border-[#26262E]">
                        14 days
                      </span>
                    </div>
                    <Link href="/challenges" className="block">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border border-[#26262E] bg-[#16161F] hover:bg-zinc-800 hover:border-zinc-500 text-white font-bold rounded-xl py-3 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        View sprint specs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. HOW STAQOR WORKS (With SVG Connector Curves) */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden">
          <div ref={howHeaderRef} className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">Step-by-Step Blueprint</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              How Staqor Works
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg font-normal">
              Turn consistent daily effort into career-defining proof of work.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* SVG Connector Overlay with Beziers & Drop-Shadow Glow Filters */}
            <svg
              className="hidden md:block absolute top-10 left-0 w-full h-24 pointer-events-none z-0 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <filter id="glow-aqua-path" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="path1-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ABDAC8" />
                  <stop offset="100%" stopColor="#7BC4A8" />
                </linearGradient>
                <linearGradient id="path2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7BC4A8" />
                  <stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>
              </defs>

              <path
                ref={path1Ref}
                d="M 220 20 C 300 -15, 380 -15, 460 20"
                fill="none"
                stroke="url(#path1-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow-aqua-path)"
              />

              <path
                ref={path2Ref}
                d="M 580 20 C 660 -15, 740 -15, 820 20"
                fill="none"
                stroke="url(#path2-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow-aqua-path)"
              />

              <circle ref={dot1Ref} cx="220" cy="20" r="5" fill="#ABDAC8" filter="url(#glow-aqua-path)" />
              <circle ref={dot2Ref} cx="520" cy="20" r="5" fill="#7BC4A8" filter="url(#glow-aqua-path)" />
              <circle ref={dot3Ref} cx="820" cy="20" r="5" fill="#4ADE80" filter="url(#glow-aqua-path)" />
            </svg>

            {/* 3 Step Cards */}
            <div ref={howCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <SpotlightCard accentColor="aqua" watermark="01">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] mb-6 shadow-md shadow-[#ABDAC8]/20">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-[#ABDAC8] uppercase tracking-wider mb-2 font-mono">
                      Step 01
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Choose a Challenge</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      Filter across 8 tracks (HTML/CSS, JS DOM, React, Vue, APIs) and study comprehensive Figma-aligned specs and rubrics.
                    </p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Step 2 */}
              <SpotlightCard accentColor="aqua" watermark="02">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] mb-6 shadow-md shadow-[#ABDAC8]/20">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-[#ABDAC8] uppercase tracking-wider mb-2 font-mono">
                      Step 02
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Code in Split Monaco</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      Write HTML, CSS, and JS across dedicated tabs with locked scaffolding. Watch real-time component updates inside an isolated sandbox with loop protection.
                    </p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Step 3 */}
              <SpotlightCard accentColor="emerald" watermark="03">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-md shadow-emerald-500/20">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono">
                      Step 03
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">AI Score &amp; Recruiter Proof</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      Groq LPU evaluates visual fidelity, DOM events, and semantic cleanliness in &lt;2.5s. Passed solutions generate interactive recruiter replays.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY STAQOR COMPARISON */}
        {/* ========================================================================= */}
        <section id="why-staqor" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={whyHeaderRef} className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">The Proof of Work Loop</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Why Staqor Wins Over Traditional Platforms
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg">
              Stop solving abstract tree puzzles. Start building real, verified engineering portfolios that get you hired.
            </p>
          </div>

          <div ref={whyGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional LeetCode / Courses */}
            <SpotlightCard accentColor="purple" watermark="OLD">
              <div className="p-8 h-full">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Traditional Platforms</div>
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
                <div className="text-xs font-bold text-[#ABDAC8] uppercase tracking-wider mb-3">The Staqor Way</div>
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
        {/* 6. COMMUNITY CTA BAND */}
        {/* ========================================================================= */}
        <section id="community" className="py-12">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#ABDAC8]/20 via-[#111117] to-[#0A0A0F] border border-[#ABDAC8]/40 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ABDAC8]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
              Join our community for instant updates &amp; cohort drops
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Meet fellow frontend builders, receive challenge alerts, and stay accountable.
            </p>

            <Link href="/challenges" className="inline-block">
              <Button
                size="lg"
                className="bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold px-10 py-7 text-lg rounded-xl shadow-2xl shadow-[#ABDAC8]/40 hover:shadow-2xl hover:shadow-[#ABDAC8]/60 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Join Staqor Free</span>
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. WALL OF PROOF TESTIMONIALS */}
        {/* ========================================================================= */}
        <section id="testimonials" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={testHeaderRef} className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2">Proof of Impact</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              What Our Builders Say
            </h2>
            <p className="text-base text-zinc-300 font-normal">
              Real feedback from developers, candidates, and engineering leaders in the Staqor network.
            </p>
          </div>

          <div ref={testGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quote 1 */}
            <SpotlightCard accentColor="aqua" watermark={<Quote className="w-16 h-16 opacity-30" />}>
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ABDAC8] text-[#0A0A0F] flex items-center justify-center font-bold text-sm shadow-md shadow-[#ABDAC8]/30">
                        SG
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Samridhi Gupta</div>
                        <div className="text-xs text-zinc-400 font-medium">Frontend Engineer @ SaaS Startup</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ABDAC8] text-[#ABDAC8]" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                    &ldquo;Staqor gave me the structure and momentum I needed. Building interactive UI components with sub-2.5s Groq AI feedback transformed my confidence as a frontend engineer.&rdquo;
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Quote 2 */}
            <SpotlightCard accentColor="amber" watermark={<Quote className="w-16 h-16 opacity-30" />}>
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-[#0A0A0F] flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/30">
                        V
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Vivek Nambiar</div>
                        <div className="text-xs text-zinc-400 font-medium">Engineering Lead • 15+ years experience</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                    &ldquo;When reviewing candidate profiles, playing with interactive Staqor sandboxes gives our hiring team instant certainty that the candidate writes accessible, production-grade UI.&rdquo;
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section id="faq" className="py-16 md:py-24 border-t border-[#26262E]">
          <div ref={faqHeaderRef} className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2 flex items-center justify-center gap-1.5">
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
      </main>

      {/* ========================================================================= */}
      {/* 9. FOOTER */}
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
