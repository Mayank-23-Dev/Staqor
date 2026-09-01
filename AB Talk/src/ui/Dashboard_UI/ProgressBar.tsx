'use client';

import React from 'react';

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between text-xs text-zinc-400 font-mono">
        <span>Progress</span>
        <span>{current}/{total} ({percentage}%)</span>
      </div>
      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#e8602e] to-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
