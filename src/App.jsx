import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileDown } from 'lucide-react'
import Typewriter from 'typewriter-effect'

// Use Vite's BASE_URL so assets work on GitHub Pages regardless of repo
const BASE = import.meta.env.BASE_URL

// Public headshot path (place your file at public/images/imeth-profile.png after upload)
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`

// Inline fallback so preview never breaks if the image is missing
const FALLBACK_HEADSHOT = (() => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#bbf7d0'/><stop offset='100%' stop-color='#34d399'/></linearGradient></defs>
      <circle cx='128' cy='128' r='128' fill='url(#g)'/><text x='50%' y='54%' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial' font-size='84' fill='#064e3b' dy='.35em'>II</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})()

const brand = { bg: 'bg-emerald-50', text: 'text-emerald-950', accentBg: 'bg-emerald-700', card: 'bg-white/80 backdrop-blur' }
const Pill  = ({ children }) => (<span className="inline-flex items-center rounded-full border border-emerald-700/20 px-3 py-1 text-xs text-emerald-900/80">{children}</span>)
const Card  = ({ children }) => (<div className={`rounded-2xl ${brand.card} shadow-sm ring-1 ring-black/5 p-6`}>{children}</div>)

const logoFallback = (text) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 200'><rect width='600' height='200' fill='#ecfdf5'/><text x='50%' y='50%' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial' font-size='28' fill='#065f46'>${text}</text></svg>`
  )}`

// Carousel data — update logos by placing PNG/SVG files under public/logos
const affiliations = [
  { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Research Fellow', logo: `${BASE}logos/stanford.png`, link: 'https://med.stanford.edu/radiology.html' },
  { org: 'McMaster University — Dept. of Medicine', role: 'Research Student', logo: `${BASE}logos/mcmaster-med.png`, link: 'https://medicine.healthsci.mcmaster.ca/' },
  { org: 'CAMH', role: 'Research Advisory Network Delegate', logo: `${BASE}logos/camh.png`, link: 'https://www.camh.ca/' },
  { org: 'McMaster SHIELD', role: 'Founder & Director', logo: `${BASE}logos/shield.png`, link: 'https://www.instagram.com/mac.shield/' },
  { org: 'HHS — Juravinski Cancer Centre', role: 'Oncology Department Staff', logo: `${BASE}logos/hhs.png`, link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/' },
  { org: 'University of Manitoba — INGAUGE Lab', role: 'Internship / Summer Research Student', logo: `${BASE}logos/umanitoba.png`, link: 'https://www.ingauge.ca/' },
  { org: 'McMaster DB Sports Med & Rehab', role: 'Sports Specialist Rehab Assistant (Intern)', logo: `${BASE}logos/mcmaster-sportsmed.png`, link: 'https://sportmed.mcmaster.ca/' },
  { org: 'LMC Healthcare', role: 'Medical Office Administrator (Intern)', logo: `${BASE}logos/lmc.png`, link: 'https://www.lmc.ca/' },
].map(i => ({ ...i, safeLogo: i.logo, placeholder: logoFallback(i.org) }))

/* ---------- Two-line infinite carousel (opposite directions) ---------- */

const MarqueeRow = ({ items, direction = 'left', speedSeconds = 28 }) => {
  const anim =
    direction === 'left'
      ? `animate-[marquee_${speedSeconds}s_linear_infinite]`
      : `animate-[marqueeReverse_${speedSeconds}s_linear_infinite]`

  return (
    <div className="overflow-hidden">
      <div
        className={`inline-flex items-center whitespace-nowrap gap-12 will-change-transform ${anim}`}
        style={{ width: 'max-content' }}
      >
        {[...items, ...items].map((it, idx) => (
          <a
            key={`${it.org}-${idx}`}
            href={it.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 pr-2"
            title={`${it.role} — ${it.org}`}
          >
            <img
              src={it.safeLogo}
              onError={(e) => {
                e.currentTarget.src = it.placeholder
                e.currentTarget.onerror = null
              }}
              alt={it.org}
              className="h-8 w-auto object-contain"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-emerald-950">{it.org}</div>
              <div className="text-[11px] text-emerald-900/75">{it.role}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const TwoLineCarousel = ({ items }) => {
  const mid = Math.ceil(items.length / 2)
  const top = items.slice(0, mid)
  const bottom = items.slice(mid)

  return (
    <div className="space-y-3">
      <MarqueeRow items={top} direction="left" speedSeconds={26} />
      <MarqueeRow items={bottom} direction="right" speedSeconds={32} />
    </div>
  )
}

/* ------------------------------ Page ------------------------------ */

export default function App() {
  const handleImgError = (e) => {
    e.currentTarget.src = FALLBACK_HEADSHOT
    e.currentTarget.onerror = null
  }

  return (
    <div className={`${brand.bg} min-h-screen`}>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
          <a href="#home" className="group inline-flex items-center gap-2">
            <div className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}>ii</div>
            <div className="font-medium tracking-tight text-emerald-900 group-hover:text-emerald-800 transition">Imeth Illamperuma</div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-emerald-900/80">
            {['About', 'Journey', 'Offerings', 'Writing', 'Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="hover:text-emerald-900 transition">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-shrink-0 relative">
              <div className="absolute -z-10 -top-6 -left-6 w-12 h-12 rounded-full bg-emerald-200/70 blur-2xl" />
              <img src={HEADSHOT_PATH} onError={handleImgError} alt="Imeth Illamperuma" className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white" />
            </motion.div>
            <div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight text-emerald-950">
                Hey, I’m Imeth! I work to connect science, humanity, and innovation to shape the future of medicine.
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 text-lg md:text-xl text-emerald-900/80">
                <Typewriter
                  options={{
                    strings: ['Student', 'Researcher', 'Preventative Medicine Advocate', 'Public Health Policy Advisor', 'Mentor'],
                    autoStart: true,
                    loop: true
                  }}
                />
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-3xl text-emerald-900/90">
                I’m into prevention-first thinking and turning evidence into action — from campus overdose response to imaging-based early detection. My work spans public health, harm reduction, mental health, and the brain–gut axis, with a focus on real-world impact and health equity.
              </motion.p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
                <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
                <Pill>Founder: SHIELD & The Naloxone Project</Pill>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="bg-emerald-700 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:opacity-90 transition"><Mail className="w-4 h-4" /> Contact</a>
                <a href={`${BASE}Imeth-Illamperuma-CV.pdf`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white"><FileDown className="w-4 h-4" /> Download CV</a>
              </div>
            </div>
          </div>

          {/* Infinite Logos Carousel */}
          <div className="pt-4">
            <TwoLineCarousel items={affiliations} />
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
        <div className="mb-6">
          <h2 className={`text-2xl md:text-3xl font-semibold ${brand.text}`}>My Journey</h2>
          <p className="mt-2 text-emerald-900/70 max-w-3xl">How curiosity about prevention grew into research, advocacy, and building systems that help people earlier.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><h3 className="font-semibold text-emerald-950">Where it started</h3><p className="mt-2 text-emerald-900/80">Kinesiology at McMaster sharpened my lens on how small upstream choices ripple into lifelong health.</p></Card>
          <Card><h3 className="font-semibold text-emerald-950">Turning questions into tools</h3><p className="mt-2 text-emerald-900/80">At Stanford Radiology, I explored molecular imaging and the brain–gut axis to spot risk before symptoms speak.</p></Card>
          <Card><h3 className="font-semibold text-emerald-950">Evidence → Action</h3><p className="mt-2 text-emerald-900/80">On campus, we placed naloxone kits, trained peers, and built momentum for safer communities.</p></Card>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
        <div className="mb-6"><h2 className={`text-2xl md:text-3xl font-semibold ${brand.text}`}>What I Offer</h2></div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><h3 className="font-semibold text-emerald-950">Research Collaboration</h3><p className="mt-2 text-emerald-900/80">Imaging + multi-omics for early detection along the brain–gut axis.</p></Card>
          <Card><h3 className="font-semibold text-emerald-950">Policy & Advocacy</h3><p className="mt-2 text-emerald-900/80">Translating findings into practical guidance for equitable health systems.</p></Card>
          <Card><h3 className="font-semibold text-emerald-950">Talks & Workshops</h3><p className="mt-2 text-emerald-900/80">Prevention-first medicine, harm reduction on campus, and digital health equity.</p></Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="mb-8">
          <h2 className={`text-2xl md:text-3xl font-semibold ${brand.text}`}>Contact</h2>
          <p className="mt-2 text-emerald-900/70 max-w-3xl">Open to collaborations in imaging, public health, and tech-for-good.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><h4 className="font-semibold text-emerald-950">Email</h4><a href="mailto:imperuma@gmail.com" className="mt-2 block text-emerald-800 hover:underline">imperuma@gmail.com</a></Card>
          <Card><h4 className="font-semibold text-emerald-950">LinkedIn</h4><a href="https://www.linkedin.com/in/imeth-illamperuma" className="mt-2 inline-flex items-center gap-2 text-emerald-800 hover:underline"><Linkedin className="w-4 h-4" /> LinkedIn</a></Card>
          <Card><h4 className="font-semibold text-emerald-950">GitHub</h4><a href="https://github.com/" className="mt-2 inline-flex items-center gap-2 text-emerald-800 hover:underline"><Github className="w-4 h-4" /> GitHub</a></Card>
        </div>
      </section>

      <footer className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-emerald-900/70 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#journey">Journey</a>
            <a className="hover:underline" href="#offerings">What I Offer</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
