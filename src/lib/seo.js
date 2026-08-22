/**
 * Per-route document metadata.
 *
 * The site is a client-rendered SPA, so the `<head>` that ships in index.html
 * only describes the home page. Every route needs its own title, description,
 * canonical URL and social card, otherwise the prerendered project pages all
 * look like duplicates of `/` to a crawler.
 */
import { useEffect } from 'react'
import { projectPath } from './projectRoutes'

/**
 * The canonical home of the site. The Netlify deployment serves the same
 * content, so it points here too rather than competing with it in search.
 */
export const SITE_ORIGIN = 'https://nsolivier.me'
export const SITE_NAME = 'NSENGIMANA Olivier'
export const DEFAULT_IMAGE = `${SITE_ORIGIN}/olivier_hero.jpeg`

export const DEFAULT_TITLE =
  'NSENGIMANA Olivier — Software Engineer in Kigali, Rwanda | React, Django, AI Systems'
export const DEFAULT_DESCRIPTION =
  'NSENGIMANA Olivier is a software engineer in Kigali, Rwanda, building intelligent, ' +
  'scalable systems with React, Django, Next.js and machine learning. Case studies, ' +
  'skills and contact details.'

const absolute = (path) => `${SITE_ORIGIN}${path === '/' ? '/' : path}`

/** Metadata for the home page or for a single case study. */
export function metaForRoute(project, language = 'EN') {
  if (!project) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonical: absolute('/'),
      image: DEFAULT_IMAGE,
    }
  }

  const summary = project.description[language] ?? project.description.EN
  return {
    title: `${project.name} — case study by NSENGIMANA Olivier`,
    description: `${summary} Architecture, engineering role and impact, built by NSENGIMANA Olivier in Kigali, Rwanda.`,
    canonical: absolute(projectPath(project)),
    image: DEFAULT_IMAGE,
  }
}

function setMeta(selector, attribute, value) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [, name, key] = /\[(.+?)="(.+?)"\]/.exec(selector) ?? []
    if (name && key) tag.setAttribute(name, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, value)
}

/** schema.org description of a single case study, for rich results. */
function projectJsonLd(project, language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    headline: `${project.name} — case study`,
    description: project.description[language] ?? project.description.EN,
    url: absolute(projectPath(project)),
    genre: project.category,
    keywords: project.tech.join(', '),
    codeRepository: project.link,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: 'NSENGIMANA Olivier',
      url: `${SITE_ORIGIN}/`,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: `${SITE_NAME} — Portfolio`,
      url: `${SITE_ORIGIN}/`,
    },
  }
}

/** Keeps <head> in sync with the active route. */
export function useDocumentMeta(project, language = 'EN') {
  useEffect(() => {
    const { title, description, canonical, image } = metaForRoute(project, language)

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[property="og:type"]', 'content', project ? 'article' : 'profile')
    setMeta('meta[property="twitter:title"]', 'content', title)
    setMeta('meta[property="twitter:description"]', 'content', description)
    setMeta('meta[property="twitter:image"]', 'content', image)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)

    // Case-study structured data only exists while a case study is open.
    const existing = document.getElementById('route-jsonld')
    if (existing) existing.remove()
    if (project) {
      const script = document.createElement('script')
      script.id = 'route-jsonld'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(projectJsonLd(project, language))
      document.head.appendChild(script)
    }
  }, [project, language])
}
