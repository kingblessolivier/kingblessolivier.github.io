import { motion } from 'framer-motion'
import { FiDatabase, FiLayers, FiMonitor } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'

const LAYER_ICONS = [FiMonitor, FiLayers, FiDatabase]

export default function SystemDesignSection({ sectionText }) {
  const t = sectionText.systems
  const layers = [
    { title: t.frontend, items: t.frontendItems },
    { title: t.backend,  items: t.backendItems },
    { title: t.data,     items: t.dataItems },
  ]

  return (
    <SectionReveal id="systems" className="section-gap">
      <div className="container-shell">
        <SectionHeader tag="Architecture" title={t.title} subtitle={t.subtitle} number="03" />

        {/* One card: the three layers on top, the request lifecycle beneath */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bento-card group"
        >
          <div className="relative z-10 grid divide-y divide-[var(--border)] @3xl:grid-cols-3 @3xl:divide-x @3xl:divide-y-0">
            {layers.map(({ title, items }, i) => {
              const Icon = LAYER_ICONS[i]
              return (
                <div key={title} className="p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <Icon size={16} className="text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
                    <span className="ml-auto font-mono text-xs text-[var(--text-subtle)]">L{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{items.join(' · ')}</p>
                </div>
              )
            })}
          </div>

          <div className="relative z-10 border-t border-[var(--border)] p-6">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <p className="section-eyebrow">{t.flowTitle}</p>
              <p className="text-xs text-[var(--text-muted)]">Request → Response lifecycle</p>
            </div>
            <ol className="relative grid gap-4 @xl:grid-cols-5 @xl:gap-2">
              <span className="flow-track hidden @xl:block" aria-hidden="true" />
              {t.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-4 @xl:flex-col @xl:gap-3 @xl:text-center">
                  <span className="flow-node">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-[var(--text)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  )
}
