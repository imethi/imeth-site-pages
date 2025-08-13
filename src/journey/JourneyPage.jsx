import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL
const WAVE_IMG = `${BASE}images/imeth-wave.png`
const FEATURED_DIR = `${BASE}images/journey-featured/`

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#c7d2fe"/><stop offset="100%" stop-color="#fbcfe8"/></linearGradient></defs><rect width="480" height="360" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,Segoe UI,Roboto,Helvetica,Arial" font-size="16" fill="#0f172a">image</text></svg>`
  )

function srcUrl(path) {
  if (!path) return FALLBACK
  if (path.startsWith('http')) return path
  if (path.startsWith(BASE)) return path
  return BASE + path.replace(/^\/+/, '')
}

/* -----------------------------
   HERO
----------------------------- */
function JourneyHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 pt-10">
      <Card className="overflow-hidden p-0">
        <div className="relative grid md:grid-cols-2 gap-6 items-center">
          <div className="absolute -inset-6 bg-gradient-to-br from-indigo-600/10 via-fuchsia-500/10 to-emerald-500/10 blur-2xl pointer-events-none" />
          <div className="relative p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              <span className="inline-block">My Journey</span>
              <span className="block h-[3px] w-28 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />
            </h1>
            <p className="mt-4 text-slate-900 dark:text-slate-100/90">
              I’ve been chasing one question from different angles: <em>how do we
              catch risk earlier and care more humanly?</em> That thread pulled me
              from movement science and rehab into harm-reduction on campus,
              mental-health equity, and now molecular imaging with multi-omics for
              prevention-first medicine. This page is a living notebook of
              experiments, teams, and useful failures—plus the ideas I keep
              returning to: curiosity, access, and turning evidence into systems
              that work.
            </p>
            <a
              href="#featured"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition"
            >
              Explore Featured Stories →
            </a>
          </div>
          <div className="relative p-6 md:p-10">
            <div className="mx-auto max-w-[360px]">
              <img
                src={WAVE_IMG}
                alt="Doctor illustration"
                className="w-full h-auto object-contain select-none"
                onError={(e) => (e.currentTarget.src = FALLBACK)}
              />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

/* -----------------------------
   YOUR EXTRA SLIDES (images you sent)
----------------------------- */
const EXTRA_SLIDES = [
  {
    title: 'Stanford Fellowship: Molecular Imaging',
    when: '2025',
    teaser: 'See the fellowship notes & outputs →',
    href: '#/journey/stanford',
    image: `${FEATURED_DIR}stanford.jpg`,
    chips: ['Imaging', 'Brain–gut', 'Prevention-first'],
  },
  {
    title: 'The Naloxone Project',
    when: '2024–2025',
    teaser: 'How we placed 32+ kits & trained responders →',
    href: '#/journey/naloxone',
    image: `${FEATURED_DIR}naloxone.jpg`,
    chips: ['Harm reduction', 'Operations', 'Policy'],
  },
  {
    title: 'CAMH: Public Health & Policy',
    when: 'Ongoing',
    teaser: 'Advisory work for equitable access & language →',
    href: '#/journey/camh',
    image: `${FEATURED_DIR}camh.jpg`,
    chips: ['Mental health', 'Equity'],
  },
  {
    title: 'Paediatric Research (INGAUGE Lab)',
    when: '2024',
    teaser: 'Child/youth navigation of complex care →',
    href: '#/journey/ingauge',
    image: `${FEATURED_DIR}manitoba.jpg`,
    chips: ['Qualitative', 'Child health'],
  },
  {
    title: 'McMaster Department of Medicine Research',
    when: '2025—present',
    teaser: 'Clinical AI & research workflows in practice →',
    href: '#/journey/mcmaster-med',
    image: `${FEATURED_DIR}mcmaster-medicine.jpg`,
    chips: ['Clinical AI', 'Research'],
  },
  {
    title: 'Juravinski Cancer Centre',
    when: 'Earlier',
    teaser: 'Multidisciplinary teams & safety culture →',
    href: '#/journey/jcc',
    image: `${FEATURED_DIR}jcc.jpg`,
    chips: ['Oncology', 'Clinical ops'],
  },
]

/* -----------------------------
   FEATURED – INFINITE CAROUSEL
----------------------------- */
function FeaturedCard({ s }) {
  return (
    <a href={s.href || '#/journey'} className="group block">
      <Card className="p-0 overflow-hidden w-[320px] md:w-[360px] h-[400px]">
        <div className="aspect-[4/3] bg-slate-200/40 dark:bg-slate-800/40 overflow-hidden">
          <img
            src={srcUrl(s.image)}
            alt={s.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            onError={(e) => (e.currentTarget.src = FALLBACK)}
          />
        </div>
        <div className="p-4">
          {s.when && (
            <div className="text-xs text-slate-900/70 dark:text-slate-100/70">
              {s.when}
            </div>
          )}
          <h3 className="mt-1 font-semibold text-slate-950 dark:text-slate-50 line-clamp-2">
            {s.title}
          </h3>

          {/* Priming line to encourage clicking */}
          {s.teaser ? (
            <p className="mt-2 text-sm italic text-indigo-700 dark:text-indigo-300">
              {s.teaser}
            </p>
          ) : s.summary ? (
            <p className="mt-2 text-sm text-slate-900/85 dark:text-slate-100/85 line-clamp-2">
              {s.summary}
            </p>
          ) : null}

          {s.chips?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {s.chips.slice(0, 4).map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
          ) : null}

          <div className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">
            Open story →
          </div>
        </div>
      </Card>
    </a>
  )
}

function FeaturedStories() {
  // Merge your existing stories with the six extra image slides
  // De-dupe by title to avoid doubles if data overlaps.
  const byTitle = new Map()
  ;[...EXTRA_SLIDES, ...stories].forEach((s) => {
    if (!byTitle.has(s.title)) byTitle.set(s.title, s)
  })
  const slides = Array.from(byTitle.values())

  // Duplicate for seamless marquee
  const loop = [...slides, ...slides]

  return (
    <section id="featured" className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">
          Featured Stories
        </h2>
        <span className="text-sm text-slate-900/70 dark:text-slate-100/70">
          Scroll sideways • hover to pause
        </span>
      </div>

      <div className="mt-6 overflow-hidden">
        <div
          className="inline-flex items-stretch gap-6 whitespace-nowrap will-change-transform animate-marquee motion-reduce:animate-none"
          style={{ width: 'max-content', animationDuration: '38s' }}
        >
          {loop.map((s, idx) => (
            <FeaturedCard key={`${s.title}-${idx}`} s={s} />
          ))}
        </div>
      </div>

      {/* Reduced motion fallback */}
      <div className="sr-only">
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((s, i) => (
            <FeaturedCard key={`fallback-${i}`} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -----------------------------
   PAGE (timeline removed)
----------------------------- */
export default function JourneyPage() {
  return (
    <div className="pb-10">
      <JourneyHero />
      <FeaturedStories />
    </div>
  )
}
