interface BreadcrumbItem {
  label: string
  href: string
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <a 
              href={item.href}
              className="hover:text-blue-500 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
} 