import { useEffect, useMemo, useRef, useState } from "react"
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const resumePdf = new URL("../assets/Ankit_Pandey_Resume.pdf", import.meta.url).href

// Main navigation — only these items appear in the navbar.
// Skills, Education, Work Experience and Certifications still live on the
// page; they are just not part of the main navigation.
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export default function Navbar({ theme = "light", onToggleTheme }) {
  const isDark = theme === "dark"
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")
  const menuRef = useRef()

  const linkClass = useMemo(
    () => (id) =>
      [
        "block py-2 text-base transition",
        active === id
          ? "text-orange-500 font-semibold"
          : isDark
          ? "text-white/70 hover:text-white"
          : "text-black/70 hover:text-black",
      ].join(" "),
    [active, isDark]
  )

  // ✅ Smooth scroll
  const handleClick = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  // ✅ Active section tracking
  useEffect(() => {
    const onScroll = () => {
      let current = "home"
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= 120) current = id
        }
      })
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ✅ Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => (document.body.style.overflow = "")
  }, [open])

  // ✅ Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [open])

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div
          className={[
            "flex items-center justify-between rounded-full px-4 py-3 backdrop-blur",
            isDark
              ? "bg-black/70 border border-white/10"
              : "bg-white/80 border border-black/10",
          ].join(" ")}
        >
          {/* Logo */}
          <button
            onClick={() => handleClick("home")}
            className="font-semibold text-lg"
          >
            Ankit<span className="text-orange-500">.</span>
          </button>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {NAV_ITEMS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                aria-current={active === s.id ? "page" : undefined}
                className={[
                  "relative py-1 transition",
                  active === s.id
                    ? "text-orange-500 font-medium"
                    : isDark
                    ? "text-white/70 hover:text-white"
                    : "text-black/70 hover:text-black",
                ].join(" ")}
              >
                {s.label}
                {/* Subtle active indicator */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-4 rounded-full bg-orange-500 transition-opacity duration-300",
                    active === s.id ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={[
                "h-9 w-16 rounded-full flex items-center px-1 transition",
                isDark
                  ? "bg-white/10 border border-white/10"
                  : "bg-black/10 border border-black/10",
              ].join(" ")}
            >
              <span
                className={[
                  "h-7 w-7 rounded-full grid place-items-center transition",
                  isDark
                    ? "bg-white text-black translate-x-7"
                    : "bg-black text-white translate-x-0",
                ].join(" ")}
              >
                {isDark ? <FaMoon size={14} /> : <FaSun size={14} />}
              </span>
            </button>

            {/* Resume CTA (desktop) */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Resume
            </a>

            {/* Menu button (mobile) */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        {open && (
          <div
            ref={menuRef}
            className={[
              "mt-3 rounded-2xl p-5 space-y-2 animate-fadeIn",
              isDark
                ? "bg-black/95 border border-white/10"
                : "bg-white/95 border border-black/10",
            ].join(" ")}
          >
            {NAV_ITEMS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className={linkClass(s.id)}
              >
                {s.label}
              </button>
            ))}
            {/* Resume CTA (mobile) */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
