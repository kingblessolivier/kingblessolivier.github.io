import { describe, it, expect, vi } from 'vitest'
import { bar, processCommand } from '../components/InteractiveTerminal'

const ctx = (over = {}) => ({
  navigate: vi.fn(),
  toggleTheme: vi.fn(),
  theme: 'dark',
  onClose: vi.fn(),
  ...over,
})

describe('terminal bar()', () => {
  it('renders a 10-cell bar proportional to the level', () => {
    expect(bar(0)).toBe('░'.repeat(10))
    expect(bar(100)).toBe('█'.repeat(10))
    expect(bar(50)).toBe('█'.repeat(5) + '░'.repeat(5))
  })
})

describe('terminal processCommand', () => {
  it('returns nothing for empty input', () => {
    expect(processCommand('   ', ctx())).toEqual([])
  })

  it('help lists navigation commands', () => {
    const out = processCommand('help', ctx())
    const text = JSON.stringify(out)
    expect(text).toMatch(/NAVIGATION/)
    expect(text).toMatch(/cd <section>/)
  })

  it('whoami reports the role', () => {
    const out = processCommand('whoami', ctx())
    expect(JSON.stringify(out)).toMatch(/Full-Stack Engineer/)
  })

  it('cd navigates to a known section', () => {
    const c = ctx()
    const out = processCommand('cd projects', c)
    expect(c.navigate).toHaveBeenCalledWith('projects')
    expect(out[0].t).toBe('success')
  })

  it('cd to an unknown section errors without navigating', () => {
    const c = ctx()
    const out = processCommand('cd nowhere', c)
    expect(c.navigate).not.toHaveBeenCalled()
    expect(out[0].t).toBe('error')
  })

  it('unknown command returns an error + hint', () => {
    const out = processCommand('frobnicate', ctx())
    expect(out[0].t).toBe('error')
    expect(JSON.stringify(out)).toMatch(/help/)
  })

  it('theme toggles', () => {
    const c = ctx()
    processCommand('theme', c)
    expect(c.toggleTheme).toHaveBeenCalled()
  })
})
