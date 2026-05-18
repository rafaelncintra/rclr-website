import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="py-10" style={{ borderTop: '1px solid rgba(245,242,238,0.08)' }}>
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-display font-300" style={{ fontSize: '0.875rem', letterSpacing: '0.18em', color: 'rgba(245,242,238,0.3)' }}>
              RCLR
            </span>
            <span className="font-body text-xs tracking-wide" style={{ color: 'rgba(245,242,238,0.2)' }}>
              {t('footer.founded')}
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="font-body text-xs leading-relaxed max-w-xs sm:text-right" style={{ color: 'rgba(245,242,238,0.3)' }}>
              {t('footer.tagline')}
            </span>
            <span className="font-body text-xs" style={{ color: 'rgba(245,242,238,0.15)' }}>
              © {new Date().getFullYear()} · {t('footer.rights')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
