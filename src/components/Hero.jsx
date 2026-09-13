import { useRef, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import ChaiMaker3D from './ChaiMaker3D.jsx'
import { submitForm } from '../lib/submit.js'

/**
 * Hero. The headline's job is to say what the object is in the first four
 * words — a landing page for an unfamiliar appliance fails if the visitor has
 * to infer the category.
 */
export default function Hero() {
  const pointer = useRef({ x: 0, y: 0 })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    }
  }

  const handleLeave = () => {
    pointer.current = { x: 0, y: 0 }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '').trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That address looks incomplete — check it and try again.')
      return
    }

    setError('')
    setStatus('sending')
    try {
      await submitForm('waitlist', { email })
      setStatus('done')
    } catch {
      // The address is valid and the visitor can't fix a network failure, so
      // say what happened rather than blaming the input.
      setStatus('error')
    }
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-hair/60"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
        {/* Left: what it is */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5 text-amber">Automatic chai maker · Pre-launch</p>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-white">
            Real masala chai.
            <br />
            <span className="text-amber">Without the stove.</span>
          </h1>

          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-warm">
            Teamatic is a countertop machine that makes real masala chai end to
            end. You load water, milk and a chai pod once. It boils, simmers the
            patti, strains the leaves out and pours two cups — then rinses itself.
            Start it from your phone before you get out of bed.
          </p>

          {status === 'done' ? (
            <div className="mt-9 flex max-w-md items-center gap-3 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3">
              <Check className="h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
              <p className="text-[15px] text-white">
                You&apos;re on the list. We&apos;ll write when the first batch is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-9 max-w-md" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-xl border border-hair bg-raised px-4 py-3 text-[15px] text-white transition-colors focus:border-amber"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-hot disabled:opacity-70"
                >
                  {status === 'sending' && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  )}
                  Join the waitlist
                </button>
              </div>
            </form>
          )}

          <p
            className="mt-3 min-h-[20px] font-mono text-[12px] text-dim"
            role="status"
            aria-live="polite"
          >
            {error && <span className="text-hot">{error}</span>}
            {!error && status === 'error' && (
              <span className="text-hot">
                Couldn&apos;t reach the server. Check your connection and try again.
              </span>
            )}
            {!error && status !== 'error' && 'No payment now. We will email before we ship.'}
          </p>
        </div>

        {/* Right: the appliance */}
        <div className="bloom relative lg:col-span-7">
          <ChaiMaker3D pointerTarget={pointer} />
          <p className="mt-2 text-center font-mono text-[11px] text-dim lg:text-right">
            Move your cursor to inspect
          </p>
        </div>
      </div>

      {/* Spec rail — what the machine actually does, in chai's own units */}
      <div className="border-t border-hair/60 bg-surface/60">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 sm:divide-x sm:divide-hair/60">
          <div className="py-5 sm:px-6 sm:first:pl-0">
            <dt className="font-mono text-[11px] text-dim">Makes</dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-white">
              2 cups
              <span className="ml-1 text-[13px] font-normal text-warm">380 ml</span>
            </dd>
          </div>
          <div className="py-5 sm:px-6">
            <dt className="font-mono text-[11px] text-dim">Start to pour</dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-white">
              5 min
              <span className="ml-1 text-[13px] font-normal text-warm">unattended</span>
            </dd>
          </div>
          <div className="py-5 sm:px-6">
            <dt className="font-mono text-[11px] text-dim">Milk to water</dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-white">
              0–100%
              <span className="ml-1 text-[13px] font-normal text-warm">per cup</span>
            </dd>
          </div>
          <div className="py-5 sm:px-6 sm:last:pr-0">
            <dt className="font-mono text-[11px] text-dim">Strength</dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-white">
              6 steps
              <span className="ml-1 text-[13px] font-normal text-warm">light → kadak</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
