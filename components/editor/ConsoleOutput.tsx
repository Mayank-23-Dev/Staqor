"use client";

import React from "react";
import { Terminal, Trash2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ConsoleLog {
  id: string;
  type: "log" | "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

interface ConsoleOutputProps {
  logs: ConsoleLog[];
  onClear: () => void;
}

export function ConsoleOutput({ logs, onClear }: ConsoleOutputProps) {
  return (
    <div className="flex flex-col h-full bg-[#08080C] border-t border-border font-mono text-xs overflow-hidden">
      {/* Console Header */}
      <div className="h-7 bg-[#0E0E14] px-3 border-b border-border/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-semibold uppercase tracking-wider text-foreground/80">Sandbox Console</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
            {logs.length} logs
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-5 px-1.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary gap-1"
          title="Clear console"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </Button>
      </div>

      {/* Console Log Items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 select-text">
        {logs.length === 0 ? (
          <div className="text-muted-foreground/50 italic py-4 text-center text-[11px]">
            No console output. Call <code className="text-primary/70">console.log(...)</code> in your JavaScript code.
          </div>
        ) : (
          logs.map((log) => {
            let Icon = Terminal;
            let textClass = "text-foreground/90";
            let bgClass = "bg-transparent";

            if (log.type === "error") {
              Icon = AlertCircle;
              textClass = "text-rose-400";
              bgClass = "bg-rose-950/20 border-l-2 border-rose-500 pl-1.5";
            } else if (log.type === "warn") {
              Icon = AlertTriangle;
              textClass = "text-amber-400";
              bgClass = "bg-amber-950/20 border-l-2 border-amber-500 pl-1.5";
            } else if (log.type === "info") {
              Icon = Info;
              textClass = "text-cyan-400";
              bgClass = "bg-cyan-950/20 border-l-2 border-cyan-500 pl-1.5";
            }

            return (
              <div
                key={log.id}
                className={`flex items-start gap-2 py-0.5 px-1 rounded ${bgClass} font-mono text-[11px] leading-relaxed`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${textClass}`} />
                <span className="text-muted-foreground/60 text-[10px] shrink-0">{log.timestamp}</span>
                <span className={`break-all whitespace-pre-wrap ${textClass}`}>{log.message}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
