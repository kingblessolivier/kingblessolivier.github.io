import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  allRoutes,
  projectBySlug,
  projectPath,
  routedProjects,
  slugFromPath,
  slugify,
} from '../lib/projectRoutes'
import { projects } from '../assets/data'

describe('project routes', () => {
  it('gives every project a URL-safe slug', () => {
    expect(routedProjects).toHaveLength(projects.length)
    routedProjects.forEach((project) => {
      expect(project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })
  })

  it('never assigns the same slug twice', () => {
    const slugs = routedProjects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('builds paths with a trailing slash so hosts serve them without redirecting', () => {
    routedProjects.forEach((project) => {
      expect(projectPath(project)).toBe(`/projects/${project.slug}/`)
    })
  })

  it('round-trips a path back to its project, with or without the trailing slash', () => {
    routedProjects.forEach((project) => {
      expect(projectBySlug(slugFromPath(projectPath(project)))).toBe(project)
      expect(projectBySlug(slugFromPath(`/projects/${project.slug}`))).toBe(project)
    })
  })

  it('treats non-project paths as no project', () => {
    ;['/', '/about', '/projects', '/projects/', '/projects/nope/deep'].forEach((path) => {
      expect(projectBySlug(slugFromPath(path))).toBeNull()
    })
    expect(projectBySlug(slugFromPath('/projects/not-a-real-project'))).toBeNull()
  })

  it('slugifies punctuation and spacing predictably', () => {
    expect(slugify('MedLink System')).toBe('medlink-system')
    expect(slugify('  AI/ML  Screening!  ')).toBe('ai-ml-screening')
  })

  it('lists the home page plus every project', () => {
    expect(allRoutes[0]).toBe('/')
    expect(allRoutes).toHaveLength(projects.length + 1)
  })
})

describe('sitemap.xml', () => {
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')

  it('lists exactly the routes the site serves', () => {
    const listed = [...sitemap.matchAll(/<loc>https:\/\/nsolivier\.me(\/[^<]*)<\/loc>/g)].map(
      (m) => m[1],
    )
    expect(listed.sort()).toEqual([...allRoutes].sort())
  })
})
