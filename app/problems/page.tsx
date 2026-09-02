import { Metadata } from "next";
import { ProblemsPage } from "@/components/problems/ProblemsPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Problems — Staqor In-Browser Coding Challenges",
  description: "Browse 50 structured HTML, CSS, JavaScript, and Web API challenges scored by automated AI rubrics.",
};

export default function ProblemsAliasRoute() {
  return <ProblemsPage />;
}
