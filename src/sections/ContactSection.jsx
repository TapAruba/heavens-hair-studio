import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle, CalendarHeart } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { studio } from '../data/content'

function todayIndex() {
  // JS: 0=Sun..6=Sat ; our hours array is Mon..Sun
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

export default function ContactSection() {
  const today = todayIndex()

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          center
          eyebrow="Visit Us"
          title="Come and be looked after."
          subtitle="Find us in the heart of Oranjestad. Walk-ins welcome when we can — booking ahead is always best."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Map */}
          <Reveal>
            <div className="h-full overflow-hidden rounded-4xl border border-plum/10 shadow-card">
              <iframe
                title="Heaven's Hair Studio location"
                src={studio.mapEmbed}
                className="h-full min-h-[420px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Details + hours */}
          <div className="grid gap-6">
            <Reveal delay={0.08}>
              <div className="rounded-4xl border border-plum/10 bg-white p-7 shadow-soft">
                <h3 className="font-display text-2xl font-semibold text-plum-900">Get in touch</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blush/60 text-plum">
                      <MapPin size={16} />
                    </span>
                    <span className="pt-1.5 text-ink/70">{studio.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blush/60 text-plum">
                      <Phone size={16} />
                    </span>
                    <a href={`tel:${studio.phoneHref}`} className="pt-1.5 text-ink/70 hover:text-plum">
                      {studio.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blush/60 text-plum">
                      <Mail size={16} />
                    </span>
                    <a
                      href={`mailto:${studio.email}`}
                      className="break-all pt-1.5 text-ink/70 hover:text-plum"
                    >
                      {studio.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${studio.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                  <Link to="/book" className="btn-primary">
                    <CalendarHeart size={15} />
                    Book Now
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-4xl border border-plum/10 bg-white p-7 shadow-soft">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-lilac" />
                  <h3 className="font-display text-2xl font-semibold text-plum-900">
                    Business hours
                  </h3>
                </div>
                <ul className="mt-5 divide-y divide-plum/8">
                  {studio.hours.map((h, i) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between py-2.5 text-sm ${
                        i === today ? 'font-semibold text-plum' : 'text-ink/65'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {h.day}
                        {i === today && (
                          <span className="rounded-full bg-blush/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-plum">
                            Today
                          </span>
                        )}
                      </span>
                      <span>
                        {h.close ? `${h.open} – ${h.close}` : <span className="text-plum/45">Closed</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
