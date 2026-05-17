import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="py-12 border-t border-ivory/[0.06]">
      <div className="max-w-editorial mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-display text-ivory/30 font-light" style={{ fontSize: '0.875rem', letterSpacing: '0.04em' }}>
              RCLR
            </span>
            <span className="font-body text-ivory/20 text-xs tracking-wide">
              {t('footer.founded')}
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="font-body text-ivory/25 text-xs leading-relaxed max-w-xs sm:text-right">
              {t('footer.tagline')}
            </span>
            <span className="font-body text-ivory/15 text-xs">
              © {new Date().getFullYear()} · {t('footer.rights')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
