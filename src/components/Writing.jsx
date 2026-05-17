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

export default function Writing() {
  const { t } = useTranslation()
  const sectionRef = useReveal()
  const article = t('writing.featuredArticle', { returnObjects: true })

  return (
    <section id="publicacoes" className="py-24 lg:py-36" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal mb-16 lg:mb-20">
          <p className="section-label mb-4">{t('writing.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-light text-ivory"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
              }}
            >
              {t('writing.sectionTitle')}
            </h2>
            <p className="font-body text-ivory/50 font-light leading-relaxed max-w-sm" style={{ fontSize: '0.9375rem' }}>
              {t('writing.sectionIntro')}
            </p>
          </div>
          <span className="editorial-rule-full mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured article — large card */}
          <div className="lg:col-span-8 reveal reveal-delay-1">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-ivory/10 hover:border-gold/30 transition-all duration-500 p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
              />

              {/* Featured badge + publication */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-obsidian-900 bg-gold px-3 py-1">
                  {t('writing.featuredLabel')}
                </span>
                <span className="font-body text-ivory/40 text-sm tracking-wide">
                  {article.publication}
                </span>
                <span className="font-body text-ivory/25 text-sm">·</span>
                <span className="font-body text-ivory/40 text-sm">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-light text-ivory group-hover:text-ivory transition-colors duration-300 mb-6"
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="font-body text-ivory/55 font-light leading-[1.8] mb-8" style={{ fontSize: '0.9375rem' }}>
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="font-body text-ivory/35 text-xs tracking-wide italic">
                  {article.authors}
                </span>
                <span className="inline-flex items-center gap-2 font-display text-xs tracking-[0.1em] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                  {article.cta}
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </div>

          {/* Right column — coming soon + Medium link */}
          <div className="lg:col-span-4 reveal reveal-delay-2 flex flex-col gap-6">
            {/* Coming soon card */}
            <div
              className="border border-ivory/[0.06] border-dashed p-8 flex flex-col justify-center items-start gap-4"
              style={{ minHeight: '200px' }}
            >
              <span className="font-display text-ivory/20 font-light" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }} aria-hidden="true">
                …
              </span>
              <p className="font-display text-ivory/40 font-light" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                {t('writing.moreComing')}
              </p>
              <p className="font-body text-ivory/30 text-sm leading-relaxed">
                {t('writing.moreComingDetail')}
              </p>
            </div>

            {/* Medium link */}
            <a
              href={t('writing.mediumUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-ivory/10 hover:border-gold/30 transition-all duration-300 p-6 flex items-center justify-between"
            >
              <span className="font-display text-ivory/60 group-hover:text-gold transition-colors duration-300 font-light" style={{ fontSize: '0.9rem', letterSpacing: '0.02em' }}>
                {t('writing.mediumCta')}
              </span>
              <span className="text-gold/40 group-hover:text-gold transition-colors duration-300" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
