import React from 'react'
import { Card } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL || '/'

/* hero collage: uses your covers from /public/images/journey-featured */
const HERO_FILES = [
  'stanford.jpg',
  'naloxone.jpg',
  'camh.jpg',
  'manitoba.jpg',
  'mcmaster-medicine.jpg',
  'jcc.jpg'
]

/* featured + list metadata */
const STORIES = [
  {
    slug: 'stanford',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    cover: 'stanford.jpg',
    summary:
      'How molecular imaging and multi-omics can reveal early gut–brain biomarkers linked to dementia risk.',
    tags: ['Imaging', 'Brain–gut']
  },
  {
    slug: 'naloxone',
    title: 'The Naloxone Project: Saving Lives on Campus',
    cover: 'naloxone.jpg',
    summary:
      '32+ emergency naloxone kits placed across McMaster to strengthen overdose response.',
    tags: ['Harm reduction', 'Student safety']
  },
  {
    slug: 'camh',
    title: 'CAMH Public Health Research',
    cover: 'camh.jpg',
    summary:
      'Harm-reduction + culturally informed models for more equitable mental health strategies.',
    tags: ['Policy', 'Equity']
  },
  {
    slug: 'manitoba',
    title: 'University of Manitoba Paediatric Research (INGAUGE Lab)',
    cover: 'manitoba.jpg',
    summary:
      'Child/youth navigation of complex care; inclusion-centred design and qualitative methods.',
    tags: ['Child health', 'Qualitative']
  },
  {
    slug: 'mcmaster-medicine',
    title: 'McMaster Department of Medicine — Research Student',
    cover: 'mcmaster-medicine.jpg',
    summary:
      'Early detection and prevention-first approaches within clinical and academic settings.',
    tags: ['Prevention', 'Operations']
  },
  {
    slug: 'jcc',
    title: 'HHS — Juravinski Cancer Centre',
    cover: 'jcc.jpg',
    summary:
      'Clinical operations exposure: multidisciplinary teams, safety culture, and patient flow.',
    tags: ['Clinical ops']
  }
]

export default function JourneyPage () {
  return (
    <main className='max-w-6xl mx-auto px-6 md:px-8 py-12'>
      {/* local marquee styles so we don’t rely on global css */}
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      {/* HERO */}
      <section className='grid md:grid-cols-2 gap-10 items-center'>
        <div>
          <h1 className='text-4xl md:text-5xl font-semibold text-slate-950 dark:text-slate-50'>
            My Journey
          </h1>
          <p className='mt-4 text-lg text-slate-900 dark:text-slate-100/90 max-w-2xl'>
            A living notebook of experiments, teams, and ideas that shaped how I
            think about prevention-first medicine, imaging, and health equity.
          </p>

          <a
            href='#journey-featured'
            className='mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition'
          >
            Explore Featured Stories →
          </a>
        </div>

        <Card className='p-4 overflow-hidden'>
          <div className='space-y-3'>
            {[0, 1, 2].map((row) => {
              const reverse = row % 2 === 1
              const files =
                row === 0
                  ? HERO_FILES
                  : row === 1
                  ? [...HERO_FILES].reverse()
                  : HERO_FILES
              const speed = 26 + row * 4
              return (
                <div
                  key={row}
                  className='inline-flex gap-3 whitespace-nowrap will-change-transform'
                  style={{
                    width: 'max-content',
                    animation: `${reverse ? 'marqueeRev' : 'marquee'} ${speed}s linear infinite`
                  }}
                >
                  {[...files, ...files].map((f, i) => (
                    <img
                      key={`${row}-${i}-${f}`}
                      src={`${BASE}images/journey-featured/${f}`}
                      alt=''
                      className='h-28 md:h-32 w-auto rounded-xl ring-1 ring-black/5 dark:ring-white/10 object-cover'
                    />
                  ))}
                </div>
              )
            })}
          </div>
          <div className='mt-2 text-xs text-slate-900/80 dark:text-slate-100/75'>
            Moments with teams and projects.
          </div>
        </Card>
      </section>

      {/* FEATURED */}
      <section id='journey-featured' className='mt-14'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50'>
            Featured Stories
          </h2>
          <div className='text-sm text-slate-900/80 dark:text-slate-100/80'>
            Chronological
          </div>
        </div>

        <div className='mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {STORIES.slice(0, 4).map((s) => (
            <Card key={s.slug} className='overflow-hidden'>
              <img
                src={`${BASE}images/journey-featured/${s.cover}`}
                alt={s.title}
                className='h-44 w-full object-cover'
              />
              <div className='p-5'>
                <h3 className='text-lg font-semibold text-slate-50'>{s.title}</h3>
                <p className='mt-2 text-slate-100/80 text-sm'>{s.summary}</p>
                <a
                  href={`#/journey`} /* link to main for now; your deep pages can replace */
                  className='mt-4 inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200'
                >
                  Open story →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ALL STORIES */}
      <section className='mt-14'>
        <h2 className='text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50'>
          All stories
        </h2>

        <div className='mt-6 space-y-5'>
          {STORIES.map((s) => (
            <Card key={`list-${s.slug}`} className='p-4 md:p-5'>
              <div className='flex items-start gap-4'>
                <img
                  src={`${BASE}images/journey-featured/${s.cover}`}
                  alt=''
                  className='w-16 h-16 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10'
                />
                <div className='flex-1'>
                  <div className='text-lg font-semibold text-slate-50'>
                    {s.title}
                  </div>
                  <div className='mt-1 text-slate-100/80'>{s.summary}</div>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className='px-2.5 py-1 rounded-full text-[11px] bg-white/10 text-white/90 ring-1 ring-white/10'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={`#/journey`} /* placeholder; hook to deep pages as you add them */
                  className='text-indigo-300 hover:text-indigo-200 whitespace-nowrap'
                >
                  Read →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
