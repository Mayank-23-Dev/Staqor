"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/navigation/UserNav";
import { MobileNav } from "@/components/mobile-nav";

export const navLinks = [
  {
    label: "8 Tracks",
    href: "#tracks",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Why Staqor",
    href: "#why-staqor",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-6xl border-transparent border-b transition-all duration-300",
        {
          "border-[#26262E] bg-[#0A0A0F]/90 backdrop-blur-xl supports-backdrop-filter:bg-[#0A0A0F]/80 md:top-3 md:max-w-5xl md:rounded-2xl md:border md:shadow-2xl md:shadow-black/60":
            scrolled,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-16 w-full items-center justify-between px-4 transition-all duration-300",
          {
            "h-14 px-4": scrolled,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              asChild
              key={link.label}
              size="sm"
              variant="ghost"
              className="text-zinc-300 hover:text-white hover:bg-zinc-800/40 text-xs font-semibold px-3 py-1.5 transition-colors"
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <UserNav />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
