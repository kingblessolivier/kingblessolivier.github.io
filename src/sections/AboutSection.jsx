import { motion } from 'framer-motion'
import { FiCompass, FiFeather, FiTarget } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { aboutContent, portfolioData } from '../assets/data'

const traitIcons = [FiTarget, FiCompass, FiFeather]

/* Counts a reader can check on this page, not self-ratings */
const statItems = [
  { label: 'Case studies', value: portfolioData.projects.length },
  { label: 'Hackathons',   value: portfolioData.stats.hackathons },
  { label: 'Certificates', value: portfolioData.stats.certificates },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function AboutSection({ language, navLabels, sectionText }) {
  const aboutText = sectionText.about
  const traitLabels = [aboutText.trait1, aboutText.trait2, aboutText.trait3]
  const journey = portfolioData.personal.journey[language]

  return (
    <SectionReveal id="about" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={aboutText.sectionTag}
          title={navLabels.about}
          titleContext=" Nsengimana Olivier, full-stack software engineer in Kigali, Rwanda"
          number="01"
        />

        <div className="grid gap-4 @3xl:grid-cols-3">
          {/* Story + journey */}
          <motion.article {...rise()} className="bento-card group rounded-3xl p-7 @xl:p-10 @3xl:col-span-2 @3xl:row-span-2">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 max-w-2xl text-lg leading-relaxed text-[var(--text)] @xl:text-xl"
            >
              {aboutContent[language]}
            </motion.p>

            <div className="relative z-10 mt-10">
              <p className="section-eyebrow mb-6">{aboutText.journeyTitle}</p>
              <ol className="relative grid gap-6 @xl:grid-cols-3 @xl:gap-5">
                {/* Rail joining the three steps on wide screens */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-5 hidden h-px @xl:block"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--border) 60%, transparent)' }}
                />
                {journey.map((item, i) => (
                  <motion.li key={item} {...rise(0.1 + i * 0.08)} className="relative">
                    <span className="flow-node">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{item}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.article>

          {/* Philosophy + how I work */}
          <motion.figure {...rise(0.08)} className="bento-card bento-card--featured group rounded-3xl p-7">
            <blockquote className="relative z-10 text-base font-medium leading-relaxed text-[var(--text)]">
              “{portfolioData.personal.philosophy[language]}”
            </blockquote>
            <figcaption className="relative z-10 mt-3 text-xs text-[var(--text-muted)]">
              NSENGIMANA Olivier · {aboutText.fullStackLabel}
            </figcaption>
            <ul className="relative z-10 mt-6 space-y-3 border-t border-[var(--border)] pt-5">
              {traitLabels.map((trait, i) => {
                const Icon = traitIcons[i]
                return (
                  <li key={trait} className="flex items-center gap-3 text-sm text-[var(--text)]">
                    <Icon size={15} className="shrink-0 text-[var(--accent)]" />
                    {trait}
                  </li>
                )
              })}
            </ul>
          </motion.figure>

          {/* Stats */}
          <motion.div {...rise(0.14)} className="bento-card group grid grid-cols-3 rounded-3xl p-7">
            {statItems.map(({ label, value }, i) => (
              <div
                key={label}
                className={`relative z-10 flex flex-col gap-2 ${i > 0 ? 'border-l border-[var(--border)] pl-4' : ''}`}
              >
                <span className="stat-figure">{value}</span>
                <span className="text-xs text-[var(--text-muted)]">{label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </SectionReveal>
  )
}
