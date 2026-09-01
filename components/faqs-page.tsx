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
              Everything you need to know about Staqor software development challenges across Frontend, Backend APIs, Databases, AI rubrics, and verified candidate portfolios.
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
    title: "How does Staqor evaluate code across Frontend, Backend, and Databases in <2.5s?",
    content:
      "Staqor runs isolated client-side sandboxes and serverless execution runners with a 2000ms loop-killer. When you run or submit, zero-token AST pre-filters verify syntax in 0.02s before specialized AI evaluation models grade layout fidelity (35%), API/state logic (35%), and semantic cleanliness (30%) in under 2.5 seconds.",
  },
  {
    id: "item-2",
    title: "Is Staqor completely free for developers and students?",
    content:
      "Yes! Every challenge comes with a generous lifetime free quota (5 Runs & 3 Submits per challenge). You get instant sandbox execution, live automated AI rubric feedback, and verified public portfolio replays at $0.",
  },
  {
    id: "item-3",
    title: "What development disciplines are covered in Staqor's 8 tracks?",
    content:
      "The curriculum covers Frontend UI Layouts, JavaScript & DOM Events, React Component Systems, Backend & REST APIs (Node.js/Express), Databases & SQL Queries, Distributed Systems & Caching (Redis), Real-World Bug Diagnostics, and End-to-End Scenarios.",
  },
  {
    id: "item-4",
    title: "How do locked scaffolding and scoped contracts work?",
    content:
      "To enforce focused software engineering, challenges protect boilerplate files. For example, in a Backend API challenge, routing harness files are locked read-only so you focus purely on handler logic, error handling, and performance without breaking infrastructure.",
  },
  {
    id: "item-5",
    title: "How do recruiters and engineering leads verify candidate proof of work?",
    content:
      "When you solve a challenge, Staqor generates a verified candidate showcase link. Recruiters can test your live component in an interactive sandbox, inspect your API handlers, and review your Monaco code tabs with one click—no repository cloning required.",
  },
  {
    id: "item-6",
    title: "Can I test responsive breakpoints, API responses, and database queries in the IDE?",
    content:
      "Yes! The workspace includes instant Desktop, Tablet, and Mobile viewport toggles for UI tasks, as well as live HTTP payload inspectors and SQL query plan analyzers for backend and database challenges.",
  },
];
