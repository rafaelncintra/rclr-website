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
      { threshold: 0.1 }
    )
    el.querySelectorAll('.reveal').forEach((i) => observer.observe(i))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useReveal()
  const rafael = t('about.rafael', { returnObjects: true })
  const larissa = t('about.larissa', { returnObjects: true })

  return (
    <section id="sobre" className="pt-28 pb-12" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">

        <p className="reveal section-label mb-8">{t('about.sectionLabel')}</p>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-12"
          style={{ borderBottom: '1px solid rgba(245,242,238,0.08)' }}>

          {[
            { data: rafael, medium: true },
            { data: larissa, medium: false },
          ].map(({ data, medium }) => (
            <div key={data.name}>
              <p className="font-display font-300 mb-1"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', letterSpacing: '-0.01em', color: 'rgba(245,242,238,0.9)' }}>
                {data.name}
              </p>
              <p className="font-body mb-4" style={{ fontSize: '0.78rem', color: '#C4633A', letterSpacing: '0.02em' }}>
                {data.role}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {data.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: '0.6rem' }}>{tag}</span>
                ))}
              </div>
              <div className="flex gap-5">
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                  className="font-body text-[0.72rem] tracking-[0.08em] uppercase hover:text-terra transition-colors"
                  style={{ color: 'rgba(245,242,238,0.3)' }}>
                  LinkedIn ↗
                </a>
                {medium && data.medium && (
                  <a href={data.medium} target="_blank" rel="noopener noreferrer"
                    className="font-body text-[0.72rem] tracking-[0.08em] uppercase hover:text-terra transition-colors"
                    style={{ color: 'rgba(245,242,238,0.3)' }}>
                    Medium ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
