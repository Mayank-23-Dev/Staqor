'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export function DayHeader({ dayId, title }: { dayId: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-xs font-bold text-[#e8602e] uppercase tracking-wider mb-2">
        <Flame className="w-4 h-4 fill-[#e8602e]" />
        <span>60-Day Coding Challenge • Day {dayId}</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
        Create an API endpoint handling POST requests, validate JSON payloads, and deploy your code to GitHub.
      </p>
    </div>
  );
}
