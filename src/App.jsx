// src/App.jsx
import React from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Mail, FileDown } from 'lucide-react'

/* ---------- env + shared UI ---------- */
const BASE = import.meta.env.BASE_URL || '/'
import { brand, Pill, Card } from './ui/brand.jsx'

/* ---------- data ---------- */
import stories from './journey/data/featuredStories.js' // used for the small hover menu

/* ---------- pages (single declaration each) ---------- */
import JourneyPage from './journey/JourneyPage.jsx'
import AboutPage from './about/AboutPage.jsx'
import PublicationsPage from './PublicationsPage.jsx'
import ContactPage from './ContactPage.jsx'

/* ---------- theme + router helpers ---------- */
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
const HEADSHOT = `${BASE}images/imeth-profile1.png`
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

/* ---------- small featured menu (hover) ---------- */
function FeaturedMenu({ open }) {
  if (!open) return null
  return (
    <div className="absolute right-0 top-full mt-2 w-[720px] max-w-[90vw] rounded-2xl shadow-xl ring-1 ring-black/10 dark:ring-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur z-40">
      <div className="px-4 pt-3 pb-2 text-xs font-semibold tracking-wide text-slate-900/80 dark:text-slate-100/80">FEATURED STORIES</div>
      <div className="divide-y divide-black/5 dark:divide-white/10">
        {stories.slice(0,4).map((s,i) => (
          <a
            key={s.id || i}
            href={s.href || '#/journey'}
            className="flex items-start gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <img
              src={s.cover}
              alt=""
              className="w-12 h-12 rounded-lg object-cover ring-1 ring-black/10 dark:ring-white/10 flex-shrink-0"
              onError={(e)=>{ e.currentTarget.style.opacity = 0.3 }}
            />
            <div className="min-w-0">
              <div className="text-slate-950 dark:text-slate-50 font-medium truncate">{s.title}</div>
              <div className="text-[12px] text-slate-900/70 dark:text-slate-100/70 line-clamp-1">{s.summary}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="p-3">
        <a
          href="#/journey"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition"
        >
          View all on My Journey →
        </a>
      </div>
    </div>
  )
}

/* ---------- affiliations carousel (optional; keep if your CSS has marquee keyframes) ---------- */
const affiliations = [
  { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Research Fellow', logo: `${BASE}logos/stanford.png`, link: 'https://med.stanford.edu/radiology.html' },
  { org: 'McMaster University — Dept. of Medicine', role: 'Research Student', logo: `${BASE}logos/mcmaster-med.png`, link: 'https://medicine.healthsci.mcmaster.ca/' },
  { org: 'CAMH', role: 'Research Advisory Network Delegate', logo: `${BASE}logos/camh.png`, link: 'https://www.camh.ca/' },
  { org: 'McMaster SHIELD', role: 'Founder & Director', logo: `${BASE}logos/shield.png`, link: 'https://www.instagram.com/mac.shield/' },
  { org: 'HHS — Juravinski Cancer Centre', role: 'Oncology Department Staff', logo: `${BASE}logos/hhs.png`, link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/' },
  { org: 'University of Manitoba — INGAUGE Lab', role: 'Internship / Summer Research Student', logo: `${BASE}logos/umanitoba.png`, link: 'https://www.ingauge.ca/' },
  { org: 'McMaster DB Sports Med & Rehab', role: 'Sports Specialist Rehab Assistant (Intern)', logo: `${BASE}logos/mcmaster-sportsmed.png`, link: 'https://sportmed.mcmaster.ca/' },
  { org: 'LMC Healthcare', role: 'Medical Office Administrator (Intern)', logo: `${BASE}logos/lmc.png`, link: 'https://www.lmc.ca/' },
].map(i => ({ ...i, safeLogo: i.logo }))

function MarqueeRow({ items, direction = 'left', speedSeconds = 28 }) {
  const anim = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="overflow-hidden">
      <div
        className={`inline-flex items-center whitespace-nowrap gap-12 will-change-transform ${anim}`}
        style={{ width: 'max-content', animationDuration: `${speedSeconds}s` }}
      >
        {[...items, ...items].map((it, idx) => (
          <a key={`${it.org}-${idx}`} href={it.link || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 pr-2">
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

function TwoLineCarousel({ items }) {
  const mid = Math.ceil(items.length / 2)
  return (
    <div className="space-y-3">
      <MarqueeRow items={items.slice(0, mid)} direction="left"  speedSeconds={26} />
      <MarqueeRow items={items.slice(mid)} direction="right" speedSeconds={32} />
    </div>
  )
}

/* ---------- home page (kept minimal & stable) ---------- */
function HomePage() {
  const handleImgError = (e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">
        {/* HERO */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-shrink-0 relative">
            <img src={HEADSHOT} onError={handleImgError} alt="Imeth Illamperuma" className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white" />
          </motion.div>
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              Hey, I’m Imeth! I connect science, humanity, and innovation to shape the future of medicine.
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 text-lg md:text-xl text-slate-900 dark:text-slate-100/90">
              <Typewriter options={{ strings: ['Student', 'Researcher', 'Preventative Medicine Advocate', 'Public Health Policy Advisor', 'Mentor'], autoStart: true, loop: true }} />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-3xl text-slate-900 dark:text-slate-100/90">
              I’m into prevention-first thinking and turning evidence into action—from campus overdose response to imaging-based early detection.
            </motion.p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
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
    </section>
  )
}

/* ---------- main app ---------- */
export default function App() {
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())
  const [menuOpen, setMenuOpen] = React.useState(false)

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
            <div className="font-medium tracking-tight text-slate-900 dark:text-slate-50 group-hover:opacity-90 transition">Imeth Illamperuma</div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-900 dark:text-slate-100 relative">
            <a href="#/" className="hover:opacity-80">Home</a>

            {/* My Journey — clicking navigates; hover shows preview */}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <a href="#/journey" className="hover:opacity-80 inline-flex items-center">My Journey</a>
              <FeaturedMenu open={menuOpen} />
            </div>

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

      {/* Router */}
      {route === 'home' && <HomePage />}
      {route === 'journey' && <JourneyPage />}
      {route === 'about' && <AboutPage />}
      {route === 'publications' && <PublicationsPage />}
      {route === 'contact' && <ContactPage />}

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-slate-900/80 dark:text-slate-100/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#/">Home</a>
            <a className="hover:underline" href="#/journey">My Journey</a>
            <a className="hover:underline" href="#/about">About</a>
            <a className="hover:underline" href="#/publications">Publications</a>
            <a className="hover:underline" href="#/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
