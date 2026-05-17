import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    const items = el.querySelectorAll('.reveal')
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Speaking() {
  const { t } = useTranslation()
  const sectionRef = useReveal()
  const talks = t('speaking.talks', { returnObjects: true })

  return (
    <section
      id="palestras"
      className="py-24 lg:py-36 bg-sand-200"
      ref={sectionRef}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal mb-14 lg:mb-18">
          <p className="section-label mb-4">{t('speaking.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-300 text-bark"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3.6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {t('speaking.sectionTitle')}
            </h2>
            <p
              className="font-body text-bark-muted font-300 leading-relaxed max-w-sm"
              style={{ fontSize: '0.9375rem' }}
            >
              {t('speaking.sectionIntro')}
            </p>
          </div>
          <span className="hairline mt-8 block" />
        </div>

        {/* Talks table */}
        <div className="reveal reveal-delay-1">
          {/* Desktop column headers */}
          <div className="hidden lg:grid grid-cols-[1.2fr_2fr_1fr_3.5rem] gap-6 pb-3">
            <span className="font-body text-[0.68rem] tracking-[0.14em] uppercase text-bark-faint">{t('speaking.columns.event')}</span>
            <span className="font-body text-[0.68rem] tracking-[0.14em] uppercase text-bark-faint">{t('speaking.columns.topic')}</span>
            <span className="font-body text-[0.68rem] tracking-[0.14em] uppercase text-bark-faint">{t('speaking.columns.location')}</span>
            <span className="font-body text-[0.68rem] tracking-[0.14em] uppercase text-bark-faint text-right">{t('speaking.columns.year')}</span>
          </div>
          <div className="hairline mb-0" />

          {talks.map((talk) => (
            <div
              key={talk.id}
              className="group border-b border-border/60 hover:bg-sand-300/40 transition-colors duration-150"
            >
              {/* Desktop row */}
              <div className="hidden lg:grid grid-cols-[1.2fr_2fr_1fr_3.5rem] gap-6 py-4 items-start">
                <div className="flex flex-col gap-2">
                  <span
                    className="font-display font-400 text-bark group-hover:text-terra transition-colors duration-200"
                    style={{ fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
                  >
                    {talk.conference}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {talk.international && (
                      <span className="tag-intl">{t('speaking.international')}</span>
                    )}
                    {talk.speakers.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="font-body text-bark-muted font-300 leading-snug" style={{ fontSize: '0.875rem' }}>
                  {talk.topic}
                </span>
                <span className="font-body text-bark-faint font-300 text-sm">
                  {talk.location}
                </span>
                <span
                  className="font-display text-bark-faint font-300 text-right"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.03em' }}
                >
                  {talk.year}
                </span>
              </div>

              {/* Mobile row */}
              <div className="lg:hidden py-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-display font-400 text-bark"
                    style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}
                  >
                    {talk.conference}
                  </span>
                  <span className="font-display text-bark-faint font-300 text-sm flex-shrink-0">
                    {talk.year}
                  </span>
                </div>
                <p className="font-body text-bark-muted font-300 text-sm leading-snug">{talk.topic}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {talk.international && (
                    <span className="tag-intl">{t('speaking.international')}</span>
                  )}
                  <span className="font-body text-bark-faint text-xs">{talk.location}</span>
                  {talk.speakers.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
