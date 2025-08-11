// src/journey/CAMHPage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL

// ---- rotating word in the hero ----
function RotatingWord({ words = [], interval = 2200 }) {
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [interval, words.length])
  return (
    <span className="inline-block min-w-[7ch] align-baseline">
      <span
        key={idx}
        className="inline-block will-change-transform animate-[fadeUp_480ms_ease]"
      >
        {words[idx]}
      </span>
    </span>
  )
}

/* keyframes for the rotating word */
const style = document.getElementById('camh-inline-anim') || (() => {
  const el = document.createElement('style')
  el.id = 'camh-inline-anim'
  el.textContent = `
@keyframes fadeUp {
  0%   { opacity:.0; transform: translateY(6px) scale(.99); }
  100% { opacity:1;  transform: translateY(0)   scale(1); }
}`
  document.head.appendChild(el)
  return el
})()

export default function CAMHPage() {
  // ---- media paths (update if your filenames differ) ----
  const logos = [
    `${BASE}images/camh/camh12.jpeg`,
    `${BASE}images/camh/camh123.webp`,
  ]

  const cyuPhotos = [
    { src: `${BASE}images/camh/CYU.jpg`, caption: 'Concurrent Youth Unit (CYU)' },
    { src: `${BASE}images/camh/cyu location.jpeg`, caption: 'Location of the CYU' },
  ]

  const gifStats = `${BASE}images/camh/camhnumbers.gif`

  const conf = [
    `${BASE}images/camh/IMG_3283.jpeg`,
    `${BASE}images/camh/IMG_3236.jpeg`,
    `${BASE}images/camh/IMG_3265.jpeg`,
    `${BASE}images/camh/IMG_3238.jpeg`,
    `${BASE}images/camh/IMG_5720.jpeg`,
    `${BASE}images/camh/IMG_5726.jpeg`,
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      {/* -------------------- HERO -------------------- */}
      <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-indigo-700/25 via-fuchsia-600/20 to-cyan-500/20 ring-1 ring-white/10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
          CAMH Public Health & Policy Work
        </h1>

        <div className="mt-2 text-xl md:text-3xl text-indigo-200">
          Advancing{' '}
          <span className="text-fuchsia-200 font-semibold">
            <RotatingWord
              words={[
                'harm reduction',
                'equity',
                'youth-centered design',
                'dignity',
              ]}
            />
          </span>{' '}
          in care
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Pill>Ongoing</Pill>
          <Pill>Public health & policy advisory</Pill>
          <Pill>Harm reduction</Pill>
          <Pill>Health equity</Pill>
        </div>
      </div>

      {/* -------------------- OVERVIEW -------------------- */}
      <div className="mt-10 grid lg:grid-cols-12 gap-6">
        {/* LEFT / MAIN */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              What I did at the Centre for Addiction and Mental Health
            </h2>
            <p className="mt-3 text-slate-100/80 leading-relaxed">
            At CAMH—the largest mental-health teaching hospital in Canada—I served in a public-health and policy advisory role focused on youth-centred harm reduction and culturally safe care. Day to day, I blended lived experience with systems thinking: mapping service pathways; auditing forms, signage, and referral language for clarity and stigma; and co-designing improvements with clinicians, youth peers, and program leads. I reviewed policy drafts for feasibility, trauma-informed practice, and equity impacts; ran “table-top” simulations with front-line teams to pressure-test new workflows; and translated evidence into plain-language tools that could survive a busy clinic—one-pagers, checklists, and decision trees that removed guesswork.

My work also emphasized implementation quality. I set up feedback loops and lightweight evaluation plans (e.g., uptake, time-to-service, successful warm handoffs), advised on low-barrier access (drop-in hours, self-referral, confidentiality safeguards), and helped build training materials that elevate autonomy and consent for minors and emerging adults. Particular attention went to populations facing the steepest barriers—racialized and newcomer youth, 2SLGBTQIA+ students, and those navigating housing or substance-use challenges. The throughline was making policy usable: aligning what the literature recommends with what a young person actually sees, understands, and can act on in the moment they need help.
            </p>
          </div>

          <Card>
            <h3 className="font-semibold text-slate-50">Contributions</h3>
            <ul className="mt-3 space-y-2 text-slate-100/85">
              <li>• Input on harm-reduction education & campus-to-clinic pathways for youth.</li>
              <li>• Policy & communications feedback through a health-equity lens.</li>
              <li>• Usability checks: signage, referral language, and resource accessibility.</li>
              <li>• Connecting student communities with CAMH programs and events.</li>
            </ul>
          </Card>
        </div>

        {/* RIGHT / ASIDE */}
        <aside className="lg:col-span-4 space-y-6">
          <Card>
            <h3 className="font-semibold text-slate-50">At a glance</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-100/85">
              <div><span className="text-slate-400">Org:</span> CAMH — Centre for Addiction and Mental Health</div>
              <div><span className="text-slate-400">Focus:</span> Youth harm reduction, equitable access, policy feedback</div>
              <div><span className="text-slate-400">Outputs:</span> Language & signage reviews, outreach support, program input</div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              {logos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="CAMH logo"
                  className="h-9 w-auto object-contain"
                />
              ))}
            </div>
          </Card>

          {/* Populations GIF moved here under At a glance, no frame */}
          <div>
            <h3 className="font-semibold text-slate-50">Populations I helped reach</h3>
            <img
              src={gifStats}
              alt="Animated breakdown of populations served at CAMH"
              className="mt-3 h-56 md:h-64 w-auto"
            />
          </div>
        </aside>
      </div>

      {/* -------------------- CYU HIGHLIGHT -------------------- */}
      <div className="mt-12">
        <div className="text-xs tracking-wide text-slate-400">PROJECT HIGHLIGHT</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">
          Community Youth Unit (CYU): meeting young people where they are
        </h3>
        <p className="mt-3 text-slate-100/85 leading-relaxed">
          The launch of the <span className="font-medium text-slate-50">Concurrent Youth Unit (CYU)</span> was
          particularly meaningful. It brought together policy, public health, and paediatric care—
          all the way from <em>environmental choices</em> (e.g., wall colours and wayfinding that feel
          calming and familiar) to <em>procedures that protect autonomy</em>, even in moments that can feel
          restrictive. I supported work that increased the visibility and reach of youth-friendly
          services—mapping where young people actually spend time, clarifying referral pathways, and
          testing language that feels human rather than institutional. The goal: make the “next step”
          obvious and low-friction.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {cyuPhotos.map(({ src, caption }) => (
            <figure key={src} className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
              <img src={src} alt={caption} className="w-full h-72 md:h-[22rem] object-cover" />
              <figcaption className="px-4 py-2 text-sm text-slate-400">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* -------------------- CONFERENCE (masonry) -------------------- */}
      <div className="mt-12">
        <div className="text-xs tracking-wide text-slate-400">CONFERENCE</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">
          Research Conference: connecting policy to people
        </h3>
        <p className="mt-3 text-slate-100/85 leading-relaxed">
          Attending the CAMH Research Conference tied the threads together—scientific discovery
          upstream, service design midstream, and people at the centre downstream. Across plenaries,
          posters, and workshops, I saw how methods and measurement translate into day-to-day
          improvements: clearer pathways to care, language that lowers the threshold to ask for help,
          and evaluation plans that honour context rather than erase it. I left with a sharper sense
          of what “good” looks like for youth mental-health work: rigorous and open science, policy
          that travels beyond PDFs, and interventions that are feasible for front-line teams—so the
          best ideas don’t stall in the lab or at the whiteboard.
        </p>

        {/* Masonry fills width; balanced columns */}
        <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:balance]">
          {conf.map((src, i) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 block rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 break-inside-avoid group"
            >
              <img
                src={src}
                alt={`CAMH Research Conference photo ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
