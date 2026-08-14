import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

const particlesInit = async (engine) => {
  await loadSlim(engine)
}

export default function ParticlesLayer({ options }) {
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute inset-0 -z-10"
    />
  )
}
