import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal, SectionHeading, Stars } from '../components/ui'
import { testimonials } from '../data/content'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir) => setActive((a) => (a + dir + testimonials.length) % testimonials.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 5500)
    return () => clearInterval(t)
  }, [paused, go])

  const t = testimonials[active]

  return (
    <section
      className="relative overflow-hidden bg-plum-grad py-24 text-porcelain lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 tx-pinstripe opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-lilac/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lilac/10 blur-3xl" />

      <div className="container-luxe relative">
        <SectionHeading
          center
          light
          eyebrow="Kind Words"
          title="Loved by our guests."
          subtitle="The reviews that mean the most come from the people in our chairs."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote
            className="mx-auto mb-6 text-lilac/60"
            size={44}
            strokeWidth={1.4}
          />
          <div className="min-h-[230px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="font-display text-2xl font-light leading-relaxed text-porcelain sm:text-[1.9rem]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-lilac/50"
                    loading="lazy"
                  />
                  <div>
                    <Stars value={t.rating} className="justify-center" />
                    <p className="mt-2 font-display text-lg font-semibold">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-porcelain/55">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-porcelain transition hover:bg-white hover:text-plum"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-7 bg-lilac' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-porcelain transition hover:bg-white hover:text-plum"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
