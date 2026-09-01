'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-3xl rounded-box bg-[#1a1a1a] border border-[#2a2a2a] p-6 relative overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#2a2a2a] text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold uppercase tracking-wider text-[#e8602e] mb-2">ABTalks Platform Walkthrough</div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">How Student Proof-of-Work Works</h3>
            <div className="aspect-video bg-[#0f0f0f] rounded-field border border-zinc-800 flex items-center justify-center relative">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#e8602e]/20 border border-[#e8602e] flex items-center justify-center text-[#e8602e] mx-auto mb-4">
                  <Play className="w-8 h-8 fill-[#e8602e] ml-1" />
                </div>
                <div className="text-white font-bold text-lg mb-1">ABTalks 60-Day Challenge & AI Cohort Overview</div>
                <div className="text-xs text-zinc-400">Daily Scoped Building • GitHub Verification • LinkedIn Auto-Captioning</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
