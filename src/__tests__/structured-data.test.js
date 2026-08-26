import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Google Search Console rejected the home page with `Missing field "mainEntity"`:
 * a ProfilePage is only eligible for rich results when it points at the person
 * it profiles through `mainEntity`. `about` is the more general property and
 * does not satisfy the check, so guard the requirement here.
 *
 * The rest of these tests guard the name-entity signals. "Nsengimana Olivier"
 * is a name several public figures share, so the graph has to say clearly and
 * consistently which one this page is about; a well-meaning edit that drops an
 * alias or the disambiguating description quietly gives that ground back.
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

describe('name entity', () => {
  const person = graphOf('index.html').find((node) => node['@type'] === 'ProfilePage').mainEntity
  const names = [person.name, ...person.alternateName]

  it('carries every spelling of the name people actually search for', () => {
    // Surname-first is the Rwandan convention and the one the hero uses;
    // given-name-first is how LinkedIn and most Western profiles write it.
    // Both have to resolve to this one entity.
    expect(names).toContain('Nsengimana Olivier')
    expect(names).toContain('NSENGIMANA Olivier')
    expect(names).toContain('Olivier Nsengimana')
  })

  it('links the GitHub handle to the same person', () => {
    expect(names).toContain('kingblessolivier')
    expect(person.sameAs).toContain('https://github.com/kingblessolivier')
  })

  it('splits the name so a parser knows which part is the surname', () => {
    expect(person.givenName).toBe('Olivier')
    expect(person.familyName).toBe('Nsengimana')
  })

  it('says which same-name entity this is', () => {
    expect(person.disambiguatingDescription).toEqual(expect.any(String))
    expect(person.disambiguatingDescription.length).toBeGreaterThan(40)
  })

  it('states the occupation, its location and its skills', () => {
    expect(person.jobTitle).toMatch(/Full-Stack/i)
    expect(person.hasOccupation).toMatchObject({ '@type': 'Occupation' })
    expect(person.hasOccupation.occupationLocation.name).toMatch(/Kigali/)
    expect(person.hasOccupation.skills.length).toBeGreaterThan(0)
  })

  it('claims every profile that should collapse into this entity', () => {
    // sameAs is how a search engine merges the scattered profiles into one
    // person. A profile missing here is a profile ranking on its own instead.
    const required = ['github.com', 'linkedin.com', 'x.com', 'instagram.com']
    required.forEach((host) => {
      expect(person.sameAs.some((url) => url.includes(host)), `no ${host} in sameAs`).toBe(true)
    })
  })
})
