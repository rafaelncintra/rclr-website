import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-hero]')
    items.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, 200 + i * 150)
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-28 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 15% 60%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 85% 20%, rgba(201,168,76,0.04) 0%, transparent 50%), linear-gradient(180deg, #0C0C0E 0%, #111114 100%)',
        }}
      />

      {/* Vertical rule accent — editorial column marker */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 flex items-stretch pointer-events-none">
        <div
          className="w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.15) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Large decorative background lettering */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-medium text-ivory/[0.025] whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          RCLR
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-editorial mx-auto w-full px-6 lg:px-12" ref={containerRef}>
        {/* Eyebrow */}
        <div
          data-hero
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p className="section-label mb-6">{t('hero.eyebrow')}</p>
        </div>

        {/* Headline */}
        <div
          data-hero
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <h1
            className="font-display font-light text-ivory text-balance"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              lineHeight: '0.97',
              letterSpacing: '-0.025em',
              maxWidth: '16ch',
            }}
          >
            {t('hero.headline')}
          </h1>
        </div>

        {/* Rule */}
        <div
          data-hero
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <span className="editorial-rule mt-10 mb-8" />
        </div>

        {/* Subheadline + CTA row */}
        <div
          data-hero
          className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p
            className="font-body text-ivory/60 font-light leading-relaxed max-w-prose-md"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
          >
            {t('hero.subheadline')}
          </p>
          <div className="flex-shrink-0">
            <a href="#sobre" className="btn-ghost">
              {t('hero.cta')}
              <span className="text-gold/60" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          data-hero
          className="mt-16"
          style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <span className="editorial-rule-full" />
        </div>
      </div>
    </section>
  )
}
