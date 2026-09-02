/**
 * Structural Correctness Pre-Filter Gate
 * Evaluates code for syntax errors, basic structural validity, starter-code placeholders,
 * and execution readiness before spending an LLM call on full rubric grading.
 */

export interface PreFilterResult {
  passed: boolean;
  score?: number;
  error?: string;
  reason?: string;
  breakdown?: Array<{
    rubric_id: string;
    name: string;
    score: number;
    feedback: string;
  }>;
  overall_feedback?: string;
}

export function runStructuralPreFilter(
  code: { html: string; css: string; js: string },
  challenge: {
    title?: string;
    track?: string;
    spec_markdown?: string;
    starter_code?: { html: string; css: string; js: string };
  }
): PreFilterResult {
  const { html = "", css = "", js = "" } = code;
  const track = (challenge.track || "").toLowerCase();

  const cleanHtml = html.trim();
  const cleanCss = css.trim();
  const cleanJs = js.trim();
  const totalLength = cleanHtml.length + cleanCss.length + cleanJs.length;

  // --------------------------------------------------------------------------
  // Gate 1: Non-Empty / Non-Trivial Code Check
  // --------------------------------------------------------------------------
  if (totalLength < 15) {
    return {
      passed: false,
      score: 0,
      error: "Empty Submission",
      reason: "No code was provided. Please write your solution before running evaluation.",
      breakdown: [
        {
          rubric_id: "R1",
          name: "Visual Layout & Markup Fidelity",
          score: 0,
          feedback: "Submission is empty. Please implement the HTML container structure.",
        },
        {
          rubric_id: "R2",
          name: "DOM Interaction & State Logic",
          score: 0,
          feedback: "No JavaScript code provided.",
        },
        {
          rubric_id: "R3",
          name: "Code Cleanliness & Specification Conformance",
          score: 0,
          feedback: "No code submitted.",
        },
      ],
      overall_feedback: "Submission is empty. Implement the HTML markup, CSS styling, and interactive JavaScript logic matching the challenge requirements.",
    };
  }

  // --------------------------------------------------------------------------
  // Gate 2: Untouched Starter Code / Pure Placeholder Check
  // --------------------------------------------------------------------------
  const isStarterHtml =
    cleanHtml.includes("Write your HTML code here") ||
    cleanHtml.includes("Write your markup matching the target specifications") ||
    cleanHtml.length < 50;

  const isStarterCss =
    cleanCss.includes("Write your CSS styling here") &&
    cleanCss.length < 250;

  const isStarterJs =
    (cleanJs.includes("Write your JavaScript code here") || cleanJs.includes("Write your interactive logic here")) &&
    cleanJs.length < 150;

  // If HTML or JS is completely placeholder with no substantive implementation
  const hasSubstantiveHtml = cleanHtml.length > 120 && !isStarterHtml;
  const hasSubstantiveCss = cleanCss.length > 150;
  const hasSubstantiveJs = cleanJs.length > 80 && !isStarterJs;

  if (isStarterHtml && isStarterJs && !hasSubstantiveCss) {
    return {
      passed: false,
      score: 15,
      error: "Starter Template Detected",
      reason: "The submitted code appears to be the unedited starter template placeholder.",
      breakdown: [
        {
          rubric_id: "R1",
          name: "Visual Layout & Markup Fidelity",
          score: 15,
          feedback: "Only starter boilerplate detected. Please implement the required UI markup and styling.",
        },
        {
          rubric_id: "R2",
          name: "DOM Interaction & State Logic",
          score: 10,
          feedback: "No interactive event listeners or DOM state logic implemented.",
        },
        {
          rubric_id: "R3",
          name: "Code Cleanliness & Specification Conformance",
          score: 20,
          feedback: "Starter template was submitted without completing the challenge specifications.",
        },
      ],
      overall_feedback: "Incomplete submission: You submitted the initial placeholder template. Build the required components, typography rules, color styles, and event listeners before submitting.",
    };
  }

  // --------------------------------------------------------------------------
  // Gate 3: JavaScript Syntax & Parse Verification
  // --------------------------------------------------------------------------
  if (cleanJs.length > 0) {
    try {
      // Validate JS syntax using the Function constructor (syntax check only)
      new Function(cleanJs);
    } catch (err: any) {
      const errorMsg = err?.message || "Invalid syntax in JavaScript code";
      return {
        passed: false,
        score: 25,
        error: `JavaScript Syntax Error: ${errorMsg}`,
        reason: "Your JavaScript code contains a syntax error and cannot execute in the sandbox runtime.",
        breakdown: [
          {
            rubric_id: "R1",
            name: "Visual Layout & Markup Fidelity",
            score: hasSubstantiveHtml ? 60 : 30,
            feedback: "Markup structure exists but runtime failed due to JavaScript syntax error.",
          },
          {
            rubric_id: "R2",
            name: "DOM Interaction & State Logic",
            score: 0,
            feedback: `Syntax Error: ${errorMsg}. Fix syntax errors before requesting AI evaluation.`,
          },
          {
            rubric_id: "R3",
            name: "Code Cleanliness & Specification Conformance",
            score: 20,
            feedback: "Fix JavaScript syntax error before final submission.",
          },
        ],
        overall_feedback: `JavaScript syntax error encountered: "${errorMsg}". Resolve syntax issues so your code executes properly in the sandbox.`,
      };
    }
  }

  // --------------------------------------------------------------------------
  // Gate 4: HTML Well-Formedness Check
  // --------------------------------------------------------------------------
  if (cleanHtml.length > 0) {
    const unclosedScript = (cleanHtml.match(/<script/gi) || []).length !== (cleanHtml.match(/<\/script>/gi) || []).length;
    const unclosedStyle = (cleanHtml.match(/<style/gi) || []).length !== (cleanHtml.match(/<\/style>/gi) || []).length;

    if (unclosedScript || unclosedStyle) {
      return {
        passed: false,
        score: 20,
        error: `Malformed HTML: Unclosed ${unclosedScript ? "<script>" : "<style>"} tag detected`,
        reason: "HTML contains unclosed script or style tags which break DOM compilation.",
        breakdown: [
          {
            rubric_id: "R1",
            name: "Visual Layout & Markup Fidelity",
            score: 20,
            feedback: "Fix unclosed tags in index.html before AI grading.",
          },
          {
            rubric_id: "R2",
            name: "DOM Interaction & State Logic",
            score: 15,
            feedback: "Malformed markup prevents event binding.",
          },
          {
            rubric_id: "R3",
            name: "Code Cleanliness & Specification Conformance",
            score: 25,
            feedback: "Ensure all HTML tags are closed properly.",
          },
        ],
        overall_feedback: "HTML contains unclosed tags that prevent proper page rendering.",
      };
    }
  }

  // All pre-filter gates passed! Ready for full Groq LLM evaluation.
  return { passed: true };
}
