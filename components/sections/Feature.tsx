interface FeatureProps {
  icon: string
  title: string
  description: string
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 内容 */}
      <div className="relative space-y-4">
        {/* 图标 */}
        <div className="inline-block p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <span className="text-3xl">{icon}</span>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
} 