# 🗺️ Codebase Map & Agent Navigation Guide

> **Notice for AI Agents**: DO NOT recursively scan or grep the entire codebase. This document contains the exact mapping of features, components, state, data structures, and styling. Follow the [Fast Task Routing Matrix](#-fast-task-routing-matrix) to find target files in seconds.

---

## ⚡ Tech Stack & Architecture Highlights

| Layer | Technology | Key Details & Gotchas |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Uses React 19 patterns; StrictMode compatible with proper cleanup in `useEffect`. |
| **Bundler & Tooling** | Vite 8 + `@` path alias | `@/` points to `./src/` (configured in `vite.config.ts` and `tsconfig.json`). |
| **Styling** | **Tailwind CSS v4** | Uses `@import "tailwindcss";` inside `src/index.css`. **No `tailwind.config.js` exists**. Custom theme tokens defined via `@theme` in `src/index.css`. |
| **Animations** | GSAP 3 + ScrollTrigger | Used extensively in `src/meely/MeelyPage.tsx`. Always wrap GSAP animations in `gsap.context()` for React cleanup. |
| **3D Graphics** | Three.js (r186) | Pure Three.js WebGL scenes in `src/components/hero/Hero3DCanvas.tsx` and `src/components/ui/agentic-factory-3d.tsx`. |
| **Micro-Interactions** | Framer Motion 14 | Smooth entry transitions, modals, tab switches, and badge pulses. |
| **Data Architecture** | Single Source of Truth | **100% of site content, copy, case studies, and pricing lives in `src/data/content.ts`**. |

---

## 🧭 Routes & Entry Points

Routing is handled via lightweight URL / hash detection in `src/App.tsx`:

| Route | Hash Fallback | Component | Description |
| :--- | :--- | :--- | :--- |
| `/` | `#/` | `src/App.tsx` (Main View) | Single-page Capture Creatives agency experience (Hero, Services, Case Study, Work, Estimator, Contact). |
| `/meely` | `#/meely` | `src/meely/MeelyPage.tsx` | Dedicated client showcase with 3D mouse parallax and 99-frame interactive 3-phase camera scrub canvas (Exterior -> Lobby 3D -> Executive Suites). |
| `/demo` | `#/demo` | `src/demo/index.tsx` | UI Lab Experiments: Agentic Factory 3D, Timelines, Hairline Riffle, Radial Orbit, Scroll Expansion. |

---

## 🎯 Fast Task Routing Matrix

Use this table to jump directly to the relevant file for any incoming user task:

### 1. Content, Text, Data & Copy Updates
> **Rule**: Do NOT edit component JSX to change business copy. Always edit `src/data/content.ts`.

| What to Update | Exact Target File | Exported Variable / Constant |
| :--- | :--- | :--- |
| Company name, phone, email, WhatsApp, address, hero slogans | `src/data/content.ts` | `COMPANY_INFO` |
| Top trust counters (Founded, 25+ projects, 400+ students, 2x Gold) | `src/data/content.ts` | `QUICK_STATS` |
| Services cards (Branding, Design, Print, Digital, Software, Marketing) | `src/data/content.ts` | `SERVICES_DATA` |
| 8-Step Creative Workflow (Idea → Software → Growth) | `src/data/content.ts` | `WORKFLOW_PIPELINE` |
| Prabhu Group Case Study (metrics, problem, solution, modules) | `src/data/content.ts` | `PRABHU_CASE_STUDY` |
| Portfolio projects list (clients, tags, descriptions, deliverables) | `src/data/content.ts` | `PORTFOLIO_PROJECTS` |
| Client Testimonials & quotes | `src/data/content.ts` | `TESTIMONIALS_DATA` |
| "Why Businesses Choose CC" 6 points | `src/data/content.ts` | `WHY_CHOOSE_US` |
| Social Impact & Yi Youth CPR initiatives | `src/data/content.ts` | `SOCIAL_IMPACT_DATA` |
| Founder athletic & leadership achievements (Badminton, Yi Chair) | `src/data/content.ts` | `ACHIEVEMENTS_DATA` |
| 5-Step Process (Discover, Define, Create, Build, Deliver) | `src/data/content.ts` | `PROCESS_STEPS` |
| Data Types & TypeScript Interfaces | `src/types/index.ts` | `ServiceItem`, `PortfolioItem`, `TestimonialItem`, `ProcessStep`, `StatItem` |

---

### 2. Main Agency Website Components (`/`)

| Section / Feature | Primary Component File | Supporting Files / Assets |
| :--- | :--- | :--- |
| **Page Layout & Section Sequence** | `src/App.tsx` | Modal state (`inquiryModalOpen`), route listeners |
| **Intro Splash Screen** | `src/components/common/SplashScreen.tsx` | Pure vector motion graphics sequence animating `src/components/common/logoPaths.ts` (`C_EMBLEM_PATHS` ➔ `CAPTURE_PATHS` + `CREATIVES_PATHS` + `TAGLINE_PATHS`), laser horizon sweep, and specular sheen |
| **Navbar & Header** | `src/components/common/Navbar.tsx` | Sticky blur, active section spy, mobile drawer |
| **Hero Section** | `src/components/hero/HeroSection.tsx` | Slogans, CTA buttons, background grid pattern |
| **Hero 3D Wireframe Cage & Core** | `src/components/hero/Hero3DCanvas.tsx` | Three.js Icosahedron + Octahedron WebGL canvas |
| **Quick Trust Stats** | `src/components/stats/QuickStats.tsx` | Animated counters, stat cards |
| **Services Grid** | `src/components/services/ServicesSection.tsx` | Category tabs, service deliverable pills, modal trigger |
| **Signature Difference Pipeline** | `src/components/difference/SignatureDifference.tsx` | 8-step pipeline horizontal workflow |
| **Featured Case Study (Prabhu Group)** | `src/components/casestudy/PrabhuGroupCaseStudy.tsx` | Interactive Before/After toggle, ERP modules |
| **Selected Work Portfolio** | `src/components/portfolio/SelectedWork.tsx` | Category filter, project cards, `Riffle` drawer |
| **Client Testimonials** | `src/components/testimonials/TestimonialsSection.tsx` | Testimonial quote cards, avatars |
| **Why Choose CC** | `src/components/why/WhyChooseUs.tsx` | 6-card value proposition grid |
| **Social Impact & CSR** | `src/components/impact/SocialImpact.tsx` | Yi initiatives, 10% pledge banner |
| **Achievements Showcase** | `src/components/achievements/AchievementsSection.tsx` | 2x National Badminton Gold, sports discipline |
| **5-Step Work Process** | `src/components/process/ProcessSection.tsx` | Step accordions / timeline tabs |
| **Interactive Scope & Cost Estimator** | `src/components/calculator/ProjectEstimator.tsx` | Multi-select service checklist, timeline speed, pricing calculation |
| **Dramatic CTA** | `src/components/cta/DramaticCTA.tsx` | Full-bleed conversion section |
| **Contact Form & Info** | `src/components/contact/ContactSection.tsx` | Form fields, validation, confetti, direct phone/email |
| **Project Inquiry Modal** | `src/components/common/ProjectInquiryModal.tsx` | Preselected service, budget ranges, timeline options, confetti |
| **Footer** | `src/components/common/Footer.tsx` | Social links, copyright, quick links |

---

### 3. Meely 3D & Architectural Tour Experience (`/meely`)

| Sub-system | Target File / Path | Notes |
| :--- | :--- | :--- |
| **Meely Full Page Experience** | `src/meely/MeelyPage.tsx` | Integrated Lenis smooth scroll + GSAP ScrollTrigger master pin + 3D mouse parallax + dual canvas scrub engine |
| **Preloader & Frame Decoding** | `src/meely/MeelyPage.tsx` | Decodes 99 WebP frames with real-time percentage progress bar before revealing viewport |
| **Hero Mouse Parallax Layers** | `src/meely/MeelyPage.tsx` | `bg.png` (streetscape background) + `fg.png` (building render foreground with 3D tilt & mouse depth) |
| **Unified Section Stack Pin** | `src/meely/MeelyPage.tsx` | Single continuous master pin (`+=720%`) stacking Phase 1 (Exterior) -> Phase 2 (Lobby Parallax) -> Phase 3 (Suites) |
| **Phase 1: Exterior Approach** | `src/meely/MeelyPage.tsx` | Frames 000..047 canvas scrub with live telemetry, elevation data, and dynamic camera overlay |
| **Phase 2: Grand Lobby (3D Parallax)** | `src/meely/MeelyPage.tsx` | `lobby-bg.png` + `desk-fg.png` with mouse tilt, Calacatta marble counter specs & suspended halo luminaire details |
| **Phase 3: Executive Suites Walkthrough** | `src/meely/MeelyPage.tsx` | Frames 048..098 canvas scrub with acoustic timber corridor specs & boardroom details |
| **Floating Interactive HUD Dock** | `src/meely/MeelyPage.tsx` | Spring-animated stage jump buttons (`01 Exterior`, `02 Lobby 3D`, `03 Suites`), live frame badge, and Auto-Tour controls |
| **Outro & Architectural Precision** | `src/meely/MeelyPage.tsx` | 3 detail feature cards, Return to Agency button, and smooth scroll "Back to Top" trigger |
| **Frame Image Sequence Assets** | `public/meely-frames/` | 99 total frames (`frame-000.webp` through `frame-098.webp`) |
| **Source Assets & Renders** | `src/meely/` | `bg.png`, `fg.png`, `lobby-bg.png`, `desk-fg.png` |

---

### 4. UI Lab & Experimental Components (`/demo`)

| Component / Experiment | File Path | Description |
| :--- | :--- | :--- |
| **UI Lab Main Page** | `src/demo/index.tsx` | Interactive testbed for complex widgets |
| **Agentic Factory 3D** | `src/components/ui/agentic-factory-3d.tsx` + `.css` | Heavyweight 3D interactive assembly visualizer (71 KB) |
| **Timeline** | `src/components/ui/timeline.tsx` | Vertical scrubbable timeline with progress markers |
| **Hairline Riffle** | `src/components/ui/hairline-riffle.tsx` | Interactive deck/card riffle selector (also used in Selected Work) |
| **Scroll Expansion Hero** | `src/components/ui/scroll-expansion-hero.tsx` | Expanding card hero triggered by wheel/scroll |
| **Radial Orbital Timeline** | `src/components/ui/radial-orbital-timeline.tsx` | Circular orbital node graph with physics & state |
| **Marquee** | `src/components/ui/marquee.tsx` | Smooth infinite scrolling horizontal banner |
| **UI Primitives** | `src/components/ui/badge.tsx`, `button.tsx`, `card.tsx` | Reusable Radix / Tailwind primitives |

---

### 5. Styling, Design System & Assets

| Asset / System | File Path | Details |
| :--- | :--- | :--- |
| **Global CSS & Design Tokens** | `src/index.css` | Tailwind v4 root, Syne font face, `.glass-panel`, `.glass-card`, `.bg-grid-pattern`, animations |
| **Typography Fonts** | `src/assets/fonts/syne/` & `index.html` | Syne (Variable font) + Google Fonts (Plus Jakarta Sans, Space Grotesk) |
| **Helper Utilities** | `src/lib/utils.ts` | `cn()` helper (`clsx` + `tailwind-merge`) |
| **HTML Shell & Meta** | `index.html` | Meta tags, OpenGraph, title, font preconnects, favicon |
| **Vite Configuration** | `vite.config.ts` | Plugins (React, Tailwind v4), path aliases (`@`), server settings |
| **Netlify Routing** | `netlify.toml` & `public/_redirects` | SPA client-side redirect rules (`/* -> /index.html 200`) |

---

## 🛡️ Critical Guidelines for AI Agents

1. **Do Not Hallucinate Missing Configs**: This project uses **Tailwind CSS v4** via `@import "tailwindcss";`. Do NOT look for `tailwind.config.js` or `postcss.config.js`.
2. **Never Edit Hardcoded Text in Components**: When the user asks to change prices, deliverables, testimonials, slogans, or stats, make all edits directly in `src/data/content.ts`.
3. **Route Awareness**: Notice that `App.tsx` checks both `window.location.pathname` AND `window.location.hash` (`/meely` vs `#/meely`). This ensures seamless compatibility on static hosts (Netlify/GitHub Pages).
4. **GSAP Cleanup in React 19**: If adding or editing GSAP animations, always wrap them in `gsap.context((self) => { ... }, scopeRef)` and call `ctx.revert()` in the cleanup callback to avoid duplicate triggers during re-renders.
5. **Three.js Canvas Transparencies**: Any Three.js canvas in this project (like `Hero3DCanvas.tsx`) uses `alpha: true` and `setClearColor(0x000000, 0)` to seamlessly blend with the `#FAFAF9` light mode or black dark mode backgrounds.
6. **Performance First**: Frame sequences are hosted as modern `.webp` in `public/meely-frames/`. When adding media, avoid uncompressed PNGs/AVIs.

---

## 📂 Complete Directory Tree

```
f:\WebSites\04\
├── public\
│   ├── meely-frames\       # 99 WebP frames (frame-000.webp to frame-098.webp)
│   ├── _redirects          # SPA routing redirect rule for Netlify
│   ├── capture-favicon.svg # Official SVG favicon
│   ├── Capure.svg          # Standalone C emblem asset
│   ├── capure-logo.svg     # Clean master vector brand lockup with native compound cutouts
│   ├── fulllogo.svg        # Full brand lockup legacy asset
│   └── icons.svg
├── src\
│   ├── assets\             # Syne fonts, hero assets, SVG icons
│   ├── components\
│   │   ├── achievements\   # AchievementsSection.tsx
│   │   ├── calculator\     # ProjectEstimator.tsx (interactive scope & cost calculator)
│   │   ├── casestudy\      # PrabhuGroupCaseStudy.tsx (ERP case study)
│   │   ├── common\         # Navbar.tsx, Footer.tsx, SplashScreen.tsx, ProjectInquiryModal.tsx, ErrorBoundary.tsx
│   │   ├── contact\        # ContactSection.tsx
│   │   ├── cta\            # DramaticCTA.tsx
│   │   ├── difference\     # SignatureDifference.tsx (8-step pipeline)
│   │   ├── hero\           # HeroSection.tsx, Hero3DCanvas.tsx (Three.js WebGL scene)
│   │   ├── impact\         # SocialImpact.tsx (CSR & Yi initiatives)
│   │   ├── portfolio\      # SelectedWork.tsx (projects gallery & Riffle)
│   │   ├── process\        # ProcessSection.tsx (5-step process)
│   │   ├── services\       # ServicesSection.tsx (6 core service cards)
│   │   ├── stats\          # QuickStats.tsx (trust counters)
│   │   ├── testimonials\   # TestimonialsSection.tsx
│   │   ├── ui\             # Reusable UI widgets (agentic-factory-3d, timeline, riffle, etc.)
│   │   └── why\            # WhyChooseUs.tsx (6 key reasons)
│   ├── data\
│   │   └── content.ts      # 🌟 Single source of truth for all copy & project data
│   ├── demo\
│   │   └── index.tsx       # /demo route laboratory for experimental widgets
│   ├── lib\
│   │   └── utils.ts        # cn() className merger
│   ├── meely\
│   │   └── MeelyPage.tsx   # /meely 3D parallax & 99-frame 3-phase canvas scrub showcase
│   ├── types\
│   │   └── index.ts        # TypeScript data interfaces
│   ├── App.tsx             # Root router & main single-page layout
│   ├── index.css           # Tailwind v4 entry, font imports, glass tokens
│   ├── main.tsx            # React 19 root render with ErrorBoundary
│   └── vite-env.d.ts
├── index.html              # HTML5 entry with SEO tags & Google Font links
├── netlify.toml            # Netlify build & redirect configuration
├── package.json            # Dependencies & build scripts
├── tsconfig.json           # TypeScript configuration with @ alias
└── vite.config.ts          # Vite build config with Tailwind v4 & React plugins
```
