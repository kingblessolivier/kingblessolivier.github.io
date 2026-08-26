import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiX, FiZap, FiMessageCircle } from 'react-icons/fi'
import { portfolioData } from '../assets/data'

/* ── Bot response logic ─────────────────────────────── */
export function getResponse(input) {
  const t = input.trim().toLowerCase()
  if (!t) return "I didn't catch that — try asking about projects, skills, or how to contact Olivier."

  if (t.includes('project') || t.includes('portfolio') || t.includes('work')) {
    const list = portfolioData.projects.slice(0, 3).map((p) => p.name).join(', ')
    return `Olivier's top projects include ${list}. Ask about any of them to learn more!`
  }
  if (t.includes('skill') || t.includes('tech') || t.includes('stack')) {
    const skills = portfolioData.skills.frontend.slice(0, 2)
      .concat(portfolioData.skills.backend.slice(0, 2))
      .map((s) => s.name).join(', ')
    return `Core stack: ${skills} — plus AI/ML, PostgreSQL, DevOps tools and more. Check the Skills section for the full picture!`
  }
  if (t.includes('contact') || t.includes('email') || t.includes('phone') || t.includes('reach')) {
    return `📧 ${portfolioData.personal.email}\n📱 ${portfolioData.personal.phone}\nOr just use the Contact section on this page!`
  }
  if (t.includes('education') || t.includes('university') || t.includes('degree') || t.includes('study')) {
    const edu = portfolioData.education[0]
    return `${edu.degree.EN} at ${edu.institution.EN}, expected graduation ${edu.expectedGraduation}.`
  }
  if (t.includes('experience') || t.includes('intern') || t.includes('job')) {
    const list = portfolioData.workExperience.map((w) => `${w.role.EN} @ ${w.company}`).join(' · ')
    return `Experience: ${list}.`
  }
  if (t.includes('hackathon') || t.includes('medlink') || t.includes('award')) {
    return 'MedLink won a prize at the HATANA Hackathon (Mastercard × UR). It reduces hospital queue delays through digital appointment booking and nearby hospital discovery.'
  }
  if (t.includes('hello') || t.includes('hi') || t.includes('hey')) {
    return "Hey there! 👋 I'm OlivierBot. Ask me anything about Olivier's work, skills, education, or how to get in touch."
  }
  if (t.includes('who') || t.includes('about') || t.includes('olivier')) {
    return `Olivier is a Full-Stack Engineer & AI Builder based in Kigali, Rwanda — building intelligent web products with React, Python, Django, and AI/ML systems.`
  }
  return "I can answer questions about projects, skills, experience, education, and contact info. Try: 'Top projects' or 'How to contact?'"
}

/* ── Typing dots ────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: 'var(--accent)' }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ── Bot avatar ─────────────────────────────────────── */
function BotAvatar({ size = 28 }) {
  /* The mark, not an initial. The artwork carries its own dark field, so it is
     clipped to a disc rather than drawn on a tinted one. */
  return (
    <img
      src="/logo-128.webp"
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className="shrink-0 rounded-full object-cover"
      style={{
        width: size,
        height: size,
        border: '1px solid color-mix(in srgb,var(--brand-blue) 28%,var(--border))',
      }}
    />
  )
}

/* ── Main component ─────────────────────────────────── */
export default function ChatbotWidget() {
  const [open, setOpen]           = useState(false)
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [unread, setUnread]       = useState(0)
  const bottomRef                 = useRef(null)
  const inputRef                  = useRef(null)

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: "Hey! 👋 I'm **OlivierBot** — ask me anything about Olivier's projects, skills, experience, or how to get in touch.",
    },
  ])

  const quickPrompts = useMemo(() => [
    { label: 'Top projects',   icon: '🚀' },
    { label: 'Skills & stack', icon: '⚡' },
    { label: 'Contact info',   icon: '📬' },
    { label: 'About Olivier',  icon: '👤' },
  ], [])

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  /* Try the serverless Claude assistant; fall back to the offline keyword bot
     if it's unavailable (not configured locally, network error, rate limit). */
  const fetchReply = async (history) => {
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
        signal: AbortSignal.timeout(15000),
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.reply) return data.reply
      }
    } catch { /* fall through to offline bot */ }
    return getResponse(history[history.length - 1]?.content ?? '')
  }

  const send = async (value) => {
    const text = (value ?? input).trim()
    if (!text) return
    const userMsg = { id: Date.now(), role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages((p) => [...p, userMsg])
    setInput('')
    setTyping(true)
    const reply = await fetchReply(history)
    setMessages((p) => [...p, { id: Date.now() + 1, role: 'bot', content: reply }])
    setTyping(false)
    if (!open) setUnread((n) => n + 1)
  }

  /* Render bold markdown (**text**) */
  const renderText = (text) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: 'var(--text)', fontWeight: 700 }}>{part}</strong>
        : part
    )

  return (
    <>
    <div className="fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3">

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl"
            style={{
              background: 'var(--card)',
              border: '1px solid color-mix(in srgb,var(--accent) 14%,var(--border))',
              boxShadow: '0 24px 60px -16px rgba(0,0,20,0.45), 0 0 0 1px color-mix(in srgb,var(--accent) 5%,transparent)',
              maxHeight: 'min(520px, 80vh)',
            }}
          >

            {/* Header */}
            <div
              className="relative flex items-center justify-between px-4 py-3.5"
              style={{ background: 'linear-gradient(135deg, color-mix(in srgb,var(--accent) 16%,var(--card)), color-mix(in srgb,var(--accent-purple) 10%,var(--card)))' }}
            >
              {/* Top gradient line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 70%,transparent),color-mix(in srgb,var(--accent-purple) 60%,transparent),transparent)' }}
              />

              <div className="flex items-center gap-3">
                {/* Avatar with online ring */}
                <div className="relative">
                  <div className="rounded-full p-0.5" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))' }}>
                    <div className="rounded-full p-0.5" style={{ background: 'var(--card)' }}>
                      <BotAvatar size={32} />
                    </div>
                  </div>
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2"
                    style={{ background: 'var(--success)', borderColor: 'var(--card)', boxShadow: '0 0 6px var(--success)' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text)]">OlivierBot</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Online · usually replies instantly</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[color:color-mix(in_srgb,var(--accent)_14%,transparent)] hover:text-[var(--text)]"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ minHeight: 0 }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {msg.role === 'bot' && <BotAvatar size={24} />}

                    <div
                      className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.75]"
                      style={msg.role === 'user' ? {
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
                        color: 'var(--accent-contrast)',
                        borderBottomRightRadius: 6,
                        boxShadow: '0 4px 14px -4px color-mix(in srgb,var(--accent) 50%,transparent)',
                      } : {
                        background: 'var(--surface)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      {renderText(msg.content)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex items-end gap-2"
                  >
                    <BotAvatar size={24} />
                    <div
                      className="rounded-2xl px-3.5 py-2.5"
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div
              className="flex flex-wrap gap-1.5 border-t px-3.5 py-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              {quickPrompts.map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => send(label)}
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb,var(--accent) 35%,var(--border))'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.background = 'color-mix(in srgb,var(--accent) 6%,var(--surface))'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'var(--surface)'
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 border-t px-3 py-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <div
                className="flex flex-1 items-center rounded-full px-1.5 py-1.5 transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'color-mix(in srgb,var(--accent) 45%,var(--border))'; e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb,var(--accent) 10%,transparent)' }}
                onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  className="flex-1 bg-transparent px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
                  style={{ outline: 'none' }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Send"
                  disabled={!input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg, var(--accent), var(--accent-purple))'
                      : 'color-mix(in srgb, var(--text-muted) 18%, transparent)',
                    color: input.trim() ? 'var(--accent-contrast)' : 'var(--text-muted)',
                    boxShadow: input.trim() ? '0 4px 14px -4px color-mix(in srgb,var(--accent) 60%,transparent)' : 'none',
                  }}
                >
                  <FiSend size={13} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle assistant"
        className="relative flex h-13 items-center gap-2.5 rounded-full px-4 py-3 text-sm font-semibold"
        style={{
          background: open
            ? 'linear-gradient(135deg, var(--accent-purple), var(--accent))'
            : 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
          color: 'var(--accent-contrast)',
          boxShadow: '0 6px 24px -6px color-mix(in srgb,var(--accent) 65%,transparent)',
        }}
      >
        {/* Pulse ring — only when closed */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'color-mix(in srgb,var(--accent) 40%,transparent)' }}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -20, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 20, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center"
          >
            {open ? <FiX size={16} /> : <FiMessageCircle size={16} />}
          </motion.span>
        </AnimatePresence>

        <span className="relative text-[13px]">
          {open ? 'Close' : 'Assistant'}
        </span>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black text-white"
              style={{ background: '#EF4444' }}
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
    </>
  )
}
