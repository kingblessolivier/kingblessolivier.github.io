import { useEffect, useMemo, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import ChatbotWidget from './components/ChatbotWidget'
import ScrollProgress from './components/ScrollProgress'
import { TerminalModal } from './components/InteractiveTerminal'
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
import { projectBySlug, projectPath, slugFromPath } from './lib/projectRoutes'
import { useDocumentMeta } from './lib/seo'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

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

  /* ── Cursor spotlight: one listener feeds --mx/--my to whichever card is hovered ── */
  useEffect(() => {
    const onMove = (event) => {
      const card = event.target.closest?.('.bento-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

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

      <ScrollProgress />

      {/* Top bar and drawer are for small screens; on large ones the left panel navigates */}
      <div className="lg:hidden">
        <Navbar
          navLabels={navLabels}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
      </div>

      {/* ── Split layout: fixed identity panel left, work scrolling right ── */}
      <div className="split-shell lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[24rem_minmax(0,1fr)] xl:gap-24">
        <HeroSection
          labels={navLabels}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <div className="split-main @container min-w-0">
          <main id="main-content">
            <AboutSection language={language} navLabels={navLabels} sectionText={sectionText} />
            <ProjectsSection
              navLabels={navLabels}
              language={language}
              sectionText={sectionText}
              activeProject={activeProject}
              onOpenProject={openProject}
              onCloseProject={closeProject}
            />
            <SystemDesignSection sectionText={sectionText} language={language} />
            <SkillsSection navLabels={navLabels} sectionText={sectionText} />
            <AwardsSection navLabels={navLabels} sectionText={sectionText} language={language} onOpenProject={openProject} />
            <GallerySection navLabels={navLabels} sectionText={sectionText} language={language} />
            <WorkExperienceSection language={language} sectionText={sectionText} />
            <ContactSection navLabels={navLabels} sectionText={sectionText} />
          </main>

          <Footer />
        </div>
      </div>

      {/* One floating action: the assistant. WhatsApp lives in Contact and the
          terminal in the left panel / top bar, so nothing else hovers over the content. */}
      <ChatbotWidget />
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  )
}
