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
  const systemPrompt = `You are the Staqor AI Code Judge. You evaluate frontend component and web app implementations (HTML, CSS, JavaScript) against problem specifications and reference model solutions.
Your job is to compare the user's submission with the reference solution and criteria, providing accurate scoring and actionable feedback.

SCORING RULES:
- Compare the user's code with the reference model solution and specifications.
- If the user's code achieves the required functionality, structure, and styling (even with minor stylistic variations or creative enhancements), award a passing score (80 to 100).
- If the code is almost correct or a close call, provide constructive feedback on what small adjustment is needed and score appropriately (70 to 90).
- If key markup or interaction logic is missing or broken, point out specifically what to fix.

You MUST output valid JSON matching this schema:
{
  "score": number (0 to 100),
  "passed": boolean (true if score >= 80, else false),
  "breakdown": [
    {
      "rubric_id": string,
      "name": string,
      "score": number (0 to 100 for this criterion),
      "feedback": string (concise explanation of what passed or what to improve)
    }
  ],
  "overall_feedback": string (1-3 sentences summarising code quality and next steps)
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
    const modelHtml = (payload.modelSolution.html || "").slice(0, 1500).replace(/```/g, "'''");
    const modelCss = (payload.modelSolution.css || "").slice(0, 1500).replace(/```/g, "'''");
    const modelJs = (payload.modelSolution.js || "").slice(0, 1500).replace(/```/g, "'''");

    modelSolutionSection = `
REFERENCE MODEL SOLUTION (FOR BENCHMARK):
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

Compare the user's submission with the reference model and rubric. Output valid JSON only.`;

  return { systemPrompt, userPrompt };
}
