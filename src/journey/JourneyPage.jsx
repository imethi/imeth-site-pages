import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL
const FALLBACK = `${BASE}images/journey-featured/_fallback.jpg`

/* ---------- utilities ---------- */
function usePreloadImages(srcs) {
  React.useEffect(() => {
    srcs.forEach(src => { const i = new Image(); i.src = src })
  }, [srcs])
}
const onErr = (e) => { e.currentTarget.src = FALLBACK }

/* ---------- Animated Title ---------- */
function AnimatedTitle({ text }) {
  const letters = text.split('')
  const letterVariants = {
    hidden: { y: 18, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.03 * i, duration: 0.4, ease: 'easeOut' }
    })
  }
  return (
    <div className="relative inline-block">
      {/* gradient text */}
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="show"
            className="inline-block"
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </h1>

      {/* sweep underline */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
        className="block h-[3px] mt-2 origin-left rounded-full bg-gradient-to-r from-indigo-400/80 via-fuchsia-400/80 to-cyan-400/80"
      />
      {/* soft glow */}
      <div className="absolute -inset-x-4 -bottom-2 blur-xl opacity-25 bg-gradient-to-r from-indigo-500/60 via-fuchsia-500/60 to-cyan-500/60 rounded-full" />
    </div>
  )
}

/* ---------- timeline data ---------- */
const timeline = [
  {
    year: '2025',
    items: [
      {
        title: 'Molecular Imaging Fellowship',
        org: 'Stanford Radiology',
        summary: 'PET/MRI + multi-omics for early biomarkers along the brain–gut axis.',
        img: `${BASE}images/journey-featured/stanford.png`,
        link: '#/journey/stanford',
        tags: ['Imaging', 'Prevention-first', 'Brain–gut'],
      },
    ],
  },
  {
    year: '2024–2025',
    items: [
      {
        title: 'The Naloxone Project',
        org: 'McMaster University',
        summary: 'Placed 32 emergency naloxone kits; training and response workflows.',
        img: `${BASE}images/journey-featured/naloxone.jpg`,
        tags: ['Harm reduction', 'Operations', 'Policy'],
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        title: 'Paediatric Research (INGAUGE Lab)',
        org: 'University of Manitoba • Dr. Roberta Woodgate',
        summary: 'Child/youth navigation of complex care; inclusion-centred design.',
        img: `${BASE}images/journey-featured/ingauge.png`,
        tags: ['Qualitative', 'Equity', 'Child health'],
      },
    ],
  },
  {
    year: 'Ongoing',
    items: [
      {
        title: 'CAMH Public Health Research',
        org: 'Centre for Addiction and Mental Health',
        summary: 'Harm-reduction + culturally informed models for equitable access.',
        img: `${BASE}images/journey-featured/camh.jpg`,
        tags: ['Mental health', 'Equity'],
      },
    ],
  },
  {
    year: 'Earlier',
    items: [
      { title: 'Founder & Director — SHIELD', org: 'McMaster University', summary: 'Prevention-first health literacy; workshops and peer training.', tags: ['Prevention', 'Leadership'] },
      { title: 'Oncology Department Staff', org: 'HHS • Juravinski Cancer Centre', summary: 'Clinical ops exposure: multidisciplinary teams and safety culture.', tags: ['Clinical ops'] },
      { title: 'Sports Med Rehab Assistant (Intern)', org: 'McMaster DB Sports Med & Rehab', summary: 'Rehab & movement foundations that still shape my lens.', tags: ['Rehab', 'Movement'] },
    ],
  },
]

/* ---------- timeline UI ---------- */
const Dot = () => (
  <span className="absolute -start-1 top-3 block h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-50 dark:ring-slate-900" />
)
const ItemCard = ({ item }) => (
  <div className="relative ps-6">
    <Dot />
    <Card className="p-4">
      <div className="flex items-start gap-4">
        {item.img && (
          <img src={item.img} onError={onErr} alt="" className="hidden sm:block w-20 h-20 rounded-lg object-cover ring-1 ring-black/5 dark:ring-white/10" />
        )}
        <div>
          <h4 className="font-semibold text-slate-50">{item.title}</h4>
          {item.org && <div className="text-sm text-slate-400">{item.org}</div>}
          {item.summary && <p className="mt-2 text-sm text-slate-100/90">{item.summary}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags?.map(t => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20">{t}</span>
            ))}
          </div>
          {item.link && <a href={item.link} className="mt-3 inline-flex text-sm text-indigo-300 hover:underline">View →</a>}
        </div>
      </div>
    </Card>
  </div>
)
const Timeline = ({ groups }) => (
  <div className="mt-10 space-y-10">
    {groups.map(g => (
      <div key={g.year} className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-2">
          <div className="md:sticky md:top-24 text-sm font-semibold text-indigo-300 pt-1">{g.year}</div>
        </div>
        <div className="md:col-span-10">
          <div className="border-s border-slate-700 space-y-6">{g.items.map((it, i) => <ItemCard key={i} item={it} />)}</div>
        </div>
      </div>
    ))}
  </div>
)

/* ---------- Featured Stories: infinite marquee with smart image fit ---------- */
const extraFeatured = [
  {
    year: '2025—Present',
    title: 'Juravinski Cancer Centre',
    desc: 'Oncology department operations: patient flow, quality & safety, and multidisciplinary coordination.',
    img: `${BASE}images/journey-featured/jcc.jpg`,
    link: '#/journey',
  },
  {
    year: '2025—Present',
    title: 'McMaster Department of Medicine — Research',
    desc: 'Clinical & translational research collaborations across internal medicine divisions.',
    img: `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
    link: '#/journey',
  },
]
const FEATURED_STORIES = [...stories, ...extraFeatured]

function FeaturedCard({ s }) {
  const [fit, setFit] = React.useState('cover')
  const handleLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    const r = w / h
    setFit(r >= 1.8 || r <= 0.75 ? 'contain' : 'cover') // logos vs photos
  }

  return (
    <a href={s.link} className="inline-block w-80">
      <Card className="p-0 overflow-hidden">
        <div className="h-48 bg-slate-900/30">
          <img
            src={s.img}
            alt={s.title}
            onError={onErr}
            onLoad={handleLoad}
            className={`w-full h-full ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
          />
        </div>
        {/* reset nowrap inherited from marquee */}
        <div className="p-5 whitespace-normal">
          <div className="text-sm font-medium text-indigo-300">{s.year}</div>
          <h3 className="mt-1 font-semibold text-lg leading-snug text-slate-50">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-100/90">{s.desc}</p>
          <span className="mt-3 inline-flex items-center text-sm font-medium text-indigo-300">Read More →</span>
        </div>
      </Card>
    </a>
  )
}
function FeaturedMarquee({ items, speed = 40 }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="inline-flex gap-6 whitespace-nowrap animate-marquee will-change-transform"
        style={{ width: 'max-content', animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((s, i) => (
          <FeaturedCard key={`${s.title}-${i}`} s={s} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Hero (static portrait, smaller) ---------- */
function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-b from-slate-900/0 to-slate-900/20">
      {/* aurora blobs */}
      <motion.div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full blur-3xl bg-indigo-500/30"
        animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute -bottom-12 left-1/2 h-56 w-56 rounded-full blur-3xl bg-fuchsia-500/25"
        animate={{ x: [0, -12, 12, 0], y: [0, 10, -10, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute -right-12 top-1/3 h-56 w-56 rounded-full blur-3xl bg-cyan-500/25"
        animate={{ x: [0, 8, -8, 0], y: [0, -12, 12, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 p-6 md:p-10 grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7">
          <AnimatedTitle text="My Journey" />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
            className="mt-4 text-slate-100/90 max-w-2xl leading-relaxed"
          >
            I’ve been chasing one question from different angles: <em>how do we catch risk
            earlier and care more humanly</em>? That thread pulled me from movement science
            and rehab into harm-reduction on campus, mental-health equity, and now molecular
            imaging with multi-omics for prevention-first medicine. This page is a living
            notebook of experiments, teams, and useful failures—plus the ideas I keep
            returning to: curiosity, access, and turning evidence into systems that work.
          </motion.p>

          <motion.a
            href="#featured"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90"
          >
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </motion.a>
        </div>

        {/* Static portrait — smaller, never cropped */}
        <div className="md:col-span-5 grid place-items-center">
          <img
            src={`${BASE}images/imeth-wave.png`}  // use any static PNG/JPG here
            alt="Imeth in scrubs"
            className="w-[240px] sm:w-[280px] h-auto object-contain select-none"
            loading="eager"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function JourneyPage() {
  const extraImgs = [
    `${BASE}images/journey-featured/jcc.jpg`,
    `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
  ]
  usePreloadImages([...FEATURED_STORIES.map(s => s.img), ...extraImgs])

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
      <Hero />

      {/* Featured Stories */}
      <div id="featured" className="mt-10 md:mt-12">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">Featured Stories</h2>
          <span className="text-sm text-indigo-300">Chronological</span>
        </div>
        <FeaturedMarquee items={FEATURED_STORIES} />
      </div>

      {/* Trend over time */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">Trend over time</h2>
        <p className="mt-2 text-slate-100/90 max-w-3xl">
          A rough chronology showing the arc from movement & prevention → harm reduction & policy →
          imaging + multi-omics for earlier detection.
        </p>
        <Timeline groups={timeline} />
      </div>
    </section>
  )
}
