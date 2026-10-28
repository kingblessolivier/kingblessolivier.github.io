import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCpu, FiGithub, FiGlobe, FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { projectPath, routedProjects } from '../lib/projectRoutes'

/* Live demo first where there is one — a running app is stronger evidence than a repo */
function ProjectLinks({ project }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} live demo`}
          title={`${project.name} live demo`}
          className="icon-btn relative z-10"
        >
          <FiExternalLink size={15} />
        </a>
      )}
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name} on GitHub`}
        title={`${project.name} on GitHub`}
        className="icon-btn relative z-10"
      >
        <FiGithub size={15} />
      </a>
    </span>
  )
}

export default function ProjectsSection({
  navLabels,
  language,
  sectionText,
  activeProject,
  onOpenProject,
  onCloseProject,
}) {
  const text = sectionText.projects
  const featured = routedProjects.slice(0, 3)
  const others = routedProjects.slice(3)
  const categoryIcon = (category) => (category === 'AI' ? <FiCpu size={13} /> : <FiGlobe size={13} />)

  /* Escape closes the case study, and the page behind it should not scroll. */
  useEffect(() => {
    if (!activeProject) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onCloseProject()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeProject, onCloseProject])

  /* Plain left-clicks open the modal; modified clicks keep native link behaviour. */
  const handleCaseStudyClick = (event, project) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    onOpenProject(project)
  }

  return (
    <>
    <SectionReveal id="projects" className="section-gap">
      <div className="container-shell">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-6">
          <SectionHeader
            tag={text.sectionTag}
            title={navLabels.projects}
            titleContext=" built by Nsengimana Olivier"
            subtitle={text.intro}
            number="02"
          />
        </div>

        {/* Featured: the lead project runs full width, the next two share a row */}
        <div className="grid gap-4 @xl:grid-cols-2">
          {featured.map((project, index) => {
            const lead = index === 0
            const impact = project.caseStudy?.impact?.[language]
            const architecture = project.caseStudy?.architecture
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={lead ? '@xl:col-span-2' : ''}
              >
                <div className={`bento-card bento-card--featured group flex h-full flex-col rounded-2xl ${lead ? 'beam p-7 @xl:p-8' : 'p-6'}`}>
                  <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip chip--accent">
                        {categoryIcon(project.category)}
                        {project.category}
                      </span>
                      <span className="chip chip--solid">Featured</span>
                    </div>
                    <ProjectLinks project={project} />
                  </div>

                  <div className={`relative z-10 ${lead ? 'grid gap-6 @3xl:grid-cols-[1.2fr_1fr] @3xl:gap-10' : ''}`}>
                    <div>
                      <h3 className={`font-semibold leading-tight tracking-tight text-[var(--text)] ${lead ? 'text-2xl @xl:text-3xl' : 'text-lg'}`}>
                        {project.name}
                      </h3>
                      <p className={`mt-3 text-[var(--text-muted)] ${lead ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'}`}>
                        {project.description[language]}
                      </p>
                      {lead && impact && (
                        <p className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-sm leading-relaxed text-[var(--text)]">{impact}</p>
                      )}
                    </div>

                    {/* The lead project shows how it is built */}
                    {lead && architecture?.length > 0 && (
                      <ol className="hidden space-y-2 self-start @xl:block">
                        {architecture.map((step, i) => (
                          <li
                            key={step}
                            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-2.5 text-sm text-[var(--text)]"
                          >
                            <span className="font-mono text-xs text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  <div className="flex-1" />

                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag) => (
                        <span key={`${project.name}-${tag}`} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    <a
                      href={projectPath(project)}
                      onClick={(event) => handleCaseStudyClick(event, project)}
                      aria-label={`${text.viewCaseStudy}: ${project.name}`}
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-[gap] duration-200 hover:gap-2.5"
                    >
                      {text.viewCaseStudy}
                      <FiArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Everything else as a compact index — one row per project */}
        <div className="mt-10">
          <p className="section-eyebrow mb-3">More projects</p>
          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {others.map((project, index) => (
              <motion.li
                key={project.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative"
              >
                <div className="grid items-center gap-x-6 gap-y-1 py-4 @3xl:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.4fr)_auto]">
                  <span className="hidden font-mono text-xs text-[var(--text-subtle)] @3xl:block">
                    {String(featured.length + index + 1).padStart(2, '0')}
                  </span>
                  <a
                    href={projectPath(project)}
                    onClick={(event) => handleCaseStudyClick(event, project)}
                    aria-label={`${text.viewCaseStudy}: ${project.name}`}
                    className="text-base font-semibold text-[var(--text)] after:absolute after:inset-0 after:content-[''] group-hover:text-[var(--accent)]"
                  >
                    {project.name}
                  </a>
                  <span className="text-sm text-[var(--text-muted)]">{project.description[language]}</span>
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="hidden font-mono text-xs text-[var(--text-subtle)] @3xl:inline">{project.tech.slice(0, 2).join(' · ')}</span>
                    <ProjectLinks project={project} />
                    <FiArrowUpRight
                      size={16}
                      className="text-[var(--text-subtle)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </SectionReveal>

    {/* Case study modal — rendered via portal to escape SectionReveal's filter stacking context */}
    {createPortal(
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/75 p-2 pt-3 backdrop-blur-sm sm:p-4 sm:pt-6"
            onClick={onCloseProject}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.article
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="scrollbar-thin card-surface mt-2 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-4 sm:mt-6 sm:max-h-[90vh] sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <h2 id="case-study-title" className="text-2xl font-bold">{activeProject.name}</h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {activeProject.description[language]}
                  </p>
                </div>
                <button
                  onClick={onCloseProject}
                  aria-label="Close case study"
                  className="rounded-full border border-[var(--border)] p-2 text-lg transition hover:border-[var(--accent)]"
                >
                  <HiXMark />
                </button>
              </div>

              {/* Divider accent */}
              <div
                className="mb-6 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-purple), transparent)' }}
              />

              <div className="grid gap-5 text-sm leading-7 text-[var(--text-muted)]">
                {[
                  { label: text.problem, value: activeProject.caseStudy.problem[language] },
                  { label: text.solution, value: activeProject.caseStudy.solution[language] },
                  { label: text.role, value: activeProject.caseStudy.role[language] },
                  { label: text.challenges, value: activeProject.caseStudy.challenges[language] },
                  { label: text.impact, value: activeProject.caseStudy.impact[language] },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text)]">{label}</p>
                    <p>{value}</p>
                  </div>
                ))}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text)]">{text.architecture}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.caseStudy.architecture.map((item) => (
                      <span
                        key={item}
                        className="skill-tag rounded-full border border-[var(--border)] px-3 py-1 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-105"
                  >
                    <FiExternalLink size={13} />
                    {text.liveDemo}
                  </a>
                )}
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-105 ${
                    activeProject.demo
                      ? 'border border-[var(--border)] hover:border-[var(--accent)]'
                      : 'glow-btn'
                  }`}
                >
                  <FiGithub size={13} />
                  {text.github}
                </a>
                <button
                  onClick={onCloseProject}
                  className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm transition hover:border-[var(--accent)]"
                >
                  {text.close}
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}
