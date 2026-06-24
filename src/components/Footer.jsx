import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react'
import { studio } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-grad text-porcelain">
      <div className="pointer-events-none absolute inset-0 tx-pinstripe opacity-40" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lilac/20 blur-3xl" />

      <div className="container-luxe relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="Heaven's Hair Studio"
                className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/20"
              />
              <span className="font-display text-2xl font-semibold">Heaven’s Hair Studio</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-porcelain/70">
              {studio.essence} A refined sanctuary for hair in Oranjestad — built on precision,
              polish and a quiet sense of luxury.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={studio.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-porcelain/80 transition hover:bg-white hover:text-plum"
              >
                <Instagram size={17} />
              </a>
              <a
                href={studio.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-porcelain/80 transition hover:bg-white hover:text-plum"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-luxe text-porcelain/60">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-porcelain/80">
              {[
                ['Home', '/'],
                ['Services', '/services'],
                ['Our Stylists', '/stylists'],
                ['Gallery', '/gallery'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-porcelain">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-luxe text-porcelain/60">
              Visit
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-porcelain/80">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-lilac" />
                <span>{studio.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-lilac" />
                <a href={`tel:${studio.phoneHref}`} className="hover:text-porcelain">
                  {studio.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-lilac" />
                <a href={`mailto:${studio.email}`} className="break-all hover:text-porcelain">
                  {studio.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-luxe text-porcelain/60">
              Book your moment
            </h4>
            <p className="mt-5 text-sm text-porcelain/75">
              Reserve your chair online in under two minutes.
            </p>
            <Link
              to="/book"
              className="btn mt-5 w-full bg-white px-6 py-3.5 text-plum hover:-translate-y-0.5 hover:shadow-lift"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/12 pt-8 text-xs text-porcelain/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Heaven’s Hair Studio. All rights reserved.</p>
          <p className="tracking-wide">Crafted with intention, finished with grace.</p>
          <Link to="/admin" className="transition hover:text-porcelain/90">
            Studio Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
