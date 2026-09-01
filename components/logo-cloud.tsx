import React from "react";

export function LogoCloud() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 rounded-2xl bg-[#0E0E14] p-2 border border-[#26262E]">
      {logos.map((logo) => (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-[#26262E]/70 bg-[#111117] py-4 px-3 hover:border-[#ABDAC8]/40 hover:bg-[#16161F] transition-all group"
          key={logo.name}
        >
          <span className="text-xs font-mono font-bold tracking-wider text-[#9CA3AF] group-hover:text-[#ABDAC8] transition-colors">
            {logo.name}
          </span>
          <span className="text-[9px] font-mono text-[#6B7280] uppercase mt-0.5">
            {logo.role}
          </span>
        </div>
      ))}
    </div>
  );
}

const logos = [
  { name: "VERCEL", role: "Edge Hosting" },
  { name: "SUPABASE", role: "Auth & DB" },
  { name: "AI ENGINE", role: "Rubric Judge" },
  { name: "MONACO", role: "Code Editor" },
  { name: "TYPESCRIPT", role: "Type Safety" },
  { name: "REACT 18", role: "Component UI" },
  { name: "TAILWIND", role: "Design Tokens" },
  { name: "GITHUB", role: "OAuth & Sync" },
];
