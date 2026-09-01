import { createClient as createServerSupabase } from "@/lib/supabase/server";

export interface IChallengeCode {
  html: string;
  css: string;
  js: string;
  locked_files?: ("html" | "css" | "js")[];
}

export interface IRubricItem {
  id: string;
  name: string;
  weight: number;
  criteria: string;
}

export interface IChallenge {
  id: string;
  slug: string;
  title: string;
  track: "html-css" | "javascript" | "react" | "vue" | "node-api" | "bug-fix" | "full-stack" | string;
  category?: string;
  difficulty: "easy" | "medium" | "hard";
  spec_markdown: string;
  starter_code: IChallengeCode;
  locked_files?: ("html" | "css" | "js")[];
  model_solution?: IChallengeCode;
  rubric: IRubricItem[];
  design_spec?: {
    brand_primary?: string;
    requirements?: string[];
  };
  acceptance_rate?: string;
  is_active: boolean;
  order_index: number;
}

export interface ISubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  code_submitted: IChallengeCode;
  attempt_type: "run" | "submit";
  score: number;
  passed: boolean;
  groq_response: any;
  is_public: boolean;
  created_at: string;
}

export interface IAttemptCount {
  user_id: string;
  challenge_id: string;
  run_count: number;
  submit_count: number;
}

// Fallback hardcoded initial challenge for immediate local sandbox playback even before DB migration
export const FALLBACK_CHALLENGE: IChallenge = {
  id: "77777777-7777-7777-7777-777777777777",
  slug: "interactive-pricing-card",
  title: "Interactive Pricing Card",
  track: "html-css",
  difficulty: "easy",
  spec_markdown: `# Interactive Pricing Card

Build a modern, accessible, and responsive pricing tier card component with dynamic monthly/annual billing toggle and hover interactions.

## Requirements
1. **Semantic HTML Structure**: Card container with badge, title, pricing display, feature list, and call-to-action button.
2. **Dynamic Price Switcher**: Clicking the billing toggle button updates the displayed price smoothly between **$15/mo** (Monthly) and **$12/mo** (Annual billed at $144/yr).
3. **Responsive Visual Styling**: Polished dark-mode palette (#0D0D12, #ABDAC8 accent), clean typography, border highlights, and active states.
4. **Interactive Hover Animations**: Micro-interactions on buttons and badge hover elements.`,
  starter_code: {
    html: `<div class="card-container">
  <div class="pricing-card">
    <div class="badge">Popular</div>
    <h2>Pro Tier</h2>
    <p class="subtitle">For dedicated frontend builders</p>
    <div class="price-wrapper">
      <span class="price" id="price-display">$15</span>
      <span class="period" id="period-display">/month</span>
    </div>
    <div class="billing-toggle">
      <button id="billing-btn" class="toggle-btn">Switch to Annual (Save 20%)</button>
    </div>
    <ul class="features">
      <li>✓ Unlimited AI evaluations</li>
      <li>✓ Verified portfolio badge</li>
      <li>✓ Model solution previews</li>
    </ul>
    <button id="cta-btn" class="cta-button">Get Started</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 40px 20px;
  background-color: #07070a;
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.pricing-card {
  background: #111118;
  border: 1px solid #272732;
  border-radius: 16px;
  padding: 32px;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  border-color: #abdac8;
}

.badge {
  position: absolute;
  top: -12px;
  right: 24px;
  background: #abdac8;
  color: #07070a;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
}

h2 {
  margin: 0 0 6px 0;
  font-size: 24px;
  color: #fff;
}

.subtitle {
  color: #9ca3af;
  font-size: 13px;
  margin: 0 0 20px 0;
}

.price-wrapper {
  margin-bottom: 20px;
}

.price {
  font-size: 42px;
  font-weight: 800;
  color: #abdac8;
}

.period {
  color: #6b7280;
  font-size: 14px;
}

.toggle-btn {
  background: #1f1f2e;
  border: 1px solid #374151;
  color: #d1d5db;
  font-size: 12px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 24px;
  transition: background 0.2s ease;
}

.toggle-btn:hover {
  background: #2d2d42;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px 0;
  font-size: 13px;
  color: #9ca3af;
}

.features li {
  margin-bottom: 12px;
}

.cta-button {
  width: 100%;
  background: #abdac8;
  color: #07070a;
  font-weight: 600;
  font-size: 14px;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.cta-button:hover {
  opacity: 0.9;
}`,
    js: `const billingBtn = document.getElementById("billing-btn");
const priceDisplay = document.getElementById("price-display");
const periodDisplay = document.getElementById("period-display");

let isAnnual = false;

if (billingBtn && priceDisplay && periodDisplay) {
  billingBtn.addEventListener("click", () => {
    isAnnual = !isAnnual;
    if (isAnnual) {
      priceDisplay.textContent = "$12";
      periodDisplay.textContent = "/month (billed $144/yr)";
      billingBtn.textContent = "Switch to Monthly";
    } else {
      priceDisplay.textContent = "$15";
      periodDisplay.textContent = "/month";
      billingBtn.textContent = "Switch to Annual (Save 20%)";
    }
    console.log("Billing plan toggled:", isAnnual ? "Annual ($12/mo)" : "Monthly ($15/mo)");
  });
}`
  },
  rubric: [
    {
      id: "semantic_structure",
      name: "Semantic Structure",
      weight: 25,
      criteria: "Proper card nesting, semantic elements, and accessible button/badge elements."
    },
    {
      id: "dynamic_toggle",
      name: "Dynamic Interaction",
      weight: 40,
      criteria: "Clicking billing toggle updates price and period text dynamically."
    },
    {
      id: "visual_styling",
      name: "Visual Polish & Layout",
      weight: 35,
      criteria: "Dark theme palette, accent #ABDAC8, and responsive spacing."
    }
  ],
  design_spec: {
    brand_primary: "#ABDAC8",
    requirements: ["Responsive layout", "Hover micro-animations", "Console debug logging"]
  },
  acceptance_rate: "84.2%",
  is_active: true,
  order_index: 1
};

export const INITIAL_CHALLENGES: IChallenge[] = [
  FALLBACK_CHALLENGE,
  {
    id: "77777777-7777-7777-7777-777777777778",
    slug: "debounced-search-typeahead",
    title: "Debounced Autocomplete Search Bar",
    track: "javascript",
    category: "JS/DOM",
    difficulty: "easy",
    acceptance_rate: "78.6%",
    spec_markdown: "# Debounced Autocomplete Search Bar\n\nBuild a responsive search bar with a 300ms debounce timer that queries and renders results dynamically.",
    starter_code: {
      html: `<div class="search-box">\n  <input type="text" id="search-input" placeholder="Search components..." />\n  <ul id="results-list"></ul>\n</div>`,
      css: `body { background: #07070A; color: #F3F4F6; display: flex; justify-content: center; padding: 40px; } .search-box { width: 340px; } input { width: 100%; padding: 10px 14px; background: #111118; border: 1px solid #272732; border-radius: 8px; color: #fff; }`,
      js: `// Implement 300ms debounce search handler\nconst input = document.getElementById("search-input");\nlet timer;\ninput?.addEventListener("input", (e) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => {\n    console.log("Query:", e.target.value);\n  }, 300);\n});`
    },
    rubric: [
      { id: "debounce_logic", name: "Debounce Implementation", weight: 50, criteria: "300ms timeout reset on keypress." },
      { id: "dom_render", name: "DOM Rendering", weight: 50, criteria: "Correct list item rendering." }
    ],
    is_active: true,
    order_index: 2
  },
  {
    id: "77777777-7777-7777-7777-777777777779",
    slug: "custom-dropdown-select",
    title: "Accessible Custom Select & Dropdown",
    track: "javascript",
    category: "JS/DOM",
    difficulty: "medium",
    acceptance_rate: "62.4%",
    spec_markdown: "# Accessible Custom Select\n\nConstruct an accessible keyboard-navigable dropdown menu with ARIA role attributes and focus management.",
    starter_code: {
      html: `<div class="select-container" role="combobox">\n  <button id="trigger">Choose Framework</button>\n  <ul id="options" class="hidden"></ul>\n</div>`,
      css: `.select-container { width: 280px; position: relative; font-family: sans-serif; } button { width: 100%; padding: 10px; background: #111118; border: 1px solid #272732; color: #fff; border-radius: 8px; }`,
      js: `// Accessible select toggle and key navigation`
    },
    rubric: [
      { id: "keyboard_nav", name: "Keyboard Accessibility", weight: 50, criteria: "Escape, ArrowUp, ArrowDown, and Enter key handling." }
    ],
    is_active: true,
    order_index: 3
  },
  {
    id: "77777777-7777-7777-7777-777777777780",
    slug: "multi-step-form-wizard",
    title: "Multi-Step Form Wizard with Validation",
    track: "react",
    category: "React",
    difficulty: "medium",
    acceptance_rate: "54.1%",
    spec_markdown: "# Multi-Step Form Wizard\n\nBuild a 3-step checkout wizard with client-side form validation, step progress indicators, and state persistence.",
    starter_code: {
      html: `<div id="wizard-root"></div>`,
      css: `body { background: #07070A; color: #fff; font-family: sans-serif; }`,
      js: `// React multi-step state machine`
    },
    rubric: [
      { id: "step_state", name: "Step Progression", weight: 50, criteria: "Step validation blocks progression until inputs are valid." }
    ],
    is_active: true,
    order_index: 4
  },
  {
    id: "77777777-7777-7777-7777-777777777781",
    slug: "infinite-scroll-feed",
    title: "Virtual Infinite Scroll Feed",
    track: "react",
    category: "React",
    difficulty: "hard",
    acceptance_rate: "38.9%",
    spec_markdown: "# Virtual Infinite Scroll\n\nImplement an IntersectionObserver-driven infinite scroll feed with a windowing slice to keep DOM node count constant.",
    starter_code: {
      html: `<div id="feed-container"></div>`,
      css: `#feed-container { height: 500px; overflow-y: auto; background: #111118; border: 1px solid #272732; border-radius: 12px; }`,
      js: `// IntersectionObserver pagination logic`
    },
    rubric: [
      { id: "observer_setup", name: "IntersectionObserver Logic", weight: 60, criteria: "Observer triggers next page fetch cleanly." }
    ],
    is_active: true,
    order_index: 5
  },
  {
    id: "77777777-7777-7777-7777-777777777782",
    slug: "kanban-board-drag-drop",
    title: "Kanban Task Board with Drag & Drop",
    track: "react",
    category: "React",
    difficulty: "hard",
    acceptance_rate: "31.5%",
    spec_markdown: "# Kanban Task Board\n\nImplement a three-column Kanban board (Todo, In Progress, Done) with HTML5 Drag and Drop events and persistent card reordering.",
    starter_code: {
      html: `<div class="kanban-board"></div>`,
      css: `.kanban-board { display: flex; gap: 16px; padding: 20px; }`,
      js: `// Drag and drop event handlers`
    },
    rubric: [
      { id: "drag_events", name: "Drag & Drop", weight: 60, criteria: "dragstart, dragover, and drop event mechanics." }
    ],
    is_active: true,
    order_index: 6
  },
  {
    id: "77777777-7777-7777-7777-777777777783",
    slug: "responsive-navbar-drawer",
    title: "Responsive Navigation Drawer & Backdrop",
    track: "html-css",
    category: "HTML/CSS",
    difficulty: "easy",
    acceptance_rate: "89.3%",
    spec_markdown: "# Responsive Navigation Drawer\n\nBuild a mobile-first header with hamburger toggle, slide-out side drawer, and blur backdrop.",
    starter_code: {
      html: `<header class="nav-bar">\n  <div class="logo">Brand</div>\n  <button id="hamburger">☰</button>\n  <nav id="drawer" class="drawer">Links</nav>\n</header>`,
      css: `.nav-bar { display: flex; justify-content: space-between; padding: 16px; }`,
      js: `// Toggle drawer visibility class`
    },
    rubric: [
      { id: "responsive_css", name: "CSS Transitions", weight: 50, criteria: "Smooth slide-in drawer on mobile viewport." }
    ],
    is_active: true,
    order_index: 7
  },
  {
    id: "77777777-7777-7777-7777-777777777784",
    slug: "vue-reactive-data-table",
    title: "Paginated & Sortable Data Grid",
    track: "vue",
    category: "Vue",
    difficulty: "medium",
    acceptance_rate: "67.0%",
    spec_markdown: "# Vue Reactive Data Table\n\nConstruct a dynamic table component with column sorting, search query filtering, and page slicing.",
    starter_code: {
      html: `<div id="app"></div>`,
      css: `table { width: 100%; border-collapse: collapse; }`,
      js: `// Vue 3 Composition API setup`
    },
    rubric: [
      { id: "computed_sort", name: "Computed Sorting", weight: 50, criteria: "Ascending/descending sort reactive state." }
    ],
    is_active: true,
    order_index: 8
  },
  {
    id: "77777777-7777-7777-7777-777777777785",
    slug: "api-rate-limiter-token",
    title: "Token Bucket API Rate-Limiter",
    track: "node-api",
    category: "Node.js/API",
    difficulty: "medium",
    acceptance_rate: "58.2%",
    spec_markdown: "# Token Bucket API Rate-Limiter\n\nCreate a server middleware function implementing the Token Bucket algorithm with refill rate intervals.",
    starter_code: {
      html: `<div class="rate-tester"></div>`,
      css: `.rate-tester { padding: 20px; font-family: monospace; }`,
      js: `// Token bucket algorithm implementation`
    },
    rubric: [
      { id: "token_bucket", name: "Bucket Capacity & Refill", weight: 60, criteria: "Proper refill timing and 429 response emission." }
    ],
    is_active: true,
    order_index: 9
  },
  {
    id: "77777777-7777-7777-7777-777777777786",
    slug: "dom-memory-leak-fix",
    title: "Fix Event Listener Memory Leak in Virtual List",
    track: "bug-fix",
    category: "Bug-Fix",
    difficulty: "hard",
    acceptance_rate: "42.8%",
    spec_markdown: "# Fix Event Listener Memory Leak\n\nIdentify and rectify detached DOM tree memory leaks caused by uncleaned scroll listeners and cyclic closures.",
    starter_code: {
      html: `<div id="virtual-container"></div>`,
      css: `#virtual-container { height: 400px; overflow: scroll; }`,
      js: `// Buggy implementation with unremoved event listeners`
    },
    rubric: [
      { id: "cleanup_leak", name: "Memory Leak Cleanup", weight: 70, criteria: "Proper removeEventListener and weak references." }
    ],
    is_active: true,
    order_index: 10
  },
  {
    id: "77777777-7777-7777-7777-777777777787",
    slug: "realtime-chat-ui",
    title: "Real-Time WebSocket Chat Stream",
    track: "full-stack",
    category: "Full-Stack",
    difficulty: "hard",
    acceptance_rate: "36.4%",
    spec_markdown: "# Real-Time WebSocket Chat UI\n\nBuild an active chat client with optimistic message rendering, typing status indicators, and reconnection backoff.",
    starter_code: {
      html: `<div class="chat-app"></div>`,
      css: `.chat-app { width: 400px; height: 500px; display: flex; flex-direction: column; }`,
      js: `// Simulated WebSocket client with reconnection logic`
    },
    rubric: [
      { id: "optimistic_ui", name: "Optimistic Rendering", weight: 50, criteria: "Immediate message render with pending state." }
    ],
    is_active: true,
    order_index: 11
  }
];

export async function getChallengeBySlug(slug: string): Promise<IChallenge> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const match = INITIAL_CHALLENGES.find((c) => c.slug === slug);
      return match || FALLBACK_CHALLENGE;
    }
    return data as IChallenge;
  } catch {
    const match = INITIAL_CHALLENGES.find((c) => c.slug === slug);
    return match || FALLBACK_CHALLENGE;
  }
}

export async function getAllChallenges(): Promise<IChallenge[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("challenges")
      .select("id, slug, title, track, difficulty, order_index, is_active, acceptance_rate")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_CHALLENGES;
    }
    
    // Map track to human-friendly category if category is not in DB column
    const formatted = data.map((ch: any) => {
      let category = ch.category;
      if (!category) {
        if (ch.track === "html-css") category = "HTML/CSS";
        else if (ch.track === "javascript") category = "JS/DOM";
        else if (ch.track === "react") category = "React";
        else if (ch.track === "vue") category = "Vue";
        else if (ch.track === "node-api") category = "Node.js/API";
        else if (ch.track === "bug-fix") category = "Bug-Fix";
        else if (ch.track === "full-stack") category = "Full-Stack";
        else category = ch.track;
      }
      return {
        ...ch,
        category,
        acceptance_rate: ch.acceptance_rate || "74.5%"
      };
    });

    return formatted as IChallenge[];
  } catch {
    return INITIAL_CHALLENGES;
  }
}

export async function getAttemptCount(userId: string, challengeId: string): Promise<IAttemptCount> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("attempt_counts")
      .select("*")
      .eq("user_id", userId)
      .eq("challenge_id", challengeId)
      .single();

    if (error || !data) {
      return { user_id: userId, challenge_id: challengeId, run_count: 0, submit_count: 0 };
    }
    return data as IAttemptCount;
  } catch {
    return { user_id: userId, challenge_id: challengeId, run_count: 0, submit_count: 0 };
  }
}

export interface IUserChallengeStats {
  attemptCounts: Record<string, { run_count: number; submit_count: number }>;
  solvedChallengeIds: string[];
  totalSolved: number;
  totalChallenges: number;
  streakDays: number;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    tier: "bronze" | "silver" | "gold";
    unlocked: boolean;
  }>;
  difficultyStats: {
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
  };
}

export async function getUserChallengeStats(
  userId: string | null | undefined,
  challenges: IChallenge[]
): Promise<IUserChallengeStats> {
  const easyTotal = challenges.filter((c) => c.difficulty === "easy").length;
  const mediumTotal = challenges.filter((c) => c.difficulty === "medium").length;
  const hardTotal = challenges.filter((c) => c.difficulty === "hard").length;

  const defaultStats: IUserChallengeStats = {
    attemptCounts: {},
    solvedChallengeIds: [],
    totalSolved: 0,
    totalChallenges: challenges.length,
    streakDays: userId ? 1 : 0,
    badges: [
      {
        id: "first-solve",
        title: "First Step",
        description: "Passed your first AI-evaluated challenge",
        tier: "bronze",
        unlocked: false,
      },
      {
        id: "clean-code",
        title: "Clean Coder",
        description: "Scored 90+ on code structure and rubric",
        tier: "silver",
        unlocked: false,
      },
      {
        id: "streak-master",
        title: "Consistent Builder",
        description: "Practiced 3 days in a row",
        tier: "gold",
        unlocked: false,
      },
      {
        id: "react-virtuoso",
        title: "React Virtuoso",
        description: "Solved 3 React component challenges",
        tier: "gold",
        unlocked: false,
      },
    ],
    difficultyStats: {
      easy: { solved: 0, total: easyTotal },
      medium: { solved: 0, total: mediumTotal },
      hard: { solved: 0, total: hardTotal },
    },
  };

  if (!userId) return defaultStats;

  try {
    const supabase = await createServerSupabase();
    const [attemptsRes, submissionsRes, profileRes] = await Promise.all([
      supabase.from("attempt_counts").select("*").eq("user_id", userId),
      supabase.from("submissions").select("challenge_id, passed, score").eq("user_id", userId),
      supabase.from("profiles").select("total_solves").eq("id", userId).single(),
    ]);

    const attemptCounts: Record<string, { run_count: number; submit_count: number }> = {};
    if (attemptsRes.data) {
      for (const item of attemptsRes.data) {
        attemptCounts[item.challenge_id] = {
          run_count: item.run_count || 0,
          submit_count: item.submit_count || 0,
        };
      }
    }

    const solvedSet = new Set<string>();
    if (submissionsRes.data) {
      for (const sub of submissionsRes.data) {
        if (sub.passed || (typeof sub.score === "number" && sub.score >= 80)) {
          solvedSet.add(sub.challenge_id);
        }
      }
    }

    const solvedChallengeIds = Array.from(solvedSet);

    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    for (const ch of challenges) {
      if (solvedSet.has(ch.id) || solvedSet.has(ch.slug)) {
        if (ch.difficulty === "easy") easySolved++;
        if (ch.difficulty === "medium") mediumSolved++;
        if (ch.difficulty === "hard") hardSolved++;
      }
    }

    const totalSolved = profileRes.data?.total_solves || solvedChallengeIds.length;

    const badges = defaultStats.badges.map((badge) => {
      if (badge.id === "first-solve" && totalSolved >= 1) return { ...badge, unlocked: true };
      if (badge.id === "clean-code" && submissionsRes.data?.some((s: any) => s.score >= 90)) return { ...badge, unlocked: true };
      if (badge.id === "streak-master" && totalSolved >= 3) return { ...badge, unlocked: true };
      return badge;
    });

    return {
      attemptCounts,
      solvedChallengeIds,
      totalSolved,
      totalChallenges: challenges.length,
      streakDays: totalSolved > 0 ? Math.min(totalSolved + 1, 7) : 1,
      badges,
      difficultyStats: {
        easy: { solved: easySolved, total: easyTotal },
        medium: { solved: mediumSolved, total: mediumTotal },
        hard: { solved: hardSolved, total: hardTotal },
      },
    };
  } catch (err) {
    console.error("Error fetching user challenge stats:", err);
    return defaultStats;
  }
}

