"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  Terminal,
  Award,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Share2,
  ShieldCheck,
  Flame,
  Trophy,
  Code2,
  Server,
  Database,
  Layers,
  Sparkles,
  Copy,
  Check,
  Eye,
  Monitor,
} from "lucide-react";

interface ProfilePageProps {
  params: { username: string };
}

const VERIFIED_SOLUTIONS = [
  {
    id: "sol-1",
    title: "Responsive Pricing Matrix with Annual Switch",
    track: "Frontend UI",
    difficulty: "EASY",
    score: 96,
    time: "1.8s",
    completedDate: "September 2026",
    slug: "interactive-pricing-card",
    rubricBreakdown: [
      { name: "Visual Layout Fidelity", score: 35, max: 35 },
      { name: "DOM & State Logic", score: 34, max: 35 },
      { name: "Semantic Cleanliness", score: 27, max: 30 },
    ],
    summary:
      "Engineered fluid CSS Grid pricing cards with toggle transitions and zero layout shift on billing state mutation.",
  },
  {
    id: "sol-2",
    title: "Drag-and-Drop Kanban Task Board",
    track: "JavaScript & DOM",
    difficulty: "MEDIUM",
    score: 94,
    time: "2.1s",
    completedDate: "September 2026",
    slug: "drag-and-drop-kanban-board",
    rubricBreakdown: [
      { name: "Drag Event Delegation", score: 34, max: 35 },
      { name: "Column State Persistence", score: 35, max: 35 },
      { name: "Clean DOM Mutation", score: 25, max: 30 },
    ],
    summary:
      "Built native HTML5 Drag and Drop event delegates to dynamically transfer and reorder sprint tasks between status columns.",
  },
  {
    id: "sol-3",
    title: "In-Memory Rate Limiter Token Bucket",
    track: "Backend & REST APIs",
    difficulty: "MEDIUM",
    score: 92,
    time: "1.9s",
    completedDate: "August 2026",
    slug: "in-memory-rate-limiter",
    rubricBreakdown: [
      { name: "Concurrency Safety", score: 33, max: 35 },
      { name: "Token Refill Logic", score: 35, max: 35 },
      { name: "HTTP 429 Headers", score: 24, max: 30 },
    ],
    summary:
      "Implemented a token bucket algorithm to throttle burst traffic at 60 req/min with zero memory leaks and atomic state refills.",
  },
  {
    id: "sol-4",
    title: "Transactional Analytics with Covering Index",
    track: "Databases & SQL",
    difficulty: "MEDIUM",
    score: 98,
    time: "1.6s",
    completedDate: "August 2026",
    slug: "transactional-analytics-covering-index",
    rubricBreakdown: [
      { name: "Query Execution Plan", score: 35, max: 35 },
      { name: "Index Only Scan", score: 35, max: 35 },
      { name: "Aggregation Filter", score: 28, max: 30 },
    ],
    summary:
      "Optimized PostgreSQL user submission aggregations by replacing full sequential table scans with composite covering index scans.",
  },
];

const SKILL_PILLS = [
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "CSS Grid & Flexbox",
  "Node.js & Express",
  "PostgreSQL",
  "Redis Caching",
  "REST APIs",
  "State Machines",
  "IntersectionObserver",
];

export default function ProfilePage({ params }: ProfilePageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-clip">
      {/* Background Texture & Ambient Gradients */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #26262E 1px, transparent 1px),
            linear-gradient(to bottom, #26262E 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#ABDAC8]/15 via-[#ABDAC8]/5 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="border-b border-[#26262E] bg-[#0E0E14]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/challenges" className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to challenges</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              className="h-9 px-3 text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] text-zinc-300 hover:text-white bg-[#111117] gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#ABDAC8]" />
                  <span>Share Profile</span>
                </>
              )}
            </Button>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-[#ABDAC8] text-[#0A0A0F] font-bold text-xs h-9 px-3.5 rounded-lg hover:bg-[#ABDAC8]/90 transition-all"
              >
                Join Staqor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Profile Hero Spotlight Card */}
        <SpotlightCard accentColor="aqua" watermark="DEV">
          <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Glowing Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#ABDAC8]/25 to-[#111614] border-2 border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] text-2xl sm:text-3xl font-black font-mono shadow-xl shadow-[#ABDAC8]/20 shrink-0">
                {params.username.slice(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                    {params.username}
                  </h1>
                  <Badge className="bg-[#ABDAC8] text-[#0A0A0F] font-mono text-[10px] font-extrabold px-2.5 py-0.5 shadow-sm">
                    VERIFIED CANDIDATE
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                  Software Engineer • Full-Domain Proof of Work Portfolio
                </p>
                <p className="text-[11px] text-zinc-500 font-mono">
                  All solutions verified with automated sub-2.5s AI rubrics
                </p>
              </div>
            </div>

            {/* Quick Proof Stat Chips */}
            <div className="flex items-center gap-3 bg-[#0B0B10] p-3 rounded-2xl border border-[#26262E] font-mono text-xs">
              <div className="px-3 py-1 text-center border-r border-[#26262E]">
                <span className="block text-white font-extrabold text-lg">47</span>
                <span className="text-[10px] text-zinc-500 uppercase">Solves</span>
              </div>
              <div className="px-3 py-1 text-center border-r border-[#26262E]">
                <span className="block text-[#ABDAC8] font-extrabold text-lg">94.8</span>
                <span className="text-[10px] text-zinc-500 uppercase">Avg Score</span>
              </div>
              <div className="px-3 py-1 text-center">
                <span className="block text-amber-400 font-extrabold text-lg flex items-center justify-center gap-0.5">
                  <Flame className="w-4 h-4" /> 7d
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">Streak</span>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Skills & Disciplines Matrix */}
        <div className="p-6 rounded-3xl bg-[#111117] border border-[#26262E] space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ABDAC8] block">
            Verified Competencies
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {SKILL_PILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-[#0B0B10] border border-[#26262E] text-xs font-mono text-zinc-300 hover:border-[#ABDAC8]/40 hover:text-white transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Interactive Solutions Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ABDAC8] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#ABDAC8]" />
                <span>Verified Proof of Work (4 Showcases)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
                Live Interactive Solutions
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Click &quot;Live Sandbox Replay&quot; to test code directly in-browser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERIFIED_SOLUTIONS.map((sol) => (
              <SpotlightCard key={sol.id} accentColor="aqua" watermark={sol.difficulty}>
                <div className="p-6 h-full flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 bg-[#111614]"
                      >
                        {sol.track}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10 font-bold"
                      >
                        SCORE: {sol.score}/100 PASSED
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#ABDAC8] transition-colors leading-snug">
                      {sol.title}
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                      {sol.summary}
                    </p>

                    {/* Rubric Breakdown Progress Bars */}
                    <div className="p-3 rounded-xl bg-[#0B0B10] border border-[#26262E] space-y-2 font-mono text-[11px]">
                      {sol.rubricBreakdown.map((r) => (
                        <div key={r.name} className="flex items-center justify-between text-zinc-400">
                          <span>{r.name}</span>
                          <span className="text-[#ABDAC8] font-bold">
                            {r.score}/{r.max}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#26262E] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">
                      Evaluated in {sol.time} • {sol.completedDate}
                    </span>
                    <Link href={`/challenges/${sol.slug}`}>
                      <Button
                        size="sm"
                        className="h-8 px-3 text-xs font-mono font-bold bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-all gap-1.5 shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Replay</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Recruiter Trust & Verification Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111117] border border-[#26262E] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ABDAC8]" />
              <span>Cryptographic Proof-of-Work Guarantee</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl font-normal">
              Every solution on this profile was authored 100% in-browser in an isolated sandbox, verified against strict multi-criteria rubrics in &lt;2.5s by automated AI evaluation.
            </p>
          </div>
          <Link href="/signup">
            <Button
              variant="outline"
              className="border-[#26262E] hover:border-[#ABDAC8] text-xs font-mono shrink-0 h-10 px-4"
            >
              Start Your Own Portfolio →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
