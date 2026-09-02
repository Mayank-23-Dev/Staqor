import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

tier2_projects = {
    "11-accordion-faq-component": {
        "title": "11 - Accordion FAQ Component",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>11 - Accordion FAQ Component</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 11 • Level 2: Components</span>
            <h1>Interactive FAQ Accordion</h1>
            <p>Smooth max-height CSS transitions, SVG icon rotation, single/multi-expand mode, and expand all controls.</p>
        </header>

        <div class="accordion-wrapper">
            <!-- Toolbar -->
            <div class="accordion-toolbar">
                <div class="mode-toggle">
                    <label>
                        <input type="checkbox" id="singleModeCheckbox" checked>
                        <span>Single Item Mode</span>
                    </label>
                </div>
                <div class="toolbar-actions">
                    <button class="tool-btn" id="expandAllBtn">Expand All</button>
                    <button class="tool-btn" id="collapseAllBtn">Collapse All</button>
                </div>
            </div>

            <!-- Accordion List -->
            <div class="accordion" id="faqAccordion">
                <!-- Item 1 -->
                <div class="accordion-item active">
                    <button class="accordion-header" aria-expanded="true">
                        <span class="question-text">What is the difference between Flexbox and CSS Grid?</span>
                        <span class="accordion-icon">▾</span>
                    </button>
                    <div class="accordion-content">
                        <div class="content-inner">
                            <p><strong>CSS Flexbox</strong> is primarily designed for 1-dimensional layouts (either in a row OR a column), making it ideal for navigation bars, alignment, and distributing space along a single axis.</p>
                            <p><strong>CSS Grid</strong> is built for 2-dimensional layouts (simultaneous rows AND columns), making it superior for overall page layout systems, complex photo galleries, and card matrices.</p>
                        </div>
                    </div>
                </div>

                <!-- Item 2 -->
                <div class="accordion-item">
                    <button class="accordion-header" aria-expanded="false">
                        <span class="question-text">How do CSS custom properties (variables) work?</span>
                        <span class="accordion-icon">▾</span>
                    </button>
                    <div class="accordion-content">
                        <div class="content-inner">
                            <p>CSS variables are defined using two dashes (e.g. <code>--primary-color: #38bdf8;</code>) and accessed with the <code>var()</code> function. Unlike preprocessor variables (Sass/Less), CSS custom properties are dynamic, cascade through the DOM tree, and can be read or modified in real-time using JavaScript via <code>document.documentElement.style.setProperty()</code>.</p>
                        </div>
                    </div>
                </div>

                <!-- Item 3 -->
                <div class="accordion-item">
                    <button class="accordion-header" aria-expanded="false">
                        <span class="question-text">What is the Event Loop in JavaScript?</span>
                        <span class="accordion-icon">▾</span>
                    </button>
                    <div class="accordion-content">
                        <div class="content-inner">
                            <p>The Event Loop is a fundamental architectural mechanism in JavaScript's single-threaded runtime. It constantly monitors the Call Stack and the Task/Microtask Queues. When the Call Stack is empty, it pushes pending callbacks from Promises (microtasks) and setTimeout/DOM events (macrotasks) onto the stack to execute asynchronously without blocking.</p>
                        </div>
                    </div>
                </div>

                <!-- Item 4 -->
                <div class="accordion-item">
                    <button class="accordion-header" aria-expanded="false">
                        <span class="question-text">Why use Semantic HTML5 elements?</span>
                        <span class="accordion-icon">▾</span>
                    </button>
                    <div class="accordion-content">
                        <div class="content-inner">
                            <p>Semantic tags like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> provide meaningful context to screen readers (Accessibility / a11y), improve search engine indexing (SEO), and ensure code is readable and maintainable across teams.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0f172a;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 780px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(56, 189, 248, 0.3);
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.accordion-wrapper {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 18px;
    padding: 1.8rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.accordion-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #334155;
    flex-wrap: wrap;
    gap: 10px;
}

.mode-toggle label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #cbd5e1;
    cursor: pointer;
}

.mode-toggle input {
    accent-color: #38bdf8;
}

.toolbar-actions {
    display: flex;
    gap: 8px;
}

.tool-btn {
    background: #0f172a;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.tool-btn:hover {
    border-color: #38bdf8;
    color: #ffffff;
}

/* Accordion Item */
.accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.accordion-item {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
}

.accordion-item.active {
    border-color: #38bdf8;
}

.accordion-header {
    width: 100%;
    background: transparent;
    border: none;
    padding: 1.2rem 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #f8fafc;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    transition: color 0.2s;
}

.accordion-header:hover {
    color: #38bdf8;
}

.accordion-icon {
    font-size: 1.2rem;
    color: #94a3b8;
    transition: transform 0.3s ease;
    margin-left: 1rem;
}

.accordion-item.active .accordion-icon {
    transform: rotate(180deg);
    color: #38bdf8;
}

/* Content Collapsible */
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-inner {
    padding: 0 1.4rem 1.4rem;
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
}

.content-inner p {
    margin-bottom: 0.75rem;
}

.content-inner p:last-child {
    margin-bottom: 0;
}

.content-inner code {
    background: #1e293b;
    color: #38bdf8;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
}

.content-inner strong {
    color: #f8fafc;
}""",
        "script": """const accordion = document.getElementById('faqAccordion');
const singleModeCheckbox = document.getElementById('singleModeCheckbox');
const expandAllBtn = document.getElementById('expandAllBtn');
const collapseAllBtn = document.getElementById('collapseAllBtn');

function openItem(item) {
    item.classList.add('active');
    const header = item.querySelector('.accordion-header');
    header.setAttribute('aria-expanded', 'true');
    const content = item.querySelector('.accordion-content');
    content.style.maxHeight = `${content.scrollHeight}px`;
}

function closeItem(item) {
    item.classList.remove('active');
    const header = item.querySelector('.accordion-header');
    header.setAttribute('aria-expanded', 'false');
    const content = item.querySelector('.accordion-content');
    content.style.maxHeight = '0px';
}

// Initial active setup
document.querySelectorAll('.accordion-item.active').forEach(openItem);

accordion.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const item = header.parentElement;
    const isSingleMode = singleModeCheckbox.checked;
    const isActive = item.classList.contains('active');

    if (isSingleMode) {
        accordion.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) closeItem(otherItem);
        });
    }

    if (isActive) {
        closeItem(item);
    } else {
        openItem(item);
    }
});

expandAllBtn.addEventListener('click', () => {
    accordion.querySelectorAll('.accordion-item').forEach(openItem);
});

collapseAllBtn.addEventListener('click', () => {
    accordion.querySelectorAll('.accordion-item').forEach(closeItem);
});"""
    },

    "12-modal-popup-dialog": {
        "title": "12 - Modal Popup with Backdrop & Animations",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>12 - Modal Popup Dialog</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 12 • Level 2: Components</span>
            <h1>Modal Popup & Backdrop Dialog</h1>
            <p>Master accessible modal overlays, CSS scale animations, scroll locks, form inputs, and keyboard ESC handlers.</p>
        </header>

        <div class="demo-card">
            <h2>Interactive Modal Demonstrations</h2>
            <p>Click any button below to trigger custom animated modal dialogs with backdrop blur.</p>
            <div class="btn-group">
                <button class="btn btn-primary" id="openFormModalBtn">📝 Open Feedback Modal</button>
                <button class="btn btn-danger" id="openConfirmModalBtn">⚠️ Open Danger Confirmation</button>
            </div>
        </div>

        <div class="status-box" id="feedbackStatus">
            <span>Last action: <em>No action taken yet</em></span>
        </div>
    </div>

    <!-- 1. Form Modal -->
    <div class="modal-overlay hidden" id="formModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="modalTitle">✨ Send Your Feedback</h3>
                <button class="close-modal" aria-label="Close modal">&times;</button>
            </div>
            <form id="feedbackForm">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="userName">Your Full Name</label>
                        <input type="text" id="userName" placeholder="e.g. Alex Morgan" required>
                    </div>
                    <div class="form-group">
                        <label for="userEmail">Email Address</label>
                        <input type="email" id="userEmail" placeholder="alex@example.com" required>
                    </div>
                    <div class="form-group">
                        <label for="userFeedback">Comments & Feedback</label>
                        <textarea id="userFeedback" rows="3" placeholder="Tell us about your experience..." required></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Feedback</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 2. Danger Confirmation Modal -->
    <div class="modal-overlay hidden" id="confirmModal" role="dialog" aria-modal="true">
        <div class="modal-box modal-sm">
            <div class="modal-header">
                <h3>⚠️ Delete Project Confirmation</h3>
                <button class="close-modal" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to permanently delete this repository? This action <strong>cannot be undone</strong>.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary cancel-btn">Keep Project</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Yes, Delete</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

body.modal-open {
    overflow: hidden;
}

.container {
    max-width: 650px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.demo-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    margin-bottom: 1.5rem;
}

.demo-card h2 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.demo-card p {
    color: #94a3b8;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

.btn-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-family: inherit;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #4f46e5; color: white; }
.btn-primary:hover { background: #4338ca; }

.btn-danger { background: #e11d48; color: white; }
.btn-danger:hover { background: #be123c; }

.btn-secondary { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; }
.btn-secondary:hover { background: #334155; color: white; }

.status-box {
    background: #131b2e;
    border: 1px solid #1e293b;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    color: #38bdf8;
    font-size: 0.9rem;
}

/* Modal Overlay & Box */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
    opacity: 1;
    transition: opacity 0.25s ease;
}

.modal-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.modal-box {
    background: #131b2e;
    border: 1px solid #334155;
    border-radius: 18px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
    transform: scale(1);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-overlay.hidden .modal-box {
    transform: scale(0.92);
}

.modal-sm {
    max-width: 420px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid #1e293b;
}

.modal-header h3 {
    font-size: 1.2rem;
    color: #f8fafc;
}

.close-modal {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 1.6rem;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
}

.close-modal:hover {
    color: #f8fafc;
}

.modal-body {
    padding: 1.6rem;
}

.modal-body p {
    color: #94a3b8;
    line-height: 1.6;
}

.modal-body strong {
    color: #f43f5e;
}

.form-group {
    margin-bottom: 1.2rem;
}

.form-group label {
    display: block;
    font-size: 0.85rem;
    color: #cbd5e1;
    margin-bottom: 0.4rem;
    font-weight: 600;
}

.form-group input, .form-group textarea {
    width: 100%;
    background: #0b0f19;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
}

.form-group input:focus, .form-group textarea:focus {
    border-color: #4f46e5;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 1.2rem 1.6rem;
    border-top: 1px solid #1e293b;
}""",
        "script": """const openFormModalBtn = document.getElementById('openFormModalBtn');
const openConfirmModalBtn = document.getElementById('openConfirmModalBtn');
const formModal = document.getElementById('formModal');
const confirmModal = document.getElementById('confirmModal');
const feedbackStatus = document.getElementById('feedbackStatus');
const feedbackForm = document.getElementById('feedbackForm');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

function showModal(modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function hideModal(modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

openFormModalBtn.addEventListener('click', () => showModal(formModal));
openConfirmModalBtn.addEventListener('click', () => showModal(confirmModal));

[formModal, confirmModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal') || e.target.classList.contains('cancel-btn')) {
            hideModal(modal);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal(formModal);
        hideModal(confirmModal);
    }
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    feedbackStatus.innerHTML = `Last action: <strong>Feedback submitted by ${name}! 🎉</strong>`;
    hideModal(formModal);
    feedbackForm.reset();
});

confirmDeleteBtn.addEventListener('click', () => {
    feedbackStatus.innerHTML = `Last action: <strong style="color: #ef4444;">Project was successfully deleted! 🗑️</strong>`;
    hideModal(confirmModal);
});"""
    },

    "13-image-carousel-slider": {
        "title": "13 - Image Carousel Slider",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>13 - Image Carousel Slider</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 13 • Level 2: Components</span>
            <h1>Modern Carousel & Image Slider</h1>
            <p>CSS Transform translateX slide animations, auto-play with hover pause, touch swipe, and dot pagination.</p>
        </header>

        <div class="slider-container" id="sliderContainer">
            <div class="slider-track" id="sliderTrack">
                <!-- Slide 1 -->
                <div class="slide">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80" alt="Majestic Mountains">
                    <div class="slide-caption">
                        <span class="caption-tag">Nature</span>
                        <h2>Majestic Alpine Horizons</h2>
                        <p>Breathtaking mountain ridges glowing beneath twilight hues.</p>
                    </div>
                </div>

                <!-- Slide 2 -->
                <div class="slide">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80" alt="Cyber Technology">
                    <div class="slide-caption">
                        <span class="caption-tag">Hardware</span>
                        <h2>Silicon Microcircuitry</h2>
                        <p>Engineering the foundations of quantum computing and neural processors.</p>
                    </div>
                </div>

                <!-- Slide 3 -->
                <div class="slide">
                    <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80" alt="Metropolis Cityscape">
                    <div class="slide-caption">
                        <span class="caption-tag">Urban</span>
                        <h2>Midnight Neon Metropolis</h2>
                        <p>The electric heartbeat of futuristic city skyscrapers at dusk.</p>
                    </div>
                </div>
            </div>

            <!-- Arrow Controls -->
            <button class="nav-btn prev-btn" id="prevBtn" aria-label="Previous Slide">‹</button>
            <button class="nav-btn next-btn" id="nextBtn" aria-label="Next Slide">›</button>

            <!-- Dot Indicators -->
            <div class="dots-container" id="dotsContainer"></div>
        </div>

        <!-- Slider Status Bar -->
        <div class="slider-status">
            <span>Auto-Play: <strong id="autoplayStatus">Active (Paused on hover)</strong></span>
            <button class="btn-toggle-play" id="togglePlayBtn">Pause</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 900px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.slider-container {
    position: relative;
    width: 100%;
    height: 440px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
    border: 1px solid #1e293b;
}

.slider-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide {
    min-width: 100%;
    height: 100%;
    position: relative;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem 2rem 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}

.caption-tag {
    background: #38bdf8;
    color: #080c15;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
    text-transform: uppercase;
}

.slide-caption h2 {
    font-size: 1.8rem;
    margin: 0.4rem 0 0.2rem;
}

.slide-caption p {
    color: #cbd5e1;
    font-size: 0.95rem;
}

/* Nav Buttons */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(5px);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
}

.nav-btn:hover {
    background: #38bdf8;
    color: #080c15;
}

.prev-btn { left: 16px; }
.next-btn { right: 16px; }

/* Dots */
.dots-container {
    position: absolute;
    bottom: 16px;
    right: 20px;
    display: flex;
    gap: 8px;
    z-index: 10;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    width: 32px;
    border-radius: 999px;
    background: #38bdf8;
}

.slider-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 0.9rem 1.4rem;
    margin-top: 1.2rem;
    color: #94a3b8;
    font-size: 0.9rem;
}

.btn-toggle-play {
    background: #080c15;
    border: 1px solid #334155;
    color: #38bdf8;
    padding: 5px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}""",
        "script": """const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');
const sliderContainer = document.getElementById('sliderContainer');
const togglePlayBtn = document.getElementById('togglePlayBtn');

let currentIndex = 0;
let isPlaying = true;
let timer = null;

// Generate dots
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAutoPlay() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    if (timer) clearInterval(timer);
}

sliderContainer.addEventListener('mouseenter', () => {
    if (isPlaying) stopAutoPlay();
});

sliderContainer.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoPlay();
});

togglePlayBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        startAutoPlay();
        togglePlayBtn.textContent = 'Pause';
    } else {
        stopAutoPlay();
        togglePlayBtn.textContent = 'Resume';
    }
});

startAutoPlay();"""
    },

    "14-tabs-navigation-component": {
        "title": "14 - Tabs Navigation Component",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>14 - Tabs Navigation Component</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 14 • Level 2: Components</span>
            <h1>Sliding Indicator Tabs Component</h1>
            <p>Dynamic bounding box pill indicator calculation, smooth content transitions, and tab switching.</p>
        </header>

        <div class="tabs-card">
            <!-- Tabs Navigation Header -->
            <div class="tabs-header-wrapper">
                <div class="tabs-nav" id="tabsNav">
                    <button class="tab-btn active" data-tab="overview">📊 Overview</button>
                    <button class="tab-btn" data-tab="analytics">📈 Analytics</button>
                    <button class="tab-btn" data-tab="integrations">🔌 Integrations</button>
                    <button class="tab-btn" data-tab="settings">⚙️ Settings</button>
                    <!-- Active Indicator Pill -->
                    <span class="tab-indicator" id="tabIndicator"></span>
                </div>
            </div>

            <!-- Tab Content Panels -->
            <div class="tabs-body">
                <!-- 1. Overview -->
                <div class="tab-panel active" id="overview">
                    <h3>Project Ecosystem Overview</h3>
                    <p>Antigravity Engine provides real-time state visualization, automated test pipelines, and distributed edge deployment.</p>
                    <div class="metric-row">
                        <div class="metric-box">
                            <strong>1.2M</strong>
                            <span>Requests / Min</span>
                        </div>
                        <div class="metric-box">
                            <strong>99.98%</strong>
                            <span>Availability</span>
                        </div>
                        <div class="metric-box">
                            <strong>14ms</strong>
                            <span>P99 Latency</span>
                        </div>
                    </div>
                </div>

                <!-- 2. Analytics -->
                <div class="tab-panel" id="analytics">
                    <h3>Traffic & User Telemetry</h3>
                    <p>Inspect real-time telemetry metrics, geographically distributed edge caches, and query execution times.</p>
                    <div class="metric-row">
                        <div class="metric-box">
                            <strong>+34.2%</strong>
                            <span>Monthly Growth</span>
                        </div>
                        <div class="metric-box">
                            <strong>48.5k</strong>
                            <span>Active Sessions</span>
                        </div>
                    </div>
                </div>

                <!-- 3. Integrations -->
                <div class="tab-panel" id="integrations">
                    <h3>Connected Developer Tools</h3>
                    <p>Seamless bidirectional synchronization with GitHub, GitLab, Slack, and AWS CloudWatch.</p>
                    <div class="metric-row">
                        <div class="metric-box">
                            <strong>8 Active</strong>
                            <span>Webhooks</span>
                        </div>
                        <div class="metric-box">
                            <strong>OAuth 2.0</strong>
                            <span>Auth Protocol</span>
                        </div>
                    </div>
                </div>

                <!-- 4. Settings -->
                <div class="tab-panel" id="settings">
                    <h3>Workspace Preferences</h3>
                    <p>Configure notifications, API authentication tokens, and granular permission access controls.</p>
                    <div class="metric-row">
                        <div class="metric-box">
                            <strong>Production</strong>
                            <span>Cluster Mode</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #090d16;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 780px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.tabs-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    padding: 1.8rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
}

.tabs-header-wrapper {
    border-bottom: 1px solid #1f2937;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

.tabs-nav {
    position: relative;
    display: flex;
    gap: 8px;
    overflow-x: auto;
}

.tab-btn {
    position: relative;
    background: transparent;
    border: none;
    color: #9ca3af;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    cursor: pointer;
    transition: color 0.2s;
    z-index: 2;
    white-space: nowrap;
}

.tab-btn:hover {
    color: #ffffff;
}

.tab-btn.active {
    color: #ffffff;
}

/* Sliding Indicator */
.tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    background: #6366f1;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
}

.tabs-body {
    min-height: 220px;
}

.tab-panel {
    display: none;
    animation: fadeIn 0.3s ease-in-out;
}

.tab-panel.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

.tab-panel h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #f8fafc;
}

.tab-panel p {
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.metric-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.metric-box {
    flex: 1;
    min-width: 140px;
    background: #0b0f19;
    border: 1px solid #1f2937;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
}

.metric-box strong {
    display: block;
    font-size: 1.4rem;
    color: #38bdf8;
    margin-bottom: 0.2rem;
}

.metric-box span {
    font-size: 0.8rem;
    color: #6b7280;
    text-transform: uppercase;
}""",
        "script": """const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const indicator = document.getElementById('tabIndicator');
const tabsNav = document.getElementById('tabsNav');

function moveIndicator(btn) {
    const navRect = tabsNav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    indicator.style.left = `${btnRect.left - navRect.left}px`;
    indicator.style.width = `${btnRect.width}px`;
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        document.getElementById(targetId).classList.add('active');

        moveIndicator(btn);
    });
});

window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) moveIndicator(activeBtn);
});

// Initial positioning
const initialActive = document.querySelector('.tab-btn.active');
if (initialActive) moveIndicator(initialActive);"""
    },

    "15-custom-dropdown-select": {
        "title": "15 - Custom Dropdown / Select Menu",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>15 - Custom Dropdown Select</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 15 • Level 2: Components</span>
            <h1>Custom Searchable Dropdown</h1>
            <p>Full control styling, live search filtering, keyboard accessibility, and outside-click dismiss.</p>
        </header>

        <div class="card">
            <label class="form-label">Assign Project Lead</label>
            
            <!-- Custom Select Component -->
            <div class="custom-select" id="customSelect">
                <button class="select-trigger" id="selectTrigger" aria-haspopup="listbox" aria-expanded="false">
                    <span class="selected-val">Select a team member...</span>
                    <span class="chevron">▾</span>
                </button>

                <div class="select-dropdown" id="selectDropdown">
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Search members...">
                    </div>
                    <ul class="options-list" id="optionsList" role="listbox">
                        <li class="option-item" data-value="sarah" data-name="Sarah Connor">
                            <span class="opt-avatar">👩🏻‍💻</span>
                            <div class="opt-info">
                                <strong>Sarah Connor</strong>
                                <span>Principal Architect</span>
                            </div>
                        </li>
                        <li class="option-item" data-value="alex" data-name="Alex Chen">
                            <span class="opt-avatar">👨🏻‍🎨</span>
                            <div class="opt-info">
                                <strong>Alex Chen</strong>
                                <span>UI/UX Design Director</span>
                            </div>
                        </li>
                        <li class="option-item" data-value="david" data-name="David Miller">
                            <span class="opt-avatar">👨🏼‍💻</span>
                            <div class="opt-info">
                                <strong>David Miller</strong>
                                <span>DevOps & Security Lead</span>
                            </div>
                        </li>
                        <li class="option-item" data-value="elena" data-name="Elena Rostova">
                            <span class="opt-avatar">👩🏼‍💼</span>
                            <div class="opt-info">
                                <strong>Elena Rostova</strong>
                                <span>Product Manager</span>
                            </div>
                        </li>
                        <li class="option-item" data-value="kenji" data-name="Kenji Sato">
                            <span class="opt-avatar">👨🏻‍💻</span>
                            <div class="opt-info">
                                <strong>Kenji Sato</strong>
                                <span>Full-Stack Engineer</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="result-box" id="resultBox">
                <span>Selected Lead: <strong id="selectedResult">None</strong></span>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 520px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.form-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    color: #cbd5e1;
    margin-bottom: 0.5rem;
}

/* Custom Select */
.custom-select {
    position: relative;
    margin-bottom: 1.5rem;
}

.select-trigger {
    width: 100%;
    background: #0b0f19;
    border: 1px solid #334155;
    border-radius: 10px;
    padding: 0.85rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f8fafc;
    font-family: inherit;
    font-size: 0.95rem;
    cursor: pointer;
    transition: border-color 0.2s;
}

.select-trigger:hover, .custom-select.open .select-trigger {
    border-color: #38bdf8;
}

.chevron {
    font-size: 1.2rem;
    color: #94a3b8;
    transition: transform 0.2s ease;
}

.custom-select.open .chevron {
    transform: rotate(180deg);
    color: #38bdf8;
}

/* Dropdown */
.select-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: #131b2e;
    border: 1px solid #334155;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.5);
    z-index: 100;
    display: none;
    overflow: hidden;
}

.custom-select.open .select-dropdown {
    display: block;
}

.search-box {
    padding: 0.75rem;
    border-bottom: 1px solid #1e293b;
}

.search-box input {
    width: 100%;
    background: #0b0f19;
    border: 1px solid #334155;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 0.85rem;
    outline: none;
}

.search-box input:focus {
    border-color: #38bdf8;
}

.options-list {
    list-style: none;
    max-height: 220px;
    overflow-y: auto;
}

.option-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.15s;
}

.option-item:hover, .option-item.selected {
    background: #1e293b;
}

.option-item.selected {
    border-left: 3px solid #38bdf8;
}

.opt-avatar { font-size: 1.4rem; }

.opt-info strong {
    display: block;
    font-size: 0.9rem;
    color: #f8fafc;
}

.opt-info span {
    font-size: 0.75rem;
    color: #64748b;
}

.result-box {
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.9rem;
}

.result-box strong {
    color: #38bdf8;
}""",
        "script": """const customSelect = document.getElementById('customSelect');
const selectTrigger = document.getElementById('selectTrigger');
const selectDropdown = document.getElementById('selectDropdown');
const searchInput = document.getElementById('searchInput');
const optionsList = document.getElementById('optionsList');
const selectedVal = document.querySelector('.selected-val');
const selectedResult = document.getElementById('selectedResult');

selectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = customSelect.classList.toggle('open');
    selectTrigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) searchInput.focus();
});

document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
        selectTrigger.setAttribute('aria-expanded', 'false');
    }
});

optionsList.addEventListener('click', (e) => {
    const item = e.target.closest('.option-item');
    if (!item) return;

    optionsList.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    item.classList.add('selected');

    const name = item.dataset.name;
    selectedVal.textContent = name;
    selectedResult.textContent = name;

    customSelect.classList.remove('open');
    selectTrigger.setAttribute('aria-expanded', 'false');
});

// Live Search Filter
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    optionsList.querySelectorAll('.option-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
});"""
    }
}

# Add questions 16 to 25
tier2_projects.update({
    "16-toast-notification-system": {
        "title": "16 - Toast Notification System",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>16 - Toast Notification System</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 16 • Level 2: Components</span>
            <h1>Toast Notification System</h1>
            <p>Stacked dynamic toasts with countdown progress bars, 4 intent states, and custom auto-dismiss timeouts.</p>
        </header>

        <div class="trigger-card">
            <h2>Spawn Notification Banners</h2>
            <div class="actions-grid">
                <button class="btn btn-success" id="successToast">✓ Success Toast</button>
                <button class="btn btn-error" id="errorToast">✕ Error Toast</button>
                <button class="btn btn-warning" id="warningToast">⚠️ Warning Toast</button>
                <button class="btn btn-info" id="infoToast">ℹ️ Info Toast</button>
            </div>
        </div>

        <!-- Toast Notification Container -->
        <div class="toast-container" id="toastContainer"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 620px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.trigger-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.trigger-card h2 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.btn {
    padding: 0.8rem 1.2rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    transition: transform 0.15s;
}

.btn:active {
    transform: scale(0.97);
}

.btn-success { background: #10b981; color: white; }
.btn-error { background: #ef4444; color: white; }
.btn-warning { background: #f59e0b; color: #0b0f19; }
.btn-info { background: #3b82f6; color: white; }

/* Toast Container */
.toast-container {
    position: fixed;
    top: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 9999;
    max-width: 360px;
    width: 100%;
}

.toast {
    position: relative;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.toast.hide {
    animation: slideOut 0.3s forwards;
}

@keyframes slideOut {
    to { transform: translateX(110%); opacity: 0; }
}

.toast-icon {
    font-size: 1.4rem;
}

.toast-content {
    flex: 1;
}

.toast-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #f8fafc;
}

.toast-desc {
    font-size: 0.8rem;
    color: #94a3b8;
}

.toast-close {
    background: transparent;
    border: none;
    color: #64748b;
    font-size: 1.2rem;
    cursor: pointer;
    line-height: 1;
}

.toast-close:hover {
    color: #f8fafc;
}

.toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    animation: progress linear forwards;
}

@keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
}

.toast.success .toast-progress { background: #10b981; }
.toast.error .toast-progress { background: #ef4444; }
.toast.warning .toast-progress { background: #f59e0b; }
.toast.info .toast-progress { background: #3b82f6; }""",
        "script": """const container = document.getElementById('toastContainer');
const successBtn = document.getElementById('successToast');
const errorBtn = document.getElementById('errorToast');
const warningBtn = document.getElementById('warningToast');
const infoBtn = document.getElementById('infoToast');

function createToast(type, icon, title, desc, duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-desc">${desc}</div>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);

    container.appendChild(toast);
}

successBtn.addEventListener('click', () => {
    createToast('success', '✓', 'Operation Successful', 'Your changes have been saved to the cloud.');
});

errorBtn.addEventListener('click', () => {
    createToast('error', '✕', 'Connection Error', 'Failed to reach database server. Retry in 5s.');
});

warningBtn.addEventListener('click', () => {
    createToast('warning', '⚠️', 'Storage Almost Full', 'You have utilized 92% of allocated disk capacity.');
});

infoBtn.addEventListener('click', () => {
    createToast('info', 'ℹ️', 'New Version Available', 'Antigravity 2.4 update is ready for installation.');
});"""
    },

    "17-star-rating-component": {
        "title": "17 - Star Rating Component",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>17 - Star Rating Component</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 17 • Level 2: Components</span>
            <h1>Interactive Star Rating Widget</h1>
            <p>Hover previews, live mood sentiment feedback, score submission, and reset state.</p>
        </header>

        <div class="rating-card">
            <h2>How was your development experience?</h2>
            <p>Hover over stars to rate our component architecture.</p>

            <div class="stars-box" id="starsBox">
                <span class="star" data-rating="1">★</span>
                <span class="star" data-rating="2">★</span>
                <span class="star" data-rating="3">★</span>
                <span class="star" data-rating="4">★</span>
                <span class="star" data-rating="5">★</span>
            </div>

            <div class="rating-feedback" id="ratingFeedback">Select your rating</div>

            <div class="rating-actions">
                <button class="btn btn-primary" id="submitRatingBtn" disabled>Submit Rating</button>
                <button class="btn btn-secondary" id="resetRatingBtn">Reset</button>
            </div>
        </div>

        <div class="thank-card hidden" id="thankCard">
            <h3>🎉 Thank you for your review!</h3>
            <p>You rated us <strong id="finalScore">0</strong> out of 5 stars.</p>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 500px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.rating-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2.2rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.rating-card h2 {
    font-size: 1.25rem;
    margin-bottom: 0.4rem;
}

.rating-card p {
    color: #94a3b8;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}

.stars-box {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 1rem;
}

.star {
    font-size: 2.6rem;
    color: #334155;
    cursor: pointer;
    transition: color 0.15s, transform 0.15s;
}

.star:hover {
    transform: scale(1.18);
}

.star.active, .star.hovered {
    color: #f59e0b;
    text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
}

.rating-feedback {
    font-size: 1.05rem;
    font-weight: 700;
    color: #38bdf8;
    min-height: 28px;
    margin-bottom: 1.5rem;
}

.rating-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #f59e0b; color: #0b0f19; }
.btn-primary:hover:not(:disabled) { background: #d97706; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-secondary { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; }
.btn-secondary:hover { background: #334155; }

.thank-card {
    background: #131b2e;
    border: 1px solid #10b981;
    border-radius: 18px;
    padding: 2rem;
    text-align: center;
    margin-top: 1.5rem;
}

.thank-card h3 { color: #10b981; margin-bottom: 0.5rem; }
.thank-card.hidden { display: none; }""",
        "script": """const stars = document.querySelectorAll('.star');
const feedback = document.getElementById('ratingFeedback');
const submitBtn = document.getElementById('submitRatingBtn');
const resetBtn = document.getElementById('resetRatingBtn');
const thankCard = document.getElementById('thankCard');
const finalScore = document.getElementById('finalScore');

const moods = {
    1: '😞 1 Star - Terrible Experience',
    2: '🙁 2 Stars - Needs Improvement',
    3: '😐 3 Stars - Average / Okay',
    4: '🙂 4 Stars - Very Good!',
    5: '🤩 5 Stars - Absolutely Outstanding!'
};

let currentRating = 0;

function highlightStars(count, className = 'hovered') {
    stars.forEach(star => {
        const r = parseInt(star.dataset.rating);
        if (r <= count) {
            star.classList.add(className);
        } else {
            star.classList.remove(className);
        }
    });
}

stars.forEach(star => {
    const rating = parseInt(star.dataset.rating);

    star.addEventListener('mouseenter', () => {
        highlightStars(rating, 'hovered');
        feedback.textContent = moods[rating];
    });

    star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
        if (currentRating > 0) {
            highlightStars(currentRating, 'active');
            feedback.textContent = moods[currentRating];
        } else {
            feedback.textContent = 'Select your rating';
        }
    });

    star.addEventListener('click', () => {
        currentRating = rating;
        highlightStars(currentRating, 'active');
        feedback.textContent = moods[currentRating];
        submitBtn.disabled = false;
    });
});

resetBtn.addEventListener('click', () => {
    currentRating = 0;
    stars.forEach(s => s.classList.remove('active', 'hovered'));
    feedback.textContent = 'Select your rating';
    submitBtn.disabled = true;
    thankCard.classList.add('hidden');
});

submitBtn.addEventListener('click', () => {
    finalScore.textContent = currentRating;
    thankCard.classList.remove('hidden');
});"""
    },

    "18-multi-step-form-progress": {
        "title": "18 - Multi-Step Form with Progress Bar",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>18 - Multi-Step Form Progress Bar</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 18 • Level 2: Components</span>
            <h1>Multi-Step Wizard Form</h1>
            <p>Step-by-step progress tracking, validation gating, and state transitions.</p>
        </header>

        <div class="wizard-card">
            <!-- Step Progress Indicator -->
            <div class="steps-indicator">
                <div class="progress-track">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="step-node active" data-step="1">
                    <span>1</span>
                    <label>Account</label>
                </div>
                <div class="step-node" data-step="2">
                    <span>2</span>
                    <label>Profile</label>
                </div>
                <div class="step-node" data-step="3">
                    <span>3</span>
                    <label>Review</label>
                </div>
            </div>

            <!-- Steps Form -->
            <form id="wizardForm">
                <!-- Step 1 -->
                <div class="step-panel active" id="step1">
                    <h3>Step 1: Account Credentials</h3>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="emailInput" placeholder="name@company.com" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="passInput" placeholder="At least 6 characters" required>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="step-panel" id="step2">
                    <h3>Step 2: Profile Details</h3>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="fullnameInput" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label>Role / Position</label>
                        <input type="text" id="roleInput" placeholder="Lead Software Architect" required>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="step-panel" id="step3">
                    <h3>Step 3: Confirm & Launch</h3>
                    <p>Please review your details before submitting:</p>
                    <div class="summary-box">
                        <p><strong>Email:</strong> <span id="sumEmail">-</span></p>
                        <p><strong>Name:</strong> <span id="sumName">-</span></p>
                        <p><strong>Role:</strong> <span id="sumRole">-</span></p>
                    </div>
                </div>

                <!-- Wizard Actions -->
                <div class="wizard-actions">
                    <button type="button" class="btn btn-secondary" id="prevStepBtn" disabled>Back</button>
                    <button type="button" class="btn btn-primary" id="nextStepBtn">Next Step →</button>
                </div>
            </form>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 580px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.wizard-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 20px;
    padding: 2.2rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

/* Steps Indicator */
.steps-indicator {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
}

.progress-track {
    position: absolute;
    top: 18px;
    left: 20px;
    right: 20px;
    height: 4px;
    background: #1e293b;
    z-index: 1;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: #4f46e5;
    transition: width 0.35s ease;
}

.step-node {
    position: relative;
    z-index: 2;
    text-align: center;
}

.step-node span {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #1e293b;
    border: 2px solid #334155;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin: 0 auto 0.4rem;
    transition: all 0.3s ease;
}

.step-node.active span, .step-node.completed span {
    background: #4f46e5;
    border-color: #6366f1;
    color: white;
}

.step-node label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 700;
}

.step-node.active label {
    color: #f8fafc;
}

/* Step Panels */
.step-panel {
    display: none;
    min-height: 190px;
}

.step-panel.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

.step-panel h3 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
}

.form-group {
    margin-bottom: 1.2rem;
}

.form-group label {
    display: block;
    font-size: 0.85rem;
    color: #cbd5e1;
    margin-bottom: 0.4rem;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    background: #0b0f19;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
}

.form-group input:focus {
    border-color: #4f46e5;
}

.summary-box {
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 1.2rem;
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height: 1.8;
}

.summary-box strong {
    color: #38bdf8;
}

.wizard-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1.2rem;
    border-top: 1px solid #1e293b;
}

.btn {
    padding: 0.75rem 1.6rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #4f46e5; color: white; }
.btn-primary:hover { background: #4338ca; }
.btn-secondary { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; }
.btn-secondary:hover:not(:disabled) { background: #334155; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }""",
        "script": """let currentStep = 1;
const totalSteps = 3;

const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevStepBtn');
const nextBtn = document.getElementById('nextStepBtn');

const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const fullnameInput = document.getElementById('fullnameInput');
const roleInput = document.getElementById('roleInput');

const sumEmail = document.getElementById('sumEmail');
const sumName = document.getElementById('sumName');
const sumRole = document.getElementById('sumRole');

function updateWizard() {
    // Fill calculation
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Nodes
    document.querySelectorAll('.step-node').forEach((node, idx) => {
        const stepNum = idx + 1;
        node.classList.toggle('active', stepNum === currentStep);
        node.classList.toggle('completed', stepNum < currentStep);
    });

    // Panels
    document.querySelectorAll('.step-panel').forEach((panel, idx) => {
        panel.classList.toggle('active', idx + 1 === currentStep);
    });

    prevBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === totalSteps ? 'Launch Account 🚀' : 'Next Step →';

    if (currentStep === 3) {
        sumEmail.textContent = emailInput.value || 'N/A';
        sumName.textContent = fullnameInput.value || 'N/A';
        sumRole.textContent = roleInput.value || 'N/A';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentStep === 1) {
        if (!emailInput.value || !passInput.value) {
            alert('Please fill out account credentials.');
            return;
        }
    } else if (currentStep === 2) {
        if (!fullnameInput.value || !roleInput.value) {
            alert('Please fill out profile details.');
            return;
        }
    } else if (currentStep === 3) {
        alert('Account setup complete! Welcome aboard.');
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateWizard();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateWizard();
    }
});"""
    },

    "19-live-search-autocomplete": {
        "title": "19 - Search Bar with Live Autocomplete",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>19 - Search Autocomplete</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Fira+Code:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 19 • Level 2: Components</span>
            <h1>Live Search & Instant Filter</h1>
            <p>Debounced input listening, highlight matching text chunks, and category tags.</p>
        </header>

        <div class="search-card">
            <div class="search-box-wrapper">
                <span class="search-icon">🔍</span>
                <input type="text" id="liveSearchInput" placeholder="Search web technologies (e.g. React, Docker, CSS)..." autocomplete="off">
                <button class="clear-btn hidden" id="clearSearchBtn">✕</button>
            </div>

            <!-- Autocomplete Results Dropdown -->
            <div class="results-container" id="resultsContainer">
                <div class="empty-state">Start typing to see matching developer topics...</div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 600px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.search-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 1.8rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.search-box-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #0b0f19;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    transition: border-color 0.2s;
}

.search-box-wrapper:focus-within {
    border-color: #38bdf8;
}

.search-icon {
    font-size: 1.1rem;
    margin-right: 10px;
}

input {
    width: 100%;
    background: transparent;
    border: none;
    color: #f8fafc;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
}

.clear-btn {
    background: transparent;
    border: none;
    color: #64748b;
    font-size: 1.1rem;
    cursor: pointer;
}

.clear-btn:hover { color: #f8fafc; }
.clear-btn.hidden { display: none; }

.results-container {
    margin-top: 1.2rem;
    max-height: 280px;
    overflow-y: auto;
}

.result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
}

.result-item:hover {
    background: #1e293b;
}

.item-title {
    font-size: 0.95rem;
    font-weight: 600;
}

mark {
    background: rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    padding: 1px 3px;
    border-radius: 3px;
}

.item-category {
    font-size: 0.75rem;
    background: #0b0f19;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 3px 8px;
    border-radius: 4px;
}

.empty-state {
    text-align: center;
    color: #64748b;
    padding: 1.5rem;
    font-size: 0.9rem;
}""",
        "script": """const topics = [
    { title: "HTML5 Semantic Elements", cat: "Frontend" },
    { title: "CSS Flexbox & Grid Layouts", cat: "Styling" },
    { title: "JavaScript ES6+ & Async/Await", cat: "Programming" },
    { title: "React Components & Hooks", cat: "Framework" },
    { title: "TypeScript Generics & Types", cat: "Language" },
    { title: "Node.js & Express REST APIs", cat: "Backend" },
    { title: "Docker Containerization", cat: "DevOps" },
    { title: "GraphQL Queries & Mutations", cat: "API" },
    { title: "Tailwind CSS Utility Classes", cat: "Styling" },
    { title: "PostgreSQL Relational Database", cat: "Database" }
];

const searchInput = document.getElementById('liveSearchInput');
const clearBtn = document.getElementById('clearSearchBtn');
const resultsContainer = document.getElementById('resultsContainer');

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function renderResults() {
    const query = searchInput.value.trim();
    clearBtn.classList.toggle('hidden', query.length === 0);

    if (!query) {
        resultsContainer.innerHTML = '<div class="empty-state">Start typing to see matching developer topics...</div>';
        return;
    }

    const filtered = topics.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="empty-state">No matching topics found for "${query}"</div>`;
        return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
        <div class="result-item" onclick="alert('Navigating to: ${item.title}')">
            <span class="item-title">${highlightMatch(item.title, query)}</span>
            <span class="item-category">${item.cat}</span>
        </div>
    `).join('');
}

searchInput.addEventListener('input', renderResults);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderResults();
    searchInput.focus();
});"""
    },

    "20-custom-range-slider": {
        "title": "20 - Range Slider with Dynamic Tooltip",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>20 - Custom Range Slider</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Fira+Code:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 20 • Level 2: Components</span>
            <h1>Custom Range Slider & Floating Value</h1>
            <p>Calculates thumb position offsets in real-time with dual-color dynamic progress tracks.</p>
        </header>

        <div class="slider-card">
            <h2>Budget Allocation Range</h2>
            
            <div class="range-wrapper">
                <div class="floating-tooltip" id="sliderTooltip">$2,500</div>
                <input type="range" id="budgetRange" min="500" max="10000" step="100" value="2500">
            </div>

            <div class="range-limits">
                <span>Min: $500</span>
                <span>Max: $10,000</span>
            </div>

            <div class="calculated-output">
                <div class="calc-row">
                    <span>Selected Monthly Budget:</span>
                    <strong id="finalValue">$2,500</strong>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 550px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.slider-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2.5rem 2rem 2rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.slider-card h2 {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
    text-align: center;
}

.range-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
}

.floating-tooltip {
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    background: #4f46e5;
    color: white;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    pointer-events: none;
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
}

.floating-tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: #4f46e5 transparent transparent;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 99px;
    background: #1e293b;
    outline: none;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid #4f46e5;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: transform 0.1s;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.range-limits {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 2rem;
}

.calculated-output {
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 1.2rem;
}

.calc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.calc-row span { color: #94a3b8; }
.calc-row strong { font-size: 1.3rem; color: #38bdf8; font-family: 'Fira Code', monospace; }""",
        "script": """const range = document.getElementById('budgetRange');
const tooltip = document.getElementById('sliderTooltip');
const finalValue = document.getElementById('finalValue');

function updateSlider() {
    const val = parseInt(range.value);
    const min = parseInt(range.min);
    const max = parseInt(range.max);

    const percent = (val - min) / (max - min);
    
    // Dynamic progress color fill
    range.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percent * 100}%, #1e293b ${percent * 100}%, #1e293b 100%)`;

    // Tooltip position
    const thumbWidth = 24;
    const offset = percent * (range.offsetWidth - thumbWidth) + (thumbWidth / 2);
    tooltip.style.left = `${offset}px`;

    const formatted = `$${val.toLocaleString()}`;
    tooltip.textContent = formatted;
    finalValue.textContent = formatted;
}

range.addEventListener('input', updateSlider);
window.addEventListener('resize', updateSlider);

updateSlider();"""
    },

    "21-animated-hamburger-menu": {
        "title": "21 - Animated Hamburger Navigation Menu",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>21 - Animated Hamburger Menu</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Top Navbar -->
    <nav class="navbar">
        <div class="nav-brand">⚡ MorphMenu</div>
        
        <!-- Hamburger Icon Button -->
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle navigation drawer">
            <span class="bar line1"></span>
            <span class="bar line2"></span>
            <span class="bar line3"></span>
        </button>
    </nav>

    <!-- Side Navigation Drawer -->
    <div class="nav-drawer" id="navDrawer">
        <div class="drawer-header">Menu Navigation</div>
        <ul class="drawer-links">
            <li><a href="#">🏠 Home Dashboard</a></li>
            <li><a href="#">🚀 Products & Services</a></li>
            <li><a href="#">💎 Enterprise Pricing</a></li>
            <li><a href="#">📖 Documentation</a></li>
            <li><a href="#">📞 Contact Support</a></li>
        </ul>
    </div>

    <!-- Backdrop Overlay -->
    <div class="drawer-backdrop" id="drawerBackdrop"></div>

    <div class="page-content">
        <div class="badge">Question 21 • Level 2: Components</div>
        <h1>Morphing Hamburger Navigation</h1>
        <p>Click the hamburger icon at the top-right corner to see the 3-line transformation into an 'X' close icon with a smooth slide-in sidebar drawer.</p>
    </div>

    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
}

.navbar {
    background: #131b2e;
    border-bottom: 1px solid #1e293b;
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 100;
}

.nav-brand {
    font-size: 1.3rem;
    font-weight: 800;
}

/* Morphing Hamburger */
.hamburger-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 22px;
    padding: 0;
}

.bar {
    width: 100%;
    height: 3px;
    background: #f8fafc;
    border-radius: 4px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger-btn.open .line1 {
    transform: translateY(9.5px) rotate(45deg);
}

.hamburger-btn.open .line2 {
    opacity: 0;
    transform: translateX(-10px);
}

.hamburger-btn.open .line3 {
    transform: translateY(-9.5px) rotate(-45deg);
}

/* Drawer */
.nav-drawer {
    position: fixed;
    top: 0;
    right: -320px;
    width: 320px;
    height: 100vh;
    background: #131b2e;
    border-left: 1px solid #1e293b;
    z-index: 99;
    padding: 6rem 2rem 2rem;
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-drawer.open {
    right: 0;
}

.drawer-header {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 700;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
}

.drawer-links {
    list-style: none;
}

.drawer-links li {
    margin-bottom: 1rem;
}

.drawer-links a {
    color: #cbd5e1;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    display: block;
    padding: 0.5rem 0;
    transition: color 0.2s;
}

.drawer-links a:hover {
    color: #38bdf8;
}

.drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 98;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.drawer-backdrop.open {
    opacity: 1;
    pointer-events: auto;
}

.page-content {
    max-width: 600px;
    margin: 4rem auto;
    text-align: center;
    padding: 0 1rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.page-content h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
}

.page-content p {
    color: #94a3b8;
    line-height: 1.6;
}""",
        "script": """const hamburgerBtn = document.getElementById('hamburgerBtn');
const navDrawer = document.getElementById('navDrawer');
const backdrop = document.getElementById('drawerBackdrop');

function toggleMenu() {
    const isOpen = hamburgerBtn.classList.toggle('open');
    navDrawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
}

hamburgerBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);"""
    },

    "22-tooltip-popover-system": {
        "title": "22 - Tooltip & Popover System",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>22 - Tooltip & Popover System</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 22 • Level 2: Components</span>
            <h1>Tooltip & Popover Engine</h1>
            <p>CSS data-attributes and pseudo-elements providing 4 cardinal positioning directions.</p>
        </header>

        <div class="card">
            <h2>Hover Over Any Directional Button</h2>
            
            <div class="tooltips-grid">
                <button class="btn has-tooltip" data-tooltip="Tooltip displayed on Top" data-position="top">⬆️ Top Tooltip</button>
                <button class="btn has-tooltip" data-tooltip="Tooltip displayed on Bottom" data-position="bottom">⬇️ Bottom Tooltip</button>
                <button class="btn has-tooltip" data-tooltip="Tooltip displayed on Left" data-position="left">⬅️ Left Tooltip</button>
                <button class="btn has-tooltip" data-tooltip="Tooltip displayed on Right" data-position="right">➡️ Right Tooltip</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 650px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.card h2 {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
}

.tooltips-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.btn {
    background: #1e293b;
    border: 1px solid #334155;
    color: #f8fafc;
    padding: 0.8rem 1.4rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
}

.btn:hover {
    border-color: #38bdf8;
    color: #38bdf8;
}

/* Tooltip Data Engine */
.has-tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    background: #1e1b4b;
    color: #c7d2fe;
    border: 1px solid #4338ca;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
}

/* Top */
.has-tooltip[data-position="top"]::before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
}
.has-tooltip[data-position="top"]:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-12px);
}

/* Bottom */
.has-tooltip[data-position="bottom"]::before {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(6px);
}
.has-tooltip[data-position="bottom"]:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(12px);
}

/* Left */
.has-tooltip[data-position="left"]::before {
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-6px);
}
.has-tooltip[data-position="left"]:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-12px);
}

/* Right */
.has-tooltip[data-position="right"]::before {
    left: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(6px);
}
.has-tooltip[data-position="right"]:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(12px);
}""",
        "script": """console.log('Tooltip system initialized via CSS data-attributes!');"""
    },

    "23-drag-drop-file-uploader": {
        "title": "23 - File Drag & Drop Upload Zone",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>23 - Drag & Drop File Uploader</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 23 • Level 2: Components</span>
            <h1>File Drag & Drop Upload Zone</h1>
            <p>Drag event highlighting, file size checking, preview list, and simulated upload progress.</p>
        </header>

        <div class="uploader-card">
            <div class="drop-zone" id="dropZone">
                <input type="file" id="fileInput" multiple class="file-input">
                <span class="upload-icon">📁</span>
                <h3>Drag & drop files here</h3>
                <p>or <button type="button" class="browse-btn" id="browseBtn">browse local files</button></p>
                <span class="file-limits">Supports JPG, PNG, PDF, ZIP (Max 10MB each)</span>
            </div>

            <div class="file-list" id="fileList"></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 600px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.uploader-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.drop-zone {
    position: relative;
    border: 2px dashed #334155;
    border-radius: 14px;
    padding: 3rem 1.5rem;
    text-align: center;
    transition: all 0.2s;
    background: #0b0f19;
}

.drop-zone.dragover {
    border-color: #38bdf8;
    background: rgba(56, 189, 248, 0.05);
}

.file-input { display: none; }

.upload-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 0.75rem;
}

.drop-zone h3 {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
}

.drop-zone p {
    color: #94a3b8;
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
}

.browse-btn {
    background: transparent;
    border: none;
    color: #38bdf8;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
}

.file-limits {
    font-size: 0.75rem;
    color: #64748b;
}

/* File List */
.file-list {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.file-item {
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 0.8rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.file-name {
    font-size: 0.9rem;
    font-weight: 600;
}

.file-size {
    font-size: 0.75rem;
    color: #64748b;
}

.btn-remove {
    background: transparent;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 1.1rem;
}""",
        "script": """const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileList = document.getElementById('fileList');

browseBtn.addEventListener('click', () => fileInput.click());

['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });
});

dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-item';
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

        item.innerHTML = `
            <div class="file-info">
                <span>📄</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${sizeMb} MB</div>
                </div>
            </div>
            <button class="btn-remove">&times;</button>
        `;

        item.querySelector('.btn-remove').addEventListener('click', () => item.remove());
        fileList.appendChild(item);
    });
}"""
    },

    "24-skeleton-loading-card": {
        "title": "24 - Skeleton Loading Shimmer Card",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>24 - Skeleton Loading Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 24 • Level 2: Components</span>
            <h1>Skeleton Shimmer Loading Card</h1>
            <p>Fluid gradient wave animation replacing content during async network requests.</p>
        </header>

        <div class="controls-bar">
            <button class="btn btn-primary" id="toggleStateBtn">Toggle Loading State</button>
        </div>

        <div class="card-box">
            <!-- 1. Skeleton Placeholder -->
            <div class="skeleton-card" id="skeletonCard">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton-content">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton-footer">
                        <div class="skeleton skeleton-avatar"></div>
                        <div class="skeleton skeleton-author"></div>
                    </div>
                </div>
            </div>

            <!-- 2. Real Content Card -->
            <div class="real-card hidden" id="realCard">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" alt="Abstract 3D Art" class="real-img">
                <div class="real-content">
                    <h3>Generative 3D Mesh Architecture</h3>
                    <p>Exploring high-performance algorithmic geometry pipelines and WebGL canvas rendering techniques.</p>
                    <div class="real-footer">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" class="real-avatar" alt="Avatar">
                        <span class="real-author">Sarah Connor • 4 min read</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0b0f19;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 440px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.controls-bar {
    text-align: center;
    margin-bottom: 1.5rem;
}

.btn-primary {
    background: #4f46e5;
    color: white;
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
}

/* Skeleton Shimmer */
.skeleton {
    background: linear-gradient(
        90deg,
        #1e293b 0%,
        #334155 50%,
        #1e293b 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.skeleton-card, .real-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.skeleton-img { height: 200px; border-radius: 0; }
.skeleton-content, .real-content { padding: 1.5rem; }
.skeleton-title { height: 22px; width: 80%; margin-bottom: 1rem; }
.skeleton-text { height: 14px; width: 100%; margin-bottom: 0.5rem; }
.skeleton-text.short { width: 60%; margin-bottom: 1.5rem; }

.skeleton-footer {
    display: flex;
    align-items: center;
    gap: 12px;
}
.skeleton-avatar { width: 36px; height: 36px; border-radius: 50%; }
.skeleton-author { width: 120px; height: 14px; }

/* Real Card */
.real-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.real-content h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
.real-content p { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.2rem; }
.real-footer { display: flex; align-items: center; gap: 10px; }
.real-avatar { width: 36px; height: 36px; border-radius: 50%; }
.real-author { font-size: 0.85rem; color: #cbd5e1; font-weight: 600; }

.hidden { display: none; }""",
        "script": """const toggleBtn = document.getElementById('toggleStateBtn');
const skeletonCard = document.getElementById('skeletonCard');
const realCard = document.getElementById('realCard');

let isLoading = true;

toggleBtn.addEventListener('click', () => {
    isLoading = !isLoading;
    if (isLoading) {
        skeletonCard.classList.remove('hidden');
        realCard.classList.add('hidden');
    } else {
        skeletonCard.classList.add('hidden');
        realCard.classList.remove('hidden');
    }
});"""
    },

    "25-pricing-card-toggle": {
        "title": "25 - Interactive Pricing Card with Billing Toggle",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>25 - Interactive Pricing Cards</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 25 • Level 2: Components</span>
            <h1>Interactive Pricing Plans</h1>
            <p>Monthly / Yearly billing switch with 20% annual discount badge calculation.</p>
            
            <!-- Billing Switch -->
            <div class="billing-switch">
                <span class="bill-label active" id="monthlyLabel">Monthly</span>
                <label class="switch">
                    <input type="checkbox" id="billingToggle">
                    <span class="slider round"></span>
                </label>
                <span class="bill-label" id="annualLabel">Yearly</span>
                <span class="save-badge">SAVE 20%</span>
            </div>
        </header>

        <div class="pricing-grid">
            <!-- 1. Starter -->
            <div class="pricing-card">
                <h3>Starter</h3>
                <p class="plan-desc">For indie hackers and solo founders.</p>
                <div class="price-box">
                    <span class="currency">$</span>
                    <span class="price-val" data-monthly="19" data-annual="15">19</span>
                    <span class="period">/ mo</span>
                </div>
                <ul class="features-list">
                    <li>✓ 5 Cloud Workspaces</li>
                    <li>✓ 10GB SSD Storage</li>
                    <li>✓ Community Forum Support</li>
                </ul>
                <button class="btn btn-secondary">Get Started</button>
            </div>

            <!-- 2. Pro (Featured) -->
            <div class="pricing-card featured">
                <div class="popular-tag">MOST POPULAR</div>
                <h3>Professional</h3>
                <p class="plan-desc">For growing startups and scaling teams.</p>
                <div class="price-box">
                    <span class="currency">$</span>
                    <span class="price-val" data-monthly="49" data-annual="39">49</span>
                    <span class="period">/ mo</span>
                </div>
                <ul class="features-list">
                    <li>✓ Unlimited Workspaces</li>
                    <li>✓ 100GB High-Speed SSD</li>
                    <li>✓ 24/7 Priority Support</li>
                    <li>✓ Automated Daily Backups</li>
                </ul>
                <button class="btn btn-primary">Start 14-Day Free Trial</button>
            </div>

            <!-- 3. Enterprise -->
            <div class="pricing-card">
                <h3>Enterprise</h3>
                <p class="plan-desc">For large organizations with strict SLA.</p>
                <div class="price-box">
                    <span class="currency">$</span>
                    <span class="price-val" data-monthly="149" data-annual="119">149</span>
                    <span class="period">/ mo</span>
                </div>
                <ul class="features-list">
                    <li>✓ Dedicated Cloud Instance</li>
                    <li>✓ Custom SLA Guarantee</li>
                    <li>✓ SSO & SAML Security</li>
                </ul>
                <button class="btn btn-secondary">Contact Sales</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3.5rem 1rem;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 1050px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 3rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
}

.header p {
    color: #94a3b8;
    margin-bottom: 2rem;
}

/* Billing Toggle */
.billing-switch {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #111827;
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid #1f2937;
}

.bill-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: #6b7280;
    transition: color 0.2s;
}

.bill-label.active { color: #f8fafc; }

.switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
}

.switch input { opacity: 0; width: 0; height: 0; }

.slider {
    position: absolute;
    inset: 0;
    background: #374151;
    border-radius: 34px;
    cursor: pointer;
    transition: 0.3s;
}

.slider::before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
}

input:checked + .slider { background: #6366f1; }
input:checked + .slider::before { transform: translateX(20px); }

.save-badge {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 6px;
}

/* Grid */
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    align-items: center;
}

.pricing-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    padding: 2.2rem;
    position: relative;
    transition: transform 0.2s;
}

.pricing-card.featured {
    background: #131b2e;
    border-color: #6366f1;
    box-shadow: 0 0 35px rgba(99, 102, 241, 0.2);
    transform: scale(1.04);
}

.popular-tag {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #6366f1;
    color: white;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 999px;
}

.pricing-card h3 { font-size: 1.4rem; margin-bottom: 0.3rem; }
.plan-desc { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; }

.price-box {
    display: flex;
    align-items: baseline;
    margin-bottom: 1.5rem;
}

.currency { font-size: 1.4rem; font-weight: 700; color: #94a3b8; }
.price-val { font-size: 2.8rem; font-weight: 800; color: #f8fafc; }
.period { font-size: 0.9rem; color: #64748b; margin-left: 6px; }

.features-list {
    list-style: none;
    margin-bottom: 2rem;
    border-top: 1px solid #1f2937;
    padding-top: 1.2rem;
}

.features-list li {
    font-size: 0.9rem;
    color: #cbd5e1;
    margin-bottom: 0.75rem;
}

.btn {
    width: 100%;
    padding: 0.85rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.95rem;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #6366f1; color: white; }
.btn-primary:hover { background: #4f46e5; }
.btn-secondary { background: #1f2937; color: #f8fafc; border: 1px solid #374151; }
.btn-secondary:hover { background: #374151; }""",
        "script": """const toggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const prices = document.querySelectorAll('.price-val');

toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);

    prices.forEach(price => {
        price.textContent = isAnnual ? price.dataset.annual : price.dataset.monthly;
    });
});"""
    }
})

for folder, data in tier2_projects.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    with open(os.path.join(folder_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(data["html"])
    with open(os.path.join(folder_path, "style.css"), "w", encoding="utf-8") as f:
        f.write(data["css"])
    with open(os.path.join(folder_path, "script.js"), "w", encoding="utf-8") as f:
        f.write(data["script"])
    print(f"Created {folder} (3 files)")

print("Tier 2 generation complete!")
