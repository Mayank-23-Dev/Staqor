"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { MessageSquare, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      className={cn(
        "w-full border-t border-[#26262E] bg-[#0A0A0F] text-zinc-400 text-xs relative z-10",
        "bg-[radial-gradient(50%_100%_at_50%_0%,rgba(171,218,200,0.06),transparent)]"
      )}
    >
      <FullWidthDivider position="top" />

      {/* Full-width container with centered inner content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="w-max">
              <Logo />
            </Link>
            <p className="max-w-md text-zinc-400 text-xs sm:text-sm leading-relaxed">
              The in-browser IDE for modern frontend craftsmanship. Solve real UI challenges, pass sub-2.5s Groq AI rubrics, and generate verified recruiter portfolios.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((item, index) => (
                <Button
                  asChild
                  key={`social-${item.link}-${index}`}
                  size="icon"
                  variant="outline"
                  className="w-9 h-9 rounded-full bg-[#111117] border-[#26262E] text-zinc-400 hover:text-white hover:border-[#ABDAC8]/50 hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95 shadow-sm"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Col 2: Curriculum & Tracks (2 cols) */}
          <div className="md:col-span-2 md:col-start-7">
            <span className="text-white font-mono text-xs font-bold uppercase tracking-wider block mb-4">
              Curriculum
            </span>
            <div className="flex flex-col gap-2.5">
              {curriculumLinks.map(({ href, title }) => (
                <a
                  className="text-zinc-400 hover:text-[#ABDAC8] transition-colors text-xs"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Platform Resources (2 cols) */}
          <div className="md:col-span-2">
            <span className="text-white font-mono text-xs font-bold uppercase tracking-wider block mb-4">
              Platform
            </span>
            <div className="flex flex-col gap-2.5">
              {resourcesLinks.map(({ href, title }) => (
                <a
                  className="text-zinc-400 hover:text-[#ABDAC8] transition-colors text-xs"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Company & Legal (2 cols) */}
          <div className="md:col-span-2">
            <span className="text-white font-mono text-xs font-bold uppercase tracking-wider block mb-4">
              Company
            </span>
            <div className="flex flex-col gap-2.5">
              {companyLinks.map(({ href, title }) => (
                <a
                  className="text-zinc-400 hover:text-[#ABDAC8] transition-colors text-xs"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FullWidthDivider />

      {/* Bottom Full-Width Bar */}
      <div className="w-full bg-[#08080C] border-t border-[#26262E]/60 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono">
          <p>
            &copy; {new Date().getFullYear()} Staqor Inc. Built for Frontend Engineers worldwide.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#ABDAC8]" />
            <span>
              Enquiries:{" "}
              <a href="mailto:team@staqor.dev" className="text-zinc-300 hover:text-white hover:underline">
                team@staqor.dev
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const curriculumLinks = [
  { title: "HTML & CSS Layouts", href: "/challenges?track=html-css" },
  { title: "JavaScript & DOM Events", href: "/challenges?track=javascript" },
  { title: "React Component Architecture", href: "/challenges?track=react" },
  { title: "Vue.js Reactive UI", href: "/challenges?track=vue" },
  { title: "Node.js Mock APIs", href: "/challenges?track=node-api" },
  { title: "Real-World Bug Fixes", href: "/challenges?track=bug-fix" },
];

const resourcesLinks = [
  { title: "Challenges Catalog", href: "/challenges" },
  { title: "Evaluation Rubric", href: "#how-it-works" },
  { title: "Why Staqor", href: "#why-staqor" },
  { title: "Developer FAQ", href: "#faq" },
];

const companyLinks = [
  { title: "About Staqor", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Terms of Service", href: "#" },
  { title: "Contact Support", href: "mailto:team@staqor.dev" },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
    link: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    ),
    link: "https://linkedin.com",
  },
  {
    name: "YouTube",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1 1.4-1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3v6z"/></svg>
    ),
    link: "https://youtube.com",
  },
  {
    name: "X",
    icon: <span className="font-bold text-xs font-sans">X</span>,
    link: "https://x.com",
  },
  {
    name: "Discord",
    icon: <MessageSquare className="w-4 h-4" />,
    link: "https://discord.com",
  },
];
