export const TIMER_PRESETS = {
  seconds: [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 90],
  minutes: [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 90],
  hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 24, 48, 72]
} as const

export const getNearbyMinutes = (currentMinutes: number): number[] => {
  const firstSuggestion = Math.ceil((currentMinutes + 1) / 5) * 5
  
  return Array.from(
    { length: 15 },
    (_, i) => firstSuggestion + i * 5
  )
} 