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

function PersonCard({ person, index }) {
  const { t } = useTranslation()
  const data = t(`about.${person}`, { returnObjects: true })

  return (
    <article className={`reveal reveal-delay-${index + 1}`}>
      {/* Index number */}
      <div className="flex items-start gap-6 mb-8">
        <span
          className="font-display text-gold/20 font-light flex-shrink-0"
          style={{ fontSize: '4rem', lineHeight: 1, letterSpacing: '-0.04em' }}
          aria-hidden="true"
        >
          0{index + 1}
        </span>
        <div className="pt-2">
          <h3
            className="font-display font-light text-ivory"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            {data.name}
          </h3>
          <p className="font-body text-gold text-sm mt-2 font-light tracking-wide">
            {data.role}
          </p>
          <p className="font-body text-ivory/40 text-xs mt-1 tracking-[0.08em] uppercase">
            {data.location}
          </p>
        </div>
      </div>

      {/* Thin rule */}
      <div className="w-full h-px bg-ivory/8 mb-6" />

      {/* Bio */}
      <p className="font-body text-ivory/65 leading-[1.8] font-light" style={{ fontSize: '1rem' }}>
        {data.bio}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {data.tags.map((tag) => (
          <span key={tag} className="speaking-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-6">
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.08em] uppercase text-ivory/40 hover:text-gold transition-colors duration-300"
        >
          LinkedIn
          <span className="text-gold/30" aria-hidden="true">↗</span>
        </a>
        {data.medium && (
          <a
            href={data.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.08em] uppercase text-ivory/40 hover:text-gold transition-colors duration-300"
          >
            Medium
            <span className="text-gold/30" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useReveal()

  return (
    <section id="sobre" className="py-24 lg:py-36" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal mb-16 lg:mb-20">
          <p className="section-label mb-4">{t('about.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-light text-ivory"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
              }}
            >
              {t('about.sectionTitle')}
            </h2>
            <p className="font-body text-ivory/50 font-light leading-relaxed max-w-sm" style={{ fontSize: '0.9375rem' }}>
              {t('about.sectionIntro')}
            </p>
          </div>
          <span className="editorial-rule-full mt-8" />
        </div>

        {/* Two-column person grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <PersonCard person="rafael" index={0} />
          <PersonCard person="larissa" index={1} />
        </div>
      </div>
    </section>
  )
}
