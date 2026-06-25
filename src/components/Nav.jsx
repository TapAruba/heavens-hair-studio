import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, CalendarHeart } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/stylists', label: 'Stylists' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // White-on-photo treatment only while resting over the home hero.
  const overHero = pathname === '/' && !scrolled

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-plum/10 bg-porcelain/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(74,44,61,0.35)]'
            : overHero
              ? 'border-b border-white/10 bg-white/[0.04] backdrop-blur-md'
              : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-[7%]">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="Heaven's Hair Studio"
              className="h-11 w-11 rounded-xl object-cover shadow-soft ring-1 ring-white/20"
            />
            <span className="leading-none">
              <span
                className={`block font-display text-lg font-semibold tracking-tight transition-colors ${
                  overHero ? 'text-porcelain' : 'text-plum-900'
                }`}
              >
                Heaven’s Hair Studio
              </span>
              <span
                className={`mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-luxe transition-colors ${
                  overHero ? 'text-porcelain/70' : 'text-plum/55'
                }`}
              >
                Oranjestad · Aruba
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `link-underline text-sm font-medium transition-colors ${
                    overHero
                      ? isActive
                        ? 'text-porcelain'
                        : 'text-porcelain/75 hover:text-porcelain'
                      : isActive
                        ? 'text-plum'
                        : 'text-ink/70 hover:text-plum'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/book" className="hidden btn-primary lg:inline-flex">
              <CalendarHeart size={16} />
              Book Appointment
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className={`grid h-11 w-11 place-items-center rounded-xl border backdrop-blur transition-colors lg:hidden ${
                overHero
                  ? 'border-white/30 bg-white/10 text-porcelain'
                  : 'border-plum/15 bg-white/70 text-plum'
              }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-plum/10 bg-porcelain/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-1 px-6 py-5 sm:px-10">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-blush/60 text-plum' : 'text-ink/75'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/book" className="btn-primary mt-2 w-full">
                <CalendarHeart size={16} />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
