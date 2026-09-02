"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search, X, Check, Filter } from "lucide-react";
import { MOCK_TOPICS, TopicTag } from "./types";

interface TopicFiltersProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export function TopicFilters({ selectedTopic, onSelectTopic }: TopicFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTopics = MOCK_TOPICS.slice(0, 8);
  const filteredAllTopics = MOCK_TOPICS.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Horizontal Scrollable Chips Row */}
      <div className="flex-1 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {/* "All" Reset Tag */}
        <Button
          size="sm"
          variant={selectedTopic === "" ? "default" : "outline"}
          onClick={() => onSelectTopic("")}
          className={`h-7 px-3 text-xs shrink-0 rounded-full font-medium transition-all ${
            selectedTopic === ""
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          All Topics
        </Button>

        {visibleTopics.map((topic) => {
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

      {/* Expand Popover Button */}
      <Popover open={isExpanded} onOpenChange={setIsExpanded}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={`h-7 px-2.5 text-xs shrink-0 border-border bg-card/80 gap-1 hover:border-primary/50 ${
              selectedTopic && !visibleTopics.some((t) => t.name === selectedTopic)
                ? "border-primary text-primary"
                : "text-muted-foreground"
            }`}
          >
            <span>{selectedTopic && !visibleTopics.some((t) => t.name === selectedTopic) ? selectedTopic : "Expand"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-80 p-3 bg-card border-border shadow-xl backdrop-blur-md"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-primary" />
                All Topic Tags ({MOCK_TOPICS.length})
              </span>
              {selectedTopic && (
                <button
                  onClick={() => onSelectTopic("")}
                  className="text-[11px] text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 pr-7 text-xs bg-background border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Tag Badges Grid */}
            <div className="max-h-56 overflow-y-auto flex flex-wrap gap-1.5 pr-1">
              {filteredAllTopics.map((topic) => {
                const isSelected = selectedTopic === topic.name;
                return (
                  <button
                    key={topic.name}
                    onClick={() => {
                      onSelectTopic(isSelected ? "" : topic.name);
                      setIsExpanded(false);
                    }}
                    className={`text-[11px] px-2 py-1 rounded-md border transition-colors flex items-center gap-1 ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary/70 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span>{topic.name}</span>
                    <span className="text-[9px] opacity-70 font-mono">({topic.count})</span>
                    {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
              {filteredAllTopics.length === 0 && (
                <p className="text-xs text-muted-foreground py-4 text-center w-full">
                  No matching topic tags found.
                </p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
