"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CheckCircle2,
  Circle,
  MinusCircle,
  Star,
  Bookmark,
  FileCode2,
  Video,
  Lock,
  ArrowUpDown,
  SlidersHorizontal,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Terminal,
  Database,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
} from "lucide-react";
import { Category, Difficulty, Problem, ProblemStatus, MOCK_PROBLEMS } from "./types";
import Link from "next/link";
import { toast } from "sonner";

interface ProblemsTableProps {
  selectedTopic?: string;
  selectedCompany?: string;
  selectedList?: string;
}

export function ProblemsTable({
  selectedTopic = "",
  selectedCompany = "",
  selectedList = "",
}: ProblemsTableProps) {
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"id" | "title" | "acceptance" | "difficulty">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Toggle favorite
  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
    const problem = problems.find((p) => p.id === id);
    if (problem) {
      toast.success(
        problem.favorite
          ? `Removed "${problem.title}" from favorites`
          : `Added "${problem.title}" to favorites`
      );
    }
  };

  // Pick random problem
  const handlePickRandom = () => {
    const pool = filteredProblems.length > 0 ? filteredProblems : problems;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomProblem = pool[randomIndex];
    if (randomProblem) {
      toast(`🎲 Picked #${randomProblem.id}: ${randomProblem.title}`, {
        description: `Difficulty: ${randomProblem.difficulty} | Acceptance: ${randomProblem.acceptance}`,
        action: {
          label: "Solve",
          onClick: () => {
            window.location.href = `/challenges/${randomProblem.slug}`;
          },
        },
      });
    }
  };

  // Filter and sort logic
  const filteredProblems = useMemo(() => {
    return problems.filter((item) => {
      // Category filter
      if (selectedCategory !== "All Topics") {
        if (item.category !== selectedCategory) return false;
      }
      // Topic tag filter
      if (selectedTopic) {
        if (!item.tags.some((t) => t.toLowerCase() === selectedTopic.toLowerCase())) {
          return false;
        }
      }
      // Company filter
      if (selectedCompany) {
        if (!item.companies.some((c) => c.toLowerCase() === selectedCompany.toLowerCase())) {
          return false;
        }
      }
      // List filter
      if (selectedList === "Favorite") {
        if (!item.favorite) return false;
      } else if (selectedList === "To Do") {
        if (item.status === "solved") return false;
      } else if (selectedList === "Revised") {
        if (item.status !== "solved") return false;
      }

      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }
      // Difficulty filter
      if (difficultyFilter !== "all" && item.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesId = item.id.toString().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCompany = item.companies.some((c) => c.toLowerCase().includes(query));
        if (!matchesTitle && !matchesId && !matchesTags && !matchesCompany) return false;
      }
      return true;
    });
  }, [
    problems,
    selectedCategory,
    selectedTopic,
    selectedCompany,
    selectedList,
    statusFilter,
    difficultyFilter,
    searchQuery,
  ]);

  // Sorted list
  const sortedProblems = useMemo(() => {
    return [...filteredProblems].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "id") {
        comparison = a.id - b.id;
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "acceptance") {
        comparison = parseFloat(a.acceptance) - parseFloat(b.acceptance);
      } else if (sortBy === "difficulty") {
        const diffWeight: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
        comparison = diffWeight[a.difficulty] - diffWeight[b.difficulty];
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredProblems, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedProblems.length / pageSize) || 1;
  const paginatedProblems = sortedProblems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Solved Stats calculation
  const totalCount = problems.length;
  const solvedCount = problems.filter((p) => p.status === "solved").length;
  const easySolved = problems.filter((p) => p.status === "solved" && p.difficulty === "Easy").length;
  const medSolved = problems.filter((p) => p.status === "solved" && p.difficulty === "Medium").length;
  const hardSolved = problems.filter((p) => p.status === "solved" && p.difficulty === "Hard").length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  const categories = [
    { name: "All Topics", icon: Layers },
    { name: "Algorithms", icon: Code2 },
    { name: "Database", icon: Database },
    { name: "Shell", icon: Terminal },
    { name: "Concurrency", icon: Cpu },
    { name: "JavaScript", icon: Sparkles },
  ];

  return (
    <div className="space-y-4">
      {/* 4. Tabs Row */}
      <div className="border-b border-border/80 pb-2">
        <Tabs
          value={selectedCategory}
          onValueChange={(val) => {
            setSelectedCategory(val);
            setCurrentPage(1);
          }}
          className="w-full"
        >
          <TabsList className="bg-card/70 border border-border/70 p-1 h-auto flex flex-wrap gap-1 justify-start">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.name}
                  value={cat.name}
                  className="text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* 5. Search & Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card/40 p-3 rounded-lg border border-border/60">
        {/* Left: Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions, tags, or companies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 text-xs bg-background/80 border-border"
          />
        </div>

        {/* Right: Controls & Solved Counter */}
        <div className="flex items-center flex-wrap gap-2 justify-between sm:justify-end">
          {/* Sort Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-border bg-card hover:bg-secondary gap-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Sort</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2 bg-card border-border shadow-lg">
              <div className="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase">
                Sort By
              </div>
              <div className="space-y-1">
                {[
                  { key: "id", label: "Problem #" },
                  { key: "title", label: "Title" },
                  { key: "acceptance", label: "Acceptance Rate" },
                  { key: "difficulty", label: "Difficulty" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      if (sortBy === option.key) {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy(option.key as any);
                        setSortOrder("asc");
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      sortBy === option.key
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.key && (
                      <span className="text-[10px] uppercase font-mono">{sortOrder}</span>
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 text-xs border-border bg-card hover:bg-secondary gap-1.5 ${
                  difficultyFilter !== "all" || statusFilter !== "all"
                    ? "border-primary text-primary"
                    : ""
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Filter</span>
                {(difficultyFilter !== "all" || statusFilter !== "all") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3 bg-card border-border shadow-lg space-y-3">
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1 uppercase">
                  Difficulty
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {["all", "easy", "medium", "hard"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`text-[10px] py-1 rounded border capitalize transition-colors ${
                        difficultyFilter === d
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1 uppercase">
                  Status
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { key: "all", label: "All" },
                    { key: "solved", label: "Solved" },
                    { key: "attempted", label: "Attempted" },
                    { key: "unsolved", label: "Todo" },
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setStatusFilter(s.key)}
                      className={`text-[10px] py-1 rounded border capitalize transition-colors ${
                        statusFilter === s.key
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {(difficultyFilter !== "all" || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDifficultyFilter("all");
                    setStatusFilter("all");
                  }}
                  className="w-full h-6 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  Reset all filters
                </Button>
              )}
            </PopoverContent>
          </Popover>

          {/* Pick Random Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePickRandom}
            className="h-8 px-2.5 text-xs border-border bg-card hover:bg-secondary text-muted-foreground hover:text-primary gap-1"
            title="Pick a random question"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pick One</span>
          </Button>

          {/* Solved Progress Counter with SVG Ring */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-border/80">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-secondary"
                  fill="transparent"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={81.68}
                  strokeDashoffset={81.68 - (81.68 * progressPercent) / 100}
                  className="text-primary transition-all duration-700"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[9px] font-mono font-bold text-foreground">
                {progressPercent}%
              </span>
            </div>

            <div className="text-left leading-tight hidden sm:block">
              <div className="text-xs font-semibold text-foreground font-mono">
                {solvedCount}/{totalCount}
              </div>
              <div className="text-[10px] text-muted-foreground">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(selectedTopic || selectedCompany || selectedList) && (
        <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground py-1">
          <span>Active filter:</span>
          {selectedTopic && (
            <Badge variant="secondary" className="text-[11px] gap-1 bg-primary/10 text-primary border-primary/30">
              Topic: {selectedTopic}
            </Badge>
          )}
          {selectedCompany && (
            <Badge variant="secondary" className="text-[11px] gap-1 bg-primary/10 text-primary border-primary/30">
              Company: {selectedCompany}
            </Badge>
          )}
          {selectedList && (
            <Badge variant="secondary" className="text-[11px] gap-1 bg-primary/10 text-primary border-primary/30">
              List: {selectedList}
            </Badge>
          )}
          <span className="text-[11px] text-muted-foreground/70">
            ({filteredProblems.length} results found)
          </span>
        </div>
      )}

      {/* 6. Main problems Table (Desktop view: hidden on mobile/tablet) */}
      <div className="hidden md:block rounded-lg border border-border/80 bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/40 border-b border-border">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center text-xs">Status</TableHead>
              <TableHead className="text-xs font-semibold">Title</TableHead>
              <TableHead className="w-24 text-right text-xs font-semibold">Acceptance</TableHead>
              <TableHead className="w-28 text-center text-xs font-semibold">Difficulty</TableHead>
              <TableHead className="w-20 text-center text-xs font-semibold">Solution</TableHead>
              <TableHead className="w-12 text-center text-xs font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProblems.map((problem) => {
              const isEasy = problem.difficulty === "Easy";
              const isMedium = problem.difficulty === "Medium";
              const isHard = problem.difficulty === "Hard";

              return (
                <TableRow
                  key={problem.id}
                  className="group border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  {/* Status column */}
                  <TableCell className="text-center py-3">
                    {problem.status === "solved" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : problem.status === "attempted" ? (
                      <MinusCircle className="w-4 h-4 text-amber-400 mx-auto" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-muted-foreground/40 mx-auto group-hover:text-muted-foreground/80" />
                    )}
                  </TableCell>

                  {/* Title column */}
                  <TableCell className="py-3 font-medium">
                    <Link
                      href={`/challenges/${problem.slug}`}
                      className="flex items-center gap-2 group-hover:text-primary transition-colors"
                    >
                      <span className="text-xs text-muted-foreground font-mono w-6 text-right">
                        {problem.id}.
                      </span>
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {problem.title}
                      </span>
                      {problem.isFeatured && (
                        <Bookmark className="w-3 h-3 text-primary/80 fill-primary/20 shrink-0" />
                      )}
                      {problem.isPremium && (
                        <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                      )}
                    </Link>
                  </TableCell>

                  {/* Acceptance Rate */}
                  <TableCell className="text-right py-3 text-xs font-mono text-muted-foreground">
                    {problem.acceptance}
                  </TableCell>

                  {/* Difficulty Badge */}
                  <TableCell className="text-center py-3">
                    <Badge
                      variant="outline"
                      className={`text-[11px] px-2 py-0.5 font-medium border ${
                        isEasy
                          ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                          : isMedium
                          ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                          : "text-rose-400 border-rose-500/30 bg-rose-500/10"
                      }`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>

                  {/* Solution / Video Icons */}
                  <TableCell className="text-center py-3">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                      {problem.hasSolution && (
                        <FileCode2 className="w-3.5 h-3.5 hover:text-primary cursor-pointer transition-colors" />
                      )}
                      {problem.hasVideo && (
                        <Video className="w-3.5 h-3.5 hover:text-sky-400 cursor-pointer transition-colors" />
                      )}
                    </div>
                  </TableCell>

                  {/* Favorite Toggle Star */}
                  <TableCell className="text-center py-3">
                    <button
                      onClick={(e) => handleToggleFavorite(problem.id, e)}
                      className="text-muted-foreground/50 hover:text-amber-400 transition-colors p-1"
                      title={problem.favorite ? "Favorited" : "Add to favorites"}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          problem.favorite ? "fill-amber-400 text-amber-400" : ""
                        }`}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}

            {paginatedProblems.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="text-sm font-semibold text-foreground">No problems found</p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your search query, difficulty filters, or active topic tags.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card-List View (< md breakpoint) */}
      <div className="block md:hidden space-y-2.5">
        {paginatedProblems.map((problem) => (
          <Link key={problem.id} href={`/challenges/${problem.slug}`} className="block">
            <Card className="bg-card border-border/80 hover:border-primary/50 transition-colors">
              <CardContent className="p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {problem.status === "solved" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : problem.status === "attempted" ? (
                      <MinusCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-foreground line-clamp-1">
                      {problem.id}. {problem.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleToggleFavorite(problem.id, e)}
                    className="text-muted-foreground/60 hover:text-amber-400 p-0.5"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        problem.favorite ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-1.5 py-0 ${
                        problem.difficulty === "Easy"
                          ? "text-emerald-400 border-emerald-500/30"
                          : problem.difficulty === "Medium"
                          ? "text-amber-400 border-amber-500/30"
                          : "text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {problem.difficulty}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {problem.acceptance}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                    <span>Solve</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {paginatedProblems.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-xs bg-card rounded-lg border border-border">
            No problems match your criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <div className="text-xs text-muted-foreground font-mono">
          Showing{" "}
          <span className="text-foreground font-semibold">
            {filteredProblems.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>
          -
          <span className="text-foreground font-semibold">
            {Math.min(currentPage * pageSize, filteredProblems.length)}
          </span>{" "}
          of <span className="text-foreground font-semibold">{filteredProblems.length}</span> questions
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-8 px-2.5 text-xs border-border bg-card hover:bg-secondary disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Prev
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={currentPage === pageNumber ? "default" : "ghost"}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`h-8 w-8 text-xs p-0 font-mono ${
                      currentPage === pageNumber
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {pageNumber}
                  </Button>
                );
              } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return (
                  <span key={pageNumber} className="text-xs text-muted-foreground px-1">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-8 px-2.5 text-xs border-border bg-card hover:bg-secondary disabled:opacity-40"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
