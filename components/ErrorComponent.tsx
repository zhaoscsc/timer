export function ErrorComponent({ lng }: { lng: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Invalid Timer Duration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Please enter a valid duration between 1 and 120 minutes.
        </p>
        <a
          href={`/${lng}`}
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
} 