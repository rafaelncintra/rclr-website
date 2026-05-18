import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    el.querySelectorAll('.reveal').forEach((i) => observer.observe(i))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useReveal()

  const mailtoHref = `mailto:${t('contact.email')}?subject=${encodeURIComponent(t('contact.emailSubject'))}`

  return (
    <section id="contato" className="py-24 lg:py-36" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        <div className="block mb-16 lg:mb-20" style={{ borderTop: '1px solid rgba(245,242,238,0.08)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5 reveal">
            <p className="section-label mb-5">{t('contact.sectionLabel')}</p>
            <h2 className="font-display font-300 leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', letterSpacing: '-0.02em', lineHeight: 1.08, color: 'rgba(245,242,238,0.88)' }}>
              {t('contact.sectionTitle')}
            </h2>
            <span className="hairline-short block" />
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 reveal reveal-delay-2 flex flex-col justify-center gap-8">
            <p className="font-body font-300 leading-[1.85]"
              style={{ fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)', color: 'rgba(245,242,238,0.5)' }}>
              {t('contact.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href={mailtoHref} className="btn-primary">
                {t('contact.cta')}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* LinkedIn links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2" style={{ borderTop: '1px solid rgba(245,242,238,0.08)' }}>
              <a href="https://linkedin.com/in/rafaelncintra" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-200 mt-4"
                style={{ color: 'rgba(245,242,238,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C4633A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,238,0.3)'}>
                {t('contact.linkedin')}
                <span style={{ color: 'rgba(196,99,58,0.4)' }}>↗</span>
              </a>
              <span className="hidden sm:inline mt-4" style={{ color: 'rgba(245,242,238,0.15)' }}>·</span>
              <a href="https://linkedin.com/in/lrosocha" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-200 sm:mt-4"
                style={{ color: 'rgba(245,242,238,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C4633A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,238,0.3)'}>
                {t('contact.linkedinLarissa')}
                <span style={{ color: 'rgba(196,99,58,0.4)' }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
