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
  const systemPrompt = `You are the Staqor AI Code Judge. You evaluate frontend component implementations (HTML, CSS, JavaScript/React/Vue) against structured rubrics.
Your job is to provide accurate, objective scoring and concise, actionable engineering feedback.
You MUST output valid JSON matching this schema:
{
  "score": number (0 to 100),
  "passed": boolean (true if score >= 80 and attemptType is 'submit', else false),
  "breakdown": [
    {
      "rubric_id": string,
      "name": string,
      "score": number (0 to 100 for this criterion),
      "feedback": string (concise explanation of what passed or what is missing)
    }
  ],
  "overall_feedback": string (1-3 sentences summarising code quality and next steps)
}`;

  const sanitizedHtml = payload.userCode.html.replace(/```/g, "'''");
  const sanitizedCss = payload.userCode.css.replace(/```/g, "'''");
  const sanitizedJs = payload.userCode.js.replace(/```/g, "'''");

  const rubricText = payload.rubric
    .map(
      (r) => `- [${r.id}] ${r.name} (Weight: ${r.weight}%): ${r.criteria}`
    )
    .join("\n");

  const userPrompt = `CHALLENGE: ${payload.challengeTitle}
ATTEMPT TYPE: ${payload.attemptType.toUpperCase()}

SPECIFICATION:
${payload.specMarkdown}

RUBRIC CRITERIA:
${rubricText}

USER SUBMISSION:
--- HTML ---
${sanitizedHtml}

--- CSS ---
${sanitizedCss}

--- JAVASCRIPT ---
${sanitizedJs}

Evaluate the code against the criteria. Return JSON only.`;

  return { systemPrompt, userPrompt };
}
