import { Reveal, SectionHeading, Pill } from '../components/ui'
import { Scissors, Sparkles, HeartHandshake } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        {/* layered imagery */}
        <div className="relative">
          <Reveal>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-plum/5">
              <img
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80"
                alt="Inside Heaven's Hair Studio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="absolute -bottom-8 -right-2 w-44 overflow-hidden rounded-3xl border-4 border-porcelain shadow-lift sm:-right-8 sm:w-56">
              <img
                src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=500&q=80"
                alt="Colour work at Heaven's Hair Studio"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-3xl tx-herringbone opacity-70" />
        </div>

        <div>
          <SectionHeading
            eyebrow="The Essence"
            title="A refined sanctuary for hair."
            subtitle="Heaven’s Hair Studio is a boutique salon in the heart of Oranjestad, where the latest techniques meet a warm, unhurried experience. We believe great hair is equal parts craft and care — and that every guest deserves to leave feeling like the most polished version of themselves."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Scissors, title: 'Master Craft', text: 'Cut, colour & treatment by seasoned specialists.' },
              { icon: Sparkles, title: 'Quiet Luxury', text: 'A calm, considered space designed for you.' },
              { icon: HeartHandshake, title: 'Genuine Care', text: 'Honest advice and hair health, always first.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.08}>
                <div className="rounded-3xl border border-plum/10 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush/60 text-plum">
                    <f.icon size={18} />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold text-plum-900">
                    {f.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Pill>Hair Studio</Pill>
              <Pill>Professional Supply</Pill>
              <Pill>Bridal &amp; Events</Pill>
              <Pill>Extensions</Pill>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
