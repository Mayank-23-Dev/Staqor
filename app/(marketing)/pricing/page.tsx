import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Terminal, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="mode-landing min-h-screen bg-background text-foreground py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="text-primary border-primary/30 mb-4">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Invest in Your Frontend Career
          </h1>
          <p className="text-muted-foreground text-base">
            Start for free with 5 runs and 3 submits per challenge. Upgrade to Pro for unlimited AI evaluations and verified portfolio badges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <Card className="bg-card border-border flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Free Starter</CardTitle>
              <CardDescription className="text-muted-foreground">For exploring challenges and fundamentals</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-foreground">$0</span>
                <span className="text-muted-foreground text-sm"> / forever</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-4">
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Access all free tier challenges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>5 Runs & 3 Submits lifetime per challenge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Groq AI rubric feedback & scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Public portfolio replay for passed tasks</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="outline" className="w-full border-border hover:bg-muted">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="bg-card border-primary/40 relative flex flex-col shadow-lg shadow-primary/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Staqor Pro</CardTitle>
              <CardDescription className="text-muted-foreground">For active job seekers & portfolio building</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-foreground">$15</span>
                <span className="text-muted-foreground text-sm"> / month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-4">
              <ul className="space-y-3 text-sm text-foreground mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">Unlimited Runs & Submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Immediate Model Solution unlocking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Verified Candidate Recruiter Badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Priority Groq LPU inference queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Advanced Vue & React track challenges</span>
                </li>
              </ul>

              <Link href="/signup?plan=pro">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Upgrade to Pro
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise / Team Tier */}
          <Card className="bg-card border-border flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription className="text-muted-foreground">For hiring teams & bootcamp cohorts</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-foreground">Custom</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-4">
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Custom company interview rubrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Dedicated candidate assessment dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Team analytics and grading audit logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Dedicated Slack & priority SLA support</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full border-border hover:bg-muted">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
