---
version: 1.0
name: Sheryians-Inspiration-Design-Analysis
description: Structured design system extracted directly from the inspiration assets in /temp/index.html and /temp/styles.css (Tailwind CSS v4 + DaisyUI component architecture). The visual language combines high-energy tech-focused aesthetics anchored on dark surfaces (#1a1a1a, #0f0f0f, #111827), high-contrast orange-amber primary accents (#e8602e), geometric display typography ("Neue Machina", "Manrope"), and smooth 16px/32px rounded containers with subtle 1.5px borders.

colors:
  primary: "#e8602e"
  primary-50: "#fff3ec"
  primary-100: "#ffdccb"
  primary-200: "#ffb899"
  primary-300: "#ff9466"
  primary-500: "#e8602e"
  primary-600: "#c95326"
  primary-700: "#a34420"
  primary-800: "#7d3519"
  secondary: "#0a6df0"
  accent: "#e8602e"
  
  canvas: "#1a1a1a"
  surface-soft: "#f5f5f5"
  surface-card: "#2a2a2a"
  surface-dark: "#0f0f0f"
  surface-dark-elevated: "#1f2937"
  
  text-primary: "#111827"
  text-secondary: "#6b7280"
  text-tertiary: "#979797"
  text-inverse: "#ffffff"
  text-dark-primary: "#ffffff"
  text-dark-secondary: "#979797"
  
  border: "#d4d4d4"
  border-dark: "#2a2a2a"
  hairline: "#e5e5e5"
  
  success-100: "#d1fae5"
  success-400: "#34d399"
  success-500: "#10b981"
  success-600: "#059669"
  success-700: "#047857"
  success-800: "#065f46"
  success-900: "#064e3b"
  
  warning-100: "#fef3c7"
  warning-400: "#fbbf24"
  warning-500: "#f59e0b"
  warning-600: "#d97706"
  warning-700: "#b45309"
  
  error-50: "#fef2f2"
  error-100: "#fee2e2"
  error-200: "#fecaca"
  error-300: "#fca5a5"
  error-400: "#f87171"
  error-500: "#ef4444"
  error-600: "#dc2626"
  error-700: "#b91c1c"
  error-800: "#991b1b"
  error-900: "#7f1d1d"

typography:
  display-8xl:
    fontFamily: '"Neue Machina", "Manrope", sans-serif'
    fontSize: 96px
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: "-0.05em"
  display-7xl:
    fontFamily: '"Neue Machina", "Manrope", sans-serif'
    fontSize: 72px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.05em"
  display-6xl:
    fontFamily: '"Neue Machina", "Manrope", sans-serif'
    fontSize: 60px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.025em"
  display-5xl:
    fontFamily: '"Neue Machina", "Manrope", sans-serif'
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.025em"
  heading-4xl:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.11
    letterSpacing: "-0.025em"
  heading-3xl:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  heading-2xl:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0em"
  heading-xl:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0em"
  body-lg:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  body-base:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body-sm:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0em"
  caption-xs:
    fontFamily: '"Manrope", sans-serif'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "0.025em"
  code-mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  cursive-accent:
    fontFamily: '"Cavet Brush", cursive'
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0em"

spacing:
  base-unit: "4px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "64px"
  5xl: "96px"

rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  4xl: "32px"
  selector: "32px"
  field: "10px"
  box: "16px"

components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.text-inverse}"
    borderRadius: "{rounded.field}"
    padding: "0.625rem 1.25rem"
    font: "{typography.body-sm}"
    fontWeight: 600
  button-secondary:
    background: "{colors.surface-card}"
    color: "{colors.text-dark-primary}"
    border: "1.5px solid {colors.border-dark}"
    borderRadius: "{rounded.field}"
    padding: "0.625rem 1.25rem"
  card:
    background: "{colors.canvas}"
    border: "1.5px solid {colors.border-dark}"
    borderRadius: "{rounded.box}"
    padding: "1.5rem"
  badge:
    background: "rgba(232, 96, 46, 0.15)"
    color: "{colors.primary}"
    borderRadius: "{rounded.selector}"
    padding: "0.25rem 0.625rem"
---

# Design System Specification

## 1. Overview
The design system extracted from the inspiration assets in `/temp/index.html` and `/temp/styles.css` is a modern, high-contrast tech-oriented interface. Built on Tailwind CSS v4 and DaisyUI component architecture, it anchors on a dark canvas (`{colors.canvas}`) with energetic burnt-orange/amber accents (`{colors.primary}`) and crisp off-white surface containers (`{colors.surface-card}`). 

The visual "voltage" is driven by geometric display headers (`{typography.display-7xl}` using `"Neue Machina"` and `"Manrope"`), glowing accent highlights, tactile 1.5px dark container borders (`{colors.border-dark}`), and generous 16px/32px rounded corners (`{rounded.box}`). The layout philosophy emphasizes high-density information architecture balanced by structured section rhythm (`{spacing.4xl}`).

---

## 2. Colors

### Brand & Accent Colors
- **Primary / Brand Accent**: `{colors.primary}` (`#e8602e`) — Main interactive CTAs, active flame indicators, and key accent glows.
- **Primary Tints & Shades**:
  - `50`: `{colors.primary-50}` (`#fff3ec`)
  - `100`: `{colors.primary-100}` (`#ffdccb`)
  - `200`: `{colors.primary-200}` (`#ffb899`)
  - `300`: `{colors.primary-300}` (`#ff9466`)
  - `500`: `{colors.primary-500}` (`#e8602e`)
  - `600`: `{colors.primary-600}` (`#c95326`)
  - `700`: `{colors.primary-700}` (`#a34420`)
  - `800`: `{colors.primary-800}` (`#7d3519`)
- **Secondary Accent**: `{colors.secondary}` (`#0a6df0`) — Links, technical badges, and secondary highlight elements.

### Surface & Background Colors
- **Canvas Base**: `{colors.canvas}` (`#1a1a1a`) — Dark primary page background.
- **Surface Card**: `{colors.surface-card}` (`#2a2a2a`) — Elevated card containers and interactive panels.
- **Surface Dark**: `{colors.surface-dark}` (`#0f0f0f`) — Deep inset backgrounds and footer containers.
- **Surface Soft**: `{colors.surface-soft}` (`#f5f5f5`) — Light-mode fallback surface.

### Text Colors
- **Text Primary (Light Mode)**: `{colors.text-primary}` (`#111827`)
- **Text Secondary (Light Mode)**: `{colors.text-secondary}` (`#6b7280`)
- **Text Dark Primary (Dark Canvas)**: `{colors.text-dark-primary}` (`#ffffff`)
- **Text Dark Secondary**: `{colors.text-dark-secondary}` (`#979797`)
- **Text Inverse**: `{colors.text-inverse}` (`#ffffff`)

### Semantic Colors
- **Success**:
  - `100`: `{colors.success-100}` (`#d1fae5`)
  - `500`: `{colors.success-500}` (`#10b981`)
  - `700`: `{colors.success-700}` (`#047857`)
  - `900`: `{colors.success-900}` (`#064e3b`)
- **Warning**:
  - `100`: `{colors.warning-100}` (`#fef3c7`)
  - `500`: `{colors.warning-500}` (`#f59e0b`)
  - `700`: `{colors.warning-700}` (`#b45309`)
- **Error**:
  - `50`: `{colors.error-50}` (`#fef2f2`)
  - `500`: `{colors.error-500}` (`#ef4444`)
  - `700`: `{colors.error-700}` (`#b91c1c`)
  - `900`: `{colors.error-900}` (`#7f1d1d`)

---

## 3. Typography

### Font Families
- **Display Headings**: `"Neue Machina", "Manrope", sans-serif`
- **Body & UI Elements**: `"Manrope", sans-serif`
- **Monospace Code/Stats**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- **Cursive Flourish Accent**: `"Cavet Brush", cursive`

### Typography Hierarchy Table

| Level | Font Family | Size | Weight | Line Height | Letter Spacing | Token Reference |
|---|---|---|---|---|---|---|
| **Display 8XL** | Neue Machina / Manrope | 96px (`6rem`) | 900 (`black`) | 1.0 (`1.0`) | `-0.05em` | `{typography.display-8xl}` |
| **Display 7XL** | Neue Machina / Manrope | 72px (`4.5rem`) | 800 (`extrabold`) | 1.0 (`1.0`) | `-0.05em` | `{typography.display-7xl}` |
| **Display 6XL** | Neue Machina / Manrope | 60px (`3.75rem`) | 800 (`extrabold`) | 1.0 (`1.0`) | `-0.025em` | `{typography.display-6xl}` |
| **Display 5XL** | Neue Machina / Manrope | 48px (`3rem`) | 700 (`bold`) | 1.0 (`1.0`) | `-0.025em` | `{typography.display-5xl}` |
| **Heading 4XL** | Manrope | 36px (`2.25rem`) | 700 (`bold`) | 1.11 (`1.11`) | `-0.025em` | `{typography.heading-4xl}` |
| **Heading 3XL** | Manrope | 30px (`1.875rem`) | 700 (`bold`) | 1.2 (`1.2`) | `0em` | `{typography.heading-3xl}` |
| **Heading 2XL** | Manrope | 24px (`1.5rem`) | 600 (`semibold`) | 1.33 (`1.33`) | `0em` | `{typography.heading-2xl}` |
| **Heading XL** | Manrope | 20px (`1.25rem`) | 600 (`semibold`) | 1.4 (`1.4`) | `0em` | `{typography.heading-xl}` |
| **Body Large** | Manrope | 18px (`1.125rem`) | 400 (`normal`) | 1.55 (`1.55`) | `0em` | `{typography.body-lg}` |
| **Body Base** | Manrope | 16px (`1rem`) | 400 (`normal`) | 1.5 (`1.5`) | `0em` | `{typography.body-base}` |
| **Body Small** | Manrope | 14px (`0.875rem`) | 400 (`normal`) | 1.43 (`1.43`) | `0em` | `{typography.body-sm}` |
| **Caption XS** | Manrope | 12px (`0.75rem`) | 500 (`medium`) | 1.33 (`1.33`) | `0.025em` | `{typography.caption-xs}` |
| **Code Mono** | Monospace | 14px (`0.875rem`) | 400 (`normal`) | 1.5 (`1.5`) | `0em` | `{typography.code-mono}` |

---

## 4. Layout

### Spacing Scale
The spacing system uses a 4px base step multiplier (`{spacing.base-unit}`):
- `xs`: 4px (`0.25rem`)
- `sm`: 8px (`0.5rem`)
- `md`: 12px (`0.75rem`)
- `lg`: 16px (`1rem`)
- `xl`: 24px (`1.5rem`)
- `2xl`: 32px (`2rem`)
- `3xl`: 48px (`3rem`)
- `4xl`: 64px (`4rem`)
- `5xl`: 96px (`6rem`)

### Container Widths
- `xs`: 320px (`20rem`)
- `sm`: 384px (`24rem`)
- `md`: 448px (`28rem`)
- `lg`: 512px (`32rem`)
- `xl`: 576px (`36rem`)
- `2xl`: 672px (`42rem`)
- `3xl`: 768px (`48rem`)
- `4xl`: 896px (`56rem`)
- `5xl`: 1024px (`64rem`)
- `6xl`: 1152px (`72rem`)
- `7xl`: 1280px (`80rem`)

---

## 5. Elevation & Depth

### Shadows & Insets
- **Drop Shadow Medium**: `{drop-shadow-md}` (`0 3px 3px #0000001f`)
- **Drop Shadow Extra Large**: `{drop-shadow-xl}` (`0 9px 7px #0000001a`)
- **Drop Shadow 2XL**: `{drop-shadow-2xl}` (`0 25px 25px #00000026`)
- **Button Inset Highlight**: `box-shadow: 0 .5px 0 .5px oklch(100% 0 0 / 6%) inset`

### Border Treatments
- **Standard Container Border**: `1.5px solid {colors.border-dark}` (`#2a2a2a`)
- **Light Theme Hairline**: `1px solid {colors.border}` (`#d4d4d4`)

---

## 6. Shapes & Border Radii

- **Radius Small (`sm`)**: 4px (`0.25rem`) — Code tags, small inline chips.
- **Radius Medium (`md`)**: 6px (`0.375rem`) — Input fields, small action icons.
- **Radius Large (`lg`)**: 8px (`0.5rem`) — Standard dropdown items and tooltips.
- **Radius Field (`field`)**: 10px (`0.625rem`) — Buttons, input boxes, form controls.
- **Radius Box (`box`)**: 16px (`1rem`) — Cards, modal dialogs, section panels.
- **Radius Selector (`selector`)**: 32px (`2rem`) — Pills, status badges, avatar chips.

---

## 7. Components

### Primary Button (`button-primary`)
- **Background**: `{colors.primary}` (`#e8602e`)
- **Text Color**: `{colors.text-inverse}` (`#ffffff`)
- **Border Radius**: `{rounded.field}` (10px)
- **Padding**: `0.625rem 1.25rem` (10px 20px)
- **Typography**: `{typography.body-sm}` (14px, Weight 600)

### Secondary / Dark Card Button (`button-secondary`)
- **Background**: `{colors.surface-card}` (`#2a2a2a`)
- **Text Color**: `{colors.text-dark-primary}` (`#ffffff`)
- **Border**: `1.5px solid {colors.border-dark}` (`#2a2a2a`)
- **Border Radius**: `{rounded.field}` (10px)

### Surface Card (`card`)
- **Background**: `{colors.canvas}` (`#1a1a1a`) or `{colors.surface-card}` (`#2a2a2a`)
- **Border**: `1.5px solid {colors.border-dark}` (`#2a2a2a`)
- **Border Radius**: `{rounded.box}` (16px)
- **Padding**: `1.5rem` (24px)

### Badge (`badge`)
- **Background**: `rgba(232, 96, 46, 0.15)`
- **Text Color**: `{colors.primary}` (`#e8602e`)
- **Border Radius**: `{rounded.selector}` (32px)
- **Padding**: `0.25rem 0.625rem` (4px 10px)

---

## 8. Do's and Don'ts

### Do's
- **DO** use `{colors.primary}` (`#e8602e`) for main interactive action buttons and brand highlights.
- **DO** use `"Neue Machina"` / `"Manrope"` font stack for display headers with negative tracking (`-0.025em` to `-0.05em`).
- **DO** enforce 16px (`{rounded.box}`) border radius on main card containers with subtle 1.5px dark borders.
- **DO** maintain a 4px grid spacing rhythm (`{spacing.base-unit}`).

### Don'ts
- **DON'T** introduce ad-hoc hex values outside the defined palette tokens.
- **DON'T** mix light background cards with white primary text (always maintain high contrast).
- **DON'T** use sharp 0px borders on primary buttons or main cards.

---

## 9. Responsive Behavior

- **Breakpoints**:
  - `sm`: `640px` — Mobile layout switches from single-column vertical stack to 2-column grid.
  - `md`: `768px` — Navigation header expands full actions, trust strip layout scales.
  - `lg`: `1024px` — 4-column card grid layouts for track items.
  - `xl`: `1280px` — Max container width constraints (`1280px`).
