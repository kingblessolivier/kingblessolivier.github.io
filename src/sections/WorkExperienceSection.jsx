import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBookOpen, FiBriefcase, FiCalendar, FiChevronDown,
  FiMapPin, FiAward, FiTrendingUp, FiCheck,
} from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../assets/data'

/* ── Company initials badge ─────────────────────────── */
function CompanyBadge({ name, size = 44 }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl text-sm font-black"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
        color: 'var(--accent-contrast)',
        boxShadow: '0 6px 20px -6px color-mix(in srgb,var(--accent) 55%,transparent)',
        fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
      }}
    >
      {initials}
    </div>
  )
}

/* ── Work experience card ────────────────────────────── */
function WorkCard({ item, index, language }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative flex gap-0">
      {/* Timeline node */}
      <div className="relative mr-5 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.12 }}
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
            color: 'var(--accent-contrast)',
            boxShadow: '0 0 0 4px var(--bg), 0 0 0 6px color-mix(in srgb,var(--accent) 30%,transparent)',
            fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
          }}
        >
          {index + 1}
        </motion.div>
        {/* Connector line to next */}
        <div
          className="w-px flex-1"
          style={{ background: 'linear-gradient(to bottom, color-mix(in srgb,var(--accent) 40%,var(--border)), var(--border))' }}
        />
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.12 }}
        className="mb-6 flex-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
        style={{ boxShadow: '0 4px 24px -8px rgba(0,0,20,0.18)' }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4"
          style={{ background: 'color-mix(in srgb, var(--accent) 4%, var(--card))' }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <CompanyBadge name={item.company} size={40} />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {item.company}
                </p>
                <h3
                  className="mt-0.5 text-sm font-bold text-[var(--text)] sm:text-base"
                  style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}
                >
                  {item.role[language]}
                </h3>
              </div>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                  color: 'var(--accent)',
                  border: '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))',
                }}
              >
                <FiCalendar size={10} />
                {item.duration[language]}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                style={{
                  background: 'color-mix(in srgb,var(--accent-purple) 10%,var(--surface))',
                  color: 'var(--accent-purple)',
                  border: '1px solid color-mix(in srgb,var(--accent-purple) 22%,var(--border))',
                }}
              >
                <FiBriefcase size={8} />
                {item.type ?? 'Internship'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, color-mix(in srgb,var(--accent) 30%,transparent), var(--border), transparent)' }}
        />

        {/* Card body */}
        <div className="px-5 py-4">
          <p className="text-sm leading-[1.85] text-[var(--text-muted)]">
            {item.details[language]}
          </p>

          {/* Key highlights */}
          {item.highlights && (
            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-2 overflow-hidden"
                >
                  {item.highlights[language]?.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <FiCheck size={13} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span className="text-[13px] text-[var(--text-muted)]">{h}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}

          {/* Skill tags */}
          {item.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </div>
  )
}

/* ── Education card ──────────────────────────────────── */
function EducationCard({ item, index, language, text }) {
  const currentYear = new Date().getFullYear()
  const startYear = 2022
  const endYear = parseInt(item.expectedGraduation, 10)
  const progress = Math.min(
    100,
    Math.round(((currentYear - startYear) / (endYear - startYear)) * 100)
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-3xl border bg-[var(--card)]"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 20%, var(--border))',
        boxShadow: '0 8px 32px -12px color-mix(in srgb,var(--accent) 20%,transparent)',
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }}
      />

      {/* Top gradient strip */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-purple))' }}
      />

      <div className="relative px-6 py-6 sm:px-8 sm:py-7">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Diploma icon */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb,var(--accent) 18%,var(--surface)), color-mix(in srgb,var(--accent-purple) 14%,var(--surface)))',
                border: '1px solid color-mix(in srgb,var(--accent) 28%,var(--border))',
                color: 'var(--accent)',
                boxShadow: '0 4px 16px -6px color-mix(in srgb,var(--accent) 40%,transparent)',
              }}
            >
              <FiBookOpen size={22} />
            </div>
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                {text.educationTitle}
              </span>
              <h3
                className="mt-1 text-base font-bold text-[var(--text)] sm:text-lg"
                style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}
              >
                {item.degree[language]}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-purple)]">
                <FiMapPin size={11} />
                {item.institution[language]}
              </div>
            </div>
          </div>

          {/* Graduation badge */}
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[11px] font-bold"
              style={{
                background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                color: 'var(--accent)',
                border: '1px solid color-mix(in srgb,var(--accent) 25%,var(--border))',
              }}
            >
              <FiAward size={12} />
              {text.expectedGraduationLabel} {item.expectedGraduation}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-5 text-sm leading-[1.9] text-[var(--text-muted)]">
          {item.details[language]}
        </p>

        {/* Progress toward graduation */}
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTrendingUp size={13} className="text-[var(--accent)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Degree Progress
              </span>
            </div>
            <span
              className="text-sm font-black"
              style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif", color: 'var(--accent)' }}
            >
              {progress}%
            </span>
          </div>

          {/* Year labels */}
          <div className="mb-1.5 flex justify-between text-[10px] text-[var(--text-muted)]">
            <span>{startYear}</span>
            <span>{item.expectedGraduation}</span>
          </div>

          {/* Track */}
          <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-purple))' }}
            />
          </div>

          {/* Milestone dots */}
          <div className="relative mt-2">
            <div className="flex justify-between text-[9px] text-[var(--text-muted)]">
              <span>Year 1</span>
              <span>Year 2</span>
              <span>Year 3</span>
              <span>Year 4</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Main section ────────────────────────────────────── */
export default function WorkExperienceSection({ language, sectionText }) {
  const text = sectionText.work

  return (
    <SectionReveal id="work" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={text.sectionTag}
          title={text.title}
          subtitle={text.focus}
          number="08"
        />

        {/* ── Work experience timeline ── */}
        <div className="relative mt-10">
          {/* Background timeline rail */}
          <div
            className="absolute left-[19px] top-10 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, color-mix(in srgb,var(--accent) 25%,transparent), var(--border) 60%, transparent)' }}
          />

          {portfolioData.workExperience.map((item, index) => (
            <WorkCard
              key={`${item.company}-${index}`}
              item={item}
              index={index}
              language={language}
            />
          ))}
        </div>

        {/* ── Education divider ── */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,var(--border))' }} />
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{
              background: 'color-mix(in srgb,var(--accent) 8%,var(--surface))',
              border: '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))',
              color: 'var(--accent)',
            }}
          >
            <FiBookOpen size={11} />
            {text.educationTitle}
          </div>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,var(--border),transparent)' }} />
        </div>

        {/* ── Education cards ── */}
        <div className="space-y-5">
          {portfolioData.education.map((item, index) => (
            <EducationCard
              key={`${item.institution.EN}-${index}`}
              item={item}
              index={index}
              language={language}
              text={text}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}