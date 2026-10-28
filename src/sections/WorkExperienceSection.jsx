import { motion } from 'framer-motion'
import { FiBookOpen, FiMapPin } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../assets/data'

/* Consecutive roles at the same company read as one stint, not separate jobs */
function groupByCompany(items) {
  return items.reduce((groups, item) => {
    const last = groups[groups.length - 1]
    if (last && last.company === item.company) last.roles.push(item)
    else groups.push({ company: item.company, roles: [item] })
    return groups
  }, [])
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

function CompanyGroup({ group, index, language }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative pl-16"
    >
      {/* Company mark sits on the rail */}
      <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] font-mono text-xs font-medium text-[var(--accent)] shadow-sm">
        {initials(group.company)}
      </span>

      <p className="pt-2.5 text-sm font-semibold text-[var(--text)]">{group.company}</p>

      {/* All roles at one company share a card */}
      <div className="bento-card group mt-3 rounded-2xl">
        <div className="relative z-10 divide-y divide-[var(--border)]">
          {group.roles.map((role) => (
            <article key={role.role.EN} className="px-5 py-4 @xl:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold tracking-tight text-[var(--text)]">{role.role[language]}</h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {role.duration[language]}
                  {role.type ? ` · ${role.type}` : ''}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{role.details[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.li>
  )
}

function EducationCard({ item, language, text }) {
  const startYear = 2022
  const endYear = parseInt(item.expectedGraduation, 10)
  const progress = Math.max(0, Math.min(100, Math.round(((new Date().getFullYear() - startYear) / (endYear - startYear)) * 100)))

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bento-card bento-card--featured group rounded-3xl p-7"
    >
      <div className="relative z-10 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)]">
          <FiBookOpen size={20} />
        </span>
        <span className="section-eyebrow">{text.educationTitle}</span>
      </div>

      <h3 className="relative z-10 mt-6 text-xl font-semibold leading-snug tracking-tight text-[var(--text)]">
        {item.degree[language]}
      </h3>
      <p className="relative z-10 mt-2 flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
        <FiMapPin size={13} />
        {item.institution[language]}
      </p>
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{item.details[language]}</p>

      <div className="relative z-10 mt-7">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs text-[var(--text-muted)]">{text.expectedGraduationLabel} {item.expectedGraduation}</span>
          <span className="font-mono text-sm text-[var(--text)]">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="h-full rounded-full bg-[var(--accent)]"
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-[var(--text-muted)]">
          <span>{startYear}</span>
          <span>{item.expectedGraduation}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function WorkExperienceSection({ language, sectionText }) {
  const text = sectionText.work
  const groups = groupByCompany(portfolioData.workExperience)

  return (
    <SectionReveal id="work" className="section-gap">
      <div className="container-shell">
        <SectionHeader tag={text.sectionTag} title={text.title} subtitle={text.focus} number="07" />

        <div className="grid gap-10 @3xl:grid-cols-[1fr_22rem] @3xl:gap-12">
          {/* Roles */}
          <ol className="relative space-y-8">
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[21px] top-11 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--border), transparent)' }}
            />
            {groups.map((group, index) => (
              <CompanyGroup key={group.company} group={group} index={index} language={language} />
            ))}
          </ol>

          {/* Education — stays in view beside the roles on wide screens */}
          <div className="space-y-4 @3xl:sticky @3xl:top-24 @3xl:self-start">
            {portfolioData.education.map((item) => (
              <EducationCard key={item.institution.EN} item={item} language={language} text={text} />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
