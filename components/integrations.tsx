import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, Code2, Cpu, ShieldCheck, Database, Layout, Sparkles } from "lucide-react";
import Link from "next/link";

type Integration = {
  icon: any;
  name: string;
  category: string;
  description: string;
};

const integrationsData: Integration[] = [
  {
    icon: Code2,
    name: "Monaco Editor v0.46",
    category: "IDE Runtime",
    description: "Multi-tab HTML, CSS, and JS editor with scoped scaffolding locks and syntax highlighting.",
  },
  {
    icon: Cpu,
    name: "Automated AI Evaluation Engine",
    category: "AI Evaluation",
    description: "High-throughput evaluation models scoring design fidelity, DOM logic, and code quality in <2.5s.",
  },
  {
    icon: ShieldCheck,
    name: "Client-Side Sandbox",
    category: "Security & Execution",
    description: "Isolated iframe sandbox with 2000ms loop-killer wrapper and zero server attack surface.",
  },
  {
    icon: Database,
    name: "Supabase & Postgres",
    category: "Auth & Portfolio DB",
    description: "Secure session cookies, GitHub/Google OAuth, and verified candidate portfolio records.",
  },
];

export function Integrations() {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-5xl gap-3 overflow-hidden rounded-2xl bg-[#0E0E14] p-3 sm:grid-cols-2 lg:grid-cols-4 border border-[#26262E]"
      )}
    >
      {integrationsData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            className={cn(
              "group relative flex flex-col justify-between gap-4 rounded-xl bg-[#111117] p-6 border border-[#26262E] hover:border-[#ABDAC8]/40 transition-all shadow-md"
            )}
            key={item.name}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#ABDAC8]/10 border border-[#ABDAC8]/25 flex items-center justify-center text-[#ABDAC8]">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#9CA3AF] uppercase bg-[#16161F] px-2 py-0.5 rounded border border-[#26262E]">
                {item.category}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-[#F5F5F7] group-hover:text-[#ABDAC8] transition-colors">
                {item.name}
              </h3>
              <p className="text-[#9CA3AF] text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}

      <div className="relative flex items-center justify-center p-2 sm:col-span-2 lg:col-span-4 border-t border-[#26262E]/60 pt-3">
        <Link href="/challenges">
          <Button className="group text-xs font-mono text-[#ABDAC8] hover:text-[#F5F5F7] gap-1" size="sm" variant="link">
            <span>Explore All 8 Practice Tracks & Tech Stacks</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
