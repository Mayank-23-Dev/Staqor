"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";
import { PromoBanners } from "./PromoBanners";
import { TopicFilters } from "./TopicFilters";
import { ProblemsTable } from "./ProblemsTable";

export function ProblemsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedList, setSelectedList] = useState<string>("");
  const [activeNav, setActiveNav] = useState<string>("Library");

  const handleSelectTag = (tag: string) => {
    setSelectedTopic(tag);
  };

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const handleSelectList = (list: string) => {
    setSelectedList(list);
  };

  const handleSelectNav = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <div className="mode-app min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col selection:bg-primary selection:text-primary-foreground">
      {/* Top Navbar */}
      <Navbar
        onSelectList={handleSelectList}
        onSelectTag={handleSelectTag}
        onSelectCompany={handleSelectCompany}
      />

      {/* Main Responsive Layout */}
      <div className="flex-1 container mx-auto px-2 sm:px-4 lg:px-6 py-4 flex gap-5 max-w-[1600px]">
        {/* 1. Left Sidebar (Fixed ~260px on Desktop, Hidden on Mobile/Tablet) */}
        <div className="hidden lg:block w-[260px] flex-shrink-0 self-start sticky top-20 rounded-lg overflow-hidden border border-border/70 shadow-sm">
          <Sidebar
            selectedList={selectedList}
            onSelectList={handleSelectList}
            selectedTag={selectedTopic}
            onSelectTag={handleSelectTag}
            activeNav={activeNav}
            onSelectNav={handleSelectNav}
          />
        </div>

        {/* 2. Center Main Content Area */}
        <main className="flex-1 min-w-0 space-y-4">
          {/* Top Promo Banner Carousel */}
          <PromoBanners />

          {/* Topic Filter Chips Row */}
          <TopicFilters
            selectedTopic={selectedTopic}
            onSelectTopic={handleSelectTag}
          />

          {/* Problems Table & Controls */}
          <ProblemsTable
            selectedTopic={selectedTopic}
            selectedCompany={selectedCompany}
            selectedList={selectedList}
          />
        </main>

        {/* 3. Right Sidebar (Natural height expansion, no clipping) */}
        <aside className="hidden lg:block w-[300px] flex-shrink-0 self-start space-y-4">
          <RightSidebar
            selectedCompany={selectedCompany}
            onSelectCompany={handleSelectCompany}
          />
        </aside>
      </div>
    </div>
  );
}
