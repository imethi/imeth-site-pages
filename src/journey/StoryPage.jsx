import React from 'react'
import { Pill, Card } from '../ui/brand.jsx'

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
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids])
  return active
}

export default function StoryPage({ story }) {
  const sectionIds = story.sections.map(s => s.id)
  const active = useScrollSpy(sectionIds)
  const onImgErr = (e) => { e.currentTarget.style.opacity = 0.6 }

  return (
    <section id="story-root" className="max-w-6xl mx-auto px-6 md:px-8">
      {/* Header row: hero + summary */}
      <div className="pt-2 md:pt-3 grid md:grid-cols-12 gap-5 items-start">
        {/* Hero (frameless) */}
        <div className="md:col-span-7">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={story.hero}
              alt={story.title}
              className="w-full h-[15rem] md:h-[22rem] object-cover"
              onError={onImgErr}
            />
          </div>
        </div>

        {/* Title + meta */}
        <div className="md:col-span-5">
          {/* Stanford maroon; softer rose in dark for contrast */}
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-[#8C1515] dark:text-rose-300">
            {story.title}
          </h1>
          <p className="mt-2 text-slate-900 dark:text-slate-100/90">{story.dek}</p>

          <div className="mt-3 flex flex-wrap gap-2">{story.chips?.map(c => <Pill key={c}>{c}</Pill>)}</div>

          {/* Compact meta bar (replaces bulky cards) */}
          {story.atAGlance?.length > 0 && (
            <div className="mt-3 text-sm text-slate-900 dark:text-slate-100/90">
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {story.atAGlance.map((it, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-slate-500 dark:text-slate-400">{it.label}:</span>
                    <span className="ml-1 font-medium">{it.value}</span>
                    {i < story.atAGlance.length - 1 && <span className="mx-2 opacity-40">•</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inline downloads */}
          {story.downloads?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {story.downloads.map((d, i) => (
                <a
                  key={i}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-indigo-700 dark:text-indigo-300 hover:no-underline"
                >
                  {d.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content + sticky TOC */}
      <div className="mt-6 grid md:grid-cols-12 gap-8">
        <main className="md:col-span-8 space-y-12">
          {story.sections.map(s => (
            <section id={s.id} key={s.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">{s.title}</h2>
              <div className="mt-3 leading-relaxed text-slate-900 dark:text-slate-100/90">
                {s.content}
              </div>

              {/* Section figure: frameless & larger, no crop */}
              {s.figure && (
                <figure className="mt-5">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={s.figure.src}
                      alt={s.figure.alt || s.figure.caption || ''}
                      onError={onImgErr}
                      className="w-full max-h-[44rem] object-contain bg-slate-900"
                    />
                  </div>
                  {s.figure.caption && (
                    <figcaption className="mt-2 text-sm text-slate-900/80 dark:text-slate-100/75">
                      {s.figure.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {/* Masonry gallery: frameless, natural aspect ratio */}
          {story.gallery?.length > 0 && (
            <section id="gallery" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">Gallery</h2>
              <div className="mt-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
                {story.gallery.map((g, i) => (
                  <a
                    key={i}
                    href={g}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mb-4 block rounded-2xl overflow-hidden"
                  >
                    <img
                      src={g}
                      alt={`Gallery ${i + 1}`}
                      onError={onImgErr}
                      className="w-full h-auto object-contain bg-slate-900 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#/journey"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 hover:shadow-sm"
            >
              ← Back to My Journey
            </a>
            <a
              href="#/contact"
              className="bg-indigo-600 text-white inline-flex items-center gap-2 rounded-xl px-4 py-2 hover:opacity-90"
            >
              Let’s collaborate
            </a>
          </div>
        </main>

        <aside className="md:col-span-4">
          <div className="sticky top-24">
            <Card>
              <div className="text-sm font-semibold mb-2 text-slate-950 dark:text-slate-50">On this page</div>
              <ul className="space-y-2 text-sm">
                {story.sections.map(s => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block hover:underline ${
                        active === s.id
                          ? 'text-indigo-800 dark:text-indigo-300 font-medium'
                          : 'text-slate-900/80 dark:text-slate-100/80'
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
