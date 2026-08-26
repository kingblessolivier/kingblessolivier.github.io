# Ranking for "Nsengimana Olivier"

The query is a **name**, and the name is already taken. A conservationist and an
athlete share it, both with years of press coverage behind them. Nothing here
outranks them on their own terms — press coverage is what it is. What works
instead is making it unmistakable that there is a *second* Nsengimana Olivier: a
software engineer in Kigali who ships code, so that Google resolves the query
into two entities rather than one, and shows this one too.

Everything below serves that. Three ideas recur:

1. **One entity, many spellings.** `NSENGIMANA Olivier`, `Nsengimana Olivier`,
   `Olivier Nsengimana` and `kingblessolivier` all have to point at the same
   person, or the signal splits four ways and none of the four is strong.
2. **Distinguishing attributes beat repetition.** "Software engineer",
   "Kigali", "University of Rwanda", "React", "Django" are what separate this
   entity from the namesakes. Repeating the bare name does not.
3. **Corroboration off-site.** A site can claim anything about itself. Search
   engines weigh the claim by how many other places agree with it — which is
   what steps 3 and 4 are really for.

Expect movement in weeks and a settled position in months. Name queries are
slow because entity resolution is slow.

---

## 01 — The portfolio site (done, in this repo)

The site is the anchor: it is the one page that should be the canonical answer
to the query. Shipped:

| Change | Where |
| --- | --- |
| Title and description lead with the name in the case people type it, then the role and the city | `index.html`, `src/lib/seo.js` |
| `Person` node names every spelling — surname-first, given-name-first, the GitHub handle — under one `@id` | `index.html` JSON-LD |
| `givenName` / `familyName` split, so a parser knows which word is the surname | `index.html` JSON-LD |
| `disambiguatingDescription` — schema.org's field for exactly this problem: which same-name entity is this | `index.html` JSON-LD |
| `hasOccupation` with the role, Kigali as `occupationLocation`, and the stack as `skills` | `index.html` JSON-LD |
| `sameAs` claiming GitHub, LinkedIn, X and Instagram, so the profiles merge into one entity | `index.html` JSON-LD |
| Case-study `CreativeWork` authors share the home page's Person `@id` — eight more pages of evidence for the same entity | `src/lib/seo.js` |
| The `<h1>` reads "Nsengimana Olivier — Full-Stack Software Engineer in Kigali, Rwanda, building AI systems" to a screen reader and a crawler, while the hero still draws the name as type | `src/sections/HeroSection.jsx` |
| Section headings carry their subject: "About *Nsengimana Olivier, full-stack software engineer in Kigali, Rwanda*", "Projects *built by Nsengimana Olivier*" | `src/components/SectionHeader.jsx` and the sections |
| Hero role lines cycle "Full-Stack Software Engineer" and "AI Systems Engineer" in all three languages | `src/assets/data.js` |
| Manifest, sitemap image caption and social cards use the same name and role wording | `public/site.webmanifest`, `public/sitemap.xml` |

Two test files keep this from rotting: `src/__tests__/seo-metadata.test.js`
pins `index.html`'s `<head>` to `src/lib/seo.js` (the static file is what a
crawler that does not run JavaScript reads; seo.js is what the SPA writes after
mount — when they disagree, whichever one a crawler happened to read wins), and
`src/__tests__/structured-data.test.js` guards the name aliases, the
disambiguating description and the `sameAs` list.

### One judgement call worth knowing about

The hero still draws **NSENGIMANA Olivier** in caps — it is the site's type
design and Rwandan surname-first convention. Everything in the metadata layer
now says **Nsengimana Olivier** instead, because that is how the query is typed
and how the rest of the web spells it, and because Google sometimes rewrites
all-caps titles in results. Both spellings are in `alternateName`, so nothing is
lost. If you would rather the caps form lead everywhere, change `SITE_NAME` and
`DEFAULT_TITLE` in `src/lib/seo.js` and rerun `npm test` — the parity test will
tell you which other files need to follow.

### Still open on the site

- **Speed and mobile.** Run [PageSpeed Insights](https://pagespeed.web.dev/) on
  `https://nsolivier.me/` and fix whatever lands red. The hero image is
  preloaded and the vendor bundles are split already, so the likely remaining
  wins are image dimensions (layout shift) and the Google Fonts request.
- **An `/about/` page.** A URL whose entire subject is the person is the
  strongest single page you can add for a name query. It was left out here
  because the site is one scrolling page and a second page covering the same
  ground competes with `/` rather than helping it. Worth doing only alongside
  step 04, where there is genuinely more to say.

---

## 02 — GitHub (partly done; the rest is yours)

GitHub ranks well on names, and it is the one profile that is unambiguously
about this Nsengimana Olivier.

**Done in this repo:** the README now leads with the name, the role, the city
and a link to nsolivier.me, and lists all eight case studies with descriptions
linking to their pages. Do the same in the README of every project repo you own
— each one is another page carrying the name.

**Do these by hand — they cannot be committed:**

1. **Profile bio** (Settings → Public profile). GitHub allows 160 characters:

   > Full-stack software engineer in Kigali, Rwanda. I build AI systems with React, Next.js, Django & ML. Portfolio → nsolivier.me

   Fill in **Name** as `Nsengimana Olivier`, **Company**, **Location**
   `Kigali, Rwanda`, and **Website** `https://nsolivier.me` (this one is a real
   link, and it is the highest-value backlink you own).

2. **Profile README.** Create a repo named `kingblessolivier` — same as your
   username — and put [`github-profile-readme.md`](github-profile-readme.md) in
   it as `README.md`. It renders at the top of your profile page.

3. **Pin your top six repos**, FrameAfrica, MedLink and TalentAI first.

4. **Topics on every repo** (About → ⚙ → Topics). Suggested, per project:
   `django`, `react`, `nextjs`, `nestjs`, `python`, `javascript`,
   `machine-learning`, `ai`, `rwanda`, `portfolio`. Topics are how people browse
   into a repo without searching for it by name.

5. **Repo descriptions.** One sentence each, naming what the project does — the
   table in this repo's README is a starting point.

---

## 03 — Backlinks

A link from a site Google already trusts is a vote that this entity exists.
Quality is the whole game; a hundred links from directories nobody reads move
nothing, and paid link schemes are a penalty risk. Aim for a dozen real ones.

**Free and immediate — profile links you control:**

- LinkedIn: put `https://nsolivier.me` in the **Website** field *and* in the
  About section. Set your headline to "Full-Stack Software Engineer | React,
  Django, AI Systems | Kigali, Rwanda".
- X (@NSENGIMANAOLIV4), Instagram (@blessking_): the URL field in each bio.
- Dev.to, Hashnode, Medium, Stack Overflow, GitLab, Behance if you use it — each
  has a website field on the profile.
- University of Rwanda student/alumni pages or project listings, if any exist.

**Earned — worth the effort, in rough order of value:**

- A guest post or a talk write-up on a Rwandan or pan-African developer blog,
  with a byline linking to nsolivier.me.
- Open-source contributions where a `CONTRIBUTORS` file or release notes name
  you. A merged PR on a well-trafficked project is a durable citation.
- Hackathon and award pages that list participants — the iStar hackathon
  certificate in the gallery suggests there is an organiser page to be listed on.
- Peers' portfolios and blogrolls. Ask directly; reciprocate.

**Anchor text:** ask for "Nsengimana Olivier" or "Nsengimana Olivier's
portfolio", not "click here" and not the bare URL. The anchor is part of what
tells Google what the destination is about. Vary it naturally; identical anchors
everywhere read as manufactured.

---

## 04 — Writing under your own name

This is the step that compounds, and the one nothing in this repo can do for
you: it needs articles that exist. Each one is another indexed page carrying
your name as its author, and the reason someone links to you without being asked.

**Where to publish.** Your own site keeps the SEO value; Dev.to and Hashnode
have distribution you do not. Do both: publish on nsolivier.me first, then
syndicate with a `rel="canonical"` pointing back at your copy, so the two are
not competing.

**Topics that are yours and nobody else's** — write from the case studies you
have already built, which is what makes them credible and hard to duplicate:

- What went wrong scaling FrameAfrica's newsroom pipeline, and what fixed it.
- Designing MedLink's appointment model around unreliable connectivity.
- Ranking candidate profiles without baking bias into the features.
- Django and Next.js in one system: where the seam belongs.

**Kinyarwanda.** The site already ships EN / KINY / FR copy. A Kinyarwanda
technical article has close to zero competition and is a genuine reason for
Rwandan developers and press to link to you. If you publish translations, give
each language its own URL and cross-link them with `hreflang` — do not put two
languages on one page.

**Author metadata on every post**, so the article and the person resolve to one
entity:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "…",
  "datePublished": "2026-01-01",
  "inLanguage": "en",
  "author": { "@id": "https://nsolivier.me/#person" },
  "publisher": { "@id": "https://nsolivier.me/#person" },
  "mainEntityOfPage": "https://nsolivier.me/writing/<slug>/"
}
```

The `@id` is the same one the home page uses, which is the whole point — the
post is not by *a* Nsengimana Olivier, it is by *this* one.

---

## 05 — Measuring, and what to do about it

**Set up once:**

1. **Google Search Console** — add `nsolivier.me` as a *domain* property (DNS
   TXT record), which covers every subdomain and both `http`/`https`. If you
   verify by HTML file instead, drop the file in `public/`; Vite copies
   `public/` verbatim into the build, so it survives every deploy. Verifying in
   `docs/` alone does not — `npm run build` empties that folder.
2. **Submit the sitemap**: `https://nsolivier.me/sitemap.xml`.
3. **Request indexing** for `/` after this change ships, via URL Inspection.
4. **Rich Results Test** on `https://nsolivier.me/` — confirm the ProfilePage
   and Person parse cleanly. This is also where a broken JSON-LD edit shows up.
5. **Analytics** — GA4, Plausible or Umami. GA4 is free and integrates with
   Search Console; the lighter two do not need a cookie banner.

**Read monthly, in Search Console → Performance:**

- Filter queries containing `nsengimana`. Track **average position** and
  **impressions** for the name query specifically, not sitewide traffic — the
  name query is the goal and it is a small enough slice to be swamped otherwise.
- Watch which *page* wins the name query. If a case study outranks `/`, the home
  page is the weak one, not the case study.
- Coverage → any page marked "Crawled – currently not indexed" is a prerender or
  canonical problem, not a content one.

**When the namesakes still dominate after a few months**, the lever is step 03
and step 04, not more keywords on the site. On-page work is close to saturated
here; what moves a contested name query is other sites corroborating that you
exist. Adding "Nsengimana Olivier" to more headings will not help and starts to
read as stuffing.

**Keep it fed.** New case studies, new posts, an updated `lastmod` in
`public/sitemap.xml`. A site that changes gets recrawled; one that does not gets
visited a few times a year.
