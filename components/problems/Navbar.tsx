"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Flame,
  Coins,
  Bell,
  Menu,
  PanelRight,
  Sparkles,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Shield,
  Code,
} from "lucide-react";
import { LogoIcon } from "@/components/logo";
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
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data } = await supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (data) {
            setStreak(data.current_streak || 0);
            setCoins(data.coins || 0);
          }
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Explore", href: "/problems", active: false },
    { label: "Problems", href: "/problems", active: true },
    { label: "Contest", href: "/problems", active: false },
    { label: "Discuss", href: "/problems", active: false },
    { label: "Store", href: "/pricing", active: false },
  ];

  // User Profile Properties
  const email = user?.email || "";
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "";
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "";
  const username =
    user?.user_metadata?.username ||
    user?.user_metadata?.user_name ||
    (email ? email.split("@")[0] : "developer");
  const displayName = fullName || username || "Developer";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SQ";

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
                    <LogoIcon variant="aqua" className="w-4 h-4" /> Staqor Navigation
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
          <Link href="/" className="flex items-center gap-2 group select-none">
            <LogoIcon variant="aqua" className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-white/90 transition-colors">
              Staqor
            </span>
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

          {/* User Profile Avatar with Popover or Sign In / Sign Up */}
          {loadingUser ? (
            <div className="w-8 h-8 rounded-full bg-secondary/60 animate-pulse" />
          ) : user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 transition-all outline-none"
                  aria-label="User account menu"
                >
                  <Avatar className="w-8 h-8 border border-border">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={displayName} />
                    ) : null}
                    <AvatarFallback className="bg-[#181824] text-[#A7DDC9] text-xs font-mono font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-3 bg-[#0E0E14] border-border text-foreground shadow-2xl">
                <div className="space-y-3">
                  {/* User Info Header with Gmail Sync */}
                  <div className="flex items-center gap-3 pb-2.5 border-b border-border/80">
                    <Avatar className="w-10 h-10 border border-border shrink-0">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={displayName} />
                      ) : null}
                      <AvatarFallback className="bg-[#181824] text-[#A7DDC9] text-sm font-bold font-mono">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span className="truncate">{displayName}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate" title={email}>
                        {email}
                      </div>
                      <div className="text-[10px] text-primary font-mono font-medium mt-0.5">
                        Verified Developer
                      </div>
                    </div>
                  </div>

                  {/* Popover Navigation Links */}
                  <div className="space-y-1 text-xs">
                    <Link
                      href="/problems"
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-secondary/70 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                      <span>Problems Workspace</span>
                    </Link>
                    <Link
                      href={`/profile/${encodeURIComponent(username)}`}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-secondary/70 transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-primary" />
                      <span>Public Portfolio</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-secondary/70 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-primary font-medium hover:bg-primary/10 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Upgrade to Pro</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="pt-2 border-t border-border/80">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-8 px-3">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold h-8 px-3">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
