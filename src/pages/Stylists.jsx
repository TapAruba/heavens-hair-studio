import PageHeader from '../components/PageHeader'
import StylistCard from '../components/StylistCard'
import CTABanner from '../sections/CTABanner'
import { Reveal } from '../components/ui'
import { stylists } from '../data/stylists'

export default function Stylists() {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title="Meet our stylists."
        subtitle="Talented, warm and endlessly precise — get to know the people our guests request by name, and book directly with your favourite."
      />

      <section className="py-16 lg:py-20">
        <div className="container-luxe">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08}>
                <StylistCard stylist={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
