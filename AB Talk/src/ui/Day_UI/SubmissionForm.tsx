'use client';

import React from 'react';
import { GitBranch, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SubmissionFormProps {
  githubUrl: string;
  setGithubUrl: (url: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function SubmissionForm({
  githubUrl,
  setGithubUrl,
  description,
  setDescription,
  onSubmit,
  isSubmitting
}: SubmissionFormProps) {
  const isFormValid = githubUrl.trim().length > 5 && description.trim().length > 5;

  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
      <CardContent className="p-6">
        <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-[#e8602e]" />
          <span>Submit Proof of Work</span>
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              GitHub Commit URL *
            </label>
            <input
              type="url"
              placeholder="https://github.com/your-username/repo/commit/abc123"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-field bg-[#0f0f0f] border border-zinc-800 text-white text-sm focus:border-[#e8602e] focus:outline-none transition-colors font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              What did you build today? *
            </label>
            <textarea
              rows={3}
              placeholder="Brief summary of your code changes and key learnings..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-field bg-[#0f0f0f] border border-zinc-800 text-white text-sm focus:border-[#e8602e] focus:outline-none transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-gradient-to-b from-[#e8602e] via-[#e8602e] to-[#c95326] hover:from-[#f06d3b] hover:to-[#d85829] text-white font-extrabold py-3.5 rounded-field shadow-lg shadow-[#e8602e]/25 hover:shadow-xl hover:shadow-[#e8602e]/40 border border-[#ff8559]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Validating Commit...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Proof & Build Streak</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
