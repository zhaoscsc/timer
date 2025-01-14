'use client'

import { FiPlay, FiPause, FiRotateCw, FiMaximize, FiMinimize, FiVolume2, FiVolumeX, FiSettings } from 'react-icons/fi'
import { FontSizeButton } from './FontSizeButton'

interface TimerControlsProps {
  isRunning: boolean
  timeLeft: number
  isSoundEnabled: boolean
  isFullscreen: boolean
  onToggle: () => void
  onSoundToggle: () => void
  onFullscreenToggle: () => void
  onSettingsOpen: () => void
  onFontSizeChange: (size: number) => void
  defaultFontSize?: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function TimerControls({
  isRunning,
  timeLeft,
  isSoundEnabled,
  isFullscreen,
  onToggle,
  onSoundToggle,
  onFullscreenToggle,
  onSettingsOpen,
  onFontSizeChange,
  defaultFontSize = 100,
  onMouseEnter,
  onMouseLeave
}: TimerControlsProps) {
  return (
    <div 
      className="flex items-center justify-center gap-2 sm:gap-6 mb-8"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={() => {
          if (timeLeft === 0) {
            onToggle()
          } else {
            onToggle()
          }
        }}
        className={`
          flex items-center justify-center 
          w-12 h-12 sm:w-16 sm:h-16 rounded-full 
          ${timeLeft === 0
            ? 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500'
          }
          transition-colors shadow-lg dark:shadow-blue-500/30
        `}
        aria-label={timeLeft === 0 ? 'Reset timer' : (isRunning ? 'Pause timer' : 'Start timer')}
        title={timeLeft === 0 ? 'Reset timer' : (isRunning ? 'Pause timer' : 'Start timer')}
      >
        {timeLeft === 0 ? (
          <FiRotateCw size={24} className="text-white" />
        ) : (
          isRunning ? <FiPause className="text-white" size={24} /> : <FiPlay className="text-white" size={24} />
        )}
      </button>

      <button
        onClick={onSoundToggle}
        className={`
          flex items-center justify-center 
          w-12 h-12 sm:w-16 sm:h-16 rounded-full 
          ${isSoundEnabled 
            ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } 
          transition-colors
        `}
        aria-label={isSoundEnabled ? 'Disable sound notification' : 'Enable sound notification'}
        title={isSoundEnabled ? 'Disable sound notification' : 'Enable sound notification'}
      >
        {isSoundEnabled ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
      </button>

     <FontSizeButton
        onFontSizeChange={onFontSizeChange}
        defaultValue={defaultFontSize}
     />

      <button
        onClick={onFullscreenToggle}
        className="
          flex items-center justify-center 
          w-12 h-12 sm:w-16 sm:h-16 rounded-full 
          bg-gray-200 text-gray-700 hover:bg-gray-300 
          dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 
          transition-colors
        "
        aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
        title={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
      >
        {isFullscreen ? <FiMinimize size={24} /> : <FiMaximize size={24} />}
      </button>

      <button
        onClick={onSettingsOpen}
        className="
          flex items-center justify-center 
          w-12 h-12 sm:w-16 sm:h-16 rounded-full 
          bg-gray-200 text-gray-700 hover:bg-gray-300 
          dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 
          transition-colors
        "
        aria-label="Open timer settings"
        title="Timer settings"
      >
        <FiSettings size={24} />
      </button>

    </div>
  )
} 