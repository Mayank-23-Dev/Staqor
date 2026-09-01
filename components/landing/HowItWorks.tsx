"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Terminal, Trophy, User, ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-driven path drawing progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 50%"],
  });

  // Top stem line draws downward first (0.05 -> 0.35)
  const stemLength = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  // 3 branch lines reveal outward gracefully as user scrolls further down (0.35 -> 0.75)
  const branchLength = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);

  // Endpoint circles reveal smoothly when line animation connects (>= 70% branch progress)
  const nodeCircleOpacity = useTransform(branchLength, [0.7, 1], [0, 1]);
  const nodeCircleScale = useTransform(branchLength, [0.7, 1], [0.3, 1]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 md:py-24 relative overflow-hidden scroll-mt-20 border-t border-[#26262E]"
    >
      {/* Section Headline & Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ABDAC8]/10 border border-[#ABDAC8]/30 text-[#ABDAC8] text-[11px] font-semibold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>Workflow &amp; Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            How Staqor <GSAPAnimatedBox text="Works" />
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg font-normal">
            Turn daily software development challenges into verified, recruiter-ready engineering proof of work.
          </p>
        </motion.div>
      </div>

      {/* Diagram Section Wrapper */}
      <div className="w-full relative mb-4">
        {/* SVG Scroll-Driven Connecting Lines Diagram (Desktop/Tablet) */}
        <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 740">
            <defs>
              <filter id="diagram-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Background Guide Lines (Faint Context) */}
            <path
              d="M 500 166 L 500 360"
              fill="none"
              stroke="#ABDAC8"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 500 360 C 500 470, 166.6 470, 166.6 580"
              fill="none"
              stroke="#ABDAC8"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 500 360 L 500 580"
              fill="none"
              stroke="#ABDAC8"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 500 360 C 500 470, 833.3 470, 833.3 580"
              fill="none"
              stroke="#ABDAC8"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* 1. Scroll-Revealed Stem Line Starting BELOW "DEVELOPER" NODE */}
            <motion.path
              d="M 500 166 L 500 360"
              fill="none"
              stroke={
                activeStep === 0
                  ? "#ABDAC8"
                  : activeStep === 1
                  ? "#38BDF8"
                  : activeStep === 2
                  ? "#4ADE80"
                  : "#ABDAC8"
              }
              strokeWidth={activeStep !== null ? "4" : "3.5"}
              style={{ pathLength: stemLength }}
              className={cn(
                "transition-all duration-300",
                activeStep === 0
                  ? "drop-shadow-[0_0_12px_#ABDAC8]"
                  : activeStep === 1
                  ? "drop-shadow-[0_0_12px_#38BDF8]"
                  : activeStep === 2
                  ? "drop-shadow-[0_0_12px_#4ADE80]"
                  : "drop-shadow-[0_0_8px_#ABDAC8]"
              )}
            />
            <circle
              cx="500"
              cy="166"
              r="4"
              fill={
                activeStep === 0
                  ? "#ABDAC8"
                  : activeStep === 1
                  ? "#38BDF8"
                  : activeStep === 2
                  ? "#4ADE80"
                  : "#ABDAC8"
              }
              className="transition-colors duration-300"
            />

            {/* 2. Scroll-Revealed Branch 1 (01. Choose Track: Aqua Glow) */}
            <motion.path
              d="M 500 360 C 500 470, 166.6 470, 166.6 580"
              fill="none"
              stroke={activeStep === 0 ? "#ABDAC8" : "#ABDAC8"}
              strokeOpacity={activeStep === 0 ? 1 : activeStep !== null ? 0.2 : 0.85}
              strokeWidth={activeStep === 0 ? "4" : "3"}
              style={{ pathLength: branchLength }}
              className={cn(
                "transition-all duration-300",
                activeStep === 0
                  ? "drop-shadow-[0_0_14px_#ABDAC8]"
                  : "drop-shadow-[0_0_8px_#ABDAC8]"
              )}
            />
            <motion.circle
              cx="166.6"
              cy="580"
              r={activeStep === 0 ? 6 : 4}
              fill="#ABDAC8"
              fillOpacity={activeStep === 0 ? 1 : activeStep !== null ? 0.2 : 1}
              style={{ opacity: nodeCircleOpacity, scale: nodeCircleScale }}
              className={cn(
                "transition-colors duration-300",
                activeStep === 0 && "drop-shadow-[0_0_10px_#ABDAC8]"
              )}
            />

            {/* 3. Scroll-Revealed Branch 2 (02. Code in Monaco: Cyan Glow) */}
            <motion.path
              d="M 500 360 L 500 580"
              fill="none"
              stroke={activeStep === 1 ? "#38BDF8" : "#ABDAC8"}
              strokeOpacity={activeStep === 1 ? 1 : activeStep !== null ? 0.2 : 0.85}
              strokeWidth={activeStep === 1 ? "4" : "3"}
              style={{ pathLength: branchLength }}
              className={cn(
                "transition-all duration-300",
                activeStep === 1
                  ? "drop-shadow-[0_0_14px_#38BDF8]"
                  : "drop-shadow-[0_0_8px_#ABDAC8]"
              )}
            />
            <motion.circle
              cx="500"
              cy="580"
              r={activeStep === 1 ? 6 : 4}
              fill={activeStep === 1 ? "#38BDF8" : "#ABDAC8"}
              fillOpacity={activeStep === 1 ? 1 : activeStep !== null ? 0.2 : 1}
              style={{ opacity: nodeCircleOpacity, scale: nodeCircleScale }}
              className={cn(
                "transition-colors duration-300",
                activeStep === 1 && "drop-shadow-[0_0_10px_#38BDF8]"
              )}
            />

            {/* 4. Scroll-Revealed Branch 3 (03. AI Rubric & Recruiter Proof: Emerald Green Glow) */}
            <motion.path
              d="M 500 360 C 500 470, 833.3 470, 833.3 580"
              fill="none"
              stroke={activeStep === 2 ? "#4ADE80" : "#ABDAC8"}
              strokeOpacity={activeStep === 2 ? 1 : activeStep !== null ? 0.2 : 0.85}
              strokeWidth={activeStep === 2 ? "4" : "3"}
              style={{ pathLength: branchLength }}
              className={cn(
                "transition-all duration-300",
                activeStep === 2
                  ? "drop-shadow-[0_0_14px_#4ADE80]"
                  : "drop-shadow-[0_0_8px_#ABDAC8]"
              )}
            />
            <motion.circle
              cx="833.3"
              cy="580"
              r={activeStep === 2 ? 6 : 4}
              fill={activeStep === 2 ? "#4ADE80" : "#ABDAC8"}
              fillOpacity={activeStep === 2 ? 1 : activeStep !== null ? 0.2 : 1}
              style={{ opacity: nodeCircleOpacity, scale: nodeCircleScale }}
              className={cn(
                "transition-colors duration-300",
                activeStep === 2 && "drop-shadow-[0_0_10px_#4ADE80]"
              )}
            />
          </svg>
        </div>

        {/* Connected-Icon Header Container */}
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 relative z-10">
          {/* Top Center "DEVELOPER" Node Chip */}
          <div className="hidden md:flex flex-col items-center justify-center mb-[340px] text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] shadow-lg shadow-[#ABDAC8]/10 group hover:scale-110 hover:shadow-2xl hover:shadow-[#ABDAC8]/30 transition-all cursor-pointer"
            >
              <User className="w-7 h-7 text-[#ABDAC8]" />
            </motion.div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider block mt-3 text-zinc-400 font-mono">
              SOFTWARE ENGINEER
            </span>
          </div>

          {/* Mobile Icon Row */}
          <div className="flex items-center justify-center gap-6 mb-6 md:hidden">
            <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] shadow-lg">
              <User className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] shadow-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          {/* Desktop 3-Step Node Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-center text-center">
            {/* Step 1 Node (Aqua: Choose an Engineering Track) */}
            <div
              onMouseEnter={() => setActiveStep(0)}
              onMouseLeave={() => setActiveStep(null)}
              className="hidden md:flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "w-16 h-16 rounded-2xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] shadow-lg shadow-[#ABDAC8]/10 transition-all duration-300",
                  activeStep === 0 &&
                    "scale-110 border-[#ABDAC8] bg-[#ABDAC8]/25 shadow-2xl shadow-[#ABDAC8]/30 ring-2 ring-[#ABDAC8]/40"
                )}
              >
                <Layers className="w-7 h-7" />
              </motion.div>
              <span
                className={cn(
                  "text-[11px] font-extrabold uppercase tracking-wider block mt-3 transition-colors font-mono",
                  activeStep === 0 ? "text-[#ABDAC8]" : "text-zinc-400"
                )}
              >
                01. Choose Engineering Track
              </span>
            </div>

            {/* Step 2 Node (Cyan: Code in Monaco IDE) */}
            <div
              onMouseEnter={() => setActiveStep(1)}
              onMouseLeave={() => setActiveStep(null)}
              className="hidden md:flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={cn(
                  "w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 transition-all duration-300",
                  activeStep === 1 &&
                    "scale-110 border-cyan-400 bg-cyan-500/25 shadow-2xl shadow-cyan-500/30 ring-2 ring-cyan-500/40"
                )}
              >
                <Terminal className="w-7 h-7" />
              </motion.div>
              <span
                className={cn(
                  "text-[11px] font-extrabold uppercase tracking-wider block mt-3 transition-colors font-mono",
                  activeStep === 1 ? "text-cyan-400" : "text-zinc-400"
                )}
              >
                02. Code in Monaco IDE
              </span>
            </div>

            {/* Step 3 Node (Emerald: AI Score & Recruiter Proof) */}
            <div
              onMouseEnter={() => setActiveStep(2)}
              onMouseLeave={() => setActiveStep(null)}
              className="hidden md:flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={cn(
                  "w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 transition-all duration-300",
                  activeStep === 2 &&
                    "scale-110 border-emerald-400 bg-emerald-500/25 shadow-2xl shadow-emerald-500/30 ring-2 ring-emerald-500/40"
                )}
              >
                <Trophy className="w-7 h-7" />
              </motion.div>
              <span
                className={cn(
                  "text-[11px] font-extrabold uppercase tracking-wider block mt-3 transition-colors font-mono",
                  activeStep === 2 ? "text-emerald-400" : "text-zinc-400"
                )}
              >
                03. AI Score &amp; Proof
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Step Cards Container (Below Connected Header Band) */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {/* Step 1 Card (Aqua) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0 }}
          onMouseEnter={() => setActiveStep(0)}
          onMouseLeave={() => setActiveStep(null)}
          className="h-full"
        >
          <Card
            className={cn(
              "h-full bg-[#111117] border-[#26262E] transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ABDAC8]/20",
              activeStep === 0 && "border-[#ABDAC8] bg-[#141816] ring-2 ring-[#ABDAC8]/30"
            )}
          >
            {/* Top Radial Ambient Glow */}
            <div
              className="absolute top-0 left-0 right-0 h-48 opacity-25 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top, #ABDAC8 0%, transparent 70%)",
              }}
            />

            <div className="absolute right-4 bottom-2 text-7xl font-black text-white/5 group-hover:text-white/10 pointer-events-none select-none font-mono">
              01
            </div>

            <CardContent className="p-7 flex flex-col justify-between h-full relative z-10">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ABDAC8] bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step 01
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight group-hover:text-[#ABDAC8] transition-colors">
                  Choose a Domain
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                  Select from 8 software engineering tracks across Frontend UI, Backend APIs, SQL Databases, and Distributed Caching.
                </p>
              </div>

              <div className="pt-5 border-t border-[#26262E] flex items-center justify-between text-xs font-bold text-[#ABDAC8]">
                <span>Explore Tracks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 2 Card (Cyan) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onMouseEnter={() => setActiveStep(1)}
          onMouseLeave={() => setActiveStep(null)}
          className="h-full"
        >
          <Card
            className={cn(
              "h-full bg-[#111117] border-[#26262E] transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20",
              activeStep === 1 && "border-cyan-400 bg-[#0F171E] ring-2 ring-cyan-500/30"
            )}
          >
            {/* Top Radial Ambient Glow */}
            <div
              className="absolute top-0 left-0 right-0 h-48 opacity-25 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top, #06b6d4 0%, transparent 70%)",
              }}
            />

            <div className="absolute right-4 bottom-2 text-7xl font-black text-white/5 group-hover:text-white/10 pointer-events-none select-none font-mono">
              02
            </div>

            <CardContent className="p-7 flex flex-col justify-between h-full relative z-10">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step 02
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                  Code in Monaco IDE
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                  Write UI components, Node.js route handlers, and SQL queries with scoped scaffolding in an isolated in-browser runtime.
                </p>
              </div>

              <div className="pt-5 border-t border-[#26262E] flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>Try In-Browser Runtime</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 3 Card (Emerald) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onMouseEnter={() => setActiveStep(2)}
          onMouseLeave={() => setActiveStep(null)}
          className="h-full"
        >
          <Card
            className={cn(
              "h-full bg-[#111117] border-[#26262E] transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20",
              activeStep === 2 && "border-emerald-400 bg-[#0E1A14] ring-2 ring-emerald-500/30"
            )}
          >
            {/* Top Radial Ambient Glow */}
            <div
              className="absolute top-0 left-0 right-0 h-48 opacity-25 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top, #10b981 0%, transparent 70%)",
              }}
            />

            <div className="absolute right-4 bottom-2 text-7xl font-black text-white/5 group-hover:text-white/10 pointer-events-none select-none font-mono">
              03
            </div>

            <CardContent className="p-7 flex flex-col justify-between h-full relative z-10">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step 03
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                  AI Score &amp; Proof of Work
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                  Groq LPU evaluates logic, performance, and code quality in &lt;2.5s. Passed attempts generate interactive recruiter sandboxes.
                </p>
              </div>

              <div className="pt-5 border-t border-[#26262E] flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>View Recruiter Portfolios</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
