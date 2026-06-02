# AI_WORKFLOW.md

# Project Context

This project is a premium cosmetic company website (Tân Hương Phát) built with:

* Next.js 14 (Pages Router)
* TypeScript (strict mode)
* TailwindCSS 3.4

The project focuses on:

* luxury cosmetic brand landing pages
* product showcase sections
* company introduction pages
* responsive marketing UI
* reusable section-based architecture
* clean premium design

The visual style should feel:

* luxury
* elegant
* minimal
* modern
* warm
* premium cosmetic brand aesthetic

Reference styles:

* Aesop
* Dior Beauty
* Chanel Beauty
* Rhode Skin

---

# Design System

## Color Palette

* **Brand**: Warm rose/terracotta — `brand-50` to `brand-900`
* **Neutrals**: Warm sand — `sand-50` to `sand-900`
* **Dark**: Rich espresso — `espresso-500` to `espresso-900`
* **Accent**: Champagne gold — `gold-300` to `gold-600`

## Typography

* **Headings**: Playfair Display (font-display) — serif, luxury feel
* **Body**: Inter (font-sans) — clean, readable
* **Overline/Badges**: Inter uppercase, tracking-widest

## Section Themes

* `light` — bg-sand-50, text-sand-600, heading-sand-900
* `alt` — bg-sand-100, text-sand-600, heading-sand-900
* `dark` — bg-espresso-900, text-sand-400, heading-white
* `brand` — bg-cta-gradient, text-white

---

# Folder Architecture

```
src/
├── components/
│   ├── ui/              # Atomic UI primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Typography.tsx
│   │   └── index.ts     # Barrel export
│   ├── common/          # Composed business components
│   ├── sections/        # Landing page sections
│   │   ├── SectionWrapper.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── HeroSection.tsx
│   │   └── index.ts
│   └── layouts/         # Navbar, Footer, wrappers
├── config/              # Site config, navigation, brand
│   ├── site.ts
│   └── navigation.ts
├── data/                # Static content data (typed arrays)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (cn helper, formatters)
├── pages/               # Next.js Pages Router
├── styles/              # Global CSS (Tailwind directives)
└── types/               # Shared TypeScript types
```

---

# Core Development Rules

## General Rules

* Keep code clean and maintainable
* Prefer reusable components
* Avoid duplicated code
* Keep folder structure organized
* Keep components modular
* Use TypeScript properly
* Avoid unnecessary complexity
* Do not over-engineer

---

# Component Rules

## Before Creating a New Component

1. Check if a reusable component already exists in `ui/`
2. Check if a section primitive exists (`SectionWrapper`, `SectionHeader`)
3. Reuse existing UI patterns whenever possible
4. Extract duplicated UI into shared components

## Component Hierarchy

```
UI Primitives (Button, Badge, Card, Container, Typography)
  → Common Components (Logo, TrustBadges, StatCard)
    → Section Components (HeroSection, ProductShowcase)
      → Page Compositions (pages/index.tsx)
```

## Section Pattern

Every section MUST use:

```tsx
<SectionWrapper theme="light" id="section-id">
  <SectionHeader
    badge="Badge Text"
    title="Section Title"
    subtitle="Optional subtitle"
  />
  {/* Section content */}
</SectionWrapper>
```

---

# Styling Rules

* Use TailwindCSS only
* Avoid CSS files unless absolutely necessary
* Use responsive mobile-first layouts
* Keep spacing consistent (use design system tokens)
* Use warm-tinted shadows (not pure black)
* Keep animations subtle and premium ("felt, not seen")
* Avoid overly flashy effects

## Class Order Convention

```
Layout → Position → Spacing → Sizing → Typography → Colors → Effects → State
```

---

# Import Rules

* Use barrel exports: `import { Button, Badge } from '@/components/ui'`
* Use path alias: `@/` maps to `./src/`
* Use `import type` for type-only imports
* Keep imports sorted (enforced by eslint)

---

# Data Rules

* Put static content arrays in `src/data/*.ts`
* Never hardcode content arrays inside component files
* Export typed arrays that sections consume via props
* Config goes in `src/config/`, content goes in `src/data/`

---

# Code Quality Rules

* Remove unused imports
* Remove dead code
* Remove commented unused code
* Avoid `any` type unless necessary
* Keep files readable
* Use meaningful names
* Keep logic simple

---

# Responsive Rules

Every UI must support:

* mobile (base: 0–639px)
* tablet (sm: 640px+)
* desktop (lg: 1024px+)

Always check:

* overflow issues
* broken layouts
* text wrapping
* spacing consistency

---

# File Modification Rules

* Do NOT modify unrelated files
* Do NOT break existing features
* Do NOT redesign unrelated pages
* Do NOT remove existing working functionality

---

# Before Finishing Any Task

Always run:

1. npm run lint
2. npm run check-types
3. npm run build

Fix all issues until:

* lint passes
* type-check passes
* build succeeds

---

# AI Task Workflow

For every implementation:

1. Read this file first
2. Analyze existing structure
3. Check existing components in `ui/` and `sections/`
4. Reuse existing components
5. Create scalable solution following the architecture
6. Keep naming consistent
7. Keep UI responsive
8. Run validation scripts
9. Fix all issues
10. Summarize changes clearly
