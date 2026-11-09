/**
 * A plain section. The section itself no longer fades in: its header and its
 * cards each reveal on their own, and fading the whole block as well stacked
 * two or three entrances on the same pixels.
 */
export default function SectionReveal({ id, children, className = '' }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
