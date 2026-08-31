"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Trophy,
  Globe,
  GraduationCap,
  Plus,
  Lock,
  Globe2,
  X,
  FolderCode,
  Sparkles,
  Bookmark,
  ChevronRight,
  ListCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_SAVED_TOPICS, NavListItem } from "./types";

interface SidebarProps {
  selectedList?: string;
  onSelectList?: (listName: string) => void;
  selectedTag?: string;
  onSelectTag?: (tagName: string) => void;
  activeNav?: string;
  onSelectNav?: (nav: string) => void;
}

export function Sidebar({
  selectedList,
  onSelectList,
  selectedTag,
  onSelectTag,
  activeNav = "Library",
  onSelectNav,
}: SidebarProps) {
  const [lists, setLists] = useState<NavListItem[]>([
    { id: "favorite", name: "Favorite", count: 8, isPrivate: true },
    { id: "todo", name: "To Do", count: 14, isPrivate: true },
    { id: "ui-systems", name: "UI & CSS Systems", count: 18, isPrivate: false },
    { id: "dom-polyfills", name: "DOM & Polyfills", count: 12, isPrivate: true },
  ]);

  const [savedTopics, setSavedTopics] = useState<string[]>(MOCK_SAVED_TOPICS);
  const [newListName, setNewListName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList: NavListItem = {
      id: newListName.toLowerCase().replace(/\s+/g, "-"),
      name: newListName.trim(),
      count: 0,
      isPrivate: true,
    };
    setLists((prev) => [...prev, newList]);
    setNewListName("");
    setIsDialogOpen(false);
  };

  const handleRemoveSavedTopic = (e: React.MouseEvent, topic: string) => {
    e.stopPropagation();
    setSavedTopics((prev) => prev.filter((t) => t !== topic));
    if (selectedTag === topic && onSelectTag) {
      onSelectTag("");
    }
  };

  const navLinks = [
    { name: "Library", icon: BookOpen, count: "30", color: "text-primary" },
    { name: "Quest", icon: Trophy, count: "New", color: "text-amber-400" },
    { name: "Explore", icon: Globe, count: undefined, color: "text-sky-400" },
    { name: "Study Plan", icon: GraduationCap, count: "4", color: "text-emerald-400" },
  ];

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0 flex flex-col bg-card/60 lg:bg-[#0D0D12] border-r border-border/70 text-card-foreground rounded-lg lg:rounded-none h-full">
      <ScrollArea className="flex-1 px-3 py-4">
        {/* Navigation Links */}
        <div className="space-y-1 mb-5">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Main
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => onSelectNav && onSelectNav(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-secondary text-foreground font-semibold shadow-sm border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : item.color}`} />
                  <span>{item.name}</span>
                </div>
                {item.count && (
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 h-4 border-border/80 ${
                      isActive ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground"
                    }`}
                  >
                    {item.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        <Separator className="my-3 bg-border/60" />

        {/* My Lists Section */}
        <div className="space-y-1 mb-5">
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              My Lists
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground hover:text-primary hover:bg-secondary rounded"
                  title="Create new list"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Create New List</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Organize your coding practice by company, topic, or priority.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-3">
                  <div className="space-y-2">
                    <Label htmlFor="list-name" className="text-xs text-foreground">
                      List Name
                    </Label>
                    <Input
                      id="list-name"
                      placeholder="e.g. Meta Frontend Prep"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="bg-background border-border"
                      autoFocus
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-border text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateList}
                    disabled={!newListName.trim()}
                    className="bg-primary text-primary-foreground text-xs hover:bg-primary/90 font-medium"
                  >
                    Create List
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-0.5">
            {lists.map((list) => {
              const isSelected = selectedList === list.name;
              return (
                <button
                  key={list.id}
                  onClick={() => onSelectList && onSelectList(isSelected ? "" : list.name)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors group ${
                    isSelected
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <ListCheck className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                    <span className="truncate">{list.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] text-muted-foreground/80">{list.count}</span>
                    {list.isPrivate ? (
                      <Lock className="w-3 h-3 text-muted-foreground/60" />
                    ) : (
                      <Globe2 className="w-3 h-3 text-muted-foreground/60" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Separator className="my-3 bg-border/60" />

        {/* Saved by me Section */}
        <div className="space-y-2 mb-4">
          <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase flex items-center justify-between">
            <span>Saved by me</span>
            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-border text-muted-foreground">
              {savedTopics.length}
            </Badge>
          </div>

          <div className="space-y-1 px-1">
            {savedTopics.map((topic) => {
              const isSelected = selectedTag === topic;
              return (
                <div
                  key={topic}
                  onClick={() => onSelectTag && onSelectTag(isSelected ? "" : topic)}
                  className={`flex items-center justify-between px-2.5 py-1 rounded-md text-xs cursor-pointer transition-colors group ${
                    isSelected
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Bookmark className={`w-3 h-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="truncate">{topic}</span>
                  </div>
                  <button
                    onClick={(e) => handleRemoveSavedTopic(e, topic)}
                    className="opacity-0 group-hover:opacity-100 hover:text-destructive p-0.5 rounded transition-opacity"
                    title={`Remove ${topic}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            {savedTopics.length === 0 && (
              <p className="text-[11px] text-muted-foreground/60 px-2.5 py-1 italic">
                No saved tags yet. Click any tag badge in problems to save.
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
