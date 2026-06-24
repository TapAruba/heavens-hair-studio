import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Sparkles, Crown, Heart, CalendarHeart } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

/* local-first images: drop AI renders into /public/hero/ and they auto-replace the fallbacks */
const SALON = '/hero/salon-arch.png'
const SALON_FB = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
const POLA = '/photos/hair-magenta.jpg'
const POLA_FB = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80'
const onErr = (fb) => (e) => { if (e.currentTarget.src !== fb) e.currentTarget.src = fb }

const features = [
  { icon: Crown, title: 'Luxury Experience', desc: 'Premium service in a relaxing and elegant environment.' },
  { icon: Heart, title: 'Personalized Care', desc: 'Tailored consultations for results that feel like you.' },
  { icon: Sparkles, title: 'Expert Stylists', desc: 'Highly trained professionals passionate about perfection.' },
  { icon: CalendarHeart, title: 'Easy Booking', desc: 'Effortless online booking whenever you are ready.' },
]

const avatars = [
  'photo-1544005313-94ddf0286df2', 'photo-1502823403499-6ccfcf4fb453',
  'photo-1534528741775-53994a69daeb', 'photo-1487412720507-e7ab37603c6f',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blush-grad pt-[72px]">
      {/* ── ambient + decorative ── */}
      <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-lilac/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blush/60 blur-3xl" />
      <Decor />

      <div className="container-luxe relative grid items-center gap-12 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6 lg:py-20">
        {/* ───────── LEFT: copy ───────── */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-luxe text-plum/75 backdrop-blur"
          >
            <Sparkles size={13} className="text-lilac" />
            Beauty that feels like heaven
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }}
            className="display-title mt-6 text-[3.1rem] leading-[1.04] text-plum-900 sm:text-6xl lg:text-[4.7rem]"
          >
            Confidence
            <span className="block">starts with</span>
            <span className="block font-display italic text-plum/85">beautiful hair.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-ink/65"
          >
            Luxury hair services designed to bring out your best. Every detail, every strand,
            every moment — crafted just for you.
          </motion.p>

          {/* decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-8 flex max-w-xs items-center gap-3 text-lilac"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-plum/30 to-plum/20" />
            <span className="block h-1.5 w-1.5 rotate-45 bg-lilac" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-plum/30 to-plum/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.36, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link to="/book" className="btn-primary group">
              Book Appointment
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/services" className="btn-secondary group">
              Explore Services
              <ArrowRight size={15} className="opacity-0 -ml-4 transition-all group-hover:ml-0 group-hover:opacity-100" />
            </Link>
          </motion.div>

          {/* social proof */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {avatars.map((p) => (
                <img key={p} src={`https://images.unsplash.com/${p}?auto=format&fit=crop&w=80&q=80`} alt=""
                  className="h-11 w-11 rounded-full border-2 border-porcelain object-cover shadow-soft" loading="lazy" />
              ))}
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-porcelain bg-plum text-[0.6rem] font-semibold text-porcelain">500+</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-lilac">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} className="fill-lilac text-lilac" />)}
              </div>
              <p className="mt-1 text-xs text-ink/55">Trusted by hundreds of beautiful clients</p>
            </div>
          </motion.div>
        </div>

        {/* ───────── RIGHT: layered imagery ───────── */}
        <div className="relative mx-auto w-full max-w-[760px] lg:mx-0 lg:ml-auto">
          {/* arch wrapper — large salon photo, left-aligned so the stacked cards hang half-off its right edge */}
          <div className="relative w-[82%]">
            {/* arched salon image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }}
              className="group relative aspect-[1/1.28] w-full overflow-hidden rounded-[10rem_10rem_2.2rem_2.2rem] border-[6px] border-white bg-white shadow-lift ring-1 ring-plum/10"
            >
              <img src={SALON} onError={onErr(SALON_FB)} alt="Inside Heaven's Hair Studio"
                className="h-full w-full scale-105 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/25 via-transparent to-transparent" />
            </motion.div>

            {/* polaroid + paperclip — top, straddling the arch's right edge (half on the photo, half off) */}
            <motion.figure
              initial={{ opacity: 0, y: -20, rotate: -8 }} animate={{ opacity: 1, y: [0, -7, 0], rotate: -8 }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 }, rotate: { duration: 0.8, delay: 0.6 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
              className="absolute top-[6%] -right-[100px] z-30 w-[208px]"
            >
              <img src="/hero/paperclip.png" alt="" className="absolute -top-9 left-1/2 z-10 w-[46px] -translate-x-1/2 rotate-[-4deg] drop-shadow-[0_7px_8px_rgba(74,44,61,0.32)]" />
              <div className="rounded-[0.6rem] border border-plum/5 bg-white p-2.5 pb-6 shadow-card">
                <div className="overflow-hidden rounded-[0.3rem]">
                  <img src={POLA} onError={onErr(POLA_FB)} alt="Hair inspiration" className="aspect-[4/4.6] w-full object-cover" />
                </div>
              </div>
            </motion.figure>

            {/* service card — directly UNDER the polaroid, also straddling the arch's right edge */}
            <motion.div
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}
              className="absolute -right-[116px] top-[44%] z-10 w-[248px] rounded-2xl border border-plum/10 bg-white/95 p-4 shadow-card backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <img src="/brand/logo.png" alt="" className="h-11 w-11 rounded-full object-cover ring-1 ring-plum/10" />
                <div>
                  <p className="font-display text-[1.28rem] font-semibold leading-none text-plum-900">Signature Balayage</p>
                  <p className="mt-1.5 text-[0.74rem] leading-snug text-ink/55">Hand-painted dimension.<br />Effortless beauty.</p>
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-between border-t border-plum/10 pt-3">
                <span className="text-[0.62rem] font-semibold uppercase tracking-luxe text-plum/55">Starting at</span>
                <span className="font-display text-lg font-semibold text-plum">from <span className="text-wine">$165</span></span>
              </div>
            </motion.div>

            {/* gold wax seal — in the MIDDLE of the polaroid and the card, centered on the arch's right edge */}
            <motion.img
              initial={{ opacity: 0, scale: 0.5, rotate: -24 }} animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.8, delay: 0.95, ease }}
              src="/hero/wax-seal.png" alt="Heaven's Hair Studio wax seal"
              className="absolute -right-[42px] top-[41%] z-40 -mt-[42px] w-[84px] drop-shadow-[0_10px_16px_rgba(74,44,61,0.42)]"
            />
          </div>
        </div>
      </div>

      {/* ───────── bottom feature strip ───────── */}
      <div className="relative bg-plum-grad">
        <div className="container-luxe grid grid-cols-1 gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/12 lg:py-9">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex flex-col items-center px-6 text-center lg:px-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-lilac/40 text-lilac/90">
                <f.icon size={20} strokeWidth={1.4} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-porcelain">{f.title}</h3>
              <p className="mt-1.5 max-w-[15rem] text-[0.8rem] leading-relaxed text-porcelain/65">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── subtle editorial background: curves, sparkles, stars, blossom ── */
function Decor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* curved editorial lines */}
      <svg className="absolute -left-10 top-0 h-full w-[60%] text-plum/10" viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 120 C 160 60 300 220 560 110" stroke="currentColor" strokeWidth="1" />
        <path d="M-40 200 C 200 150 320 300 600 210" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="120" cy="560" r="150" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      {/* blossom branch, top-left */}
      <svg className="absolute -left-4 -top-2 h-44 w-44 text-lilac/70 animate-float" viewBox="0 0 120 120" fill="none">
        <path d="M6 14 C 40 30 64 52 92 92" stroke="#B98BBE" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 33 C 52 26 60 30 58 40" stroke="#B98BBE" strokeWidth="1.1" />
        {[[22, 24], [44, 44], [66, 66], [86, 90], [54, 30]].map(([cx, cy], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((d) => {
              const a = (d * Math.PI) / 180
              return <ellipse key={d} cx={cx + Math.cos(a) * 5} cy={cy + Math.sin(a) * 5} rx="3.4" ry="2" fill="#E7C7E6" transform={`rotate(${d} ${cx + Math.cos(a) * 5} ${cy + Math.sin(a) * 5})`} />
            })}
            <circle cx={cx} cy={cy} r="1.6" fill="#CDA8D0" />
          </g>
        ))}
      </svg>
      {/* sparkles + stars */}
      {[['12%', '60%', 14], ['86%', '30%', 11], ['70%', '78%', 13], ['30%', '88%', 10], ['94%', '64%', 9]].map(([l, t, s], i) => (
        <Sparkles key={i} size={s} className="absolute text-lilac/55 animate-float" style={{ left: l, top: t, animationDelay: `${i}s` }} />
      ))}
    </div>
  )
}
