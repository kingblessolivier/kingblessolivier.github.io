import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMapPin, FiDownload } from 'react-icons/fi'
import { portfolioData } from '../assets/data'
import MagneticButton from '../components/MagneticButton'
import TerminalWidget from '../components/TerminalWidget'
import TechMarquee from '../components/TechMarquee'
import LiveClock from '../components/LiveClock'

/* ── Count-up hook ──────────────────────────────────── */
function useCountUp(target, duration = 1100, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

/* ── Inline stat item (no card box) ────────────────── */
function StatItem({ target, label, suffix = '+', delay = 0 }) {
  const [started, setStarted] = useState(false)
  const count = useCountUp(target, 1000, started)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onAnimationComplete={() => setStarted(true)}
      className="flex flex-col gap-1"
    >
      <span
        className="text-xl font-black tracking-tight text-[var(--text)] sm:text-3xl"
        style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif", letterSpacing: '-0.03em' }}
      >
        {count}<span className="text-base text-[var(--text-muted)]">{suffix}</span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {label}
      </span>
    </motion.div>
  )
}

/* ── Main component ─────────────────────────────────── */
export default function HeroSection({ labels }) {
  const heroPhoto = '/olivier_hero.webp'
  const [typedRole, setTypedRole] = useState('')

  useEffect(() => {
    const phases = labels.roleLines
    let timeoutId, phaseIdx = 0, cursor = 0, mode = 'type'
    const tick = () => {
      const phase = phases[phaseIdx]
      if (mode === 'type') {
        setTypedRole(phase.slice(0, ++cursor))
        if (cursor >= phase.length) {
          mode = 'pause'
          timeoutId = setTimeout(() => { mode = 'delete'; tick() }, 1800)
          return
        }
        timeoutId = setTimeout(tick, 80)
      } else if (mode === 'delete') {
        setTypedRole(phase.slice(0, --cursor))
        if (cursor <= 0) {
          phaseIdx = (phaseIdx + 1) % phases.length
          mode = 'type'
          timeoutId = setTimeout(tick, 500)
          return
        }
        timeoutId = setTimeout(tick, 42)
      }
    }
    setTypedRole('')
    timeoutId = setTimeout(tick, 400)
    return () => clearTimeout(timeoutId)
  }, [labels.roleLines])

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="hero-noir relative flex min-h-screen items-center overflow-hidden pt-14">

      {/* ── Brand backdrop ──
           The artwork is built on a near-black field, so it only belongs on the
           dark theme; on light it would fight the ground rather than sit under
           it. CSS hides it outside .dark, and the two widths keep the mobile
           payload at 16 kB. */}
      <picture className="hero-backdrop pointer-events-none absolute inset-0" aria-hidden="true">
        <source media="(max-width: 800px)" srcSet="/hero-bg-768.webp" />
        <img src="/hero-bg-1536.webp" alt="" width="1536" height="1024" loading="eager" decoding="async" />
      </picture>

      {/* ── Subtle dot grid ── */}
      <div className="hero-dot-grid pointer-events-none absolute inset-0" />
      {/* ── Bottom fade into next section ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />

      {/* ══ CONTENT ══ */}
      <div className="container-shell relative z-10 grid w-full items-center gap-10 pt-6 pb-14 sm:pt-8 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:pt-12 lg:pb-20">

        {/* ─── LEFT COLUMN ─── */}
        <div className="flex flex-col">

          {/* Greeting pill + location */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span className="section-tag">Hello, I'm</span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <FiMapPin size={11} className="text-[var(--text-muted)]" />
              Kigali, Rwanda
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[0.9] tracking-[-0.04em]"
            style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}
          >
            <span className="block text-[clamp(2.1rem,8.5vw,6.5rem)] text-[var(--text)]">
              NSENGIMANA
            </span>{' '}
            <span className="block text-[clamp(2.1rem,8.5vw,6.5rem)] gradient-text">
              Olivier
            </span>
            {/* Keeps the page's single h1 readable as one descriptive line for
                crawlers and screen readers, without changing the visual design. */}
            <span className="sr-only"> — Full-Stack Software Engineer in Kigali, Rwanda, building AI systems</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="select-none font-mono text-sm text-[var(--text-muted)]">
              ~/dev<span className="text-[var(--accent)]">$</span>
            </span>
            <span
              className="font-mono text-sm font-semibold text-[var(--text)] sm:text-base"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {typedRole}
            </span>
            <span className="typing-caret" aria-hidden="true" />
          </motion.div>

          {/* Bio */}
          <motion.p
            key={labels.heroHeadline}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48 }}
            className="mt-6 max-w-[52ch] text-[15px] leading-[1.95] text-[var(--text-muted)]"
          >
            {labels.heroHeadline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              onClick={() => jumpTo('projects')}
              className="glow-btn flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold active:scale-95"
            >
              {labels.viewProjects}
              <FiArrowRight size={14} />
            </MagneticButton>

            <MagneticButton
              onClick={() => jumpTo('contact')}
              className="card-surface flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold active:scale-95 hover:border-[var(--accent)]"
            >
              {labels.contactMe}
            </MagneticButton>

            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-3.5 text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]"
            >
              <FiDownload size={13} />
              Resume
            </a>
          </motion.div>

          {/* Mobile photo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="mt-8 block w-fit lg:hidden"
          >
            <div className="profile-ring">
              <div className="h-44 w-36 overflow-hidden rounded-[2rem] sm:h-52 sm:w-40">
                <img
                  src={heroPhoto}
                  alt="NSENGIMANA Olivier"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="hero-clean-image h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Stats — inline row with dividers ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68 }}
            className="mt-10 flex items-center gap-0 border-t border-[var(--border)] pt-8"
          >
            <StatItem
              target={portfolioData.stats.projects}
              label={labels.projectsLabel}
              delay={0.72}
            />
            <div className="mx-4 h-10 w-px bg-[var(--border)] sm:mx-8" />
            <StatItem
              target={portfolioData.stats.systemsBuilt}
              label={labels.systemsLabel}
              delay={0.82}
            />
            <div className="mx-4 h-10 w-px bg-[var(--border)] sm:mx-8" />
            <StatItem
              target={portfolioData.stats.certificates}
              label={labels.certificatesLabel}
              delay={0.92}
            />
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="relative hidden lg:flex lg:flex-col lg:items-center lg:gap-4">

          {/* ── Clock + Weather — above photo ── */}
          <LiveClock />

          {/* ── Profile photo ── */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="profile-ring relative z-10"
            >
              <div className="relative h-[20rem] w-[15.5rem] overflow-hidden rounded-[2.3rem]">
                <img
                  src={heroPhoto}
                  alt="NSENGIMANA Olivier"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="248px"
                  className="hero-clean-image h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg) 45%, transparent) 100%)' }}
                />
              </div>
            </motion.div>

            {/* ── Available badge — right of photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1, type: 'spring', stiffness: 300 }}
              className="absolute -right-4 bottom-16 z-20 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] shadow-md backdrop-blur"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 8px var(--success)' }} />
              {labels.availableForWork}
            </motion.div>
          </div>

          {/* ── Terminal widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <TerminalWidget />
          </motion.div>
        </div>
      </div>

      {/* ── Tech marquee ── */}
      <div className="absolute bottom-4 left-0 right-0">
        <TechMarquee />
      </div>
    </section>
  )
}