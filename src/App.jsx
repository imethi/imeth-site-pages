// src/App.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, FileDown } from 'lucide-react'
import Typewriter from 'typewriter-effect'

// shared UI
import { brand, Pill, Card } from './ui/brand.jsx'

// data + journey pages
import stories from './journey/data/featuredStories.js'
import JourneyPage from './journey/JourneyPage.jsx'
import StoryPage from './journey/StoryPage.jsx'
import StanfordStory from './journey/data/stanford.jsx'
import NaloxonePage from './journey/NaloxonePage.jsx'
import CAMHPage from './journey/CAMHPage.jsx'

/* ---------- tiny router + theme ---------- */
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

/* ---------- assets / constants ---------- */
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

/* ---------- affiliations marquee (home) ---------- */
const affiliations = [
  { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Fellow', logo: `${BASE}logos/stanford.png`, link: 'https://med.stanford.edu/radiology.html' },
  { org: 'McMaster University — Dept. of Medicine', role: 'Research Student', logo: `${BASE}logos/mcmaster-med.png`, link: 'https://medicine.healthsci.mcmaster.ca/' },
  { org: 'CAMH', role: 'Policy & Public-Health Advisory', logo: `${BASE}logos/camh.png`, link: 'https://www.camh.ca/' },
  { org: 'McMaster SHIELD', role: 'Founder & Director', logo: `${BASE}logos/shield.png`, link: 'https://www.instagram.com/mac.shield/' },
  { org: 'HHS — Juravinski Cancer Centre', role: 'Oncology Department Staff', logo: `${BASE}logos/hhs.png`, link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/' },
  { org: 'University of Manitoba — INGAUGE Lab', role: 'Paediatric Research', logo: `${BASE}logos/umanitoba.png`, link: 'https://www.ingauge.ca/' },
  { org: 'McMaster Sports Med & Rehab', role: 'Rehab Assistant (Intern)', logo: `${BASE}logos/mcmaster-sportsmed.png`, link: 'https://sportmed.mcmaster.ca/' },
  { org: 'LMC Healthcare', role: 'Medical Office Admin (Intern)', logo: `${BASE}logos/lmc.png`, link: 'https://www.lmc.ca/' },
].map(i => ({ ...i, safeLogo: i.logo }))

const MarqueeRow = ({ items, direction = 'left', speedSeconds = 28 }) => {
  const anim = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="overflow-hidden">
      <div className={`inline-flex items-center whitespace-nowrap gap-12 will-change-transform ${anim}`} style={{ width: 'max-content', animationDuration: `${speedSeconds}s` }}>
        {[...items, ...items].map((it, idx) => (
          <a key={`${it.org}-${idx}`} href={it.link || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 pr-2" title={`${it.role} — ${it.org}`}>
            <img src={it.safeLogo} alt={it.org} className="h-8 w-auto object-contain" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">{it.org}</div>
              <div className="text-[11px] text-slate-900/80 dark:text-slate-100/80">{it.role}</div>
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
      <MarqueeRow items={items.slice(0, mid)} direction="left"  speedSeconds={26} />
      <MarqueeRow items={items.slice(mid)} direction="right" speedSeconds={32} />
    </div>
  )
}

/* ---------- inline pages to keep file self-contained ---------- */
function ContactPage() {
  const FORMSPREE_ID = 'your_form_id_here'
  const action = `https://formspree.io/f/${FORMSPREE_ID}`
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">Contact</h1>
      <p className="mt-2 text-slate-900 dark:text-slate-100/90">
        Reach out for collaborations in imaging, prevention, and public health.
      </p>

      <form action={action} method="POST" className="mt-8 grid gap-4">
        <input name="name" required placeholder="Your name" className="rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50"/>
        <input name="email" type="email" required placeholder="you@example.com" className="rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50"/>
        <textarea name="message" required placeholder="How can I help?" className="rounded-xl px-4 py-3 h-36 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50"/>
        <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 w-fit hover:opacity-90">Send</button>
      </form>

      <div className="mt-8 text-sm text-slate-900/80 dark:text-slate-100/80">
        Or email me directly: <a className="underline" href="mailto:imperuma@gmail.com">imperuma@gmail.com</a>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-8 py-14">
      <div className="grid md:grid-cols-[280px,1fr] gap-8 items-start">
        <img
          src={HEADSHOT_PATH}
          onError={(e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }}
          alt="Imeth Illamperuma"
          className="w-56 h-56 rounded-2xl object-cover ring-4 ring-white/60 dark:ring-white/10 shadow-lg"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">About Me</h1>
          <p className="mt-3 text-slate-900 dark:text-slate-100/90 leading-relaxed">
            I’m Imeth Illamperuma, an undergraduate student at McMaster University in Kinesiology with a
            Secondary in Psychology and a Certificate in Rehabilitation Science. My work blends medicine,
            public health, and computer science to improve prevention, diagnosis, and equitable care.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>HBSc, McMaster</Pill><Pill>Prevention-first medicine</Pill><Pill>Imaging + AI</Pill>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Journey teaser on home ---------- */
function JourneyTeaser() {
  // small, subtle strip of photos (just a nice touch)
  const imgs = [
    `${BASE}images/stanford.jpg`,
    `${BASE}images/naloxone.jpg`,
    `${BASE}images/camh.jpg`,
    `${BASE}images/manitoba.jpg`,
    `${BASE}images/mcmaster-medicine.jpg`,
    `${BASE}images/jcc.jpg`,
  ]
  return (
    <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">My Journey</h2>
          <p className="mt-3 text-slate-900 dark:text-slate-100/90">
            A living notebook of experiments, teams, and ideas that shaped how I think about
            prevention-first medicine, imaging, and health equity.
          </p>
          <a href="#/journey" className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition">
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="relative">
          <Card className="p-4 overflow-hidden">
            <div className="inline-flex items-center gap-3 whitespace-nowrap animate-marquee will-change-transform" style={{ width: 'max-content', animationDuration: '36s' }}>
              {[...imgs, ...imgs].map((src, i) => (
                <img key={`jr-${i}`} src={src} alt="" className="h-36 md:h-44 w-auto object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10" />
              ))}
            </div>
          </Card>
          <div className="mt-2 text-xs text-slate-900/80 dark:text-slate-100/75">Moments with teams and projects.</div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Publications page (kept inline) ---------- */
function PublicationsPage() {
  const LOGOS = [
    { file: 'healthydebate.png',   name: 'Healthy Debate' },
    { file: 'jack.org.png',        name: 'Jack.org' },
    { file: 'mac.png',             name: 'McMaster University' },
    { file: 'mdpi.png',            name: 'MDPI' },
    { file: 'MEDCITYNEWS.png',     name: 'MedCity News' },
    { file: 'NIH.png',             name: 'National Institutes of Health' },
    { file: 'OFID.png',            name: 'Open Forum Infectious Diseases' },
    { file: 'plos.png',            name: 'PLOS' },
    { file: 'sage.svg.png',        name: 'SAGE Publishing' },
    { file: 'stanfordmed.gif.png', name: 'Stanford Medicine' },
  ]
  const LINKS = {
    scholar: 'https://scholar.google.com/citations?user=Pzwn3y0AAAAJ&hl=en',
    orcid: 'https://orcid.org/0009-0007-3778-7635',
    linkedin: 'https://www.linkedin.com/in/imeth-illamperuma-3a734a193/details/publications/',
  }
  const Row = ({ items, dir='left', speed=28 }) => {
    const anim = dir === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
    return (
      <div className="overflow-hidden rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/5">
        <div className={`inline-flex items-center whitespace-nowrap gap-10 will-change-transform ${anim}`} style={{ width: 'max-content', animationDuration: `${speed}s` }}>
          {[...items, ...items].map((it, i) => (
            <div key={`${it.file}-${i}`} className="px-6 py-5">
              <img
                src={`${BASE}pub-logos/${it.file}`}
                alt={it.name}
                title={it.name}
                className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
  const half = Math.ceil(LOGOS.length/2)
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">Writing Published In</h1>
      <p className="mt-2 text-slate-900 dark:text-slate-100/90">A selection of outlets featuring my work.</p>

      <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <a href={LINKS.scholar} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10">🔎 Google Scholar</a>
          <a href={LINKS.orcid} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10">🟢 ORCID iD</a>
          <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10">💼 LinkedIn Publications</a>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Row items={LOGOS.slice(0, half)} dir="left" speed={26}/>
        <Row items={LOGOS.slice(half)} dir="right" speed={32}/>
      </div>

      <div className="mt-6 text-[11px] text-slate-900/80 dark:text-slate-100/75">Logos are for identification only and belong to their respective owners.</div>
    </section>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())
  React.useEffect(() => {
    const fn = () => setRoute(getRoute())
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])

  const handleImgError = (e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }

  return (
    <div className={`${brand.bg} min-h-screen`}>
      {/* ****** DIRECT NAV (no popover) ****** */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
          <a href="#/" className="group inline-flex items-center gap-2">
            <div className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}>ii</div>
            <div className="font-medium tracking-tight text-slate-900 dark:text-slate-50 group-hover:opacity-90 transition">Imeth Illamperuma</div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-900 dark:text-slate-100">
            <a href="#/" className="hover:opacity-80">Home</a>
            <a href="#/journey" className="hover:opacity-80">My Journey</a>
            <a href="#/about" className="hover:opacity-80">About</a>
            <a href="#/publications" className="hover:opacity-80">Publications</a>
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

      {/* ROUTES */}
      {route === 'home' && (
        <section id="home" className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">

            {/* HERO */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-shrink-0 relative">
                <img src={HEADSHOT_PATH} onError={handleImgError} alt="Imeth Illamperuma" className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white" />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Hey, I’m Imeth! I connect science, humanity, and innovation to shape the future of medicine.
                </motion.h1>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 text-lg md:text-xl text-slate-900 dark:text-slate-100/90">
                  <Typewriter options={{ strings: ['Student', 'Researcher', 'Preventative Medicine Advocate', 'Public Health Policy Advisor', 'Mentor'], autoStart: true, loop: true }} />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-3xl text-slate-900 dark:text-slate-100/90">
                  Prevention-first thinking, imaging for early detection, and turning evidence into action—from campus overdose response to equitable clinical workflows.
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>HBSc, McMaster</Pill>
                  <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
                  <Pill>Founder: SHIELD & The Naloxone Project</Pill>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#/contact" className="bg-indigo-600 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:opacity-90 transition"><Mail className="w-4 h-4" /> Contact</a>
                  <a href={`${BASE}Imeth-Illamperuma-CV.pdf`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-slate-800 dark:text-slate-50"><FileDown className="w-4 h-4" /> Download CV</a>
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="pt-4">
              <TwoLineCarousel items={affiliations} />
            </div>
          </div>

          {/* Journey teaser */}
          <JourneyTeaser />

        </section>
      )}

      {route === 'journey' && <JourneyPage />}
      {route === 'journey/stanford' && <StoryPage story={StanfordStory} />}
      {route === 'publications' && <PublicationsPage />}
      {route === 'about' && <AboutPage />}
      {route === 'contact' && <ContactPage />}
      {route === 'journey/naloxone' && <NaloxonePage />}
{route === 'journey/camh' && <CAMHPage />}

      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-slate-900/80 dark:text-slate-100/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#/">Home</a>
            <a className="hover:underline" href="#/journey">My Journey</a>
            <a className="hover:underline" href="#/publications">Publications</a>
            <a className="hover:underline" href="#/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
