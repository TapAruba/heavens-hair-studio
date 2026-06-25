import { motion } from 'framer-motion'
import { Eyebrow } from './ui'

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-blush-grad pt-[72px]">
      <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lilac/25 blur-3xl" />
      <div className="container-luxe relative py-20 text-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display-title mx-auto mt-5 max-w-3xl text-[2.6rem] leading-[1.05] text-plum-900 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink/65"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      <div className="relative h-12 sm:h-20">
        <svg
          className="absolute bottom-0 h-full w-full text-porcelain"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
