import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { SiX } from 'react-icons/si'
import { socialLinks, contactInfo } from '../assets/data'

const socials = [
  { key: 'github',    icon: FiGithub,    label: 'GitHub',    href: socialLinks.github },
  { key: 'linkedin',  icon: FiLinkedin,  label: 'LinkedIn',  href: socialLinks.linkedin },
  { key: 'twitter',   icon: SiX,         label: 'X',         href: socialLinks.twitter },
  { key: 'instagram', icon: FiInstagram, label: 'Instagram', href: socialLinks.instagram },
].filter((s) => s.href)

/* One slim row: the left panel already carries the name, nav and socials on wide screens */
export default function Footer() {
  return (
    <footer className="container-shell border-t border-[var(--border)] py-8">
      <div className="flex flex-col gap-5 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="text-sm text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-[var(--text)]">NSENGIMANA Olivier</span> · Kigali, Rwanda
          </p>
          {contactInfo?.email && (
            <a href={`mailto:${contactInfo.email}`} className="mt-1 inline-block transition hover:text-[var(--accent)]">
              {contactInfo.email}
            </a>
          )}
        </div>

        <div className="flex items-center gap-1">
          {socials.map(({ key, icon: Icon, label, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              <Icon size={16} />
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-2 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-muted)] transition hover:border-[var(--line-strong)] hover:text-[var(--text)]"
          >
            <FiArrowUp size={14} />
            Top
          </button>
        </div>
      </div>
    </footer>
  )
}
