'use client';

import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary Top-Center Ambient Glow Aura */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#e8602e]/18 via-[#e8602e]/6 to-transparent blur-[150px]" />

      {/* Hero Accent Radial Warm Aura */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,#e8602e26_0%,#e8602e08_60%,transparent_100%)] blur-[100px]" />

      {/* Secondary Bottom-Right Ambient Aura */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#e8602e]/6 blur-[180px]" />

      {/* Secondary Top-Left Subtle Ambient Glow */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#0a6df0]/5 blur-[160px]" />

      {/* Masked Fine Grid Background Layer (4rem x 4rem grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a40_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a40_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_30%,transparent_100%)]" />
    </div>
  );
}
