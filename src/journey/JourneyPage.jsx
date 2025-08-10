import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL
const FALLBACK = `${BASE}images/journey-featured/_fallback.jpg`

/* --- preload Featured Stories images --- */
function usePreloadImages(srcs) {
  React.useEffect(() => {
    srcs.forEach(src => { const i = new Image(); i.src = src })
  }, [srcs])
}

/* --- rough timeline data (edit freely) --- */
const timeline = [
  {
    year: '2025',
    items: [
      {
        title: 'Molecular Imaging Fellowship',
        org: 'Stanford Radiology',
        summary:
          'Mini-fellowship exploring PET/MRI and multi-omics for early biomarkers along the brain–gut axis.',
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
        summary:
          'Placed 32 emergency naloxone kits across campus; improved access, training, and response workflows.',
        img: `${BASE}images/journey-featured/naloxone.jpg`,
        link: '#/journey',
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
        summary:
          'Mixed-methods research on child/youth navigation of complex care; inclusion-focused design.',
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
        summary:
          'Harm-reduction + culturally informed care models to improve equitable mental-health access.',
        img: `${BASE}images/journey-featured/camh.jpg`,
        tags: ['Mental health', 'Equity'],
      },
    ],
  },
  {
    year: 'Earlier',
    items: [
      {
        title: 'Founder & Director — SHIELD',
        org: 'McMaster University',
        summary:
          'Prevention-first health literacy; workshops, peer training, and outreach.',
        tags: ['Prevention', 'Leadership'],
      },
      {
        title: 'Oncology Department Staff',
        org: 'HHS • Juravinski Cancer Centre',
        summary:
          'Clinical operations exposure: multidisciplinary teams, patient flow, and safety culture.',
        tags: ['Clinical ops'],
      },
      {
        title: 'Sports Med Rehab Assistant (Intern)',
        org: 'McMaster DB Sports Med & Rehab',
        summary:
          'Rehab & movement foundations that still shape my lens.',
        tags: ['Rehab', 'Movement'],
      },
    ],
  },
]

/* --- small timeline UI bits --- */
const Dot = () => (
  <span className="absolute -start-1 top-3 block h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-50 dark:ring-slate-900" />
)

const ItemCard = ({ item }) => (
  <div className="relative ps-6">
    <Dot />
    <Card className="p-4">
      <div className="flex items-start gap-4">
        {item.img && (
          <img
            src={item.img}
            onError={(e) => { e.currentTarget.src = FALLBACK }}
            alt=""
            className="hidden sm:block w-20 h-20 rounded-lg object-cover ring-1 ring-black/5 dark:ring-white/10"
          />
        )}
        <div>
          <h4 className="font-semibold text-slate-950 dark:text-slate-50">{item.title}</h4>
          {item.org && (
            <div className="text-sm text-slate-500 dark:text-slate-400">{item.org}</div>
          )}
          {item.summary && (
            <p className="mt-2 text-sm text-slate-900 dark:text-slate-100/90">{item.summary}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags?.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/20"
              >
                {t}
              </span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              className="mt-3 inline-flex text-sm text-indigo-700 dark:text-indigo-300 hover:underline"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </Card>
  </div>
)

const Timeline = ({ groups }) => (
  <div className="mt-10 space-y-10">
    {groups.map((g) => (
      <div key={g.year} className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-2">
          <div className="md:sticky md:top-24 text-sm font-semibold text-indigo-400/90 pt-1">
            {g.year}
          </div>
        </div>
        <div className="md:col-span-10">
          <div className="border-s border-slate-200 dark:border-slate-700 space-y-6">
            {g.items.map((it, i) => <ItemCard key={i} item={it} />)}
          </div>
        </div>
      </div>
    ))}
  </div>
)

/* --- NEW: Animated Hero --- */
function AnimatedHero({ images }) {
  const imgs = images.length ? images.slice(0, 4) : [
    `${BASE}images/journey-images/IMG_2962.png`,
    `${BASE}images/journey-images/IMG_3664.png`,
    `${BASE}images/journey-images/IMG_5720.png`,
    `${BASE}images/journey-images/IMG_8893.png`,
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/10 bg-gradient-to-b from-slate-900/0 to-slate-900/20">
      {/* floating aurora blobs */}
      <motion.div
        className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full blur-3xl bg-indigo-500/30"
        animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-12 left-1/2 h-56 w-56 rounded-full blur-3xl bg-fuchsia-500/25"
        animate={{ x: [0, -12, 12, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-12 top-1/3 h-56 w-56 rounded-full blur-3xl bg-cyan-500/25"
        animate={{ x: [0, 8, -8, 0], y: [0, -12, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 p-6 md:p-10 grid md:grid-cols-12 gap-8 items-center">
        {/* left: animated heading */}
        <div className="md:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-slate-50"
          >
            My Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-slate-100/90 max-w-2xl"
          >
            A deeper look at projects, teams, and ideas that shaped how I think about
            prevention-first medicine, imaging, and public health.
          </motion.p>

          <motion.a
            href="#featured"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90"
          >
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </motion.a>
        </div>

        {/* right: floating 2x2 mosaic */}
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {imgs.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                onError={(e) => { e.currentTarget.src = FALLBACK }}
                alt=""
                className="w-full h-28 md:h-32 object-cover rounded-xl ring-1 ring-black/10 dark:ring-white/10"
                initial={{ y: i % 2 ? 4 : -4, rotate: i % 2 ? 1.5 : -1.5, opacity: 0 }}
                animate={{ y: i % 2 ? [-2, 2, -2] : [2, -2, 2], opacity: 1 }}
                transition={{ duration: 6 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                whileHover={{ scale: 1.03 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* --- Page --- */
export default function JourneyPage() {
  usePreloadImages(stories.map(s => s.img))
  const onErr = (e) => { e.currentTarget.src = FALLBACK }

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
      {/* animated hero */}
      <AnimatedHero images={stories.map(s => s.img)} />

      {/* Featured Stories */}
      <div id="featured" className="mt-10 md:mt-12">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">Featured Stories</h2>
          <span className="text-sm text-indigo-300">Chronological</span>
        </div>

        <div className="overflow-x-auto flex gap-6 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
          {stories.map((s, i) => (
            <a key={i} href={s.link} className="snap-start flex-none w-80">
              <Card className="p-0 overflow-hidden">
                <img src={s.img} alt={s.title} onError={onErr} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="text-sm font-medium text-indigo-300">{s.year}</div>
                  <h3 className="mt-1 font-semibold text-lg text-slate-50">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-100/90">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-indigo-300">
                    Read More →
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Trend over time */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">Trend over time</h2>
        <p className="mt-2 text-slate-100/90 max-w-3xl">
          A rough chronology showing the arc from movement & prevention → harm reduction & policy → imaging + multi-omics for earlier detection.
        </p>

        <Timeline groups={timeline} />
      </div>
    </section>
  )
}
