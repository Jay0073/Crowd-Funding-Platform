import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AuthPopup from "./AuthPopup";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-5 py-2 text-[15px] font-medium transition-all duration-200 hover:scale-105"
  >
    {children}
  </a>
);

const Button = ({ variant = "default", children, className = "", onClick, ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-blue-600 text-blue-50 hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full font-semibold text-[15px] transition-all duration-200 transform hover:scale-105 active:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showAuthPopup) {
      window.scrollTo(0, 0);
    }
  }, [showAuthPopup]);

  useEffect(() => {
    // Function to prevent scrolling
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event bubbling
      return false;
    };

    if (showAuthPopup) {
      // Add event listeners to prevent scrolling
      window.addEventListener("wheel", preventScroll, { passive: false }); // Modern browsers
      window.addEventListener("touchmove", preventScroll, { passive: false }); // For touch devices
      document.body.style.overflow = "hidden"; // fallback for some cases
    } else {
      // Remove event listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "unset";
    }

    // Cleanup function to remove listeners when component unmounts or state changes
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "unset";
    };
  }, [showAuthPopup]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">CF</span>
            </div>
            <div className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CrowdFund
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/explore">
              <span className="text-[20px] font-semibold">
                Browse Fundraisers
              </span>
            </NavLink>
            <NavLink href="/aboutus">
              <span className="text-[20px] font-semibold">About Us</span>
            </NavLink>
            <div className="pl-4 flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAuthPopup(true)}>
                  Login
              </Button>
              <Button variant="primary" style={{color:'white'}}><NavLink href='/fundraisingform' >Start Fundraising</NavLink></Button>
            </div>
          </div>
          {showAuthPopup && (
            <AuthPopup
              onClose={() => {
                setShowAuthPopup(false);
              }}
              returnTo={window.location.pathname}
            />
          )}

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
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2 bg-white rounded-lg shadow-lg mb-4">
            <a
              href="/explore"
              className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Fundraisers
            </a>
            <a
              href="/aboutus"
              className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <div className="px-4 py-2.5 space-y-2">
              <Button variant="outline" onClick={() => setShowAuthPopup(true)}>
                Login
              </Button>

              <Button variant="primary" className="w-full">
                Start Fundraising
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
