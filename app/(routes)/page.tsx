import { Features } from '@/components/Landing/features'
import { Hero } from '@/components/Landing/hero'
import { Navbar } from '@/components/Landing/navbar'
import React from 'react'

const page = () => {
  return (
    <main>
    <Navbar />
    <Hero />
    <Features />
  </main>
  )
}

export default page
