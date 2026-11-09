import { useEffect, useState } from 'react'

/* Scroll-driven CSS animations, where supported, move the bar without JS. */
const CSS_DRIVEN =
  typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()')

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (CSS_DRIVEN) return undefined
    const onScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
      setProgress(value)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress-shell" aria-hidden="true">
      <div
        className={`scroll-progress-bar${CSS_DRIVEN ? ' is-scroll-driven' : ''}`}
        style={CSS_DRIVEN ? undefined : { width: `${progress}%` }}
      />
    </div>
  )
}
