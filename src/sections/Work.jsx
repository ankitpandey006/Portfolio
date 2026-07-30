import { motion, useReducedMotion } from "framer-motion"
import { FaCode, FaExternalLinkAlt } from "react-icons/fa"

// ✅ Import images from src/assets/projects
import rpsImg from "../assets/projects/rps.png"
import tttImg from "../assets/projects/ttt.png"

const PROJECTS = [
  {
    title: "Rock Paper Scissors",
    view: "https://ankitpandey006.github.io/Rock-Paper-Scissora-Project/",
    code: "https://github.com/ankitpandey006/Rock-Paper-Scissora-Project",
    image: rpsImg,
  },
  {
    title: "Tic Tac Toe",
    view: "https://ankitpandey006.github.io/Tic-Tac-Toe-/",
    code: "https://github.com/ankitpandey006/Tic-Tac-Toe-",
    image: tttImg,
  },
]

export default function Work({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="work"
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      {/* ✅ background glow (DESKTOP ONLY for ultra smooth mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div
          className={[
            "absolute right-[-140px] top-[-120px] h-[520px] w-[720px] rounded-full blur-[140px]",
            isDark ? "bg-purple-600/25" : "bg-purple-500/18",
          ].join(" ")}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Projects <span className="text-purple-500">Made</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-7 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, idx) => (
            <ProjectCard
              key={p.title}
              p={p}
              idx={idx}
              theme={theme}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, idx, theme, reduceMotion }) {
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: idx * 0.04 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={[
        "rounded-2xl overflow-hidden border shadow-lg group",
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative h-[190px] sm:h-[210px] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className={[
            "h-full w-full object-cover transition duration-300",
            reduceMotion ? "" : "group-hover:scale-105",
          ].join(" ")}
        />

        {/* Hover actions (desktop hover) */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition hidden sm:flex items-center justify-center gap-4">
          <a
            href={p.view}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold flex items-center gap-2 hover:opacity-90"
          >
            <FaExternalLinkAlt size={14} /> View
          </a>
          <a
            href={p.code}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold flex items-center gap-2 hover:opacity-90"
          >
            <FaCode size={14} /> Code
          </a>
        </div>
      </div>

      {/* Mobile actions (tap-friendly, always visible) */}
      <div className="sm:hidden px-4 pt-4 flex items-center justify-center gap-3">
        <a
          href={p.view}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white text-black font-semibold flex items-center gap-2 active:opacity-80"
        >
          <FaExternalLinkAlt size={14} /> View
        </a>
        <a
          href={p.code}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold flex items-center gap-2 active:opacity-80"
        >
          <FaCode size={14} /> Code
        </a>
      </div>

      {/* Yellow title strip */}
      <div className="bg-yellow-400 text-black font-bold px-5 py-3 mt-4 sm:mt-0">
        {p.title}
      </div>
    </motion.div>
  )
}
