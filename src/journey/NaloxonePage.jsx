// src/journey/NaloxonePage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'

/* ======================= Config: media paths ======================= */
const BASE = import.meta.env.BASE_URL || '/'
const FEATURED_IMG = `${BASE}images/naloxone/featured.jpg`          // you + kit
const VIDEO_SRC    = `${BASE}videos/naloxone/placement.mp4`         // short loop
const GALLERY_FILES = [
  // Add/remove as needed – these will render in a responsive grid
  'kit-doorsign.jpg',
  'kit-wall-cabinet.jpg',
  'residence-lobby.jpg',
  'gym-corridor.jpg',
  'library-foyer.jpg',
  'offcampus-interface.jpg',
].map(f => `${BASE}images/naloxone/${f}`)

/* =================== Leaflet loader via CDN (no npm) =================== */
function useLeaflet() {
  const [L, setL] = React.useState(() => (typeof window !== 'undefined' ? window.L : null))
  React.useEffect(() => {
    if (window.L) { setL(window.L); return }

    // CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    // JS
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
  [43.25875, -79.92013],
  [43.2608328, -79.9202203],
  [43.2619161, -79.9201787],
  [43.26096, -79.92234],
  [43.2645107, -79.927063],
  [43.2631376, -79.9180447],
  [43.2640205, -79.916369],
  [43.26413, -79.92263],
  [43.2663, -79.9184],
  [43.26747, -79.91705],
  [43.26265, -79.9228],
  [43.26593, -79.91974],
  [43.2628, -79.92227],
  [43.26508, -79.91948],
  [43.26595, -79.91906],
  [43.2642788, -79.9189409],
  [43.26511, -79.91894],
  [43.26325, -79.92224],
  [43.2656, -79.918],
  [43.2610897, -79.9170224],
  [43.25992, -79.91891],
  [43.25976, -79.9205],
  [43.26491, -79.91628],
  [43.26527, -79.91498],
  [43.26593, -79.91638],
  [43.26585, -79.91493],
  [43.26616, -79.91422],
  [43.267222222, -79.914166667],
  [43.263333333, -79.918055556],
]

function NaloxoneMap() {
  const L = useLeaflet()
  const mapRef = React.useRef(null)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (!L || mapRef.current) return
    const center = [43.2637, -79.9193]
    const map = L.map('naloxone-map', {
      center, zoom: 15, scrollWheelZoom: true, zoomControl: false
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors', maxZoom: 20
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const markers = NALOXONE_COORDS.map((latlng, i) =>
      L.marker(latlng).bindPopup(`<b>Naloxone Kit</b><br/>Location #${i + 1}`)
    )
    const group = L.featureGroup(markers).addTo(map)
    try { map.fitBounds(group.getBounds().pad(0.15)) } catch {}

    return () => map.remove()
  }, [L])

  React.useEffect(() => {
    if (!mapRef.current) return
    const t = setTimeout(() => mapRef.current.invalidateSize(), 250)
    return () => clearTimeout(t)
  }, [expanded])

  return (
    <div className={`relative ${expanded ? 'fixed inset-0 z-[70] p-4 bg-slate-950/95' : ''}`}>
      <div id="naloxone-map" className={`w-full ${expanded ? 'h-[calc(100vh-2rem)]' : 'h-[440px]'} rounded-2xl overflow-hidden ring-1 ring-white/10`} />
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={() => setExpanded(v => !v)} className="rounded-lg px-3 py-1 text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15">
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

/* ============================= Page ============================= */
export default function NaloxonePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10 space-y-10">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
            The Naloxone Project: Saving Lives on Campus
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill>2024–2025</Pill>
            <Pill>32+ kits</Pill>
            <Pill>Harm reduction</Pill>
            <Pill>Student safety</Pill>
          </div>
        </div>
      </div>

      {/* Hero media (photo + loop video) */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-0 overflow-hidden">
          <img
            src={FEATURED_IMG}
            alt="Imeth holding an emergency naloxone kit"
            className="w-full h-full max-h-[420px] object-cover"
            onError={(e) => { e.currentTarget.style.opacity = 0.3 }}
          />
        </Card>
        <Card className="p-0 overflow-hidden">
          <video
            className="w-full h-full max-h-[420px] object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Placing a naloxone kit on campus"
          />
        </Card>
      </div>

      {/* Narrative sections */}
      <Card>
        <h2 className="text-xl font-semibold text-slate-50">A year in the making</h2>
        <p className="mt-2 text-slate-200/90 leading-relaxed">
          This project looks simple on the wall, but it was a year in the making. It started with
          a question—how do we make overdose response fast, visible, and stigma-free on campus?
          From there, I met with university health &amp; safety leadership, facilities, student affairs,
          and campus security to turn an idea into policy. We worked through procurement and maintenance
          plans, signage standards, reporting and refilling workflows, and the legal details that make
          a life-saving tool usable: where kits can be installed, who is responsible for checks, and how
          liability is handled under existing provincial protections and university policy. The administrative
          work was slow and necessary—and it made the rollout real, not just symbolic.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-slate-50">Fieldwork &amp; placement strategy</h2>
        <p className="mt-2 text-slate-200/90 leading-relaxed">
          I spent hours running the campus—literally—logging GPS coordinates, timing walking routes,
          and watching student traffic patterns. Residences and the areas where on-campus blends into
          off-campus housing emerged as higher-risk zones, especially during evening hours. We prioritized
          coverage in the eastern, western, and southern edges of campus to create overlapping “safety
          rings,” while still anchoring kits in central hubs like libraries, athletics, and transit
          corridors. The map below reflects that strategy: short travel time to a kit almost anywhere,
          with clear signage and repeat exposure so students know what they’re seeing before they ever
          need it.
        </p>
      </Card>

      {/* Map */}
      <section>
        <h3 className="text-xl font-semibold text-slate-50 mb-3">Interactive kit map</h3>
        <NaloxoneMap />
        <p className="mt-2 text-xs text-slate-200/70">
          Base map © OpenStreetMap contributors. Locations approximate; check on-site signage for the exact kit.
        </p>
      </section>

      <Card>
        <h2 className="text-xl font-semibold text-slate-50">Building a team: McMaster SHIELD</h2>
        <p className="mt-2 text-slate-200/90 leading-relaxed">
          Alongside the rollout, I founded <span className="font-semibold">McMaster SHIELD</span>—a student team focused
          on harm reduction, peer education, and practical emergency readiness. SHIELD helped with advocacy,
          wayfinding campaigns, and training sign-ups, and made the project visible beyond installation day.
          The goal wasn’t just to put boxes on walls; it was to build a culture where students recognize the kit,
          feel permitted to use it, and can act with confidence while help is on the way.
        </p>
      </Card>

      {/* Context gallery */}
      {GALLERY_FILES.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-slate-50 mb-3">Context gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_FILES.map((src, i) => (
              <div key={src + i} className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                <img
                  src={src}
                  alt="Naloxone kit placement context"
                  className="w-full h-56 object-cover"
                  onError={(e) => { e.currentTarget.style.opacity = 0.3 }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
