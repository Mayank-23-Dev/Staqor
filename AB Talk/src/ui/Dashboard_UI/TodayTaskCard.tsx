'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function TodayTaskCard() {
  return (
    <Card className="bg-gradient-to-br from-[#e8602e]/15 via-[#1a1a1a] to-[#0f0f0f] border-[#e8602e]/40 p-6">
      <CardContent className="p-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#e8602e] uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Today&apos;s Prompt • Day 12</span>
          </div>
          <h3 className="font-display text-xl font-extrabold text-white">
            Build & Deploy Next.js App Router API Route
          </h3>
          <p className="text-xs text-zinc-300 mt-1">
            Create an API endpoint handling POST requests and validate JSON payloads.
          </p>
        </div>

        <Link href="/day/1">
          <Button size="sm" className="bg-gradient-to-b from-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-bold rounded-field px-5 py-2.5 text-sm shadow-md shadow-[#e8602e]/25">
            Continue Task
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
