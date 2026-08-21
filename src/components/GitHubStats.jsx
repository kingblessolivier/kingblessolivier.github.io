import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiGitBranch, FiUsers, FiBook, FiExternalLink } from 'react-icons/fi'

const USERNAME = 'kingblessolivier'
const CACHE_KEY = 'gh_stats_cache_v1'
const TTL_MS = 60 * 60 * 1000 // 1 hour — well within the unauthenticated rate limit

/* Brand-ish dot colors for the most common languages */
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', 'C#': '#178600', PowerShell: '#012456',
  Batchfile: '#C1F12E', Shell: '#89e051', Java: '#b07219', Dart: '#00B4AB',
}
const colorFor = (lang) => LANG_COLORS[lang] || 'var(--accent)'

function readCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (raw && Date.now() - raw.ts < TTL_MS) return raw.data
  } catch { /* ignore */ }
  return null
}

async function fetchStats() {
  const opts = { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(6000) }
  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, opts),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, opts),
  ])
  if (!userRes.ok || !repoRes.ok) throw new Error('GitHub API error')
  const user = await userRes.json()
  const repos = await repoRes.json()
  if (!Array.isArray(repos)) throw new Error('Unexpected repos payload')

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
  const langCount = {}
  repos.forEach((r) => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1 })
  const topLanguages = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const langTotal = topLanguages.reduce((s, [, n]) => s + n, 0) || 1
  const topRepos = [...repos]
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
    .slice(0, 4)
    .map((r) => ({ name: r.name, url: r.html_url, stars: r.stargazers_count, lang: r.language, desc: r.description }))

  return {
    publicRepos: user.public_repos ?? repos.length,
    followers: user.followers ?? 0,
    totalStars,
    topLanguages: topLanguages.map(([lang, n]) => ({ lang, pct: Math.round((n / langTotal) * 100) })),
    topRepos,
  }
}

function StatTile({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3">
      <Icon size={15} className="text-[var(--accent)]" />
      <span className="text-lg font-black tracking-tight text-[var(--text)]">{value}</span>
      <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</span>
    </div>
  )
}

export default function GitHubStats() {
  const [data, setData] = useState(() => readCache())
  const [state, setState] = useState(() => (readCache() ? 'ready' : 'loading'))

  useEffect(() => {
    let cancelled = false
    if (readCache()) return // fresh cache already shown
    fetchStats()
      .then((d) => {
        if (cancelled) return
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: d }))
        setData(d)
        setState('ready')
      })
      .catch(() => { if (!cancelled) setState('error') })
    return () => { cancelled = true }
  }, [])

  // Hide silently on failure — the heatmap above already represents GitHub activity
  if (state === 'error') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="card-surface mt-5 rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Live GitHub Stats</p>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 6px var(--success)' }} />
          @{USERNAME}
        </a>
      </div>

      {state === 'loading' || !data ? (
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[78px] animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)]" />
          ))}
        </div>
      ) : (
        <>
          {/* Stat tiles */}
          <div className="grid grid-cols-4 gap-2">
            <StatTile icon={FiBook} value={data.publicRepos} label="Repos" />
            <StatTile icon={FiStar} value={data.totalStars} label="Stars" />
            <StatTile icon={FiUsers} value={data.followers} label="Followers" />
            <StatTile icon={FiGitBranch} value={data.topLanguages.length} label="Languages" />
          </div>

          {/* Language bar */}
          {data.topLanguages.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Top Languages</p>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                {data.topLanguages.map((l) => (
                  <div key={l.lang} style={{ width: `${l.pct}%`, background: colorFor(l.lang) }} title={`${l.lang} · ${l.pct}%`} />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {data.topLanguages.map((l) => (
                  <span key={l.lang} className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <span className="h-2 w-2 rounded-full" style={{ background: colorFor(l.lang) }} />
                    {l.lang} <span className="text-[var(--text-muted)] opacity-60">{l.pct}%</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Top repos */}
          {data.topRepos.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Most Notable Repositories</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {data.topRepos.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 transition hover:border-[var(--accent)]"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13px] font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">{r.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-[10px] text-[var(--text-muted)]">
                        {r.stars > 0 && <span className="flex items-center gap-0.5"><FiStar size={10} /> {r.stars}</span>}
                        <FiExternalLink size={10} className="opacity-0 transition group-hover:opacity-60" />
                      </span>
                    </span>
                    {r.desc && <span className="mt-0.5 line-clamp-1 text-[11px] text-[var(--text-muted)]">{r.desc}</span>}
                    {r.lang && (
                      <span className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                        <span className="h-2 w-2 rounded-full" style={{ background: colorFor(r.lang) }} />
                        {r.lang}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}
