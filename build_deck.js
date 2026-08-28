const pptxgen = require('pptxgenjs');
const path = require('path');

// Initialize presentation
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10" x 5.625"
pres.title = 'Staqor — Team Technical Walkthrough & Architecture Specification';
pres.author = 'Staqor Engineering';
pres.company = 'Staqor Platform';

// Color Palette Constants (No # prefixes per pptxgenjs spec)
const C_BG = '0A0A0F';         // Base Canvas
const C_CARD = '111117';       // Content Panels / Cards
const C_CARD_ALT = '16161F';   // Elevated / Highlight Cards
const C_BORDER = '26262E';     // Subtle 1px borders
const C_MINT = 'ABDAC8';       // Sage Mint Primary Accent
const C_MINT_DARK = '111614';  // Mint Tint Background
const C_TEXT = 'F5F5F7';       // Primary Text
const C_MUTED = '9CA3AF';      // Secondary / Muted Text
const C_SUBMUTED = '6B7280';   // Footers / Labels
const C_SUCCESS = '4ADE80';    // Pass Green
const C_ERROR = 'F87171';      // Fail Red
const C_WARNING = 'FBBF24';    // Warning Amber

const FONT_TITLE = 'Arial';
const FONT_BODY = 'Calibri';
const FONT_MONO = 'Consolas';

const TOTAL_SLIDES = 12;

// Reusable Header Helper
function addHeader(slide, eyebrow, slideNum) {
  // Eyebrow label
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.6, y: 0.3, w: 6.5, h: 0.25,
    fontFace: FONT_BODY, fontSize: 8.5, bold: true, color: C_MINT,
    charSpacing: 1.5, margin: 0
  });

  // Slide Number Pill
  slide.addShape(pres.ShapeType.roundRect, {
    x: 8.1, y: 0.28, w: 1.3, h: 0.28,
    fill: { color: '16161F' },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.08
  });
  slide.addText(`SLIDE ${slideNum} OF ${TOTAL_SLIDES}`, {
    x: 8.1, y: 0.28, w: 1.3, h: 0.28,
    fontFace: FONT_MONO, fontSize: 7.5, bold: true, color: C_MUTED,
    align: 'center', valign: 'middle', margin: 0
  });

  // Top Divider Line
  slide.addShape(pres.ShapeType.line, {
    x: 0.6, y: 0.62, w: 8.8, h: 0,
    line: { color: C_BORDER, width: 1 }
  });
}

// Reusable Title Helper
function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.6, y: 0.72, w: 8.8, h: 0.45,
    fontFace: FONT_TITLE, fontSize: 18, bold: true, color: C_TEXT,
    margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.18, w: 8.8, h: 0.28,
      fontFace: FONT_BODY, fontSize: 10.5, color: C_MUTED,
      margin: 0
    });
  }
}

// ============================================================================
// SLIDE 1: TITLE / COVER SLIDE
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };

  // Eyebrow Tag
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 0.6, w: 3.2, h: 0.32,
    fill: { color: '111614' },
    line: { color: '26352E', width: 1 },
    rectRadius: 0.08
  });
  slide.addText('STAQOR // TEAM TECHNICAL WALKTHROUGH', {
    x: 0.6, y: 0.6, w: 3.2, h: 0.32,
    fontFace: FONT_BODY, fontSize: 8, bold: true, color: C_MINT,
    align: 'center', valign: 'middle', charSpacing: 1.5, margin: 0
  });

  // Main Headline
  slide.addText([
    { text: 'Staqor: ', options: { color: C_TEXT } },
    { text: 'In-Browser IDE & AI Rubric Platform', options: { color: C_MINT } }
  ], {
    x: 0.6, y: 1.1, w: 8.8, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 28, bold: true,
    margin: 0
  });

  // Subtitle
  slide.addText(
    'A developer platform for real-world frontend and component challenges with in-browser split-screen Monaco sandboxing, Groq LPU rubric evaluation (<2.5s), and live interactive recruiter portfolios.',
    {
      x: 0.6, y: 2.1, w: 8.8, h: 0.6,
      fontFace: FONT_BODY, fontSize: 12, color: C_MUTED, lineSpacingMultiple: 1.25,
      margin: 0
    }
  );

  // 4 Metadata Stat Cards
  const metaCards = [
    { label: 'PRODUCT RELEASE', val: 'v1.0 Production MVP' },
    { label: 'BRAND ACCENT', val: '#ABDAC8 (Sage Mint)' },
    { label: 'EXECUTION MODEL', val: '100% Client Sandboxing' },
    { label: 'GRADING ENGINE', val: 'Groq LPU (Sub-2.5s)' }
  ];

  metaCards.forEach((item, i) => {
    const cardX = 0.6 + i * 2.25;
    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 3.1, w: 2.05, h: 1.15,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.1
    });

    slide.addText(item.label, {
      x: cardX + 0.15, y: 3.25, w: 1.75, h: 0.25,
      fontFace: FONT_BODY, fontSize: 7.5, bold: true, color: C_SUBMUTED,
      charSpacing: 1, margin: 0
    });

    slide.addText(item.val, {
      x: cardX + 0.15, y: 3.55, w: 1.75, h: 0.55,
      fontFace: FONT_TITLE, fontSize: 11, bold: true, color: (i === 1 ? C_MINT : C_TEXT),
      margin: 0
    });
  });

  // Slide Footer
  slide.addShape(pres.ShapeType.line, {
    x: 0.6, y: 4.8, w: 8.8, h: 0,
    line: { color: C_BORDER, width: 1 }
  });
  slide.addText('CONFIDENTIAL • STAQOR ENGINEERING KICKOFF SPECIFICATION • VERSION 1.0', {
    x: 0.6, y: 4.95, w: 8.8, h: 0.25,
    fontFace: FONT_MONO, fontSize: 8, color: C_SUBMUTED, margin: 0
  });

  slide.addNotes('Welcome team. Today we are walking through the complete architecture and technical specification for Staqor v1.0 MVP.');
}

// ============================================================================
// SLIDE 2: PROBLEM & THE STAQOR PARADIGM SHIFT
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Market Need & Problem Statement', 2);
  addSlideTitle(slide, 'Why Traditional Coding Platforms Fail Frontend Devs', 'Traditional test runners check stdout assertions, not visual craftsmanship or DOM fidelity.');

  // Left Card: Broken Paradigm (Red)
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: '3A1E1E', width: 1 },
    rectRadius: 0.12
  });

  // Header tag
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.85, y: 1.85, w: 1.8, h: 0.28,
    fill: { color: '2A1414' },
    line: { color: '4A2020', width: 1 },
    rectRadius: 0.06
  });
  slide.addText('BROKEN PARADIGM', {
    x: 0.85, y: 1.85, w: 1.8, h: 0.28,
    fontFace: FONT_BODY, fontSize: 8, bold: true, color: C_ERROR,
    align: 'center', valign: 'middle', margin: 0
  });

  slide.addText('The Problem in Existing Platforms', {
    x: 0.85, y: 2.25, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 13, bold: true, color: C_TEXT, margin: 0
  });

  slide.addText([
    { text: 'Algorithmic Disconnect:\n', options: { bold: true, color: C_TEXT } },
    { text: 'LeetCode tests binary trees and two-pointer puzzles that ignore CSS layouts, DOM events, and component design.\n\n', options: { color: C_MUTED } },
    { text: 'Unit Test Design Blindness:\n', options: { bold: true, color: C_TEXT } },
    { text: 'Jest/Mocha assertions check return values—they cannot evaluate visual aesthetics, hierarchy, contrast, or responsiveness.\n\n', options: { color: C_MUTED } },
    { text: 'The "Dead Portfolio" Epidemic:\n', options: { bold: true, color: C_TEXT } },
    { text: 'Candidates link static GitHub repos and screenshots that hiring managers and recruiters rarely clone or run locally.', options: { color: C_MUTED } }
  ], {
    x: 0.85, y: 2.65, w: 3.75, h: 2.25,
    fontFace: FONT_BODY, fontSize: 9.5, margin: 0
  });

  // Right Card: The Staqor Solution (Mint)
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: '111614' },
    line: { color: '1E332B', width: 1 },
    rectRadius: 0.12
  });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.4, y: 1.85, w: 1.8, h: 0.28,
    fill: { color: '162B22' },
    line: { color: '264738', width: 1 },
    rectRadius: 0.06
  });
  slide.addText('THE STAQOR FIX', {
    x: 5.4, y: 1.85, w: 1.8, h: 0.28,
    fontFace: FONT_BODY, fontSize: 8, bold: true, color: C_MINT,
    align: 'center', valign: 'middle', margin: 0
  });

  slide.addText('How Staqor Solves It', {
    x: 5.4, y: 2.25, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 13, bold: true, color: C_TEXT, margin: 0
  });

  slide.addText([
    { text: 'Real Product & UI Challenges:\n', options: { bold: true, color: C_TEXT } },
    { text: 'Users code real HTML/CSS, JS DOM, React, and Vue components inside a multi-tab Monaco IDE with instant preview.\n\n', options: { color: C_MUTED } },
    { text: 'Groq AI Rubric Judge:\n', options: { bold: true, color: C_TEXT } },
    { text: 'AI scores submitted code against weighted rubrics (design, logic, edge cases) in <2.5s with qualitative feedback.\n\n', options: { color: C_MUTED } },
    { text: 'Live Provable Portfolios:\n', options: { bold: true, color: C_TEXT } },
    { text: 'Passed solutions generate interactive read-only sandboxes that recruiters can test live in the browser with zero setup.', options: { color: C_MUTED } }
  ], {
    x: 5.4, y: 2.65, w: 3.75, h: 2.25,
    fontFace: FONT_BODY, fontSize: 9.5, margin: 0
  });

  slide.addNotes('Explain the fundamental problem: LeetCode solves the backend algorithm problem, but frontend engineering is about UI fidelity, DOM events, and interactive user experience.');
}

// ============================================================================
// SLIDE 3: COMPETITIVE LANDSCAPE & COMPARISON MATRIX
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Market Positioning & Competitive Matrix', 3);
  addSlideTitle(slide, 'How Staqor Outperforms Existing Platforms', 'Comparison of execution model, grading philosophy, and recruiter deliverable.');

  const tableRows = [
    [
      { text: 'PLATFORM', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'CORE TESTING FOCUS', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'GRADING MECHANISM', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'DESIGN FIDELITY', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'RECRUITER PROOF', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } }
    ],
    [
      { text: 'LeetCode / HackerRank', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Abstract Algorithms & Big-O', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Server stdout assertions', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'None (0%)', options: { color: C_ERROR, bold: true, fill: { color: C_CARD } } },
      { text: 'Static percentile scores', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Frontend Mentor', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: 'Static UI reproduction', options: { color: C_MUTED, fill: { color: '0E0E14' } } },
      { text: 'Manual peer reviews / diffs', options: { color: C_MUTED, fill: { color: '0E0E14' } } },
      { text: 'Visual snapshot diffs', options: { color: C_WARNING, bold: true, fill: { color: '0E0E14' } } },
      { text: 'Static GitHub repo links', options: { color: C_MUTED, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'CodeSignal / Codility', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Generic test suites', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Automated unit test suites', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'None (Brittle regex)', options: { color: C_ERROR, bold: true, fill: { color: C_CARD } } },
      { text: 'PDF assessment report', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Staqor (This Platform)', options: { bold: true, color: C_MINT, fill: { color: '111614' } } },
      { text: 'Real UI, DOM & React Craft', options: { bold: true, color: C_TEXT, fill: { color: '111614' } } },
      { text: 'Groq AI Multi-Metric Rubric', options: { bold: true, color: C_MINT, fill: { color: '111614' } } },
      { text: 'Full Multi-Metric (35%)', options: { color: C_SUCCESS, bold: true, fill: { color: '111614' } } },
      { text: 'Live Interactive Replay', options: { color: C_MINT, bold: true, fill: { color: '111614' } } }
    ]
  ];

  slide.addTable(tableRows, {
    x: 0.6, y: 1.6, w: 8.8,
    rowH: [0.4, 0.6, 0.6, 0.6, 0.65],
    colW: [2.0, 1.8, 1.8, 1.6, 1.6],
    border: { type: 'solid', pt: 1, color: C_BORDER },
    fontFace: FONT_BODY, fontSize: 9,
    valign: 'middle', align: 'left',
    margin: [4, 8, 4, 8]
  });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 4.6, w: 8.8, h: 0.6,
    fill: { color: '111614' },
    line: { color: '264738', width: 1 },
    rectRadius: 0.08
  });
  slide.addText('KEY TAKEAWAY: Staqor is the only platform combining real-time sandboxed IDE execution, multi-criteria AI rubric grading, and a zero-install live portfolio for tech recruiters.', {
    x: 0.8, y: 4.6, w: 8.4, h: 0.6,
    fontFace: FONT_BODY, fontSize: 9.5, bold: true, color: C_MINT,
    valign: 'middle', margin: 0
  });

  slide.addNotes('Walk through each competitor to show where Staqor wins: real UI evaluation + live portfolios.');
}

// ============================================================================
// SLIDE 4: THE 4 CORE ARCHITECTURAL PILLARS
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Core Product Foundation', 4);
  addSlideTitle(slide, 'Four Non-Negotiable System Pillars', 'Architectural principles that guide every feature and constraint in Staqor.');

  const pillars = [
    {
      num: '01',
      title: 'Zero-Server Sandboxing',
      desc: 'All user code executes client-side inside an isolated iframe with loop-killers. Zero Docker spin-up lag and zero server execution attack surface.'
    },
    {
      num: '02',
      title: 'AI Judge, Not Test Runners',
      desc: 'Groq LPU scores code against weighted multi-criteria JSON rubrics, evaluating code aesthetics, DOM logic, responsiveness, and architecture.'
    },
    {
      num: '03',
      title: 'Live Provable Portfolios',
      desc: 'Passed solutions are stored in MongoDB and rendered with read-only Monaco tabs and live iframe embeds for zero-setup recruiter verification.'
    },
    {
      num: '04',
      title: 'Anti-Abuse Economy',
      desc: '5 Run / 3 Submit lifetime limits per challenge for Free users prevent API cost inflation and drive high-intent Pro upgrades ($15/mo).'
    }
  ];

  pillars.forEach((p, i) => {
    const cardX = 0.6 + i * 2.25;
    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 2.05, h: 3.5,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.12
    });

    slide.addText(p.num, {
      x: cardX + 0.15, y: 1.85, w: 1.75, h: 0.45,
      fontFace: FONT_TITLE, fontSize: 24, bold: true, color: C_MINT, margin: 0
    });

    slide.addText(p.title, {
      x: cardX + 0.15, y: 2.4, w: 1.75, h: 0.6,
      fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_TEXT, margin: 0
    });

    slide.addShape(pres.ShapeType.line, {
      x: cardX + 0.15, y: 3.1, w: 1.75, h: 0,
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(p.desc, {
      x: cardX + 0.15, y: 3.25, w: 1.75, h: 1.65,
      fontFace: FONT_BODY, fontSize: 9.5, color: C_MUTED, lineSpacingMultiple: 1.35, margin: 0
    });
  });

  slide.addNotes('Review the 4 core pillars with the team. Emphasize that these 4 rules are non-negotiable across all code reviews.');
}

// ============================================================================
// SLIDE 5: USER JOURNEY WORKFLOW
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'User Experience & Lifecycle', 5);
  addSlideTitle(slide, 'End-to-End User Journey Workflow', 'From challenge discovery in the browser to landing software engineering job offers.');

  const stages = [
    { num: 'STEP 1', title: 'Discover & Filter', desc: 'User filters challenge catalog by track (HTML/CSS, JS DOM, React) and difficulty.' },
    { num: 'STEP 2', title: 'In-Browser IDE', desc: 'Reads spec, writes code in Monaco, views live debounced iframe render.' },
    { num: 'STEP 3', title: 'Diagnostic Run', desc: 'Clicks RUN (<=5). Groq AI returns rapid design feedback & bug guidance in <2.5s.' },
    { num: 'STEP 4', title: 'Formal Submit', desc: 'Clicks SUBMIT (<=3). Strict rubric evaluation. >=80% triggers Pass state.' },
    { num: 'STEP 5', title: 'Recruiter Proof', desc: 'Passed code publishes to public profile. Recruiters test working solution live.' }
  ];

  stages.forEach((st, i) => {
    const cardX = 0.6 + i * 1.8;
    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 1.6, h: 2.2,
      fill: { color: C_CARD },
      line: { color: (i === 3 ? '264738' : C_BORDER), width: 1 },
      rectRadius: 0.1
    });

    slide.addText(st.num, {
      x: cardX + 0.1, y: 1.8, w: 1.4, h: 0.25,
      fontFace: FONT_BODY, fontSize: 7.5, bold: true, color: (i === 3 ? C_MINT : C_SUBMUTED),
      charSpacing: 1, margin: 0
    });

    slide.addText(st.title, {
      x: cardX + 0.1, y: 2.1, w: 1.4, h: 0.45,
      fontFace: FONT_TITLE, fontSize: 11, bold: true, color: C_TEXT, margin: 0
    });

    slide.addText(st.desc, {
      x: cardX + 0.1, y: 2.6, w: 1.4, h: 1.05,
      fontFace: FONT_BODY, fontSize: 8.5, color: C_MUTED, lineSpacingMultiple: 1.3, margin: 0
    });

    if (i < 4) {
      slide.addText('→', {
        x: cardX + 1.58, y: 2.3, w: 0.25, h: 0.4,
        fontFace: FONT_TITLE, fontSize: 14, bold: true, color: C_MINT,
        align: 'center', margin: 0
      });
    }
  });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 4.0, w: 8.8, h: 1.15,
    fill: { color: '16161F' },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.1
  });

  slide.addText([
    { text: 'TARGET PERSONAS SERVED ACROSS THE JOURNEY:\n', options: { bold: true, color: C_MINT, fontSize: 8.5 } },
    { text: '• CS Students / Bootcamp Grads: ', options: { bold: true, color: C_TEXT, fontSize: 9 } },
    { text: 'Practice real UI layouts with immediate AI coaching.\n', options: { color: C_MUTED, fontSize: 9 } },
    { text: '• Job-Seeking Devs: ', options: { bold: true, color: C_TEXT, fontSize: 9 } },
    { text: 'Build provable live portfolios with verified badges.\n', options: { color: C_MUTED, fontSize: 9 } },
    { text: '• Tech Recruiters & Leads: ', options: { bold: true, color: C_TEXT, fontSize: 9 } },
    { text: 'One-click verification of candidate code without cloning repos.', options: { color: C_MUTED, fontSize: 9 } }
  ], {
    x: 0.8, y: 4.1, w: 8.4, h: 0.95,
    fontFace: FONT_BODY, margin: 0
  });

  slide.addNotes('Walk through the user journey from browsing a challenge to getting evaluated and sharing the public recruiter portfolio.');
}

// ============================================================================
// SLIDE 6: SYSTEM ARCHITECTURE & 3-TIER TOPOLOGY
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Engineering Specification', 6);
  addSlideTitle(slide, 'High-Level System Topology & Component Boundaries', 'Modular 3-tier architecture with clean separation of client, gateway, and inference layers.');

  const tiers = [
    {
      title: '1. CLIENT PRESENTATION',
      tag: 'Next.js 14 App Router',
      items: [
        { label: 'Marketing & Auth: ', desc: 'Landing, pricing, login/signup (GSAP)' },
        { label: 'Workspace Shell: ', desc: 'VS Code dark theme + Monaco editor' },
        { label: 'Sandboxed Preview: ', desc: 'Isolated iframe srcdoc + loop killer' },
        { label: 'Public Portfolio: ', desc: 'Read-only Monaco + live replay' }
      ]
    },
    {
      title: '2. LOGIC & API GATEWAY',
      tag: 'Node.js Route Handlers',
      items: [
        { label: 'Auth & Middleware: ', desc: 'JWT in Secure HTTP-only cookies' },
        { label: 'Quota Guard: ', desc: 'Server lifetime attempt check (5/3)' },
        { label: 'Rate Limiting: ', desc: '10 req/min/IP + 1MB payload ceiling' },
        { label: 'AI Adapter: ', desc: 'Prompt builder & 3-tier retry logic' }
      ]
    },
    {
      title: '3. DATA & INFERENCE',
      tag: 'Groq LPU + MongoDB Atlas',
      items: [
        { label: 'Groq LPU Cloud: ', desc: 'Sub-2.5s inference in JSON mode' },
        { label: 'MongoDB Atlas: ', desc: 'Mongoose models (users, challenges)' },
        { label: 'Stripe Billing: ', desc: 'Webhooks for real-time role sync' },
        { label: 'Model Masking: ', desc: 'Hidden until user attempts spent' }
      ]
    }
  ];

  tiers.forEach((t, i) => {
    const cardX = 0.6 + i * 3.0;
    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 2.8, h: 3.5,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.12
    });

    slide.addText(t.title, {
      x: cardX + 0.15, y: 1.8, w: 2.5, h: 0.3,
      fontFace: FONT_TITLE, fontSize: 10, bold: true, color: C_MINT, margin: 0
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX + 0.15, y: 2.15, w: 1.8, h: 0.24,
      fill: { color: '16161F' },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.05
    });
    slide.addText(t.tag, {
      x: cardX + 0.15, y: 2.15, w: 1.8, h: 0.24,
      fontFace: FONT_BODY, fontSize: 7.5, bold: true, color: C_TEXT,
      align: 'center', valign: 'middle', margin: 0
    });

    slide.addShape(pres.ShapeType.line, {
      x: cardX + 0.15, y: 2.5, w: 2.5, h: 0,
      line: { color: C_BORDER, width: 1 }
    });

    // Clean bullet text block without double-bullets
    const formattedRuns = [];
    t.items.forEach((it, idx) => {
      formattedRuns.push({ text: `• ${it.label}`, options: { bold: true, color: C_TEXT, fontSize: 8.5 } });
      formattedRuns.push({ text: `${it.desc}${idx < t.items.length - 1 ? '\n\n' : ''}`, options: { color: C_MUTED, fontSize: 8.5 } });
    });

    slide.addText(formattedRuns, {
      x: cardX + 0.15, y: 2.65, w: 2.5, h: 2.3,
      fontFace: FONT_BODY, margin: 0
    });
  });

  slide.addNotes('Review the 3-tier boundary: client state in React, server verification in Next.js routes, AI inference in Groq LPU.');
}

// ============================================================================
// SLIDE 7: TECH STACK BREAKDOWN & RATIONALE
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Technical Stack & Dependencies', 7);
  addSlideTitle(slide, 'Full-Stack Technical Stack & Selection Rationale', 'Strict library choices for maximum developer speed, low overhead, and high security.');

  const stackRows = [
    [
      { text: 'LAYER', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'TECHNOLOGY CHOICE', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'RESPONSIBILITY IN STAQOR', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'SELECTION RATIONALE', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } }
    ],
    [
      { text: 'Web Framework', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Next.js 14 (App Router)', options: { bold: true, color: C_MINT, fill: { color: C_CARD } } },
      { text: 'SSR marketing & auth routes + API handlers', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Unified routing, route groups, zero-config APIs', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Code Editor', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: '@monaco-editor/react', options: { bold: true, color: C_MINT, fill: { color: '0E0E14' } } },
      { text: 'Multi-tab editor (HTML/CSS/JS) with syntax', options: { color: C_MUTED, fill: { color: '0E0E14' } } },
      { text: 'Industry standard (VS Code core), robust events', options: { color: C_MUTED, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'UI & Styling', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Tailwind CSS + Shadcn/ui', options: { bold: true, color: C_MINT, fill: { color: C_CARD } } },
      { text: 'Accessible UI primitives (dialogs, tabs, badges)', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Zero runtime CSS overhead, accessible Radix primitives', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Animation', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: 'GSAP + ScrollTrigger', options: { bold: true, color: C_MINT, fill: { color: '0E0E14' } } },
      { text: 'Landing hero reveals, card drift & auth forms', options: { color: C_MUTED, fill: { color: '0E0E14' } } },
      { text: 'Restrained, confident motion (marketing/auth only)', options: { color: C_MUTED, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'AI Inference', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Groq SDK (@groq/groq-sdk)', options: { bold: true, color: C_MINT, fill: { color: C_CARD } } },
      { text: 'Rubric evaluation in JSON mode', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Sub-2.5s LPU generation eliminates user wait times', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Database', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: 'MongoDB + Mongoose', options: { bold: true, color: C_MINT, fill: { color: '0E0E14' } } },
      { text: 'Stores rubrics, submissions, stats, attempt caps', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Flexible schema fits evolving multi-language rubrics', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ]
  ];

  slide.addTable(stackRows, {
    x: 0.6, y: 1.6, w: 8.8,
    rowH: [0.35, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
    colW: [1.8, 2.3, 2.4, 2.3],
    border: { type: 'solid', pt: 1, color: C_BORDER },
    fontFace: FONT_BODY, fontSize: 8.5,
    valign: 'middle', align: 'left',
    margin: [3, 6, 3, 6]
  });

  slide.addNotes('Highlight the stack discipline: GSAP only on landing and auth; no heavy state management needed for MVP.');
}

// ============================================================================
// SLIDE 8: GROQ AI GRADING PIPELINE & 3-TIER FAULT TOLERANCE
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'AI Inference Pipeline', 8);
  addSlideTitle(slide, 'Groq AI Grading Pipeline & 3-Tier Fault Tolerance', 'How Staqor executes, parses, and protects user attempts during AI evaluation.');

  // Visual Pipeline Flowchart (Horizontal 5 nodes)
  const pipeSteps = [
    { num: 'STAGE 1', title: 'Monaco Input', sub: 'HTML / CSS / JS' },
    { num: 'STAGE 2', title: 'Server Check', sub: 'Auth + Quota Guard' },
    { num: 'STAGE 3', title: 'Prompt Builder', sub: 'Sanitized Rubric' },
    { num: 'STAGE 4', title: 'Groq LPU Infer', sub: '<2.5s JSON Mode' },
    { num: 'STAGE 5', title: 'Store & Unlock', sub: 'Stats & Portfolio' }
  ];

  pipeSteps.forEach((ps, i) => {
    const nodeX = 0.6 + i * 1.8;
    slide.addShape(pres.ShapeType.roundRect, {
      x: nodeX, y: 1.6, w: 1.6, h: 0.95,
      fill: { color: C_CARD },
      line: { color: (i === 3 ? '264738' : C_BORDER), width: 1 },
      rectRadius: 0.08
    });

    slide.addText(ps.num, {
      x: nodeX + 0.05, y: 1.7, w: 1.5, h: 0.2,
      fontFace: FONT_BODY, fontSize: 7, bold: true, color: (i === 3 ? C_MINT : C_SUBMUTED),
      align: 'center', margin: 0
    });

    slide.addText(ps.title, {
      x: nodeX + 0.05, y: 1.9, w: 1.5, h: 0.3,
      fontFace: FONT_TITLE, fontSize: 9.5, bold: true, color: C_TEXT,
      align: 'center', margin: 0
    });

    slide.addText(ps.sub, {
      x: nodeX + 0.05, y: 2.2, w: 1.5, h: 0.25,
      fontFace: FONT_BODY, fontSize: 7.5, color: C_MUTED,
      align: 'center', margin: 0
    });

    if (i < 4) {
      slide.addText('→', {
        x: nodeX + 1.58, y: 1.9, w: 0.25, h: 0.35,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: C_MINT,
        align: 'center', margin: 0
      });
    }
  });

  // 3-Tier Fault Tolerance Cards Below
  const tiers3 = [
    {
      name: 'TIER 1: PRIMARY INFERENCE',
      badge: 'STANDARD PATH',
      badgeColor: C_MINT,
      desc: 'System sends structured system prompt demanding strict JSON matching the evaluation schema. Returns in <2.5s.'
    },
    {
      name: 'TIER 2: SELF-CORRECTION RETRY',
      badge: 'AUTOMATIC RETRY',
      badgeColor: C_WARNING,
      desc: 'If Groq returns malformed JSON, API automatically triggers one immediate retry with strict "JSON Output Only" instruction.'
    },
    {
      name: 'TIER 3: ZERO-QUOTA OUTAGE FALLBACK',
      badge: 'ZERO DEDUCTION',
      badgeColor: C_SUCCESS,
      desc: 'If upstream Groq suffers an outage, user receives a clean 503 error WITHOUT deducting their lifetime attempt quota.'
    }
  ];

  tiers3.forEach((t3, i) => {
    const cardX = 0.6 + i * 3.0;
    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 2.8, w: 2.8, h: 2.3,
      fill: { color: (i === 2 ? '111614' : C_CARD) },
      line: { color: (i === 2 ? '264738' : C_BORDER), width: 1 },
      rectRadius: 0.1
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX + 0.15, y: 3.0, w: 1.8, h: 0.24,
      fill: { color: '16161F' },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.05
    });
    slide.addText(t3.badge, {
      x: cardX + 0.15, y: 3.0, w: 1.8, h: 0.24,
      fontFace: FONT_BODY, fontSize: 7, bold: true, color: t3.badgeColor,
      align: 'center', valign: 'middle', margin: 0
    });

    slide.addText(t3.name, {
      x: cardX + 0.15, y: 3.35, w: 2.5, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 9.5, bold: true, color: C_TEXT, margin: 0
    });

    slide.addText(t3.desc, {
      x: cardX + 0.15, y: 3.75, w: 2.5, h: 1.2,
      fontFace: FONT_BODY, fontSize: 9, color: C_MUTED, lineSpacingMultiple: 1.35, margin: 0
    });
  });

  slide.addNotes('Emphasize the zero-quota penalty rule: if the AI service goes down, the user is never penalized an attempt.');
}

// ============================================================================
// SLIDE 9: RUN VS. SUBMIT OPERATIONAL MATRIX
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Workspace Operational Matrix', 9);
  addSlideTitle(slide, 'RUN (Diagnostic) vs. SUBMIT (Certification)', 'Detailed breakdown of the dual evaluation pipeline and state transitions.');

  const runSubmitRows = [
    [
      { text: 'DIMENSION', options: { bold: true, color: C_TEXT, fill: { color: '16161F' } } },
      { text: 'RUN PIPELINE (DIAGNOSTIC CHECK)', options: { bold: true, color: C_MINT, fill: { color: '16161F' } } },
      { text: 'SUBMIT PIPELINE (FORMAL CERTIFICATION)', options: { bold: true, color: C_MINT, fill: { color: '16161F' } } }
    ],
    [
      { text: 'Primary Objective', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Rapid debugging, design feedback & styling sanity check', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Official grading against challenge rubric to earn credit', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Lifetime Quota', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: '5 attempts max per challenge (Free Tier)', options: { color: C_WARNING, bold: true, fill: { color: '0E0E14' } } },
      { text: '3 attempts max per challenge (Free Tier)', options: { color: C_ERROR, bold: true, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'Prompt Strictness', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Encouraging, diagnostic; highlights missing CSS/JS', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Rigorous, unsparing; strictly grades weighted percentage', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Passing Threshold', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: 'N/A (Feedback only; does not award pass/fail status)', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: '>= 80% overall weighted score required to pass', options: { color: C_SUCCESS, bold: true, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'Database Impact', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Increments run_count; writes transient attempt log', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Increments submit_count; writes permanent submission', options: { color: C_MUTED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'Portfolio Impact', options: { bold: true, color: C_TEXT, fill: { color: '0E0E14' } } },
      { text: 'None (Does not alter public recruiter profile)', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'On Pass: Unlocks public portfolio entry & live replay', options: { color: C_MINT, bold: true, fill: { color: '0E0E14' } } }
    ],
    [
      { text: 'Model Solution', options: { bold: true, color: C_TEXT, fill: { color: C_CARD } } },
      { text: 'Remains strictly masked from client response', options: { color: C_MUTED, fill: { color: C_CARD } } },
      { text: 'Unlocked ONLY after both Run (>=5) & Submit (>=3) spent', options: { color: C_WARNING, bold: true, fill: { color: '0E0E14' } } }
    ]
  ];

  slide.addTable(runSubmitRows, {
    x: 0.6, y: 1.6, w: 8.8,
    rowH: [0.35, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.45],
    colW: [2.2, 3.3, 3.3],
    border: { type: 'solid', pt: 1, color: C_BORDER },
    fontFace: FONT_BODY, fontSize: 8.5,
    valign: 'middle', align: 'left',
    margin: [3, 6, 3, 6]
  });

  slide.addNotes('Walk through the difference between RUN and SUBMIT: Run is diagnostic coaching; Submit is strict certification.');
}

// ============================================================================
// SLIDE 10: SANDBOX SECURITY & DATA MODELS
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Security & Database Architecture', 10);
  addSlideTitle(slide, 'Client Sandboxing & MongoDB Entity Models', 'Rigorous iframe origin boundaries, loop killer protection, and flexible document schemas.');

  // Left Card: Sandbox Security
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.12
  });

  slide.addText('Sandboxing Security Controls', {
    x: 0.85, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_MINT, margin: 0
  });

  const secRuns = [
    { text: '• Iframe Sandbox Isolation:\n', options: { bold: true, color: C_TEXT } },
    { text: '  Uses sandbox="allow-scripts allow-modals". NEVER combine allow-same-origin with allow-scripts. Guarantees user code cannot access parent DOM or JWT cookies.\n\n', options: { color: C_MUTED } },
    { text: '• Infinite Loop Killer:\n', options: { bold: true, color: C_TEXT } },
    { text: '  Injects a 2000ms timeout wrapper around while and for loops in user JS before srcdoc execution, preventing browser tab freezes.\n\n', options: { color: C_MUTED } },
    { text: '• Rate Limiting & Payload Caps:\n', options: { bold: true, color: C_TEXT } },
    { text: '  Enforces 10 req/min per IP on /api/evaluate and caps submissions to 1MB to prevent prompt injection DDoS.', options: { color: C_MUTED } }
  ];

  slide.addText(secRuns, {
    x: 0.85, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 8.5, margin: 0
  });

  // Right Card: MongoDB Data Models
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.12
  });

  slide.addText('MongoDB Core Collections', {
    x: 5.4, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_MINT, margin: 0
  });

  const dbRuns = [
    { text: '• users:\n', options: { bold: true, color: C_TEXT } },
    { text: '  email, username, password_hash (bcrypt), role (free/pro/admin), stats (solves, badges).\n\n', options: { color: C_MUTED } },
    { text: '• challenges:\n', options: { bold: true, color: C_TEXT } },
    { text: '  slug, title, track, difficulty, spec_markdown, starter_code, model_solution (masked), rubric array.\n\n', options: { color: C_MUTED } },
    { text: '• submissions:\n', options: { bold: true, color: C_TEXT } },
    { text: '  user_id, challenge_id, code_submitted, attempt_type, score, passed, groq_response, is_public.\n\n', options: { color: C_MUTED } },
    { text: '• attempt_counts:\n', options: { bold: true, color: C_TEXT } },
    { text: '  user_id, challenge_id, run_count, submit_count. Lifetime hard limit; never reset on a cron.', options: { color: C_MUTED } }
  ];

  slide.addText(dbRuns, {
    x: 5.4, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 8.5, margin: 0
  });

  slide.addNotes('Review database structure: attempt_counts must never be reset on a cron; model_solutions must be masked until both caps are hit.');
}

// ============================================================================
// SLIDE 11: VISUAL DESIGN SYSTEM & WORKSPACE ANATOMY (v2)
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Design System & UI Architecture', 11);
  addSlideTitle(slide, 'Dual Mood UI System: Lawtrades to LeetCode', 'Design.md v2 specifications: near-black canvas with sage mint accents.');

  // Left: 2 Modes
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.12
  });

  slide.addText('Two Connected Visual Moods', {
    x: 0.85, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_MINT, margin: 0
  });

  const modeRuns = [
    { text: '• 1. Landing + Auth Mode (GSAP):\n', options: { bold: true, color: C_TEXT } },
    { text: '  Lawtrades-inspired UI language on soft near-black (#0A0A0F). Floating overlapping cards, dotted connectors, generous whitespace, 16-24px rounded corners. GSAP hero reveals and auth form transitions.\n\n', options: { color: C_MUTED } },
    { text: '• 2. App Shell Mode (LeetCode-Dense):\n', options: { bold: true, color: C_TEXT } },
    { text: '  Same near-black DNA (#0A0A0F / #111117) but tightened up—utilitarian, dense, code-first. Mint #ABDAC8 reserved for active tabs and buttons. Strictly NO GSAP in workspace.', options: { color: C_MUTED } }
  ];

  slide.addText(modeRuns, {
    x: 0.85, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 9, margin: 0
  });

  // Right: Workspace Anatomy
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.12
  });

  slide.addText('40% / 60% Split Workspace Layout', {
    x: 5.4, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_MINT, margin: 0
  });

  const layoutRuns = [
    { text: '• 40% Left Pane (Problem Spec):\n', options: { bold: true, color: C_TEXT } },
    { text: '  - Challenge title, track badge, attempt counters (Runs: 2/5 | Submits: 1/3)\n  - Spec tabs: Problem statement, design spec, and rubric\n  - Slide-in AI feedback drawer after Run/Submit\n\n', options: { color: C_MUTED } },
    { text: '• 60% Right Pane (Monaco + Live Preview):\n', options: { bold: true, color: C_TEXT } },
    { text: '  - Multi-tab switch (index.html, styles.css, script.js)\n  - Action bar: Reset, Fullscreen, RUN (outline), SUBMIT (solid mint)\n  - Sandboxed live preview iframe with real-time reload', options: { color: C_MUTED } }
  ];

  slide.addText(layoutRuns, {
    x: 5.4, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 8.5, margin: 0
  });

  slide.addNotes('Review the design rules: soft near-black canvas, mint paired with near-black text on solid fills, no GSAP inside workspace.');
}

// ============================================================================
// SLIDE 12: ROADMAP, TEAM ROLES & NON-NEGOTIABLE RULES
// ============================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C_BG };
  addHeader(slide, 'Execution Plan & Governance', 12);
  addSlideTitle(slide, 'Phased Roadmap & Non-Negotiable Rules', 'Sequential milestone execution plan and core development rules for Staqor v1.0.');

  // Top Left: Phases 0-6
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.12
  });

  slide.addText('Phased Implementation Roadmap', {
    x: 0.85, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_MINT, margin: 0
  });

  const phaseRuns = [
    { text: '• Phase 0: ', options: { bold: true, color: C_TEXT } },
    { text: 'Project Scaffold & DB connection\n', options: { color: C_MUTED } },
    { text: '• Phase 1: ', options: { bold: true, color: C_TEXT } },
    { text: 'JWT Auth in cookies + GSAP form entrance\n', options: { color: C_MUTED } },
    { text: '• Phase 2: ', options: { bold: true, color: C_MINT } },
    { text: 'Critical Path MVP (Single challenge end-to-end)\n', options: { color: C_MUTED } },
    { text: '• Phase 3: ', options: { bold: true, color: C_TEXT } },
    { text: 'Admin Studio + "Sandbox Tester" + Content\n', options: { color: C_MUTED } },
    { text: '• Phase 4: ', options: { bold: true, color: C_TEXT } },
    { text: 'Public Profile & Recruiter live replay\n', options: { color: C_MUTED } },
    { text: '• Phase 5: ', options: { bold: true, color: C_TEXT } },
    { text: 'Stripe monetization & Pro tier unlocks\n', options: { color: C_MUTED } },
    { text: '• Phase 6: ', options: { bold: true, color: C_TEXT } },
    { text: 'Hardening, rate limiting & edge cases\n\n', options: { color: C_MUTED } },
    { text: 'RULE: ', options: { bold: true, color: C_WARNING } },
    { text: 'Never begin Phase N+1 until Phase N is 100% complete.', options: { color: C_MUTED } }
  ];

  slide.addText(phaseRuns, {
    x: 0.85, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 8.5, margin: 0
  });

  // Top Right: Non-Negotiable Core Rules
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.6, w: 4.25, h: 3.5,
    fill: { color: '171010' },
    line: { color: '3A1E1E', width: 1 },
    rectRadius: 0.12
  });

  slide.addText('8 Core Engineering Commandments', {
    x: 5.4, y: 1.85, w: 3.75, h: 0.35,
    fontFace: FONT_TITLE, fontSize: 12, bold: true, color: C_ERROR, margin: 0
  });

  const ruleRuns = [
    { text: '1. No Server Code Execution: ', options: { bold: true, color: C_TEXT } },
    { text: 'Client iframe only.\n', options: { color: C_MUTED } },
    { text: '2. Strict Sandbox Isolation: ', options: { bold: true, color: C_TEXT } },
    { text: 'No same-origin + scripts.\n', options: { color: C_MUTED } },
    { text: '3. Lifetime Attempt Limits: ', options: { bold: true, color: C_TEXT } },
    { text: 'Never reset on cron.\n', options: { color: C_MUTED } },
    { text: '4. AI First, Not Unit Tests: ', options: { bold: true, color: C_TEXT } },
    { text: 'Groq rubric grading.\n', options: { color: C_MUTED } },
    { text: '5. Model Solution Masking: ', options: { bold: true, color: C_TEXT } },
    { text: 'Hidden until caps spent.\n', options: { color: C_MUTED } },
    { text: '6. Zero Quota Penalty on Outages: ', options: { bold: true, color: C_TEXT } },
    { text: 'No deduction on 500.\n', options: { color: C_MUTED } },
    { text: '7. Bcrypt Hashes Only: ', options: { bold: true, color: C_TEXT } },
    { text: 'Never log plaintext passwords.\n', options: { color: C_MUTED } },
    { text: '8. Phase Discipline: ', options: { bold: true, color: C_TEXT } },
    { text: 'Complete Phase N before Phase N+1.', options: { color: C_MUTED } }
  ];

  slide.addText(ruleRuns, {
    x: 5.4, y: 2.25, w: 3.75, h: 2.65,
    fontFace: FONT_BODY, fontSize: 8.5, margin: 0
  });

  slide.addNotes('Close the presentation: recap the 8 core engineering rules and emphasize sequential phase execution.');
}

// Generate the presentation file
const outputPath = path.join(__dirname, 'Staqor_Team_Walkthrough.pptx');
pres.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`Presentation successfully created at: ${fileName}`);
  })
  .catch(err => {
    console.error('Error creating presentation:', err);
  });
