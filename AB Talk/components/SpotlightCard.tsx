'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Card } from '@/components/ui/card';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: 'orange' | 'emerald' | 'blue' | 'amber' | 'purple';
  watermark?: string | React.ReactNode;
}

export function SpotlightCard({
  children,
  className = '',
  accentColor = 'orange',
  watermark,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Accent color mappings
  const colorMap = {
    orange: {
      gradient: 'from-[#e8602e]/30 via-[#e8602e]/10 to-transparent',
      hoverBorder: 'hover:border-[#e8602e]/60',
      hoverShadow: 'hover:shadow-2xl hover:shadow-[#e8602e]/20',
      spotlight: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(232, 96, 46, 0.15), transparent 80%)',
      topOverlay: 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,96,46,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,96,46,0.6),transparent_100%)]',
    },
    emerald: {
      gradient: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
      hoverBorder: 'hover:border-emerald-500/60',
      hoverShadow: 'hover:shadow-2xl hover:shadow-emerald-500/20',
      spotlight: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.15), transparent 80%)',
      topOverlay: 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.6),transparent_100%)]',
    },
    blue: {
      gradient: 'from-[#0a6df0]/30 via-[#0a6df0]/10 to-transparent',
      hoverBorder: 'hover:border-[#0a6df0]/60',
      hoverShadow: 'hover:shadow-2xl hover:shadow-[#0a6df0]/20',
      spotlight: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(10, 109, 240, 0.15), transparent 80%)',
      topOverlay: 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,109,240,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,109,240,0.6),transparent_100%)]',
    },
    amber: {
      gradient: 'from-amber-500/30 via-amber-500/10 to-transparent',
      hoverBorder: 'hover:border-amber-500/60',
      hoverShadow: 'hover:shadow-2xl hover:shadow-amber-500/20',
      spotlight: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.15), transparent 80%)',
      topOverlay: 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.6),transparent_100%)]',
    },
    purple: {
      gradient: 'from-purple-500/30 via-purple-500/10 to-transparent',
      hoverBorder: 'hover:border-purple-500/60',
      hoverShadow: 'hover:shadow-2xl hover:shadow-purple-500/20',
      spotlight: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 80%)',
      topOverlay: 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.6),transparent_100%)]',
    },
  };

  const accent = colorMap[accentColor];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Use GSAP quickTo for ultra-smooth mouse interpolation
    const xTo = gsap.quickTo(card, '--mouse-x', { duration: 0.4, ease: 'power2.out' });
    const yTo = gsap.quickTo(card, '--mouse-y', { duration: 0.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(`${x}px`);
      yTo(`${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`h-full bg-[#141414] border-[#2a2a2a] hover:-translate-y-1.5 ${accent.hoverBorder} ${accent.hoverShadow} transition-all duration-300 relative group overflow-hidden ${className}`}
    >
      {/* Top-positioned radial gradient overlay (accent color, 0.25 opacity idle -> 0.6 on hover) */}
      <div className={`absolute top-0 left-0 right-0 h-40 ${accent.topOverlay} pointer-events-none transition-all duration-500 z-0`} />

      {/* GSAP Mouse-Follow Spotlight Layer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: accent.spotlight,
        }}
      />

      {/* Watermark in back corner */}
      {watermark && (
        <div className="absolute -bottom-4 -right-4 text-7xl sm:text-8xl font-black text-white/5 group-hover:text-white/10 select-none pointer-events-none transition-colors duration-500 z-0 font-display">
          {watermark}
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </Card>
  );
}
