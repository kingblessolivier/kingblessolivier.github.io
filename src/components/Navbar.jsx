import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CommandPalette from './CommandPalette'
import LanguageSwitcher from './LanguageSwitcher'
import { portfolioData } from '../assets/data'
import {
  FiHome, FiUser, FiFolder, FiCpu, FiZap,
  FiAward, FiImage, FiBriefcase, FiMail,
  FiSun, FiMoon, FiX, FiMenu, FiArrowUpRight,
  FiGithub, FiLinkedin, FiArrowRight,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const NAV_ITEMS = [
  { id: 'home',     icon: FiHome,      label: 'Home' },
  { id: 'about',    icon: FiUser,      label: 'About' },
  { id: 'projects', icon: FiFolder,    label: 'Projects' },
  { id: 'systems',  icon: FiCpu,       label: 'Systems' },
  { id: 'skills',   icon: FiZap,       label: 'Skills' },
  { id: 'awards',   icon: FiAward,     label: 'Awards' },
  { id: 'gallery',  icon: FiImage,     label: 'Gallery' },
  { id: 'work',     icon: FiBriefcase, label: 'Work' },
  { id: 'contact',  icon: FiMail,      label: 'Contact' },
]

const SOCIAL_LINKS = [
  { icon: FiGithub,   label: 'GitHub',   href: portfolioData.social?.github },
  { icon: FiLinkedin, label: 'LinkedIn', href: portfolioData.social?.linkedin },
  { icon: FiMail,     label: 'Email',    href: `mailto:${portfolioData.personal?.email}` },
  { icon: FaWhatsapp, label: 'WhatsApp', href: `https://wa.me/${(portfolioData.personal?.whatsapp || '').replace(/[^0-9]/g, '')}` },
].filter((s) => s.href)

export default function Navbar({ navLabels, language, setLanguage, toggleTheme, theme }) {
  const [menuOpen, setMenuOpen]             = useState(false)
  const [activeSection, setActiveSection]   = useState('home')
  const [scrolled, setScrolled]             = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    const observers = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
      .map((el) => {
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(el.id) },
          { threshold: 0.3 },
        )
        obs.observe(el)
        return obs
      })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* Close menu on scroll */
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false)
      window.addEventListener('scroll', close, { once: true, passive: true })
      return () => window.removeEventListener('scroll', close)
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const labelOf = (id) => navLabels[id] ?? NAV_ITEMS.find(n => n.id === id)?.label ?? id

  return (
    <>
      {/* ════════════════════════════════════════
          HEADER BAR
      ════════════════════════════════════════ */}
      <motion.header
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        className="fixed inset-x-0 top-0 z-[150] overflow-visible"
      >
        {/* Outer wrapper — shrinks to a pill when scrolled */}
        <motion.div
          variants={{
            top:      { marginTop: 0,   marginLeft: 0,   marginRight: 0,   borderRadius: 0 },
            scrolled: { marginTop: 10,  marginLeft: 16,  marginRight: 16,  borderRadius: 20 },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={scrolled ? {
            background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            border: '1px solid color-mix(in srgb, var(--accent) 10%, var(--border))',
            boxShadow: '0 8px 40px -12px rgba(0,0,20,0.35), 0 0 0 1px color-mix(in srgb,var(--accent) 5%,transparent)',
          } : {}}
        >
          {/* Top accent line — only when scrolled */}
          {scrolled && (
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 55%,transparent) 40%,color-mix(in srgb,var(--accent-purple) 45%,transparent) 60%,transparent)' }}
            />
          )}

          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12 px-4' : 'h-16 container-shell'}`}>

            {/* ── Logo ── */}
            <button onClick={() => scrollTo('home')} aria-label="Home" className="group flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative h-8 w-8 overflow-hidden rounded-lg"
                style={{
                  border: '1px solid color-mix(in srgb,var(--accent) 30%,var(--border))',
                  boxShadow: '0 4px 14px -4px color-mix(in srgb,var(--accent) 45%,transparent)',
                }}
              >
                <img
                  src="/olivier_avatar.webp"
                  alt="NSENGIMANA Olivier"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* Green availability dot */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[var(--bg)] bg-[var(--success)]"
                  style={{ boxShadow: '0 0 6px var(--success)' }}
                />
              </motion.div>
              <div className="leading-none hidden sm:block">
                <span className="block text-[12px] font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  Olivier
                </span>
                <span className="block text-[8px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  portfolio
                </span>
              </div>
            </button>

            {/* ── Desktop nav ── */}
            <nav className="hidden xl:flex items-center" role="navigation">
              {/* Pill container */}
              <div
                className="flex items-center gap-0.5 rounded-full p-1"
                style={{
                  background: scrolled
                    ? 'transparent'
                    : 'color-mix(in srgb, var(--surface) 60%, transparent)',
                  border: scrolled ? 'none' : '1px solid var(--border)',
                }}
              >
                {NAV_ITEMS.map(({ id, icon: Icon }) => {
                  const active = activeSection === id
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors duration-150"
                      style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-bg"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'color-mix(in srgb, var(--accent) 12%, var(--card))',
                            border: '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))',
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon size={11} className="relative z-10 shrink-0" />
                      <span className="relative z-10">{labelOf(id)}</span>
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="relative z-10 h-1 w-1 rounded-full"
                          style={{ background: 'var(--accent)', boxShadow: '0 0 5px var(--accent)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* ── Desktop controls ── */}
            <div
              className="hidden xl:flex items-center gap-1.5 rounded-full p-1"
              style={{
                background: scrolled ? 'transparent' : 'color-mix(in srgb, var(--surface) 60%, transparent)',
                border: scrolled ? 'none' : '1px solid var(--border)',
              }}
            >
              {/* Command palette */}
              <div className="hidden 2xl:block">
                <CommandPalette
                  navLabels={navLabels}
                  onNavigate={scrollTo}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  language={language}
                  setLanguage={setLanguage}
                />
              </div>

              {/* Language switcher */}
              <LanguageSwitcher language={language} setLanguage={setLanguage} />

              {/* Contact CTA */}
              <button
                onClick={() => scrollTo('contact')}
                className="navbar-cta hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold 2xl:flex"
              >
                {labelOf('contact')}
                <FiArrowRight size={12} />
              </button>

              {/* Theme toggle */}
              <button onClick={toggleTheme} aria-label="Toggle theme" className="navbar-theme-btn">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -25, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 25, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {/* ── Mobile right controls ── */}
            <div className="flex xl:hidden items-center gap-2">
              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="navbar-theme-btn"
              >
                {theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle menu"
                className="navbar-hamburger"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'x' : 'menu'}
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  20, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="flex items-center justify-center"
                  >
                    {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm xl:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="navbar-drawer fixed inset-y-0 right-0 z-[200] flex w-[min(90vw,360px)] flex-col xl:hidden"
            >
              {/* ── Drawer header ── */}
              <div className="relative shrink-0 px-5 pb-4 pt-[calc(env(safe-area-inset-top,0px)+1.1rem)]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-11 w-11 overflow-hidden rounded-xl"
                      style={{
                        border: '1px solid color-mix(in srgb,var(--accent) 30%,var(--border))',
                        boxShadow: '0 8px 22px -8px color-mix(in srgb,var(--accent) 45%,transparent)',
                      }}
                    >
                      <img
                        src="/olivier_avatar.webp"
                        alt="NSENGIMANA Olivier"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--success)]"
                        style={{ boxShadow: '0 0 6px var(--success)' }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight text-[var(--text)]">NSENGIMANA Olivier</p>
                      <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Full-Stack &amp; AI Engineer</p>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-[color:color-mix(in_srgb,var(--success)_35%,var(--border))] bg-[color:color-mix(in_srgb,var(--success)_10%,transparent)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--success)]">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Available for work
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] text-[var(--text-muted)] transition hover:border-[color:color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:text-[var(--text)]"
                  >
                    <FiX size={15} />
                  </button>
                </div>
              </div>

              <div className="mx-5 h-px shrink-0 bg-[var(--border)]" />

              {/* ── Nav items ── */}
              <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
                <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  Navigate
                </p>
                <div className="space-y-1">
                  {NAV_ITEMS.map(({ id, icon: Icon }, i) => {
                    const active = activeSection === id
                    return (
                      <motion.button
                        key={id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.24, delay: 0.04 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => scrollTo(id)}
                        className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-200"
                        style={{
                          background: active ? 'color-mix(in srgb,var(--accent) 9%,var(--surface))' : 'transparent',
                          border: active
                            ? '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))'
                            : '1px solid transparent',
                        }}
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
                          style={{
                            background: active ? 'var(--accent)' : 'var(--surface)',
                            color: active ? 'var(--accent-contrast)' : 'var(--text-muted)',
                            border: '1px solid var(--border)',
                            boxShadow: active ? '0 6px 16px -6px color-mix(in srgb,var(--accent) 55%,transparent)' : 'none',
                          }}
                        >
                          <Icon size={15} />
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
                        >
                          {labelOf(id)}
                        </span>
                        <span
                          className="ml-auto font-mono text-[10px] tabular-nums"
                          style={{ color: active ? 'var(--accent)' : 'color-mix(in srgb,var(--text-muted) 60%,transparent)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {active ? (
                          <motion.span
                            layoutId="drawer-active"
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}
                          />
                        ) : (
                          <FiArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-40 text-[var(--text-muted)]" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Connect */}
                {SOCIAL_LINKS.length > 0 && (
                  <>
                    <p className="mb-2 mt-5 px-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                      Connect
                    </p>
                    <div className="flex gap-2 px-1">
                      {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          className="drawer-social flex h-11 flex-1 items-center justify-center rounded-xl"
                        >
                          <Icon size={17} />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </nav>

              {/* ── Drawer footer ── */}
              <div className="shrink-0 space-y-3 border-t border-[var(--border)] px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] pt-4">
                {/* Contact CTA */}
                <button
                  onClick={() => scrollTo('contact')}
                  className="glow-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm"
                >
                  {labelOf('contact')}
                  <FiArrowRight size={15} />
                </button>

                <div className="flex items-center justify-between gap-3">
                  {/* Language switcher */}
                  <LanguageSwitcher language={language} setLanguage={setLanguage} upward />

                  {/* Theme segmented control */}
                  <div className="flex items-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] p-0.5">
                    {['light', 'dark'].map((mode) => {
                      const on = theme === mode
                      const Icon = mode === 'light' ? FiSun : FiMoon
                      return (
                        <button
                          key={mode}
                          onClick={() => { if (!on) toggleTheme() }}
                          aria-label={`${mode} mode`}
                          aria-pressed={on}
                          className="relative flex h-7 w-9 items-center justify-center rounded-full"
                          style={{ color: on ? 'var(--accent-contrast)' : 'var(--text-muted)' }}
                        >
                          {on && (
                            <motion.span
                              layoutId="theme-seg"
                              className="absolute inset-0 rounded-full"
                              style={{ background: 'var(--accent)' }}
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon size={13} className="relative z-10" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
