"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollGlowingLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track page scroll in real-time
  const { scrollYProgress } = useScroll();

  // Fast spring physics for instant, ultra-smooth scroll tracking
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.0001,
  });

  // Balanced opacity on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0.35, 0.85, 0.85, 0.4]);

  // Enhanced, deep sweeping organic Bezier path
  const curvyPath =
    "M 50,0 C 12,90 88,180 50,270 C 12,360 8,450 15,540 C 24,630 48,700 68,780 C 84,850 70,930 50,1000";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bold Laser Glow Filter */}
          <filter id="thickLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="5.0" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vibrant Neon Aqua Gradient Flow */}
          <linearGradient id="thickNeonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ABDAC8" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#D4EDE3" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#ABDAC8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7BC4A8" stopOpacity="0.75" />
          </linearGradient>

          {/* Background Guide Track */}
          <linearGradient id="thickTrackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#26262E" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ABDAC8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#26262E" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* 1. Background Inactive Curvy Guide Track */}
        <path
          d={curvyPath}
          stroke="url(#thickTrackGradient)"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          fill="none"
        />

        {/* 2. Active Thick Curvy Glowing Laser Line (Instant real-time scroll sync) */}
        <motion.path
          d={curvyPath}
          stroke="url(#thickNeonGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#thickLaserGlow)"
          style={{
            pathLength,
            opacity,
          }}
        />

        {/* 3. Outer Atmospheric Light Aura Trace */}
        <motion.path
          d={curvyPath}
          stroke="#ABDAC8"
          strokeWidth="4.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
          fill="none"
          filter="blur(8px)"
          style={{
            pathLength,
            opacity,
          }}
        />
      </svg>
    </div>
  );
}
