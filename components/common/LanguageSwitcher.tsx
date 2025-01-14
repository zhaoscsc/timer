'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { languageNameMap } from '@/app/i18n/settings'

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()
  
  const getBasePath = () => {
    const segments = pathname.split('/')
    if (languageNameMap.some(lang => lang.code === segments[1])) {
      return '/' + segments.slice(2).join('/')
    }
    return pathname
  }

  const getTargetUrl = (langCode: string) => {
    const basePath = getBasePath()
    if (langCode === 'en') {
      return basePath === '/' ? '/' : basePath
    }
    return `/${langCode}${basePath}`
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-1.5">
      {languageNameMap.map(({ code, name }) => (
        <Link
          key={code}
          href={getTargetUrl(code)}
          className={`
            px-2.5 py-1 rounded-md text-sm transition-colors
            ${currentLang === code
              ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800/50'
            }
          `}
          title={`Change language to ${name}`}
          aria-label={`Switch website language to ${name}`}
        >
          {name}
        </Link>
      ))}
    </div>
  )
} 