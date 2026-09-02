import { Metadata } from "next";
import { ProblemsPage } from "@/components/problems/ProblemsPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Problems — Staqor In-Browser Coding Challenges",
  description: "Browse 30+ algorithms, frontend DOM, database, and system challenges scored by AI.",
};

export default function ProblemsAliasRoute() {
  return <ProblemsPage />;
}
