# Ankit Pandey — Portfolio Website

My personal portfolio website built with **React 19**, **Vite 7**, **Tailwind CSS 3**, and **Framer Motion**.

## 🔗 Live Demo

👉 [ankitpandey006.github.io](https://ankitpandey006.github.io)

## ✨ Features

- **Dark / Light theme** — toggleable, persisted to localStorage
- **8 lazy-loaded sections** — Hero, About, Skills, Education, Work, Experience, Certifications, Contact
- **Animated particles** — desktop-only particle background via tsparticles
- **Smooth scroll** navigation with active section tracking
- **Responsive design** — mobile-first, optimized for all screen sizes
- **Reduced motion support** — respects `prefers-reduced-motion`
- **Contact form** — powered by Formspree (no backend needed)
- **Error boundaries** — graceful failure handling for lazy-loaded sections
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 7 (SWC) |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 12 |
| Particles | @tsparticles/react + slim |
| Icons | react-icons |
| Form | Formspree |
| Deployment | GitHub Pages (Actions) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 📁 Project Structure

```
my-portfolio/
  public/               # Static assets (robots.txt, sitemap.xml, favicon)
  src/
    App.jsx             # Root component with routing, theme, error boundaries
    main.jsx            # Entry point
    index.css           # Tailwind directives + global styles
    components/
      Navbar.jsx        # Navigation bar with mobile menu
      Footer.jsx        # Footer with links + socials
      ErrorBoundary.jsx # Error boundary for lazy-loaded sections
    sections/
      Hero.jsx          # Landing section with typing effect + particles
      About.jsx         # About me with profile image + resume
      Skills.jsx        # Tech stack grid
      Education.jsx     # Education timeline
      Work.jsx          # Project cards
      Experience.jsx    # Experience timeline
      Certification.jsx # Certificate cards with PDF preview
      Contact.jsx       # Contact form (Formspree)
    assets/             # Images, PDFs, certificates
```

## 🌐 Deployment

Deployed via GitHub Actions on every push to `main`. The workflow:
1. Installs dependencies (`npm ci`)
2. Builds the project (`npm run build`)
3. Uploads the `dist/` folder to GitHub Pages

## 📄 License

MIT
