import React from 'react'
import Navbar from '@/Components/NavBar.jsx'
import Hero from '@/Components/Hero.jsx'
import TrendingFundraisers from '@/Components/TrendingFundraisers.jsx'
import Features from '@/Components/Features.jsx'
import FundraiserSteps from '@/Components/FundraiserSteps.jsx'
import FAQ from '@/Components/FAQ.jsx'
import Testimonials from '@/Components/Testimonials.jsx'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
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
