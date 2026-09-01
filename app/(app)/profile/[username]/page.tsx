import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, Award, CheckCircle2, ArrowLeft, ExternalLink } from "lucide-react";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        <Link href="/challenges" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to challenges
        </Link>

        {/* Profile Card Header */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xl font-bold font-mono">
                {params.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{params.username}</h1>
                  <Badge variant="outline" className="text-primary border-primary/30 text-[10px] font-mono">
                    VERIFIED CANDIDATE
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Frontend Software Engineer Portfolio • Powered by Staqor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <div className="text-right">
                <span className="block text-foreground font-bold text-base">100%</span>
                <span>AI Rubric Verified</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Verified Submissions Replay Section */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Verified Live Solutions
          </h2>

          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Interactive Pricing Table with Toggle</CardTitle>
                  <Badge variant="outline" className="text-success border-success/30 text-xs font-mono">
                    SCORE: 92/100 (PASSED)
                  </Badge>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  Graded by Automated AI on Functional Correctness, Event Handling, and Architecture.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-secondary/60 border border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono">Interactive Sandboxed Replay Available</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-primary/40 text-primary gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Live Replay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
