'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function Testimonials() {
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
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-24 border-t border-[#2a2a2a]">
      <div ref={headerRef} className="text-center max-w-xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2">Proof of Impact</div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          What Our Builders Say
        </h2>
        <p className="text-base text-zinc-300 font-normal">
          Real feedback from students, builders, and industry mentors in the ABTalks network.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quote 1: Samridhi Gupta */}
        <SpotlightCard accentColor="orange" watermark={<Quote className="w-16 h-16 opacity-30" />}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8602e] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#e8602e]/30">
                    SG
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Samridhi Gupta</div>
                    <div className="text-xs text-zinc-400 font-medium">Axis Institute of Technology and Management</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                &ldquo;ABTalks gave me the structure and momentum I needed. Building publicly every single day transformed my confidence as a developer.&rdquo;
              </p>
            </div>
          </div>
        </SpotlightCard>

        {/* Quote 2: Vivek */}
        <SpotlightCard accentColor="amber" watermark={<Quote className="w-16 h-16 opacity-30" />}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-amber-500/30">
                    V
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Vivek</div>
                    <div className="text-xs text-zinc-400 font-medium">IT Leader • 20+ years of industry experience</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                &ldquo;Seeing students consistently ship real projects and document their learning journey is exactly what tech recruiters and engineering leaders look for.&rdquo;
              </p>
            </div>
          </div>
        </SpotlightCard>

        {/* Quote 3: Lakshay */}
        <SpotlightCard accentColor="blue" watermark={<Quote className="w-16 h-16 opacity-30" />}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0a6df0] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#0a6df0]/30">
                    L
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Lakshay</div>
                    <div className="text-xs text-zinc-400 font-medium">College Builder</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                &ldquo;The community accountability is unmatched. Watching fellow students ship code daily pushed me to complete my first full-stack portfolio.&rdquo;
              </p>
            </div>
          </div>
        </SpotlightCard>

        {/* Quote 4: Rida Khan */}
        <SpotlightCard accentColor="emerald" watermark={<Quote className="w-16 h-16 opacity-30" />}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-emerald-500/30">
                    RK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Rida Khan</div>
                    <div className="text-xs text-zinc-400 font-medium">AI Enthusiast</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic font-normal">
                &ldquo;The AI cohort helped me understand RAG pipelines and LLMs hands-on. Building real projects made all the difference in getting noticed.&rdquo;
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
