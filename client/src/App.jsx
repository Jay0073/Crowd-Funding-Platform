import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import ExplorePage from './Pages/ExplorePage';
import FundraiserPage from './Pages/FundraiserPage';
import ScrollToTop from './Components/ScrollToTop';
import FundraiserForm from './Pages/FundraiserForm';
import { Rotate3D } from 'lucide-react';
import NotFound from './Components/NotFound';
import UserProfile from './Pages/UserProfile';

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
