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

function ExpandIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', flexShrink: 0 }}
    >
      <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DetailPanel({ open, talk, lang, t }) {
  const description = talk[`description_${lang}`]
  return (
    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ overflow: 'hidden' }}>
        <div className="pt-4 pb-2 mt-4 border-t border-border/50">
          {description && (
            <p className="font-body text-bark-muted font-300 text-sm leading-relaxed mb-4" style={{ maxWidth: '60ch' }}>
              {description}
            </p>
          )}
          {(talk.video_url || talk.slides_url) && (
            <div className="flex items-center gap-6 flex-wrap">
              {talk.video_url && (
                <a href={talk.video_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.1em] uppercase text-terra hover:text-terra-dim transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1.5 1.5L8.5 5L1.5 8.5V1.5Z"/></svg>
                  {t('speaking.watchVideo')}
                </a>
              )}
              {talk.slides_url && (
                <a href={talk.slides_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.1em] uppercase text-bark-muted hover:text-bark transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 9L9 1M9 1H4M9 1V6" strokeLinecap="round"/></svg>
                  {t('speaking.viewSlides')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Featured talk (most recent) ─────────────────────── */
function FeaturedTalk({ talk, lang, t }) {
  const [open, setOpen] = useState(false)
  const hasDetail = talk.show_detail && (talk[`description_${lang}`] || talk.video_url || talk.slides_url)

  return (
    <div className="relative overflow-hidden rounded-2xl mb-2" style={{ background: '#1A1714' }}>
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 10% 50%, rgba(196,99,58,0.12) 0%, transparent 65%)' }} />

      <div className="relative p-7 lg:p-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
          <span className="font-body text-[0.65rem] tracking-[0.18em] uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(196,99,58,0.18)', color: '#D4825E' }}>
            {t('speaking.mostRecent')}
          </span>
          <div className="flex items-center gap-3">
            {talk.international && (
              <span className="font-body text-[0.65rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(245,242,238,0.08)', color: 'rgba(245,242,238,0.5)' }}>
                {t('speaking.international')}
              </span>
            )}
            <span className="font-display font-300 text-sand/25 select-none"
              style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>
              {talk.year}
            </span>
          </div>
        </div>

        {/* Conference + topic */}
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-10 lg:items-end">
          <div>
            <h3 className="font-display font-300 text-sand leading-tight mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}>
              {talk.conference}
            </h3>
            <p className="font-body font-300 leading-snug" style={{ fontSize: '0.9375rem', color: 'rgba(245,242,238,0.55)', maxWidth: '52ch' }}>
              {talk[`topic_${lang}`]}
            </p>
          </div>

          {/* Speakers */}
          <div className="flex flex-wrap gap-2 mt-5 lg:mt-0 lg:flex-col lg:items-end">
            {talk.speakers.map((s) => (
              <span key={s} className="font-body text-[0.72rem] tracking-[0.08em] px-3 py-1 rounded-full"
                style={{ background: 'rgba(245,242,238,0.07)', color: 'rgba(245,242,238,0.45)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
          <span className="font-body text-xs" style={{ color: 'rgba(245,242,238,0.3)', letterSpacing: '0.04em' }}>
            {talk[`location_${lang}`]}
          </span>
          {hasDetail && (
            <button onClick={() => setOpen(!open)} aria-expanded={open}
              className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.12em] uppercase transition-colors duration-150"
              style={{ color: open ? '#D4825E' : 'rgba(196,99,58,0.7)' }}>
              {open ? t('speaking.collapse') : t('speaking.expand')}
              <ExpandIcon open={open} />
            </button>
          )}
        </div>

        {hasDetail && (
          <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.38s cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="pt-5 mt-5" style={{ borderTop: '1px solid rgba(245,242,238,0.1)' }}>
                {talk[`description_${lang}`] && (
                  <p className="font-body font-300 text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,242,238,0.5)', maxWidth: '60ch' }}>
                    {talk[`description_${lang}`]}
                  </p>
                )}
                {(talk.video_url || talk.slides_url) && (
                  <div className="flex items-center gap-6 flex-wrap">
                    {talk.video_url && (
                      <a href={talk.video_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.1em] uppercase transition-colors"
                        style={{ color: '#C4633A' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1.5 1.5L8.5 5L1.5 8.5V1.5Z"/></svg>
                        {t('speaking.watchVideo')}
                      </a>
                    )}
                    {talk.slides_url && (
                      <a href={talk.slides_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.1em] uppercase transition-colors"
                        style={{ color: 'rgba(245,242,238,0.35)' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 9L9 1M9 1H4M9 1V6" strokeLinecap="round"/></svg>
                        {t('speaking.viewSlides')}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Regular talk row ─────────────────────────────────── */
function TalkRow({ talk, lang, t }) {
  const [open, setOpen] = useState(false)
  const hasDetail = talk.show_detail && (talk[`description_${lang}`] || talk.video_url || talk.slides_url)

  return (
    <div className="group border-b border-border/60 py-4 last:border-b-0 hover:bg-sand-300/20 -mx-4 px-4 transition-colors duration-150 rounded-sm">
      <div className="flex items-start gap-4 justify-between">
        <div className="flex-1 min-w-0">
          {/* Conference + intl badge */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-display font-400 text-bark group-hover:text-terra transition-colors duration-200"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', letterSpacing: '-0.01em' }}>
              {talk.conference}
            </span>
            {talk.international && (
              <span className="tag-intl" style={{ fontSize: '0.6rem' }}>{t('speaking.international')}</span>
            )}
          </div>
          {/* Topic */}
          <p className="font-body text-bark-muted font-300 leading-snug mb-2" style={{ fontSize: '0.85rem' }}>
            {talk[`topic_${lang}`]}
          </p>
          {/* Speakers + location */}
          <div className="flex items-center gap-3 flex-wrap">
            {talk.speakers.map((s) => (
              <span key={s} className="tag" style={{ fontSize: '0.62rem' }}>{s}</span>
            ))}
            <span className="font-body text-bark-faint" style={{ fontSize: '0.75rem' }}>
              {talk[`location_${lang}`]}
            </span>
          </div>
        </div>

        {hasDetail && (
          <button onClick={() => setOpen(!open)} aria-expanded={open}
            className="text-terra/60 hover:text-terra transition-colors duration-150 mt-0.5 flex-shrink-0"
            title={open ? t('speaking.collapse') : t('speaking.expand')}>
            <ExpandIcon open={open} />
          </button>
        )}
      </div>

      <DetailPanel open={open} talk={talk} lang={lang} t={t} />
    </div>
  )
}

/* ── Main component ───────────────────────────────────── */
export default function Speaking() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  const talks = talksData.map((talk) => ({
    ...talk,
    topic: talk[`topic_${lang}`],
    location: talk[`location_${lang}`],
  }))

  const featured = talks[0]
  const rest = talks.slice(1)

  // Group by year descending
  const grouped = rest.reduce((acc, talk) => {
    ;(acc[talk.year] = acc[talk.year] || []).push(talk)
    return acc
  }, {})
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  const totalIntl = talks.filter((tk) => tk.international).length
  const totalYears = new Set(talks.map((tk) => tk.year)).size

  return (
    <section id="palestras" className="py-24 lg:py-36 bg-sand-200" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="reveal mb-12">
          <p className="section-label mb-4">{t('speaking.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display font-300 text-bark"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {t('speaking.sectionTitle')}
            </h2>
            <p className="font-body text-bark-muted font-300 leading-relaxed max-w-sm" style={{ fontSize: '0.9375rem' }}>
              {t('speaking.sectionIntro')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="reveal reveal-delay-1 flex items-center gap-10 mb-10 pb-10 border-b border-border">
          {[
            { value: talks.length, label: t('speaking.stats.total') },
            { value: totalIntl, label: t('speaking.stats.international') },
            { value: totalYears, label: t('speaking.stats.years') },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-display font-300 text-terra"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {value}
              </span>
              <span className="font-body text-bark-faint text-[0.7rem] tracking-[0.1em] uppercase">{label}</span>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featured && (
          <div className="reveal reveal-delay-2">
            <FeaturedTalk talk={featured} lang={lang} t={t} />
          </div>
        )}

        {/* Timeline */}
        <div className="reveal reveal-delay-2 mt-2">
          {years.map((year) => (
            <div key={year} className="lg:grid lg:grid-cols-[72px_1fr] lg:gap-8 py-6 border-t border-border/60 first:border-t-0">
              {/* Year anchor */}
              <div className="hidden lg:flex lg:items-start lg:pt-4">
                <span className="font-display font-300 text-bark-faint sticky top-24"
                  style={{ fontSize: '0.9rem', letterSpacing: '0.06em' }}>
                  {year}
                </span>
              </div>
              {/* Mobile year divider */}
              <div className="lg:hidden flex items-center gap-3 mb-3">
                <span className="font-display font-300 text-terra text-sm">{year}</span>
                <span className="flex-1 h-px bg-border" />
              </div>
              {/* Talks */}
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
