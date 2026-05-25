import { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const EMPTY = { posts: [], talks: [], topics: [], testimonials: [], settings: { book: {}, oculus: {} }, loading: true, error: null }

const ContentContext = createContext(EMPTY)

export function ContentProvider({ children }) {
  const [data, setData] = useState(EMPTY)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [postsSnap, talksSnap, topicsSnap, testimonialsSnap, bookDoc, oculusDoc] = await Promise.all([
          getDocs(collection(db, 'posts')),
          getDocs(collection(db, 'talks')),
          getDocs(collection(db, 'topics')),
          getDocs(collection(db, 'testimonials')),
          getDoc(doc(db, 'settings', 'book')),
          getDoc(doc(db, 'settings', 'oculus')),
        ])
        if (cancelled) return

        const now = new Date()
        const posts = postsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(p => {
            if (!p.published) return false
            if (!p.publishAt) return true
            const pa = p.publishAt.toDate ? p.publishAt.toDate() : new Date(p.publishAt)
            return pa <= now
          })
          .sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1)

        const talks = talksSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

        const topics = topicsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

        const testimonials = testimonialsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

        setData({
          posts,
          talks,
          topics,
          testimonials,
          settings: {
            book: bookDoc.exists() ? bookDoc.data() : {},
            oculus: oculusDoc.exists() ? oculusDoc.data() : {},
          },
          loading: false,
          error: null,
        })
      } catch (err) {
        if (!cancelled) {
          console.warn('ContentContext: Firestore load failed', err.message)
          setData(d => ({ ...d, loading: false, error: err.message }))
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
}

export function useContent() { return useContext(ContentContext) }
