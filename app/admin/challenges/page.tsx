import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Terminal, Edit3, ArrowLeft } from "lucide-react";

export default function AdminChallengesPage() {
  return (
    <div className="mode-app min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-bold text-base">Staqor Admin</span>
            </Link>
            <span className="text-muted-foreground text-xs font-mono">/ challenge-studio</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/sandbox-tester">
              <Button size="sm" variant="outline" className="text-xs border-border">
                Sandbox Tester
              </Button>
            </Link>
            <Button size="sm" className="bg-primary text-primary-foreground text-xs gap-1">
              <Plus className="w-3.5 h-3.5" />
              New Challenge
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Challenge Studio CRUD</h1>
          <p className="text-sm text-muted-foreground">
            Author and manage challenge specifications, starter code, model solutions, and rubrics.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Interactive Pricing Table with Toggle</CardTitle>
                <CardDescription className="text-xs">slug: responsive-pricing-table • Track: HTML/CSS</CardDescription>
              </div>
              <Badge variant="outline" className="text-success border-success/30 text-xs">ACTIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground font-mono">Rubric: 3 Criteria (35% / 35% / 30%)</span>
            <Button size="sm" variant="outline" className="h-8 text-xs border-border gap-1.5">
              <Edit3 className="w-3.5 h-3.5" />
              Edit Challenge
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
