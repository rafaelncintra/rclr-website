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
      { threshold: 0.1 }
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
    <article className={`card card-hover p-8 lg:p-10 reveal reveal-delay-${index + 1}`}>
      {/* Index + name block */}
      <div className="flex items-start gap-5 mb-7">
        <span
          className="font-display text-terra/20 font-300 flex-shrink-0 leading-none"
          style={{ fontSize: '3.5rem', letterSpacing: '-0.04em' }}
          aria-hidden="true"
        >
          0{index + 1}
        </span>
        <div className="pt-1 min-w-0">
          <h3
            className="font-display font-400 text-bark leading-tight"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', letterSpacing: '-0.015em' }}
          >
            {data.name}
          </h3>
          <p className="font-body text-terra text-sm mt-1.5 font-500 leading-snug">
            {data.role}
          </p>
          <p className="font-body text-bark-faint text-xs mt-1 tracking-[0.08em] uppercase">
            {data.location}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hairline mb-7" />

      {/* Bio */}
      <p className="font-body text-bark-muted leading-[1.82] font-300" style={{ fontSize: '0.9375rem' }}>
        {data.bio}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {data.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5 mt-7 pt-6 border-t border-border">
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase text-bark-faint hover:text-terra transition-colors duration-200"
        >
          LinkedIn
          <span className="text-terra/40" aria-hidden="true">↗</span>
        </a>
        {data.medium && (
          <a
            href={data.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase text-bark-faint hover:text-terra transition-colors duration-200"
          >
            Medium
            <span className="text-terra/40" aria-hidden="true">↗</span>
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
        <div className="reveal mb-14 lg:mb-18">
          <p className="section-label mb-4">{t('about.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-300 text-bark"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3.6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {t('about.sectionTitle')}
            </h2>
            <p
              className="font-body text-bark-muted font-300 leading-relaxed max-w-sm"
              style={{ fontSize: '0.9375rem' }}
            >
              {t('about.sectionIntro')}
            </p>
          </div>
          <span className="hairline mt-8 block" />
        </div>

        {/* Two-column person grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <PersonCard person="rafael" index={0} />
          <PersonCard person="larissa" index={1} />
        </div>
      </div>
    </section>
  )
}
