import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {

  return (
    <>
      <Navbar />    
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </Router>
        <Footer />
    </>
  )
}

export default App
