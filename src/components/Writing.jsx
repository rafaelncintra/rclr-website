import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import allPosts from '../data/posts.json'

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

function formatDate(dateStr, lang) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function PostCard({ post, lang, index, readMoreLabel }) {
  // Extract a URL from the first markdown link in the body, if present
  const urlMatch = post.body && post.body.match(/\[.*?\]\((https?:\/\/[^)]+)\)/)
  const url = urlMatch ? urlMatch[1] : null

  const CardWrapper = url ? 'a' : 'article'
  const cardProps = url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <CardWrapper
      {...cardProps}
      className={`card card-hover block p-7 lg:p-9 reveal reveal-delay-${Math.min(index + 1, 5)} ${url ? 'group cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="tag-terra">{post.lang === 'pt' ? 'PT' : 'EN'}</span>
          <span className="font-body text-bark-faint text-xs tracking-wide">
            {formatDate(post.date, lang)}
          </span>
        </div>
        {url && (
          <span className="text-terra/40 group-hover:text-terra transition-colors duration-200 flex-shrink-0" aria-hidden="true">↗</span>
        )}
      </div>

      <h3
        className="font-display font-400 text-bark leading-snug mb-3 group-hover:text-terra transition-colors duration-200"
        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', letterSpacing: '-0.01em' }}
      >
        {post.title}
      </h3>

      <p className="font-body text-bark-muted font-300 leading-[1.75] text-sm">
        {post.excerpt}
      </p>

      {url && (
        <div className="mt-5 pt-5 border-t border-border">
          <span className="inline-flex items-center gap-1.5 font-body text-[0.75rem] tracking-[0.08em] uppercase text-terra font-500">
            {readMoreLabel}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      )}
    </CardWrapper>
  )
}

export default function Writing() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const lang = i18n.language === 'en' ? 'en' : 'pt'

  const posts = allPosts.filter((p) => p.lang === lang)

  return (
    <section id="publicacoes" className="py-24 lg:py-36" ref={sectionRef}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal mb-14 lg:mb-18">
          <p className="section-label mb-4">{t('writing.sectionLabel')}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-300 text-bark"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3.6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {t('writing.sectionTitle')}
            </h2>
            <p
              className="font-body text-bark-muted font-300 leading-relaxed max-w-sm"
              style={{ fontSize: '0.9375rem' }}
            >
              {t('writing.sectionIntro')}
            </p>
          </div>
          <span className="hairline mt-8 block" />
        </div>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-5">
            {posts.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                lang={lang}
                index={i}
                readMoreLabel={t('writing.readMore')}
              />
            ))}
          </div>
        ) : (
          <div className="reveal reveal-delay-1 card p-10 lg:p-14 flex flex-col gap-4">
            <span
              className="font-display text-bark/15 font-300"
              style={{ fontSize: '3rem', letterSpacing: '-0.04em', lineHeight: 1 }}
              aria-hidden="true"
            >
              …
            </span>
            <p className="font-display text-bark-muted font-300" style={{ fontSize: '1.1rem' }}>
              {t('writing.noPosts')}
            </p>
            <p className="font-body text-bark-faint text-sm leading-relaxed">
              {t('writing.noPostsDetail')}
            </p>
          </div>
        )}

        {/* Medium link */}
        <div className="reveal reveal-delay-2 mt-8">
          <a
            href={t('writing.mediumUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.09em] uppercase text-bark-faint hover:text-terra transition-colors duration-200"
          >
            {t('writing.mediumCta')}
            <span className="text-terra/40" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
