/**
 * Seed Firestore via REST API (no gRPC, no auth required with open rules).
 * Run: node scripts/seed-firestore.mjs
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const envRaw = readFileSync(join(ROOT, '.env.local'), 'utf8')
const env = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const PROJECT = env.VITE_FIREBASE_PROJECT_ID
const API_KEY = env.VITE_FIREBASE_API_KEY
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`

// Convert a plain JS value to Firestore REST format
function toFirestore(val) {
  if (val === null || val === undefined) return { nullValue: 'NULL_VALUE' }
  if (typeof val === 'boolean') return { booleanValue: val }
  if (typeof val === 'number') return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val }
  if (typeof val === 'string') return { stringValue: val }
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestore) } }
  if (typeof val === 'object') return { mapValue: { fields: toFields(val) } }
  return { stringValue: String(val) }
}

function toFields(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toFirestore(v)]))
}

// PATCH = create or overwrite a named document
async function setDoc(collectionId, docId, data) {
  const url = `${BASE}/${collectionId}/${docId}?key=${API_KEY}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toFields(data) }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`setDoc ${collectionId}/${docId} failed: ${res.status} ${err}`)
  }
  process.stdout.write('.')
}

// POST = add a document with auto-generated ID
async function addDoc(collectionId, data) {
  const url = `${BASE}/${collectionId}?key=${API_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toFields(data) }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`addDoc ${collectionId} failed: ${res.status} ${err}`)
  }
  process.stdout.write('.')
}

const DATA = join(ROOT, 'src/data')
const talks = JSON.parse(readFileSync(join(DATA, 'talks.json'), 'utf8'))
const testimonials = JSON.parse(readFileSync(join(DATA, 'testimonials.json'), 'utf8'))
const posts = JSON.parse(readFileSync(join(DATA, 'posts.json'), 'utf8'))
const book = JSON.parse(readFileSync(join(DATA, 'book.json'), 'utf8'))
const oculus = JSON.parse(readFileSync(join(DATA, 'oculus.json'), 'utf8'))

const DEFAULT_TOPICS = [
  { title: 'Smart Testing: Pick What Matters Most', who: 'Dupla', desc: 'Como priorizar o que testar quando tudo parece importante — frameworks práticos para decisões de cobertura.', tag: 'Engenharia', order: 0 },
  { title: 'Humanos vs IA: continuando relevante', who: 'Dupla', desc: 'A nova era da engenharia assistida por IA e o que diferencia times que escalam dos que estagnam.', tag: 'Carreira', order: 1 },
  { title: 'Built-in Quality Mindset', who: 'Dupla', desc: 'Instalando uma cultura de qualidade desde o primeiro commit — não no final do sprint.', tag: 'Cultura', order: 2 },
  { title: 'Carreira e Protagonismo', who: 'Larissa', desc: 'Você já tomou as rédeas da sua carreira em tecnologia? Um chamado prático.', tag: 'Carreira', order: 3 },
  { title: 'Testes mobile que escalam', who: 'Rafael', desc: 'Construindo uma abordagem de testes para apps mobile que sobrevive ao crescimento do time.', tag: 'Mobile', order: 4 },
  { title: 'DevOps: muito mais que pipelines', who: 'Rafael', desc: 'O que está por trás do hype: cultura, propriedade e o fim da separação dev/ops.', tag: 'DevOps', order: 5 },
]

async function seed() {
  console.log(`Seeding project: ${PROJECT}`)

  process.stdout.write('talks ')
  for (const t of talks) {
    await setDoc('talks', t.slug, t)
  }

  process.stdout.write('\ntopics ')
  for (const t of DEFAULT_TOPICS) {
    await addDoc('topics', t)
  }

  process.stdout.write('\ntestimonials ')
  for (const [i, q] of testimonials.entries()) {
    await addDoc('testimonials', { ...q, order: i })
  }

  process.stdout.write('\nposts ')
  for (const p of posts) {
    await setDoc('posts', p.slug, { ...p, publishAt: null })
  }

  process.stdout.write('\nsettings ')
  await setDoc('settings', 'book', book)
  await setDoc('settings', 'oculus', oculus)

  console.log('\n✓ Seed complete!')
  process.exit(0)
}

seed().catch(err => { console.error('\n✗', err.message); process.exit(1) })
