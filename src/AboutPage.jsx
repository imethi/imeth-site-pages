import React from 'react'
import { Card, Pill } from './ui/brand.jsx'

const BASE = import.meta.env.BASE_URL || '/'
const HEADSHOT = `${BASE}images/imeth-profile1.png`

export default function AboutPage () {
  return (
    <main className='max-w-6xl mx-auto px-6 md:px-8 py-12'>
      <div className='grid md:grid-cols-[200px,1fr] gap-8 items-start'>
        <img
          src={HEADSHOT}
          alt='Imeth Illamperuma'
          className='w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover ring-4 ring-white/10'
          onError={e => {
            e.currentTarget.style.background =
              'linear-gradient(135deg,#e2e8f0,#6366f1)'
            e.currentTarget.src =
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
          }}
        />
        <div>
          <h1 className='text-4xl font-semibold text-slate-50'>About Me</h1>
          <p className='mt-4 text-slate-100/90 leading-relaxed'>
            I’m Imeth Illamperuma, an undergraduate student at{' '}
            <a className='underline' href='https://www.mcmaster.ca/'>
              McMaster University
            </a>{' '}
            pursuing a degree in Kinesiology with a Secondary in Psychology and
            a Certificate in Rehabilitation Science. My work blends medicine,
            public health, and computer science with a focus on using emerging
            technologies to improve prevention, diagnosis, and equitable
            healthcare delivery.
          </p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Pill>HBSc, McMaster</Pill>
            <Pill>Prevention-first medicine</Pill>
            <Pill>Imaging + AI</Pill>
          </div>
        </div>
      </div>

      <section className='mt-10 grid lg:grid-cols-2 gap-6'>
        <Card className='p-5'>
          <h2 className='font-semibold text-slate-50'>
            What I’m working on
          </h2>
          <ul className='mt-3 space-y-2 text-slate-100/85'>
            <li>
              • Molecular imaging fellowship at Stanford — early biomarkers
              along the brain–gut axis.
            </li>
            <li>
              • AI/LLM research at McMaster — safe, useful deployments in
              clinical & academic settings.
            </li>
            <li>• Public health/policy advisory work targeting youth equity.</li>
          </ul>
        </Card>

        <Card className='p-5'>
          <h2 className='font-semibold text-slate-50'>What drives me</h2>
          <p className='mt-3 text-slate-100/85'>
            Prevention first; evidence translated into daily practice; human
            dignity as a design constraint. I like building things that make the
            “next step” obvious and low-friction for real people.
          </p>
        </Card>
      </section>
    </main>
  )
}

