"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden border-[#26262E] bg-[#111117] hover:bg-[#16161F] text-zinc-300"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
      </Button>
      {open && (
        <Portal className="top-16" id="mobile-menu">
          <PortalBackdrop onClick={() => setOpen(false)} />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "w-full max-w-md mx-auto p-4 bg-[#0A0A0F] border border-[#26262E] rounded-2xl shadow-2xl relative z-50 mt-2"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-1.5">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/60 text-sm font-semibold"
                  key={link.label}
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-[#26262E]">
              <Link href="/challenges" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-b from-[#ABDAC8] to-[#7BC4A8] text-[#0A0A0F] font-bold rounded-xl py-2 text-xs">
                  Browse Challenges Catalog
                </Button>
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
