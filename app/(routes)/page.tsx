import { Features } from '@/components/Landing/features'
import FeatureSection from '@/components/Landing/featuresection'
import Footer from '@/components/Landing/footer'
import { Hero } from '@/components/Landing/hero'
import { Navbar } from '@/components/Landing/navbar'
import PricingSection from '@/components/Landing/pricingSection'
import React from 'react'

const page = () => {
  return (
    <main>
    <Navbar />
    <Hero />
    <Features />
    <FeatureSection />
    <PricingSection />
    <Footer />

  </main>
  )
}

export default page
