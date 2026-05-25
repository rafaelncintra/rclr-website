import { useContent } from '../context/ContentContext'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

export default function Agenda() {
  const { talks } = useContent()
  const upcoming = talks.filter(t => t.year === '2026').map(t => ({ ...t, kind: 'upcoming' }))
  const past = talks.filter(t => t.year !== '2026').map(t => ({ ...t, kind: 'past' }))
  const all = [...upcoming, ...past]

  return (
    <section id="agenda" style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 06 · agenda.log'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 0', color: 'var(--fg)',
          }}>tail -f agenda</h2>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          {all.length} entries
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr 1.4fr 88px 1fr 100px',
          padding: '14px 24px',
          fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--fg-soft)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-muted)',
          overflowX: 'auto',
        }}>
          <span>year</span><span>event</span><span>topic</span>
          <span>by</span><span>location</span><span>status</span>
        </div>

        {/* Data rows */}
        {all.map((e, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr 1.4fr 88px 1fr 100px',
            padding: '14px 24px', alignItems: 'center',
            borderBottom: i < all.length - 1 ? '1px solid var(--border-soft)' : 'none',
            background: e.kind === 'upcoming'
              ? 'rgba(124,255,178,0.04)'
              : 'transparent',
            fontFamily: MONO, fontSize: 12,
            overflowX: 'auto',
          }}>
            <span style={{ color: 'var(--fg-soft)' }}>{e.year}</span>
            <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: 'var(--fg)' }}>
              {e.conference}
            </span>
            <span style={{ color: 'var(--fg-mid)', fontSize: 12 }}>
              {e.topic_pt}
            </span>
            <span style={{
              color: 'var(--accent)', fontSize: 10,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {(e.speakers || []).join(' & ')}
            </span>
            <span style={{ color: 'var(--fg-mid)' }}>{e.location_pt}</span>
            <span style={{
              fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: e.kind === 'upcoming' ? 'var(--accent)' : 'var(--fg-dim)',
            }}>
              {e.kind === 'upcoming' ? '● scheduled' : '○ done'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
