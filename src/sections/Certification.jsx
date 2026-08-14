import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FaEye, FaCertificate, FaFileAlt } from "react-icons/fa"

// ✅ IMPORT PDFs FROM ASSETS
import tataPdf from "../assets/certificates/tata-genai.pdf"
import cyberPdf from "../assets/certificates/cyber-security.pdf"
import nptelPdf from "../assets/certificates/nptel-soft-skill.pdf"
import tcsPdf from "../assets/certificates/Ankit_Pandey_5149204.pdf"

const CERTS = [
  {
    title: "TCS iON Career Edge - Young Professional",
    org: "Tata Consultancy Services",
    issued: "issued April 2026",
    credentialId: "272697-30588188-1016",
    link: tcsPdf

  },
  {
    title: "Tata - GenAI Powered Data Analytics Job Simulation",
    org: "Forage",
    issued: "Issued Jan 2026",
    credentialId: "GcvKtwhs2DfrzwcHPC",
    link: tataPdf,
  },
  {
    title: "Cyber Security",
    org: "NATIONAL INSTITUTE OF ELECTRONICS & INFORMATION TECHNOLOGY (NIELIT)",
    issued: "Issued Jul 2024",
    credentialId: "NIELIT/GKP/CSAP/2024/000004397",
    link: cyberPdf,
  },
  {
    title: "Soft Skill Development",
    org: "NPTEL",
    issued: "Issued Sept 2025",
    credentialId: "NPTEL25HS142S344600435",
    link: nptelPdf,
  },
]

export default function Certification({ theme = "dark" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="certification"
      className={[
        "relative py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <FaCertificate className={isDark ? "text-white/70" : "text-black/70"} />
            <span>Certifications</span>
            <span className="text-yellow-400">Earned</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-7 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, idx) => (
            <CertCard
              key={idx}
              c={c}
              idx={idx}
              isDark={isDark}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ c, idx, isDark, reduceMotion }) {
  // ✅ Render iframe only when card is near viewport (huge perf win)
  const ref = useRef(null)
  const [showFrame, setShowFrame] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowFrame(true)
          obs.disconnect()
        }
      },
      { rootMargin: "250px 0px" } // load a bit before visible
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: idx * 0.04 },
      }

  return (
    <motion.div
      ref={ref}
      {...motionProps}
      // ✅ hover only on non-touch sizes
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={[
        "rounded-2xl border overflow-hidden shadow-lg",
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white",
      ].join(" ")}
    >
      {/* Preview area */}
      <div className={["h-[200px] sm:h-[220px]", isDark ? "bg-black/50" : "bg-black"].join(" ")}>
        {/* ✅ Mobile: iframe hidden */}
        <div className="sm:hidden h-full grid place-items-center text-center px-5">
          <div className="rounded-xl border border-white/15 bg-white/5 p-4 w-full">
            <FaFileAlt className="mx-auto mb-2 text-white/90" />
            <p className="text-white/80 text-sm font-semibold">PDF Preview</p>
            <p className="text-white/60 text-xs mt-1">Tap “View Full PDF”</p>
          </div>
        </div>

        {/* ✅ Tablet/Laptop: iframe preview only when near view */}
        {showFrame ? (
          <iframe
            src={c.link}
            title={c.title}
            className="hidden sm:block w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="hidden sm:block h-full w-full">
            <div className="h-full w-full p-5">
              <div className={[
                "h-full w-full rounded-xl border",
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
              ].join(" ")} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <h3 className={["font-bold text-center", isDark ? "text-white" : "text-black"].join(" ")}>
          {c.title}
        </h3>

        <p className={["mt-2 text-sm text-center", isDark ? "text-white/70" : "text-black/70"].join(" ")}>
          {c.org}
        </p>

        <p className={["text-sm text-center", isDark ? "text-white/60" : "text-black/60"].join(" ")}>
          {c.issued}
        </p>

        {c.credentialId && (
          <p className={["mt-1 text-xs text-center break-words", isDark ? "text-white/60" : "text-black/60"].join(" ")}>
            Credential ID: <span className="font-semibold">{c.credentialId}</span>
          </p>
        )}

        {/* View Button */}
        <div className="mt-4 flex justify-center">
          <a
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition",
              isDark ? "bg-white text-black hover:opacity-90" : "bg-black text-white hover:opacity-90",
            ].join(" ")}
          >
            <FaEye /> View Full PDF
          </a>
        </div>
      </div>
    </motion.div>
  )
}
