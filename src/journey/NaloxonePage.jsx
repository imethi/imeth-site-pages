// src/journey/NaloxonePage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, Pill } from '../ui/brand.jsx'

/* ======================= Paths ======================= */
const BASE = import.meta.env.BASE_URL || '/'

const FEATURED_IMG = `${BASE}images/naloxone/featured.jpg`
const VIDEO_SRC    = `${BASE}videos/naloxone/placement.mp4`
const SPRAY_IMG    = `${BASE}images/naloxone/naloxonespray.png`

const GALLERY_FILES = [
  'kit-doorsign.jpg',
  'kit-wall-cabinet.jpg',
  'residence-lobby.jpg',
  'gym-corridor.jpg',
  'library-foyer.jpg',
  'offcampus-interface.jpg',
].map(f => `${BASE}images/naloxone/${f}`)

/* =================== Leaflet via CDN =================== */
function useLeaflet() {
  const [L, setL] = React.useState(() => (typeof window !== 'undefined' ? window.L : null))
  React.useEffect(() => {
    if (window.L) { setL(window.L); return }

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script')
      script.id = 'leaflet-js'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true
      script.onload = () => setL(window.L)
      document.body.appendChild(script)
    } else {
      const el = document.getElementById('leaflet-js')
      if (el && !window.L) el.addEventListener('load', () => setL(window.L), { once: true })
    }
  }, [])
  return L
}

const NALOXONE_COORDS = [
  [43.25875, -79.92013],[43.2608328, -79.9202203],[43.2619161, -79.9201787],
  [43.26096, -79.92234],[43.2645107, -79.927063],[43.2631376, -79.9180447],
  [43.2640205, -79.916369],[43.26413, -79.92263],[43.2663, -79.9184],
  [43.26747, -79.91705],[43.26265, -79.9228],[43.26593, -79.91974],
  [43.2628, -79.92227],[43.26508, -79.91948],[43.26595, -79.91906],
  [43.2642788, -79.9189409],[43.26511, -79.91894],[43.26325, -79.92224],
  [43.2656, -79.918],[43.2610897, -79.9170224],[43.25992, -79.91891],
  [43.25976, -79.9205],[43.26491, -79.91628],[43.26527, -79.91498],
  [43.26593, -79.91638],[43.26585, -79.91493],[43.26616, -79.91422],
  [43.267222222, -79.914166667],[43.263333333, -79.918055556],
]

function NaloxoneMap() {
  const L = useLeaflet()
  const mapRef = React.useRef(null)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (!L || mapRef.current) return
    const map = L.map('naloxone-map', { center:[43.2637,-79.9193], zoom:15, scrollWheelZoom:true, zoomControl:false })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:'&copy; OpenStreetMap contributors', maxZoom:20
    }).addTo(map)
    L.control.zoom({ position:'bottomright' }).addTo(map)

    const markers = NALOXONE_COORDS.map((latlng,i)=> L.marker(latlng).bindPopup(`<b>Naloxone Kit</b><br/>Location #${i+1}`))
    const group = L.featureGroup(markers).addTo(map)
    try { map.fitBounds(group.getBounds().pad(0.15)) } catch {}

    return () => map.remove()
  }, [L])

  React.useEffect(() => {
    if (!mapRef.current) return
    const t = setTimeout(() => mapRef.current.invalidateSize(), 200)
    return () => clearTimeout(t)
  }, [expanded])

  return (
    <div className={`relative ${expanded ? 'fixed inset-0 z-[70] p-4 bg-slate-950/95' : ''}`}>
      <div id="naloxone-map" className={`w-full ${expanded ? 'h-[calc(100vh-2rem)]':'h-[460px]'} rounded-2xl overflow-hidden ring-1 ring-white/10`} />
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={()=>setExpanded(v=>!v)} className="rounded-lg px-3 py-1 text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15">
          {expanded ? 'Close' : 'Expand'}
        </button>
        <a href="https://www.openstreetmap.org/#map=16/43.2637/-79.9193" target="_blank" rel="noopener noreferrer"
           className="rounded-lg px-3 py-1 text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15">
          Open in OSM
        </a>
      </div>
    </div>
  )
}

/* ================== Small helpers ================== */
const Kicker = ({ children }) => (
  <div className="mb-2 text-xs uppercase tracking-wide text-slate-200/60">{children}</div>
)

const PullQuote = ({ children }) => (
  <figure className="mt-6 mb-4">
    <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
      <div className="absolute -left-1 top-3 h-14 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-emerald-400" />
      <blockquote className="pl-4 italic text-slate-100/90">{children}</blockquote>
    </div>
  </figure>
)

/* ============================= Page ============================= */
export default function NaloxonePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 space-y-12">
      {/* HERO */}
      <motion.div
        initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-indigo-900/30 via-slate-900/40 to-emerald-900/20"
      >
        <div className="absolute -top-28 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative px-6 md:px-10 py-8 md:py-10">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            <span className="block text-slate-100">The Naloxone Project</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              Saving Lives on Campus
            </span>
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill>2024–2025</Pill><Pill>32+ kits</Pill><Pill>Harm reduction</Pill><Pill>Student safety</Pill>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#about-naloxone" className="text-sm rounded-lg px-3 py-1 bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15">About naloxone</a>
            <a href="#story"           className="text-sm rounded-lg px-3 py-1 bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15">Project story</a>
            <a href="#map"             className="text-sm rounded-lg px-3 py-1 bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15">Interactive map</a>
            <a href="#gallery"         className="text-sm rounded-lg px-3 py-1 bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15">Gallery</a>
          </div>
        </div>
      </motion.div>

      {/* ABOUT NALOXONE */}
      <section id="about-naloxone" className="scroll-mt-28">
        <Kicker>context</Kicker>
        <h2 className="text-2xl md:text-[28px] font-semibold text-slate-50">Naloxone on campus—why it matters</h2>
        <div className="mt-4 grid md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-3 leading-relaxed text-slate-200/90">
            <p>
              Naloxone is a safe medication that can rapidly reverse an opioid overdose by
              displacing opioids from their receptors. The nasal-spray formulation is designed
              for bystanders—no needles, minimal training, and very low risk if given to
              someone who isn’t actually overdosing.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li><span className="font-medium">Fast &amp; simple:</span> ready to use, with step-by-step instructions on the device.</li>
              <li><span className="font-medium">Safe to administer:</span> no effect on someone without opioids on board.</li>
              <li><span className="font-medium">Good Samaritan protections:</span> encourage students to act while EMS is en route.</li>
            </ul>
            <p className="mt-3">
              On a university campus, seconds matter. Residences, bathrooms, libraries,
              gyms, and the edges where on-campus meets off-campus housing are
              all places where a public, visible kit can shorten response time and save a life.
            </p>
          </div>
          <div className="md:col-span-2">
            <Card className="p-4 grid place-items-center bg-white/5">
              <img src={SPRAY_IMG} alt="Naloxone nasal spray" className="w-full max-w-[240px] h-auto object-contain drop-shadow"
                   onError={(e)=>{e.currentTarget.style.opacity=0.35}} />
              <div className="mt-2 text-xs text-slate-300/70">Nasal spray naloxone (4 mg)</div>
            </Card>
          </div>
        </div>
      </section>

      {/* STORY + STICKY MEDIA LAYOUT */}
      <section id="story" className="scroll-mt-28">
        <div className="grid md:grid-cols-12 gap-6">
          {/* LEFT: STORY */}
          <div className="md:col-span-7 lg:col-span-8">
            <Kicker>story</Kicker>
            <h2 className="text-2xl md:text-[28px] font-semibold text-slate-50">A year in the making</h2>
            <div className="mt-3 leading-relaxed text-slate-200/90 space-y-4">
              <p>
                This project looks simple on the wall, but it was a year in the making. It started with
                a question—how do we make overdose response fast, visible, and stigma-free on campus?
                From there, I met with university health &amp; safety leadership, facilities, student affairs,
                and campus security to turn an idea into policy.
              </p>
              <Card className="bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-sm font-semibold text-slate-100 mb-1">Turning policy into practice</div>
                <ul className="text-sm text-slate-200/90 list-disc pl-5 space-y-1">
                  <li>Procurement &amp; maintenance workflow</li>
                  <li>Signage standards and wayfinding</li>
                  <li>Refill &amp; incident reporting loop with H&amp;S</li>
                  <li>Liability &amp; Good-Samaritan alignment with university counsel</li>
                </ul>
              </Card>
              <p>
                The admin work was slow and necessary—and it made the rollout real, not just symbolic.
              </p>
            </div>

            <PullQuote>
              “We weren’t just mounting boxes—we were designing a system students would recognize,
              trust, and reach for without hesitation.”
            </PullQuote>

            <h3 className="mt-6 text-xl font-semibold text-slate-50">Fieldwork &amp; placement strategy</h3>
            <div className="mt-3 leading-relaxed text-slate-200/90 space-y-4">
              <p>
                I spent hours running campus—logging GPS coordinates, timing walking routes,
                and watching student traffic. Residences and the on-campus ↔ off-campus edges
                emerged as higher-risk zones. We prioritized coverage in the eastern, western,
                and southern edges to form overlapping “safety rings,” while anchoring kits
                in central hubs like libraries, athletics, and transit corridors.
              </p>
              <Card className="bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-sm font-semibold text-slate-100 mb-1">Design goals</div>
                <div className="text-sm text-slate-200/90 grid sm:grid-cols-2 gap-x-6">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>&lt; 2–3 min walk to a kit in most areas</li>
                    <li>Consistent mounting height &amp; signage</li>
                  </ul>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High-traffic lobbies &amp; corridors first</li>
                    <li>Residence &amp; off-campus interface covered</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* MAP directly after fieldwork text */}
            <section id="map" className="mt-6">
              <h3 className="text-xl font-semibold text-slate-50">Interactive kit map</h3>
              <p className="mt-2 text-slate-200/85">
                Explore placements across campus. Click markers to view a spot; use “Expand” for full-screen.
              </p>
              <div className="mt-4"><NaloxoneMap /></div>
              <p className="mt-2 text-xs text-slate-300/70">
                Base map © OpenStreetMap contributors. Locations approximate; check on-site signage for exact kit placement.
              </p>
            </section>

            <h3 className="mt-10 text-xl font-semibold text-slate-50">Building a team: McMaster SHIELD</h3>
            <p className="mt-3 leading-relaxed text-slate-200/90">
              Alongside the rollout, I founded <span className="font-semibold">McMaster SHIELD</span>—a student team for
              harm reduction, peer education, and practical emergency readiness. SHIELD helped with advocacy,
              wayfinding campaigns, and training sign-ups. The aim wasn’t just to install kits; it was to build a culture
              where students recognize the kit, feel permitted to use it, and can act with confidence while help is on the way.
            </p>
          </div>

          {/* RIGHT: STICKY MEDIA */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <Card className="p-0 overflow-hidden">
                <img
                  src={FEATURED_IMG}
                  alt="Imeth holding an emergency naloxone kit"
                  className="w-full h-full max-h-[360px] object-cover"
                  onError={(e)=>{e.currentTarget.style.opacity=0.3}}
                />
              </Card>
              <Card className="p-0 overflow-hidden">
                <video
                  className="w-full h-full max-h-[360px] object-cover"
                  src={VIDEO_SRC}
                  autoPlay muted loop playsInline
                  aria-label="Placing a naloxone kit in Mills Memorial Library"
                />
              </Card>
              <figcaption className="text-xs text-slate-300/70 px-1">
                Placing the kits — Mills Memorial Library (McMaster)
              </figcaption>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY AT BOTTOM */}
      {GALLERY_FILES.length > 0 && (
        <section id="gallery" className="scroll-mt-28">
          <Kicker>context</Kicker>
          <h2 className="text-2xl md:text-[28px] font-semibold text-slate-50">Gallery</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_FILES.map((src, i) => (
              <div key={src + i} className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                <img
                  src={src}
                  alt="Naloxone kit placement context"
                  className="w-full h-56 object-cover"
                  onError={(e)=>{e.currentTarget.style.opacity=0.3}}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
