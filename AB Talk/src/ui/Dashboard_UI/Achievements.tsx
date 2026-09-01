'use client';

import React from 'react';
import { Trophy } from 'lucide-react';

export function Achievements() {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
      <Trophy className="w-4 h-4" />
      <span>Streak Master Badge Unlocked</span>
    </div>
  );
}
