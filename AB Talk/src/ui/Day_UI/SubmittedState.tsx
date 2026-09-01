'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SubmittedState() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
      <CardContent className="p-6">
        <div className="p-6 rounded-field bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="font-bold text-white text-lg">Proof Submitted Successfully!</h3>
          <p className="text-xs text-zinc-300">Your streak has been updated (+1 Day). Copy your auto-drafted LinkedIn post below to share your progress!</p>
        </div>
      </CardContent>
    </Card>
  );
}
