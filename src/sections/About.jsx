import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa"
import profile from "../assets/profile.jpg" // ✅ change path if needed

export default function About({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()
  const [imgOk, setImgOk] = useState(true)

  const shapeStroke = isDark ? "border-white/70" : "border-black/60"
  const plusFill = isDark ? "bg-white/80" : "bg-black/70"

  // ✅ lightweight motion props (mobile/reduced motion friendly)
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      }

  const slideLeft = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      }

  const slideRight = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      }

  return (
    <section
      id="about"
      className={[
        "relative overflow-hidden py-16 sm:py-20",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      {/* ✅ Background gradient blob (DESKTOP ONLY for smooth mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div
          className={[
            "absolute right-[-140px] top-[-120px] h-[520px] w-[720px] rounded-full blur-[140px]",
            isDark ? "bg-purple-600/30" : "bg-purple-500/20",
          ].join(" ")}
        />
        <div
          className={[
            "absolute left-[-160px] bottom-[-160px] h-[520px] w-[520px] rounded-full blur-[140px]",
            isDark ? "bg-fuchsia-500/15" : "bg-fuchsia-500/10",
          ].join(" ")}
        />
      </div>

      {/* Floating shapes (already desktop-only ✅) */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <Shape stroke={shapeStroke} className="left-[8%] top-[18%] rotate-12" />
        <Shape stroke={shapeStroke} className="left-[18%] bottom-[22%] rotate-45" />
        <Plus fill={plusFill} className="left-[10%] bottom-[30%]" />
        <Shape stroke={shapeStroke} className="right-[10%] top-[32%] -rotate-12" />
        <Plus fill={plusFill} className="right-[22%] bottom-[26%]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div {...fadeUp} className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <FaUser className={isDark ? "text-white/70" : "text-black/70"} />
            <span>About</span>
            <span className="text-purple-500">Me</span>
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left Image Card */}
          <motion.div
            {...slideLeft}
            className={[
              "rounded-3xl overflow-hidden border",
              isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
            ].join(" ")}
          >
            <div className="relative">
              {imgOk ? (
                <img
                  src={profile}
                  alt="Profile"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[430px] object-cover grayscale"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="h-[320px] sm:h-[380px] lg:h-[430px] grid place-items-center text-center px-6">
                  <p className={isDark ? "text-white/60" : "text-black/60"}>
                    Photo missing 🙂 <br />
                    Add <span className="font-semibold">src/assets/profile.jpg</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            {...slideRight}
            className={[
              "rounded-3xl border p-6 sm:p-8 md:p-10",
              isDark
                ? "border-white/10 bg-gradient-to-br from-white/5 to-purple-500/10"
                : "border-black/10 bg-gradient-to-br from-black/5 to-purple-500/10",
            ].join(" ")}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              I&apos;m <span className="text-purple-400">Ankit</span>
            </h3>

            <p className="mt-1 font-semibold text-purple-400">Software Developer</p>

            <p
              className={[
                "mt-5 leading-relaxed text-sm sm:text-base",
                isDark ? "text-white/70" : "text-black/70",
              ].join(" ")}
            >
              I am a Software Developer passionate about improving my coding skills & building applications.
              I enjoy collaboration, challenges, and creating impactful tech solutions. My interests include
              Web Development, Data Analytics, Competitive Programming, Artificial Intelligence, and modern
              software technologies. Let’s connect and innovate to shape the future together!
            </p>

            <div className="mt-6 space-y-3">
              <p className={["flex gap-3 sm:items-center items-start", isDark ? "text-white/70" : "text-black/70"].join(" ")}>
                <FaEnvelope className="text-purple-400 mt-1 sm:mt-0 shrink-0" />
                <span className="font-semibold text-purple-400 shrink-0">Email :</span>
                <span className="break-all">ankitpandey03052005@gmail.com</span>
              </p>

              <p className={["flex gap-3 sm:items-center items-start", isDark ? "text-white/70" : "text-black/70"].join(" ")}>
                <FaMapMarkerAlt className="text-purple-400 mt-1 sm:mt-0 shrink-0" />
                <span className="font-semibold text-purple-400 shrink-0">Place :</span>
                <span>Patna, Bihar, India</span>
              </p>
            </div>

            <div className="mt-7">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
              >
                <FaFileAlt />
                Resume <span className="ml-1">›</span>
              </a>
            </div>

            <div
              className={[
                "mt-8 rounded-2xl p-5 sm:p-6 border",
                isDark ? "bg-black/30 border-white/10" : "bg-white/60 border-black/10",
              ].join(" ")}
            >
              <p className={["italic leading-relaxed text-sm sm:text-base", isDark ? "text-white/70" : "text-black/70"].join(" ")}>
                “Controlling complexity is the essence of computer programming.”
              </p>
              <p className="mt-3 text-right text-pink-400 font-semibold">— Brian Kernighan</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Shape({ className = "", stroke = "border-white/70" }) {
  return <div className={["absolute h-10 w-10 border-2 rounded-md opacity-80", stroke, className].join(" ")} />
}

function Plus({ className = "", fill = "bg-white/80" }) {
  return (
    <div className={["absolute opacity-80", className].join(" ")}>
      <div className="relative h-10 w-10">
        <span className={["absolute left-1/2 top-0 -translate-x-1/2 h-10 w-[3px] rounded", fill].join(" ")} />
        <span className={["absolute top-1/2 left-0 -translate-y-1/2 w-10 h-[3px] rounded", fill].join(" ")} />
      </div>
    </div>
  )
}
