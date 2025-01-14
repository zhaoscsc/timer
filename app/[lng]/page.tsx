// app/[lng]/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { Footer } from '@/components/layout/Footer'
import {FeaturesSection} from "@/components/sections/FeaturesSection";

export default async function HomePage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Main Timer */}
      <HeroSection lng={lng} />

      {/* Features Section */}
      <FeaturesSection lng={lng} />

      <Footer lng={lng} />

    </main>
  )
}