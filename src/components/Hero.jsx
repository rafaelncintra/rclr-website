import { useContent } from '../context/ContentContext'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const MonoLabel = ({ children, color, style = {} }) => (
  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: color || 'var(--fg-soft)', ...style }}>
    {children}
  </div>
)

export default function Hero() {
  const { talks } = useContent()
  const upcoming = talks.find(t => t.year === '2026') || talks[0] || {}
  return (
    <section style={{ padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 48px) clamp(64px, 8vw, 96px)' }}>
      {/* Terminal prompt strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)',
        paddingBottom: 32, borderBottom: '1px solid var(--border)',
      }}>
        <span><span style={{ color: 'var(--accent)' }}>$</span> whoami</span>
        <span>build · 2026.05</span>
        <span>tz · america/sao_paulo</span>
        <span>uptime · 15y 4mo</span>
      </div>

      {/* Main grid */}
      <div style={{
        paddingTop: 64,
        display: 'grid',
        gridTemplateColumns: 'clamp(300px, 55%, 640px) 1fr',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'start',
      }} className="flex flex-col lg:grid">

        {/* Left: Headline + CTA */}
        <div>
          <MonoLabel color="var(--accent)" style={{ marginBottom: 24 }}>
            {'>'} Rafael &amp; Larissa · speakers + engineers
          </MonoLabel>
          <h1 style={{
            fontFamily: SANS,
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            lineHeight: 0.92,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            margin: '0 0 32px',
            color: 'var(--fg)',
          }}>
            Built-in<br />
            quality é<br />
            <span style={{ color: 'var(--accent)' }}>uma decisão</span><br />
            cultural.
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.5, color: 'var(--fg-mid)',
            maxWidth: 540, margin: '0 0 40px',
          }}>
            Falamos sobre engenharia de qualidade, automação, DevOps e o que sobra de
            humano quando a IA passa a escrever os testes. Solo ou em dupla.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#palestras" style={{
              fontFamily: MONO, fontSize: 13, padding: '14px 22px',
              background: 'var(--accent)', color: 'var(--accent-ink)',
              textDecoration: 'none', fontWeight: 500,
            }}>$ ver_palestras --all</a>
            <a href="#blog" style={{
              fontFamily: MONO, fontSize: 13, padding: '14px 22px',
              border: '1px solid var(--border)', color: 'var(--fg)',
              textDecoration: 'none',
            }}>./blog</a>
          </div>
        </div>

        {/* Right: Next event panel */}
        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div style={{
            padding: '12px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface-muted)',
          }}>
            <MonoLabel color="var(--accent)">● next_event</MonoLabel>
            <MonoLabel>2026.06</MonoLabel>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)', marginBottom: 8 }}>
              {upcoming.conference || '—'}
            </div>
            <h3 style={{
              fontFamily: SANS,
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              lineHeight: 0.98, fontWeight: 600,
              letterSpacing: '-0.025em',
              margin: '0 0 16px', color: 'var(--fg)',
            }}>
              Smart Testing:<br />
              Pick What <span style={{ color: 'var(--accent)' }}>Matters Most.</span>
            </h3>
            <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--accent)' }}>where:</span> {upcoming.location_pt || '—'}</div>
              <div><span style={{ color: 'var(--accent)' }}>who:</span> {(upcoming.speakers || []).join(' & ').toLowerCase() || '—'} (em dupla)</div>
              <div><span style={{ color: 'var(--accent)' }}>format:</span> keynote · 45min</div>
            </div>
            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: '1px dashed var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <MonoLabel>+ upcoming em 2026</MonoLabel>
              <a href="#agenda" style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                ver agenda →
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1, background: 'var(--border)', borderTop: '1px solid var(--border)',
          }}>
            {[{ k: 'Palestras', v: '70+' }, { k: 'Países', v: '12' }, { k: 'Anos', v: '15+' }].map((s, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: '20px 16px' }}>
                <div style={{
                  fontFamily: SANS, fontSize: 28, fontWeight: 600,
                  letterSpacing: '-0.025em', color: 'var(--fg)',
                }}>{s.v}</div>
                <MonoLabel style={{ marginTop: 4 }}>{s.k}</MonoLabel>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press strip */}
      <div style={{
        marginTop: 80, padding: '20px 0',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap',
        fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', letterSpacing: '0.06em',
        overflowX: 'auto',
      }}>
        <span style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>// VISTOS EM</span>
        {['SeleniumConf', 'LeadDev', 'TDC', 'TestBash', 'Agile Testing Days', 'STARWEST', 'Ministry of Testing', 'AppiumConf'].map((p, i, a) => (
          <span key={p} style={{ display: 'flex', gap: 32, alignItems: 'center', whiteSpace: 'nowrap' }}>
            {p}{i < a.length - 1 && <span style={{ opacity: 0.4, marginLeft: -16 }}>·</span>}
          </span>
        ))}
      </div>
    </section>
  )
}
