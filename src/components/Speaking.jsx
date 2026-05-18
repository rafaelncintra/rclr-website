import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import talksData from '../data/talks.json'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.06 }
    )
    el.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

function TalkCard({ talk, lang }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const topic = talk[`topic_${lang}`]
  const location = talk[`location_${lang}`]
  const description = talk[`description_${lang}`]
  const hasDetail = talk.show_detail && (description || talk.video_url || talk.slides_url)

  return (
    <article className={`group relative pl-4 pr-5 py-5 transition-all duration-200 border-b border-border/50 hover:bg-sand-300/30 ${open ? 'bg-sand-300/20' : ''}`}>
      {/* Animated left accent bar */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-300"
        style={{ background: open ? '#C4633A' : 'transparent', boxShadow: open ? '0 0 8px rgba(196,99,58,0.3)' : 'none' }}
        aria-hidden
      />
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: '#C4633A', opacity: open ? 0 : undefined }}
        aria-hidden
      />

      <div className="flex items-start gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            {talk.international && (
              <span className="tag-intl">{t('speaking.international')}</span>
            )}
            {talk.speakers.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>

          {/* Conference name */}
          <h3
            className="font-display font-400 text-bark group-hover:text-terra transition-colors duration-200 leading-tight"
            style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.4rem)', letterSpacing: '-0.015em' }}
          >
            {talk.conference}
          </h3>

          {/* Topic */}
          <p className="font-body text-bark-muted font-300 mt-1.5 leading-snug text-sm">
            {topic}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
            <span className="font-body text-bark-faint text-xs tracking-wide">{location}</span>
            {hasDetail && (
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-1.5 font-body text-[0.72rem] tracking-[0.1em] uppercase text-terra/80 hover:text-terra transition-colors duration-150 flex-shrink-0"
                aria-expanded={open}
              >
                {open ? t('speaking.collapse') : t('speaking.expand')}
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}
                >
                  <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Year */}
        <div
          className="font-display font-300 text-bark-faint flex-shrink-0 leading-none select-none"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '0.02em', opacity: 0.28 }}
        >
          {talk.year}
        </div>
      </div>

      {/* Expandable detail panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pt-4 mt-3 border-t border-border/60">
            {description && (
              <p className="font-body text-bark-muted font-300 text-sm leading-relaxed mb-4 max-w-prose-md">
                {description}
              </p>
            )}
            {(talk.video_url || talk.slides_url) && (
              <div className="flex items-center gap-5 flex-wrap">
                {talk.video_url && (
                  <a
                    href={talk.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.08em] uppercase text-terra hover:text-terra-dim transition-colors duration-150"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 2L10 6L2 10V2Z"/>
                    </svg>
                    {t('speaking.watchVideo')}
                  </a>
                )}
                {talk.slides_url && (
                  <a
                    href={talk.slides_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.08em] uppercase text-bark-muted hover:text-bark transition-colors duration-150"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M1 10L10 1M10 1H4M10 1V7"/>
                    </svg>
                    {t('speaking.viewSlides')}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Speaking() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'
  const talks = talksData.map((talk) => ({
    ...talk,
    topic: talk[`topic_${lang}`],
    location: talk[`location_${lang}`],
  }))

  const intl = talks.filter((tk) => tk.international)
  const local = talks.filter((tk) => !tk.international)

  return (
    <section id="palestras" className="py-24 lg:py-36 bg-sand-200" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="reveal mb-14 lg:mb-18">
          <p className="section-label mb-4">{t('speaking.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-300 text-bark"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              {t('speaking.sectionTitle')}
            </h2>
            <p className="font-body text-bark-muted font-300 leading-relaxed max-w-sm" style={{ fontSize: '0.9375rem' }}>
              {t('speaking.sectionIntro')}
            </p>
          </div>
          <span className="hairline mt-8 block" />
        </div>

        {/* Stats row */}
        <div className="reveal reveal-delay-1 grid grid-cols-3 gap-6 mb-14 max-w-lg">
          {[
            { value: talks.length, label: t('speaking.stats.total') },
            { value: intl.length, label: t('speaking.stats.international') },
            { value: [...new Set(talks.map(tk => tk.year))].length, label: t('speaking.stats.years') },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                className="font-display font-300 text-terra"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {value}
              </div>
              <div className="font-body text-bark-faint text-[0.72rem] tracking-[0.08em] uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="reveal reveal-delay-2 rounded-xl overflow-hidden border border-border/60 bg-sand-50/60 divide-y-0">
          {talks.map((talk) => (
            <TalkCard key={talk.slug} talk={talk} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
