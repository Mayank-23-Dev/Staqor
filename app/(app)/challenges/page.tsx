import Link from "next/link";
import { Terminal, LayoutDashboard, Code, Sparkles } from "lucide-react";
import { getAllChallenges, getUserChallengeStats } from "@/lib/supabase/db";
import { getCurrentUser } from "@/lib/auth";
import { UserNav } from "@/components/navigation/UserNav";
import { ChallengesCatalogView } from "@/components/challenges/ChallengesCatalogView";

export default async function ChallengesBrowserPage() {
  const [challenges, currentUser] = await Promise.all([
    getAllChallenges(),
    getCurrentUser(),
  ]);

  const userStats = await getUserChallengeStats(currentUser?.user?.id, challenges);

  return (
    <div className="mode-app min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col">
      {/* App Header / Chrome */}
      <header className="border-b border-[#26262E] bg-[#0D0D12] sticky top-0 z-40 h-14 shrink-0">
        <div className="w-full px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <div className="w-7 h-7 rounded-md bg-[#ABDAC8]/15 border border-[#ABDAC8]/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#ABDAC8]" />
              </div>
              <span className="font-bold text-sm tracking-tight text-[#F5F5F7]">Staqor</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/challenges"
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#ABDAC8] bg-[#1A1A22] border border-[#ABDAC8]/30"
              >
                Challenges
              </Link>
              <Link
                href="/dashboard"
                className="px-2.5 py-1 rounded-md text-xs text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-[#111117] transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main LeetCode-style 3-Column Catalog Workspace */}
      <main className="flex-1 flex flex-col min-w-0">
        <ChallengesCatalogView
          initialChallenges={challenges}
          stats={userStats}
          currentUsername={currentUser?.profile?.username || null}
          isLoggedIn={!!currentUser?.user}
        />
      </main>
    </div>
  );
}
