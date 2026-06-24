import PageHeader from '../components/PageHeader'
import ContactSection from '../sections/ContactSection'
import FAQ from '../sections/FAQ'

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Us"
        title="We’d love to see you."
        subtitle="Questions, bookings or a little advice — reach out, or drop by the studio in Oranjestad."
      />
      <ContactSection />
      <FAQ />
    </>
  )
}
