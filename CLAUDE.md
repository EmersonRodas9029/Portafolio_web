# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site (Spanish) for Emerson Eduardo Rodas López — static HTML5/CSS3/vanilla JS, no framework, no bundler-required runtime. `index.html` is the single real page; everything is rendered client-side from data hardcoded in JS.

## Commands

- `npm run dev` — serve locally via `live-server .` (no build step, just opens `index.html` with live reload). This is the normal way to preview changes.
- `npm start` / `npm run build` — reference `webpack.config.dev.js` / `webpack.config.prod.js`, which **do not exist** in the repo (only `webpack.common.js` is present). These scripts are currently broken; don't rely on them without first creating the missing configs.
- No test suite exists (`npm test` is a stub that exits with an error). No linter is configured.

## Architecture

**Entry point**: `js/main.js` defines `PortfolioApp`, instantiated on `DOMContentLoaded`. Its `init()` runs three phases:
1. `initializeModules()` — wires up all the feature modules (theme, nav, animations, scroll, CV download, contact form, hero effects, floating tech icons).
2. `loadDynamicContent()` — renders skills, projects, experience, and animated stats. **Content is hardcoded as JS arrays/objects inside `main.js`** (skills list, projects list, experience list) rather than fetched or stored in JSON — to change the displayed skills/projects/experience, edit the data literals directly in `main.js`.
3. `setupGlobalEvents()` — global error handling and a basic performance-timing log.

**Module map** (`js/`, all ES modules imported by `main.js`):
- `theme.js` — `ThemeManager` class; toggles `data-theme` on `<html>` and swaps the `light.css`/`dark.css` `<link>` tags (`#theme-stylesheet` / `#dark-theme-stylesheet`) between enabled/disabled. Persists choice to `localStorage` under `portfolio-theme`, defaulting to `dark`.
- `navigation.js` — nav bar behavior (mobile menu toggle, active link highlighting, etc.).
- `animations.js` / `hero.js` / `floating-tech.js` — scroll-reveal and decorative animation logic; `floating-tech.js` renders the animated floating tech icons around the Hero section (desktop-only, hidden on mobile).
- `icons-config.js` — single source of truth mapping skill/tech/social names to Font Awesome icon classes (`IconsConfig`), plus `getIcon()` / `renderIcon()` helpers used everywhere icons are rendered dynamically. When adding a new skill or technology, add its icon mapping here.
- `contact.js` + `emailjs-config.js` — contact form submission via EmailJS (`@emailjs/browser`); `emailjs-config.js` holds the service/template/public keys and `sendEmail()`.
- `cv-download.js` — CV download button logic; dispatches a `cvDownloaded` custom event, served from `docs/*.pdf`.
- `utils/scroll.js` — scroll-triggered reveal effects (IntersectionObserver-based, paired with `.reveal-item` elements).
- `utils/validateForm.js` — form field validation helpers used by `contact.js`.

**CSS** (`css/`): `base.css` and `layout.css` are loaded first (preloaded in `<head>`), then `components.css`, then theme files (`themes/light.css` / `themes/dark.css`, one enabled at a time per `theme.js`), then `custom/animations.css` and `custom/sections.css`. Follow this cascade order when adding new stylesheets — later files should not need to fight specificity with earlier ones.

**`pages/`**: `blog.html`, `contacto.html`, `proyectos.html` are empty placeholder stubs (10-line skeletons, no content, no asset links) — not yet wired into the site. Don't assume they mirror `index.html`'s structure.

**External dependencies loaded via CDN in `index.html`** (not npm): Font Awesome (icons) and the EmailJS browser SDK. `@emailjs/browser` is also an npm dependency but the CDN `<script>` tag is what's actually used at runtime, not a bundled import.

**Content/SEO**: `index.html` carries full SEO meta tags, Open Graph tags, and a `Person` JSON-LD schema block — keep these in sync if changing name, title, or canonical URL (`https://emersonrodas.dev`).
