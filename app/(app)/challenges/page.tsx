import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Terminal, ArrowRight, Code2 } from "lucide-react";

export default function ChallengesBrowserPage() {
  const sampleChallenges = [
    {
      slug: "responsive-pricing-table",
      title: "Interactive Pricing Table with Toggle",
      track: "html-css",
      difficulty: "easy",
      solves: 1420,
    },
    {
      slug: "kanban-drag-and-drop",
      title: "Kanban Board with Native DOM Drag & Drop",
      track: "javascript",
      difficulty: "medium",
      solves: 830,
    },
    {
      slug: "accessible-tabs-component",
      title: "WAI-ARIA Compliant Tabs with Keyboard Nav",
      track: "react",
      difficulty: "hard",
      solves: 412,
    },
  ];

  return (
    <div className="mode-app min-h-screen bg-background text-foreground">
      {/* App Header */}
      <header className="border-b border-border bg-card/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-bold text-base">Staqor</span>
            </Link>
            <span className="text-muted-foreground text-xs font-mono">/ challenges</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="outline" className="text-xs border-border">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Challenge Catalog</h1>
            <p className="text-sm text-muted-foreground">
              Real-world UI & component challenges scored by Groq AI.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search challenges..." className="pl-9 bg-card border-border text-sm" />
            </div>
          </div>
        </div>

        {/* Tracks Filter */}
        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="all">All Tracks</TabsTrigger>
              <TabsTrigger value="html-css">HTML & CSS</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript DOM</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="vue">Vue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Challenge Cards Grid */}
        <div className="space-y-3">
          {sampleChallenges.map((ch) => (
            <Link key={ch.slug} href={`/challenges/${ch.slug}`}>
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {ch.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] uppercase font-mono border-border">
                          {ch.track}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[10px] uppercase font-mono ${
                            ch.difficulty === "easy"
                              ? "text-success border-success/30"
                              : ch.difficulty === "medium"
                              ? "text-warning border-warning/30"
                              : "text-destructive border-destructive/30"
                          }`}
                        >
                          {ch.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{ch.solves} solves</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Solve Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
