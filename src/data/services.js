// Service catalogue for Heaven's Hair Studio — a hair AND makeup salon.
// Images are the studio's own photography (public/photos).

export const services = [
  {
    id: 'haircut',
    name: 'Precision Haircut',
    category: 'Cut & Style',
    blurb: 'A tailored cut shaped to your face, texture and lifestyle.',
    description:
      'A consultation-led cut crafted to your hair type and the way you live. Includes a relaxing wash, scalp ritual and finish.',
    duration: 60,
    price: 65,
    image: '/photos/hair-pixie.jpg',
  },
  {
    id: 'color',
    name: 'Hair Colour',
    category: 'Colour',
    blurb: 'Rich, dimensional colour mixed to your exact tone.',
    description:
      'Full-head permanent or semi-permanent colour, custom blended for depth and shine, with a bond-building treatment.',
    duration: 120,
    price: 110,
    image: '/photos/hair-magenta.jpg',
  },
  {
    id: 'highlights',
    name: 'Highlights',
    category: 'Colour',
    blurb: 'Hand-placed lights for soft, sunlit dimension.',
    description:
      'Foil highlights placed by hand to brighten and frame, finished with a gloss and blow-dry.',
    duration: 150,
    price: 135,
    image: '/photos/action-color.jpg',
  },
  {
    id: 'balayage',
    name: 'Balayage',
    category: 'Colour',
    blurb: 'Lived-in, freehand colour that grows out beautifully.',
    description:
      'Our signature freehand technique for a sun-kissed, seamless gradient with minimal upkeep. Includes toner and treatment.',
    duration: 180,
    price: 165,
    image: '/photos/hair-caramel.jpg',
  },
  {
    id: 'blowout',
    name: 'Luxury Blowout',
    category: 'Cut & Style',
    blurb: 'Smooth, voluminous, camera-ready finish.',
    description:
      'A wash, scalp massage and expert blow-dry styled to your occasion — bouncy, sleek or softly waved.',
    duration: 45,
    price: 45,
    image: '/photos/hair-auburn.jpg',
  },
  {
    id: 'keratin',
    name: 'Keratin Treatment',
    category: 'Treatment',
    blurb: 'Frizz-free, glossy and effortlessly manageable.',
    description:
      'A smoothing keratin service that tames frizz and cuts styling time for months. Ideal for humid Aruba days.',
    duration: 150,
    price: 180,
    image: '/photos/hair-platinum.jpg',
  },
  {
    id: 'treatment',
    name: 'Restorative Treatment',
    category: 'Treatment',
    blurb: 'Deep conditioning to revive strength and shine.',
    description:
      'An intensive bond and moisture ritual for hair that needs reviving — leaves strands soft, strong and luminous.',
    duration: 45,
    price: 55,
    image: '/photos/hair-caramel.jpg',
  },
  {
    id: 'extensions',
    name: 'Hair Extensions',
    category: 'Transformation',
    blurb: 'Premium length and volume, seamlessly blended.',
    description:
      'Consultation, colour-match and application of premium extensions for instant length and body. Price from consultation.',
    duration: 180,
    price: 250,
    image: '/photos/hair-auburn.jpg',
  },
  {
    id: 'styling',
    name: 'Event Styling',
    category: 'Cut & Style',
    blurb: 'Updos and finishes for every special moment.',
    description:
      'Bespoke styling for galas, photoshoots and celebrations — from sculpted updos to romantic waves.',
    duration: 60,
    price: 70,
    image: '/photos/makeup-glam.jpg',
  },
  {
    id: 'bridal',
    name: 'Bridal Hair',
    category: 'Transformation',
    blurb: 'Your crowning glory for the day that matters most.',
    description:
      'A dedicated bridal experience including trial, day-of styling and on-hand finishing. Book early — dates are limited.',
    duration: 120,
    price: 220,
    image: '/photos/hair-caramel.jpg',
  },
  {
    id: 'wash-style',
    name: 'Wash & Style',
    category: 'Cut & Style',
    blurb: 'A quick refresh that feels like a treat.',
    description:
      'A cleansing wash, conditioning and a polished style — perfect between appointments.',
    duration: 30,
    price: 35,
    image: '/photos/hair-pixie.jpg',
  },
  // ── Makeup ────────────────────────────────────────────────
  {
    id: 'glam-makeup',
    name: 'Glam Makeup',
    category: 'Makeup',
    blurb: 'A flawless, photo-ready face for any occasion.',
    description:
      'A full glam application — skin prep, sculpted eyes, lashes and a long-wear finish tailored to your features.',
    duration: 60,
    price: 75,
    image: '/photos/makeup-closeup.jpg',
  },
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    category: 'Makeup',
    blurb: 'Radiant, lasting beauty for your wedding day.',
    description:
      'A bridal makeup experience with trial and day-of application, designed to look luminous in person and on camera.',
    duration: 75,
    price: 130,
    image: '/photos/makeup-glam.jpg',
  },
  {
    id: 'artistry-makeup',
    name: 'Creative & Editorial Makeup',
    category: 'Makeup',
    blurb: 'Bold, artistic looks for shoots and events.',
    description:
      'Statement and editorial makeup — gems, graphic liner and creative artistry for photoshoots, parties and performances.',
    duration: 75,
    price: 95,
    image: '/photos/makeup-gems.jpg',
  },
]

export const serviceCategories = [
  'All',
  'Cut & Style',
  'Colour',
  'Treatment',
  'Transformation',
  'Makeup',
]

export const featuredServiceIds = ['balayage', 'color', 'glam-makeup', 'bridal']

export const getService = (id) => services.find((s) => s.id === id)

export const formatPrice = (n) => `$${n}`
export const formatDuration = (m) =>
  m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}` : `${m} min`
