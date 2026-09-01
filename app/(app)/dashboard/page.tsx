import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Terminal, Award, Code2, ArrowRight, Sparkles } from "lucide-react";
import { UserNav } from "@/components/navigation/UserNav";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const current = await getCurrentUser();
  const username = current?.profile?.username || (current?.user ? current.user.email?.split("@")[0] : "Developer");
  const totalSolves = current?.profile?.total_solves || 0;

  return (
    <div className="mode-app min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-border bg-card/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-bold text-base">Staqor</span>
            </Link>
            <span className="text-muted-foreground text-xs font-mono">/ dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/challenges">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium">
                Browse Challenges
              </Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10 max-w-5xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              Welcome back, <span className="text-primary">{username}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your frontend skill progression and completed portfolio components.
            </p>
          </div>

          <Link href="/challenges/interactive-pricing-card">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resume Active Challenge</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono">TOTAL SOLVES</CardDescription>
              <CardTitle className="text-3xl font-extrabold text-foreground">{totalSolves}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{totalSolves} of 20 Core Challenges Completed</p>
              <Progress value={(totalSolves / 20) * 100} className="h-1.5 mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono">ACCOUNT STATUS</CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <CardTitle className="text-2xl font-extrabold text-foreground">Active Member</CardTitle>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                  Supabase Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Unlimited live sandbox runs and code evaluation</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono">RECRUITER BADGES</CardDescription>
              <CardTitle className="text-3xl font-extrabold text-foreground">
                {totalSolves > 0 ? "1" : "0"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {totalSolves > 0
                  ? "Passed solutions available on your public profile"
                  : "Pass 1 challenge to unlock live portfolio"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Featured Sandbox Challenge</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Interactive pricing component with state toggle and responsive layout
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Interactive Pricing Card</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">EASY</Badge>
                  <span className="text-xs text-muted-foreground">HTML & CSS / JavaScript DOM</span>
                </div>
              </div>
            </div>

            <Link href="/challenges/interactive-pricing-card">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium gap-1.5">
                Open Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
