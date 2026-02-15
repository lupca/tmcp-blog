# TMCP Blog — Complete UI Redesign

Redesign the `tmcp-blog` Astro project from the default starter template into a premium, dark-themed tech blog focused on **AI Agents** and **DevOps**. Inspired by Vercel Blog, Smashing Magazine, and HashiCorp blog design patterns.

## Design Decisions

### Visual Direction
- **Dark mode primary** — deep charcoal background (`#0a0a0f`) with subtle blue/purple accent gradients
- **Typography**: Inter (Google Fonts) — the standard for modern tech blogs
- **Color palette**: Deep dark base + cyan/violet accent gradients for CTAs, tags, and hero elements
- **Glassmorphism cards** — frosted glass post cards with subtle borders and backdrop blur
- **Micro-animations** — hover lifts, gradient shifts, reading progress bar, fade-in on scroll

### Architecture — Centralized Content

All static text content (not from DB) lives in a single file `src/consts.ts`:

```typescript
// src/consts.ts — ALL static content in one place
export const SITE = {
  title: 'TMCP Engineering',
  description: 'Deep dives into AI Agents, DevOps, and modern infrastructure',
  url: 'https://blog.tmcp.io',
  language: 'en',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const SOCIAL_LINKS = [
  { platform: 'github', url: 'https://github.com/tmcp', label: 'GitHub' },
  { platform: 'twitter', url: 'https://x.com/tmcp', label: 'X / Twitter' },
];

export const TOPICS = [...];
export const HERO = {...};
export const ABOUT = {...};
export const FOOTER = {...};
```

### Semantic HTML for AI + Human Readability
- Proper `<article>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<header>`, `<footer>` tags
- JSON-LD structured data (`BlogPosting`, `Organization`) in `<head>`
- `<meta>` OpenGraph + Twitter cards
- Semantic heading hierarchy (`h1` → `h2` → `h3`)
- `<time datetime="...">` for dates
- RSS feed preserved
- Sitemap integration preserved

---

## File Changes

### Centralized Content & Config

| File | Action | Description |
|------|--------|-------------|
| `src/consts.ts` | MODIFY | Rewritten as centralized content store with `SITE`, `NAV_LINKS`, `SOCIAL_LINKS`, `TOPICS`, `HERO`, `ABOUT`, `FOOTER` |
| `src/content.config.ts` | MODIFY | Added optional `tags` field (string array) to blog schema |
| `astro.config.mjs` | MODIFY | Updated `site` URL to `https://blog.tmcp.io` |

### Design System

| File | Action | Description |
|------|--------|-------------|
| `src/styles/global.css` | MODIFY | Complete rewrite: dark theme CSS custom properties, Inter font, glassmorphism utilities, animations, responsive breakpoints, reading progress bar |

### Components

| File | Action | Description |
|------|--------|-------------|
| `src/components/BaseHead.astro` | MODIFY | Inter font loading, JSON-LD `Organization` schema, enhanced meta tags |
| `src/components/Header.astro` | MODIFY | Sticky dark glassmorphism navbar, mobile hamburger menu, gradient active indicator |
| `src/components/Footer.astro` | MODIFY | Multi-column footer (nav, topics, social), content from `FOOTER` const |
| `src/components/PostCard.astro` | **NEW** | Glassmorphism card with hover lift, hero image overlay, tags, `featured` variant |
| `src/components/TagBadge.astro` | **NEW** | Pill-shaped tag badge with cyan accent |
| `src/components/HeaderLink.astro` | **DELETE** | Merged into Header component |
| `src/components/FormattedDate.astro` | MODIFY | Minor update, no breaking changes |

### Pages

| File | Action | Description |
|------|--------|-------------|
| `src/pages/index.astro` | MODIFY | Animated gradient hero, featured posts from PocketBase, topics grid, CTA |
| `src/pages/blog/index.astro` | MODIFY | Responsive `PostCard` grid, PocketBase integration preserved, graceful error handling |
| `src/pages/blog/[slug].astro` | MODIFY | Reading progress bar, JSON-LD `BlogPosting` schema, tags display |
| `src/pages/about.astro` | MODIFY | Standalone page with mission/focus areas from `ABOUT` const |
| `src/pages/rss.xml.js` | MODIFY | Updated to use new `SITE` const structure |

### Layout

| File | Action | Description |
|------|--------|-------------|
| `src/layouts/BlogPost.astro` | MODIFY | Reading progress bar, `BlogPosting` JSON-LD, dark theme prose styling |

### Content

| File | Action | Description |
|------|--------|-------------|
| `src/content/blog/building-ai-agents.md` | **NEW** | "Building Production-Ready AI Agents: Architecture Patterns" |
| `src/content/blog/gitops-pipeline.md` | **NEW** | "GitOps in Practice: Automating Your Deployment Pipeline" |
| `src/content/blog/devops-observability.md` | **NEW** | "Modern Observability Stack: From Logs to Traces" |
| `src/content/blog/*.md` (old) | **DELETE** | 5 lorem ipsum placeholder posts removed |
| `src/assets/hero-*.png` | **NEW** | Generated hero images for the 3 sample posts |
| `src/assets/blog-placeholder-*.jpg` | **DELETE** | Old placeholder images removed |

---

## How to Run

```bash
# Development
npm run dev

# Build
npm run build
```

> **Note:** The `/blog` page fetches posts from PocketBase. If PocketBase is not running or the `posts` collection doesn't exist, the page shows an empty state gracefully. The 3 sample `.md` posts are served via Astro's content collection for RSS and local rendering.

---

## CSS Custom Properties Reference

```css
/* Base colors */
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-tertiary: #1a1a2e;

/* Accents */
--accent-cyan: #22d3ee;
--accent-violet: #a78bfa;
--gradient-primary: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));

/* Glass effect */
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: 12px;
```

## Editing Content

All static text is in `src/consts.ts`. To change the site name, navigation, social links, hero section, about page, or footer — edit that file.

Blog posts are fetched from PocketBase at runtime. The schema expects: `title`, `slug`, `description`, `content`, `status`, `heroImage`, `tags`, `created`.
