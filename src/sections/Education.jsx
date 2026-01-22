import { motion, useReducedMotion } from "framer-motion"
import { FaGraduationCap } from "react-icons/fa"

import bceImg from "../assets/educations/bce.jpg"
import class12Img from "../assets/educations/class12.jpg"
import class10Img from "../assets/educations/class10.jpg"

/* ===== EDUCATION DATA ===== */
const EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    institute: "Bakhtiyarpur College of Engineering",
    meta: "2023 - 2027 | Pursuing",
    image: bceImg,
  },
  {
    degree: "Class 12th (Intermediate)",
    institute: "Bihar Board (BSEB)",
    meta: "2021 - 2023 | Completed",
    image: class12Img,
  },
  {
    degree: "Class 10th (Matric)",
    institute: "Bihar Board (BSEB)",
    meta: "2020 - 2021 | Completed",
    image: class10Img,
  },
]

export default function Education({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="education"
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      {/* ✅ Background glow (DESKTOP ONLY for ultra smooth mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div
          className={[
            "absolute top-[-140px] right-[-140px] h-[520px] w-[720px] rounded-full blur-[140px]",
            isDark ? "bg-purple-600/25" : "bg-purple-500/20",
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-[-160px] left-[-160px] h-[520px] w-[520px] rounded-full blur-[140px]",
            isDark ? "bg-fuchsia-500/15" : "bg-fuchsia-500/10",
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
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <FaGraduationCap className={isDark ? "text-white/70" : "text-black/70"} />
            <span>My</span>
            <span className="text-purple-500">Education</span>
          </h2>

          <p
            className={[
              "mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-semibold px-2",
              isDark ? "text-lime-200/90" : "text-emerald-700",
            ].join(" ")}
          >
            Education Is Not The Learning Of Facts, But The Training Of The Mind To Think.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 sm:mt-14 space-y-8 sm:space-y-10">
          {EDUCATION.map((item, index) => (
            <EducationCard
              key={item.degree}
              item={item}
              index={index}
              theme={theme}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== CARD COMPONENT ===== */
function EducationCard({ item, index, theme, reduceMotion }) {
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: index * 0.04 }}
      // ✅ hover only matters on desktop; mobile ignores hover anyway
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={[
        "rounded-2xl overflow-hidden border",
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
      ].join(" ")}
    >
      <div className="grid md:grid-cols-[320px_1fr]">
        {/* Left Image (fixed height prevents layout shift) */}
        <div className="h-[200px] sm:h-[240px] md:h-full">
          <img
            src={item.image}
            alt={item.institute}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right Content */}
        <div
          className={[
            "p-6 sm:p-8 md:p-10 flex items-center justify-center text-center",
            isDark
              ? "bg-gradient-to-r from-white/5 to-purple-500/10"
              : "bg-gradient-to-r from-black/5 to-purple-500/10",
          ].join(" ")}
        >
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
              {item.degree}
            </h3>

            <p
              className={[
                "mt-3 text-base sm:text-lg font-semibold",
                isDark ? "text-white/80" : "text-black/80",
              ].join(" ")}
            >
              {item.institute}
            </p>

            <p
              className={[
                "mt-2 text-sm sm:text-base font-semibold",
                isDark ? "text-white/70" : "text-black/70",
              ].join(" ")}
            >
              {item.meta}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
