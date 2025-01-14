'use client'


import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TimeStyle, FontColor } from '@/types/timer'
import '@/styles/digital-display.css'

interface TimerDisplayProps {
  timeLeft: number
  isEditing: boolean
  isFullscreen: boolean
  isRunning: boolean
  timeStyle?: TimeStyle
  fontColor?: FontColor
  onEditStart: () => void
  onEditComplete: (value: string) => void
  onEditCancel: () => void
  fontSize?: number
}

export function TimerDisplay({
  timeLeft,
  isEditing,
  isFullscreen,
  isRunning,
  timeStyle = 'MM:SS',
  fontColor = 'default',
  onEditStart,
  onEditComplete,
  onEditCancel,
  fontSize = 100
}: TimerDisplayProps) {
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth
    }
    return true  // 默认竖屏
  })

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    
    // 初始化
    handleResize()
    
    // 监听屏幕旋转和窗口大小变化
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  const formatTimeString = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeDisplay = (seconds: number) => {
    const baseTime = formatTimeString(seconds)
    
    if (timeStyle === 'MM:SS:SSS') {
      const ms = Math.floor((seconds % 1) * 1000);
      const msStr = ms.toString().padStart(3, '0');
      
      return isPortrait ? (
        <div className="flex flex-col items-center leading-none">
          <span className="digital-display" style={{ fontSize: `${fontSize}%` }}>{baseTime}</span>
          <span className="digital-display text-[0.6em] opacity-80 mt-2" style={{ fontSize: `${fontSize}%` }}>.{msStr}</span>
        </div>
      ) : (
        <div className="flex items-baseline justify-center">
          <span className="digital-display" style={{ fontSize: `${fontSize}%` }}>{baseTime}</span>
          <span className="digital-display text-[0.8em] opacity-80 ml-1" style={{ fontSize: `${fontSize}%` }}>.{msStr}</span>
        </div>
      )
    }
    
    return <span className="digital-display" style={{ fontSize: `${fontSize}%` }}>{baseTime}</span>
  }

  const colorClasses = {
    default: 'text-gray-800 dark:text-gray-100',
    blue: 'text-blue-500 dark:text-blue-400',
    green: 'text-emerald-500 dark:text-emerald-400',
    purple: 'text-purple-500 dark:text-purple-400',
    rose: 'text-rose-500 dark:text-rose-400',
    amber: 'text-amber-500 dark:text-amber-400',
    teal: 'text-teal-500 dark:text-teal-400'
  }

  return (
    <motion.div
      // style={{ fontSize: `${fontSize}%` }}
      onClick={() => !isRunning && onEditStart()}
      className={`
        font-bold font-mono tracking-tight cursor-pointer
        ${colorClasses[fontColor]}
        ${isFullscreen 
          ? `${timeStyle === 'MM:SS:SSS'
              ? isPortrait
                ? 'text-[6rem] xs:text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem]'
                : 'text-[4rem] xs:text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]'
              : 'text-[8rem] xs:text-[10rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]'
            } mb-2`
          : `${timeStyle === 'MM:SS:SSS'
              ? isPortrait
                ? 'text-6xl md:text-7xl lg:text-8xl'
                : 'text-5xl md:text-6xl lg:text-7xl'
              : 'text-6xl md:text-7xl lg:text-8xl'
            } mb-2`
        }
      `}
      key={timeLeft}
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2
      }}
    >
      {isEditing ? (
        <input
          type="text"
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue={formatTimeString(timeLeft)}
          className="w-full bg-transparent text-center outline-none digital-display"
          onBlur={(e) => onEditComplete(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEditComplete(e.currentTarget.value)
            }
            if (e.key === 'Escape') {
              onEditCancel()
            }
          }}
          autoFocus
        />
      ) : (
        formatTimeDisplay(timeLeft)
      )}
    </motion.div>
  )
} 