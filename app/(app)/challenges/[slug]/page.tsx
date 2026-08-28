import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Send, RotateCcw, ArrowLeft, Terminal, ShieldAlert } from "lucide-react";

interface WorkspacePageProps {
  params: { slug: string };
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  return (
    <div className="mode-workspace min-h-screen bg-background text-foreground flex flex-col h-screen overflow-hidden">
      {/* Workspace Navigation Bar */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/challenges" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <span className="font-semibold text-xs text-foreground tracking-tight">
            {params.slug.replace(/-/g, " ").toUpperCase()}
          </span>
          <Badge variant="outline" className="text-[10px] uppercase font-mono text-success border-success/30">
            EASY
          </Badge>
          <Badge variant="outline" className="text-[10px] uppercase font-mono border-border">
            HTML/CSS
          </Badge>
        </div>

        {/* Quota Indicators & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground font-mono mr-2">
            <span>Runs: <strong className="text-foreground">0/5</strong></span>
            <span>Submits: <strong className="text-foreground">0/3</strong></span>
          </div>

          <Button variant="outline" size="sm" className="h-8 text-xs border-border gap-1">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button variant="outline" size="sm" className="h-8 text-xs border-primary/50 text-primary hover:bg-primary/10 gap-1">
            <Play className="w-3.5 h-3.5" />
            <span>RUN</span>
          </Button>

          <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1">
            <Send className="w-3.5 h-3.5" />
            <span>SUBMIT</span>
          </Button>
        </div>
      </header>

      {/* 40% / 60% Split Workspace Anatomy */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 40% Left Pane: Spec / Design / Rubric Tabs */}
        <div className="w-full md:w-[40%] border-r border-border bg-card/40 flex flex-col overflow-hidden">
          <Tabs defaultValue="spec" className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-border px-3 bg-card shrink-0">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                <TabsTrigger value="spec" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-2 text-xs">
                  Problem Spec
                </TabsTrigger>
                <TabsTrigger value="rubric" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-2 text-xs">
                  Grading Rubric
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-2 text-xs">
                  AI Feedback
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="spec" className="flex-1 overflow-y-auto p-6 space-y-4 m-0 text-sm">
              <h2 className="text-lg font-bold text-foreground">Challenge Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                Build an interactive component matching the provided specifications. Make sure your layout is responsive and all interaction events are handled.
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h3 className="font-semibold text-xs text-primary uppercase tracking-wider mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Clean semantic HTML markup</li>
                  <li>Responsive flexbox/grid layout</li>
                  <li>Proper hover and active states</li>
                  <li>Accessible keyboard navigation</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="rubric" className="flex-1 overflow-y-auto p-6 space-y-3 m-0 text-sm">
              <h2 className="text-lg font-bold text-foreground">Evaluation Criteria</h2>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">Design & Layout Fidelity</span>
                    <p className="text-[11px] text-muted-foreground">Proper spacing, typography and alignment</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 text-xs font-mono">35%</Badge>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">Functionality & Logic</span>
                    <p className="text-[11px] text-muted-foreground">Event handling and component state</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 text-xs font-mono">35%</Badge>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">Code Quality & Cleanliness</span>
                    <p className="text-[11px] text-muted-foreground">Maintainability and semantic standards</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 text-xs font-mono">30%</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="flex-1 overflow-y-auto p-6 m-0 text-sm">
              <div className="text-center py-12 text-muted-foreground">
                <Terminal className="w-8 h-8 mx-auto mb-3 opacity-40 text-primary" />
                <p className="text-xs">Click <strong>RUN</strong> to receive instant AI diagnostic feedback.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 60% Right Pane: Monaco Tab Bar & Sandboxed Preview */}
        <div className="w-full md:w-[60%] flex flex-col overflow-hidden bg-background">
          {/* Editor Header / Tabs */}
          <div className="h-10 border-b border-border bg-card flex items-center justify-between px-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 bg-secondary text-primary rounded-t border-t border-x border-border font-medium">
                index.html
              </span>
              <span className="px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer">
                styles.css
              </span>
              <span className="px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer">
                script.js
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Monaco Editor v0.46</span>
          </div>

          {/* Monaco Editor Placeholder (Wired up in Phase 2) */}
          <div className="flex-1 bg-[#0D0D12] p-4 font-mono text-xs text-muted-foreground flex flex-col justify-between border-b border-border overflow-hidden">
            <pre className="text-foreground/80">
              <code>{`<!-- HTML Starter Code -->
<div class="pricing-card">
  <h2>Pro Plan</h2>
  <span class="price">$15/mo</span>
  <button id="toggle-btn">Select Plan</button>
</div>`}</code>
            </pre>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>Full Monaco editor integration initialized in Phase 2</span>
            </div>
          </div>

          {/* Sandboxed Live Preview Header & Frame */}
          <div className="h-1/2 flex flex-col bg-background">
            <div className="h-8 border-b border-border bg-card/60 px-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>SANDBOX PREVIEW</span>
              <span className="flex items-center gap-1 text-[10px] text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Isolated Sandbox Active
              </span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center bg-[#07070A]">
              <div className="text-center text-xs text-muted-foreground space-y-1">
                <ShieldAlert className="w-6 h-6 mx-auto text-primary/60 mb-2" />
                <p>Sandboxed Iframe Viewport (allow-scripts allow-modals)</p>
                <p className="text-[11px] text-muted-foreground/70">Zero server execution — 100% client-side</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
