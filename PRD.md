# PRD.md — Staqor v1.0

## 1. What Staqor Is
Staqor is a coding-practice platform where users solve real frontend/backend challenges
(HTML/CSS, JS/DOM, React, Vue, Node.js/API, Bug-Fix, Full-Stack) inside an in-browser IDE,
get **AI-graded feedback** (via Groq LLM, not unit tests), and build a **public portfolio**
of passed solutions that recruiters can view live — no deployment, no servers, everything
client-side or ephemeral.

## 2. Problem It Solves
- LeetCode-style platforms test algorithms, not real UI/product-building skill.
- Junior devs need feedback on *design fidelity* (colors, spacing, responsiveness),
  not just "does it compile."
- Portfolios are usually static screenshots — Staqor's are live, interactive, and provable.

## 3. Target Users
| Segment | Need |
|---|---|
| CS students / bootcamp grads | Practice real-world UI tasks, build a provable portfolio |
| Job-seeking frontend/full-stack devs | Structured practice + AI feedback loop |
| Recruiters / hiring managers | View a candidate's actual working code, live, no setup |
| Admins (Staqor team) | Author challenges, test rubrics before publishing |

## 4. Core Product Pillars
1. **No-Deploy execution** — everything runs in an iframe/blob URL or ephemeral stub. No
   Vercel/Netlify builds, no attack surface from arbitrary npm installs.
2. **AI Judge, not test runner** — Groq LLM scores against a weighted rubric and returns
   strict JSON. Backend tasks get a structural string/JSON pre-filter before the LLM call.
3. **Freemium hard limits** — 5 Run / 3 Submit per challenge, lifetime (not resettable),
   to control cost and push upgrades.
4. **Live, interactive portfolio** — passed solutions render as read-only Monaco + iframe
   srcdoc, so a recruiter sees the actual app running, not a screenshot.

## 5. MVP Feature Scope (v1.0)
**In scope:**
- Auth (JWT + HTTP-only cookies)
- Challenge browsing, filtering, search, pagination
- Workspace: split-screen Markdown spec + Monaco editor (HTML/CSS/JS tabs) + sandboxed
  live preview iframe
- Run / Submit flow with Groq evaluation + attempt-count enforcement
- Notifier (soft paywall) UI when limits are hit
- Public profile with passed-solution gallery, privacy toggle
- Admin: challenge CRUD + "Sandbox Tester" for rubric validation
- Stripe subscription (Free / Pro / Enterprise tiers)

**Explicitly out of scope for v1.0** (see Roadmap in Architecture.md):
- Pair programming mode
- Real ephemeral Docker containers for full-stack/API testing
- Company-specific interview tracks
- Community challenge contribution queue (post-MVP, described but not built in v1)

## 6. Key Non-Negotiable Constraints
- No server-side code execution/deployment of user code — ever.
- Evaluation is 100% LLM-based (Groq), with a structural pre-filter only for backend tasks.
- Attempt limits are lifetime-per-challenge, not time-windowed.
- Iframe sandbox never includes `allow-same-origin` alongside `allow-scripts`.
- Model solutions are hidden until both Run and Submit caps are exhausted.

## 7. Success Metrics (KPIs)
- Notifier → non-upgrade churn rate within 24h (A/B test copy)
- Avg. session time in IDE (stickiness)
- Challenge completion rate (opened → passed)
- Groq p95 evaluation latency (< 2.5s target)

## 8. Monetization
| Tier | Price | Run/Submit | Extras |
|---|---|---|---|
| Free | $0 | 5 / 3 per challenge | Public profile, basic preview |
| Pro | $15/mo | Unlimited | Priority Groq queue, Verified badge, early Hard access |
| Enterprise | Custom | Unlimited | Private challenges, team leaderboards |

## 9. Open Questions for Later Phases
- Exact badge-unlock thresholds beyond the examples given (10 solves, etc.) — define per-category later.
- Community contribution queue moderation flow — deferred to post-MVP.
