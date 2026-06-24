import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import ServiceCard from '../components/ServiceCard'
import { services, featuredServiceIds } from '../data/services'

export default function FeaturedServices() {
  const featured = featuredServiceIds.map((id) => services.find((s) => s.id === id))

  return (
    <section className="relative bg-blush-grad py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 tx-dotgrid opacity-40" />
      <div className="container-luxe relative">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="Signature Services"
            title="Crafted treatments, beautifully finished."
            subtitle="From lived-in balayage to smoothing keratin, every service begins with a consultation and ends with a finish you’ll want to show off."
          />
          <Reveal delay={0.1}>
            <Link to="/services" className="btn-secondary shrink-0">
              All services
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
