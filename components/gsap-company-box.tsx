"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

interface GSAPAnimatedBoxProps {
  text: string;
  className?: string;
  variant?: "aqua" | "emerald" | "amber";
}

export function GSAPAnimatedBox({
  text,
  className = "",
  variant = "aqua",
}: GSAPAnimatedBoxProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const spark1Ref = useRef<HTMLSpanElement>(null);
  const spark2Ref = useRef<HTMLSpanElement>(null);
  const dotTLRef = useRef<HTMLSpanElement>(null);
  const dotTRRef = useRef<HTMLSpanElement>(null);
  const dotBLRef = useRef<HTMLSpanElement>(null);
  const dotBRRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Box Entrance with Elastic Bounce & Rotation Pop
    tl.fromTo(
      containerRef.current,
      { scale: 0.7, opacity: 0, rotate: -3 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.9,
        ease: "back.out(2)",
      }
    );

    // 2. Corner Dots Scale & Pulse Entrance
    const dots = [dotTLRef.current, dotTRRef.current, dotBLRef.current, dotBRRef.current];
    tl.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.4"
    );

    // 3. Continuous Breathing Glow Animation on Box (Aqua/Mint Theme)
    gsap.to(containerRef.current, {
      boxShadow: "0 0 35px rgba(171, 218, 200, 0.65), 0 0 15px rgba(171, 218, 200, 0.35)",
      borderColor: "#D4EDE3",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.0,
    });

    // 4. Continuous Floating Sparks Animation
    if (spark1Ref.current && spark2Ref.current) {
      gsap.to(spark1Ref.current, {
        y: -6,
        x: 3,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(spark2Ref.current, {
        y: 6,
        x: -4,
        scale: 0.9,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      scale: 1.08,
      rotate: 1,
      boxShadow: "0 0 45px rgba(171, 218, 200, 0.9)",
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      scale: 1,
      rotate: 0,
      boxShadow: "0 0 25px rgba(171, 218, 200, 0.4)",
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block text-white bg-gradient-to-r from-[#ABDAC8]/25 via-[#ABDAC8]/15 to-[#7BC4A8]/25 border-2 border-[#ABDAC8] px-4 py-1 font-sans shadow-xl shadow-[#ABDAC8]/20 rounded-xl my-1 sm:my-0 mx-1 cursor-pointer transition-all selection:bg-[#ABDAC8] selection:text-[#0A0A0F] ${className}`}
    >
      <span className="relative z-10 font-bold tracking-tight text-[#ABDAC8] drop-shadow-md">
        {text}
      </span>

      {/* Floating Sparkles 1 */}
      <span ref={spark1Ref} className="absolute -top-3 -right-2 text-[#D4EDE3] pointer-events-none z-20">
        <Sparkles className="w-4 h-4 fill-[#D4EDE3]" />
      </span>

      {/* Floating Sparkles 2 */}
      <span ref={spark2Ref} className="absolute -bottom-2 -left-2 text-[#7BC4A8] pointer-events-none z-20">
        <Sparkles className="w-3.5 h-3.5 fill-[#7BC4A8]" />
      </span>

      {/* 4 Corner Dots */}
      <span
        ref={dotTLRef}
        className="absolute w-2 h-2 bg-white ring-2 ring-[#ABDAC8] z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm"
      />
      <span
        ref={dotTRRef}
        className="absolute w-2 h-2 bg-white ring-2 ring-[#ABDAC8] z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm"
      />
      <span
        ref={dotBLRef}
        className="absolute w-2 h-2 bg-white ring-2 ring-[#ABDAC8] z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-full shadow-sm"
      />
      <span
        ref={dotBRRef}
        className="absolute w-2 h-2 bg-white ring-2 ring-[#ABDAC8] z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full shadow-sm"
      />
    </span>
  );
}
