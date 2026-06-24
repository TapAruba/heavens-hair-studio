import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import { studio } from '../data/content'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blush-grad pt-[72px]">
      {/* ambient decoration */}
      <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />

      <div className="container-luxe relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-luxe text-plum/75 backdrop-blur">
              <Sparkles size={13} className="text-lilac" />
              {studio.tagline} · Oranjestad
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="display-title mt-6 text-5xl text-plum-900 sm:text-6xl lg:text-[4.6rem]"
          >
            Your crowning glory,
            <span className="block italic text-plum/85">beautifully kept.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-ink/65"
          >
            A refined sanctuary for hair, built on precision, polish and a quiet sense of luxury.
            Where craft meets care — and every appointment feels like a moment for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/book" className="btn-primary group">
              Book Appointment
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/services" className="btn-secondary">
              View Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {[
                'photo-1544005313-94ddf0286df2',
                'photo-1502823403499-6ccfcf4fb453',
                'photo-1534528741775-53994a69daeb',
                'photo-1487412720507-e7ab37603c6f',
              ].map((p) => (
                <img
                  key={p}
                  src={`https://images.unsplash.com/${p}?auto=format&fit=crop&w=80&q=80`}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-porcelain object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-plum">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="fill-lilac text-lilac" />
                ))}
              </div>
              <p className="mt-1 text-xs text-ink/55">
                Loved by hundreds of guests across Aruba
              </p>
            </div>
          </motion.div>
        </div>

        {/* Imagery */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-white/60"
          >
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
              alt="A stylist at Heaven's Hair Studio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/30 via-transparent to-transparent" />
          </motion.div>

          {/* floating glass card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="absolute -left-2 bottom-10 glass rounded-3xl p-4 shadow-card sm:-left-8"
          >
            <div className="flex items-center gap-3">
              <img src="/brand/logo.png" alt="" className="h-11 w-11 rounded-xl object-cover" />
              <div>
                <p className="font-display text-lg font-semibold leading-none text-plum-900">
                  Signature Balayage
                </p>
                <p className="mt-1 text-xs text-ink/55">Hand-painted · from $165</p>
              </div>
            </div>
          </motion.div>

          {/* floating rating chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="absolute -right-1 top-8 glass rounded-2xl px-4 py-3 shadow-card sm:-right-6"
          >
            <p className="font-display text-2xl font-semibold text-plum-900">4.9</p>
            <div className="mt-0.5 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} className="fill-lilac text-lilac" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* graceful divider */}
      <div className="relative h-16 sm:h-24">
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
