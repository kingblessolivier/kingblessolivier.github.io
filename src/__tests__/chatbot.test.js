import { describe, it, expect } from 'vitest'
import { getResponse } from '../components/ChatbotWidget'

describe('chatbot getResponse', () => {
  it('answers project questions with real project names', () => {
    const reply = getResponse('show me your projects')
    expect(reply).toMatch(/MedLink|Candidate|CineRec/)
  })

  it('answers skill questions with the stack', () => {
    const reply = getResponse('what is your tech stack?')
    expect(reply.toLowerCase()).toMatch(/react|python|django/)
  })

  it('returns contact details when asked', () => {
    const reply = getResponse('how can I contact you')
    expect(reply).toMatch(/@/)
  })

  it('greets back', () => {
    expect(getResponse('hello').toLowerCase()).toMatch(/hey|hi|olivierbot/)
  })

  it('falls back gracefully on empty / unknown input', () => {
    expect(getResponse('')).toBeTruthy()
    expect(getResponse('asdkjhasd')).toBeTruthy()
  })
})
