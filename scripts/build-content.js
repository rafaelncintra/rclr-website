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
const POSTS_DIR = join(ROOT, 'content', 'posts')
const OUTPUT_DIR = join(ROOT, 'src', 'data')
const OUTPUT_FILE = join(OUTPUT_DIR, 'posts.json')

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Gracefully handle missing posts directory
if (!existsSync(POSTS_DIR)) {
  console.log('No content/posts directory found — writing empty posts.json')
  writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf8')
  process.exit(0)
}

const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))

if (files.length === 0) {
  console.log('No markdown files found — writing empty posts.json')
  writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf8')
  process.exit(0)
}

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
  // Filter unpublished
  .filter((p) => p.published)
  // Sort newest first
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf8')
console.log(`build-content: wrote ${posts.length} post(s) to src/data/posts.json`)
