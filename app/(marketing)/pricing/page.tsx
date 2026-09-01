"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";
import { ScrollGlowingLine } from "@/components/ScrollGlowingLine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Zap,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] selection:bg-[#ABDAC8] selection:text-[#0A0A0F] font-sans relative overflow-x-clip">
      <ScrollGlowingLine />

      {/* Ambient background texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #26262E 1px, transparent 1px),
            linear-gradient(to bottom, #26262E 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#ABDAC8]/15 via-[#ABDAC8]/5 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* Sticky Header */}
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-28">
        {/* Top Eyebrow & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111614] border border-[#26352E] text-xs font-mono text-[#ABDAC8] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>TRANSPARENT, DEVELOPER-FIRST PRICING</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Invest in Verified <GSAPAnimatedBox text="Craftsmanship." />
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Start for free with 5 runs and 3 submits per challenge across Frontend, Backend, and Databases. Upgrade to Pro for unlimited Groq AI evaluations and verified recruiter sandboxes.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#111117] border border-[#26262E] text-xs font-mono">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                !isAnnual
                  ? "bg-[#16161F] text-white font-bold border border-[#26262E] shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? "bg-[#ABDAC8] text-[#0A0A0F] font-bold shadow-md shadow-[#ABDAC8]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isAnnual ? "bg-[#0A0A0F]/20 text-[#0A0A0F]" : "bg-[#ABDAC8]/20 text-[#ABDAC8]"}`}>
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-stretch">
          {/* Tier 1: Free Starter */}
          <SpotlightCard accentColor="aqua" watermark="FREE">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                    Free Starter
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                    NO CREDIT CARD
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="text-4xl font-extrabold text-white font-mono">$0</div>
                  <span className="text-xs text-zinc-400 font-mono">Free forever</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                  Ideal for students and developers getting started with core Frontend UI and JavaScript DOM challenges.
                </p>

                <div className="space-y-3 text-xs text-zinc-300 border-t border-[#26262E] pt-6 mb-8 font-mono">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Access all starter curriculum challenges</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>5 Runs &amp; 3 Submits per challenge</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Sub-2.5s Groq AI rubric feedback</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>100% In-browser sandbox execution</span>
                  </div>
                </div>
              </div>

              <Link href="/signup" className="block">
                <Button
                  variant="outline"
                  className="w-full border-[#26262E] hover:border-[#ABDAC8] text-xs font-mono h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Practicing Free
                </Button>
              </Link>
            </div>
          </SpotlightCard>

          {/* Tier 2: Pro Candidate (Highlighted) */}
          <SpotlightCard accentColor="aqua" watermark="PRO">
            <div className="p-8 h-full flex flex-col justify-between bg-gradient-to-b from-[#ABDAC8]/10 via-transparent to-transparent">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-[#ABDAC8]">
                    Pro Engineer
                  </span>
                  <Badge className="bg-[#ABDAC8] text-[#0A0A0F] text-[10px] font-mono font-bold px-2 py-0.5">
                    MOST POPULAR
                  </Badge>
                </div>

                <div className="mb-4 flex items-baseline gap-1">
                  <div className="text-4xl font-extrabold text-white font-mono">
                    ${isAnnual ? "12" : "15"}
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">/ month</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                  For software engineers building a verified, recruiter-ready engineering portfolio across Frontend, Backend, and SQL.
                </p>

                <div className="space-y-3 text-xs text-zinc-200 border-t border-[#ABDAC8]/30 pt-6 mb-8 font-mono">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span className="font-bold text-white">Unlimited Runs &amp; Submissions</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Shareable Recruiter Sandboxes with Live Replay</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Immediate Model Solution Unlocking</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Priority Groq LPU inference queue (&lt;1.8s)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#ABDAC8] shrink-0" />
                    <span>Advanced Backend APIs, SQL &amp; Caching challenges</span>
                  </div>
                </div>
              </div>

              <Link href="/signup?plan=pro" className="block">
                <Button
                  className="w-full bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold text-xs h-11 rounded-xl shadow-lg shadow-[#ABDAC8]/25 hover:shadow-xl hover:shadow-[#ABDAC8]/35 border border-[#ABDAC8]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Upgrade to Pro Engineer</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </SpotlightCard>

          {/* Tier 3: Enterprise / Cohorts */}
          <SpotlightCard accentColor="purple" watermark="TEAM">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                    Enterprise &amp; Teams
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono border-[#26262E]">
                    HIRING TEAMS
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="text-4xl font-extrabold text-white font-mono">Custom</div>
                  <span className="text-xs text-zinc-400 font-mono">Tailored for cohorts</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                  For engineering hiring teams, universities, and bootcamp cohorts conducting technical assessments.
                </p>

                <div className="space-y-3 text-xs text-zinc-300 border-t border-[#26262E] pt-6 mb-8 font-mono">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Custom private challenge creation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Dedicated candidate assessment dashboards</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Team scoring audit logs &amp; rubric weighting</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Dedicated SLA &amp; Slack connect channel</span>
                  </div>
                </div>
              </div>

              <a href="mailto:team@staqor.dev?subject=Staqor%20Enterprise%20Enquiry" className="block">
                <Button
                  variant="outline"
                  className="w-full border-[#26262E] hover:border-purple-400 text-xs font-mono h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact Sales Team
                </Button>
              </a>
            </div>
          </SpotlightCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
