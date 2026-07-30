import { useEffect, useState, Suspense, lazy } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"

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
  return "dark"
}

// Defined outside App to prevent remounts on every render (critical for lazy-loaded sections)
function SectionFallback() {
  return <div className="py-16 text-center opacity-70">Loading&hellip;</div>
}

function Section({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === "dark"

  // Sync theme to localStorage and document
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme)
    } catch {
      // localStorage unavailable
    }
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
  }, [theme, isDark])

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

      <Section><Hero theme={theme} /></Section>
      <Section><About theme={theme} /></Section>
      <Section><Skills theme={theme} /></Section>
      <Section><Education theme={theme} /></Section>
      <Section><Work theme={theme} /></Section>
      <Section><Experience theme={theme} /></Section>
      <Section><Certification theme={theme} /></Section>
      <Section><Contact theme={theme} /></Section>

      <Footer theme={theme} />
    </div>
  )
}
