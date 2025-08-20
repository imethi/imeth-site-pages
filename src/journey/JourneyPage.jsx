import React from 'react'
import { Card } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL

/* ------------------ local data (featured only) ------------------ */
const FEATURED = [
  {
    key: 'stanford',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    when: '2025',
    blurb:
      'How molecular imaging and multi-omics can reveal early gut–brain biomarkers linked to dementia risk.',
    img: `${BASE}images/journey-featured/stanford.jpg`,
    href: '#/journey/stanford',
    tags: ['Imaging', 'Brain–gut'],
  },
  {
    key: 'naloxone',
    title: 'The Naloxone Project: Saving Lives on Campus',
    when: '2024–2025',
    blurb:
      '32+ emergency naloxone kits placed across McMaster to strengthen overdose response.',
    img: `${BASE}images/journey-featured/naloxone.jpg`,
    href: '#/journey/naloxone',
    tags: ['Harm reduction', 'Student safety'],
  },
  {
    key: 'camh',
    title: 'CAMH Public Health Research',
    when: 'Ongoing',
    blurb:
      'Harm-reduction + culturally informed models for more equitable mental health strategies.',
    img: `${BASE}images/journey-featured/camh.jpg`,
    href: '#/journey/camh',
    tags: ['Policy', 'Equity'],
  },
  {
    key: 'manitoba',
    title: 'University of Manitoba Paediatric Research (INGAUGE Lab)',
    when: '2024',
    blurb:
      'Child/youth navigation of complex care; inclusion-centred design and qualitative methods.',
    img: `${BASE}images/journey-featured/manitoba.jpg`,
    href: '#/journey/manitoba',
    tags: ['Child health', 'Qualitative'],
  },
  {
    key: 'jcc',
    title: 'HHS — Juravinski Cancer Centre',
    when: 'Earlier',
    blurb:
      'Clinical operations exposure: multidisciplinary teams, safety culture, and patient flow.',
    img: `${BASE}images/journey-featured/jcc.jpg`,
    href: '#/journey', // update when you make a dedicated page
    tags: ['Clinical ops'],
  },
  {
    key: 'mcmaster-med',
    title: 'McMaster Department of Medicine — Research Student',
    when: 'Earlier',
    blurb:
      'Early detection and prevention-first approaches within clinical and academic settings.',
    img: `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
    href: '#/journey', // update when you make a dedicated page
    tags: ['Prevention', 'Operations'],
  },
]

/* ------------------ hero mosaic ------------------ */
function HeroMosaic() {
  const pics = [
    `${BASE}images/journey-featured/stanford.jpg`,
    `${BASE}images/journey-featured/naloxone.jpg`,
    `${BASE}images/journey-featured/camh.jpg`,
    `${BASE}images/journey-featured/manitoba.jpg`,
  ]
  return (
    <div className="rounded-3xl bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-4">
      <div className="grid grid-cols-3 gap-4 md:h-[360px]">
        <img className="rounded-2xl object-cover w-full h-full" src={pics[0]} alt="" />
        <img className="rounded-2xl object-cover w-full h-full" src={pics[1]} alt="" />
        <img className="rounded-2xl object-cover w-full h-full" src={pics[2]} alt="" />
        <img className="rounded-2xl object-cover w-full h-full col-span-3 md:col-span-1" src={pics[3]} alt="" />
        <img className="rounded-2xl object-cover w-full h-full hidden md:block" src={pics[2]} alt="" />
        <img className="rounded-2xl object-cover w-full h-full hidden md:block" src={pics[3]} alt="" />
      </div>
      <div className="text-sm mt-3 text-slate-900/70 dark:text-slate-100/70">
        Moments with teams and projects.
      </div>
    </div>
  )
}

/* ------------------ featured static grid ------------------ */
function FeaturedGrid() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">
          Featured Stories
        </h2>
        <div className="text-xs text-slate-900/70 dark:text-slate-100/70">Static</div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED.map((s) => (
          <Card key={s.key} className="overflow-hidden">
            <img
              src={s.img}
              alt=""
              className="h-56 w-full object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
            />
            <div className="mt-4">
              <div className="text-slate-900/70 dark:text-slate-100/70 text-sm">{s.when}</div>
              <h3 className="mt-1 font-semibold text-slate-950 dark:text-slate-50">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-900 dark:text-slate-100/85">{s.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-lg bg-white/10 ring-1 ring-black/10 dark:ring-white/10 text-slate-900 dark:text-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={s.href}
                className="mt-4 inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
              >
                Open story →
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

/* ------------------ page ------------------ */
export default function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            My Journey
          </h1>
          <p className="mt-3 text-slate-900 dark:text-slate-100/90">
            A living notebook of experiments, teams, and ideas that shaped how I
            think about prevention-first medicine, imaging, and health equity.
          </p>
          <a
            href="#/journey#featured"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition"
          >
            Explore Featured Stories →
          </a>
        </div>
        <HeroMosaic />
      </div>

      {/* Featured only (no “All stories” list below) */}
      <div id="featured">
        <FeaturedGrid />
      </div>
    </section>
  )
}
