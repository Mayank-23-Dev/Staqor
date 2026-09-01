'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, X } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function WhyABTalks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });
    }

    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section id="why-abtalks" className="py-16 md:py-24 border-t border-[#2a2a2a]">
      <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2">The Proof of Work Loop</div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Why ABTalks Wins Over Traditional Courses
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg">
          Stop collecting unread PDF certificates. Start building a real, verified engineering portfolio.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Traditional College / Courses */}
        <SpotlightCard accentColor="purple" watermark="OLD">
          <div className="p-8 h-full">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Traditional Learning</div>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Generic Courses &amp; Lectures</h3>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Passive video watching with zero daily accountability</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Copy-pasted tutorial projects that recruiters ignore</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Static resume PDFs that get filtered out by ATS scanners</span>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* ABTalks Proof of Work System */}
        <SpotlightCard accentColor="orange" watermark="ABT">
          <div className="p-8 h-full bg-gradient-to-b from-[#e8602e]/10 to-transparent">
            <div className="text-xs font-bold text-[#e8602e] uppercase tracking-wider mb-3">The ABTalks Way</div>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Daily Proof of Work System</h3>
            <div className="space-y-4 text-sm text-zinc-200 font-medium">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Real code commits pushed to GitHub daily with public proof</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Auto-drafted LinkedIn captions to build your public tech brand</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Direct visibility to tech recruiters and engineering leaders</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
