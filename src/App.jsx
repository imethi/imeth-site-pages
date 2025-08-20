import React from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Mail, FileDown } from 'lucide-react'

/* UI helpers from your project */
import { brand, Pill, Card } from './ui/brand.jsx'

/* Pages (kept separate) */
import JourneyPage from './journey/JourneyPage.jsx'
import AboutPage from './AboutPage.jsx'

/* -------- simple router (hash) -------- */
const getRoute = () => (location.hash.replace(/^#\/?/, '') || 'home')

/* -------- theme -------- */
function useDarkMode () {
  const [dark, setDark] = React.useState(
    () => localStorage.getItem('theme') === 'dark'
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

/* -------- constants -------- */
const BASE = import.meta.env.BASE_URL || '/'
const HEADSHOT = `${BASE}images/imeth-profile1.png`
const FALLBACK_HEADSHOT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#e2e8f0"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="160" height="160" rx="16" fill="url(#g)"/><text x="50%" y="52%" font-family="system-ui,Segoe UI,Roboto,Arial" font-size="56" text-anchor="middle" fill="#0f172a">ii</text></svg>`
  )

/* ---------- small static pages kept local to avoid extra imports ---------- */
function ContactPage () {
  const FORMSPREE_ID = 'your_form_id_here'
  const action = `https://formspree.io/f/${FORMSPREE_ID}`
  return (
    <section className='max-w-3xl mx-auto px-6 md:px-8 py-14'>
      <h1 className='text-3xl font-semibold text-slate-950 dark:text-slate-50'>
        Contact
      </h1>
      <p className='mt-2 text-slate-900 dark:text-slate-100/90'>
        Reach out for collaborations in imaging, prevention, and public health.
      </p>

      <form action={action} method='POST' className='mt-8 grid gap-4'>
        <input
          name='name'
          required
          placeholder='Your name'
          className='rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50'
        />
        <input
          name='email'
          type='email'
          required
          placeholder='you@example.com'
          className='rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50'
        />
        <textarea
          name='message'
          required
          placeholder='How can I help?'
          className='rounded-xl px-4 py-3 h-36 ring-1 ring-black/10 bg-white dark:bg-slate-900 dark:text-slate-50'
        />
        <button className='bg-indigo-600 text-white rounded-xl px-5 py-3 w-fit hover:opacity-90'>
          Send
        </button>
      </form>

      <div className='mt-8 text-sm text-slate-900/80 dark:text-slate-100/80'>
        Or email me directly:{' '}
        <a className='underline' href='mailto:imperuma@gmail.com'>
          imperuma@gmail.com
        </a>
      </div>
    </section>
  )
}

function PublicationsPage () {
  const LINKS = {
    scholar:
      'https://scholar.google.com/citations?user=Pzwn3y0AAAAJ&hl=en',
    orcid: 'https://orcid.org/0009-0007-3778-7635',
    linkedin:
      'https://www.linkedin.com/in/imeth-illamperuma-3a734a193/details/publications/'
  }

  const LOGOS = [
    { file: 'healthydebate.png', name: 'Healthy Debate' },
    { file: 'jack.org.png', name: 'Jack.org' },
    { file: 'mac.png', name: 'McMaster University' },
    { file: 'mdpi.png', name: 'MDPI' },
    { file: 'MEDCITYNEWS.png', name: 'MedCity News' },
    { file: 'NIH.png', name: 'NIH' },
    { file: 'OFID.png', name: 'Open Forum Infectious Diseases' },
    { file: 'plos.png', name: 'PLOS' },
    { file: 'sage.svg.png', name: 'SAGE Publishing' },
    { file: 'stanfordmed.gif.png', name: 'Stanford Medicine' }
  ]

  const Row = ({ items, reverse = false, speed = 30 }) => (
    <div className='overflow-hidden rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/5'>
      <div
        className='inline-flex items-center whitespace-nowrap gap-10 will-change-transform'
        style={{
          width: 'max-content',
          animation: `${reverse ? 'marqueeRev' : 'marquee'} ${speed}s linear infinite`
        }}
      >
        {[...items, ...items].map((it, idx) => (
          <div key={`${it.file}-${idx}`} className='px-6 py-5'>
            <img
              src={`${BASE}pub-logos/${it.file}`}
              alt={it.name}
              title={it.name}
              className='h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition'
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className='max-w-6xl mx-auto px-6 md:px-8 py-14'>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      <h1 className='text-3xl font-semibold text-slate-950 dark:text-slate-50'>
        Writing Published In
      </h1>
      <p className='mt-2 text-slate-900 dark:text-slate-100/90'>
        A selection of outlets featuring my work.
      </p>

      <div className='mt-6 rounded-2xl bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <a
            href={LINKS.scholar}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10'
          >
            🔎 Google Scholar
          </a>
          <a
            href={LINKS.orcid}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10'
          >
            🟢 ORCID iD
          </a>
          <a
            href={LINKS.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-100 ring-1 ring-white/10'
          >
            💼 LinkedIn Publications
          </a>
        </div>
      </div>

      <div className='mt-8 space-y-4'>
        <Row items={LOGOS.filter((_, i) => i % 2 === 0)} speed={28} />
        <Row items={LOGOS.filter((_, i) => i % 2 === 1)} reverse speed={34} />
      </div>

      <div className='mt-6 text-[11px] text-slate-900/80 dark:text-slate-100/75'>
        Logos are for identification only and belong to their respective owners.
      </div>
    </section>
  )
}

/* ---------- HOME ---------- */
function HomePage () {
  const onImgErr = e => {
    e.currentTarget.src = FALLBACK_HEADSHOT
    e.currentTarget.onerror = null
  }
  const BASE = import.meta.env.BASE_URL || '/'

  const affiliations = [
    { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Research Fellow' },
    { org: 'McMaster Dept. of Medicine', role: 'Research Student' },
    { org: 'CAMH', role: 'Public health / policy advisory' },
    { org: 'McMaster SHIELD', role: 'Founder & Director' }
  ]

  return (
    <section id='home' className='relative overflow-hidden'>
      <div className='max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex-shrink-0'
          >
            <img
              src={HEADSHOT}
              onError={onImgErr}
              alt='Imeth Illamperuma'
              className='w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white'
            />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className='text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50'
            >
              Hey, I’m Imeth! I connect science, humanity, and innovation to
              shape the future of medicine.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className='mt-2 text-lg md:text-xl text-slate-900 dark:text-slate-100/90'
            >
              <Typewriter
                options={{
                  strings: [
                    'Student',
                    'Researcher',
                    'Preventative Medicine Advocate',
                    'Public Health Policy Advisor',
                    'Mentor'
                  ],
                  autoStart: true,
                  loop: true
                }}
              />
            </motion.div>

            <p className='mt-4 max-w-3xl text-slate-900 dark:text-slate-100/90'>
              I’m into prevention-first thinking and turning evidence into
              action—from campus overdose response to imaging-based early
              detection.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
              <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
              <Pill>Founder: SHIELD & The Naloxone Project</Pill>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <a
                href='#/contact'
                className='bg-indigo-600 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:opacity-90 transition'
              >
                <Mail className='w-4 h-4' />
                Contact
              </a>
              <a
                href={`${BASE}Imeth-Illamperuma-CV.pdf`}
                className='inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-slate-800 dark:text-slate-50'
              >
                <FileDown className='w-4 h-4' />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* quick affiliations line */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-6'>
          {affiliations.map((a, i) => (
            <Card key={i} className='p-4'>
              <div className='text-sm font-semibold text-slate-950 dark:text-slate-50'>
                {a.org}
              </div>
              <div className='text-xs text-slate-900/80 dark:text-slate-100/80'>
                {a.role}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- APP ---------- */
export default function App () {
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())

  React.useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`${brand.bg} min-h-screen`}>
      {/* header */}
      <header className='sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10'>
        <div className='max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16'>
          <a href='#/' className='group inline-flex items-center gap-2'>
            <div
              className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}
            >
              ii
            </div>
            <div className='font-medium tracking-tight text-slate-900 dark:text-slate-50 group-hover:opacity-90 transition'>
              Imeth Illamperuma
            </div>
          </a>

          <nav className='hidden md:flex items-center gap-6 text-slate-900 dark:text-slate-100'>
            <a href='#/' className='hover:opacity-80'>
              Home
            </a>
            {/* direct link to page (no dropdown) */}
            <a href='#/journey' className='hover:opacity-80'>
              My Journey
            </a>
            <a href='#/about' className='hover:opacity-80'>
              About
            </a>
            <a href='#/publications' className='hover:opacity-80'>
              Publications
            </a>
            <a href='#/contact' className='hover:opacity-80'>
              Contact
            </a>
            <button
              onClick={() => setDark(v => !v)}
              className='ml-2 rounded-lg px-3 py-1 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50'
              title='Toggle theme'
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* routes */}
      {route === 'home' && <HomePage />}
      {route === 'journey' && <JourneyPage />}
      {route === 'about' && <AboutPage />}
      {route === 'publications' && <PublicationsPage />}
      {route === 'contact' && <ContactPage />}

      {/* footer */}
      <footer className='border-t border-black/5 dark:border-white/10'>
        <div className='max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-slate-900/80 dark:text-slate-100/80 flex flex-col md:flex-row items-center justify-between gap-3'>
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className='flex items-center gap-4'>
            <a className='hover:underline' href='#/'>
              Home
            </a>
            <a className='hover:underline' href='#/journey'>
              My Journey
            </a>
            <a className='hover:underline' href='#/publications'>
              Publications
            </a>
            <a className='hover:underline' href='#/about'>
              About
            </a>
            <a className='hover:underline' href='#/contact'>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
