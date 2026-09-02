import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

questions_meta = {
    "01-typography-font-showcase": ("Typography & Font Studio", "Google Fonts loader, weight/size sliders, letter spacing, live text-transform & CSS generator.", "01"),
    "02-gradient-text-glow-card": ("Gradient Text & Glowing Effect Card", "CSS background-clip text gradients, neon glow box-shadow, and dynamic angle/color controls.", "02"),
    "03-interactive-buttons-suite": ("Interactive Buttons Suite", "8 distinct button styles: Coordinates-based ripple, 3D push, magnetic hover, glitch, and async spinner.", "03"),
    "04-simple-profile-card": ("Developer Profile Card", "CSS Box Model, rounded avatar, status badges, skill tags, and interactive follow counter.", "04"),
    "05-color-palette-generator": ("Color Palette Generator", "Hex color generator with spacebar trigger, color lock, luminance contrast math, and CSS export.", "05"),
    "06-live-character-counter": ("Live Character & Text Analyzer", "Real-time character, word, sentence counter, reading time estimate, and SVG circular progress ring.", "06"),
    "07-dark-light-mode-toggle": ("Dark & Light Mode Switcher", "Semantic CSS variables theme switching with animated sun/moon toggle and localStorage persistence.", "07"),
    "08-responsive-badge-card": ("Positioned Badge & Ribbon Cards", "CSS Absolute/Relative positioning, 45° corner ribbons, image zoom overlays, and favorite triggers.", "08"),
    "09-digital-clock-custom-fonts": ("Cyberpunk Digital Clock", "Segmented LED digital clock with 12/24 hour toggle, flashing colon, seconds bar, and timezone switch.", "09"),
    "10-interactive-quote-generator": ("Inspirational Quote Studio", "Styled blockquotes, dynamic quote transitions, Web Speech synthesis API, and clipboard copy.", "10"),

    "11-accordion-faq-component": ("Collapsible FAQ Accordion", "Smooth max-height CSS transitions, icon rotation, single/multi-expand mode, and expand all.", "11"),
    "12-modal-popup-dialog": ("Modal Popup & Backdrop Dialog", "Accessible modal overlay with backdrop blur, scale keyframes, form validation, and ESC handler.", "12"),
    "13-image-carousel-slider": ("Image Carousel & Slider", "Slide transform animation, auto-play with hover pause, indicator dots, and thumbnail support.", "13"),
    "14-tabs-navigation-component": ("Sliding Indicator Tabs", "Dynamic bounding box pill indicator calculation, smooth content transitions, and tab switching.", "14"),
    "15-custom-dropdown-select": ("Custom Searchable Dropdown", "Custom select menu with live keyword filtering, keyboard navigation, and click-outside dismiss.", "15"),
    "16-toast-notification-system": ("Toast Notification Engine", "Stacked dynamic toasts with countdown progress bars, 4 intent states, and custom auto-dismiss.", "16"),
    "17-star-rating-component": ("Star Rating Widget", "Hover star preview, live mood sentiment feedback, score submission, and reset state.", "17"),
    "18-multi-step-form-progress": ("Multi-Step Wizard Form", "Step-by-step progress tracking bar, validation gating per step, and state transitions.", "18"),
    "19-live-search-autocomplete": ("Search Bar with Live Autocomplete", "Debounced keystroke handling, highlight matched query letters, and category tags.", "19"),
    "20-custom-range-slider": ("Range Slider with Dynamic Tooltip", "Calculates thumb position offsets in real-time with dual-color dynamic progress tracks.", "20"),
    "21-animated-hamburger-menu": ("Morphing Hamburger Menu", "3-line hamburger to 'X' close icon transition with slide-in navigation sidebar drawer.", "21"),
    "22-tooltip-popover-system": ("Tooltip & Popover Engine", "CSS data-attributes and pseudo-elements providing 4 cardinal positioning directions.", "22"),
    "23-drag-drop-file-uploader": ("File Drag & Drop Upload Zone", "Dragover highlighting, file size checking, preview list, and simulated upload progress.", "23"),
    "24-skeleton-loading-card": ("Skeleton Shimmer Loading Card", "Fluid gradient wave animation replacing content during async network requests.", "24"),
    "25-pricing-card-toggle": ("Pricing Card with Billing Switch", "Monthly / Yearly billing switch with 20% annual discount badge calculation.", "25"),

    "26-hero-section-typewriter": ("Hero Section with Typewriter Effect", "Modern tech hero section with typewriter text, glowing gradient blobs, and dual CTA buttons.", "26"),
    "27-features-grid-3d-tilt": ("Features Grid with 3D Tilt Effect", "6-card grid with 3D mouse parallax tilt effect and dynamic mouse spotlight gradients.", "27"),
    "28-testimonials-slider-section": ("Testimonials Slider Section", "Customer feedback quotes, 5-star ratings, avatar cards, and trusted client logo cloud.", "28"),
    "29-animated-counter-stats": ("Animated Statistics Counter", "IntersectionObserver metric counter animating numbers when scrolled into viewport.", "29"),
    "30-portfolio-filterable-gallery": ("Filterable Portfolio Gallery", "Category filter buttons with smooth grid shuffle animations and full-screen Lightbox modal.", "30"),
    "31-vertical-roadmap-timeline": ("Vertical Roadmap Timeline", "Alternating left/right vertical timeline with glowing pulse nodes and milestone release tags.", "31"),
    "32-team-showcase-overlay": ("Team Member Showcase Overlay", "Team grid with cards that slide up an overlay with biography, skillset tags, and social links.", "32"),
    "33-contact-section-floating-labels": ("Contact Section with Floating Labels", "Modern contact section with animated floating label inputs, regex validation, and submit feedback.", "33"),
    "34-pricing-comparison-table": ("Pricing Comparison Table", "Comprehensive feature comparison matrix table comparing 3 plan tiers across 10 features.", "34"),
    "35-faq-searchable-section": ("FAQ Searchable Knowledgebase", "Section with live search query filtering, instant match highlights, and accordion cards.", "35"),
    "36-modern-footer-newsletter": ("Multi-Column Footer & Newsletter", "Responsive multi-column footer with email subscription validation and Back-to-Top button.", "36"),
    "37-cta-banner-particles": ("CTA Banner with Canvas Particles", "Call To Action banner with HTML5 canvas particle network connecting nearby nodes.", "37"),
    "38-sticky-navbar-scroll-progress": ("Sticky Navbar & Scroll Progress", "Sticky glassmorphic navbar with top scroll progress indicator bar and section navigation.", "38"),

    "39-developer-portfolio-webpage": ("Personal Developer Portfolio", "Full portfolio with interactive terminal code emulator, skill progress bars, and projects.", "39"),
    "40-saas-landing-page": ("SaaS Product Landing Page", "Full-featured SaaS Landing Page with Hero, Feature matrix, Pricing cards, and FAQ.", "40"),
    "41-ecommerce-product-catalog-cart": ("E-Commerce Store & Cart Drawer", "Product catalog, add-to-cart, slide-out drawer, quantity adjustments, and checkout simulation.", "41"),
    "42-recipe-finder-webpage": ("Gourmet Recipe Finder Webpage", "Recipe discovery website with live search, meal badges, ingredient modal, and bookmarks.", "42"),
    "43-kanban-task-board": ("Sprint Kanban Task Board", "Interactive 3-column task board using HTML5 Drag and Drop API with priority tags.", "43"),
    "44-weather-forecast-dashboard": ("Global Weather Dashboard", "City search, live meteorological data, temperature, humidity, wind, and forecast.", "44"),
    "45-music-player-webpage": ("Music & Podcast Audio Player", "Audio player with rotating vinyl record animation, seek bar, time display, and controls.", "45"),
    "46-quiz-application-webpage": ("JavaScript & Web Tech Quiz", "Interactive quiz with timer, instant feedback explanations, and score summary screen.", "46"),
    "47-habit-tracker-dashboard": ("Daily Habit Tracker Web App", "Daily habit tracking table with 7-day checkboxes, streak calculation, and add habit modal.", "47"),
    "48-real-estate-listings-webpage": ("Luxury Real Estate Portal", "Property listings with search, price specs, image cards, and detail modal.", "48"),
    "49-expense-tracker-dashboard": ("Finance & Expense Tracker", "Income & expense tracker with balance cards, transaction history, and breakdown.", "49"),
    "50-agency-complete-webpage": ("Nexus Creative Agency Master Site", "Comprehensive digital agency multi-section website with Hero, Services, Case Studies, and Contact.", "50")
}

# Generate Master README.md
readme_content = """# 50 Questions HTML, CSS & JavaScript Master Curriculum
### From Basic Typography to Production-Grade Full Webpages & Mini-Web Apps

Welcome to the **50 Question HTML, CSS & JavaScript Master Curriculum**. This repository contains 50 structured, folder-wise coding questions/projects designed on a progressive difficulty curve.

Every single project is organized in its own isolated folder with **3 dedicated files**:
- `index.html` — Clean, semantic, accessible HTML5 markup.
- `style.css` — Modern, responsive CSS with CSS variables, Flexbox, CSS Grid, and custom animations.
- `script.js` — Robust vanilla JavaScript with interactive DOM manipulations, event listeners, and Web APIs.

---

## 🗺️ Curriculum Structure & Progression

```
E:\\50 Question HTML CSS JS
│
├── 📁 01-typography-font-showcase/          [Level 1: Typography & Font Controls]
├── 📁 02-gradient-text-glow-card/           [Level 1: CSS Gradients & Neon Glow]
├── 📁 03-interactive-buttons-suite/         [Level 1: 8 Button Styles & Coordinates Ripple]
├── 📁 04-simple-profile-card/               [Level 1: Box Model, Status & Follow State]
├── 📁 05-color-palette-generator/           [Level 1: Hex Math, Locks & Spacebar Trigger]
├── 📁 06-live-character-counter/            [Level 1: Text Analyzer & SVG Circular Meter]
├── 📁 07-dark-light-mode-toggle/            [Level 1: CSS Tokens, Sun/Moon & localStorage]
├── 📁 08-responsive-badge-card/             [Level 1: 45° Corner Ribbons & Positioning]
├── 📁 09-digital-clock-custom-fonts/        [Level 1: Segmented LED Clock & Timezones]
├── 📁 10-interactive-quote-generator/       [Level 1: Typography & Web Speech API]
│
├── 📁 11-accordion-faq-component/           [Level 2: Collapsible Accordion]
├── 📁 12-modal-popup-dialog/                [Level 2: Accessible Modal & Backdrop Blur]
├── 📁 13-image-carousel-slider/             [Level 2: Responsive Slider & Auto-Play]
├── 📁 14-tabs-navigation-component/         [Level 2: Sliding Indicator Tabs]
├── 📁 15-custom-dropdown-select/            [Level 2: Searchable Dropdown Select]
├── 📁 16-toast-notification-system/         [Level 2: Stacked Toasts & Progress Bars]
├── 📁 17-star-rating-component/             [Level 2: Star Rating & Sentiment Moods]
├── 📁 18-multi-step-form-progress/          [Level 2: Wizard Form & Step Validation]
├── 📁 19-live-search-autocomplete/          [Level 2: Search Autocomplete & Highlighting]
├── 📁 20-custom-range-slider/               [Level 2: Dual Range Slider & Floating Tooltip]
├── 📁 21-animated-hamburger-menu/           [Level 2: Morphing Hamburger & Side Drawer]
├── 📁 22-tooltip-popover-system/            [Level 2: Tooltip Data-Attributes Engine]
├── 📁 23-drag-drop-file-uploader/           [Level 2: File Drag & Drop Upload Zone]
├── 📁 24-skeleton-loading-card/             [Level 2: Shimmer Skeleton Screens]
├── 📁 25-pricing-card-toggle/               [Level 2: 3-Tier Pricing & Annual Discount]
│
├── 📁 26-hero-section-typewriter/           [Level 3: SaaS Hero with Typewriter Text]
├── 📁 27-features-grid-3d-tilt/             [Level 3: 3D Mouse Parallax Tilt Grid]
├── 📁 28-testimonials-slider-section/       [Level 3: Customer Testimonials & Logo Cloud]
├── 📁 29-animated-counter-stats/            [Level 3: IntersectionObserver Metrics Counter]
├── 📁 30-portfolio-filterable-gallery/      [Level 3: Filterable Gallery & Lightbox Modal]
├── 📁 31-vertical-roadmap-timeline/         [Level 3: Alternating Milestone Timeline]
├── 📁 32-team-showcase-overlay/             [Level 3: Team Grid with Slide-up Bio Overlay]
├── 📁 33-contact-section-floating-labels/   [Level 3: Floating Label Form & Validation]
├── 📁 34-pricing-comparison-table/          [Level 3: Feature Matrix Comparison Table]
├── 📁 35-faq-searchable-section/            [Level 3: Searchable Knowledgebase FAQ]
├── 📁 36-modern-footer-newsletter/          [Level 3: Multi-Column Footer & Back-to-Top]
├── 📁 37-cta-banner-particles/              [Level 3: Canvas Particle Network CTA Banner]
├── 📁 38-sticky-navbar-scroll-progress/     [Level 3: Sticky Navbar & Scroll Progress]
│
├── 📁 39-developer-portfolio-webpage/       [Level 4: Full Portfolio & Terminal Code]
├── 📁 40-saas-landing-page/                 [Level 4: SaaS Product Landing Page]
├── 📁 41-ecommerce-product-catalog-cart/    [Level 4: E-Commerce Store & Cart Drawer]
├── 📁 42-recipe-finder-webpage/             [Level 4: Recipe Finder & Food Blog]
├── 📁 43-kanban-task-board/                 [Level 4: HTML5 Drag & Drop Kanban Board]
├── 📁 44-weather-forecast-dashboard/        [Level 4: Meteorological Weather App]
├── 📁 45-music-player-webpage/              [Level 4: Audio Player & Rotating Vinyl Disc]
├── 📁 46-quiz-application-webpage/          [Level 4: Interactive Web Dev Quiz App]
├── 📁 47-habit-tracker-dashboard/           [Level 4: Daily Habit Tracker & Streaks]
├── 📁 48-real-estate-listings-webpage/      [Level 4: Real Estate Property Portal]
├── 📁 49-expense-tracker-dashboard/         [Level 4: Personal Finance & Budget Tracker]
└── 📁 50-agency-complete-webpage/           [Level 4: Creative Agency Master Site]
```

---

## 🚀 How to Run and View Projects

1. **Master Navigation Hub:** Open the root `index.html` in your favorite web browser to access the full interactive dashboard linking to all 50 questions with live previews and filters.
2. **Individual Questions:** Navigate into any question folder (e.g. `11-accordion-faq-component`) and double click `index.html` to run it directly.

---
*Created as part of the 50 Question HTML CSS JS Master Collection.*
"""

with open(os.path.join(BASE_DIR, "README.md"), "w", encoding="utf-8") as f:
    f.write(readme_content)

# Generate Master Hub index.html
hub_cards_html = ""
for folder, (title, desc, num) in questions_meta.items():
    n = int(num)
    if n <= 10:
        badge = "Level 1: Basics"
        badge_cls = "badge-l1"
    elif n <= 25:
        badge = "Level 2: Components"
        badge_cls = "badge-l2"
    elif n <= 38:
        badge = "Level 3: Sections"
        badge_cls = "badge-l3"
    else:
        badge = "Level 4: Webpage / App"
        badge_cls = "badge-l4"

    hub_cards_html += f"""
    <div class="hub-card" data-category="{badge_cls}">
        <div class="card-top">
            <span class="hub-num">#{num}</span>
            <span class="hub-badge {badge_cls}">{badge}</span>
        </div>
        <h3 class="hub-title">{title}</h3>
        <p class="hub-desc">{desc}</p>
        <div class="card-footer">
            <a href="{folder}/index.html" class="hub-link" target="_blank">Launch Project →</a>
        </div>
    </div>
    """

hub_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>50 Questions HTML, CSS & JS Master Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #06080e; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 3rem 1.5rem; }
        .header { text-align: center; max-width: 850px; margin: 0 auto 3.5rem; }
        .main-badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; border: 1px solid rgba(99, 102, 241, 0.3); }
        .header h1 { font-size: 3rem; font-weight: 800; margin-bottom: 0.8rem; background: linear-gradient(135deg, #f8fafc, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }

        .toolbar { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 3rem; }
        .filter-btn { background: #111827; border: 1px solid #1f2937; color: #9ca3af; padding: 8px 18px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn:hover { color: white; border-color: #38bdf8; }
        .filter-btn.active { background: #6366f1; color: white; border-color: #6366f1; }

        .search-bar { width: 100%; max-width: 480px; margin: 0 auto 2.5rem; }
        .search-bar input { width: 100%; background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 0.85rem 1.2rem; color: white; font-family: inherit; font-size: 1rem; outline: none; }
        .search-bar input:focus { border-color: #6366f1; }

        .hub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; max-width: 1300px; margin: 0 auto; }
        .hub-card { background: #0f1422; border: 1px solid #1e293b; border-radius: 18px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, border-color 0.2s; }
        .hub-card:hover { transform: translateY(-5px); border-color: #6366f1; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        .hub-card.hidden { display: none; }

        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .hub-num { font-family: 'Fira Code', monospace; font-size: 1.1rem; font-weight: 800; color: #38bdf8; }
        .hub-badge { font-size: 0.75rem; font-weight: 800; padding: 3px 10px; border-radius: 999px; }
        .badge-l1 { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .badge-l2 { background: rgba(129, 140, 248, 0.15); color: #818cf8; }
        .badge-l3 { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
        .badge-l4 { background: rgba(244, 63, 94, 0.15); color: #f43f5e; }

        .hub-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.6rem; color: #f8fafc; }
        .hub-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; flex: 1; }

        .card-footer { border-top: 1px solid #1e293b; padding-top: 1rem; }
        .hub-link { display: inline-flex; align-items: center; color: #38bdf8; text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: color 0.2s; }
        .hub-link:hover { color: #ffffff; }
    </style>
</head>
<body>
    <header class="header">
        <span class="main-badge">50 Question Curriculum</span>
        <h1>HTML, CSS & JavaScript Master Hub</h1>
        <p>A progressive master collection of 50 hands-on projects transitioning smoothly from basic font typography to interactive UI components, modern sections, and complete production webpages.</p>

        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search across all 50 questions (e.g. modal, font, grid, cart)...">
        </div>

        <div class="toolbar" id="filterToolbar">
            <button class="filter-btn active" data-filter="all">All (50)</button>
            <button class="filter-btn" data-filter="badge-l1">Level 1: Basics (10)</button>
            <button class="filter-btn" data-filter="badge-l2">Level 2: Components (15)</button>
            <button class="filter-btn" data-filter="badge-l3">Level 3: Sections (13)</button>
            <button class="filter-btn" data-filter="badge-l4">Level 4: Webpages (12)</button>
        </div>
    </header>

    <main class="hub-grid" id="hubGrid">
        {{CARDS_PLACEHOLDER}}
    </main>

    <script>
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.hub-card');

        let currentFilter = 'all';

        function applyFilters() {
            const query = searchInput.value.toLowerCase().trim();

            cards.forEach(card => {
                const category = card.dataset.category;
                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = card.textContent.toLowerCase().includes(query);

                if (matchesFilter && matchesSearch) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                applyFilters();
            });
        });

        searchInput.addEventListener('input', applyFilters);
    </script>
</body>
</html>"""

hub_final_html = hub_template.replace("{{CARDS_PLACEHOLDER}}", hub_cards_html)

with open(os.path.join(BASE_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(hub_final_html)

print("Master README.md and Master index.html generated successfully!")
