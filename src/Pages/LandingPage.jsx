import React from 'react'
import Navbar from '../Components/NavBar'
import Hero from '../Components/Hero'
import TrendingFundraisers from '../Components/TrendingFundraisers'
import Features from '../Components/Features'
import FundraiserSteps from '../Components/FundraiserSteps'
import FAQ from '../Components/FAQ'
import Testimonials from '../Components/Testimonials'

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
