import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading, Pill } from '../components/ui'

export default function StylistStrip() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        {/* team imagery */}
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-plum/5">
              <img
                src="/photos/team.jpg"
                alt="The Heaven's Hair Studio team"
                className="aspect-[4/3.1] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 w-40 overflow-hidden rounded-3xl border-4 border-porcelain shadow-lift sm:-left-8 sm:w-52">
              <img
                src="/photos/action-color.jpg"
                alt="A Heaven's stylist at work"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-3xl tx-herringbone opacity-70" />
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading
            eyebrow="The Team"
            title="Meet the hands behind the craft."
            subtitle="Personable, precise and genuinely passionate — our stylists and makeup artists are the heart of Heaven’s. Guests come back for the people they trust, asking for their favourites by name."
          />

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>Colour Specialists</Pill>
              <Pill>Cut &amp; Styling</Pill>
              <Pill>Makeup Artists</Pill>
              <Pill>Bridal Team</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <blockquote className="mt-8 rounded-3xl border border-plum/10 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-1 text-lilac">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Sparkles key={i} size={14} className="fill-lilac text-lilac" />
                ))}
              </div>
              <p className="mt-3 font-display text-xl italic leading-relaxed text-plum-900">
                “The best salon ever — Rafa, Eli, Felicia and the whole team make every visit feel
                effortless.”
              </p>
              <footer className="mt-2 text-xs uppercase tracking-wider text-ink/45">
                — A loyal Heaven’s guest
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.35}>
            <Link to="/stylists" className="btn-secondary mt-8">
              Meet the team
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
