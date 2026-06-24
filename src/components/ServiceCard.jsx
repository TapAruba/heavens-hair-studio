import { Link } from 'react-router-dom'
import { Clock, ArrowUpRight } from 'lucide-react'
import { formatDuration, formatPrice } from '../data/services'

export default function ServiceCard({ service }) {
  return (
    <article className="group card overflow-hidden hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/45 via-plum-900/0 to-transparent opacity-70" />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-plum backdrop-blur">
          {service.category}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-plum/90 px-3 py-1 text-sm font-semibold text-porcelain backdrop-blur">
          from {formatPrice(service.price)}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold leading-tight text-plum-900">
            {service.name}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{service.blurb}</p>

        <div className="mt-5 flex items-center justify-between border-t border-plum/8 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-plum/70">
            <Clock size={14} className="text-lilac" />
            {formatDuration(service.duration)}
          </span>
          <Link
            to={`/book?service=${service.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-plum transition-colors hover:text-wine"
          >
            Book now
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
