import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Sparkles, Crown, Heart, CalendarHeart } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

/* local-first images: drop AI renders into /public/hero/ and they auto-replace the fallbacks */
const SALON = '/photos/hair-magenta.jpg'
const SALON_FB = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
const POLA = '/photos/hair-caramel.jpg'
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
      <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-[0.22]" />
      <div className="pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-lilac/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blush/50 blur-3xl" />
      <Decor />

      <div className="container-luxe relative grid items-center gap-12 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 lg:py-20">
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
        <div className="relative mx-auto w-full max-w-[880px] lg:mx-0 lg:ml-auto lg:mr-[72px]">
          {/* arch wrapper — large salon photo, left-aligned so the stacked cards hang half-off its right edge.
              Layer order (back→front): arch · service card · polaroid · wax seal · paperclip */}
          <div className="relative w-[78%] lg:w-[97%]">
            {/* contact/ambient shadow puddle beneath the arch for grounded depth */}
            <div className="pointer-events-none absolute inset-x-6 bottom-3 z-0 h-12 rounded-[50%] bg-plum-900/20 blur-2xl" />

            {/* arched salon image — the main visual anchor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }}
              className="group relative z-10 aspect-[1/1.28] w-full overflow-hidden rounded-[10rem_10rem_2.2rem_2.2rem] border-[6px] border-white bg-white ring-1 ring-plum/10 shadow-[0_4px_12px_-4px_rgba(74,44,61,0.10),0_24px_50px_-18px_rgba(74,44,61,0.30),0_50px_90px_-40px_rgba(74,44,61,0.28)]"
            >
              <img src={SALON} onError={onErr(SALON_FB)} alt="Editorial beauty work by Heaven's Hair Studio"
                className="h-full w-full scale-105 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/22 via-transparent to-transparent" />
            </motion.div>

            {/* service card — back of the floating stack, lowered for breathing room */}
            <motion.div
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}
              className="absolute -right-[20px] top-[48%] z-20 w-[188px] rounded-2xl border border-white/70 bg-white/95 p-4 backdrop-blur shadow-[0_2px_6px_-2px_rgba(74,44,61,0.08),0_20px_44px_-16px_rgba(74,44,61,0.22)] lg:-right-[92px] lg:top-[46%] lg:w-[262px] lg:p-6"
            >
              <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/45">Featured Service</span>
              <p className="mt-2 font-display text-[1.15rem] font-semibold leading-[1.05] text-plum-900 lg:text-[1.5rem]">Signature Balayage</p>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-ink/55 lg:mt-2.5 lg:text-[0.78rem]">Hand-painted, sun-kissed dimension.</p>
              <div className="my-3 h-px w-full bg-plum/10 lg:my-4" />
              <div className="flex items-end justify-between">
                <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/50">Starting at</span>
                <span className="font-display text-xl font-semibold leading-none text-plum lg:text-2xl">$165</span>
              </div>
            </motion.div>

            {/* polaroid + paperclip — front of the stack, ~38% extending past the arch, naturally pinned */}
            <motion.figure
              initial={{ opacity: 0, y: -20, rotate: -7 }} animate={{ opacity: 1, y: [0, -7, 0], rotate: -7 }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 }, rotate: { duration: 0.8, delay: 0.6 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
              className="absolute top-[5%] -right-[16px] z-30 w-[136px] lg:-right-[84px] lg:w-[220px]"
            >
              <div className="rounded-[0.6rem] border border-plum/5 bg-white p-2 pb-5 shadow-[0_2px_5px_-1px_rgba(74,44,61,0.10),0_14px_28px_-10px_rgba(74,44,61,0.24),0_34px_56px_-26px_rgba(74,44,61,0.26)] lg:p-2.5 lg:pb-7">
                <div className="overflow-hidden rounded-[0.3rem]">
                  <img src={POLA} onError={onErr(POLA_FB)} alt="Hair inspiration" className="aspect-[4/4.6] w-full object-cover" />
                </div>
              </div>
              {/* gold paperclip — straddles the top edge, appears to hold the photo */}
              <img src="/hero/paperclip.png" alt="" className="absolute -top-[12px] left-[34%] z-50 w-[32px] -translate-x-1/2 rotate-[8deg] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] drop-shadow-[0_5px_7px_rgba(74,44,61,0.38)] lg:-top-[18px] lg:w-[44px]" />
            </motion.figure>

            {/* gold wax seal — anchors the seam, overlapping the polaroid above and the service card below */}
            <motion.img
              initial={{ opacity: 0, scale: 0.5, rotate: -24 }} animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.8, delay: 0.95, ease }}
              src="/hero/wax-seal.png" alt="Heaven's Hair Studio wax seal"
              className="absolute -right-[10px] top-[44%] z-40 -mt-[30px] w-[60px] drop-shadow-[0_2px_3px_rgba(255,255,255,0.35)] drop-shadow-[0_6px_8px_rgba(74,44,61,0.30)] drop-shadow-[0_16px_22px_rgba(74,44,61,0.30)] lg:-right-[66px] lg:-mt-[46px] lg:w-[94px]"
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
      <svg className="absolute -left-10 top-0 h-full w-[60%] text-plum/[0.07]" viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 120 C 160 60 300 220 560 110" stroke="currentColor" strokeWidth="1" />
        <path d="M-40 200 C 200 150 320 300 600 210" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="120" cy="560" r="150" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      {/* blossom branch, top-left */}
      <svg className="absolute -left-4 -top-2 h-44 w-44 text-lilac/50 animate-float" viewBox="0 0 120 120" fill="none">
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
        <Sparkles key={i} size={s} className="absolute text-lilac/40 animate-float" style={{ left: l, top: t, animationDelay: `${i}s` }} />
      ))}
    </div>
  )
}
