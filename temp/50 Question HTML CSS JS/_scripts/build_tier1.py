import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

tier1_projects = {
    "01-typography-font-showcase": {
        "title": "01 - Typography & Font Showcase",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>01 - Typography & Font Showcase</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Fira+Code:wght@400;600&family=Inter:wght@300;400;600;800&family=Merriweather:ital,wght@0,300;0,700;1,400&family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@0,600;0,900;1,400&family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 01 • Level 1: Basics</span>
            <h1>Typography & Font Studio</h1>
            <p>Master CSS font families, weights, sizing, line-height, letter spacing, and text transformations in real-time.</p>
        </header>

        <div class="studio-grid">
            <!-- Control Panel -->
            <div class="panel controls-panel">
                <h2>Controls & Settings</h2>

                <div class="control-group">
                    <label for="fontSelect">Font Family</label>
                    <select id="fontSelect">
                        <option value="'Inter', sans-serif" selected>Inter (Modern Sans-Serif)</option>
                        <option value="'Playfair Display', serif">Playfair Display (Editorial Serif)</option>
                        <option value="'Outfit', sans-serif">Outfit (Geometric Display)</option>
                        <option value="'Fira Code', monospace">Fira Code (Monospace Code)</option>
                        <option value="'Merriweather', serif">Merriweather (Literary Serif)</option>
                        <option value="'Caveat', cursive">Caveat (Handwritten Script)</option>
                        <option value="'Poppins', sans-serif">Poppins (Clean Rounded)</option>
                    </select>
                </div>

                <div class="control-group">
                    <label for="fontSize">Font Size: <span id="fontSizeVal">36px</span></label>
                    <input type="range" id="fontSize" min="16" max="72" value="36">
                </div>

                <div class="control-group">
                    <label for="fontWeight">Font Weight</label>
                    <div class="btn-group" id="weightGroup">
                        <button class="btn-option" data-weight="300">Light 300</button>
                        <button class="btn-option active" data-weight="400">Regular 400</button>
                        <button class="btn-option" data-weight="600">Semi 600</button>
                        <button class="btn-option" data-weight="800">Bold 800</button>
                    </div>
                </div>

                <div class="control-group">
                    <label for="lineHeight">Line Height: <span id="lineHeightVal">1.4</span></label>
                    <input type="range" id="lineHeight" min="1.0" max="2.5" step="0.1" value="1.4">
                </div>

                <div class="control-group">
                    <label for="letterSpacing">Letter Spacing: <span id="letterSpacingVal">0px</span></label>
                    <input type="range" id="letterSpacing" min="-3" max="15" step="0.5" value="0">
                </div>

                <div class="control-group">
                    <label>Text Transform</label>
                    <div class="btn-group" id="transformGroup">
                        <button class="btn-option active" data-transform="none">None</button>
                        <button class="btn-option" data-transform="uppercase">UPPERCASE</button>
                        <button class="btn-option" data-transform="lowercase">lowercase</button>
                        <button class="btn-option" data-transform="capitalize">Capitalize</button>
                    </div>
                </div>

                <div class="control-group">
                    <label>Text Alignment</label>
                    <div class="btn-group" id="alignGroup">
                        <button class="btn-option active" data-align="left">Left</button>
                        <button class="btn-option" data-align="center">Center</button>
                        <button class="btn-option" data-align="right">Right</button>
                        <button class="btn-option" data-align="justify">Justify</button>
                    </div>
                </div>

                <button id="copyCssBtn" class="btn-primary">📋 Copy Generated CSS</button>
                <span id="copyToast" class="toast hidden">CSS Copied to Clipboard!</span>
            </div>

            <!-- Preview Panel -->
            <div class="panel preview-panel">
                <div class="preview-header">
                    <h2>Live Typography Canvas</h2>
                    <button id="resetTextBtn" class="btn-secondary">Reset Text</button>
                </div>

                <div class="editable-area" contenteditable="true" id="previewText">
                    <h2>The Quick Brown Fox Jumps Over The Lazy Dog</h2>
                    <p>Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.</p>
                    <p>Great design starts with great hierarchy, contrast, rhythm, and clarity.</p>
                </div>

                <div class="css-output-box">
                    <h3>Generated CSS Rule</h3>
                    <pre><code id="cssCode">font-family: 'Inter', sans-serif;
font-size: 36px;
font-weight: 400;
line-height: 1.4;
letter-spacing: 0px;
text-transform: none;
text-align: left;</code></pre>
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

:root {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --card-border: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent: #38bdf8;
    --accent-hover: #0ea5e9;
    --primary-btn: #6366f1;
    --primary-btn-hover: #4f46e5;
    --radius: 12px;
}

body {
    background-color: var(--bg-color);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding: 2rem 1rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: var(--accent);
    padding: 4px 14px;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(56, 189, 248, 0.3);
}

.header h1 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #f8fafc, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header p {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
}

.studio-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 1.5rem;
}

@media (max-width: 860px) {
    .studio-grid {
        grid-template-columns: 1fr;
    }
}

.panel {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.panel h2 {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 0.75rem;
}

.control-group {
    margin-bottom: 1.25rem;
}

.control-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.4rem;
}

select, input[type="range"] {
    width: 100%;
}

select {
    background: #0f172a;
    border: 1px solid var(--card-border);
    color: var(--text-primary);
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    cursor: pointer;
}

select:focus {
    border-color: var(--accent);
}

input[type="range"] {
    accent-color: var(--accent);
    cursor: pointer;
}

.btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.btn-option {
    flex: 1;
    min-width: 70px;
    background: #0f172a;
    border: 1px solid var(--card-border);
    color: var(--text-secondary);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-option:hover {
    border-color: var(--accent);
    color: var(--text-primary);
}

.btn-option.active {
    background: var(--accent);
    color: #0f172a;
    font-weight: 700;
    border-color: var(--accent);
}

.btn-primary {
    width: 100%;
    background: var(--primary-btn);
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
}

.btn-primary:hover {
    background: var(--primary-btn-hover);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text-secondary);
    padding: 5px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
}

.btn-secondary:hover {
    border-color: var(--accent);
    color: var(--text-primary);
}

.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 0.75rem;
    margin-bottom: 1.25rem;
}

.preview-header h2 {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
}

.editable-area {
    background: #0f172a;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 1.5rem;
    min-height: 280px;
    outline: none;
    transition: border-color 0.2s;
}

.editable-area:focus {
    border-color: var(--accent);
}

.editable-area h2 {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0.75rem;
}

.editable-area p {
    margin-bottom: 0.75rem;
}

.css-output-box {
    margin-top: 1.5rem;
    background: #090d16;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 1rem;
}

.css-output-box h3 {
    font-size: 0.85rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.css-output-box pre {
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
}

.toast {
    display: block;
    text-align: center;
    color: #4ade80;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    font-weight: 600;
}

.toast.hidden {
    display: none;
}""",
        "script": """// DOM Elements
const fontSelect = document.getElementById('fontSelect');
const fontSize = document.getElementById('fontSize');
const fontSizeVal = document.getElementById('fontSizeVal');
const lineHeight = document.getElementById('lineHeight');
const lineHeightVal = document.getElementById('lineHeightVal');
const letterSpacing = document.getElementById('letterSpacing');
const letterSpacingVal = document.getElementById('letterSpacingVal');
const weightGroup = document.getElementById('weightGroup');
const transformGroup = document.getElementById('transformGroup');
const alignGroup = document.getElementById('alignGroup');
const previewText = document.getElementById('previewText');
const cssCode = document.getElementById('cssCode');
const copyCssBtn = document.getElementById('copyCssBtn');
const copyToast = document.getElementById('copyToast');
const resetTextBtn = document.getElementById('resetTextBtn');

// State
const state = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '36px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '0px',
    textTransform: 'none',
    textAlign: 'left'
};

const defaultContent = `<h2>The Quick Brown Fox Jumps Over The Lazy Dog</h2>
<p>Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.</p>
<p>Great design starts with great hierarchy, contrast, rhythm, and clarity.</p>`;

// Update Styles & CSS Output
function applyStyles() {
    previewText.style.fontFamily = state.fontFamily;
    previewText.style.fontSize = state.fontSize;
    previewText.style.fontWeight = state.fontWeight;
    previewText.style.lineHeight = state.lineHeight;
    previewText.style.letterSpacing = state.letterSpacing;
    previewText.style.textTransform = state.textTransform;
    previewText.style.textAlign = state.textAlign;

    cssCode.textContent = `font-family: ${state.fontFamily};
font-size: ${state.fontSize};
font-weight: ${state.fontWeight};
line-height: ${state.lineHeight};
letter-spacing: ${state.letterSpacing};
text-transform: ${state.textTransform};
text-align: ${state.textAlign};`;
}

// Event Listeners
fontSelect.addEventListener('change', (e) => {
    state.fontFamily = e.target.value;
    applyStyles();
});

fontSize.addEventListener('input', (e) => {
    state.fontSize = `${e.target.value}px`;
    fontSizeVal.textContent = state.fontSize;
    applyStyles();
});

lineHeight.addEventListener('input', (e) => {
    state.lineHeight = e.target.value;
    lineHeightVal.textContent = state.lineHeight;
    applyStyles();
});

letterSpacing.addEventListener('input', (e) => {
    state.letterSpacing = `${e.target.value}px`;
    letterSpacingVal.textContent = state.letterSpacing;
    applyStyles();
});

function handleButtonGroup(groupEl, stateProp, dataAttr) {
    groupEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        groupEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state[stateProp] = btn.dataset[dataAttr];
        applyStyles();
    });
}

handleButtonGroup(weightGroup, 'fontWeight', 'weight');
handleButtonGroup(transformGroup, 'textTransform', 'transform');
handleButtonGroup(alignGroup, 'textAlign', 'align');

resetTextBtn.addEventListener('click', () => {
    previewText.innerHTML = defaultContent;
});

copyCssBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCode.textContent).then(() => {
        copyToast.classList.remove('hidden');
        setTimeout(() => {
            copyToast.classList.add('hidden');
        }, 2000);
    });
});

// Initial Render
applyStyles();"""
    },

    "02-gradient-text-glow-card": {
        "title": "02 - Gradient Text & Glowing Effect Card",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02 - Gradient Text & Glowing Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="badge">Question 02 • Level 1: Basics</div>
        <h1 class="page-title">Gradient Text & Neon Glow Studio</h1>
        <p class="subtitle">Experience CSS background-clip text masking and multi-layer neon box-shadow glows.</p>

        <!-- Studio Layout -->
        <div class="studio-layout">
            <!-- Glow Card Showcase -->
            <div class="card-wrapper">
                <div class="glow-card" id="glowCard">
                    <div class="card-inner">
                        <span class="card-tag">⚡ Neon Edition</span>
                        <h2 class="gradient-text" id="gradientHeading">Cybernetic Future</h2>
                        <p class="card-desc">Modern web interfaces utilize dynamic gradients and glowing accents to evoke futuristic immersion and user engagement.</p>
                        <div class="card-stats">
                            <div class="stat-item">
                                <span class="stat-val gradient-text" id="stat1">99.9%</span>
                                <span class="stat-lbl">Uptime</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-val gradient-text" id="stat2">10x</span>
                                <span class="stat-lbl">Speed</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-val gradient-text" id="stat3">4.9★</span>
                                <span class="stat-lbl">Rating</span>
                            </div>
                        </div>
                        <button class="glow-btn" id="exploreBtn">Explore Quantum</button>
                    </div>
                </div>
            </div>

            <!-- Customizer Controls -->
            <div class="controls-card">
                <h3>Customizer Settings</h3>

                <div class="control-row">
                    <label>Color Stop 1</label>
                    <input type="color" id="color1" value="#ff007f">
                </div>

                <div class="control-row">
                    <label>Color Stop 2</label>
                    <input type="color" id="color2" value="#7928ca">
                </div>

                <div class="control-row">
                    <label>Color Stop 3</label>
                    <input type="color" id="color3" value="#00f2fe">
                </div>

                <div class="control-row">
                    <label>Gradient Angle: <span id="angleVal">135°</span></label>
                    <input type="range" id="gradientAngle" min="0" max="360" value="135">
                </div>

                <div class="control-row">
                    <label>Glow Blur: <span id="glowVal">30px</span></label>
                    <input type="range" id="glowBlur" min="0" max="80" value="30">
                </div>

                <div class="preset-group">
                    <label>Preset Palettes</label>
                    <div class="presets">
                        <button class="preset-btn" data-c1="#ff0844" data-c2="#ffb199" data-c3="#fbc2eb">Sunset</button>
                        <button class="preset-btn" data-c1="#00f2fe" data-c2="#4facfe" data-c3="#000046">Ocean</button>
                        <button class="preset-btn" data-c1="#38ef7d" data-c2="#11998e" data-c3="#0575e6">Emerald</button>
                        <button class="preset-btn" data-c1="#f12711" data-c2="#f5af19" data-c3="#ff007f">Solar Flare</button>
                    </div>
                </div>

                <button class="copy-css-btn" id="copySnippetBtn">📋 Copy CSS Snippet</button>
                <div class="copy-alert hidden" id="copyAlert">Copied to clipboard!</div>
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

:root {
    --bg-dark: #08090d;
    --c1: #ff007f;
    --c2: #7928ca;
    --c3: #00f2fe;
    --angle: 135deg;
    --glow-blur: 30px;
}

body {
    background: var(--bg-dark);
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    padding: 2.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 1050px;
    width: 100%;
    text-align: center;
}

.badge {
    display: inline-block;
    background: rgba(255, 0, 127, 0.15);
    color: #ff3399;
    padding: 5px 15px;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(255, 0, 127, 0.3);
}

.page-title {
    font-size: 2.3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: #ffffff;
}

.subtitle {
    color: #94a3b8;
    margin-bottom: 2.5rem;
    font-size: 1.05rem;
}

.studio-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.5rem;
    align-items: start;
    text-align: left;
}

@media (max-width: 860px) {
    .studio-layout {
        grid-template-columns: 1fr;
    }
}

/* Glow Card */
.card-wrapper {
    display: flex;
    justify-content: center;
}

.glow-card {
    position: relative;
    width: 100%;
    max-width: 440px;
    background: #11141e;
    border-radius: 20px;
    padding: 2.2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 var(--glow-blur) rgba(255, 0, 127, 0.35),
                0 0 calc(var(--glow-blur) * 1.5) rgba(0, 242, 254, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glow-card:hover {
    transform: translateY(-5px);
}

.card-tag {
    display: inline-block;
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    font-size: 0.8rem;
    padding: 4px 12px;
    border-radius: 6px;
    margin-bottom: 1.2rem;
    font-family: 'Space Grotesk', sans-serif;
}

.gradient-text {
    background: linear-gradient(var(--angle), var(--c1), var(--c2), var(--c3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.glow-card h2 {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.card-desc {
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

.card-stats {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.03);
    padding: 1rem 1.2rem;
    border-radius: 12px;
    margin-bottom: 1.8rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
    text-align: center;
}

.stat-val {
    display: block;
    font-size: 1.4rem;
    font-weight: 800;
    font-family: 'Space Grotesk', sans-serif;
}

.stat-lbl {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.glow-btn {
    width: 100%;
    padding: 0.9rem;
    border: none;
    border-radius: 10px;
    background: linear-gradient(var(--angle), var(--c1), var(--c2), var(--c3));
    color: #ffffff;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 0, 127, 0.3);
    transition: filter 0.2s, transform 0.2s;
}

.glow-btn:hover {
    filter: brightness(1.15);
    transform: scale(1.02);
}

/* Controls Card */
.controls-card {
    background: #11141e;
    border: 1px solid #1e2433;
    border-radius: 20px;
    padding: 2rem;
}

.controls-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: #f8fafc;
    border-bottom: 1px solid #1e2433;
    padding-bottom: 0.75rem;
}

.control-row {
    margin-bottom: 1.2rem;
}

.control-row label {
    display: block;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 0.4rem;
    font-weight: 600;
}

.control-row input[type="color"] {
    width: 100%;
    height: 42px;
    border: 1px solid #2d3748;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    padding: 2px;
}

.control-row input[type="range"] {
    width: 100%;
    accent-color: #00f2fe;
    cursor: pointer;
}

.preset-group {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.preset-group label {
    display: block;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.presets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.preset-btn {
    background: #1e2433;
    border: 1px solid #2d3748;
    color: #cbd5e1;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.preset-btn:hover {
    background: #2d3748;
    color: #ffffff;
    border-color: #00f2fe;
}

.copy-css-btn {
    width: 100%;
    background: #1e293b;
    border: 1px solid #334155;
    color: #38bdf8;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.copy-css-btn:hover {
    background: #334155;
    color: #ffffff;
}

.copy-alert {
    text-align: center;
    color: #4ade80;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    font-weight: 600;
}

.copy-alert.hidden {
    display: none;
}""",
        "script": """const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const color3Input = document.getElementById('color3');
const angleInput = document.getElementById('gradientAngle');
const angleVal = document.getElementById('angleVal');
const glowInput = document.getElementById('glowBlur');
const glowVal = document.getElementById('glowVal');
const glowCard = document.getElementById('glowCard');
const presetBtns = document.querySelectorAll('.preset-btn');
const copySnippetBtn = document.getElementById('copySnippetBtn');
const copyAlert = document.getElementById('copyAlert');

function updateStyles() {
    const c1 = color1Input.value;
    const c2 = color2Input.value;
    const c3 = color3Input.value;
    const angle = `${angleInput.value}deg`;
    const blur = `${glowInput.value}px`;

    document.documentElement.style.setProperty('--c1', c1);
    document.documentElement.style.setProperty('--c2', c2);
    document.documentElement.style.setProperty('--c3', c3);
    document.documentElement.style.setProperty('--angle', angle);
    document.documentElement.style.setProperty('--glow-blur', blur);

    angleVal.textContent = angle;
    glowVal.textContent = blur;

    glowCard.style.boxShadow = `0 0 ${blur} ${c1}66, 0 0 calc(${blur} * 1.5) ${c3}44`;
}

[color1Input, color2Input, color3Input, angleInput, glowInput].forEach(input => {
    input.addEventListener('input', updateStyles);
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        color1Input.value = btn.dataset.c1;
        color2Input.value = btn.dataset.c2;
        color3Input.value = btn.dataset.c3;
        updateStyles();
    });
});

copySnippetBtn.addEventListener('click', () => {
    const css = `/* Gradient Text */
background: linear-gradient(${angleInput.value}deg, ${color1Input.value}, ${color2Input.value}, ${color3Input.value});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Neon Box Glow */
box-shadow: 0 0 ${glowInput.value}px ${color1Input.value}66, 0 0 calc(${glowInput.value}px * 1.5) ${color3Input.value}44;`;

    navigator.clipboard.writeText(css).then(() => {
        copyAlert.classList.remove('hidden');
        setTimeout(() => copyAlert.classList.add('hidden'), 2000);
    });
});

updateStyles();"""
    },

    "03-interactive-buttons-suite": {
        "title": "03 - Interactive Buttons Suite",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03 - Interactive Buttons Suite</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 03 • Level 1: Basics</span>
            <h1>Interactive Button Showcase</h1>
            <p>Explore 8 distinct button styles with modern hover effects, coordinates-based ripple animations, 3D tactile clicks, and loading states.</p>
        </header>

        <div class="button-grid">
            <!-- 1. Ripple Wave -->
            <div class="button-card">
                <h3>1. Coordinates Ripple</h3>
                <p>Spawns a dynamic circular wave at the exact click point.</p>
                <div class="btn-box">
                    <button class="btn btn-ripple">Click Me <span class="badge-pill">Ripple</span></button>
                </div>
            </div>

            <!-- 2. Glowing Cyber Neon -->
            <div class="button-card">
                <h3>2. Cyber Neon Glow</h3>
                <p>Pulsing multi-color border and ambient glow.</p>
                <div class="btn-box">
                    <button class="btn btn-neon">Cyber Action</button>
                </div>
            </div>

            <!-- 3. 3D Tactile Push -->
            <div class="button-card">
                <h3>3. 3D Tactile Push</h3>
                <p>Realistic mechanical depth that compresses on active press.</p>
                <div class="btn-box">
                    <button class="btn btn-3d">Push Button</button>
                </div>
            </div>

            <!-- 4. Gradient Border Shine -->
            <div class="button-card">
                <h3>4. Gradient Shimmer</h3>
                <p>Sliding gloss shine effect on hover.</p>
                <div class="btn-box">
                    <button class="btn btn-shimmer"><span>Shimmer Glow</span></button>
                </div>
            </div>

            <!-- 5. Glassmorphism -->
            <div class="button-card">
                <h3>5. Frosted Glass</h3>
                <p>Semi-transparent backdrop blur with subtle highlight.</p>
                <div class="btn-box">
                    <button class="btn btn-glass">Frosted Glass</button>
                </div>
            </div>

            <!-- 6. Magnetic Cursor Effect -->
            <div class="button-card">
                <h3>6. Magnetic Cursor</h3>
                <p>Button dynamically tilts towards your cursor position.</p>
                <div class="btn-box">
                    <button class="btn btn-magnetic" id="magneticBtn">Magnetic Field</button>
                </div>
            </div>

            <!-- 7. Glitch Hover Effect -->
            <div class="button-card">
                <h3>7. Glitch Matrix</h3>
                <p>Retro cyberpunk chromatic aberration on hover.</p>
                <div class="btn-box">
                    <button class="btn btn-glitch" data-text="GLITCH_MODE">GLITCH_MODE</button>
                </div>
            </div>

            <!-- 8. Async Spinner Loading State -->
            <div class="button-card">
                <h3>8. Async Loading State</h3>
                <p>Transitions to a spinner and checkmark on completion.</p>
                <div class="btn-box">
                    <button class="btn btn-loading" id="asyncBtn">
                        <span class="btn-text">Submit Order</span>
                        <div class="spinner"></div>
                        <span class="success-icon">✓</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="counter-footer">
            <span>Total Button Clicks Tracked: <strong id="totalClicks">0</strong></span>
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
    color: #f1f5f9;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1.5rem;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
}

.header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(99, 102, 241, 0.3);
}

.header h1 {
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
}

.header p {
    color: #94a3b8;
    max-width: 650px;
    margin: 0 auto;
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
}

.button-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.2s;
}

.button-card:hover {
    border-color: #3b82f6;
}

.button-card h3 {
    font-size: 1.05rem;
    color: #e2e8f0;
    margin-bottom: 0.35rem;
}

.button-card p {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 1.5rem;
}

.btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70px;
}

/* Base button */
.btn {
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
}

/* 1. Ripple */
.btn-ripple {
    position: relative;
    overflow: hidden;
    background: #4f46e5;
    color: white;
}
.btn-ripple span.ripple-circle {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-anim 0.6s linear;
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
}
@keyframes ripple-anim {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
.badge-pill {
    background: rgba(255, 255, 255, 0.2);
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 6px;
}

/* 2. Neon */
.btn-neon {
    background: transparent;
    color: #00f2fe;
    border: 2px solid #00f2fe;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
}
.btn-neon:hover {
    background: #00f2fe;
    color: #0b0f19;
    box-shadow: 0 0 25px rgba(0, 242, 254, 0.8);
}

/* 3. 3D Push */
.btn-3d {
    background: #10b981;
    color: white;
    box-shadow: 0 6px 0 #047857;
    transform: translateY(-2px);
}
.btn-3d:active {
    box-shadow: 0 1px 0 #047857;
    transform: translateY(3px);
}

/* 4. Shimmer */
.btn-shimmer {
    position: relative;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    color: white;
    overflow: hidden;
}
.btn-shimmer::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        60deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    transform: rotate(25deg) translateY(-100%);
    transition: transform 0.6s;
}
.btn-shimmer:hover::before {
    transform: rotate(25deg) translateY(100%);
}

/* 5. Glass */
.btn-glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
}
.btn-glass:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.4);
}

/* 6. Magnetic */
.btn-magnetic {
    background: #f59e0b;
    color: #0b0f19;
    transition: transform 0.1s ease-out;
}

/* 7. Glitch */
.btn-glitch {
    background: #e11d48;
    color: white;
    position: relative;
}
.btn-glitch:hover {
    animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}
@keyframes glitch-anim {
    0% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
}

/* 8. Loading State */
.btn-loading {
    background: #2563eb;
    color: white;
    position: relative;
    min-width: 140px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.btn-loading .spinner {
    display: none;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
}
.btn-loading .success-icon {
    display: none;
    font-size: 1.2rem;
}
.btn-loading.loading .btn-text { display: none; }
.btn-loading.loading .spinner { display: block; }
.btn-loading.success {
    background: #10b981;
}
.btn-loading.success .btn-text { display: none; }
.btn-loading.success .spinner { display: none; }
.btn-loading.success .success-icon { display: block; }

@keyframes spin {
    to { transform: rotate(360deg); }
}

.counter-footer {
    text-align: center;
    margin-top: 3rem;
    padding: 1.2rem;
    background: #131b2e;
    border-radius: 12px;
    border: 1px solid #1e293b;
    color: #94a3b8;
}
.counter-footer strong {
    color: #38bdf8;
    font-size: 1.2rem;
}""",
        "script": """let clicks = 0;
const totalClicksEl = document.getElementById('totalClicks');

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        clicks++;
        totalClicksEl.textContent = clicks;
    }
});

// 1. Ripple Click Coordinates
const rippleBtn = document.querySelector('.btn-ripple');
rippleBtn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;

    const existing = this.querySelector('.ripple-circle');
    if (existing) existing.remove();

    this.appendChild(circle);
});

// 6. Magnetic Button
const magneticBtn = document.getElementById('magneticBtn');
magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0px, 0px)';
});

// 8. Async Loading Button
const asyncBtn = document.getElementById('asyncBtn');
asyncBtn.addEventListener('click', () => {
    if (asyncBtn.classList.contains('loading') || asyncBtn.classList.contains('success')) return;

    asyncBtn.classList.add('loading');
    setTimeout(() => {
        asyncBtn.classList.remove('loading');
        asyncBtn.classList.add('success');

        setTimeout(() => {
            asyncBtn.classList.remove('success');
        }, 2000);
    }, 1500);
});"""
    },

    "04-simple-profile-card": {
        "title": "04 - Simple Profile Card",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>04 - Simple Profile Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="page-container">
        <header class="header">
            <span class="badge">Question 04 • Level 1: Basics</span>
            <h1>Developer Profile Card</h1>
            <p>CSS Box Model, rounded avatars, status badges, skill tags, and interactive follow state.</p>
        </header>

        <div class="card-container">
            <div class="profile-card" id="profileCard">
                <!-- Card Header Cover -->
                <div class="card-banner">
                    <button class="theme-btn" id="themeToggleBtn" title="Toggle Card Theme">🌙</button>
                </div>

                <!-- Avatar with Online Status -->
                <div class="avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" alt="Sarah Chen" class="avatar-img">
                    <span class="status-badge" title="Online for collaboration"></span>
                </div>

                <!-- User Info -->
                <div class="profile-info">
                    <h2 class="user-name">Sarah Chen</h2>
                    <p class="user-title">Senior Full-Stack Developer</p>
                    <p class="user-location">📍 San Francisco, CA</p>
                    <p class="user-bio">Passionate about architecting performant front-end systems, design tokens, and scalable cloud microservices.</p>
                </div>

                <!-- Skills Tags -->
                <div class="skills-list">
                    <span class="skill-tag">HTML5 / CSS3</span>
                    <span class="skill-tag">TypeScript</span>
                    <span class="skill-tag">React.js</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">UI/UX</span>
                </div>

                <!-- Numerical Stats -->
                <div class="stats-row">
                    <div class="stat-col">
                        <strong id="followersCount">1,420</strong>
                        <span>Followers</span>
                    </div>
                    <div class="stat-col">
                        <strong>348</strong>
                        <span>Following</span>
                    </div>
                    <div class="stat-col">
                        <strong>52</strong>
                        <span>Projects</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="actions-row">
                    <button class="btn btn-follow" id="followBtn">Follow +</button>
                    <button class="btn btn-message" id="messageBtn">Message</button>
                </div>

                <!-- Social Links -->
                <div class="social-links">
                    <a href="#" class="social-icon" title="GitHub">🐙</a>
                    <a href="#" class="social-icon" title="Twitter / X">🐦</a>
                    <a href="#" class="social-icon" title="LinkedIn">💼</a>
                    <a href="#" class="social-icon" title="Portfolio">🌐</a>
                </div>
            </div>
        </div>

        <div class="notification-toast hidden" id="toastMsg">Message sent to Sarah!</div>
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
    color: #e2e8f0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.page-container {
    max-width: 500px;
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
    border: 1px solid rgba(56, 189, 248, 0.3);
}

.header h1 {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 0.3rem;
}

.header p {
    font-size: 0.9rem;
    color: #94a3b8;
}

/* Card Styling */
.profile-card {
    background: #1e293b;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    border: 1px solid #334155;
    position: relative;
    transition: all 0.3s ease;
}

.profile-card.light-mode {
    background: #ffffff;
    color: #1e293b;
    border-color: #e2e8f0;
}

.profile-card.light-mode .user-name { color: #0f172a; }
.profile-card.light-mode .user-title { color: #4f46e5; }
.profile-card.light-mode .user-bio { color: #475569; }
.profile-card.light-mode .skill-tag { background: #f1f5f9; color: #334155; }
.profile-card.light-mode .stats-row { background: #f8fafc; border-color: #e2e8f0; }
.profile-card.light-mode .stat-col strong { color: #0f172a; }
.profile-card.light-mode .btn-message { background: #f1f5f9; color: #1e293b; border-color: #cbd5e1; }

.card-banner {
    height: 120px;
    background: linear-gradient(135deg, #6366f1, #38bdf8);
    position: relative;
}

.theme-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.25);
    border: none;
    font-size: 1.1rem;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: transform 0.2s;
}

.theme-btn:hover {
    transform: scale(1.1);
}

.avatar-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    margin: -50px auto 0 auto;
}

.avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #1e293b;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.status-badge {
    position: absolute;
    bottom: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    background: #22c55e;
    border-radius: 50%;
    border: 3px solid #1e293b;
}

.profile-info {
    text-align: center;
    padding: 1rem 1.5rem 0.5rem;
}

.user-name {
    font-size: 1.4rem;
    font-weight: 800;
    color: #f8fafc;
}

.user-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #38bdf8;
    margin-bottom: 0.2rem;
}

.user-location {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 0.75rem;
}

.user-bio {
    font-size: 0.88rem;
    color: #cbd5e1;
    line-height: 1.5;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    padding: 0.8rem 1.5rem;
}

.skill-tag {
    background: #0f172a;
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
}

.stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #131c2e;
    margin: 1rem 1.5rem;
    padding: 0.8rem;
    border-radius: 12px;
    border: 1px solid #334155;
    text-align: center;
}

.stat-col strong {
    display: block;
    font-size: 1.15rem;
    color: #f8fafc;
}

.stat-col span {
    font-size: 0.75rem;
    color: #64748b;
}

.actions-row {
    display: flex;
    gap: 10px;
    padding: 0 1.5rem 1rem;
}

.btn {
    flex: 1;
    padding: 0.75rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-follow {
    background: #6366f1;
    color: white;
}

.btn-follow.following {
    background: #10b981;
}

.btn-follow:hover {
    filter: brightness(1.1);
}

.btn-message {
    background: transparent;
    border: 1px solid #475569;
    color: #cbd5e1;
}

.btn-message:hover {
    border-color: #38bdf8;
    color: #ffffff;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 0 1.5rem 1.5rem;
}

.social-icon {
    font-size: 1.25rem;
    text-decoration: none;
    transition: transform 0.2s;
}

.social-icon:hover {
    transform: scale(1.2);
}

.notification-toast {
    margin-top: 1rem;
    background: #10b981;
    color: white;
    text-align: center;
    padding: 0.7rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: opacity 0.3s;
}

.notification-toast.hidden {
    display: none;
}""",
        "script": """const profileCard = document.getElementById('profileCard');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const followBtn = document.getElementById('followBtn');
const followersCount = document.getElementById('followersCount');
const messageBtn = document.getElementById('messageBtn');
const toastMsg = document.getElementById('toastMsg');

let isFollowing = false;
let currentFollowers = 1420;

themeToggleBtn.addEventListener('click', () => {
    profileCard.classList.toggle('light-mode');
    themeToggleBtn.textContent = profileCard.classList.contains('light-mode') ? '☀️' : '🌙';
});

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if (isFollowing) {
        currentFollowers++;
        followBtn.textContent = 'Following ✓';
        followBtn.classList.add('following');
    } else {
        currentFollowers--;
        followBtn.textContent = 'Follow +';
        followBtn.classList.remove('following');
    }
    followersCount.textContent = currentFollowers.toLocaleString();
});

messageBtn.addEventListener('click', () => {
    toastMsg.classList.remove('hidden');
    setTimeout(() => {
        toastMsg.classList.add('hidden');
    }, 2500);
});"""
    },

    "05-color-palette-generator": {
        "title": "05 - Color Palette Generator",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>05 - Color Palette Generator</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Fira+Code:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-layout">
        <!-- Top Control Bar -->
        <header class="top-bar">
            <div class="brand">
                <span class="badge">Question 05 • Level 1: Basics</span>
                <h1>Color Palette Generator</h1>
            </div>
            <div class="actions">
                <span class="hint">Press <kbd>Spacebar</kbd> or click</span>
                <button class="btn btn-primary" id="generateBtn">🎲 Generate Palette</button>
                <button class="btn btn-secondary" id="exportBtn">Export CSS</button>
            </div>
        </header>

        <!-- 5 Color Palette Columns -->
        <main class="palette-container" id="paletteContainer">
            <!-- Populated via JavaScript -->
        </main>

        <!-- Toast Notification -->
        <div class="toast-notification hidden" id="toast">Copied HEX code!</div>

        <!-- Export Modal -->
        <div class="modal-overlay hidden" id="exportModal">
            <div class="modal-content">
                <h2>Export Palette CSS Variables</h2>
                <pre><code id="exportCode"></code></pre>
                <div class="modal-actions">
                    <button class="btn btn-primary" id="copyCssExportBtn">Copy CSS</button>
                    <button class="btn btn-secondary" id="closeModalBtn">Close</button>
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
    height: 100vh;
    overflow: hidden;
}

.app-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.top-bar {
    background: #111827;
    border-bottom: 1px solid #1f2937;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

.badge {
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
}

.brand h1 {
    font-size: 1.3rem;
    margin-top: 2px;
}

.actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.hint {
    color: #9ca3af;
    font-size: 0.85rem;
}

kbd {
    background: #1f2937;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #374151;
    font-family: 'Fira Code', monospace;
}

.btn {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.btn-primary {
    background: #6366f1;
    color: white;
}
.btn-primary:hover { background: #4f46e5; }

.btn-secondary {
    background: #1f2937;
    color: #e5e7eb;
    border: 1px solid #374151;
}
.btn-secondary:hover { background: #374151; }

/* Palette Columns */
.palette-container {
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
}

@media (max-width: 768px) {
    .palette-container {
        flex-direction: column;
    }
}

.color-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 3rem;
    position: relative;
    transition: background 0.3s ease;
    user-select: none;
}

.color-card .actions-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.hex-code {
    font-family: 'Fira Code', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 6px;
    transition: background 0.2s;
}

.hex-code:hover {
    background: rgba(0, 0, 0, 0.1);
}

.color-tools {
    display: flex;
    gap: 8px;
}

.tool-btn {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: transform 0.2s, background 0.2s;
}

.tool-btn:hover {
    transform: scale(1.15);
    background: rgba(0, 0, 0, 0.1);
}

/* Toast */
.toast-notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #111827;
    color: #4ade80;
    border: 1px solid #1f2937;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: 700;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    z-index: 100;
    transition: opacity 0.3s;
}
.toast-notification.hidden { display: none; }

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
}
.modal-overlay.hidden { display: none; }

.modal-content {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 16px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
}
.modal-content h2 { margin-bottom: 1rem; font-size: 1.2rem; }
.modal-content pre {
    background: #030712;
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: #38bdf8;
    margin-bottom: 1.5rem;
    overflow-x: auto;
}
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; }""",
        "script": """const paletteContainer = document.getElementById('paletteContainer');
const generateBtn = document.getElementById('generateBtn');
const exportBtn = document.getElementById('exportBtn');
const toast = document.getElementById('toast');
const exportModal = document.getElementById('exportModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const copyCssExportBtn = document.getElementById('copyCssExportBtn');
const exportCode = document.getElementById('exportCode');

let colors = [
    { hex: '#264653', locked: false },
    { hex: '#2A9D8F', locked: false },
    { hex: '#E9C46A', locked: false },
    { hex: '#F4A261', locked: false },
    { hex: '#E76F51', locked: false }
];

function getRandomHex() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getLuminance(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b);
}

function generatePalette() {
    colors = colors.map(col => col.locked ? col : { hex: getRandomHex(), locked: false });
    renderPalette();
}

function renderPalette() {
    paletteContainer.innerHTML = '';
    colors.forEach((col, index) => {
        const isDark = getLuminance(col.hex) < 128;
        const textColor = isDark ? '#ffffff' : '#000000';

        const card = document.createElement('div');
        card.className = 'color-card';
        card.style.background = col.hex;
        card.style.color = textColor;

        card.innerHTML = `
            <div class="actions-bar">
                <div class="color-tools">
                    <button class="tool-btn lock-btn" title="${col.locked ? 'Unlock Color' : 'Lock Color'}" style="color: ${textColor}">
                        ${col.locked ? '🔒' : '🔓'}
                    </button>
                    <button class="tool-btn copy-btn" title="Copy HEX" style="color: ${textColor}">
                        📋
                    </button>
                </div>
                <div class="hex-code" title="Click to copy">${col.hex}</div>
            </div>
        `;

        // Event listeners
        const lockBtn = card.querySelector('.lock-btn');
        lockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            colors[index].locked = !colors[index].locked;
            renderPalette();
        });

        const copyAction = () => {
            navigator.clipboard.writeText(col.hex);
            showToast(`Copied ${col.hex} to clipboard!`);
        };

        card.querySelector('.copy-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            copyAction();
        });

        card.querySelector('.hex-code').addEventListener('click', copyAction);

        paletteContainer.appendChild(card);
    });
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        generatePalette();
    }
});

generateBtn.addEventListener('click', generatePalette);

exportBtn.addEventListener('click', () => {
    const css = `:root {
  --color-1: ${colors[0].hex};
  --color-2: ${colors[1].hex};
  --color-3: ${colors[2].hex};
  --color-4: ${colors[3].hex};
  --color-5: ${colors[4].hex};
}`;
    exportCode.textContent = css;
    exportModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => exportModal.classList.add('hidden'));

copyCssExportBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(exportCode.textContent);
    showToast('Exported CSS copied!');
    exportModal.classList.add('hidden');
});

renderPalette();"""
    },

    "06-live-character-counter": {
        "title": "06 - Live Character & Word Counter",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>06 - Live Character Counter</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 06 • Level 1: Basics</span>
            <h1>Live Text & Character Analyzer</h1>
            <p>Real-time character, word, sentence, reading time, and SVG progress meter calculation.</p>
        </header>

        <div class="editor-card">
            <!-- Metrics Bar -->
            <div class="metrics-grid">
                <div class="metric-box">
                    <span class="val" id="charCount">0</span>
                    <span class="lbl">Characters</span>
                </div>
                <div class="metric-box">
                    <span class="val" id="wordCount">0</span>
                    <span class="lbl">Words</span>
                </div>
                <div class="metric-box">
                    <span class="val" id="sentenceCount">0</span>
                    <span class="lbl">Sentences</span>
                </div>
                <div class="metric-box">
                    <span class="val" id="readingTime">0 min</span>
                    <span class="lbl">Reading Time</span>
                </div>
            </div>

            <!-- Textarea with SVG Meter -->
            <div class="textarea-wrapper">
                <textarea id="textInput" placeholder="Start typing or paste your content here to inspect metrics..."></textarea>
                
                <div class="meter-bar">
                    <div class="limit-status">
                        <span>Limit: <strong id="currentLimit">0</strong> / 280</span>
                    </div>
                    <!-- Circular Progress Meter -->
                    <div class="progress-ring-box">
                        <svg class="progress-ring" width="44" height="44">
                            <circle class="ring-bg" stroke="#1e293b" stroke-width="4" fill="transparent" r="18" cx="22" cy="22"/>
                            <circle class="ring-progress" id="ringProgress" stroke="#38bdf8" stroke-width="4" stroke-dasharray="113.1" stroke-dashoffset="113.1" stroke-linecap="round" fill="transparent" r="18" cx="22" cy="22"/>
                        </svg>
                        <span class="remaining-chars" id="remainingChars">280</span>
                    </div>
                </div>
            </div>

            <!-- Action Toolbar -->
            <div class="toolbar">
                <div class="tools-left">
                    <button class="tool-btn" id="upperBtn">UPPERCASE</button>
                    <button class="tool-btn" id="lowerBtn">lowercase</button>
                    <button class="tool-btn" id="clearBtn">Clear</button>
                </div>
                <button class="btn-copy" id="copyTextBtn">📋 Copy Text</button>
            </div>
        </div>

        <div class="toast hidden" id="toast">Copied text to clipboard!</div>
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
    color: #f1f5f9;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.container {
    max-width: 750px;
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
    border: 1px solid rgba(56, 189, 248, 0.3);
}

.header h1 {
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
    font-size: 0.95rem;
}

.editor-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    padding: 1.8rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 1.5rem;
}

@media (max-width: 600px) {
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.metric-box {
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 0.9rem;
    text-align: center;
}

.metric-box .val {
    display: block;
    font-size: 1.4rem;
    font-weight: 700;
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
}

.metric-box .lbl {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.textarea-wrapper {
    position: relative;
    background: #0b0f19;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.2rem;
    transition: border-color 0.2s;
}

.textarea-wrapper:focus-within {
    border-color: #38bdf8;
}

textarea {
    width: 100%;
    min-height: 180px;
    background: transparent;
    border: none;
    outline: none;
    color: #f1f5f9;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
}

.meter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #1e293b;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
}

.limit-status {
    font-size: 0.85rem;
    color: #64748b;
}

.limit-status strong {
    color: #f1f5f9;
}

.progress-ring-box {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-ring {
    transform: rotate(-90deg);
}

.remaining-chars {
    position: absolute;
    font-size: 0.7rem;
    font-weight: 700;
    font-family: 'Fira Code', monospace;
    color: #94a3b8;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.tools-left {
    display: flex;
    gap: 8px;
}

.tool-btn {
    background: #0b0f19;
    border: 1px solid #1e293b;
    color: #94a3b8;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
}

.tool-btn:hover {
    border-color: #38bdf8;
    color: #f1f5f9;
}

.btn-copy {
    background: #38bdf8;
    color: #0b0f19;
    border: none;
    padding: 7px 16px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-copy:hover {
    background: #0ea5e9;
}

.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #10b981;
    color: white;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
}

.toast.hidden { display: none; }""",
        "script": """const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const currentLimit = document.getElementById('currentLimit');
const remainingChars = document.getElementById('remainingChars');
const ringProgress = document.getElementById('ringProgress');

const upperBtn = document.getElementById('upperBtn');
const lowerBtn = document.getElementById('lowerBtn');
const clearBtn = document.getElementById('clearBtn');
const copyTextBtn = document.getElementById('copyTextBtn');
const toast = document.getElementById('toast');

const MAX_LIMIT = 280;
const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~113.1

function updateMetrics() {
    const text = textInput.value;
    const chars = text.length;

    // Character metric
    charCount.textContent = chars.toLocaleString();
    currentLimit.textContent = chars;

    // Word metric
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    wordCount.textContent = words.toLocaleString();

    // Sentence metric
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\\s|$)/g) || [text]).length : 0;
    sentenceCount.textContent = sentences;

    // Reading time (approx 200 words per min)
    const minutes = Math.ceil(words / 200);
    readingTime.textContent = `${words > 0 ? minutes : 0} min`;

    // SVG Progress Ring calculation
    const remaining = MAX_LIMIT - chars;
    remainingChars.textContent = remaining;

    const progress = Math.min(chars / MAX_LIMIT, 1);
    const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
    ringProgress.style.strokeDashoffset = offset;

    if (chars > MAX_LIMIT) {
        ringProgress.style.stroke = '#ef4444';
        remainingChars.style.color = '#ef4444';
    } else if (chars > MAX_LIMIT * 0.8) {
        ringProgress.style.stroke = '#f59e0b';
        remainingChars.style.color = '#f59e0b';
    } else {
        ringProgress.style.stroke = '#38bdf8';
        remainingChars.style.color = '#94a3b8';
    }
}

textInput.addEventListener('input', updateMetrics);

upperBtn.addEventListener('click', () => {
    textInput.value = textInput.value.toUpperCase();
    updateMetrics();
});

lowerBtn.addEventListener('click', () => {
    textInput.value = textInput.value.toLowerCase();
    updateMetrics();
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateMetrics();
});

copyTextBtn.addEventListener('click', () => {
    if (!textInput.value) return;
    navigator.clipboard.writeText(textInput.value);
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
});

updateMetrics();"""
    },

    "07-dark-light-mode-toggle": {
        "title": "07 - Dark & Light Mode Toggle",
        "html": """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>07 - Dark & Light Mode Toggle</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-wrapper">
        <header class="navbar">
            <div class="brand">
                <span class="brand-logo">⚡</span>
                <span class="brand-name">ThemeCraft</span>
            </div>
            <!-- Theme Toggle Switch -->
            <div class="theme-switch-wrapper">
                <span class="mode-label" id="modeLabel">Dark Mode</span>
                <label class="switch" for="themeToggle">
                    <input type="checkbox" id="themeToggle">
                    <div class="slider round">
                        <span class="icon-sun">☀️</span>
                        <span class="icon-moon">🌙</span>
                    </div>
                </label>
            </div>
        </header>

        <main class="content-container">
            <div class="badge">Question 07 • Level 1: Basics</div>
            <h1 class="hero-title">Seamless CSS Variable Theme Switcher</h1>
            <p class="hero-subtitle">Learn how to declare custom color properties, handle smooth property transitions, and persist user preferences in localStorage.</p>

            <div class="showcase-grid">
                <!-- Card 1 -->
                <div class="card">
                    <div class="card-icon">🚀</div>
                    <h3>Instant Switching</h3>
                    <p>CSS variables update in milliseconds without triggering full document re-renders.</p>
                </div>

                <!-- Card 2 -->
                <div class="card">
                    <div class="card-icon">💾</div>
                    <h3>Storage Persistence</h3>
                    <p>Remembers user preference across tabs and sessions using the browser's localStorage.</p>
                </div>

                <!-- Card 3 -->
                <div class="card">
                    <div class="card-icon">🎨</div>
                    <h3>Semantic Palette</h3>
                    <p>Clean tokens like <code>--bg-primary</code> and <code>--text-primary</code> ensure maintainability.</p>
                </div>
            </div>

            <div class="sample-box">
                <h3>Live Theme Status</h3>
                <p id="statusDesc">Current active theme: <strong>Dark Theme (data-theme="dark")</strong></p>
                <button class="btn btn-accent" id="testAlertBtn">Test Interaction</button>
            </div>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* CSS Theme Variables */
:root[data-theme="dark"] {
    --bg-page: #0f172a;
    --bg-nav: #1e293b;
    --bg-card: #1e293b;
    --border-color: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent: #38bdf8;
    --accent-hover: #0ea5e9;
    --shadow: 0 10px 25px rgba(0,0,0,0.3);
}

:root[data-theme="light"] {
    --bg-page: #f8fafc;
    --bg-nav: #ffffff;
    --bg-card: #ffffff;
    --border-color: #e2e8f0;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --shadow: 0 10px 25px rgba(0,0,0,0.06);
}

body {
    background-color: var(--bg-page);
    color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.app-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.navbar {
    background-color: var(--bg-nav);
    border-bottom: 1px solid var(--border-color);
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s, border-color 0.3s;
}

.brand {
    display: flex;
    align-items: center;
    gap: 8px;
}

.brand-logo { font-size: 1.5rem; }
.brand-name { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }

.theme-switch-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
}

.mode-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
}

/* Custom Toggle Switch */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 32px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #334155;
    border-radius: 34px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px;
    font-size: 0.8rem;
}

.slider::before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
    z-index: 2;
}

input:checked + .slider {
    background-color: #6366f1;
}

input:checked + .slider::before {
    transform: translateX(28px);
}

.content-container {
    max-width: 900px;
    margin: 3rem auto;
    padding: 0 1.5rem;
    text-align: center;
}

.badge {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: var(--accent);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
}

.hero-title {
    font-size: 2.3rem;
    font-weight: 800;
    margin-bottom: 0.8rem;
}

.hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
    max-width: 650px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
}

.showcase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;
}

.card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

.card-icon {
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
}

.card h3 {
    font-size: 1.15rem;
    margin-bottom: 0.4rem;
}

.card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
}

.sample-box {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: var(--shadow);
}

.sample-box h3 { margin-bottom: 0.5rem; }
.sample-box p { color: var(--text-secondary); margin-bottom: 1.2rem; }

.btn-accent {
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 0.75rem 1.8rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-accent:hover {
    background-color: var(--accent-hover);
}""",
        "script": """const themeToggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');
const statusDesc = document.getElementById('statusDesc');
const testAlertBtn = document.getElementById('testAlertBtn');

// Read Saved Theme or Default to Dark
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        themeToggle.checked = true;
        modeLabel.textContent = 'Light Mode';
        statusDesc.innerHTML = 'Current active theme: <strong>Light Theme (data-theme="light")</strong>';
    } else {
        themeToggle.checked = false;
        modeLabel.textContent = 'Dark Mode';
        statusDesc.innerHTML = 'Current active theme: <strong>Dark Theme (data-theme="dark")</strong>';
    }
}

themeToggle.addEventListener('change', () => {
    const nextTheme = themeToggle.checked ? 'light' : 'dark';
    applyTheme(nextTheme);
});

testAlertBtn.addEventListener('click', () => {
    alert(`Theme is currently set to ${document.documentElement.getAttribute('data-theme')} mode!`);
});"""
    },

    "08-responsive-badge-card": {
        "title": "08 - Responsive Image Card with Badge & Ribbon",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>08 - Responsive Badge Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 08 • Level 1: Basics</span>
            <h1>Positioned Badge & Ribbon Cards</h1>
            <p>CSS Absolute & Relative positioning, 45-degree ribbon cuts, image zoom overlays, and interactive tags.</p>
        </header>

        <div class="cards-grid">
            <!-- Card 1: Ribbon Hot Sale -->
            <div class="product-card">
                <div class="ribbon-corner"><span>HOT SALE</span></div>
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80" alt="Smart Watch">
                    <button class="btn-favorite" title="Add to Wishlist">❤️</button>
                    <div class="quick-view">Quick View</div>
                </div>
                <div class="card-content">
                    <span class="category-tag">Wearables</span>
                    <h3>CyberPulse Pro Smartwatch</h3>
                    <div class="price-row">
                        <span class="price-current">$199.00</span>
                        <span class="price-old">$299.00</span>
                        <span class="discount-pill">-33% OFF</span>
                    </div>
                </div>
            </div>

            <!-- Card 2: Floating Pill Badge -->
            <div class="product-card">
                <div class="floating-badge new">⚡ NEW RELEASE</div>
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Headphones">
                    <button class="btn-favorite" title="Add to Wishlist">🤍</button>
                    <div class="quick-view">Quick View</div>
                </div>
                <div class="card-content">
                    <span class="category-tag">Audio</span>
                    <h3>Studio Max Wireless ANC</h3>
                    <div class="price-row">
                        <span class="price-current">$349.00</span>
                        <span class="stock-badge">In Stock</span>
                    </div>
                </div>
            </div>

            <!-- Card 3: Featured Exclusive Ribbon -->
            <div class="product-card">
                <div class="floating-badge featured">★ FEATURED</div>
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80" alt="Vintage Camera">
                    <button class="btn-favorite" title="Add to Wishlist">🤍</button>
                    <div class="quick-view">Quick View</div>
                </div>
                <div class="card-content">
                    <span class="category-tag">Photography</span>
                    <h3>RetroLens Classic 35mm</h3>
                    <div class="price-row">
                        <span class="price-current">$489.00</span>
                        <span class="discount-pill">Limited Batch</span>
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
    color: #f1f5f9;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1rem;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
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
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-card {
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.product-card:hover {
    transform: translateY(-6px);
    border-color: #38bdf8;
}

/* 45-degree Corner Ribbon */
.ribbon-corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    overflow: hidden;
    z-index: 10;
}

.ribbon-corner span {
    position: absolute;
    display: block;
    width: 160px;
    padding: 6px 0;
    background: #ef4444;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
    text-transform: uppercase;
    text-align: center;
    left: -20px;
    top: 25px;
    transform: rotate(45deg);
}

/* Floating Pill Badge */
.floating-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 10;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
}

.floating-badge.new {
    background: #3b82f6;
    color: white;
}

.floating-badge.featured {
    background: #f59e0b;
    color: #0b0f19;
}

/* Image Container & Zoom */
.img-container {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: #0f172a;
}

.img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.product-card:hover .img-container img {
    transform: scale(1.08);
}

.btn-favorite {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(4px);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.1rem;
    transition: transform 0.2s;
    z-index: 5;
}

.btn-favorite:hover {
    transform: scale(1.2);
}

.quick-view {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    background: rgba(56, 189, 248, 0.9);
    color: #0b0f19;
    text-align: center;
    padding: 8px 0;
    font-weight: 700;
    font-size: 0.85rem;
    transition: bottom 0.3s ease;
    cursor: pointer;
}

.product-card:hover .quick-view {
    bottom: 0;
}

/* Card Content */
.card-content {
    padding: 1.4rem;
}

.category-tag {
    font-size: 0.75rem;
    color: #38bdf8;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
}

.card-content h3 {
    font-size: 1.15rem;
    margin: 0.3rem 0 0.8rem;
}

.price-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.price-current {
    font-size: 1.3rem;
    font-weight: 800;
    color: #f1f5f9;
}

.price-old {
    font-size: 0.95rem;
    color: #64748b;
    text-decoration: line-through;
}

.discount-pill {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
}

.stock-badge {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
}""",
        "script": """document.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.textContent === '🤍') {
            btn.textContent = '❤️';
        } else {
            btn.textContent = '🤍';
        }
    });
});

document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', () => {
        const title = btn.closest('.product-card').querySelector('h3').textContent;
        alert(`Opening quick preview for: ${title}`);
    });
});"""
    },

    "09-digital-clock-custom-fonts": {
        "title": "09 - Digital Clock with Custom Fonts",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>09 - Digital Clock</title>
    <!-- Monospace & Digital Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Share+Tech+Mono&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 09 • Level 1: Basics</span>
            <h1>Cyberpunk Digital Clock</h1>
            <p>JavaScript Date API, setInterval accuracy, custom segmented fonts, and timezone switching.</p>
        </header>

        <div class="clock-card">
            <!-- Controls Bar -->
            <div class="clock-controls">
                <div class="btn-group">
                    <button class="control-btn active" id="mode12">12-Hour</button>
                    <button class="control-btn" id="mode24">24-Hour</button>
                </div>
                <select id="timezoneSelect" class="tz-select">
                    <option value="local">Local Time</option>
                    <option value="UTC">UTC / GMT</option>
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
            </div>

            <!-- Glowing Digital Display -->
            <div class="display-box">
                <div class="time-wrapper">
                    <span class="time-segment" id="hours">12</span>
                    <span class="colon">:</span>
                    <span class="time-segment" id="minutes">00</span>
                    <span class="colon">:</span>
                    <span class="time-segment" id="seconds">00</span>
                    <span class="period" id="period">AM</span>
                </div>
                <div class="date-display" id="dateDisplay">Wednesday, September 2, 2026</div>
            </div>

            <!-- Seconds Progress Bar -->
            <div class="seconds-track">
                <div class="seconds-fill" id="secondsBar"></div>
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
    background: #07090e;
    color: #f1f5f9;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.container {
    max-width: 700px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    background: rgba(0, 242, 254, 0.15);
    color: #00f2fe;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(0, 242, 254, 0.3);
}

.header h1 {
    font-size: 2.2rem;
    color: #ffffff;
    margin-bottom: 0.4rem;
}

.header p {
    color: #94a3b8;
}

.clock-card {
    background: #0f1422;
    border: 1px solid #1e293b;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 0 40px rgba(0, 242, 254, 0.15);
}

.clock-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 10px;
}

.btn-group {
    display: flex;
    gap: 6px;
}

.control-btn {
    background: #172033;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: 600;
}

.control-btn.active {
    background: #00f2fe;
    color: #07090e;
    border-color: #00f2fe;
}

.tz-select {
    background: #172033;
    border: 1px solid #334155;
    color: #f1f5f9;
    padding: 6px 12px;
    border-radius: 6px;
    outline: none;
    font-size: 0.85rem;
    cursor: pointer;
}

.display-box {
    background: #06080e;
    border: 1px solid #1f293d;
    border-radius: 14px;
    padding: 2.5rem 1.5rem;
    text-align: center;
    box-shadow: inset 0 0 20px rgba(0, 242, 254, 0.1);
}

.time-wrapper {
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-family: 'Orbitron', monospace;
    font-size: 3.5rem;
    font-weight: 900;
    color: #00f2fe;
    text-shadow: 0 0 20px rgba(0, 242, 254, 0.6);
    line-height: 1;
    margin-bottom: 1rem;
}

@media (max-width: 550px) {
    .time-wrapper {
        font-size: 2.3rem;
    }
}

.colon {
    animation: blink 1s step-start infinite;
    padding: 0 4px;
}

@keyframes blink {
    50% { opacity: 0.2; }
}

.period {
    font-size: 1.2rem;
    margin-left: 10px;
    color: #38bdf8;
}

.date-display {
    font-family: 'Share Tech Mono', monospace;
    color: #94a3b8;
    font-size: 1.1rem;
    letter-spacing: 0.05em;
}

.seconds-track {
    width: 100%;
    height: 6px;
    background: #172033;
    border-radius: 999px;
    margin-top: 1.5rem;
    overflow: hidden;
}

.seconds-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #00f2fe, #4facfe);
    box-shadow: 0 0 10px #00f2fe;
    transition: width 0.2s linear;
}""",
        "script": """const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const periodEl = document.getElementById('period');
const dateDisplayEl = document.getElementById('dateDisplay');
const secondsBar = document.getElementById('secondsBar');
const mode12Btn = document.getElementById('mode12');
const mode24Btn = document.getElementById('mode24');
const timezoneSelect = document.getElementById('timezoneSelect');

let is24Hour = false;
let currentTimezone = 'local';

function updateClock() {
    const now = new Date();
    let dateObj = now;

    if (currentTimezone !== 'local') {
        const tzString = now.toLocaleString('en-US', { timeZone: currentTimezone });
        dateObj = new Date(tzString);
    }

    let h = dateObj.getHours();
    const m = dateObj.getMinutes();
    const s = dateObj.getSeconds();

    let period = '';
    if (!is24Hour) {
        period = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        periodEl.style.display = 'inline';
        periodEl.textContent = period;
    } else {
        periodEl.style.display = 'none';
    }

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');

    // Date String
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplayEl.textContent = dateObj.toLocaleDateString('en-US', options);

    // Progress Bar
    const percent = (s / 60) * 100;
    secondsBar.style.width = `${percent}%`;
}

mode12Btn.addEventListener('click', () => {
    is24Hour = false;
    mode12Btn.classList.add('active');
    mode24Btn.classList.remove('active');
    updateClock();
});

mode24Btn.addEventListener('click', () => {
    is24Hour = true;
    mode24Btn.classList.add('active');
    mode12Btn.classList.remove('active');
    updateClock();
});

timezoneSelect.addEventListener('change', (e) => {
    currentTimezone = e.target.value;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();"""
    },

    "10-interactive-quote-generator": {
        "title": "10 - Interactive Quote Generator",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10 - Interactive Quote Generator</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 10 • Level 1: Basics</span>
            <h1>Inspirational Quote Studio</h1>
            <p>Master styled blockquotes, typography transitions, Web Speech synthesis API, and clipboard copy.</p>
        </header>

        <div class="quote-card" id="quoteCard">
            <div class="quote-header">
                <span class="category-pill" id="quoteCategory">Innovation</span>
                <span class="quote-icon">“</span>
            </div>

            <div class="quote-body">
                <p class="quote-text" id="quoteText">The only way to do great work is to love what you do.</p>
                <div class="quote-author" id="quoteAuthor">— Steve Jobs</div>
            </div>

            <div class="card-footer">
                <div class="action-buttons">
                    <button class="icon-btn" id="speakBtn" title="Read Quote Aloud">🔊</button>
                    <button class="icon-btn" id="copyBtn" title="Copy to Clipboard">📋</button>
                    <button class="icon-btn" id="tweetBtn" title="Tweet Quote">🐦</button>
                </div>
                <button class="btn-primary" id="newQuoteBtn">✨ New Quote</button>
            </div>
        </div>

        <div class="toast hidden" id="toast">Copied quote to clipboard!</div>
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
    background: #0d1117;
    color: #f0f6fc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.container {
    max-width: 680px;
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
    border: 1px solid rgba(99, 102, 241, 0.3);
}

.header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
}

.header p {
    color: #8b949e;
}

.quote-card {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 20px;
    padding: 2.2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    position: relative;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.quote-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.category-pill {
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
}

.quote-icon {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    line-height: 1;
    color: #484f58;
}

.quote-body {
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.8rem;
}

.quote-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    line-height: 1.5;
    font-style: italic;
    color: #f0f6fc;
    margin-bottom: 1rem;
}

.quote-author {
    font-size: 1rem;
    color: #8b949e;
    font-weight: 600;
    text-align: right;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #30363d;
    padding-top: 1.2rem;
    flex-wrap: wrap;
    gap: 12px;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.icon-btn {
    background: #21262d;
    border: 1px solid #30363d;
    font-size: 1.1rem;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
}

.icon-btn:hover {
    background: #30363d;
    border-color: #58a6ff;
    transform: scale(1.1);
}

.btn-primary {
    background: #238636;
    color: white;
    border: none;
    padding: 0.75rem 1.4rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-primary:hover {
    background: #2ea043;
}

.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #238636;
    color: white;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
}

.toast.hidden { display: none; }""",
        "script": """const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Innovation" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Design" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House", category: "Engineering" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Engineering" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "Productivity" },
    { text: "Stay hungry, stay foolish.", author: "Whole Earth Catalog", category: "Mindset" },
    { text: "Knowledge is power.", author: "Francis Bacon", category: "Wisdom" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso", category: "Motivation" }
];

const quoteCard = document.getElementById('quoteCard');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCategory = document.getElementById('quoteCategory');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const speakBtn = document.getElementById('speakBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const toast = document.getElementById('toast');

let currentIndex = 0;

function getRandomQuote() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);

    currentIndex = nextIndex;
    const quote = quotes[currentIndex];

    quoteCard.style.opacity = 0;
    quoteCard.style.transform = 'translateY(10px)';

    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `— ${quote.author}`;
        quoteCategory.textContent = quote.category;

        quoteCard.style.opacity = 1;
        quoteCard.style.transform = 'translateY(0)';
    }, 250);
}

newQuoteBtn.addEventListener('click', getRandomQuote);

// Web Speech API
speakBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${quoteText.textContent} by ${quoteAuthor.textContent}`);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Web Speech API is not supported in this browser.');
    }
});

copyBtn.addEventListener('click', () => {
    const text = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(text);
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
});

tweetBtn.addEventListener('click', () => {
    const text = encodeURIComponent(`"${quoteText.textContent}" ${quoteAuthor.textContent}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
});"""
    }
}

for folder, data in tier1_projects.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    with open(os.path.join(folder_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(data["html"])
    with open(os.path.join(folder_path, "style.css"), "w", encoding="utf-8") as f:
        f.write(data["css"])
    with open(os.path.join(folder_path, "script.js"), "w", encoding="utf-8") as f:
        f.write(data["script"])
    print(f"Created {folder} (3 files)")

print("Tier 1 generation complete!")
