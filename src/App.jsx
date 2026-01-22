import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Education from "./sections/Education"
import Work from "./sections/Work"
import Experience from "./sections/Experience"
import Certification from "./sections/Certification"
import Contact from "./sections/Contact"

export default function App() {
  const [theme, setTheme] = useState("dark")
  const isDark = theme === "dark"

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)

    // ✅ helps browser UI (scrollbar/form controls) match theme
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
  }, [theme, isDark])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <div
      className={[
        "min-h-screen overflow-x-hidden scroll-smooth",
        isDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Hero theme={theme} />
      <About theme={theme} />
      <Skills theme={theme} />
      <Education theme={theme} />
      <Work theme={theme} />
      <Experience theme={theme} />
      <Certification theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}
