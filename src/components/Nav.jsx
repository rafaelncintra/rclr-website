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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-900/95 backdrop-blur-sm border-b border-ivory/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-lg font-medium tracking-[0.12em] text-ivory hover:text-gold transition-colors duration-300"
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
            className="font-display text-[0.75rem] tracking-[0.15em] uppercase border border-ivory/20 text-ivory/50 hover:text-gold hover:border-gold/40 px-3 py-1.5 transition-all duration-300"
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
              className={`block w-5 h-px bg-ivory/70 transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-ivory/70 transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-ivory/70 transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 border-b border-ivory/5' : 'max-h-0'
        } bg-obsidian-800/98 backdrop-blur-sm`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
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
