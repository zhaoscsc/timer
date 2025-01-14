'use client'

import { useState, useEffect, useRef } from 'react'
import { IoText } from "react-icons/io5"
import { FontSizeControl } from '../FontSizeControl'

interface FontSizeButtonProps {
  onFontSizeChange: (size: number) => void
  defaultValue?: number
}

export function FontSizeButton({ onFontSizeChange, defaultValue = 100 }: FontSizeButtonProps) {
  const [showSlider, setShowSlider] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target as Node)) {
        setShowSlider(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setShowSlider(!showSlider)}
        className="
          flex items-center justify-center 
          w-16 h-12 sm:w-16 sm:h-16 rounded-full 
          bg-gray-200 text-gray-700 hover:bg-gray-300 
          dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 
          transition-colors
        "
        aria-label="Adjust font size"
        title="Font Size Change Button"
      >
        <IoText size={24} />
      </button>
      
      {showSlider && (
        <div 
          ref={sliderRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[200px] p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
        >
          <FontSizeControl
            defaultValue={defaultValue}
            onChange={onFontSizeChange}
          />
        </div>
      )}
    </div>
  )
}