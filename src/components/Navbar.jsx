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

  // Close menu on hash change (when user taps a link)
  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Active section detect (mobile + desktop reliable)
  useEffect(() => {
    // Prefer IntersectionObserver for accuracy
    const ids = SECTIONS.map((s) => s.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if ("IntersectionObserver" in window && elements.length) {
      const obs = new IntersectionObserver(
        (entries) => {
          // pick the most visible intersecting section
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
          if (visible?.target?.id) setActive(visible.target.id)
        },
        {
          // header offset feel: mark active when section is near top
          root: null,
          rootMargin: "-120px 0px -60% 0px",
          threshold: [0.1, 0.25, 0.5, 0.75],
        }
      )

      elements.forEach((el) => obs.observe(el))
      return () => obs.disconnect()
    }

    // Fallback: scroll position method
    const onScroll = () => {
      let current = "home"
      SECTIONS.forEach(({ id }) => {
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

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div
          className={[
            "flex items-center justify-between rounded-full px-4 py-3",
            isDark
              ? "bg-black/40 border border-white/10 backdrop-blur"
              : "bg-white/70 border border-black/10 backdrop-blur",
          ].join(" ")}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className={[
              "font-semibold tracking-wide",
              isDark ? "text-white" : "text-black",
            ].join(" ")}
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
            {/* Socials */}
            <a
              href="https://github.com/ankitpandey006"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={[
                "h-9 w-9 rounded-full grid place-items-center transition",
                isDark
                  ? "bg-white/5 border border-white/10 text-white/80 hover:text-orange-500"
                  : "bg-black/5 border border-black/10 text-black/80 hover:text-orange-500",
              ].join(" ")}
            >
              <FaGithub />
            </a>

            <a
              href="www.linkedin.com/in/ankitpandey006"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={[
                "h-9 w-9 rounded-full grid place-items-center transition",
                isDark
                  ? "bg-white/5 border border-white/10 text-white/80 hover:text-orange-500"
                  : "bg-black/5 border border-black/10 text-black/80 hover:text-orange-500",
              ].join(" ")}
            >
              <FaLinkedin />
            </a>

            {/* Theme Toggle */}
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

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={[
                "lg:hidden text-xl",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
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
                ? "bg-black/80 border border-white/10"
                : "bg-white/90 border border-black/10",
            ].join(" ")}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={["block", linkClass(s.id)].join(" ")}
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
