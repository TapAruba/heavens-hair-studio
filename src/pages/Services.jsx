import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ServiceCard from '../components/ServiceCard'
import CTABanner from '../sections/CTABanner'
import { Reveal } from '../components/ui'
import { services, serviceCategories } from '../data/services'

export default function Services() {
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? services : services.filter((s) => s.category === cat)

  return (
    <>
      <PageHeader
        eyebrow="Our Menu"
        title="Services crafted for you."
        subtitle="Consultation-led cuts, colour, treatments and transformations — each finished with the care that defines Heaven’s."
      />

      <section className="py-16 lg:py-20">
        <div className="container-luxe">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {serviceCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  cat === c
                    ? 'bg-plum-grad text-porcelain shadow-soft'
                    : 'border border-plum/15 bg-white/60 text-plum/75 hover:border-plum/35 hover:text-plum'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((service, i) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal>
            <p className="mt-12 text-center text-sm text-ink/55">
              Prices are starting points and finalised at consultation. Longer or thicker hair may
              be subject to a surcharge.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
