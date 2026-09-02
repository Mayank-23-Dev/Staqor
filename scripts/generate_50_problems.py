import os
import re
import json

base_dir = r"D:\Staqor\temp\50 Question HTML CSS JS"
output_file = r"D:\Staqor\lib\problems-data.ts"

# Questions metadata
questions_meta = {
    "01-typography-font-showcase": ("Typography & Font Studio", "Google Fonts loader, weight/size sliders, letter spacing, live text-transform & CSS generator.", "01", "HTML & CSS", "Easy"),
    "02-gradient-text-glow-card": ("Gradient Text & Glowing Effect Card", "CSS background-clip text gradients, neon glow box-shadow, and dynamic angle/color controls.", "02", "HTML & CSS", "Easy"),
    "03-interactive-buttons-suite": ("Interactive Buttons Suite", "8 distinct button styles: Coordinates-based ripple, 3D push, magnetic hover, glitch, and async spinner.", "03", "HTML & CSS", "Easy"),
    "04-simple-profile-card": ("Developer Profile Card", "CSS Box Model, rounded avatar, status badges, skill tags, and interactive follow counter.", "04", "HTML & CSS", "Easy"),
    "05-color-palette-generator": ("Color Palette Generator", "Hex color generator with spacebar trigger, color lock, luminance contrast math, and CSS export.", "05", "HTML & CSS", "Easy"),
    "06-live-character-counter": ("Live Character & Text Analyzer", "Real-time character, word, sentence counter, reading time estimate, and SVG circular progress ring.", "06", "HTML & CSS", "Easy"),
    "07-dark-light-mode-toggle": ("Dark & Light Mode Switcher", "Semantic CSS variables theme switching with animated sun/moon toggle and localStorage persistence.", "07", "HTML & CSS", "Easy"),
    "08-responsive-badge-card": ("Positioned Badge & Ribbon Cards", "CSS Absolute/Relative positioning, 45° corner ribbons, image zoom overlays, and favorite triggers.", "08", "HTML & CSS", "Easy"),
    "09-digital-clock-custom-fonts": ("Cyberpunk Digital Clock", "Segmented LED digital clock with 12/24 hour toggle, flashing colon, seconds bar, and timezone switch.", "09", "HTML & CSS", "Easy"),
    "10-interactive-quote-generator": ("Inspirational Quote Studio", "Styled blockquotes, dynamic quote transitions, Web Speech synthesis API, and clipboard copy.", "10", "HTML & CSS", "Easy"),

    "11-accordion-faq-component": ("Collapsible FAQ Accordion", "Smooth max-height CSS transitions, icon rotation, single/multi-expand mode, and expand all.", "11", "JavaScript DOM", "Easy"),
    "12-modal-popup-dialog": ("Modal Popup & Backdrop Dialog", "Accessible modal overlay with backdrop blur, scale keyframes, form validation, and ESC handler.", "12", "JavaScript DOM", "Easy"),
    "13-image-carousel-slider": ("Image Carousel & Slider", "Slide transform animation, auto-play with hover pause, indicator dots, and thumbnail support.", "13", "JavaScript DOM", "Easy"),
    "14-tabs-navigation-component": ("Sliding Indicator Tabs", "Dynamic bounding box pill indicator calculation, smooth content transitions, and tab switching.", "14", "JavaScript DOM", "Easy"),
    "15-custom-dropdown-select": ("Custom Searchable Dropdown", "Custom select menu with live keyword filtering, keyboard navigation, and click-outside dismiss.", "15", "JavaScript DOM", "Easy"),
    "16-toast-notification-system": ("Toast Notification Engine", "Stacked dynamic toasts with countdown progress bars, 4 intent states, and custom auto-dismiss.", "16", "JavaScript DOM", "Medium"),
    "17-star-rating-component": ("Star Rating Widget", "Hover star preview, live mood sentiment feedback, score submission, and reset state.", "17", "JavaScript DOM", "Medium"),
    "18-multi-step-form-progress": ("Multi-Step Wizard Form", "Step-by-step progress tracking bar, validation gating per step, and state transitions.", "18", "JavaScript DOM", "Medium"),
    "19-live-search-autocomplete": ("Search Bar with Live Autocomplete", "Debounced keystroke handling, highlight matched query letters, and category tags.", "19", "JavaScript DOM", "Medium"),
    "20-custom-range-slider": ("Range Slider with Dynamic Tooltip", "Calculates thumb position offsets in real-time with dual-color dynamic progress tracks.", "20", "JavaScript DOM", "Medium"),
    "21-animated-hamburger-menu": ("Morphing Hamburger Menu", "3-line hamburger to 'X' close icon transition with slide-in navigation sidebar drawer.", "21", "JavaScript DOM", "Medium"),
    "22-tooltip-popover-system": ("Tooltip & Popover Engine", "CSS data-attributes and pseudo-elements providing 4 cardinal positioning directions.", "22", "JavaScript DOM", "Medium"),
    "23-drag-drop-file-uploader": ("File Drag & Drop Upload Zone", "Dragover highlighting, file size checking, preview list, and simulated upload progress.", "23", "JavaScript DOM", "Medium"),
    "24-skeleton-loading-card": ("Skeleton Shimmer Loading Card", "Fluid gradient wave animation replacing content during async network requests.", "24", "JavaScript DOM", "Medium"),
    "25-pricing-card-toggle": ("Pricing Card with Billing Switch", "Monthly / Yearly billing switch with 20% annual discount badge calculation.", "25", "JavaScript DOM", "Medium"),

    "26-hero-section-typewriter": ("Hero Section with Typewriter Effect", "Modern tech hero section with typewriter text, glowing gradient blobs, and dual CTA buttons.", "26", "React & UI", "Medium"),
    "27-features-grid-3d-tilt": ("Features Grid with 3D Tilt Effect", "6-card grid with 3D mouse parallax tilt effect and dynamic mouse spotlight gradients.", "27", "React & UI", "Medium"),
    "28-testimonials-slider-section": ("Testimonials Slider Section", "Customer feedback quotes, 5-star ratings, avatar cards, and trusted client logo cloud.", "28", "React & UI", "Medium"),
    "29-animated-counter-stats": ("Animated Statistics Counter", "IntersectionObserver metric counter animating numbers when scrolled into viewport.", "29", "React & UI", "Medium"),
    "30-portfolio-filterable-gallery": ("Filterable Portfolio Gallery", "Category filter buttons with smooth grid shuffle animations and full-screen Lightbox modal.", "30", "React & UI", "Medium"),
    "31-vertical-roadmap-timeline": ("Vertical Roadmap Timeline", "Alternating left/right vertical timeline with glowing pulse nodes and milestone release tags.", "31", "React & UI", "Medium"),
    "32-team-showcase-overlay": ("Team Member Showcase Overlay", "Team grid with cards that slide up an overlay with biography, skillset tags, and social links.", "32", "React & UI", "Medium"),
    "33-contact-section-floating-labels": ("Contact Section with Floating Labels", "Modern contact section with animated floating label inputs, regex validation, and submit feedback.", "33", "React & UI", "Medium"),
    "34-pricing-comparison-table": ("Pricing Comparison Table", "Comprehensive feature comparison matrix table comparing 3 plan tiers across 10 features.", "34", "React & UI", "Medium"),
    "35-faq-searchable-section": ("FAQ Searchable Knowledgebase", "Section with live search query filtering, instant match highlights, and accordion cards.", "35", "React & UI", "Medium"),
    "36-modern-footer-newsletter": ("Multi-Column Footer & Newsletter", "Responsive multi-column footer with email subscription validation and Back-to-Top button.", "36", "React & UI", "Hard"),
    "37-cta-banner-particles": ("CTA Banner with Canvas Particles", "Call To Action banner with HTML5 canvas particle network connecting nearby nodes.", "37", "React & UI", "Hard"),
    "38-sticky-navbar-scroll-progress": ("Sticky Navbar & Scroll Progress", "Sticky glassmorphic navbar with top scroll progress indicator bar and section navigation.", "38", "React & UI", "Hard"),

    "39-developer-portfolio-webpage": ("Personal Developer Portfolio", "Full portfolio with interactive terminal code emulator, skill progress bars, and projects.", "39", "Web APIs", "Hard"),
    "40-saas-landing-page": ("SaaS Product Landing Page", "Full-featured SaaS Landing Page with Hero, Feature matrix, Pricing cards, and FAQ.", "40", "Web APIs", "Hard"),
    "41-ecommerce-product-catalog-cart": ("E-Commerce Store & Cart Drawer", "Product catalog, add-to-cart, slide-out drawer, quantity adjustments, and checkout simulation.", "41", "Web APIs", "Hard"),
    "42-recipe-finder-webpage": ("Gourmet Recipe Finder Webpage", "Recipe discovery website with live search, meal badges, ingredient modal, and bookmarks.", "42", "Web APIs", "Hard"),
    "43-kanban-task-board": ("Sprint Kanban Task Board", "Interactive 3-column task board using HTML5 Drag and Drop API with priority tags.", "43", "Web APIs", "Hard"),
    "44-weather-forecast-dashboard": ("Global Weather Dashboard", "City search, live meteorological data, temperature, humidity, wind, and forecast.", "44", "Web APIs", "Hard"),
    "45-music-player-webpage": ("Music & Podcast Audio Player", "Audio player with rotating vinyl record animation, seek bar, time display, and controls.", "45", "Web APIs", "Hard"),
    "46-quiz-application-webpage": ("JavaScript & Web Tech Quiz", "Interactive quiz with timer, instant feedback explanations, and score summary screen.", "46", "Web APIs", "Hard"),
    "47-habit-tracker-dashboard": ("Daily Habit Tracker Web App", "Daily habit tracking table with 7-day checkboxes, streak calculation, and add habit modal.", "47", "Web APIs", "Hard"),
    "48-real-estate-listings-webpage": ("Luxury Real Estate Portal", "Property listings with search, price specs, image cards, and detail modal.", "48", "Web APIs", "Hard"),
    "49-expense-tracker-dashboard": ("Finance & Expense Tracker", "Income & expense tracker with balance cards, transaction history, and breakdown.", "49", "Web APIs", "Hard"),
    "50-agency-complete-webpage": ("Nexus Creative Agency Master Site", "Comprehensive digital agency multi-section website with Hero, Services, Case Studies, and Contact.", "50", "Web APIs", "Hard")
}

companies_list = [
    ["Vercel", "Linear", "Apple"],
    ["Stripe", "Vercel", "Shopify"],
    ["GitHub", "Airbnb", "Meta"],
    ["Google", "Uber", "Netflix"],
    ["Figma", "Atlassian", "Notion"],
    ["ByteDance", "TikTok", "Discord"],
    ["Amazon", "Microsoft", "OpenAI"],
    ["Spotify", "Dropbox", "Coinbase"],
]

folders = sorted([f for f in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, f)) and f[0].isdigit()])

problems = []

for idx, folder in enumerate(folders, 1):
    meta = questions_meta.get(folder, (folder.replace("-", " ").title(), "Frontend development challenge", str(idx).zfill(2), "HTML & CSS", "Medium"))
    title, summary, num, category, difficulty = meta
    
    html_path = os.path.join(base_dir, folder, "index.html")
    css_path = os.path.join(base_dir, folder, "style.css")
    js_path = os.path.join(base_dir, folder, "script.js")
    
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    with open(js_path, "r", encoding="utf-8") as f:
        js = f.read()
        
    # Extract fonts
    fonts = list(dict.fromkeys(re.findall(r"font-family:\s*([^;]+);", css)))
    font_str = ", ".join([f.strip() for f in fonts if "inherit" not in f.lower()][:3]) or "'Plus Jakarta Sans', sans-serif"
    
    # Extract hex colors
    colors = list(dict.fromkeys(re.findall(r"#[0-9a-fA-F]{3,8}", css)))
    palette_str = ", ".join(colors[:6]) if colors else "#0A0A0F, #111117, #38BDF8, #6366F1, #F8FAFC"
    
    screenshot_url = f"/screenshots/{folder}.png"
    
    # Build clean HTML formatted description WITHOUT embedded screenshots
    description_html = f"""<div class="space-y-5">
  <div>
    <span class="text-xs font-mono font-bold text-[#A7DDC9] uppercase tracking-wider">Question {num} • {category}</span>
    <h1 class="text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
    <p class="text-sm text-zinc-300 mt-2 leading-relaxed">{summary}</p>
  </div>

  <div class="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-2">
    <h3 class="text-xs font-bold font-mono text-[#A7DDC9] uppercase tracking-wide">🛠️ What to Build</h3>
    <ul class="text-xs text-zinc-300 list-disc list-inside space-y-1.5 leading-relaxed">
      <li><strong>Structure & Markup:</strong> Implement semantic container structure and interactive control elements matching the specification.</li>
      <li><strong>Responsive UI:</strong> Ensure clean Flexbox/CSS Grid alignment, card padding, and button styling.</li>
      <li><strong>Interaction Logic:</strong> Wire up JavaScript event listeners for real-time state updates.</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-2">
    <h3 class="text-xs font-bold font-mono text-[#A7DDC9] uppercase tracking-wide">🔤 Typography & Font Specifications</h3>
    <ul class="text-xs text-zinc-300 space-y-1.5 font-mono">
      <li><strong>Font Family:</strong> <code class="text-[#A7DDC9]">{font_str}</code></li>
      <li><strong>Heading Sizes:</strong> 1.6rem - 2.4rem (Weight: 700 - 800)</li>
      <li><strong>Body Text:</strong> 0.9rem - 1.05rem (Weight: 400, Line-height: 1.6)</li>
      <li><strong>Labels & Badges:</strong> 0.75rem - 0.85rem (Weight: 600)</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-2">
    <h3 class="text-xs font-bold font-mono text-[#A7DDC9] uppercase tracking-wide">🎨 Color Palette & Hex Codes</h3>
    <p class="text-xs text-zinc-400">Use the following design tokens and hex values:</p>
    <div class="flex flex-wrap gap-2 pt-1 font-mono text-xs">
      {' '.join([f'<span class="px-2.5 py-1 rounded bg-[#0A0A0F] border border-[#26262E] text-zinc-300">{c}</span>' for c in colors[:6]])}
    </div>
  </div>

  <div class="p-4 rounded-xl bg-[#111117] border border-[#26262E] space-y-2">
    <h3 class="text-xs font-bold font-mono text-[#A7DDC9] uppercase tracking-wide">⚡ Interactive Requirements</h3>
    <ul class="text-xs text-zinc-300 list-disc list-inside space-y-1 leading-relaxed">
      <li>Handle user click and input events smoothly.</li>
      <li>Update display values and CSS styles dynamically without page reload.</li>
      <li>Match the behavior and visual output shown in the target design.</li>
    </ul>
  </div>
</div>"""

    clean_slug = re.sub(r'^\d+-', '', folder)

    starter_html = f"""<!-- Write your HTML code here -->
<div class="container">
  <div class="card">
    <h2>{title}</h2>
    <p>Write your markup matching the target specifications...</p>
  </div>
</div>"""

    starter_css = f"""/* Write your CSS styling here */
:root {{
  --primary: #38bdf8;
  --bg-dark: #0b0f19;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --font-family: {font_str};
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  font-family: var(--font-family);
  background-color: var(--bg-dark);
  color: var(--text-main);
  min-height: 100vh;
  padding: 2rem;
}}"""

    starter_js = f"""// Write your JavaScript code here
document.addEventListener("DOMContentLoaded", () => {{
  // Write your interactive code for {title} here
}});"""

    prob_obj = {
        "id": idx,
        "number": num,
        "title": title,
        "slug": clean_slug,
        "folder": folder,
        "summary": summary,
        "screenshot_url": screenshot_url,
        "description": description_html,
        "category": category,
        "difficulty": difficulty,
        "acceptance": f"{max(45, 92 - idx * 0.8):.1f}%",
        "tags": [category, "DOM Manipulation" if "DOM" in category else "CSS Layout", "UI Design"],
        "companies": companies_list[(idx - 1) % len(companies_list)],
        "starter_code": {
            "html": starter_html,
            "css": starter_css,
            "js": starter_js
        },
        "model_solution": {
            "html": html,
            "css": css,
            "js": js
        }
    }
    problems.append(prob_obj)

# Write to TypeScript file
ts_content = f"""// Auto-generated 50 Master Frontend Challenges Dataset
export interface ProblemItem {{
  id: number;
  number: string;
  title: string;
  slug: string;
  folder: string;
  summary: string;
  screenshot_url: string;
  description: string;
  category: "HTML & CSS" | "JavaScript DOM" | "React & UI" | "Web APIs" | "Node.js & Backend";
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  tags: string[];
  companies: string[];
  starter_code: {{
    html: string;
    css: string;
    js: string;
  }};
  model_solution: {{
    html: string;
    css: string;
    js: string;
  }};
}}

export const PROBLEMS_DATA: ProblemItem[] = {json.dumps(problems, indent=2)};

export function getProblemBySlug(slug: string): ProblemItem | undefined {{
  const normalized = slug.toLowerCase().replace(/^\\d+-/, "");
  return PROBLEMS_DATA.find((p) => p.slug === normalized || p.folder === slug || p.slug === slug);
}}
"""

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {len(problems)} clean problem specifications into {output_file}")
