import React from 'react'
import { Card } from '../ui/brand'
import stories from './data/featuredStories'

const BASE = import.meta.env.BASE_URL
const FALLBACK = `${BASE}images/journey-featured/_fallback.jpg`

function usePreloadImages(srcs) {
  React.useEffect(() => {
    srcs.forEach(src => { const i = new Image(); i.src = src })
  }, [srcs])
}

export default function JourneyPage() {
  usePreloadImages(stories.map(s => s.img))
  const onErr = (e) => { e.currentTarget.src = FALLBACK }

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-3xl md:text-4xl font-semibold text-emerald-950 dark:text-emerald-50">My Journey</h1>
      <p className="mt-3 text-emerald-900 dark:text-emerald-100/90 max-w-3xl">
        A deeper look at projects, teams, and ideas that shaped how I think about prevention-first medicine, imaging, and public health.
      </p>

      {/* Featured Stories */}
      <div className="mt-8">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-950 dark:text-emerald-50">Featured Stories</h2>
          <span className="text-sm text-emerald-700 dark:text-emerald-300">Chronological</span>
        </div>

        <div className="overflow-x-auto flex gap-6 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
          {stories.map((s, i) => (
            <a key={i} href={s.link} className="snap-start flex-none w-80">
              <Card className="p-0 overflow-hidden">
                <img src={s.img} alt={s.title} onError={onErr} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{s.year}</div>
                  <h3 className="mt-1 font-semibold text-lg text-emerald-950 dark:text-emerald-50">{s.title}</h3>
                  <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100/90">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Read More →
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

