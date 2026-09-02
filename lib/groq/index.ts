import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "gsk_dummy_key_for_build";

export const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export interface RubricCriteria {
  id: string;
  name: string;
  weight: number;
  criteria: string;
}

export interface EvaluationPayload {
  challengeTitle: string;
  specMarkdown: string;
  rubric: RubricCriteria[];
  userCode: {
    html: string;
    css: string;
    js: string;
  };
  modelSolution?: {
    html: string;
    css: string;
    js: string;
  };
  attemptType: "run" | "submit";
}

export interface EvaluationResult {
  score: number;
  passed: boolean;
  breakdown: Array<{
    rubric_id: string;
    name: string;
    score: number;
    feedback: string;
  }>;
  overall_feedback: string;
}

export function buildGroqPrompt(payload: EvaluationPayload): {
  systemPrompt: string;
  userPrompt: string;
} {
  const systemPrompt = `You are the Staqor AI Code Judge. You perform rigorous, objective technical evaluations of frontend implementations (HTML, CSS, JavaScript) against specifications and reference model solutions.

STRICT EVALUATION & SCORING PRINCIPLES:
1. Objectively evaluate whether the user's submitted code actually implements the requirements described in the challenge specification.
2. Incomplete / Starter Code / Placeholders (Score: 0 - 35, passed: false):
   - If the code is just the initial placeholder template, boilerplate comments ("Write your code here"), or lacks the required DOM elements and styles, you MUST assign a failing score (0 - 35) and set "passed": false.
3. Partial Implementation (Score: 36 - 74, passed: false):
   - If only static layout is present but interactive JavaScript logic is missing, or styling is severely incomplete, assign a failing score (36 - 74) and set "passed": false.
4. Near Complete / Close Call (Score: 75 - 79, passed: false):
   - Minor bugs or slight missing requirements. Set "passed": false.
5. Accepted / Complete (Score: 80 - 100, passed: true):
   - ONLY award score >= 80 and "passed": true if the implementation genuinely satisfies the structural markup, visual styling (colors/typography/layout), and interactive event handling requirements.

OUTPUT FORMAT:
You MUST output valid JSON conforming exactly to this structure:
{
  "score": <number between 0 and 100>,
  "passed": <boolean, MUST be true ONLY if score >= 80, else false>,
  "breakdown": [
    {
      "rubric_id": "<string matching criterion id, e.g. R1>",
      "name": "<string criterion name>",
      "score": <number between 0 and 100>,
      "feedback": "<concise explanation of what was implemented or what is missing>"
    }
  ],
  "overall_feedback": "<2-3 sentences explaining strengths and required improvements>"
}`;

  const sanitizedHtml = (payload.userCode.html || "").replace(/```/g, "'''");
  const sanitizedCss = (payload.userCode.css || "").replace(/```/g, "'''");
  const sanitizedJs = (payload.userCode.js || "").replace(/```/g, "'''");

  const rubricText = payload.rubric
    .map(
      (r) => `- [${r.id}] ${r.name} (Weight: ${r.weight}%): ${r.criteria}`
    )
    .join("\n");

  let modelSolutionSection = "";
  if (payload.modelSolution) {
    const modelHtml = (payload.modelSolution.html || "").slice(0, 2000).replace(/```/g, "'''");
    const modelCss = (payload.modelSolution.css || "").slice(0, 2000).replace(/```/g, "'''");
    const modelJs = (payload.modelSolution.js || "").slice(0, 2000).replace(/```/g, "'''");

    modelSolutionSection = `
REFERENCE MODEL SOLUTION (BENCHMARK):
--- HTML ---
${modelHtml}

--- CSS ---
${modelCss}

--- JAVASCRIPT ---
${modelJs}
`;
  }

  const userPrompt = `CHALLENGE: ${payload.challengeTitle}
ATTEMPT TYPE: ${payload.attemptType.toUpperCase()}

SPECIFICATION & DESIGN REQUIREMENTS:
${payload.specMarkdown}

${modelSolutionSection}

RUBRIC CRITERIA:
${rubricText}

USER SUBMISSION TO EVALUATE:
--- HTML ---
${sanitizedHtml}

--- CSS ---
${sanitizedCss}

--- JAVASCRIPT ---
${sanitizedJs}

Carefully evaluate the user submission against the specification and reference solution. Output valid JSON only.`;

  return { systemPrompt, userPrompt };
}
