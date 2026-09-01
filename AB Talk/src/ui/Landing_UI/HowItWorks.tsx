'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Terminal, Trophy } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/SpotlightCard';

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const dot3Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // Phase 7: Header Entrance Animation
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });
    }

    // Phase 7: Cards Entrance Animation
    if (cardsContainerRef.current) {
      gsap.from(cardsContainerRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 80%',
        },
      });
    }

    // Phase 4: SVG Connector Lines Animation
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    if (p1 && p2) {
      const len1 = p1.getTotalLength();
      const len2 = p2.getTotalLength();

      gsap.set(p1, { strokeDasharray: len1, strokeDashoffset: len1 });
      gsap.set(p2, { strokeDasharray: len2, strokeDashoffset: len2 });

      if (dot1Ref.current) gsap.set(dot1Ref.current, { scale: 0, opacity: 0, transformOrigin: 'center' });
      if (dot2Ref.current) gsap.set(dot2Ref.current, { scale: 0, opacity: 0, transformOrigin: 'center' });
      if (dot3Ref.current) gsap.set(dot3Ref.current, { scale: 0, opacity: 0, transformOrigin: 'center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(dot1Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
        .to(p1, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' })
        .to(dot2Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.2')
        .to(p2, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, '-=0.2')
        .to(dot3Ref.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.2');
    }
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 md:py-24 relative overflow-hidden">
      {/* Section Header */}
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2">Step-by-Step Blueprint</div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          How ABTalks Works
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg font-normal">
          Turn consistent daily effort into career-defining proof of work.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Phase 4: Desktop SVG Connector Overlay with Cubic Beziers & Drop-Shadow Glow Filters */}
        <svg
          className="hidden md:block absolute top-10 left-0 w-full h-24 pointer-events-none z-0 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow-orange-path" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-amber-path" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="path1-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8602e" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="path2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#0a6df0" />
            </linearGradient>
          </defs>

          {/* Cubic Bezier Path 1: Card 1 -> Card 2 */}
          <path
            ref={path1Ref}
            d="M 220 20 C 300 -15, 380 -15, 460 20"
            fill="none"
            stroke="url(#path1-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow-orange-path)"
          />

          {/* Cubic Bezier Path 2: Card 2 -> Card 3 */}
          <path
            ref={path2Ref}
            d="M 580 20 C 660 -15, 740 -15, 820 20"
            fill="none"
            stroke="url(#path2-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow-amber-path)"
          />

          {/* Glowing Endpoint Circles */}
          <circle
            ref={dot1Ref}
            cx="220"
            cy="20"
            r="6"
            fill="#e8602e"
            className="shadow-lg shadow-[#e8602e]"
          />
          <circle
            ref={dot2Ref}
            cx="460"
            cy="20"
            r="6"
            fill="#f59e0b"
            className="shadow-lg shadow-amber-500"
          />
          <circle
            ref={dot3Ref}
            cx="820"
            cy="20"
            r="6"
            fill="#0a6df0"
            className="shadow-lg shadow-blue-500"
          />
        </svg>

        {/* Step Cards Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Step 1: Learn Daily */}
          <SpotlightCard accentColor="orange" watermark="01">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-field bg-[#e8602e]/15 border border-[#e8602e]/30 flex items-center justify-center text-[#e8602e] mb-5 shadow-lg shadow-[#e8602e]/10 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#e8602e] uppercase tracking-wider mb-2">Step 01</div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">Learn Daily</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Choose your track and build practical skills through focused challenges and live sessions.
                </p>
              </div>
            </CardContent>
          </SpotlightCard>

          {/* Step 2: Build & Showcase */}
          <SpotlightCard accentColor="amber" watermark="02">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-field bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Step 02</div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">Build & Showcase</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Ship real work, publish your progress, and turn consistent effort into a visible portfolio.
                </p>
              </div>
            </CardContent>
          </SpotlightCard>

          {/* Step 3: Get Hired */}
          <SpotlightCard accentColor="blue" watermark="03">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-field bg-[#0a6df0]/15 border border-[#0a6df0]/30 flex items-center justify-center text-[#0a6df0] mb-5 shadow-lg shadow-[#0a6df0]/10 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#0a6df0] uppercase tracking-wider mb-2">Step 03</div>
                <h3 className="font-display text-xl font-extrabold text-white mb-2 tracking-tight">Get Hired</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Stand out through proof of work and become discoverable to recruiters in the ABTalks network.
                </p>
              </div>
            </CardContent>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
