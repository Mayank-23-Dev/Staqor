"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Zap,
  Terminal,
  Monitor,
  CheckCircle2,
  Share2,
  Eye,
  Sliders,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";

export function CapabilitiesShowcase() {
  return (
    <section className="py-16 md:py-24 border-y border-[#26262E] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#ABDAC8]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ABDAC8]/10 border border-[#ABDAC8]/30 text-[#ABDAC8] text-[11px] font-mono uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>Engineered for Frontend Engineers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Built for <GSAPAnimatedBox text="Real Craftsmanship." />
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg font-normal">
            Every feature is designed to replace abstract puzzle testing with real-world engineering proof.
          </p>
        </div>

        {/* 4 Graphic Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 100% In-Browser Client Sandbox */}
          <SpotlightCard accentColor="aqua" watermark="FAST">
            <div className="p-7 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] shadow-md shadow-[#ABDAC8]/20 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#ABDAC8] bg-[#111614] border border-[#ABDAC8]/30 px-3 py-1 rounded-full">
                    ZERO DOCKER COLD STARTS
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-[#ABDAC8] transition-colors">
                  Instant In-Browser Compilation
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  Code compiles 100% client-side inside an isolated iframe with hot-reload and 2000ms loop protection. Zero server queue delays or waiting for container boot times.
                </p>
              </div>

              {/* Graphic Mock: Fast Compilation Bar */}
              <div className="p-3.5 rounded-xl bg-[#0B0B10] border border-[#26262E] space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" /> Live Compile Latency
                  </span>
                  <span className="text-[#4ADE80] font-bold">~0.02s Instant</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#16161F] overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "98%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#ABDAC8] to-[#4ADE80]"
                  />
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Groq LPU Multi-Criteria Rubrics */}
          <SpotlightCard accentColor="emerald" watermark="AI">
            <div className="p-7 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-[#0E1A14] border border-emerald-500/30 px-3 py-1 rounded-full">
                    &lt; 2.5S GROQ INFERENCE
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-emerald-400 transition-colors">
                  Weighted Multi-Criteria Rubrics
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  Groq LPU judges your solution across visual design (35%), DOM/state logic (35%), and semantic cleanliness (30%) with targeted, actionable feedback.
                </p>
              </div>

              {/* Graphic Mock: 3-Tier Rubric Bars */}
              <div className="p-3.5 rounded-xl bg-[#0B0B10] border border-[#26262E] space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Visual Layout Fidelity</span>
                  <span className="text-[#ABDAC8] font-bold">35/35%</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>DOM &amp; State Logic</span>
                  <span className="text-[#ABDAC8] font-bold">34/35%</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Semantic Cleanliness</span>
                  <span className="text-[#ABDAC8] font-bold">28/30%</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Scoped Locked Scaffolding */}
          <SpotlightCard accentColor="purple" watermark="LOCK">
            <div className="p-7 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-full">
                    FOCUSED PROBLEM SCOPE
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-purple-400 transition-colors">
                  Scoped Read-Only Scaffolding
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  Targeted practice: In JavaScript challenges, HTML and CSS templates are locked read-only so you focus entirely on state transitions and event logic.
                </p>
              </div>

              {/* Graphic Mock: Scaffolding Tabs */}
              <div className="p-3.5 rounded-xl bg-[#0B0B10] border border-[#26262E] flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-[#16161F] text-zinc-400 border border-[#26262E] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#ABDAC8]" /> index.html
                  </span>
                  <span className="px-2 py-1 rounded bg-[#16161F] text-zinc-400 border border-[#26262E] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#ABDAC8]" /> styles.css
                  </span>
                  <span className="px-2 py-1 rounded bg-[#ABDAC8]/20 text-[#ABDAC8] border border-[#ABDAC8]/40 font-bold">
                    script.js (Editable)
                  </span>
                </div>
                <span className="text-[#4ADE80] text-[10px]">✔ PROTECTED</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4: Recruiter Replay Sandboxes */}
          <SpotlightCard accentColor="blue" watermark="DEMO">
            <div className="p-7 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950/40 border border-blue-500/30 px-3 py-1 rounded-full">
                    PUBLIC CANDIDATE PROOF
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-blue-400 transition-colors">
                  Interactive Recruiter Portfolios
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  Passed solutions generate shareable interactive sandboxes. Hiring teams test your live UI components and inspect your Monaco tabs directly in browser.
                </p>
              </div>

              {/* Graphic Mock: Public Candidate Link */}
              <div className="p-3.5 rounded-xl bg-[#0B0B10] border border-[#26262E] flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-zinc-400">staqor.dev/candidate/</span>
                  <span className="text-[#ABDAC8] font-bold">alex-dev</span>
                </div>
                <span className="text-xs text-[#ABDAC8] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                  <Eye className="w-3.5 h-3.5" /> Live Replay
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
