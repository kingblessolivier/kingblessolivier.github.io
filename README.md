# kingblessolivier.github.io

Source for my personal site, live at **[nsolivier.me](https://nsolivier.me/)**.

A premium personal portfolio website for NSENGIMANA Olivier, built with React, Vite, Tailwind CSS, and Framer Motion.

## Deployment (GitHub Pages)

The site is served by GitHub Pages from the **`docs/` folder on `main`**, and
`docs/` is a committed build artifact. `npm run build` regenerates it.

```bash
npm run build     # rebuilds docs/, including a prerendered file per route
git add docs && git commit -m "Rebuild site" && git push
```

Pages picks up the new commit and republishes within a minute or so.

- **Pages source**: Settings → Pages → Build and deployment → *Deploy from a
  branch*, branch `main`, folder `/docs`.
- **Why the build is committed**: GitHub Actions does not currently run on this
  account — every workflow run across this repo and `Portifolio` fails at
  startup without reaching a runner, billing zero minutes. A CI-built deploy
  would never publish, so the build output is committed instead. If Actions
  starts working, this can be swapped back for a workflow that builds and
  deploys on each push.
- **Custom domain**: `public/CNAME` holds `nsolivier.me`. Vite copies `public/`
  verbatim into the output, so the domain is reproduced on every build. Change
  it there, not in the GitHub UI, or the next build will drop it.
- **`.nojekyll`**: `public/.nojekyll` stops Pages from running the output
  through Jekyll.
- **Deep links**: every route is prerendered to its own file
  (`docs/projects/<slug>/index.html`), so Pages serves real pages instead of
  rewriting unknown paths to the app. `public/404.html` is a genuine not-found
  page — it used to be a copy of `index.html`, which returned a full page of
  content under a 404 status and read as a soft 404 to search engines.
- **Prerendering**: `npm run build` runs `prerender.mjs` after Vite, which loads
  each route in headless Chromium and writes the rendered HTML back over the
  output. Without it the site ships as an empty `<div id="root">`, which
  crawlers that do not run JavaScript (Bing, LinkedIn, Slack, X) see as a blank
  page. Requires Chromium once: `npx playwright install --with-deps chromium`.

> Rebuild before committing content changes — editing `src/` alone changes
> nothing on the live site until `docs/` is regenerated.

## Overview

This project showcases:

- Professional profile and hero section
- Projects and case-study style details
- Skills and system design highlights
- Awards and gallery
- Work experience and education
- Contact section and social links
- Theme and interaction-focused UI (animations and micro-interactions)

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- React Icons

## Production & Performance

- **Code splitting**: third-party libraries (React, Framer Motion, React Icons) are
  emitted as separate cacheable chunks via Vite `manualChunks`, keeping the main
  bundle small for returning visitors.
- **SEO**: every route is prerendered to static HTML, and each of the eight case
  studies has its own indexable URL (`/projects/<slug>/`) with a route-specific
  title, description, canonical and `CreativeWork` structured data. The home page
  carries a `Person` / `WebSite` / `ProfilePage` / `ItemList` JSON-LD graph, and
  `robots.txt` and `sitemap.xml` are generated to match the route list.
- **Images**: photos are served as WebP sized to how large they actually render
  (the hero drops 137 kB to 40 kB); the JPEGs stay for `og:image`, which social
  platforms prefer.
- **PWA polish**: SVG favicon, `site.webmanifest`, and light/dark `theme-color`.
- **Resilience**: the language switcher falls back to emoji flags if the external
  flag CDN is unavailable, so the UI never shows broken images.
- **Accessibility**: honors `prefers-reduced-motion` to tone down animation.

## Dynamic Features (serverless)

These features call serverless functions in `netlify/functions/` and **degrade
gracefully** — if a function isn't configured or is unreachable, the UI falls
back to a built-in offline behaviour, so the site never breaks.

> **On GitHub Pages** there is no server, so the `chat`, `counter`, and
> `contact` functions never run. Each one takes its documented fallback: the
> chatbot answers from the built-in keyword bot, the visit counter tracks a
> per-browser count, and the contact form posts to Formspree (then `mailto:`).
> Live GitHub stats call the public GitHub API directly and work unchanged.
> The `netlify/` directory and `netlify.toml` are kept for parity with the
> source repo and are inert here.

- **AI assistant** (`chat`) — the chatbot is powered by Claude via the Anthropic
  SDK, answering from the portfolio data in `src/assets/data.js`. Falls back to a
  keyword bot when no API key is set.
- **Live GitHub stats** (`GitHubStats.jsx`) — fetches real repos, stars,
  languages, and notable projects from the public GitHub API (cached 1h in
  `localStorage`, with loading/error states). No keys required.
- **Visit counter** (`counter`) — a global counter backed by Netlify Blobs (no
  third-party service). Falls back to a per-browser local count.
- **Contact form** (`contact`) — delivers messages straight to your inbox.
  Configure **one** provider (see below); if none is set it falls back to a
  pre-filled `mailto:` link.

### Environment variables

Copy `.env.example` and set what you need (all optional — each has a fallback):

| Variable | Used by | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `chat` | Enables the real Claude assistant |
| `CLAUDE_MODEL` | `chat` | Model override (default `claude-opus-4-8`) |
| `RESEND_API_KEY` | `contact` | Enables serverless email sending |
| `CONTACT_TO` / `CONTACT_FROM` | `contact` | Recipient / sender overrides |
| `VITE_FORMSPREE_ENDPOINT` | contact fallback | Formspree endpoint (client-side) |

The visit counter needs no configuration on Netlify.

### Receiving contact messages by email

Pick **one** option, then set the variable in **Netlify → Site settings →
Environment variables** and redeploy. Until one is set, the form opens a
pre-filled email draft (`mailto:`) as a fallback.

**Option A — Bird (bird.com)**
1. In your Bird dashboard, set up an **Email channel** (verify the sending domain).
2. Create an **access key** (Settings → Access keys).
3. Find your **workspace ID** and the **email channel ID** (Channels → your email channel).
4. Set `BIRD_ACCESS_KEY`, `BIRD_WORKSPACE_ID`, `BIRD_CHANNEL_ID`, and `CONTACT_TO`
   (the address that should receive messages). Submissions are sent via the Bird
   Channels API: `POST /workspaces/{id}/channels/{id}/messages`.

**Option B — Formspree (~2 minutes, no API key)**
1. Sign up at [formspree.io](https://formspree.io) and create a form pointed at your email.
2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Set `FORMSPREE_ENDPOINT` to that URL. Done — every submission is emailed to you.

**Option C — Resend (transactional email API)**
1. Create an account at [resend.com](https://resend.com) and generate an API key.
2. Set `RESEND_API_KEY`. On the free tier (no verified domain) emails can only be
   sent to the address you signed up with, so set `CONTACT_TO` to that same email.
3. Optionally verify a domain and set `CONTACT_FROM` to send from your own address.

The form tries the serverless function first and shows a success state when the
message is delivered.

## Testing & CI

- **Unit tests** (Vitest): `npm test` — covers the chatbot responses, terminal
  command processor, and portfolio data integrity.
- **CI** (`.github/workflows/ci.yml`): declares install → test → install
  Chromium → build on every push/PR. Kept from the source repo, but note that Actions is not currently
  running on this account (see [Deployment](#deployment-github-pages)), so this
  workflow fails at startup rather than executing. Run `npm test` locally
  instead until that is resolved.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start local development server
- `npm run build`: Rebuild and prerender the published site into `docs/` (commit it to deploy)
- `npm run preview`: Preview production build locally

## Project Structure

```text
portfolio_N/
	src/
		assets/        # Images and portfolio data
		components/    # Reusable UI components
		lib/           # Route slugs and per-route document metadata
		sections/      # Page sections (Hero, Skills, Projects, etc.)
		App.jsx        # Main page composition
	index.html
	prerender.mjs    # Post-build static rendering of every route
	vite.config.js
```

## Customization

- Update profile content, projects, skills, and labels in `src/assets/data.js`.
- Replace images in the project root or asset folders as needed.
- Adjust styles and visual tokens in your global style files.

## Build For Production

```bash
npm run build
```

The generated static files land in `docs/`, which is committed and served
directly by GitHub Pages — see [Deployment](#deployment-github-pages) above for
the rebuild-and-push flow.

## License

This project is for personal portfolio use.
