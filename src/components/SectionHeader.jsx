import { motion } from 'framer-motion'

/**
 * One header for every section: a mono "01 / About" eyebrow, the title, and
 * on wide screens the subtitle set to the right so the heading reads as a row
 * rather than a stack.
 */
export default function SectionHeader({
  tag,
  title,
  /**
   * Read out after the visible title but not drawn: a bare "About" or
   * "Projects" heading leaves both assistive tech and crawlers without the
   * subject of the section. Pass the rest of the phrase here.
   */
  titleContext,
  subtitle,
  number,
  children,
}) {
  return (
    <div className="mb-8 grid gap-4 @3xl:mb-10 @4xl:grid-cols-[1fr_minmax(0,22rem)] @4xl:items-end @4xl:gap-16">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-eyebrow mb-4"
        >
          {number && <b>{number}</b>}
          <i aria-hidden="true" />
          {tag}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="section-header-title"
        >
          {title}
          {titleContext && <span className="sr-only">{titleContext}</span>}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="text-base leading-relaxed text-[var(--text-muted)]"
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  )
}
