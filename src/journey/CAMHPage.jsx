// src/journey/camh.jsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, Card } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL

/* -------------------- assets -------------------- */
const IMG = (f) => `${BASE}images/camh/${f}`

// Logos / small art
const CAMH_LOGO = IMG('camh12.jpeg')      // purple CAMH wordmark
const CAMH_RESEARCH = IMG('camh123.webp')  // research wordmark (optional)

// CYU highlight images
const CYU_PHOTO = IMG('CYU.jpg')
const CYU_MAP   = IMG('cyu location.jpeg')

// Population snapshot (gif)
const POP_GIF = IMG('camhnumbers.gif')

// Conference gallery (feel free to add/remove)
const CONF = [
  IMG('IMG_3283.jpg'),
  IMG('IMG_3236.jpeg'),
  IMG('IMG_3265.jpeg'),
  IMG('IMG_5720.jpeg'),
  IMG('IMG_5726.jpeg'),
  IMG('IMG_3238.jpeg'),
]

/* -------------------- hero word carousel -------------------- */
function WordCarousel({ words, interval = 2000 }) {
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])

  return (
    <span className="inline-block relative h-[1em] align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[idx]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%',   opacity: 1 }}
          exit={{ y: '-100%',   opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-block"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ==================== Page ==================== */
export default function CAMHPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10">
      {/* -------------------- HERO -------------------- */}
      <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-indigo-600/15 via-fuchsia-500/10 to-sky-400/10 p-6 md:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
            CAMH Public Health & Policy Work
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold">
            <span className="text-slate-200/90">Advancing </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-sky-300">
              <WordCarousel
                words={[
                  'equity',
                  'harm reduction',
                  'youth mental health',
                  'human-centred design',
                ]}
                interval={2200}
              />
            </span>
          </h2>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill>Ongoing</Pill>
            <Pill>Public health & policy advisory</Pill>
            <Pill>Harm reduction</Pill>
            <Pill>Health equity</Pill>
          </div>
        </div>
      </div>

      {/* -------------------- OVERVIEW -------------------- */}
      <div className="mt-10 grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-50">
            What I did at the Centre for Addiction and Mental Health
          </h3>
          <Card>
            <p className="leading-relaxed text-slate-200/90">
              At CAMH—the largest mental-health teaching hospital in Canada—I worked in a{' '}
              <span className="font-medium text-slate-50">public-health / policy advisory</span>{' '}
              capacity focused on youth-centred harm reduction and culturally responsive care. My role
              bridged lived experience with program design: reviewing policies, pressure-testing implementation
              with front-line teams, and translating evidence into practical tools people would actually use.
            </p>
          </Card>

          <Card>
            <h4 className="font-semibold text-slate-50">Contributions</h4>
            <ul className="mt-3 space-y-2 text-slate-200/90">
              <li>• Input on harm-reduction education & campus-to-clinic pathways for youth.</li>
              <li>• Policy & communications feedback through a health-equity lens.</li>
              <li>• Usability checks: signage, referral language, and resource accessibility.</li>
              <li>• Connecting student communities with CAMH programs and events.</li>
            </ul>
          </Card>
        </div>

        {/* At a glance + brand */}
        <aside className="md:col-span-4">
          <Card>
            <div className="flex items-center gap-3">
              <img src={CAMH_LOGO} alt="CAMH" className="h-7 w-auto object-contain" />
              <img src={CAMH_RESEARCH} alt="CAMH Research" className="h-6 w-auto object-contain opacity-80" />
            </div>
            <div className="mt-4 text-sm space-y-2 text-slate-200/90">
              <div><span className="text-slate-400">Org:</span> Centre for Addiction and Mental Health (CAMH)</div>
              <div><span className="text-slate-400">Focus:</span> Youth harm reduction, equitable access, policy feedback</div>
              <div><span className="text-slate-400">Role:</span> Public health & policy advisory</div>
              <div><span className="text-slate-400">Outputs:</span> Language/signage reviews, outreach support, program input</div>
            </div>
          </Card>
        </aside>
      </div>

      {/* -------------------- CYU PROJECT -------------------- */}
      <div className="mt-12">
        <div className="mb-3 text-xs tracking-wider text-slate-400">PROJECT HIGHLIGHT</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-50">
          Community Youth Unit (CYU): opening a youth-first service
        </h3>
        <Card className="mt-4">
          <p className="leading-relaxed text-slate-200/90">
            Supporting the launch of CAMH’s brand-new <span className="font-medium text-slate-50">Community Youth Unit (CYU)</span>{' '}
            was a rare chance to integrate policy, public health, and paediatric care. We worked through details
            that shape lived experience—from wall colours and wayfinding to consent flow and privacy language—so
            young people keep their autonomy even in moments that can feel overwhelming. I also mapped where youth
            actually spend time, simplified “next-step” referral pathways, and helped test messaging that feels
            human rather than institutional.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <figure className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <img src={CYU_PHOTO} alt="Concurrent Youth Unit (CYU)" className="w-full h-auto object-cover" />
            <figcaption className="px-4 py-3 text-sm text-slate-300/90">Concurrent Youth Unit – opening day</figcaption>
          </figure>
          <figure className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <img src={CYU_MAP} alt="CYU location map" className="w-full h-auto object-cover" />
            <figcaption className="px-4 py-3 text-sm text-slate-300/90">Location of CYU</figcaption>
          </figure>
        </div>
      </div>

      {/* -------------------- POPULATION SNAPSHOT (gif, frameless) -------------------- */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-slate-50 mb-3">Who this work touches</h3>
        <div className="flex items-center justify-center">
          <img
            src={POP_GIF}
            alt="Population snapshot"
            className="max-h-72 w-auto object-contain"
          />
        </div>
      </div>

      {/* -------------------- CONFERENCE GALLERY -------------------- */}
      <div className="mt-12">
        <div className="mb-3 text-xs tracking-wider text-slate-400">CONFERENCE</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-50">
          Research Conference: connecting policy to people
        </h3>
        <p className="mt-2 text-slate-200/90">
          Attending the CAMH Research Conference tied the threads together—science upstream, services midstream, people at
          the centre. It sharpened my sense of what “good” looks like: rigorous, open, and usable outside the lab.
        </p>

        {/* responsive masonry columns for a clean, airy layout */}
        <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
          {CONF.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="group mb-4 block rounded-2xl overflow-hidden">
              <img
                src={src}
                alt={`Conference photo ${i + 1}`}
                className="w-full h-auto object-cover ring-1 ring-white/10 group-hover:opacity-95 transition"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
