import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"

// ✅ Lazy load particles only when needed
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

// Simple typing effect (same)
function useTypeCycle(words, speed = 55, pause = 900) {
  const [i, setI] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    const done = sub === word.length
    const empty = sub === 0

    const t = setTimeout(() => {
      if (!deleting && !done) setSub((s) => s + 1)
      else if (!deleting && done) setDeleting(true)
      else if (deleting && !empty) setSub((s) => s - 1)
      else if (deleting && empty) {
        setDeleting(false)
        setI((x) => x + 1)
      }
    }, deleting ? speed / 1.8 : done ? pause : speed)

    return () => clearTimeout(t)
  }, [words, i, sub, deleting, speed, pause])

  const word = words[i % words.length]
  return word.slice(0, sub)
}

export default function Hero({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  // ✅ Mobile detect + delay particles for smooth first paint
  const [showParticles, setShowParticles] = useState(false)
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile || reduceMotion) return

    // show particles after page becomes stable
    const t = setTimeout(() => setShowParticles(true), 900)
    return () => clearTimeout(t)
  }, [reduceMotion])

  const typed = useTypeCycle(
    ["Web Development", "UI/UX Design", "Data Analytics", "Competitive Programming"],
    55,
    900
  )

  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const particlesOptions = useMemo(() => {
    const line = isDark ? "#ffffff" : "#111827"
    const dot = isDark ? "#ffffff" : "#111827"

    return {
      background: { color: { value: "transparent" } },
      // ✅ lower fps for ultra smooth (still looks great)
      fpsLimit: 45,
      particles: {
        color: { value: dot },
        links: {
          color: line,
          distance: 140,
          enable: true,
          opacity: isDark ? 0.16 : 0.10,
          width: 1,
        },
        move: { enable: true, speed: 1.0, outModes: { default: "bounce" } },
        // ✅ fewer particles for performance
        number: { value: 55, density: { enable: true, area: 1000 } },
        opacity: { value: isDark ? 0.35 : 0.28 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }
  }, [isDark])

  return (
    <section
      id="home"
      className={[
        "relative min-h-screen flex items-center",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      {/* ✅ Particles only when allowed */}
      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 -z-10"
        />
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16 w-full">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className={["text-xl sm:text-2xl font-semibold", isDark ? "text-white/80" : "text-black/80"].join(" ")}>
            Hi There,
          </h2>

          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            I&apos;m <span className="text-orange-500">Ankit Pandey</span>
          </h1>

          <p className={["mt-4 text-base sm:text-lg break-words", isDark ? "text-white/70" : "text-black/70"].join(" ")}>
            I Am Into{" "}
            <span className="font-semibold text-orange-500">{typed}</span>
            <span className={["inline-block w-[10px] ml-1", isDark ? "text-white/80" : "text-black/80"].join(" ")}>
              |
            </span>
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="#about" className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:opacity-90 transition">
              About
            </a>
            <a
              href="#contact"
              className={[
                "px-6 py-3 rounded-full font-semibold transition",
                isDark ? "border border-white/15 text-white hover:border-white/30" : "border border-black/15 text-black hover:border-black/30",
              ].join(" ")}
            >
              Contact
            </a>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            {[
              { Icon: FaGithub, href: "https://github.com/ankitpandey006" },
              { Icon: FaLinkedin, href: "https://www.linkedin.com/in/ankit-pandey-4699a8286/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
              { Icon: FaInstagram, href: "https://www.instagram.com/ankitpandey006/" },
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={[
                  "h-9 w-9 rounded-full grid place-items-center transition",
                  isDark ? "bg-white/5 border border-white/10 text-white/80 hover:text-orange-500" : "bg-black/5 border border-black/10 text-black/80 hover:text-orange-500",
                ].join(" ")}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
