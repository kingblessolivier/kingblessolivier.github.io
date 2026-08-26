import { motion } from 'framer-motion'

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
  align = 'left',
  number,
  children,
}) {
  const centered = align === 'center'
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''} relative`}>


      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="section-tag mb-4 inline-block"
      >
        {tag}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="section-header-title"
      >
        {title}
        {titleContext && <span className="sr-only">{titleContext}</span>}
      </motion.h2>

      {/* Accent rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className={`mt-4 h-[3px] w-12 rounded-full ${centered ? 'mx-auto' : ''}`}
        style={{
          transformOrigin: centered ? 'center' : 'left',
          background: 'linear-gradient(90deg, var(--accent), var(--accent-purple))',
        }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className={`mt-5 text-[15px] leading-[1.9] text-[var(--text-muted)] ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  )
}