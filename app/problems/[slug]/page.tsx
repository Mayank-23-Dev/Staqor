import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoIcon } from "@/components/logo";
import { getProblemBySlug } from "@/lib/problems-data";
import IDEClient from "./IDEClient";

export default async function ProblemIDEPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  let problem: any = null;

  try {
    const { data: dbProblem } = await supabase
      .from("problems")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (dbProblem) {
      problem = dbProblem;
    }
  } catch (e) {
    // fallback to local dataset
  }

  if (!problem) {
    const localProblem = getProblemBySlug(params.slug);
    if (localProblem) {
      problem = {
        id: localProblem.id,
        title: `${localProblem.number}. ${localProblem.title}`,
        slug: localProblem.slug,
        difficulty: localProblem.difficulty,
        topic: localProblem.category,
        category: localProblem.category,
        description: localProblem.description,
        starter_code: localProblem.starter_code,
        model_solution: localProblem.model_solution,
      };
    }
  }

  if (!problem) {
    return notFound();
  }

  // Get user info
  let user: any = null;
  try {
    const { data: authData } = await supabase.auth.getUser();
    user = authData?.user || null;
  } catch {
    user = null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col selection:bg-[#A7DDC9] selection:text-[#0A0A0F]">
      {/* Top IDE Header Bar */}
      <header className="h-14 border-b border-border/80 flex items-center justify-between px-4 shrink-0 bg-[#0A0A0F]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group select-none"
            title="Back to problems"
          >
            <LogoIcon variant="aqua" className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="h-4 w-px bg-border/80" />
          <h1 className="font-semibold text-sm sm:text-base text-white tracking-tight">{problem.title}</h1>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
            problem.difficulty === "Easy"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : problem.difficulty === "Medium"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </header>

      {/* Main Two-Pane IDE Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Specification Pane */}
        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-border/80 p-5 lg:p-6 overflow-y-auto bg-[#0D0D12] scrollbar-thin">
          <div
            className="prose prose-invert max-w-none text-zinc-300"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        </div>

        {/* Right Code Editor & Sandbox Preview Pane */}
        <div className="w-full lg:w-7/12 flex flex-col min-h-[500px]">
          <IDEClient problem={problem} user={user} />
        </div>
      </div>
    </div>
  );
}
