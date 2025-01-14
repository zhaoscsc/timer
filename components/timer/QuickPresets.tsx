interface QuickPresetsProps {
  onSelect: (minutes: number) => void
  selectedMinutes: number
}

export function QuickPresets({ onSelect, selectedMinutes }: QuickPresetsProps) {
  const presets = [
    // { minutes: 1, label: '1m' },
    { minutes: 5, label: '5m' },
    { minutes: 10, label: '10m' },
    { minutes: 15, label: '15m' },
    // { minutes: 20, label: '20m' },
    // { minutes: 30, label: '30m' },
    // { minutes: 60, label: '60m' },
  ]

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-3">
        {presets.map(({ minutes, label }) => (
          <button
            key={minutes}
            onClick={() => onSelect(minutes)}
            className={`
              px-6 py-2 rounded-full font-medium transition-all
              ${selectedMinutes === minutes
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
} 