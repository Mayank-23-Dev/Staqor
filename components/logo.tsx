"use client";

import type React from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2.5 font-display font-bold text-base tracking-tight text-white group", className)} {...props}>
    <div className="w-7 h-7 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center text-[#ABDAC8] shadow-[0_0_12px_rgba(171,218,200,0.15)] group-hover:scale-105 transition-transform">
      <Terminal className="w-4 h-4" />
    </div>
    <span className="font-extrabold text-white text-base">Staqor</span>
  </div>
);

export const LogoIcon = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <Terminal className={cn("w-5 h-5 text-[#ABDAC8]", className)} />
);
