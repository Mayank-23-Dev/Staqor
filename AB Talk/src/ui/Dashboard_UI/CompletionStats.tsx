'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function CompletionStats({ verified, total }: { verified: number; total: number }) {
  return (
    <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-field border border-[#2a2a2a]">
      <ShieldCheck className="w-5 h-5 text-emerald-400" />
      <div>
        <div className="text-[10px] text-zinc-400 font-sans uppercase tracking-wider">Verified Commits</div>
        <div className="text-xs font-bold text-white font-mono">{verified} of {total} Prompts</div>
      </div>
    </div>
  );
}
