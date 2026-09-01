"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Terminal, ArrowUpRight, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { FacebookIcon } from "@/components/facebook-icon";
import { InstagramIcon } from "@/components/instagram-icon";
import { LinkedinIcon } from "@/components/linkedin-icon";
import { YoutubeIcon } from "@/components/youtube-icon";

type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    label: "Platform",
    links: [
      { title: "Challenge Catalog", href: "/challenges" },
      { title: "How It Works", href: "#how-it-works" },
      { title: "8 Practice Tracks", href: "#tracks" },
      { title: "Architecture", href: "#features" },
      { title: "Pricing & Quotas", href: "#pricing" },
    ],
  },
  {
    label: "Tracks",
    links: [
      { title: "HTML & CSS Layouts", href: "/challenges?track=html-css" },
      { title: "JavaScript & DOM", href: "/challenges?track=javascript" },
      { title: "React Components", href: "/challenges?track=react" },
      { title: "Vue.js Reactive UI", href: "/challenges?track=vue" },
      { title: "Node.js & Mock APIs", href: "/challenges?track=node-api" },
    ],
  },
  {
    label: "Developers",
    links: [
      { title: "Sign Up Free", href: "/signup" },
      { title: "Sign In", href: "/login" },
      { title: "Frequently Asked Questions", href: "#faq" },
      { title: "Verified Public Portfolios", href: "/challenges" },
      { title: "Contact Sales", href: "mailto:sales@staqor.dev?subject=Staqor%20Inquiry" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className={cn(
        "relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t border-[#26262E]/80 px-6 py-12 md:px-8",
        "bg-[#0E0E14]/60 backdrop-blur-md"
      )}
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ABDAC8]/30 blur-xs" />

      <div className="grid w-full gap-10 py-6 lg:grid-cols-12">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center shadow-[0_0_15px_rgba(171,218,200,0.15)]">
              <Terminal className="w-4 h-4 text-[#ABDAC8]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#F5F5F7]">Staqor</span>
          </div>

          <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm font-mono">
            The in-browser IDE for modern frontend craftsmanship. Graded against weighted multi-criteria rubrics in &lt;2.5s by Groq AI with zero server latency.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111117] border border-[#26262E] text-[11px] font-mono text-[#4ADE80]">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>All Systems Operational • Groq p95 &lt; 2.2s</span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.label} className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ABDAC8]">
                {section.label}
              </h3>
              <ul className="space-y-2 text-xs font-mono text-[#9CA3AF]">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="hover:text-[#F5F5F7] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.title}</span>
                      {link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[#26262E]/70 my-6" />

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4 text-xs font-mono text-[#9CA3AF]">
        <p>
          &copy; {new Date().getFullYear()} Staqor Inc. Built for frontend engineers.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/challenges" className="hover:text-[#F5F5F7] transition-colors">
            Challenges
          </Link>
          <Link href="/pricing" className="hover:text-[#F5F5F7] transition-colors">
            Pricing
          </Link>
          <a href="#faq" className="hover:text-[#F5F5F7] transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}
