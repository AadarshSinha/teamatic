import { useState } from 'react'
import { Check } from 'lucide-react'
import { submitForm } from '../lib/submit.js'

const questions = [
  {
    key: 'cups',
    legend: 'How many cups of chai does your house make on a normal day?',
    options: ['1–2', '3–4', '5–6', '7 or more'],
  },
  {
    key: 'pain',
    legend: 'What goes wrong most often when you make it?',
    options: [
      'Milk boils over',
      'Forgetting it on the stove',
      'Washing the pan and strainer',
      'Never the same twice',
    ],
  },
]

export default function Poll() {
  const [answers, setAnswers] = useState({})
  const [sent, setSent] = useState(false)
  const remaining = questions.length - Object.keys(answers).length

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitForm('poll', answers)
    } catch {
      // A failed poll submission isn't something the visitor can act on, and
      // re-asking the questions would be worse than losing one response.
    }
    setSent(true)
  }

  return (
    <section id="poll" className="border-y border-hair/60 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow mb-4 text-amber">Two questions</p>
        <h2 className="font-display text-[clamp(1.9rem,4.2vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
          Help us build your ideal chai maker.
        </h2>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-warm">
          Tank size and how the pod bay works are still open. Your answers move
          those decisions.
        </p>

        {sent ? (
          <div className="mt-11 rounded-2xl border border-amber/40 bg-amber/10 p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber text-ink">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-display text-[20px] font-bold text-white">Logged — thank you.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-warm">
              Your house makes <strong className="text-white">{answers.cups}</strong> cups a day,
              and <strong className="text-white">{answers.pain.toLowerCase()}</strong> is what goes
              wrong most often. That goes straight into the spec review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-11 flex flex-col gap-9">
            {questions.map((q) => (
              <fieldset key={q.key}>
                <legend className="font-display text-[18px] font-bold text-white">
                  {q.legend}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {q.options.map((opt) => {
                    const active = answers[q.key] === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          active
                            ? 'border-amber bg-amber/12 text-hot'
                            : 'border-hair bg-raised text-warm hover:border-amber/50 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={remaining > 0}
                className="rounded-xl bg-amber px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-hot disabled:cursor-not-allowed disabled:bg-raised disabled:text-dim"
              >
                Send answers
              </button>
              <p className="font-mono text-[12px] text-dim" role="status" aria-live="polite">
                {remaining > 0
                  ? `${remaining} question${remaining > 1 ? 's' : ''} to go`
                  : 'Ready to send'}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
