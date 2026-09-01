'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GitBranch, Briefcase } from 'lucide-react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono font-extrabold">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TrustStrip() {
  return (
    <section className="py-10 border-y border-[#2a2a2a]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-box bg-[#1a1a1a] border border-[#2a2a2a] flex items-center gap-5 hover:border-[#e8602e]/50 transition-all group relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#e8602e]/10 rounded-full blur-xl group-hover:bg-[#e8602e]/20 transition-all pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a30_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a30_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_30%,transparent_100%)] pointer-events-none" />
          <span className="absolute w-1 h-1 bg-[#e8602e]/50 top-2 left-2 rounded-full pointer-events-none" />
          <span className="absolute w-1 h-1 bg-[#e8602e]/50 bottom-2 right-2 rounded-full pointer-events-none" />

          <div className="w-14 h-14 rounded-field bg-[#e8602e]/15 border border-[#e8602e]/30 flex items-center justify-center text-[#e8602e] group-hover:scale-110 transition-transform relative z-10">
            <Users className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl font-extrabold text-white tracking-tight">
              <Counter value={10000} suffix="+" />
            </div>
            <div className="text-sm text-zinc-400 font-medium mt-0.5 tracking-wide">Active Members</div>
          </div>
        </motion.div>

        {/* Stat Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-box bg-[#1a1a1a] border border-[#2a2a2a] flex items-center gap-5 hover:border-amber-500/50 transition-all group relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a30_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a30_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_30%,transparent_100%)] pointer-events-none" />
          <span className="absolute w-1 h-1 bg-amber-500/50 top-2 left-2 rounded-full pointer-events-none" />
          <span className="absolute w-1 h-1 bg-amber-500/50 bottom-2 right-2 rounded-full pointer-events-none" />

          <div className="w-14 h-14 rounded-field bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform relative z-10">
            <GitBranch className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl font-extrabold text-white tracking-tight">
              <Counter value={500} suffix="+" />
            </div>
            <div className="text-sm text-zinc-400 font-medium mt-0.5 tracking-wide">Projects Built</div>
          </div>
        </motion.div>

        {/* Stat Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-box bg-[#1a1a1a] border border-[#2a2a2a] flex items-center gap-5 hover:border-[#0a6df0]/50 transition-all group relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#0a6df0]/10 rounded-full blur-xl group-hover:bg-[#0a6df0]/20 transition-all pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a30_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a30_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_30%,transparent_100%)] pointer-events-none" />
          <span className="absolute w-1 h-1 bg-[#0a6df0]/50 top-2 left-2 rounded-full pointer-events-none" />
          <span className="absolute w-1 h-1 bg-[#0a6df0]/50 bottom-2 right-2 rounded-full pointer-events-none" />

          <div className="w-14 h-14 rounded-field bg-[#0a6df0]/15 border border-[#0a6df0]/30 flex items-center justify-center text-[#0a6df0] group-hover:scale-110 transition-transform relative z-10">
            <Briefcase className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl font-extrabold text-white tracking-tight">
              <Counter value={100} suffix="+" />
            </div>
            <div className="text-sm text-zinc-400 font-medium mt-0.5 tracking-wide">Hiring Partners</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
