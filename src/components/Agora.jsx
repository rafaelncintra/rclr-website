const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const items = [
  { k: 'now_reading', v: 'Accelerate', note: 'Forsgren, Humble, Kim', who: 'rafael' },
  { k: 'now_writing', v: 'Cap. 03 do livro', note: 'O custo invisível dos testes no final', who: 'dupla' },
  { k: 'now_speaking', v: 'Smart Testing', note: 'preparando keynote · valência 2026', who: 'dupla' },
  { k: 'now_listening', v: 'podcast: testers io', note: 'ep. 142 com angie jones', who: 'larissa' },
]

export default function Agora() {
  return (
    <section style={{
      padding: '32px clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto repeat(4, 1fr)',
        gap: 'clamp(16px, 3vw, 32px)',
        alignItems: 'center',
        overflowX: 'auto',
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--accent)',
          whiteSpace: 'nowrap',
        }}>{'// no momento'}</div>
        {items.map((it, i) => (
          <div key={i} style={{ minWidth: 140 }}>
            <div style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 6,
            }}>{it.k}</div>
            <div style={{
              fontFamily: SANS, fontSize: 15, fontWeight: 500,
              letterSpacing: '-0.012em', color: 'var(--fg)',
            }}>{it.v}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-mid)', marginTop: 2 }}>
              {it.note} · <span style={{ color: 'var(--accent)' }}>{it.who}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
