// Testimonials, gallery, FAQ and studio info.

export const testimonials = [
  {
    id: 1,
    name: 'Gabriela M.',
    role: 'Balayage client',
    rating: 5,
    quote:
      'The best hair salon ever. Rafa is a true professional — my colour has never looked this natural and luminous. I won’t go anywhere else.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Shaira D.',
    role: 'Bridal client',
    rating: 5,
    quote:
      'Eli did a fantastic job for my wedding. Everything was calm, elegant and exactly what I pictured. Highly recommend Heaven’s to every bride.',
    image:
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Liannys R.',
    role: 'Keratin & blowout',
    rating: 5,
    quote:
      'Felicia’s keratin treatment changed my mornings. Smooth, glossy and frizz-free even in the Aruba heat. The studio itself feels so refined.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Daniela V.',
    role: 'Colour client',
    rating: 5,
    quote:
      'From the welcome to the finish, every detail feels considered. This is the most premium salon experience on the island, hands down.',
    image:
      'https://images.unsplash.com/photo-1530785602389-07594beb8b73?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 5,
    name: 'Maria Carmen',
    role: 'Highlights client',
    rating: 5,
    quote:
      'Beautiful space, lovely team and hair that gets compliments for weeks. Booking online made it effortless. Truly a boutique experience.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
  },
]

// Before & after / portfolio gallery. Tall/wide mix for a masonry layout.
export const gallery = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    caption: 'Soft balayage',
    span: 'tall',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    caption: 'Sunlit highlights',
    span: 'wide',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    caption: 'Lived-in colour',
    span: 'normal',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=800&q=80',
    caption: 'Bridal styling',
    span: 'tall',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    caption: 'Luxury blowout',
    span: 'normal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=800&q=80',
    caption: 'Rich brunette',
    span: 'wide',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    caption: 'Event updo',
    span: 'normal',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    caption: 'Length & volume',
    span: 'tall',
  },
]

export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Use our online booking — choose your service, a stylist (or no preference), then pick a date and time. You’ll receive a confirmation number instantly. You can also call us at +297 583 7377.',
  },
  {
    q: 'Do you offer consultations?',
    a: 'Yes. Colour transformations, extensions and bridal services begin with a complimentary consultation so we can tailor the result and confirm pricing before we begin.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We kindly ask for at least 24 hours’ notice to reschedule or cancel, so we can offer your time to another guest. Bridal bookings have a dedicated policy shared at consultation.',
  },
  {
    q: 'Do you sell professional hair products?',
    a: 'We do. Heaven’s is also a hair studio supply — we stock professional products, tools and extensions, and our team is happy to recommend the right care for your hair.',
  },
  {
    q: 'How early should I arrive?',
    a: 'Please arrive five minutes before your appointment so you can settle in and enjoy the full experience from the first moment.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept cash and major cards. For bridal and extension services a deposit may be requested to secure your date.',
  },
]

export const studio = {
  name: "Heaven's Hair Studio",
  tagline: 'Boutique Hair Studio',
  essence: 'Where craft meets care.',
  address: 'Seroe Blanco 16K, Oranjestad, Aruba',
  phone: '+297 583 7377',
  phoneHref: '+2975837377',
  whatsapp: '2975837377',
  email: 'havenyirei@gmail.com',
  instagram: 'https://www.instagram.com/heavens_hair_studio/',
  facebook: 'https://www.facebook.com/TheHeavensHairStudioVba/',
  mapEmbed:
    'https://www.google.com/maps?q=Seroe+Blanco+16K,+Oranjestad,+Aruba&output=embed',
  hours: [
    { day: 'Monday', open: '9:00', close: '18:00' },
    { day: 'Tuesday', open: '9:00', close: '18:00' },
    { day: 'Wednesday', open: '9:00', close: '18:00' },
    { day: 'Thursday', open: '9:00', close: '19:00' },
    { day: 'Friday', open: '9:00', close: '19:00' },
    { day: 'Saturday', open: '8:00', close: '17:00' },
    { day: 'Sunday', open: 'Closed', close: '' },
  ],
}

// Instagram feed placeholders — replace with embedded posts or real image URLs.
export const instagramFeed = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=500&q=80',
]
