import { motion, useReducedMotion } from "framer-motion"
import { FaBriefcase } from "react-icons/fa"

const EXPERIENCES = [
  {
    title: "Design Lead",
    company: "Google Developer Group Patna (GDG Patna)",
    date: "2025 - Present",
    side: "right",
  },
  {
    title: "Web Development Intern",
    company: "Internship",
    date: "June 2024 - July 2024",
    side: "left",
  },
]

export default function Experience({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="experience"
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55 }}
          className="text-center mb-12 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
            <FaBriefcase className={isDark ? "text-white/70" : "text-black/70"} />
            <span className="text-purple-500">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={[
              "absolute top-0 bottom-0 w-[4px] sm:w-[6px] rounded-full",
              "left-5 md:left-1/2 md:-translate-x-1/2",
              isDark ? "bg-white/20" : "bg-black/15",
            ].join(" ")}
          />

          <div className="space-y-12">
            {EXPERIENCES.map((item, idx) => (
              <TimelineItem
                key={idx}
                item={item}
                idx={idx}
                theme={theme}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          {/* View All Button (✅ no jump jank) */}
          <div className="flex justify-center mt-14">
            <a
              href="#experience"
              className="px-8 py-3 rounded-xl font-semibold shadow-lg bg-indigo-600 text-white hover:opacity-90 transition"
            >
              View All →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, idx, theme, reduceMotion }) {
  const isRight = item.side === "right"
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: idx * 0.04 }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
    >
      {/* LEFT (desktop only) */}
      <div className={isRight ? "hidden md:block" : "hidden md:flex md:justify-end"}>
        {!isRight && <Card item={item} theme={theme} />}
      </div>

      {/* RIGHT (desktop only) */}
      <div className={isRight ? "hidden md:flex md:justify-start" : "hidden md:block"}>
        {isRight && <Card item={item} theme={theme} />}
      </div>

      {/* MOBILE CARD (render ONCE) */}
      <div className="md:hidden pl-12">
        <Card item={item} theme={theme} />
      </div>

      {/* Center Icon */}
      <div
        className={[
          "absolute top-1/2 -translate-y-1/2",
          "left-5 md:left-1/2 md:-translate-x-1/2",
        ].join(" ")}
      >
        <div
          className={[
            "h-10 w-10 md:h-12 md:w-12 rounded-full border-4 grid place-items-center shadow-lg",
            isDark ? "bg-black border-orange-500" : "bg-white border-orange-500",
          ].join(" ")}
        >
          <FaBriefcase className={isDark ? "text-white" : "text-black"} />
        </div>
      </div>
    </motion.div>
  )
}

function Card({ item, theme }) {
  const isRight = item.side === "right"
  const isDark = theme === "dark"

  return (
    <div className="relative w-full max-w-xl">
      {/* Arrow (desktop only) */}
      <div
        className={[
          "absolute top-1/2 -translate-y-1/2 hidden md:block",
          isRight
            ? "left-[-10px] border-y-[10px] border-y-transparent border-r-[10px] border-r-orange-500"
            : "right-[-10px] border-y-[10px] border-y-transparent border-l-[10px] border-l-orange-500",
        ].join(" ")}
      />

      <div className="rounded-xl p-5 sm:p-6 shadow-xl bg-orange-500 text-black">
        <h3 className="text-xl sm:text-2xl font-extrabold">{item.title}</h3>
        <p className="mt-1 font-semibold opacity-90">{item.company}</p>
        <p className="mt-1 text-sm font-semibold opacity-80">{item.date}</p>
      </div>
    </div>
  )
}
