// Stylists. Names drawn from the studio's real, named reviews (Rafa, Eli, Felicia).
// Portraits are placeholders — swap with the team's own photography.

export const stylists = [
  {
    id: 'rafa',
    name: 'Rafa',
    title: 'Master Stylist & Colour Director',
    specialty: 'Balayage & Colour Correction',
    experience: 12,
    rating: 5.0,
    bio: 'Heaven’s most-requested colourist. Rafa is celebrated for luminous, lived-in balayage and meticulous colour correction — clients call the work simply “the best.”',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    instagram: 'heavens_hair_studio',
  },
  {
    id: 'eli',
    name: 'Eli',
    title: 'Senior Stylist',
    specialty: 'Precision Cuts & Styling',
    experience: 9,
    rating: 4.9,
    bio: 'Known for cuts that fall perfectly into place and a calm, considered chair-side manner. Eli shapes every style to how you actually wear your hair.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    instagram: 'heavens_hair_studio',
  },
  {
    id: 'felicia',
    name: 'Felicia',
    title: 'Stylist & Treatment Specialist',
    specialty: 'Keratin, Treatments & Blowouts',
    experience: 7,
    rating: 4.9,
    bio: 'Felicia’s treatments leave hair impossibly glossy and humidity-proof — a favourite for Aruba brides and anyone chasing that smooth, healthy finish.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
    instagram: 'heavens_hair_studio',
  },
]

export const getStylist = (id) => stylists.find((s) => s.id === id)
