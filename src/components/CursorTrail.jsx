import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 10

/* Parse a #rrggbb / #rgb token into {r,g,b} */
function hexToRgb(hex) {
  let h = (hex || '').trim().replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6) return null
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const points = useRef([])
  const mouse = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  /* Monochrome fallback (ink + graphite) until tokens resolve */
  const palette = useRef([{ r: 23, g: 23, b: 23 }, { r: 107, g: 114, b: 128 }])

  useEffect(() => {
    /* Skip on touch devices and when the visitor prefers reduced motion */
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    /* Resolve the live theme tokens so the trail stays monochrome and
       follows light/dark instead of a hardcoded colour. */
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement)
      const a = hexToRgb(cs.getPropertyValue('--accent'))
      const p = hexToRgb(cs.getPropertyValue('--accent-purple'))
      if (a && p) palette.current = [a, p]
    }
    readPalette()
    const obs = new MutationObserver(readPalette)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* Push current mouse pos */
      points.current.unshift({ ...mouse.current })
      if (points.current.length > TRAIL_LENGTH) points.current.pop()

      points.current.forEach((p, i) => {
        const alpha = (1 - i / TRAIL_LENGTH) * 0.5
        const size = (1 - i / TRAIL_LENGTH) * 7 + 2
        const c = palette.current[i % palette.current.length] || palette.current[0]

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      obs.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}
