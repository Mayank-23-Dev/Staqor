"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function FullWidthDivider({
  position,
  className,
}: {
  position?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-px bg-gradient-to-r from-transparent via-[#26262E] to-transparent",
        className
      )}
    />
  );
}
