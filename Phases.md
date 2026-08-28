# Phases.md — Strict MVP-First Build Plan

Rule for the agent: **do not start a phase until the previous one is functionally complete
and testable.** Each phase should end in something demoable, even if ugly.

## Phase 0 — Project Scaffold
- Next.js 14 app router project, Tailwind + Shadcn/ui installed
- MongoDB connection + base models (`users`, `challenges`, `submissions`, `attempt_counts`)
- `.env` structure in place (see Architecture.md §7)
- Basic CI-free local dev script working (`npm run dev`)
- **Done when:** app boots, DB connects, one health-check API route responds.

## Phase 1 — Auth (Foundation)
- Signup/login/logout, JWT + HTTP-only cookies
- `users` collection fully wired (profile, role, stats stub)
- Protected route middleware for the `(app)` group
- **Done when:** a user can register, log in, hit a protected page, log out.

## Phase 2 — Single Challenge, End-to-End (The Critical Path)
Build **one hardcoded challenge** all the way through, before adding more content or features:
- Challenge browse page (even if it shows just 1 card)
- Workspace: Markdown spec render + Monaco (HTML/CSS/JS tabs) + sandboxed live preview iframe
- Run button → Groq evaluation → feedback panel (real Groq call, real rubric)
- Submit button → same pipeline, stricter prompt, pass/fail state
- `attempt_counts` enforcement (5 Run / 3 Submit) with server-side checks
- Notifier UI when capped
- **Done when:** one full user journey works — browse → open → code → run → submit →
  pass/fail — against a real Groq call, with correct limit enforcement.

## Phase 3 — Content Scale-Out
- Admin challenge CRUD (create/edit/publish challenges)
- Admin "Sandbox Tester" (dry-run Groq against model_solution + 3 edge-case variants)
- Multiple real challenges loaded across categories (HTML/CSS, JS/DOM, React, etc.)
- Challenge browser: real filtering, search, pagination
- **Done when:** admin can author and publish a new challenge without touching code, and
  it's immediately playable end-to-end.

## Phase 4 — Public Profile
- `/profile/:username` — stats, badges, gallery of passed solutions
- Read-only Monaco + iframe srcdoc replay of saved `code_submitted`
- Privacy toggle per solution
- Badge unlock logic (define thresholds if not already set)
- **Done when:** a passed solution is viewable, interactive, and toggle-able from a
  recruiter's-eye view (logged out).

## Phase 5 — Monetization
- Stripe integration: checkout, webhooks, `user.role` sync
- Pro tier unlocks: unlimited run/submit, priority queue flag, Verified badge
- Notifier "Upgrade Now" wired to real Stripe checkout
- **Done when:** a Free user can upgrade to Pro and immediately get unlimited attempts.

## Phase 6 — Hardening & Edge Cases
- Groq outage caching/fallback behavior (Architecture.md §5, §6 spec section 10)
- Rate limiting + payload caps on `/api/evaluate`
- Empty-code submission handling
- Duplicate/model-solution-match rejection on Submit
- Profile-not-found 404 handling
- **Done when:** all documented edge cases in the original spec (section 10) are handled
  and manually tested.

## Explicitly Deferred (Do Not Build Until Told)
- Pair programming mode (v1.5)
- Real Docker-based execution for full-stack/API tasks (v2.0)
- Company-specific tracks (v2.5)
- Community challenge contribution queue

## Phase Discipline Rule
If you (the agent) find yourself wanting to build something from a later phase while an
earlier phase isn't "Done when" complete — stop, note it, and finish the current phase first.
