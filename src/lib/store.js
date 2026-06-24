// Lightweight localStorage-backed store shared by the booking flow and the
// admin dashboard. In production this would be a Supabase / API layer; the shape
// is intentionally close to a real bookings table so it can be swapped easily.

import { services } from '../data/services'
import { stylists } from '../data/stylists'

const KEY = 'hhs.bookings.v1'
const BLOCKED_KEY = 'hhs.blocked.v1'
const SETTINGS_KEY = 'hhs.settings.v1'

const listeners = new Set()
const emit = () => listeners.forEach((l) => l())
export const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const write = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
  emit()
}

// ---- Date helpers -------------------------------------------------------
export const isoDate = (d) => {
  const dt = typeof d === 'string' ? new Date(d) : d
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
    dt.getDate(),
  ).padStart(2, '0')}`
}

export const ALL_TIMES = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:30 PM',
  '3:00 PM',
  '4:00 PM',
  '4:30 PM',
]

// ---- Seed demo data so the admin dashboard looks alive on first run -----
const seed = () => {
  if (read(KEY, null)) return
  const today = new Date()
  const day = (offset) => {
    const d = new Date(today)
    d.setDate(d.getDate() + offset)
    return isoDate(d)
  }
  const demo = [
    {
      id: 'HHS-48201',
      service: 'balayage',
      stylist: 'rafa',
      date: day(0),
      time: '10:00 AM',
      name: 'Gabriela Marin',
      phone: '+297 560 1122',
      email: 'gabriela@example.com',
      notes: 'Going lighter for summer.',
      status: 'confirmed',
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: 'HHS-48202',
      service: 'keratin',
      stylist: 'felicia',
      date: day(0),
      time: '1:00 PM',
      name: 'Liannys Rosario',
      phone: '+297 561 8890',
      email: 'liannys@example.com',
      notes: '',
      status: 'confirmed',
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'HHS-48203',
      service: 'haircut',
      stylist: 'eli',
      date: day(1),
      time: '11:00 AM',
      name: 'Shaira Dijkhoff',
      phone: '+297 562 4471',
      email: 'shaira@example.com',
      notes: 'Trim and face-framing layers.',
      status: 'pending',
      createdAt: Date.now() - 3600000 * 5,
    },
    {
      id: 'HHS-48204',
      service: 'bridal',
      stylist: 'nohely',
      date: day(3),
      time: '9:00 AM',
      name: 'Daniela Velasquez',
      phone: '+297 563 0098',
      email: 'daniela@example.com',
      notes: 'Bridal trial — romantic waves.',
      status: 'pending',
      createdAt: Date.now() - 3600000 * 2,
    },
    {
      id: 'HHS-48205',
      service: 'highlights',
      stylist: 'rafa',
      date: day(-2),
      time: '2:30 PM',
      name: 'Maria Carmen',
      phone: '+297 564 7712',
      email: 'mcarmen@example.com',
      notes: '',
      status: 'completed',
      createdAt: Date.now() - 86400000 * 4,
    },
    {
      id: 'HHS-48206',
      service: 'blowout',
      stylist: 'felicia',
      date: day(2),
      time: '4:00 PM',
      name: 'Sofia Tromp',
      phone: '+297 565 3321',
      email: 'sofia@example.com',
      notes: '',
      status: 'confirmed',
      createdAt: Date.now() - 3600000 * 8,
    },
  ]
  write(KEY, demo)
}
seed()

// ---- Bookings -----------------------------------------------------------
export const getBookings = () => read(KEY, [])

export const getBookingsFor = (dateIso, stylistId) =>
  getBookings().filter(
    (b) =>
      b.date === dateIso &&
      b.status !== 'cancelled' &&
      (!stylistId || stylistId === 'any' || b.stylist === stylistId),
  )

// Times already taken for a given date + stylist (to prevent double-booking).
export const getTakenTimes = (dateIso, stylistId) => {
  const rel = getBookingsFor(dateIso, stylistId)
  return new Set(rel.map((b) => b.time))
}

export const genConfirmation = () =>
  'HHS-' + Math.floor(10000 + Math.random() * 89999)

export const addBooking = (data) => {
  const bookings = getBookings()
  const booking = {
    id: genConfirmation(),
    status: 'pending',
    createdAt: Date.now(),
    ...data,
  }
  write(KEY, [booking, ...bookings])
  return booking
}

export const updateBooking = (id, patch) => {
  write(
    KEY,
    getBookings().map((b) => (b.id === id ? { ...b, ...patch } : b)),
  )
}

export const removeBooking = (id) => {
  write(
    KEY,
    getBookings().filter((b) => b.id !== id),
  )
}

// ---- Blocked / vacation dates ------------------------------------------
export const getBlockedDates = () => read(BLOCKED_KEY, [])
export const toggleBlockedDate = (dateIso) => {
  const cur = getBlockedDates()
  write(
    BLOCKED_KEY,
    cur.includes(dateIso) ? cur.filter((d) => d !== dateIso) : [...cur, dateIso],
  )
}
export const isBlocked = (dateIso) => getBlockedDates().includes(dateIso)

// ---- Settings (working hours, capacity) --------------------------------
const DEFAULT_SETTINGS = {
  closedWeekdays: [0], // Sunday closed
  slotsPerDay: ALL_TIMES.length,
}
export const getSettings = () => ({ ...DEFAULT_SETTINGS, ...read(SETTINGS_KEY, {}) })
export const saveSettings = (patch) =>
  write(SETTINGS_KEY, { ...getSettings(), ...patch })

// ---- Availability -------------------------------------------------------
export const isDateUnavailable = (date) => {
  const dt = typeof date === 'string' ? new Date(date) : date
  const iso = isoDate(dt)
  const settings = getSettings()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (dt < today) return true
  if (settings.closedWeekdays.includes(dt.getDay())) return true
  if (isBlocked(iso)) return true
  // Fully booked: every stylist slot taken (rough heuristic for the demo).
  const taken = getTakenTimes(iso, 'any')
  if (taken.size >= ALL_TIMES.length * stylists.length) return true
  return false
}

// ---- Lookups (services + stylists are managed in admin too) ------------
const SERVICES_KEY = 'hhs.services.v1'
const STYLISTS_KEY = 'hhs.stylists.v1'
export const getManagedServices = () => read(SERVICES_KEY, services)
export const saveManagedServices = (list) => write(SERVICES_KEY, list)
export const getManagedStylists = () => read(STYLISTS_KEY, stylists)
export const saveManagedStylists = (list) => write(STYLISTS_KEY, list)
