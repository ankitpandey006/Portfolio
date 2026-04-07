import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SiLeetcode } from "react-icons/si"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"


// Particles
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

// ✅ Typing Effect Hook
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

  // ✅ Particle control
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile || reduceMotion) return

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
    const color = isDark ? "#ffffff" : "#111827"

    return {
      background: { color: { value: "transparent" } },
      fpsLimit: 45,
      particles: {
        color: { value: color },
        links: {
          color: color,
          distance: 140,
          enable: true,
          opacity: isDark ? 0.16 : 0.1,
          width: 1,
        },
        move: { enable: true, speed: 1 },
        number: { value: 55, density: { enable: true, area: 1000 } },
        opacity: { value: isDark ? 0.35 : 0.28 },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }
  }, [isDark])

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center ${
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black"
      }`}
    >
      {/* ✅ Particles */}
      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 -z-10"
        />
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 pb-14 w-full">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7 }}
          className="text-center"
        >
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold opacity-80">
            Hi There,
          </h2>

          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold">
            I&apos;m <span className="text-orange-500">Ankit Pandey</span>
          </h1>

          {/* Typing */}
          <p className="mt-4 text-base sm:text-lg opacity-70">
            I Am Into{" "}
            <span className="font-semibold text-orange-500">{typed}</span>
            <span className="ml-1">|</span>
          </p>

          {/* Buttons */}
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <a
              href="#about"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:opacity-90"
            >
              About
            </a>
            <a
              href="#contact"
              className={`px-6 py-3 rounded-full font-semibold border ${
                isDark
                  ? "border-white/20 hover:border-white/40"
                  : "border-black/20 hover:border-black/40"
              }`}
            >
              Contact
            </a>
          </div>

          {/* ✅ Social Icons */}
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            {[
              
              { Icon: FaGithub, href: "https://github.com/ankitpandey006" },
              { Icon: SiLeetcode, href: "https://leetcode.com/u/ankitpandey006/" },
              { Icon: FaLinkedin, href: "https://www.linkedin.com/in/ankit-pandey-4699a8286/" },
              { Icon: FaInstagram, href: "https://www.instagram.com/ankitpandey006/" }
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`h-10 w-10 rounded-full grid place-items-center transition ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white/80 hover:text-orange-500"
                    : "bg-black/5 border border-black/10 text-black/80 hover:text-orange-500"
                }`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}