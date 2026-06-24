import PageHeader from '../components/PageHeader'
import MasonryGallery from '../components/MasonryGallery'
import CTABanner from '../sections/CTABanner'
import { gallery } from '../data/content'

// Double the set for a fuller gallery page.
const fullGallery = [
  ...gallery,
  ...gallery.map((g) => ({ ...g, id: g.id + '-b', span: g.span === 'tall' ? 'normal' : g.span })),
]

export default function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Before & After"
        title="A gallery of transformations."
        subtitle="Real results from our chairs — colour, cuts, treatments and styling. Tap any image to view it up close."
      />

      <section className="py-16 lg:py-20">
        <div className="container-luxe">
          <MasonryGallery items={fullGallery} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}
