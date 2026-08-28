# Team-Workflow.md — 4-Person Engineering & Content Ownership Protocol

## 1. Team Ownership & Domain Boundaries

To eliminate merge conflicts and establish clear development ownership across the team, the codebase is partitioned into four distinct, non-overlapping domains:

```
┌─────────────────┬───────────────────────────────┬────────────────────────────────────────────────────────┐
│ TEAM MEMBER     │ PRIMARY DOMAIN                │ OWNED PATHS & RESPONSIBILITIES                         │
├─────────────────┼───────────────────────────────┼────────────────────────────────────────────────────────┤
│ Person 1        │ Auth / Landing / Payments     │ • app/(marketing)/ (Landing, Pricing, Features)        │
│                 │                               │ • app/(auth)/ (Login, Signup, GSAP animations)         │
│                 │                               │ • app/api/auth/, app/api/stripe/                       │
│                 │                               │ • lib/auth/, lib/stripe/                               │
├─────────────────┼───────────────────────────────┼────────────────────────────────────────────────────────┤
│ Person 2        │ Workspace / Editor / AI Eval  │ • app/(app)/challenges/[slug]/ (40/60 IDE Shell)       │
│                 │                               │ • components/editor/ (Monaco, TabBar, Preview Iframe)  │
│                 │                               │ • app/api/evaluate/, app/api/attempts/                 │
│                 │                               │ • lib/groq/ (Prompt constructor, 3-tier resilience)    │
├─────────────────┼───────────────────────────────┼────────────────────────────────────────────────────────┤
│ Person 3        │ Browse / Profile / Admin / DB │ • app/(app)/challenges/page.tsx (Catalog & Filters)   │
│                 │ (Database Schema Owner)       │ • app/(app)/profile/ (Public Recruiter Portfolio)      │
│                 │                               │ • app/admin/ (Challenge Studio CRUD, Sandbox Tester)   │
│                 │                               │ • components/profile/                                  │
│                 │                               │ • models/ (Schema owner), lib/db/                      │
├─────────────────┼───────────────────────────────┼────────────────────────────────────────────────────────┤
│ Person 4        │ Content / Research / No-Code  │ • content/challenges/ (Spec Markdown, Starter Code)    │
│                 │                               │ • content/research/ (Competitor benchmarks, Rubrics)   │
│                 │                               │ • content/decks/ (Slide presentations, Whitepapers)    │
│                 │                               │ • STRICT RULE: Never touches app/, components/, lib/   │
└─────────────────┴───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Shared Resources & Change Protocol

Two directories are designated as **SHARED RESOURCES**:
1. **`components/ui/`** (shadcn/ui UI primitives)
2. **`models/`** (Mongoose database entity schemas — owned primarily by Person 3)

### Shared Resource Rules:
- **Heads-Up Required:** Any team member proposing an edit to an existing shared component in `components/ui/` or schema in `models/` must notify the team in Slack/Discord before making the change.
- **Explicit PR Tagging:** Pull requests touching `components/ui/` or `models/` must include a clear `[SHARED RESOURCE CHANGE]` header in the PR description detailing the backward-compatibility impact.
- **No Competing Primitives:** Never hand-roll custom versions of components available in `components/ui/` (per `Rules.md` §7).

---

## 3. Branching & Version Control Rules

- **Protected Main Branch:** `main` is strictly protected. Direct pushes to `main` are prohibited. All code merges into `main` exclusively through reviewed Pull Requests.
- **Branch Naming Standard:** All branches must follow the structured format:
  `<person>/<phase>-<short-description>`
  
  *Examples:*
  - `person1/phase-1-jwt-auth-gsap`
  - `person2/phase-2-monaco-workspace`
  - `person3/phase-3-admin-challenge-studio`
  - `person4/content-html-css-track-rubrics`

- **Commit Message Convention:** Every commit on any branch must follow the `Git-Workflow.md` specification:
  `<type>(<scope>): <short description>`
  
  *Types:* `feat`, `fix`, `docs`, `refactor`, `style`, `chore`, `test`

---

## 4. Daily Synchronization & PR Review Protocol

1. **Daily Rebase Requirement:** Every developer must run `git pull --rebase origin main` at the start of each working day (and after any team PR is merged). This prevents stale branch drift and keeps merge resolutions tiny and trivial.
2. **Phase Milestone PR Gate:** PRs are opened **only** when a milestone in `Phases.md` has satisfied its exact "Done When" checklist.
3. **Mandatory Peer Review:** Every PR requires at least **one approving review** from another team member before merge.
4. **Push Boundary:** Developers push branches manually. The AI agent executes auto-commits locally per `Git-Workflow.md` but **never** runs `git push`.

---

## 5. Person 4 Workspace Isolation (`content/`)

To allow non-developer team members and content authors to draft challenges, rubrics, and presentations without risking merge collisions or build breakage:
- **`content/challenges/`**: Raw markdown specifications, starter code templates, and reference solutions.
- **`content/research/`**: Market analysis, rubric design notes, and competitor benchmarks.
- **`content/decks/`**: Technical whitepapers, investor decks, and team walkthrough presentations.

Person 3 reviews and imports validated content from `content/challenges/` into MongoDB via the Admin Challenge Studio.
