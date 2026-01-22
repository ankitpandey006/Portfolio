import { useEffect, useMemo, useState } from "react"
import {
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certification", label: "Certification" },
  { id: "contact", label: "Contact" },
]

export default function Navbar({ theme = "dark", onToggleTheme }) {
  const isDark = theme === "dark"
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  const linkClass = useMemo(
    () => (id) =>
      [
        "transition",
        active === id
          ? "text-orange-500 font-semibold"
          : isDark
          ? "text-white/70 hover:text-white"
          : "text-black/70 hover:text-black",
      ].join(" "),
    [active, isDark]
  )

  // ✅ Simple & SAFE scroll-based active section
  useEffect(() => {
    const onScroll = () => {
      let current = "home"
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= 140) current = id
        }
      })
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => (document.body.style.overflow = "")
  }, [open])

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div
          className={[
            "flex items-center justify-between rounded-full px-4 py-3",
            isDark
              ? "bg-black/70 border border-white/10 lg:backdrop-blur"
              : "bg-white/80 border border-black/10 lg:backdrop-blur",
          ].join(" ")}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="font-semibold tracking-wide"
          >
            Ankit<span className="text-orange-500">.</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={linkClass(s.id)}>
                {s.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
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

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden text-xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className={[
              "mt-4 rounded-2xl p-5 space-y-4 lg:hidden",
              isDark
                ? "bg-black/90 border border-white/10"
                : "bg-white/95 border border-black/10",
            ].join(" ")}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={linkClass(s.id)}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
