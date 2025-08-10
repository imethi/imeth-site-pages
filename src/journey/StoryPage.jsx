import React from 'react'
import { Download } from 'lucide-react'
import { brand, Pill, Card } from '../ui/brand'

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids?.[0] || '')
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter(e => e.isIntersecting)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 0.33, 1] }
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

export default function StoryPage({ story }) {
  const sectionIds = story.sections.map(s => s.id)
  const active = useScrollSpy(sectionIds)
  const progress = useProgress()
  const onImgErr = (e) => { e.currentTarget.src = story.fallbackImg || ''; e.currentTarget.style.opacity = 0.7 }

  return (
    <section id="story-root" className="max-w-6xl mx-auto px-6 md:px-8">
      {/* Progress */}
      <div className="sticky top-16 z-30 h-1 bg-transparent">
        <div className="h-1 bg-emerald-600" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <div className="pt-8 grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8">
          <Card className="p-0 overflow-hidden">
            <img
              src={story.hero}
              alt={story.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={onImgErr}
            />
          </Card>
        </div>
        <div className="md:col-span-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-950 dark:text-emerald-50">{story.title}</h1>
          <p className="mt-2 text-emerald-900 dark:text-emerald-100/90">{story.dek}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {story.chips?.map(c => <Pill key={c}>{c}</Pill>)}
          </div>

          {story.atAGlance?.length > 0 && (
            <Card className="mt-5">
              <h3 className="font-semibold text-emerald-950 dark:text-emerald-50 mb-2">At a glance</h3>
              <ul className="grid gap-2 text-sm">
                {story.atAGlance.map((it, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span className="text-emerald-900/80 dark:text-emerald-100/80">{it.label}</span>
                    <span className="font-medium text-emerald-950 dark:text-emerald-50">{it.value}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {story.downloads?.length > 0 && (
            <Card className="mt-4">
              <div className="text-sm font-semibold mb-2 text-emerald-950 dark:text-emerald-50">Artifacts</div>
              <div className="grid gap-2">
                {story.downloads.map((d, i) => (
                  <a key={i} href={d.href} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-200 hover:underline">
                    <Download className="w-4 h-4" /> {d.label}
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mt-10 grid md:grid-cols-12 gap-8">
        {/* Main content */}
        <main className="md:col-span-8 space-y-10">
          {story.sections.map(s => (
            <section id={s.id} key={s.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-emerald-50">{s.title}</h2>
              <div className="mt-3 leading-relaxed text-emerald-900 dark:text-emerald-100/90">
                {s.content}
              </div>
              {s.figure && (
                <figure className="mt-5">
                  <Card className="p-0 overflow-hidden">
                    <img src={s.figure.src} alt={s.figure.alt || s.figure.caption || ''} onError={onImgErr} />
                  </Card>
                  {s.figure.caption && (
                    <figcaption className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/75">
                      {s.figure.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {story.gallery?.length > 0 && (
            <section id="gallery" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-emerald-50">Gallery</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {story.gallery.map((g, i) => (
                  <Card key={i} className="p-0 overflow-hidden">
                    <img src={g} alt={`Gallery ${i+1}`} onError={onImgErr} className="w-full h-56 object-cover" />
                  </Card>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#/journey" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-50 hover:shadow-sm">
              ← Back to My Journey
            </a>
            <a href="#/contact" className="bg-emerald-700 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 hover:opacity-90">
              Let’s collaborate
            </a>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          <div className="sticky top-24">
            <Card>
              <div className="text-sm font-semibold mb-2 text-emerald-950 dark:text-emerald-50">On this page</div>
              <ul className="space-y-2 text-sm">
                {story.sections.map(s => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block hover:underline ${
                        active === s.id
                          ? 'text-emerald-800 dark:text-emerald-200 font-medium'
                          : 'text-emerald-900/80 dark:text-emerald-100/80'
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </aside>
      </div>
    </section>
  )
}

