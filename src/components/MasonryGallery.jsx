import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Lightbox from './Lightbox'

const spanClass = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function MasonryGallery({ items }) {
  const [index, setIndex] = useState(null)

  return (
    <>
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-3xl shadow-soft ${
              spanClass[item.span] || ''
            }`}
          >
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/0 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
              <span className="font-display text-lg font-medium text-porcelain">
                {item.caption}
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-plum">
                <Plus size={16} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  )
}
