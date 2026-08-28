# Design.md — Visual System (v2)

Staqor has **two connected but distinct visual moods**, not two unrelated themes:

1. **Landing + Auth (logged-out):** Lawtrades-inspired UI language — soft near-black
   canvas, confident editorial typography, floating overlapping cards, dotted connector
   lines, generous whitespace. Animated with GSAP.
2. **App Shell (logged-in — workspace, dashboard, browse):** Same near-black/indigo
   DNA, but tightened up — more professional, denser, LeetCode-style. Static, no GSAP.

Same brand skeleton (color, type family, corner radii) carries through both — the shift
is in *density and motion*, not in a totally different palette.

---

## 1. Brand Color System
- **Base canvas:** Soft near-black — `#0A0A0F` (primary bg), `#111117` (raised panels/cards),
  `#1A1A22` (hover/elevated surfaces). Avoid pure `#000000` — it's flatter and harder to
  layer depth on than a near-black with a slight cool tint.
- **Primary accent:** `#ABDAC8` (sage mint) — buttons, active states, links, focus rings,
  progress indicators. This is the one color users should register as "Staqor." Note:
  it's a light, low-saturation color, so on dark backgrounds use it primarily for
  outlines/text/thin fills; for solid button fills, pair with near-black text
  (`#0A0A0F`) rather than white, since white-on-mint fails contrast.
- **Supporting accent (sparingly, for gradients/glows on landing only):** `#D4EDE3`
  (lighter mint) or `#7BC4A8` (deeper mint-green) — used in hero glows/gradient borders,
  never in the app shell's UI chrome.
- **Text:** `#F5F5F7` primary on dark, `#9CA3AF` muted/secondary, `#6B7280` disabled.
- **Semantic:** Success `#4ADE80`, Error `#F87171`, Warning `#FBBF24` — kept distinct
  from the brand accent so "pass" state doesn't visually collide with `#ABDAC8`; same
  across both modes.
- **Borders/dividers:** `#26262E` on landing/auth, `#3C3C3C` in the app shell (slightly
  warmer/more neutral to match the VSCode-adjacent feel).

## 2. Typography
- **Headings:** A confident serif-leaning or high-contrast sans for landing/auth hero
  copy — e.g. **Söhne** / **General Sans** / or **Inter Display** at large sizes
  (40–72px), tight tracking. This is what gives the Lawtrades-style editorial feel
  ("Top legal talent, on demand." — big, warm, human).
- **Body (landing/auth):** Inter, 16–18px, relaxed line-height (1.6), `#9CA3AF` on dark bg.
- **App shell UI text:** Inter or system-ui, 13–14px, dense and information-dense —
  no editorial sizing here.
- **Code:** JetBrains Mono or Fira Code, 14px, ligatures on if supported.

## 3. Landing + Auth Mode (GSAP-Animated)

**Applies to:** marketing pages, pricing, **and now explicitly login/signup** — auth is
part of the animated, brand-forward experience, not a bare utility form.

**Layout language (Lawtrades-inspired, not color-inspired):**
- Floating overlapping cards with soft shadows/glow instead of flat sections — e.g. a
  hero mockup of the Staqor editor "floating" with a small badge/notification card
  overlapping its corner (mirrors Lawtrades' talent-card + "Justin Higgs / Attorney" tag
  overlap pattern).
- Dotted/curved connector lines linking floating elements — decorative, low-opacity,
  in the mint accent.
- Rounded corners throughout (16–24px on cards), generous padding, lots of negative space.
- Logo strip / trust row (e.g. "Built for devs who've shipped at ___") using grayscale
  or outline-style marks, understated — mirrors the Yelp/Airbnb/Discord logo row pattern.
- Tabbed/paginated feature card with prev/next arrows for a "choose your challenge type"
  or "choose your track" section, echoing the Lawtrades "Attorneys / Paralegal / ..." tab pattern.

**GSAP usage — now spans landing AND auth:**
- **Landing:** staggered hero fade/slide-up (headline → subhead → CTA), scroll-triggered
  section reveals (`ScrollTrigger`), floating card parallax/drift, hover glow+scale on CTAs.
- **Auth (login/signup):** animated form-field entrance (staggered fade/slide on field
  mount), a subtle floating background element (glow blob or the same dotted-line motif)
  behind the form card, smooth cross-fade/slide when toggling between Login ↔ Signup,
  success-state micro-animation on submit (e.g. checkmark morph) before redirecting into
  the app shell.
- Keep all motion restrained and confident — easing should feel like `power2.out`, not
  bouncy/elastic. This is selling trust, including at the moment someone creates an account.

## 4. App Shell Mode (Post-Login) — Professional, LeetCode-Style

**Feel:** Same DNA (near-black + indigo) but the environment sharpens up — dense,
utilitarian, code-first. No GSAP, no decorative motion.

- **Background:** `#0A0A0F` app bg / `#111117` panels / `#0D0D12` sidebar (slightly
  darker than panels, LeetCode-style visual hierarchy).
- **Borders:** `#26262E`–`#3C3C3C`.
- **Accent usage:** Mint `#ABDAC8` reserved for active tab underline, primary buttons,
  progress ring (like LeetCode's solved-count ring), and the "pass" call-to-action —
  used sparingly against the neutral dark UI, the way LeetCode uses its orange sparingly.
  Its low saturation reads as calm/confident against near-black, but don't overuse it as
  a fill color — it's more effective as an outline/underline/text accent at this density.
- **Difficulty tags:** Easy `#4ADE80`, Medium `#FBBF24`, Hard `#F87171` — consistent
  everywhere (browse grid, workspace header, profile).
- **Layout discipline:**
  - Split-screen workspace: 40% problem panel / 60% editor+preview.
  - **Live editor + live preview, both visible** — Monaco editor tabs (HTML/CSS/JS,
    VSCode-tab styled, active tab underlined in indigo) alongside a real-time sandboxed
    iframe preview that updates on debounced keystroke (per Architecture.md §2).
  - Transitions instant or CSS-only (150–200ms), never GSAP.
  - Feedback panel: simple slide/fade (translateY + opacity), not GSAP.
- **Profile/portfolio pages:** Sit between the two modes — near-black like the app (it's
  showing real code) but with slightly more presentational spacing/typography since this
  page is often viewed by a logged-out recruiter. A good place for the Lawtrades-style
  floating-card treatment applied to badges/stats.

## 5. Component Notes
- **Buttons:** Primary = mint `#ABDAC8` fill with near-black (`#0A0A0F`) text; Secondary
  = outline, mint border, transparent fill, mint text; Ghost = text-only, muted → white
  on hover. Same system, reused across both modes.
- **Cards:** 16–24px radius on landing/auth (soft, floating); 8–12px radius in the app
  shell (tighter, tool-like).
- **Badges:** small pill components; consider a subtle tier treatment (bronze/silver/gold
  border) for rarity, shown on profile and challenge cards.
- **Notifier (paywall modal):** near-black overlay, mint-accent border, two clear
  buttons (Upgrade Now / Close) — no GSAP, just a simple scale+fade mount.

## 6. What Not To Do
- Don't use GSAP/scroll-animation inside `(app)` workspace/dashboard/browse routes —
  it's fine (expected) on `(marketing)` and `(auth)` routes now.
- Don't import the Lawtrades sage/cream *palette* directly (their light cream bg) — only
  the *layout language* (floating cards, dotted connectors, tabbed panels, generous
  whitespace) carries over; Staqor stays near-black with the mint accent, not light.
- Don't let the app shell's mint usage get loud or overused as large fills — it should
  read like LeetCode's restrained orange, used as accents/outlines, not blocks of color.
- Don't pair `#ABDAC8` with white text — contrast fails; always pair mint fills with
  near-black text.
- Don't use pure `#000000` as a background anywhere — always the near-black values above.
