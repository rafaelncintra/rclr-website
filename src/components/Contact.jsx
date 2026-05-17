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
      { threshold: 0.15 }
    )
    const items = el.querySelectorAll('.reveal')
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useReveal()

  const mailtoHref = `mailto:${t('contact.email')}?subject=${encodeURIComponent(t('contact.emailSubject'))}`

  return (
    <section
      id="contato"
      className="py-24 lg:py-36 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-editorial mx-auto px-6 lg:px-12">
        <span className="editorial-rule-full mb-16 lg:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 lg:pt-20">
          {/* Left column — label + heading */}
          <div className="lg:col-span-5 reveal">
            <p className="section-label mb-6">{t('contact.sectionLabel')}</p>
            <h2
              className="font-display font-light text-ivory"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              {t('contact.sectionTitle')}
            </h2>
            <span className="editorial-rule mt-8" />
          </div>

          {/* Right column — body + CTA */}
          <div className="lg:col-span-7 reveal reveal-delay-2 flex flex-col justify-center gap-8">
            <p
              className="font-body text-ivory/60 font-light leading-[1.85]"
              style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)' }}
            >
              {t('contact.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href={mailtoHref} className="btn-ghost">
                {t('contact.cta')}
                <span className="text-gold/60" aria-hidden="true">→</span>
              </a>
            </div>

            {/* LinkedIn links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://linkedin.com/in/rafaelncintra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.08em] uppercase text-ivory/35 hover:text-gold transition-colors duration-300"
              >
                {t('contact.linkedin')}
                <span className="text-gold/30" aria-hidden="true">↗</span>
              </a>
              <span className="text-ivory/15 hidden sm:inline">·</span>
              <a
                href="https://linkedin.com/in/lrosocha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.08em] uppercase text-ivory/35 hover:text-gold transition-colors duration-300"
              >
                {t('contact.linkedinLarissa')}
                <span className="text-gold/30" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
