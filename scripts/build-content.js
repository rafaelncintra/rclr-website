#!/usr/bin/env node
/**
 * build-content.js
 * Reads all markdown files from /content/posts/, parses frontmatter,
 * and writes /src/data/posts.json (sorted newest-first, published only).
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src', 'data')

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true })
}

// --- Posts ---
const POSTS_DIR = join(ROOT, 'content', 'posts')
const POSTS_FILE = join(OUTPUT_DIR, 'posts.json')

if (!existsSync(POSTS_DIR)) {
  writeFileSync(POSTS_FILE, JSON.stringify([], null, 2), 'utf8')
} else {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  const posts = files
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = basename(file, '.md')
      return {
        slug,
        title: data.title || '',
        date: data.date ? String(data.date).slice(0, 10) : '',
        excerpt: data.excerpt || '',
        lang: data.lang || 'pt',
        published: data.published !== false,
        body: content.trim(),
      }
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8')
  console.log(`build-content: wrote ${posts.length} post(s) to src/data/posts.json`)
}

// --- Talks ---
const TALKS_DIR = join(ROOT, 'content', 'talks')
const TALKS_FILE = join(OUTPUT_DIR, 'talks.json')

if (!existsSync(TALKS_DIR)) {
  writeFileSync(TALKS_FILE, JSON.stringify([], null, 2), 'utf8')
} else {
  const files = readdirSync(TALKS_DIR).filter((f) => f.endsWith('.md'))
  const talks = files
    .map((file) => {
      const raw = readFileSync(join(TALKS_DIR, file), 'utf8')
      const { data } = matter(raw)
      const slug = basename(file, '.md')
      return {
        slug,
        order: data.order ?? 999,
        conference: data.conference || '',
        year: String(data.year || ''),
        international: data.international === true,
        speakers: Array.isArray(data.speakers) ? data.speakers : [],
        topic_pt: data.topic_pt || '',
        topic_en: data.topic_en || '',
        location_pt: data.location_pt || '',
        location_en: data.location_en || '',
        description_pt: data.description_pt || '',
        description_en: data.description_en || '',
        video_url: data.video_url || '',
        slides_url: data.slides_url || '',
        show_detail: data.show_detail === true,
      }
    })
    .sort((a, b) => a.order - b.order)
  writeFileSync(TALKS_FILE, JSON.stringify(talks, null, 2), 'utf8')
  console.log(`build-content: wrote ${talks.length} talk(s) to src/data/talks.json`)
}

// --- Settings (book, oculus) ---
const SETTINGS_DIR = join(ROOT, 'content', 'settings')
for (const name of ['book', 'oculus']) {
  const file = join(SETTINGS_DIR, `${name}.yml`)
  const outputFile = join(OUTPUT_DIR, `${name}.json`)
  if (!existsSync(file)) {
    writeFileSync(outputFile, JSON.stringify({ enabled: false }, null, 2), 'utf8')
  } else {
    const raw = readFileSync(file, 'utf8')
    // CMS saves .yml files as pure YAML (no --- delimiters); wrap for gray-matter
    const wrapped = raw.trimStart().startsWith('---') ? raw : `---\n${raw}\n---`
    const { data } = matter(wrapped)
    writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf8')
    console.log(`build-content: wrote src/data/${name}.json`)
  }
}
