import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, Play, ArrowLeft } from "lucide-react";

export default function AdminSandboxTesterPage() {
  return (
    <div className="mode-app min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/challenges" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-bold text-base">Sandbox Tester</span>
            <span className="text-muted-foreground text-xs font-mono">/ groq-dry-run</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">AI Rubric Sandbox Tester</h1>
          <p className="text-sm text-muted-foreground">
            Test challenge rubrics against model solutions and adversarial test cases before publishing.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Dry-Run Test Suite</CardTitle>
            <CardDescription className="text-xs">
              Verifies that model_solution scores 100% and empty/adversarial code scores 0%.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border font-mono text-xs text-muted-foreground">
              Ready to execute dry-run simulation against Groq LPU API.
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground gap-1.5 font-medium">
              <Play className="w-3.5 h-3.5" />
              Execute Dry-Run Test
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
