import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiX, FiMinus, FiMaximize2 } from 'react-icons/fi'
import { portfolioData, projects, skills, socialLinks, aboutContent } from '../assets/data'

/* ── Sections the terminal can navigate to ── */
const SECTIONS = ['home', 'about', 'projects', 'systems', 'skills', 'awards', 'gallery', 'work', 'contact']

/* ── Build a bar of █ for skill levels ── */
export const bar = (level) => {
  const filled = Math.round(level / 10)
  return '█'.repeat(filled) + '░'.repeat(10 - filled)
}

/* ── Command processor ── */
export function processCommand(raw, { navigate, toggleTheme, theme, onClose }) {
  const input = raw.trim()
  if (!input) return []

  const parts = input.split(/\s+/)
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1).join(' ').toLowerCase()

  switch (cmd) {

    case 'help': return [
      { t: 'divider' },
      { t: 'head',    v: '  NSENGIMANA Olivier — Portfolio Terminal  ' },
      { t: 'divider' },
      { t: 'label',   v: 'NAVIGATION' },
      { t: 'row',     v: ['  cd <section>',   'navigate to a section'] },
      { t: 'row',     v: ['  ls',              'list all sections'] },
      { t: 'row',     v: ['  ls projects',     'list all projects'] },
      { t: 'label',   v: 'INFO' },
      { t: 'row',     v: ['  whoami',          'who is Olivier'] },
      { t: 'row',     v: ['  cat about',       'read full bio'] },
      { t: 'row',     v: ['  skills',          'print skills + levels'] },
      { t: 'row',     v: ['  stats',           'show project statistics'] },
      { t: 'row',     v: ['  contact',         'get contact details'] },
      { t: 'label',   v: 'ACTIONS' },
      { t: 'row',     v: ['  open <platform>', 'github · linkedin · twitter'] },
      { t: 'row',     v: ['  theme [dark|light]', 'toggle or set theme'] },
      { t: 'row',     v: ['  date',            'print current date/time'] },
      { t: 'row',     v: ['  echo <text>',     'print text'] },
      { t: 'row',     v: ['  clear',           'clear terminal'] },
      { t: 'row',     v: ['  exit',            'close terminal'] },
      { t: 'divider' },
      { t: 'muted',   v: '  Tip: use ↑ ↓ for command history · Tab to autocomplete' },
    ]

    case 'whoami': return [
      { t: 'success', v: 'NSENGIMANA Olivier' },
      { t: 'gap' },
      { t: 'kv',      v: ['Role',     'Full-Stack Engineer & AI Builder'] },
      { t: 'kv',      v: ['Location', 'Kigali, Rwanda'] },
      { t: 'kv',      v: ['Status',   '● Available for work'] },
      { t: 'kv',      v: ['Focus',    'Intelligent, scalable software systems'] },
      { t: 'gap' },
      { t: 'kv',      v: ['Projects',  `${portfolioData.stats.projects}+ shipped`] },
      { t: 'kv',      v: ['Systems',   `${portfolioData.stats.systemsBuilt}+ built`] },
      { t: 'kv',      v: ['Certs',     `${portfolioData.stats.certificates}+ earned`] },
    ]

    case 'stats': return [
      { t: 'label',   v: 'STATISTICS' },
      { t: 'bar',     v: ['Projects',   portfolioData.stats.projects,    30] },
      { t: 'bar',     v: ['Systems',    portfolioData.stats.systemsBuilt, 30] },
      { t: 'bar',     v: ['Certs',      portfolioData.stats.certificates, 30] },
      { t: 'bar',     v: ['Hackathons', portfolioData.stats.hackathons,   30] },
    ]

    case 'ls': {
      if (args === 'projects') return [
        { t: 'label',   v: `PROJECTS  (${projects.length} total)` },
        ...projects.map((p, i) => ({
          t: 'row',
          v: [`  ${String(i + 1).padStart(2, '0')}  ${p.name}`, `[${p.category}]`],
        })),
      ]
      return [
        { t: 'label',   v: 'SECTIONS' },
        ...SECTIONS.map((s) => ({ t: 'output', v: `  drwxr-xr-x  ${s}/` })),
      ]
    }

    case 'cd': {
      const target = args
      if (!target) return [{ t: 'error', v: 'cd: missing argument. Try: cd about' }]
      if (SECTIONS.includes(target)) {
        navigate(target)
        return [{ t: 'success', v: `✓  Navigated to /${target}` }]
      }
      return [{ t: 'error', v: `cd: no such section: '${target}'. Run 'ls' to see sections.` }]
    }

    case 'cat': {
      if (args === 'about') return [
        { t: 'output', v: aboutContent.EN },
      ]
      if (args === 'philosophy') return [
        { t: 'output', v: `"${portfolioData.personal.philosophy.EN}"` },
      ]
      return [{ t: 'error', v: `cat: ${args || '?'}: No such file. Try: cat about, cat philosophy` }]
    }

    case 'skills': {
      const entries = Object.entries(skills)
      return [
        { t: 'label', v: 'SKILLS' },
        ...entries.flatMap(([category, list]) => [
          { t: 'gap' },
          { t: 'accent', v: `  ${category.toUpperCase()}` },
          ...list.map((s) => ({
            t: 'skill',
            v: [s.name, bar(s.level), `${s.level}%`],
          })),
        ]),
      ]
    }

    case 'contact': {
      navigate('contact')
      return [
        { t: 'label',   v: 'CONTACT' },
        { t: 'kv',      v: ['Email',    'nsengimana_222023259@stud.ur.ac.rw'] },
        { t: 'kv',      v: ['GitHub',   socialLinks.github] },
        { t: 'kv',      v: ['LinkedIn', socialLinks.linkedin] },
        { t: 'kv',      v: ['Twitter',  socialLinks.twitter] },
        { t: 'gap' },
        { t: 'success', v: '✓  Also scrolled to Contact section' },
      ]
    }

    case 'open': {
      const map = {
        github:    socialLinks.github,
        linkedin:  socialLinks.linkedin,
        twitter:   socialLinks.twitter,
        instagram: socialLinks.instagram,
      }
      if (!args) return [{ t: 'error', v: 'open: specify a platform. Try: open github' }]
      if (map[args]) {
        window.open(map[args], '_blank', 'noopener')
        return [{ t: 'success', v: `✓  Opening ${args}...` }]
      }
      return [{ t: 'error', v: `open: unknown platform '${args}'. Options: github, linkedin, twitter, instagram` }]
    }

    case 'theme': {
      if (!args) {
        toggleTheme()
        return [{ t: 'success', v: `✓  Switched to ${theme === 'dark' ? 'light' : 'dark'} mode` }]
      }
      if (args === theme) return [{ t: 'muted', v: `Already in ${theme} mode.` }]
      if (args === 'dark' || args === 'light') {
        toggleTheme()
        return [{ t: 'success', v: `✓  Theme set to ${args}` }]
      }
      return [{ t: 'error', v: `theme: unknown value '${args}'. Use: dark, light` }]
    }

    case 'date':
      return [{ t: 'output', v: new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }]

    case 'pwd':
      return [{ t: 'output', v: '/home/visitor/olivier-portfolio' }]

    case 'echo':
      return [{ t: 'output', v: parts.slice(1).join(' ') || '' }]

    case 'clear':
    case 'cls':
      return [{ t: '__clear__' }]

    case 'exit':
    case 'quit':
    case 'q':
      onClose()
      return []

    /* ── Section shortcuts ── */
    case 'about':
    case 'projects':
    case 'systems':
    case 'work':
    case 'awards':
    case 'gallery':
    case 'home':
      navigate(cmd)
      return [{ t: 'success', v: `✓  Jumped to ${cmd}` }]

    default:
      return [
        { t: 'error',  v: `command not found: ${cmd}` },
        { t: 'muted',  v: `Type 'help' to see available commands.` },
      ]
  }
}

/* ── Render a single output line ── */
function Line({ line }) {
  switch (line.t) {
    case 'divider':
      return <div className="my-1 border-t border-[#2a2a45]" />
    case 'gap':
      return <div className="h-1" />
    case 'head':
      return <p className="py-0.5 font-bold text-[#C7C7D2]" style={{ fontFamily: 'monospace' }}>{line.v}</p>
    case 'label':
      return <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B6B72]">{line.v}</p>
    case 'accent':
      return <p className="font-semibold text-[#C7C7D2]">{line.v}</p>
    case 'success':
      return <p className="text-[#86EFAC]">{line.v}</p>
    case 'error':
      return <p className="text-[#F87171]">{line.v}</p>
    case 'muted':
      return <p className="text-[#4B4B70]">{line.v}</p>
    case 'output':
      return <p className="text-[#C8C7E8]">{line.v}</p>
    case 'row':
      return (
        <div className="flex gap-3">
          <span className="min-w-[120px] text-[#C8C7E8] sm:min-w-[200px]">{line.v[0]}</span>
          <span className="text-[#6B6B72]">{line.v[1]}</span>
        </div>
      )
    case 'kv':
      return (
        <div className="flex gap-3">
          <span className="w-24 shrink-0 text-[#6B6B72]">{line.v[0]}</span>
          <span className="text-[#C8C7E8]">{line.v[1]}</span>
        </div>
      )
    case 'skill':
      return (
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-28 shrink-0 text-[#C8C7E8]">{line.v[0]}</span>
          <span className="tracking-tight text-[#C7C7D2]">{line.v[1]}</span>
          <span className="text-[#6B6B72]">{line.v[2]}</span>
        </div>
      )
    case 'bar': {
      const [label, value, max] = line.v
      const pct = Math.round((value / max) * 100)
      return (
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-[#C8C7E8]">{label}</span>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-[#1E1D35]">
            <div className="h-full rounded-full bg-[#C7C7D2]" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-[#6B6B72]">{value}+</span>
        </div>
      )
    }
    default:
      return null
  }
}

/* ── Entry (cmd echo + its response) ── */
function Entry({ prompt, command, lines }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.14 }}
      className="space-y-0.5 text-sm"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      {/* Echoed command */}
      <div className="flex items-center gap-2">
        <span className="text-[#C7C7D2]">{prompt}</span>
        <span className="text-[#E4E4F0]">{command}</span>
      </div>
      {/* Response lines */}
      {lines.map((line, i) => <Line key={i} line={line} />)}
    </motion.div>
  )
}

/* ── Main terminal component ── */
function Terminal({ onClose, theme, toggleTheme }) {
  const [entries, setEntries] = useState([
    {
      prompt: '',
      command: '',
      lines: [
        { t: 'head',    v: '  olivier@portfolio  v1.0.0  ' },
        { t: 'divider' },
        { t: 'output',  v: "Welcome! Type 'help' to see available commands." },
        { t: 'muted',   v: "Tip: use ↑ ↓ for history, Tab to autocomplete." },
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [historyIdx, setHistoryIdx] = useState(-1)
  const history = useRef([])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const containerRef = useRef(null)

  const navigate = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  /* ── Auto scroll to bottom on new output ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  /* ── Focus input on mount ── */
  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = useCallback(() => {
    const raw = input.trim()
    setInput('')
    setHistoryIdx(-1)

    if (!raw) return

    history.current = [raw, ...history.current.slice(0, 49)]

    const result = processCommand(raw, { navigate, toggleTheme, theme, onClose })

    if (result.length === 1 && result[0].t === '__clear__') {
      setEntries([])
      return
    }

    setEntries((prev) => [
      ...prev,
      { prompt: 'olivier@portfolio ~', command: raw, lines: result },
    ])
  }, [input, navigate, toggleTheme, theme, onClose])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.current.length - 1)
      setHistoryIdx(next)
      setInput(history.current[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : (history.current[next] ?? ''))
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const all = [...SECTIONS, 'help', 'whoami', 'skills', 'stats', 'contact', 'clear', 'exit', 'open', 'theme', 'date', 'echo', 'pwd', 'ls', 'cd', 'cat']
      const match = all.find((c) => c.startsWith(input) && c !== input)
      if (match) setInput(match)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const PROMPT = 'olivier@portfolio ~'

  /* Run a command directly (used by the quick-command chips) */
  const runQuick = useCallback((cmd) => {
    history.current = [cmd, ...history.current.slice(0, 49)]
    const result = processCommand(cmd, { navigate, toggleTheme, theme, onClose })
    if (result.length === 1 && result[0].t === '__clear__') { setEntries([]); inputRef.current?.focus(); return }
    setEntries((prev) => [...prev, { prompt: PROMPT, command: cmd, lines: result }])
    inputRef.current?.focus()
  }, [navigate, toggleTheme, theme, onClose])

  const QUICK_CMDS = ['help', 'whoami', 'ls projects', 'skills', 'stats', 'contact']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 12 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      ref={containerRef}
      className="group/term relative mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px]"
      style={{
        background: 'radial-gradient(120% 100% at 50% 0%, #12112A 0%, #0A0A1B 55%, #070714 100%)',
        border: '1px solid #221F3D',
        boxShadow: '0 40px 100px -24px rgba(0,0,20,0.9), 0 0 0 1px rgba(199,199,210,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
        maxHeight: '85vh',
        minHeight: 'min(520px, 65vh)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top accent hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(199,199,210,0.7) 35%, rgba(160,160,170,0.6) 65%, transparent)' }}
      />

      {/* ── Title bar ── */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{ background: 'linear-gradient(180deg, #15142B, #0D0C1F)', borderBottom: '1px solid #1E1D35' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="group/dot flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF5F57] transition hover:brightness-110"
              aria-label="Close"
            >
              <FiX size={8} className="text-[#7a0c00] opacity-0 transition group-hover/dot:opacity-100" strokeWidth={3} />
            </button>
            <span className="h-3.5 w-3.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#28C840]" />
          </div>
          {/* Faux active tab */}
          <div
            className="ml-1 hidden items-center gap-1.5 rounded-lg px-2.5 py-1 sm:flex"
            style={{ background: 'rgba(199,199,210,0.1)', border: '1px solid rgba(199,199,210,0.16)' }}
          >
            <FiTerminal size={11} className="text-[#C7C7D2]" />
            <span className="text-[11px] font-medium text-[#C8C7E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              olivier@portfolio
            </span>
          </div>
          <span className="hidden text-[11px] text-[#4B4B70] md:inline" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            — zsh — 80×24
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close terminal"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6B6B72] transition hover:bg-[rgba(199,199,210,0.1)] hover:text-[#C7C7D2]"
        >
          <FiX size={15} />
        </button>
      </div>

      {/* ── Output area ── */}
      <div
        className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-5 py-4"
        onClick={() => inputRef.current?.focus()}
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        {entries.map((entry, i) => (
          <Entry key={i} prompt={entry.prompt} command={entry.command} lines={entry.lines} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── Quick-command chips ── */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto border-t px-5 py-2.5 scrollbar-hidden"
        style={{ borderColor: '#1E1D35', background: '#0B0A1B' }}
      >
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-[#4B4B70]">Try</span>
        {QUICK_CMDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => runQuick(cmd)}
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] text-[#B4B4BC] transition-colors"
            style={{
              background: 'rgba(199,199,210,0.07)',
              border: '1px solid rgba(199,199,210,0.16)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(199,199,210,0.18)'; e.currentTarget.style.color = '#E4E4F0' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(199,199,210,0.07)'; e.currentTarget.style.color = '#B4B4BC' }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* ── Input row ── */}
      <div
        className="flex items-center gap-2 border-t px-5 py-3.5"
        style={{ borderColor: '#1E1D35', background: '#0D0C1F' }}
      >
        <span className="shrink-0 text-sm font-medium text-[#C7C7D2]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span className="text-[#86EFAC]">➜</span> ~ <span className="text-[#6B6B72]">$</span>
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-sm text-[#E4E4F0] placeholder:text-[#3A3A42] caret-[#C7C7D2]"
          placeholder="type a command…  (Tab ⇥ to autocomplete)"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", outline: 'none', boxShadow: 'none' }}
        />
      </div>
    </motion.div>
  )
}

/* ── Backdrop + centered layout ── */
export function TerminalModal({ isOpen, onClose, theme, toggleTheme }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,12,0.78)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <Terminal onClose={onClose} theme={theme} toggleTheme={toggleTheme} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* ── Floating trigger button ── */
export function TerminalTrigger({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      aria-label="Open portfolio terminal"
      title="Portfolio Terminal  (Ctrl + `)"
      className="group fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl transition-shadow"
      style={{
        background: 'radial-gradient(120% 120% at 30% 20%, #1A1838, #0A0A1B)',
        border: '1px solid #2A2750',
        boxShadow: '0 8px 26px -6px rgba(199,199,210,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        color: '#A5B4FC',
      }}
    >
      {/* top accent hairline */}
      <span
        className="pointer-events-none absolute inset-x-2 top-0 h-px rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(199,199,210,0.8), transparent)' }}
      />
      <FiTerminal size={18} className="transition-transform group-hover:scale-110" />
    </motion.button>
  )
}