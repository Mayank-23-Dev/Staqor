"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Play, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function IDEClient({ problem, user }: { problem: any; user: any }) {
  const boilerplateHtml = problem.boilerplate_html || "";
  const boilerplateCss = problem.boilerplate_css || "";
  const jsPrefix = problem.boilerplate_js_prefix || "";
  const jsSuffix = problem.boilerplate_js_suffix || "";
  const starterJs = problem.editable_js_starter || "";
  const testCases = problem.test_cases || []; // Array of { code: string, expected: any, description: string }

  const [jsCode, setJsCode] = useState(starterJs);
  
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("js");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === 'TEST_RESULTS') {
      const results = event.data.results;
      const passed = event.data.passed;
      
      setEvaluationResult({
        score: passed ? 100 : 0,
        passed,
        overall_feedback: passed ? "All tests passed!" : "Some tests failed.",
        breakdown: results.map((r: any, idx: number) => ({
          rubric_id: `test-${idx}`,
          name: r.description || `Test ${idx + 1}`,
          score: r.passed ? 100 : 0,
          feedback: r.passed ? "Passed" : `Expected ${JSON.stringify(r.expected)}, but got ${JSON.stringify(r.actual)}`
        }))
      });
      
      setIsSubmitting(false);

      if (event.data.attemptType === "submit" && passed) {
        saveSubmission();
      } else if (event.data.attemptType === "submit") {
        toast.error("Solution failed tests. See feedback below.");
      } else {
        toast.info("Run evaluation complete");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [jsCode]); // rebind if needed, but jsCode is captured in saveSubmission via closure, wait, saveSubmission needs current jsCode.
  // Actually, better to move saveSubmission outside or use a ref.

  const jsCodeRef = useRef(jsCode);
  jsCodeRef.current = jsCode;

  const saveSubmission = async () => {
    try {
      const fullJs = `${jsPrefix}\n${jsCodeRef.current}\n${jsSuffix}`;
      const { error: subError } = await supabase.from("submissions").insert({
        user_id: user.id,
        problem_id: problem.id,
        status: "solved",
        // Save both the full and the editable portions
        submitted_code: JSON.stringify({ 
          html: boilerplateHtml, 
          css: boilerplateCss, 
          full_js: fullJs,
          editable_js: jsCodeRef.current 
        }),
      });

      if (subError) throw subError;

      // Update stats
      const { data: statsData, error: statsError } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const today = new Date().toISOString().split('T')[0];

      if (statsError && statsError.code === "PGRST116") {
        await supabase.from("user_stats").insert({
          user_id: user.id,
          current_streak: 1,
          total_solved: 1,
          coins: 10,
          last_active_date: today,
        });
      } else if (statsData) {
        let newStreak = statsData.current_streak;
        if (statsData.last_active_date !== today) {
          const lastActive = new Date(statsData.last_active_date);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }
        await supabase
          .from("user_stats")
          .update({
            current_streak: newStreak,
            total_solved: statsData.total_solved + 1,
            coins: statsData.coins + 10,
            last_active_date: today,
          })
          .eq("user_id", user.id);
      }

      toast.success("Solution accepted! +10 Coins");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to process code.");
    }
  };

  const updatePreviewAndRunTests = (attemptType: "run" | "submit") => {
    if (!iframeRef.current) return;
    
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    const fullJs = `${jsPrefix}\n${jsCode}\n${jsSuffix}`;
    
    // Inject test runner code
    const testRunner = `
      try {
        const testCases = ${JSON.stringify(testCases)};
        const results = testCases.map(tc => {
          try {
            // Using a simple eval for the test execution. The test case 'code' should evaluate to a value that matches 'expected'.
            const actual = eval(tc.code);
            // Simple deep equality for basic types (objects/arrays/primitives)
            const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
            return { ...tc, actual, passed };
          } catch (e) {
            return { ...tc, actual: e.toString(), passed: false };
          }
        });
        const allPassed = results.every(r => r.passed);
        window.parent.postMessage({ type: 'TEST_RESULTS', results, passed: allPassed, attemptType: '${attemptType}' }, '*');
      } catch (e) {
        window.parent.postMessage({ type: 'TEST_RESULTS', results: [{ description: 'Execution Error', passed: false, expected: 'No errors', actual: e.toString() }], passed: false, attemptType: '${attemptType}' }, '*');
      }
    `;

    const source = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${boilerplateCss}</style>
        </head>
        <body>
          ${boilerplateHtml}
          <script>
            try {
              ${fullJs}
            } catch (err) {
              window.parent.postMessage({ type: 'TEST_RESULTS', results: [{ description: 'Syntax/Runtime Error', passed: false, expected: 'No errors', actual: err.toString() }], passed: false, attemptType: '${attemptType}' }, '*');
            }
          </script>
          <script>
            ${testRunner}
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(source);
    doc.close();
  };

  useEffect(() => {
    // Initial preview without running tests (just visual)
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;
    const fullJs = `${jsPrefix}\n${jsCode}\n${jsSuffix}`;
    const source = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${boilerplateCss}</style>
        </head>
        <body>
          ${boilerplateHtml}
          <script>${fullJs}</script>
        </body>
      </html>
    `;
    doc.open();
    doc.write(source);
    doc.close();
  }, []);

  const handleSubmit = (attemptType: "run" | "submit") => {
    if (!user && attemptType === "submit") {
      toast.error("You must be logged in to submit.");
      return;
    }
    
    setIsSubmitting(true);
    setEvaluationResult(null);
    updatePreviewAndRunTests(attemptType);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1E1E]">
      <div className="flex items-center gap-2 p-2 bg-[#2D2D2D] border-b border-white/10">
        <button
          onClick={() => setActiveTab("html")}
          className={`px-3 py-1 rounded text-sm ${activeTab === "html" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          HTML (Read Only)
        </button>
        <button
          onClick={() => setActiveTab("css")}
          className={`px-3 py-1 rounded text-sm ${activeTab === "css" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          CSS (Read Only)
        </button>
        <button
          onClick={() => setActiveTab("js")}
          className={`px-3 py-1 rounded text-sm ${activeTab === "js" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"}`}
        >
          JavaScript
        </button>
      </div>

      <div className="flex-1 flex min-h-[400px]">
        {/* Editor Area */}
        <div className="w-1/2 h-full border-r border-white/10 flex flex-col">
          {activeTab === "html" && (
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={boilerplateHtml}
              options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 }, readOnly: true }}
            />
          )}
          {activeTab === "css" && (
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={boilerplateCss}
              options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 }, readOnly: true }}
            />
          )}
          {activeTab === "js" && (
            <div className="flex flex-col h-full overflow-y-auto">
              {jsPrefix && (
                <div className="shrink-0 bg-black/40">
                  <Editor
                    height={Math.max(50, jsPrefix.split('\n').length * 20 + 20) + "px"}
                    language="javascript"
                    theme="vs-dark"
                    value={jsPrefix}
                    options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 }, readOnly: true, scrollBeyondLastLine: false, overviewRulerLanes: 0, hideCursorInOverviewRuler: true, scrollbar: { vertical: 'hidden', horizontal: 'hidden' }, renderLineHighlight: 'none' }}
                  />
                </div>
              )}
              <div className="flex-1 min-h-[200px]">
                <Editor
                  height="100%"
                  language="javascript"
                  theme="vs-dark"
                  value={jsCode}
                  onChange={(val) => setJsCode(val || "")}
                  options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: jsPrefix ? 0 : 16, bottom: jsSuffix ? 0 : 16 }, scrollBeyondLastLine: false }}
                />
              </div>
              {jsSuffix && (
                <div className="shrink-0 bg-black/40">
                  <Editor
                    height={Math.max(50, jsSuffix.split('\n').length * 20 + 20) + "px"}
                    language="javascript"
                    theme="vs-dark"
                    value={jsSuffix}
                    options={{ minimap: { enabled: false }, fontSize: 14, padding: { bottom: 16 }, readOnly: true, scrollBeyondLastLine: false, overviewRulerLanes: 0, hideCursorInOverviewRuler: true, scrollbar: { vertical: 'hidden', horizontal: 'hidden' }, renderLineHighlight: 'none' }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Live Preview & Evaluation Area */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="flex-1 bg-white relative">
            <iframe
              ref={iframeRef}
              title="Live Preview"
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          
          {evaluationResult && (
            <div className="h-64 bg-[#2D2D2D] border-t border-white/10 p-4 overflow-y-auto">
              <h3 className="font-semibold text-lg mb-2">
                Score: {evaluationResult.score}/100 
                <span className={`ml-2 text-sm px-2 py-1 rounded ${evaluationResult.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {evaluationResult.passed ? "PASSED" : "FAILED"}
                </span>
              </h3>
              <p className="text-sm text-gray-300 mb-4">{evaluationResult.overall_feedback}</p>
              
              <div className="space-y-3">
                {evaluationResult.breakdown?.map((b: any) => (
                  <div key={b.rubric_id} className="bg-black/20 p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{b.name}</span>
                      <span className="text-xs">{b.score}/100</span>
                    </div>
                    <p className="text-xs text-gray-400">{b.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-background">
        <Button variant="secondary" onClick={() => handleSubmit("run")} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
          Run & Preview
        </Button>
        <Button onClick={() => handleSubmit("submit")} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Submit Solution
        </Button>
      </div>
    </div>
  );
}
