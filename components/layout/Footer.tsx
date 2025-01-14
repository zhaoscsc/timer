'use client'

import { useTranslation } from "@/app/i18n/client"
import { LanguageSwitcher } from '../common/LanguageSwitcher'
import { ThemeToggle } from '../common/ThemeToggle'
import Link from 'next/link'

interface FooterProps {
  lng: string
}

export function Footer({ lng }: FooterProps) {
  const { t } = useTranslation(lng, 'common')
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-6 px-4 border-t border-gray-100 dark:border-gray-800/50">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-6">
          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1 text-center md:text-left">
            © {currentYear} {' '}
            <Link
              href={'https://minutetimers.net/'}
              className="hover:text-gray-800 dark:hover:text-gray-200"
              title="Minute Timer - Online Timer"
              aria-label={`${t('hero.title')} - ${t('hero.subtitle')}`}
            >
              Minute Timer
            </Link>{' '}.{' '}
            {t('footer.copyright')}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-x-8 gap-y-4 order-1 md:order-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('footer.language')}:
              </span>
              <LanguageSwitcher currentLang={lng} />
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('footer.theme')}:
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 