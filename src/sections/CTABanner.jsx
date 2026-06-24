import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="px-6 py-16 lg:py-20">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-plum-grad px-8 py-16 text-center shadow-lift sm:px-16 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-20" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-lilac/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-lilac/15 blur-3xl" />

          <div className="relative">
            <img
              src="/brand/logo.png"
              alt=""
              className="mx-auto h-16 w-16 rounded-2xl object-cover ring-1 ring-white/20"
            />
            <h2 className="display-title mx-auto mt-7 max-w-2xl text-4xl text-porcelain sm:text-5xl">
              A new year, a new look, a refined you.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-porcelain/70">
              Reserve your chair in under two minutes and let our stylists take care of the rest.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/book"
                className="btn group bg-white px-8 py-4 text-plum hover:-translate-y-0.5 hover:shadow-lift"
              >
                Book Your Appointment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="btn border border-white/30 px-8 py-4 text-porcelain hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
