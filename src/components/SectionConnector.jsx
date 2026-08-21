import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

/* ─── Decorative side rail with a light-mote that drifts toward the node ─── */
function ConnectorRail({ side, hovered, reduce }) {
  const left = side === 'left'
  return (
    <div className="relative h-px flex-1 overflow-hidden" style={{ maxWidth: 240 }}>
      {/* Base hairline — fades away from the node */}
      <div
        className="absolute inset-0"
        style={{
          background: left
            ? 'linear-gradient(90deg, transparent, var(--border) 55%, var(--border))'
            : 'linear-gradient(90deg, var(--border), var(--border) 45%, transparent)',
        }}
      />
      {/* Terminator dot where the rail meets the node */}
      <span
        className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
        style={{
          [left ? 'right' : 'left']: 0,
          background: hovered ? 'var(--accent)' : 'var(--border)',
          boxShadow: hovered ? '0 0 8px color-mix(in srgb, var(--accent) 55%, transparent)' : 'none',
          transition: 'background .25s ease, box-shadow .25s ease',
        }}
      />
      {/* Light-mote drifting toward the center node */}
      {!reduce && (
        <motion.span
          className="absolute top-0 h-px w-12"
          style={{
            background: left
              ? 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 70%, transparent))'
              : 'linear-gradient(90deg, color-mix(in srgb, var(--accent) 70%, transparent), transparent)',
          }}
          animate={{ left: left ? ['-25%', '105%'] : ['105%', '-25%'] }}
          transition={{
            duration: hovered ? 1.1 : 2.9,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: hovered ? 0.15 : 1.2,
          }}
        />
      )}
    </div>
  )
}

export default function SectionConnector({ to, label, index }) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()
  const num = String(index ?? 0).padStart(2, '0')

  const jump = () => {
    if (to) document.getElementById(to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="relative flex h-24 w-full items-center justify-center gap-3 sm:h-28 sm:gap-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ConnectorRail side="left" hovered={hovered} reduce={reduce} />

      {/* ── Center chapter-break chip ── */}
      <motion.button
        onClick={jump}
        disabled={!to}
        whileTap={to ? { scale: 0.96 } : undefined}
        aria-label={to ? `Go to ${label} section` : label}
        className="connector-chip group relative z-10 flex shrink-0 items-center gap-2.5 rounded-full px-3 py-1.5 focus:outline-none sm:px-3.5"
      >
        {/* Index badge */}
        <span
          className="flex h-5 min-w-[1.35rem] items-center justify-center rounded-md px-1 text-[10px] font-bold tabular-nums"
          style={{
            background: hovered ? 'var(--accent)' : 'color-mix(in srgb, var(--text) 6%, transparent)',
            color: hovered ? 'var(--accent-contrast)' : 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",
            transition: 'background .25s ease, color .25s ease',
          }}
        >
          {num}
        </span>

        {/* Label */}
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{
            color: hovered ? 'var(--text)' : 'var(--text-muted)',
            fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
            transition: 'color .25s ease',
          }}
        >
          {label}
        </span>

        {/* Chevron — gently bobs, guiding the eye downward */}
        <motion.span
          className="flex items-center justify-center"
          style={{ color: hovered ? 'var(--accent)' : 'var(--text-muted)', transition: 'color .25s ease' }}
          animate={reduce ? {} : { y: [0, hovered ? 3 : 2, 0] }}
          transition={{ duration: hovered ? 0.9 : 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiChevronDown size={13} strokeWidth={2.4} />
        </motion.span>
      </motion.button>

      <ConnectorRail side="right" hovered={hovered} reduce={reduce} />
    </div>
  )
}
