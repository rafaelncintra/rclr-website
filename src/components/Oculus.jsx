import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import oculusData from '../data/oculus.json'

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

function OculusLens() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 lg:w-20 lg:h-20"
      aria-hidden
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="rgba(196,99,58,0.2)" strokeWidth="1"/>
      {/* Middle ring */}
      <circle cx="60" cy="60" r="40" stroke="rgba(196,99,58,0.35)" strokeWidth="1"/>
      {/* Inner ring */}
      <circle cx="60" cy="60" r="24" stroke="rgba(196,99,58,0.5)" strokeWidth="1"/>
      {/* Core */}
      <circle cx="60" cy="60" r="8" fill="rgba(196,99,58,0.6)"/>
      {/* Cross hairs */}
      <line x1="60" y1="4" x2="60" y2="20" stroke="rgba(196,99,58,0.25)" strokeWidth="1"/>
      <line x1="60" y1="100" x2="60" y2="116" stroke="rgba(196,99,58,0.25)" strokeWidth="1"/>
      <line x1="4" y1="60" x2="20" y2="60" stroke="rgba(196,99,58,0.25)" strokeWidth="1"/>
      <line x1="100" y1="60" x2="116" y2="60" stroke="rgba(196,99,58,0.25)" strokeWidth="1"/>
    </svg>
  )
}

export default function Oculus() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  if (!oculusData.enabled) return null

  const heading = oculusData[`heading_${lang}`] || 'OCULUS'
  const tagline = oculusData[`tagline_${lang}`] || ''
  const description = oculusData[`description_${lang}`] || ''
  const ctaLabel = oculusData[`cta_label_${lang}`] || (lang === 'pt' ? 'Em breve' : 'Coming soon')

  return (
    <section id="oculus" className="py-28 lg:py-44 relative overflow-hidden" style={{ background: '#141210' }} ref={sectionRef}>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,99,58,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-editorial mx-auto px-6 lg:px-12 text-center">
        <div className="reveal flex justify-center mb-8">
          <OculusLens />
        </div>

        <h2
          className="reveal reveal-delay-1 font-display font-300 text-sand/90 tracking-widest mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.18em', lineHeight: 1 }}
        >
          {heading}
        </h2>

        {tagline && (
          <p
            className="reveal reveal-delay-2 font-body text-sand/40 font-300 mb-6 max-w-md mx-auto"
            style={{ fontSize: '0.9375rem', letterSpacing: '0.02em' }}
          >
            {tagline}
          </p>
        )}

        <div className="reveal reveal-delay-2 w-8 h-px bg-terra/30 mx-auto mb-6" />

        {description && (
          <p
            className="reveal reveal-delay-3 font-body text-sand/30 font-300 max-w-sm mx-auto mb-10"
            style={{ fontSize: '0.875rem', lineHeight: 1.7 }}
          >
            {description}
          </p>
        )}

        <div className="reveal reveal-delay-3">
          {oculusData.cta_url ? (
            <a
              href={oculusData.cta_url}
              className="inline-flex items-center gap-2.5 font-body text-[0.75rem] tracking-[0.15em] uppercase text-terra/70 hover:text-terra transition-colors duration-200"
            >
              {ctaLabel}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M1 5H13M9 1L13 5L9 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <span className="font-body text-[0.72rem] tracking-[0.18em] uppercase text-sand/20">
              {ctaLabel}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
