import { useState } from 'react'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'
const SERIF = '"Newsreader", Georgia, serif'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form
    const mailto = `mailto:contato@rclr.com.br?subject=Convite para evento — ${encodeURIComponent(name)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.open(mailto)
    setSent(true)
  }

  const inputStyle = {
    background: 'var(--surface-muted)', border: '1px solid var(--border)',
    padding: '14px 16px', fontFamily: MONO, fontSize: 14,
    color: 'var(--fg)', outline: 'none', width: '100%', boxSizing: 'border-box',
  }

  return (
    <section id="contato" style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
      }}>
        {/* Left info */}
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 07 · contact'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 24px', color: 'var(--fg)',
          }}>Manda a mensagem.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-mid)', margin: '0 0 32px', fontFamily: SERIF }}>
            Conferências, encontros internos, workshops de time, mentoria.
            Atendemos online e presencialmente, em PT e EN.
          </p>
          <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--fg-mid)', lineHeight: 2 }}>
            <div><span style={{ color: 'var(--accent)' }}>mailto:</span>
              <a href="mailto:contato@rclr.com.br" style={{ color: 'var(--fg-mid)', textDecoration: 'none', marginLeft: 4 }}>contato@rclr.com.br</a>
            </div>
            <div><span style={{ color: 'var(--accent)' }}>linkedin:</span>
              <a href="https://linkedin.com/in/rafaelncintra" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg-mid)', textDecoration: 'none', marginLeft: 4 }}>Rafael</a>
              {' · '}
              <a href="https://linkedin.com/in/lrosocha" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg-mid)', textDecoration: 'none' }}>Larissa</a>
            </div>
            <div><span style={{ color: 'var(--accent)' }}>loc:</span> são paulo · br</div>
          </div>
        </div>

        {/* Form */}
        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 36 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontFamily: MONO, fontSize: 28, color: 'var(--accent)', marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--fg-mid)' }}>
                mensagem enviada. retornamos em até 48h.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { k: 'name', label: 'name', placeholder: 'Rafael Navarro ...' },
                { k: 'email', label: 'email', placeholder: 'name@company.com', type: 'email' },
              ].map(f => (
                <label key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                    {'$'} {f.label}
                  </div>
                  <input
                    type={f.type || 'text'}
                    value={form[f.k]}
                    onChange={set(f.k)}
                    placeholder={f.placeholder}
                    required
                    style={inputStyle}
                  />
                </label>
              ))}
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {'$'} message
                </div>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Conte sobre o evento, tema, data..."
                  required
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </label>
              <button type="submit" style={{
                background: 'var(--accent)', color: 'var(--accent-ink)', border: 0,
                padding: '14px 22px', fontFamily: MONO, fontSize: 13,
                fontWeight: 500, alignSelf: 'flex-start',
                marginTop: 8, cursor: 'pointer',
              }}>send_request() →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
