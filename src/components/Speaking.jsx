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
      { threshold: 0.04 }
    )
    el.querySelectorAll('.reveal').forEach((i) => observer.observe(i))
    return () => observer.disconnect()
  }, [])
  return ref
}

function TalkRow({ talk, lang, t }) {
  const [open, setOpen] = useState(false)
  const hasDetail = talk.show_detail && (talk[`description_${lang}`] || talk.video_url || talk.slides_url)

  return (
    <div className="group py-4 -mx-4 px-4 transition-colors duration-150 hover:bg-white/[0.03]"
      style={{ borderBottom: '1px solid rgba(245,242,238,0.06)' }}>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <span className="font-display font-400 group-hover:text-terra transition-colors duration-200"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', letterSpacing: '-0.01em', color: 'rgba(245,242,238,0.85)' }}>
              {talk.conference}
            </span>
            {talk.international && (
              <span className="tag-intl" style={{ fontSize: '0.58rem' }}>{t('speaking.international')}</span>
            )}
          </div>

          <p className="font-body font-300 mb-2"
            style={{ fontSize: '0.83rem', color: 'rgba(245,242,238,0.42)', lineHeight: 1.4 }}>
            {talk[`topic_${lang}`]}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {talk.speakers.map((s) => (
              <span key={s} className="tag" style={{ fontSize: '0.6rem' }}>{s}</span>
            ))}
            <span className="font-body" style={{ fontSize: '0.73rem', color: 'rgba(245,242,238,0.25)' }}>
              {talk[`location_${lang}`]}
            </span>
          </div>
        </div>

        {hasDetail && (
          <button onClick={() => setOpen(!open)} aria-expanded={open}
            className="flex-shrink-0 mt-0.5 hover:text-terra transition-colors duration-150"
            style={{ color: 'rgba(196,99,58,0.5)' }}
            title={open ? t('speaking.collapse') : t('speaking.expand')}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
              style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {hasDetail && (
        <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
          <div style={{ overflow: 'hidden' }}>
            <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(245,242,238,0.07)' }}>
              {talk[`description_${lang}`] && (
                <p className="font-body font-300 text-sm leading-relaxed mb-4"
                  style={{ maxWidth: '58ch', color: 'rgba(245,242,238,0.42)' }}>
                  {talk[`description_${lang}`]}
                </p>
              )}
              <div className="flex gap-6">
                {talk.video_url && (
                  <a href={talk.video_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-[0.7rem] tracking-[0.1em] uppercase text-terra hover:text-terra-dim transition-colors">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M1.5 1.5L8.5 5L1.5 8.5V1.5Z"/></svg>
                    {t('speaking.watchVideo')}
                  </a>
                )}
                {talk.slides_url && (
                  <a href={talk.slides_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
                    style={{ color: 'rgba(245,242,238,0.32)' }}>
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 9L9 1M9 1H4M9 1V6" strokeLinecap="round"/></svg>
                    {t('speaking.viewSlides')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Speaking() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  const talks = talksData.map((talk) => ({ ...talk }))

  const grouped = talks.reduce((acc, talk) => {
    ;(acc[talk.year] = acc[talk.year] || []).push(talk)
    return acc
  }, {})
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  const totalIntl = talks.filter((tk) => tk.international).length
  const totalYears = years.length

  return (
    <section id="palestras" className="py-16 lg:py-24" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="reveal mb-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <p className="section-label">{t('speaking.sectionLabel')}</p>
            <div className="flex items-center gap-6">
              {[
                { value: talks.length, label: t('speaking.stats.total') },
                { value: totalIntl, label: t('speaking.stats.international') },
                { value: totalYears, label: t('speaking.stats.years') },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className="font-display font-300 text-terra"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                    {value}
                  </span>
                  <span className="font-body text-[0.65rem] tracking-[0.1em] uppercase"
                    style={{ color: 'rgba(245,242,238,0.28)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Year-grouped list */}
        <div className="reveal reveal-delay-1">
          {years.map((year) => (
            <div key={year} className="lg:grid lg:grid-cols-[56px_1fr] lg:gap-8 pt-4"
              style={{ borderTop: '1px solid rgba(245,242,238,0.07)' }}>
              <div className="hidden lg:block pt-5">
                <span className="font-display font-300"
                  style={{ fontSize: '0.85rem', letterSpacing: '0.05em', color: 'rgba(245,242,238,0.2)' }}>
                  {year}
                </span>
              </div>
              <div className="lg:hidden flex items-center gap-3 mb-1 pt-1">
                <span className="font-display font-300 text-terra text-sm">{year}</span>
              </div>
              <div>
                {grouped[year].map((talk) => (
                  <TalkRow key={talk.slug} talk={talk} lang={lang} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
