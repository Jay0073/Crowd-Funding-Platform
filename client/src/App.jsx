import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import LandingPage from '@/Pages/LandingPage.jsx';
import AboutUs from '@/Pages/AboutUs.jsx';
import Navbar from '@/Components/NavBar.jsx';
import Footer from '@/Components/Footer.jsx';
import ExplorePage from '@/Pages/ExplorePage.jsx';
import FundraiserPage from '@/Pages/FundraiserPage.jsx';
import ScrollToTop from '@/Components/ScrollToTop.jsx';
import FundraiserForm from '@/Pages/FundraiserForm.jsx';
import NotFound from '@/Components/NotFound.jsx';
import UserProfile from '@/Pages/UserProfile.jsx';

function App() {

  return (
    <>
      <Navbar />   
        <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/donate/:id" element={<FundraiserPage />} />
              <Route path='/fundraisingform' element={<FundraiserForm />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
        <Footer />
    </>
  )
}

export default App
