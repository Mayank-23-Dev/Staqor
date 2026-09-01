# ABTalks Redesign — Hackathon Plan

## Challenge
Redesign ABTalks — a platform that runs multiple challenges (60-Day Coding Challenge, Vibe Code Hackathon, 31 Days AI Cohort, Claude Challenge, etc.) helping Indian students and developers enhance their skills through hands-on work — as a mobile-first (390px) product. It is NOT a single 60-day program; it's a multi-challenge platform where each challenge has its own duration, format, and focus. The product works but has never been designed.

## Scope
Three routes, mocked data, no auth/backend.

```
/           Landing page
/dashboard  Student dashboard
/day/12     Challenge day
```

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Mocked JSON (`students.json`, `days.json`, `tracks.json`)
- Deployed on Vercel

## Design Principles
- Mobile-first (390px), desktop secondary
- Understandable to a first-time visitor with zero context
- Late-night usage context (students build after college, often ~1AM) — design should feel calm, low-friction, not corporate/dashboard-generic
- Editorial/premium aesthetic — avoid generic AI-dashboard look (Linear/Vercel-inspired restraint, not neon gradients)

---

## Page 1 — Landing (`/`)

**Goal:** A student who's never heard of ABTalks understands it in 5 seconds and commits to 60 days.

**Content pulled from abtalks.in (real copy, our own UI — not their layout/visuals):**

**Hero:**
- Eyebrow: "Build in public. Grow together."
- Headline (3-line stack): "Code consistently. Post publicly. Get noticed."
- Sub-headline: "Join India's coding community for college students to learn, build, and accelerate their careers through visible proof of work."
- Primary CTA: "Start the challenge"

**Trust strip (real stats):**
- 10,000+ members
- 500+ projects
- 100+ hiring partners

**How ABTalks works (3 steps — real copy):**
1. **Learn Daily** — "Choose your track and build practical skills through focused challenges and live sessions."
2. **Build & Showcase** — "Ship real work, publish your progress, and turn consistent effort into a visible portfolio."
3. **Get Hired** — "Stand out through proof of work and become discoverable to recruiters in the ABTalks network."

**Program/track cards (real programs, reframed as our track selection):**
- 60-Day Coding Challenge — "One real task every day across AI, Data Science, or Software Engineering. Build a streak and a public portfolio." (60 days)
- Vibe Code Hackathon — "Build anything using AI in 48 hours. Compete solo or with a team of up to three and ship something real." (48 hours · Teams of 1–3)
- 31 Days AI Cohort — "Build and deploy a production AI chatbot in 31 days. Learn RAG, agents, MCP, and get in front of recruiters." (31 days)
- Claude Challenge — "Master Claude through focused prompt-engineering tasks and build practical AI workflows." (60 days · AI mastery)

**Social proof — "What our builders say" (real testimonials, use 2-3 for our card layout):**
- Samridhi Gupta, Axis Institute of Technology and Management — on prompt engineering + consistency
- Vivek, IT Leader · 20+ years of industry experience — on starting over as a beginner with GenAI
- Lakshay — on building complete projects, resumes, and workflows with AI
- Rida Khan, AI Enthusiast — on turning uncertainty into achievement over 60 days

**Newsletter/community CTA band:**
- "Join our community for instant updates" — "Meet builders, get event alerts, and stay accountable." CTA: "Join now"

**Footer:**
- Wordmark: ABTalks
- Social icons: Instagram, LinkedIn, YouTube, X, Discord
- Contact line: "For any issue or enquiry: team@abtalks.in"

**Copy angle:** keep the late-night builder framing ("Built for 1 AM commits") as our own addition layered on top of the above — it's not on the live site but fits our edge-case-aware, mobile-first positioning.

**Note:** All of the above is real copy/content from abtalks.in — we are NOT copying their visual design, layout, colors, or component styling. Our landing page keeps its own dark-canvas, editorial-premium direction (per Design Principles above) and simply carries this real content instead of placeholder text.

---

## Page 2 — Dashboard (`/dashboard`)

**Goal:** Home screen after login, scoped to the student's currently active challenge (e.g. they've enrolled in the 60-Day Coding Challenge). At-a-glance status + clear next action.

**Must include:**
- Which challenge they're currently in (name + track), since a student may have joined any one of several challenges
- Current streak (flame counter, most prominent element)
- Today's task card with CTA → `/day/N`
- Progress bar scoped to that challenge's total length — "Day 12 of 60" (length varies per challenge: 60-day program, 48-hour hackathon, 31-day cohort, etc.)
- Completion stats (commits made, posts made, days missed)
- Standing/achievements (badges or leaderboard %)

**Edge cases (explicitly designed, not defaulted):**
| Case | Behavior |
|---|---|
| First day, no streak | Streak shows 0 with "Your streak starts today" — not blank/broken |
| Missed a day | Streak-broken state with recovery messaging, not silent reset |
| Empty profile | Placeholder copy for badges ("Your badges will appear here") — not empty void |

---

## Page 3 — Challenge Day (`/day/12`)

**Goal:** Read task → understand build → submit proof.

**Structure:**
1. Day header — "Day 12 · [Track Name]"
2. Task description — clearly scoped build instructions
3. Why it matters — 1–2 line learning objective
4. Submission form:
   - GitHub repo/commit URL
   - LinkedIn post URL
   - Submit → success state (streak updates, checkmark)
5. Already-submitted state — locked/confirmed view, not resubmittable

---

## Thoughtful Idea (Required Differentiator)

**Auto-draft LinkedIn post.**
Generate a suggested LinkedIn caption from the student's GitHub commit message/diff. The real friction in a daily proof-of-work loop isn't the coding — it's writing the LinkedIn post at 1 AM. Removing that friction is the single highest-leverage improvement to daily completion rates.

*Fallback idea if time-constrained:* Streak shield — one-time protection against a missed day, reducing all-or-nothing streak anxiety.

---

## Build Order (Priority)

1. Mock data shape (`students.json`, `days.json`, `tracks.json`)
2. Dashboard — core loop, most judged screen
3. Day page — submission flow + edge case (already submitted)
4. Landing page — trust/motivation layer
5. Auto-draft LinkedIn caption feature
6. Edge case pass — no streak / missed day / empty profile
7. Mobile QA at 390px — final polish pass
8. Route map + deployment

## Submission Checklist
- [ ] Repo public
- [ ] Live deploy URL working
- [ ] Route map: `/`, `/dashboard`, `/day/12`
- [ ] AI usage log included
- [ ] All 3 edge cases visibly handled
- [ ] Mobile-first at 390px verified
- [ ] One thoughtful idea implemented and visible