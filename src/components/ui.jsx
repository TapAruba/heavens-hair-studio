import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// Scroll-reveal wrapper — subtle, editorial entrance.
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </M>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-6 bg-lilac" />
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={center ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`display-title mt-4 text-4xl sm:text-5xl lg:text-[3.4rem] ${
            light ? 'text-porcelain' : 'text-plum-900'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-[0.975rem] leading-relaxed ${
              light ? 'text-porcelain/70' : 'text-ink/65'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function Stars({ value = 5, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} star rating`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={15}
          className={
            i <= Math.round(value) ? 'fill-lilac text-lilac' : 'fill-plum/10 text-plum/20'
          }
        />
      ))}
    </div>
  )
}

// Interwoven HSH monogram, rendered from the brand logo asset.
export function Monogram({ size = 40, className = '', plumBg = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-xl ${
        plumBg ? 'bg-plum' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/brand/logo.png"
        alt="Heaven's Hair Studio monogram"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </span>
  )
}

export function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-plum/12 bg-white/70 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-plum/80 backdrop-blur ${className}`}
    >
      {children}
    </span>
  )
}
