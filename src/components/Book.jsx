const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'
const SERIF = '"Newsreader", Georgia, serif'

const chapters = [
  '01 · Como nasce um time que entende risco',
  '02 · O custo invisível de empurrar testes pro final',
  '03 · IA, automação e o que continua sendo humano',
  '04 · Métricas que dizem a verdade',
]

export default function Book() {
  return (
    <section id="livros" style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Book cover */}
        <div style={{
          border: '1px solid var(--border)',
          position: 'relative',
          aspectRatio: '3 / 4',
          background: 'var(--bg)',
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(124,255,178,0.06), transparent 60%)',
          display: 'flex', flexDirection: 'column',
          padding: 36,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>rclr · 01</div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>v0.1.0-beta</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <h3 style={{
              fontFamily: SANS, fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 0.95, fontWeight: 600,
              letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)',
            }}>
              Qualidade<br />
              <span style={{ color: 'var(--accent)' }}>antes</span><br />
              do pipeline.
            </h3>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)' }}>
              R. N. Cintra &amp; L. Rosochansky
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--fg-dim)', marginTop: 4 }}>
              2026 · pré-venda
            </div>
          </div>
        </div>

        {/* Book details */}
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 03 · livro_01'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 24px', color: 'var(--fg)',
          }}>
            Primeiro livro.<br />
            <span style={{ color: 'var(--fg-soft)' }}>Em pré-venda.</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-mid)', margin: '0 0 32px', fontFamily: SERIF }}>
            Quinze anos construindo plataformas de teste e cultura de qualidade,
            condensados num livro prático sobre o que faz times de engenharia
            entregarem software confiável — sem heróis e sem manuais.
          </p>

          {/* Chapter list */}
          <div style={{ marginBottom: 32, fontFamily: MONO, fontSize: 13 }}>
            {chapters.map((line, i) => (
              <div key={i} style={{
                padding: '12px 0', borderBottom: '1px solid var(--border)',
                color: 'var(--fg-mid)',
              }}>
                <span style={{ color: 'var(--accent)' }}>{'$'}</span> {line}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contato" style={{
              fontFamily: MONO, fontSize: 13, padding: '14px 22px',
              background: 'var(--accent)', color: 'var(--accent-ink)',
              textDecoration: 'none', fontWeight: 500,
            }}>$ notify_me</a>
            <a href="#" style={{
              fontFamily: MONO, fontSize: 13, padding: '14px 22px',
              border: '1px solid var(--border)', color: 'var(--fg)',
              textDecoration: 'none',
            }}>cat sample.md</a>
          </div>
        </div>
      </div>
    </section>
  )
}
