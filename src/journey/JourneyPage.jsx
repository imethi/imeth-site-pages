// src/journey/JourneyPage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'
import stories from './data/featuredStories.js'
import {
  Beaker,
  Shield,
  BookOpen,
  GraduationCap,
  Hospital,
  Microscope,
} from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const WAVE_IMG = `${BASE}images/imeth-wave.png`

/* =========================
   HERO
   ========================= */
function JourneyHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 pt-10">
      <Card className="overflow-hidden p-0">
        <div className="relative grid md:grid-cols-2 gap-6 items-center">
          {/* Glow / backdrop */}
          <div className="absolute -inset-6 bg-gradient-to-br from-indigo-600/10 via-fuchsia-500/10 to-emerald-500/10 blur-2xl pointer-events-none" />

          {/* Copy */}
          <div className="relative p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              <span className="inline-block">My Journey</span>
              <span className="block h-[3px] w-28 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />
            </h1>
            <p className="mt-4 text-slate-900 dark:text-slate-100/90">
              I’ve been chasing one question from different angles: <em>how do we catch risk earlier and care more humanly?</em> That thread pulled me from movement science and rehab into harm-reduction on campus, mental-health equity, and now molecular imaging with multi-omics for prevention-first medicine. This page is a living notebook of experiments, teams, and useful failures—plus the ideas I keep returning to: curiosity, access, and turning evidence into systems that work.
            </p>
            <a
              href="#featured"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90 transition"
            >
              Explore Featured Stories →
            </a>
          </div>

          {/* Character */}
          <div className="relative p-6 md:p-10">
            <div className="mx-auto max-w-[360px]">
              <img
                src={WAVE_IMG}
                alt="Doctor illustration"
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

/* =========================
   FEATURED STORIES
   ========================= */
function FeaturedStories() {
  return (
    <section id="featured" className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">
          Featured Stories
        </h2>
        <a
          href="#timeline"
          className="text-sm text-indigo-700 dark:text-indigo-300 hover:underline"
        >
          Jump to timeline
        </a>
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
                <div className="text-xs text-slate-900/70 dark:text-slate-100/70">
                  {s.when}
                </div>
                <h3 className="mt-1 font-semibold text-slate-950 dark:text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-900/85 dark:text-slate-100/85">
                  {s.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.chips?.slice(0, 4).map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
                <div className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">
                  Read more →
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
   TIMELINE
   ========================= */
const TIMELINE = [
  {
    year: '2025',
    title: 'Molecular Imaging Fellowship',
    org: 'Stanford Radiology',
    summary:
      'PET/MRI + multi-omics for early biomarkers along the brain–gut axis.',
    chips: ['Imaging', 'Prevention-first', 'Brain–gut'],
    icon: Beaker,
    href: '#/journey/stanford',
    thumbnail: stories.find((s) => s.href?.includes('stanford'))?.image,
  },
  {
    year: '2024–2025',
    title: 'The Naloxone Project',
    org: 'McMaster University',
    summary:
      'Placed 32 emergency naloxone kits; training and response workflows.',
    chips: ['Harm reduction', 'Operations', 'Policy'],
    icon: Shield,
    href: '#/journey/naloxone',
    thumbnail: stories.find((s) => s.href?.includes('naloxone'))?.image,
  },
  {
    year: '2024',
    title: 'Paediatric Research (INGAUGE Lab)',
    org: 'University of Manitoba — Dr. Roberta Woodgate',
    summary:
      'Child/youth navigation of complex care; inclusion-centred design.',
    chips: ['Qualitative', 'Equity', 'Child health'],
    icon: Microscope,
    href: '#/journey/ingauge',
  },
  {
    year: 'Ongoing',
    title: 'CAMH Public Health Research',
    org: 'Centre for Addiction and Mental Health',
    summary:
      'Harm-reduction + culturally informed models for equitable access.',
    chips: ['Mental health', 'Equity', 'Policy'],
    icon: BookOpen,
    href: '#/journey/camh',
    thumbnail: stories.find((s) => s.href?.includes('camh'))?.image,
  },
  {
    year: 'Earlier',
    title: 'Founder & Director — SHIELD',
    org: 'McMaster University',
    summary:
      'Prevention-first health literacy; workshops and peer training.',
    chips: ['Prevention', 'Leadership'],
    icon: GraduationCap,
    href: '#/journey/shield',
  },
  {
    year: 'Earlier',
    title: 'Oncology Department Staff',
    org: 'HHS — Juravinski Cancer Centre',
    summary:
      'Clinical ops exposure: multidisciplinary teams and safety culture.',
    chips: ['Clinical ops', 'Oncology'],
    icon: Hospital,
    href: '#/journey/jcc',
  },
]

function TimelineItem({ item, last }) {
  const Icon = item.icon || Beaker
  return (
    <div className="relative pl-8">
      {/* line */}
      <span className="absolute left-3 top-0 bottom-0 w-[2px] rounded bg-slate-300/50 dark:bg-slate-700/60" />
      {/* dot */}
      <span className="absolute left-[9px] top-2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />

      <div className="text-xs text-slate-900/70 dark:text-slate-100/70">
        {item.year}
      </div>

      <Card className="mt-2 p-0 overflow-hidden">
        <div className="grid md:grid-cols-[120px_1fr] gap-4 p-4">
          {/* thumb (optional) */}
          <div className="hidden md:block">
            {item.thumbnail ? (
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200/40 dark:bg-slate-800/40">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-lg grid place-items-center bg-slate-200/40 dark:bg-slate-800/40">
                <Icon className="w-6 h-6 text-slate-500" />
              </div>
            )}
          </div>

          {/* content */}
          <div>
            <div className="flex items-center gap-2 text-slate-950 dark:text-slate-50">
              <Icon className="w-4 h-4 opacity-70" />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            <div className="mt-1 text-xs text-slate-900/70 dark:text-slate-100/70">
              {item.org}
            </div>
            <p className="mt-2 text-sm text-slate-900 dark:text-slate-100/90">
              {item.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.chips?.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
            {item.href && (
              <a
                href={item.href}
                className="mt-3 inline-block text-sm text-indigo-700 dark:text-indigo-300 hover:underline"
              >
                View →
              </a>
            )}
          </div>
        </div>
      </Card>

      {!last && <div className="h-6" />}
    </div>
  )
}

function JourneyTimeline() {
  return (
    <section id="timeline" className="max-w-6xl mx-auto px-6 md:px-8 pb-14">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 dark:text-slate-50">
        Trend over time
      </h2>
      <p className="mt-2 text-sm text-slate-900/80 dark:text-slate-100/80">
        A rough chronology showing the arc from movement &amp; prevention → harm
        reduction &amp; policy → imaging + multi-omics for earlier detection.
      </p>

      <div className="mt-6">
        {TIMELINE.map((it, i) => (
          <TimelineItem key={i} item={it} last={i === TIMELINE.length - 1} />
        ))}
      </div>
    </section>
  )
}

/* =========================
   PAGE
   ========================= */

export default function JourneyPage() {
  return (
    <div className="pb-8">
      <JourneyHero />
      <FeaturedStories />
      <JourneyTimeline />
    </div>
  )
}
