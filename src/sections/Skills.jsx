import { motion, useReducedMotion } from "framer-motion"
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaFigma,
} from "react-icons/fa"
import {
  SiExpress,
  SiFirebase,
  SiCplusplus,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiCanva,
} from "react-icons/si"

export default function Skills({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()
  const textMuted = isDark ? "text-white/70" : "text-black/70"

  return (
    <section
      id="skills"
      className={[
        "py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16"
        >
          Tech Stack
        </motion.h2>

        <div className="space-y-8 sm:space-y-10">
          {/* PROGRAMMING */}
          <SkillBlock title="PROGRAMMING" isDark={isDark} textMuted={textMuted} reduceMotion={reduceMotion}>
            <SkillItem icon={FaJs} label="JavaScript" />
            <SkillItem icon={SiCplusplus} label="C / C++ (DSA)" />
            <SkillItem icon={FaPython} label="Python" />
            <SkillItem label="HTML & CSS" />
          </SkillBlock>

          {/* LIBRARIES / FRAMEWORKS */}
          <SkillBlock title="LIBRARIES / FRAMEWORKS" isDark={isDark} textMuted={textMuted} reduceMotion={reduceMotion}>
            <SkillItem icon={FaReact} label="React.js" />
            <SkillItem icon={FaNodeJs} label="Node.js" />
            <SkillItem icon={SiExpress} label="Express.js" />
            <SkillItem icon={SiFirebase} label="Firebase" />
          </SkillBlock>

          {/* DATA / PYTHON */}
          <SkillBlock title="PYTHON / DATA" isDark={isDark} textMuted={textMuted} reduceMotion={reduceMotion}>
            <SkillItem icon={SiNumpy} label="NumPy" />
            <SkillItem icon={SiPandas} label="Pandas" />
            <SkillItem icon={SiJupyter} label="Jupyter Notebook" />
          </SkillBlock>

          {/* TOOLS / PLATFORMS */}
          <SkillBlock title="TOOLS / PLATFORMS" isDark={isDark} textMuted={textMuted} reduceMotion={reduceMotion}>
            <SkillItem icon={FaGitAlt} label="Git" />
            <SkillItem icon={FaGithub} label="GitHub" />
            <SkillItem icon={FaFigma} label="Figma" />
            <SkillItem icon={SiCanva} label="Canva" />
          </SkillBlock>
        </div>
      </div>
    </section>
  )
}

/* ===== Components ===== */

function SkillBlock({ title, children, isDark, textMuted, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
      className={[
        "rounded-2xl border p-6 sm:p-8",
        isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10",
      ].join(" ")}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-wide">
        {title}
      </h3>

      <div className={["flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-3 text-sm sm:text-base", textMuted].join(" ")}>
        {children}
      </div>
    </motion.div>
  )
}

function SkillItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="text-orange-500 shrink-0" />}
      <span>{label}</span>
    </div>
  )
}
