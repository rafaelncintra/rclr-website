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
      }, 180 + i * 130)
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 lg:pb-32 overflow-hidden"
      aria-label="Hero"
    >
      {/* Warm radial glow — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 60% 40%, rgba(196,99,58,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Large ghost wordmark — decorative */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-300 text-bark/[0.04] whitespace-nowrap"
          style={{ fontSize: 'clamp(9rem, 26vw, 24rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          RCLR
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-editorial mx-auto w-full px-6 lg:px-12"
        ref={containerRef}
      >
        {/* Eyebrow */}
        <div
          data-hero
          style={{
            opacity: 0,
            transform: 'translateY(18px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p className="section-label mb-8">{t('hero.eyebrow')}</p>
        </div>

        {/* Headline */}
        <div
          data-hero
          style={{
            opacity: 0,
            transform: 'translateY(22px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <h1
            className="font-display font-300 text-bark text-balance"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.8rem)',
              lineHeight: '1.0',
              letterSpacing: '-0.02em',
              maxWidth: '17ch',
            }}
          >
            {t('hero.headline')}
          </h1>
        </div>

        {/* Terracotta rule */}
        <div
          data-hero
          style={{
            opacity: 0,
            transform: 'translateY(14px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="hairline-short mt-10 mb-0 block" />
        </div>

        {/* Subheadline + CTA */}
        <div
          data-hero
          className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20 mt-10"
          style={{
            opacity: 0,
            transform: 'translateY(18px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p
            className="font-body text-bark-muted font-300 leading-[1.82] max-w-prose-md"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
          >
            {t('hero.subheadline')}
          </p>
          <div className="flex-shrink-0">
            <a href="#sobre" className="btn-outline">
              {t('hero.cta')}
              <span className="text-terra/70" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Bottom full-width hairline */}
        <div
          data-hero
          className="mt-16 lg:mt-20"
          style={{
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="hairline block" />
        </div>
      </div>
    </section>
  )
}
