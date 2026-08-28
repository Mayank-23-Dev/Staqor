# Rules.md — Boundaries for the AI Coding Agent (AGY CLI)

## 1. Hard Constraints — Never Violate
- **Never** add code that deploys, builds, or executes user-submitted code on a server
  (no Vercel/Netlify build triggers, no server-side `eval`/`vm` of user code, no Docker
  execution). All user-code execution is client-side iframe only, in v1.
- **Never** set iframe `sandbox` to include `allow-same-origin` together with `allow-scripts`.
  If you think you need to, stop and flag it instead of doing it.
- **Never** implement real unit-test runners (Jest/Mocha) as the grading mechanism.
  Grading is Groq LLM + optional structural string/JSON pre-filter only.
- **Never** reset `attempt_counts` on a time basis (daily/weekly). They are lifetime caps
  per (user, challenge) pair.
- **Never** expose `model_solution` to the frontend/API response unless both
  `run_count >= 5` and `submit_count >= 3` for that user+challenge.
- **Never** consume a Run/Submit attempt when the Groq call fails and falls back to the
  safe-default response — that failure must not cost the user quota.
- **Never** store raw passwords — bcrypt hash only, and never log `password_hash` or
  raw email in plaintext debug output.

## 2. Libraries — Use / Avoid
**Use:**
- Next.js 14 App Router, Tailwind CSS, Shadcn/ui
- `@monaco-editor/react` for the code editor
- `@groq/groq-sdk` for AI calls
- GSAP — **landing/marketing pages AND auth (login/signup) pages only**, never inside
  the authenticated app shell (workspace/dashboard/browse)
- Mongoose (or native MongoDB driver) for MongoDB access
- Stripe official Node SDK for payments

**Avoid unless explicitly asked:**
- Any client-side state library beyond React state/Context for MVP (no Redux/Zustand
  unless the workspace state genuinely outgrows Context)
- Any test runner as a grading mechanism (Jest/Mocha are fine for *internal* app testing,
  never for scoring user submissions)
- Heavy animation libraries inside the logged-in app shell (Framer Motion/GSAP) — keep
  workspace/dashboard/browse fast and IDE-like, not decorative
- New backend framework choices without checking Architecture.md first

## 3. Error Handling Expectations
- Every Groq call must have the 3-try retry/fallback logic (see Architecture.md §5)
  implemented — never let a raw parse error bubble to the user.
- Every `/api/evaluate` call must check attempt limits **server-side** before calling Groq,
  never trust a client-supplied count.
- Wrap all Mongo writes in try/catch; on submission-write failure, do not tell the user
  their attempt succeeded.
- Empty code submissions are scored 0 and **do** consume a try (per spec, to discourage spam).
- Groq API outage → attempt cached response for near-identical code; else soft-fail with
  "temporarily unavailable" and do **not** deduct a try.

## 4. Code Style / Structure
- Follow the folder structure in Architecture.md — don't invent a new top-level layout.
- Keep Groq prompt construction in `lib/groq/`, never inline in API route handlers.
- Keep all rubric/scoring logic server-side. Never send rubric weights to the client
  before an evaluation is returned (prevents gaming the LLM).
- One PR/change-set per Phase (see Phases.md) — do not jump ahead to later phases'
  features while a phase is incomplete.

## 5. Security Checklist (apply to every PR touching `/api/evaluate` or the editor)
- [ ] Iframe sandbox flags correct (no `allow-same-origin` + `allow-scripts` combo)
- [ ] User code sanitized (escaped backticks/newlines) before prompt injection
- [ ] Rate limit present (10 req/min/IP) on `/api/evaluate`
- [ ] Payload size capped at 1MB
- [ ] Attempt count checked server-side, not client-side
- [ ] No user code executed outside the sandboxed iframe

## 6. When Unsure
If a requirement isn't explicitly covered by PRD.md, Architecture.md, or this file:
1. Default to the simplest MVP-safe choice.
2. Flag the assumption explicitly in your output/commit message.
3. Do not silently expand scope beyond the current Phase in Phases.md.
