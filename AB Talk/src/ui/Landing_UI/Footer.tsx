'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare } from 'lucide-react';
import logoPng from '@/components/assets/abtalks-logo.png';

export function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0f0f0f] py-12 text-xs text-zinc-400 relative z-10 font-medium">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src={logoPng}
            alt="ABTalks Logo"
            className="h-[28px] w-auto object-contain"
          />
        </Link>

        {/* Social Icons */}
        <div className="flex items-center gap-3 text-zinc-400">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm" aria-label="Instagram">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm" aria-label="LinkedIn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm" aria-label="YouTube">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1 1.4-1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3v6z"/></svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm" aria-label="X">
            <span className="font-bold text-xs font-sans">X</span>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm" aria-label="Discord">
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

        {/* Contact Line */}
        <div className="flex items-center gap-2 text-zinc-400">
          <Mail className="w-3.5 h-3.5 text-[#e8602e]" />
          <span>For any issue or enquiry: <a href="mailto:team@abtalks.in" className="text-white hover:underline font-semibold">team@abtalks.in</a></span>
        </div>
      </div>
    </footer>
  );
}
