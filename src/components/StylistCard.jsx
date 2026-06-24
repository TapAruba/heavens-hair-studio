import { Link } from 'react-router-dom'
import { Instagram, CalendarHeart } from 'lucide-react'
import { Stars } from './ui'

export default function StylistCard({ stylist }) {
  return (
    <article className="group card overflow-hidden hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={stylist.image}
          alt={stylist.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/15 to-transparent" />

        <a
          href={`https://www.instagram.com/${stylist.instagram}/`}
          target="_blank"
          rel="noreferrer"
          aria-label={`${stylist.name} on Instagram`}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-plum opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 hover:bg-white"
        >
          <Instagram size={16} />
        </a>

        <div className="absolute inset-x-0 bottom-0 p-6 text-porcelain">
          <Stars value={stylist.rating} className="mb-2" />
          <h3 className="font-display text-2xl font-semibold leading-none">{stylist.name}</h3>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-porcelain/75">
            {stylist.title}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
          <span className="rounded-full bg-blush/60 px-3 py-1 font-medium text-plum">
            {stylist.specialty}
          </span>
          <span className="rounded-full border border-plum/12 px-3 py-1 font-medium text-plum/70">
            {stylist.experience} yrs
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">{stylist.bio}</p>
        <Link
          to={`/book?stylist=${stylist.id}`}
          className="btn-secondary mt-5 w-full"
        >
          <CalendarHeart size={15} />
          Book with {stylist.name}
        </Link>
      </div>
    </article>
  )
}
