"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_TOPICS } from "./types";

interface TopicFiltersProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export function TopicFilters({ selectedTopic, onSelectTopic }: TopicFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-start gap-2">
        {/* Topic Pills Container (Scrollable single-row when collapsed, wrapped in-place when expanded) */}
        <div
          className={`flex-1 flex gap-2 py-1 scrollbar-none transition-all duration-200 ${
            isExpanded
              ? "flex-wrap items-center"
              : "items-center overflow-x-auto flex-nowrap"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* "All Topics" Reset Tag */}
          <Button
            size="sm"
            variant={selectedTopic === "" ? "default" : "outline"}
            onClick={() => onSelectTopic("")}
            className={`h-7 px-3 text-xs shrink-0 rounded-full font-medium transition-all ${
              selectedTopic === ""
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            All Topics
          </Button>

          {/* All Topic Tags */}
          {MOCK_TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.name;
            return (
              <button
                key={topic.name}
                onClick={() => onSelectTopic(isSelected ? "" : topic.name)}
                className={`h-7 px-2.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card/70 border-border/80 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <span>{topic.name}</span>
                <span
                  className={`text-[10px] px-1 py-0 rounded-full ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary text-muted-foreground font-mono"
                  }`}
                >
                  {topic.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expand / Collapse in-place toggle button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-7 px-2.5 text-xs shrink-0 border-border bg-card/80 gap-1 hover:border-primary/50 mt-1 ${
            isExpanded
              ? "border-primary text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={isExpanded ? "Collapse topic tags into a single line" : "Expand topic tags in place"}
        >
          <span>{isExpanded ? "Collapse" : "Expand"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
