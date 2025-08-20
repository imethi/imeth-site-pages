// src/journey/JourneyPage.jsx
import React from 'react'
import { ExternalLink } from 'lucide-react'
import stories from './data/featuredStories.js'
import { Card, Pill } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL

/* -------------------------------------------------------
   Utils: filter out repeats + empties
--------------------------------------------------------*/
function slugify(s = '') {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function isValidStory(s) {
  const hasTitle = !!s?.title?.trim()
  const hasSummary = !!s?.summary?.trim()
  const hasCover = !!s?.cover?.trim()
  const notHidden = !s?.hidden && !s?.draft
  return hasTitle && hasSummary && hasCover && notHidden
}

function dedupeBySlug(items) {
  const map = new Map()
  for (const s of items) {
    const key = s.slug || slugify(s.title || '')
    if (!key) continue
    if (!map.has(key)) map.set(key, { ...s, slug: key })
  }
  return Array.from(map.values())
}

/* -------------------------------------------------------
   Top "wheel" items
   - include your six hero images (if they’re not in data)
--------------------------------------------------------*/
const STATIC_WHEEL_ITEMS = [
  {
    slug: 'stanford',
    title: 'Stanford Fellowship',
    summary: 'Molecular imaging + multi-omics for early biomarkers.',
    cover: `${BASE}images/stanford.jpg`,
    href: '#/journey/stanford',
    tags: ['Imaging', 'Brain–gut'],
  },
  {
    slug: 'naloxone',
    title: 'The Naloxone Project',
    summary: '32+ emergency kits placed across campus.',
    cover: `${BASE}images/naloxone.jpg`,
    href: '#/journey/naloxone',
    tags: ['Harm reduction', 'Student safety'],
  },
  {
    slug: 'camh',
    title: 'CAMH Public Health Research',
    summary: 'Youth-centred harm reduction & equitable care.',
    cover: `${BASE}images/camh.jpg`,
    href: '#/journey/camh',
    tags: ['Policy', 'Equity'],
  },
  {
    slug: 'manitoba',
    title: 'Paediatric Research (INGAUGE Lab)',
    summary: 'Child/youth navigation of complex care; inclusion-centred design.',
    cover: `${BASE}images/manitoba.jpg`,
    href: '#/journey/manitoba',
    tags: ['Child health', 'Qualitative'],
  },
  {
    slug: 'mcmaster-medicine',
    title: 'McMaster Dept. of Medicine',
    summary: 'AI detection & LLMs in clinical/academic settings.',
    cover: `${BASE}images/mcmaster-medicine.jpg`,
    href: '#/journey/mcmaster-medicine',
    tags: ['AI', 'Operations'],
  },
  {
    slug: 'jcc',
    title: 'Juravinski Cancer Centre',
    summary: 'Clinical ops: multidisciplinary teams & safety culture.',
    cover: `${BASE}images/jcc.jpg`,
    href: '#/journey/jcc',
    tags: ['Oncology', 'Clinical ops'],
  },
]

/* -------------------------------------------------------
   Build the data sets used in this page
--------------------------------------------------------*/
const RAW = Array.isArray(stories) ? stories : []

// 1) Valid & unique stories from your data file
const VALID_DATA_STORIES = dedupeBySlug(RAW.filter(isValidStory))

// 2) Fill the wheel with your six hero items *unless* a data story
//    already covers that slug (ensures no repeats)
const wheelBySlug = new Set(VALID_DATA_STORIES.map(s => s.slug))
const EXTRA_STATIC = STATIC_WHEEL_ITEMS.filter(x => !wheelBySlug.has(x.slug))

// final wheel data: (valid stories that have cover art) + extras; de-duped
const WHEEL_ITEMS = dedupeBySlug(
  [
    // prefer stories that actually have a cover (for the wheel visuals)
    ...VALID_DATA_STORIES.filter(s => !!s.cover),
    ...EXTRA_STATIC,
  ].filter(Boolean)
)

// All stories for the list view: keep the full set of valid stories,
// but ensure uniqueness and stable order (newest-ish first if "when" exists)
const LIST_STORIES = dedupeBySlug(VALID_DATA_STORIES).sort((a, b) => {
  // naive sort: descending by numeric year(s) in "when", then by title
  const ay = (a.when || '').match(/\d{4}/g)?.map(Number)?.[0] || 0
  const by = (b.when || '').match(/\d{4}/g)?.map(Number)?.[0] || 0
  if (ay !== by) return by - ay
  return (a.title || '').localeCompare(b.title || '')
})

/* -------------------------------------------------------
   UI bits
--------------------------------------------------------*/
function Wheel({ items }) {
  // simple marquee-style loop using duplicated content
  return (
    <div className="overflow-hidden">
      <div
        className="inline-flex gap-6 whitespace-nowrap will-change-transform animate-marquee"
        style={{ width: 'max-content', animationDuration: '28s' }}
      >
        {[...items, ...items].map((s, i) => (
          <a
            key={`${s.slug}-${i}`}
            href={s.href || '#/journey'}
            className="group w-[320px] sm:w-[360px] rounded-2xl bg-white/5 ring-1 ring-black/10 dark:ring-white/10 overflow-hidden"
            title={s.title}
          >
            <div className="h-[180px] w-full bg-slate-900/50 overflow-hidden">
              <img
                src={s.cover}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={e => {
                  e.currentTarget.style.opacity = 0.2
                }}
              />
            </div>
            <div className="p-4">
              <div className="font-semibold text-slate-950 dark:text-slate-50">
                {s.title}
              </div>
              {s.summary && (
                <div className="mt-1 text-sm text-slate-900/80 dark:text-slate-100/80 line-clamp-2">
                  {s.summary}
                </div>
              )}
              {Array.isArray(s.tags) && s.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.tags.slice(0, 3).map(t => (
                    <Pill key={`${s.slug}-${t}`}>{t}</Pill>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function StoryRow({ s }) {
  return (
    <a
      href={s.href || '#/journey'}
      className="group block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/5 hover:bg-white/7 transition"
    >
      <div className="grid grid-cols-[88px,1fr] gap-4 p-4">
        <div className="h-[72px] w-[88px] rounded-xl overflow-hidden bg-slate-900/40">
          <img
            src={s.cover}
            alt=""
            className="w-full h-full object-cover"
            onError={e => (e.currentTarget.style.opacity = 0.25)}
          />
        </div>
        <div className="min-w-0">
          <div className="text-lg font-semibold text-slate-950 dark:text-slate-50 truncate">
            {s.title}
          </div>
          <div className="mt-0.5 text-[13px] text-slate-900/80 dark:text-slate-100/80">
            {s.when && <span className="mr-2">{s.when}</span>}
            {Array.isArray(s.tags) &&
              s.tags.slice(0, 4).map(t => (
                <span
                  key={`${s.slug}-mini-${t}`}
                  className="inline-block mr-1 rounded-md px-2 py-0.5 text-[11px] ring-1 ring-black/10 dark:ring-white/10 bg-white/5"
                >
                  {t}
                </span>
              ))}
          </div>
          {s.summary && (
            <div className="mt-1 text-sm text-slate-900/80 dark:text-slate-100/80 line-clamp-2">
              {s.summary}
            </div>
          )}
          <div className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-300">
            Open story <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  )
}

/* -------------------------------------------------------
   Page
--------------------------------------------------------*/
export default function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-slate-50">
          My Journey
        </h1>
        <p className="mt-2 text-slate-900 dark:text-slate-100/90 max-w-3xl">
          A deeper look at the projects and teams that shaped how I think about
          prevention-first medicine, imaging, and public health. Scroll the
          wheel for highlights, then dive into the list below.
        </p>
      </div>

      {/* Infinite wheel */}
      {WHEEL_ITEMS.length > 0 && (
        <Card className="p-4 overflow-hidden">
          <Wheel items={WHEEL_ITEMS} />
        </Card>
      )}

      {/* List view */}
      <div className="mt-10">
        <div className="mb-3">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
            All stories
          </h2>
          <p className="mt-1 text-slate-900/80 dark:text-slate-100/80">
            Skim the highlights and open any story to get the full context,
            artifacts, and gallery.
          </p>
        </div>

        <div className="grid gap-3">
          {LIST_STORIES.map(s => (
            <StoryRow key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
