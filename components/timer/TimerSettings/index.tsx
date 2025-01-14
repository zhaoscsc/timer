'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from "@/app/i18n/client"
import {
  TimerStyleSettings,
  DEFAULT_SETTINGS,
  FONT_COLORS,
  ALERT_SOUNDS, 
  AlertSound
} from '@/types/timer'

interface TimerSettingsProps {
  lng: string
  onClose: () => void
  initialSettings?: TimerStyleSettings
  onSave?: (settings: TimerStyleSettings) => void
}

export function TimerSettings({ lng, onClose, initialSettings, onSave }: TimerSettingsProps) {
  const { t } = useTranslation(lng, 'timer')
  
  const [settings, setSettings] = useState<TimerStyleSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings)
    }
  }, [initialSettings])

  const previewAudioRef = useRef<HTMLAudioElement | null>(null)

  const [currentlyPlaying, setCurrentlyPlaying] = useState<AlertSound | null>(null)

  const previewSound = (sound: AlertSound) => {
    if (previewAudioRef.current) {
      if (currentlyPlaying === sound) {
        previewAudioRef.current.pause()
        previewAudioRef.current.currentTime = 0
        setCurrentlyPlaying(null)
        return
      }
      previewAudioRef.current.pause()
      previewAudioRef.current.currentTime = 0
    }
    
    previewAudioRef.current = new Audio(`/sounds/${sound}.mp3`)
    previewAudioRef.current.play()
      .then(() => setCurrentlyPlaying(sound))
      .catch(err => console.error('Error playing sound:', err))
  }

  const handleSave = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current.currentTime = 0
      setCurrentlyPlaying(null)
    }
    
    onSave?.(settings)
    onClose()
  }

  return (
    <div className="w-full h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-12">
      <div className="flex-1 flex flex-col justify-center space-y-10 sm:space-y-12">
        {/* 时间样式 */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="text-gray-500 dark:text-gray-400 text-base sm:text-lg sm:min-w-[120px] font-light">
            {t('settings.timeStyle')}:
          </span>
          <div className="flex w-full sm:w-auto justify-center gap-4">
            <button
              onClick={() => setSettings(prev => ({ ...prev, timeStyle: 'MM:SS' }))}
              className={`w-32 sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.timeStyle === 'MM:SS' 
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              MM:SS
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, timeStyle: 'MM:SS:SSS' }))}
              className={`w-32 sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.timeStyle === 'MM:SS:SSS'
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              MM:SS:SSS
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="text-gray-500 dark:text-gray-400 text-base sm:text-lg sm:min-w-[120px] font-light">
            {t('settings.fontColor')}:
          </span>
          <div className="grid grid-cols-4 sm:flex justify-center gap-4 sm:gap-6">
            {FONT_COLORS.map(color => (
              <button
                key={color}
                onClick={() => setSettings(prev => ({ ...prev, fontColor: color }))}
                className={`
                  w-10 h-10 rounded-full shadow-lg transition-all hover:scale-110
                  ${color === 'default' 
                    ? 'bg-gray-800 dark:bg-gray-100' 
                    : `bg-${color}-500 dark:bg-${color}-400`}
                  ${settings.fontColor === color 
                    ? `ring-2 ring-offset-4 dark:ring-offset-gray-900 ring-${color === 'default' ? 'gray' : color}-500`
                    : `hover:ring-2 ring-offset-4 dark:ring-offset-gray-900 ring-${color === 'default' ? 'gray' : color}-500`
                  }
                `}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="text-gray-500 dark:text-gray-400 text-base sm:text-lg sm:min-w-[120px] font-light">
            {t('settings.alertSound')}:
          </span>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4">
            {ALERT_SOUNDS.map(sound => (
              <button
                key={sound}
                onClick={() => {
                  setSettings(prev => ({ ...prev, alertSound: sound }))
                  previewSound(sound)
                }}
                className={`w-24 sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                  ${settings.alertSound === sound
                    ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
              >
                {t(`settings.sounds.${sound}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="text-gray-500 dark:text-gray-400 text-base sm:text-lg sm:min-w-[120px] font-light">
            {t('settings.background')}:
          </span>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              onClick={() => setSettings(prev => ({ ...prev, backgroundStyle: 'none' }))}
              className={`flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.backgroundStyle === 'none'
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {t('settings.backgrounds.none')}
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, backgroundStyle: 'beams' }))}
              className={`flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.backgroundStyle === 'beams'
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {t('settings.backgrounds.beams')}
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, backgroundStyle: 'beams-collision' }))}
              className={`flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.backgroundStyle === 'beams-collision'
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {t('settings.backgrounds.beams-collision')}
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, backgroundStyle: 'lines' }))}
              className={`flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-medium shadow-lg transition-all
                ${settings.backgroundStyle === 'lines'
                  ? 'bg-blue-500/90 text-white shadow-blue-500/20 hover:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {t('settings.backgrounds.lines')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end pt-8">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto max-w-[200px] px-6 sm:px-8 py-3 sm:py-2.5 bg-blue-500/90 hover:bg-blue-500 text-white font-medium rounded-2xl sm:rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl"
        >
          {t('settings.save')}
        </button>
      </div>

      <audio ref={previewAudioRef} />
    </div>
  )
} 