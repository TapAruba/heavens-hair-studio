import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, Sparkles } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const STOREFRONT = '/photos/storefront.jpg'
const PORTRAIT = '/photos/hair-magenta.jpg'
const POLA = '/photos/hair-caramel.jpg'
const POLA_FB = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80'
const onErr = (fb) => (e) => { if (e.currentTarget.src !== fb) e.currentTarget.src = fb }

const avatars = [
  'photo-1544005313-94ddf0286df2', 'photo-1502823403499-6ccfcf4fb453',
  'photo-1534528741775-53994a69daeb', 'photo-1487412720507-e7ab37603c6f',
]

const softShadow = '0 1px 24px rgba(42,25,35,0.35)'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])
  const compY = useTransform(scrollYProgress, [0, 1], [0, -46])

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-plum-900">
      {/* ── full-bleed storefront background w/ subtle parallax ── */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <img
          src={STOREFRONT}
          alt="Heaven's Hair Studio storefront in Oranjestad, Aruba"
          className="h-full w-full object-cover object-center"
          fetchpriority="high"
        />
      </motion.div>

      {/* ── layered luxury overlay: dark plum left → crisp right, grounded bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-plum-900/85 via-plum-900/45 to-plum-900/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/80 via-transparent to-plum-900/25" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_8%_85%,rgba(42,25,35,0.55),transparent_55%)]" />

      {/* ── faint editorial decor ── */}
      <Decor />

      {/* ── content ── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-start px-6 pt-[104px] pb-16 sm:px-10 lg:items-center lg:px-[7%] lg:pt-[72px] lg:pb-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.02fr]">

          {/* ───────── LEFT: copy ───────── */}
          <div className="relative max-w-xl text-porcelain">
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.66rem] font-semibold uppercase tracking-luxe text-porcelain/90 backdrop-blur-md"
            >
              <Sparkles size={13} className="text-lilac" />
              Beauty that feels like heaven
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }}
              className="display-title mt-6 text-[2.9rem] leading-[1.03] text-porcelain sm:text-6xl lg:text-[4.6rem]"
              style={{ textShadow: softShadow }}
            >
              Confidence
              <span className="block">starts with</span>
              <span className="block font-display italic text-blush">beautiful hair.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18, ease }}
              className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-porcelain/80"
              style={{ textShadow: '0 1px 16px rgba(42,25,35,0.4)' }}
            >
              Luxury hair services designed to bring out your best. Every detail, every strand,
              every moment — crafted just for you.
            </motion.p>

            {/* decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.28, ease }}
              className="mt-8 flex max-w-xs items-center gap-3"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-white/30" />
              <span className="block h-1.5 w-1.5 rotate-45 bg-lilac" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/40 to-white/30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.36, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link to="/book" className="btn-primary group">
                Book Appointment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="btn border border-white/40 bg-white/10 px-7 py-3.5 text-porcelain backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
              >
                Explore Services
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
                    className="h-11 w-11 rounded-full border-2 border-porcelain/80 object-cover shadow-soft" loading="lazy" />
                ))}
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-porcelain/80 bg-plum text-[0.6rem] font-semibold text-porcelain">500+</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-lilac">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} className="fill-lilac text-lilac" />)}
                </div>
                <p className="mt-1 text-xs text-porcelain/75">Trusted by hundreds of beautiful clients across Aruba</p>
              </div>
            </motion.div>

            {/* mobile floating composition — stacks directly below the copy */}
            <div className="mt-14 lg:hidden">
              <FloatingComposition mobile />
            </div>
          </div>

          {/* ───────── RIGHT: floating editorial composition ───────── */}
          <motion.div style={{ y: compY }} className="relative hidden lg:block">
            <FloatingComposition />
          </motion.div>
        </div>
      </div>

      {/* ── luxury bottom transition into the next section ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="h-52 bg-gradient-to-t from-porcelain via-porcelain/70 to-transparent" />
        <svg className="-mt-[52px] block h-[64px] w-full text-porcelain sm:h-[88px]" viewBox="0 0 1440 88" preserveAspectRatio="none" aria-hidden>
          <path d="M0,88 L1440,88 L1440,30 C 1080,78 360,6 0,46 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

/* ── the printed-photographs composition: portrait · polaroid · seal · card · paperclip ── */
function FloatingComposition({ mobile = false }) {
  return (
    <div className={`relative mx-auto ${mobile ? 'w-full max-w-[420px]' : 'ml-auto w-full max-w-[560px]'}`}>
      <div className={`relative ${mobile ? 'w-[74%]' : 'ml-[14%] w-[70%]'}`}>
        {/* grounding shadow */}
        <div className="pointer-events-none absolute inset-x-6 bottom-3 z-0 h-12 rounded-[50%] bg-plum-900/40 blur-2xl" />

        {/* large rounded portrait — gold outline, floating over the building */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }}
          className="group relative z-10 aspect-[1/1.3] w-full overflow-hidden rounded-[9rem_9rem_2.4rem_2.4rem] p-[3px]"
          style={{ background: 'linear-gradient(150deg,#E4C77E,#C79A45 45%,#9A7224 80%,#E4C77E)', boxShadow: '0 30px 70px -28px rgba(42,25,35,0.7), 0 10px 24px -12px rgba(42,25,35,0.5)' }}
        >
          <div className="h-full w-full overflow-hidden rounded-[8.8rem_8.8rem_2.2rem_2.2rem]">
            <img src={PORTRAIT} alt="A vivid colour transformation by Heaven's Hair Studio"
              className="h-full w-full scale-105 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/25 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* service card — frosted glass, lowered */}
        <motion.div
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}
          className="absolute -right-[86px] top-[52%] z-20 w-[256px] rounded-2xl border border-white/60 bg-white/85 p-6 backdrop-blur-xl shadow-[0_2px_8px_-2px_rgba(42,25,35,0.18),0_24px_50px_-18px_rgba(42,25,35,0.4)]"
        >
          <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/50">Featured Service</span>
          <p className="mt-2 font-display text-[1.5rem] font-semibold leading-none text-plum-900">Signature Balayage</p>
          <p className="mt-2.5 text-[0.78rem] leading-relaxed text-ink/60">Hand-painted, sun-kissed dimension.</p>
          <div className="my-4 h-px w-full bg-plum/12" />
          <div className="flex items-end justify-between">
            <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/55">Starting at</span>
            <span className="font-display text-2xl font-semibold leading-none text-plum">$165</span>
          </div>
        </motion.div>

        {/* polaroid + paperclip — printed photo pinned above */}
        <motion.figure
          initial={{ opacity: 0, y: -20, rotate: -7 }} animate={{ opacity: 1, y: [0, -7, 0], rotate: -7 }}
          transition={{ opacity: { duration: 0.8, delay: 0.55 }, rotate: { duration: 0.8, delay: 0.55 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
          className="absolute top-[6%] -right-[78px] z-30 w-[212px]"
        >
          <div className="rounded-[0.6rem] border border-plum/5 bg-white p-2.5 pb-7 shadow-[0_2px_6px_-1px_rgba(42,25,35,0.18),0_18px_34px_-12px_rgba(42,25,35,0.4),0_40px_64px_-30px_rgba(42,25,35,0.4)]">
            <div className="overflow-hidden rounded-[0.3rem]">
              <img src={POLA} onError={onErr(POLA_FB)} alt="Hair inspiration" className="aspect-[4/4.6] w-full object-cover" />
            </div>
          </div>
          <img src="/hero/paperclip.png" alt="" className="absolute -top-[18px] left-[34%] z-50 w-[44px] -translate-x-1/2 rotate-[8deg] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] drop-shadow-[0_6px_8px_rgba(42,25,35,0.5)]" />
        </motion.figure>

        {/* gold wax seal — holds the polaroid and card together */}
        <motion.img
          initial={{ opacity: 0, scale: 0.5, rotate: -24 }} animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          src="/hero/wax-seal.png" alt="Heaven's Hair Studio wax seal"
          className="absolute -right-[58px] top-[49%] z-40 -mt-[44px] w-[90px] drop-shadow-[0_2px_3px_rgba(255,255,255,0.35)] drop-shadow-[0_8px_10px_rgba(42,25,35,0.45)] drop-shadow-[0_18px_24px_rgba(42,25,35,0.4)]"
        />
      </div>
    </div>
  )
}

/* ── minimal editorial decor: faded HH watermark · sparkles ── */
function Decor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {/* large faded HH watermark */}
      <img src="/brand/logo.png" alt="" className="absolute -right-16 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-[0.05] mix-blend-screen lg:block" />
      {/* thin editorial curve */}
      <svg className="absolute left-0 top-0 h-full w-[55%] text-white/[0.06]" viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 160 C 180 90 320 250 600 150" stroke="currentColor" strokeWidth="1" />
        <path d="M-40 260 C 220 200 340 340 600 250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      </svg>
      {/* sparkles */}
      {[['14%', '26%', 13], ['40%', '74%', 11], ['8%', '60%', 10]].map(([l, t, s], i) => (
        <Sparkles key={i} size={s} className="absolute text-lilac/35 animate-float" style={{ left: l, top: t, animationDelay: `${i}s` }} />
      ))}
    </div>
  )
}
