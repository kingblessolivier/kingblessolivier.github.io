import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

/* Inline emoji flags — no external CDN, no failure mode */
const LANGUAGES = [
  { code: 'EN',   native: 'English',      country: 'United States', flagAlt: 'US flag',      emoji: '🇺🇸' },
  { code: 'KINY', native: 'Ikinyarwanda', country: 'Rwanda',        flagAlt: 'Rwanda flag',  emoji: '🇷🇼' },
  { code: 'FR',   native: 'Français',     country: 'France',        flagAlt: 'France flag',  emoji: '🇫🇷' },
]

function Flag({ alt, emoji }) {
  return (
    <span
      className="flex h-[14px] w-[20px] shrink-0 items-center justify-center"
      aria-label={alt}
      role="img"
    >
      <span className="text-[15px] leading-none">{emoji}</span>
    </span>
  )
}

export default function LanguageSwitcher({ language, setLanguage, upward = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0]

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const select = (code) => {
    setLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">

      {/* ── Trigger ── */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileTap={{ scale: 0.95 }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all"
        style={{
          background: open
            ? 'color-mix(in srgb, var(--accent) 8%, var(--surface))'
            : 'color-mix(in srgb, var(--surface) 70%, transparent)',
          borderColor: open
            ? 'color-mix(in srgb, var(--accent) 30%, var(--border))'
            : 'var(--border)',
          boxShadow: open
            ? '0 0 12px -4px color-mix(in srgb,var(--accent) 20%,transparent)'
            : 'none',
        }}
      >
        <Flag alt={current.flagAlt} emoji={current.emoji} />
        <span
          className="text-[11px] font-bold tracking-wide"
          style={{ color: 'var(--text)' }}
        >
          {current.code}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
          style={{ color: 'var(--text-muted)' }}
        >
          <FiChevronDown size={11} />
        </motion.span>
      </motion.button>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: upward ? -8 : 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,               scale: 1 }}
            exit={{ opacity: 0,   y: upward ? -6 : 6,  scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute right-0 z-[300] w-48 overflow-hidden rounded-2xl py-1.5 ${
              upward ? 'bottom-full mb-3' : 'top-full mt-3'
            }`}
            style={{
              background: 'var(--card)',
              border: '1px solid color-mix(in srgb,var(--accent) 14%,var(--border))',
              boxShadow: '0 20px 48px -12px rgba(0,0,20,0.4), 0 0 0 1px color-mix(in srgb,var(--accent) 5%,transparent)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 55%,transparent),transparent)' }}
            />

            <div className="px-2 pb-1 pt-2">
              <p className="px-2 text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
                Language
              </p>
            </div>

            {LANGUAGES.map((lang, i) => {
              const active = lang.code === language
              return (
                <motion.li
                  key={lang.code}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.14, delay: i * 0.04 }}
                  className="px-2"
                >
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => select(lang.code)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-all"
                    style={{
                      background: active
                        ? 'color-mix(in srgb,var(--accent) 10%,var(--surface))'
                        : 'transparent',
                      border: active
                        ? '1px solid color-mix(in srgb,var(--accent) 20%,var(--border))'
                        : '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'color-mix(in srgb,var(--surface) 90%,transparent)'
                        e.currentTarget.style.borderColor = 'var(--border)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'transparent'
                      }
                    }}
                  >
                    {/* Flag image */}
                    <div className="shrink-0">
                      <Flag alt={lang.flagAlt} emoji={lang.emoji} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold truncate"
                        style={{ color: active ? 'var(--accent)' : 'var(--text)' }}
                      >
                        {lang.native}
                      </p>
                      <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                        {lang.country}
                      </p>
                    </div>

                    {/* Active check */}
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: 'var(--accent)',
                          color: 'var(--accent-contrast)',
                        }}
                      >
                        <FiCheck size={9} strokeWidth={3} />
                      </motion.span>
                    )}
                  </button>
                </motion.li>
              )
            })}

            <div className="mt-1 border-t px-4 pb-2 pt-2" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                Portfolio supports 3 languages
              </p>
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
