"use client";

import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Terminal, Flame, Coins, Bell, Menu, PanelRight, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";

interface NavbarProps {
  onSelectList?: (list: string) => void;
  onSelectTag?: (tag: string) => void;
  onSelectCompany?: (company: string) => void;
}

export function Navbar({ onSelectList, onSelectTag, onSelectCompany }: NavbarProps) {
  const [streak, setStreak] = React.useState(0);
  const [coins, setCoins] = React.useState(0);
  const supabase = createClient();

  React.useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("user_stats").select("*").eq("user_id", user.id).single();
        if (data) {
          setStreak(data.current_streak);
          setCoins(data.coins);
        }
      }
    }
    fetchStats();
  }, []);

  const navItems = [
    { label: "Explore", href: "/explore", active: false },
    { label: "Problems", href: "/problem", active: true },
    { label: "Contest", href: "/contest", active: false },
    { label: "Discuss", href: "/discuss", active: false },
    { label: "Interview", href: "/interview", active: false },
    { label: "Store", href: "/store", active: false },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-[#0A0A0F]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger + Brand Logo + Nav Links */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Mobile Left Sidebar Drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] bg-[#0D0D12] border-r border-border">
                <SheetHeader className="p-4 border-b border-border text-left">
                  <SheetTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Terminal className="w-4 h-4 text-primary" /> Staqor Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="h-[calc(100vh-65px)]">
                  <Sidebar
                    onSelectList={onSelectList}
                    onSelectTag={onSelectTag}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Staqor Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-base tracking-tight text-foreground">Staqor</span>
              <span className="text-[10px] font-mono text-primary font-semibold">2.0</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  item.active
                    ? "text-foreground font-semibold bg-secondary/80 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Streak + Coins + Pro CTA + Profile */}
        <div className="flex items-center gap-2.5">
          {/* Flame Streak Indicator */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/80 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold cursor-pointer hover:border-orange-500/60 transition-colors"
            title={`${streak} Days Solved Streak!`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>{streak}</span>
          </div>

          {/* Staqor Coins */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold cursor-pointer hover:border-amber-500/60 transition-colors"
            title={`Staqor Coins: ${coins}`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{coins}</span>
          </div>

          {/* Pro Premium Badge */}
          <Link href="/pricing" className="hidden sm:inline-flex">
            <Button
              size="sm"
              className="h-8 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3" />
              <span>Premium</span>
            </Button>
          </Link>

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </Button>

          {/* Mobile Right Sidebar Drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  title="Daily Streak & Companies"
                >
                  <PanelRight className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4 w-[320px] bg-[#0D0D12] border-l border-border overflow-y-auto">
                <SheetHeader className="pb-3 border-b border-border text-left">
                  <SheetTitle className="text-sm font-semibold text-foreground">
                    Activity & Analytics
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <RightSidebar onSelectCompany={onSelectCompany} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Avatar with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 transition-all">
                <Avatar className="w-8 h-8 border border-border">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces" />
                  <AvatarFallback className="bg-secondary text-primary text-xs font-mono">
                    SQ
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-60 p-3 bg-card border-border shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <Avatar className="w-9 h-9 border border-border">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces" />
                    <AvatarFallback className="bg-secondary text-primary text-xs">SQ</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-foreground">alex_dev</div>
                    <div className="text-[10px] text-muted-foreground font-mono">Rank: #1,420</div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <Link
                    href="/dashboard"
                    className="block px-2.5 py-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    User Dashboard
                  </Link>
                  <Link
                    href="/profile/alex_dev"
                    className="block px-2.5 py-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    Public Portfolio
                  </Link>
                  <Link
                    href="/pricing"
                    className="block px-2.5 py-1.5 rounded text-primary font-medium hover:bg-primary/10 transition-colors"
                  >
                    Upgrade to Pro ($15/mo)
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
