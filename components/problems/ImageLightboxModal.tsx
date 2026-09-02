"use client";

import React, { useEffect } from "react";
import { X, ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export function ImageLightboxModal({
  isOpen,
  onClose,
  imageUrl,
  title,
}: ImageLightboxModalProps) {
  const [zoom, setZoom] = React.useState(1);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="w-full max-w-6xl flex items-center justify-between py-2 px-4 bg-[#111117]/90 border border-[#26262E] rounded-xl shadow-2xl shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={onClose}
            className="h-8 px-3 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Environment (ESC)</span>
          </Button>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Target Design Benchmark: <strong className="text-white">{title}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#26262E] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-400 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#26262E] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-[#26262E] mx-1" />
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-white/10"
            title="Close (ESC)"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className="flex-1 w-full max-w-6xl my-4 overflow-auto flex items-center justify-center p-2 rounded-2xl bg-[#07070A] border border-[#26262E]/60 shadow-2xl relative scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
          className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-150"
        />
      </div>

      {/* Bottom Quick Return Pill */}
      <div
        className="shrink-0 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          size="sm"
          variant="outline"
          className="h-8 px-4 text-xs font-mono border-[#26262E] bg-[#111117] text-zinc-300 hover:text-white hover:border-[#A7DDC9] gap-2 shadow-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#A7DDC9]" />
          <span>Press ESC or click here to return to Code Editor</span>
        </Button>
      </div>
    </div>
  );
}
