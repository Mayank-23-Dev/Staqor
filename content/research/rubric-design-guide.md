# Rubric Design & AI Grading Research Guide

## 1. Multi-Metric Scoring Philosophy
Traditional algorithmic platforms test return values (stdout). Frontend craftsmanship requires multi-metric weighted evaluation:

| Dimension | Standard Weight | Evaluation Focus |
|---|---|---|
| **Visual & Layout Fidelity** | 35% | Spacing, CSS Flexbox/Grid, typography, alignment, responsive behavior |
| **Logic & Event Handling** | 35% | Event listeners, state toggling, form validations, dynamic DOM updates |
| **Code Craft & Accessibility** | 30% | Semantic tags, WAI-ARIA roles, clean naming conventions, CSS maintainability |

## 2. Thresholds
- **Pass Threshold:** $\ge 80\%$ overall weighted score on formal `SUBMIT`.
- **Diagnostic Run:** Non-penalizing qualitative feedback and bug highlighting on `RUN` ($\le 5$ runs).
