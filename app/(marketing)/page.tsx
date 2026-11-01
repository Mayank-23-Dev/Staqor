"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Terminal,
  X,
  Cpu,
  Lock,
  Zap,
  Server,
  Bug,
  Layout,
  Database,
  Layers,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";
import { ScrollGlowingLine } from "@/components/ScrollGlowingLine";
import { Header } from "@/components/header";
import { CodeEditorHeroShowcase } from "@/components/landing/CodeEditorHeroShowcase";
import { TrackButton } from "@/components/landing/TrackButton";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CapabilitiesShowcase } from "@/components/landing/CapabilitiesShowcase";
import { FaqsSection } from "@/components/faqs-page";
import { Footer } from "@/components/footer";

// ---------------------------------------------------------------------------
// 8 Tracks Data (Covering Every Domain of Software Development)
// ---------------------------------------------------------------------------
const TRACKS_DATA = [
  {
    id: "frontend-ui",
    title: "Frontend UI & Layouts",
    tag: "UI & STYLING",
    icon: Code2,
    desc: "Master Flexbox, CSS Grid, fluid typography, responsive micro-interactions, and accessibility.",
    challengesCount: 14,
    accent: "aqua" as const,
    sample: "Responsive Pricing Matrix with Annual Switch",
  },
  {
    id: "javascript-dom",
    title: "JavaScript & DOM Architecture",
    tag: "LOGIC & EVENTS",
    icon: Terminal,
    desc: "Build interactive widgets, stateful DOM mutations, event delegations, and client-side storage.",
    challengesCount: 18,
    accent: "emerald" as const,
    sample: "Drag-and-Drop Kanban Task Board",
  },
  {
    id: "react-components",
    title: "React & Component Systems",
    tag: "MODERN SPA",
    icon: Zap,
    desc: "Author custom hooks, compound components, virtualized lists, and accessible state machines.",
    challengesCount: 16,
    accent: "aqua" as const,
    sample: "Virtualized Infinite Scroll Product Grid",
  },
  {
    id: "backend-apis",
    title: "Backend & REST APIs",
    tag: "SERVERS & ROUTING",
    icon: Server,
    desc: "Build RESTful route handlers, payload validation, pagination algorithms, and rate limiters.",
    challengesCount: 12,
    accent: "amber" as const,
    sample: "In-Memory Rate Limiter Token Bucket",
  },
  {
    id: "database-sql",
    title: "Databases & SQL Engineering",
    tag: "DATA & SCHEMA",
    icon: Database,
    desc: "Author complex SQL queries, optimize composite indexes, transactions, and schema migrations.",
    challengesCount: 10,
    accent: "purple" as const,
    sample: "Transactional Analytics with Covering Index",
  },
  {
    id: "systems-caching",
    title: "Systems & Distributed Caching",
    tag: "PERFORMANCE",
    icon: Network,
    desc: "Design Redis caching layers, async task queues, pub/sub pipelines, and idempotency keys.",
    challengesCount: 8,
    accent: "blue" as const,
    sample: "Distributed Lock with Auto-Expiring Leases",
  },
  {
    id: "bug-diagnostics",
    title: "Real-World Bug Diagnostics",
    tag: "DIAGNOSTICS",
    icon: Bug,
    desc: "Inspect broken codebases, patch memory leaks, resolve race conditions, and fix state desyncs.",
    challengesCount: 12,
    accent: "purple" as const,
    sample: "Patching Async Race Conditions in Autocomplete",
  },
  {
    id: "end-to-end",
    title: "End-to-End System Scenarios",
    tag: "FULL ARCHITECTURE",
    icon: Layout,
    desc: "Connect client components to mock backend APIs, optimistic mutations, and offline queues.",
    challengesCount: 9,
    accent: "emerald" as const,
    sample: "Optimistic Comment Thread with Offline Queue",
  },
];

export default function HomePage() {
  const router = useRouter();

  // Autologin redirect if user is already authenticated
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        router.replace("/problems");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.replace("/problems");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // GSAP Animation Refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

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

      ScrollTrigger.refresh();
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-clip"
    >
      {/* ========================================================================= */}
      {/* 1. SCROLL-RESPONSIVE GLOWING ACCENT LINE */}
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
      {/* HEADER (@efferd/header-2 - Full Sticky Navbar without Browse Catalog) */}
      {/* ========================================================================= */}
      <Header />

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-4">
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 text-center flex flex-col items-center relative">
          {/* Floating Badge 1 (Mid-Left) */}
          <div
            ref={badge1Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/95 backdrop-blur-xl border border-[#ABDAC8]/40 hover:border-[#ABDAC8] shadow-xl text-xs font-bold text-white absolute -left-6 xl:-left-16 top-72 xl:top-[22rem] z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#ABDAC8]/30 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ABDAC8]/20 text-[#ABDAC8] border border-[#ABDAC8]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white group-hover:text-[#ABDAC8] transition-colors font-mono">
                Sub-2.5s AI Scoring
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
              <span className="group-hover:text-[#ABDAC8] transition-colors font-mono">Every Dev Domain</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-9 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Frontend UI, Backend APIs, Databases &amp; Systems
            </p>
          </div>

          {/* Floating Badge 3 (Bottom-Left) */}
          <div
            ref={badge3Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 shadow-xl text-xs font-bold text-emerald-400 absolute left-4 xl:left-8 bottom-4 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-mono">Scoped Contracts</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              Protected templates enforce focused software engineering
            </p>
          </div>

          {/* Floating Badge 4 (Bottom-Right) */}
          <div
            ref={badge4Ref}
            className="hidden lg:flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-[#111117]/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 shadow-xl text-xs font-bold text-amber-300 absolute right-4 xl:right-8 bottom-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-105 max-w-[210px] text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-mono">8 Engineering Tracks</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
              UI, JS DOM, React, APIs, SQL, Caching &amp; Diagnostics
            </p>
          </div>

          {/* Hero Content Elements */}
          <div ref={heroRef} className="flex flex-col items-center max-w-5xl">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111614] border border-[#26352E] text-xs font-mono text-[#ABDAC8] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span>INSTANT AI EVALUATION • ALL DEVELOPMENT DOMAINS • SUB-2.5S INFERENCE</span>
            </div>

            {/* Main Headline with GSAP Animated Box */}
            <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
              <h1 className="flex flex-col sm:block items-center">
                <span>The in-browser workspace for software </span>
                <GSAPAnimatedBox text="craftsmanship." />
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed mb-8 font-normal">
              Solve real Frontend UI, Backend API, Database SQL, and Distributed Systems challenges inside a split Monaco IDE. Graded against weighted rubrics in &lt;2.5s by automated AI.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold px-10 py-7 text-lg rounded-xl shadow-2xl shadow-[#ABDAC8]/35 hover:shadow-2xl hover:shadow-[#ABDAC8]/50 border border-[#ABDAC8]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Start Practicing Free</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <a href="#tracks" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#26262E] bg-[#111117] hover:bg-[#16161F] text-white font-bold px-8 py-7 text-base rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore 8 Engineering Tracks
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MULTI-DOMAIN CODE EDITOR HERO SHOWCASE (VS Code / Monaco 3-Panel Card) */}
        {/* ========================================================================= */}
        <CodeEditorHeroShowcase />

        {/* ========================================================================= */}
        {/* 3. DEVELOPER CAPABILITIES & VALUE SHOWCASE */}
        {/* ========================================================================= */}
        <CapabilitiesShowcase />

        {/* ========================================================================= */}
        {/* 4. 8 PRACTICE TRACKS CATALOG (Every Development Domain) */}
        {/* ========================================================================= */}
        <section id="tracks" className="py-16 md:py-24 border-t border-[#26262E]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2 font-mono">Curriculum Tracks</div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                Practice Across <GSAPAnimatedBox text="Every Domain" />
              </h2>
            </div>
            <p className="text-base text-zinc-300 max-w-md font-normal">
              From Frontend UI and DOM events to Backend APIs, SQL data modeling, distributed caching, and bug diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        {/* Auth-Aware Track Button: redirects unauthenticated users to login */}
                        <TrackButton trackId={tr.id}>
                          Browse Track
                        </TrackButton>
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
        {/* 6. WHY STAQOR COMPARISON (Reliable Framer Motion Reveal - 0 Glitches) */}
        {/* ========================================================================= */}
        <section id="why-staqor" className="py-16 md:py-24 border-t border-[#26262E]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#ABDAC8] mb-2 font-mono">The Proof of Work Loop</div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Why Staqor Wins Over <GSAPAnimatedBox text="LeetCode" />
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg">
              Stop grinding abstract binary tree inversions. Start building real, verified software engineering proof across Frontend, Backend, and Databases.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
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
                    <span>Abstract stdout tests that ignore real APIs, SQL indexes, and responsive UI</span>
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
                    <span>Static resume PDFs with zero verifiable, interactive proof of work</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* The Staqor Way */}
            <SpotlightCard accentColor="aqua" watermark="STAQ">
              <div className="p-8 h-full bg-gradient-to-b from-[#ABDAC8]/10 to-transparent">
                <div className="text-xs font-bold text-[#ABDAC8] uppercase tracking-wider mb-3 font-mono">The Staqor Way</div>
                <h3 className="font-display text-2xl font-bold text-white mb-6">Daily Development Proof of Work</h3>
                <div className="space-y-4 text-sm text-zinc-200 font-medium">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>Real code across UI, APIs, and SQL with sub-2.5s multi-rubric AI feedback</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>One-click candidate sandboxes that recruiters can interact with and test</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ABDAC8] shrink-0 mt-0.5" />
                    <span>Direct visibility to tech recruiters and engineering leaders worldwide</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 7. ALL-VISIBLE COMPREHENSIVE FAQ ACCORDION (@efferd/faqs-2) */}
        {/* ========================================================================= */}
        <FaqsSection />

        {/* ========================================================================= */}
        {/* 8. COMMUNITY CTA BAND */}
        {/* ========================================================================= */}
        <section id="community" className="py-12">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#ABDAC8]/20 via-[#111117] to-[#0A0A0F] border border-[#ABDAC8]/40 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ABDAC8]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
              Ready to prove your software <GSAPAnimatedBox text="craftsmanship?" />
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Join thousands of developers solving real Frontend, Backend, and Database challenges, passing sub-2.5s AI rubrics, and getting hired.
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
      {/* 9. FULL-WIDTH FOOTER (@efferd/footer-2) */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
