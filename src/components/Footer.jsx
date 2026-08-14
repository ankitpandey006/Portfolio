// ✅ src/components/Footer.jsx (Optimized for mobile + laptop)
import { motion, useReducedMotion } from "framer-motion"
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
  FaInstagram,
} from "react-icons/fa"

export default function Footer({ theme = "light" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  const textMuted = isDark ? "text-white/70" : "text-black/70"
  const textSoft = isDark ? "text-white/75" : "text-black/75"

  // ✅ Mobile-safe animation config:
  // - On mobile: remove animation (reduceMotion true on many devices / accessibility)
  // - Also: we disable animation on small screens via `sm:` classes
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }

  return (
    <footer
      className={[
        "relative pt-14 sm:pt-16 pb-6",
        isDark ? "bg-[#1b1327] text-white" : "bg-[#f3f0ff] text-black",
      ].join(" ")}
    >
      {/* top divider line */}
      <div
        className={[
          "max-w-7xl mx-auto px-4 sm:px-6",
          isDark ? "border-white/15" : "border-black/10",
        ].join(" ")}
      >
        <div
          className={[
            "h-px w-full",
            isDark ? "bg-white/15" : "bg-black/10",
          ].join(" ")}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid gap-10 sm:gap-12 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Left */}
          <motion.div
            {...motionProps}
            className="sm:opacity-100"
          >
            <h3 className="text-2xl font-bold">
              Ankit&apos;s <span className="text-orange-500">Portfolio</span>
            </h3>

            <p className={["mt-4 leading-relaxed", textMuted].join(" ")}>
              Thank you for visiting my portfolio website. <br />
              Connect with me over socials.
            </p>

            <p className={["mt-6", textMuted].join(" ")}>
              Keep Rising 🚀. Connect with me over live chat!
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            {...(reduceMotion ? {} : { ...motionProps, transition: { duration: 0.5, delay: 0.05 } })}
          >
            <h3 className="text-2xl font-bold">Quick Links</h3>

            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Education", "#education"],
                ["Certification", "#certification"],
                ["Work", "#work"],
                ["Experience", "#experience"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className={[
                      "group inline-flex items-center gap-2 font-medium transition",
                      isDark ? "text-white/75 hover:text-white" : "text-black/70 hover:text-black",
                    ].join(" ")}
                  >
                    <FaChevronRight
                      className={[
                        "text-sm transition",
                        isDark
                          ? "text-white/50 group-hover:text-orange-400"
                          : "text-black/50 group-hover:text-orange-500",
                      ].join(" ")}
                    />
                    <span className="group-hover:text-orange-500 transition">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Reach Out */}
          <motion.div
            {...(reduceMotion ? {} : { ...motionProps, transition: { duration: 0.5, delay: 0.1 } })}
          >
            <h3 className="text-2xl font-bold">Reach Me Out On</h3>

            <div className="mt-4 space-y-3">
              <p className={["flex items-start gap-3", textSoft].join(" ")}>
                <FaEnvelope className="text-yellow-400 mt-1 shrink-0" />
                <span className="break-all">ankitpandey03052005@gmail.com</span>
              </p>

              <p className={["flex items-start gap-3", textSoft].join(" ")}>
                <FaMapMarkerAlt className="text-yellow-400 mt-1 shrink-0" />
                <span>Patna, Bihar, India</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                {
                  Icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/ankit-pandey-4699a8286/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  label: "LinkedIn",
                },
                { Icon: FaGithub, href: "https://github.com/ankitpandey006", label: "GitHub" },
                { Icon: FaEnvelope, href: "mailto:ankitpandey03052005@gmail.com", label: "Email" },
                { Icon: FaInstagram, href: "https://www.instagram.com/ankitpandey006/", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={[
                    "h-10 w-10 rounded-full grid place-items-center transition border",
                    isDark
                      ? "bg-white/10 border-white/15 text-white hover:text-orange-500"
                      : "bg-black/5 border-black/15 text-black hover:text-orange-500",
                  ].join(" ")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <div
          className={[
            "mt-12 pt-6",
            isDark ? "border-t border-white/15" : "border-t border-black/10",
          ].join(" ")}
        >
          <p className={["text-center text-sm px-2", textMuted].join(" ")}>
            Designed with <span className="text-red-500">❤</span> by{" "}
            <span className="text-orange-500 font-semibold">Ankit Pandey</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
