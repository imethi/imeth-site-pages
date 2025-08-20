// src/App.jsx
import React from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'

// Data / stories (used elsewhere; kept here to avoid regressions)
import stories from './journey/data/featuredStories.js'

// UI bits
import { brand, Pill, Card } from './ui/brand.jsx'

// Journey pages
import JourneyPage from './journey/JourneyPage.jsx'
import StoryPage from './journey/StoryPage.jsx'
import StanfordStory from './journey/data/stanford.jsx'

// About page (EXTERNAL FILE) — do NOT redefine AboutPage in this file
import AboutPage from './AboutPage.jsx'

/* ---------- router + theme (defined ONCE) ---------- */
const getRoute = () => (location.hash.replace(/^#\/?/, '') || 'home')
function useDarkMode() {
  const [dark, setDark] = React.useState(() => localStorage.getItem('theme') === 'dark')
  React.useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark') }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light') }
  }, [dark])
  return [dark, setDark]
}

/* ---------- assets ---------- */
const BASE = import.meta.env.BASE_URL
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`
const FALLBACK_HEADSHOT = (() => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#e2e8f0'/><stop offset='100%' stop-color='#6366f1'/>
      </linearGradient></defs>
      <circle cx='128' cy='128' r='128' fill='url(#g)'/>
      <text x='50%' y='54%' text-anchor='middle'
        font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial'
        font-size='84' fill='#0f172a' dy='.35em'>II</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})()

/* ---------- journey hero mosaic (uses your files) ---------- */
const heroFiles = [
  'stanford.jpg',
  'naloxone.jpg',
  'camh.jpg',
  'manitoba.jpg',
  'mcmaster-medicine.jpg',
  'jcc.jpg',
]
const heroSrcs = heroFiles.map((f) => `${BASE}images/journey-featured/${f}`)

/* A simple two-row marquee mosaic */
function JourneyHeroMosaic({ speedTop = 32, speedBottom = 38 }) {
  const Row = ({ srcs, reverse = false, speed = 30 }) => {
    const anim = reverse ? 'animate-marquee-reverse' : 'animate-marquee'
    return (
      <div className="overflow-hidden">
        <div
          className={`inline-flex gap-4 whitespace-nowrap will-change-transform ${anim}`}
          style={{ width: 'max-content', animationDuration: `${speed}s` }}
        >
          {[...srcs, ...srcs].map((s, i) => (
            <img
              key={`${s}-${i}`}
              src={s}
              className="h-40 md:h-[220px] w-auto rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10"
              alt=""
              loading="lazy"
            />
          ))}
        </div>
      </div>
    )
  }

  const half = Math.ceil(heroSrcs.length / 2)
  const top = heroSrcs.slice(0, half)
  const bottom = heroSrcs.slice(half)

  return (
    <Card className="p-4 md:p-5">
      <div className="space-y-4">
        <Row srcs={top} reverse={false} speed={speedTop} />
        <Row srcs={bottom} reverse speed={speedBottom} />
      </div>
      <div className="mt-3 text-xs text-slate-900/80 dark:text-slate-100/75">
        Moments with teams and projects.
      </div>
    </Card>
  )
}

/* ---------- Home: “Journey” teaser block ---------- */
function JourneyTeaser() {
  return (
    <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            My Journey
          </h2>
          <p className="mt-4 text-slate-900 dark:text-slate-100/90 text-lg">
            A living notebook of experiments, teams, and ideas that shaped how I
            think about prevention-first medicine, imaging, and health equity.
          </p>
          <a
            href="#/journey"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-indigo-600 text-white hover:opacity-90 transition"
          >
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <JourneyHeroMosaic />
      </div>
    </section>
  )
}

/* ---------- Main App ---------- */
export default function App() {
  const handleImgError = (e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())
  React.useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`${brand.bg} min-h-screen`}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
          <a href="#/" className="group inline-flex items-center gap-2">
            <div className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}>ii</div>
            <div className="font-medium tracking-tight text-slate-900 dark:text-slate-50 group-hover:opacity-90 transition">
              Imeth Illamperuma
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-900 dark:text-slate-100">
            <a href="#/" className="hover:opacity-80">Home</a>
            {/* Directly go to Journey page */}
            <a href="#/journey" className="hover:opacity-80">My Journey</a>
            <a href="#/publications" className="hover:opacity-80">Publications</a>
            <a href="#/about" className="hover:opacity-80">About</a>
            <a href="#/contact" className="hover:opacity-80">Contact</a>
            <button
              onClick={() => setDark(v => !v)}
              className="ml-2 rounded-lg px-3 py-1 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
              title="Toggle theme"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* Routes */}
      {route === 'home' && (
        <section id="home" className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">
            {/* HERO */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 relative"
              >
                <img
                  src={HEADSHOT_PATH}
                  onError={handleImgError}
                  alt="Imeth Illamperuma"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white"
                />
              </motion.div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50"
                >
                  Hey, I’m Imeth! I connect science, humanity, and innovation to shape the future of medicine.
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-2 text-lg md:text-xl text-slate-900 dark:text-slate-100/90"
                >
                  <Typewriter
                    options={{
                      strings: ['Student', 'Researcher', 'Preventative Medicine Advocate', 'Public Health Policy Advisor', 'Mentor'],
                      autoStart: true,
                      loop: true
                    }}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 max-w-3xl text-slate-900 dark:text-slate-100/90"
                >
                  I’m into prevention-first thinking and turning evidence into action—from campus overdose response to imaging-based early detection.
                </motion.p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
                  <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
                  <Pill>Founder: SHIELD & The Naloxone Project</Pill>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#/contact"
                    className="bg-indigo-600 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:opacity-90 transition"
                  >
                    Contact
                  </a>
                  <a
                    href={`${BASE}Imeth-Illamperuma-CV.pdf`}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-slate-800 dark:text-slate-50"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Journey teaser with mosaic */}
          <JourneyTeaser />

          {/* Footer spacer */}
          <section className="max-w-6xl mx-auto px-6 md:px-8 pb-8" />
        </section>
      )}

      {route === 'journey' && <JourneyPage />}
      {route === 'journey/stanford' && <StoryPage story={StanfordStory} />}
      {route === 'about' && <AboutPage />}
      {route === 'publications' && (
        // If you have a Publications page component elsewhere, swap it in.
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-14 text-slate-900 dark:text-slate-100/90">
          <h1 className="text-3xl font-semibold">Publications</h1>
          <p className="mt-2 opacity-80">This placeholder is here only if you haven’t wired your Publications page.</p>
        </section>
      )}
      {route === 'contact' && (
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-14 text-slate-900 dark:text-slate-100/90">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="mt-2 opacity-80">Drop me a note at <a className="underline" href="mailto:imperuma@gmail.com">imperuma@gmail.com</a>.</p>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-slate-900/80 dark:text-slate-100/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#/">Home</a>
            <a className="hover:underline" href="#/journey">My Journey</a>
            <a className="hover:underline" href="#/publications">Publications</a>
            <a className="hover:underline" href="#/about">About</a>
            <a className="hover:underline" href="#/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
