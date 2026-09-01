"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { RefreshCw, Monitor, Smartphone, Tablet, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsoleLog } from "./ConsoleOutput";

interface SandboxPreviewProps {
  html: string;
  css: string;
  js: string;
  onConsoleLog: (log: ConsoleLog) => void;
  onClearLogs: () => void;
}

type ViewportMode = "desktop" | "tablet" | "mobile";

export function SandboxPreview({
  html,
  css,
  js,
  onConsoleLog,
  onClearLogs,
}: SandboxPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [key, setKey] = useState(0);

  // Compile full iframe srcdoc with sandbox runtime environment
  const compiledDoc = useMemo(() => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset & Base Sandbox Styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #07070A;
      color: #F3F4F6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
    }
    ${css || ""}
  </style>
</head>
<body>
  ${html || ""}

  <script>
    (function() {
      // 1. Console Interception -> postMessage to parent sandbox container
      function sendToParent(type, args) {
        try {
          const serialized = Array.from(args).map(arg => {
            if (typeof arg === "object" && arg !== null) {
              try { return JSON.stringify(arg, null, 2); } catch (e) { return String(arg); }
            }
            return String(arg);
          }).join(" ");
          
          window.parent.postMessage({
            type: "STAQOR_SANDBOX_LOG",
            logType: type,
            message: serialized,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }, "*");
        } catch (err) {}
      }

      const originalLog = console.log;
      const originalInfo = console.info;
      const originalWarn = console.warn;
      const originalError = console.error;

      console.log = function() { originalLog.apply(console, arguments); sendToParent("log", arguments); };
      console.info = function() { originalInfo.apply(console, arguments); sendToParent("info", arguments); };
      console.warn = function() { originalWarn.apply(console, arguments); sendToParent("warn", arguments); };
      console.error = function() { originalError.apply(console, arguments); sendToParent("error", arguments); };

      // 2. Global Error Boundary Catch
      window.onerror = function(message, source, lineno, colno, error) {
        sendToParent("error", ["Runtime Error: " + message + " (line " + lineno + ")"]);
        return false;
      };

      // 3. Execute User JS
      try {
        ${js || ""}
      } catch (err) {
        console.error(err.message || String(err));
      }
    })();
  </script>
</body>
</html>
    `;
  }, [html, css, js, key]);

  // Listen for console logs posted from the sandboxed iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "STAQOR_SANDBOX_LOG") {
        onConsoleLog({
          id: Math.random().toString(36).substring(2, 9),
          type: event.data.logType,
          message: event.data.message,
          timestamp: event.data.timestamp,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onConsoleLog]);

  const handleRefresh = () => {
    onClearLogs();
    setKey((prev) => prev + 1);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[640px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050508] overflow-hidden">
      {/* Sandbox Header / Controls */}
      <div className="h-9 bg-[#0C0C12] border-b border-border px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-mono text-primary font-semibold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Sandbox
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Isolated Runtime
          </span>
        </div>

        {/* Viewport size switcher & Refresh button */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-secondary/60 rounded p-0.5 border border-border">
            <Button
              variant={viewport === "desktop" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("desktop")}
              className="h-6 w-6 p-0"
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={viewport === "tablet" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("tablet")}
              className="h-6 w-6 p-0"
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={viewport === "mobile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("mobile")}
              className="h-6 w-6 p-0"
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
            title="Re-execute Sandbox Runtime"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Re-run</span>
          </Button>
        </div>
      </div>

      {/* Sandboxed iframe viewport container */}
      <div className="flex-1 flex items-center justify-center p-2 bg-[#050508] overflow-auto">
        <div
          className={`h-full ${getViewportWidth()} w-full bg-[#07070A] rounded-md border border-border/70 overflow-hidden shadow-2xl transition-all duration-200`}
        >
          <iframe
            key={key}
            ref={iframeRef}
            srcDoc={compiledDoc}
            title="Staqor Interactive Sandbox"
            sandbox="allow-scripts allow-modals"
            className="w-full h-full border-0 bg-[#07070A]"
          />
        </div>
      </div>
    </div>
  );
}
