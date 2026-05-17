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
    { key: 'speaking', href: '#palestras' },
    { key: 'writing', href: '#publicacoes' },
    { key: 'contact', href: '#contato' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-sand/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display text-base font-500 tracking-[0.18em] text-bark hover:text-terra transition-colors duration-300"
          style={{ letterSpacing: '0.2em' }}
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
            className="font-body text-[0.72rem] tracking-[0.14em] uppercase border border-border text-bark-muted hover:text-terra hover:border-terra/40 px-3 py-1.5 rounded-full transition-all duration-200"
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
            <span
              className={`block w-5 h-px bg-bark/60 transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-bark/60 transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-bark/60 transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-64 border-b border-border' : 'max-h-0'
        } bg-sand/98 backdrop-blur-sm`}
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
