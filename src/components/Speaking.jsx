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
      { threshold: 0.08 }
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
      className="py-24 lg:py-36"
      style={{ background: 'linear-gradient(180deg, #0C0C0E 0%, #111114 50%, #0C0C0E 100%)' }}
      ref={sectionRef}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal mb-16 lg:mb-20">
          <p className="section-label mb-4">{t('speaking.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-light text-ivory"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
              }}
            >
              {t('speaking.sectionTitle')}
            </h2>
            <p className="font-body text-ivory/50 font-light leading-relaxed max-w-sm" style={{ fontSize: '0.9375rem' }}>
              {t('speaking.sectionIntro')}
            </p>
          </div>
          <span className="editorial-rule-full mt-8" />
        </div>

        {/* Talks list — editorial table style */}
        <div className="reveal reveal-delay-1">
          {/* Desktop column headers */}
          <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr_auto] gap-6 pb-3 mb-1">
            <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-ivory/25">{t('speaking.columns.event')}</span>
            <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-ivory/25">{t('speaking.columns.topic')}</span>
            <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-ivory/25">{t('speaking.columns.location')}</span>
            <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-ivory/25">{t('speaking.columns.year')}</span>
          </div>
          <div className="w-full h-px bg-ivory/8 mb-0" />

          {talks.map((talk, i) => (
            <div
              key={talk.id}
              className={`group border-b border-ivory/[0.06] transition-colors duration-200 hover:bg-ivory/[0.02] ${
                i % 2 === 0 ? '' : ''
              }`}
            >
              {/* Desktop row */}
              <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr_auto] gap-6 py-5 items-start">
                <div className="flex flex-col gap-1.5">
                  <span className="font-display font-light text-ivory group-hover:text-gold transition-colors duration-200" style={{ fontSize: '0.9375rem' }}>
                    {talk.conference}
                  </span>
                  <div className="flex items-center gap-2">
                    {talk.international && (
                      <span className="speaking-tag-intl">{t('speaking.international')}</span>
                    )}
                    {talk.speakers.map((s) => (
                      <span key={s} className="speaking-tag">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="font-body text-ivory/55 font-light leading-snug" style={{ fontSize: '0.9rem' }}>
                  {talk.topic}
                </span>
                <span className="font-body text-ivory/40 font-light text-sm">
                  {talk.location}
                </span>
                <span
                  className="font-display text-ivory/25 font-light text-right"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.04em' }}
                >
                  {talk.year}
                </span>
              </div>

              {/* Mobile row */}
              <div className="lg:hidden py-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display font-light text-ivory" style={{ fontSize: '1rem' }}>
                    {talk.conference}
                  </span>
                  <span className="font-display text-ivory/30 font-light text-sm flex-shrink-0">
                    {talk.year}
                  </span>
                </div>
                <p className="font-body text-ivory/50 text-sm leading-snug">{talk.topic}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {talk.international && (
                    <span className="speaking-tag-intl">{t('speaking.international')}</span>
                  )}
                  <span className="font-body text-ivory/30 text-xs">{talk.location}</span>
                  {talk.speakers.map((s) => (
                    <span key={s} className="speaking-tag">{s}</span>
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
