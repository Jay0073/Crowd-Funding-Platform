import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-5 py-2 text-[15px] font-medium transition-all duration-200 hover:scale-105"
  >
    {children}
  </a>
);

const Button = ({ variant = 'default', children, className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-full font-semibold text-[15px] transition-all duration-200 transform hover:scale-105 active:scale-100 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">CF</span>
            </div>
            <span className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CrowdFund
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/campaigns"><span className='text-[20px] font-semibold'>All Campaigns</span></NavLink>
            <NavLink href="/aboutus"><span className='text-[20px] font-semibold'>About Us</span></NavLink>
            <div className="pl-4 flex items-center space-x-3">
              <Button variant="outline">Login</Button>
              <Button variant="primary">Start Campaign</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-2 bg-white rounded-lg shadow-lg mb-4">
            <a
              href="/campaigns"
              className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              All Campaigns
            </a>
            <a
              href="/about"
              className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <div className="px-4 py-2.5 space-y-2">
              <Button variant="outline" className="w-full">Login</Button>
              <Button variant="primary" className="w-full">Start Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
