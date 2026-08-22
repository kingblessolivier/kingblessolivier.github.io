/**
 * Project routes.
 *
 * Each case study gets a real URL (`/projects/<slug>`) so it can be linked,
 * shared and indexed on its own, instead of only existing behind a modal on
 * `/`. The same slug list drives the sitemap and the prerender step, so the
 * three can never drift apart.
 */
import { projects } from '../assets/data.js'

export const PROJECTS_BASE = '/projects'

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** The project list with a stable `slug` on each entry. */
export const routedProjects = projects.map((project) => ({
  ...project,
  slug: slugify(project.name),
}))

/**
 * Paths keep their trailing slash: GitHub Pages serves `/projects/x/` straight
 * from `projects/x/index.html`, but 301-redirects `/projects/x` to it. Linking
 * to the slashed form keeps crawlers off that redirect.
 */
export const projectPath = (project) => `${PROJECTS_BASE}/${slugify(project.name)}/`

/** Every path the site should serve — used by the sitemap and the prerenderer. */
export const allRoutes = ['/', ...routedProjects.map((p) => `${PROJECTS_BASE}/${p.slug}/`)]

/** `/projects/medlink-system` -> the slug, or null for any other path. */
export function slugFromPath(pathname) {
  const match = /^\/projects\/([a-z0-9-]+)\/?$/.exec(pathname)
  return match ? match[1] : null
}

export const projectBySlug = (slug) =>
  slug ? routedProjects.find((project) => project.slug === slug) ?? null : null
