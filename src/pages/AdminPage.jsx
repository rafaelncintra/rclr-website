import { useState, useEffect, useCallback } from 'react'
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth'
import {
  collection, getDocs, doc, setDoc, deleteDoc, addDoc,
  Timestamp, getDoc,
} from 'firebase/firestore'
import { auth, db, googleProvider, ADMIN_EMAILS } from '../firebase'

// Seed data imported once for the "Seed DB" button
import talksJson from '../data/talks.json'
import testimonialsJson from '../data/testimonials.json'
import bookJson from '../data/book.json'
import oculusJson from '../data/oculus.json'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

const DEFAULT_TOPICS = [
  { title: 'Smart Testing: Pick What Matters Most', who: 'Dupla', desc: 'Como priorizar o que testar quando tudo parece importante — frameworks práticos para decisões de cobertura.', tag: 'Engenharia', order: 0 },
  { title: 'Humanos vs IA: continuando relevante', who: 'Dupla', desc: 'A nova era da engenharia assistida por IA e o que diferencia times que escalam dos que estagnam.', tag: 'Carreira', order: 1 },
  { title: 'Built-in Quality Mindset', who: 'Dupla', desc: 'Instalando uma cultura de qualidade desde o primeiro commit — não no final do sprint.', tag: 'Cultura', order: 2 },
  { title: 'Carreira e Protagonismo', who: 'Larissa', desc: 'Você já tomou as rédeas da sua carreira em tecnologia? Um chamado prático.', tag: 'Carreira', order: 3 },
  { title: 'Testes mobile que escalam', who: 'Rafael', desc: 'Construindo uma abordagem de testes para apps mobile que sobrevive ao crescimento do time.', tag: 'Mobile', order: 4 },
  { title: 'DevOps: muito mais que pipelines', who: 'Rafael', desc: 'O que está por trás do hype: cultura, propriedade e o fim da separação dev/ops.', tag: 'DevOps', order: 5 },
]

// ─── Styles ─────────────────────────────────────────────────────────────────

const S = {
  page: { minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: MONO },
  header: {
    padding: '14px 32px', borderBottom: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'var(--nav-bg)', backdropFilter: 'blur(8px)',
    position: 'sticky', top: 0, zIndex: 50,
  },
  logo: { fontFamily: MONO, fontSize: 13, color: 'var(--accent)' },
  sidebar: {
    width: 200, borderRight: '1px solid var(--border)',
    padding: '32px 0', flexShrink: 0,
    position: 'sticky', top: 57, alignSelf: 'flex-start', height: 'calc(100vh - 57px)',
    overflowY: 'auto',
  },
  content: { flex: 1, padding: '32px 40px', maxWidth: 960, minWidth: 0 },
  tabBtn: (active) => ({
    display: 'block', width: '100%', textAlign: 'left',
    padding: '10px 24px', fontFamily: MONO, fontSize: 12,
    background: active ? 'rgba(124,255,178,0.08)' : 'transparent',
    border: 'none', borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
    color: active ? 'var(--accent)' : 'var(--fg-mid)', cursor: 'pointer',
    letterSpacing: '0.04em',
  }),
  btn: (variant = 'default') => ({
    fontFamily: MONO, fontSize: 12, padding: '8px 16px', cursor: 'pointer', border: 0,
    background: variant === 'primary' ? 'var(--accent)' : variant === 'danger' ? 'rgba(255,80,80,0.15)' : 'var(--surface)',
    color: variant === 'primary' ? 'var(--accent-ink)' : variant === 'danger' ? '#ff5050' : 'var(--fg-mid)',
    border: variant === 'danger' ? '1px solid rgba(255,80,80,0.3)' : '1px solid var(--border)',
  }),
  input: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: MONO, fontSize: 13,
    padding: '10px 12px', width: '100%', outline: 'none', boxSizing: 'border-box',
  },
  label: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', display: 'block', marginBottom: 6 },
  field: { marginBottom: 20 },
  badge: (status) => ({
    fontFamily: MONO, fontSize: 10, padding: '3px 8px', letterSpacing: '0.06em',
    textTransform: 'uppercase',
    background: status === 'published' ? 'rgba(124,255,178,0.12)' : status === 'scheduled' ? 'rgba(100,180,255,0.12)' : 'var(--surface)',
    color: status === 'published' ? 'var(--accent)' : status === 'scheduled' ? '#64b4ff' : 'var(--fg-dim)',
    border: `1px solid ${status === 'published' ? 'rgba(124,255,178,0.3)' : status === 'scheduled' ? 'rgba(100,180,255,0.3)' : 'var(--border)'}`,
  }),
  row: {
    display: 'grid', padding: '12px 16px', alignItems: 'center',
    borderBottom: '1px solid var(--border-soft)', cursor: 'pointer',
    transition: 'background 0.15s',
  },
  sectionTitle: {
    fontFamily: SANS, fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em',
    color: 'var(--fg)', margin: '0 0 8px',
  },
  monoTag: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 },
}

function Input({ label, value, onChange, as: As = 'input', rows, type = 'text', ...rest }) {
  return (
    <div style={S.field}>
      {label && <label style={S.label}>{label}</label>}
      <As
        type={type} value={value} onChange={e => onChange(e.target.value)}
        rows={rows} {...rest}
        style={{ ...S.input, resize: As === 'textarea' ? 'vertical' : undefined }}
      />
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={S.field}>
      {label && <label style={S.label}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...S.input, appearance: 'none', cursor: 'pointer' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ─── Auth ────────────────────────────────────────────────────────────────────

function LoginScreen({ wrongEmail }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const login = async () => {
    setError(null)
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        // popup blocked → fall back to full-page redirect
        signInWithRedirect(auth, googleProvider).catch(e => {
          setError(e.message)
          setLoading(false)
        })
      } else {
        setError(`${err.code}: ${err.message}`)
        setLoading(false)
      }
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 48, maxWidth: 360, width: '100%' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>
          {'>'} rclr / admin
        </div>
        <h1 style={{ fontFamily: SANS, fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 12px' }}>
          Acesso restrito
        </h1>
        {wrongEmail ? (
          <p style={{ fontSize: 13, color: '#ff5050', margin: '0 0 24px', lineHeight: 1.5 }}>
            Essa conta não tem acesso ao admin. Use rafael@rclr.com.br ou larissa@rclr.com.br.
          </p>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--fg-mid)', margin: '0 0 24px', lineHeight: 1.5 }}>
            Entre com a sua conta Google para acessar o painel.
          </p>
        )}
        {error && (
          <p style={{ fontSize: 12, color: '#ff5050', margin: '0 0 16px', fontFamily: MONO, lineHeight: 1.5 }}>
            // erro: {error}
          </p>
        )}
        <button onClick={login} disabled={loading} style={{ ...S.btn('primary'), width: '100%', padding: '12px', fontSize: 13 }}>
          {loading ? '// redirecionando...' : '$ google_login →'}
        </button>
      </div>
    </div>
  )
}

// ─── Posts ───────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function postStatus(p) {
  if (!p.published) return 'draft'
  if (!p.publishAt) return 'published'
  const d = p.publishAt.toDate ? p.publishAt.toDate() : new Date(p.publishAt)
  return d > new Date() ? 'scheduled' : 'published'
}

function toDatetimeLocal(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toISOString().slice(0, 16)
}

const BLANK_POST = { slug: '', title: '', excerpt: '', body: '', lang: 'pt', published: false, publishAt: null }

function PostsTab() {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, 'posts'))
    setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1))
  }, [])

  useEffect(() => { load() }, [load])

  const open = (p) => setEditing({ ...p, _scheduleDate: toDatetimeLocal(p.publishAt) })
  const openNew = () => setEditing({ ...BLANK_POST, _scheduleDate: '', date: new Date().toISOString().slice(0, 10) })

  const save = async () => {
    if (!editing.title.trim()) return setMsg('Título obrigatório.')
    setSaving(true)
    const slug = editing.slug || slugify(editing.title)
    let publishAt = null
    if (editing.published && editing._scheduleDate) {
      publishAt = Timestamp.fromDate(new Date(editing._scheduleDate))
    }
    const { _scheduleDate, id, ...data } = editing
    await setDoc(doc(db, 'posts', slug), { ...data, slug, publishAt, updatedAt: Timestamp.now() })
    setMsg('Salvo.')
    setSaving(false)
    setEditing(null)
    await load()
    setTimeout(() => setMsg(''), 3000)
  }

  const remove = async (slug) => {
    if (!confirm(`Deletar post "${slug}"?`)) return
    await deleteDoc(doc(db, 'posts', slug))
    setEditing(null)
    await load()
  }

  if (editing !== null) return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => setEditing(null)} style={S.btn()}>← voltar</button>
        <div style={S.monoTag}>{editing.id ? 'editar post' : 'novo post'}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Título" value={editing.title} onChange={v => setEditing(e => ({ ...e, title: v, slug: slugify(v) }))} />
        </div>
        <Input label="Slug (ID do post)" value={editing.slug || slugify(editing.title)} onChange={v => setEditing(e => ({ ...e, slug: v }))} />
        <Select label="Idioma" value={editing.lang} onChange={v => setEditing(e => ({ ...e, lang: v }))}
          options={[{ value: 'pt', label: 'Português' }, { value: 'en', label: 'English' }]} />
        <Input label="Data de publicação" type="date" value={editing.date || ''} onChange={v => setEditing(e => ({ ...e, date: v }))} />
        <div style={S.field}>
          <label style={S.label}>Status</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['draft', 'Rascunho'], ['published', 'Publicado'], ['scheduled', 'Agendado']].map(([v, l]) => (
              <button key={v} onClick={() => setEditing(e => ({
                ...e,
                published: v !== 'draft',
                _status: v,
              }))}
                style={{
                  ...S.btn(postStatus({ published: editing.published, publishAt: editing._scheduleDate ? { toDate: () => new Date(editing._scheduleDate) } : null }) === v ? 'primary' : 'default'),
                }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        {editing.published && (
          <Input label="Agendar para (deixe vazio para publicar agora)" type="datetime-local"
            value={editing._scheduleDate || ''} onChange={v => setEditing(e => ({ ...e, _scheduleDate: v }))} />
        )}
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Resumo (excerpt)" as="textarea" rows={2} value={editing.excerpt} onChange={v => setEditing(e => ({ ...e, excerpt: v }))} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Corpo (markdown)" as="textarea" rows={20} value={editing.body} onChange={v => setEditing(e => ({ ...e, body: v }))} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <button onClick={save} disabled={saving} style={S.btn('primary')}>
          {saving ? 'salvando...' : '$ salvar →'}
        </button>
        {editing.id && (
          <button onClick={() => remove(editing.id)} style={S.btn('danger')}>deletar</button>
        )}
        {msg && <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>{msg}</span>}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h2 style={S.sectionTitle}>Posts</h2>
        <button onClick={openNew} style={S.btn('primary')}>+ novo post</button>
      </div>
      {msg && <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>{msg}</div>}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ ...S.row, gridTemplateColumns: '1fr 100px 80px 100px', background: 'var(--surface-muted)', cursor: 'default', fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          <span>título</span><span>data</span><span>lang</span><span>status</span>
        </div>
        {posts.length === 0 && (
          <div style={{ padding: 24, fontFamily: MONO, fontSize: 13, color: 'var(--fg-dim)' }}>
            Nenhum post ainda. Crie um ou rode o seed em Configurações.
          </div>
        )}
        {posts.map(p => (
          <div key={p.id} onClick={() => open(p)}
            style={{ ...S.row, gridTemplateColumns: '1fr 100px 80px 100px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,255,178,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontFamily: SANS, fontSize: 14, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>{p.date || '—'}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>{p.lang}</span>
            <span><span style={S.badge(postStatus(p))}>{postStatus(p)}</span></span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Talks (Agenda) ──────────────────────────────────────────────────────────

const BLANK_TALK = {
  conference: '', year: new Date().getFullYear().toString(), international: false,
  speakers: ['Rafael', 'Larissa'], topic_pt: '', topic_en: '',
  location_pt: '', location_en: '', description_pt: '', description_en: '',
  video_url: '', slides_url: '', show_detail: false, order: 99,
}

function TalksTab() {
  const [talks, setTalks] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, 'talks'))
    setTalks(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)))
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing.conference.trim()) return setMsg('Conferência obrigatória.')
    setSaving(true)
    const id = editing.id || slugify(editing.conference + '-' + editing.year)
    const { id: _id, ...data } = editing
    await setDoc(doc(db, 'talks', id), { ...data, updatedAt: Timestamp.now() })
    setMsg('Salvo.')
    setSaving(false)
    setEditing(null)
    await load()
    setTimeout(() => setMsg(''), 3000)
  }

  const remove = async (id) => {
    if (!confirm(`Deletar "${id}"?`)) return
    await deleteDoc(doc(db, 'talks', id))
    setEditing(null)
    await load()
  }

  const toggleSpeaker = (name) => {
    const has = editing.speakers.includes(name)
    setEditing(e => ({ ...e, speakers: has ? e.speakers.filter(s => s !== name) : [...e.speakers, name] }))
  }

  if (editing !== null) return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => setEditing(null)} style={S.btn()}>← voltar</button>
        <div style={S.monoTag}>{editing.id ? 'editar talk' : 'nova talk'}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Conferência" value={editing.conference} onChange={v => setEditing(e => ({ ...e, conference: v }))} />
        </div>
        <Input label="Ano" value={editing.year} onChange={v => setEditing(e => ({ ...e, year: v }))} />
        <Input label="Ordem (menor = primeiro)" type="number" value={editing.order} onChange={v => setEditing(e => ({ ...e, order: Number(v) }))} />
        <div style={S.field}>
          <label style={S.label}>Palestrantes</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Rafael', 'Larissa'].map(name => (
              <button key={name} onClick={() => toggleSpeaker(name)}
                style={S.btn(editing.speakers.includes(name) ? 'primary' : 'default')}>{name}</button>
            ))}
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Internacional</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)' }}>
            <input type="checkbox" checked={editing.international} onChange={e => setEditing(ed => ({ ...ed, international: e.target.checked }))} />
            Conferência internacional
          </label>
        </div>
        <Input label="Tópico PT" value={editing.topic_pt} onChange={v => setEditing(e => ({ ...e, topic_pt: v }))} />
        <Input label="Tópico EN" value={editing.topic_en} onChange={v => setEditing(e => ({ ...e, topic_en: v }))} />
        <Input label="Local PT" value={editing.location_pt} onChange={v => setEditing(e => ({ ...e, location_pt: v }))} />
        <Input label="Local EN" value={editing.location_en} onChange={v => setEditing(e => ({ ...e, location_en: v }))} />
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Descrição PT" as="textarea" rows={3} value={editing.description_pt} onChange={v => setEditing(e => ({ ...e, description_pt: v }))} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <Input label="Descrição EN" as="textarea" rows={3} value={editing.description_en} onChange={v => setEditing(e => ({ ...e, description_en: v }))} />
        </div>
        <Input label="URL Vídeo" value={editing.video_url} onChange={v => setEditing(e => ({ ...e, video_url: v }))} />
        <Input label="URL Slides" value={editing.slides_url} onChange={v => setEditing(e => ({ ...e, slides_url: v }))} />
        <div style={S.field}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)' }}>
            <input type="checkbox" checked={editing.show_detail} onChange={e => setEditing(ed => ({ ...ed, show_detail: e.target.checked }))} />
            Mostrar detalhes
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <button onClick={save} disabled={saving} style={S.btn('primary')}>{saving ? 'salvando...' : '$ salvar →'}</button>
        {editing.id && <button onClick={() => remove(editing.id)} style={S.btn('danger')}>deletar</button>}
        {msg && <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>{msg}</span>}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h2 style={S.sectionTitle}>Agenda / Talks</h2>
        <button onClick={() => setEditing({ ...BLANK_TALK })} style={S.btn('primary')}>+ nova talk</button>
      </div>
      {msg && <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>{msg}</div>}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ ...S.row, gridTemplateColumns: '40px 1fr 1.2fr 80px 80px', cursor: 'default', background: 'var(--surface-muted)', fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          <span>#</span><span>conferência</span><span>tópico PT</span><span>ano</span><span>palestr.</span>
        </div>
        {talks.length === 0 && <div style={{ padding: 24, fontFamily: MONO, fontSize: 13, color: 'var(--fg-dim)' }}>Vazio. Rode o seed em Configurações.</div>}
        {talks.map((t, i) => (
          <div key={t.id} onClick={() => setEditing({ ...t })}
            style={{ ...S.row, gridTemplateColumns: '40px 1fr 1.2fr 80px 80px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,255,178,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: SANS, fontSize: 14, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.conference}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-mid)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.topic_pt}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: t.year === '2026' ? 'var(--accent)' : 'var(--fg-soft)' }}>{t.year}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-mid)' }}>{(t.speakers || []).join('/')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Topics (Speaking section) ───────────────────────────────────────────────

const BLANK_TOPIC = { title: '', who: 'Dupla', desc: '', tag: 'Engenharia', order: 99 }
const TOPIC_TAGS = ['Engenharia', 'Carreira', 'Cultura', 'Mobile', 'DevOps', 'IA', 'Liderança']

function TopicsTab() {
  const [topics, setTopics] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, 'topics'))
    setTopics(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)))
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing.title.trim()) return setMsg('Título obrigatório.')
    setSaving(true)
    if (editing.id) {
      await setDoc(doc(db, 'topics', editing.id), { ...editing, updatedAt: Timestamp.now() })
    } else {
      await addDoc(collection(db, 'topics'), { ...editing, updatedAt: Timestamp.now() })
    }
    setMsg('Salvo.')
    setSaving(false)
    setEditing(null)
    await load()
    setTimeout(() => setMsg(''), 3000)
  }

  const remove = async (id) => {
    if (!confirm('Deletar este tópico?')) return
    await deleteDoc(doc(db, 'topics', id))
    setEditing(null)
    await load()
  }

  if (editing !== null) return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => setEditing(null)} style={S.btn()}>← voltar</button>
        <div style={S.monoTag}>{editing.id ? 'editar tópico' : 'novo tópico'}</div>
      </div>
      <Input label="Título" value={editing.title} onChange={v => setEditing(e => ({ ...e, title: v }))} />
      <Select label="Palestrante(s)" value={editing.who} onChange={v => setEditing(e => ({ ...e, who: v }))}
        options={[{ value: 'Dupla', label: 'Dupla (Rafael & Larissa)' }, { value: 'Rafael', label: 'Rafael' }, { value: 'Larissa', label: 'Larissa' }]} />
      <Select label="Tag / Categoria" value={editing.tag} onChange={v => setEditing(e => ({ ...e, tag: v }))}
        options={TOPIC_TAGS.map(t => ({ value: t, label: t }))} />
      <Input label="Descrição" as="textarea" rows={3} value={editing.desc} onChange={v => setEditing(e => ({ ...e, desc: v }))} />
      <Input label="Ordem" type="number" value={editing.order} onChange={v => setEditing(e => ({ ...e, order: Number(v) }))} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={save} disabled={saving} style={S.btn('primary')}>{saving ? 'salvando...' : '$ salvar →'}</button>
        {editing.id && <button onClick={() => remove(editing.id)} style={S.btn('danger')}>deletar</button>}
        {msg && <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>{msg}</span>}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <h2 style={S.sectionTitle}>Tópicos de Palestra</h2>
        <button onClick={() => setEditing({ ...BLANK_TOPIC })} style={S.btn('primary')}>+ novo tópico</button>
      </div>
      <p style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)', marginBottom: 24 }}>Estes são os temas exibidos na seção "Palestras" do site.</p>
      {msg && <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>{msg}</div>}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ ...S.row, gridTemplateColumns: '40px 1fr 80px 80px', cursor: 'default', background: 'var(--surface-muted)', fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          <span>#</span><span>título</span><span>quem</span><span>tag</span>
        </div>
        {topics.length === 0 && <div style={{ padding: 24, fontFamily: MONO, fontSize: 13, color: 'var(--fg-dim)' }}>Vazio. Crie tópicos ou rode o seed em Configurações.</div>}
        {topics.map((t, i) => (
          <div key={t.id} onClick={() => setEditing({ ...t })}
            style={{ ...S.row, gridTemplateColumns: '40px 1fr 80px 80px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,255,178,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)' }}>{i + 1}</span>
            <span style={{ fontFamily: SANS, fontSize: 14, color: 'var(--fg)' }}>{t.title}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-mid)' }}>{t.who}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)' }}>{t.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const BLANK_TESTIMONIAL = { quote: '', who: '', where: '', order: 99 }

function TestimonialsTab() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, 'testimonials'))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing.quote.trim()) return setMsg('Depoimento obrigatório.')
    setSaving(true)
    if (editing.id) {
      await setDoc(doc(db, 'testimonials', editing.id), { ...editing, updatedAt: Timestamp.now() })
    } else {
      await addDoc(collection(db, 'testimonials'), { ...editing, updatedAt: Timestamp.now() })
    }
    setMsg('Salvo.')
    setSaving(false)
    setEditing(null)
    await load()
    setTimeout(() => setMsg(''), 3000)
  }

  const remove = async (id) => {
    if (!confirm('Deletar este depoimento?')) return
    await deleteDoc(doc(db, 'testimonials', id))
    setEditing(null)
    await load()
  }

  if (editing !== null) return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => setEditing(null)} style={S.btn()}>← voltar</button>
        <div style={S.monoTag}>{editing.id ? 'editar depoimento' : 'novo depoimento'}</div>
      </div>
      <Input label="Depoimento" as="textarea" rows={4} value={editing.quote} onChange={v => setEditing(e => ({ ...e, quote: v }))} />
      <Input label="Nome / Cargo" value={editing.who} onChange={v => setEditing(e => ({ ...e, who: v }))} />
      <Input label="Empresa / Evento" value={editing.where} onChange={v => setEditing(e => ({ ...e, where: v }))} />
      <Input label="Ordem" type="number" value={editing.order} onChange={v => setEditing(e => ({ ...e, order: Number(v) }))} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={save} disabled={saving} style={S.btn('primary')}>{saving ? 'salvando...' : '$ salvar →'}</button>
        {editing.id && <button onClick={() => remove(editing.id)} style={S.btn('danger')}>deletar</button>}
        {msg && <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>{msg}</span>}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h2 style={S.sectionTitle}>Depoimentos</h2>
        <button onClick={() => setEditing({ ...BLANK_TESTIMONIAL })} style={S.btn('primary')}>+ novo depoimento</button>
      </div>
      {msg && <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>{msg}</div>}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        {items.length === 0 && <div style={{ padding: 24, fontFamily: MONO, fontSize: 13, color: 'var(--fg-dim)' }}>Vazio. Crie depoimentos ou rode o seed.</div>}
        {items.map((q) => (
          <div key={q.id} onClick={() => setEditing({ ...q })}
            style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,255,178,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <p style={{ fontFamily: SANS, fontSize: 14, color: 'var(--fg)', margin: '0 0 6px', lineHeight: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>"{q.quote}"</p>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>— {q.who} · {q.where}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Settings ────────────────────────────────────────────────────────────────

function SettingsTab() {
  const [book, setBook] = useState({})
  const [oculus, setOculus] = useState({})
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    Promise.all([
      getDoc(doc(db, 'settings', 'book')),
      getDoc(doc(db, 'settings', 'oculus')),
    ]).then(([b, o]) => {
      setBook(b.exists() ? b.data() : { ...bookJson })
      setOculus(o.exists() ? o.data() : { ...oculusJson })
    })
  }, [])

  const saveSettings = async () => {
    setSaving(true)
    await Promise.all([
      setDoc(doc(db, 'settings', 'book'), book),
      setDoc(doc(db, 'settings', 'oculus'), oculus),
    ])
    setMsg('Configurações salvas.')
    setSaving(false)
    setTimeout(() => setMsg(''), 3000)
  }

  const seedDb = async () => {
    if (!confirm('Isso vai popular o Firestore com os dados atuais dos arquivos JSON. Continuar?')) return
    setSeeding(true)
    setSeedMsg('Importando talks...')

    // Seed talks
    for (const t of talksJson) {
      const id = t.slug || slugify(t.conference + '-' + t.year)
      await setDoc(doc(db, 'talks', id), { ...t, updatedAt: Timestamp.now() })
    }

    setSeedMsg('Importando topics...')
    for (const [i, t] of DEFAULT_TOPICS.entries()) {
      await addDoc(collection(db, 'topics'), { ...t, order: i, updatedAt: Timestamp.now() })
    }

    setSeedMsg('Importando depoimentos...')
    for (const [i, q] of testimonialsJson.entries()) {
      await addDoc(collection(db, 'testimonials'), { ...q, order: i, updatedAt: Timestamp.now() })
    }

    setSeedMsg('Importando configurações...')
    await setDoc(doc(db, 'settings', 'book'), { ...bookJson, updatedAt: Timestamp.now() })
    await setDoc(doc(db, 'settings', 'oculus'), { ...oculusJson, updatedAt: Timestamp.now() })

    setSeedMsg('✓ Seed completo! Posts precisam ser criados manualmente (ou importados via CLI).')
    setSeeding(false)
  }

  const BoolField = ({ label, checked, onChange }) => (
    <div style={S.field}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)' }}>
        <input type="checkbox" checked={!!checked} onChange={e => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  )

  return (
    <div>
      <h2 style={S.sectionTitle}>Configurações</h2>

      {/* Book */}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 24, marginBottom: 24, marginTop: 24 }}>
        <div style={S.monoTag}>book</div>
        <BoolField label="Ativar seção do livro" checked={book.enabled} onChange={v => setBook(b => ({ ...b, enabled: v }))} />
        <Input label="Título PT" value={book.heading_pt || ''} onChange={v => setBook(b => ({ ...b, heading_pt: v }))} />
        <Input label="Título EN" value={book.heading_en || ''} onChange={v => setBook(b => ({ ...b, heading_en: v }))} />
        <Input label="Descrição PT" as="textarea" rows={2} value={book.description_pt || ''} onChange={v => setBook(b => ({ ...b, description_pt: v }))} />
        <Input label="Descrição EN" as="textarea" rows={2} value={book.description_en || ''} onChange={v => setBook(b => ({ ...b, description_en: v }))} />
      </div>

      {/* Oculus */}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 24, marginBottom: 32 }}>
        <div style={S.monoTag}>oculus</div>
        <BoolField label="Ativar seção Oculus" checked={oculus.enabled} onChange={v => setOculus(o => ({ ...o, enabled: v }))} />
        <Input label="Título PT" value={oculus.heading_pt || ''} onChange={v => setOculus(o => ({ ...o, heading_pt: v }))} />
        <Input label="Tagline PT" value={oculus.tagline_pt || ''} onChange={v => setOculus(o => ({ ...o, tagline_pt: v }))} />
        <Input label="Descrição PT" as="textarea" rows={2} value={oculus.description_pt || ''} onChange={v => setOculus(o => ({ ...o, description_pt: v }))} />
        <Input label="CTA URL" value={oculus.cta_url || ''} onChange={v => setOculus(o => ({ ...o, cta_url: v }))} />
        <Input label="CTA Label PT" value={oculus.cta_label_pt || ''} onChange={v => setOculus(o => ({ ...o, cta_label_pt: v }))} />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 48 }}>
        <button onClick={saveSettings} disabled={saving} style={S.btn('primary')}>{saving ? 'salvando...' : '$ salvar config →'}</button>
        {msg && <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)' }}>{msg}</span>}
      </div>

      {/* Seed */}
      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 24 }}>
        <div style={S.monoTag}>seed do banco</div>
        <p style={{ fontFamily: MONO, fontSize: 12, color: 'var(--fg-mid)', lineHeight: 1.7, margin: '8px 0 16px' }}>
          Popula o Firestore com os dados dos arquivos JSON (talks, depoimentos, tópicos e configurações).
          Execute apenas uma vez na primeira configuração ou para resetar o conteúdo base.
        </p>
        <button onClick={seedDb} disabled={seeding} style={S.btn('danger')}>
          {seeding ? 'rodando...' : '$ seed_firestore'}
        </button>
        {seedMsg && <p style={{ fontFamily: MONO, fontSize: 12, color: 'var(--accent)', marginTop: 12 }}>{seedMsg}</p>}
      </div>
    </div>
  )
}

// ─── Shell ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'posts', label: './posts' },
  { id: 'talks', label: './talks' },
  { id: 'topics', label: './topics' },
  { id: 'testimonials', label: './depoimentos' },
  { id: 'settings', label: './config' },
]

function AdminShell({ user }) {
  const [tab, setTab] = useState('posts')

  return (
    <div style={S.page}>
      <header style={S.header}>
        <div style={S.logo}>
          rclr<span style={{ color: 'var(--fg-soft)' }}>.com</span>
          <span style={{ color: 'var(--fg-dim)', marginLeft: 12 }}>/ admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)' }}>{user.email}</span>
          <button onClick={() => signOut(auth)} style={S.btn()}>logout</button>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <nav style={S.sidebar}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)', padding: '0 24px 12px' }}>
            conteúdo
          </div>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={S.tabBtn(tab === t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        <main style={S.content}>
          {tab === 'posts' && <PostsTab />}
          {tab === 'talks' && <TalksTab />}
          {tab === 'topics' && <TopicsTab />}
          {tab === 'testimonials' && <TestimonialsTab />}
          {tab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  )
}

// ─── Entry ───────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [user, setUser] = useState(undefined)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    getRedirectResult(auth).catch(err => setAuthError(err.message))
    try {
      const unsub = onAuthStateChanged(auth, setUser, (err) => setAuthError(err.message))
      return unsub
    } catch (err) {
      setAuthError(err.message)
    }
  }, [])

  if (authError) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0b0d', fontFamily: MONO, padding: 32 }}>
      <div style={{ border: '1px solid rgba(255,80,80,0.4)', padding: 32, maxWidth: 480 }}>
        <div style={{ color: '#ff5050', fontSize: 12, marginBottom: 12 }}>// firebase auth error</div>
        <p style={{ color: '#f8f7f3', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{authError}</p>
      </div>
    </div>
  )

  if (user === undefined) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0b0d', fontFamily: MONO, fontSize: 13, color: '#7CFFB2' }}>
      // carregando autenticação...
    </div>
  )

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <LoginScreen wrongEmail={!!(user && !ADMIN_EMAILS.includes(user.email))} />
  }

  return <AdminShell user={user} />
}
