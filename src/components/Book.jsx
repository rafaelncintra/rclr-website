import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import bookData from '../data/book.json'

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

function BookCoverPlaceholder({ title, author }) {
  return (
    <div className="relative" style={{ width: 200, aspectRatio: '2/3' }}>
      {/* Page-turn shadow */}
      <div className="absolute inset-0"
        style={{
          boxShadow: '-20px 24px 64px rgba(0,0,0,0.75), -6px 6px 20px rgba(0,0,0,0.4)',
          transform: 'perspective(900px) rotateY(12deg) translateX(6px)',
          borderRadius: 2,
        }} />

      {/* Cover surface */}
      <div className="relative w-full h-full overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, #252019 0%, #1A1410 55%, #0F0D0A 100%)',
          transform: 'perspective(900px) rotateY(12deg)',
          borderRadius: 2,
        }}>

        {/* Decorative geometric mark */}
        <div className="absolute" style={{ top: '14%', left: '14%', right: '14%' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.22 }}>
            <circle cx="50" cy="50" r="46" stroke="#F5F2EE" strokeWidth="0.8"/>
            <circle cx="50" cy="50" r="30" stroke="#C4633A" strokeWidth="0.8"/>
            <line x1="50" y1="4" x2="50" y2="96" stroke="#F5F2EE" strokeWidth="0.6"/>
            <line x1="4" y1="50" x2="96" y2="50" stroke="#F5F2EE" strokeWidth="0.6"/>
            <circle cx="50" cy="50" r="6" fill="#C4633A" fillOpacity="0.6"/>
          </svg>
        </div>

        {/* Terra gradient wash at bottom */}
        <div className="absolute bottom-0 left-0 right-0"
          style={{ height: '42%', background: 'linear-gradient(0deg, rgba(196,99,58,0.28) 0%, transparent 100%)' }} />

        {/* Cover text */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="w-6 h-px mb-3" style={{ background: 'rgba(196,99,58,0.7)' }} />
          <p className="font-display text-sand/90 leading-tight mb-2"
            style={{ fontSize: '0.82rem', letterSpacing: '-0.01em' }}>
            {title}
          </p>
          <p className="font-body text-sand/40"
            style={{ fontSize: '0.58rem', letterSpacing: '0.1em' }}>
            {author}
          </p>
        </div>

        {/* Spine highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: 'linear-gradient(180deg, rgba(245,242,238,0.12) 0%, rgba(245,242,238,0.03) 100%)' }} />

        {/* Top edge light */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'rgba(245,242,238,0.08)' }} />
      </div>
    </div>
  )
}

export default function Book() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  if (!bookData.enabled) return null

  const title = bookData[`title_${lang}`] || bookData.title_pt
  const synopsis = bookData[`synopsis_${lang}`] || bookData.synopsis_pt
  const forthcoming = lang === 'pt' ? 'Próximo lançamento' : 'Forthcoming'

  return (
    <section id="livro" className="relative overflow-hidden py-28 lg:py-44" style={{ background: '#141210' }} ref={sectionRef}>

      {/* Warm atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 20% 65%, rgba(196,99,58,0.09) 0%, transparent 65%)' }} />

      {/* Decorative large text watermark */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden"
        style={{ paddingRight: '4%' }}>
        <span className="font-display font-300"
          style={{ fontSize: 'clamp(14rem, 24vw, 22rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'rgba(245,242,238,0.018)', userSelect: 'none' }}>
          libro
        </span>
      </div>

      <div className="relative max-w-editorial mx-auto px-6 lg:px-12">

        {/* Centered announcement rule */}
        <div className="reveal flex items-center gap-5 mb-20">
          <div className="flex-1 h-px" style={{ background: 'rgba(245,242,238,0.08)' }} />
          <span className="font-body text-[0.62rem] tracking-[0.24em] uppercase" style={{ color: 'rgba(196,99,58,0.55)' }}>
            {t('book.sectionLabel')}
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(245,242,238,0.08)' }} />
        </div>

        <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-24 lg:items-start">

          {/* ── Cover ─────────────────────────────────────────── */}
          <div className="reveal flex justify-center lg:justify-start mb-16 lg:mb-0 lg:pt-1">
            {bookData.cover_image ? (
              <div className="relative" style={{ width: 200 }}>
                <div className="absolute inset-0"
                  style={{ boxShadow: '-20px 24px 64px rgba(0,0,0,0.75)', transform: 'perspective(900px) rotateY(12deg) translateX(6px)', borderRadius: 2 }} />
                <img src={bookData.cover_image} alt={title} className="relative w-full"
                  style={{ transform: 'perspective(900px) rotateY(12deg)', borderRadius: 2, boxShadow: '-4px 8px 32px rgba(0,0,0,0.5)' }} />
              </div>
            ) : (
              <BookCoverPlaceholder title={title} author={bookData.author} />
            )}
          </div>

          {/* ── Text ──────────────────────────────────────────── */}
          <div>

            {/* Forthcoming badge */}
            <div className="reveal flex items-center gap-3 mb-7">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C4633A', opacity: 0.7 }} />
              <span className="font-body text-[0.62rem] tracking-[0.22em] uppercase" style={{ color: 'rgba(196,99,58,0.6)' }}>
                {forthcoming}
              </span>
            </div>

            {/* Title */}
            <div className="reveal mb-2">
              <h2 className="font-display font-300 leading-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', letterSpacing: '-0.025em', lineHeight: 1.04, color: 'rgba(245,242,238,0.92)' }}>
                {title}
              </h2>
            </div>

            {/* Author */}
            <p className="reveal reveal-delay-1 font-body font-300 mb-8"
              style={{ fontSize: '0.85rem', letterSpacing: '0.06em', color: 'rgba(245,242,238,0.35)' }}>
              {t('book.by')}{' '}
              <span style={{ color: 'rgba(245,242,238,0.55)' }}>{bookData.author}</span>
            </p>

            {/* Divider */}
            <div className="reveal h-px mb-8" style={{ background: 'rgba(245,242,238,0.08)', maxWidth: '46ch' }} />

            {/* Synopsis */}
            <p className="reveal reveal-delay-1 font-body font-300 leading-relaxed mb-12"
              style={{ fontSize: '0.9375rem', color: 'rgba(245,242,238,0.5)', maxWidth: '44ch', lineHeight: 1.75 }}>
              {synopsis}
            </p>

            {/* CTA */}
            <div className="reveal reveal-delay-2">
              {bookData.notify_url ? (
                <a href={bookData.notify_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-body text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(196,99,58,0.9)', color: 'rgba(245,242,238,0.95)' }}>
                  {t('book.buyCta')}
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.14em] uppercase rounded-full"
                  style={{ border: '1px solid rgba(245,242,238,0.12)', color: 'rgba(245,242,238,0.3)', padding: '0.875rem 1.75rem', cursor: 'default' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'rgba(196,99,58,0.6)' }} />
                  {t('book.notifyCta')}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
