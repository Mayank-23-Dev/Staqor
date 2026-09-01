"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, Play, ArrowLeft } from "lucide-react";

export default function AdminSandboxTesterPage() {
  return (
    <div className="mode-app min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <header className="border-b border-[#26262E] bg-[#111117] sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/challenges" className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-bold text-base text-white">Sandbox Tester</span>
            <span className="text-zinc-500 text-xs font-mono">/ groq-dry-run</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1 text-white">AI Rubric Sandbox Tester</h1>
          <p className="text-sm text-zinc-400">
            Test challenge rubrics against model solutions and adversarial test cases before publishing.
          </p>
        </div>

        <Card className="bg-[#111117] border-[#26262E]">
          <CardHeader>
            <CardTitle className="text-base text-white">Dry-Run Test Suite</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Verifies that model_solution scores 100% and empty/adversarial code scores 0%.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-[#0B0B10] border border-[#26262E] font-mono text-xs text-zinc-400">
              Ready to execute dry-run simulation against Groq LPU API.
            </div>
            <Button size="sm" className="bg-[#ABDAC8] text-[#0A0A0F] hover:bg-[#ABDAC8]/90 font-bold gap-1.5">
              <Play className="w-3.5 h-3.5" />
              Execute Dry-Run Test
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
