import React from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Mail, FileDown } from 'lucide-react'
import AboutPage from './about/AboutPage.jsx'

/* shared UI */
import { brand, Pill, Card } from './ui/brand.jsx'

/* data + pages */
import stories from './journey/data/featuredStories.js'
import JourneyPage from './journey/JourneyPage.jsx'
import AboutPage from './AboutPage.jsx'

/* ---------------- router + theme ---------------- */
const getRoute = () => (location.hash.replace(/^#\/?/, '') || 'home')

function useDarkMode () {
  const [dark, setDark] = React.useState(
    () => localStorage.getItem('theme') === 'dark'
  )
  React.useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark') }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light') }
  }, [dark])
  return [dark, setDark]
}

/* ---------------- assets + helpers ---------------- */
const BASE = import.meta.env.BASE_URL || '/'
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`
const FALLBACK_HEADSHOT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#e2e8f0"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="160" height="160" rx="16" fill="url(#g)"/><text x="50%" y="52%" font-family="system-ui,Segoe UI,Roboto,Arial" font-size="56" text-anchor="middle" fill="#0f172a">ii</text></svg>`
  )

/* ---------------- simple marquee CSS ---------------- */
const MarqueeCSS = () => (
  <style>{`
    @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
  `}</style>
)

/* ---------------- marquee components ---------------- */
const MarqueeRow = ({ children, reverse = false, seconds = 28 }) => (
  <div className="overflow-hidden">
    <div
      className="inline-flex items-center gap-12 will-change-transform"
      style={{
        width: 'max-content',
        animation: `${reverse ? 'marqueeRev' : 'marquee'} ${seconds}s linear infinite`
      }}
    >
      {children}
      {children}
    </div>
  </div>
)

const TwoLineCarousel = ({ items }) => {
  const mid = Math.ceil(items.length / 2)
  return (
    <div className="space-y-3">
      <MarqueeRow seconds={26}>
        {items.slice(0, mid).map((it, i) => (
          <a key={`m1-${i}`} href={it.link || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 pr-2">
            {it.safeLogo && <img src={it.safeLogo} alt={it.org} className="h-8 w-auto object-contain" />}
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">{it.org}</div>
              <div className="text-[11px] text-slate-900/80 dark:text-slate-100/80">{it.role}</div>
            </div>
          </a>
        ))}
      </MarqueeRow>
      <MarqueeRow reverse seconds={32}>
        {items.slice(mid).map((it, i) => (
          <a key={`m2-${i}`} href={it.link || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 pr-2">
            {it.safeLogo && <img src={it.safeLogo} alt={it.org} className="h-8 w-auto object-contain" />}
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">{it.org}</div>
              <div className="text-[11px] text-slate-900/80 dark:text-slate-100/80">{it.role}</div>
            </div>
          </a>
        ))}
      </MarqueeRow>
    </div>
  )
}

/* ---------------- data used on home ---------------- */
const affiliations = [
  { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Research Fellow', logo: `${BASE}logos/stanford.png`, link: 'https://med.stanford.edu/radiology.html' },
  { org: 'McMaster University — Dept. of Medicine', role: 'Research Student', logo: `${BASE}logos/mcmaster-med.png`, link: 'https://medicine.healthsci.mcmaster.ca/' },
  { org: 'CAMH', role: 'Public health / policy advisory', logo: `${BASE}logos/camh.png`, link: 'https://www.camh.ca/' },
  { org: 'McMaster SHIELD', role: 'Founder & Director', logo: `${BASE}logos/shield.png`, link: 'https://www.instagram.com/mac.shield/' },
  { org: 'HHS — Juravinski Cancer Centre', role: 'Oncology Department Staff', logo: `${BASE}logos/hhs.png`, link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/' },
  { org: 'University of Manitoba — INGAUGE Lab', role: 'Internship / Summer Research Student', logo: `${BASE}logos/umanitoba.png`, link: 'https://www.ingauge.ca/' },
  { org: 'McMaster DB Sports Med & Rehab', role: 'Sports Specialist Rehab Assistant (Intern)', logo: `${BASE}logos/mcmaster-sportsmed.png`, link: 'https://sportmed.mcmaster.ca/' },
  { org: 'LMC Healthcare', role: 'Medical Office Administrator (Intern)', logo: `${BASE}logos/lmc.png`, link: 'https://www.lmc.ca/' }
].map(i => ({ ...i, safeLogo: i.logo }))

/* long strip of photos used in the Journey teaser scroller */
const journeyFiles = [
  '019929.png','392883.png','8982934.png','92034.png','9234929.png',
  'IMG_2962.png','IMG_3664.png','IMG_5720.png','IMG_5726.png','IMG_8893.png'
]
const journeySrcs = journeyFiles.map(f => `${BASE}images/journey-images/${f}`)

/* ---------------- Journey teaser on Home ---------------- */
const JourneyTeaser = () => (
  <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">My Journey</h2>
        <p className="mt-3 text-slate-900 dark:text-slate-100/90">
          Medicine became more than a destination for me—it’s been a series of questions, mentors, and moments that reshaped how I think about care.
        </p>
        <a href="#/journey" className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition">
          Explore Featured Stories
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div className="relative">
        <Card className="p-4 overflow-hidden">
          <div
            className="inline-flex items-center gap-3 whitespace-nowrap will-change-transform"
            style={{ width: 'max-content', animation: `marquee 38s linear infinite` }}
          >
            {[...journeySrcs, ...journeySrcs].map((src, i) => (
              <img key={`jr-${i}`} src={src} alt="" className="h-36 md:h-44 w-auto object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10" />
            ))}
          </div>
        </Card>
        <div className="mt-2 text-xs text-slate-900/80 dark:text-slate-100/75">Moments with teams and projects that shaped my work.</div>
      </div>
    </div>
  </section>
)

/* ---------------- Journey quick menu (hover) ---------------- */
function JourneyQuickMenu ({ open, onClose }) {
  if (!open) return null
  return (
    <div
      onMouseLeave={onClose}
      className="absolute right-6 top-14 z-50 w-[560px] max-w-[90vw]"
    >
      <Card className="p-0 overflow-hidden">
        <div className="px-5 pt-4 pb-2 text-xs uppercase tracking-wide text-slate-400">
          Featured Stories
        </div>
        <div className="max-h-[60vh] overflow-auto">
          {stories.slice(0, 4).map((s) => (
            <a
              key={s.slug}
              href={s.href || '#/journey'}
              className="flex items-start gap-3 px-5 py-3 hover:bg-white/5 transition"
            >
              <img
                src={s.thumb || `${BASE}images/journey-featured/${s.cover || ''}`}
                alt=""
                className="w-14 h-14 rounded-lg object-cover ring-1 ring-black/10 dark:ring-white/10"
                onError={(e)=>{ e.currentTarget.style.opacity=0.25 }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-50 truncate">
                  {s.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.when || s.badge || ''}</div>
                <div className="text-xs text-slate-300/90 line-clamp-2 mt-0.5">
                  {s.summary}
                </div>
              </div>
            </a>
          ))}
        </div>
        <a
          href="#/journey"
          className="block text-center w-full px-5 py-3 bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm"
        >
          View all on My Journey →
        </a>
      </Card>
    </div>
  )
}

/* ---------------- HOME page (restored) ---------------- */
function HomePage () {
  const handleImgError = (e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }

  return (
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

        {/* Logos / affiliations infinite scroll */}
        <div className="pt-4">
          <TwoLineCarousel items={affiliations} />
        </div>
      </div>

      {/* Journey teaser (wide infinite scroller) */}
      <JourneyTeaser />
    </section>
  )
}

/* ---------------- APP shell ---------------- */
export default function App () {
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`${brand.bg} min-h-screen relative`}>
      <MarqueeCSS />

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16 relative">
          <a href="#/" className="group inline-flex items-center gap-2">
            <div className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}>ii</div>
            <div className="font-medium tracking-tight text-slate-900 dark:text-slate-50 group-hover:opacity-90 transition">Imeth Illamperuma</div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-900 dark:text-slate-100">
            <a href="#/" className="hover:opacity-80">Home</a>

            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <a href="#/journey" className="hover:opacity-80">My Journey</a>
              <JourneyQuickMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
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

      {/* ROUTES */}
      {route === 'home' && <HomePage />}
      {route === 'journey' && <JourneyPage />}
      {route === 'about' && <AboutPage />}
      {route === 'about' && <AboutPage />}


      {/* FOOTER */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-slate-900/80 dark:text-slate-100/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#/">Home</a>
            <a className="hover:underline" href="#/journey">My Journey</a>
            <a className="hover:underline" href="#/about">About</a>
            <a className="hover:underline" href="#/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
