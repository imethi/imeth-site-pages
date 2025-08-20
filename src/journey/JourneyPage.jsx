// src/journey/JourneyPage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'

const BASE = import.meta.env.BASE_URL

/* ---------- image sources ---------- */
// Covers you said live in: public/images/journey-featured/
const FEATURED_COVERS = [
  'stanford.jpg',
  'naloxone.jpg',
  'camh.jpg',
  'manitoba.jpg',
  'mcmaster-medicine.jpg',
  'jcc.jpg',
].map(f => `${BASE}images/journey-featured/${f}`)

// Optional “moments” line (keep or trim) from: public/images/journey-images/
const MOMENTS = [
  'IMG_2962.png',
  'IMG_3664.png',
  'IMG_5720.png',
  'IMG_5726.png',
  'IMG_8893.png',
].map(f => `${BASE}images/journey-images/${f}`)

/* Map story keys -> cover images for the list below */
const COVER_BY_KEY = {
  stanford: `${BASE}images/journey-featured/stanford.jpg`,
  naloxone: `${BASE}images/journey-featured/naloxone.jpg`,
  camh: `${BASE}images/journey-featured/camh.jpg`,
  manitoba: `${BASE}images/journey-featured/manitoba.jpg`,
  jcc: `${BASE}images/journey-featured/jcc.jpg`,
  mcmasterMed: `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
}

/* ---------- tiny utility ---------- */
function Img({ src, alt = '', className = '', ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={e => {
        e.currentTarget.style.opacity = 0.25
        e.currentTarget.alt = 'image'
      }}
      {...rest}
    />
  )
}

/* ---------- marquee strip ---------- */
function MarqueeStrip({ images, height = 176, duration = 30 }) {
  // In case your global CSS doesn’t have .animate-marquee, inject a fallback.
  const keyframes = `
@keyframes jm-marquee { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}
.jm-marquee {
  animation: jm-marquee ${duration}s linear infinite;
  will-change: transform;
}
`
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/3">
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div className="relative">
        <div
          className="inline-flex gap-4 jm-marquee"
          style={{ width: 'max-content' }}
        >
          {[...images, ...images].map((src, i) => (
            <Img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className="h-40 md:h-44 w-auto object-cover rounded-xl ring-1 ring-black/5 dark:ring-white/10"
              style={{ height }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- page ---------- */
export default function JourneyPage() {
  React.useEffect(() => window.scrollTo(0, 0), [])

  // filter out any “empty”/repeat stories (no title or no href)
  const cleanStories = stories.filter(s => s?.title && s?.href)

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
            My Journey
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-100/85">
            A living notebook of experiments, teams, and ideas that shaped how I
            think about prevention-first medicine, imaging, and health equity.
          </p>
          <a
            href="#/journey"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-indigo-600 text-white hover:opacity-90 transition"
            title="Open all stories"
          >
            Explore Featured Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>

        <Card className="p-4">
          {/* line 1: covers */}
          <MarqueeStrip images={FEATURED_COVERS} duration={26} />
          {/* line 2: candid moments */}
          <div className="mt-3">
            <MarqueeStrip images={MOMENTS} duration={34} />
          </div>
          <div className="mt-2 text-xs text-slate-100/70">Moments with teams and projects.</div>
        </Card>
      </div>

      {/* ALL STORIES */}
      <div className="mt-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">All stories</h2>

        <div className="mt-6 space-y-4">
          {cleanStories.map((s, idx) => {
            const cover =
              s.cover ||
              COVER_BY_KEY[s.key] ||
              FEATURED_COVERS[idx % FEATURED_COVERS.length]

            return (
              <a
                key={s.key || s.href || idx}
                href={s.href}
                className="block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/3 hover:bg-white/5 transition"
              >
                <div className="p-4 md:p-5 grid grid-cols-[72px_1fr] md:grid-cols-[92px_1fr] gap-4 items-center">
                  <div className="h-16 w-16 md:h-[72px] md:w-[72px] rounded-xl overflow-hidden bg-slate-900/30 ring-1 ring-black/10 dark:ring-white/10 grid place-items-center">
                    <Img src={cover} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-semibold text-slate-50">
                      {s.title}
                    </div>
                    {s.summary && (
                      <div className="mt-1 text-slate-100/80">
                        {s.summary}
                      </div>
                    )}
                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.tags.map((t, i) => (
                          <Pill key={i}>{t}</Pill>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
