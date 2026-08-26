import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { projectPath, routedProjects } from '../lib/projectRoutes'

/**
 * The portfolio once linked MedLink to `kingblessolivier/medlink-system`, a
 * repository that does not exist, and Property Management to a private one —
 * two 404s on the projects a reader is most likely to click. Nothing caught it
 * because nothing checked.
 *
 * A unit test cannot dial GitHub, so it cannot prove a URL resolves. What it
 * can do is pin the shape of every link and keep the three lists that describe
 * the same eight-or-nine projects — the data, the JSON-LD graph, and the
 * no-JavaScript fallback — from drifting apart, which is the other half of how
 * that bug survived.
 */
const html = readFileSync('index.html', 'utf8')

describe('project links', () => {
  it('gives every project an absolute https repository URL', () => {
    routedProjects.forEach((project) => {
      expect(project.link, `${project.name} has no link`).toMatch(/^https:\/\/\S+$/)
      expect(project.link).not.toMatch(/\s/)
    })
  })

  it('points every repository link at an owned account', () => {
    routedProjects.forEach((project) => {
      expect(project.link, `${project.name} links off-account`).toMatch(
        /^https:\/\/github\.com\/kingblessolivier\/[\w.-]+$/,
      )
    })
  })

  it('accepts a demo only as an absolute https URL', () => {
    routedProjects
      .filter((project) => project.demo)
      .forEach((project) => {
        expect(project.demo, `${project.name} demo is malformed`).toMatch(/^https:\/\/\S+\/$/)
      })
  })

  it('has at least one project with a live demo', () => {
    // A running app is the strongest evidence on the page. If this ever drops
    // to zero, the demos were lost in an edit rather than removed on purpose.
    expect(routedProjects.some((project) => project.demo)).toBe(true)
  })
})

describe('the three project lists agree', () => {
  const graph = JSON.parse(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)[1],
  )['@graph']
  const itemList = graph.find((node) => node['@type'] === 'ItemList')

  it('lists the same projects in the JSON-LD ItemList, in the same order', () => {
    expect(itemList.itemListElement.map((item) => item.name)).toEqual(
      routedProjects.map((project) => project.name),
    )
  })

  it('gives each ItemList entry the URL the router actually serves', () => {
    itemList.itemListElement.forEach((item, index) => {
      expect(item.url).toBe(`https://nsolivier.me${projectPath(routedProjects[index])}`)
      expect(item.position).toBe(index + 1)
    })
  })

  it('names every project in the no-JavaScript fallback too', () => {
    // This markup is what Bing, LinkedIn and Slack read when a deploy ships
    // unprerendered, so a project missing here is a project they never see.
    routedProjects.forEach((project) => {
      expect(html, `${project.name} missing from the fallback`).toContain(
        `href="${projectPath(project)}"`,
      )
    })
  })
})
