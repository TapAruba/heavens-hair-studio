import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { isoDate } from '../lib/store'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function Calendar({ selected, onSelect, isUnavailable }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const canGoBack =
    view.getFullYear() > today.getFullYear() ||
    (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth())

  const shift = (dir) => setView(new Date(year, month + dir, 1))

  return (
    <div className="rounded-4xl border border-plum/10 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => canGoBack && shift(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className={`grid h-10 w-10 place-items-center rounded-full border transition ${
            canGoBack
              ? 'border-plum/15 text-plum hover:bg-blush/50'
              : 'cursor-not-allowed border-plum/5 text-plum/20'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <AnimatePresence mode="wait">
          <motion.h3
            key={`${month}-${year}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="font-display text-xl font-semibold text-plum-900"
          >
            {MONTHS[month]} {year}
          </motion.h3>
        </AnimatePresence>
        <button
          onClick={() => shift(1)}
          aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-full border border-plum/15 text-plum transition hover:bg-blush/50"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-plum/40">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((date, i) => {
          if (!date) return <span key={`e${i}`} />
          const iso = isoDate(date)
          const isToday = iso === isoDate(today)
          const isSelected = selected === iso
          const disabled = isUnavailable ? isUnavailable(date) : false

          return (
            <button
              key={iso}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`relative grid aspect-square place-items-center rounded-2xl text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? 'bg-plum-grad text-porcelain shadow-soft scale-[1.03]'
                    : disabled
                      ? 'cursor-not-allowed text-plum/20 line-through'
                      : 'text-ink/70 hover:bg-blush/60 hover:text-plum'
                }
                ${isToday && !isSelected ? 'ring-1 ring-lilac ring-offset-1 ring-offset-white' : ''}`}
            >
              {date.getDate()}
              {isToday && (
                <span
                  className={`absolute bottom-1.5 h-1 w-1 rounded-full ${
                    isSelected ? 'bg-porcelain' : 'bg-lilac'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-plum/8 pt-4 text-[0.7rem] text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-plum" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full ring-1 ring-lilac" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-plum/15" /> Unavailable
        </span>
      </div>
    </div>
  )
}
