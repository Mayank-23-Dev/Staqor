"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoIcon } from "@/components/logo";
import {
  ArrowLeft,
  Share2,
  ShieldCheck,
  Flame,
  Eye,
  Copy,
  Check,
  Mail
} from "lucide-react";
import { PROBLEMS_DATA, getProblemBySlug } from "@/lib/problems-data";

interface ProfilePageProps {
  params: { username: string };
}

// Lightweight static card to replace GSAP SpotlightCard for the profile page
function ProfileCard({ children, watermark }: { children: React.ReactNode, watermark?: string }) {
  return (
    <div className="bg-[#111117] border border-[#26262E] rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(171,218,200,0.15),transparent_100%)] pointer-events-none z-0" />
      {watermark && (
        <div className="absolute -bottom-4 -right-4 text-6xl sm:text-7xl font-black text-white/5 select-none pointer-events-none z-0 font-sans">
          {watermark}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const DEFAULT_VERIFIED_SOLUTIONS = [
  {
    id: "sol-1",
    title: "Responsive Pricing Matrix with Annual Switch",
    track: "Frontend UI",
    difficulty: "EASY",
    score: 96,
    time: "1.8s",
    completedDate: "August 2026",
    slug: "responsive-pricing-matrix",
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
    completedDate: "August 2026",
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
  "Tailwind",
  "CSS Grid",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "REST APIs",
  "State Machines",
  "DOM Manipulation",
];

export default function ProfilePage({ params }: ProfilePageProps) {
  const [copied, setCopied] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  
  const [targetProfile, setTargetProfile] = useState<any>(null);
  const decodedParam = decodeURIComponent(params.username);
  
  const isDemoUser = decodedParam === "alex_dev";
  const [stats, setStats] = useState(
    isDemoUser ? { solves: 47, streak: 7, avgScore: 94.8 } : { solves: 0, streak: 0, avgScore: 0 }
  );
  const [difficultyStats, setDifficultyStats] = useState(
    isDemoUser ? { easy: 24, medium: 18, hard: 5, total: 47 } : { easy: 0, medium: 0, hard: 0, total: 0 }
  );
  const [submissions, setSubmissions] = useState<any[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      setAuthUser(user);
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', decodedParam)
        .single();
        
      if (profile) setTargetProfile(profile);
      
      let targetUserId = profile?.id;
      
      if (!targetUserId && user) {
         if (user.user_metadata?.username === decodedParam || 
             (user.email && user.email.split('@')[0] === decodedParam)) {
           targetUserId = user.id;
         }
      }

      if (targetUserId) {
        const { data: userStats } = await supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", targetUserId)
          .single();
          
        if (userStats) {
          setStats(s => ({ ...s, solves: userStats.total_solved || 0, streak: userStats.current_streak || 0 }));
        }

        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        const { data: subs } = await supabase
          .from("submissions")
          .select("id, created_at, problem_id, challenge_id, score, passed, status, groq_response, is_public")
          .eq("user_id", targetUserId)
          .gte("created_at", oneYearAgo.toISOString())
          .order("created_at", { ascending: false });
          
        if (subs && subs.length > 0) {
          setSubmissions(subs);
          
          const solvedSubs = subs.filter((s: any) => s.passed === true || s.status === "solved" || (typeof s.score === "number" && s.score >= 80));
          
          if (solvedSubs.length > 0) {
            const calculatedAvg = (solvedSubs.reduce((acc: number, s: any) => acc + (s.score || 100), 0) / solvedSubs.length).toFixed(1);
            setStats(s => ({ ...s, avgScore: parseFloat(calculatedAvg) }));
          }

          // Count unique solved problems
          const solvedProblemSet = new Set<string>();
          solvedSubs.forEach((s: any) => {
            if (s.problem_id) solvedProblemSet.add(String(s.problem_id));
            if (s.challenge_id) solvedProblemSet.add(String(s.challenge_id));
          });

          let e = 0, m = 0, h = 0;
          solvedProblemSet.forEach((idOrSlug) => {
            const p = getProblemBySlug(idOrSlug) || PROBLEMS_DATA.find(prob => String(prob.id) === idOrSlug || prob.slug === idOrSlug);
            if (p) {
              if (p.difficulty === 'Easy') e++;
              else if (p.difficulty === 'Medium') m++;
              else if (p.difficulty === 'Hard') h++;
            } else {
              e++;
            }
          });

          const totalSolvedCount = Math.max(solvedProblemSet.size, userStats?.total_solved || 0);
          setDifficultyStats({
            easy: e,
            medium: m,
            hard: h,
            total: totalSolvedCount
          });
          setStats(s => ({ ...s, solves: totalSolvedCount }));
        }
      }
    }
    
    fetchData();
  }, [decodedParam, supabase]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCurrentUser =
    authUser &&
    (authUser.email?.split("@")[0].toLowerCase() === decodedParam.toLowerCase() ||
      authUser.user_metadata?.username?.toLowerCase() === decodedParam.toLowerCase() ||
      authUser.user_metadata?.user_name?.toLowerCase() === decodedParam.toLowerCase() ||
      decodedParam === "alex_dev");

  const displayName = isCurrentUser
    ? authUser.user_metadata?.full_name ||
      authUser.user_metadata?.name ||
      authUser.user_metadata?.username ||
      authUser.email?.split("@")[0] ||
      decodedParam
    : targetProfile?.username || decodedParam;

  const email = isCurrentUser ? authUser.email : "";
  const avatarUrl = isCurrentUser
    ? authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || ""
    : targetProfile?.avatar_url || "";

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SQ";

  const heatmapData = useMemo(() => {
    const data = new Map<string, number>();
    submissions.forEach(sub => {
      try {
        const date = sub.created_at ? new Date(sub.created_at).toISOString().split('T')[0] : "";
        if (date) {
          data.set(date, (data.get(date) || 0) + 1);
        }
      } catch {}
    });
    return data;
  }, [submissions]);

  const weeks = useMemo(() => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 364);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const w = [];
    let currentDate = new Date(startDate);
    for (let i = 0; i < 53; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (currentDate > today) break;
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = heatmapData.get(dateStr) || 0;
        week.push({ date: dateStr, count });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (week.length > 0) w.push(week);
    }
    return w;
  }, [heatmapData]);

  // Verified Proof of Work solutions dynamically generated from genuinely passed submissions
  const verifiedSolutions = useMemo(() => {
    // 1. Filter genuine passed submissions
    const passed = submissions.filter(
      (s: any) =>
        s.passed === true ||
        s.status === "solved" ||
        (typeof s.score === "number" && s.score >= 80)
    );

    // 2. Respect privacy visibility for other viewers
    const visiblePassed = isCurrentUser
      ? passed
      : passed.filter((s: any) => s.is_public !== false);

    if (visiblePassed.length === 0) {
      if (decodedParam === "alex_dev") {
        return DEFAULT_VERIFIED_SOLUTIONS;
      }
      return [];
    }

    // 3. Deduplicate by problem: keep highest scoring submission for each unique challenge
    const problemMap = new Map<string, any>();
    visiblePassed.forEach((sub: any) => {
      const key = String(sub.challenge_id || sub.problem_id);
      const cleanKey = key.toLowerCase().replace(/^\d+-/, "");
      const existing = problemMap.get(cleanKey);
      if (!existing || (sub.score || 0) > (existing.score || 0)) {
        problemMap.set(cleanKey, sub);
      }
    });

    return Array.from(problemMap.values()).map((sub: any) => {
      const rawKey = String(sub.challenge_id || sub.problem_id);
      const prob =
        getProblemBySlug(rawKey) ||
        PROBLEMS_DATA.find((p) => String(p.id) === rawKey || p.slug === rawKey);

      const title = prob?.title || (rawKey.includes("-") ? rawKey.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : `Challenge #${rawKey}`);
      const slug = prob?.slug || rawKey;
      const track = prob?.category || "Frontend UI";
      const difficulty = (prob?.difficulty || "Medium").toUpperCase();
      const score = typeof sub.score === "number" ? sub.score : 90;
      
      const completedDate = sub.created_at
        ? new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Recently";

      const rubricBreakdown = Array.isArray(sub.groq_response?.breakdown) && sub.groq_response.breakdown.length > 0
        ? sub.groq_response.breakdown.map((r: any) => ({
            name: r.name || "Rubric Criterion",
            score: typeof r.score === "number" ? r.score : score,
            max: 100,
          }))
        : [
            { name: "Visual Layout & Markup Fidelity", score: score, max: 100 },
            { name: "DOM & State Logic", score: score, max: 100 },
            { name: "Code Cleanliness & Adherence", score: score, max: 100 },
          ];

      const summary =
        sub.groq_response?.overall_feedback ||
        prob?.summary ||
        "Verified automated AI evaluation completed with passing score.";

      return {
        id: sub.id || slug,
        title,
        track,
        difficulty,
        score,
        time: sub.groq_response?.evaluation_time || "2.1s",
        completedDate,
        slug,
        rubricBreakdown,
        summary,
      };
    });
  }, [submissions, isCurrentUser, decodedParam]);

  const totalSubmissions = submissions.length;
  const activeDays = heatmapData.size;
  const circ = 301.59;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans">
      <header className="border-b border-[#26262E] bg-[#0E0E14]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/problems"
              className="text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-mono transition-colors group select-none"
            >
              <LogoIcon variant="aqua" className="w-4 h-4 group-hover:scale-105 transition-transform" />
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to problems</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* LEFT SIDEBAR COLUMN */}
        <div className="w-full lg:w-[250px] shrink-0 space-y-4">
          <ProfileCard>
            <div className="p-4 flex flex-col items-center text-center space-y-3">
              <Avatar className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ABDAC8]/25 to-[#111614] border-2 border-[#ABDAC8]/40 shadow-md shrink-0">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={displayName} className="rounded-2xl object-cover" />
                ) : null}
                <AvatarFallback className="rounded-2xl bg-transparent text-[#ABDAC8] text-2xl font-black font-mono">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 flex flex-col items-center">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-xl font-extrabold text-white tracking-tight font-sans">
                    {displayName}
                  </h1>
                  <Badge className="bg-[#ABDAC8] text-[#0A0A0F] font-mono text-[9px] font-extrabold px-2 py-0.5 shadow-sm">
                    VERIFIED CANDIDATE
                  </Badge>
                </div>
                {email && (
                  <p className="text-[10px] text-[#A7DDC9] font-mono flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    <span>{email}</span>
                  </p>
                )}
                <p className="text-[11px] text-zinc-400 font-normal mt-1">
                  Software Engineer
                </p>
              </div>

              <div className="w-full pt-3 space-y-1.5 border-t border-[#26262E]">
                <div className="flex justify-between items-center px-1">
                  <span className="text-zinc-400 font-mono text-[10px]">SOLVES</span>
                  <span className="text-white text-xs font-extrabold">{stats.solves}</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-zinc-400 font-mono text-[10px]">AVG SCORE</span>
                  <span className="text-[#ABDAC8] text-xs font-extrabold">{stats.avgScore}</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-zinc-400 font-mono text-[10px]">STREAK</span>
                  <span className="text-amber-400 text-xs font-extrabold flex items-center gap-0.5">
                    <Flame className="w-3 h-3" /> {stats.streak}
                  </span>
                </div>
              </div>

              <div className="w-full pt-3 space-y-2 border-t border-[#26262E]">
                {isCurrentUser ? (
                  <Link href="/settings" className="w-full block">
                    <Button className="w-full bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[11px] h-8 hover:bg-[#ABDAC8]/90 transition-all rounded-lg">
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup" className="w-full block">
                    <Button className="w-full bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[11px] h-8 hover:bg-[#ABDAC8]/90 transition-all rounded-lg">
                      Join Staqor
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="w-full h-8 text-[11px] font-mono border-[#26262E] hover:border-[#ABDAC8] text-zinc-300 hover:text-white bg-[#111117] rounded-lg"
                >
                  {copied ? (
                    <><Check className="w-3 h-3 mr-1.5 text-[#4ADE80]" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3 mr-1.5 text-[#ABDAC8]" /> Share</>
                  )}
                </Button>
              </div>
            </div>
          </ProfileCard>

          <div className="p-4 rounded-2xl bg-[#111117] border border-[#26262E] space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ABDAC8] block">
              Verified Competencies
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SKILL_PILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-lg bg-[#0B0B10] border border-[#26262E] text-[9px] font-mono text-zinc-300 hover:border-[#ABDAC8]/40 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT MAIN COLUMN */}
        <div className="flex-1 space-y-4 min-w-0">
          
          <ProfileCard>
            <div className="p-4 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-1/3 flex flex-col items-center">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 self-start w-full text-center sm:text-left">Problems Solved</h3>
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="48" fill="none" stroke="#26262E" strokeWidth="8" />
                    <circle cx="64" cy="64" r="48" fill="none" stroke="#4ADE80" strokeWidth="8" strokeDasharray={`${(difficultyStats.easy / Math.max(difficultyStats.total, 1)) * circ} ${circ}`} strokeDashoffset="0" />
                    <circle cx="64" cy="64" r="48" fill="none" stroke="#FBBF24" strokeWidth="8" strokeDasharray={`${(difficultyStats.medium / Math.max(difficultyStats.total, 1)) * circ} ${circ}`} strokeDashoffset={`${-((difficultyStats.easy / Math.max(difficultyStats.total, 1)) * circ)}`} />
                    <circle cx="64" cy="64" r="48" fill="none" stroke="#F87171" strokeWidth="8" strokeDasharray={`${(difficultyStats.hard / Math.max(difficultyStats.total, 1)) * circ} ${circ}`} strokeDashoffset={`${-(((difficultyStats.easy + difficultyStats.medium) / Math.max(difficultyStats.total, 1)) * circ)}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-white leading-none">{difficultyStats.total}</span>
                    <span className="text-[9px] text-zinc-500 font-mono mt-0.5">Solved</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full sm:w-2/3 flex flex-col gap-2 justify-center">
                <div className="flex justify-between items-center bg-[#0B0B10] p-2 rounded-lg border border-[#26262E]">
                  <span className="text-[#4ADE80] text-[11px] font-bold font-mono">Easy</span>
                  <span className="text-white text-xs font-bold">{difficultyStats.easy}</span>
                </div>
                <div className="flex justify-between items-center bg-[#0B0B10] p-2 rounded-lg border border-[#26262E]">
                  <span className="text-[#FBBF24] text-[11px] font-bold font-mono">Medium</span>
                  <span className="text-white text-xs font-bold">{difficultyStats.medium}</span>
                </div>
                <div className="flex justify-between items-center bg-[#0B0B10] p-2 rounded-lg border border-[#26262E]">
                  <span className="text-[#F87171] text-[11px] font-bold font-mono">Hard</span>
                  <span className="text-white text-xs font-bold">{difficultyStats.hard}</span>
                </div>
              </div>
            </div>
          </ProfileCard>

          <ProfileCard>
            <div className="p-4 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-1">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  {totalSubmissions} submissions in the past year
                </h3>
                <div className="flex gap-3 text-right">
                  <p className="text-[9px] text-zinc-500 font-mono">Active days: <span className="text-white font-bold ml-1">{activeDays}</span></p>
                  <p className="text-[9px] text-zinc-500 font-mono">Max streak: <span className="text-white font-bold ml-1">{stats.streak}</span></p>
                </div>
              </div>
              
              <div className="w-full overflow-x-auto scrollbar-none pb-1">
                <div className="flex gap-[3px] min-w-max">
                  {weeks.map((week, i) => (
                    <div key={i} className="flex flex-col gap-[3px] shrink-0">
                      {week.map((day, j) => (
                        <div
                          key={day.date}
                          title={`${day.count} submissions on ${day.date}`}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-colors ${
                            day.count === 0 ? 'bg-[#26262E]' : 
                            day.count < 2 ? 'bg-[#ABDAC8]/30' : 
                            day.count < 4 ? 'bg-[#ABDAC8]/60' : 'bg-[#ABDAC8]'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProfileCard>

          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#ABDAC8] mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ABDAC8]" />
                  <span>Verified Proof of Work Showcase</span>
                </div>
                <h2 className="text-lg font-black text-white tracking-tight font-display">
                  Interactive Challenge Solutions
                </h2>
              </div>
            </div>

            {verifiedSolutions.length === 0 ? (
              <ProfileCard>
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ABDAC8]/10 border border-[#ABDAC8]/20 flex items-center justify-center mx-auto text-[#ABDAC8]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">No Verified Solutions Yet</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Complete and submit coding challenges with a passing score (80+) to showcase your verified proof of work here.
                    </p>
                  </div>
                  <Link href="/problems" className="inline-block pt-1">
                    <Button className="h-8 px-4 text-xs font-mono font-bold bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-all rounded-lg">
                      Solve Your First Challenge
                    </Button>
                  </Link>
                </div>
              </ProfileCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verifiedSolutions.map((sol) => (
                  <ProfileCard key={sol.id} watermark={sol.difficulty}>
                    <div className="p-4 h-full flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="text-[9px] font-mono text-[#ABDAC8] border-[#ABDAC8]/30 bg-[#111614] px-1.5 py-0"
                          >
                            {sol.track}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[9px] font-mono text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10 font-bold px-1.5 py-0"
                          >
                            SCORE: {sol.score}/100 PASSED
                          </Badge>
                        </div>

                        <h3 className="text-sm font-bold text-white leading-snug">
                          {sol.title}
                        </h3>

                        <p className="text-[11px] text-zinc-300 leading-relaxed font-normal line-clamp-2">
                          {sol.summary}
                        </p>

                        <div className="p-2 rounded-lg bg-[#0B0B10] border border-[#26262E] space-y-1 font-mono text-[9px]">
                          {sol.rubricBreakdown.map((r: any) => (
                            <div key={r.name} className="flex items-center justify-between text-zinc-400">
                              <span className="truncate pr-2">{r.name}</span>
                              <span className="text-[#ABDAC8] font-bold shrink-0">
                                {r.score}/{r.max}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#26262E] flex items-center justify-between">
                        <span className="text-[9px] font-mono text-zinc-500">
                          {sol.time} • {sol.completedDate}
                        </span>
                        <Link href={`/problems/${sol.slug}`}>
                          <Button
                            size="sm"
                            className="h-7 px-2 text-[10px] font-mono font-bold bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 transition-all gap-1 shadow-sm"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Replay</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </ProfileCard>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}
