import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiWind, FiDroplet } from 'react-icons/fi'

const TZ  = 'Africa/Kigali'
const LAT = -1.9441
const LON = 30.0619
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m&timezone=Africa%2FNairobi&forecast_days=1`

function getNow() {
  const d = new Date()
  const locale = d.toLocaleString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const [hh, mm, ss] = locale.split(':').map(Number)
  return { hh, mm, ss }
}

function getDate() {
  return new Date().toLocaleDateString('en-GB', {
    timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric',
  })
}

function interpretWeather(code) {
  if (code === 0)                return { label: 'Clear',       icon: '☀️' }
  if (code === 1)                return { label: 'Mostly clear', icon: '🌤️' }
  if (code === 2)                return { label: 'Partly cloudy', icon: '⛅' }
  if (code === 3)                return { label: 'Overcast',    icon: '☁️' }
  if ([45,48].includes(code))   return { label: 'Foggy',        icon: '🌫️' }
  if ([51,53,55].includes(code)) return { label: 'Drizzle',     icon: '🌦️' }
  if ([61,63,65].includes(code)) return { label: 'Rain',        icon: '🌧️' }
  if ([71,73,75].includes(code)) return { label: 'Snow',        icon: '❄️' }
  if ([80,81,82].includes(code)) return { label: 'Showers',     icon: '🌦️' }
  if ([95,96,99].includes(code)) return { label: 'Storm',       icon: '⛈️' }
  return { label: 'Variable', icon: '🌡️' }
}

/* ── Analog clock face ── */
function AnalogClock({ hh, mm, ss, size = 48 }) {
  const cx = size / 2
  const r  = size / 2 - 3

  const secDeg  = ss * 6
  const minDeg  = mm * 6  + ss * 0.1
  const hourDeg = (hh % 12) * 30 + mm * 0.5

  const hand = (deg, len, width, color) => {
    const rad = ((deg - 90) * Math.PI) / 180
    return (
      <line
        x1={cx} y1={cx}
        x2={cx + len * Math.cos(rad)}
        y2={cx + len * Math.sin(rad)}
        stroke={color} strokeWidth={width} strokeLinecap="round"
      />
    )
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a  = (i * 30 - 90) * (Math.PI / 180)
        const r1 = r - 2
        const r2 = r - (i % 3 === 0 ? 6 : 4)
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cx + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cx + r2 * Math.sin(a)}
            stroke={i % 3 === 0 ? 'var(--accent)' : 'var(--border)'}
            strokeWidth={i % 3 === 0 ? 1.5 : 1} strokeLinecap="round"
          />
        )
      })}
      {hand(hourDeg, r * 0.52, 2,   'var(--text)')}
      {hand(minDeg,  r * 0.72, 1.5, 'var(--text-muted)')}
      {hand(secDeg,  r * 0.8,  1,   'var(--accent)')}
      <circle cx={cx} cy={cx} r="2.5" fill="var(--accent)" />
      <circle cx={cx} cy={cx} r="1"   fill="var(--bg)" />
    </svg>
  )
}

/* ── Combined clock + weather card ── */
export default function LiveClock() {
  const [{ hh, mm, ss }, setNow] = useState(getNow)
  const [date, setDate]          = useState(getDate)
  const [weather, setWeather]    = useState(null)

  useEffect(() => {
    const id = setInterval(() => { setNow(getNow()); setDate(getDate()) }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch(WEATHER_URL)
      .then(r => r.json())
      .then(json => {
        if (cancelled) return
        const c = json.current
        setWeather({
          temp:     Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          wind:     Math.round(c.windspeed_10m),
          ...interpretWeather(c.weathercode),
        })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.72 }}
      className="card-surface inline-flex items-center gap-0 overflow-hidden rounded-2xl border border-[var(--border)] backdrop-blur-md"
      style={{ boxShadow: '0 16px 40px -14px color-mix(in srgb, var(--accent) 20%, rgba(0,0,0,0.18))' }}
    >
      {/* ── Clock side ── */}
      <div className="flex items-center gap-2.5 px-4 py-3">
        <AnalogClock hh={hh} mm={mm} ss={ss} size={44} />
        <div className="flex flex-col gap-0.5">
          <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Kigali · UTC+2</p>
          <p className="font-mono text-sm font-bold leading-none text-[var(--text)]">
            {pad(hh)}<span className="text-[var(--accent)]">:</span>{pad(mm)}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">{date}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-[var(--border)]" />

      {/* ── Weather side ── */}
      <div className="flex items-center gap-2 px-4 py-3">
        {weather ? (
          <>
            <span className="text-2xl leading-none">{weather.icon}</span>
            <div className="flex flex-col gap-0.5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{weather.label}</p>
              <p className="font-mono text-sm font-bold leading-none text-[var(--text)]">
                {weather.temp}°<span className="text-[11px] font-normal text-[var(--text-muted)]">C</span>
              </p>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 text-[9px] text-[var(--text-muted)]">
                  <FiWind size={8} className="text-[var(--accent)]" />{weather.wind}km/h
                </span>
                <span className="flex items-center gap-0.5 text-[9px] text-[var(--text-muted)]">
                  <FiDroplet size={8} className="text-[var(--accent-purple)]" />{weather.humidity}%
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-1.5">
            <div className="h-1.5 w-14 animate-pulse rounded-full bg-[var(--border)]" />
            <div className="h-3 w-8 animate-pulse rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-16 animate-pulse rounded-full bg-[var(--border)]" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
