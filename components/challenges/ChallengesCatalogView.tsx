"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Flame,
  Zap,
  Code2,
  Terminal,
  Sparkles,
  Server,
  Bug,
  Layout,
  Layers,
  Circle,
  Trophy,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IChallenge, IUserChallengeStats } from "@/lib/supabase/db";

interface ChallengesCatalogViewProps {
  initialChallenges: IChallenge[];
  stats: IUserChallengeStats;
  currentUsername: string | null;
  isLoggedIn: boolean;
}

const CATEGORIES = [
  { id: "all", label: "All Tracks", icon: Layers, track: null },
  { id: "html-css", label: "HTML & CSS", icon: Code2, track: "html-css" },
  { id: "javascript", label: "JS / DOM", icon: Terminal, track: "javascript" },
  { id: "react", label: "React", icon: Zap, track: "react" },
  { id: "vue", label: "Vue", icon: Sparkles, track: "vue" },
  { id: "node-api", label: "Node.js & API", icon: Server, track: "node-api" },
  { id: "bug-fix", label: "Bug-Fix", icon: Bug, track: "bug-fix" },
  { id: "full-stack", label: "Full-Stack", icon: Layout, track: "full-stack" },
];

export function ChallengesCatalogView({
  initialChallenges,
  stats,
  currentUsername,
  isLoggedIn,
}: ChallengesCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialChallenges.length };
    for (const cat of CATEGORIES) {
      if (cat.track) {
        counts[cat.id] = initialChallenges.filter(
          (c) => c.track === cat.track || c.category?.toLowerCase() === cat.label.toLowerCase()
        ).length;
      }
    }
    return counts;
  }, [initialChallenges]);

  // Filtered and searched challenges
  const filteredChallenges = useMemo(() => {
    return initialChallenges.filter((challenge) => {
      // Category filter
      if (selectedCategory !== "all") {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        const matchesTrack = catObj?.track ? challenge.track === catObj.track : false;
        const matchesCategory =
          challenge.category?.toLowerCase() === catObj?.label.toLowerCase() ||
          challenge.track?.toLowerCase() === selectedCategory.toLowerCase();
        if (!matchesTrack && !matchesCategory) return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "all" && challenge.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      const attempt = stats.attemptCounts[challenge.id] || { run_count: 0, submit_count: 0 };
      const isSolved =
        stats.solvedChallengeIds.includes(challenge.id) ||
        stats.solvedChallengeIds.includes(challenge.slug);
      const isLocked = !isSolved && attempt.run_count >= 5 && attempt.submit_count >= 3;

      if (selectedStatus === "solved" && !isSolved) return false;
      if (selectedStatus === "unsolved" && isSolved) return false;
      if (selectedStatus === "locked" && !isLocked) return false;
      if (
        selectedStatus === "attempted" &&
        (isSolved || (attempt.run_count === 0 && attempt.submit_count === 0))
      )
        return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = challenge.title.toLowerCase().includes(q);
        const matchesSlug = challenge.slug.toLowerCase().includes(q);
        const matchesTrack = challenge.track.toLowerCase().includes(q);
        const matchesCategory = challenge.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSlug && !matchesTrack && !matchesCategory) return false;
      }

      return true;
    });
  }, [initialChallenges, selectedCategory, selectedDifficulty, selectedStatus, searchQuery, stats]);

  // Pagination slice
  const totalPages = Math.ceil(filteredChallenges.length / pageSize) || 1;
  const paginatedChallenges = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredChallenges.slice(startIndex, startIndex + pageSize);
  }, [filteredChallenges, currentPage, pageSize]);

  // Reset filters
  const isFiltered =
    selectedCategory !== "all" ||
    selectedDifficulty !== "all" ||
    selectedStatus !== "all" ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // SVG Progress Ring metrics
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const solvePercentage =
    stats.totalChallenges > 0
      ? Math.min(100, Math.round((stats.totalSolved / stats.totalChallenges) * 100))
      : 0;
  const strokeDashoffset = circumference - (solvePercentage / 100) * circumference;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] bg-[#0A0A0F] text-[#F5F5F7]">
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR: Categories & Tracks List                                */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-60 shrink-0 bg-[#0D0D12] border-b lg:border-b-0 lg:border-r border-[#26262E] p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] font-semibold">
                Categories & Tracks
              </span>
              <span className="text-[10px] font-mono text-[#6B7280] bg-[#111117] px-1.5 py-0.5 rounded border border-[#26262E]">
                {initialChallenges.length} Total
              </span>
            </div>

            <nav className="space-y-1" aria-label="Category Filter Navigation">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = categoryCounts[cat.id] ?? 0;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#1A1A22] text-[#ABDAC8] border border-[#ABDAC8]/30 shadow-sm"
                        : "text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-[#111117] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-[#ABDAC8]" : "text-[#6B7280]"
                        }`}
                      />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-[#ABDAC8]/15 text-[#ABDAC8] font-bold"
                          : "text-[#6B7280] bg-[#111117]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Track Progress / Note */}
          <div className="hidden lg:block pt-6 mt-6 border-t border-[#26262E] space-y-3">
            <div className="p-3 rounded-lg bg-[#111117] border border-[#26262E] space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9CA3AF]">Curriculum Scope</span>
                <span className="text-[#ABDAC8] font-mono font-semibold">Phase 3</span>
              </div>
              <p className="text-[10px] text-[#6B7280] leading-relaxed">
                Live sandbox with automated AI grading against exact rubric criteria.
              </p>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MIDDLE PANEL: Search, Filters, Dense Challenge List Table, Pagination */}
        {/* ========================================================================= */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#0A0A0F]">
          {/* Top Filter Bar */}
          <div className="p-4 lg:p-6 pb-4 border-b border-[#26262E] space-y-4">
            {/* Search Input and Filter Chips */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  type="text"
                  placeholder="Search challenges by title or track..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 bg-[#111117] border-[#26262E] text-xs text-[#F5F5F7] placeholder:text-[#6B7280] h-9 focus-visible:ring-1 focus-visible:ring-[#ABDAC8] focus-visible:border-[#ABDAC8]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#F5F5F7]"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status and Active Count */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                {isFiltered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="h-8 px-2.5 text-xs text-[#ABDAC8] hover:text-[#ABDAC8] hover:bg-[#ABDAC8]/10 gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </Button>
                )}
                <span className="text-xs text-[#6B7280] font-mono">
                  Showing <strong className="text-[#F5F5F7]">{filteredChallenges.length}</strong> challenges
                </span>
              </div>
            </div>

            {/* Filter Chips (Difficulty & Status) */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              {/* Difficulty Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#6B7280] font-mono mr-1">Difficulty:</span>
                {[
                  { id: "all", label: "All", dot: null },
                  { id: "easy", label: "Easy", dot: "bg-[#4ADE80]" },
                  { id: "medium", label: "Medium", dot: "bg-[#FBBF24]" },
                  { id: "hard", label: "Hard", dot: "bg-[#F87171]" },
                ].map((diff) => {
                  const isActive = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => {
                        setSelectedDifficulty(diff.id);
                        setCurrentPage(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        isActive
                          ? "bg-[#1A1A22] text-[#F5F5F7] border border-[#ABDAC8]/50 shadow-sm font-semibold"
                          : "bg-[#111117] text-[#9CA3AF] hover:text-[#F5F5F7] border border-[#26262E]"
                      }`}
                    >
                      {diff.dot && <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />}
                      <span>{diff.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#6B7280] font-mono mr-1">Status:</span>
                {[
                  { id: "all", label: "All" },
                  { id: "unsolved", label: "Todo" },
                  { id: "solved", label: "Solved" },
                  { id: "locked", label: "Locked" },
                ].map((st) => {
                  const isActive = selectedStatus === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedStatus(st.id);
                        setCurrentPage(1);
                      }}
                      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        isActive
                          ? "bg-[#1A1A22] text-[#F5F5F7] border border-[#ABDAC8]/50 shadow-sm font-semibold"
                          : "bg-[#111117] text-[#9CA3AF] hover:text-[#F5F5F7] border border-[#26262E]"
                      }`}
                    >
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Challenges Table */}
          <div className="flex-1 p-4 lg:p-6 overflow-x-auto">
            {paginatedChallenges.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-[#111117] rounded-xl border border-[#26262E] p-6">
                <Terminal className="w-8 h-8 text-[#6B7280] mx-auto" />
                <h3 className="text-sm font-semibold text-[#F5F5F7]">No matching challenges found</h3>
                <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
                  Try adjusting your search query, difficulty filters, or category selection.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-xs border-[#26262E] hover:border-[#ABDAC8] hover:text-[#ABDAC8]"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-[#26262E] bg-[#111117] overflow-hidden shadow-lg">
                <Table>
                  <TableHeader className="bg-[#0D0D12] border-b border-[#26262E]">
                    <TableRow className="border-[#26262E] hover:bg-transparent">
                      <TableHead className="w-12 text-center text-[11px] font-mono uppercase text-[#6B7280]">
                        Status
                      </TableHead>
                      <TableHead className="text-[11px] font-mono uppercase text-[#6B7280]">
                        Title
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-[11px] font-mono uppercase text-[#6B7280]">
                        Category
                      </TableHead>
                      <TableHead className="w-24 text-[11px] font-mono uppercase text-[#6B7280]">
                        Difficulty
                      </TableHead>
                      <TableHead className="hidden sm:table-cell w-36 text-[11px] font-mono uppercase text-[#6B7280]">
                        Attempts Quota
                      </TableHead>
                      <TableHead className="w-28 text-right text-[11px] font-mono uppercase text-[#6B7280] pr-4">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedChallenges.map((challenge, idx) => {
                      const attempt = stats.attemptCounts[challenge.id] || {
                        run_count: 0,
                        submit_count: 0,
                      };
                      const isSolved =
                        stats.solvedChallengeIds.includes(challenge.id) ||
                        stats.solvedChallengeIds.includes(challenge.slug);
                      const isLocked =
                        !isSolved && attempt.run_count >= 5 && attempt.submit_count >= 3;

                      return (
                        <TableRow
                          key={challenge.id || challenge.slug}
                          className={`border-b border-[#26262E]/60 transition-colors hover:bg-[#1A1A22]/80 group ${
                            idx % 2 === 1 ? "bg-[#0D0D12]/40" : ""
                          }`}
                        >
                          {/* 1. Status Indicator Column */}
                          <TableCell className="text-center py-3">
                            {isSolved ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0D0D12] text-xs border border-[#26262E] text-[#4ADE80]">
                                  Solved & Passed
                                </TooltipContent>
                              </Tooltip>
                            ) : isLocked ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center">
                                    <Lock className="w-3.5 h-3.5 text-[#F87171]" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0D0D12] text-xs border border-[#26262E] text-[#F87171]">
                                  Locked (5 Runs & 3 Submits Limit Reached)
                                </TooltipContent>
                              </Tooltip>
                            ) : attempt.run_count > 0 || attempt.submit_count > 0 ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] ring-2 ring-[#FBBF24]/20 animate-pulse" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0D0D12] text-xs border border-[#26262E] text-[#FBBF24]">
                                  In Progress ({attempt.run_count} runs, {attempt.submit_count} submits)
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <div className="flex items-center justify-center">
                                <Circle className="w-2.5 h-2.5 text-[#3C3C3C]" />
                              </div>
                            )}
                          </TableCell>

                          {/* 2. Title & Slug Column */}
                          <TableCell className="py-3">
                            <div className="space-y-0.5">
                              <Link
                                href={`/challenges/${challenge.slug}`}
                                className="text-xs sm:text-sm font-semibold text-[#F5F5F7] group-hover:text-[#ABDAC8] transition-colors inline-flex items-center gap-1.5"
                              >
                                <span>{challenge.title}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ABDAC8]" />
                              </Link>
                              <div className="flex md:hidden items-center gap-2 pt-0.5">
                                <span className="text-[10px] font-mono text-[#9CA3AF]">
                                  {challenge.category || challenge.track}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          {/* 3. Category Column */}
                          <TableCell className="hidden md:table-cell py-3">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-mono uppercase bg-[#0D0D12] text-[#9CA3AF] border-[#26262E]"
                            >
                              {challenge.category || challenge.track}
                            </Badge>
                          </TableCell>

                          {/* 4. Difficulty Column */}
                          <TableCell className="py-3">
                            <span
                              className={`text-xs font-mono font-semibold ${
                                challenge.difficulty === "easy"
                                  ? "text-[#4ADE80]"
                                  : challenge.difficulty === "medium"
                                  ? "text-[#FBBF24]"
                                  : "text-[#F87171]"
                              }`}
                            >
                              {challenge.difficulty.charAt(0).toUpperCase() +
                                challenge.difficulty.slice(1)}
                            </span>
                          </TableCell>

                          {/* 5. Attempts Quota Column */}
                          <TableCell className="hidden sm:table-cell py-3">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-mono text-[#9CA3AF]">
                                <span>Runs: {attempt.run_count}/5</span>
                                <span>Submits: {attempt.submit_count}/3</span>
                              </div>
                              <div className="w-full h-1 bg-[#1A1A22] rounded-full overflow-hidden flex">
                                <div
                                  className="h-full bg-[#ABDAC8]"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      (attempt.run_count / 5) * 50 +
                                        (attempt.submit_count / 3) * 50
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>

                          {/* 6. Action Button Column */}
                          <TableCell className="py-3 text-right pr-4">
                            {isLocked ? (
                              <Badge
                                variant="outline"
                                className="text-[10px] font-mono text-[#F87171] border-[#F87171]/40 bg-[#F87171]/10 px-2 py-0.5 inline-flex items-center gap-1"
                              >
                                <Lock className="w-2.5 h-2.5" />
                                <span>Locked</span>
                              </Badge>
                            ) : (
                              <Link href={`/challenges/${challenge.slug}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2.5 text-xs font-mono border-[#26262E] hover:border-[#ABDAC8] hover:bg-[#ABDAC8]/10 hover:text-[#ABDAC8] transition-all"
                                >
                                  <span>{isSolved ? "Review" : "Solve"}</span>
                                  <Play className="w-2.5 h-2.5 ml-1 fill-current" />
                                </Button>
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 px-2">
                <span className="text-xs text-[#6B7280] font-mono">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-8 px-2.5 text-xs font-mono border-[#26262E] text-[#9CA3AF] hover:text-[#F5F5F7] disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    <span>Prev</span>
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 text-xs font-mono p-0 ${
                        currentPage === page
                          ? "bg-[#1A1A22] text-[#ABDAC8] border-[#ABDAC8]/50 font-bold"
                          : "border-[#26262E] text-[#9CA3AF] hover:text-[#F5F5F7]"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-8 px-2.5 text-xs font-mono border-[#26262E] text-[#9CA3AF] hover:text-[#F5F5F7] disabled:opacity-40"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. RIGHT SIDEBAR: Progress Ring, Streak, Badges & Quota Reminder          */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-72 shrink-0 bg-[#0D0D12] border-t lg:border-t-0 lg:border-l border-[#26262E] p-4 lg:p-5 space-y-5">
          {/* A. Solved Count Progress Ring */}
          <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] font-semibold">
                Progress Overview
              </span>
              <span className="text-[10px] font-mono text-[#ABDAC8] font-semibold">
                {solvePercentage}% Solved
              </span>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 96 96">
                  {/* Background track circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="#1F1F2E"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  {/* Solved Progress Circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="#ABDAC8"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                {/* Center Stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold font-mono text-[#F5F5F7]">
                    {stats.totalSolved}
                  </span>
                  <span className="text-[10px] font-mono text-[#6B7280] uppercase">
                    / {stats.totalChallenges} Solved
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-2.5 pt-1">
              {/* Easy */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#4ADE80]">Easy</span>
                  <span className="text-[#9CA3AF]">
                    {stats.difficultyStats.easy.solved} / {stats.difficultyStats.easy.total}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#1F1F2E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4ADE80] transition-all"
                    style={{
                      width: `${
                        stats.difficultyStats.easy.total > 0
                          ? (stats.difficultyStats.easy.solved / stats.difficultyStats.easy.total) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FBBF24]">Medium</span>
                  <span className="text-[#9CA3AF]">
                    {stats.difficultyStats.medium.solved} / {stats.difficultyStats.medium.total}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#1F1F2E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FBBF24] transition-all"
                    style={{
                      width: `${
                        stats.difficultyStats.medium.total > 0
                          ? (stats.difficultyStats.medium.solved /
                              stats.difficultyStats.medium.total) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F87171]">Hard</span>
                  <span className="text-[#9CA3AF]">
                    {stats.difficultyStats.hard.solved} / {stats.difficultyStats.hard.total}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#1F1F2E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F87171] transition-all"
                    style={{
                      width: `${
                        stats.difficultyStats.hard.total > 0
                          ? (stats.difficultyStats.hard.solved / stats.difficultyStats.hard.total) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* B. Daily Streak Widget */}
          <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-[#F5F5F7]">Daily Streak</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                {stats.streakDays} {stats.streakDays === 1 ? "Day" : "Days"}
              </span>
            </div>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
              Submit solutions regularly to build your verified streak for public recruiter profiles.
            </p>
          </div>

          {/* C. Badges Earned Preview Strip */}
          <div className="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-[#ABDAC8]" />
                <span className="text-xs font-semibold text-[#F5F5F7]">Earned Badges</span>
              </div>
              <span className="text-[10px] font-mono text-[#6B7280]">
                {stats.badges.filter((b) => b.unlocked).length} / {stats.badges.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {stats.badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-2 rounded-lg border text-center transition-colors cursor-default ${
                        badge.unlocked
                          ? badge.tier === "gold"
                            ? "bg-amber-950/20 border-amber-500/40 text-amber-300"
                            : badge.tier === "silver"
                            ? "bg-slate-900 border-slate-400/40 text-slate-200"
                            : "bg-[#181824] border-[#ABDAC8]/40 text-[#ABDAC8]"
                          : "bg-[#0D0D12] border-[#26262E] text-[#6B7280] opacity-50"
                      }`}
                    >
                      <div className="text-[11px] font-semibold truncate">{badge.title}</div>
                      <div className="text-[9px] uppercase font-mono tracking-wider opacity-70">
                        {badge.tier}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#0D0D12] border border-[#26262E] text-xs max-w-xs">
                    <p className="font-semibold text-[#F5F5F7]">{badge.title}</p>
                    <p className="text-[#9CA3AF]">{badge.description}</p>
                    <p className="text-[10px] font-mono mt-1 text-[#ABDAC8]">
                      Status: {badge.unlocked ? "Unlocked" : "Locked"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* D. Free Quota Enforcement Callout */}
          <div className="p-4 rounded-xl bg-[#0D0D12] border border-[#26262E] space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#ABDAC8] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Free Lifetime Quota</span>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              Free accounts include 5 runs & 3 AI evaluations per challenge. Code solutions are securely saved.
            </p>
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
}
