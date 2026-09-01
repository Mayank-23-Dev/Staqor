/**
 * Structural Correctness Pre-Filter Gate
 * Evaluates code for syntax errors, basic structural validity, and execution readiness
 * before spending an LLM call on full rubric grading.
 */

export interface PreFilterResult {
  passed: boolean;
  error?: string;
  reason?: string;
  breakdown?: Array<{
    rubric_id: string;
    name: string;
    score: number;
    feedback: string;
  }>;
}

export function runStructuralPreFilter(
  code: { html: string; css: string; js: string },
  challenge: {
    title?: string;
    track?: string;
    spec_markdown?: string;
    rubric?: Array<{ id: string; name: string; weight: number; criteria: string }>;
  }
): PreFilterResult {
  const { html = "", css = "", js = "" } = code;
  const track = (challenge.track || "").toLowerCase();

  // --------------------------------------------------------------------------
  // Gate 1: Non-Empty / Non-Trivial Code Check
  // --------------------------------------------------------------------------
  const totalLength = html.trim().length + css.trim().length + js.trim().length;
  if (totalLength < 10) {
    return {
      passed: false,
      error: "Empty Submission",
      reason: "No code was provided. Please write your solution before running evaluation.",
      breakdown: [
        {
          rubric_id: "prefilter_empty",
          name: "Code Presence Gate",
          score: 0,
          feedback: "Submission is empty. Please implement your solution.",
        },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // Gate 2: JavaScript Syntax & Parse Verification
  // --------------------------------------------------------------------------
  if (js && js.trim().length > 0) {
    try {
      // Validate JS syntax using the Function constructor (syntax check only)
      new Function(js);
    } catch (err: any) {
      const errorMsg = err?.message || "Invalid syntax in JavaScript code";
      return {
        passed: false,
        error: `JavaScript Syntax Error: ${errorMsg}`,
        reason: "Your JavaScript code contains a syntax error and cannot execute in the sandbox runtime.",
        breakdown: [
          {
            rubric_id: "syntax_error",
            name: "JS Syntax & Compilation Gate",
            score: 0,
            feedback: `Syntax Error: ${errorMsg}. Fix syntax errors before requesting AI evaluation.`,
          },
        ],
      };
    }
  }

  // --------------------------------------------------------------------------
  // Gate 3: Track-Specific Requirements Check
  // --------------------------------------------------------------------------
  if (track === "javascript" || track === "js" || track === "dom") {
    if (!js || js.trim().length < 5) {
      return {
        passed: false,
        error: "Missing JavaScript Logic",
        reason: "This JavaScript challenge requires logic implementation in the script.js tab.",
        breakdown: [
          {
            rubric_id: "missing_js",
            name: "Logic Implementation Gate",
            score: 0,
            feedback: "script.js is empty or contains no functional code.",
          },
        ],
      };
    }
  } else if (track === "html-css" || track === "css") {
    if (!html || html.trim().length < 10) {
      return {
        passed: false,
        error: "Missing HTML Markup",
        reason: "This HTML/CSS challenge requires markup implementation in the index.html tab.",
        breakdown: [
          {
            rubric_id: "missing_html",
            name: "Markup Implementation Gate",
            score: 0,
            feedback: "index.html is missing required markup.",
          },
        ],
      };
    }
  }

  // --------------------------------------------------------------------------
  // Gate 4: HTML Well-Formedness Check
  // --------------------------------------------------------------------------
  if (html && html.trim().length > 0) {
    // Check for obvious unclosed tags like unclosed script/style blocks
    const unclosedScript = (html.match(/<script/gi) || []).length !== (html.match(/<\/script>/gi) || []).length;
    const unclosedStyle = (html.match(/<style/gi) || []).length !== (html.match(/<\/style>/gi) || []).length;

    if (unclosedScript || unclosedStyle) {
      return {
        passed: false,
        error: `Malformed HTML: Unclosed ${unclosedScript ? "<script>" : "<style>"} tag detected`,
        reason: "HTML contains unclosed script or style tags which break DOM compilation.",
        breakdown: [
          {
            rubric_id: "html_syntax",
            name: "HTML Well-Formedness Gate",
            score: 0,
            feedback: "Fix unclosed tags in index.html before AI grading.",
          },
        ],
      };
    }
  }

  // All pre-filter gates passed! Ready for full Groq LLM evaluation.
  return { passed: true };
}
