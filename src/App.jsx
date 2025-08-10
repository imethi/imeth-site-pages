import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, FileDown, ExternalLink, Download } from 'lucide-react'
import Typewriter from 'typewriter-effect'

/* ---------------- Base paths ---------------- */
const BASE = import.meta.env.BASE_URL

/* ---------------- Assets ---------------- */
const HEADSHOT_PATH = `${BASE}images/imeth-profile1.png`
const FALLBACK_HEADSHOT = (() => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#bbf7d0'/><stop offset='100%' stop-color='#34d399'/>
      </linearGradient></defs>
      <circle cx='128' cy='128' r='128' fill='url(#g)'/>
      <text x='50%' y='54%' text-anchor='middle'
        font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial'
        font-size='84' fill='#064e3b' dy='.35em'>II</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})()

/* ---------------- UI helpers ---------------- */
const brand = {
  bg: 'bg-emerald-50 dark:bg-emerald-950',
  text: 'text-emerald-950 dark:text-emerald-100',
  accentBg: 'bg-emerald-700',
  card: 'bg-white/80 dark:bg-emerald-900/40 backdrop-blur'
}
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-emerald-700/20 px-3 py-1 text-xs text-emerald-900/80 dark:text-emerald-200/80">
    {children}
  </span>
)
const Card = ({ children }) => (
  <div className={`rounded-2xl ${brand.card} shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6`}>
    {children}
  </div>
)

/* ---------------- Data ---------------- */
const affiliations = [
  { org: 'Stanford Department of Medicine', role: 'Molecular Imaging Research Fellow', logo: `${BASE}logos/stanford.png`, link: 'https://med.stanford.edu/radiology.html' },
  { org: 'McMaster University — Dept. of Medicine', role: 'Research Student', logo: `${BASE}logos/mcmaster-med.png`, link: 'https://medicine.healthsci.mcmaster.ca/' },
  { org: 'CAMH', role: 'Research Advisory Network Delegate', logo: `${BASE}logos/camh.png`, link: 'https://www.camh.ca/' },
  { org: 'McMaster SHIELD', role: 'Founder & Director', logo: `${BASE}logos/shield.png`, link: 'https://www.instagram.com/mac.shield/' },
  { org: 'HHS — Juravinski Cancer Centre', role: 'Oncology Department Staff', logo: `${BASE}logos/hhs.png`, link: 'https://www.hamiltonhealthsciences.ca/about-us/our-organization/our-locations/juravinski-cancer-centre/' },
  { org: 'University of Manitoba — INGAUGE Lab', role: 'Internship / Summer Research Student', logo: `${BASE}logos/umanitoba.png`, link: 'https://www.ingauge.ca/' },
  { org: 'McMaster DB Sports Med & Rehab', role: 'Sports Specialist Rehab Assistant (Intern)', logo: `${BASE}logos/mcmaster-sportsmed.png`, link: 'https://sportmed.mcmaster.ca/' },
  { org: 'LMC Healthcare', role: 'Medical Office Administrator (Intern)', logo: `${BASE}logos/lmc.png`, link: 'https://www.lmc.ca/' },
].map(i => ({ ...i, safeLogo: i.logo }))

/* ---------------- Journey collage (SINGLE ROW, LARGE TILES) ---------------- */
const journeyFiles = [
  '019929.png',
  '392883.png',
  '8982934.png',
  '92034.png',
  '9234929.png',
  'IMG_2962.png',
  'IMG_3664.png',
  'IMG_5720.png',
  'IMG_5726.png',
  'IMG_8893.png',
]
const journeySrcs = journeyFiles.map(f => `${BASE}images/journey-images/${f}`)

/* ================= Two-line logo marquee ================= */
const MarqueeRow = ({ items, direction = 'left', speedSeconds = 28 }) => {
  const anim = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="overflow-hidden">
      <div
        className={`inline-flex items-center whitespace-nowrap gap-12 will-change-transform ${anim}`}
        style={{ width: 'max-content', animationDuration: `${speedSeconds}s` }}
      >
        {[...items, ...items].map((it, idx) => (
          <a
            key={`${it.org}-${idx}`}
            href={it.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 pr-2"
            title={`${it.role} — ${it.org}`}
          >
            <img
              src={it.safeLogo}
              alt={it.org}
              className="h-8 w-auto object-contain"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">{it.org}</div>
              <div className="text-[11px] text-emerald-900/75 dark:text-emerald-300/70">{it.role}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
const TwoLineCarousel = ({ items }) => {
  const mid = Math.ceil(items.length / 2)
  const top = items.slice(0, mid)
  const bottom = items.slice(mid)
  return (
    <div className="space-y-3">
      <MarqueeRow items={top} direction="left"  speedSeconds={26} />
      <MarqueeRow items={bottom} direction="right" speedSeconds={32} />
    </div>
  )
}

/* ================= Router + Dark Mode ================= */
const getRoute = () => (location.hash.replace(/^#\/?/, '') || 'home')
function useDarkMode() {
  const [dark, setDark] = React.useState(() => localStorage.getItem('theme') === 'dark')
  React.useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark') }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light') }
  }, [dark])
  return [dark, setDark]
}

/* ============================ STORY PAGE TEMPLATE ============================ */
function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids?.[0] || '')
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 0.2, 0.5, 1] }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}
function useProgress() {
  const [pct, setPct] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('story-root')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = Math.min(Math.max(window.scrollY - el.offsetTop, 0), total)
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return pct
}

function StoryPage({ story }) {
  const sectionIds = story.sections.map(s => s.id)
  const active = useScrollSpy(sectionIds)
  const progress = useProgress()
  const onImgErr = (e) => {
    e.currentTarget.src = story.fallbackImg || `${BASE}images/journey/stanford/_fallback.jpg`
    e.currentTarget.style.opacity = 0.7
  }

  return (
    <section id="story-root" className="max-w-6xl mx-auto px-6 md:px-8 py-0">
      {/* Progress bar */}
      <div className="sticky top-16 z-30 h-1 bg-transparent">
        <div className="h-1 bg-emerald-600/70" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <div className="pt-8">
        <nav className="text-sm text-emerald-900/70 dark:text-emerald-300/70">
          <a href="#/" className="hover:underline">Home</a> <span>›</span>{' '}
          <a href="#/journey" className="hover:underline">My Journey</a> <span>›</span>{' '}
          <span className="text-emerald-900 dark:text-emerald-100">{story.shortTitle}</span>
        </nav>

        <div className="mt-4 grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8">
            <img
              src={story.hero}
              alt={story.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
              onError={onImgErr}
            />
          </div>
          <div className="md:col-span-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-emerald-950 dark:text-emerald-100">{story.title}</h1>
            <p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">{story.dek}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {story.chips?.map((c) => <Pill key={c}>{c}</Pill>)}
            </div>

            {/* At a glance */}
            {story.atAGlance?.length > 0 && (
              <div className={`mt-5 rounded-2xl ${brand.card} ring-1 ring-black/5 dark:ring-white/10 p-4`}>
                <h3 className="font-semibold text-emerald-950 dark:text-emerald-100 mb-2">At a glance</h3>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {story.atAGlance.map((it, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="text-emerald-900/70 dark:text-emerald-300/70">{it.label}</span>
                      <span className="font-medium text-emerald-950 dark:text-emerald-100">{it.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body with sticky sidebar */}
      <div className="mt-10 grid md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3 hidden md:block">
          <div className="sticky top-24">
            <div className={`rounded-2xl ${brand.card} ring-1 ring-black/5 dark:ring-white/10 p-4`}>
              <div className="text-sm font-semibold mb-2 text-emerald-950 dark:text-emerald-100">On this page</div>
              <ul className="space-y-2 text-sm">
                {story.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block hover:underline ${active === s.id ? 'text-emerald-800 dark:text-emerald-200 font-medium' : 'text-emerald-900/80 dark:text-emerald-300/80'}`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downloads */}
            {story.downloads?.length > 0 && (
              <div className={`mt-4 rounded-2xl ${brand.card} ring-1 ring-black/5 dark:ring-white/10 p-4`}>
                <div className="text-sm font-semibold mb-2 text-emerald-950 dark:text-emerald-100">Artifacts</div>
                <div className="grid gap-2">
                  {story.downloads.map((d, i) => (
                    <a key={i} href={d.href} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-200 hover:underline">
                      <Download className="w-4 h-4" /> {d.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="md:col-span-9 space-y-10">
          {story.sections.map((s) => (
            <section id={s.id} key={s.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-emerald-100">{s.title}</h2>
              <div className="prose prose-emerald dark:prose-invert mt-3 max-w-none">
                {s.content}
              </div>

              {/* Optional figure slot */}
              {s.figure && (
                <figure className="mt-5">
                  <img
                    src={s.figure.src}
                    alt={s.figure.alt || s.figure.caption || ''}
                    className="w-full rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
                    onError={onImgErr}
                  />
                  {s.figure.caption && (
                    <figcaption className="mt-2 text-sm text-emerald-900/70 dark:text-emerald-300/70">
                      {s.figure.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {/* Gallery */}
          {story.gallery?.length > 0 && (
            <section id="gallery" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-emerald-100">Gallery</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {story.gallery.map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`Gallery ${i+1}`}
                    className="w-full h-56 object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
                    onError={onImgErr}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CTA back + contact */}
          <div className="flex flex-wrap gap-3 pt-4">
            <a href="#/journey" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-50 hover:shadow-sm">
              ← Back to My Journey
            </a>
            <a href="#/contact" className="bg-emerald-700 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 hover:opacity-90">
              Let’s collaborate
            </a>
          </div>
        </main>
      </div>
    </section>
  )
}

/* ======================= STORY: STANFORD FELLOWSHIP ======================= */
const STANFORD_DIR = `${BASE}images/journey/stanford/`
const STANFORD_DL = `${BASE}downloads/stanford/`

const StanfordStory = {
  slug: 'stanford',
  shortTitle: 'Stanford Fellowship',
  title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
  dek: 'Investigating how PET/MRI and multi-omics can surface early gut–brain biomarkers linked to dementia risk—shifting prevention years upstream.',
  hero: `${STANFORD_DIR}hero.jpg`,
  fallbackImg: `${STANFORD_DIR}_fallback.jpg`,
  chips: ['2025', 'Molecular Imaging Fellow', 'Stanford Radiology'],
  atAGlance: [
    { label: 'Duration', value: 'Summer 2025' },
    { label: 'Focus', value: 'Early GBA inflammatory/metabolic signals' },
    { label: 'Outputs', value: 'Talk • Poster • Slide deck' },
    { label: 'Mentors', value: 'F. Habte • A. Natarajan • L.J. Pisani' },
  ],
  downloads: [
    { label: 'Slides (PDF)', href: `${STANFORD_DL}stanford_slides.pdf` },
    { label: 'Poster (PDF)', href: `${STANFORD_DL}stanford_poster.pdf` },
    { label: 'One-pager (PDF)', href: `${STANFORD_DL}stanford_onepager.pdf` },
  ],
  sections: [
    {
      id: 'why-this-program-mattered',
      title: 'Why this program mattered',
      content: (
        <>
          <p>
            I was selected to join the 2025 Stanford Radiology Summer Mini-Fellowship—an intensive, mentor-led program that brings students into the world of molecular imaging. What made it special wasn’t just the faculty; it was how deliberately the curriculum bridged <strong>study</strong>, <strong>research</strong>, and <strong>clinical translation</strong>.
          </p>
          <p>
            Each week layered concepts that moved from fundamentals to practice—imaging technologies; agents, tracers, and radiochemistry; physics of luminescence; cellular and preclinical workflows; clinical applications; and biomedical image analysis with AI. It felt less like a class and more like joining a working lab that thinks hard about how imaging changes patient care.
          </p>
        </>
      ),
    },
    {
      id: 'what-i-learned',
      title: 'What I learned (highlights)',
      content: (
        <>
          <ul>
            <li><strong>Foundations & technologies:</strong> how PET, SPECT, MRI, and optical approaches answer distinct biological questions.</li>
            <li><strong>Imaging agents & radiochemistry:</strong> tracer design, half-life trade-offs, signal-to-noise, and clinical constraints.</li>
            <li><strong>Physics of luminescence:</strong> what the signal model permits—and where it breaks.</li>
            <li><strong>Cellular & preclinical imaging:</strong> animal prep, acquisition protocols, quantification, and data quality.</li>
            <li><strong>Clinical applications:</strong> how molecular imaging informs oncology, cardiology, and neurology decisions.</li>
            <li><strong>Image analysis & AI:</strong> QC → registration → segmentation → features → modeling; when classical beats deep learning, and how to validate both.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'relevance-to-medicine',
      title: 'Why molecular imaging matters for medicine',
      content: (
        <>
          <p>
            Molecular imaging doesn’t just show anatomy—it shows <em>biology in motion</em>. Instead of waiting for structure to fail, it asks: what pathways are active now, and can we modulate them before damage sets in? That shift—from detecting late structural change to capturing early molecular activity—is the posture prevention needs.
          </p>
          <p>
            Practically, it enables earlier screening, sharper risk stratification, and quantitative treatment response—well before conventional imaging alone would register change.
          </p>
        </>
      ),
      figure: {
        src: `${STANFORD_DIR}figure_pipeline.png`,
        caption: 'Integrated imaging–omics pipeline linking clinical data, microbiome/metabolomic profiling, and brain imaging to identify gut–brain axis biomarkers in MCI and AD.',
        alt: 'Integrated imaging–omics pipeline diagram',
      }
    },
    {
      id: 'capstone',
      title: 'Designing my capstone: why the brain–gut axis?',
      content: (
        <>
          <p>
            Over the past few months at university, I’ve grown a real interest in nutrition—not as a rules list, but as a biological conversation between the gut and brain. The fellowship gave me tools to connect that curiosity to methods that could test it. For my final project, I explored a concept I care about deeply: using <strong>molecular imaging plus multi-omics</strong> to look for <strong>early inflammatory and metabolic signals</strong> along the brain–gut axis that might forecast cognitive decline.
          </p>
          <ul>
            <li><strong>Motivation:</strong> neurodegenerative disease is usually diagnosed after years of silent biology; gut-derived metabolites and immune mediators might precede symptoms.</li>
            <li><strong>Concept:</strong> pair PET/MRI readouts with microbiome/metabolomic measures and cognitive indices; test if a compact feature set aligns with regional brain activity or risk.</li>
            <li><strong>What I built:</strong> a reproducible analysis blueprint (QC, ROI definition, feature engineering, CCA/PLS integration, validation) and an illustrative figure.</li>
          </ul>
        </>
      ),
      figure: {
        src: `${STANFORD_DIR}figure_gba.png`,
        caption: 'Concept sketch: linking gut-derived signals to region-specific brain activity as a prevention-first strategy.',
        alt: 'Brain–gut axis concept figure',
      }
    },
    {
      id: 'impact-next',
      title: 'Impact on me & next steps',
      content: (
        <>
          <p>
            This fellowship didn’t just teach me molecular imaging—it recalibrated how I see prevention. I think in mechanisms now, not just findings. “Normal MRI” isn’t the end of the road; it’s the cue to ask a molecular question instead.
          </p>
          <ol>
            <li><strong>Prototype the pipeline</strong> on a small curated dataset to surface feasibility issues early.</li>
            <li><strong>Iterate the feature set</strong> (metabolites, cytokines, imaging ROIs) with mentors; pre-register analysis steps.</li>
            <li><strong>Present & refine</strong> via a short deck/poster; solicit feedback from imaging and neurogastroenterology groups.</li>
            <li><strong>Pilot study or methods paper</strong> depending on data access.</li>
          </ol>
        </>
      ),
    },
  ],
  gallery: [
    `${STANFORD_DIR}gallery_01.jpg`,
    `${STANFORD_DIR}gallery_02.jpg`,
    `${STANFORD_DIR}gallery_03.jpg`,
  ],
}

/* ================== Featured Stories (for Journey page only) ================== */
const FEATURED_DIR = `${BASE}images/journey-featured/`
const STORY_FALLBACK = `${BASE}images/journey-featured/_fallback.jpg`

const featuredStories = [
  {
    year: "2025",
    title: "Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis",
    desc: "Investigating how molecular imaging and multi-omics can uncover early gut–brain axis biomarkers linked to dementia risk—years before symptoms appear.",
    img: `${FEATURED_DIR}stanford.jpg`,
    link: "#/journey/stanford"
  },
  {
    year: "2024–2025",
    title: "The Naloxone Project: Saving Lives on Campus",
    desc: "I co-led a campus-wide overdose prevention initiative that placed 32 emergency naloxone kits across McMaster University, strengthening emergency readiness.",
    img: `${FEATURED_DIR}naloxone.jpg`,
    link: "#/journey/naloxone"
  },
  {
    year: "2024",
    title: "University of Manitoba Paediatric Research",
    desc: "With INGAUGE Laboratories (Dr. Roberta Woodgate), I worked on research amplifying youth voices to improve patient-centred pediatric care.",
    img: `${FEATURED_DIR}manitoba.jpg`,
    link: "#/journey/manitoba"
  },
  {
    year: "Ongoing",
    title: "CAMH Public Health Research",
    desc: "Projects bridging harm reduction and culturally informed care to shape more equitable opioid and mental health strategies.",
    img: `${FEATURED_DIR}camh.jpg`,
    link: "#/journey/camh"
  }
]
function usePreloadImages(srcs) {
  React.useEffect(() => {
    srcs.forEach(src => {
      const img = new Image()
      img.onerror = () => console.warn(`[featured] 404 or load error: ${src}`)
      img.src = src
    })
  }, [srcs])
}
function FeaturedStoriesStrip() {
  usePreloadImages(featuredStories.map(s => s.img))
  const onImgErr = (e) => {
    if (STORY_FALLBACK) e.currentTarget.src = STORY_FALLBACK
    e.currentTarget.style.opacity = 0.6
  }
  return (
    <section id="featured-stories" className="mt-8">
      <div className="flex items-end justify-between gap-4 mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-950 dark:text-emerald-100">Featured Stories</h2>
        <span className="text-sm text-emerald-700 dark:text-emerald-200">Chronological</span>
      </div>
      <div className="overflow-x-auto flex gap-6 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
        {featuredStories.map((story, idx) => (
          <a key={idx} href={story.link}
             className="snap-start flex-none w-80 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-emerald-900/40 hover:shadow-lg transition">
            <img src={story.img} alt={story.title} onError={onImgErr} className="h-48 w-full object-cover" />
            <div className="p-5 flex flex-col gap-2">
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{story.year}</div>
              <h3 className="font-semibold text-lg text-emerald-950 dark:text-emerald-100">{story.title}</h3>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-300/80">{story.desc}</p>
              <span className="mt-2 inline-flex items-center text-sm font-medium text-emerald-700 dark:text-emerald-200">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* --------- Standalone Pages --------- */
function ContactPage() {
  const FORMSPREE_ID = "your_form_id_here"
  const action = `https://formspree.io/f/${FORMSPREE_ID}`
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl font-semibold text-emerald-950 dark:text-emerald-100">Contact</h1>
      <p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">
        Reach out for collaborations in imaging, prevention, and public health.
      </p>

      <form action={action} method="POST" className="mt-8 grid gap-4">
        <input name="name" required placeholder="Your name" className="rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-emerald-900/40 dark:text-emerald-50"/>
        <input name="email" type="email" required placeholder="you@example.com" className="rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white dark:bg-emerald-900/40 dark:text-emerald-50"/>
        <textarea name="message" required placeholder="How can I help?" className="rounded-xl px-4 py-3 h-36 ring-1 ring-black/10 bg-white dark:bg-emerald-900/40 dark:text-emerald-50"/>
        <button className="bg-emerald-700 text-white rounded-xl px-5 py-3 w-fit hover:opacity-90">Send</button>
      </form>

      <div className="mt-8 text-sm text-emerald-900/70 dark:text-emerald-300/70">
        Or email me directly: <a className="underline" href="mailto:imperuma@gmail.com">imperuma@gmail.com</a>
      </div>
    </section>
  )
}

/* tiny icons for Publications link bar */
function ScholarIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor"
        d="M12 3L2 9l10 6 10-6-10-6Zm0 8.5L5.2 9 12 5.5 18.8 9 12 11.5Zm-7 3.2V15l7 4 7-4v-.3L12 16.7 5 14.7Z" />
    </svg>
  )
}
function OrcidIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <circle cx="128" cy="128" r="128" fill="#A6CE39" />
      <rect x="92" y="76" width="20" height="104" rx="3" fill="white" />
      <path fill="white" d="M150 76c-29 0-52 23-52 52s23 52 52 52 52-23 52-52-23-52-52-52zm0 20c18 0 32 14 32 32s-14 32-32 32-32-14-32-32 14-32 32-32z"/>
    </svg>
  )
}

function PublicationsPage() {
  const LINKS = {
    scholar: "https://scholar.google.com/citations?user=Pzwn3y0AAAAJ&hl=en",
    orcid: "https://orcid.org/0009-0007-3778-7635",
    linkedin: "https://www.linkedin.com/in/imeth-illamperuma-3a734a193/details/publications/",
  }

  const logos = [
    "guardian.png","time.png","stat.png","bmj.png","hill.png",
    "newscientist.png","npr.png","natgeo.png","mittr.png","wired.png",
  ]
  const sources = logos.map((file) => `${BASE}pub-logos/${file}`)

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl font-semibold text-emerald-950 dark:text-emerald-100">Writing Published In</h1>
      <p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">A selection of outlets featuring my work.</p>

      <div className={`mt-6 rounded-2xl ${brand.card} ring-1 ring-black/5 dark:ring-white/10 p-4`}>
        <div className="flex flex-wrap items-center gap-3">
          <a href={LINKS.scholar} target="_blank" rel="noopener noreferrer"
             className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-50 hover:shadow-sm">
            <ScholarIcon className="w-4 h-4" />
            <span>Google Scholar</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
          </a>

          <a href={LINKS.orcid} target="_blank" rel="noopener noreferrer"
             className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-50 hover:shadow-sm">
            <OrcidIcon className="w-4 h-4" />
            <span>ORCID iD</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
          </a>

          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"
             className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-50 hover:shadow-sm">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn Publications</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
          </a>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sources.map((src, i) => (
          <div key={src}
               className={`rounded-2xl ${brand.card} ring-1 ring-black/5 dark:ring-white/10 px-4 py-3 grid place-items-center logo-tile`}
               style={{ animationDuration: `${9 + (i % 5)}s`, animationDelay: `${(i % 5) * 0.2}s` }}>
            <img src={src} alt="" className="h-10 md:h-12 w-auto object-contain"
                 onError={(e) => { e.currentTarget.style.opacity = 0.25; }} />
          </div>
        ))}
      </div>

      <div className="mt-6 text-[11px] text-emerald-900/60 dark:text-emerald-300/60">
        Logos are for identification only and belong to their respective owners.
      </div>
    </section>
  )
}

/* --------- Journey Page (with featured stories section) ---------- */
function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl md:text-4xl font-semibold text-emerald-950 dark:text-emerald-100">My Journey</h1>
      <p className="mt-3 text-emerald-900/80 dark:text-emerald-300/80 max-w-3xl">
        A deeper look at the projects, teams, and ideas that shaped how I think about prevention-first medicine, imaging, and public health.
      </p>

      {/* Featured stories live ONLY on this page */}
      <FeaturedStoriesStrip />

      {/* (Add more Journey-only sections below as you like) */}
    </section>
  )
}

/* ================= Main App ================= */
export default function App() {
  const handleImgError = (e) => { e.currentTarget.src = FALLBACK_HEADSHOT; e.currentTarget.onerror = null }
  const [dark, setDark] = useDarkMode()
  const [route, setRoute] = React.useState(getRoute())
  React.useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`${brand.bg} min-h-screen`}>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-emerald-900/40 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
          <a href="#/" className="group inline-flex items-center gap-2">
            <div className={`${brand.accentBg} text-white w-9 h-9 rounded-xl grid place-items-center font-semibold`}>ii</div>
            <div className="font-medium tracking-tight text-emerald-900 dark:text-emerald-100 group-hover:opacity-90 transition">Imeth Illamperuma</div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-emerald-900/80 dark:text-emerald-200/80">
            <a href="#/" className="hover:text-emerald-900 dark:hover:text-emerald-100 transition">Home</a>
            <a href="#/journey" className="hover:text-emerald-900 dark:hover:text-emerald-100 transition">My Journey</a>
            <a href="#/publications" className="hover:text-emerald-900 dark:hover:text-emerald-100 transition">Publications</a>
            <a href="#/contact" className="hover:text-emerald-900 dark:hover:text-emerald-100 transition">Contact</a>
            <button
              onClick={() => setDark(v => !v)}
              className="ml-2 rounded-lg px-3 py-1 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-50"
              title="Toggle theme"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      {route === 'home' && (
        <section id="home" className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">
            {/* HERO */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-shrink-0 relative">
                <div className="absolute -z-10 -top-6 -left-6 w-12 h-12 rounded-full bg-emerald-200/70 blur-2xl" />
                <img src={HEADSHOT_PATH} onError={handleImgError} alt="Imeth Illamperuma" className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-4 ring-white" />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100">
                  Hey, I’m Imeth! I work to connect science, humanity, and innovation to shape the future of medicine.
                </motion.h1>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 text-lg md:text-xl text-emerald-900/80 dark:text-emerald-300/80">
                  <Typewriter options={{ strings: ['Student', 'Researcher', 'Preventative Medicine Advocate', 'Public Health Policy Advisor', 'Mentor'], autoStart: true, loop: true }} />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-3xl text-emerald-900/90 dark:text-emerald-300/80">
                  I’m into prevention-first thinking and turning evidence into action — from campus overdose response to imaging-based early detection. My work spans public health, harm reduction, mental health, and the brain–gut axis, with a focus on real-world impact and health equity.
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>HBSc, McMaster (Kin; Psych minor; Rehab Sci Cert)</Pill>
                  <Pill>Stanford Radiology — Molecular Imaging Fellow</Pill>
                  <Pill>Founder: SHIELD & The Naloxone Project</Pill>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#/contact" className="bg-emerald-700 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:opacity-90 transition"><Mail className="w-4 h-4" /> Contact</a>
                  <a href={`${BASE}Imeth-Illamperuma-CV.pdf`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 bg-white dark:bg-emerald-900/30 dark:text-emerald-50"><FileDown className="w-4 h-4" /> Download CV</a>
                </div>
              </div>
            </div>

            {/* Infinite Logos Carousel */}
            <div className="pt-4">
              <TwoLineCarousel items={affiliations} />
            </div>
          </div>

          {/* Journey preview (kept, but Featured Stories live ONLY on the Journey page) */}
          <section id="journey" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-emerald-950 dark:text-emerald-100">My Journey</h2>
                <p className="mt-3 text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                  Medicine became more than a destination for me—it’s been a series of questions, mentors, and moments that reshaped how I think about care. I started with movement and prevention, then found myself drawn to the spaces where science meets lived experience.
                </p>
                <a href="#/journey"
                   className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-700 text-white hover:opacity-90 transition">
                  Explore My Journey
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>

              <div className="relative">
                <div className="rounded-3xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/50 dark:bg-emerald-900/30 p-4">
                  <div
                    className="inline-flex items-center gap-3 whitespace-nowrap animate-marquee will-change-transform"
                    style={{ width: 'max-content', animationDuration: '38s' }}
                  >
                    {[...journeySrcs, ...journeySrcs].map((src, i) => (
                      <img
                        key={`jr-${i}`}
                        src={src}
                        alt=""
                        className="h-36 md:h-44 w-auto object-cover rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-xs text-emerald-900/60 dark:text-emerald-300/60">
                  Moments with teams and projects that shaped my work.
                </div>
              </div>
            </div>
          </section>

          {/* Offerings */}
          <section id="offerings" className="max-w-6xl mx-auto px-6 md:px-8 py-14">
            <div className="mb-6"><h2 className={`text-2xl md:text-3xl font-semibold ${brand.text}`}>What I Offer</h2></div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card><h3 className="font-semibold text-emerald-950 dark:text-emerald-100">Research Collaboration</h3><p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">Imaging + multi-omics for early detection along the brain–gut axis.</p></Card>
              <Card><h3 className="font-semibold text-emerald-950 dark:text-emerald-100">Policy & Advocacy</h3><p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">Translating findings into practical guidance for equitable health systems.</p></Card>
              <Card><h3 className="font-semibold text-emerald-950 dark:text-emerald-100">Talks & Workshops</h3><p className="mt-2 text-emerald-900/80 dark:text-emerald-300/80">Prevention-first medicine, harm reduction on campus, and digital health equity.</p></Card>
            </div>
          </section>
        </section>
      )}

      {route === 'journey' && <JourneyPage />}
      {route === 'journey/stanford' && <StoryPage story={StanfordStory} />}
      {route === 'publications' && <PublicationsPage />}
      {route === 'contact' && <ContactPage />}

      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-emerald-900/70 dark:text-emerald-300/70 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Imeth Illamperuma</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#/">Home</a>
            <a className="hover:underline" href="#/journey">My Journey</a>
            <a className="hover:underline" href="#/publications">Publications</a>
            <a className="hover:underline" href="#/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
