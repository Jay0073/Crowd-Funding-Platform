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

function App() {

  return (
    <>
      <Navbar />    
      <Router>
        <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/donate/:id" element={<FundraiserPage />} />
              <Route path='/fundraisingform' element={<FundraiserForm />} />
            </Routes>
        </Router>
        <Footer />
    </>
  )
}

export default App
