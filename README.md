# Heaven's Hair Studio — Website Prototype

A premium, boutique website for **Heaven's Hair Studio**, Oranjestad, Aruba.
Built with Vite + React, Tailwind CSS and Framer Motion, designed entirely around
the studio's brand identity.

## Brand
- **Colours** — Royal Plum `#6C445C`, Deep Wine `#4A2C3D`, Soft Lilac `#CDA8D0`, Blush Petal `#E9D6E8`, Porcelain `#FAF6F8`
- **Type** — Cormorant Garamond (display) · Montserrat (text)
- **Voice** — "Where craft meets care."

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
```

## What's inside
- **Home** — hero, about, featured services, why-choose-us, stylists, before/after gallery
  with lightbox, auto-sliding testimonials, Instagram feed, FAQ, contact + hours + map, CTA.
- **Services** — filterable premium service cards (`/services`).
- **Stylists** — team profiles, book-with-stylist (`/stylists`).
- **Gallery** — masonry gallery + lightbox (`/gallery`).
- **Contact** — details, hours, map, FAQ (`/contact`).
- **Booking** — 7-step flow: service → stylist → date → time → details → review → success,
  with calendar, double-booking prevention, validation, and "add to calendar" (`/book`).
- **Admin** — SaaS-style dashboard: appointments, calendar, services CRUD, stylists,
  availability/blocked dates, settings (`/admin`, demo login — any password).

## Notes for launch
- **Images** are tasteful Unsplash placeholders. Swap them with the studio's own
  Instagram / Facebook photography — see `src/data/services.js`, `stylists.js`, `content.js`.
- **Booking + admin data** persist in `localStorage` (the admin sees real bookings made
  on the site). For production, swap `src/lib/store.js` for a Supabase / API backend.
- **Logo & banner** live in `public/brand/`.
