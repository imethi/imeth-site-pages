// src/journey/JourneyPage.jsx
import React from 'react'
import { Search, Filter, ExternalLink, Beaker, Shield, BookOpen, MapPin } from 'lucide-react'
import stories from './data/featuredStories.js'
import { Card, Pill } from '../ui/brand.jsx'

/* =========================
   Featured Stories (top)
   ========================= */

function FeaturedStories() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">Featured Stories</h2>
        <a href="#/journey" className="text-sm text-indigo-700 dark:text-indigo-300 hover:underline">Chronological</a>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.slice(0, 6).map((s, i) => (
          <a key={i} href={s.href} className="group">
            <Card className="p-0 overflow-hidden h-full">
              <div className="aspect-[4/3] bg-slate-200/40 dark:bg-slate-800/40 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-900/70 dark:text-slate-100/70">{s.when}</div>
                <h3 className="mt-1 font-semibold text-slate-950 dark:text-slate-50">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-900/85 dark:text-slate-100/85">{s.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.chips?.slice(0, 4).map(c => <Pill key={c}>{c}</Pill>)}
                </div>
                <div className="mt-3 text-sm text-indigo-700 dark:text-indigo-300 inline-flex items-center gap-1">
                  Read More <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}

/* =========================
   Directory (“Everything…”)
   ========================= */

const DIR_ITEMS = [
  {
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    when: '2025',
    summary:
      'Investigating how PET/MRI + multi-omics can surface early gut–brain biomarkers linked to dementia risk.',
    chips: ['Research', 'Imaging', 'Prevention-first', 'Brain–gut'],
    href: '#/journey/stanford',
    icon: <Beaker className="w-4 h-4" />
  },
  {
    title: 'The Naloxone Project: Saving Lives on Campus',
    when: '2024–2025',
    summary:
      'Placed 32 emergency naloxone kits across McMaster to strengthen overdose response.',
    chips: ['Policy', 'Campus', 'Harm reduction', 'Operations'],
    href: '#/journey/naloxone',
    icon: <Shield className="w-4 h-4" />
  },
  {
    title: 'CAMH Public Health & Policy Work',
    when: 'Ongoing',
    summary:
      'Youth-centred harm reduction + culturally responsive, equitable access; policy feedback & program input.',
    chips: ['Policy', 'Health equity', 'Mental health'],
    href: '#/journey/camh',
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    title: 'Paediatric Research (INGAUGE Lab)',
    when: '2024',
    summary:
      'Child/youth navigation of complex care; inclusion-centred design with Dr. Roberta Woodgate.',
    chips: ['Research', 'Child health', 'Equity', 'Qualitative'],
    href: '#/journey/ingauge',
    icon: <Beaker className="w-4 h-4" />
  },
  {
    title: 'Juravinski Cancer Centre (HHS)',
    when: 'Earlier',
    summary:
      'Clinical operations across multidisciplinary safety culture and patient-care workflows.',
    chips: ['Clinical ops', 'Oncology'],
    href: '#/journey/jcc',
    icon: <MapPin className="w-4 h-4" />
  },
  {
    title: 'McMaster Department of Medicine Research',
    when: '2025–present',
    summary:
      'AI/LLM applications in clinical & academic environments; trustworthy, usable, bias-aware tooling.',
    chips: ['Research', 'AI/LLM', 'Trustworthy AI'],
    href: '#/journey/mcmaster-dom',
    icon: <Beaker className="w-4 h-4" />
  },
  {
    title: 'Publications',
    when: 'Selected outlets',
    summary:
      'Logos + links: MDPI, PLOS, SAGE, MedCity News, NIH, Stanford Medicine, and more.',
    chips: ['Writing', 'Impact'],
    href: '#/publications',
    icon: <ExternalLink className="w-4 h-4" />
  },
  {
    title: 'About Me',
    when: 'Background',
    summary:
      'Kinesiology + Psychology + Rehab Science; prevention-first medicine with imaging and policy.',
    chips: ['Profile'],
    href: '#/about',
    icon: <ExternalLink className="w-4 h-4" />
  },
  {
    title: 'Contact',
    when: 'Collaborate',
    summary:
      'Research collabs, policy projects, talks/workshops, or campus harm-reduction support.',
    chips: ['Connect'],
    href: '#/contact',
    icon: <ExternalLink className="w-4 h-4" />
  }
]

const DIR_TAGS = [
  'Research',
  'Policy',
  'Imaging',
  'Campus',
  'Health equity',
  'AI/LLM',
  'Child health',
  'Clinical ops'
]

const DirectoryContext = React.createContext(null)

function JourneyDirectoryControls() {
  const [query, setQuery] = React.useState('')
  const [tags, setTags] = React.useState([])
  const [limit, setLimit] = React.useState(9)

  const value = React.useMemo(
    () => ({ query, setQuery, tags, setTags, limit, setLimit }),
    [query, tags, limit]
  )

  return (
    <DirectoryContext.Provider value={value}>
      <div className="px-5 md:px-6 py-4 border-b border-black/5 dark:border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Search */}
        <label className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/60 dark:text-slate-100/60" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search titles, summaries, or tags…"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 ring-1 ring-black/10 dark:ring-white/10 text-slate-900 dark:text-slate-50"
          />
        </label>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 text-xs text-slate-900/70 dark:text-slate-100/70">
            <Filter className="w-4 h-4" /> Filter
          </span>
          {DIR_TAGS.map(t => {
            const active = tags.includes(t)
            return (
              <button
                key={t}
                onClick={() =>
                  active
                    ? setTags(tags.filter(x => x !== t))
                    : setTags([...tags, t])
                }
                className={`px-3 py-1 rounded-full text-sm ring-1 transition ${
                  active
                    ? 'bg-indigo-600 text-white ring-indigo-600'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 ring-black/10 dark:ring-white/10'
                }`}
              >
                {t}
              </button>
            )
          })}
          {(tags.length > 0 || query) && (
            <button
              onClick={() => { setTags([]); setQuery('') }}
              className="px-3 py-1 rounded-full text-sm bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-slate-50 ring-1 ring-black/10 dark:ring-white/10"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </DirectoryContext.Provider>
  )
}

function JourneyDirectoryGrid() {
  const ctx = React.useContext(DirectoryContext) || {}
  const { query = '', tags = [], limit = 9, setLimit = () => {} } = ctx

  const q = query.trim().toLowerCase()

  const filtered = React.useMemo(() => {
    return DIR_ITEMS.filter(it => {
      const hay = [
        it.title.toLowerCase(),
        it.summary.toLowerCase(),
        ...(it.chips || []).map(c => c.toLowerCase())
      ].join(' ')
      const matchesQ = q ? hay.includes(q) : true
      const matchesTags = tags.length ? tags.every(t => it.chips?.includes(t)) : true
      return matchesQ && matchesTags
    })
  }, [q, tags])

  const showing = filtered.slice(0, limit)

  return (
    <>
      <div className="px-5 md:px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {showing.map((it, i) => (
          <a
            key={`${it.title}-${i}`}
            href={it.href}
            className="group rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/60 dark:bg-slate-900/60 p-4 hover:shadow-sm hover:ring-black/20 transition"
          >
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <span className="opacity-70">{it.icon}</span>
              <div className="font-semibold">{it.title}</div>
            </div>
            <div className="mt-1 text-xs text-slate-900/60 dark:text-slate-100/60">{it.when}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-900 dark:text-slate-100/90">{it.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">{it.chips?.map(c => <Pill key={c}>{c}</Pill>)}</div>
            <div className="mt-3 text-sm text-indigo-700 dark:text-indigo-300 inline-flex items-center gap-1">
              Open <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>

      <div className="px-5 md:px-6 pb-6">
        {filtered.length > limit ? (
          <button
            onClick={() => setLimit(limit + 9)}
            className="rounded-xl px-4 py-2 bg-white dark:bg-slate-800 ring-1 ring-black/10 dark:ring-white/10 text-slate-900 dark:text-slate-50 hover:opacity-90"
          >
            Show more ({filtered.length - limit} more)
          </button>
        ) : filtered.length > 9 && limit > 9 ? (
          <button
            onClick={() => setLimit(9)}
            className="rounded-xl px-4 py-2 bg-white dark:bg-slate-800 ring-1 ring-black/10 dark:ring-white/10 text-slate-900 dark:text-slate-50 hover:opacity-90"
          >
            Collapse
          </button>
        ) : null}
      </div>
    </>
  )
}

/* =========================
   Page
   ========================= */

export default function JourneyPage() {
  return (
    <div className="pb-8">
      {/* Hero Blurb */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-10">
        <Card className="p-6 md:p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-emerald-500/10">
          <div className="md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">My Journey</h1>
            <p className="mt-3 text-slate-900 dark:text-slate-100/90">
              A deeper look at projects, teams, and ideas that shaped how I think about prevention-first medicine,
              imaging, and public health.
            </p>
          </div>
        </Card>
      </section>

      {/* Featured */}
      <FeaturedStories />

      {/* Directory */}
      <section id="journey-directory" className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <Card className="p-0 overflow-hidden">
          <div className="px-5 md:px-6 py-5 border-b border-black/5 dark:border-white/10 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-emerald-500/5">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-950 dark:text-slate-50">Everything in one place</h2>
            <p className="mt-1 text-slate-900/80 dark:text-slate-100/80">
              Browse all projects, research, and pages. Use search and filters to jump straight to what you’re after.
            </p>
          </div>

          <JourneyDirectoryControls />
          <JourneyDirectoryGrid />
        </Card>
      </section>
    </div>
  )
}
