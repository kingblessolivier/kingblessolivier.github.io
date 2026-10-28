import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import GitHubHeatmap from '../components/GitHubHeatmap'
import GitHubStats from '../components/GitHubStats'
import { skills } from '../assets/data'
import { FiCode, FiServer, FiDatabase, FiCpu, FiPackage, FiTool, FiUsers } from 'react-icons/fi'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiDjango,
  SiPostgresql, SiMysql, SiMongodb, SiGithub, SiVercel, SiDotnet, SiGnubash,
} from 'react-icons/si'

/* Category order, icon and one-line description */
const CATEGORY_META = {
  Frontend:     { icon: FiCode,     desc: 'Interfaces and design systems' },
  Backend:      { icon: FiServer,   desc: 'APIs, business logic and auth' },
  'AI/ML':      { icon: FiCpu,      desc: 'Screening, ranking and recommendation models' },
  Database:     { icon: FiDatabase, desc: 'Modelling, querying and storage' },
  DevOps:       { icon: FiPackage,  desc: 'Shipping and running it' },
  Other:        { icon: FiTool,     desc: 'Languages and scripting' },
  Professional: { icon: FiUsers,    desc: 'How I work with people' },
}

/* Brand marks where one exists; everything else gets a neutral dot. */
const SKILL_ICONS = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  Python: SiPython,
  Django: SiDjango,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  'Git/GitHub': SiGithub,
  'Vercel/Render': SiVercel,
  'C#': SiDotnet,
  Batchfile: SiGnubash,
}

function SkillChip({ name }) {
  const Icon = SKILL_ICONS[name]
  return (
    <li className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--text)] @xl:gap-2 @xl:px-3 @xl:py-1.5 @xl:text-sm">
      {Icon ? (
        <Icon size={14} className="text-[var(--text-muted)]" aria-hidden="true" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      )}
      {name}
    </li>
  )
}

export default function SkillsSection({ navLabels, sectionText }) {
  /* Render in bento order rather than data order */
  const ordered = Object.keys(CATEGORY_META)
    .filter((cat) => skills[cat]?.length)
    .map((cat) => [cat, skills[cat]])

  return (
    <SectionReveal id="skills" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={sectionText.skills.sectionTag}
          title={navLabels.skills}
          titleContext=" of Nsengimana Olivier"
          number="04"
        />

        {/* One card, a row per category */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bento-card group mb-6"
        >
          <dl className="relative z-10 divide-y divide-[var(--border)]">
            {ordered.map(([category, list]) => {
              const meta = CATEGORY_META[category]
              const Icon = meta.icon
              return (
                <div key={category} className="grid gap-3 px-6 py-5 @3xl:grid-cols-[13rem_minmax(0,1fr)] @3xl:items-center @3xl:gap-6">
                  <dt className="flex items-center gap-3">
                    <Icon size={16} className="shrink-0 text-[var(--accent)]" />
                    <span>
                      <span className="block text-sm font-semibold text-[var(--text)]">{category}</span>
                      <span className="block text-xs text-[var(--text-muted)]">{meta.desc}</span>
                    </span>
                  </dt>
                  <dd className="m-0">
                    <ul className="flex flex-wrap gap-1.5 @xl:gap-2">
                      {list.map((skill) => (
                        <SkillChip key={skill.name} name={skill.name} />
                      ))}
                    </ul>
                  </dd>
                </div>
              )
            })}
          </dl>
        </motion.div>

        {/* Real GitHub data only — each card hides itself if it cannot load */}
        <div className="grid gap-6">
          <GitHubHeatmap />
          <GitHubStats />
        </div>
      </div>
    </SectionReveal>
  )
}
