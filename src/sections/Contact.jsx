import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FaHeadset } from "react-icons/fa"
import { FiUser, FiMail, FiPhone, FiMessageCircle, FiSend } from "react-icons/fi"

export default function Contact({ theme = "light" }) {
  const isDark = theme === "dark"
  const reduceMotion = useReducedMotion()

  const cardClass = isDark
    ? "bg-[#0b0b0d] border border-white/10 text-white"
    : "bg-white border border-black/10 text-black"

  const inputBase = isDark
    ? "bg-white/5 text-white placeholder-white/50 border-white/15 focus:border-purple-400"
    : "bg-[#eef3ff] text-black placeholder-black/50 border-black/20 focus:border-purple-500"

  const [status, setStatus] = useState({ type: "idle", msg: "" })

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgyvonp"

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: "loading", msg: "Sending..." })

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        form.reset()
        setStatus({ type: "success", msg: "Message sent." })
      } else {
        setStatus({ type: "error", msg: "Failed to send. Try again." })
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Try again." })
    }
  }

  return (
    <section
      id="contact"
      className={[
        "relative py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      {/* ✅ glow (DESKTOP ONLY for ultra smooth mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-[260px] sm:h-[300px] w-[520px] sm:w-[600px] rounded-full bg-purple-600/20 blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <FaHeadset className={isDark ? "text-white/70" : "text-black/70"} />
            <span>Get In</span>
            <span className="text-purple-500">Touch</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55 }}
          className={["rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl", cardClass].join(" ")}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field name="name" icon={<FiUser />} placeholder="Name" inputClass={inputBase} required />
            <Field
              name="email"
              icon={<FiMail />}
              placeholder="Email"
              type="email"
              inputClass={inputBase}
              required
            />
            <Field name="phone" icon={<FiPhone />} placeholder="Phone" type="tel" inputClass={inputBase} />

            {/* Message */}
            <div className="relative">
              <span className="absolute left-4 top-4 opacity-70">
                <FiMessageCircle />
              </span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Message"
                className={[
                  "w-full rounded-lg border px-4 py-3 pl-12 outline-none transition resize-none text-base",
                  inputBase,
                ].join(" ")}
              />
            </div>

            {/* Submit + Status */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              {status.msg && (
                <p
                  className={[
                    "text-sm",
                    status.type === "success" ? "text-green-400" : "",
                    status.type === "error" ? "text-red-400" : "",
                    status.type === "loading" ? (isDark ? "text-white/70" : "text-black/60") : "",
                  ].join(" ")}
                >
                  {status.msg}
                </p>
              )}

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:opacity-90 transition w-full sm:w-auto disabled:opacity-60"
              >
                {status.type === "loading" ? "Sending..." : "Submit"} <FiSend />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ icon, placeholder, type = "text", inputClass, name, required = false }) {
  const id = `field-${name}`
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70" aria-hidden="true">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={[
          "w-full rounded-lg border px-4 py-3 pl-12 outline-none transition text-base",
          inputClass,
        ].join(" ")}
      />
    </div>
  )
}
