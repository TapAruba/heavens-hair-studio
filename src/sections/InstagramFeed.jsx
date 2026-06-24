import { Instagram, ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { instagramFeed, studio } from '../data/content'

export default function InstagramFeed() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            center
            eyebrow="@heavens_hair_studio"
            title="Follow the daily craft."
            subtitle="A feed of fresh colour, finished looks and life inside the studio."
          />
          <Reveal delay={0.1}>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramFeed.map((src, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <a
                href={studio.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src={src}
                  alt="Heaven's Hair Studio Instagram"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center bg-plum-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="text-porcelain" size={22} />
                </div>
                <ArrowUpRight
                  className="absolute right-2 top-2 text-porcelain opacity-0 transition-opacity group-hover:opacity-100"
                  size={16}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
