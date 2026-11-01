import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

tier4_projects = {
    "39-developer-portfolio-webpage": {
        "title": "39 - Personal Developer Portfolio Webpage",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>39 - Developer Portfolio Webpage</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navigation -->
    <header class="navbar">
        <div class="logo">&lt;Alex.Dev /&gt;</div>
        <nav class="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
        <button class="btn btn-primary" id="hireMeBtn">Hire Me</button>
    </header>

    <!-- Hero Section with Terminal -->
    <section class="hero-section">
        <div class="hero-info">
            <span class="badge">Available for full-time & consulting roles</span>
            <h1>Full-Stack Systems & UI Engineer</h1>
            <p>I architect distributed cloud backend systems and craft high-performance, accessible user interfaces.</p>
            <div class="hero-btns">
                <a href="#projects" class="btn btn-primary">View Projects →</a>
                <a href="#contact" class="btn btn-secondary">Get in Touch</a>
            </div>
        </div>

        <div class="terminal-card">
            <div class="terminal-header">
                <span class="t-btn red"></span>
                <span class="t-btn yellow"></span>
                <span class="t-btn green"></span>
                <span class="t-title">alex@macbook: ~</span>
            </div>
            <div class="terminal-body">
                <p><span class="prompt">$</span> alex.currentFocus</p>
                <p class="t-out">"Distributed Cloud Microservices & WebGL"</p>
                <p><span class="prompt">$</span> alex.skills</p>
                <p class="t-out">["TypeScript", "React", "Node.js", "Docker", "PostgreSQL"]</p>
                <p><span class="prompt">$</span> alex.status</p>
                <p class="t-out highlight">"Ready to build next-gen software 🚀"</p>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
        <h2 class="sec-title">Core Technical Expertise</h2>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-info">
                    <span>Frontend (React / TypeScript / CSS3)</span>
                    <strong>95%</strong>
                </div>
                <div class="skill-track"><div class="skill-fill" style="width: 95%;"></div></div>
            </div>
            <div class="skill-card">
                <div class="skill-info">
                    <span>Backend (Node.js / Express / REST / GraphQL)</span>
                    <strong>90%</strong>
                </div>
                <div class="skill-track"><div class="skill-fill" style="width: 90%;"></div></div>
            </div>
            <div class="skill-card">
                <div class="skill-info">
                    <span>DevOps (Docker / Kubernetes / AWS)</span>
                    <strong>85%</strong>
                </div>
                <div class="skill-track"><div class="skill-fill" style="width: 85%;"></div></div>
            </div>
            <div class="skill-card">
                <div class="skill-info">
                    <span>Databases (PostgreSQL / Redis / MongoDB)</span>
                    <strong>88%</strong>
                </div>
                <div class="skill-track"><div class="skill-fill" style="width: 88%;"></div></div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
        <h2 class="sec-title">Featured Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Telemetry Platform">
                <div class="project-content">
                    <h3>NovaCloud Telemetry</h3>
                    <p>Real-time distributed tracing platform handling over 5M telemetry events per second.</p>
                    <div class="tags">
                        <span>TypeScript</span>
                        <span>Node.js</span>
                        <span>Redis</span>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" alt="Generative 3D">
                <div class="project-content">
                    <h3>Generative 3D Canvas</h3>
                    <p>WebGL algorithmic particle canvas rendering interactive neural network visualizations.</p>
                    <div class="tags">
                        <span>JavaScript</span>
                        <span>WebGL</span>
                        <span>CSS3</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="contact-box">
            <h2>Let's Collaborate</h2>
            <p>Have an exciting project or looking for engineering leadership? Let's talk.</p>
            <form id="portfolioContact">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea rows="3" placeholder="Message..." required></textarea>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </section>

    <footer class="footer">
        <p>© 2026 Alex Morgan. Built with semantic HTML5, modern CSS, and vanilla JS.</p>
    </footer>

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

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    background: rgba(8, 12, 21, 0.9);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #1f2937;
}

.logo {
    font-family: 'Fira Code', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: #38bdf8;
}

.nav-links { display: flex; gap: 24px; }
.nav-links a { color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 0.95rem; }
.nav-links a:hover { color: #38bdf8; }

.btn {
    padding: 0.75rem 1.6rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
}

.btn-primary { background: #6366f1; color: white; }
.btn-primary:hover { background: #4f46e5; }
.btn-secondary { background: #111827; color: #cbd5e1; border: 1px solid #334155; }
.btn-secondary:hover { background: #1e293b; }

/* Hero */
.hero-section {
    max-width: 1100px;
    margin: 4rem auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: center;
}

@media (max-width: 860px) {
    .hero-section { grid-template-columns: 1fr; }
    .nav-links { display: none; }
}

.badge {
    display: inline-block;
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 1.2rem;
}

.hero-info h1 { font-size: 2.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; }
.hero-info p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
.hero-btns { display: flex; gap: 12px; }

/* Terminal Card */
.terminal-card {
    background: #04060a;
    border: 1px solid #1f2937;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.terminal-header {
    background: #0e1422;
    padding: 0.8rem 1rem;
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid #1f2937;
}

.t-btn { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #22c55e; }
.t-title { margin-left: auto; font-family: 'Fira Code', monospace; font-size: 0.75rem; color: #64748b; }

.terminal-body {
    padding: 1.5rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.7;
}

.prompt { color: #22c55e; margin-right: 6px; }
.t-out { color: #38bdf8; margin-bottom: 0.75rem; }
.t-out.highlight { color: #a855f7; }

/* Sections */
.section { max-width: 1100px; margin: 6rem auto; padding: 0 1.5rem; }
.sec-title { font-size: 2rem; font-weight: 800; margin-bottom: 2.5rem; text-align: center; }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.skill-card { background: #111827; border: 1px solid #1f2937; padding: 1.4rem; border-radius: 14px; }
.skill-info { display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.9rem; font-weight: 600; }
.skill-track { height: 8px; background: #1f2937; border-radius: 999px; overflow: hidden; }
.skill-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #38bdf8); border-radius: 999px; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
.project-card { background: #111827; border: 1px solid #1f2937; border-radius: 18px; overflow: hidden; }
.project-card img { width: 100%; height: 200px; object-fit: cover; }
.project-content { padding: 1.5rem; }
.project-content h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
.project-content p { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.2rem; }
.tags { display: flex; gap: 6px; }
.tags span { background: #080c15; border: 1px solid #334155; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; color: #38bdf8; }

.contact-box { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 3rem 2rem; max-width: 600px; margin: 0 auto; text-align: center; }
.contact-box h2 { font-size: 2rem; margin-bottom: 0.5rem; }
.contact-box p { color: #94a3b8; margin-bottom: 2rem; }
.contact-box form { display: flex; flex-direction: column; gap: 12px; }
.contact-box input, .contact-box textarea { width: 100%; background: #080c15; border: 1px solid #334155; border-radius: 8px; padding: 0.8rem; color: white; font-family: inherit; }

.footer { text-align: center; padding: 3rem 1.5rem; border-top: 1px solid #1f2937; color: #64748b; font-size: 0.85rem; }""",
        "script": """document.getElementById('portfolioContact').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Alex will reply to your message shortly.');
    e.target.reset();
});

document.getElementById('hireMeBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});"""
    },

    "40-saas-landing-page": {
        "title": "40 - Complete SaaS Landing Page",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>40 - OmniFlow AI SaaS Landing Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navbar -->
    <header class="navbar">
        <div class="logo">⚡ OmniFlow AI</div>
        <nav class="nav-links">
            <a href="#features">Features</a>
            <a href="#stats">Stats</a>
            <a href="#pricing">Pricing</a>
        </nav>
        <button class="btn btn-primary">Start Free Trial</button>
    </header>

    <!-- Hero -->
    <section class="hero">
        <div class="badge">🚀 v2.5 Release • Autonomous AI Pipelines</div>
        <h1>Automate Workflow Logic with Autonomous AI Agents</h1>
        <p>OmniFlow orchestrates data extraction, document reasoning, and cross-platform API actions automatically.</p>
        <div class="hero-actions">
            <button class="btn btn-primary">Get Started in 60 Seconds</button>
            <button class="btn btn-secondary">Book Enterprise Demo</button>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="section">
        <h2 class="sec-title">Enterprise-Grade Automation</h2>
        <div class="features-grid">
            <div class="f-card">
                <span class="f-icon">🧠</span>
                <h3>Neural Agent Swarms</h3>
                <p>Deploy specialized multi-agent workflows that review, refactor, and verify results collaboratively.</p>
            </div>
            <div class="f-card">
                <span class="f-icon">⚡</span>
                <h3>Instant API Triggers</h3>
                <p>Connect 200+ integrations including GitHub, Jira, Salesforce, and AWS with 1-click authentication.</p>
            </div>
            <div class="f-card">
                <span class="f-icon">🛡️</span>
                <h3>Zero-Data Retention</h3>
                <p>Enterprise SOC2 Type II security with private self-hosted VPC deployment capabilities.</p>
            </div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="section">
        <h2 class="sec-title">Simple Transparent Pricing</h2>
        <div class="pricing-grid">
            <div class="p-card">
                <h3>Starter</h3>
                <div class="price">$29<span>/mo</span></div>
                <p>For individuals & small teams</p>
                <button class="btn btn-secondary">Select Plan</button>
            </div>
            <div class="p-card featured">
                <div class="popular">POPULAR</div>
                <h3>Growth</h3>
                <div class="price">$99<span>/mo</span></div>
                <p>For fast-scaling engineering teams</p>
                <button class="btn btn-primary">Start 14-Day Free Trial</button>
            </div>
        </div>
    </section>

    <footer class="footer">
        <p>© 2026 OmniFlow Technologies, Inc. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 3rem; background: rgba(8,12,21,0.9); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100; border-bottom: 1px solid #1f2937; }
.logo { font-size: 1.3rem; font-weight: 800; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: #94a3b8; text-decoration: none; font-weight: 600; }
.nav-links a:hover { color: #38bdf8; }
.btn { padding: 0.75rem 1.6rem; border-radius: 10px; font-weight: 700; cursor: pointer; border: none; }
.btn-primary { background: #6366f1; color: white; }
.btn-primary:hover { background: #4f46e5; }
.btn-secondary { background: #111827; color: #f8fafc; border: 1px solid #334155; }
.hero { text-align: center; padding: 6rem 1.5rem; max-width: 850px; margin: 0 auto; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 4px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.5rem; }
.hero h1 { font-size: 3.2rem; font-weight: 800; line-height: 1.15; margin-bottom: 1.2rem; }
.hero p { color: #94a3b8; font-size: 1.15rem; line-height: 1.6; margin-bottom: 2.5rem; }
.hero-actions { display: flex; justify-content: center; gap: 14px; }
.section { max-width: 1050px; margin: 4rem auto; padding: 0 1.5rem; }
.sec-title { font-size: 2.2rem; text-align: center; margin-bottom: 3rem; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.f-card { background: #111827; border: 1px solid #1f2937; border-radius: 18px; padding: 2rem; }
.f-icon { font-size: 2rem; display: block; margin-bottom: 1rem; }
.f-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
.f-card p { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 700px; margin: 0 auto; }
.p-card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 2.5rem; text-align: center; position: relative; }
.p-card.featured { border-color: #6366f1; box-shadow: 0 0 30px rgba(99,102,241,0.25); }
.popular { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #6366f1; font-size: 0.75rem; font-weight: 800; padding: 3px 12px; border-radius: 999px; }
.price { font-size: 2.8rem; font-weight: 800; color: #38bdf8; margin: 1rem 0 0.3rem; }
.price span { font-size: 1rem; color: #64748b; }
.p-card p { color: #94a3b8; margin-bottom: 1.5rem; font-size: 0.9rem; }
.p-card .btn { width: 100%; }
.footer { text-align: center; padding: 3rem; border-top: 1px solid #1f2937; color: #64748b; font-size: 0.85rem; margin-top: 4rem; }""",
        "script": """console.log('OmniFlow SaaS Landing page loaded successfully!');"""
    },

    "41-ecommerce-product-catalog-cart": {
        "title": "41 - E-Commerce Product Catalog & Cart Drawer",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>41 - E-Commerce Store & Cart</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Top Nav -->
    <header class="navbar">
        <div class="logo">🛍️ CyberStore</div>
        <button class="cart-btn" id="openCartBtn">
            <span>🛒 Cart</span>
            <span class="cart-count" id="cartCount">0</span>
        </button>
    </header>

    <main class="container">
        <!-- Products Grid -->
        <h1 class="page-title">Featured Tech Hardware</h1>
        <div class="products-grid" id="productsGrid">
            <!-- 1 -->
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80" alt="Smart Watch">
                <div class="p-body">
                    <h3>CyberPulse Smartwatch</h3>
                    <div class="p-price">$199.00</div>
                    <button class="btn btn-add" data-id="1" data-title="CyberPulse Smartwatch" data-price="199">Add to Cart</button>
                </div>
            </div>
            <!-- 2 -->
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Headphones">
                <div class="p-body">
                    <h3>Studio Max Wireless ANC</h3>
                    <div class="p-price">$349.00</div>
                    <button class="btn btn-add" data-id="2" data-title="Studio Max Wireless ANC" data-price="349">Add to Cart</button>
                </div>
            </div>
            <!-- 3 -->
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80" alt="Camera">
                <div class="p-body">
                    <h3>RetroLens Classic 35mm</h3>
                    <div class="p-price">$489.00</div>
                    <button class="btn btn-add" data-id="3" data-title="RetroLens Classic 35mm" data-price="489">Add to Cart</button>
                </div>
            </div>
        </div>
    </main>

    <!-- Slide-out Cart Drawer -->
    <div class="cart-drawer" id="cartDrawer">
        <div class="cart-header">
            <h3>Your Shopping Cart</h3>
            <button class="close-cart" id="closeCartBtn">&times;</button>
        </div>
        <div class="cart-items" id="cartItems">
            <p class="empty-cart-msg">Your shopping bag is empty.</p>
        </div>
        <div class="cart-footer">
            <div class="total-row">
                <span>Subtotal:</span>
                <strong id="cartSubtotal">$0.00</strong>
            </div>
            <button class="btn btn-checkout" id="checkoutBtn">Proceed to Checkout →</button>
        </div>
    </div>
    <div class="drawer-backdrop" id="cartBackdrop"></div>

    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 3rem; background: #111827; border-bottom: 1px solid #1f2937; }
.logo { font-size: 1.3rem; font-weight: 800; }
.cart-btn { background: #6366f1; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.cart-count { background: #ef4444; color: white; font-size: 0.75rem; padding: 2px 6px; border-radius: 999px; }

.container { max-width: 1050px; margin: 3rem auto; padding: 0 1.5rem; }
.page-title { font-size: 2.2rem; margin-bottom: 2rem; text-align: center; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.p-card { background: #111827; border: 1px solid #1f2937; border-radius: 18px; overflow: hidden; }
.p-card img { width: 100%; height: 200px; object-fit: cover; }
.p-body { padding: 1.5rem; }
.p-body h3 { font-size: 1.15rem; margin-bottom: 0.4rem; }
.p-price { font-size: 1.3rem; font-weight: 800; color: #38bdf8; margin-bottom: 1rem; }
.btn { width: 100%; padding: 0.75rem; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; }
.btn-add { background: #1e293b; color: #f8fafc; border: 1px solid #334155; }
.btn-add:hover { background: #6366f1; border-color: #6366f1; }

/* Cart Drawer */
.cart-drawer { position: fixed; top: 0; right: -380px; width: 380px; height: 100vh; background: #111827; border-left: 1px solid #1f2937; z-index: 200; display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; transition: right 0.35s ease; }
.cart-drawer.open { right: 0; }
.cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f2937; padding-bottom: 1rem; }
.close-cart { background: transparent; border: none; color: #94a3b8; font-size: 1.8rem; cursor: pointer; }
.cart-items { flex: 1; overflow-y: auto; padding: 1rem 0; }
.cart-item-row { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid #1f2937; }
.cart-footer { border-top: 1px solid #1f2937; padding-top: 1rem; }
.total-row { display: flex; justify-content: space-between; font-size: 1.2rem; margin-bottom: 1rem; }
.total-row strong { color: #38bdf8; }
.btn-checkout { background: #10b981; color: white; }
.drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 199; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
.drawer-backdrop.open { opacity: 1; pointer-events: auto; }""",
        "script": """let cart = [];
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function toggleDrawer(open) {
    cartDrawer.classList.toggle('open', open);
    cartBackdrop.classList.toggle('open', open);
}

openCartBtn.addEventListener('click', () => toggleDrawer(true));
closeCartBtn.addEventListener('click', () => toggleDrawer(false));
cartBackdrop.addEventListener('click', () => toggleDrawer(false));

document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const title = btn.dataset.title;
        const price = parseFloat(btn.dataset.price);

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ id, title, price, qty: 1 });
        }
        renderCart();
        toggleDrawer(true);
    });
});

function renderCart() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    cartCount.textContent = totalQty;
    cartSubtotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your shopping bag is empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map((item, idx) => `
        <div class="cart-item-row">
            <div>
                <strong>${item.title}</strong>
                <div style="color: #94a3b8; font-size: 0.85rem;">$${item.price} x ${item.qty}</div>
            </div>
            <button onclick="removeItem(${idx})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">Remove</button>
        </div>
    `).join('');
}

window.removeItem = function(idx) {
    cart.splice(idx, 1);
    renderCart();
};

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Simulated checkout complete.');
    cart = [];
    renderCart();
    toggleDrawer(false);
});"""
    }
}

# Add questions 42 to 50
tier4_projects.update({
    "42-recipe-finder-webpage": {
        "title": "42 - Recipe Finder & Culinary Blog Webpage",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>42 - Gourmet Recipe Finder</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 42 • Level 4: Complete Webpage</span>
            <h1>Gourmet Recipe Finder</h1>
            <p>Search delicious culinary dishes with real-time dietary filter pills.</p>
            <div class="search-bar">
                <input type="text" id="recipeSearch" placeholder="Search recipes (e.g. Avocado, Salmon, Pasta)...">
            </div>
        </header>

        <div class="recipes-grid" id="recipesGrid">
            <div class="r-card">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80" alt="Avocado Bowl">
                <div class="r-info">
                    <span class="r-cat">Breakfast • 15 Mins</span>
                    <h3>Avocado & Quinoa Power Bowl</h3>
                    <p>Nutrient-dense superfood bowl loaded with fresh avocado slices and lime dressing.</p>
                </div>
            </div>
            <div class="r-card">
                <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80" alt="Grilled Salmon">
                <div class="r-info">
                    <span class="r-cat">Dinner • 25 Mins</span>
                    <h3>Pan-Seared Atlantic Salmon</h3>
                    <p>Crispy skin salmon fillet served on a bed of roasted asparagus and lemon herb butter.</p>
                </div>
            </div>
            <div class="r-card">
                <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80" alt="Berry Parfait">
                <div class="r-info">
                    <span class="r-cat">Dessert • 10 Mins</span>
                    <h3>Wild Berry Greek Yogurt Parfait</h3>
                    <p>Layered organic honey granola with fresh raspberries, blueberries, and mint leaves.</p>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 3rem 1.5rem; }
.container { max-width: 1050px; margin: 0 auto; }
.header { text-align: center; margin-bottom: 3rem; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.header h1 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.header p { color: #94a3b8; margin-bottom: 1.5rem; }
.search-bar input { width: 100%; max-width: 500px; background: #111827; border: 1px solid #334155; border-radius: 12px; padding: 0.85rem 1.2rem; color: white; font-family: inherit; font-size: 1rem; outline: none; }
.search-bar input:focus { border-color: #6366f1; }
.recipes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.r-card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; }
.r-card img { width: 100%; height: 220px; object-fit: cover; }
.r-info { padding: 1.5rem; }
.r-cat { color: #38bdf8; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
.r-info h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
.r-info p { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; }
.r-card.hidden { display: none; }""",
        "script": """const search = document.getElementById('recipeSearch');
const cards = document.querySelectorAll('.r-card');

search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.classList.toggle('hidden', !text.includes(q));
    });
});"""
    },

    "43-kanban-task-board": {
        "title": "43 - Interactive Kanban Task Board",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>43 - Kanban Task Board</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="kanban-app">
        <header class="top-bar">
            <h1>📋 Sprint Kanban Board</h1>
            <button class="btn btn-primary" id="addTaskBtn">+ Add New Task</button>
        </header>

        <div class="board-columns">
            <!-- Col 1 -->
            <div class="kanban-col" data-status="todo">
                <div class="col-header">
                    <span>To Do</span>
                    <span class="count" id="todoCount">2</span>
                </div>
                <div class="tasks-list" id="todoList">
                    <div class="task-card" draggable="true">
                        <span class="p-tag high">High</span>
                        <h4>Implement OAuth2 Login</h4>
                        <p>Configure JWT token refreshing on edge gateway.</p>
                    </div>
                    <div class="task-card" draggable="true">
                        <span class="p-tag med">Medium</span>
                        <h4>Design Hero Section</h4>
                        <p>Create high fidelity mockup with WebGL background.</p>
                    </div>
                </div>
            </div>

            <!-- Col 2 -->
            <div class="kanban-col" data-status="inprogress">
                <div class="col-header">
                    <span>In Progress</span>
                    <span class="count" id="progCount">1</span>
                </div>
                <div class="tasks-list" id="progList">
                    <div class="task-card" draggable="true">
                        <span class="p-tag high">High</span>
                        <h4>Raft Consensus Testing</h4>
                        <p>Simulate node network partitions across regions.</p>
                    </div>
                </div>
            </div>

            <!-- Col 3 -->
            <div class="kanban-col" data-status="done">
                <div class="col-header">
                    <span>Done</span>
                    <span class="count" id="doneCount">1</span>
                </div>
                <div class="tasks-list" id="doneList">
                    <div class="task-card" draggable="true">
                        <span class="p-tag low">Low</span>
                        <h4>Update Documentation</h4>
                        <p>Write API endpoints specs for v2.4 release.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 2rem; }
.kanban-app { max-width: 1200px; margin: 0 auto; }
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #1f2937; padding-bottom: 1.5rem; }
.top-bar h1 { font-size: 1.8rem; }
.btn-primary { background: #6366f1; color: white; border: none; padding: 0.75rem 1.4rem; border-radius: 8px; font-weight: 700; cursor: pointer; }

.board-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
@media (max-width: 768px) { .board-columns { grid-template-columns: 1fr; } }

.kanban-col { background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 1.2rem; min-height: 480px; display: flex; flex-direction: column; }
.col-header { display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1f2937; }
.count { background: #1e293b; color: #38bdf8; padding: 2px 8px; border-radius: 999px; font-size: 0.8rem; }

.tasks-list { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.task-card { background: #080c15; border: 1px solid #334155; border-radius: 10px; padding: 1rem; cursor: grab; }
.task-card:active { cursor: grabbing; opacity: 0.6; }
.p-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 0.4rem; }
.p-tag.high { background: rgba(239,68,68,0.2); color: #ef4444; }
.p-tag.med { background: rgba(245,158,11,0.2); color: #f59e0b; }
.p-tag.low { background: rgba(34,197,94,0.2); color: #22c55e; }
.task-card h4 { font-size: 0.95rem; margin-bottom: 0.3rem; }
.task-card p { color: #94a3b8; font-size: 0.85rem; }""",
        "script": """let draggedItem = null;

function attachDragEvents() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('dragstart', () => {
            draggedItem = card;
            setTimeout(() => card.style.display = 'none', 0);
        });

        card.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });
}

document.querySelectorAll('.tasks-list').forEach(list => {
    list.addEventListener('dragover', (e) => e.preventDefault());
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
            list.appendChild(draggedItem);
        }
    });
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.innerHTML = `
        <span class="p-tag med">Medium</span>
        <h4>${title}</h4>
        <p>New task created from board.</p>
    `;
    document.getElementById('todoList').appendChild(card);
    attachDragEvents();
});

attachDragEvents();"""
    },

    "44-weather-forecast-dashboard": {
        "title": "44 - Weather Forecast Dashboard Web App",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>44 - Weather Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 44 • Level 4: Complete Webpage</span>
            <h1>Global Meteorological Dashboard</h1>
            <div class="search-box">
                <input type="text" id="cityInput" placeholder="Search city (e.g. San Francisco, Tokyo, London)...">
                <button id="searchCityBtn">Search</button>
            </div>
        </header>

        <!-- Current Weather Card -->
        <div class="current-card">
            <div class="c-left">
                <h2 id="cityName">San Francisco, US</h2>
                <div class="c-temp" id="tempVal">19°C</div>
                <div class="c-condition" id="condVal">Partly Cloudy</div>
            </div>
            <div class="c-right">
                <div class="weather-icon" id="weatherIcon">⛅</div>
                <div class="details">
                    <span>Humidity: <strong id="humVal">68%</strong></span>
                    <span>Wind: <strong id="windVal">14 km/h</strong></span>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 4rem 1.5rem; display: flex; justify-content: center; }
.container { max-width: 650px; width: 100%; }
.header { text-align: center; margin-bottom: 2.5rem; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.header h1 { font-size: 2.2rem; margin-bottom: 1.5rem; }
.search-box { display: flex; gap: 8px; justify-content: center; }
.search-box input { flex: 1; max-width: 360px; background: #111827; border: 1px solid #334155; border-radius: 10px; padding: 0.75rem 1rem; color: white; outline: none; }
.search-box button { background: #6366f1; color: white; border: none; padding: 0.75rem 1.4rem; border-radius: 10px; font-weight: 700; cursor: pointer; }

.current-card { background: #111827; border: 1px solid #1f2937; border-radius: 24px; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.c-left h2 { font-size: 1.6rem; margin-bottom: 0.5rem; }
.c-temp { font-size: 3.5rem; font-weight: 800; color: #38bdf8; }
.c-condition { color: #94a3b8; font-weight: 600; }
.weather-icon { font-size: 4rem; text-align: right; margin-bottom: 0.5rem; }
.details { display: flex; flex-direction: column; gap: 4px; color: #cbd5e1; font-size: 0.85rem; text-align: right; }""",
        "script": """const cities = {
    'san francisco': { temp: '19°C', cond: 'Partly Cloudy', icon: '⛅', hum: '68%', wind: '14 km/h', name: 'San Francisco, US' },
    'tokyo': { temp: '26°C', cond: 'Sunny & Clear', icon: '☀️', hum: '52%', wind: '8 km/h', name: 'Tokyo, JP' },
    'london': { temp: '14°C', cond: 'Light Rain', icon: '🌧️', hum: '84%', wind: '22 km/h', name: 'London, UK' }
};

document.getElementById('searchCityBtn').addEventListener('click', () => {
    const q = document.getElementById('cityInput').value.trim().toLowerCase();
    if (cities[q]) {
        const c = cities[q];
        document.getElementById('cityName').textContent = c.name;
        document.getElementById('tempVal').textContent = c.temp;
        document.getElementById('condVal').textContent = c.cond;
        document.getElementById('weatherIcon').textContent = c.icon;
        document.getElementById('humVal').textContent = c.hum;
        document.getElementById('windVal').textContent = c.wind;
    } else {
        alert('City not found in mock database. Try "Tokyo", "London", or "San Francisco".');
    }
});"""
    },

    "45-music-player-webpage": {
        "title": "45 - Music & Podcast Audio Player Webpage",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>45 - Cyber Audio Player</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="player-card">
        <div class="album-art-box">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" class="album-disc" id="albumDisc" alt="Album Cover">
        </div>

        <div class="track-info">
            <h2 id="songTitle">Cybernetic Dreamscape</h2>
            <p id="artistName">Nova Synthetics • Synthwave 2026</p>
        </div>

        <div class="progress-container">
            <div class="progress-bar-bg" id="progressTrack">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="time-stamps">
                <span id="currentTime">1:24</span>
                <span id="totalTime">3:45</span>
            </div>
        </div>

        <div class="player-controls">
            <button class="ctrl-btn" id="prevSong">⏮</button>
            <button class="ctrl-btn play-btn" id="playBtn">▶</button>
            <button class="ctrl-btn" id="nextSong">⏭</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 2rem; }
.player-card { background: #111827; border: 1px solid #1f2937; border-radius: 24px; padding: 2.5rem; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 45px rgba(0,0,0,0.5); }
.album-art-box { position: relative; width: 180px; height: 180px; margin: 0 auto 2rem; }
.album-disc { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid #1f2937; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transition: transform 0.1s linear; }
.album-disc.rotating { animation: spin 8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.track-info h2 { font-size: 1.3rem; margin-bottom: 0.3rem; }
.track-info p { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; }

.progress-container { margin-bottom: 1.5rem; }
.progress-bar-bg { width: 100%; height: 6px; background: #1e293b; border-radius: 999px; cursor: pointer; overflow: hidden; }
.progress-fill { width: 35%; height: 100%; background: #6366f1; }
.time-stamps { display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 0.4rem; }

.player-controls { display: flex; justify-content: center; align-items: center; gap: 20px; }
.ctrl-btn { background: transparent; border: none; color: #cbd5e1; font-size: 1.4rem; cursor: pointer; }
.play-btn { background: #6366f1; color: white; width: 56px; height: 56px; border-radius: 50%; font-size: 1.6rem; display: flex; align-items: center; justify-content: center; }""",
        "script": """const playBtn = document.getElementById('playBtn');
const disc = document.getElementById('albumDisc');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    disc.classList.toggle('rotating', isPlaying);
});"""
    },

    "46-quiz-application-webpage": {
        "title": "46 - Interactive Quiz Web App",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>46 - JavaScript & Web Quiz</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-card">
        <div class="quiz-header">
            <span class="q-progress" id="qProgress">Question 1 of 3</span>
            <span class="q-score">Score: <strong id="scoreVal">0</strong></span>
        </div>

        <h2 class="question-text" id="questionText">Which HTML5 element is used for the primary navigation links?</h2>

        <div class="options-grid" id="optionsGrid">
            <button class="opt-btn">nav</button>
            <button class="opt-btn">header</button>
            <button class="opt-btn">section</button>
            <button class="opt-btn">main</button>
        </div>

        <button class="btn-next hidden" id="nextQBtn">Next Question →</button>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 2rem; }
.quiz-card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 2.5rem; max-width: 550px; width: 100%; box-shadow: 0 20px 45px rgba(0,0,0,0.5); }
.quiz-header { display: flex; justify-content: space-between; font-size: 0.85rem; color: #94a3b8; border-bottom: 1px solid #1f2937; padding-bottom: 0.8rem; margin-bottom: 1.5rem; }
.question-text { font-size: 1.3rem; line-height: 1.5; margin-bottom: 1.8rem; }
.options-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.5rem; }
.opt-btn { background: #080c15; border: 1px solid #334155; color: #f8fafc; padding: 0.85rem 1.2rem; border-radius: 10px; font-family: inherit; font-size: 0.95rem; text-align: left; cursor: pointer; transition: all 0.2s; }
.opt-btn:hover { border-color: #6366f1; }
.opt-btn.correct { background: rgba(34,197,94,0.2); border-color: #22c55e; }
.opt-btn.wrong { background: rgba(239,68,68,0.2); border-color: #ef4444; }
.btn-next { width: 100%; background: #6366f1; color: white; border: none; padding: 0.85rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
.hidden { display: none; }""",
        "script": """const quizData = [
    { q: "Which HTML5 element is used for primary navigation?", opts: ["<nav>", "<header>", "<section>", "<main>"], ans: 0 },
    { q: "Which CSS property enables 2D grid matrix layouts?", opts: ["display: flex", "display: grid", "float: left", "position: absolute"], ans: 1 },
    { q: "How do you declare a custom property in CSS?", opts: ["@variable name", "--custom-color", "$color", "let color"], ans: 1 }
];

let cur = 0;
let score = 0;

const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const nextBtn = document.getElementById('nextQBtn');
const qProgress = document.getElementById('qProgress');
const scoreVal = document.getElementById('scoreVal');

function loadQ() {
    const data = quizData[cur];
    qProgress.textContent = `Question ${cur + 1} of ${quizData.length}`;
    questionText.textContent = data.q;
    nextBtn.classList.add('hidden');

    optionsGrid.innerHTML = data.opts.map((opt, idx) => `
        <button class="opt-btn" onclick="checkAnswer(${idx})">${opt}</button>
    `).join('');
}

window.checkAnswer = function(idx) {
    const buttons = optionsGrid.querySelectorAll('.opt-btn');
    buttons.forEach(b => b.disabled = true);

    if (idx === quizData[cur].ans) {
        buttons[idx].classList.add('correct');
        score++;
        scoreVal.textContent = score;
    } else {
        buttons[idx].classList.add('wrong');
        buttons[quizData[cur].ans].classList.add('correct');
    }
    nextBtn.classList.remove('hidden');
};

nextBtn.addEventListener('click', () => {
    cur++;
    if (cur < quizData.length) {
        loadQ();
    } else {
        questionText.textContent = `🎉 Quiz Finished! You scored ${score} out of ${quizData.length}!`;
        optionsGrid.innerHTML = '';
        nextBtn.classList.add('hidden');
    }
});

loadQ();"""
    },

    "47-habit-tracker-dashboard": {
        "title": "47 - Daily Habit Tracker Dashboard",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>47 - Daily Habit Tracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="habit-app">
        <header class="app-header">
            <h1>📅 Daily Habit Tracker</h1>
            <button class="btn btn-add" id="addHabitBtn">+ New Habit</button>
        </header>

        <div class="habits-table">
            <div class="table-header">
                <span>Habit Title</span>
                <div class="week-days">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
            </div>

            <div class="habits-list" id="habitsList">
                <div class="habit-row">
                    <span class="habit-name">🧘 Morning Meditation</span>
                    <div class="day-boxes">
                        <input type="checkbox" checked><input type="checkbox" checked><input type="checkbox"><input type="checkbox" checked><input type="checkbox"><input type="checkbox"><input type="checkbox">
                    </div>
                </div>
                <div class="habit-row">
                    <span class="habit-name">💻 Code for 2 Hours</span>
                    <div class="day-boxes">
                        <input type="checkbox" checked><input type="checkbox" checked><input type="checkbox" checked><input type="checkbox" checked><input type="checkbox"><input type="checkbox"><input type="checkbox">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 3rem 1.5rem; display: flex; justify-content: center; }
.habit-app { max-width: 750px; width: 100%; }
.app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.btn-add { background: #6366f1; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
.habits-table { background: #111827; border: 1px solid #1f2937; border-radius: 18px; padding: 1.5rem; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
.table-header { display: flex; justify-content: space-between; color: #94a3b8; font-weight: 700; font-size: 0.85rem; border-bottom: 1px solid #1f2937; padding-bottom: 0.8rem; margin-bottom: 1rem; }
.week-days { display: flex; gap: 12px; }
.week-days span { width: 24px; text-align: center; }
.habit-row { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid #1f2937; }
.day-boxes { display: flex; gap: 12px; }
.day-boxes input { width: 24px; height: 24px; accent-color: #6366f1; cursor: pointer; }""",
        "script": """document.getElementById('addHabitBtn').addEventListener('click', () => {
    const title = prompt('Enter habit name:');
    if (!title) return;

    const row = document.createElement('div');
    row.className = 'habit-row';
    row.innerHTML = `
        <span class="habit-name">${title}</span>
        <div class="day-boxes">
            <input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox">
        </div>
    `;
    document.getElementById('habitsList').appendChild(row);
});"""
    },

    "48-real-estate-listings-webpage": {
        "title": "48 - Real Estate Property Listings Webpage",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>48 - Luxury Real Estate Listings</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 48 • Level 4: Complete Webpage</span>
            <h1>Modern Architectural Properties</h1>
            <p>Explore luxury modern estates and residential penthouses.</p>
        </header>

        <div class="listings-grid">
            <div class="prop-card">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80" alt="Villa">
                <div class="prop-body">
                    <span class="prop-price">$2,450,000</span>
                    <h3>Modern Hillside Glass Villa</h3>
                    <p class="prop-location">📍 Beverly Hills, CA</p>
                    <div class="prop-specs">
                        <span>🛏️ 4 Beds</span>
                        <span>🚿 5 Baths</span>
                        <span>📐 4,200 sqft</span>
                    </div>
                </div>
            </div>
            <div class="prop-card">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80" alt="Estate">
                <div class="prop-body">
                    <span class="prop-price">$3,890,000</span>
                    <h3>Minimalist Coastal Residence</h3>
                    <p class="prop-location">📍 Malibu, CA</p>
                    <div class="prop-specs">
                        <span>🛏️ 5 Beds</span>
                        <span>🚿 6 Baths</span>
                        <span>📐 5,800 sqft</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 4rem 1.5rem; display: flex; justify-content: center; }
.container { max-width: 1050px; width: 100%; }
.header { text-align: center; margin-bottom: 3.5rem; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.header h1 { font-size: 2.4rem; margin-bottom: 0.5rem; }
.header p { color: #94a3b8; }
.listings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
.prop-card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
.prop-card img { width: 100%; height: 240px; object-fit: cover; }
.prop-body { padding: 1.5rem; }
.prop-price { font-size: 1.5rem; font-weight: 800; color: #38bdf8; display: block; margin-bottom: 0.4rem; }
.prop-body h3 { font-size: 1.25rem; margin-bottom: 0.3rem; }
.prop-location { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.2rem; }
.prop-specs { display: flex; gap: 14px; border-top: 1px solid #1f2937; padding-top: 0.8rem; color: #cbd5e1; font-size: 0.85rem; font-weight: 600; }""",
        "script": """console.log('Real estate listings ready!');"""
    },

    "49-expense-tracker-dashboard": {
        "title": "49 - Interactive Expense Tracker & Budget Dashboard",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>49 - Expense Tracker Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Fira+Code:wght@600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <span class="badge">Question 49 • Level 4: Complete Webpage</span>
            <h1>Finance & Expense Tracker</h1>
        </header>

        <div class="summary-cards">
            <div class="s-card">
                <span>Total Balance</span>
                <strong id="totalBal">$4,250.00</strong>
            </div>
            <div class="s-card">
                <span>Total Income</span>
                <strong class="inc" id="totalInc">+$5,800.00</strong>
            </div>
            <div class="s-card">
                <span>Total Expenses</span>
                <strong class="exp" id="totalExp">-$1,550.00</strong>
            </div>
        </div>

        <div class="app-layout">
            <form class="entry-form" id="entryForm">
                <h3>Add New Transaction</h3>
                <input type="text" id="descInput" placeholder="Description (e.g. AWS Cloud Server)" required>
                <input type="number" id="amtInput" placeholder="Amount (e.g. 150)" required>
                <select id="typeInput">
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                </select>
                <button type="submit" class="btn btn-primary">Add Entry</button>
            </form>

            <div class="history-list">
                <h3>Transaction History</h3>
                <div class="transactions" id="txList">
                    <div class="tx-item expense">
                        <span>AWS Cloud Server</span>
                        <strong>-$150.00</strong>
                    </div>
                    <div class="tx-item income">
                        <span>Consulting Client Retainer</span>
                        <strong>+$5,800.00</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c15; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; padding: 3rem 1.5rem; display: flex; justify-content: center; }
.container { max-width: 800px; width: 100%; }
.header { text-align: center; margin-bottom: 2rem; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; }
.header h1 { font-size: 2.2rem; }

.summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 2rem; }
.s-card { background: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 1.2rem; text-align: center; }
.s-card span { font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 0.3rem; }
.s-card strong { font-family: 'Fira Code', monospace; font-size: 1.4rem; }
.inc { color: #22c55e; }
.exp { color: #ef4444; }

.app-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; }
@media (max-width: 700px) { .app-layout { grid-template-columns: 1fr; } .summary-cards { grid-template-columns: 1fr; } }

.entry-form, .history-list { background: #111827; border: 1px solid #1f2937; border-radius: 18px; padding: 1.5rem; }
.entry-form h3, .history-list h3 { font-size: 1.1rem; margin-bottom: 1rem; }
.entry-form input, .entry-form select { width: 100%; background: #080c15; border: 1px solid #334155; border-radius: 8px; padding: 0.75rem; color: white; margin-bottom: 0.8rem; font-family: inherit; }
.btn-primary { width: 100%; background: #6366f1; color: white; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 700; cursor: pointer; }

.transactions { display: flex; flex-direction: column; gap: 8px; }
.tx-item { display: flex; justify-content: space-between; background: #080c15; border: 1px solid #1f2937; padding: 0.8rem; border-radius: 8px; font-size: 0.9rem; }
.tx-item.expense strong { color: #ef4444; }
.tx-item.income strong { color: #22c55e; }""",
        "script": """document.getElementById('entryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('descInput').value;
    const amt = parseFloat(document.getElementById('amtInput').value);
    const type = document.getElementById('typeInput').value;

    const item = document.createElement('div');
    item.className = `tx-item ${type}`;
    item.innerHTML = `
        <span>${desc}</span>
        <strong>${type === 'income' ? '+' : '-'}$${amt.toFixed(2)}</strong>
    `;

    document.getElementById('txList').prepend(item);
    e.target.reset();
});"""
    },

    "50-agency-complete-webpage": {
        "title": "50 - Comprehensive Digital Creative Agency Webpage",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>50 - Nexus Creative Digital Agency</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Sticky Glass Navigation -->
    <header class="navbar">
        <div class="logo">✦ NEXUS CREATIVE</div>
        <nav class="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Case Studies</a>
            <a href="#agency">About</a>
            <a href="#contact">Contact</a>
        </nav>
        <button class="btn btn-outline" id="contactHeaderBtn">Let's Talk</button>
    </header>

    <!-- Hero with Canvas -->
    <section class="hero-section">
        <div class="hero-inner">
            <span class="badge">Question 50 • Level 4: Master Webpage</span>
            <h1 class="hero-headline">We Architect Iconic Digital Experiences for Forward-Thinking Brands.</h1>
            <p class="hero-sub">Nexus is a premier digital engineering studio combining avant-garde design, cutting-edge front-end architecture, and scalable cloud infrastructure.</p>
            <div class="hero-actions">
                <a href="#work" class="btn btn-primary">Explore Our Work →</a>
                <a href="#contact" class="btn btn-secondary">Inquire Engagement</a>
            </div>
        </div>
    </section>

    <!-- Services Grid -->
    <section id="services" class="section">
        <div class="section-heading">
            <span class="sub-tag">OUR EXPERTISE</span>
            <h2>Transforming Complex Problems into Effortless Solutions</h2>
        </div>
        <div class="services-grid">
            <div class="service-card">
                <span class="s-icon">💎</span>
                <h3>Brand Strategy & Identity</h3>
                <p>Developing cohesive design tokens, typography systems, and dynamic visual identities.</p>
            </div>
            <div class="service-card">
                <span class="s-icon">⚡</span>
                <h3>Full-Stack Web Engineering</h3>
                <p>High-performance single page applications with sub-second page loads and accessible UI.</p>
            </div>
            <div class="service-card">
                <span class="s-icon">🌐</span>
                <h3>Distributed Cloud & APIs</h3>
                <p>Multi-region edge networks, microservice routing, and secure zero-trust integrations.</p>
            </div>
        </div>
    </section>

    <!-- Case Studies -->
    <section id="work" class="section">
        <div class="section-heading">
            <span class="sub-tag">SELECTED CASE STUDIES</span>
            <h2>Engineering That Delivers Measurable Impact</h2>
        </div>
        <div class="work-grid">
            <div class="work-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Work 1">
                <div class="work-desc">
                    <span class="cat">FinTech Platform</span>
                    <h3>HyperScale Financial OS</h3>
                </div>
            </div>
            <div class="work-card">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" alt="Work 2">
                <div class="work-desc">
                    <span class="cat">Generative WebGL</span>
                    <h3>NeuroSynthetics Identity</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="contact-card">
            <h2>Ready to Build Something Extraordinary?</h2>
            <p>Tell us about your timeline and architectural goals.</p>
            <form id="agencyContactForm">
                <div class="form-row">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Email Address" required>
                </div>
                <textarea rows="4" placeholder="Brief project summary..." required></textarea>
                <button type="submit" class="btn btn-primary">Send Project Inquiry →</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-bottom">
            <span>© 2026 Nexus Creative Agency. 50 Question HTML CSS JS Master Collection.</span>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>""",
        "css": """* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: #06080e; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; }

.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 3.5rem; background: rgba(6, 8, 14, 0.85); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid rgba(255,255,255,0.08); }
.logo { font-size: 1.2rem; font-weight: 800; letter-spacing: 0.1em; color: #f8fafc; }
.nav-links { display: flex; gap: 28px; }
.nav-links a { color: #94a3b8; text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: color 0.2s; }
.nav-links a:hover { color: #38bdf8; }

.btn { padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; cursor: pointer; border: none; text-decoration: none; display: inline-block; transition: all 0.2s; }
.btn-primary { background: #6366f1; color: white; }
.btn-primary:hover { background: #4f46e5; transform: translateY(-2px); }
.btn-secondary { background: #111827; color: #f8fafc; border: 1px solid #334155; }
.btn-outline { background: transparent; border: 1px solid #334155; color: #f8fafc; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }

.hero-section { min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem; }
.hero-inner { max-width: 900px; margin: 0 auto; }
.badge { display: inline-block; background: rgba(99,102,241,0.15); color: #818cf8; padding: 5px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.5rem; border: 1px solid rgba(99,102,241,0.3); }
.hero-headline { font-size: 3.6rem; font-weight: 800; line-height: 1.15; margin-bottom: 1.5rem; }
@media (max-width: 768px) { .hero-headline { font-size: 2.3rem; } .nav-links { display: none; } }
.hero-sub { color: #94a3b8; font-size: 1.2rem; line-height: 1.6; max-width: 720px; margin: 0 auto 2.5rem; }
.hero-actions { display: flex; justify-content: center; gap: 16px; }

.section { max-width: 1100px; margin: 6rem auto; padding: 0 1.5rem; }
.section-heading { text-align: center; margin-bottom: 3.5rem; }
.sub-tag { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.1em; color: #38bdf8; display: block; margin-bottom: 0.5rem; }
.section-heading h2 { font-size: 2.4rem; }

.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.8rem; }
.service-card { background: #0f1422; border: 1px solid #1e293b; border-radius: 20px; padding: 2.2rem; transition: transform 0.2s; }
.service-card:hover { transform: translateY(-6px); border-color: #6366f1; }
.s-icon { font-size: 2.2rem; display: block; margin-bottom: 1rem; }
.service-card h3 { font-size: 1.3rem; margin-bottom: 0.6rem; }
.service-card p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; }

.work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; }
.work-card { background: #0f1422; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
.work-card img { width: 100%; height: 260px; object-fit: cover; }
.work-desc { padding: 1.5rem; }
.work-desc .cat { color: #38bdf8; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
.work-desc h3 { font-size: 1.3rem; margin-top: 0.3rem; }

.contact-card { background: #0f1422; border: 1px solid #1e293b; border-radius: 24px; padding: 4rem 2rem; max-width: 700px; margin: 0 auto; text-align: center; }
.contact-card h2 { font-size: 2.2rem; margin-bottom: 0.6rem; }
.contact-card p { color: #94a3b8; margin-bottom: 2rem; }
.form-row { display: flex; gap: 12px; margin-bottom: 12px; }
@media (max-width: 600px) { .form-row { flex-direction: column; } }
.contact-card input, .contact-card textarea { width: 100%; background: #06080e; border: 1px solid #334155; border-radius: 10px; padding: 0.9rem; color: white; font-family: inherit; font-size: 0.95rem; margin-bottom: 12px; outline: none; }
.contact-card input:focus, .contact-card textarea:focus { border-color: #6366f1; }
.contact-card button { width: 100%; }

.footer { border-top: 1px solid #1e293b; padding: 3rem 1.5rem; text-align: center; color: #64748b; font-size: 0.9rem; }""",
        "script": """document.getElementById('agencyContactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out to Nexus Creative Agency! Our partner team will respond within 24 hours.');
    e.target.reset();
});

document.getElementById('contactHeaderBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});"""
    }
})

for folder, data in tier4_projects.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    with open(os.path.join(folder_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(data["html"])
    with open(os.path.join(folder_path, "style.css"), "w", encoding="utf-8") as f:
        f.write(data["css"])
    with open(os.path.join(folder_path, "script.js"), "w", encoding="utf-8") as f:
        f.write(data["script"])
    print(f"Created {folder} (3 files)")

print("Tier 4 generation complete!")
