import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import IDEClient from "./IDEClient";

export default async function ProblemIDEPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: problem, error } = await supabase
    .from("problems")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !problem) {
    return notFound();
  }

  // Get user info
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col">
      <header className="h-14 border-b border-white/10 flex items-center px-4 shrink-0">
        <h1 className="font-semibold text-lg">{problem.title}</h1>
        <div className="ml-4 text-xs px-2 py-1 bg-white/5 rounded text-muted-foreground">
          {problem.difficulty}
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 border-r border-white/10 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{problem.title}</h2>
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: problem.description }} />
        </div>
        <div className="w-2/3 flex flex-col">
          <IDEClient problem={problem} user={user} />
        </div>
      </div>
    </div>
  );
}
