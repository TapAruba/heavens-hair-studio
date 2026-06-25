import { Link } from 'react-router-dom'
import { MapPin, Scissors, Sparkles, HeartHandshake, CalendarHeart } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CTABanner from '../sections/CTABanner'
import { Reveal, SectionHeading, Pill } from '../components/ui'
import { studio } from '../data/content'

const values = [
  { icon: Scissors, title: 'Master Craft', text: 'Cut, colour, treatment and makeup by seasoned specialists.' },
  { icon: Sparkles, title: 'Quiet Luxury', text: 'A calm, considered space designed entirely around you.' },
  { icon: HeartHandshake, title: 'Genuine Care', text: 'Honest advice and hair health, always put first.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Where craft meets care."
        subtitle="A refined sanctuary for hair and makeup in the heart of Oranjestad — built on precision, polish and a quiet sense of luxury."
      />

      {/* Storefront + story */}
      <section className="py-16 lg:py-24">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-plum/5">
                <img
                  src="/photos/storefront.jpg"
                  alt="The Heaven's Hair Studio storefront in Oranjestad, Aruba"
                  className="aspect-[4/3.2] w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-3xl tx-herringbone opacity-70" />
              <div className="absolute -bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-plum shadow-lift">
                <MapPin size={14} className="text-lilac" />
                {studio.address}
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="The Essence"
              title="A boutique salon, built on detail."
              subtitle="Heaven’s Hair Studio began with a simple belief — that beauty is equal parts craft and care. From colour and cuts to flawless makeup, every guest is looked after with the kind of attention that turns a salon visit into a moment for yourself."
            />
            <p className="mt-6 text-[0.975rem] leading-relaxed text-ink/65">
              Our team is the heart of it all: warm, precise and genuinely passionate. It’s why our
              guests return again and again, and ask for their favourites by name.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>Hair Studio</Pill>
              <Pill>Makeup Artistry</Pill>
              <Pill>Bridal &amp; Events</Pill>
              <Pill>Extensions</Pill>
            </div>
            <Link to="/book" className="btn-primary mt-9">
              <CalendarHeart size={16} />
              Book your visit
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-blush-grad py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading center eyebrow="Why Heaven’s" title="The difference is in the detail." />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-4xl border border-plum/10 bg-white p-8 shadow-soft transition hover:-translate-y-1.5 hover:shadow-card">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-plum-grad text-porcelain shadow-soft">
                    <v.icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-plum-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-plum/5">
              <img src="/photos/team.jpg" alt="The Heaven's Hair Studio team" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <SectionHeading
                eyebrow="The Team"
                title="The hands behind the craft."
                subtitle="A talented team of stylists and makeup artists, each bringing their own specialty — colour, cutting, treatments, extensions and bridal glam — together under one roof."
              />
              <Link to="/stylists" className="btn-secondary mt-8">
                Meet the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
