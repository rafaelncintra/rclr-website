import { useState } from 'react'
import { useContent } from '../context/ContentContext'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const DEFAULT_TOPICS = [
  { id: 'st', title: 'Smart Testing: Pick What Matters Most', who: 'Dupla', desc: 'Como priorizar o que testar quando tudo parece importante — frameworks práticos para decisões de cobertura.', tag: 'Engenharia', order: 0 },
  { id: 'ia', title: 'Humanos vs IA: continuando relevante', who: 'Dupla', desc: 'A nova era da engenharia assistida por IA e o que diferencia times que escalam dos que estagnam.', tag: 'Carreira', order: 1 },
  { id: 'bq', title: 'Built-in Quality Mindset', who: 'Dupla', desc: 'Instalando uma cultura de qualidade desde o primeiro commit — não no final do sprint.', tag: 'Cultura', order: 2 },
  { id: 'cp', title: 'Carreira e Protagonismo', who: 'Larissa', desc: 'Você já tomou as rédeas da sua carreira em tecnologia? Um chamado prático.', tag: 'Carreira', order: 3 },
  { id: 'tm', title: 'Testes mobile que escalam', who: 'Rafael', desc: 'Construindo uma abordagem de testes para apps mobile que sobrevive ao crescimento do time.', tag: 'Mobile', order: 4 },
  { id: 'do', title: 'DevOps: muito mais que pipelines', who: 'Rafael', desc: 'O que está por trás do hype: cultura, propriedade e o fim da separação dev/ops.', tag: 'DevOps', order: 5 },
]

const DEFAULT_FORMATS = [
  { name: 'Keynote', time: '45–60 min', who: 'Solo ou dupla' },
  { name: 'Talk técnica', time: '30–45 min', who: 'Solo ou dupla' },
  { name: 'Workshop', time: 'Meio dia / dia inteiro', who: 'Dupla' },
  { name: 'Mentoria de time', time: 'Sob medida', who: 'Dupla' },
]

export default function Speaking() {
  const { topics: firestoreTopics } = useContent()
  const talks = firestoreTopics.length > 0 ? firestoreTopics : DEFAULT_TOPICS
  const formats = DEFAULT_FORMATS

  const [filter, setFilter] = useState('Todas')
  const filters = ['Todas', 'Dupla', 'Rafael', 'Larissa']
  const filtered = filter === 'Todas' ? talks : talks.filter(t => t.who === filter)

  return (
    <section id="palestras" style={{
      padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {'// 02 · talks'}
          </div>
          <h2 style={{
            fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em',
            margin: '16px 0 0', color: 'var(--fg)',
          }}>Temas no palco.</h2>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          {filtered.length} talks · {formats.length} formats
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {filters.map(f => {
          const active = filter === f
          const count = f === 'Todas' ? talks.length : talks.filter(t => t.who === f).length
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: MONO, fontSize: 12, padding: '8px 14px',
              border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? 'var(--accent-ink)' : 'var(--fg-mid)',
              cursor: 'pointer',
            }}>
              {f} <span style={{ opacity: 0.6, marginLeft: 4 }}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Talks grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
      }}>
        {filtered.map((talk, i) => (
          <div key={talk.title} style={{
            background: 'var(--bg)', padding: 32, minHeight: 280,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                0x0{i + 1}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
                {talk.who}
              </div>
            </div>
            <h3 style={{
              fontFamily: SANS, fontSize: 'clamp(1.1rem, 2vw, 1.625rem)',
              lineHeight: 1.1, fontWeight: 600, letterSpacing: '-0.02em',
              margin: '32px 0 16px', color: 'var(--fg)',
            }}>{talk.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0, flex: 1 }}>
              {talk.desc}
            </p>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: MONO, fontSize: 11, padding: '4px 8px',
                border: '1px solid var(--accent)', color: 'var(--accent)',
              }}>{talk.tag}</span>
              <a href="#contato" style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', textDecoration: 'none' }}>
                abstract →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Formats */}
      <div style={{ marginTop: 64 }}>
        <div style={{
          fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 20,
        }}>formatos disponíveis</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {formats.map((f, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 24 }}>
              <div style={{
                fontFamily: SANS, fontSize: 22, fontWeight: 600,
                letterSpacing: '-0.015em', color: 'var(--fg)',
              }}>{f.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginTop: 12 }}>
                {f.time}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', marginTop: 6 }}>
                {f.who}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
