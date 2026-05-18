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
      { threshold: 0.1 }
    )
    el.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Book() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  if (!bookData.enabled) return null

  const title = bookData[`title_${lang}`] || bookData.title_pt
  const synopsis = bookData[`synopsis_${lang}`] || bookData.synopsis_pt

  return (
    <section id="livro" className="py-16 lg:py-24" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        <p className="reveal section-label mb-8">{t('book.sectionLabel')}</p>

        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-20 lg:items-start">

          <div>
            <h2 className="reveal font-display font-300 mb-2"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: 'rgba(245,242,238,0.9)' }}>
              {title}
            </h2>

            <p className="reveal reveal-delay-1 font-body mb-8"
              style={{ fontSize: '0.82rem', letterSpacing: '0.04em', color: 'rgba(245,242,238,0.4)' }}>
              {t('book.by')} {bookData.author}
            </p>

            <div className="reveal h-px mb-8" style={{ background: 'rgba(245,242,238,0.08)', maxWidth: '52ch' }} />

            <p className="reveal reveal-delay-1 font-body font-300 leading-relaxed mb-10"
              style={{ fontSize: '0.9375rem', color: 'rgba(245,242,238,0.5)', maxWidth: '50ch', lineHeight: 1.8 }}>
              {synopsis}
            </p>

            <div className="reveal reveal-delay-2">
              {bookData.notify_url ? (
                <a href={bookData.notify_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('book.buyCta')}
                </a>
              ) : (
                <span className="font-body text-[0.75rem] tracking-[0.14em] uppercase px-6 py-3 rounded-full"
                  style={{ border: '1px solid rgba(245,242,238,0.12)', color: 'rgba(245,242,238,0.3)', cursor: 'default' }}>
                  {t('book.notifyCta')}
                </span>
              )}
            </div>
          </div>

          {bookData.cover_image && (
            <div className="reveal reveal-delay-1 mt-10 lg:mt-0">
              <img src={bookData.cover_image} alt={title}
                className="rounded-sm"
                style={{ width: 200, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
            </div>
          )}
        </div>

        <div className="mt-16 lg:mt-20" style={{ borderBottom: '1px solid rgba(245,242,238,0.08)' }} />
      </div>
    </section>
  )
}
