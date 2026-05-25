import { useContent } from '../context/ContentContext'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

export default function Testimonials() {
  const { testimonials: testimonialsData } = useContent()
  return (
    <section style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        {'// 05 · what_they_say'}
      </div>
      <h2 style={{
        fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
        margin: '16px 0 56px', color: 'var(--fg)',
      }}>
        Feedback de quem nos contratou.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {testimonialsData.map((q, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 32 }}>
            <div style={{
              fontFamily: MONO, fontSize: 32, color: 'var(--accent)',
              marginBottom: 16, lineHeight: 0.4,
            }}>&gt;</div>
            <p style={{
              fontFamily: SANS, fontSize: 18, lineHeight: 1.5,
              color: 'var(--fg)', margin: '0 0 24px', letterSpacing: '-0.005em',
            }}>{q.quote}</p>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
              — {q.who} · {q.where}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
