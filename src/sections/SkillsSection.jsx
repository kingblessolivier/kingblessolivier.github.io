import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import GitHubHeatmap from '../components/GitHubHeatmap'
import GitHubStats from '../components/GitHubStats'
import { skills } from '../assets/data'
import { FiCode, FiServer, FiDatabase, FiCpu, FiPackage, FiTool, FiUsers } from 'react-icons/fi'

const CATEGORY_META = {
  Frontend:     { icon: FiCode,     color: 'var(--accent)', desc: 'UI engineering & design systems' },
  Backend:      { icon: FiServer,   color: 'var(--accent-purple)', desc: 'APIs, logic & server architecture' },
  Database:     { icon: FiDatabase, color: 'var(--accent)', desc: 'Storage, querying & data modeling' },
  'AI/ML':      { icon: FiCpu,      color: 'var(--accent-purple)', desc: 'Intelligent systems & model pipelines' },
  DevOps:       { icon: FiPackage,  color: 'var(--accent)', desc: 'CI/CD, cloud & infrastructure' },
  Other:        { icon: FiTool,     color: 'var(--accent-purple)', desc: 'Languages & scripting tools' },
  Professional: { icon: FiUsers,    color: 'var(--accent)', desc: 'Soft skills & workplace strengths' },
}

function masteryLabel(level) {
  if (level >= 90) return { label: 'Expert',     color: 'var(--accent-purple)' }
  if (level >= 80) return { label: 'Advanced',   color: 'var(--accent)' }
  if (level >= 70) return { label: 'Proficient', color: '#6B7280' }
  return                  { label: 'Learning',   color: '#4B5563' }
}

/* ── Circular gauge ──────────────────────────────────── */
function CircularGauge({ value, size = 120 }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ

  return (
    <svg width={size} height={size} viewBox="0 0 108 108">
      <circle cx="54" cy="54" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
      <motion.circle
        cx="54" cy="54" r={r}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${circ}`}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ transformOrigin: '54px 54px', transform: 'rotate(-90deg)' }}
      />
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-purple)" />
        </linearGradient>
      </defs>
      <text x="54" y="50" textAnchor="middle" dominantBaseline="central"
        fill="var(--text)" fontSize="18" fontWeight="700"
        style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}>
        {value}
      </text>
      <text x="54" y="66" textAnchor="middle" dominantBaseline="central"
        fill="var(--text-muted)" fontSize="9">
        avg %
      </text>
    </svg>
  )
}

/* ── Single skill row ────────────────────────────────── */
function SkillRow({ skill, index, accentColor }) {
  const mastery = masteryLabel(skill.level)
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.055 }}
      className="group flex items-center gap-3"
    >
      <span className="w-24 shrink-0 text-sm font-medium text-[var(--text)] truncate sm:w-32">{skill.name}</span>

      {/* Segmented bar */}
      <div className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--surface)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--accent), var(--accent-purple))`,
            boxShadow: `0 0 8px -2px color-mix(in srgb, var(--accent) 50%, transparent)`,
          }}
        />
      </div>

      <span className="w-8 shrink-0 text-right text-xs font-semibold text-[var(--text-muted)]">{skill.level}</span>

      <span
        className="hidden sm:inline-flex w-20 shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
        style={{
          color: mastery.color,
          background: `color-mix(in srgb, ${mastery.color} 10%, transparent)`,
          border: `1px solid color-mix(in srgb, ${mastery.color} 22%, transparent)`,
        }}
      >
        {mastery.label}
      </span>
    </motion.div>
  )
}

/* ── Category tab button ─────────────────────────────── */
function CategoryTab({ category, avg, count, active, onClick }) {
  const meta = CATEGORY_META[category] ?? { icon: FiCode, color: 'var(--accent)' }
  const Icon = meta.icon
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
        active
          ? 'border-[var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_10%,var(--card))]'
          : 'border-[var(--border)] hover:border-[color:color-mix(in_srgb,var(--accent)_35%,var(--border))]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="tab-bg"
          className="absolute inset-0 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent)' }}
        />
      )}
      <span
        className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: active ? `color-mix(in srgb, ${meta.color} 18%, transparent)` : 'var(--surface)',
          color: active ? meta.color : 'var(--text-muted)',
        }}
      >
        <Icon size={13} />
      </span>
      <span className="relative">
        <span className={`block text-xs font-semibold ${active ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
          {category}
        </span>
        <span className="block text-[10px] text-[var(--text-muted)]">{count} skills · {avg}%</span>
      </span>
    </motion.button>
  )
}

/* ── Main section ────────────────────────────────────── */
export default function SkillsSection({ navLabels, sectionText }) {
  const entries = Object.entries(skills)
  const [activeCategory, setActiveCategory] = useState(entries[0]?.[0] ?? 'Frontend')

  const categoryStats = useMemo(() =>
    entries.map(([cat, list]) => ({
      cat,
      avg: Math.round(list.reduce((s, sk) => s + sk.level, 0) / list.length),
      count: list.length,
    })), [entries])

  const activeList = useMemo(() =>
    entries.find(([cat]) => cat === activeCategory)?.[1] ?? [],
    [entries, activeCategory])

  const activeMeta = CATEGORY_META[activeCategory] ?? { icon: FiCode, color: 'var(--accent)', desc: '' }
  const activeAvg = categoryStats.find(s => s.cat === activeCategory)?.avg ?? 0
  const totalSkills = entries.reduce((s, [, list]) => s + list.length, 0)
  const overallAvg = Math.round(categoryStats.reduce((s, c) => s + c.avg, 0) / categoryStats.length)

  return (
    <SectionReveal id="skills" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={sectionText.skills.sectionTag}
          title={navLabels.skills}
          titleContext=" of Nsengimana Olivier"
          number="05"
        />

        {/* ── Summary strip ── */}
        <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { value: totalSkills + '+', label: 'Total Skills' },
            { value: entries.length,    label: 'Categories' },
            { value: overallAvg + '%',  label: 'Avg Proficiency' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card-surface rounded-2xl px-4 py-4 text-center"
            >
              <p className="text-xl font-black tracking-tight text-[var(--text)] sm:text-2xl"
                style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}>{value}</p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-[0.18em]">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Category tabs ── */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categoryStats.map(({ cat, avg, count }) => (
            <CategoryTab
              key={cat}
              category={cat}
              avg={avg}
              count={count}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* ── Active category panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="card-surface mb-8 overflow-hidden rounded-2xl"
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-4"
              style={{ background: `color-mix(in srgb, ${activeMeta.color} 5%, var(--card))` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${activeMeta.color} 16%, var(--surface))`,
                    border: `1px solid color-mix(in srgb, ${activeMeta.color} 28%, var(--border))`,
                    color: activeMeta.color,
                  }}
                >
                  <activeMeta.icon size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)]">{activeCategory}</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">{activeMeta.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <CircularGauge value={activeAvg} size={64} />
              </div>
            </div>

            {/* Skills list */}
            <div className="scrollbar-thin space-y-4 overflow-y-auto p-6" style={{ maxHeight: '420px' }}>
              {activeList.map((skill, i) => (
                <SkillRow key={skill.name} skill={skill} index={i} accentColor={activeMeta.color} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── GitHub heatmap ── */}
        <GitHubHeatmap />

        {/* ── Live GitHub stats ── */}
        <GitHubStats />
      </div>
    </SectionReveal>
  )
}