import React from 'react'
import Hero from '@/Components/Hero.jsx'
import TrendingFundraisers from '@/Components/TrendingFundraisers.jsx'
import Features from '@/Components/Features.jsx'
import FundraiserSteps from '@/Components/FundraiserSteps.jsx'
import FAQ from '@/Components/FAQ.jsx'
import Testimonials from '@/Components/Testimonials.jsx'

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <TrendingFundraisers />
      <Features />
      <FundraiserSteps />
      <Testimonials />
      <FAQ />
    </div>
  )
}

export default LandingPage
