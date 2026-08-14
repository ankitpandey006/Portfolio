import { useEffect, useLayoutEffect, useState, Suspense, lazy } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import {
  HeroSkeleton,
  AboutSkeleton,
  SkillsSkeleton,
  EducationSkeleton,
  ProjectSkeleton,
  ExperienceSkeleton,
  CertificationSkeleton,
  ContactSkeleton,
} from "./components/Skeletons"

// Lazy load sections for faster first paint
const Hero = lazy(() => import("./sections/Hero"))
const About = lazy(() => import("./sections/About"))
const Skills = lazy(() => import("./sections/Skills"))
const Education = lazy(() => import("./sections/Education"))
const Work = lazy(() => import("./sections/Work"))
const Experience = lazy(() => import("./sections/Experience"))
const Certification = lazy(() => import("./sections/Certification"))
const Contact = lazy(() => import("./sections/Contact"))

// Initialize theme from localStorage synchronously (no cascading effects)
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme")
    if (saved === "dark" || saved === "light") return saved
  } catch {
    // localStorage unavailable
  }
  return "light"
}

// Defined outside App to prevent remounts on every render (critical for lazy-loaded sections)
function SectionFallback({ theme, kind }) {
  const map = {
    hero: <HeroSkeleton theme={theme} />,
    about: <AboutSkeleton theme={theme} />,
    skills: <SkillsSkeleton theme={theme} />,
    education: <EducationSkeleton theme={theme} />,
    work: <ProjectSkeleton theme={theme} />,
    experience: <ExperienceSkeleton theme={theme} />,
    certification: <CertificationSkeleton theme={theme} />,
    contact: <ContactSkeleton theme={theme} />,
  }

  return map[kind] || null
}

function Section({ children, theme, kind }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionFallback theme={theme} kind={kind} />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === "dark"

  // Apply theme as early as possible to avoid a dark-mode flash on fresh loads
  useLayoutEffect(() => {
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
  }, [isDark])

  // Sync theme to localStorage and document
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <div
      className={[
        "min-h-screen overflow-x-hidden",
        "scroll-smooth",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Section theme={theme} kind="hero"><Hero theme={theme} /></Section>
      <Section theme={theme} kind="about"><About theme={theme} /></Section>
      <Section theme={theme} kind="skills"><Skills theme={theme} /></Section>
      <Section theme={theme} kind="education"><Education theme={theme} /></Section>
      <Section theme={theme} kind="work"><Work theme={theme} /></Section>
      <Section theme={theme} kind="experience"><Experience theme={theme} /></Section>
      <Section theme={theme} kind="certification"><Certification theme={theme} /></Section>
      <Section theme={theme} kind="contact"><Contact theme={theme} /></Section>

      <Footer theme={theme} />
    </div>
  )
}
