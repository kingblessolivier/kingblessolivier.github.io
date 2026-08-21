import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactInfo } from '../assets/data'

const waNumber = contactInfo.whatsapp?.replace(/\D/g, '') ?? ''
const waLink   = `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi Olivier, I saw your portfolio and would love to connect!")}`

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false)

  if (!waNumber) return null

  return (
    <>
      <div
        className="fixed bottom-20 right-5 z-[105] flex flex-col items-end gap-2.5"
      >
        {/* Tooltip — desktop hover only, hidden while dragging */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={{ opacity: 0, x: 10,  scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none relative mr-1 flex flex-col rounded-2xl px-3.5 py-2.5"
              style={{
                background: 'color-mix(in srgb, var(--card) 88%, transparent)',
                border: '1px solid color-mix(in srgb, #25D366 22%, var(--border))',
                boxShadow: '0 16px 40px -14px rgba(0,0,20,0.5)',
                backdropFilter: 'blur(16px)',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="text-xs font-bold text-[var(--text)]">Chat on WhatsApp</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#25D366', boxShadow: '0 0 6px #25D366' }} />
                Replies within a day · {contactInfo.whatsapp}
              </span>
              {/* pointer */}
              <span
                className="absolute -bottom-1 right-7 h-2.5 w-2.5 rotate-45"
                style={{
                  background: 'color-mix(in srgb, var(--card) 88%, transparent)',
                  borderRight: '1px solid color-mix(in srgb, #25D366 22%, var(--border))',
                  borderBottom: '1px solid color-mix(in srgb, #25D366 22%, var(--border))',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact on WhatsApp"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.4, type: 'spring', stiffness: 280 }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full"
          style={{
            background: 'linear-gradient(140deg, #2AF272 0%, #25D366 45%, #0F9D74 100%)',
            boxShadow: '0 10px 28px -6px rgba(37,211,102,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,40,20,0.25)',
          }}
        >
          {/* Pulse rings */}
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'rgba(37,211,102,0.4)' }}
          />
          {/* Glossy highlight */}
          <span
            className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-full opacity-50"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)' }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24" className="relative z-10 drop-shadow-sm">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      </div>
    </>
  )
}
