import { Droplet, Leaf, Smartphone, CupSoda } from 'lucide-react'

/**
 * How it works. Numbered because these genuinely are sequential steps — the
 * order is the information. Written to answer the question a first-time
 * visitor actually has: what do I physically do, and what does the machine do?
 */
const steps = [
  {
    icon: Droplet,
    title: 'Fill water and milk',
    body: 'Water goes in the pot, milk in the side chamber. Both hold enough for about four rounds, so most people fill them once a day.',
    note: 'Milk chamber stays chilled',
  },
  {
    icon: Leaf,
    title: 'Add leaf and spices',
    body: 'Spoon in your own patti and whatever the blend is that morning — fresh ginger, elaichi, saunf, a stick of dalchini. Whole spices, not powder. Nothing proprietary, nothing to reorder.',
    note: 'No pods, no refills to buy',
  },
  {
    icon: Smartphone,
    title: 'Tap brew',
    body: 'Pick strength and how much milk, then start it — from the machine or from your phone. Save a setting per person so nobody argues about it.',
    note: 'Or schedule it for 7:00 am',
  },
  {
    icon: CupSoda,
    title: 'It boils, strains, pours',
    body: 'Water comes to a rolling boil, the tea and masala go in, milk follows, and it holds a simmer — the boil is what makes chai kadak. Then it strains the leaves out and fills two cups.',
    note: 'Spent leaves drop into the bin',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-hair/60 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-4 text-amber">How it works</p>
        <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
          Four steps, and only two of them are yours.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-warm">
          This is not a kettle with an app. A kettle heats water and stops. Chai
          has to be boiled with the leaves in it, then simmered with milk, then
          strained — that is the whole difficulty, and it is the part Teamatic
          takes over.
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="flex flex-col bg-ink p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15 text-amber ring-1 ring-amber/25">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[13px] text-dim tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-[19px] font-bold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm">{step.body}</p>
                <p className="mt-5 font-mono text-[11px] text-dim">{step.note}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
