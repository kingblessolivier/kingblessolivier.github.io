/**
 * prerender.mjs — turns the built SPA into real HTML for crawlers.
 *
 * Runs AFTER `vite build`. It boots a static server on the build output, loads
 * each route in a headless browser, waits for React to finish, then writes the
 * fully rendered HTML back over <out>/<route>/index.html.
 *
 * Setup:
 *   npm i -D playwright sirv
 *   npx playwright install --with-deps chromium
 *
 * Usage:
 *   node prerender.mjs [outDir]     # outDir defaults to "dist"
 *
 * On images that already ship a Chromium (some CI runners do), point
 * PRERENDER_CHROMIUM at the binary instead of downloading a second copy.
 *
 * Result: view-source on the live site shows the real text, not <div id="root"></div>.
 * It also gives every case study its own indexable page instead of one URL for
 * the whole site.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sirv from 'sirv'
import { allRoutes } from './src/lib/projectRoutes.js'

const DIST = process.argv[2] ?? 'dist'
const PORT = 4178

const server = createServer(sirv(DIST, { single: true, dev: true }))
await new Promise((resolve) => server.listen(PORT, resolve))

const browser = await chromium.launch(
  process.env.PRERENDER_CHROMIUM ? { executablePath: process.env.PRERENDER_CHROMIUM } : {},
)
/* Pin the colour scheme so the captured markup is deterministic across machines. */
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  colorScheme: 'light',
})

/**
 * Sections animate in on scroll (`whileInView`), so a page captured without
 * scrolling bakes `opacity: 0` into everything below the fold — the content is
 * in the HTML but reads as hidden. Walk the page first so every reveal fires;
 * `viewport={{ once: true }}` means they stay put afterwards.
 */
async function revealAllSections(page) {
  await page.evaluate(async () => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = '' // an open case study locks scrolling

    const step = Math.round(window.innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 400))
    window.scrollTo(0, 0)

    document.body.style.overflow = previousOverflow
  })
}

/**
 * Safety net for any entry animation still parked at its "before" state.
 * Overlays that are hidden by design (hover spotlights and the like) set only
 * opacity, so keying off transform/filter leaves them alone.
 */
async function landPendingAnimations(page) {
  return page.evaluate(() => {
    let fixed = 0
    for (const el of document.querySelectorAll('[style*="opacity: 0"]')) {
      const style = el.getAttribute('style') ?? ''
      if (!/transform:|filter:/.test(style)) continue
      el.style.opacity = '1'
      el.style.removeProperty('transform')
      el.style.removeProperty('filter')
      fixed += 1
    }
    return fixed
  })
}

/**
 * React portals (the case-study modal) render as direct children of <body>,
 * outside #root. Mounting only clears #root, so a captured portal would sit
 * there as dead markup while React renders a live duplicate beside it. Tag
 * them here; main.jsx drops anything tagged before the first render.
 */
async function tagPortalLeftovers(page) {
  return page.evaluate(() => {
    let tagged = 0
    for (const el of document.body.children) {
      if (el.id === 'root' || el.tagName === 'SCRIPT') continue
      el.setAttribute('data-prerendered', '')
      tagged += 1
    }
    return tagged
  })
}

let failures = 0

for (const route of allRoutes) {
  const url = `http://localhost:${PORT}${route}`
  try {
    await page.goto(url, { waitUntil: 'networkidle' })

    // Wait until React has actually put something in #root.
    await page.waitForFunction(
      () => {
        const el = document.getElementById('root')
        return el && el.innerText.trim().length > 500
      },
      { timeout: 30_000 },
    )

    // Case-study routes also need their modal mounted before we capture.
    if (route !== '/') {
      await page.waitForSelector('#case-study-title', { timeout: 30_000 })
    }

    await revealAllSections(page)
    await page.waitForTimeout(900) // let entry animations settle
    const landed = await landPendingAnimations(page)
    const tagged = await tagPortalLeftovers(page)

    const html = await page.evaluate(
      () => '<!doctype html>\n' + document.documentElement.outerHTML,
    )

    const out = join(DIST, route === '/' ? 'index.html' : join(route, 'index.html'))
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html, 'utf8')

    const title = await page.title()
    console.log(
      `prerendered ${route.padEnd(38)} (${(html.length / 1024).toFixed(1)} kB, ` +
        `${landed} animations landed, ${tagged} portal node${tagged === 1 ? '' : 's'})  ` +
        `"${title.slice(0, 48)}"`,
    )
  } catch (error) {
    failures += 1
    console.error(`FAILED ${route}: ${error.message}`)
  }
}

await browser.close()
server.close()

if (failures > 0) {
  /* A silently unprerendered route ships an empty page to crawlers — fail loudly. */
  console.error(`\n${failures} route(s) failed to prerender.`)
  process.exit(1)
}
