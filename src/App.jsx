import { useEffect, useMemo, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import ChatbotWidget from './components/ChatbotWidget'
import SectionConnector from './components/SectionConnector'
import ScrollProgress from './components/ScrollProgress'
import { TerminalModal, TerminalTrigger } from './components/InteractiveTerminal'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import WorkExperienceSection from './sections/WorkExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SystemDesignSection from './sections/SystemDesignSection'
import SkillsSection from './sections/SkillsSection'
import AwardsSection from './sections/AwardsSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'
import { labels, uiContent } from './assets/data'
import CursorTrail from './components/CursorTrail'
import WhatsAppFloat from './components/WhatsAppFloat'
import { projectBySlug, projectPath, slugFromPath } from './lib/projectRoutes'
import { useDocumentMeta } from './lib/seo'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* Soft rounded background shapes, distributed down both sides of the page */
const PAGE_SHAPES = [
  { top: '3%',  side: 'left',  size: 440, radius: 96,  rot: 12 },
  { top: '11%', side: 'right', size: 360, radius: 999, rot: -8 },
  { top: '21%', side: 'left',  size: 320, radius: 80,  rot: 8 },
  { top: '31%', side: 'right', size: 420, radius: 96,  rot: -6 },
  { top: '41%', side: 'left',  size: 340, radius: 999, rot: 10 },
  { top: '51%', side: 'right', size: 380, radius: 84,  rot: -10 },
  { top: '61%', side: 'left',  size: 320, radius: 96,  rot: 6 },
  { top: '71%', side: 'right', size: 420, radius: 999, rot: -6 },
  { top: '81%', side: 'left',  size: 340, radius: 80,  rot: 8 },
  { top: '90%', side: 'right', size: 360, radius: 96,  rot: -8 },
]

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState('EN')
  const [terminalOpen, setTerminalOpen] = useState(false)

  /* ── Routing: each case study lives at /projects/<slug> ── */
  const [projectSlug, setProjectSlug] = useState(() => slugFromPath(window.location.pathname))
  const activeProject = useMemo(() => projectBySlug(projectSlug), [projectSlug])

  useDocumentMeta(activeProject, language)

  /* Back/forward should close or reopen the case study, not leave the page. */
  useEffect(() => {
    const onPopState = () => setProjectSlug(slugFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  /* Landing straight on a case-study URL should show it in context. */
  useEffect(() => {
    if (!slugFromPath(window.location.pathname)) return
    document.getElementById('projects')?.scrollIntoView({ block: 'start' })
  }, [])

  const openProject = useCallback((project) => {
    window.history.pushState({ caseStudy: true }, '', projectPath(project))
    setProjectSlug(slugFromPath(window.location.pathname))
  }, [])

  const closeProject = useCallback(() => {
    if (window.history.state?.caseStudy) {
      /* We pushed this entry, so stepping back returns to whatever was open before. */
      window.history.back()
    } else {
      /* Landed here directly — replace the entry so Back still leaves the site. */
      window.history.replaceState({}, '', '/')
      setProjectSlug(null)
    }
  }, [])

  const navLabels = useMemo(() => labels[language], [language])
  const sectionText = useMemo(() => uiContent[language], [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  /* Keep <html lang> in sync so assistive tech pronounces content correctly */
  useEffect(() => {
    const langMap = { EN: 'en', KINY: 'rw', FR: 'fr' }
    document.documentElement.lang = langMap[language] ?? 'en'
  }, [language])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  /* ── Keyboard shortcut: Ctrl+` to open terminal ── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setTerminalOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative isolate min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ── Soft rounded background shapes down both sides of the page ── */}
      <div className="page-shapes" aria-hidden="true">
        {PAGE_SHAPES.map((s, i) => (
          <span
            key={i}
            style={{
              top: s.top,
              [s.side]: `${-Math.round(s.size * 0.55)}px`,
              width: s.size,
              height: s.size,
              borderRadius: s.radius,
              transform: `rotate(${s.rot}deg)`,
            }}
          />
        ))}
      </div>

      <CursorTrail />
      <ScrollProgress />

      {/* ── Fluent system grid — Microsoft-style line mesh ── */}
      <div className="fluent-grid" aria-hidden="true" />

      <Navbar
        navLabels={navLabels}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main id="main-content">
        <HeroSection labels={navLabels} />
        <SectionConnector to="about"    label="About" index={1} />
        <AboutSection language={language} navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector to="projects" label="Projects" index={2} />
        <ProjectsSection
          navLabels={navLabels}
          language={language}
          sectionText={sectionText}
          activeProject={activeProject}
          onOpenProject={openProject}
          onCloseProject={closeProject}
        />
        <SectionConnector to="systems"  label="Systems" index={3} />
        <SystemDesignSection sectionText={sectionText} language={language} />
        <SectionConnector to="skills"   label="Skills" index={4} />
        <SkillsSection navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector to="awards"   label="Awards" index={5} />
        <AwardsSection navLabels={navLabels} sectionText={sectionText} language={language} />
        <SectionConnector to="gallery"  label="Gallery" index={6} />
        <GallerySection navLabels={navLabels} sectionText={sectionText} language={language} />
        <SectionConnector to="work"     label="Experience" index={7} />
        <WorkExperienceSection language={language} sectionText={sectionText} />
        <SectionConnector to="contact"  label="Contact" index={8} />
        <ContactSection navLabels={navLabels} sectionText={sectionText} />
      </main>

      <Footer visitorsLabel={navLabels.visitors} />
      <WhatsAppFloat />
      <ChatbotWidget />
      <TerminalTrigger onClick={() => setTerminalOpen(true)} />
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  )
}
