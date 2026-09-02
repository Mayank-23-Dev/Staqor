"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Flame,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  CheckCircle2,
  Lock,
  Gift,
  Building2,
  Calendar as CalendarIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import { Company, MOCK_COMPANIES } from "./types";
import { toast } from "sonner";

interface RightSidebarProps {
  selectedCompany?: string;
  onSelectCompany?: (companyName: string) => void;
}

export function RightSidebar({ selectedCompany, onSelectCompany }: RightSidebarProps) {
  const now = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [companyPage, setCompanyPage] = useState(0);

  const [activeSolveDays, setActiveSolveDays] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [solvedMonth, setSolvedMonth] = useState(0);

  const supabase = createClient();

  const currentMonthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const currentDay = now.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const startOffset = firstDayOfMonth; // 0 for Sunday, 1 for Monday, etc.
  const totalSlots = Math.ceil((daysInMonth + startOffset) / 7) * 7;

  useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: stats } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (stats) {
        setStreak(stats.current_streak || 0);
      }

      // get this month's submissions
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const { data: subs } = await supabase
        .from("submissions")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", `${year}-${month}-01T00:00:00Z`);

      if (subs) {
        const days = new Set<number>();
        subs.forEach(s => {
          const date = new Date(s.created_at);
          days.add(date.getDate());
        });
        setActiveSolveDays(Array.from(days));
        setSolvedMonth(days.size);
      }
    }
    fetchStats();
  }, [currentDate]);

  // Days of week header
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // Weekly Contest / Challenge Days
  const weeklyDays = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (4 - i));
    const day = d.getDate();
    const isCompleted = activeSolveDays.includes(day);
    const isToday = i === 4;
    return {
      label: `W${i + 1}`,
      day: isToday ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" }),
      status: isCompleted ? "completed" : isToday ? "current" : "unsolved",
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    };
  });

  // Filtered companies
  const filteredCompanies = MOCK_COMPANIES.filter((c) =>
    c.name.toLowerCase().includes(companySearch.toLowerCase())
  );
  const companiesPerPage = 6;
  const totalCompanyPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const displayedCompanies = filteredCompanies.slice(
    companyPage * companiesPerPage,
    (companyPage + 1) * companiesPerPage
  );

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast.success("Checked in! +10 Staqor Coins added to your daily streak.");
  };

  return (
    <div className="w-full lg:w-[300px] flex-shrink-0 space-y-4">
      {/* 1. Streak Calendar Card */}
      <Card className="bg-card border-border/80 relative overflow-hidden shadow-sm">
        {/* Hexagon Day Counter Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-orange-400">
          <Flame className="w-3.5 h-3.5 fill-orange-400 animate-pulse" />
          <span className="text-xs font-bold font-mono tracking-tight">{streak} Days</span>
        </div>

        <CardHeader className="p-4 pb-2 space-y-0">
          <div className="flex items-center justify-between pr-24">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <CardTitle className="text-xs font-semibold tracking-wide text-foreground">
                {currentMonthName}
              </CardTitle>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-muted-foreground hover:text-foreground"
                onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-muted-foreground hover:text-foreground"
                onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {weekDays.map((d, i) => (
              <span key={i} className="text-[10px] font-semibold text-muted-foreground/70">
                {d}
              </span>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: totalSlots }).map((_, index) => {
              const dayNumber = index - startOffset + 1;
              const isCurrentMonthDay = dayNumber > 0 && dayNumber <= daysInMonth;
              const isToday =
                isCurrentMonthDay &&
                dayNumber === currentDay &&
                currentDate.getMonth() === now.getMonth() &&
                currentDate.getFullYear() === now.getFullYear();
              const hasSolved = activeSolveDays.includes(dayNumber);

              if (!isCurrentMonthDay) {
                return <div key={index} className="h-7 w-7" />;
              }

              return (
                <div
                  key={index}
                  className="h-7 w-7 flex flex-col items-center justify-center relative group cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono transition-all ${
                      isToday
                        ? "bg-primary text-primary-foreground font-bold ring-2 ring-primary/40 shadow-sm"
                        : hasSolved
                        ? "text-foreground font-medium hover:bg-secondary"
                        : "text-muted-foreground/70 hover:bg-secondary/60"
                    }`}
                  >
                    {dayNumber}
                  </div>

                  {/* Active dot indicator */}
                  {hasSolved && !isToday && (
                    <span className="w-1 h-1 rounded-full bg-primary absolute bottom-0" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active Solves
            </span>
            <span className="font-mono text-foreground font-medium">{solvedMonth} / {daysInMonth} Solved</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Weekly Premium Promo Card */}
      <Card className="bg-card border-border/80 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-foreground">Weekly Quest Challenge</span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] bg-primary/15 text-primary border-primary/40 font-mono"
            >
              +50 Coins
            </Badge>
          </div>

          {/* Day of Week Button Group */}
          <div className="grid grid-cols-5 gap-1.5">
            {weeklyDays.map((item) => {
              const isCurrent = item.status === "current";
              const isCompleted = item.status === "completed";
              return (
                <button
                  key={item.label}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-md border text-center transition-all ${
                    isCurrent
                      ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold ring-2 ring-primary/30"
                      : isCompleted
                      ? "bg-secondary/80 border-border text-foreground hover:border-primary/40"
                      : "bg-background/40 border-border text-muted-foreground"
                  }`}
                >
                  <span className="text-[10px] font-mono">{item.label}</span>
                  <span className="text-[9px] mt-0.5 opacity-80">
                    {isCompleted ? <CheckCircle2 className="w-2.5 h-2.5 inline text-primary" /> : item.day}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            Solve today&apos;s daily problem to complete the 5-day challenge streak.
          </p>
        </CardContent>
      </Card>

      {/* 3. Friends Check-In Card */}
      <Card className="bg-card border-border/80 shadow-sm">
        <CardContent className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2 overflow-hidden">
              <Avatar className="w-6 h-6 border-2 border-card">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                <AvatarFallback className="text-[9px]">AL</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 border-2 border-card">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" />
                <AvatarFallback className="text-[9px]">MK</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 border-2 border-card">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" />
                <AvatarFallback className="text-[9px]">SN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Users className="w-3 h-3 text-primary" /> Friends Check-in
              </div>
              <p className="text-[10px] text-muted-foreground">3 friends solved today</p>
            </div>
          </div>

          <Button
            size="sm"
            variant={isCheckedIn ? "secondary" : "outline"}
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`h-7 px-2.5 text-xs shrink-0 rounded font-medium border-border transition-all ${
              isCheckedIn
                ? "bg-secondary text-primary border-primary/30"
                : "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {isCheckedIn ? "Checked In" : "Check in"}
          </Button>
        </CardContent>
      </Card>

      {/* 4. Trending Companies Card */}
      <Card className="bg-card border-border/80 shadow-sm">
        <CardHeader className="p-3.5 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              <CardTitle className="text-xs font-semibold text-foreground">
                Trending Companies
              </CardTitle>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                disabled={companyPage === 0}
                className="h-5 w-5 text-muted-foreground hover:text-foreground disabled:opacity-40"
                onClick={() => setCompanyPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <span className="text-[10px] text-muted-foreground font-mono px-1">
                {companyPage + 1}/{totalCompanyPages || 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                disabled={companyPage >= totalCompanyPages - 1}
                className="h-5 w-5 text-muted-foreground hover:text-foreground disabled:opacity-40"
                onClick={() => setCompanyPage((p) => Math.min(totalCompanyPages - 1, p + 1))}
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Company Search Input */}
          <div className="relative mt-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={companySearch}
              onChange={(e) => {
                setCompanySearch(e.target.value);
                setCompanyPage(0);
              }}
              className="h-7 pl-8 pr-3 text-xs bg-background border-border"
            />
          </div>
        </CardHeader>

        <CardContent className="p-3.5 pt-1 space-y-1">
          {displayedCompanies.map((company) => {
            const isSelected = selectedCompany === company.name;
            return (
              <button
                key={company.name}
                onClick={() => onSelectCompany && onSelectCompany(isSelected ? "" : company.name)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors group ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                }`}
              >
                <span className="truncate">{company.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {company.count}
                </span>
              </button>
            );
          })}

          {displayedCompanies.length === 0 && (
            <p className="text-xs text-muted-foreground py-3 text-center">
              No matching companies found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
