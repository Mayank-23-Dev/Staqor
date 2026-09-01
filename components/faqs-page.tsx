"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { GSAPAnimatedBox } from "@/components/gsap-company-box";

export function FaqsSection() {
  return (
    <section id="faq" className="py-20 md:py-28 border-t border-[#26262E] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ABDAC8]/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (Sticky Title & Help) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ABDAC8]/10 border border-[#ABDAC8]/30 text-[#ABDAC8] text-[11px] font-mono uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#ABDAC8]" />
              <span>Got Questions?</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Frequently Asked <GSAPAnimatedBox text="Questions." />
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
              Everything you need to know about Staqor challenges, sub-2.5s Groq AI rubric grading, locked scaffolding, and verified recruiter sandboxes.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="mailto:team@staqor.dev"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#ABDAC8] hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>Contact support: team@staqor.dev</span>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                <span>Join Developer Community</span>
              </a>
            </div>
          </div>

          {/* Right Column (Accordion List - All Closed by default) */}
          <div className="lg:col-span-8">
            <Accordion
              className="w-full space-y-3"
              type="single"
              collapsible
            >
              {questions.map((item) => (
                <AccordionItem
                  className="rounded-2xl border border-[#26262E] bg-[#111117] px-6 py-1 hover:border-[#ABDAC8]/40 transition-all duration-300 data-[state=open]:border-[#ABDAC8]/40 data-[state=open]:bg-[#121615]"
                  key={item.id}
                  value={item.id}
                >
                  <AccordionTrigger className="py-4 hover:no-underline font-display text-base font-bold text-white hover:text-[#ABDAC8] transition-colors text-left group">
                    <span className="leading-snug">{item.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-zinc-300 leading-relaxed font-normal border-t border-[#26262E]/60 pt-3">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

const questions = [
  {
    id: "item-1",
    title: "How does Staqor evaluate frontend code in under 2.5 seconds?",
    content:
      "Staqor compiles HTML, CSS, and JS 100% client-side inside an isolated iframe with a 2000ms loop-killer. When you run or submit, a zero-token syntax pre-filter checks structural code in 0.02s before Groq LPU models grade layout fidelity (35%), DOM/state logic (35%), and semantic cleanliness (30%) in <2.5 seconds.",
  },
  {
    id: "item-2",
    title: "Is Staqor completely free for developers and students?",
    content:
      "Yes! Every challenge comes with a generous lifetime free quota (5 Runs & 3 Submits per challenge). You get instant client-side execution, live Groq AI rubric feedback, and verified public portfolio replays at $0.",
  },
  {
    id: "item-3",
    title: "What are the 8 specialized practice tracks covered in Staqor?",
    content:
      "The catalog spans HTML & CSS Layouts, JavaScript & DOM Events, React Components, Vue.js Reactive UI, Node.js & Mock APIs, Real-World Bug Fixes, Full-Stack Scenarios, and Performance Optimization across Easy, Medium, and Hard tiers.",
  },
  {
    id: "item-4",
    title: "How do locked scaffolding and read-only files work?",
    content:
      "To enforce targeted practice, challenges lock boilerplate files. For example, in a JS DOM challenge, HTML markup and CSS styling are locked read-only so you focus purely on DOM manipulation and state logic without breaking scaffolding.",
  },
  {
    id: "item-5",
    title: "How do recruiters and engineering leads verify candidate work?",
    content:
      "When you solve a challenge, Staqor generates a verified candidate showcase link. Recruiters can test your live component in an interactive sandbox and inspect your Monaco code tabs with one click—no repository cloning required.",
  },
  {
    id: "item-6",
    title: "Can I test responsive breakpoints and mobile viewports inside the IDE?",
    content:
      "Yes! The workspace includes instant Desktop (100%), Tablet (768px), and Mobile (375px) viewport toggles with interactive mouse events, keyboard access, and local storage state persistence.",
  },
];
