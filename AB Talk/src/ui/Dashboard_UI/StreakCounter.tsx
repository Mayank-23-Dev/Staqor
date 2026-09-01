'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-field border border-[#2a2a2a]">
      <Flame className="w-5 h-5 fill-[#e8602e] text-[#e8602e]" />
      <div>
        <div className="text-[10px] text-zinc-400 font-sans uppercase tracking-wider">Active Streak</div>
        <div className="text-sm font-extrabold text-white font-mono">{streak} Days</div>
      </div>
    </div>
  );
}
