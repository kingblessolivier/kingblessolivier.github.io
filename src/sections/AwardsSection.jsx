import { motion } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineTrophy } from 'react-icons/hi2'
import { FiExternalLink } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { awards } from '../assets/data'

export default function AwardsSection({ navLabels, sectionText, language }) {
  return (
    <SectionReveal id="awards" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={sectionText.awards.sectionTag}
          title={navLabels.awards}
          subtitle="Recognition, certificates, and hackathon achievements."
          number="06"
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {awards.map((award, index) => {
            return (
              <motion.article
                key={award.title.EN ?? award.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: index * 0.07 }}
                className="award-card card-surface card-hover group relative flex gap-5 overflow-hidden rounded-2xl border border-[var(--border)] p-6"
              >
                {/* Medal icon — uniform monochrome tile */}
                <div
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent)',
                  }}
                >
                  <HiOutlineTrophy />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-bold leading-snug text-[var(--text)]">
                      {award.title[language] ?? award.title.EN}
                    </h3>
                    <span className="shrink-0 text-[10px] font-semibold text-[var(--text-muted)]">{award.year}</span>
                  </div>

                  <p className="mt-2 text-sm leading-[1.8] text-[var(--text-muted)]">
                    {award.description[language] ?? award.description.EN}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 7%, var(--surface))',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <HiOutlineAcademicCap size={11} />
                      {award.issuer}
                    </span>
                  </div>
                </div>

                {/* Hover corner glow — subtle, monochrome */}
                <div
                  className="pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)',
                  }}
                />
              </motion.article>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}