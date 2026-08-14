export function Skeleton({ className = "", isDark = false }) {
  return (
    <div
      className={[
        "skeleton-base",
        isDark ? "skeleton-dark" : "skeleton-light",
        className,
      ].join(" ")}
    />
  )
}

export function HeroSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative min-h-screen flex items-center",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 pt-24 pb-14">
        <div className="text-center">
          <Skeleton isDark={isDark} className="mx-auto h-5 w-24 rounded-full" />
          <Skeleton isDark={isDark} className="mx-auto mt-4 h-10 sm:h-14 w-72 sm:w-[32rem] rounded-2xl" />
          <Skeleton isDark={isDark} className="mx-auto mt-5 h-6 w-72 sm:w-80 rounded-full" />

          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Skeleton isDark={isDark} className="h-12 w-28 rounded-full" />
            <Skeleton isDark={isDark} className="h-12 w-32 rounded-full" />
          </div>

          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} isDark={isDark} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative overflow-hidden py-16 sm:py-20",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <Skeleton isDark={isDark} className="mx-auto h-10 w-44 sm:w-52 rounded-2xl" />
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className={[
            "rounded-3xl overflow-hidden border",
            isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
          ].join(" ")}>
            <Skeleton isDark={isDark} className="h-[320px] sm:h-[380px] lg:h-[430px] w-full rounded-none" />
          </div>

          <div className={[
            "rounded-3xl border p-6 sm:p-8 md:p-10",
            isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
          ].join(" ")}>
            <Skeleton isDark={isDark} className="h-8 w-44 rounded-xl" />
            <Skeleton isDark={isDark} className="mt-3 h-5 w-40 rounded-xl" />

            <div className="mt-5 space-y-3">
              <Skeleton isDark={isDark} className="h-4 w-full rounded-full" />
              <Skeleton isDark={isDark} className="h-4 w-full rounded-full" />
              <Skeleton isDark={isDark} className="h-4 w-5/6 rounded-full" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton isDark={isDark} className="h-5 w-5 rounded-full" />
                <Skeleton isDark={isDark} className="h-4 w-20 rounded-full" />
                <Skeleton isDark={isDark} className="h-4 w-56 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton isDark={isDark} className="h-5 w-5 rounded-full" />
                <Skeleton isDark={isDark} className="h-4 w-20 rounded-full" />
                <Skeleton isDark={isDark} className="h-4 w-40 rounded-full" />
              </div>
            </div>

            <div className="mt-7">
              <Skeleton isDark={isDark} className="h-12 w-36 rounded-xl" />
            </div>

            <div className="mt-8 rounded-2xl p-5 sm:p-6 border border-white/10">
              <Skeleton isDark={isDark} className="h-4 w-full rounded-full" />
              <Skeleton isDark={isDark} className="mt-3 h-4 w-5/6 rounded-full" />
              <div className="mt-4 flex justify-end">
                <Skeleton isDark={isDark} className="h-4 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkillsSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 sm:h-12 w-44 sm:w-52 rounded-2xl" />

        <div className="space-y-8 sm:space-y-10 mt-10 sm:mt-16">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={[
                "rounded-2xl border p-6 sm:p-8",
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10",
              ].join(" ")}
            >
              <Skeleton isDark={isDark} className="h-6 w-48 rounded-xl" />

              <div className="mt-5 flex flex-wrap gap-3 sm:gap-4">
                {Array.from({ length: idx === 0 || idx === 3 ? 4 : 3 }).map((__, pillIdx) => (
                  <Skeleton
                    key={pillIdx}
                    isDark={isDark}
                    className="h-10 w-28 sm:w-32 rounded-full"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EducationSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 w-60 sm:w-72 rounded-2xl" />
        <Skeleton isDark={isDark} className="mx-auto mt-5 h-5 sm:h-6 w-full max-w-3xl rounded-full" />

        <div className="mt-10 sm:mt-14 space-y-8 sm:space-y-10">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={[
                "rounded-2xl overflow-hidden border",
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
              ].join(" ")}
            >
              <div className="grid md:grid-cols-[320px_1fr]">
                <Skeleton isDark={isDark} className="h-[200px] sm:h-[240px] md:h-full w-full rounded-none" />
                <div className="p-6 sm:p-8 md:p-10 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <Skeleton isDark={isDark} className="h-7 sm:h-8 w-52 sm:w-64 rounded-xl" />
                    <Skeleton isDark={isDark} className="mt-4 h-5 w-60 rounded-xl" />
                    <Skeleton isDark={isDark} className="mt-3 h-4 w-40 rounded-xl" />
                    <Skeleton isDark={isDark} className="mt-3 h-4 w-32 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 w-52 rounded-2xl" />

        <div className="mt-10 sm:mt-14 grid gap-7 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={[
                "rounded-2xl overflow-hidden border shadow-lg",
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
              ].join(" ")}
            >
              <Skeleton isDark={isDark} className="h-[190px] sm:h-[210px] w-full rounded-none" />
              <div className="px-5 py-4">
                <Skeleton isDark={isDark} className="h-6 w-40 rounded-xl" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Skeleton isDark={isDark} className="h-6 w-16 rounded-full" />
                  <Skeleton isDark={isDark} className="h-6 w-16 rounded-full" />
                  <Skeleton isDark={isDark} className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExperienceSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 w-56 rounded-2xl" />

        <div className="relative mt-12 sm:mt-14">
          <div className={[
            "absolute top-0 bottom-0 w-[4px] sm:w-[6px] rounded-full left-5 md:left-1/2 md:-translate-x-1/2",
            isDark ? "bg-white/20" : "bg-black/15",
          ].join(" ")} />

          <div className="space-y-12">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              >
                <div className={idx % 2 === 0 ? "hidden md:block" : "hidden md:flex md:justify-end"} />
                <div className={idx % 2 === 0 ? "hidden md:flex md:justify-start" : "hidden md:block"} />

                <div className="md:hidden pl-12">
                  <div className="rounded-xl p-5 sm:p-6 shadow-xl">
                    <Skeleton isDark={isDark} className="h-6 w-40 rounded-xl" />
                    <Skeleton isDark={isDark} className="mt-3 h-4 w-52 rounded-xl" />
                    <Skeleton isDark={isDark} className="mt-3 h-4 w-28 rounded-xl" />
                  </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-5 md:left-1/2 md:-translate-x-1/2">
                  <Skeleton isDark={isDark} className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CertificationSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 w-72 rounded-2xl" />

        <div className="mt-10 sm:mt-14 grid gap-7 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={[
                "rounded-2xl border overflow-hidden shadow-lg",
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white",
              ].join(" ")}
            >
              <Skeleton isDark={isDark} className="h-[200px] sm:h-[220px] w-full rounded-none" />
              <div className="px-5 py-4">
                <Skeleton isDark={isDark} className="mx-auto h-5 w-52 rounded-xl" />
                <Skeleton isDark={isDark} className="mx-auto mt-3 h-4 w-40 rounded-xl" />
                <Skeleton isDark={isDark} className="mx-auto mt-3 h-4 w-32 rounded-xl" />
                <Skeleton isDark={isDark} className="mx-auto mt-4 h-10 w-36 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSkeleton({ theme = "light" }) {
  const isDark = theme === "dark"

  return (
    <section
      className={[
        "relative py-16 sm:py-20 lg:py-24",
        isDark ? "bg-[#0C1014] text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Skeleton isDark={isDark} className="mx-auto h-10 w-56 rounded-2xl" />

        <div className={[
          "mt-10 sm:mt-12 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl",
          isDark ? "bg-[#0b0b0d] border border-white/10" : "bg-white border border-black/10",
        ].join(" ")}>
          <div className="space-y-5">
            <Skeleton isDark={isDark} className="h-12 w-full rounded-xl" />
            <Skeleton isDark={isDark} className="h-12 w-full rounded-xl" />
            <Skeleton isDark={isDark} className="h-12 w-full rounded-xl" />
            <Skeleton isDark={isDark} className="h-32 w-full rounded-xl" />
            <div className="pt-3 flex justify-end">
              <Skeleton isDark={isDark} className="h-12 w-full sm:w-40 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
