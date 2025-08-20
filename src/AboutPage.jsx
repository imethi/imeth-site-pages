import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL
const HEADSHOT = `${BASE}images/imeth-profile1.png`

export default function AboutPage() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 md:px-8 py-14">

      {/* soft aurora behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 animate-pulse" />
        <div className="absolute left-[-15%] bottom-[-10%] h-[380px] w-[380px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-purple-600 via-indigo-500 to-sky-500" />
      </div>

      {/* header */}
      <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
        <Card className="p-3 bg-white/5 ring-1 ring-black/10 dark:ring-white/10">
          <img
            src={HEADSHOT}
            alt="Imeth Illamperuma"
            className="w-full h-[200px] object-cover rounded-2xl ring-1 ring-black/10 dark:ring-white/10"
          />
        </Card>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-3 text-lg text-slate-900 dark:text-slate-100/90"
          >
            I’m Imeth Illamperuma, an undergraduate student at{' '}
            <a className="underline hover:opacity-80" href="https://www.mcmaster.ca/" target="_blank" rel="noreferrer">
              McMaster University
            </a>{' '}
            pursuing a degree in Kinesiology with a Secondary in Psychology and a Certificate in Rehabilitation Science. My academic journey blends medicine, public health, and computer science, with a focus on using emerging technologies to improve prevention, diagnosis, and equitable healthcare delivery.
          </motion.p>
        </div>
      </div>

      {/* body */}
      <div className="mt-8 space-y-6 text-slate-900 dark:text-slate-100/90 leading-relaxed max-w-3xl">
        <p>
          My research spans multiple domains: I have worked with the{' '}
          <a className="underline hover:opacity-80" href="https://med.stanford.edu/" target="_blank" rel="noreferrer">
            Stanford University School of Medicine
          </a>{' '}
          as a 2025 Molecular Imaging Fellow at the{' '}
          <a className="underline hover:opacity-80" href="https://sci3.stanford.edu/" target="_blank" rel="noreferrer">
            Stanford Center for Innovation in In Vivo Imaging (SCi3)
          </a>
          , exploring brain–gut axis biomarkers for the early detection of neurodegenerative diseases. At{' '}
          <a className="underline hover:opacity-80" href="https://www.mcmaster.ca/" target="_blank" rel="noreferrer">
            McMaster University
          </a>
          , I am currently conducting research into artificial intelligence detection and the applications of large language models (LLMs) in clinical and academic settings — bridging the gap between machine learning innovation and medical practice. My work also intersects with AI ethics, bias mitigation, and trustworthy AI in healthcare.
        </p>

        <p>
          I have collaborated with the{' '}
          <a className="underline hover:opacity-80" href="https://www.camh.ca/" target="_blank" rel="noreferrer">
            Centre for Addiction and Mental Health (CAMH)
          </a>
          ,{' '}
          <a className="underline hover:opacity-80" href="https://www.bumc.bu.edu/" target="_blank" rel="noreferrer">
            Boston University School of Medicine
          </a>
          , and{' '}
          <a className="underline hover:opacity-80" href="https://www.harvard.edu/" target="_blank" rel="noreferrer">
            Harvard University
          </a>{' '}
          on projects addressing harm reduction, health policy, and culturally competent care. Beyond research, I am the Founder and President of{' '}
          <a className="underline hover:opacity-80" href="https://www.instagram.com/mac.shield/" target="_blank" rel="noreferrer">
            SHIELD
          </a>{' '}
          and the Founder of{' '}
          <a className="underline hover:opacity-80" href="#/journey/naloxone">
            The Naloxone Project
          </a>
          , one of Canada’s largest student-led initiatives to install emergency naloxone kits on university campuses.
        </p>

        <p>
          At the core of my work is a vision to unite cutting-edge biomedical science, AI-driven innovation, and community advocacy — developing tools that not only detect disease earlier but also ensure interventions are accessible, equitable, and impactful. Whether it’s using molecular imaging to visualize hidden disease processes, or applying LLMs to optimize clinical workflows, my mission is to advance a future where healthcare is both technologically advanced and deeply human-centered.
        </p>
      </div>

      {/* quick tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {[
          'HBSc, McMaster',
          'Prevention-first medicine',
          'Imaging + AI',
          'Health equity',
          'Harm reduction',
        ].map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-xl bg-white/10 ring-1 ring-black/10 dark:ring-white/10 text-slate-900 dark:text-slate-100"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
