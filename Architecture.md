# Architecture.md — Staqor v1.0

## 0. Brand Note
The original spec's example `design_spec.brand_primary` (`#6366F1`) is superseded —
Staqor's actual brand accent is `#ABDAC8` (sage mint) on a near-black UI. See Design.md
for the full palette. This only affects Staqor's own product chrome, not the
`design_spec` field structure itself (individual *challenges* can still specify their
own `brand_primary` for grading purposes — that's user-authored content, unrelated to
Staqor's own brand).

## 1. Stack
- **Frontend & Backend:** Next.js 14 (App Router) + React + Tailwind CSS + Shadcn/ui
- **Animation (landing page only):** GSAP
- **Editor:** Monaco Editor (`@monaco-editor/react`)
- **Database:** MongoDB (flexible schema fits `code_submitted`, rubric arrays well)
- **AI:** Groq SDK (`@groq/groq-sdk`)
- **Auth:** Supabase Auth (`@supabase/supabase-js`, `@supabase/ssr` with Next.js middleware & session cookies)
- **Payments:** Deferred / Removed for initial build
- **Hosting / Deployment:** Vercel

## 2. High-Level System Flow

```
User → Next.js Frontend
         ├─ Landing (public, marketing, GSAP animated)
         └─ App Shell (auth-gated)
               ├─ Challenge Browser (filter/search/paginate)
               ├─ Workspace
               │     ├─ Left: Markdown spec + design_spec render
               │     └─ Right: Monaco (HTML/CSS/JS tabs) + sandboxed iframe preview
               ├─ Run/Submit → API Route → attempt_counts check → Groq call → submissions write
               └─ Public Profile (read-only Monaco + iframe srcdoc replay)

Admin Panel → Challenge CRUD → "Sandbox Tester" → Groq (dry-run against model_solution + edge cases)
```

## 3. Folder Structure

```
/staqor
├── app/
│   ├── (marketing)/              # public landing, pricing — GSAP-animated
│   │   ├── page.tsx
│   │   └── pricing/page.tsx
│   ├── (app)/                    # authenticated shell — LeetCode/VSCode-dark theme
│   │   ├── challenges/
│   │   │   ├── page.tsx          # browse/filter/search
│   │   │   └── [slug]/page.tsx   # workspace
│   │   ├── profile/[username]/page.tsx
│   │   └── dashboard/page.tsx
│   ├── admin/
│   │   ├── challenges/           # CRUD
│   │   └── sandbox-tester/
│   └── api/
│   └── api/
│       ├── auth/route.ts         # Supabase session inspection & sync
│       ├── challenges/route.ts
│       ├── evaluate/route.ts     # RUN + SUBMIT handler
│       ├── attempts/route.ts
│       └── health/route.ts       # Service & DB health check
├── components/
│   ├── editor/                   # Monaco wrapper, tab bar, preview iframe
│   ├── profile/                  # read-only replay viewer
│   └── ui/                       # shadcn components
├── lib/
│   ├── db/                       # mongo client, models
│   ├── groq/                     # prompt constructor, retry logic
│   ├── auth/                     # Supabase session helper
│   └── supabase/                 # client, server, middleware SSR helpers
├── models/                       # users, challenges, submissions, attempt_counts
└── docs/                         # this file, PRD, Rules, Phases, Design, Memory
```

## 4. Data Models
See PRD source spec for full field-level schema (`users`, `challenges`, `rubric`,
`submissions`, `attempt_counts`). Architecture-relevant notes:
- `attempt_counts` is checked **before** every Groq call — never trust client-side state
  for enforcing limits.
- `submissions` stores the full `groq_response` for audit/debugging, not just the parsed score.
- `challenges.model_solution` is only ever sent to the client after both caps are exhausted.

## 5. The Groq Evaluation Pipeline
1. Client sends `{ challenge_id, code: {html, css, js}, attempt_type }`.
2. API route: verify auth → check `attempt_counts` → if capped, return 429 payload.
3. Sanitize user code (escape backticks/newlines) to prevent prompt injection.
4. Build dynamic prompt (static system prompt + per-challenge rubric + user code).
5. Call Groq. Parse JSON.
   - On parse failure → retry once with a stricter "JSON only" instruction.
   - On second failure → fallback `{score:0, ...}` **without** consuming quota; log for review.
6. Increment attempt count (only on a successful, quota-consuming evaluation).
7. Write to `submissions`. Return score/feedback/passed to client.
8. If SUBMIT and passed → update `users.stats`, check badge thresholds, flag for public profile.

## 6. Sandboxing Model (Security-Critical)
- Live preview: Blob/srcdoc iframe, `sandbox="allow-scripts allow-modals"` — **never**
  `allow-same-origin` combined with `allow-scripts`.
- Inject a `setTimeout`-based loop-killer into user JS before execution.
- Wrap all user code execution in `try/catch` inside the iframe context.
- Rate-limit `/api/evaluate`: 10 req/min/IP.
- Payload cap: 1MB per submission.

## 7. Environments & Config
- `.env`: `MONGODB_URI`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, `NEXT_PUBLIC_APP_URL`.
- Separate Groq API keys for dev/staging vs prod to isolate cost tracking.

## 8. Post-MVP Roadmap (do not build in v1)
- v1.5: Pair programming (shared editor session)
- v2.0: Real ephemeral Docker containers for full-stack/API challenges
- v2.5: Company-specific interview tracks
