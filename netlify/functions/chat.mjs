import Anthropic from '@anthropic-ai/sdk'
import { portfolioData } from '../../src/assets/data.js'

/* Model is configurable; defaults to the latest Opus. Set CLAUDE_MODEL to
   claude-haiku-4-5 or claude-sonnet-4-6 in the Netlify dashboard to trade
   cost/latency for this public-facing assistant. */
const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-8'

const JSON_HEADERS = { 'content-type': 'application/json' }

/* Build a compact, factual system prompt from the single source of truth (data.js). */
function buildSystemPrompt() {
  const p = portfolioData
  const projects = p.projects
    .map((pr) => `- ${pr.name} (${pr.category}; ${pr.tech.join(', ')}): ${pr.description.EN}`)
    .join('\n')
  const skills = Object.entries(p.skills)
    .map(([cat, list]) => `${cat}: ${list.map((s) => s.name).join(', ')}`)
    .join('; ')
  const awards = p.achievements.map((a) => `${a.title.EN} (${a.issuer}, ${a.year})`).join('; ')
  const experience = p.workExperience.map((w) => `${w.role.EN} @ ${w.company} (${w.duration.EN})`).join('; ')
  const edu = p.education.map((e) => `${e.degree.EN} at ${e.institution.EN}, expected ${e.expectedGraduation}`).join('; ')

  return `You are OlivierBot, the friendly AI assistant embedded in NSENGIMANA Olivier's portfolio website.
Answer questions about Olivier using ONLY the facts below. If something isn't covered, say so briefly and point the visitor to the contact section — never invent details.

ABOUT
Name: ${p.personal.name}
Title: ${p.personal.title}
Location: ${p.personal.location}
Email: ${p.personal.email}
Story: ${p.personal.story.EN}
Vision: ${p.vision.statement.EN}

PROJECTS
${projects}

SKILLS
${skills}

EXPERIENCE
${experience}

EDUCATION
${edu}

AWARDS
${awards}

STYLE
- Be warm, concise, and specific. Default to 1-3 short sentences; use a short list only when it genuinely helps.
- Reply in the visitor's language (English, Kinyarwanda, or French) when it is clear from their message.
- Respond only with the final answer — no internal reasoning, no preamble like "Based on the info...".
- Encourage visitors to explore the relevant section of the site or reach out via the Contact form when appropriate.`
}

/* Keep the conversation safe and bounded before sending it to the model. */
function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return []
  let msgs = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-12) // last 12 turns is plenty of context
  // The Messages API requires the first message to be from the user.
  while (msgs.length && msgs[0].role !== 'user') msgs.shift()
  return msgs
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: JSON_HEADERS })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Not configured — signal the client to use its built-in offline fallback.
    return new Response(JSON.stringify({ error: 'not_configured' }), { status: 503, headers: JSON_HEADERS })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400, headers: JSON_HEADERS })
  }

  const messages = sanitizeMessages(body.messages)
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'no_messages' }), { status: 400, headers: JSON_HEADERS })
  }

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages,
    })
    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()
    return new Response(JSON.stringify({ reply, model: response.model }), { status: 200, headers: JSON_HEADERS })
  } catch (err) {
    const status = err?.status === 429 ? 429 : 502
    return new Response(JSON.stringify({ error: 'upstream_error' }), { status, headers: JSON_HEADERS })
  }
}
