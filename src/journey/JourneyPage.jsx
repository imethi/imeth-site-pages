// src/journey/JourneyPage.jsx
import React from 'react'
import stories from './data/featuredStories.js'
import { Card, Pill } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL
const IMG = (name) => `${BASE}images/journey-featured/${name}`

// Extra slides to ensure all your featured images show up
const EXTRA_SLIDES = [
  {
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    image: IMG('stanford.jpg'),
    href: '#/journey/stanford',
    summary:
      'Investigating PET/MRI + multi-omics for early biomarkers along the brain–gut axis.',
  },
  {
    title: 'The Naloxone Project: Saving Lives on Campus',
    image: IMG('naloxone.jpg'),
    href: '#/journey/naloxone',
    summary:
      'Placed 32+ emergency naloxone kits across McMaster to strengthen overdose response.',
  },
  {
    title: 'CAMH Public Health Research',
    image: IMG('camh.jpg'),
    href: '#/journey/camh',
    summary:
      'Policy & public-health advisory focused on youth harm reduction and equitable access.',
  },
  {
    title: 'University of Manitoba — Paediatric Research (INGAUGE Lab)',
    image: IMG('manitoba.jpg'),
    href: '#/journey/manitoba',
    summary:
      'Child/youth navigation of complex care; inclusion-centred design with Dr. Woodgate.',
  },
  {
    title: 'HHS — Juravinski Cancer Centre',
    image: IMG('jcc.jpg'),
    href: '#/journey/jcc',
    summary:
      'Clinical operations: multidisciplinary teams, safety culture, and patient-flow practice.',
  },
  {
    title: 'McMaster Department of Medicine Research',
    image: IMG('mcmaster-medicine.jpg'),
    href: '#/journey/mcmaster-medicine',
    summary:
      'AI in healthcare and research operations; making tools usable in real clinical settings.',
  },
]

// ---------- helpers ----------
const keyOf = (s = {}) => {
  const t = (s.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '')
  const h = (s.href || '').toLowerCase()
  const img = ((s.image || '').split('/').pop() || '').toLowerCase()
  return `${h}|${t}|${img}`
}

const onImgErr = (e) => {
  e.currentTarget.style.opacity = 0.25
  e.currentTarget.alt = 'image'
}

// ---------- small UI ----------
function FeaturedCard({ s }) {
  return (
    <a
      href={s.href || '#'}
      className="group snap-start w-[86vw] sm:w-[420px] md:w-[520px] no-underline"
    >
      <Card className="h-full p-0 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onError={onImgErr}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
        </div>

        <div className="p-4 md:p-5">
          {s.when && (
            <div className="text-indigo-300 text-sm mb-1">{s.when}</div>
          )}
          <h3 className="text-lg md:text-xl font-semibold text-slate-50">
            {s.title}
          </h3>
          {s.summary && (
            <p className="mt-2 text-sm text-slate-200/80 leading-relaxed">
              {s.summary}
            </p>
          )}
          <div className="mt-3 text-indigo-300 text-sm inline-flex items-center gap-1">
            Open story <span aria-hidden>→</span>
          </div>
        </div>
      </Card>
    </a>
  )
}

// ---------- sections ----------
function FeaturedStories() {
  // merge and de-dupe against any duplicates from data file
  const merged = [...EXTRA_SLIDES, ...stories]
  const seen = new Set()
  const unique = []
  for (const s of merged) {
    const k = keyOf(s)
    if (!seen.has(k)) {
      seen.add(k)
      unique.push(s)
    }
  }

  // duplicate once to create seamless marquee
  const loop = [...unique, ...unique]

  return (
    <section id="featured" className="max-w-6xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
          Featured Stories
        </h2>
        <span className="text-sm text-slate-300/80">Scroll • hover to pause</span>
      </div>

      <div className="mt-6 overflow-x-hidden">
        <div
          className="inline-flex items-stretch gap-6 whitespace-nowrap will-change-transform animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ width: 'max-content', animationDuration: '38s' }}
        >
          {loop.map((s, idx) => (
            <FeaturedCard key={`${keyOf(s)}-${idx}`} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- page ----------
export default function JourneyPage() {
  return (
    <section id="journey-page" className="pb-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-10 md:pt-12">
        <div className="rounded-2xl bg-gradient-to-b from-indigo-500/10 via-slate-900/10 to-slate-900/0 ring-1 ring-white/10 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            My Journey
          </h1>
          <p className="mt-3 max-w-3xl text-slate-200/90 leading-relaxed">
            A deeper look at projects, teams, and ideas that shaped how I think
            about prevention-first medicine, imaging, and public health. Below
            you’ll find a rotating set of highlights—tap any card to dive into a
            full story.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill>Prevention-first</Pill>
            <Pill>Imaging</Pill>
            <Pill>Equity</Pill>
            <Pill>Policy</Pill>
          </div>
        </div>
      </div>

      {/* Featured marquee only (directory removed) */}
      <FeaturedStories />
    </section>
  )
}
