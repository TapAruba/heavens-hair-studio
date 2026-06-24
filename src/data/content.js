// Testimonials, gallery, FAQ and studio info.

export const testimonials = [
  {
    id: 1,
    name: 'Gabriela M.',
    role: 'Balayage client',
    rating: 5,
    quote:
      'The best hair salon ever. Rafa is a true professional — my colour has never looked this natural and luminous. I won’t go anywhere else.',
    image: '/photos/hair-caramel.jpg',
  },
  {
    id: 2,
    name: 'Shaira D.',
    role: 'Bridal client',
    rating: 5,
    quote:
      'Eli did a fantastic job for my wedding — hair and makeup both. Everything was calm, elegant and exactly what I pictured. Highly recommend Heaven’s to every bride.',
    image: '/photos/makeup-glam.jpg',
  },
  {
    id: 3,
    name: 'Liannys R.',
    role: 'Keratin & blowout',
    rating: 5,
    quote:
      'Felicia’s keratin treatment changed my mornings. Smooth, glossy and frizz-free even in the Aruba heat. The studio itself feels so refined.',
    image: '/photos/hair-platinum.jpg',
  },
  {
    id: 4,
    name: 'Daniela V.',
    role: 'Colour client',
    rating: 5,
    quote:
      'From the welcome to the finish, every detail feels considered. This is the most premium salon experience on the island, hands down.',
    image: '/photos/hair-magenta.jpg',
  },
  {
    id: 5,
    name: 'Maria Carmen',
    role: 'Highlights client',
    rating: 5,
    quote:
      'Beautiful space, lovely team and hair that gets compliments for weeks. Booking online made it effortless. Truly a boutique experience.',
    image: '/photos/hair-auburn.jpg',
  },
]

// Before & after / portfolio gallery — the studio's own work. Tall/wide mix for masonry.
export const gallery = [
  { id: 'g1', src: '/photos/hair-magenta.jpg', caption: 'Vivid plum colour', span: 'tall' },
  { id: 'g2', src: '/photos/ba-1.jpg', caption: 'Makeup transformation', span: 'wide' },
  { id: 'g3', src: '/photos/hair-auburn.jpg', caption: 'Sleek auburn', span: 'normal' },
  { id: 'g4', src: '/photos/makeup-glam.jpg', caption: 'Event glam', span: 'tall' },
  { id: 'g5', src: '/photos/hair-platinum.jpg', caption: 'Platinum pixie', span: 'normal' },
  { id: 'g6', src: '/photos/makeup-gems.jpg', caption: 'Editorial artistry', span: 'wide' },
  { id: 'g7', src: '/photos/hair-pixie.jpg', caption: 'Soft cut & glam', span: 'normal' },
  { id: 'g8', src: '/photos/ba-3.jpg', caption: 'Glow-up', span: 'tall' },
  { id: 'g9', src: '/photos/hair-caramel.jpg', caption: 'Caramel waves', span: 'normal' },
  { id: 'g10', src: '/photos/ba-2.jpg', caption: 'Bridal-ready beauty', span: 'wide' },
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

// Instagram feed — the studio's own work (swap for live embed at launch).
export const instagramFeed = [
  '/photos/hair-magenta.jpg',
  '/photos/makeup-glam.jpg',
  '/photos/hair-auburn.jpg',
  '/photos/makeup-gems.jpg',
  '/photos/hair-platinum.jpg',
  '/photos/hair-caramel.jpg',
]
