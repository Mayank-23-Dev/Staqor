'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Rocket, Sparkles, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/SpotlightCard';

export function ProgramCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Phase 7: Entrance animation for header
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });
    }

    // Phase 7: Entrance animation for grid cards
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="challenges" className="py-16 md:py-24 border-t border-[#2a2a2a]">
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2">Platform Programs</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Active Challenges &amp; Cohorts
          </h2>
        </div>
        <p className="text-base text-zinc-300 max-w-md font-normal">
          Choose your format and level up through daily proof of work.
        </p>
      </div>

      <div ref={gridRef} className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
        {/* Card 1: 60-Day Coding Challenge */}
        <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
          <SpotlightCard accentColor="orange" watermark="60D">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-selector bg-[#e8602e]/15 text-[#e8602e] border border-[#e8602e]/30">
                    Enrolling now
                  </span>
                  <Code2 className="w-5 h-5 text-zinc-400 group-hover:text-[#e8602e] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">60-Day Coding Challenge</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                  One real task every day across AI, Data Science, or Software Engineering. Build a streak and a public portfolio.
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    60 days
                  </span>
                </div>
                <Link href="/dashboard" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-b from-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-bold rounded-field py-3 text-sm shadow-md shadow-[#e8602e]/25 hover:shadow-lg hover:shadow-[#e8602e]/40 border border-[#ff8559]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Start the challenge
                  </Button>
                </Link>
              </div>
            </CardContent>
          </SpotlightCard>
        </div>

        {/* Card 2: Vibe Code Hackathon */}
        <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
          <SpotlightCard accentColor="amber" watermark="48H">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-selector bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Registration closed
                  </span>
                  <Rocket className="w-5 h-5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">Vibe Code Hackathon</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                  Build anything using AI in 48 hours. Compete solo or with a team of up to three and ship something real.
                </p>
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    48 hours
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    Teams of 1–3
                  </span>
                </div>
                <Link href="/dashboard" className="block">
                  <Button size="sm" variant="outline" className="w-full border border-zinc-700/80 bg-[#2a2a2a]/90 hover:bg-zinc-800 hover:border-zinc-500 text-white font-bold rounded-field py-3 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Explore ABTalks
                  </Button>
                </Link>
              </div>
            </CardContent>
          </SpotlightCard>
        </div>

        {/* Card 3: 31 Days AI Cohort */}
        <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
          <SpotlightCard accentColor="emerald" watermark="31D">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-selector bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Applications open
                  </span>
                  <Sparkles className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">31 Days AI Cohort</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                  Build and deploy a production AI chatbot in 31 days. Learn RAG, agents, MCP, and get in front of recruiters.
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    31 days
                  </span>
                </div>
                <Link href="/dashboard" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold rounded-field py-3 text-sm shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Apply now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </SpotlightCard>
        </div>

        {/* Card 4: Claude Challenge */}
        <div className="min-w-[280px] sm:min-w-0 snap-center h-full">
          <SpotlightCard accentColor="blue" watermark="AI">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wide px-3 py-1 rounded-selector bg-[#0a6df0]/15 text-[#0a6df0] border border-[#0a6df0]/30">
                    New
                  </span>
                  <GitBranch className="w-5 h-5 text-zinc-400 group-hover:text-[#0a6df0] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">Claude Challenge</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-5 font-normal">
                  Master Claude through focused prompt-engineering tasks and build practical AI workflows.
                </p>
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    60 days
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-selector bg-[#2a2a2a] text-zinc-200 border border-zinc-700/50">
                    AI mastery
                  </span>
                </div>
                <Link href="/dashboard" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-b from-[#0a6df0] to-[#0853b8] hover:from-[#257ff5] hover:to-[#095ecf] text-white font-bold rounded-field py-3 text-sm shadow-md shadow-[#0a6df0]/25 hover:shadow-lg hover:shadow-[#0a6df0]/40 border border-[#4894f8]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Join the Claude track
                  </Button>
                </Link>
              </div>
            </CardContent>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
