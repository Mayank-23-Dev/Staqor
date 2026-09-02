"use client";

import React from "react";
import { ProblemWorkspace } from "@/components/problems/ProblemWorkspace";

export default function IDEClient({ problem, user }: { problem: any; user: any }) {
  return <ProblemWorkspace problem={problem} user={user} />;
}
