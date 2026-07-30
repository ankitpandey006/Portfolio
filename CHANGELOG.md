# Changelog

## 2026-07-31 — Comprehensive Audit Fixes

### 🐛 Critical Bug Fixes
- **index.html**: Removed stray `</script>` tag that broke HTML validation
- **.github/workflows/static.yml**: Added build step (`npm ci` + `npm run build`) before deploying to GitHub Pages; changed artifact path from `.` (raw source) to `./dist` (built output)

### 🎨 Code Quality & Linting
- **eslint.config.js**: Replaced `no-unused-vars` with `react/jsx-uses-vars` rule — fixes 10+ false positives for JSX member expressions (e.g., `<motion.div>` now recognized as usage)
- **tailwind.config.js**: Removed unused `darkMode: "class"` configuration (theme handled via inline conditional classes)
- **Certification.jsx**: Removed dead `import { title } from "framer-motion/client"`
- **Contact.jsx**: Changed `catch (err)` → `catch { }` (unused variable)
- **Experience.jsx**: Removed unused `isDark` assignment in `Card` component
- Fixed `rel="noreferrer"` → `rel="noopener noreferrer"` across all 5 files (Hero, About, Work, Footer, Certification)

### 🏗 Architecture
- **App.jsx**: 
  - Replaced `useLayoutEffect` + `setTheme()` with `useState(getInitialTheme)` — eliminates cascading renders (fixes lint warning)
  - Wrapped each lazy-loaded section in individual `ErrorBoundary` + `Suspense` — prevents single chunk failure from blanking entire page
  - Removed unused `useLayoutEffect` and `useMemo` imports
- **ErrorBoundary.jsx (new)**: Class component with retry button for graceful failure handling

### 🌐 SEO
- **index.html**:
  - Added canonical URL
  - Added Open Graph meta tags (og:title, og:description, og:url, og:type)
  - Added Twitter Card meta tags
  - Added JSON-LD Person schema structured data
  - Added Content Security Policy meta tag
  - Added meta keywords and author
  - Updated title to "Ankit Pandey | Software Developer Portfolio"
  - Enhanced meta description
- **public/robots.txt (new)**: Allows all crawlers, points to sitemap
- **public/sitemap.xml (new)**: Basic sitemap with single URL entry

### 🔒 Security
- **index.html**: Added Content Security Policy (CSP) meta tag
- All external links: `rel="noreferrer"` → `rel="noopener noreferrer"` (5 files)

### ♿ Accessibility
- **Contact.jsx**: Added `<label htmlFor>` with `sr-only` class for each form field (WCAG 1.3.1)
- **index.html**: Theme flash prevention now applies actual inline styles (backgroundColor + color) instead of unused CSS classes

### 📱 UX Improvements
- **Experience.jsx**: Changed "View All" button from no-op (`#experience`) to meaningful LinkedIn profile link
- **App.jsx**: Section fallback now uses a Component instead of `useMemo` (simpler, no stale closure risk)

### 📄 Documentation
- **README.md**: Replaced default Vite template with custom project documentation
- **CHANGELOG.md (new)**: This file

### 🏗 Architecture (round 2)
- **App.jsx**: Moved `Section` and `SectionFallback` components outside `App()` — prevents unnecessary remounts of all 8 lazy sections on every theme toggle (critical fix from code review)

### 🔧 ESLint
- **eslint.config.js**: Added `settings.react.version: 'detect'` and disabled `react/prop-types` rule to eliminate 84 false-positive warnings in a non-TypeScript project

### 🔒 Security
- **index.html**: Removed unused `https://docs.google.com` from CSP `frame-src`

### 🛠 Performance
- **index.html**: Theme flash prevention now applies inline styles directly (no JavaScript framework needed)
- **tailwind.config.js**: Removed unused `darkMode` config (dead config eliminated)
