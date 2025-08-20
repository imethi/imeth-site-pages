// src/about/AboutPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, Pill } from '../ui/brand.jsx'

const BASE = import.meta.env.BASE_URL
const HEADSHOT = `${BASE}images/imeth-profile1.png`
const CV_URL = `${BASE}Imeth-Illamperuma-CV.pdf`

export default function AboutPage() {
  const handleImgError = (e) => {
    // subtle fallback if headshot ever fails
    e.currentTarget.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#c7d2fe"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient></defs><rect width="256" height="256" fill="url(#g)"/><text x="50%" y="52%" text-anchor="middle" font-size="64" font-family="system-ui,Segoe UI,Roboto" fill="#0f172a">ii</text></svg>`
      )
    e.currentTarget.onerror = null
  }

  return (
    <section className="relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-25 bg-indigo-500/40" />
        <div className="absolute top-24 -right-16 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25 bg-fuchsia-500/40" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full blur-3xl opacity-20 bg-sky-400/40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Hero */}
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="p-5 md:p-6 bg-white/5 ring-1 ring-black/10 dark:ring-white/10">
              <div className="aspect-square rounded-2xl overflow-hidden grid place-items-center bg-slate-900/40">
                <img
                  src={HEADSHOT}
                  onError={handleImgError}
                  alt="Imeth Illamperuma"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>HBSc, McMaster</Pill>
                <Pill>Prevention-first medicine</Pill>
                <Pill>Imaging + AI</Pill>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="md:col-span-3 space-y-5"
          >
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
              About Me
            </h1>

            <p className="leading-relaxed text-slate-100/90">
              I’m Imeth Illamperuma, an undergraduate student at{' '}
              <a
                href="https://www.mcmaster.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                McMaster University
              </a>{' '}
              pursuing a degree in Kinesiology with a Secondary in Psychology and a Certificate in
              Rehabilitation Science. My academic journey blends medicine, public health, and
              computer science, with a focus on using emerging technologies to improve prevention,
              diagnosis, and equitable healthcare delivery.
            </p>

            <p className="leading-relaxed text-slate-100/90">
              My research spans multiple domains: I have worked with the{' '}
              <a
                href="https://med.stanford.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                Stanford University School of Medicine
              </a>{' '}
              as a 2025 Molecular Imaging Fellow at the{' '}
              <a
                href="https://med.stanford.edu/radiology/research/facilities/sci3.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                Stanford Center for Innovation in In Vivo Imaging (SCi3)
              </a>
              , exploring brain–gut axis biomarkers for the early detection of neurodegenerative
              diseases. At McMaster, I’m researching AI detection and the applications of large
              language models (LLMs) in clinical and academic settings — bridging the gap between
              machine-learning innovation and medical practice, with attention to AI ethics, bias
              mitigation, and trustworthy deployment in healthcare.
            </p>

            <p className="leading-relaxed text-slate-100/90">
              I’ve collaborated with the{' '}
              <a
                href="https://www.camh.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                Centre for Addiction and Mental Health (CAMH)
              </a>
              ,{' '}
              <a
                href="https://www.bu.edu/medicine/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                Boston University School of Medicine
              </a>
              , and{' '}
              <a
                href="https://www.harvard.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                Harvard University
              </a>{' '}
              on projects in harm reduction, health policy, and culturally competent care. Beyond
              research, I founded{' '}
              <a
                href="https://www.instagram.com/mac.shield/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                McMaster SHIELD
              </a>{' '}
              and led{' '}
              <a
                href="#/journey/naloxone"
                className="underline decoration-indigo-400/60 hover:decoration-indigo-300"
              >
                The Naloxone Project
              </a>
              , one of Canada’s largest student-led initiatives to install emergency naloxone kits
              on campus.
            </p>

            <p className="leading-relaxed text-slate-100/90">
              At the core of my work is a vision to unite cutting-edge biomedical science, AI-driven
              innovation, and community advocacy — developing tools that not only detect disease
              earlier but also ensure interventions are accessible, equitable, and impactful.
              Whether visualizing hidden disease processes through molecular imaging or applying
              LLMs to streamline clinical workflows, my goal is a future where healthcare is both
              technologically advanced and deeply human-centered.
            </p>

            {/* Quick actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={CV_URL}
                className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-50 ring-1 ring-white/15"
              >
                Download CV
              </a>
              <a
                href="#/contact"
                className="rounded-xl px-4 py-2 bg-indigo-600 hover:opacity-90 text-white"
              >
                Get in touch
              </a>
              <a
                href="https://www.linkedin.com/in/imeth-illamperuma-3a734a193/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-50 ring-1 ring-white/15"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Extras */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-slate-50">Now</h3>
            <ul className="mt-3 space-y-2 text-slate-100/85">
              <li>• Molecular imaging + multi-omics (brain–gut)</li>
              <li>• LLMs in clinical workflows; AI safety</li>
              <li>• Prevention-first policy &amp; harm reduction</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-slate-50">What I value</h3>
            <ul className="mt-3 space-y-2 text-slate-100/85">
              <li>• Curiosity → clarity → care</li>
              <li>• Open, usable science</li>
              <li>• Equity by design</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-slate-50">Elsewhere</h3>
            <ul className="mt-3 space-y-2 text-slate-100/85">
              <li>
                • Publications → <a href="#/publications" className="underline">see logos &amp; links</a>
              </li>
              <li>
                • Journey → <a href="#/journey" className="underline">featured stories</a>
              </li>
              <li>
                • Naloxone → <a href="#/journey/naloxone" className="underline">project page</a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
