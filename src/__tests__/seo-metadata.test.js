import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, metaForRoute } from '../lib/seo'
import { routedProjects } from '../lib/projectRoutes'

/**
 * index.html's <head> and src/lib/seo.js describe the same page to two
 * different readers: the static file is what a crawler that does not run
 * JavaScript sees, and seo.js is what the SPA writes once React mounts. When
 * they disagree, whichever one a given crawler read wins — so pin them
 * together rather than trusting whoever edits one to remember the other.
 */
const html = readFileSync('index.html', 'utf8')

const attr = (selector, attribute = 'content') => {
  const pattern = new RegExp(`<meta ${selector} ${attribute}="([^"]*)"`)
  const match = pattern.exec(html)
  expect(match, `no <meta ${selector}> in index.html`).not.toBeNull()
  return match[1].replace(/&amp;/g, '&')
}

describe('home page <head>', () => {
  it('ships the same title the SPA sets on mount', () => {
    const title = /<title>([^<]*)<\/title>/.exec(html)[1].replace(/&amp;/g, '&')
    expect(title).toBe(DEFAULT_TITLE)
  })

  it('ships the same description the SPA sets on mount', () => {
    expect(attr('name="description"')).toBe(DEFAULT_DESCRIPTION)
  })

  it('mirrors title and description into the social cards', () => {
    expect(attr('property="og:title"')).toBe(DEFAULT_TITLE)
    expect(attr('property="twitter:title"')).toBe(DEFAULT_TITLE)
    expect(attr('property="og:description"')).toBe(DEFAULT_DESCRIPTION)
    expect(attr('property="twitter:description"')).toBe(DEFAULT_DESCRIPTION)
  })

  it('points every page at the custom domain, not the hosting origin', () => {
    expect(html).toContain('<link rel="canonical" href="https://nsolivier.me/" />')
    expect(attr('property="og:url"')).toBe('https://nsolivier.me/')
  })
})

describe('titles as a search result reads them', () => {
  it('leads with the name, because the name is the query', () => {
    expect(DEFAULT_TITLE.startsWith(SITE_NAME)).toBe(true)
  })

  it('stays inside the width Google renders before truncating', () => {
    // Roughly 60 characters; past that the tail is replaced with an ellipsis,
    // which is fine for the stack but not for the name or the location.
    expect(DEFAULT_TITLE.length).toBeLessThanOrEqual(65)
  })

  it('keeps the description inside the snippet budget', () => {
    expect(DEFAULT_DESCRIPTION.length).toBeLessThanOrEqual(160)
  })

  it('names the role and the city, the two things that separate the namesakes', () => {
    expect(DEFAULT_TITLE).toMatch(/Full-Stack/i)
    expect(DEFAULT_TITLE).toMatch(/Kigali/)
    expect(DEFAULT_DESCRIPTION).toMatch(/Kigali, Rwanda/)
  })

  it('attributes every case study to the same name', () => {
    routedProjects.forEach((project) => {
      const { title, description } = metaForRoute(project)
      expect(title).toContain(SITE_NAME)
      expect(description).toContain(SITE_NAME)
    })
  })
})
