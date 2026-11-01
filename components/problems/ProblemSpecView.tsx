"use client";

import React, { useState } from "react";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { Maximize2, Sparkles, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProblemSpecViewProps {
  problem: any;
}

export function ProblemSpecView({ problem }: ProblemSpecViewProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const screenshotUrl =
    problem.screenshot_url ||
    `/screenshots/${problem.folder || problem.slug}.png`;

  return (
    <>
      <div className="space-y-6">
        {/* Header Details */}
        <div>
          <span className="text-xs font-mono font-bold text-[#A7DDC9] uppercase tracking-wider">
            {problem.topic || problem.category || "Frontend Challenge"} • {problem.difficulty || "Easy"}
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">{problem.title}</h1>
          {problem.summary && (
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{problem.summary}</p>
          )}
        </div>

        {/* Target Screenshot Card with In-App Lightbox Trigger */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-[#A7DDC9] uppercase tracking-wide flex items-center gap-1.5">
              🖼️ Target Visual Output (Screenshot)
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLightboxOpen(true)}
              className="h-6 px-2 text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-white/5 gap-1"
            >
              <ZoomIn className="w-3 h-3 text-[#A7DDC9]" />
              <span>Open Fullscreen</span>
            </Button>
          </div>

          <div
            onClick={() => setIsLightboxOpen(true)}
            className="rounded-xl overflow-hidden border border-[#26262E] bg-[#0A0A0F] shadow-lg group relative cursor-pointer hover:border-[#A7DDC9]/50 transition-all"
            title="Click to open fullscreen interactive preview"
          >
            <img
              src={screenshotUrl}
              alt={`${problem.title} Target Screenshot`}
              className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="px-3 py-1.5 rounded-lg bg-[#111117]/90 border border-[#26262E] text-xs font-mono text-white flex items-center gap-1.5 shadow-xl">
                <Maximize2 className="w-3.5 h-3.5 text-[#A7DDC9]" /> Click to Inspect Target Design
              </span>
            </div>
          </div>
        </div>

        {/* Formatted Specification Body */}
        {problem.description && (
          <div
            className="prose prose-invert max-w-none text-zinc-300 text-xs"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={screenshotUrl}
        title={problem.title}
      />
    </>
  );
}
