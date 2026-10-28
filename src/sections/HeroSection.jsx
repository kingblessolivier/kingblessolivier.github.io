import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin, FiInstagram, FiMapPin, FiMoon, FiSun, FiTerminal } from 'react-icons/fi'
import { SiX } from 'react-icons/si'
import { portfolioData } from '../assets/data'
import LanguageSwitcher from '../components/LanguageSwitcher'

/* Every section the panel can jump to, in page order */
const SECTIONS = [
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'systems',  label: 'Systems' },
  { id: 'skills',   label: 'Skills' },
  { id: 'awards',   label: 'Awards' },
  { id: 'gallery',  label: 'Gallery' },
  { id: 'work',     label: 'Experience' },
  { id: 'contact',  label: 'Contact' },
]

const SOCIALS = [
  { icon: FiGithub,    label: 'GitHub',    href: portfolioData.social.github },
  { icon: FiLinkedin,  label: 'LinkedIn',  href: portfolioData.social.linkedin },
  { icon: SiX,         label: 'X',         href: portfolioData.social.twitter },
  { icon: FiInstagram, label: 'Instagram', href: portfolioData.social.instagram },
].filter((s) => s.href)

function useTypedRole(lines) {
  const [typed, setTyped] = useState('')
  useEffect(() => {
    let timeoutId, phaseIdx = 0, cursor = 0, mode = 'type'
    const tick = () => {
      const phase = lines[phaseIdx]
      if (mode === 'type') {
        setTyped(phase.slice(0, ++cursor))
        if (cursor >= phase.length) {
          mode = 'delete'
          timeoutId = setTimeout(tick, 1800)
          return
        }
        timeoutId = setTimeout(tick, 80)
      } else {
        setTyped(phase.slice(0, --cursor))
        if (cursor <= 0) {
          phaseIdx = (phaseIdx + 1) % lines.length
          mode = 'type'
          timeoutId = setTimeout(tick, 500)
          return
        }
        timeoutId = setTimeout(tick, 42)
      }
    }
    setTyped('')
    timeoutId = setTimeout(tick, 400)
    return () => clearTimeout(timeoutId)
  }, [lines])
  return typed
}

/* The section currently under the reading line, for the panel's nav */
function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

/**
 * The identity panel. On large screens it is the fixed left column of the
 * split layout; on small screens it is the intro at the top of the page.
 */
export default function HeroSection({ labels, language, setLanguage, theme, toggleTheme, onOpenTerminal }) {
  const typedRole = useTypedRole(labels.roleLines)
  const active = useActiveSection()
  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="home"
      className="flex flex-col pt-28 pb-12 lg:sticky lg:top-0 lg:h-screen lg:justify-between lg:overflow-y-auto lg:py-12"
    >
      <div>
        {/* Availability */}
        <motion.div {...fade(0)} className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text)]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--success)]" />
            {labels.availableForWork}
          </span>
        </motion.div>

        {/* Name — the page's only h1 */}
        <motion.h1 {...fade(0.08)} className="mt-6 font-extrabold leading-[0.92] tracking-[-0.045em]">
          <span className="block text-[clamp(2.4rem,10vw,3.6rem)] text-[var(--text)] lg:text-[2.6rem] xl:text-[3rem]">NSENGIMANA</span>
          <span className="block text-[clamp(2.4rem,10vw,3.6rem)] text-[var(--text-muted)] lg:text-[2.6rem] xl:text-[3rem]">Olivier</span>
          <span className="sr-only"> — Full-Stack Software Engineer in Kigali, Rwanda, building AI systems</span>
        </motion.h1>

        <motion.p {...fade(0.16)} className="mt-5 flex min-h-6 items-center gap-2 font-mono text-sm">
          <span className="text-[var(--accent)]">$</span>
          <span className="text-[var(--text)]">{typedRole}</span>
          <span className="typing-caret" aria-hidden="true" />
        </motion.p>

        <motion.p {...fade(0.22)} className="mt-5 max-w-sm text-base leading-relaxed text-[var(--text-muted)]">
          {labels.heroHeadline}
        </motion.p>

        <motion.p {...fade(0.26)} className="mt-3 flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
          <FiMapPin size={12} className="text-[var(--accent)]" />
          Kigali, Rwanda
        </motion.p>

        {/* Actions */}
        <motion.div {...fade(0.3)} className="mt-7 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => jumpTo('projects')}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[var(--shadow)] transition hover:bg-[var(--accent-hover)]"
          >
            {labels.viewProjects}
            <FiArrowRight size={15} />
          </button>
          <button
            type="button"
            onClick={() => jumpTo('contact')}
            className="inline-flex min-h-11 items-center rounded-lg border border-[var(--line)] bg-[var(--surface-1)] px-5 text-sm font-semibold text-[var(--text)] shadow-[var(--shadow)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
          >
            {labels.contactMe}
          </button>
          <a
            href={portfolioData.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1 px-3 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Resume
            <FiArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Section nav — wide screens only; small screens use the top bar */}
        <nav aria-label="Sections" className="mt-10 hidden lg:block">
          <ul>
            {SECTIONS.map(({ id, label }, i) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => { event.preventDefault(); jumpTo(id) }}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex min-h-8 items-center gap-4 text-sm"
                  >
                    <span className="w-5 font-mono text-xs text-[var(--text-muted)]">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive ? 'w-14 bg-[var(--text)]' : 'w-7 bg-[var(--border)] group-hover:w-12 group-hover:bg-[var(--text-muted)]'
                      }`}
                    />
                    <span
                      className={`font-medium transition-colors ${
                        isActive ? 'text-[var(--text)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'
                      }`}
                    >
                      {labels[id] ?? label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Socials + controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              <Icon size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-1.5 lg:flex">
          <LanguageSwitcher language={language} setLanguage={setLanguage} upward />
          <button type="button" onClick={onOpenTerminal} aria-label="Open portfolio terminal" title="Portfolio terminal (Ctrl + `)" className="navbar-theme-btn">
            <FiTerminal size={14} />
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="navbar-theme-btn">
            {theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
        </div>
      </div>
    </section>
  )
}
