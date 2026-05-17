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
      { threshold: 0.12 }
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
      className="py-24 lg:py-36 bg-sand-200"
      ref={sectionRef}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        <span className="hairline block mb-16 lg:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5 reveal">
            <p className="section-label mb-5">{t('contact.sectionLabel')}</p>
            <h2
              className="font-display font-300 text-bark"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              {t('contact.sectionTitle')}
            </h2>
            <span className="hairline-short block" />
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 reveal reveal-delay-2 flex flex-col justify-center gap-8">
            <p
              className="font-body text-bark-muted font-300 leading-[1.85]"
              style={{ fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)' }}
            >
              {t('contact.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href={mailtoHref} className="btn-primary">
                {t('contact.cta')}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* LinkedIn links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-border">
              <a
                href="https://linkedin.com/in/rafaelncintra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase text-bark-faint hover:text-terra transition-colors duration-200 mt-4"
              >
                {t('contact.linkedin')}
                <span className="text-terra/40" aria-hidden="true">↗</span>
              </a>
              <span className="text-border hidden sm:inline mt-4">·</span>
              <a
                href="https://linkedin.com/in/lrosocha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase text-bark-faint hover:text-terra transition-colors duration-200 sm:mt-4"
              >
                {t('contact.linkedinLarissa')}
                <span className="text-terra/40" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
