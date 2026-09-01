'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DayHeader,
  TaskDescription,
  SubmissionForm,
  SubmittedState
} from '@/ui/Day_UI';

export default function DayPage({ params }: { params: { id: string } }) {
  const dayId = params?.id || '1';
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const autoCaption = `Day ${dayId}/60 — ABTalks 60-Day Coding Challenge! 🚀\n\nToday I built & shipped: ${description || 'Implemented vector pipeline and Next.js HMR fixes'}.\n\nVerified GitHub Commit: ${githubUrl || 'https://github.com/abtalks/daily-commits'}\n\n#ABTalks #BuildInPublic #60DaysCoding #WebDev #SoftwareEngineering`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl || !description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(autoCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="min-h-screen text-white font-sans relative">

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f0f]/90 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/abtalks-logo.webp"
                alt="ABTalks Logo"
                width={120}
                height={32}
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#e8602e]/15 text-[#e8602e] border border-[#e8602e]/30">
              Day {dayId} Prompt
            </span>
          </div>

          <Link href="/dashboard">
            <Button size="sm" variant="outline" className="border border-zinc-700/80 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-zinc-300 hover:text-white font-semibold rounded-field px-4 py-2 text-xs transition-all hover:scale-105 active:scale-95">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Day Header */}
        <DayHeader dayId={dayId} title="Build & Deploy a Next.js App Router API Route" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Requirements & Submission Form */}
          <div className="md:col-span-2 space-y-6">
            <TaskDescription />

            {isSubmitted ? (
              <SubmittedState />
            ) : (
              <SubmissionForm
                githubUrl={githubUrl}
                setGithubUrl={setGithubUrl}
                description={description}
                setDescription={setDescription}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* LinkedIn Auto-Caption Generator */}
          <div className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e8602e]" />
                    <span>LinkedIn Post Drafter</span>
                  </h3>
                  <button
                    onClick={handleCopyCaption}
                    className="p-1.5 rounded-field bg-[#2a2a2a] text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors text-xs flex items-center gap-1 font-semibold"
                  >
                    {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaption ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-field bg-[#0f0f0f] border border-zinc-800 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {autoCaption}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
