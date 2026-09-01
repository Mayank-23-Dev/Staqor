'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

    if (listRef.current) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  const faqs = [
    {
      q: "What is ABTalks and how does it work?",
      a: "ABTalks is India's premier engineering challenge platform. We host multi-format cohorts (60-day challenges, 48-hour hackathons, 31-day AI cohorts) where students build daily, publish verified proof of work, and get discovered by recruiters."
    },
    {
      q: "Is ABTalks free for college students?",
      a: "Yes! Our core 60-Day Coding Challenge and public community programs are 100% free for students to participate, build streaks, and generate verified portfolios."
    },
    {
      q: "How much time do I need to commit every day?",
      a: "Most daily tasks are scoped for 45–90 minutes of focused building. Our submission window is designed specifically for late-night building (11:00 PM – 2:00 AM) after college classes."
    },
    {
      q: "How are commits verified?",
      a: "When you submit your daily progress, ABTalks validates your GitHub commit URL, checks code diffs, and auto-drafts a formatted LinkedIn caption to share your proof of work in one click."
    },
    {
      q: "How do hiring partners recruit from ABTalks?",
      a: "Recruiters and engineering leads access the ABTalks verified talent index, where candidates are ranked by real code contributions, streak consistency, and project complexity rather than static resumes."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 border-t border-[#2a2a2a]">
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2 flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Got Questions? We Have Answers.
        </h2>
        <p className="text-zinc-300 text-base font-normal">
          Everything you need to know about ABTalks challenges, daily commits, and program enrolment.
        </p>
      </div>

      <div ref={listRef} className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <SpotlightCard key={index} accentColor="orange">
            <div className="overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-white hover:text-[#e8602e] transition-colors group"
              >
                <span>{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] group-hover:bg-[#e8602e]/20 flex items-center justify-center transition-colors shrink-0">
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 group-hover:text-[#e8602e] transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180 text-[#e8602e]' : ''
                    }`}
                  />
                </div>
              </button>

              {openFaq === index && (
                <div className="px-6 pb-6 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4 animate-in fade-in duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
