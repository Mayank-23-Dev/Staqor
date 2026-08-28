import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Sparkles, Terminal, Award } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="mode-landing min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Glow subtle ambient */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Nav */}
      <header className="border-b border-border/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Staqor</span>
            <Badge variant="outline" className="text-[10px] text-primary border-primary/30 ml-1">
              v1.0 MVP
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/challenges" className="hover:text-foreground transition-colors">
              Challenges
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs text-muted-foreground mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Sub-2.5s Groq AI Rubric Evaluation</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          The Coding Platform for{" "}
          <span className="text-primary font-extrabold">Frontend Engineers</span>
        </h1>

        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Master real-world DOM, CSS, and React component challenges in a sandboxed in-browser IDE.
          Get graded in seconds and build provable portfolios recruiters can replay live.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/challenges">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12">
              Start Practicing Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="border-border hover:bg-card px-8 h-12">
              View Pro Plans
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24 text-left">
          <Card className="bg-card border-border hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">In-Browser Split IDE</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                VS Code Monaco editor with multi-tab HTML/CSS/JS support and instant debounced iframe sandbox preview.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Groq AI Rubric Judge</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evaluates visual aesthetics, responsiveness, DOM manipulation, and code craftsmanship in under 2.5 seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Live Recruiter Portfolios</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Passed challenges generate verified public profiles with live interactive component replays for hiring leads.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
