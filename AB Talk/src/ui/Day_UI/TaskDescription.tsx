'use client';

import React from 'react';
import { Terminal, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function TaskDescription() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
      <CardContent className="p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#e8602e]" />
          <span>Daily Requirements</span>
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Create a new App Router route at <code className="text-[#e8602e] font-mono">app/api/submit/route.ts</code></span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Enforce request body validation using Zod or TypeScript schemas</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Commit your changes to a public GitHub repository and push your branch</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
