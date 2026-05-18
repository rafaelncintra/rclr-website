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
      { threshold: 0.08 }
    )
    el.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

function BookCoverPlaceholder() {
  return (
    <div
      className="relative w-full max-w-[220px] mx-auto lg:mx-0"
      style={{ aspectRatio: '2/3' }}
    >
      {/* Shadow */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          boxShadow: '-12px 16px 40px rgba(0,0,0,0.45), -4px 4px 12px rgba(0,0,0,0.25)',
          transform: 'perspective(800px) rotateY(8deg)',
        }}
      />
      {/* Cover */}
      <div
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2E2926 0%, #1A1714 100%)',
          transform: 'perspective(800px) rotateY(8deg)',
        }}
      >
        {/* Decorative lines */}
        <div className="absolute inset-0" style={{ opacity: 0.12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${18 + i * 14}%`,
                height: '1px',
                background: '#F5F2EE',
              }}
            />
          ))}
        </div>
        {/* Terra accent block */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '35%', background: 'linear-gradient(0deg, #C4633A 0%, transparent 100%)', opacity: 0.7 }}
        />
        {/* Placeholder text */}
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div>
            <div className="w-8 h-px bg-terra mb-4" />
            <p className="font-body text-sand/30 text-[0.6rem] tracking-[0.2em] uppercase">Em breve</p>
          </div>
          <div>
            <p className="font-display text-sand/90 leading-tight mb-2" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              {bookData.title_pt || 'Título do Livro'}
            </p>
            <p className="font-body text-sand/50 text-[0.6rem] tracking-[0.1em]">{bookData.author}</p>
          </div>
        </div>
        {/* Spine highlight */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: 'linear-gradient(180deg, rgba(245,242,238,0.15) 0%, rgba(245,242,238,0.04) 100%)' }}
        />
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

  return (
    <section id="livro" className="py-24 lg:py-36 bg-bark text-sand" ref={sectionRef}>
      {/* Subtle grain on dark background */}
      <div className="relative max-w-editorial mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-20 lg:items-center">

          {/* Text column */}
          <div>
            <div className="reveal mb-10">
              <p className="section-label text-terra mb-4">{t('book.sectionLabel')}</p>
              <h2
                className="font-display font-300 text-sand leading-tight mb-2"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
              >
                {title}
              </h2>
              <p className="font-body text-sand/50 font-300 text-sm tracking-wide">{t('book.by')} {bookData.author}</p>
            </div>

            <div className="hairline-short reveal" style={{ background: 'rgba(196,99,58,0.4)' }} />

            <p className="reveal reveal-delay-1 font-body text-sand/70 font-300 leading-relaxed max-w-prose-md mt-6 mb-10" style={{ fontSize: '1rem' }}>
              {synopsis}
            </p>

            <div className="reveal reveal-delay-2">
              {bookData.notify_url ? (
                <a href={bookData.notify_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('book.buyCta')}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2.5 font-body text-[0.8125rem] font-500 tracking-[0.07em] uppercase border border-sand/20 text-sand/60 px-6 py-3 rounded-full cursor-default">
                  {t('book.notifyCta')}
                </span>
              )}
            </div>
          </div>

          {/* Cover column */}
          <div className="reveal reveal-delay-1 mt-14 lg:mt-0 flex justify-center lg:justify-end">
            {bookData.cover_image ? (
              <div style={{ transform: 'perspective(800px) rotateY(8deg)', maxWidth: 220 }}>
                <img
                  src={bookData.cover_image}
                  alt={title}
                  className="w-full rounded-sm"
                  style={{ boxShadow: '-12px 16px 40px rgba(0,0,0,0.45)' }}
                />
              </div>
            ) : (
              <BookCoverPlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
