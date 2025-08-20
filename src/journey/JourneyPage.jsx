// src/journey/JourneyPage.jsx
import React from 'react'
import { Card } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL

// Static featured stories (images placed in /public/images/journey-featured/)
const FEATURED = [
  {
    key: 'stanford',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    summary: 'How molecular imaging and multi-omics can reveal early gut–brain biomarkers linked to dementia risk.',
    img: `${BASE}images/journey-featured/stanford.jpg`,
    href: '#/journey/stanford'
  },
  {
    key: 'naloxone',
    title: 'The Naloxone Project: Saving Lives on Campus',
    summary: '32+ emergency naloxone kits placed across McMaster to strengthen overdose response.',
    img: `${BASE}images/journey-featured/naloxone.jpg`,
    href: '#/journey/naloxone'
  },
  {
    key: 'camh',
    title: 'CAMH Public Health Research',
    summary: 'Harm-reduction + culturally informed models for more equitable mental health strategies.',
    img: `${BASE}images/journey-featured/camh.jpg`,
    href: '#/journey/camh'
  },
  {
    key: 'manitoba',
    title: 'University of Manitoba Paediatric Research (INGAUGE Lab)',
    summary: 'Child/youth navigation of complex care; inclusion-centred design and qualitative methods.',
    img: `${BASE}images/journey-featured/manitoba.jpg`,
    href: '#/journey/manitoba'
  },
  {
    key: 'mcmaster-medicine',
    title: 'McMaster Department of Medicine — Research Student',
    summary: 'Early detection and prevention-first approaches within clinical and academic settings.',
    img: `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
    href: '#/journey/mcmaster-medicine'
  },
  {
    key: 'jcc',
    title: 'HHS — Juravinski Cancer Centre',
    summary: 'Clinical operations exposure: multidisciplinary teams, safety culture, and patient flow.',
    img: `${BASE}images/journey-featured/jcc.jpg`,
    href: '#/journey/jcc'
  }
]

export default function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      {/* Title area (no right-side collage) */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">My Journey</h1>
        <p className="mt-4 text-slate-100/85">
          A living notebook of experiments, teams, and ideas that shaped how I think about prevention-first medicine, imaging, and health equity.
        </p>
      </div>

      {/* Featured Stories (static grid) */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {FEATURED.map((s) => (
          <a key={s.key} href={s.href}>
            <Card className="overflow-hidden h-full hover:translate-y-px hover:opacity-95 transition">
              <img
                src={s.img}
                alt=""
                className="w-full h-44 object-cover"
                onError={(e) => { e.currentTarget.style.opacity = 0.2 }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-50">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-200/90">{s.summary}</p>
                <div className="mt-3 text-sm text-indigo-300">Open story →</div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
