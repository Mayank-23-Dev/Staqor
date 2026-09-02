"use client";

import React from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#111117] group-[.toaster]:text-[#F5F5F7] group-[.toaster]:border-[#26262E] group-[.toaster]:shadow-2xl font-sans",
          description: "group-[.toast]:text-zinc-400",
          actionButton:
            "group-[.toast]:bg-[#A7DDC9] group-[.toast]:text-[#0A0A0F] font-bold",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
