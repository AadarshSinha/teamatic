import { useRef } from 'react'
import { Cpu, Smartphone, Droplets } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: '100% autonomous',
    body: 'It measures the water, holds the boil, times the simmer and cuts the heat on its own. No watching the pot, no milk boiling over onto the hob, no second cup that came out bitter because you got distracted.',
    note: 'Boil-over sensor · auto cut-off',
  },
  {
    icon: Smartphone,
    title: 'Remote control',
    body: 'Start it from bed and the chai is poured by the time you reach the kitchen. Everyone in the house saves their own strength and milk setting, so one machine serves a family that disagrees.',
    note: 'Android & iOS · works offline too',
  },
  {
    icon: Droplets,
    title: 'Zero cleanup',
    body: 'The strainer back-flushes with hot water after every brew and the spent leaves drop into a sealed bin. Empty the bin twice a week, rinse the milk chamber. That is the whole job.',
    note: 'About 30 seconds a week',
  },
]

/** Glass cards with a cursor-following tilt. */
export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-4 text-amber">The machine</p>
        <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
          Designed for ultimate convenience.
        </h2>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-warm">
          Every part of making chai that isn&rsquo;t drinking it has been handed
          to the machine.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <TiltCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ icon: Icon, title, body, note }) {
  const ref = useRef(null)

  // Tilt is a pointer affordance, so it is skipped on touch (where there is no
  // cursor to follow) and under reduced-motion.
  const enabled =
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(hover: none)').matches

  const handleMove = (e) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transition = 'transform .08s linear'
    ref.current.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform .5s cubic-bezier(.2,.7,.3,1)'
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="glass rounded-2xl p-7"
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15 text-amber ring-1 ring-amber/25">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-[21px] font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-warm">{body}</p>
      <p className="mt-5 font-mono text-[11px] text-dim">{note}</p>
    </article>
  )
}
