import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && index >= 0
  const item = open ? items[index] : null

  const next = useCallback(
    (e) => {
      e?.stopPropagation()
      onIndex((index + 1) % items.length)
    },
    [index, items.length, onIndex],
  )
  const prev = useCallback(
    (e) => {
      e?.stopPropagation()
      onIndex((index - 1 + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, next, prev, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center bg-plum-900/80 p-4 backdrop-blur-md"
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-porcelain transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-porcelain transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-porcelain transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <motion.figure
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-3xl overflow-hidden rounded-3xl shadow-lift"
          >
            <img
              src={item.src}
              alt={item.caption || ''}
              className="max-h-[78vh] w-full object-contain"
            />
            {item.caption && (
              <figcaption className="bg-white px-5 py-3 text-center font-display text-lg text-plum-900">
                {item.caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
