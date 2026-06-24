import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import MasonryGallery from '../components/MasonryGallery'
import { gallery } from '../data/content'

export default function GalleryStrip() {
  return (
    <section className="relative bg-blush-grad py-24 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="Before & After"
            title="A portfolio of transformations."
            subtitle="A glimpse of the colour, cuts and styling our guests walk out with. Tap any image to view it up close."
          />
          <Reveal delay={0.1}>
            <Link to="/gallery" className="btn-secondary shrink-0">
              Full gallery
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          <MasonryGallery items={gallery} />
        </div>
      </div>
    </section>
  )
}
