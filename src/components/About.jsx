const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const MonoLabel = ({ children, color, style = {} }) => (
  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: color || 'var(--fg-soft)', ...style }}>
    {children}
  </div>
)

const bios = {
  rafael: {
    name: 'Rafael Navarro Cintra',
    role: 'Principal Solutions Engineer · AppDev · Broadcom',
    tag: 'engineer · qa platforms',
    uid: 'rafael.navarro.cintra',
    long: 'Rafael atua há mais de 15 anos construindo plataformas de teste e cultura de qualidade em times de engenharia. Falou em TDC, LeadDev e TestBash sobre como integrar qualidade no ciclo de desenvolvimento ao invés de empurrar para o fim do pipeline.',
    stats: [{ k: 'Anos', v: '15+' }, { k: 'Palcos', v: '30+' }, { k: 'Países', v: '8' }],
    linkedin: 'https://linkedin.com/in/rafaelncintra',
    medium: 'https://medium.com/@rafaelnc',
  },
  larissa: {
    name: 'Larissa Rosochansky',
    role: 'Senior Global IT Leader · Mars',
    tag: 'intl speaker · lean digital',
    uid: 'larissa.rosochansky',
    long: 'Larissa palestra em conferências como Agile Testing Days, STARWEST, Agile+DevOps East e TestBash. Trabalha na intersecção de automação, transformação ágil e o que mantém as pessoas relevantes em times cada vez mais assistidos por IA.',
    stats: [{ k: 'Países', v: '12' }, { k: 'Conferências', v: '40+' }, { k: 'Anos', v: '12' }],
    linkedin: 'https://linkedin.com/in/lrosocha',
  },
}

function BioCard({ person }) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <MonoLabel color="var(--accent)">{'>'} {person.tag}</MonoLabel>
        <MonoLabel>uid · {person.uid}</MonoLabel>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '140px 1fr',
        gap: 24, alignItems: 'flex-start',
      }}>
        <div className="ph" style={{ width: 140, height: 140 }}>retrato</div>
        <div>
          <h3 style={{
            fontFamily: SANS, fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            lineHeight: 1.05, fontWeight: 600,
            letterSpacing: '-0.025em', margin: '0 0 6px', color: 'var(--fg)',
          }}>{person.name}</h3>
          <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', marginBottom: 18 }}>
            {person.role}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>
            {person.long}
          </p>
        </div>
      </div>
      {/* Stats strip */}
      <div style={{ display: 'flex', marginTop: 28, borderTop: '1px solid var(--border)' }}>
        {person.stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '16px 12px',
            borderRight: i < person.stats.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              fontFamily: SANS, fontSize: 28, fontWeight: 600,
              letterSpacing: '-0.02em', color: 'var(--accent)',
            }}>{s.v}</div>
            <MonoLabel style={{ marginTop: 4 }}>{s.k}</MonoLabel>
          </div>
        ))}
      </div>
      {/* Links */}
      <div style={{ display: 'flex', gap: 16, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: MONO, fontSize: 11, color: 'var(--accent)', textDecoration: 'none',
          letterSpacing: '0.06em',
        }}>linkedin →</a>
        {person.medium && (
          <a href={person.medium} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', textDecoration: 'none',
            letterSpacing: '0.06em',
          }}>medium →</a>
        )}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="sobre" style={{ padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 01 · about'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1, fontWeight: 600,
            letterSpacing: '-0.03em', margin: '16px 0 0', color: 'var(--fg)',
          }}>
            Dois operadores.<br />
            <span style={{ color: 'var(--fg-soft)' }}>Um sistema.</span>
          </h2>
        </div>
        <MonoLabel>0x01 / 0x07</MonoLabel>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        <BioCard person={bios.rafael} />
        <BioCard person={bios.larissa} />
      </div>
    </section>
  )
}
