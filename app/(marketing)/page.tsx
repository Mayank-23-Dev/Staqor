"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMockupRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // How it works steps data
  const steps = [
    {
      num: "01",
      tag: "DISCOVER",
      title: "Pick a Real-World Challenge",
      desc: "Filter by track (HTML/CSS, JS DOM, React, Vue) and difficulty. Read comprehensive specifications and UI design requirements.",
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
      title: "Code in Split Monaco Workspace",
      desc: "Write HTML, CSS, and JS across dedicated tabs. View real-time component updates inside an isolated, sandboxed iframe preview.",
      preview: {
        track: "LIVE WORKSPACE",
        title: "Monaco Editor v0.46 + Debounced Sandboxed Iframe",
        difficulty: "CLIENT-SIDE",
        time: "ZERO LAG",
      },
    },
    {
      num: "03",
      tag: "AI GRADING",
      title: "Sub-2.5s Groq AI Rubric Evaluation",
      desc: "Click RUN for fast diagnostic advice, or SUBMIT for official scoring against multi-criteria weighted rubrics in under 2.5 seconds.",
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
      desc: "Passed solutions generate interactive read-only sandboxes that hiring managers and tech recruiters can test live without cloning repos.",
      preview: {
        track: "LIVE PORTFOLIO",
        title: "Verified Candidate Sandbox + Read-Only Replay",
        difficulty: "PROVABLE CRAFT",
        time: "ONE-CLICK DEMO",
      },
    },
  ];

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Hero Staggered Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      heroTl
        .from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-doodle", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".hero-subhead", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.4")
        .from(heroMockupRef.current, { y: 40, opacity: 0, duration: 1 }, "-=0.3")
        .from(floatingBadgeRef.current, { scale: 0.85, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-connector", { opacity: 0, duration: 0.8 }, "-=0.2");

      // 2. Parallax Floating on Hero Mockup
      if (heroMockupRef.current && floatingBadgeRef.current) {
        gsap.to(heroMockupRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(floatingBadgeRef.current, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // 3. Section Reveal Animations
      const revealSections = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      revealSections.forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // 4. Staggered Cards Reveal
      const cardGrids = gsap.utils.toArray<HTMLElement>(".gsap-stagger-grid");
      cardGrids.forEach((grid) => {
        const cards = grid.querySelectorAll(".gsap-card");
        gsap.from(cards, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
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
      {/* Soft Top Ambient Mint Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#ABDAC8]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. NAVBAR */}
      {/* ========================================================================= */}
      <header className="border-b border-[#26262E]/70 bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center shadow-[0_0_15px_rgba(171,218,200,0.15)]">
              <Terminal className="w-4 h-4 text-[#ABDAC8]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#F5F5F7]">Staqor</span>
            <Badge
              variant="outline"
              className="text-[10px] uppercase font-mono text-[#ABDAC8] border-[#ABDAC8]/30 ml-1 py-0 px-2 bg-[#111614]"
            >
              v1.0 MVP
            </Badge>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#9CA3AF]">
            <a href="#how-it-works" className="hover:text-[#F5F5F7] transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-[#F5F5F7] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#F5F5F7] transition-colors">
              Pricing
            </a>
            <Link href="/challenges" className="hover:text-[#F5F5F7] transition-colors">
              Browse Challenges
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-[#16161F]"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              {/* 3D Offset Button Style */}
              <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#ABDAC8] text-[#0A0A0F] border border-[#ABDAC8] shadow-[3px_3px_0px_#26262E] hover:shadow-[1px_1px_0px_#26262E] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="container mx-auto px-6 pt-20 pb-28 text-center relative z-10">
        {/* Eyebrow Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111614] border border-[#26352E] text-xs font-mono text-[#ABDAC8] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" />
          <span>SUB-2.5S GROQ AI RUBRIC EVALUATION</span>
        </div>

        {/* Varietalink Mix Headline + Doodle Accents */}
        <div className="relative max-w-5xl mx-auto mb-6">
          {/* Top-Right Star Doodle */}
          <div className="hero-doodle absolute -top-8 right-8 hidden md:block pointer-events-none">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {/* Hand-drawn squiggly underline */}
              <svg
                className="hero-doodle absolute -bottom-3 left-0 w-full h-3 text-[#ABDAC8] opacity-80"
                viewBox="0 0 250 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
        <p className="hero-subhead text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed">
          Master real-world HTML/CSS, JS DOM, and React component challenges. Graded by Groq AI in
          under 2.5s with zero server execution, and proven with live interactive recruiter portfolios.
        </p>

        {/* CTA Button Group with 3D Button + Doodle Arrow */}
        <div className="hero-cta relative inline-flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
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
              Explore Challenge Catalog
            </Button>
          </Link>

          {/* Curved Hand-Drawn Arrow Doodle pointing to CTA */}
          <div className="hero-doodle absolute -bottom-14 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 text-xs font-mono text-[#ABDAC8]/90 pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4V16M12 16L7 11M12 16L17 11"
                stroke="#ABDAC8"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>5 Runs & 3 Submits Free • Zero Setup</span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* HERO MOCKUP & LAWTRADES-STYLE OVERLAPPING BADGE CARD */}
        {/* ===================================================================== */}
        <div className="relative max-w-5xl mx-auto pt-6">
          {/* Dotted Connector Line Motif linking Badge & IDE */}
          <svg
            className="hero-connector absolute -top-8 right-24 w-48 h-32 hidden md:block pointer-events-none z-20"
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

          {/* Floating Overlapping Badge Card (Lawtrades Signature Pattern) */}
          <div
            ref={floatingBadgeRef}
            className="absolute -top-6 -right-2 md:right-6 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-[#16161F]/95 backdrop-blur-md border border-[#ABDAC8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(171,218,200,0.15)] text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#4ADE80]">SCORE 94/100 • PASSED</span>
              </div>
              <Badge variant="outline" className="text-[9px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 py-0 px-1.5">
                1.8s INFERENCE
              </Badge>
            </div>
            <h4 className="text-xs font-bold text-[#F5F5F7] mb-2">Groq AI Multi-Criteria Verdict</h4>
            <div className="space-y-1 text-[11px] font-mono text-[#9CA3AF]">
              <div className="flex justify-between">
                <span>Layout & Visual Fidelity:</span>
                <span className="text-[#ABDAC8] font-semibold">35/35%</span>
              </div>
              <div className="flex justify-between">
                <span>DOM & Toggle Events:</span>
                <span className="text-[#ABDAC8] font-semibold">34/35%</span>
              </div>
              <div className="flex justify-between">
                <span>Semantic Cleanliness:</span>
                <span className="text-[#ABDAC8] font-semibold">25/30%</span>
              </div>
            </div>
          </div>

          {/* Main Floating IDE Mockup Card */}
          <div
            ref={heroMockupRef}
            className="rounded-2xl border border-[#26262E] bg-[#111117] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_30px_rgba(171,218,200,0.06)] overflow-hidden text-left relative"
          >
            {/* Mockup Window Header Bar */}
            <div className="h-10 border-b border-[#26262E] bg-[#0E0E14] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F87171]/70" />
                <div className="w-3 h-3 rounded-full bg-[#FBBF24]/70" />
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]/70" />
                <span className="text-xs font-mono text-[#9CA3AF] ml-3">staqor-workspace // pricing-component</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                  SANDBOX ACTIVE
                </Badge>
              </div>
            </div>

            {/* Mockup Split Body (40% Left Spec / 60% Right Monaco + Preview) */}
            <div className="grid md:grid-cols-12 min-h-[380px]">
              {/* 40% Left Spec Panel */}
              <div className="md:col-span-5 p-5 border-r border-[#26262E] bg-[#0F0F16]/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] font-mono text-[#4ADE80] border-[#4ADE80]/30">
                      EASY
                    </Badge>
                    <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                      HTML/CSS
                    </Badge>
                    <span className="text-xs font-mono text-[#9CA3AF]">Runs: 1/5 • Submits: 1/3</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F5F7] mb-2">
                    Interactive Pricing Table with Monthly/Annual Switch
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                    Build a responsive 3-tier card layout with an annual billing cycle switch that dynamically updates rates.
                  </p>
                  <div className="p-3 rounded-lg bg-[#16161F] border border-[#26262E] space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#ABDAC8] uppercase tracking-wider block">
                      Rubric Criteria
                    </span>
                    <p className="text-[11px] text-[#9CA3AF]">✓ 35% Responsive CSS Flex/Grid alignment</p>
                    <p className="text-[11px] text-[#9CA3AF]">✓ 35% Billing toggle event handling</p>
                    <p className="text-[11px] text-[#9CA3AF]">✓ 30% Accessible semantic structure</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#26262E]/60 text-xs font-mono">
                  <span className="text-[#9CA3AF]">Zero server eval</span>
                  <span className="text-[#ABDAC8]">Ready for Run / Submit</span>
                </div>
              </div>

              {/* 60% Right Monaco + Live Preview */}
              <div className="md:col-span-7 flex flex-col bg-[#0A0A0F]">
                {/* Monaco Tab Bar */}
                <div className="h-9 border-b border-[#26262E] bg-[#111117] flex items-center justify-between px-3">
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <span className="px-3 py-1 bg-[#16161F] text-[#ABDAC8] rounded-t border-t border-x border-[#26262E] font-semibold">
                      index.html
                    </span>
                    <span className="px-3 py-1 text-[#9CA3AF]">styles.css</span>
                    <span className="px-3 py-1 text-[#9CA3AF]">script.js</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">Monaco Editor</span>
                </div>

                {/* Code Snippet Pane */}
                <div className="p-4 font-mono text-xs text-[#9CA3AF] bg-[#0B0B10] flex-1 overflow-hidden leading-relaxed">
                  <div className="text-[#6B7280]">{`<!-- 3-Tier Responsive Pricing Layout -->`}</div>
                  <div>
                    <span className="text-[#F87171]">&lt;div</span> <span className="text-[#FBBF24]">class=</span>
                    <span className="text-[#ABDAC8]">&quot;pricing-grid&quot;</span>
                    <span className="text-[#F87171]">&gt;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#F87171]">&lt;div</span> <span className="text-[#FBBF24]">class=</span>
                    <span className="text-[#ABDAC8]">&quot;card tier-pro&quot;</span>
                    <span className="text-[#F87171]">&gt;</span>
                  </div>
                  <div className="pl-8 text-[#F5F5F7]">
                    &lt;h3&gt;Pro Candidate&lt;/h3&gt;
                  </div>
                  <div className="pl-8">
                    <span className="text-[#F87171]">&lt;span</span> <span className="text-[#FBBF24]">class=</span>
                    <span className="text-[#ABDAC8]">&quot;price&quot;</span>
                    <span className="text-[#F87171]">&gt;</span>
                    <span className="text-[#4ADE80]">$15/mo</span>
                    <span className="text-[#F87171]">&lt;/span&gt;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#F87171]">&lt;/div&gt;</span>
                  </div>
                  <div>
                    <span className="text-[#F87171]">&lt;/div&gt;</span>
                  </div>
                </div>

                {/* Live Preview Render Window */}
                <div className="border-t border-[#26262E] p-4 bg-[#111117] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]" />
                    <span className="text-xs font-mono text-[#9CA3AF]">Live Sandboxed Component Render</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] font-mono border-[#ABDAC8]/50 text-[#ABDAC8] hover:bg-[#ABDAC8]/10"
                    >
                      <Play className="w-3 h-3 mr-1" /> RUN (DIAGNOSTIC)
                    </Button>
                    <button className="px-2.5 py-1 text-[11px] font-mono font-bold rounded bg-[#ABDAC8] text-[#0A0A0F] shadow-[2px_2px_0px_#26262E] cursor-pointer">
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
      {/* 3. LOGO & TRUST STRIP ROW */}
      {/* ========================================================================= */}
      <section className="gsap-reveal border-y border-[#26262E]/70 py-12 bg-[#0E0E14]/40">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]/70 mb-8">
            Targeting modern frontend roles at innovative tech teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {["VERCEL", "STRIPE", "LINEAR", "SUPABASE", "RETOOL", "SHOPIFY"].map((brand) => (
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
      {/* 4. "HOW IT WORKS" — TABBED / PAGINATED CARD SECTION */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="gsap-reveal container mx-auto px-6 py-28 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
              STEP-BY-STEP WORKFLOW
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
              From Challenge Spec to <span className="font-serif italic font-normal text-[#ABDAC8]">Provable Proof.</span>
            </h2>
          </div>

          {/* Prev / Next Arrows (Lawtrades Pattern) */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="w-10 h-10 rounded-xl border-[#26262E] bg-[#111117] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="w-10 h-10 rounded-xl border-[#26262E] bg-[#111117] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map((st, idx) => (
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
        <div className="p-8 rounded-2xl bg-[#111117] border border-[#26262E] shadow-2xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16161F] border border-[#26262E] text-xs font-mono text-[#ABDAC8]">
              <span>PHASE {steps[activeStep].num} OF 04</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">{steps[activeStep].title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{steps[activeStep].desc}</p>
          </div>

          <div className="md:col-span-5 p-6 rounded-xl bg-[#0A0A0F] border border-[#26262E] space-y-4">
            <div className="flex items-center justify-between border-b border-[#26262E] pb-3 text-xs font-mono">
              <span className="text-[#9CA3AF]">TARGET TRACK</span>
              <span className="text-[#ABDAC8] font-bold">{steps[activeStep].preview.track}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#6B7280] block mb-1">Focus Domain</span>
              <p className="text-sm font-semibold text-[#F5F5F7]">{steps[activeStep].preview.title}</p>
            </div>
            <div className="flex items-center justify-between pt-2 text-xs font-mono">
              <Badge variant="outline" className="text-[10px] text-[#4ADE80] border-[#4ADE80]/30">
                {steps[activeStep].preview.difficulty}
              </Badge>
              <span className="text-[#9CA3AF]">{steps[activeStep].preview.time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURE SHOWCASE — FLOATING CARDS & DOTTED CONNECTORS */}
      {/* ========================================================================= */}
      <section id="features" className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            CORE ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Built for Real-World Frontend <span className="font-serif italic font-normal text-[#ABDAC8]">Engineering.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Three uncompromising pillars that set Staqor apart from traditional puzzle platforms.
          </p>
        </div>

        <div className="gsap-stagger-grid grid md:grid-cols-3 gap-8 relative">
          {/* Feature Card 1 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                ZERO-SERVER SANDBOX
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">100% Client-Side Iframe Execution</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Code runs entirely in the browser using an isolated iframe with a 2000ms loop-killer wrapper. Zero Docker spin-up lag and zero server execution attack surface.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                GROQ AI RUBRIC JUDGE
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">Multi-Criteria AI Rubric Evaluation</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Traditional platforms check stdout return values. Groq LPU scores visual aesthetics, responsive layouts, DOM state, and code craftsmanship in &lt;2.5s.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="gsap-card bg-[#111117] border-[#26262E] hover:border-[#ABDAC8]/50 transition-all rounded-2xl shadow-xl flex flex-col justify-between">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ABDAC8]" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30">
                LIVE PORTFOLIOS
              </Badge>
              <h3 className="text-xl font-bold text-[#F5F5F7]">Interactive Recruiter Replay Sandboxes</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Passed solutions publish to your public portfolio with interactive read-only Monaco tabs and live iframe replays for recruiters to test with one click.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRICING PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section id="pricing" className="gsap-reveal container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="text-xs font-mono text-[#ABDAC8] border-[#ABDAC8]/30 mb-3 bg-[#111614]">
            TRANSPARENT TIERS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            Practice for Free. Upgrade for <span className="font-serif italic font-normal text-[#ABDAC8]">Pro Speed.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Fair lifetime quotas to prevent API spam, with unlimited AI runs for active job seekers.
          </p>
        </div>

        <div className="gsap-stagger-grid grid md:grid-cols-3 gap-8 items-stretch">
          {/* Free Starter */}
          <div className="gsap-card p-8 rounded-2xl bg-[#111117] border border-[#26262E] flex flex-col justify-between shadow-xl">
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
                  <span>5 Runs & 3 Submits per challenge</span>
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
          <div className="gsap-card p-8 rounded-2xl bg-[#111614] border-2 border-[#ABDAC8] relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(171,218,200,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[10px] px-3 py-0.5">
                MOST POPULAR
              </Badge>
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
                  <span>Advanced React & Vue track access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                  <span>Priority Groq LPU inference pipeline</span>
                </li>
              </ul>
            </div>

            <Link href="/signup?plan=pro">
              {/* 3D Offset Button for Pro Plan */}
              <button className="w-full py-3 text-xs font-bold rounded-xl bg-[#ABDAC8] text-[#0A0A0F] border border-[#ABDAC8] shadow-[4px_4px_0px_#26262E] hover:shadow-[1px_1px_0px_#26262E] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer">
                Upgrade to Pro
              </button>
            </Link>
          </div>

          {/* Enterprise / Team */}
          <div className="gsap-card p-8 rounded-2xl bg-[#111117] border border-[#26262E] flex flex-col justify-between shadow-xl">
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

            <Button variant="outline" className="w-full h-11 border-[#26262E] hover:bg-[#16161F] text-xs font-semibold">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CTA BANNER & FOOTER */}
      {/* ========================================================================= */}
      <section className="gsap-reveal container mx-auto px-6 py-20 max-w-5xl">
        <div className="p-12 md:p-16 rounded-3xl bg-[#111614] border border-[#ABDAC8]/40 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(171,218,200,0.1)] text-center relative overflow-hidden">
          {/* Subtle Star Doodle */}
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

          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-[#F5F5F7] transition-colors">
              Workflow
            </a>
            <a href="#features" className="hover:text-[#F5F5F7] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#F5F5F7] transition-colors">
              Pricing
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
