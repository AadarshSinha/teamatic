import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { submitForm } from '../lib/submit.js'

/**
 * Hero. The headline's job is to say what the object is in the first four
 * words — a landing page for an unfamiliar appliance fails if the visitor has
 * to infer the category.
 *
 * The product render is a full-bleed background from `lg` up, with a gradient
 * scrim keeping the left column legible over it. Below `lg` it stacks under
 * the copy instead, because a cover-crop of a landscape shot puts the machine
 * directly behind the headline on a phone.
 */
export default function Hero() {
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

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
    <section id="hero" className="relative overflow-hidden border-b border-hair/60">
      {/* Hero band. The image layer is positioned against this wrapper, so it
          spans the viewport rather than the centred 1152px column, and the
          spec rail below is unaffected by it. */}
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 lg:pb-28 lg:pt-28">
          <div className="lg:max-w-[52%]">
            <p className="eyebrow mb-5 text-amber">Automatic chai maker · Pre-launch</p>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-white">
              Real masala chai.
              <br />
              <span className="text-amber">Without the stove.</span>
            </h1>

            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-warm">
              Teamatic is a countertop machine that makes real masala chai end to
              end. You load water, milk, loose leaf and whole spices — your own,
              not a pod. It boils, simmers the patti, strains the leaves out and
              pours two cups, then rinses itself. Start it from your phone before
              you get out of bed.
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
                    className="min-w-0 flex-1 rounded-xl border border-hair bg-raised/80 px-4 py-3 text-[15px] text-white backdrop-blur transition-colors focus:border-amber"
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
        </div>

        {/* Product render. Sits after the copy in the DOM so it stacks below it
            on phones; from `lg` it becomes the full-bleed backdrop. Eager and
            high priority — it is the largest contentful paint element. */}
        <div className="relative mt-10 px-6 pb-16 lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:px-0 lg:pb-0">
          <img
            src="/hero-1376.jpg"
            srcSet="/hero-700.jpg 700w, /hero-1000.jpg 1000w, /hero-1376.jpg 1376w"
            sizes="100vw"
            alt="Teamatic on a kitchen counter, chai steaming in the glass carafe above the glowing amber base, with loose tea, cardamom and cinnamon beside it"
            width="1376"
            height="768"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-56 w-full rounded-2xl object-cover object-[72%_center] sm:h-80 lg:h-full lg:rounded-none"
          />
          {/* Scrim: vertical on mobile so the copy above stays anchored,
              horizontal on desktop so the left column reads over the image. */}
          <div
            className="pointer-events-none absolute inset-x-6 inset-y-0 rounded-2xl bg-gradient-to-t from-ink via-ink/30 to-transparent lg:inset-x-0 lg:rounded-none lg:bg-gradient-to-r lg:from-ink lg:via-ink/85 lg:to-ink/10"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Spec rail — what the machine does, in chai's own units */}
      <div className="relative z-10 border-t border-hair/60 bg-surface/80 backdrop-blur">
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
            <dt className="font-mono text-[11px] text-dim">Takes</dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-white">
              Loose leaf
              <span className="ml-1 text-[13px] font-normal text-warm">+ whole spices</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
