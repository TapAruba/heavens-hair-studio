import { Reveal, SectionHeading } from '../components/ui'
import { Award, Leaf, Gem, CalendarCheck, Users, ShieldCheck } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Award-worthy expertise',
    text: 'A team of master stylists and colourists with decades of combined experience.',
  },
  {
    icon: Gem,
    title: 'Premium products',
    text: 'Only professional-grade colour, care and tools — many available in-studio to take home.',
  },
  {
    icon: Leaf,
    title: 'Hair health first',
    text: 'Bond-building and restorative steps woven into every colour and treatment.',
  },
  {
    icon: CalendarCheck,
    title: 'Effortless booking',
    text: 'Reserve your chair online in minutes, with instant confirmation.',
  },
  {
    icon: Users,
    title: 'Tailored to you',
    text: 'Every service is consultation-led and shaped to your hair, face and lifestyle.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted on the island',
    text: 'Loved by guests across Aruba, with a reputation built on consistency.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          center
          eyebrow="Why Heaven’s"
          title="The difference is in the detail."
          subtitle="Six reasons guests choose us — and keep coming back."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-4xl border border-plum/10 bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blush/0 transition-colors duration-500 group-hover:bg-blush/50" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-plum-grad text-porcelain shadow-soft">
                  <r.icon size={22} />
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-plum-900">
                  {r.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink/60">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
