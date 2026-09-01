'use client';

import React from 'react';
import { Navbar } from '@/ui/shared';
import {
  Hero,
  TrustStrip,
  ProgramCards,
  HowItWorks,
  WhyABTalks,
  CommunityCTA,
  Testimonials,
  FAQ,
  Footer
} from '@/ui/Landing_UI';

export default function HomePage() {
  return (
    <div className="min-h-screen text-white font-sans relative overflow-x-hidden">
      {/* Shared Navigation Header */}
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Stats Trust Strip */}
        <TrustStrip />

        {/* 3. Featured Programs & Challenges */}
        <ProgramCards />

        {/* 4. How ABTalks Works */}
        <HowItWorks />

        {/* 5. Why ABTalks Comparison */}
        <WhyABTalks />

        {/* 6. Community CTA Band */}
        <CommunityCTA />

        {/* 7. Wall of Proof Testimonials */}
        <Testimonials />

        {/* 8. FAQ Accordion */}
        <FAQ />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
