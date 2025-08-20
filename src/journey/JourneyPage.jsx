// src/journey/JourneyPage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL

/* --------------------------- utilities --------------------------- */
const onImgErr = (e) => {
  e.currentTarget.style.opacity = 0.2
  e.currentTarget.alt = 'image'
}

/* --------------------------- hero carousel --------------------------- */
const HERO_IMAGES = [
  'stanford.jpg',
  'naloxone.jpg',
  'camh.jpg',
  'mcmaster-medicine.jpg',
  'manitoba.jpg',
  'jcc.jpg',
].map(f => `${BASE}images/journey-featured/${f}`)

const Hero = () => (
  <section className="max-w-6xl mx-auto px-6 md:px-8 py-10">
    <Card className="overflow-hidden relative">
      {/* title + copy */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="py-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">My Journey</h1>
          <p className="mt-3 text-slate-100/90">
            A deeper look at projects, teams, and ideas that shaped how I think about
            prevention-first medicine, imaging, and public health — with quick links to dive in.
          </p>

          <a
            href="#/journey#all-stories"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90"
          >
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* looping image belt */}
        <div className="py-4">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div
              className="inline-flex gap-4 whitespace-nowrap will-change-transform animate-marquee"
              style={{ width: 'max-content', animationDuration: '32s' }}
            >
              {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
                <img
                  key={`hero-${i}`}
                  src={src}
                  className="h-36 md:h-44 w-auto rounded-xl object-cover"
                  onError={onImgErr}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-100/75">
            Stanford • Naloxone project • CAMH • McMaster Medicine • INGAUGE Lab • Juravinski CC
          </div>
        </div>
      </div>

      {/* soft glow */}
      <div className="pointer-events-none absolute -inset-16 opacity-50 bg-[radial-gradient(60%_40%_at_70%_30%,rgba(99,102,241,.35),transparent_70%)]" />
    </Card>
  </section>
)

/* --------------------------- directory list --------------------------- */
const StoryRow = ({ s }) => (
  <a
    href={s.href}
    className="block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/5 hover:bg-white/[.07] transition p-4"
  >
    <div className="flex items-center gap-4">
      <img
        src={s.cover}
        alt={s.title}
        onError={onImgErr}
        className="w-16 h-16 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10"
      />
      <div className="min-w-0">
        <div className="text-lg font-semibold text-slate-50 truncate">{s.title}</div>
        <p className="mt-1 text-slate-100/80 line-clamp-2">{s.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {s.tags?.map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
      </div>
    </div>
  </a>
)

/* --------------------------- page --------------------------- */
export default function JourneyPage() {
  return (
    <section id="journey-root" className="pb-16">
      <Hero />

      {/* All stories */}
      <section id="all-stories" className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-2xl font-semibold text-slate-50">All stories</h2>

        <div className="mt-6 grid gap-4">
          {stories.map((s) => <StoryRow key={s.id} s={s} />)}
        </div>

        <div className="mt-10 text-sm text-slate-100/70">
          Want something that’s not here yet? Ping me on the <a className="underline" href="#/contact">contact page</a>.
        </div>
      </section>
    </section>
  )
}
