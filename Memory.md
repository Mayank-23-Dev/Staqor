# Memory.md — Living Progress Log

> This file is updated by the AI agent as work progresses. It exists so a new session
> doesn't need to re-read the whole codebase or guess at prior decisions. Keep entries
> short, factual, and dated. Newest entries at the top.

## How to Use This File (Agent Instructions)
- After completing meaningful work (a phase, a feature, a bugfix with a non-obvious
  cause), append a dated entry below.
- Log: what was built, what decisions were made (and why, if it deviated from
  Architecture.md/Rules.md), and what's NOT done yet in that area.
- Before starting new work in a session, read this file top-to-bottom first.
- If a decision here contradicts Architecture.md/Rules.md/Phases.md, treat those files
  as the source of truth for *intent*, and this file as source of truth for *current state*.
  Flag the contradiction instead of silently resolving it.

---

### [2026-09-01] — Landing Page: Complete AB Talk Layout Alignment with Staqor Aqua/Mint Theme
- **What was built:**
  - **Full AB Talk Landing Page Architecture Adopted for Staqor:**
    - **Hero Section:**
      - 4 Parallax Floating Badges with infinite GSAP sine loops (*Verified Proof of Work*, *10,000+ Active Builders*, *100% Free for Students*, *8 Practice Tracks*).
      - Headline: *"Become the Frontend Engineer that Companies Want to Hire!"* with glowing aqua box on *Companies*.
      - Student & Developer Community Avatars + 5-star rating strip (`10,000+ Engineers Enrolled`).
      - Primary CTA: *Explore Challenges* with glowing aqua gradient, hover scale, and drop-shadows.
    - **Dynamic Proof-of-Work Terminal Window:**
      - CRT scanline overlay, ambient aqua/mint glow auras, control dots, and pulsing `Live Evaluation Stream`.
      - Animated GSAP typewriter command line with pre-filter validation checks and Groq AI 94/100 score reveal.
      - Active Engineer profile card + streak counter (`Flame` animation) + bottom pagination dots.
    - **Stats Trust Strip (`TrustStrip`):**
      - Grid of 3 metric cards (`10,000+` Active Frontend Engineers, `250,000+` Verified UI Runs, `50+` Recruiter Partners).
    - **Active Challenges & Cohorts (`ProgramCards` with `SpotlightCard`):**
      - Responsive cards with GSAP mouse-tracking radial spotlights (*60-Day Frontend Mastery*, *48-Hour UI Hackathon*, *31 Days React & State*, *Full-Stack Mock API Sprint*).
    - **How Staqor Works (`HowItWorks`):**
      - Animated SVG cubic bezier connector curves linking the 3 step cards on scroll.
    - **Why Staqor Wins (`WhyStaqor`):**
      - Comparison matrix: Traditional Platforms vs. The Staqor Way (Daily Frontend Proof of Work).
    - **Community CTA Band & Wall of Proof (`Testimonials`):**
      - High-impact gradient CTA box and 2-column verified quote cards.
    - **FAQ Accordion & Clean Footer:**
      - Expandable FAQ cards and Staqor footer with social links and contact info.
    - **Scroll-Responsive Glowing Accent Line:**
      - Continuous SVG laser line in Staqor aqua/mint gradient (`#ABDAC8`, `#D4EDE3`, `#7BC4A8`) with GSAP scrub.
- **Known gaps / notes:**
  - Production build compiled successfully (`next build`).
- **Next recommended action:** Ready for review and deployment.

### [2026-09-01] — Phase 2 & Groq: Locked Code Regions & Structural Correctness Pre-Filter Gate
- **What was built:**
  - **Locked/Read-Only Code Regions (`lib/supabase/db.ts`, `components/editor/CodeEditor.tsx`, `components/editor/WorkspaceContainer.tsx`):**
    - Extended `IChallengeCode` and `IChallenge` with `locked_files: ("html" | "css" | "js")[]`.
    - Integrated read-only enforcement in Monaco Editor (`readOnly: true`), showing lock badges on file tabs, and "Read-Only Scaffolding" indicator for scoped challenges (e.g. JS/DOM challenges where HTML/CSS is locked scaffolding).
  - **Structural Correctness Pre-Filter Gate (`lib/groq/prefilter.ts`, `app/api/evaluate/route.ts`):**
    - Pre-execution validation checking JavaScript syntax errors, malformed HTML, empty submissions, and track-specific code presence before LLM invocation.
    - If pre-filter fails: immediately returns clear syntax/runtime feedback and marks the attempt without spending a Groq LLM call/quota.
    - If pre-filter passes: proceeds to full Groq AI rubric evaluation.
  - **UI Diagnostic Banner (`components/editor/WorkspaceContainer.tsx`):**
    - Renders an alert failure card in the AI Feedback tab explaining syntax/logic errors when the gate fails.
- **Known gaps / notes:**
  - Zero token expenditure on invalid syntax/empty attempts verified.
- **Next recommended action:** Proceed with expanding challenge catalog definitions with custom track locks.

### [2026-09-01] — Phase 2 & Workspace: Stacked IDE/Console & 4-Tab Problem/Live Preview Split
- **What was built:**
  - **Left Panel (40%):** Added 4th tab "Live Preview" alongside "Problem Spec", "Rubric Criteria", and "AI Feedback". Houses the sandboxed iframe runtime (`sandbox="allow-scripts allow-modals"`), status badges ("LIVE SANDBOX" / "Isolated Runtime"), viewport device toggles (Desktop/Tablet/Mobile), and "Re-run" action.
  - **Right Panel (60%):** Expanded Monaco Code Editor (`index.html`, `style.css`, `script.js`) to full panel width. Stacked the full-width Sandbox Console vertically beneath it (LeetCode-style Code / Test Result split) with draggable resize divider (`#26262E`), collapse toggle, timestamped logs, and log counter badge.
  - **Styling:** Adheres strictly to `Design.md` App Shell Mode (near-black `#0A0A0F` canvas, `#111117` panels, `#26262E` separators, mint `#ABDAC8` active tab underlines and buttons, zero GSAP).
- **Known gaps / notes:**
  - Code hot-reloading and evaluation synchronization verified across all 4 left panel tabs and right console drawer.
- **Next recommended action:** Proceed with challenge test-case expansions and rubric tuning.

### [2026-09-01] — Phase 3 & Auth: LeetCode-Style Challenges Catalog + OAuth Redirect Bugfix
- **What was built:**
  - **Auth OAuth Redirect Bugfix (`lib/auth/url.ts`, `app/auth/callback/route.ts`, `lib/supabase/middleware.ts`, `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`):**
    - Added `getAppUrl()` dynamically reading `NEXT_PUBLIC_APP_URL` or `VERCEL_URL` (avoiding hardcoded localhost).
    - Server-side OAuth code exchange in `app/auth/callback/route.ts` stripping `?code=` query params and redirecting cleanly to `/challenges`.
    - Catching stray `?code=` query parameters in middleware and forwarding them directly to `/auth/callback`.
  - **LeetCode-Style Challenges Catalog Layout (`app/(app)/challenges/page.tsx`, `components/challenges/ChallengesCatalogView.tsx`, `lib/supabase/db.ts`):**
    - **Left Sidebar:** Categories/Tracks filter (All, HTML/CSS, JS/DOM, React, Vue, Node.js/API, Bug-Fix, Full-Stack) with dynamic counts and `#0D0D12` background.
    - **Top Filter Bar:** Difficulty chips (Easy `#4ADE80`, Medium `#FBBF24`, Hard `#F87171`), Status chips (Todo, Solved, Locked), debounced search input, and active filter counter.
    - **Main Table List:** Dense table with Solved checkmarks (`#4ADE80`), Locked badges (`#F87171` for 5 runs & 3 submits), attempt quota bars, and 20 items/page pagination.
    - **Right Sidebar:** Solved count SVG Progress Ring (`#ABDAC8`), Difficulty breakdown bars, Daily Streak widget (`users.stats.streak_days`), Badges Earned preview strip, and Free Quota enforcement info.
    - Real Supabase database queries for challenges and user's `attempt_counts` / `submissions` with comprehensive fallback catalog.
- **Known gaps / notes:**
  - Additional challenge content in content/challenges will be loaded as Phase 3 matures.
- **Next recommended action:** Proceed with Phase 2 challenge workspace polish and evaluation refinements.

### [Phase 1 Complete] — Supabase Authentication & Session Navigation
- **What was built:**
  - **Signup Page (`app/(auth)/signup/page.tsx`):** Supabase `signUp` with email/password + metadata username and GitHub / Google OAuth options with email confirmation messaging.
  - **Login Page (`app/(auth)/login/page.tsx`):** Supabase `signInWithPassword` + GitHub / Google OAuth with redirect URL support and suspense boundary.
  - **User Navigation (`components/navigation/UserNav.tsx`):** Dynamic avatar header component with live auth state listener, profile dropdown menu (Dashboard, Challenges, Public Profile), and one-click Sign Out.
  - **Middleware & Route Guard:** Session refresh on all requests and strict protection for `/dashboard` and `/admin` routes.
  - **Deployed to Vercel Production:** Live at `https://staqor.vercel.app`.
- **Current phase:** Phase 1 Complete and Verified.
- **Next recommended action:** Proceed to **Phase 2 — Single Challenge, End-to-End** or challenge expansion.

### [Phase 0 Complete] — Project Scaffold, Supabase DB & Sandbox Compiler
- **What was built:**
  - **Removed MongoDB Entirely:** Replaced with Supabase PostgreSQL schema (`supabase/schema.sql`) and database query helpers (`lib/supabase/db.ts`).
  - **Side-by-Side Live Sandbox Compiler:**
    - Monaco Editor with multi-tab `index.html`, `style.css`, `script.js`, and Staqor custom dark theme.
    - Sandboxed iframe runtime (`sandbox="allow-scripts allow-modals"`) with real-time compilation, responsive viewport controls (Desktop, Tablet, Mobile), and hot-reload.
    - Live Interactive Developer Console capturing `console.log`, `warn`, `error`, and runtime exceptions.
    - AI Rubric evaluator integration with score breakdown.
  - **Deployed Live to Vercel (Without Repo):**
    - Production Live URL: **`https://staqor.vercel.app`**
    - Direct Deployment: `https://staqor-jocs2mzts-mayank-devs-projects-409df602.vercel.app`
    - Inspected and verified health check (`/api/health`) and live challenge workspace (`/challenges/interactive-pricing-card`).
- **Current phase:** Scaffold, Sandbox compiler engine, and Vercel production deployment verified.
- **Next recommended action:** Proceed with Supabase Auth form integration & profile syncing.

<!--
Template for future entries:

### [YYYY-MM-DD] — Phase N: <short title>
- What was built:
- Key decisions / deviations from docs (and why):
- Known gaps / TODOs left in this area:
- Next recommended action:
-->
