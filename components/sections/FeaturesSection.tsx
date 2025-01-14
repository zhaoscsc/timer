import { useTranslation } from "@/app/i18n";
import { Feature } from "@/components/sections/Feature";

export async function FeaturesSection({
  lng,
}: {
  lng: string
}) {
  const { t } = await useTranslation(lng, 'timer');

  const features = [
    {
      key: "quickPresets",
      icon: "⚡"
    },
    {
      key: "precisionTiming",
      icon: "🎯"
    },
    {
      key: "soundAlerts",
      icon: "🔔"
    },
    {
      key: "darkMode",
      icon: "🌓"
    },
    {
      key: "fullscreen",
      icon: "🖥️"
    },
    {
      key: "backgrounds",
      icon: "✨"
    },
    {
      key: "multiLanguage",
      icon: "🌍"
    },
    {
      key: "screenWake",
      icon: "📱"
    },
    {
      key: "smartSettings",
      icon: "💾"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <Feature 
              key={feature.key}
              icon={feature.icon}
              title={t(`features.items.${feature.key}.title`)}
              description={t(`features.items.${feature.key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 