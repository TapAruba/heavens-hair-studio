import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, CalendarHeart } from 'lucide-react'
import { studio } from '../data/content'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/stylists', label: 'Stylists' },
  { to: '/gallery', label: 'Gallery' },
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-plum/10 bg-porcelain/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(74,44,61,0.35)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-luxe flex h-[72px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="Heaven's Hair Studio"
              className="h-11 w-11 rounded-xl object-cover shadow-soft"
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight text-plum-900">
                Heaven’s Hair Studio
              </span>
              <span className="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-luxe text-plum/55">
                Oranjestad · Aruba
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline text-sm font-medium transition-colors ${
                    isActive ? 'text-plum' : 'text-ink/70 hover:text-plum'
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
              className="grid h-11 w-11 place-items-center rounded-xl border border-plum/15 bg-white/70 text-plum backdrop-blur lg:hidden"
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
            <div className="container-luxe flex flex-col gap-1 py-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
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
