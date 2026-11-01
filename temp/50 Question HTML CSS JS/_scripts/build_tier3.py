import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

tier3_projects = {
    "26-hero-section-typewriter": {
        "title": "26 - Modern Hero Section with Typewriter Effect",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>26 - Hero Section Typewriter</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Top Mini Navbar -->
    <header class="navbar">
        <div class="logo">⚡ NovaCloud</div>
        <nav class="nav-links">
            <a href="#">Solutions</a>
            <a href="#">Architecture</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
        </nav>
        <button class="btn btn-outline">Sign In</button>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="glow-bg-blob"></div>
        <div class="hero-container">
            <div class="badge-pill">
                <span class="pulse-dot"></span>
                <span>Nova Engine 3.0 is Live • Read Release Notes →</span>
            </div>

            <h1 class="hero-title">
                The modern platform to<br>
                <span class="typewriter-text" id="typewriter"></span><span class="cursor">|</span>
            </h1>

            <p class="hero-description">
                Accelerate software engineering velocity with real-time state synchronization, automated zero-config deployments, and edge-native distributed microservices.
            </p>

            <div class="hero-actions">
                <button class="btn btn-primary">Start Free Trial 🚀</button>
                <button class="btn btn-secondary">▶ Watch 2-Min Demo</button>
            </div>

            <!-- Social Proof -->
            <div class="social-proof">
                <div class="avatar-group">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Avatar">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Avatar">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" alt="Avatar">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" alt="Avatar">
                </div>
                <div class="proof-text">
                    <strong>4.9 / 5 Rating</strong>
                    <span>Trusted by 45,000+ engineers worldwide</span>
                </div>
            </div>
        </div>
    </section>
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
    overflow-x: hidden;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    position: relative;
    z-index: 10;
}

.logo {
    font-size: 1.4rem;
    font-weight: 800;
}

.nav-links {
    display: flex;
    gap: 24px;
}

.nav-links a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    transition: color 0.2s;
}

.nav-links a:hover { color: #f8fafc; }

.btn {
    padding: 0.75rem 1.6rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #6366f1; color: white; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); }
.btn-primary:hover { background: #4f46e5; transform: translateY(-2px); }

.btn-secondary { background: #131b2e; color: #f8fafc; border: 1px solid #1e293b; }
.btn-secondary:hover { background: #1e293b; }

.btn-outline { background: transparent; border: 1px solid #334155; color: #f8fafc; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }

/* Hero Section */
.hero-section {
    position: relative;
    padding: 5rem 1.5rem 6rem;
    display: flex;
    justify-content: center;
    text-align: center;
}

.glow-bg-blob {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25), rgba(56, 189, 248, 0.15), transparent 70%);
    filter: blur(60px);
    pointer-events: none;
    z-index: 1;
}

.hero-container {
    max-width: 850px;
    position: relative;
    z-index: 2;
}

.badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #c7d2fe;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
}

.pulse-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 8px #22c55e;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
    .hero-title { font-size: 2.3rem; }
    .nav-links { display: none; }
}

.typewriter-text {
    background: linear-gradient(135deg, #6366f1, #38bdf8, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cursor {
    font-family: 'Fira Code', monospace;
    font-weight: 300;
    color: #38bdf8;
    animation: blink 0.8s infinite;
}

@keyframes blink {
    50% { opacity: 0; }
}

.hero-description {
    font-size: 1.15rem;
    color: #94a3b8;
    line-height: 1.6;
    max-width: 680px;
    margin: 0 auto 2.5rem;
}

.hero-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 3.5rem;
    flex-wrap: wrap;
}

.social-proof {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(19, 27, 46, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid #1e293b;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
}

.avatar-group {
    display: flex;
}

.avatar-group img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #080c15;
    margin-left: -8px;
    object-fit: cover;
}

.avatar-group img:first-child { margin-left: 0; }

.proof-text {
    text-align: left;
    display: flex;
    flex-direction: column;
}

.proof-text strong {
    font-size: 0.85rem;
    color: #f8fafc;
}

.proof-text span {
    font-size: 0.75rem;
    color: #94a3b8;
}""",
        "script": """const words = [
    "Scale Cloud Microservices.",
    "Automate CI/CD Pipelines.",
    "Build Ultra-Fast Web Apps.",
    "Deliver Edge Infrastructure."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);"""
    },

    "27-features-grid-3d-tilt": {
        "title": "27 - Features Grid with 3D Parallax Tilt Effect",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>27 - Features Grid 3D Tilt</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 27 • Level 3: Sections</span>
            <h2>Architected for Extreme Scale</h2>
            <p>Hover over feature cards to experience 3D perspective tilt calculations and dynamic mouse spotlight gradients.</p>
        </header>

        <div class="features-grid">
            <!-- 1 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">⚡</span>
                    <h3>Zero-Latency Caching</h3>
                    <p>Sub-millisecond global cache distribution synchronized across 300+ edge points of presence.</p>
                </div>
            </div>

            <!-- 2 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">🛡️</span>
                    <h3>Automated DDoS Shield</h3>
                    <p>Layer 3/4/7 threat detection with zero false-positives and automated TLS certificate rotations.</p>
                </div>
            </div>

            <!-- 3 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">🧠</span>
                    <h3>Neural Query Optimizer</h3>
                    <p>AI-driven query planner indexing relational structures and caching vector embeddings.</p>
                </div>
            </div>

            <!-- 4 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">🔄</span>
                    <h3>Live Hot-Reloading</h3>
                    <p>Instantaneous code compilation without losing persistent application state or user sessions.</p>
                </div>
            </div>

            <!-- 5 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">📊</span>
                    <h3>Telemetry Streaming</h3>
                    <p>Granular P99 latency tracking, distributed tracing graphs, and instant anomaly alerting.</p>
                </div>
            </div>

            <!-- 6 -->
            <div class="tilt-card">
                <div class="spotlight"></div>
                <div class="card-inner">
                    <span class="card-icon">🌐</span>
                    <h3>Multi-Region Replication</h3>
                    <p>Autonomous leader election and bidirectional raft consensus guarantees across continents.</p>
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
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 1100px;
    width: 100%;
}

.section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
}

.section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
}

.section-header p {
    color: #94a3b8;
    max-width: 600px;
    margin: 0 auto;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.8rem;
    perspective: 1000px;
}

.tilt-card {
    position: relative;
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    padding: 2.2rem;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out, border-color 0.2s;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.tilt-card:hover {
    border-color: #6366f1;
}

.spotlight {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(99, 102, 241, 0.18),
        transparent 80%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.tilt-card:hover .spotlight {
    opacity: 1;
}

.card-inner {
    position: relative;
    z-index: 2;
    transform: translateZ(20px);
}

.card-icon {
    font-size: 2.2rem;
    display: inline-block;
    margin-bottom: 1rem;
    background: #1e293b;
    width: 56px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-radius: 14px;
    border: 1px solid #334155;
}

.card-inner h3 {
    font-size: 1.25rem;
    margin-bottom: 0.6rem;
    color: #f8fafc;
}

.card-inner p {
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.92rem;
}""",
        "script": """const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});"""
    },

    "28-testimonials-slider-section": {
        "title": "28 - Interactive Testimonials Slider Section",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>28 - Testimonials Slider Section</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 28 • Level 3: Sections</span>
            <h2>Loved by Leading Engineering Teams</h2>
            <p>See why high-growth startups and tech leaders choose our cloud framework.</p>
        </header>

        <!-- Testimonial Carousel -->
        <div class="testimonial-wrapper">
            <div class="testimonial-card" id="testiCard">
                <div class="quote-stars">★★★★★</div>
                <p class="quote-text" id="quoteText">"Migrating our microservices to NovaCloud cut our cloud infrastructure spending by 42% while simultaneously boosting our API response speed."</p>
                <div class="author-row">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="Author" id="authorImg" class="author-avatar">
                    <div class="author-details">
                        <strong id="authorName">Sarah Jenkins</strong>
                        <span id="authorRole">VP of Engineering at FinScale</span>
                    </div>
                </div>
            </div>

            <!-- Controls -->
            <div class="controls-row">
                <button class="control-btn" id="prevTestiBtn">‹</button>
                <div class="dots-box" id="testiDots"></div>
                <button class="control-btn" id="nextTestiBtn">›</button>
            </div>
        </div>

        <!-- Client Logo Cloud -->
        <div class="logo-cloud">
            <span>TRUSTED BY BUILDERS AT:</span>
            <div class="logos-row">
                <strong>METRICPAY</strong>
                <strong>DATALAYER</strong>
                <strong>NEXUS_AI</strong>
                <strong>HYPERCLOUD</strong>
                <strong>SYNCWAVE</strong>
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
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 900px;
    width: 100%;
}

.section-header {
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
    margin-bottom: 0.6rem;
}

.section-header h2 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: #94a3b8;
}

.testimonial-wrapper {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 20px 45px rgba(0,0,0,0.4);
    margin-bottom: 3.5rem;
    position: relative;
}

.quote-stars {
    color: #f59e0b;
    font-size: 1.4rem;
    letter-spacing: 4px;
    margin-bottom: 1.2rem;
}

.quote-text {
    font-size: 1.4rem;
    line-height: 1.6;
    color: #f8fafc;
    margin-bottom: 2rem;
    min-height: 90px;
}

.author-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.author-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #6366f1;
}

.author-details strong {
    display: block;
    font-size: 1.1rem;
    color: #f8fafc;
}

.author-details span {
    font-size: 0.9rem;
    color: #94a3b8;
}

.controls-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
    margin-top: 1.5rem;
}

.control-btn {
    background: #1e293b;
    border: 1px solid #334155;
    color: #f8fafc;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: #6366f1;
    border-color: #6366f1;
}

.dots-box {
    display: flex;
    gap: 8px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.dot.active {
    background: #6366f1;
    width: 24px;
    border-radius: 999px;
}

/* Logo Cloud */
.logo-cloud {
    text-align: center;
    border-top: 1px solid #1f2937;
    padding-top: 2.5rem;
}

.logo-cloud span {
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 1.5rem;
}

.logos-row {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    flex-wrap: wrap;
    color: #4b5563;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: 0.05em;
}""",
        "script": """const testimonials = [
    {
        quote: '"Migrating our microservices to NovaCloud cut our cloud infrastructure spending by 42% while simultaneously boosting our API response speed."',
        name: "Sarah Jenkins",
        role: "VP of Engineering at FinScale",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
        quote: '"The developer experience is unmatched. We shipped our full AI production pipeline 3 weeks ahead of schedule with zero downtime."',
        name: "Marcus Vance",
        role: "Chief Technology Officer at HyperSync",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
        quote: '"NovaCloud automated all multi-region data synchronization headaches so our team could focus exclusively on customer features."',
        name: "Aisha Morales",
        role: "Lead Cloud Architect at CloudBase",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
    }
];

let currentIndex = 0;

const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const authorRole = document.getElementById('authorRole');
const authorImg = document.getElementById('authorImg');
const prevBtn = document.getElementById('prevTestiBtn');
const nextBtn = document.getElementById('nextTestiBtn');
const dotsBox = document.getElementById('testiDots');

testimonials.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
        currentIndex = idx;
        renderTestimonial();
    });
    dotsBox.appendChild(dot);
});

function renderTestimonial() {
    const t = testimonials[currentIndex];
    quoteText.textContent = t.quote;
    authorName.textContent = t.name;
    authorRole.textContent = t.role;
    authorImg.src = t.img;

    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial();
});"""
    },

    "29-animated-counter-stats": {
        "title": "29 - Animated Statistics & Counter Section",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>29 - Animated Stats Counter</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Fira+Code:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 29 • Level 3: Sections</span>
            <h2>Proven Reliability at Planet Scale</h2>
            <p>Numbers that demonstrate operational resilience and global platform adoption.</p>
        </header>

        <div class="stats-grid" id="statsGrid">
            <!-- Stat 1 -->
            <div class="stat-card">
                <span class="stat-icon">👥</span>
                <div class="number-wrapper">
                    <span class="counter" data-target="250000">0</span>
                    <span class="suffix">+</span>
                </div>
                <h3>Active Developers</h3>
                <p>Building real-time web applications daily</p>
            </div>

            <!-- Stat 2 -->
            <div class="stat-card">
                <span class="stat-icon">⚡</span>
                <div class="number-wrapper">
                    <span class="counter" data-target="99.99" data-decimals="2">0</span>
                    <span class="suffix">%</span>
                </div>
                <h3>Uptime SLA</h3>
                <p>Guaranteed multi-region failover tolerance</p>
            </div>

            <!-- Stat 3 -->
            <div class="stat-card">
                <span class="stat-icon">🌍</span>
                <div class="number-wrapper">
                    <span class="counter" data-target="180">0</span>
                    <span class="suffix">+</span>
                </div>
                <h3>Countries Covered</h3>
                <p>Distributed edge servers across continents</p>
            </div>

            <!-- Stat 4 -->
            <div class="stat-card">
                <span class="stat-icon">🚀</span>
                <div class="number-wrapper">
                    <span class="counter" data-target="14">0</span>
                    <span class="suffix">ms</span>
                </div>
                <h3>Median P99 Latency</h3>
                <p>Fast global packet routing network</p>
            </div>
        </div>

        <div class="replay-box">
            <button class="btn btn-secondary" id="replayBtn">🔄 Replay Animation</button>
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
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 1050px;
    width: 100%;
}

.section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
}

.section-header h2 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: #94a3b8;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    padding: 2.2rem 1.5rem;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: transform 0.2s, border-color 0.2s;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: #6366f1;
}

.stat-icon {
    font-size: 2.2rem;
    display: inline-block;
    margin-bottom: 1rem;
}

.number-wrapper {
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-family: 'Fira Code', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    color: #38bdf8;
    margin-bottom: 0.4rem;
}

.suffix {
    color: #6366f1;
    margin-left: 2px;
}

.stat-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
    color: #f8fafc;
}

.stat-card p {
    color: #94a3b8;
    font-size: 0.85rem;
    line-height: 1.5;
}

.replay-box {
    text-align: center;
    margin-top: 3rem;
}

.btn-secondary {
    background: #1e293b;
    color: #f8fafc;
    border: 1px solid #334155;
    padding: 0.75rem 1.6rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
}

.btn-secondary:hover { background: #334155; }""",
        "script": """function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 1500; // Duration in ms

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / speed, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            counter.textContent = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCount);
    });
}

document.getElementById('replayBtn').addEventListener('click', animateCounters);

// Trigger on load
animateCounters();"""
    },

    "30-portfolio-filterable-gallery": {
        "title": "30 - Filterable Portfolio Gallery with Lightbox",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>30 - Filterable Portfolio Gallery</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 30 • Level 3: Sections</span>
            <h2>Selected Client Work & Projects</h2>
            <p>Filter projects by domain category and click any card for full-screen Lightbox preview.</p>
            
            <!-- Category Filter Buttons -->
            <div class="filter-buttons" id="filterButtons">
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="web">Web Apps</button>
                <button class="filter-btn" data-filter="mobile">Mobile UI</button>
                <button class="filter-btn" data-filter="branding">AI Branding</button>
            </div>
        </header>

        <!-- Gallery Grid -->
        <div class="gallery-grid" id="galleryGrid">
            <!-- 1 -->
            <div class="gallery-item" data-category="web">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="FinTech Dashboard">
                <div class="overlay">
                    <span class="tag">Web App</span>
                    <h3>FinTech Analytics Cloud</h3>
                </div>
            </div>

            <!-- 2 -->
            <div class="gallery-item" data-category="mobile">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80" alt="Mobile Crypto Wallet">
                <div class="overlay">
                    <span class="tag">Mobile UI</span>
                    <h3>CryptoVault iOS App</h3>
                </div>
            </div>

            <!-- 3 -->
            <div class="gallery-item" data-category="branding">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" alt="Generative 3D Mesh">
                <div class="overlay">
                    <span class="tag">AI Branding</span>
                    <h3>NeuroSynthetics Identity</h3>
                </div>
            </div>

            <!-- 4 -->
            <div class="gallery-item" data-category="web">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" alt="SaaS Marketing Portal">
                <div class="overlay">
                    <span class="tag">Web App</span>
                    <h3>Prism Studio Web App</h3>
                </div>
            </div>

            <!-- 5 -->
            <div class="gallery-item" data-category="mobile">
                <img src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop&q=80" alt="Smart Home App">
                <div class="overlay">
                    <span class="tag">Mobile UI</span>
                    <h3>Aura Smart Thermostat</h3>
                </div>
            </div>

            <!-- 6 -->
            <div class="gallery-item" data-category="branding">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80" alt="Hardware Brand">
                <div class="overlay">
                    <span class="tag">AI Branding</span>
                    <h3>Quantum Core Hardware</h3>
                </div>
            </div>
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div class="lightbox-modal hidden" id="lightboxModal">
        <button class="lightbox-close" id="closeLightbox">&times;</button>
        <div class="lightbox-content">
            <img src="" id="lightboxImg" alt="Preview">
            <h3 id="lightboxTitle">Title</h3>
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
    padding: 4rem 1.5rem;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
}

.section-header {
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
    margin-bottom: 0.6rem;
}

.section-header h2 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: #94a3b8;
    margin-bottom: 2rem;
}

.filter-buttons {
    display: inline-flex;
    background: #111827;
    border: 1px solid #1f2937;
    padding: 6px;
    border-radius: 12px;
    gap: 6px;
    flex-wrap: wrap;
}

.filter-btn {
    background: transparent;
    border: none;
    color: #9ca3af;
    padding: 8px 18px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-btn:hover { color: #f8fafc; }
.filter-btn.active {
    background: #6366f1;
    color: white;
}

/* Gallery Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
}

.gallery-item {
    position: relative;
    height: 260px;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #1f2937;
    transition: transform 0.3s ease;
}

.gallery-item.hidden {
    display: none;
}

.gallery-item:hover {
    transform: translateY(-6px);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.gallery-item:hover img {
    transform: scale(1.08);
}

.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
}

.tag {
    font-size: 0.75rem;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
}

.overlay h3 {
    font-size: 1.15rem;
}

/* Lightbox Modal */
.lightbox-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-modal.hidden { display: none; }

.lightbox-close {
    position: absolute;
    top: 24px;
    right: 32px;
    background: transparent;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
}

.lightbox-content {
    max-width: 800px;
    width: 90%;
    text-align: center;
}

.lightbox-content img {
    width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 14px;
    margin-bottom: 1rem;
}

.lightbox-content h3 { font-size: 1.4rem; }""",
        "script": """const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const src = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;

        lightboxImg.src = src;
        lightboxTitle.textContent = title;
        lightboxModal.classList.remove('hidden');
    });
});

closeLightbox.addEventListener('click', () => lightboxModal.classList.add('hidden'));
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
});"""
    }
}

# Add remaining Tier 3 projects: 31 to 38
tier3_projects.update({
    "31-vertical-roadmap-timeline": {
        "title": "31 - Vertical Roadmap Timeline",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>31 - Vertical Roadmap Timeline</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 31 • Level 3: Sections</span>
            <h2>Product Engineering Roadmap</h2>
            <p>Milestone progress timeline across architectural releases.</p>
        </header>

        <div class="timeline">
            <!-- Item 1 -->
            <div class="timeline-item left">
                <div class="timeline-dot completed"></div>
                <div class="timeline-content">
                    <span class="milestone-badge completed">✓ Q1 2026 • Released</span>
                    <h3>Distributed Edge Consensus</h3>
                    <p>Implemented zero-latency Raft consensus protocol across global regions with automated multi-master sync.</p>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="timeline-item right">
                <div class="timeline-dot active"></div>
                <div class="timeline-content">
                    <span class="milestone-badge active">⚡ Q2 2026 • In Progress</span>
                    <h3>Neural Query Cache Engine</h3>
                    <p>AI-driven prediction cache fetching anticipated query data before customer requests hit microservices.</p>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="timeline-item left">
                <div class="timeline-dot upcoming"></div>
                <div class="timeline-content">
                    <span class="milestone-badge upcoming">⏳ Q3 2026 • Planned</span>
                    <h3>Autonomous Disaster Recovery</h3>
                    <p>Self-healing cluster orchestration routing traffic around regional network degradation within 50ms.</p>
                </div>
            </div>

            <!-- Item 4 -->
            <div class="timeline-item right">
                <div class="timeline-dot upcoming"></div>
                <div class="timeline-content">
                    <span class="milestone-badge upcoming">⏳ Q4 2026 • Research</span>
                    <h3>Quantum-Resistant Encryption</h3>
                    <p>Deploying post-quantum lattice cryptography across all inter-service mesh tunnels.</p>
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
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 4rem 1.5rem;
}

.container {
    max-width: 850px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.badge {
    display: inline-block;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
}

.section-header h2 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.section-header p { color: #94a3b8; }

/* Timeline */
.timeline {
    position: relative;
    padding: 1rem 0;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #1f2937;
    transform: translateX(-50%);
}

@media (max-width: 768px) {
    .timeline::before { left: 24px; }
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 50%;
}

.timeline-item.left {
    left: 0;
    padding-right: 3rem;
}

.timeline-item.right {
    left: 50%;
    padding-left: 3rem;
}

@media (max-width: 768px) {
    .timeline-item { width: 100% !important; left: 0 !important; padding-left: 60px !important; padding-right: 0 !important; }
}

/* Dots */
.timeline-dot {
    position: absolute;
    top: 18px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #1e293b;
    border: 3px solid #080c15;
    z-index: 2;
}

.timeline-item.left .timeline-dot { right: -8px; }
.timeline-item.right .timeline-dot { left: -8px; }

@media (max-width: 768px) {
    .timeline-item .timeline-dot { left: 16px !important; }
}

.timeline-dot.completed { background: #10b981; box-shadow: 0 0 10px #10b981; }
.timeline-dot.active { background: #6366f1; box-shadow: 0 0 12px #6366f1; }
.timeline-dot.upcoming { background: #4b5563; }

.timeline-content {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 18px;
    padding: 1.8rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.milestone-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 0.8rem;
}

.milestone-badge.completed { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.milestone-badge.active { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
.milestone-badge.upcoming { background: rgba(107, 114, 128, 0.15); color: #9ca3af; }

.timeline-content h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
.timeline-content p { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; }""",
        "script": """console.log('Vertical roadmap timeline ready!');"""
    },

    "32-team-showcase-overlay": {
        "title": "32 - Team Member Showcase with Hover Overlay",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>32 - Team Showcase Overlay</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 32 • Level 3: Sections</span>
            <h2>Meet the Engineering Leadership</h2>
            <p>The architects driving the next generation of cloud developer experiences.</p>
        </header>

        <div class="team-grid">
            <!-- 1 -->
            <div class="team-card">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" alt="Sarah Connor">
                <div class="team-overlay">
                    <span class="team-role">Chief Architect</span>
                    <h3>Sarah Connor</h3>
                    <p class="team-bio">Former Distributed Systems Lead at CloudCore. Creator of 4 major open-source web frameworks.</p>
                    <div class="socials">
                        <a href="#">🐙</a>
                        <a href="#">🐦</a>
                        <a href="#">💼</a>
                    </div>
                </div>
            </div>

            <!-- 2 -->
            <div class="team-card">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" alt="Alex Rivera">
                <div class="team-overlay">
                    <span class="team-role">Head of Product</span>
                    <h3>Alex Rivera</h3>
                    <p class="team-bio">Passionate about intuitive developer telemetry and scalable developer tooling ecosystems.</p>
                    <div class="socials">
                        <a href="#">🐙</a>
                        <a href="#">🐦</a>
                        <a href="#">💼</a>
                    </div>
                </div>
            </div>

            <!-- 3 -->
            <div class="team-card">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" alt="Elena Chen">
                <div class="team-overlay">
                    <span class="team-role">VP of Security</span>
                    <h3>Elena Chen</h3>
                    <p class="team-bio">Cryptographic protocol researcher specializing in post-quantum cipher suites and zero-trust auth.</p>
                    <div class="socials">
                        <a href="#">🐙</a>
                        <a href="#">🐦</a>
                        <a href="#">💼</a>
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
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 4rem 1.5rem;
}

.container { max-width: 1000px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3.5rem; }
.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.section-header h2 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.section-header p { color: #94a3b8; }

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.team-card {
    position: relative;
    height: 380px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #1f2937;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.team-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.team-card:hover img {
    transform: scale(1.08);
}

.team-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8, 12, 21, 0.95) 0%, rgba(8, 12, 21, 0.4) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    transform: translateY(60px);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.team-card:hover .team-overlay {
    transform: translateY(0);
}

.team-role {
    font-size: 0.8rem;
    color: #38bdf8;
    text-transform: uppercase;
    font-weight: 800;
}

.team-overlay h3 {
    font-size: 1.4rem;
    margin: 0.2rem 0 0.6rem;
}

.team-bio {
    color: #cbd5e1;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
}

.team-card:hover .team-bio {
    opacity: 1;
}

.socials {
    display: flex;
    gap: 12px;
}

.socials a {
    text-decoration: none;
    font-size: 1.2rem;
    transition: transform 0.2s;
}

.socials a:hover { transform: scale(1.2); }""",
        "script": """console.log('Team showcase ready!');"""
    },

    "33-contact-section-floating-labels": {
        "title": "33 - Contact Us Section with Floating Label Form",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>33 - Contact Us Section</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 33 • Level 3: Sections</span>
            <h2>Let's Build Something Exceptional</h2>
            <p>Send an inquiry to our engineering team. All messages receive response within 24 hours.</p>
        </header>

        <div class="contact-grid">
            <!-- Info Column -->
            <div class="info-card">
                <h3>Contact Information</h3>
                <p>Reach out directly for enterprise architecture consultations.</p>
                <div class="info-items">
                    <div class="item">📍 100 Market St, San Francisco, CA</div>
                    <div class="item">📧 enterprise@novacloud.io</div>
                    <div class="item">📞 +1 (555) 389-4920</div>
                </div>
            </div>

            <!-- Floating Label Form -->
            <form class="form-card" id="contactForm">
                <div class="floating-group">
                    <input type="text" id="nameInput" placeholder=" " required>
                    <label for="nameInput">Your Full Name</label>
                </div>

                <div class="floating-group">
                    <input type="email" id="emailInput" placeholder=" " required>
                    <label for="emailInput">Business Email</label>
                </div>

                <div class="floating-group">
                    <textarea id="msgInput" rows="4" placeholder=" " required></textarea>
                    <label for="msgInput">Project Description / Question</label>
                </div>

                <button type="submit" class="btn-submit">Send Message →</button>
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
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container { max-width: 900px; width: 100%; }
.section-header { text-align: center; margin-bottom: 3.5rem; }
.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.section-header h2 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.section-header p { color: #94a3b8; }

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 2rem;
}

@media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; }
}

.info-card, .form-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.info-card h3 { font-size: 1.4rem; margin-bottom: 0.8rem; }
.info-card p { color: #94a3b8; line-height: 1.6; margin-bottom: 2rem; }
.info-items { display: flex; flex-direction: column; gap: 14px; color: #cbd5e1; font-weight: 600; }

/* Floating Labels */
.floating-group {
    position: relative;
    margin-bottom: 1.8rem;
}

.floating-group input, .floating-group textarea {
    width: 100%;
    background: #080c15;
    border: 1px solid #334155;
    border-radius: 10px;
    padding: 1rem 1rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

.floating-group input:focus, .floating-group textarea:focus {
    border-color: #6366f1;
}

.floating-group label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: #64748b;
    pointer-events: none;
    transition: all 0.2s ease;
}

.floating-group input:focus ~ label,
.floating-group input:not(:placeholder-shown) ~ label,
.floating-group textarea:focus ~ label,
.floating-group textarea:not(:placeholder-shown) ~ label {
    top: -10px;
    left: 10px;
    font-size: 0.75rem;
    background: #111827;
    padding: 0 6px;
    color: #818cf8;
    font-weight: 700;
}

.btn-submit {
    width: 100%;
    background: #6366f1;
    color: white;
    padding: 0.9rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
}

.btn-submit:hover { background: #4f46e5; }""",
        "script": """document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received.');
    e.target.reset();
});"""
    },

    "34-pricing-comparison-table": {
        "title": "34 - Pricing Comparison Matrix Table",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>34 - Pricing Comparison Table</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 34 • Level 3: Sections</span>
            <h2>Detailed Plan Feature Matrix</h2>
            <p>Compare capabilities across all three platform tiers.</p>
        </header>

        <div class="table-card">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th class="feature-col">Feature Matrix</th>
                        <th>Starter ($19/mo)</th>
                        <th class="highlight">Pro ($49/mo)</th>
                        <th>Enterprise ($149/mo)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="feature-title">Active Workspaces</td>
                        <td>5</td>
                        <td class="highlight">Unlimited</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td class="feature-title">Edge Bandwidth</td>
                        <td>100 GB</td>
                        <td class="highlight">1 TB</td>
                        <td>10 TB+ Custom</td>
                    </tr>
                    <tr>
                        <td class="feature-title">Multi-Region Failover</td>
                        <td>✕</td>
                        <td class="highlight">✓</td>
                        <td>✓</td>
                    </tr>
                    <tr>
                        <td class="feature-title">Custom Domains & SSL</td>
                        <td>1 Domain</td>
                        <td class="highlight">Unlimited</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td class="feature-title">SAML SSO & Audit Logs</td>
                        <td>✕</td>
                        <td class="highlight">✕</td>
                        <td>✓</td>
                    </tr>
                </tbody>
            </table>
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
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
}

.container { max-width: 950px; width: 100%; }
.section-header { text-align: center; margin-bottom: 3rem; }
.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.section-header h2 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.section-header p { color: #94a3b8; }

.table-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 20px;
    overflow-x: auto;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

.comparison-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.comparison-table th, .comparison-table td {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid #1f2937;
}

.comparison-table th {
    background: #0d1320;
    font-size: 1rem;
    color: #f8fafc;
}

.feature-col, .feature-title {
    text-align: left;
    font-weight: 600;
}

.highlight {
    background: rgba(99, 102, 241, 0.08);
    color: #38bdf8;
    font-weight: 700;
}

.comparison-table tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
}""",
        "script": """console.log('Pricing comparison matrix ready!');"""
    },

    "35-faq-searchable-section": {
        "title": "35 - FAQ Section with Live Search & Categories",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>35 - FAQ Searchable Section</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="section-header">
            <span class="badge">Question 35 • Level 3: Sections</span>
            <h2>Frequently Asked Questions</h2>
            <p>Have questions? Search our real-time knowledgebase below.</p>
            
            <div class="search-wrapper">
                <input type="text" id="faqSearch" placeholder="Type a keyword (e.g. pricing, latency, security)...">
            </div>
        </header>

        <div class="faq-list" id="faqList">
            <div class="faq-card">
                <h3>What is NovaCloud's latency SLA?</h3>
                <p>We guarantee P99 latency below 20ms across our top 50 metropolitan edge clusters.</p>
            </div>
            <div class="faq-card">
                <h3>How does billing and pricing scaling work?</h3>
                <p>You are billed based on monthly active workspace tiers. Extra bandwidth is charged at $0.05 per GB.</p>
            </div>
            <div class="faq-card">
                <h3>What security compliances are maintained?</h3>
                <p>NovaCloud is SOC2 Type II, ISO 27001, and HIPAA compliant with automated continuous auditing.</p>
            </div>
            <div class="faq-card">
                <h3>Can I migrate from AWS or Google Cloud?</h3>
                <p>Yes, we provide 1-click terraform and Docker container import scripts with zero downtime migration support.</p>
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
    padding: 4rem 1.5rem;
    display: flex;
    justify-content: center;
}

.container { max-width: 750px; width: 100%; }
.section-header { text-align: center; margin-bottom: 2.5rem; }
.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.section-header h2 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.section-header p { color: #94a3b8; margin-bottom: 1.5rem; }

.search-wrapper input {
    width: 100%;
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 12px;
    padding: 0.85rem 1.2rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.search-wrapper input:focus { border-color: #6366f1; }

.faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.faq-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 14px;
    padding: 1.5rem;
}

.faq-card h3 { font-size: 1.15rem; margin-bottom: 0.5rem; color: #f8fafc; }
.faq-card p { color: #94a3b8; line-height: 1.6; font-size: 0.95rem; }
.faq-card.hidden { display: none; }""",
        "script": """const search = document.getElementById('faqSearch');
const cards = document.querySelectorAll('.faq-card');

search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.classList.toggle('hidden', !text.includes(q));
    });
});"""
    },

    "36-modern-footer-newsletter": {
        "title": "36 - Modern Multi-Column Footer with Newsletter",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>36 - Modern Footer Newsletter</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="content-above">
        <span class="badge">Question 36 • Level 3: Sections</span>
        <h1>Scroll Down to View Footer</h1>
        <p>A production-ready responsive footer with email newsletter subscription and back-to-top button.</p>
    </div>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <!-- Brand & Newsletter -->
                <div class="footer-brand-col">
                    <div class="logo">⚡ NovaCloud</div>
                    <p>The developer platform for global distributed infrastructure.</p>
                    <form class="newsletter-form" id="newsForm">
                        <input type="email" placeholder="Enter your email..." required>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                <!-- Links 1 -->
                <div class="footer-links">
                    <h4>Product</h4>
                    <a href="#">Edge Compute</a>
                    <a href="#">Serverless DB</a>
                    <a href="#">Telemetry</a>
                    <a href="#">Pricing</a>
                </div>

                <!-- Links 2 -->
                <div class="footer-links">
                    <h4>Resources</h4>
                    <a href="#">Documentation</a>
                    <a href="#">API Reference</a>
                    <a href="#">Status Page</a>
                    <a href="#">Community</a>
                </div>

                <!-- Links 3 -->
                <div class="footer-links">
                    <h4>Company</h4>
                    <a href="#">About Us</a>
                    <a href="#">Careers (We're Hiring!)</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>

            <div class="footer-bottom">
                <span>© 2026 NovaCloud Technologies, Inc. All rights reserved.</span>
                <button class="back-to-top" id="topBtn">↑ Back to Top</button>
            </div>
        </div>
    </footer>
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
    min-height: 120vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content-above {
    text-align: center;
    padding: 6rem 1.5rem;
}

.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.content-above h1 { font-size: 2.2rem; margin-bottom: 0.5rem; }
.content-above p { color: #94a3b8; }

.footer {
    background: #0d1320;
    border-top: 1px solid #1f2937;
    padding: 4rem 1.5rem 2rem;
}

.footer-container { max-width: 1100px; margin: 0 auto; }

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
}

@media (max-width: 860px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
}

.footer-brand-col .logo { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.6rem; }
.footer-brand-col p { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem; max-width: 320px; }

.newsletter-form {
    display: flex;
    gap: 6px;
    max-width: 340px;
}

.newsletter-form input {
    flex: 1;
    background: #111827;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    color: white;
    font-family: inherit;
    font-size: 0.85rem;
    outline: none;
}

.newsletter-form button {
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-weight: 700;
    cursor: pointer;
}

.footer-links h4 { font-size: 0.95rem; margin-bottom: 1rem; color: #f8fafc; }
.footer-links a { display: block; color: #94a3b8; text-decoration: none; font-size: 0.88rem; margin-bottom: 0.6rem; transition: color 0.2s; }
.footer-links a:hover { color: #38bdf8; }

.footer-bottom {
    border-top: 1px solid #1f2937;
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #64748b;
    font-size: 0.85rem;
}

.back-to-top {
    background: transparent;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 4px 12px;
    border-radius: 6px;
    cursor: pointer;
}

.back-to-top:hover { color: white; border-color: #6366f1; }""",
        "script": """document.getElementById('newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscribed to newsletter!');
    e.target.reset();
});

document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});"""
    },

    "37-cta-banner-particles": {
        "title": "37 - CTA Banner with Canvas Particle Network",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>37 - CTA Banner Particles</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 37 • Level 3: Sections</span>
        </header>

        <div class="cta-card">
            <!-- Canvas Particle Network -->
            <canvas id="particleCanvas"></canvas>

            <div class="cta-content">
                <span class="pill">⚡ Ready to Scale?</span>
                <h2>Start Building with NovaCloud Today</h2>
                <p>Join thousands of high-velocity teams deploying distributed edge applications with zero devops friction.</p>
                <div class="actions">
                    <button class="btn btn-primary">Deploy Your First Service 🚀</button>
                    <button class="btn btn-secondary">Schedule Architecture Call</button>
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
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    padding: 3rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container { max-width: 1000px; width: 100%; }
.header { text-align: center; margin-bottom: 1rem; }
.badge { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }

.cta-card {
    position: relative;
    background: #111827;
    border: 1px solid #312e81;
    border-radius: 24px;
    padding: 4rem 2rem;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.cta-content {
    position: relative;
    z-index: 2;
    max-width: 650px;
    margin: 0 auto;
}

.pill {
    background: rgba(99, 102, 241, 0.2);
    color: #c7d2fe;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 1rem;
}

.cta-content h2 {
    font-size: 2.6rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.cta-content p {
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
}

.btn {
    padding: 0.85rem 1.8rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-primary { background: #6366f1; color: white; }
.btn-primary:hover { background: #4f46e5; transform: scale(1.03); }
.btn-secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px); }
.btn-secondary:hover { background: rgba(255, 255, 255, 0.2); }""",
        "script": """const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 45;

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 110})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();"""
    },

    "38-sticky-navbar-scroll-progress": {
        "title": "38 - Sticky Navbar with Scroll Progress Bar & Mega Menu",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>38 - Sticky Navbar & Scroll Progress</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Scroll Progress Indicator Bar -->
    <div class="scroll-progress-bar" id="progressBar"></div>

    <!-- Sticky Glass Navbar -->
    <header class="sticky-nav">
        <div class="nav-brand">⚡ NovaSticky</div>
        <nav class="nav-items">
            <a href="#section1">Introduction</a>
            <a href="#section2">Features</a>
            <a href="#section3">Architecture</a>
            <a href="#section4">Deployment</a>
        </nav>
        <button class="btn-cta">Sign Up</button>
    </header>

    <!-- Page Demo Sections -->
    <main class="content">
        <section id="section1" class="page-sec">
            <h2>01. Introduction & Overview</h2>
            <p>Watch the top progress bar move as you scroll through each section.</p>
        </section>
        <section id="section2" class="page-sec">
            <h2>02. Core Platform Features</h2>
            <p>Notice the navbar background blur glassmorphism sticking smoothly to the top of your viewport.</p>
        </section>
        <section id="section3" class="page-sec">
            <h2>03. Distributed Edge Architecture</h2>
            <p>State is synchronized globally using Raft consensus and neural caching.</p>
        </section>
        <section id="section4" class="page-sec">
            <h2>04. Zero-Config Deployment</h2>
            <p>Push to Git and your edge workers deploy automatically to 300+ edge locations.</p>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    background: #080c15;
    color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Scroll Progress Bar */
.scroll-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    width: 0%;
    background: linear-gradient(90deg, #6366f1, #38bdf8);
    z-index: 9999;
    transition: width 0.1s;
}

/* Sticky Glass Navbar */
.sticky-nav {
    position: sticky;
    top: 0;
    background: rgba(13, 19, 32, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
}

.nav-brand { font-size: 1.3rem; font-weight: 800; }
.nav-items { display: flex; gap: 24px; }
.nav-items a { color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: color 0.2s; }
.nav-items a:hover { color: #38bdf8; }

.btn-cta {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
}

/* Content Sections */
.content { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
.page-sec {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #1f2937;
}
.page-sec h2 { font-size: 2.2rem; margin-bottom: 1rem; color: #38bdf8; }
.page-sec p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; }""",
        "script": """const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${scrollPercent}%`;
});"""
    }
})

for folder, data in tier3_projects.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    with open(os.path.join(folder_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(data["html"])
    with open(os.path.join(folder_path, "style.css"), "w", encoding="utf-8") as f:
        f.write(data["css"])
    with open(os.path.join(folder_path, "script.js"), "w", encoding="utf-8") as f:
        f.write(data["script"])
    print(f"Created {folder} (3 files)")

print("Tier 3 generation complete!")
