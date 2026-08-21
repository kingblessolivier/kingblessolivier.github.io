import { portfolioData } from '../../src/assets/data.js'

const JSON_HEADERS = { 'content-type': 'application/json' }
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS })

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
const esc = (s) => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

/* Deliver via Bird (bird.com) Channels API — email channel. */
async function sendViaBird({ name, email, message }) {
  const ws = process.env.BIRD_WORKSPACE_ID
  const ch = process.env.BIRD_CHANNEL_ID
  const key = process.env.BIRD_ACCESS_KEY
  const to = process.env.CONTACT_TO || portfolioData.personal.email
  const res = await fetch(`https://api.bird.com/workspaces/${ws}/channels/${ch}/messages`, {
    method: 'POST',
    headers: { Authorization: `AccessKey ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      receiver: { contacts: [{ identifierKey: 'emailaddress', identifierValue: to }] },
      body: {
        type: 'html',
        html: {
          metadata: { subject: `Portfolio message from ${name}` },
          html: `<h2>New portfolio message</h2>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Message:</strong></p>
<p>${esc(message).replace(/\n/g, '<br>')}</p>`,
          text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
        },
      },
    }),
  })
  return res.ok
}

/* Deliver via Resend (transactional email API). */
async function sendViaResend(apiKey, { name, email, message }) {
  const to = process.env.CONTACT_TO || portfolioData.personal.email
  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: `<h2>New portfolio message</h2>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Message:</strong></p>
<p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    }),
  })
  return res.ok
}

/* Deliver via a Formspree endpoint (no API key — Formspree emails the owner). */
async function sendViaFormspree(endpoint, { name, email, message }) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name,
      email,
      message,
      _replyto: email,
      _subject: `Portfolio message from ${name}`,
    }),
  })
  return res.ok
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const birdReady = process.env.BIRD_ACCESS_KEY && process.env.BIRD_WORKSPACE_ID && process.env.BIRD_CHANNEL_ID
  const resendKey = process.env.RESEND_API_KEY
  const formspree = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xrenlkdz'
  // No provider configured — let the client use its mailto fallback.
  if (!birdReady && !resendKey && !formspree) return json({ error: 'not_configured' }, 503)

  let body
  try { body = await req.json() } catch { return json({ error: 'invalid_json' }, 400) }

  const name = String(body?.name ?? '').trim().slice(0, 120)
  const email = String(body?.email ?? '').trim().slice(0, 200)
  const message = String(body?.message ?? '').trim().slice(0, 5000)
  if (!name || !isEmail(email) || message.length < 12) {
    return json({ error: 'validation_failed' }, 422)
  }

  const payload = { name, email, message }
  try {
    // Try providers in order; fall through to the next if a send fails.
    if (birdReady && (await sendViaBird(payload))) return json({ ok: true, via: 'bird' })
    if (resendKey && (await sendViaResend(resendKey, payload))) return json({ ok: true, via: 'resend' })
    if (formspree && (await sendViaFormspree(formspree, payload))) return json({ ok: true, via: 'formspree' })
    return json({ error: 'send_failed' }, 502)
  } catch {
    return json({ error: 'send_failed' }, 502)
  }
}
