import React from 'react'
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

/* --- NEW: rough timeline data (edit freely) --- */
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
        link: '#/journey', // point to a future story page
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
          'Student org for prevention-first health literacy; workshops, peer training, and outreach.',
        tags: ['Prevention', 'Leadership'],
      },
      {
        title: 'Oncology Department Staff',
        org: 'HHS • Juravinski Cancer Centre',
        summary:
          'Clinical operations exposure: multi-disciplinary teams, patient flow, and safety culture.',
        tags: ['Clinical ops'],
      },
      {
        title: 'Sports Med Rehab Assistant (Intern)',
        org: 'McMaster DB Sports Med & Rehab',
        summary:
          'Rehab fundamentals, movement and prevention foundations that inform my lens today.',
        tags: ['Rehab', 'Movement'],
      },
    ],
  },
]

/* --- Timeline UI --- */
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
        {/* sticky year label on desktop */}
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

/* --- Page --- */
export default function JourneyPage() {
  usePreloadImages(stories.map(s => s.img))
  const onErr = (e) => { e.currentTarget.src = FALLBACK }

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">My Journey</h1>
      <p className="mt-3 text-slate-900 dark:text-slate-100/90 max-w-3xl">
        A deeper look at projects, teams, and ideas that shaped how I think about prevention-first medicine,
        imaging, and public health.
      </p>

      {/* Featured Stories */}
      <div className="mt-8">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">Featured Stories</h2>
          <span className="text-sm text-indigo-700 dark:text-indigo-300">Chronological</span>
        </div>

        <div className="overflow-x-auto flex gap-6 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
          {stories.map((s, i) => (
            <a key={i} href={s.link} className="snap-start flex-none w-80">
              <Card className="p-0 overflow-hidden">
                <img src={s.img} alt={s.title} onError={onErr} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{s.year}</div>
                  <h3 className="mt-1 font-semibold text-lg text-slate-950 dark:text-slate-50">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-900 dark:text-slate-100/90">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Read More →
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* NEW: Trend over time */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">Trend over time</h2>
        <p className="mt-2 text-slate-900 dark:text-slate-100/90 max-w-3xl">
          A rough chronology that shows how my focus moved from movement & prevention → harm reduction & policy →
          imaging + multi-omics for earlier detection.
        </p>

        <Timeline groups={timeline} />
      </div>
    </section>
  )
}
