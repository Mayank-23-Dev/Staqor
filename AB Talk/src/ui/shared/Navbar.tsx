'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoPng from '@/components/assets/abtalks-logo.png';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f0f]/90 border-b border-[#2a2a2a] transition-all">
      {/* Sticky Navigation Header */}
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <Link href="/" className="flex items-center group">
            <div className="h-9 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src={logoPng}
                alt="ABTalks Logo"
                className="h-[34px] w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
            <a href="#challenges" className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e8602e] hover:after:w-full after:transition-all after:duration-200">
              Programs
            </a>
            <a href="#how-it-works" className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e8602e] hover:after:w-full after:transition-all after:duration-200">
              How It Works
            </a>
            <a href="#why-abtalks" className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e8602e] hover:after:w-full after:transition-all after:duration-200">
              Why ABTalks
            </a>
            <a href="#testimonials" className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e8602e] hover:after:w-full after:transition-all after:duration-200">
              Wall of Proof
            </a>
            <a href="#faq" className="text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e8602e] hover:after:w-full after:transition-all after:duration-200">
              FAQ
            </a>
          </nav>

          {/* Header Action & Mobile Menu Toggle (Right) */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-b from-[#e8602e] via-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-bold rounded-field px-5 py-2.5 text-sm shadow-lg shadow-[#e8602e]/25 hover:shadow-xl hover:shadow-[#e8602e]/40 border border-[#ff8559]/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]">
                Join Challenge
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-field bg-[#2a2a2a] border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#2a2a2a] bg-[#0f0f0f] px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-zinc-300"
            >
              <a
                href="#challenges"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#e8602e] transition-colors py-1"
              >
                Programs
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#e8602e] transition-colors py-1"
              >
                How It Works
              </a>
              <a
                href="#why-abtalks"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#e8602e] transition-colors py-1"
              >
                Why ABTalks
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#e8602e] transition-colors py-1"
              >
                Wall of Proof
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#e8602e] transition-colors py-1"
              >
                FAQ
              </a>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="pt-2">
                <Button size="sm" className="w-full bg-gradient-to-b from-[#e8602e] to-[#c95326] text-white font-bold rounded-field py-2.5">
                  Join Challenge
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
}
