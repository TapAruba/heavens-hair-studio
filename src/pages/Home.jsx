import Hero from '../sections/Hero'
import About from '../sections/About'
import FeaturedServices from '../sections/FeaturedServices'
import WhyChooseUs from '../sections/WhyChooseUs'
import StylistStrip from '../sections/StylistStrip'
import GalleryStrip from '../sections/GalleryStrip'
import Testimonials from '../sections/Testimonials'
import InstagramFeed from '../sections/InstagramFeed'
import FAQ from '../sections/FAQ'
import ContactSection from '../sections/ContactSection'
import CTABanner from '../sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedServices />
      <WhyChooseUs />
      <StylistStrip />
      <GalleryStrip />
      <Testimonials />
      <InstagramFeed />
      <FAQ />
      <ContactSection />
      <CTABanner />
    </>
  )
}
