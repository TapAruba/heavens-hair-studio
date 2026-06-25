import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check, ChevronLeft, ChevronRight, Clock, Scissors, User, CalendarDays,
  Sparkles, Phone, Mail, MessageSquare, PartyPopper, Download, Home, UserCheck,
} from 'lucide-react'
import Calendar from '../components/Calendar'
import { Stars } from '../components/ui'
import { services, getService, formatDuration, formatPrice } from '../data/services'
import { stylists, getStylist } from '../data/stylists'
import {
  ALL_TIMES, getTakenTimes, isDateUnavailable, addBooking, isoDate,
} from '../lib/store'

const STEPS = ['Service', 'Stylist', 'Date', 'Time', 'Details', 'Review', 'Done']
const ease = [0.16, 1, 0.3, 1]

const fmtDateLong = (iso) =>
  iso
    ? new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      })
    : ''

function Stepper({ step }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl items-center justify-between">
      {STEPS.slice(0, 6).map((label, i) => {
        const done = i < step
        const active = i === step
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-all duration-300 sm:h-9 sm:w-9 ${
                  done
                    ? 'bg-plum text-porcelain'
                    : active
                      ? 'bg-plum-grad text-porcelain ring-4 ring-lilac/25'
                      : 'border border-plum/15 bg-white text-plum/40'
                }`}
              >
                {done ? <Check size={15} /> : i + 1}
              </div>
              <span
                className={`mt-2 hidden text-[0.65rem] font-medium uppercase tracking-wide sm:block ${
                  active ? 'text-plum' : 'text-plum/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < 5 && (
              <div className="mx-1 h-px flex-1 bg-plum/10 sm:mx-2">
                <div
                  className="h-px bg-plum transition-all duration-500"
                  style={{ width: done ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FloatingInput({ id, label, type = 'text', value, onChange, error, icon: Icon, ...rest }) {
  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-plum/35"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full rounded-2xl border bg-porcelain/60 px-4 ${
            Icon ? 'pl-11' : ''
          } pb-2.5 pt-6 text-sm text-ink outline-none transition-all
          focus:border-lilac focus:bg-white focus:ring-4 focus:ring-lilac/15
          ${error ? 'border-red-300' : 'border-plum/15'}`}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute ${
            Icon ? 'left-11' : 'left-4'
          } top-4 text-sm text-plum/45 transition-all duration-200
          peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-plum
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.65rem]`}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1.5 pl-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function Booking() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    service: params.get('service') || '',
    stylist: params.get('stylist') || '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Honour deep links (?service= / ?stylist=) by advancing past chosen steps.
  useEffect(() => {
    if (params.get('service') && params.get('stylist')) setStep(2)
    else if (params.get('service')) setStep(1)
    else if (params.get('stylist')) setStep(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (patch) => setData((d) => ({ ...d, ...patch }))
  const service = getService(data.service)
  const stylist = data.stylist === 'any' ? null : getStylist(data.stylist)

  const taken = useMemo(
    () => (data.date ? getTakenTimes(data.date, data.stylist || 'any') : new Set()),
    [data.date, data.stylist],
  )

  const next = () => setStep((s) => Math.min(s + 1, 6))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const canContinue =
    (step === 0 && data.service) ||
    (step === 1 && data.stylist) ||
    (step === 2 && data.date) ||
    (step === 3 && data.time) ||
    step >= 4

  const validateDetails = () => {
    const e = {}
    if (!data.name.trim()) e.name = 'Please enter your name'
    if (!data.phone.trim()) e.phone = 'Please enter a phone number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleDetailsNext = () => {
    if (validateDetails()) next()
  }

  const confirm = () => {
    setSubmitting(true)
    setTimeout(() => {
      const booking = addBooking({
        service: data.service,
        stylist: data.stylist === 'any' ? 'any' : data.stylist,
        date: data.date,
        time: data.time,
        name: data.name,
        phone: data.phone,
        email: data.email,
        notes: data.notes,
      })
      setConfirmation(booking.id)
      setSubmitting(false)
      setStep(6)
    }, 900)
  }

  const downloadIcs = () => {
    const dt = new Date(`${data.date}T${to24(data.time)}:00`)
    const end = new Date(dt.getTime() + (service?.duration || 60) * 60000)
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `UID:${confirmation}@heavenshair`,
      `DTSTART:${fmt(dt)}`, `DTEND:${fmt(end)}`,
      `SUMMARY:Heaven's Hair Studio — ${service?.name}`,
      `DESCRIPTION:Appointment with ${stylist ? stylist.name : 'any available stylist'}. Confirmation ${confirmation}.`,
      'LOCATION:Seroe Blanco 16K, Oranjestad, Aruba',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `heavens-appointment-${confirmation}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-blush-grad pt-[72px]">
      <div className="container-luxe py-12 lg:py-16">
        {step < 6 && (
          <div className="mb-8 text-center">
            <span className="eyebrow justify-center">
              <Sparkles size={13} className="text-lilac" /> Book your appointment
            </span>
            <h1 className="display-title mt-3 text-[2rem] text-plum-900 sm:text-4xl lg:text-5xl">
              {STEP_TITLES[step]}
            </h1>
          </div>
        )}

        {step < 6 && <Stepper step={step} />}

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* STEP 1 — SERVICE */}
              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <SelectableCard
                      key={s.id}
                      selected={data.service === s.id}
                      onClick={() => set({ service: s.id })}
                    >
                      <div className="relative h-32 overflow-hidden rounded-2xl">
                        <img src={s.image} alt={s.name} className="h-full w-full object-cover" loading="lazy" />
                        <span className="absolute right-2 top-2 rounded-full bg-white/85 px-2.5 py-0.5 text-xs font-semibold text-plum backdrop-blur">
                          {formatPrice(s.price)}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-plum-900">{s.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-ink/55">{s.blurb}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-plum/70">
                        <Clock size={13} className="text-lilac" /> {formatDuration(s.duration)}
                      </span>
                    </SelectableCard>
                  ))}
                </div>
              )}

              {/* STEP 2 — STYLIST */}
              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <SelectableCard
                    selected={data.stylist === 'any'}
                    onClick={() => set({ stylist: 'any' })}
                  >
                    <div className="grid h-32 place-items-center rounded-2xl bg-plum-grad text-porcelain">
                      <UserCheck size={40} strokeWidth={1.4} />
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-plum-900">No Preference</h3>
                    <p className="mt-1 text-xs text-ink/55">
                      We’ll pair you with the best available stylist for your service.
                    </p>
                  </SelectableCard>

                  {stylists.map((s) => (
                    <SelectableCard
                      key={s.id}
                      selected={data.stylist === s.id}
                      onClick={() => set({ stylist: s.id })}
                    >
                      <div className="relative grid h-32 place-items-center overflow-hidden rounded-2xl bg-blush/50">
                        <span className="font-display text-5xl font-semibold text-plum">{s.name[0]}</span>
                        <span className="absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                          Available
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <h3 className="font-display text-xl font-semibold text-plum-900">{s.name}</h3>
                        <Stars value={s.rating} />
                      </div>
                      <p className="mt-1 text-xs text-ink/55">{s.specialty}</p>
                    </SelectableCard>
                  ))}
                </div>
              )}

              {/* STEP 3 — DATE */}
              {step === 2 && (
                <div className="mx-auto max-w-md">
                  <Calendar
                    selected={data.date}
                    onSelect={(iso) => set({ date: iso, time: '' })}
                    isUnavailable={isDateUnavailable}
                  />
                </div>
              )}

              {/* STEP 4 — TIME */}
              {step === 3 && (
                <div className="mx-auto max-w-2xl rounded-4xl border border-plum/10 bg-white p-6 shadow-soft sm:p-8">
                  <p className="mb-6 text-center text-sm text-ink/60">
                    Available times for{' '}
                    <span className="font-semibold text-plum">{fmtDateLong(data.date)}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {ALL_TIMES.map((t) => {
                      const isTaken = taken.has(t)
                      const isSel = data.time === t
                      return (
                        <button
                          key={t}
                          disabled={isTaken}
                          onClick={() => set({ time: t })}
                          className={`rounded-2xl border py-3 text-sm font-medium transition-all duration-200 ${
                            isSel
                              ? 'scale-105 border-transparent bg-plum-grad text-porcelain shadow-soft'
                              : isTaken
                                ? 'cursor-not-allowed border-plum/8 bg-porcelain/50 text-plum/25 line-through'
                                : 'border-plum/15 text-plum hover:border-lilac hover:bg-blush/40'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-6 text-center text-xs text-ink/45">
                    Greyed-out times are already booked. Times shown in salon hours.
                  </p>
                </div>
              )}

              {/* STEP 5 — DETAILS */}
              {step === 4 && (
                <div className="mx-auto max-w-xl rounded-4xl border border-plum/10 bg-white p-6 shadow-soft sm:p-9">
                  <div className="grid gap-4">
                    <FloatingInput
                      id="name" label="Full Name" icon={User}
                      value={data.name} onChange={(e) => set({ name: e.target.value })}
                      error={errors.name}
                    />
                    <FloatingInput
                      id="phone" label="Phone Number" type="tel" icon={Phone}
                      value={data.phone} onChange={(e) => set({ phone: e.target.value })}
                      error={errors.phone}
                    />
                    <FloatingInput
                      id="email" label="Email Address" type="email" icon={Mail}
                      value={data.email} onChange={(e) => set({ email: e.target.value })}
                      error={errors.email}
                    />
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-4 top-4 text-plum/35" />
                      <textarea
                        id="notes" rows={3} placeholder=" "
                        value={data.notes} onChange={(e) => set({ notes: e.target.value })}
                        className="peer w-full rounded-2xl border border-plum/15 bg-porcelain/60 px-4 pb-2.5 pl-11 pt-6 text-sm text-ink outline-none transition-all focus:border-lilac focus:bg-white focus:ring-4 focus:ring-lilac/15"
                      />
                      <label
                        htmlFor="notes"
                        className="pointer-events-none absolute left-11 top-4 text-sm text-plum/45 transition-all duration-200 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-plum peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
                      >
                        Notes for your stylist (optional)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6 — REVIEW */}
              {step === 5 && (
                <div className="mx-auto max-w-2xl">
                  <div className="overflow-hidden rounded-4xl border border-plum/10 bg-white shadow-card">
                    <div className="bg-plum-grad p-6 text-porcelain">
                      <p className="text-[0.7rem] uppercase tracking-luxe text-porcelain/60">
                        Appointment Summary
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">{service?.name}</h3>
                    </div>
                    <dl className="divide-y divide-plum/8 px-6">
                      <Row icon={Scissors} label="Service" value={service?.name} />
                      <Row
                        icon={User}
                        label="Stylist"
                        value={stylist ? stylist.name : 'No preference'}
                      />
                      <Row icon={CalendarDays} label="Date" value={fmtDateLong(data.date)} />
                      <Row icon={Clock} label="Time" value={data.time} />
                      <Row icon={Clock} label="Duration" value={formatDuration(service?.duration || 0)} />
                      <Row icon={User} label="Name" value={data.name} />
                      <Row icon={Phone} label="Phone" value={data.phone} />
                      <Row icon={Mail} label="Email" value={data.email} />
                      {data.notes && <Row icon={MessageSquare} label="Notes" value={data.notes} />}
                    </dl>
                    <div className="flex items-center justify-between bg-blush/40 px-6 py-5">
                      <span className="text-sm font-medium text-plum/70">Estimated total</span>
                      <span className="font-display text-3xl font-semibold text-plum-900">
                        {formatPrice(service?.price || 0)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-xs text-ink/50">
                    Final pricing is confirmed at your consultation. You can reschedule with 24 hours’ notice.
                  </p>
                </div>
              )}

              {/* STEP 7 — SUCCESS */}
              {step === 6 && (
                <SuccessView
                  confirmation={confirmation}
                  service={service}
                  stylist={stylist}
                  data={data}
                  onDownload={downloadIcs}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 6 && (
            <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between">
              {step > 0 ? (
                <button onClick={back} className="btn-ghost">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : (
                <Link to="/" className="btn-ghost">
                  <ChevronLeft size={16} /> Cancel
                </Link>
              )}

              {step < 5 ? (
                <button
                  onClick={step === 4 ? handleDetailsNext : next}
                  disabled={!canContinue}
                  className={`btn-primary ${!canContinue ? 'pointer-events-none opacity-40' : ''}`}
                >
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={confirm}
                  disabled={submitting}
                  className="btn-primary min-w-[200px]"
                >
                  {submitting ? 'Confirming…' : 'Confirm Appointment'}
                  {!submitting && <Check size={16} />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const STEP_TITLES = [
  'Choose your service',
  'Choose your stylist',
  'Pick a date',
  'Select a time',
  'Your details',
  'Review & confirm',
]

function SelectableCard({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-4xl border bg-white p-4 text-left transition-all duration-300 ${
        selected
          ? 'border-transparent shadow-glow ring-2 ring-plum'
          : 'border-plum/10 shadow-soft hover:-translate-y-1 hover:shadow-card'
      }`}
    >
      {selected && (
        <span className="absolute -right-2 -top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-plum text-porcelain shadow-soft">
          <Check size={15} />
        </span>
      )}
      {children}
    </button>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span className="flex items-center gap-2.5 text-sm text-ink/55">
        <Icon size={15} className="text-lilac" /> {label}
      </span>
      <span className="text-right text-sm font-medium text-plum-900">{value}</span>
    </div>
  )
}

function to24(t) {
  const [time, mer] = t.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (mer === 'PM' && h !== 12) h += 12
  if (mer === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function SuccessView({ confirmation, service, stylist, data, onDownload }) {
  const fmtDateLong = (iso) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    })
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mx-auto max-w-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-plum-grad text-porcelain shadow-lift"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 260 }}
        >
          <Check size={44} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <div className="mt-6 inline-flex items-center gap-2 text-plum">
        <PartyPopper size={18} className="text-lilac" />
        <span className="text-sm font-semibold uppercase tracking-luxe">You’re booked</span>
      </div>
      <h1 className="display-title mt-3 text-4xl text-plum-900 sm:text-5xl">
        See you soon{data.name ? `, ${data.name.split(' ')[0]}` : ''}.
      </h1>
      <p className="mt-4 text-ink/60">
        A confirmation has been sent to{' '}
        <span className="font-medium text-plum">{data.email}</span>. We can’t wait to look after you.
      </p>

      <div className="mt-8 rounded-4xl border border-plum/10 bg-white p-6 text-left shadow-card">
        <div className="flex items-center justify-between border-b border-plum/8 pb-4">
          <span className="text-xs uppercase tracking-wide text-ink/50">Confirmation</span>
          <span className="font-display text-xl font-semibold text-plum">{confirmation}</span>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink/55">Service</dt>
            <dd className="font-medium text-plum-900">{service?.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/55">Stylist</dt>
            <dd className="font-medium text-plum-900">{stylist ? stylist.name : 'No preference'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/55">When</dt>
            <dd className="font-medium text-plum-900">
              {fmtDateLong(data.date)} · {data.time}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={onDownload} className="btn-secondary">
          <Download size={15} /> Add to Calendar
        </button>
        <Link to="/" className="btn-primary">
          <Home size={15} /> Return Home
        </Link>
      </div>
    </motion.div>
  )
}
