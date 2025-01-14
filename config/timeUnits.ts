export type TimeUnit = 'seconds' | 'minutes' | 'hours'

export interface TimeUnitConfig {
  unit: TimeUnit
  baseInSeconds: number
  popularDurations: number[]
  suggestions: {
    step: number
    count: number
  }
  conversion: {
    toSeconds: (value: number) => number
    fromSeconds: (seconds: number) => number
  }
}

export const timeUnits: Record<TimeUnit, TimeUnitConfig> = {
  seconds: {
    unit: 'seconds',
    baseInSeconds: 1,
    popularDurations: [30, 45, 60, 90, 120],
    suggestions: {
      step: 15,
      count: 3
    },
    conversion: {
      toSeconds: (value) => value,
      fromSeconds: (seconds) => seconds
    }
  },
  minutes: {
    unit: 'minutes',
    baseInSeconds: 60,
    popularDurations: [5, 10, 15, 20, 30],
    suggestions: {
      step: 5,
      count: 3
    },
    conversion: {
      toSeconds: (value) => value * 60,
      fromSeconds: (seconds) => seconds / 60
    }
  },
  hours: {
    unit: 'hours',
    baseInSeconds: 3600,
    popularDurations: [1, 2, 3, 4, 6],
    suggestions: {
      step: 1,
      count: 3
    },
    conversion: {
      toSeconds: (value) => value * 3600,
      fromSeconds: (seconds) => seconds / 3600
    }
  }
} 