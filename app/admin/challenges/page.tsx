"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Terminal, Edit3, ArrowLeft } from "lucide-react";

export default function AdminChallengesPage() {
  return (
    <div className="mode-app min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <header className="border-b border-[#26262E] bg-[#111117] sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#ABDAC8]" />
              <span className="font-bold text-base text-white">Staqor Admin</span>
            </Link>
            <span className="text-zinc-500 text-xs font-mono">/ challenge-studio</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/sandbox-tester">
              <Button size="sm" variant="outline" className="text-xs border-[#26262E] hover:border-[#ABDAC8]">
                Sandbox Tester
              </Button>
            </Link>
            <Button size="sm" className="bg-[#ABDAC8] text-[#0A0A0F] font-bold text-xs gap-1 hover:bg-[#ABDAC8]/90">
              <Plus className="w-3.5 h-3.5" />
              New Challenge
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1 text-white">Challenge Studio CRUD</h1>
          <p className="text-sm text-zinc-400">
            Author and manage challenge specifications, starter code, model solutions, and rubrics.
          </p>
        </div>

        <Card className="bg-[#111117] border-[#26262E]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-white">Interactive Pricing Table with Toggle</CardTitle>
                <CardDescription className="text-xs text-zinc-400">slug: responsive-pricing-table • Track: HTML/CSS</CardDescription>
              </div>
              <Badge variant="outline" className="text-[#4ADE80] border-[#4ADE80]/30 text-xs">ACTIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-2">
            <span className="text-xs text-zinc-400 font-mono">Rubric: 3 Criteria (35% / 35% / 30%)</span>
            <Button size="sm" variant="outline" className="h-8 text-xs border-[#26262E] hover:border-[#ABDAC8] gap-1.5">
              <Edit3 className="w-3.5 h-3.5" />
              Edit Challenge
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
