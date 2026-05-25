import { useState } from 'react'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'
const SERIF = '"Newsreader", Georgia, serif'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
      background: 'radial-gradient(ellipse at 70% 50%, rgba(124,255,178,0.05), transparent 60%)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// subscribe'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 24px', color: 'var(--fg)',
          }}>
            Newsletter mensal.<br />
            <span style={{ color: 'var(--fg-soft)' }}>Zero spam.</span>
          </h2>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: 'var(--fg-mid)',
            margin: 0, maxWidth: 480, fontFamily: SERIF,
          }}>
            Um e-mail por mês com o que estamos escrevendo, palestrando e lendo.
            Cancelar é trivial.
          </p>
        </div>

        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontFamily: MONO, fontSize: 28, color: 'var(--accent)', marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--fg-mid)' }}>
                inscrito com sucesso. primeiro e-mail em breve.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 12 }}>
                {'$ subscribe --email='}
              </div>
              <div style={{ display: 'flex' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  style={{
                    flex: 1, background: 'transparent',
                    border: '1px solid var(--border)', padding: '14px 16px',
                    fontFamily: MONO, fontSize: 14, color: 'var(--fg)',
                    outline: 'none', borderRight: 0,
                  }}
                />
                <button type="submit" style={{
                  background: 'var(--accent)', color: 'var(--accent-ink)', border: 0,
                  padding: '14px 22px', fontFamily: MONO, fontSize: 13,
                  fontWeight: 500, cursor: 'pointer',
                }}>enter →</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>~2 800 inscritos</div>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>1 e-mail / mês</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
