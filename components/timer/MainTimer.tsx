'use client'


import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuickPresets } from './QuickPresets'
import { TimerDisplay } from './TimerDisplay'
import { TimerControls } from './TimerControls'
import { TimerStyleSettings, DEFAULT_SETTINGS, storage } from '@/types/timer'
import {TimerSettings} from "@/components/timer/TimerSettings";
import {BackgroundBeams} from "@/components/ui/background-beams";
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";
import {BackgroundLines} from "@/components/ui/background-lines";
import {TimeUnit, timeUnits} from "@/config/timeUnits";

interface MainTimerProps {
  timeValue: number
  isRunning: boolean
  onToggle: () => void
  onMinutesChange: (minutes: number) => void
  showPresets?: boolean
  lng: string
  timeUnit?: TimeUnit
}

export function MainTimer({
  timeValue,
  isRunning, 
  onToggle, 
  onMinutesChange, 
  showPresets = true, 
  lng ,
  timeUnit = 'minutes'
}: MainTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeUnits[timeUnit].conversion.toSeconds(timeValue) )
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  let mouseTimer: NodeJS.Timeout
  const [isFlipped, setIsFlipped] = useState(false)
  const [settings, setSettings] = useState<TimerStyleSettings>(DEFAULT_SETTINGS)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  const [isHoveringControls, setIsHoveringControls] = useState(false)
  const controlsVisibleTime = 3000;
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('fontSize')) || 100
    }
    return 100
  })

  useEffect(() => {
    setSettings(storage.getSettings());
    setIsSoundEnabled(storage.getSoundEnabled());
  }, []);


  const handleMouseMove = () => {
    setIsControlsVisible(true)
    clearTimeout(mouseTimer)
    
    if (isFullscreen && !isHoveringControls) {
      mouseTimer = setTimeout(() => {
        setIsControlsVisible(false)
      }, controlsVisibleTime)
    }
  }

  const handleControlsHover = (hovering: boolean) => {
    setIsHoveringControls(hovering)
    clearTimeout(mouseTimer)
    
    if (!hovering && isFullscreen) {
      mouseTimer = setTimeout(() => {
        setIsControlsVisible(false)
      }, controlsVisibleTime)
    }
  }

  const handleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        const timerCard = document.getElementById('timer-card')
        if (timerCard) {
          await timerCard.requestFullscreen()
          setIsFullscreen(true)
          setTimeout(() => {
            setIsControlsVisible(false)
          }, controlsVisibleTime)
        }
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err)
      }
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
      setIsControlsVisible(true)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!document.fullscreenElement) {
        setIsControlsVisible(true)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      clearTimeout(mouseTimer)
    }
  }, [])


  const handleReset = (newMinutes?: number) => {
    setTimeLeft((newMinutes || timeValue) * 60)
    if (isRunning) onToggle()
  }
  const handlePresetSelect = (newMinutes: number) => {
    onMinutesChange(newMinutes)
    handleReset(newMinutes)
  }


  useEffect(() => {
    audioRef.current = new Audio(`/sounds/${settings.alertSound}.mp3`)
  }, [settings.alertSound])

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      const newState = !prev;
      storage.saveSoundEnabled(newState);
      
      if (!newState && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      return newState;
    });
  };


  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1 && isSoundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(err => console.error('Error playing sound:', err))
          }
          if (settings.timeStyle === 'MM:SS:SSS') {
            const timeInMs = Math.round(prev * 1000)
            return (timeInMs - 10) / 1000
          } else {
            return prev - 1
          }
        })
      }, settings.timeStyle === 'MM:SS:SSS' ? 10 : 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isRunning, timeLeft, isSoundEnabled, settings.timeStyle])


  const handleTimeInput = (input: string) => {
    const [minutes, seconds] = input.split(':').map(Number)
    if (isNaN(minutes) || isNaN(seconds)) return
    if (minutes < 0 || minutes > 9999 || seconds < 0 || seconds > 59) return
    
    const totalSeconds = minutes * 60 + seconds
    setTimeLeft(totalSeconds)
    onMinutesChange(Math.ceil(totalSeconds / 60))
  }

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if (isRunning && 'wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen')
          console.log('Screen Wake Lock is active')
        }
      } catch (err) {
        console.error('Failed to request wake lock:', err)
      }
    }

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release()
          wakeLockRef.current = null
          console.log('Screen Wake Lock is released')
        } catch (err) {
          console.error('Failed to release wake lock:', err)
        }
      }
    }

    if (isRunning) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    // 清理函数
    return () => {
      releaseWakeLock()
    }
  }, [isRunning])


  const handleFontSizeChange = (size: number) => {
    setFontSize(size)
    localStorage.setItem('fontSize', size.toString())
  }

  return (
    <div
      id="timer-card"
      className={`
        relative
        ${isFullscreen 
          ? 'fixed inset-0 rounded-none flex flex-col items-center justify-center bg-white dark:bg-gray-900 overflow-hidden'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-2xl-dark p-8 md:p-12'
        }
      `}
      onMouseMove={handleMouseMove}
    >
      {settings.backgroundStyle === 'beams' && (
        <BackgroundBeams 
          className="opacity-60 dark:opacity-40"
        />
      )}
      {settings.backgroundStyle === 'beams-collision' && (
        <BackgroundBeamsWithCollision 
          className="absolute inset-0 opacity-60 dark:opacity-40"
        >
          <div className="absolute inset-0 pointer-events-none" />
        </BackgroundBeamsWithCollision>
      )}
      {settings.backgroundStyle === 'lines' && (
        <BackgroundLines 
          className="absolute inset-0 opacity-60 dark:opacity-40"
        >
          <div className="absolute inset-0 pointer-events-none" />
        </BackgroundLines>
      )}

      <div className="relative z-10">
        <div className={`${isFlipped ? 'hidden' : 'block'}`}>
          <div className="relative flex flex-col items-center">
            <TimerDisplay
              timeLeft={timeLeft}
              isEditing={isEditing}
              isFullscreen={isFullscreen}
              isRunning={isRunning}
              timeStyle={settings.timeStyle}
              fontColor={settings.fontColor}
              fontSize={fontSize}
              onEditStart={() => setIsEditing(true)}
              onEditComplete={(value) => {
                handleTimeInput(value)
                setIsEditing(false)
              }}
              onEditCancel={() => setIsEditing(false)}
            />

            <AnimatePresence>
              {(isControlsVisible || !isFullscreen) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    ${isFullscreen 
                      ? 'absolute top-full left-0 right-0 mt-2 sm:mt-6'
                      : 'relative w-full'
                    }
                  `}
                >
                  <TimerControls
                    isRunning={isRunning}
                    timeLeft={timeLeft}
                    isSoundEnabled={isSoundEnabled}
                    isFullscreen={isFullscreen}
                    onToggle={() => {
                      if (timeLeft === 0) {
                        setTimeLeft(timeValue * 60)
                        if (isRunning) {
                          onToggle()
                        }
                      } else {
                        onToggle()
                      }
                    }}
                    onSoundToggle={toggleSound}
                    onFullscreenToggle={handleFullscreen}
                    onSettingsOpen={() => setIsFlipped(true)}
                    onFontSizeChange={handleFontSizeChange}
                    defaultFontSize={fontSize}
                    onMouseEnter={() => handleControlsHover(true)}
                    onMouseLeave={() => handleControlsHover(false)}
                  />

                  {showPresets && (
                    <QuickPresets
                      onSelect={handlePresetSelect}
                      selectedMinutes={timeValue}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={`${!isFlipped ? 'hidden' : 'block'}`}>
          <TimerSettings 
            lng={lng}
            onClose={() => setIsFlipped(false)}
            initialSettings={settings}
            onSave={(newSettings) => {
              setSettings(newSettings);
              storage.saveSettings(newSettings);
              if (newSettings.timeStyle === 'MM:SS' && timeLeft % 1 !== 0) {
                setTimeLeft(Math.ceil(timeLeft));
              }
              setIsFlipped(false);
            }}
          />
        </div>
      </div>
    </div>
  )
} 