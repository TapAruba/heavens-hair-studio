import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import StylistCard from '../components/StylistCard'
import { stylists } from '../data/stylists'

export default function StylistStrip() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="The Team"
            title="Meet the hands behind the craft."
            subtitle="Personable, precise and genuinely passionate — our stylists are the heart of Heaven’s, and the reason guests ask for them by name."
          />
          <Reveal delay={0.1}>
            <Link to="/stylists" className="btn-secondary shrink-0">
              Meet everyone
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {stylists.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <StylistCard stylist={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
