// Service catalogue for Heaven's Hair Studio.
// Images are tasteful placeholders (Unsplash) — swap `image` values with the
// studio's own Instagram / Facebook photography before launch.

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
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?auto=format&fit=crop&w=900&q=80',
  },
]

export const serviceCategories = ['All', 'Cut & Style', 'Colour', 'Treatment', 'Transformation']

export const featuredServiceIds = ['balayage', 'haircut', 'keratin', 'bridal']

export const getService = (id) => services.find((s) => s.id === id)

export const formatPrice = (n) => `$${n}`
export const formatDuration = (m) =>
  m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}` : `${m} min`
