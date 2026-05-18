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
      { threshold: 0.08 }
    )
    el.querySelectorAll('.reveal').forEach((i) => observer.observe(i))
    return () => observer.disconnect()
  }, [])
  return ref
}

function PersonStrip({ person, index }) {
  const { t } = useTranslation()
  const data = t(`about.${person}`, { returnObjects: true })

  return (
    <div className={`reveal reveal-delay-${index + 1} flex flex-col gap-4`}>
      {/* Name + role */}
      <div>
        <h3 className="font-display font-300 leading-tight mb-1"
          style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', letterSpacing: '-0.01em', color: 'rgba(245,242,238,0.88)' }}>
          {data.name}
        </h3>
        <p className="font-body font-300" style={{ fontSize: '0.8rem', color: '#C4633A', letterSpacing: '0.02em' }}>
          {data.role}
        </p>
        <p className="font-body mt-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(245,242,238,0.3)' }}>
          {data.location}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {data.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag" style={{ fontSize: '0.62rem' }}>{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body text-[0.72rem] tracking-[0.08em] uppercase transition-colors duration-200"
          style={{ color: 'rgba(245,242,238,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C4633A'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,238,0.3)'}>
          LinkedIn <span style={{ color: 'rgba(196,99,58,0.5)' }}>↗</span>
        </a>
        {data.medium && (
          <a href={data.medium} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-[0.72rem] tracking-[0.08em] uppercase transition-colors duration-200"
            style={{ color: 'rgba(245,242,238,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C4633A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,238,0.3)'}>
            Medium <span style={{ color: 'rgba(196,99,58,0.5)' }}>↗</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useReveal()

  return (
    <section id="sobre" className="pt-32 pb-16" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        {/* Label */}
        <div className="reveal mb-10">
          <p className="section-label">{t('about.sectionLabel')}</p>
        </div>

        {/* Two-column person strip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pb-14"
          style={{ borderBottom: '1px solid rgba(245,242,238,0.08)' }}>
          <PersonStrip person="rafael" index={0} />
          <PersonStrip person="larissa" index={1} />
        </div>
      </div>
    </section>
  )
}
