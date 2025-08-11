// src/journey/CAMHPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, Pill } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL || '/'

// assets
const CAMH_LOGOS = [`${BASE}images/camh/camh123.webp`, `${BASE}images/camh/camh12.jpeg`]
const CAMH_NUMBERS_GIF = `${BASE}images/camh/camhnumbers.gif`

const CYU_MEDIA = [
  { src: `${BASE}images/camh/CYU.jpg`, alt: 'Community Youth Unit program poster / wall' },
  { src: `${BASE}images/camh/cyu location.jpeg`, alt: 'CYU location map' },
]

const CONF_GALLERY = [
  'IMG_3283.jpg',
  'IMG_3236.jpeg',
  'IMG_5726.jpeg',
  'IMG_5720.jpeg',
  'IMG_3265.jpeg',
  'IMG_3238.jpeg',
].map(f => `${BASE}images/camh/${f}`)

const onErr = e => (e.currentTarget.style.opacity = 0.35)

const Kicker = ({ children }) => (
  <div className="text-xs uppercase tracking-wider text-slate-300/60 mb-2">{children}</div>
)

export default function CAMHPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 space-y-12">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-fuchsia-900/30 via-slate-900/40 to-indigo-900/30"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative px-6 md:px-10 py-10">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            <span className="block text-slate-100">CAMH Public Health &amp; Policy Work</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-indigo-300">
              Advancing harm reduction &amp; equitable care
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Pill>Ongoing</Pill>
            <Pill>Public health &amp; policy advisory</Pill>
            <Pill>Harm reduction</Pill>
            <Pill>Health equity</Pill>
          </div>
        </div>
      </motion.section>

      {/* BODY */}
      <section className="grid md:grid-cols-12 gap-6">
        {/* LEFT – Narrative */}
        <div className="md:col-span-7 lg:col-span-8 space-y-8">
          <div>
            <Kicker>Overview</Kicker>
            <h2 className="text-2xl md:text-[28px] font-semibold text-slate-50">
              What I did at the Centre for Addiction and Mental Health
            </h2>
            <div className="mt-3 leading-relaxed text-slate-200/90 space-y-4">
              <p>
                At CAMH—the largest mental-health teaching hospital in Canada—I served in a{' '}
                <span className="font-semibold">public-health / policy advisory</span> capacity focused on
                youth-centred harm reduction and culturally responsive care. My work bridged
                lived experience with program design: reviewing policies, pressure-testing
                implementation steps with front-line teams, and translating evidence into practical
                tools people would actually use.
              </p>
              <Card className="bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-sm font-semibold text-slate-100 mb-1">Contributions</div>
                <ul className="text-sm text-slate-200/90 list-disc pl-5 space-y-1">
                  <li>Input on harm-reduction education &amp; campus-to-clinic pathways for youth.</li>
                  <li>Policy &amp; communications feedback through a health-equity lens.</li>
                  <li>Usability checks: signage, referral language, and resource accessibility.</li>
                  <li>Connecting student communities with CAMH programs and events.</li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <Kicker>Why it matters</Kicker>
            <h3 className="text-xl font-semibold text-slate-50">From policy to practice</h3>
            <p className="mt-3 leading-relaxed text-slate-200/90">
              Good policies fail when the first mile—from recognition to help—breaks down. Working with CAMH
              taught me to stress-test that first mile: the moment a young person decides to ask for help, a
              friend searches for the right link, or a staff member needs a clear script in a tense situation.
              I learned to look for friction, remove it, and design for clarity, dignity, and speed.
            </p>
          </div>

          {/* CYU */}
          <div id="cyu">
            <Kicker>Project highlight</Kicker>
            <h3 className="text-xl font-semibold text-slate-50">
              Community Youth Unit (CYU): meeting young people where they are
            </h3>
            <div className="mt-3 leading-relaxed text-slate-200/90 space-y-3">
              <p>
                With the <span className="font-medium">Community Youth Unit (CYU)</span>, I supported work that
                increases the visibility and reach of youth-friendly services—mapping places where young people
                actually spend time, simplifying referral pathways, and testing messaging that feels human rather
                than institutional. The goal: make the “next step” obvious and low-friction.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {CYU_MEDIA.map((m, i) => (
                  <Card key={i} className="p-0 overflow-hidden">
                    <img src={m.src} alt={m.alt} className="w-full h-56 object-cover" onError={onErr} />
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Kicker>What I learned</Kicker>
            <h3 className="text-xl font-semibold text-slate-50">Growth &amp; takeaways</h3>
            <Card className="mt-3 bg-white/5 ring-1 ring-white/10 p-4">
              <ul className="text-sm text-slate-200/90 list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Human-centred policy:</span> co-creating language and workflows
                  with people who use them changes outcomes.
                </li>
                <li>
                  <span className="font-medium">Equity is a constraint, not a slogan:</span> access, culture,
                  and trust must be designed in from the first draft.
                </li>
                <li>
                  <span className="font-medium">Bridging settings:</span> campus, community, and hospital can
                  share one pathway when you make hand-offs explicit.
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* RIGHT – Sticky sidebar */}
        <aside className="md:col-span-5 lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <Card>
              <div className="text-sm font-semibold text-slate-100">At a glance</div>
              <ul className="mt-2 text-sm text-slate-200/85 space-y-1">
                <li><span className="font-medium">Org:</span> Centre for Addiction and Mental Health (CAMH)</li>
                <li><span className="font-medium">Focus:</span> Youth harm reduction, equitable access, policy feedback</li>
                <li><span className="font-medium">Outputs:</span> Language &amp; signage reviews, outreach support, program input</li>
              </ul>
            </Card>

            <Card className="p-3">
              <div className="text-sm font-semibold text-slate-100 mb-2">CAMH</div>
              <div className="flex items-center gap-4">
                {CAMH_LOGOS.map((src, i) => (
                  <img key={i} src={src} alt="CAMH logo" className="h-10 w-auto object-contain" onError={onErr} />
                ))}
              </div>
              <div className="mt-3 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                <img src={CAMH_NUMBERS_GIF} alt="Patient population breakdown (animated)" className="w-full h-auto" onError={onErr} />
              </div>
            </Card>
          </div>
        </aside>
      </section>

      {/* Conference gallery */}
      <section id="gallery">
        <Kicker>Conference</Kicker>
        <h2 className="text-2xl md:text-[28px] font-semibold text-slate-50">Research Conference: connecting policy to people</h2>
        <p className="mt-2 leading-relaxed text-slate-200/90">
          Attending the CAMH Research Conference tied the threads together—science upstream, services midstream,
          people at the centre. It sharpened my sense of what “good” looks like: rigorous, open, and usable
          outside the lab.
        </p>

        <div className="mt-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
          {CONF_GALLERY.map((src, i) => (
            <div key={src + i} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
              <img src={src} alt="CAMH conference" className="w-full h-auto object-cover" onError={onErr} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

