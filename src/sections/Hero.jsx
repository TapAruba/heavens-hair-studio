import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const STOREFRONT = '/photos/storefront.jpg'
const PORTRAIT = '/photos/hair-magenta.jpg'
const POLA = '/photos/hair-caramel.jpg'
const POLA_FB = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80'
const onErr = (fb) => (e) => { if (e.currentTarget.src !== fb) e.currentTarget.src = fb }

const spring = { stiffness: 90, damping: 28, restDelta: 0.0005 }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Layered parallax — each plane drifts at its own speed for depth on scroll.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1])
  const logoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), spring)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const compY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), spring)
  const compOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.1])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

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
      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/65 via-transparent to-plum-900/25" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_8%_85%,rgba(42,25,35,0.5),transparent_55%)]" />

      {/* ── faint editorial decor ── */}
      <Decor />

      {/* ── content ── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1640px] items-center px-6 py-24 sm:px-10 lg:px-[4%]">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.86fr_1.14fr]">

          {/* ───────── LEFT: official brand lockup (monogram + wordmark) ───────── */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="relative flex flex-col items-center text-center text-porcelain will-change-transform"
          >
            <h1 className="sr-only">Heaven’s Hair Studio</h1>
            <motion.img
              src="/brand/lockup-white.png"
              alt="Heaven's Hair Studio"
              initial={{ opacity: 0, y: 22, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease }}
              className="w-[270px] drop-shadow-[0_12px_40px_rgba(42,25,35,0.55)] sm:w-[330px] lg:w-[400px]"
            />
          </motion.div>

          {/* ───────── RIGHT: floating editorial composition ───────── */}
          <motion.div style={{ y: compY, opacity: compOpacity }} className="relative hidden lg:block will-change-transform">
            <FloatingComposition />
          </motion.div>
        </div>
      </div>

      {/* ── scroll cue ── */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-porcelain/70"
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-luxe">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur"
        >
          <ChevronDown size={15} />
        </motion.span>
      </motion.div>
    </section>
  )
}

/* ── the printed-photographs composition: portrait · service card · polaroid · seal · paperclip ── */
function FloatingComposition({ mobile = false }) {
  // Desktop renders ~40% larger than mobile; each instance only shows at its breakpoint,
  // so sizes can switch cleanly via the `mobile` flag (no clipping risk on small screens).
  // Compact cluster anchored to the right third of the screen so the salon entrance
  // (centre of the background) stays clearly visible. Portrait is the largest element.
  const wrap = mobile ? 'mx-auto w-full max-w-[440px]' : 'ml-auto w-full max-w-[520px]'
  const innerW = mobile ? 'w-[72%]' : 'w-[60%]'
  const portraitAspect = mobile ? 'aspect-[1/1.28]' : 'aspect-[1/1.46]'

  const cardCls = mobile
    ? 'absolute right-0 top-[53%] z-20 w-[60%] p-4'
    : 'absolute right-0 top-[55%] z-20 w-[50%] p-5'
  const polaCls = mobile
    ? 'absolute top-[2%] right-[3%] z-30 w-[50%]'
    : 'absolute top-[1%] right-[2%] z-30 w-[44%]'
  const sealCls = mobile
    ? 'absolute right-[18%] top-[46%] z-40 -mt-[34px] w-[64px]'
    : 'absolute right-[22%] top-[50%] z-40 -mt-[48px] w-[104px]'
  const clipCls = mobile
    ? 'absolute -top-[14px] left-[36%] z-50 w-[34px]'
    : 'absolute -top-[20px] left-[36%] z-50 w-[48px]'

  return (
    <div className={`relative ${wrap}`}>
      {/* portrait — focal point, left side of the wrapper */}
      <div className={`relative ${innerW}`}>
        {/* grounding shadow */}
        <div className="pointer-events-none absolute inset-x-8 bottom-3 z-0 h-14 rounded-[50%] bg-plum-900/45 blur-2xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }}
          className={`group relative z-10 ${portraitAspect} w-full overflow-hidden rounded-[9rem_9rem_2.6rem_2.6rem] p-[3px]`}
          style={{ background: 'linear-gradient(150deg,#E4C77E,#C79A45 45%,#9A7224 80%,#E4C77E)', boxShadow: '0 40px 90px -34px rgba(42,25,35,0.75), 0 14px 30px -14px rgba(42,25,35,0.5)' }}
        >
          <div className="h-full w-full overflow-hidden rounded-[8.8rem_8.8rem_2.4rem_2.4rem]">
            <img src={PORTRAIT} alt="A vivid colour transformation by Heaven's Hair Studio"
              className="h-full w-full scale-105 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/25 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* service card — frosted glass, lowered, to the right using the open space */}
      <motion.div
        initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}
        className={`${cardCls} rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_2px_8px_-2px_rgba(42,25,35,0.18),0_30px_60px_-22px_rgba(42,25,35,0.42)]`}
      >
        <span className="text-[0.56rem] font-semibold uppercase tracking-luxe text-plum/50">Featured Service</span>
        <p className={`mt-1.5 font-display font-semibold leading-tight text-plum-900 ${mobile ? 'text-[1.15rem]' : 'text-[1.45rem]'}`}>Signature Balayage</p>
        <p className={`leading-relaxed text-ink/60 ${mobile ? 'mt-2 text-[0.72rem]' : 'mt-2 text-[0.78rem]'}`}>Hand-painted, sun-kissed dimension.</p>
        <div className={`h-px w-full bg-plum/12 ${mobile ? 'my-3' : 'my-4'}`} />
        <div className="flex items-end justify-between">
          <span className="text-[0.56rem] font-semibold uppercase tracking-luxe text-plum/55">Starting at</span>
          <span className={`font-display font-semibold leading-none text-plum ${mobile ? 'text-xl' : 'text-2xl'}`}>$165</span>
        </div>
      </motion.div>

      {/* polaroid + paperclip — printed photo pinned above the card, to the right */}
      <motion.figure
        initial={{ opacity: 0, y: -20, rotate: -7 }} animate={{ opacity: 1, y: [0, -8, 0], rotate: -7 }}
        transition={{ opacity: { duration: 0.8, delay: 0.55 }, rotate: { duration: 0.8, delay: 0.55 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
        className={polaCls}
      >
        <div className={`rounded-[0.7rem] border border-plum/5 bg-white shadow-[0_2px_6px_-1px_rgba(42,25,35,0.18),0_22px_40px_-14px_rgba(42,25,35,0.42),0_50px_80px_-36px_rgba(42,25,35,0.4)] ${mobile ? 'p-2 pb-5' : 'p-3 pb-9'}`}>
          <div className="overflow-hidden rounded-[0.35rem]">
            <img src={POLA} onError={onErr(POLA_FB)} alt="Hair inspiration" className="aspect-[4/4.6] w-full object-cover" />
          </div>
        </div>
        <img src="/hero/paperclip.png" alt="" className={`${clipCls} -translate-x-1/2 rotate-[8deg] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] drop-shadow-[0_6px_8px_rgba(42,25,35,0.5)]`} />
      </motion.figure>

      {/* gold wax seal — the anchor holding the polaroid and card together */}
      <motion.img
        initial={{ opacity: 0, scale: 0.5, rotate: -24 }} animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={{ duration: 0.8, delay: 0.95, ease }}
        src="/hero/wax-seal.png" alt="Heaven's Hair Studio wax seal"
        className={`${sealCls} drop-shadow-[0_2px_3px_rgba(255,255,255,0.35)] drop-shadow-[0_10px_12px_rgba(42,25,35,0.45)] drop-shadow-[0_22px_28px_rgba(42,25,35,0.4)]`}
      />
    </div>
  )
}

/* ── minimal editorial decor: faded HH watermark · sparkles ── */
function Decor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <svg className="absolute left-0 top-0 h-full w-[55%] text-white/[0.06]" viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 160 C 180 90 320 250 600 150" stroke="currentColor" strokeWidth="1" />
        <path d="M-40 260 C 220 200 340 340 600 250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      </svg>
      {[['14%', '24%', 13], ['44%', '72%', 11], ['8%', '58%', 10]].map(([l, t, s], i) => (
        <Sparkles key={i} size={s} className="absolute text-lilac/30 animate-float" style={{ left: l, top: t, animationDelay: `${i}s` }} />
      ))}
    </div>
  )
}
