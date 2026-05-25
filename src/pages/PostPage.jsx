import { useContent } from '../context/ContentContext'
import { navigate } from '../utils/navigate'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'
const SERIF = '"Newsreader", Georgia, serif'

// Fallback article for design posts without real content
const SAMPLE_BODY = [
  { type: 'lead', text: 'Cobertura de teste não é um KPI. É um indicador secundário, geralmente atrasado, e na maior parte do tempo te diz menos sobre confiabilidade do que sobre quanto trabalho seu time foi forçado a empurrar.' },
  { type: 'p', text: 'Existe um padrão que se repete com frequência incômoda em times grandes: a cobertura cresce porque alguém disse que ela precisa crescer. Não porque o time descobriu uma área de risco nova. Não porque um incidente revelou uma lacuna. Cresce porque o número precisa crescer.' },
  { type: 'h2', text: 'O que medir, então?' },
  { type: 'p', text: 'A pergunta certa não é "quanto código está coberto?" — é "quão rápido descobrimos quando algo importante quebra?". As métricas que importam são lag indicators de qualidade real.' },
  { type: 'list', items: ['Tempo médio entre detecção e propagação de um defeito em produção (MTTD).', 'Proporção de incidentes encontrados primeiro pelo cliente vs. pelo time.', 'Tempo entre commit e feedback de qualidade (build + test).', 'Taxa de regressão dos top 5 fluxos críticos do produto.'] },
  { type: 'quote', text: 'Cobertura é um mapa. Confiabilidade é o terreno. Ninguém aposta a operação no mapa.' },
  { type: 'p', text: 'A versão pragmática disso é simples: use cobertura pra navegar, não pra reportar. Use métricas de incidentes pra reportar. E pare de transformar números técnicos em metas executivas — eles vão ser otimizados pra parecer bons, não pra serem verdadeiros.' },
]

function renderBlock(b, i) {
  if (b.type === 'lead') return (
    <p key={i} style={{ fontFamily: SANS, fontSize: 'clamp(1.2rem, 2.5vw, 1.625rem)', lineHeight: 1.4, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '0 0 40px', paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>{b.text}</p>
  )
  if (b.type === 'h2') return (
    <h2 key={i} style={{ fontFamily: SANS, fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg)', margin: '48px 0 20px' }}>{b.text}</h2>
  )
  if (b.type === 'p') return (
    <p key={i} style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.65, color: 'var(--fg-mid)', margin: '0 0 24px' }}>{b.text}</p>
  )
  if (b.type === 'list') return (
    <ul key={i} style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.6, color: 'var(--fg-mid)', margin: '0 0 24px', padding: 0, listStyle: 'none' }}>
      {b.items.map((it, j) => (
        <li key={j} style={{ padding: '8px 0 8px 24px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontFamily: MONO, fontSize: 12, top: 14 }}>0{j + 1}</span>
          {it}
        </li>
      ))}
    </ul>
  )
  if (b.type === 'quote') return (
    <blockquote key={i} style={{ margin: '40px 0', padding: '24px 32px', borderLeft: '3px solid var(--accent)', background: 'var(--surface)', fontFamily: SANS, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.35, fontWeight: 500, letterSpacing: '-0.012em', color: 'var(--fg)' }}>{b.text}</blockquote>
  )
  return null
}

export default function PostPage({ slug }) {
  const { posts: postsData } = useContent()
  const post = postsData.find(p => p.slug === slug)
  const title = post?.title || slug.split('-').slice(2).join(' ') || 'Post'
  const excerpt = post?.excerpt || ''
  const body = post?.body || null

  const goHome = (e) => { e?.preventDefault(); navigate('/') }
  const goBlog = (e) => { e?.preventDefault(); navigate('/'); setTimeout(() => { document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }) }, 200) }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Nav */}
      <header style={{
        padding: '16px clamp(24px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        background: 'var(--nav-bg)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#/" onClick={goHome} style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, padding: '6px 10px', border: '1px solid var(--border)', color: 'var(--accent)', textDecoration: 'none' }}>
            rclr<span style={{ color: 'var(--fg)' }}>.com</span>
          </a>
          <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)' }}>
            <span style={{ color: 'var(--accent)' }}>●</span> blog post · 7 min
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 4, fontFamily: MONO, fontSize: 12 }}>
          <a href="#/" onClick={goHome} style={{ color: 'var(--fg-mid)', padding: '6px 12px', textDecoration: 'none' }}>./home</a>
          <a href="#/" onClick={goBlog} style={{ color: 'var(--fg-mid)', padding: '6px 12px', textDecoration: 'none' }}>./blog</a>
        </nav>
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }), 200) }} style={{ fontFamily: MONO, fontSize: 12, padding: '8px 14px', background: 'var(--accent)', color: 'var(--accent-ink)', textDecoration: 'none' }}>
          $ book_us →
        </a>
      </header>

      {/* Hero */}
      <section style={{ padding: 'clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px) clamp(32px, 4vw, 48px)' }}>
        <a href="#/" onClick={goBlog} style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', textDecoration: 'none', marginBottom: 32, display: 'inline-block' }}>
          ← cd ../blog
        </a>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, padding: '5px 10px', border: '1px solid var(--accent)', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Engenharia
          </span>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
            {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })} · 7 min de leitura
          </div>
        </div>
        <h1 style={{
          fontFamily: SANS,
          fontSize: 'clamp(2rem, 6vw, 4.75rem)',
          lineHeight: 0.98, fontWeight: 600,
          letterSpacing: '-0.035em', margin: '0 0 32px', color: 'var(--fg)',
          maxWidth: '14ch',
        }}>
          {title.split(' ').slice(0, -2).join(' ')}{' '}
          <span style={{ color: 'var(--accent)' }}>{title.split(' ').slice(-2).join(' ')}</span>
        </h1>
        {excerpt && (
          <p style={{ fontFamily: SERIF, fontSize: 24, lineHeight: 1.45, color: 'var(--fg-mid)', margin: '0 0 48px', maxWidth: 900, fontStyle: 'italic' }}>
            {excerpt}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 32, borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="ph" style={{ width: 44, height: 44, borderRadius: 22, fontSize: 9 }}>R</div>
            <div className="ph" style={{ width: 44, height: 44, borderRadius: 22, fontSize: 9, marginLeft: -12 }}>L</div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: 'var(--fg)' }}>Rafael &amp; Larissa</div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>autoria · dupla</div>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['twitter', 'linkedin', 'copy_link'].map(s => (
              <a key={s} href="#" style={{ fontFamily: MONO, fontSize: 11, padding: '8px 14px', border: '1px solid var(--border)', color: 'var(--fg-mid)', textDecoration: 'none' }}>
                $ share --{s}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '0 clamp(24px, 4vw, 48px)' }}>
        {body ? (
          // Real markdown-derived content
          <div style={{ display: 'grid', gridTemplateColumns: '1fr min(720px, 100%) 1fr', gap: 64 }}>
            <div />
            <article style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.65, color: 'var(--fg-mid)' }}>
              {body.split('\n').filter(Boolean).map((line, i) => (
                <p key={i} style={{ margin: '0 0 24px' }}>{line}</p>
              ))}
            </article>
            <div />
          </div>
        ) : (
          // Design prototype article body
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px minmax(0, 720px) 1fr',
            gap: 64,
          }} className="flex flex-col lg:grid">
            {/* TOC */}
            <aside style={{ position: 'sticky', top: 96, alignSelf: 'flex-start' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 16 }}>nesta página</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--border)' }}>
                {['Intro', 'O que medir, então?', 'Cobertura ainda serve?'].map((it, i) => (
                  <li key={i} style={{
                    fontSize: 13,
                    color: i === 0 ? 'var(--accent)' : 'var(--fg-mid)',
                    padding: '8px 14px',
                    borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                    marginLeft: -1,
                  }}>{it}</li>
                ))}
              </ul>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 8 }}>tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['quality', 'metrics', 'engineering'].map(t => (
                    <span key={t} style={{ fontFamily: MONO, fontSize: 10, padding: '3px 8px', border: '1px solid var(--border)', color: 'var(--fg-soft)' }}>#{t}</span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Article */}
            <article>{SAMPLE_BODY.map(renderBlock)}</article>

            {/* Right rail */}
            <aside>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 16 }}>autoria</div>
              <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 20, marginBottom: 24 }}>
                <div className="ph" style={{ width: '100%', aspectRatio: '1/1', marginBottom: 16 }}>R + L</div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-mid)', margin: 0 }}>
                  Rafael e Larissa palestram, escrevem e formam times sobre engenharia de qualidade desde 2019. Já passaram por 12 países.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* Newsletter CTA */}
        <div style={{ maxWidth: 720 + 200 + 64, margin: '64px auto 0', padding: 32, border: '1px solid var(--border)', background: 'var(--surface)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}
          className="flex flex-col lg:grid">
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{'>'} continue</div>
            <h3 style={{ fontFamily: SANS, fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: 'var(--fg)' }}>
              Receba o próximo post direto no seu inbox.
            </h3>
            <p style={{ fontSize: 13, color: 'var(--fg-mid)', margin: '8px 0 0' }}>Um e-mail por mês. Cancelar é trivial.</p>
          </div>
          <div style={{ display: 'flex' }}>
            <input placeholder="seu@email.com" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 14px', fontFamily: MONO, fontSize: 13, color: 'var(--fg)', outline: 'none', borderRight: 0, width: 200 }} />
            <button type="button" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', border: 0, padding: '12px 18px', fontFamily: MONO, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>enter →</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '96px clamp(24px, 4vw, 48px) 32px', borderTop: '1px solid var(--border)', marginTop: 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--accent)' }}>
            rclr<span style={{ color: 'var(--fg-soft)' }}>.com</span>
          </div>
          <div style={{ display: 'flex', gap: 20, fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', flexWrap: 'wrap' }}>
            <span>© 2026 RCLR</span>
            <a href="#/" onClick={goHome} style={{ color: 'inherit', textDecoration: 'none' }}>home</a>
            <a href="#/" onClick={goBlog} style={{ color: 'inherit', textDecoration: 'none' }}>blog</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
