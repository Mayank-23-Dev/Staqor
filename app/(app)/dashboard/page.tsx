import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { UserNav } from "@/components/navigation/UserNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  Terminal,
  Code2,
  Trophy,
  Flame,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Server,
  Database,
  ShieldCheck,
  TrendingUp,
  Play,
  Share2,
  Zap,
  Lock,
} from "lucide-react";

export const dynamic = "force-dynamic";

const RECENT_SUBMISSIONS = [
  {
    id: "sub-1",
    title: "Responsive Pricing Matrix with Annual Switch",
    track: "Frontend UI",
    difficulty: "EASY",
    score: 96,
    verdict: "PASSED",
    time: "1.8s",
    date: "Today, 4:20 PM",
    slug: "interactive-pricing-card",
  },
  {
    id: "sub-2",
    title: "Drag-and-Drop Kanban Task Board",
    track: "JS & DOM",
    difficulty: "MEDIUM",
    score: 94,
    verdict: "PASSED",
    time: "2.1s",
    date: "Yesterday",
    slug: "drag-and-drop-kanban-board",
  },
  {
    id: "sub-3",
    title: "In-Memory Rate Limiter Token Bucket",
    track: "Backend API",
    difficulty: "MEDIUM",
    score: 92,
    verdict: "PASSED",
    time: "1.9s",
    date: "2 days ago",
    slug: "in-memory-rate-limiter",
  },
];

const RECOMMENDED_CHALLENGES = [
  {
    id: "rec-1",
    title: "Virtualized Infinite Scroll Product Grid",
    track: "React Components",
    difficulty: "HARD",
    timeEst: "25 mins",
    desc: "Recycle DOM elements using IntersectionObserver to maintain 60 FPS under 10,000 items.",
    slug: "virtualized-infinite-scroll",
    accent: "aqua" as const,
  },
  {
    id: "rec-2",
    title: "Transactional Analytics with Covering Index",
    track: "Databases & SQL",
    difficulty: "MEDIUM",
    timeEst: "18 mins",
    desc: "Author high-throughput PostgreSQL queries and composite covering indexes to eliminate table scans.",
    slug: "transactional-analytics-covering-index",
    accent: "purple" as const,
  },
  {
    id: "rec-3",
    title: "Distributed Lock with Auto-Expiring Leases",
    track: "Systems & Caching",
    difficulty: "HARD",
    timeEst: "22 mins",
    desc: "Implement atomic Redis SETNX locking with TTL renewal to protect concurrent async jobs.",
    slug: "distributed-lock-redis",
    accent: "emerald" as const,
  },
];

const TRACK_PROGRESS = [
  { name: "Frontend UI & Styling", solved: 12, total: 14, pct: 85, color: "bg-[#ABDAC8]" },
  { name: "JavaScript & DOM Architecture", solved: 14, total: 18, pct: 77, color: "bg-cyan-400" },
  { name: "React Component Systems", solved: 9, total: 16, pct: 56, color: "bg-emerald-400" },
  { name: "Backend & REST APIs", solved: 6, total: 12, pct: 50, color: "bg-amber-400" },
  { name: "Databases & SQL Engineering", solved: 4, total: 10, pct: 40, color: "bg-purple-400" },
  { name: "Systems & Distributed Caching", solved: 2, total: 8, pct: 25, color: "bg-blue-400" },
];

export default async function DashboardPage() {
  const current = await getCurrentUser();
  const username =
    current?.profile?.username ||
    (current?.user ? current.user.email?.split("@")[0] : "Developer");
  const totalSolves = current?.profile?.total_solves || 47;
  const streakDays = current?.profile?.total_solves ? Math.min(current.profile.total_solves + 1, 7) : 7;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-clip">
      {/* Background Texture & Multi-Stop Gradients */}
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

      {/* Top Navigation Bar */}
      <header className="border-b border-[#26262E] bg-[#0E0E14]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#ABDAC8]/15 border border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] shadow-md shadow-[#ABDAC8]/20 group-hover:scale-105 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">Staqor</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#26262E] hidden sm:block" />
            <span className="text-zinc-500 text-xs font-mono hidden sm:inline-block">/ dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/challenges">
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-3 text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] text-zinc-300 hover:text-white bg-[#111117]"
              >
                Browse Catalog
              </Button>
            </Link>
            <Link href={`/profile/${username}`}>
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-3 text-xs font-mono border-[#ABDAC8]/40 text-[#ABDAC8] hover:bg-[#ABDAC8]/10 hidden sm:inline-flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Public Profile</span>
              </Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Hero Greeting & Quick Action Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111614] via-[#111117] to-[#0A0A0F] border border-[#ABDAC8]/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 text-[#ABDAC8] text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span>CANDIDATE PROOF-OF-WORK ACTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Welcome back, <span className="text-[#ABDAC8]">{username}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed">
              You are on a <strong className="text-amber-400 font-mono">{streakDays}-day streak</strong>. Practice daily challenges across UI, APIs, and Databases to boost your verified recruiter proof score.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link href="/challenges/interactive-pricing-card">
              <Button
                size="lg"
                className="bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-lg shadow-[#ABDAC8]/25 border border-[#ABDAC8]/40 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Resume Active Challenge</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Key SaaS Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Solved Challenges */}
          <SpotlightCard accentColor="aqua" watermark="SOLVED">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase text-zinc-400">Total Solved</span>
                <div className="w-8 h-8 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">
                  {totalSolves} <span className="text-xs text-zinc-500 font-normal font-mono">/ 99</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Curriculum Progress</span>
                    <span className="text-[#ABDAC8] font-bold">{Math.round((totalSolves / 99) * 100)}%</span>
                  </div>
                  <Progress value={(totalSolves / 99) * 100} className="h-1.5 bg-[#1F1F2E]" />
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Metric 2: Average Rubric Score */}
          <SpotlightCard accentColor="emerald" watermark="GRADE">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase text-zinc-400">Avg AI Score</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">
                  94.8 <span className="text-xs text-zinc-500 font-normal font-mono">/ 100</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#4ADE80] pt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Top 4% Candidate Quality</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Metric 3: Daily Active Streak */}
          <SpotlightCard accentColor="amber" watermark="STREAK">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase text-zinc-400">Daily Streak</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame className="w-4 h-4 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">
                  {streakDays} <span className="text-xs text-amber-400 font-normal font-mono">Days 🔥</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono pt-2">
                  Solve 1 challenge today to keep your verified streak
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Metric 4: Recruiter Portfolio Link */}
          <SpotlightCard accentColor="purple" watermark="LINK">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase text-zinc-400">Verified Portfolio</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono mb-1 truncate text-[#ABDAC8]">
                  staqor.dev/p/{username}
                </div>
                <Link href={`/profile/${username}`} className="inline-flex items-center gap-1.5 text-xs text-[#ABDAC8] hover:underline font-mono pt-2 font-bold">
                  <span>Open Live Showcase</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* 2-Column Split: Track Proficiency (Left 5 cols) & Recent Submissions (Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Domain Proficiency Progress (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#111117] border border-[#26262E] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#26262E]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#ABDAC8]" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Domain Progress
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">6 Tracks Active</span>
              </div>

              <div className="space-y-4">
                {TRACK_PROGRESS.map((t) => (
                  <div key={t.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-300 truncate max-w-[200px]">{t.name}</span>
                      <span className="text-zinc-400">
                        <strong className="text-white">{t.solved}</strong>/{t.total} ({t.pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1A1A22] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${t.color} transition-all duration-500`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#26262E]">
                <Link href="/challenges" className="w-full block">
                  <Button
                    variant="outline"
                    className="w-full text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8] h-9"
                  >
                    Explore All Curriculum Tracks →
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Verified Submissions Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-[#111117] border border-[#26262E] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#26262E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Recent AI Evaluations
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#ABDAC8]">Live Sandbox Replays</span>
              </div>

              <div className="space-y-3">
                {RECENT_SUBMISSIONS.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-[#0B0B10] border border-[#26262E] hover:border-[#ABDAC8]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[9px] font-mono text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10"
                        >
                          {sub.verdict} • {sub.score}/100
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[9px] font-mono border-[#26262E] text-zinc-400"
                        >
                          {sub.track}
                        </Badge>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ABDAC8] transition-colors">
                        {sub.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        Evaluated in {sub.time} • {sub.date}
                      </p>
                    </div>

                    <Link href={`/challenges/${sub.slug}`} className="shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8] gap-1 bg-[#111117]"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Replay</span>
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Next Challenges Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ABDAC8] block mb-0.5">
                Recommended For You
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
                Next Challenges on Your Path
              </h2>
            </div>
            <Link href="/challenges" className="text-xs text-[#ABDAC8] hover:underline font-mono hidden sm:inline-block">
              View All 99 Challenges →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RECOMMENDED_CHALLENGES.map((rec) => (
              <SpotlightCard key={rec.id} accentColor={rec.accent} watermark={rec.difficulty}>
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 bg-[#111614]"
                      >
                        {rec.track}
                      </Badge>
                      <span className="text-[10px] font-mono text-zinc-500">{rec.timeEst}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#ABDAC8] transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                      {rec.desc}
                    </p>
                  </div>

                  <Link href={`/challenges/${rec.slug}`} className="block">
                    <Button
                      className="w-full bg-[#16161F] hover:bg-[#ABDAC8] hover:text-[#0A0A0F] text-white border border-[#26262E] hover:border-[#ABDAC8] font-mono text-xs font-bold h-10 rounded-xl transition-all gap-1.5"
                    >
                      <span>Start Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
