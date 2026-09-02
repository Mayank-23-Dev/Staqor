import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { getProblemBySlug } from "@/lib/problems-data";
import { ProblemWorkspace } from "@/components/problems/ProblemWorkspace";

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
        folder: localProblem.folder,
        screenshot_url: localProblem.screenshot_url,
        difficulty: localProblem.difficulty,
        topic: localProblem.category,
        category: localProblem.category,
        summary: localProblem.summary,
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

  return <ProblemWorkspace problem={problem} user={user} />;
}
