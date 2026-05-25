import { useContent } from '../context/ContentContext'
import { navigate } from '../utils/navigate'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const designPosts = [
  { slug: 'metricas-qualidade', cat: 'Engenharia', date: '12 mai 2026', read: '7 min', title: 'O que ninguém te conta sobre métricas de qualidade', excerpt: 'Cobertura de testes não é o KPI que você pensa que é. Um olhar honesto sobre o que medir quando o objetivo é confiabilidade.' },
  { slug: 'builtin-quality', cat: 'Cultura', date: '28 abr 2026', read: '5 min', title: 'Built-in Quality não é sobre QA', excerpt: 'É sobre como o time inteiro entende risco. Sete sinais de que a qualidade do seu produto está sendo terceirizada para a pessoa errada.' },
  { slug: 'ia-relevancia', cat: 'IA', date: '10 abr 2026', read: '9 min', title: 'Continuando relevante quando a IA escreve o teste por você', excerpt: 'A IA está gerando casos de teste melhores que muitos QAs juniores. Isso não é uma ameaça — é um convite para subir o nível.' },
  { slug: 'redeas-carreira', cat: 'Carreira', date: '22 mar 2026', read: '6 min', title: 'Você tomou as rédeas da sua carreira?', excerpt: 'Ou está esperando que o próximo papel surja sozinho? Um framework para fazer as escolhas difíceis antes que elas sejam feitas por você.' },
]

function goPost(slug) {
  return (e) => {
    e.preventDefault()
    navigate('/post/' + slug)
  }
}

export default function Blog() {
  const { posts: postsData } = useContent()
  const ptPosts = postsData.filter(p => p.lang === 'pt')
  const posts = ptPosts.length >= 4
    ? ptPosts.slice(0, 4).map(p => ({ slug: p.slug, cat: 'Engenharia', date: new Date(p.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }), read: '5 min', title: p.title, excerpt: p.excerpt }))
    : [...ptPosts.map(p => ({ slug: p.slug, cat: 'Engenharia', date: new Date(p.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }), read: '5 min', title: p.title, excerpt: p.excerpt })), ...designPosts].slice(0, 4)

  return (
    <section id="blog" style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 04 · posts'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 0', color: 'var(--fg)',
          }}>~/blog</h2>
        </div>
        <a href="#" onClick={goPost(posts[0]?.slug)} style={{
          fontFamily: MONO, fontSize: 12, color: 'var(--accent)', textDecoration: 'none',
        }}>ls --all →</a>
      </div>

      {/* Asymmetric 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'clamp(200px, 40%, 560px) 1fr 1fr', gap: 24 }}
        className="flex flex-col lg:grid">

        {/* Featured post */}
        <a href="#" onClick={goPost(posts[0]?.slug)} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            border: '1px solid var(--border)', background: 'var(--surface)',
            padding: 36, display: 'flex', flexDirection: 'column',
            minHeight: 480, cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                {'>'} em destaque
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
                {posts[0]?.read}
              </div>
            </div>
            <div className="ph" style={{ aspectRatio: '16/9', marginBottom: 32 }}>capa do post</div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 12 }}>
              {posts[0]?.cat} · {posts[0]?.date}
            </div>
            <h3 style={{
              fontFamily: SANS, fontSize: 'clamp(1.3rem, 2.5vw, 2.25rem)',
              lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em',
              margin: '0 0 16px', color: 'var(--fg)',
            }}>{posts[0]?.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>
              {posts[0]?.excerpt}
            </p>
          </div>
        </a>

        {/* Middle column: 2 stacked posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {posts.slice(1, 3).map((p, i) => (
            <a key={i} href="#" onClick={goPost(p.slug)} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
              <div style={{
                border: '1px solid var(--border)', background: 'var(--surface)',
                padding: 28, height: '100%', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{p.cat}</div>
                <h3 style={{
                  fontFamily: SANS, fontSize: 22, lineHeight: 1.15,
                  fontWeight: 600, letterSpacing: '-0.015em',
                  margin: '0 0 12px', color: 'var(--fg)',
                }}>{p.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-mid)', margin: '0 0 16px' }}>
                  {p.excerpt}
                </p>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
                  {p.date} · {p.read}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right column: post + tags */}
        <a href="#" onClick={goPost(posts[3]?.slug)} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            border: '1px solid var(--border)', background: 'var(--surface)',
            padding: 28, display: 'flex', flexDirection: 'column', height: '100%',
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{posts[3]?.cat}</div>
            <h3 style={{
              fontFamily: SANS, fontSize: 22, lineHeight: 1.15,
              fontWeight: 600, letterSpacing: '-0.015em',
              margin: '0 0 12px', color: 'var(--fg)',
            }}>{posts[3]?.title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-mid)', margin: '0 0 16px' }}>
              {posts[3]?.excerpt}
            </p>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 24 }}>
              {posts[3]?.date} · {posts[3]?.read}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 12 }}>
                tags populares
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['quality', 'devops', 'automation', 'ai', 'career', 'agile'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: MONO, fontSize: 11, padding: '4px 8px',
                    border: '1px solid var(--border)', color: 'var(--fg-mid)',
                  }}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
