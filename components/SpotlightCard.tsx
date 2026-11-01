"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Card } from "@/components/ui/card";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: "aqua" | "emerald" | "blue" | "amber" | "purple";
  watermark?: string | React.ReactNode;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  accentColor = "aqua",
  watermark,
  enableTilt = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Accent color mappings tailored for Staqor (Aqua / Mint / Near-black)
  const colorMap = {
    aqua: {
      gradient: "from-[#ABDAC8]/30 via-[#ABDAC8]/10 to-transparent",
      hoverBorder: "hover:border-[#ABDAC8]/60",
      hoverShadow: "hover:shadow-2xl hover:shadow-[#ABDAC8]/25",
      glowColor: "rgba(171, 218, 200, 0.16)",
      topOverlay:
        "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(171,218,200,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(171,218,200,0.55),transparent_100%)]",
    },
    emerald: {
      gradient: "from-emerald-500/30 via-emerald-500/10 to-transparent",
      hoverBorder: "hover:border-emerald-500/60",
      hoverShadow: "hover:shadow-2xl hover:shadow-emerald-500/25",
      glowColor: "rgba(16, 185, 129, 0.16)",
      topOverlay:
        "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.6),transparent_100%)]",
    },
    blue: {
      gradient: "from-[#0a6df0]/30 via-[#0a6df0]/10 to-transparent",
      hoverBorder: "hover:border-[#0a6df0]/60",
      hoverShadow: "hover:shadow-2xl hover:shadow-[#0a6df0]/25",
      glowColor: "rgba(10, 109, 240, 0.16)",
      topOverlay:
        "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,109,240,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,109,240,0.6),transparent_100%)]",
    },
    amber: {
      gradient: "from-amber-500/30 via-amber-500/10 to-transparent",
      hoverBorder: "hover:border-amber-500/60",
      hoverShadow: "hover:shadow-2xl hover:shadow-amber-500/25",
      glowColor: "rgba(245, 158, 11, 0.16)",
      topOverlay:
        "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.6),transparent_100%)]",
    },
    purple: {
      gradient: "from-purple-500/30 via-purple-500/10 to-transparent",
      hoverBorder: "hover:border-purple-500/60",
      hoverShadow: "hover:shadow-2xl hover:shadow-purple-500/25",
      glowColor: "rgba(168, 85, 247, 0.16)",
      topOverlay:
        "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.25),transparent_100%)] group-hover:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.6),transparent_100%)]",
    },
  };

  const accent = colorMap[accentColor] || colorMap.aqua;

  // Subtle 3D GSAP Tilt Physics Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 5 deg
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      scale: 1.015,
      duration: 0.3,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.9,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!enableTilt || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.7)",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <div style={{ perspective: "1000px" }} className="h-full">
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`h-full bg-[#111117] border-[#26262E] ${accent.hoverBorder} ${accent.hoverShadow} transition-colors duration-300 relative group overflow-hidden will-change-transform cursor-pointer ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic GSAP Specular Light Reflection */}
        <div
          ref={glowRef}
          className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0 blur-2xl -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            background: `radial-gradient(circle, ${accent.glowColor} 0%, transparent 70%)`,
            left: "50%",
            top: "50%",
          }}
        />

        {/* Top-positioned radial gradient overlay */}
        <div
          className={`absolute top-0 left-0 right-0 h-40 ${accent.topOverlay} pointer-events-none transition-all duration-500 z-0`}
        />

        {/* Watermark in back corner */}
        {watermark && (
          <div className="absolute -bottom-4 -right-4 text-7xl sm:text-8xl font-black text-white/5 group-hover:text-white/10 select-none pointer-events-none transition-colors duration-500 z-0 font-sans">
            {watermark}
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10 h-full">{children}</div>
      </Card>
    </div>
  );
}
