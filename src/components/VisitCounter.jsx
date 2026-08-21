import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'
import { FiEye } from 'react-icons/fi'

/* ──────────────────────────────────────────────────────────────
   Global visit counter.
   Backed by our own serverless function (/.netlify/functions/counter,
   stored in Netlify Blobs) so the number is shared across all visitors
   — no third-party service. Each browser increments at most once per
   day; refreshes only read the value. If the endpoint is unavailable
   (e.g. local dev), it falls back to a per-browser localStorage count
   so the UI never breaks.
   ────────────────────────────────────────────────────────────── */
const COUNTER_URL = '/.netlify/functions/counter'

const LAST_HIT_KEY = 'portfolio_visit_last_hit'   // YYYY-MM-DD of last increment
const LOCAL_KEY    = 'portfolio_visit_local'      // cached/fallback total

const today = () => new Date().toISOString().slice(0, 10)

export default function VisitCounter({ label }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    let controls
    let cancelled = false

    const runTo = (value) => {
      if (cancelled || typeof value !== 'number' || value <= 0) return
      controls = animate(0, value, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setCount(Math.floor(v)),
      })
    }

    async function load() {
      const firstVisitToday = localStorage.getItem(LAST_HIT_KEY) !== today()
      try {
        const res = await fetch(COUNTER_URL, {
          method: firstVisitToday ? 'POST' : 'GET',
          cache: 'no-store',
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        const value = data?.count
        if (typeof value !== 'number') throw new Error('no value')
        if (firstVisitToday) localStorage.setItem(LAST_HIT_KEY, today())
        localStorage.setItem(LOCAL_KEY, String(value))
        runTo(value)
      } catch {
        /* Offline / blocked — fall back to a local count that still
           increments once per day so the widget stays meaningful. */
        let local = Number(localStorage.getItem(LOCAL_KEY) || '0')
        if (firstVisitToday) {
          local += 1
          localStorage.setItem(LOCAL_KEY, String(local))
          localStorage.setItem(LAST_HIT_KEY, today())
        }
        runTo(local || 1)
      }
    }

    load()
    return () => { cancelled = true; controls?.stop() }
  }, [])

  return (
    <div className="card-surface mt-10 inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm">
      <FiEye className="mr-2 text-[var(--text-muted)]" />
      <span className="text-[var(--text-muted)]">{label}: </span>
      <span className="ml-2 font-bold text-[var(--accent)] tabular-nums">
        {count === null ? '···' : count.toLocaleString()}
      </span>
    </div>
  )
}
