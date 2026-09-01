import { getChallengeBySlug } from "@/lib/supabase/db";
import { WorkspaceContainer } from "@/components/editor/WorkspaceContainer";

interface WorkspacePageProps {
  params: { slug: string };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const challenge = await getChallengeBySlug(params.slug);

  return <WorkspaceContainer challenge={challenge} />;
}
