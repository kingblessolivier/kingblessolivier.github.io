import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Google Search Console rejected the home page with `Missing field "mainEntity"`:
 * a ProfilePage is only eligible for rich results when it points at the person
 * it profiles through `mainEntity`. `about` is the more general property and
 * does not satisfy the check, so guard the requirement here.
 */
function graphOf(file) {
  const html = readFileSync(file, 'utf8')
  const block = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)
  expect(block, `no JSON-LD in ${file}`).not.toBeNull()
  const data = JSON.parse(block[1])
  return data['@graph'] ?? [data]
}

describe('home page structured data', () => {
  const graph = graphOf('index.html')
  const profilePage = graph.find((node) => node['@type'] === 'ProfilePage')

  it('describes the page as a ProfilePage', () => {
    expect(profilePage).toBeDefined()
  })

  it('names the profiled person in mainEntity, not just about', () => {
    // Nested rather than referenced by @id: the person then reads straight off
    // the ProfilePage, with no cross-node lookup for a parser to get wrong.
    expect(profilePage.mainEntity).toMatchObject({
      '@type': 'Person',
      name: expect.any(String),
    })
    expect(profilePage.mainEntity.name.length).toBeGreaterThan(0)
  })

  it('keeps the person addressable, so other nodes can still reference it', () => {
    expect(profilePage.mainEntity['@id']).toBe('https://nsolivier.me/#person')

    const website = graph.find((node) => node['@type'] === 'WebSite')
    expect(website.publisher['@id']).toBe(profilePage.mainEntity['@id'])
  })
})
