"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, LayoutDashboard, Code, Shield } from "lucide-react";

export function UserNav() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

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

  if (loading) {
    return <div className="h-8 w-20 bg-secondary/50 rounded animate-pulse" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2.5">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  const username = user.user_metadata?.username || user.email?.split("@")[0] || "Developer";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={username} />
            <AvatarFallback className="bg-[#181824] text-[#ABDAC8] font-mono text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#0E0E14] border-border text-foreground" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-foreground">{username}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/60" />
        <DropdownMenuItem asChild>
          <Link href="/problems" className="cursor-pointer flex items-center gap-2 text-xs">
            <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
            <span>Problems Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/problems" className="cursor-pointer flex items-center gap-2 text-xs">
            <Code className="w-3.5 h-3.5 text-primary" />
            <span>Challenges Catalog</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/profile/${username}`} className="cursor-pointer flex items-center gap-2 text-xs">
            <UserIcon className="w-3.5 h-3.5 text-primary" />
            <span>Public Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/60" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer flex items-center gap-2 text-xs text-rose-400 focus:text-rose-400 focus:bg-rose-950/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
