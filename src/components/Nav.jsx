import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    const next = i18n.language === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(next)
  }

  const navLinks = [
    { key: 'about', href: '#sobre' },
    { key: 'book',  href: '#livro' },
    { key: 'speaking', href: '#palestras' },
    { key: 'contact', href: '#contato' },
  ]

  const borderStyle = scrolled ? '1px solid rgba(245,242,238,0.08)' : '1px solid transparent'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(26,23,20,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: borderStyle,
      }}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display font-500 tracking-[0.2em] transition-colors duration-300"
          style={{ fontSize: '1rem', color: 'rgba(245,242,238,0.75)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C4633A'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,238,0.75)'}
        >
          RCLR
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.key} href={link.href} className="nav-link">
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        {/* Lang toggle + mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-body text-[0.72rem] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full transition-all duration-200"
            style={{ border: '1px solid rgba(245,242,238,0.15)', color: 'rgba(245,242,238,0.4)' }}
            aria-label="Toggle language"
          >
            {t('lang.toggle')}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'rgba(245,242,238,0.5)' }} />
            <span className={`block w-5 h-px transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'rgba(245,242,238,0.5)' }} />
            <span className={`block w-5 h-px transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'rgba(245,242,238,0.5)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}
        style={{ background: 'rgba(26,23,20,0.97)', borderBottom: menuOpen ? '1px solid rgba(245,242,238,0.08)' : 'none' }}
      >
        <nav className="flex flex-col px-6 py-5 gap-5">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-link py-1"
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
