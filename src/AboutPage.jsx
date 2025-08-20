// src/AboutPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { brand, Card, Pill } from './ui/brand.jsx' // ✅ correct relative path

const BASE = import.meta.env.BASE_URL
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`

export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      {/* local styles for the animated title */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="grid md:grid-cols-[220px,1fr] gap-8 items-start">
        {/* Headshot */}
        <div className="mx-auto md:mx-0">
          <img
            src={HEADSHOT_PATH}
            alt="Imeth Illamperuma"
            className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover ring-4 ring-white/70 dark:ring-white/10 shadow-lg"
          />
        </div>

        {/* Title + content */}
        <div>
          {/* Animated title */}
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #c7d2fe, #a78bfa, #60a5fa, #a78bfa, #c7d2fe)',
              backgroundSize: '300% 100%',
              animation: 'shine 6s linear infinite',
            }}
          >
            About Me
          </h1>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill>HBSc, McMaster</Pill>
            <Pill>Prevention-first medicine</Pill>
            <Pill>Imaging + AI</Pill>
          </div>

          {/* Body copy */}
          <div className="mt-6 space-y-5 text-slate-900 dark:text-slate-100/90 leading-relaxed">
            <p>
              I’m Imeth Illamperuma, an undergraduate student at{' '}
              <a href="https://www.mcmaster.ca" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                McMaster University
              </a>{' '}
              pursuing a degree in Kinesiology with a Secondary in Psychology and a Certificate in Rehabilitation Science. My academic journey blends
              medicine, public health, and computer science, with a focus on using emerging technologies to improve prevention, diagnosis, and equitable
              healthcare delivery.
            </p>

            <p>
              My research spans multiple domains: I have worked with the{' '}
              <a href="https://med.stanford.edu/" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                Stanford University School of Medicine
              </a>{' '}
              as a 2025 Molecular Imaging Fellow at the{' '}
              <a href="https://med.stanford.edu/rsl/scanner-facilities/sci3.html" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                Stanford Center for Innovation in In Vivo Imaging (SCi3)
              </a>
              , exploring brain–gut axis biomarkers for the early detection of neurodegenerative diseases. At{' '}
              <a href="https://www.mcmaster.ca" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                McMaster University
              </a>
              , I am currently conducting research into artificial intelligence detection and the applications of large language models (LLMs) in
              clinical and academic settings — bridging the gap between machine learning innovation and medical practice. My work also intersects with
              AI ethics, bias mitigation, and trustworthy AI in healthcare.
            </p>

            <p>
              I have collaborated with the{' '}
              <a href="https://www.camh.ca/" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                Centre for Addiction and Mental Health (CAMH)
              </a>
              ,{' '}
              <a href="https://www.bumc.bu.edu/" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                Boston University School of Medicine
              </a>
              , and{' '}
              <a href="https://www.harvard.edu/" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                Harvard University
              </a>{' '}
              on projects addressing harm reduction, health policy, and culturally competent care. Beyond research, I am the Founder and President of{' '}
              <a href="https://www.instagram.com/mac.shield/" target="_blank" rel="noreferrer" className="underline decoration-indigo-400 underline-offset-4">
                SHIELD
              </a>{' '}
              and the Founder of{' '}
              <a href="#/journey/naloxone" className="underline decoration-indigo-400 underline-offset-4">
                The Naloxone Project
              </a>
              , one of Canada’s largest student-led initiatives to install emergency naloxone kits on university campuses.
            </p>

            <p>
              At the core of my work is a vision to unite cutting-edge biomedical science, AI-driven innovation, and community advocacy — developing tools
              that not only detect disease earlier but also ensure interventions are accessible, equitable, and impactful. Whether it’s using molecular
              imaging to visualize hidden disease processes, or applying LLMs to optimize clinical workflows, my mission is to advance a future where
              healthcare is both technologically advanced and deeply human-centered.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`${BASE}Imeth-Illamperuma-CV.pdf`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-slate-800 dark:text-slate-50"
            >
              Download CV
            </a>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white hover:opacity-90"
            >
              Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/imeth-illamperuma-3a734a193/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-slate-800 dark:text-slate-50"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Small decorative card strip (optional) */}
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">Focus</div>
          <div className="mt-2 text-sm text-slate-900/80 dark:text-slate-100/80">
            Prevention-first medicine, imaging-based early detection, health equity.
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">Methods</div>
          <div className="mt-2 text-sm text-slate-900/80 dark:text-slate-100/80">
            Molecular imaging, multi-omics, applied machine learning, human-centred design.
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">Values</div>
          <div className="mt-2 text-sm text-slate-900/80 dark:text-slate-100/80">
            Curiosity, access, and turning evidence into systems that work.
          </div>
        </Card>
      </div>
    </section>
  )
}
