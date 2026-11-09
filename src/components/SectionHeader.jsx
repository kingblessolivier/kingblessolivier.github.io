import { motion } from 'framer-motion'

/* One easing for every scroll entrance: a fast start that settles softly. */
const EASE = [0.22, 1, 0.36, 1]
const VIEW = { once: true, amount: 0.6 }

/**
 * One header for every section: a mono "01 / About" eyebrow, the title, and
 * on wide screens the subtitle set to the right so the heading reads as a row
 * rather than a stack.
 *
 * Scroll entrance: the eyebrow rule draws in from the left, then the title
 * rises out of a mask (its own line box clips it, so it slides up into place
 * rather than fading over the page), then the subtitle settles.
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
          initial="hidden"
          whileInView="shown"
          viewport={VIEW}
          className="section-eyebrow mb-4"
        >
          {number && (
            <motion.b
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {number}
            </motion.b>
          )}
          <motion.i
            aria-hidden="true"
            style={{ originX: 0 }}
            variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          />
          <motion.span
            variants={{ hidden: { opacity: 0, x: -6 }, shown: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
          >
            {tag}
          </motion.span>
        </motion.p>

        {/* The heading box is what is watched: the title inside starts clipped
            by the mask, so on its own it would never count as on screen. */}
        <motion.h2
          className="section-header-title section-header-mask"
          initial="hidden"
          whileInView="shown"
          viewport={VIEW}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {title}
          </motion.span>
          {titleContext && <span className="sr-only">{titleContext}</span>}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          className="text-base leading-relaxed text-[var(--text-muted)]"
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  )
}
