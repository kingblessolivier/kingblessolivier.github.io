import { motion } from 'framer-motion'
import { HiOutlineTrophy } from 'react-icons/hi2'
import { FiArrowUpRight, FiAward } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { awards } from '../assets/data'
import { projectBySlug, projectPath } from '../lib/projectRoutes'

/* The one award that came with a prize, and the project that won it */
const PRIZE_PROJECT = projectBySlug('medlink-system')

export default function AwardsSection({ navLabels, sectionText, language, onOpenProject }) {
  const [featured, ...rest] = awards
  const text = (field) => field[language] ?? field.EN

  const openPrizeProject = (event) => {
    if (!PRIZE_PROJECT || !onOpenProject) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    onOpenProject(PRIZE_PROJECT)
  }

  return (
    <SectionReveal id="awards" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={sectionText.awards.sectionTag}
          title={navLabels.awards}
          subtitle="Recognition, certificates, and hackathon achievements."
          number="05"
        />

        <div className="grid gap-4 @3xl:grid-cols-2">
          {/* Featured: the prize */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card bento-card--featured group flex flex-col p-7 @xl:p-8"
          >
            <div className="relative z-10 flex items-start justify-between gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)] text-2xl text-[var(--accent-contrast)] shadow-lg">
                <HiOutlineTrophy />
              </span>
              <span className="font-mono text-sm text-[var(--text-muted)]">{featured.year}</span>
            </div>

            <span className="chip chip--solid relative z-10 mt-8 self-start">Prize winner</span>
            <h3 className="relative z-10 mt-4 max-w-lg text-2xl font-semibold leading-tight tracking-tight text-[var(--text)] @xl:text-3xl">
              {text(featured.title)}
            </h3>
            <p className="relative z-10 mt-4 max-w-lg text-base leading-relaxed text-[var(--text-muted)]">
              {text(featured.description)}
            </p>

            <div className="flex-1" />

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
              <span className="text-sm text-[var(--text-muted)]">{featured.issuer}</span>
              {PRIZE_PROJECT && (
                <a
                  href={projectPath(PRIZE_PROJECT)}
                  onClick={openPrizeProject}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-[gap] hover:gap-2.5"
                >
                  See the MedLink case study
                  <FiArrowUpRight size={15} />
                </a>
              )}
            </div>
          </motion.article>

          {/* Certificates — one row each */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="bento-card group flex"
          >
            <ul className="relative z-10 flex w-full flex-col divide-y divide-[var(--border)]">
              {rest.map((award) => (
                <li key={award.title.EN ?? award.title} className="flex flex-1 items-center gap-4 px-6 py-4">
                  <FiAward size={16} className="shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[var(--text)]">{text(award.title)}</span>
                    <span className="block text-xs text-[var(--text-muted)]">{award.issuer}</span>
                  </span>
                  <span className="font-mono text-xs text-[var(--text-subtle)]">{award.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  )
}
