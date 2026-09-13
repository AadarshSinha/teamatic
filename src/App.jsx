import { Instagram, ArrowUpRight } from 'lucide-react'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import Poll from './components/Poll.jsx'

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hair/70 bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-[19px] font-extrabold tracking-tight text-white">
              Teamatic
            </span>
            <span className="font-mono text-[11px] text-amber">ONE</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how" className="hidden text-sm text-warm transition-colors hover:text-white sm:block">
              How it works
            </a>
            <a
              href="#poll"
              className="hidden text-sm text-warm transition-colors hover:text-white sm:block"
            >
              Shape it
            </a>
            <a
              href="#hero"
              className="rounded-full bg-amber px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-hot"
            >
              Join waitlist
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Poll />

        <section className="bloom relative py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/15 text-amber ring-1 ring-amber/25">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              Follow the build journey on Instagram.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-warm">
              Every prototype, every boil-over, every revision of the strainer —
              posted as it happens.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber/40 px-6 py-3 text-[15px] font-semibold text-amber transition-colors hover:bg-amber hover:text-ink"
            >
              @teamatic
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-hair/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="font-mono text-[12px] text-dim">© 2026 Teamatic Appliances</p>
          <p className="font-mono text-[12px] text-dim">
            Prototype renders. Specifications subject to change.
          </p>
        </div>
      </footer>
    </>
  )
}
