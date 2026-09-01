"use client";

import React, { useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { FileCode, FileType, Code2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export type EditorTab = "html" | "css" | "js";

interface CodeEditorProps {
  code: {
    html: string;
    css: string;
    js: string;
  };
  onChange: (tab: EditorTab, value: string) => void;
  onRun?: () => void;
}

export function CodeEditor({ code, onChange, onRun }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>("html");
  const [copied, setCopied] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    onChange(activeTab, value || "");
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Define Staqor dark theme for Monaco
    monaco.editor.defineTheme("staqor-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6B7280", fontStyle: "italic" },
        { token: "keyword", foreground: "ABDAC8", fontStyle: "bold" },
        { token: "string", foreground: "93C5FD" },
        { token: "number", foreground: "FCA5A5" },
        { token: "tag", foreground: "ABDAC8" },
        { token: "attribute.name", foreground: "C4B5FD" },
      ],
      colors: {
        "editor.background": "#0B0B10",
        "editor.foreground": "#E5E7EB",
        "editor.lineHighlightBackground": "#161622",
        "editorCursor.foreground": "#ABDAC8",
        "editorWhitespace.foreground": "#27273A",
        "editorIndentGuide.background": "#1E1E2D",
        "editorIndentGuide.activeBackground": "#ABDAC855",
      },
    });
    monaco.editor.setTheme("staqor-dark");

    // Add Ctrl+Enter / Cmd+Enter shortcut to trigger Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRun) {
        onRun();
      }
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getLanguage = () => {
    switch (activeTab) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0B10] overflow-hidden">
      {/* Editor Tab Bar */}
      <div className="h-10 bg-[#0E0E16] border-b border-border px-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("html")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
              activeTab === "html"
                ? "bg-[#181824] text-[#ABDAC8] font-semibold border border-border shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-[#14141E]"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-orange-400" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => setActiveTab("css")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
              activeTab === "css"
                ? "bg-[#181824] text-[#ABDAC8] font-semibold border border-border shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-[#14141E]"
            }`}
          >
            <FileType className="w-3.5 h-3.5 text-sky-400" />
            <span>style.css</span>
          </button>

          <button
            onClick={() => setActiveTab("js")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
              activeTab === "js"
                ? "bg-[#181824] text-[#ABDAC8] font-semibold border border-border shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-[#14141E]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-yellow-400" />
            <span>script.js</span>
          </button>
        </div>

        {/* Tab Right Utilities */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline text-[11px] text-muted-foreground/60 font-mono">
            Ctrl+Enter to Run
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            title="Copy current tab code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 w-full overflow-hidden">
        <Editor
          height="100%"
          language={getLanguage()}
          value={code[activeTab]}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13,
            lineNumbers: "on",
            fontFamily: "var(--font-mono, 'Fira Code', Menlo, Monaco, Consolas, monospace)",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            formatOnType: true,
            formatOnPaste: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
