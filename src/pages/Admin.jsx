import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, CalendarDays, Scissors, Users, CalendarOff, Settings as SettingsIcon,
  Search, Check, X, Clock, Phone, Mail, MessageSquare, TrendingUp, CalendarClock,
  CircleDollarSign, CheckCircle2, ChevronLeft, ChevronRight, Plus, Trash2, Pencil,
  LogOut, Star, ArrowUpRight, Menu,
} from 'lucide-react'
import Calendar from '../components/Calendar'
import {
  getBookings, updateBooking, removeBooking, subscribe, isoDate,
  getBlockedDates, toggleBlockedDate, getManagedServices, saveManagedServices,
  getManagedStylists, ALL_TIMES, getTakenTimes,
} from '../lib/store'
import { getService } from '../data/services'
import { getStylist } from '../data/stylists'
import { formatPrice, formatDuration } from '../data/services'
import { studio } from '../data/content'

// --- reactive store hook -------------------------------------------------
function useStoreVersion() {
  const [, setV] = useState(0)
  useEffect(() => subscribe(() => setV((x) => x + 1)), [])
}

const ease = [0.16, 1, 0.3, 1]
const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-plum/10 text-plum',
  cancelled: 'bg-red-100 text-red-600',
}

const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })

const serviceName = (id) => getService(id)?.name || managedName(id) || id
function managedName(id) {
  const s = getManagedServices().find((x) => x.id === id)
  return s?.name
}
const stylistName = (id) => (id === 'any' ? 'No preference' : getStylist(id)?.name || id)

// =========================================================================
export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('hhs.admin') === '1',
  )
  if (!authed) return <Login onAuth={() => setAuthed(true)} />
  return <Dashboard onLogout={() => { sessionStorage.removeItem('hhs.admin'); setAuthed(false) }} />
}

// --- Login ---------------------------------------------------------------
function Login({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    // Demo gate — any non-empty password works; replace with real auth.
    if (pw.trim()) {
      sessionStorage.setItem('hhs.admin', '1')
      onAuth()
    } else setErr(true)
  }
  return (
    <div className="grid min-h-screen place-items-center bg-blush-grad px-6">
      <div className="pointer-events-none fixed inset-0 tx-dotgrid opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative w-full max-w-sm rounded-4xl border border-plum/10 bg-white p-8 shadow-card"
      >
        <img src="/brand/logo.png" alt="" className="mx-auto h-16 w-16 rounded-2xl object-cover shadow-soft" />
        <h1 className="mt-5 text-center font-display text-3xl font-semibold text-plum-900">
          Studio Login
        </h1>
        <p className="mt-1 text-center text-sm text-ink/55">Heaven’s Hair Studio · Management</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false) }}
            placeholder="Password"
            className="input text-center"
            autoFocus
          />
          {err && <p className="text-center text-xs text-red-500">Please enter your password.</p>}
          <button className="btn-primary w-full">Enter Dashboard</button>
        </form>
        <p className="mt-5 text-center text-xs text-ink/40">
          Demo: enter any password to continue
        </p>
        <Link to="/" className="mt-4 block text-center text-xs text-plum/60 hover:text-plum">
          ← Back to website
        </Link>
      </motion.div>
    </div>
  )
}

// --- Dashboard shell -----------------------------------------------------
const NAV = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: CalendarClock },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'stylists', label: 'Stylists', icon: Users },
  { id: 'availability', label: 'Availability', icon: CalendarOff },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

function Dashboard({ onLogout }) {
  useStoreVersion()
  const [view, setView] = useState('overview')
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-plum/10 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-plum/8 px-6 py-5">
          <img src="/brand/logo.png" alt="" className="h-10 w-10 rounded-xl object-cover" />
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-plum-900">Heaven’s</p>
            <p className="text-[0.6rem] uppercase tracking-luxe text-plum/50">Studio Admin</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => { setView(n.id); setSidebar(false) }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                view === n.id
                  ? 'bg-plum-grad text-porcelain shadow-soft'
                  : 'text-ink/65 hover:bg-blush/40 hover:text-plum'
              }`}
            >
              <n.icon size={18} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-plum/8 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-ink/55 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {sidebar && (
        <div className="fixed inset-0 z-30 bg-plum-900/30 lg:hidden" onClick={() => setSidebar(false)} />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-plum/10 bg-porcelain/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebar(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-plum/15 text-plum lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-display text-2xl font-semibold capitalize text-plum-900">
                {NAV.find((n) => n.id === view)?.label}
              </h1>
              <p className="text-xs text-ink/50">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <Link to="/" target="_blank" className="btn-secondary hidden sm:inline-flex">
            View site <ArrowUpRight size={15} />
          </Link>
        </header>

        <main className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {view === 'overview' && <Overview onView={setView} />}
              {view === 'appointments' && <Appointments />}
              {view === 'calendar' && <CalendarView />}
              {view === 'services' && <ServicesAdmin />}
              {view === 'stylists' && <StylistsAdmin />}
              {view === 'availability' && <Availability />}
              {view === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// --- Overview ------------------------------------------------------------
function Overview({ onView }) {
  const bookings = getBookings()
  const todayIso = isoDate(new Date())
  const active = bookings.filter((b) => b.status !== 'cancelled')

  const todays = active
    .filter((b) => b.date === todayIso)
    .sort((a, b) => a.time.localeCompare(b.time))
  const pending = active.filter((b) => b.status === 'pending')
  const weekRevenue = active
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (getService(b.service)?.price || 0), 0)
  const completed = bookings.filter((b) => b.status === 'completed').length

  const stats = [
    { label: 'Today’s appointments', value: todays.length, icon: CalendarClock, tone: 'bg-blush/50 text-plum' },
    { label: 'Awaiting approval', value: pending.length, icon: Clock, tone: 'bg-amber-100 text-amber-700' },
    { label: 'Projected revenue', value: formatPrice(weekRevenue), icon: CircleDollarSign, tone: 'bg-emerald-100 text-emerald-700' },
    { label: 'Completed', value: completed, icon: CheckCircle2, tone: 'bg-plum/10 text-plum' },
  ]

  // bookings by service for the mini chart
  const byService = useMemo(() => {
    const map = {}
    active.forEach((b) => {
      const n = serviceName(b.service)
      map[n] = (map[n] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [bookings])
  const maxCount = Math.max(1, ...byService.map((s) => s[1]))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-plum/10 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${s.tone}`}>
                <s.icon size={19} />
              </span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-plum-900">{s.value}</p>
            <p className="mt-1 text-xs text-ink/55">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Today's schedule */}
        <div className="rounded-3xl border border-plum/10 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-plum-900">Today’s schedule</h2>
            <button onClick={() => onView('appointments')} className="text-xs font-semibold text-plum hover:text-wine">
              View all →
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {todays.length === 0 && (
              <p className="rounded-2xl bg-porcelain/60 py-10 text-center text-sm text-ink/45">
                No appointments scheduled today.
              </p>
            )}
            {todays.map((b) => (
              <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-plum/8 p-3.5">
                <div className="grid w-16 shrink-0 place-items-center rounded-xl bg-blush/50 py-2 text-center">
                  <span className="font-display text-sm font-semibold text-plum">{b.time.split(' ')[0]}</span>
                  <span className="text-[0.6rem] uppercase text-plum/55">{b.time.split(' ')[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-plum-900">{b.name}</p>
                  <p className="truncate text-xs text-ink/55">
                    {serviceName(b.service)} · {stylistName(b.stylist)}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold capitalize ${statusStyles[b.status]}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular services */}
        <div className="rounded-3xl border border-plum/10 bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-plum-900">Popular services</h2>
          <div className="mt-5 space-y-4">
            {byService.map(([name, count]) => (
              <div key={name}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-ink/70">{name}</span>
                  <span className="text-ink/45">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-blush/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ duration: 0.7, ease }}
                    className="h-full rounded-full bg-plum-grad"
                  />
                </div>
              </div>
            ))}
            {byService.length === 0 && (
              <p className="py-8 text-center text-sm text-ink/45">No data yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Appointments table --------------------------------------------------
const FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

function Appointments() {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [reschedule, setReschedule] = useState(null)
  const bookings = getBookings()

  const filtered = bookings
    .filter((b) => filter === 'all' || b.status === filter)
    .filter((b) => {
      if (!q) return true
      const hay = `${b.name} ${b.email} ${b.phone} ${b.id} ${serviceName(b.service)}`.toLowerCase()
      return hay.includes(q.toLowerCase())
    })
    .sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${
                filter === f
                  ? 'bg-plum text-porcelain'
                  : 'border border-plum/15 bg-white text-plum/65 hover:border-plum/35'
              }`}
            >
              {f}
              {f !== 'all' && (
                <span className="ml-1.5 opacity-60">
                  {bookings.filter((b) => b.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-plum/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, code…"
            className="w-full rounded-full border border-plum/15 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-lilac sm:w-72"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-plum/10 bg-white shadow-soft">
        <div className="hidden grid-cols-[1.4fr_1.2fr_1fr_1fr_0.8fr_auto] gap-4 border-b border-plum/8 bg-porcelain/50 px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-wide text-plum/50 lg:grid">
          <span>Client</span><span>Service</span><span>Stylist</span><span>When</span><span>Status</span><span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-plum/6">
          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-ink/45">No appointments found.</p>
          )}
          {filtered.map((b) => (
            <AppointmentRow key={b.id} b={b} onReschedule={() => setReschedule(b)} />
          ))}
        </div>
      </div>

      {reschedule && (
        <RescheduleModal booking={reschedule} onClose={() => setReschedule(null)} />
      )}
    </div>
  )
}

function AppointmentRow({ b, onReschedule }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1.4fr_1.2fr_1fr_1fr_0.8fr_auto] lg:gap-4">
        <div>
          <button onClick={() => setOpen((v) => !v)} className="text-left">
            <p className="font-medium text-plum-900">{b.name}</p>
            <p className="text-xs text-ink/50">{b.id}</p>
          </button>
        </div>
        <div className="text-sm text-ink/70">{serviceName(b.service)}</div>
        <div className="text-sm text-ink/70">{stylistName(b.stylist)}</div>
        <div className="text-sm text-ink/70">
          {fmtDate(b.date)} · {b.time}
        </div>
        <div>
          <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold capitalize ${statusStyles[b.status]}`}>
            {b.status}
          </span>
        </div>
        <div className="flex items-center justify-end gap-1.5">
          {b.status === 'pending' && (
            <ActionBtn title="Approve" tone="emerald" onClick={() => updateBooking(b.id, { status: 'confirmed' })}>
              <Check size={15} />
            </ActionBtn>
          )}
          {(b.status === 'confirmed' || b.status === 'pending') && (
            <ActionBtn title="Mark completed" tone="plum" onClick={() => updateBooking(b.id, { status: 'completed' })}>
              <CheckCircle2 size={15} />
            </ActionBtn>
          )}
          <ActionBtn title="Reschedule" tone="neutral" onClick={onReschedule}>
            <CalendarClock size={15} />
          </ActionBtn>
          {b.status !== 'cancelled' ? (
            <ActionBtn title="Cancel" tone="red" onClick={() => updateBooking(b.id, { status: 'cancelled' })}>
              <X size={15} />
            </ActionBtn>
          ) : (
            <ActionBtn title="Delete" tone="red" onClick={() => removeBooking(b.id)}>
              <Trash2 size={15} />
            </ActionBtn>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-3 rounded-2xl bg-porcelain/60 p-4 text-sm sm:grid-cols-2">
              <span className="flex items-center gap-2 text-ink/65"><Phone size={14} className="text-lilac" /> {b.phone}</span>
              <span className="flex items-center gap-2 text-ink/65"><Mail size={14} className="text-lilac" /> {b.email}</span>
              <span className="flex items-center gap-2 text-ink/65"><CircleDollarSign size={14} className="text-lilac" /> {formatPrice(getService(b.service)?.price || 0)}</span>
              <span className="flex items-center gap-2 text-ink/65"><Clock size={14} className="text-lilac" /> {formatDuration(getService(b.service)?.duration || 0)}</span>
              {b.notes && (
                <span className="flex items-start gap-2 text-ink/65 sm:col-span-2">
                  <MessageSquare size={14} className="mt-0.5 text-lilac" /> {b.notes}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ActionBtn({ children, title, tone, onClick }) {
  const tones = {
    emerald: 'hover:bg-emerald-100 hover:text-emerald-600 text-emerald-500',
    plum: 'hover:bg-plum/10 hover:text-plum text-plum/70',
    red: 'hover:bg-red-100 hover:text-red-600 text-red-400',
    neutral: 'hover:bg-blush/50 hover:text-plum text-plum/60',
  }
  return (
    <button
      title={title}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-lg transition ${tones[tone]}`}
    >
      {children}
    </button>
  )
}

function RescheduleModal({ booking, onClose }) {
  const [date, setDate] = useState(booking.date)
  const [time, setTime] = useState(booking.time)
  const taken = date ? getTakenTimes(date, booking.stylist) : new Set()

  const save = () => {
    updateBooking(booking.id, { date, time })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-plum-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-4xl bg-white p-6 shadow-lift"
      >
        <h3 className="font-display text-2xl font-semibold text-plum-900">Reschedule</h3>
        <p className="mt-1 text-sm text-ink/55">{booking.name} · {booking.id}</p>
        <div className="mt-5">
          <Calendar selected={date} onSelect={(d) => { setDate(d); setTime('') }} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {ALL_TIMES.map((t) => {
            const disabled = taken.has(t) && t !== booking.time
            return (
              <button
                key={t}
                disabled={disabled}
                onClick={() => setTime(t)}
                className={`rounded-xl border py-2 text-xs font-medium transition ${
                  time === t
                    ? 'border-transparent bg-plum text-porcelain'
                    : disabled
                      ? 'cursor-not-allowed border-plum/8 text-plum/25 line-through'
                      : 'border-plum/15 text-plum hover:bg-blush/40'
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={save} disabled={!date || !time} className="btn-primary disabled:opacity-40">
            Save changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// --- Calendar view -------------------------------------------------------
function CalendarView() {
  const [selected, setSelected] = useState(isoDate(new Date()))
  const bookings = getBookings().filter((b) => b.status !== 'cancelled')
  const dayBookings = bookings
    .filter((b) => b.date === selected)
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <Calendar selected={selected} onSelect={setSelected} isUnavailable={() => false} />
        <p className="mt-3 px-2 text-xs text-ink/50">
          Select any day to see its schedule. Manage blocked days under Availability.
        </p>
      </div>
      <div className="rounded-4xl border border-plum/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-plum-900">
          {new Date(selected + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
        </h2>
        <p className="text-xs text-ink/50">{dayBookings.length} appointment(s)</p>
        <div className="mt-5 space-y-3">
          {dayBookings.length === 0 && (
            <p className="rounded-2xl bg-porcelain/60 py-12 text-center text-sm text-ink/45">
              No appointments this day.
            </p>
          )}
          {dayBookings.map((b) => (
            <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-plum/8 p-3.5">
              <div className="grid w-16 shrink-0 place-items-center rounded-xl bg-blush/50 py-2">
                <span className="font-display text-sm font-semibold text-plum">{b.time.split(' ')[0]}</span>
                <span className="text-[0.6rem] uppercase text-plum/55">{b.time.split(' ')[1]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-plum-900">{b.name}</p>
                <p className="truncate text-xs text-ink/55">{serviceName(b.service)} · {stylistName(b.stylist)}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold capitalize ${statusStyles[b.status]}`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Services admin ------------------------------------------------------
function ServicesAdmin() {
  const [list, setList] = useState(() => getManagedServices())
  const [editing, setEditing] = useState(null)

  const persist = (next) => { setList(next); saveManagedServices(next) }
  const save = (svc) => {
    const exists = list.some((s) => s.id === svc.id)
    persist(exists ? list.map((s) => (s.id === svc.id ? svc : s)) : [...list, svc])
    setEditing(null)
  }
  const remove = (id) => persist(list.filter((s) => s.id !== id))

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={() => setEditing({ id: 'svc-' + Date.now(), name: '', category: 'Cut & Style', price: 50, duration: 60, blurb: '' })}
          className="btn-primary"
        >
          <Plus size={16} /> Add service
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <div key={s.id} className="rounded-3xl border border-plum/10 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-plum/45">{s.category}</span>
                <h3 className="font-display text-xl font-semibold text-plum-900">{s.name}</h3>
              </div>
              <div className="flex gap-1">
                <ActionBtn title="Edit" tone="neutral" onClick={() => setEditing(s)}><Pencil size={14} /></ActionBtn>
                <ActionBtn title="Delete" tone="red" onClick={() => remove(s.id)}><Trash2 size={14} /></ActionBtn>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-ink/55">{s.blurb}</p>
            <div className="mt-4 flex items-center justify-between border-t border-plum/8 pt-3 text-sm">
              <span className="flex items-center gap-1.5 text-plum/70"><Clock size={13} className="text-lilac" /> {formatDuration(s.duration)}</span>
              <span className="font-semibold text-plum-900">{formatPrice(s.price)}</span>
            </div>
          </div>
        ))}
      </div>

      {editing && <ServiceEditor svc={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  )
}

function ServiceEditor({ svc, onSave, onClose }) {
  const [form, setForm] = useState(svc)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-plum-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-4xl bg-white p-6 shadow-lift"
      >
        <h3 className="font-display text-2xl font-semibold text-plum-900">
          {svc.name ? 'Edit service' : 'New service'}
        </h3>
        <div className="mt-5 space-y-3">
          <Field label="Name"><input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="Category">
            <select className="input" value={form.category} onChange={(e) => set('category', e.target.value)}>
              {['Cut & Style', 'Colour', 'Treatment', 'Transformation'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price ($)"><input type="number" className="input" value={form.price} onChange={(e) => set('price', +e.target.value)} /></Field>
            <Field label="Duration (min)"><input type="number" step="15" className="input" value={form.duration} onChange={(e) => set('duration', +e.target.value)} /></Field>
          </div>
          <Field label="Short description"><textarea rows={2} className="input" value={form.blurb} onChange={(e) => set('blurb', e.target.value)} /></Field>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={() => onSave(form)} disabled={!form.name} className="btn-primary disabled:opacity-40">Save</button>
        </div>
      </motion.div>
    </div>
  )
}

// --- Stylists admin ------------------------------------------------------
function StylistsAdmin() {
  const stylists = getManagedStylists()
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stylists.map((s) => (
        <div key={s.id} className="rounded-3xl border border-plum/10 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <img src={s.image} alt={s.name} className="h-16 w-16 rounded-2xl object-cover" />
            <div>
              <h3 className="font-display text-xl font-semibold text-plum-900">{s.name}</h3>
              <p className="text-xs text-ink/55">{s.title}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-plum">
                <Star size={12} className="fill-lilac text-lilac" /> {s.rating} · {s.experience} yrs
              </span>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-porcelain/60 p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-plum/45">Specialty</p>
            <p className="text-sm text-ink/70">{s.specialty}</p>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span
                key={i}
                className={`grid place-items-center rounded-lg py-1.5 text-[0.6rem] font-semibold ${
                  i < 6 ? 'bg-blush/50 text-plum' : 'bg-porcelain text-plum/25'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
          <p className="mt-2 text-center text-[0.65rem] text-ink/40">Working days</p>
        </div>
      ))}
    </div>
  )
}

// --- Availability --------------------------------------------------------
function Availability() {
  useStoreVersion()
  const blocked = getBlockedDates()
  const [selected, setSelected] = useState(null)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-4xl border border-plum/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-plum-900">Block dates</h2>
        <p className="mt-1 text-sm text-ink/55">
          Tap a day to block it for holidays or vacation. Blocked days can’t be booked online.
        </p>
        <div className="mt-5">
          <Calendar
            selected={selected}
            onSelect={(iso) => { toggleBlockedDate(iso); setSelected(iso) }}
            isUnavailable={() => false}
          />
        </div>
      </div>
      <div className="rounded-4xl border border-plum/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-plum-900">Blocked days</h2>
        <div className="mt-5 space-y-2">
          {blocked.length === 0 && (
            <p className="rounded-2xl bg-porcelain/60 py-12 text-center text-sm text-ink/45">
              No blocked days. Your full calendar is open for bookings.
            </p>
          )}
          {blocked.sort().map((iso) => (
            <div key={iso} className="flex items-center justify-between rounded-2xl border border-plum/8 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-ink/70">
                <CalendarOff size={15} className="text-lilac" />
                {new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
              <button
                onClick={() => toggleBlockedDate(iso)}
                className="text-xs font-semibold text-red-400 hover:text-red-600"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Settings (working hours) -------------------------------------------
function SettingsView() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-4xl border border-plum/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-plum-900">Working hours</h2>
        <p className="mt-1 text-sm text-ink/55">The hours shown to guests on the website.</p>
        <div className="mt-5 divide-y divide-plum/8">
          {studio.hours.map((h) => (
            <div key={h.day} className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-ink/75">{h.day}</span>
              <div className="flex items-center gap-2 text-sm">
                {h.close ? (
                  <>
                    <input defaultValue={h.open} className="w-20 rounded-xl border border-plum/15 bg-porcelain/60 px-3 py-1.5 text-center text-xs" />
                    <span className="text-plum/40">–</span>
                    <input defaultValue={h.close} className="w-20 rounded-xl border border-plum/15 bg-porcelain/60 px-3 py-1.5 text-center text-xs" />
                  </>
                ) : (
                  <span className="rounded-full bg-porcelain px-3 py-1 text-xs text-plum/45">Closed</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-5 w-full">Save hours</button>
      </div>

      <div className="space-y-6">
        <div className="rounded-4xl border border-plum/10 bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-plum-900">Studio profile</h2>
          <div className="mt-5 space-y-3">
            <Field label="Studio name"><input className="input" defaultValue={studio.name} /></Field>
            <Field label="Phone"><input className="input" defaultValue={studio.phone} /></Field>
            <Field label="Email"><input className="input" defaultValue={studio.email} /></Field>
            <Field label="Address"><input className="input" defaultValue={studio.address} /></Field>
          </div>
          <button className="btn-primary mt-5 w-full">Save profile</button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-plum/60">{label}</span>
      {children}
    </label>
  )
}
