import { useEffect, useLayoutEffect, useMemo, useState, Suspense, lazy } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// ✅ Lazy load heavy sections (better mobile + faster first paint)
const Hero = lazy(() => import("./sections/Hero"))
const About = lazy(() => import("./sections/About"))
const Skills = lazy(() => import("./sections/Skills"))
const Education = lazy(() => import("./sections/Education"))
const Work = lazy(() => import("./sections/Work"))
const Experience = lazy(() => import("./sections/Experience"))
const Certification = lazy(() => import("./sections/Certification"))
const Contact = lazy(() => import("./sections/Contact"))

export default function App() {
  const [theme, setTheme] = useState("dark")
  const isDark = theme === "dark"

  // ✅ 1) Apply saved theme BEFORE first paint (reduces flash on deploy)
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("theme")
      if (saved === "dark" || saved === "light") setTheme(saved)
    } catch {
      // ignore
    }
  }, [])

  // ✅ 2) Keep browser UI consistent (scrollbar/form controls)
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme)
    } catch {
      // ignore
    }
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
  }, [theme, isDark])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  // ✅ Lightweight fallback while lazy sections load (prevents layout jank)
  const fallback = useMemo(
    () => (
      <div className="py-16 text-center opacity-70">
        Loading…
      </div>
    ),
    []
  )

  return (
    <div
      className={[
        "min-h-screen overflow-x-hidden",
        // NOTE: keep scroll-smooth if you like it, but it can feel laggy on some Android phones
        // If mobile still lags, remove "scroll-smooth"
        "scroll-smooth",
        isDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Suspense fallback={fallback}>
        <Hero theme={theme} />
        <About theme={theme} />
        <Skills theme={theme} />
        <Education theme={theme} />
        <Work theme={theme} />
        <Experience theme={theme} />
        <Certification theme={theme} />
        <Contact theme={theme} />
      </Suspense>

      <Footer theme={theme} />
    </div>
  )
}
