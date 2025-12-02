// src/App.jsx
import React from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Mail, FileDown } from 'lucide-react'

// shared UI
import { brand, Pill, Card } from './ui/brand.jsx'

// journey pages
import JourneyPage from './journey/JourneyPage.jsx'
import StoryPage from './journey/StoryPage.jsx'
import StanfordStory from './journey/data/stanford.jsx'
import AboutPage from './AboutPage.jsx'
import CAMHPage from './journey/CAMHPage.jsx'
import NaloxonePage from './journey/NaloxonePage.jsx'

/* ---------- tiny hash router ---------- */
const getRoute = () => (location.hash.replace(/^#\/?/, '') || 'home')

/* ---------- theme ---------- */
function useDarkMode() {
  const [dark, setDark] = React.useState(
    () => localStorage.getItem('theme') === 'dark' || window.matchMedia?.('(prefers-color-scheme: dark)').matches
  )

  React.useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return [dark, setDark]
}

/* ---------- assets ---------- */
const BASE = import.meta.env.BASE_URL
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`

const FALLBACK_HEADSHOT = (() => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='#0f172a'/>
          <stop offset='50%' stop-color='#4f46e5'/>
          <stop offset='100%' stop-color='#22c55e'/>
        </linearGradient>
      </defs>
      <rect width='256' height='256' rx='64' fill='url(#g)'/>
      <text x='50%' y='54%' text-anchor='middle'
        font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial'
        font-size='84' fill='#e5e7eb' dy='.35em'>II</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})()

/* ---------- affiliations ---------- */
const affiliations = [
  {
    org: 'Harvard Medical School',
    role: 'Cardiometabolic Research Collaborator',
    logo: `${BASE}logos/Harvard.png`,
    link: 'https://hms.harvard.edu/'
  },
  {
    org: 'Stanford Department of Medicine',
    role: 'Molecular Imaging Fellow',
    logo: `${BASE}logos/stanford.png`,
    link: 'https://med.stanford.edu/radiology.html'
  },
  {
    org: 'McMaster University — Dept. of Medicine',
    role: 'Research Student',
    logo: `${BASE}logos/mcmaster-med.png`,
    link: 'https://medicine.healthsci.mcmaster.ca/'
  },
  {
    org: 'CAMH',
    role: 'Public-health / policy advisory',
    logo: `${BASE}logos/camh.png`,
    link: 'https://www.camh.ca/'
  },
  {
    org: 'McMaster SHIELD',
    role: 'Founder & Director',
    logo: `${BASE}logos/shield.png`,
    link: 'https://www.instagram.com/mac.shield/'
  },
  {
    org: 'HHS — Juravinski Cancer Centre',
    role: 'Oncology Department Staff',
    logo: `${BASE}logos/hhs.png`,
    link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/'
  },
  {
    org: 'University of Manitoba — INGAUGE Lab',
    role: 'Summer Research Student',
    logo: `${BASE}logos/umanitoba.png`,
    link: 'https://www.ingauge.ca/'
  },
  {
    org: 'McMaster DB Sports Med & Rehab',
    role: 'Rehab Assistant (Intern)',
    logo: `${BASE}logos/mcmaster-sportsmed.png`,
    link: 'https://sportmed.mcmaster.ca/'
  },
  {
    org: 'LMC Healthcare',
    role: 'MOA (Intern)',
    logo: `${BASE}logos/lmc.png`,
    link: 'https://www.lmc.ca/'
  }
].map((i) => ({ ...i, safeLogo: i.logo }))

/* ---------- infinite photo strip (hero collage) ---------- */
const journeyFiles = [
  'IMG_2962.png',
  'IMG_3664.png',
  'IMG_5720.png',
  'IMG_5726.png',
  'IMG_8893.png',
  'camh.jpg',
  'naloxone.jpg',
  'stanford.jpg',
  'manitoba.jpg'
]
const journeySrcs = journeyFiles.map((f) => `${BASE}images/journey-images/${f}`)

/* ---------- marquee helpers ---------- */
const MarqueeRow = ({ items, direction = 'left', speedSeconds = 28 }) => {
  const anim = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="overflow-hidden">
      <div
        className={`inline-flex items-center whitespace-nowrap gap-10 will-change-transform ${anim}`}
        style={{ width: 'max-content', animationDuration: `${speedSeconds}s` }}
      >
        {[...items, ...items].map((it, idx) => (
          <a
            key={`${it.org}-${idx}`}
            href={it.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 pr-4 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-indigo-500/40 via-cyan-400/30 to-emerald-400/40 opacity-0 group-hover:opacity-100 blur-md transition" />
              <img
                src={it.safeLogo}
                alt={it.org}
                className="relative h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition"
              />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-50">
                {it.org}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-100/80">
                {it.role}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const TwoLineCarousel = ({ items }) => {
  const mid = Math.ceil(items.length / 2)
  return (
    <div className="space-y-3">
      <MarqueeRow items={items.slice(0, mid)} direction="left" speedSeconds={26} />
      <MarqueeRow items={items.slice(mid)} direction="right" speedSeconds={32} />
    </div>
  )
}

/* ---------- journey teaser ---------- */
function JourneyTeaser() {
  return (
    <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">
            From campus code blues to imaging suites.
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-slate-100/85">
            My path sits at the intersection of harm reduction, imaging science, and health policy.
            I like building systems where prevention isn’t an afterthought—it’s the design
            principle.
          </p>
          <a
            href="#/journey"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 hover:scale-[1.02] active:scale-[0.99] transition"
          >
            Explore the journey
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="relative">
          <Card className="p-4 overflow-hidden bg-slate-900/95 dark:bg-slate-900/95 border border-slate-700/80 shadow-[0_0_60px_rgba(129,140,248,0.35)]">
            <div
              className="inline-flex items-center gap-4 whitespace-nowrap animate-marquee will-change-transform"
              style={{ width: 'max-content', animationDuration: '38s' }}
            >
              {[...journeySrcs, ...journeySrcs].map((src, i) => (
                <img
                  key={`jr-${i}`}
                  src={src}
                  alt=""
                  className="h-32 md:h-40 w-auto object-cover rounded-2xl ring-1 ring-slate-700/80"
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0.2
                    e.currentTarget.alt = ' '
                  }}
                />
              ))}
            </div>
          </Card>
          <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300/80">
            Snapshots from projects, wards, and late-night draft sessions.
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- tiny components ---------- */
const HeroChip = ({ label }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/40 bg-slate-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
    {label}
  </span>
)

const StatCard = ({ k, label }) => (
  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-left">
    <div className="text-xl font-semibold text-slate-50">{k}</div>
    <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">{label}</div>
  </div>
)

/* ---------- main app ---------- */
export default function App() {
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())

  const handleImgError = (e) => {
    e.currentTarget.src = FALLBACK_HEADSHOT
    e.currentTarget.onerror = null
  }

  React.useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`${brand.bg} min-h-screen relative overflow-hidden`}>
      {/* ambient gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/70 dark:bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
          <a href="#/" className="group inline-flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 opacity-70 blur" />
              <div className="relative text-white w-9 h-9 rounded-xl grid place-items-center font-semibold text-sm tracking-tight bg-slate-950">
                ii
              </div>
            </div>
            <div className="font-medium tracking-tight text-slate-100 group-hover:opacity-80 transition">
              Imeth Illamperuma
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-100/90">
            <a href="#/" className="hover:text-sky-300 transition">
              Home
            </a>
            <a href="#/journey" className="hover:text-sky-300 transition">
              My Journey
            </a>
            <a href="#/about" className="hover:text-sky-300 transition">
              About
            </a>
            <a href="#/publications" className="hover:text-sky-300 transition">
              Publications
            </a>
            <a href="#/contact" className="hover:text-sky-300 transition">
              Contact
            </a>
            <button
              onClick={() => setDark((v) => !v)}
              className="ml-2 rounded-full px-3 py-1 text-xs border border-slate-600/80 bg-slate-900/80 text-slate-100 hover:border-sky-400/80 transition"
              title="Toggle theme"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      {route === 'home' && (
        <section id="home" className="relative">
          <div className="max-w-6xl mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-18 flex flex-col gap-12">
            {/* HERO */}
            <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] gap-10 items-center">
              {/* left: text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex flex-wrap gap-2"
                >
                  <HeroChip label="preventive medicine x imaging x ai" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-3.5xl md:text-5xl font-semibold tracking-tight text-slate-50"
                >
                  I build prevention-first futures at the edge of medicine, data, and design.
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="mt-3 text-base md:text-lg text-slate-200/90"
                >
                  <Typewriter
                    options={{
                      strings: [
                        'Molecular imaging & cardiometabolic risk.',
                        'Campus overdose response & naloxone design.',
                        'AI, ethics, and bias in cardiovascular care.',
                        'Student, mentor, and systems-builder-in-training.'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 35,
                      deleteSpeed: 16
                    }}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 max-w-2xl text-sm md:text-base text-slate-200/85"
                >
                  I like taking messy health problems—overdoses on campus, quiet imaging findings,
                  underrepresented data—and turning them into systems that move earlier, fairer, and
                  more human.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
                  <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
                  <Pill>Founder — SHIELD & The Naloxone Project</Pill>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <a
                    href="#/contact"
                    className="bg-sky-400 text-slate-950 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    <Mail className="w-4 h-4" /> Start a collab
                  </a>
                  <a
                    href={`${BASE}Imeth-Illamperuma-CV.pdf`}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-slate-500/70 bg-slate-900/70 text-slate-100 hover:border-sky-400/80 transition"
                  >
                    <FileDown className="w-4 h-4" /> Download CV
                  </a>
                </motion.div>
              </div>

              {/* right: avatar + stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex justify-center md:justify-end"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 opacity-70 blur-2xl" />
                  <div className="relative rounded-full bg-slate-950/80 p-[4px] shadow-[0_0_80px_rgba(15,23,42,0.9)]">
                    <img
                      src={HEADSHOT_PATH}
                      onError={handleImgError}
                      alt="Imeth Illamperuma"
                      className="w-40 h-40 md:w-60 md:h-60 rounded-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs grid grid-cols-3 gap-3 text-xs">
                    <StatCard k="10+" label="multi-institution collabs" />
                    <StatCard k="3" label="prevention tracks (care, policy, ai)" />
                    <StatCard k="∞" label="questions about equity & design" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Places I work (logo marquee) */}
            <section className="pt-12">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  trusted by / learning with
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400/60 to-transparent" />
              </div>
              <TwoLineCarousel items={affiliations} />
            </section>
          </div>

          {/* Journey teaser */}
          <JourneyTeaser />

          {/* What I offer */}
          <section id="offerings" className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
                How I like to plug in.
              </h2>
              <span className="hidden md:inline text-xs uppercase tracking-[0.2em] text-slate-400">
                research · policy · storytelling
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-950/80 border-slate-700/80">
                <h3 className="font-semibold text-slate-50">Research & design sprints</h3>
                <p className="mt-2 text-sm text-slate-200/85">
                  Imaging, prevention, and AI projects where we co-build questions, datasets, and
                  tangible outputs—papers, protocols, pilots.
                </p>
              </Card>
              <Card className="bg-slate-950/80 border-slate-700/80">
                <h3 className="font-semibold text-slate-50">Policy & systems thinking</h3>
                <p className="mt-2 text-sm text-slate-200/85">
                  Turning data into memos, frameworks, and roadmaps for more equitable overdose
                  response, screening pathways, and digital tools.
                </p>
              </Card>
              <Card className="bg-slate-950/80 border-slate-700/80">
                <h3 className="font-semibold text-slate-50">Talks, workshops & teaching</h3>
                <p className="mt-2 text-sm text-slate-200/85">
                  Sessions on AI bias, student-led harm reduction, and how to build a career that
                  spans lab bench, ward, and community.
                </p>
              </Card>
            </div>
          </section>
        </section>
      )}

      {route === 'journey' && <JourneyPage />}
      {route === 'journey/stanford' && <StoryPage story={StanfordStory} />}
      {route === 'about' && <AboutPage />}
      {route === 'journey/camh' && <CAMHPage />}
      {route === 'journey/naloxone' && <NaloxonePage />}
      {route === 'publications' && (
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 text-slate-50">
          Publications page coming back soon. For now, ask and I’ll happily send a list.
        </div>
      )}
      {route === 'contact' && (
        <section className="max-w-3xl mx-auto px-6 md:px-8 py-14">
          <h1 className="text-3xl font-semibold text-slate-50">Let’s build something useful.</h1>
          <p className="mt-2 text-sm md:text-base text-slate-200/85">
            Whether it&apos;s a scoping review, a student-led harm reduction project, or an idea
            that doesn&apos;t fit any box yet—send it through.
          </p>
          <form
            action={`https://formspree.io/f/your_form_id_here`}
            method="POST"
            className="mt-8 grid gap-4"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl px-4 py-3 ring-1 ring-slate-600/70 bg-slate-950/80 text-slate-50 placeholder:text-slate-500"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-xl px-4 py-3 ring-1 ring-slate-600/70 bg-slate-950/80 text-slate-50 placeholder:text-slate-500"
            />
            <textarea
              name="message"
              required
              placeholder="How can I help?"
              className="rounded-xl px-4 py-3 h-36 ring-1 ring-slate-600/70 bg-slate-950/80 text-slate-50 placeholder:text-slate-500"
            />
            <button className="bg-sky-400 text-slate-950 rounded-full px-5 py-3 w-fit text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_0_35px_rgba(56,189,248,0.65)]">
              Send
            </button>
          </form>
        </section>
      )}

      <footer className="border-t border-slate-800/80 mt-4">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 text-xs md:text-sm text-slate-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma · built with curiosity & caffeine</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-sky-300 transition" href="#/">
              Home
            </a>
            <a className="hover:text-sky-300 transition" href="#/journey">
              My Journey
            </a>
            <a className="hover:text-sky-300 transition" href="#/about">
              About
            </a>
            <a className="hover:text-sky-300 transition" href="#/publications">
              Publications
            </a>
            <a className="hover:text-sky-300 transition" href="#/contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
