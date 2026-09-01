'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, Sparkles, CheckCircle2, ShieldCheck, Flame, GitCommitHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PROOF_SUBMISSIONS = [
  {
    id: 1,
    tag: '// Daily Commit #48 — Web Dev & AI Cohort',
    command: '$ git commit -m "feat: RAG vector pipeline & Next.js HMR fix"',
    streak: 48,
    name: 'Aarav Sharma',
    college: 'IIT Delhi \'25',
    track: 'AI & Web Dev',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 2,
    tag: '// Daily Commit #23 — Backend System Design',
    command: '$ git commit -m "feat: Redis caching layer & API rate limiting"',
    streak: 23,
    name: 'Priya Patel',
    college: 'NIT Trichy \'26',
    track: 'Backend Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 3,
    tag: '// Daily Commit #60 — Machine Learning & LLMs',
    command: '$ git commit -m "feat: PyTorch LLM fine-tuning & LoRA weights"',
    streak: 60,
    name: 'Rohan Gupta',
    college: 'BITS Pilani \'25',
    track: 'GenAI & PyTorch',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 4,
    tag: '// Daily Commit #34 — Fullstack Next.js 14',
    command: '$ git commit -m "feat: Animated landing hero & Tailwind v4 theme"',
    streak: 34,
    name: 'Ananya Iyer',
    college: 'IIIT Hyderabad \'26',
    track: 'Frontend Engineering',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 5,
    tag: '// Daily Commit #14 — Microservices & Go',
    command: '$ git commit -m "feat: Distributed queue with Kafka & Go gRPC"',
    streak: 14,
    name: 'Vikram Verma',
    college: 'DTU \'25',
    track: 'DevOps & Go',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

export function Hero() {
  const [activeEntryIndex, setActiveEntryIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const currentEntry = PROOF_SUBMISSIONS[activeEntryIndex];

  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Infinite Floating Loops for Badges (Phase 6)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }

    if (terminalRef.current) {
      gsap.from(terminalRef.current, {
        opacity: 0,
        y: 45,
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out',
      });
    }

    // Phase 6: Infinite staggered floating badge loops (y: 0 -> -8 -> 0, ~4s)
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
          ease: 'sine.inOut',
          delay,
        });
      }
    });
  }, []);

  // GSAP-driven typewriter effect for terminal command text (Phase 6)
  useEffect(() => {
    setTypedText('');
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

  // Auto-cycle entries every 5.5s
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveEntryIndex((prev) => (prev + 1) % PROOF_SUBMISSIONS.length);
    }, 5500);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center flex flex-col items-center relative">
        {/* Floating Badge 1 (Mid-Left) */}
        <div
          ref={badge1Ref}
          className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#e8602e]/40 hover:border-[#e8602e] shadow-xl text-xs font-bold text-white absolute -left-6 xl:-left-16 top-72 xl:top-[22rem] z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#e8602e]/30 hover:scale-105 max-w-[210px] text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#e8602e]/20 text-[#e8602e] border border-[#e8602e]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-white group-hover:text-[#e8602e] transition-colors">
              Verified Proof of Work
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 font-normal pl-8 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
            Auto-validated GitHub diffs &amp; LinkedIn proof
          </p>
        </div>

        {/* Floating Badge 2 (Top-Right) */}
        <div
          ref={badge2Ref}
          className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-md border border-zinc-700/80 hover:border-[#e8602e] shadow-xl text-xs font-bold text-white absolute right-4 xl:right-8 top-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#e8602e]/20 hover:scale-105 max-w-[210px] text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#e8602e]/20 text-[#e8602e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="group-hover:text-[#e8602e] transition-colors">10,000+ Active Builders</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-normal pl-8 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
            Students from 200+ colleges nationwide
          </p>
        </div>

        {/* Floating Badge 3 (Bottom-Left) */}
        <div
          ref={badge3Ref}
          className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 shadow-xl text-xs font-bold text-emerald-400 absolute left-4 xl:left-8 bottom-4 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 max-w-[210px] text-left"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span>100% Free for Students</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
            No credit card required to start your streak
          </p>
        </div>

        {/* Floating Badge 4 (Bottom-Right) */}
        <div
          ref={badge4Ref}
          className="hidden lg:flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 shadow-xl text-xs font-bold text-amber-300 absolute right-4 xl:right-8 bottom-8 z-20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-105 max-w-[210px] text-left"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span>48hr–60 Day Formats</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-normal pl-6 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden leading-tight">
            Hackathons, daily commits &amp; AI cohorts
          </p>
        </div>

        {/* Hero Content Elements Container */}
        <div ref={heroRef} className="flex flex-col items-center max-w-5xl">
          {/* Eyebrow Tag */}
          <h4 className="uppercase text-[#e8602e] text-sm sm:text-base md:text-lg font-bold tracking-widest mb-4">
            Learn. &nbsp;Build. &nbsp;Get Placed.
          </h4>

          {/* Main Headline */}
          <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
            <h1 className="flex flex-col sm:block items-center">
              <span>Become the Developer that Companies</span>
              <span> Want to Hire!</span>
            </h1>
          </div>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed mb-8 font-normal">
            Join a growing community of students preparing for real-world tech careers at ABTalks.
          </p>

          {/* Student Community Avatars & Proof Strip */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-zinc-300 font-medium mb-8">
            <div className="flex -space-x-2.5 items-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                alt="ABTalks Builder"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0f0f0f] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              />
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                alt="ABTalks Builder"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0f0f0f] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80"
                alt="ABTalks Builder"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0f0f0f] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80"
                alt="ABTalks Builder"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0f0f0f] shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-1.5 text-zinc-200">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="font-bold text-white">10,000+</span>
              <span>Students Enrolled</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-b from-[#e8602e] via-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-extrabold px-10 py-7 text-lg rounded-field shadow-2xl shadow-[#e8602e]/35 hover:shadow-2xl hover:shadow-[#e8602e]/50 border border-[#ff8559]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]">
                <span>Explore Challenges</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* DYNAMIC HERO PROOF-OF-WORK SHOWCASE TERMINAL WINDOW (Phase 6) */}
      <section className="pb-16 md:pb-24">
        <div
          ref={terminalRef}
          className="w-full max-w-4xl mx-auto rounded-box bg-[#121212] border border-[#2a2a2a] p-4 sm:p-6 shadow-2xl shadow-[#e8602e]/10 relative overflow-hidden group"
        >
          {/* CRT Terminal Scanline Overlay (Phase 6) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-25 z-10" />

          {/* Ambient Terminal Glow Aura */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#e8602e]/10 blur-[90px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

          {/* Terminal Window Top Header Bar with Control Dots (Phase 6) */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#2a2a2a] mb-5 gap-3 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
              <span className="text-xs font-mono text-zinc-400 ml-2 font-semibold flex items-center gap-1.5">
                <GitCommitHorizontal className="w-3.5 h-3.5 text-[#e8602e]" />
                <span>ABTalks Proof-of-Work Terminal v2.4</span>
              </span>
            </div>

            {/* Pulsing Live Commit Stream Indicator */}
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-bold tracking-wide">Live Commit Stream</span>
            </div>
          </div>

          {/* Terminal Main Grid Content Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono text-xs relative z-20">
            {/* Left Code Console Panel */}
            <div className="md:col-span-2 bg-[#090909] p-4 sm:p-5 rounded-field border border-zinc-800/90 text-zinc-300 leading-relaxed min-h-[175px] flex flex-col justify-between shadow-inner">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="text-zinc-500 mb-2 font-mono flex items-center justify-between">
                    <span>{currentEntry.tag}</span>
                    <span className="text-[10px] text-zinc-600 font-sans uppercase tracking-wider">{currentEntry.track}</span>
                  </div>

                  {/* Animated GSAP Typewriter Command Line */}
                  <div className="text-emerald-400 font-mono font-bold min-h-[2.5rem] flex items-center flex-wrap">
                    <span>{typedText}</span>
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
                  </div>

                  <div className="text-zinc-400 mt-2 text-[11px] space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400/90">
                      <span>✔</span>
                      <span>Validating GitHub commit diff &amp; AST changes... OK</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <span>✔</span>
                      <span>Formatting LinkedIn Proof-of-Work post... Generated</span>
                    </div>
                  </div>
                </div>

                <div className="text-[#e8602e] font-bold mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#e8602e] animate-bounce" />
                    <span>Streak updated: {currentEntry.streak} Days Active!</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans">Verified Commit #{48900 + currentEntry.id}</span>
                </div>
              </div>
            </div>

            {/* Right Active Builder Info Card */}
            <div className="bg-[#090909] p-4 sm:p-5 rounded-field border border-zinc-800/90 flex flex-col justify-between min-h-[175px] shadow-inner">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 font-sans font-bold">
                      Active Builder
                    </div>
                    <div className="text-white font-extrabold text-base font-sans tracking-tight">
                      {currentEntry.name}
                    </div>
                    <div className="text-xs text-[#e8602e] font-bold mt-0.5 font-sans">
                      {currentEntry.college}
                    </div>
                  </div>

                  <img
                    src={currentEntry.avatar}
                    alt={currentEntry.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#e8602e]/60 shadow-lg"
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeEntryIndex
                    ? 'w-6 bg-[#e8602e]'
                    : 'w-1.5 bg-zinc-800 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
