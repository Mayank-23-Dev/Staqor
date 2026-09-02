"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  ShieldCheck,
  Flame,
  Eye,
  Copy,
  Check,
} from "lucide-react";

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

const VERIFIED_SOLUTIONS = [
  {
    id: "sol-1",
    title: "Responsive Pricing Matrix with Annual Switch",
    track: "Frontend UI",
    difficulty: "EASY",
    score: 96,
    time: "1.8s",
    completedDate: "Sep 2026",
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
    completedDate: "Sep 2026",
    slug: "drag-and-drop-kanban-board",
    rubricBreakdown: [
      { name: "Drag Event Delegation", score: 34, max: 35 },
      { name: "Column State Persistence", score: 35, max: 35 },
      { name: "Clean DOM Mutation", score: 25, max: 30 },
    ],
    summary:
      "Built native HTML5 Drag and Drop event delegates to dynamically transfer and reorder sprint tasks.",
  },
  {
    id: "sol-3",
    title: "In-Memory Rate Limiter Token Bucket",
    track: "Backend & REST APIs",
    difficulty: "MEDIUM",
    score: 92,
    time: "1.9s",
    completedDate: "Aug 2026",
    slug: "in-memory-rate-limiter",
    rubricBreakdown: [
      { name: "Concurrency Safety", score: 33, max: 35 },
      { name: "Token Refill Logic", score: 35, max: 35 },
      { name: "HTTP 429 Headers", score: 24, max: 30 },
    ],
    summary:
      "Implemented a token bucket algorithm to throttle burst traffic at 60 req/min with zero memory leaks.",
  },
  {
    id: "sol-4",
    title: "Transactional Analytics with Covering Index",
    track: "Databases & SQL",
    difficulty: "MEDIUM",
    score: 98,
    time: "1.6s",
    completedDate: "Aug 2026",
    slug: "transactional-analytics-covering-index",
    rubricBreakdown: [
      { name: "Query Execution Plan", score: 35, max: 35 },
      { name: "Index Only Scan", score: 35, max: 35 },
      { name: "Aggregation Filter", score: 28, max: 30 },
    ],
    summary:
      "Optimized PostgreSQL user submission aggregations by replacing full sequential table scans.",
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
  "IntersectionObserver",
];

export default function ProfilePage({ params }: ProfilePageProps) {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ solves: 47, streak: 7, avgScore: 94.8 });
  const [difficultyStats, setDifficultyStats] = useState({ easy: 0, medium: 0, hard: 0, total: 0 });
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single();
        
      let targetUserId = profile?.id;
      
      if (!targetUserId && user) {
         if (user.user_metadata?.username === params.username || 
             (user.email && user.email.split('@')[0] === params.username)) {
           targetUserId = user.id;
         }
      }

      if (user && targetUserId === user.id) {
        setIsOwnProfile(true);
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
          .select("created_at, problem_id")
          .eq("user_id", targetUserId)
          .eq("status", "solved")
          .gte("created_at", oneYearAgo.toISOString());
          
        if (subs) {
          setSubmissions(subs);
          
          const uniqueProblemIds = Array.from(new Set(subs.map(s => s.problem_id)));
          if (uniqueProblemIds.length > 0) {
             const { data: probs } = await supabase
               .from("problems")
               .select("id, difficulty")
               .in("id", uniqueProblemIds);
               
             if (probs) {
               let e = 0, m = 0, h = 0;
               probs.forEach(p => {
                 if (p.difficulty === 'Easy') e++;
                 else if (p.difficulty === 'Medium') m++;
                 else if (p.difficulty === 'Hard') h++;
               });
               setDifficultyStats({ easy: e, medium: m, hard: h, total: probs.length });
               setStats(s => ({ ...s, solves: probs.length }));
             }
          }
        }
      }
    }
    
    fetchData();
  }, [params.username, supabase]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const heatmapData = useMemo(() => {
    const data = new Map<string, number>();
    submissions.forEach(sub => {
      const date = new Date(sub.created_at).toISOString().split('T')[0];
      data.set(date, (data.get(date) || 0) + 1);
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

  const totalSubmissions = submissions.length;
  const activeDays = heatmapData.size;
  const circ = 301.59;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans">
      <header className="border-b border-[#26262E] bg-[#0E0E14]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/challenges" className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to challenges</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* LEFT SIDEBAR COLUMN */}
        <div className="w-full lg:w-[250px] shrink-0 space-y-4">
          <ProfileCard>
            <div className="p-4 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ABDAC8]/25 to-[#111614] border-2 border-[#ABDAC8]/40 flex items-center justify-center text-[#ABDAC8] text-2xl font-black font-mono shadow-md shrink-0">
                {params.username.slice(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1 flex flex-col items-center">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-xl font-extrabold text-white tracking-tight font-sans">
                    {params.username}
                  </h1>
                  <Badge className="bg-[#ABDAC8] text-[#0A0A0F] font-mono text-[9px] font-extrabold px-2 py-0.5 shadow-sm">
                    VERIFIED CANDIDATE
                  </Badge>
                </div>
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
                {isOwnProfile ? (
                  <Button className="w-full bg-[#ABDAC8] text-[#0A0A0F] font-bold text-[11px] h-8 hover:bg-[#ABDAC8]/90 transition-all rounded-lg">
                    Edit Profile
                  </Button>
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
                  <span>Verified Proof of Work (4 Showcases)</span>
                </div>
                <h2 className="text-lg font-black text-white tracking-tight font-display">
                  Live Interactive Solutions
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VERIFIED_SOLUTIONS.map((sol) => (
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

                    <div className="pt-2 border-t border-[#26262E] flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500">
                        {sol.time} • {sol.completedDate}
                      </span>
                      <Link href={`/challenges/${sol.slug}`}>
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
          </div>
          
        </div>
      </main>
    </div>
  );
}
