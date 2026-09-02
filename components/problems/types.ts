import { PROBLEMS_DATA } from "@/lib/problems-data";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProblemStatus = "solved" | "attempted" | "unsolved";
export type Category =
  | "All Topics"
  | "HTML & CSS"
  | "JavaScript DOM"
  | "React & UI"
  | "Web APIs"
  | "Node.js & Backend";

export interface Problem {
  id: any;
  title: string;
  slug: string;
  acceptance: string;
  difficulty: Difficulty;
  status: ProblemStatus;
  favorite: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;
  hasSolution?: boolean;
  hasVideo?: boolean;
  category: Category;
  tags: string[];
  companies: string[];
  frequency?: number;
}

export interface TopicTag {
  name: string;
  count: number;
}

export interface Company {
  name: string;
  count: number;
  icon?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  cta: string;
  gradient: string;
  borderGlow: string;
  link: string;
}

export interface NavListItem {
  id: string;
  name: string;
  count: number;
  isPrivate: boolean;
}

export const MOCK_TOPICS: TopicTag[] = [
  { name: "CSS Grid & Flexbox", count: 24 },
  { name: "DOM Manipulation", count: 32 },
  { name: "React & UI", count: 18 },
  { name: "Web APIs & Observers", count: 15 },
  { name: "Animations & Transitions", count: 20 },
  { name: "Form Validation", count: 12 },
  { name: "Design Systems", count: 22 },
  { name: "Canvas & SVG", count: 8 },
];

export const MOCK_SAVED_TOPICS = [
  "CSS Grid & Flexbox",
  "DOM Manipulation",
  "React & UI",
  "Web APIs & Observers",
  "Animations & Transitions",
];

export const MOCK_COMPANIES: Company[] = [
  { name: "Vercel", count: 18 },
  { name: "Stripe", count: 22 },
  { name: "Airbnb", count: 14 },
  { name: "Meta", count: 26 },
  { name: "Figma", count: 16 },
  { name: "Linear", count: 12 },
  { name: "Netflix", count: 15 },
  { name: "Google", count: 24 },
  { name: "Apple", count: 19 },
  { name: "Shopify", count: 17 },
];

export const MOCK_PROMO_BANNERS: PromoBanner[] = [
  {
    id: "staqor-50-master",
    title: "50 Master Frontend Challenges",
    subtitle: "From Typography & Flexbox to Full Production Web Apps & AI Evaluation in <2.5s",
    badge: "Curriculum",
    cta: "Start Solving",
    gradient: "from-[#0d231d] via-[#111c18] to-[#111117]",
    borderGlow: "border-primary/40 hover:border-primary",
    link: "/problems",
  },
  {
    id: "frontend-system-design",
    title: "Level 4 Production Apps",
    subtitle: "Build Full Portfolios, E-Commerce Stores, Kanban Boards, and Weather Portals",
    badge: "Level 4",
    cta: "View Challenges",
    gradient: "from-[#1d1633] via-[#151324] to-[#111117]",
    borderGlow: "border-purple-500/30 hover:border-purple-400/60",
    link: "/problems?category=Web+APIs",
  },
  {
    id: "weekly-ui-arena",
    title: "Interactive DOM Components",
    subtitle: "Master Modals, Sliders, Dropdowns, Toast Systems, and Range Sliders",
    badge: "Level 2",
    cta: "Explore Now",
    gradient: "from-[#291a18] via-[#1c1415] to-[#111117]",
    borderGlow: "border-orange-500/30 hover:border-orange-400/60",
    link: "/problems?category=JavaScript+DOM",
  },
];

export const MOCK_PROBLEMS: Problem[] = PROBLEMS_DATA.map((p, index) => ({
  id: p.id,
  title: `${p.number}. ${p.title}`,
  slug: p.slug,
  acceptance: p.acceptance,
  difficulty: p.difficulty,
  status: "unsolved",
  favorite: false,
  isFeatured: index < 5 || index % 10 === 0,
  hasSolution: true,
  hasVideo: false,
  category: p.category as Category,
  tags: p.tags,
  companies: p.companies,
  frequency: Math.max(70, 99 - index),
}));
