import { Link } from 'react-router-dom'
import { CalendarHeart, Scissors, Palette, Sparkles, Heart } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CTABanner from '../sections/CTABanner'
import { Reveal, SectionHeading, Pill } from '../components/ui'

const disciplines = [
  { icon: Palette, title: 'Colour', text: 'Balayage, highlights and rich all-over colour, mixed to your exact tone.' },
  { icon: Scissors, title: 'Cut & Style', text: 'Precision cuts, blowouts and event styling shaped to you.' },
  { icon: Sparkles, title: 'Makeup', text: 'Glam, bridal and editorial artistry for any occasion.' },
  { icon: Heart, title: 'Bridal', text: 'A dedicated team for your wedding day — hair and makeup, start to finish.' },
]

export default function Stylists() {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title="Meet our team."
        subtitle="A warm, talented team of stylists and makeup artists — the people our guests request by name, and the reason Heaven’s feels like home."
      />

      {/* Team feature */}
      <section className="py-16 lg:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-plum/5">
              <img
                src="/photos/team.jpg"
                alt="The Heaven's Hair Studio team"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Craft & Care"
                  title="One team, every kind of beauty."
                  subtitle="From colour and cuts to flawless makeup, our specialists work side by side so you can have everything done under one roof. Honest advice, genuine warmth and results worth showing off."
                />
                <div className="mt-7 flex flex-wrap gap-3">
                  <Pill>Colour Specialists</Pill>
                  <Pill>Cut &amp; Styling</Pill>
                  <Pill>Makeup Artists</Pill>
                  <Pill>Extensions</Pill>
                  <Pill>Bridal Team</Pill>
                </div>
                <Link to="/book" className="btn-primary mt-8">
                  <CalendarHeart size={16} />
                  Book with our team
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/photos/action-color.jpg"
                  alt="Colour work in progress"
                  className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft"
                  loading="lazy"
                />
                <img
                  src="/photos/action-makeup.jpg"
                  alt="Makeup application in progress"
                  className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="bg-blush-grad py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            center
            eyebrow="What we do"
            title="Talent across every chair."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d, i) => (
              <Reveal key={d.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-4xl border border-plum/10 bg-white p-7 shadow-soft transition hover:-translate-y-1.5 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-plum-grad text-porcelain">
                    <d.icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-plum-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
