"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap, Trophy, BookOpen } from "lucide-react";
import { MOCK_PROMO_BANNERS, PromoBanner } from "./types";
import Link from "next/link";

export function PromoBanners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/banners mb-6">
      {/* Scroll Controls */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/90 border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover/banners:opacity-100 transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/90 border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover/banners:opacity-100 transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {MOCK_PROMO_BANNERS.map((banner) => (
          <div key={banner.id} className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-1 snap-start">
            <Card
              className={`h-full bg-gradient-to-br ${banner.gradient} border ${banner.borderGlow} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Subtle top light bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase font-mono px-2 py-0.5 bg-background/60 backdrop-blur-sm border-border text-foreground"
                    >
                      {banner.badge}
                    </Badge>
                    <Sparkles className="w-3.5 h-3.5 text-primary/70" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground tracking-tight line-clamp-1">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {banner.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-border/40">
                  <span className="text-[11px] text-muted-foreground font-medium">Explore curriculum</span>
                  <Link href={banner.link} className="inline-flex items-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2.5 text-xs text-primary hover:text-primary-foreground hover:bg-primary gap-1 group/btn"
                    >
                      <span>{banner.cta}</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
