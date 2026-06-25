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
  const compY = useTransform(scrollYProgress, [0, 1], [0, -54])

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
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1480px] items-start px-6 pt-[104px] pb-16 sm:px-10 lg:items-center lg:px-[6%] lg:pt-[72px] lg:pb-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">

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
    </section>
  )
}

/* ── the printed-photographs composition: portrait · service card · polaroid · seal · paperclip ── */
function FloatingComposition({ mobile = false }) {
  // Desktop renders ~40% larger than mobile; each instance only shows at its breakpoint,
  // so sizes can switch cleanly via the `mobile` flag (no clipping risk on small screens).
  const wrap = mobile ? 'mx-auto w-full max-w-[430px]' : 'mx-auto w-full max-w-[660px] lg:mr-0'
  const inner = mobile ? 'w-[76%]' : 'w-[82%]'
  const portraitAspect = mobile ? 'aspect-[1/1.28]' : 'aspect-[1/1.24]'

  const cardCls = mobile
    ? 'absolute -right-[18px] top-[50%] z-20 w-[200px] p-4'
    : 'absolute -right-[60px] top-[57%] z-20 w-[316px] p-7'
  const polaCls = mobile
    ? 'absolute top-[4%] -right-[14px] z-30 w-[150px]'
    : 'absolute top-[2%] -right-[54px] z-30 w-[272px]'
  const sealCls = mobile
    ? 'absolute -right-[4px] top-[44%] z-40 -mt-[34px] w-[68px]'
    : 'absolute -right-[18px] top-[48%] z-40 -mt-[62px] w-[124px]'
  const clipCls = mobile
    ? 'absolute -top-[14px] left-[34%] z-50 w-[36px]'
    : 'absolute -top-[22px] left-[34%] z-50 w-[56px]'

  return (
    <div className={`relative ${wrap}`}>
      <div className={`relative ${inner}`}>
        {/* grounding shadow */}
        <div className="pointer-events-none absolute inset-x-8 bottom-3 z-0 h-14 rounded-[50%] bg-plum-900/45 blur-2xl" />

        {/* large rounded portrait — gold outline, the focal point */}
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

        {/* service card — frosted glass, lowered, supports the portrait */}
        <motion.div
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}
          className={`${cardCls} rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_2px_8px_-2px_rgba(42,25,35,0.18),0_30px_60px_-22px_rgba(42,25,35,0.42)]`}
        >
          <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/50">Featured Service</span>
          <p className={`mt-2 font-display font-semibold leading-none text-plum-900 ${mobile ? 'text-[1.15rem]' : 'text-[1.7rem]'}`}>Signature Balayage</p>
          <p className={`leading-relaxed text-ink/60 ${mobile ? 'mt-2 text-[0.72rem]' : 'mt-3 text-[0.85rem]'}`}>Hand-painted, sun-kissed dimension.</p>
          <div className={`h-px w-full bg-plum/12 ${mobile ? 'my-3' : 'my-5'}`} />
          <div className="flex items-end justify-between">
            <span className="text-[0.58rem] font-semibold uppercase tracking-luxe text-plum/55">Starting at</span>
            <span className={`font-display font-semibold leading-none text-plum ${mobile ? 'text-xl' : 'text-3xl'}`}>$165</span>
          </div>
        </motion.div>

        {/* polaroid + paperclip — printed photo pinned above, extends past the portrait */}
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
