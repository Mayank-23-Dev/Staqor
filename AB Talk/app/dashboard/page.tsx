'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Code2,
  Rocket,
  Sparkles,
  GitBranch,
  ChevronRight,
  Flame,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  StreakCounter,
  TodayTaskCard,
  ProgressBar,
  CompletionStats,
  Achievements
} from '@/ui/Dashboard_UI';

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'coding' | 'ai' | 'hackathon'>('all');

  const challenges = [
    {
      id: '60-day-coding',
      dayId: '1',
      title: '60-Day Coding Challenge',
      category: 'coding',
      badge: 'Active Streak',
      badgeColor: 'bg-[#e8602e]/15 text-[#e8602e] border-[#e8602e]/30',
      duration: '60 Days',
      icon: Code2,
      description: 'Daily scoped engineering tasks. Build a streak, push code to GitHub, and get discovered by recruiters.',
      progress: 'Day 12 of 60',
      streak: 12,
      ctaText: 'Continue Day 12',
      ctaStyle: 'bg-gradient-to-b from-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] shadow-md shadow-[#e8602e]/25 hover:shadow-lg hover:shadow-[#e8602e]/40 border border-[#ff8559]/30'
    },
    {
      id: '31-day-ai',
      dayId: '1',
      title: '31 Days AI Cohort',
      category: 'ai',
      badge: 'Applications Open',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      duration: '31 Days',
      icon: Sparkles,
      description: 'Master RAG, vector databases, and AI agents by shipping a production chatbot in 31 days.',
      progress: 'Starts Next Week',
      streak: 0,
      ctaText: 'Start AI Track',
      ctaStyle: 'bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 border border-emerald-400/30'
    },
    {
      id: 'claude-challenge',
      dayId: '1',
      title: 'Claude Challenge',
      category: 'ai',
      badge: 'New Launch',
      badgeColor: 'bg-[#0a6df0]/15 text-[#0a6df0] border-[#0a6df0]/30',
      duration: '60 Days',
      icon: GitBranch,
      description: 'Master prompt engineering, tool calling, and autonomous subagent workflows with Anthropic Claude.',
      progress: 'Day 1 of 60',
      streak: 1,
      ctaText: 'Begin Track',
      ctaStyle: 'bg-gradient-to-b from-[#0a6df0] to-[#0853b8] hover:from-[#257ff5] hover:to-[#095ecf] shadow-md shadow-[#0a6df0]/25 hover:shadow-lg hover:shadow-[#0a6df0]/40 border border-[#4894f8]/30'
    },
    {
      id: 'vibe-hackathon',
      dayId: '1',
      title: 'Vibe Code Hackathon',
      category: 'hackathon',
      badge: 'Ended',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      duration: '48 Hours',
      icon: Rocket,
      description: 'Build anything using AI in 48 hours. Compete solo or in teams of up to 3.',
      progress: 'Leaderboard Live',
      streak: 2,
      ctaText: 'View Winners',
      ctaStyle: 'bg-[#2a2a2a] hover:bg-zinc-800 border border-zinc-700 text-white'
    }
  ];

  const filteredChallenges = activeFilter === 'all'
    ? challenges
    : challenges.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen text-white font-sans relative">

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f0f]/90 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/abtalks-logo.webp"
                alt="ABTalks Logo"
                width={120}
                height={32}
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2a2a] text-zinc-300 border border-zinc-700 hidden sm:inline-block">
              Student Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="sm" variant="outline" className="border border-zinc-700/80 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-zinc-300 hover:text-white font-semibold rounded-field px-4 py-2 text-xs transition-all hover:scale-105 active:scale-95">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#2a2a2a]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#e8602e] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-[#e8602e]" />
              <span>Builder Workspace</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Active Challenges
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Select a challenge to view daily prompts, submit GitHub commits, and track your streak.
            </p>
          </div>

          {/* Quick Stats & Streak Counter */}
          <div className="flex flex-wrap items-center gap-3">
            <StreakCounter streak={12} />
            <CompletionStats verified={12} total={60} />
            <Achievements />
          </div>
        </div>

        {/* Today's Featured Prompt Card */}
        <div className="mb-10">
          <TodayTaskCard />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {(['all', 'coding', 'ai', 'hackathon'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-selector text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-gradient-to-b from-[#e8602e] to-[#c95326] text-white shadow-md shadow-[#e8602e]/25 scale-105'
                  : 'bg-[#1a1a1a] text-zinc-400 border border-[#2a2a2a] hover:text-white hover:border-zinc-600'
              }`}
            >
              {tab === 'all' ? 'All Tracks' : tab}
            </button>
          ))}
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChallenges.map(challenge => {
            const IconComponent = challenge.icon;
            return (
              <Card key={challenge.id} className="bg-[#1a1a1a] border-[#2a2a2a] hover:-translate-y-1.5 hover:border-[#e8602e]/60 hover:shadow-2xl hover:shadow-[#e8602e]/10 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-bold tracking-wide px-3 py-1 rounded-selector border ${challenge.badgeColor}`}>
                        {challenge.badge}
                      </span>
                      <div className="w-9 h-9 rounded-field bg-[#2a2a2a] border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:text-[#e8602e] group-hover:scale-110 transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-extrabold text-white mb-2 tracking-tight">
                      {challenge.title}
                    </h2>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Bottom Stats & Button */}
                  <div>
                    <div className="mb-4">
                      <ProgressBar current={challenge.streak} total={challenge.id === '31-day-ai' ? 31 : 60} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 pt-4 border-t border-zinc-800">
                      <span className="font-mono">{challenge.progress}</span>
                      <span className="font-semibold text-zinc-300">{challenge.duration}</span>
                    </div>

                    <Link href={`/day/${challenge.dayId}`}>
                      <Button size="sm" className={`w-full text-white font-bold rounded-field py-3 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${challenge.ctaStyle}`}>
                        <span>{challenge.ctaText}</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
