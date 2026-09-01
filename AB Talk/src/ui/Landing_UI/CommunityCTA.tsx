'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommunityCTA() {
  return (
    <section id="community" className="py-12">
      <div className="p-10 md:p-16 rounded-box bg-gradient-to-br from-[#e8602e]/20 via-[#1a1a1a] to-[#0f0f0f] border border-[#e8602e]/40 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8602e]/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          Join our community for instant updates
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          Meet builders, get event alerts, and stay accountable.
        </p>

        <Link href="/dashboard" className="inline-block">
          <Button size="lg" className="bg-gradient-to-b from-[#e8602e] via-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-extrabold px-10 py-7 text-lg rounded-field shadow-2xl shadow-[#e8602e]/40 hover:shadow-2xl hover:shadow-[#e8602e]/60 border border-[#ff8559]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]">
            <span>Join now</span>
            <ArrowRight className="w-5 h-5 ml-2.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
