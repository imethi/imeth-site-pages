// src/journey/JourneyPage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL

/* --- restore the 6 original covers for the carousel --- */
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
    summary: 'Child/youth navigation; inclusion-centred design.',
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
    tags: ['AI', 'Ops'],
  },
  {
    slug: 'jcc',
    title: 'Juravinski Cancer Centre',
    summary: 'Clinical ops & safety culture.',
    cover: `${BASE}images/jcc.jpg`,
    href: '#/journey/jcc',
    tags: ['Oncology', 'Clinical ops'],
  },
]

/* --- de-dupe against data stories --- */
function dedupeBySlug(items) {
  const seen = new Set()
  const out = []
  for (const it of items) {
    const s = it.slug || it.title?.toLowerCase().replace(/\s+/g, '-')
    if (seen.has(s)) continue
    seen.add(s)
    out.push({ ...it, slug: s })
  }
  return out
}
const WHEEL = dedupeBySlug([...STATIC_WHEEL_ITEMS, ...stories])

/* --- simple horizontal infinite carousel --- */
function InfiniteRow({ items, speed = 40 }) {
  return (
    <div className="overflow-hidden">
      <div
        className="inline-flex gap-5 will-change-transform animate-marquee"
        style={{ width: 'max-content', animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((it, i) => (
          <a key={`${it.slug}-${i}`} href={it.href || '#'} className="group">
            <Card className="w-[280px] p-3">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={it.cover}
                  alt={it.title}
                  className="w-full h-[160px] object-cover"
                />
              </div>
              <div className="mt-3">
                <div className="font-semibold text-slate-950 dark:text-slate-50">{it.title}</div>
                {it.summary && (
                  <div className="text-sm text-slate-900/80 dark:text-slate-100/80 mt-1 line-clamp-2">
                    {it.summary}
                  </div>
                )}
                {it.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {it.tags.slice(0, 3).map(t => <Pill key={t}>{t}</Pill>)}
                  </div>
                )}
                <div className="mt-2 text-indigo-400 group-hover:underline text-sm">Open story →</div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

/* --- list view of all stories below --- */
function StoryList({ items }) {
  return (
    <div className="mt-10 grid gap-4">
      {items.map(it => (
        <a key={it.slug} href={it.href || '#'} className="block group">
          <Card className="p-4 hover:ring-indigo-400/30 transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10">
                <img src={it.cover} alt={it.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold text-slate-50 truncate">{it.title}</div>
                {it.summary && <div className="mt-1 text-sm text-slate-100/80 line-clamp-2">{it.summary}</div>}
                {it.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {it.tags.slice(0, 4).map(t => <Pill key={t}>{t}</Pill>)}
                  </div>
                )}
              </div>
              <div className="ml-auto text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition">Open →</div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  )
}

export default function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">My Journey</h1>
        <p className="mt-2 text-slate-100/85">
          A deeper look at projects, teams, and ideas that shaped how I think about prevention-first medicine,
          imaging, and public health.
        </p>
      </div>

      {/* Infinite carousel with restored hero images */}
      <InfiniteRow items={WHEEL} speed={44} />

      {/* List of stories for quick scanning */}
      <h2 className="mt-12 mb-4 text-2xl font-semibold text-slate-50">All stories</h2>
      <StoryList items={WHEEL} />
    </section>
  )
}
