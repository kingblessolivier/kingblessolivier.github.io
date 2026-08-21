import { describe, it, expect } from 'vitest'
import {
  portfolioData,
  languages,
  uiContent,
  skills,
  projects,
  socialLinks,
} from '../assets/data'

describe('portfolio data integrity', () => {
  it('exposes the three supported languages', () => {
    expect(languages).toEqual(['EN', 'KINY', 'FR'])
    languages.forEach((lang) => {
      expect(uiContent[lang]).toBeTruthy()
      expect(uiContent[lang].nav).toBeTruthy()
    })
  })

  it('has core personal info', () => {
    const { personal } = portfolioData
    expect(personal.name).toMatch(/NSENGIMANA/i)
    expect(personal.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    expect(personal.location).toBeTruthy()
  })

  it('every project has the fields the UI renders', () => {
    expect(projects.length).toBeGreaterThan(0)
    projects.forEach((p) => {
      expect(typeof p.name).toBe('string')
      expect(p.name.length).toBeGreaterThan(0)
      expect(Array.isArray(p.tech)).toBe(true)
      expect(p.tech.length).toBeGreaterThan(0)
      expect(p.link).toMatch(/^https?:\/\//)
      expect(p.description.EN).toBeTruthy()
      expect(p.caseStudy).toBeTruthy()
    })
  })

  it('skill levels are sane percentages', () => {
    Object.values(skills).forEach((group) => {
      group.forEach((skill) => {
        expect(typeof skill.name).toBe('string')
        expect(skill.level).toBeGreaterThanOrEqual(0)
        expect(skill.level).toBeLessThanOrEqual(100)
      })
    })
  })

  it('social links are valid URLs', () => {
    Object.values(socialLinks).forEach((url) => {
      expect(url).toMatch(/^https?:\/\//)
    })
  })

  it('every gallery image is an absolute public path', () => {
    portfolioData.gallery.forEach((g) => {
      expect(g.image.startsWith('/')).toBe(true)
    })
  })
})
