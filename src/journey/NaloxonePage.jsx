// src/journey/NaloxonePage.jsx
import React from 'react'
import { Card, Pill } from '../ui/brand.jsx'

/* ---------------------- Map (Leaflet via CDN) ---------------------- */
function useLeaflet() {
  const [L, setL] = React.useState(() => (typeof window !== 'undefined' ? window.L : null))

  React.useEffect(() => {
    if (window.L) { setL(window.L); return }

    // Inject CSS
    const cssId = 'leaflet-css'
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link')
      link.id = cssId
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Inject JS
    const jsId = 'leaflet-js'
    if (!document.getElementById(jsId)) {
      const script = document.createElement('script')
      script.id = jsId
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true
      script.onload = () => setL(window.L)
      document.body.appendChild(script)
    } else {
      // if it exists but not loaded yet, wait for load
      const el = document.getElementById(jsId)
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
  const containerRef = React.useRef(null)
  const [expanded, setExpanded] = React.useState(false)

  // init map
  React.useEffect(() => {
    if (!L || mapRef.current) return
    const center = [43.2637, -79.9193] // campus-ish
    const map = L.map('naloxone-map', {
      center,
      zoom: 15,
      scrollWheelZoom: true,
      zoomControl: false,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 20,
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // markers
    const markers = NALOXONE_COORDS.map((latlng, i) =>
      L.marker(latlng).bindPopup(`<b>Naloxone Kit</b><br/>Location #${i + 1}`)
    )
    const group = L.featureGroup(markers).addTo(map)

    // fit bounds
    try {
      map.fitBounds(group.getBounds().pad(0.15))
    } catch { /* no-op */ }

    return () => map.remove()
  }, [L])

  // when expanding, fix sizing after transition
  React.useEffect(() => {
    if (!mapRef.current) return
    const t = setTimeout(() => mapRef.current.invalidateSize(), 250)
    return () => clearTimeout(t)
  }, [expanded])

  return (
    <div ref={containerRef} className={`relative ${expanded ? 'fixed inset-0 z-[70] p-4 bg-slate-950/95' : ''}`}>
      <div
        id="naloxone-map"
        className={`w-full ${expanded ? 'h-[calc(100vh-2rem)]' : 'h-[440px]'} rounded-2xl overflow-hidden ring-1 ring-white/10`}
      />
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="rounded-lg px-3 py-1 text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15"
        >
          {expanded ? 'Close' : 'Expand'}
        </button>
        <a
          href="https://www.openstreetmap.org/#map=16/43.2637/-79.9193"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-1 text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15"
        >
          Open in OSM
        </a>
      </div>
    </div>
  )
}

/* ---------------------- Page ---------------------- */
export default function NaloxonePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-10 space-y-10">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
          The Naloxone Project: Saving Lives on Campus
        </h1>
        <div className="hidden md:flex gap-2">
          <Pill>2024–2025</Pill>
          <Pill>Harm reduction</Pill>
          <Pill>Campus safety</Pill>
        </div>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-50">About the project</h2>
        <p className="mt-2 text-slate-200/90 leading-relaxed">
          We placed 32+ emergency naloxone kits across McMaster to strengthen overdose response and empower bystanders.
          The map below shows current kit locations. Click markers to see details; expand to explore the area in full.
        </p>
      </Card>

      <section>
        <h3 className="text-xl font-semibold text-slate-50 mb-3">Interactive kit map</h3>
        <NaloxoneMap />
        <p className="mt-2 text-xs text-slate-200/70">
          Base map © OpenStreetMap contributors. Locations approximate; check on-site signage for the exact kit.
        </p>
      </section>
    </section>
  )
}

