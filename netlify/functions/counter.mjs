import { getStore } from '@netlify/blobs'

const JSON_HEADERS = { 'content-type': 'application/json' }
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS })

/* Global visit counter backed by Netlify Blobs (no third-party service).
   GET  → read the current total.
   POST → increment, then return the new total. */
export default async (req) => {
  try {
    const store = getStore('portfolio-visits')
    const current = Number(await store.get('count')) || 0

    if (req.method === 'POST') {
      const next = current + 1
      await store.set('count', String(next))
      return json({ count: next })
    }
    return json({ count: current })
  } catch {
    // Blobs unavailable (e.g. local dev without the Netlify runtime) — let the client fall back.
    return json({ error: 'unavailable' }, 503)
  }
}
