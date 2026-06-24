import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { faqs } from '../data/content'

function Item({ faq, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${
        open ? 'border-lilac/60 bg-white shadow-soft' : 'border-plum/10 bg-white/60'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg font-semibold text-plum-900">{faq.q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
            open ? 'rotate-45 bg-plum text-porcelain' : 'bg-blush/60 text-plum'
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-blush-grad py-24 lg:py-32">
      <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Good to Know"
          title="Questions, answered."
          subtitle="Everything you need before your visit. Still curious? We’re only a message away."
        />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <Item faq={faq} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
