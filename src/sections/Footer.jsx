import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiMail, FiArrowUp } from 'react-icons/fi'
import VisitCounter from '../components/VisitCounter'
import { socialLinks, contactInfo } from '../assets/data'

const socials = [
  { key: 'github',    icon: FiGithub,    label: 'GitHub',    href: socialLinks.github },
  { key: 'linkedin',  icon: FiLinkedin,  label: 'LinkedIn',  href: socialLinks.linkedin },
  { key: 'twitter',   icon: FiTwitter,   label: 'Twitter',   href: socialLinks.twitter },
  { key: 'instagram', icon: FiInstagram, label: 'Instagram', href: socialLinks.instagram },
].filter((s) => s.href)

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Awards',     href: '#awards' },
  { label: 'Contact',    href: '#contact' },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer({ visitorsLabel }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">

      {/* Top gradient rule */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in srgb,var(--accent) 50%,transparent) 35%, color-mix(in srgb,var(--accent-purple) 50%,transparent) 65%, transparent 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at 50% 120%, color-mix(in srgb,var(--accent) 28%,transparent), transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="container-shell relative z-10 py-14">

        {/* ── Main grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-black"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
                  color: 'var(--accent-contrast)',
                  boxShadow: '0 6px 20px -6px color-mix(in srgb,var(--accent) 60%,transparent)',
                  fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
                }}
              >
                N
              </motion.div>
              <div>
                <p
                  className="text-sm font-black tracking-tight text-[var(--text)]"
                  style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}
                >
                  NSENGIMANA Olivier
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">Full-Stack Engineer &amp; AI Builder</p>
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-5 max-w-[30ch] text-[13px] leading-[1.9] text-[var(--text-muted)]">
              Crafting intelligent digital products — from clean interfaces to powerful backend systems.
            </p>

            {/* Location + email */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                <FiMapPin size={12} className="shrink-0 text-[var(--accent)]" />
                <span>Kigali, Rwanda</span>
              </div>
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-[12px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  <FiMail size={12} className="shrink-0 text-[var(--accent)]" />
                  <span>{contactInfo.email}</span>
                </a>
              )}
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ key, icon: Icon, label, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb,var(--accent) 45%,var(--border))'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.background = 'color-mix(in srgb,var(--accent) 8%,var(--surface))'
                    e.currentTarget.style.boxShadow = '0 4px 14px -4px color-mix(in srgb,var(--accent) 35%,transparent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.color = ''
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]"
            >
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <a
                    href={href}
                    className="group flex items-center gap-2 text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span
                      className="h-px w-3 rounded-full bg-[var(--border)] transition-all duration-200 group-hover:w-5 group-hover:bg-[var(--accent)]"
                    />
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Status / stack card */}
          <div>
            <p
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]"
            >
              Stack
            </p>
            <div
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              style={{ boxShadow: '0 4px 20px -8px rgba(0,0,20,0.15)' }}
            >
              {/* Available badge */}
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="text-[11px] font-semibold text-[var(--accent)]">Open to opportunities</span>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Next.js', 'Python', 'Django', 'AI/ML', 'PostgreSQL', 'Tailwind'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="my-10 h-px"
          style={{
            background:
              'linear-gradient(90deg,transparent,var(--border) 20%,var(--border) 80%,transparent)',
          }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--text-muted)]">
            <VisitCounter label={visitorsLabel} />
            <span className="hidden h-3 w-px bg-[var(--border)] sm:block" />
            <p>
              © {new Date().getFullYear()}{' '}
              <span
                className="font-semibold text-[var(--text)]"
                style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}
              >
                NSENGIMANA Olivier
              </span>
              . All rights reserved.
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[11px] font-semibold text-[var(--text-muted)] transition hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))] hover:text-[var(--accent)]"
          >
            <FiArrowUp size={13} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
