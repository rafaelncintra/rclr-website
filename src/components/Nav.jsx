import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../App'

const MONO = '"JetBrains Mono", monospace'

export default function Nav() {
  const { light, setLight } = useTheme()
  const { i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
  }

  const links = [
    ['./sobre', '#sobre'],
    ['./palestras', '#palestras'],
    ['./livros', '#livros'],
    ['./blog', '#blog'],
    ['./agenda', '#agenda'],
    ['./contato', '#contato'],
  ]

  return (
    <header style={{
      padding: '16px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="#/" style={{
          fontFamily: MONO, fontSize: 13, fontWeight: 500,
          padding: '6px 10px', border: '1px solid var(--border)',
          color: 'var(--accent)', textDecoration: 'none',
        }}>
          rclr<span style={{ color: 'var(--fg)' }}>.com</span>
        </a>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)', display: 'none' }} className="md:block">
          <span style={{ color: 'var(--accent)' }}>●</span> online · v3.1
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: 4, fontFamily: MONO, fontSize: 12 }}>
        {links.map(([label, href]) => (
          <a key={label} href={href} style={{
            color: 'var(--fg-mid)',
            padding: '6px 10px',
            textDecoration: 'none',
            borderRadius: 4,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-mid)'}
          >{label}</a>
        ))}
      </nav>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Lang toggle */}
        <button onClick={toggleLang} style={{
          fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)',
          background: 'none', border: '1px solid var(--border)',
          padding: '5px 10px', cursor: 'pointer',
        }}>
          {i18n.language === 'pt' ? 'EN' : 'PT'}
        </button>

        {/* Light/dark toggle */}
        <button onClick={() => setLight(!light)} style={{
          fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)',
          background: 'none', border: '1px solid var(--border)',
          padding: '5px 10px', cursor: 'pointer',
        }}>
          {light ? '◐ dark' : '○ light'}
        </button>

        <a href="#contato" style={{
          marginLeft: 8, fontFamily: MONO, fontSize: 12,
          padding: '8px 14px', background: 'var(--accent)', color: 'var(--accent-ink)',
          textDecoration: 'none', display: 'none',
        }} className="md:block">$ book_us →</a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 20, height: 1, background: 'var(--fg-mid)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 1, background: 'var(--fg-mid)', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 20, height: 1, background: 'var(--fg-mid)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--nav-bg)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }} className="md:hidden">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: MONO, fontSize: 13, color: 'var(--fg-mid)', textDecoration: 'none',
            }}>{label}</a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)} style={{
            fontFamily: MONO, fontSize: 12, padding: '10px 16px',
            background: 'var(--accent)', color: 'var(--accent-ink)',
            textDecoration: 'none', marginTop: 8, textAlign: 'center',
          }}>$ book_us →</a>
        </div>
      )}
    </header>
  )
}
