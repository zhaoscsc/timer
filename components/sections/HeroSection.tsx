'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MainTimer } from '@/components/timer/MainTimer'
import { useTranslation } from "@/app/i18n/client"
import {TimeUnit} from "@/config/timeUnits";

interface HeroSectionProps {
  lng: string
  defaultValues?: number
  unit?: TimeUnit
}

export function HeroSection({ lng, defaultValues = 5 ,unit = 'minutes'}: HeroSectionProps) {
  const { t } = useTranslation(lng, 'common')
  const [minutes, setMinutes] = useState(defaultValues)
  const [isRunning, setIsRunning] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 opacity-70" />
        <motion.div
          className="absolute -inset-[10px] bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/20 dark:to-purple-800/20 blur-3xl"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative container mx-auto">
        <motion.h1
          className="text-center text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          { t(`hero.${unit}Title`, { duration: defaultValues.toString() })}
        </motion.h1>

        <motion.p
          className="text-center text-xl text-gray-600 dark:text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MainTimer
              timeValue={minutes}
              timeUnit={unit}
              isRunning={isRunning}
              onToggle={() => setIsRunning(!isRunning)}
              onMinutesChange={setMinutes}
              showPresets={true}
              lng={lng}
          />
        </motion.div>
      </div>
    </section>
  )
} 