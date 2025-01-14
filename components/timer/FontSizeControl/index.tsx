'use client'

import { Slider } from "@/components/ui/slider"
import { useState } from "react"

interface FontSizeControlProps {
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  className?: string
}

export function FontSizeControl({
  defaultValue = 100,
  min = 50,
  max = 200,
  step = 10,
  onChange,
  className = ''
}: FontSizeControlProps) {
  const [value, setValue] = useState([defaultValue])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm opacity-70">A</span>
      <Slider
        defaultValue={value}
        max={max}
        min={min}
        step={step}
        onValueChange={(value) => {
          setValue(value)
          onChange(value[0])
        }}
      />
      <span className="text-lg opacity-70">A</span>
    </div>
  )
} 