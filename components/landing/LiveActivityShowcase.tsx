"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  GitCommitHorizontal,
  Share2,
  Flame,
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Zap,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const HOURLY_VOLUME_BARS = [
  { time: "12 PM", height: "40%" },
  { time: "2 PM", height: "55%" },
  { time: "4 PM", height: "45%" },
  { time: "6 PM", height: "65%" },
  { time: "8 PM", height: "82%" },
  { time: "10 PM", height: "94%" },
  { time: "12 AM", height: "100%", peak: true },
  { time: "2 AM", height: "85%" },
  { time: "4 AM", height: "50%" },
  { time: "6 AM", height: "35%" },
  { time: "8 AM", height: "48%" },
  { time: "Now", height: "78%", current: true },
];

export function LiveActivityShowcase() {
  const [runsCount, setRunsCount] = useState(14820);
  const [replaysCount, setReplaysCount] = useState(3240);
  const [streaksCount, setStreaksCount] = useState(4190);

  // Periodically increment stats to simulate live aggregate platform activity
  useEffect(() => {
    const interval = setInterval(() => {
      const runInc = Math.floor(Math.random() * 3) + 1;
      const replayInc = Math.random() > 0.4 ? 1 : 0;
      const streakInc = Math.random() > 0.5 ? 1 : 0;

      setRunsCount((prev) => prev + runInc);
      if (replayInc > 0) setReplaysCount((prev) => prev + replayInc);
      if (streakInc > 0) setStreaksCount((prev) => prev + streakInc);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-4 pb-16 md:pb-24 relative">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="w-full max-w-5xl mx-auto rounded-3xl bg-[#111117] border border-[#26262E] p-6 sm:p-8 shadow-2xl shadow-[#ABDAC8]/5 relative overflow-hidden text-left transition-all duration-300 hover:border-[#ABDAC8]/40 hover:shadow-2xl hover:shadow-[#ABDAC8]/15"
      >
        {/* Subtle CRT Terminal Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-10" />

        {/* Ambient Glow Auras */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ABDAC8]/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Card Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26262E] mb-6 relative z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#4ADE80]/80 shadow-sm" />
            </div>
            <h3 className="text-sm font-bold text-white font-sans tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#ABDAC8]" />
              <span>Live on Staqor right now</span>
            </h3>
          </div>

          {/* Pulsing Live Indicator */}
          <div className="flex items-center gap-2 text-xs text-[#4ADE80] font-mono bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
            </span>
            <span className="font-bold tracking-wide">Live</span>
          </div>
        </div>

        {/* 3 Ticking Aggregate Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-20">
          {/* Stat 1: UI Runs Evaluated Today */}
          <div className="bg-[#0B0B10] p-4 sm:p-5 rounded-2xl border border-[#26262E] shadow-inner flex flex-col justify-between group hover:border-[#ABDAC8]/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-semibold">UI Runs Evaluated</span>
              <div className="w-8 h-8 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8]">
                <GitCommitHorizontal className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{runsCount.toLocaleString()}</span>
                <span className="text-xs text-[#4ADE80] font-bold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" />+18
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                Verified Groq LPU evaluations today
              </div>
            </div>
          </div>

          {/* Stat 2: Recruiter Replays Viewed */}
          <div className="bg-[#0B0B10] p-4 sm:p-5 rounded-2xl border border-[#26262E] shadow-inner flex flex-col justify-between group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-semibold">Recruiter Sandboxes</span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{replaysCount.toLocaleString()}</span>
                <span className="text-xs text-cyan-400 font-bold">Auto-drafted</span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                Interactive candidate sandboxes viewed
              </div>
            </div>
          </div>

          {/* Stat 3: Active Daily Streaks */}
          <div className="bg-[#0B0B10] p-4 sm:p-5 rounded-2xl border border-[#26262E] shadow-inner flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-semibold">Active Daily Streaks</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{streaksCount.toLocaleString()}</span>
                <span className="text-xs text-amber-400 font-bold">Active</span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                Frontend devs maintaining proof of work
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Submission Volume Sparkline Bar Chart */}
        <div className="bg-[#0B0B10] p-5 rounded-2xl border border-[#26262E] relative z-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#ABDAC8]" />
              <span className="text-xs font-bold text-zinc-300">
                Continuous Evaluation Volume (Last 12 Hours)
              </span>
            </div>
            <span className="text-[11px] text-[#4ADE80] font-mono font-bold flex items-center gap-1">
              <span>Peak: 12 AM (420 submissions)</span>
            </span>
          </div>

          {/* Sparkline Bars Container */}
          <div className="h-24 flex items-end justify-between gap-1.5 pt-4 pb-1 border-b border-[#26262E]/80 px-1">
            {HOURLY_VOLUME_BARS.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group/bar relative">
                {/* Hover Tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-zinc-800 text-white text-[10px] font-mono px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap border border-zinc-700 shadow-md">
                  {bar.time}: {bar.peak ? "420" : bar.current ? "290" : `${120 + idx * 25}`} runs
                </div>

                {/* Volume Bar */}
                <div
                  style={{ height: bar.height }}
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    bar.peak
                      ? "bg-gradient-to-t from-[#ABDAC8] to-[#7BC4A8] shadow-lg shadow-[#ABDAC8]/30"
                      : bar.current
                      ? "bg-gradient-to-t from-emerald-600 to-[#4ADE80] shadow-md shadow-emerald-500/20 animate-pulse"
                      : "bg-gradient-to-t from-zinc-800 to-zinc-600 group-hover/bar:from-[#ABDAC8]/60 group-hover/bar:to-[#ABDAC8]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-2 px-1">
            {HOURLY_VOLUME_BARS.map((bar, idx) => (
              <span
                key={idx}
                className={
                  bar.peak
                    ? "text-[#ABDAC8] font-bold"
                    : bar.current
                    ? "text-[#4ADE80] font-bold"
                    : ""
                }
              >
                {bar.time}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Aggregate Verification Footnote */}
        <div className="mt-4 pt-3 border-t border-[#26262E] flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2 relative z-20 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
            <span>100% Client-Side Sandbox &amp; Sub-2.5s Groq AI Multi-Criteria Evaluation</span>
          </span>
          <span className="text-[#ABDAC8] font-bold">99.9% Real-Time Inference</span>
        </div>
      </motion.div>
    </section>
  );
}
