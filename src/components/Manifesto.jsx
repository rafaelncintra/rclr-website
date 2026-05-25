const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const principles = [
  {
    n: '01',
    title: 'Qualidade é uma decisão cultural,',
    rest: 'não um time, ferramenta ou estágio do pipeline.',
  },
  {
    n: '02',
    title: 'Curiosidade não é substituível por IA.',
    rest: 'A IA acelera quem faz boas perguntas — e expõe quem nunca soube fazê-las.',
  },
  {
    n: '03',
    title: 'O custo de não testar é invisível',
    rest: 'até o dia em que aparece — e quando aparece, ele compounding.',
  },
]

export default function Manifesto() {
  return (
    <section style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
      background: 'rgba(255,255,255,0.01)',
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--accent)',
        marginBottom: 48,
      }}>
        {'// manifesto · 3 convicções'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {principles.map((p, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(64px, 8vw, 100px) 1fr',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
            padding: 'clamp(24px, 4vw, 40px) 0',
            borderTop: '1px solid var(--border)',
            borderBottom: i === principles.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ fontFamily: MONO, fontSize: 14, color: 'var(--accent)' }}>{p.n} /</div>
            <h3 style={{
              fontFamily: SANS,
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
              lineHeight: 1.05, fontWeight: 600,
              letterSpacing: '-0.03em', margin: 0,
              color: 'var(--fg)',
            }}>
              {p.title}{' '}
              <span style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>{p.rest}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
