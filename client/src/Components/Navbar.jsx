import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle2Icon, LogOut, Mail, Phone } from "lucide-react";
import AuthPopup from "./AuthPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-[15px] font-medium transition-all duration-100 hover:scale-105"
  >
    {children}
  </a>
);

const Button = ({
  variant = "default",
  children,
  className = "",
  onClick,
  ...props
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-blue-600 text-blue-50 hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-6 py-2.5 rounded-full font-semibold text-[15px] transition-all duration-200 transform hover:scale-105 active:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ProfilePopup = ({ user, onNavigate, onLogout }) => (
  <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50 border border-gray-100">
    <div className="space-y-4">
      <div className="space-y-3 border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-4">
          <UserCircle2Icon size={50} className="text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail size={16} />
            <span className="text-sm">{user?.email}</span>
          </div>
          {user?.mobile && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone size={16} />
              <span className="text-sm">{user?.mobile}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={onNavigate}
          className="w-full px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-lg transition-all"
        >
          View Profile
        </button>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg transition-all flex items-center space-x-2"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfilePopup(false);
    navigate("/");
    window.location.reload()
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowProfilePopup(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/fetchuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setError(error.message)
        console.error("Error fetching user:", error);
        localStorage.removeItem("token"); // Clear invalid token
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (showAuthPopup) {
      window.scrollTo(0, 0);
    }
  }, [showAuthPopup]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </div>
    );
  }

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
              <Button variant="primary" className="px-3 py-3">
                <a href="/fundraisingform">Start Fundraising</a>
              </Button>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                    onClick={() => setShowProfilePopup((prev) => !prev)}
                  >
                    <UserCircle2Icon size={35} className="text-gray-800 cursor-pointer" />
                  </button>

                  {showProfilePopup && (
                    <>
                      <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setShowProfilePopup(false)}
                      ></div>
                      <ProfilePopup
                        user={user}
                        onNavigate={handleProfileClick}
                        onLogout={handleLogout}
                      />
                    </>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthPopup(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
          {showAuthPopup && (
            <AuthPopup
              onClose={() => setShowAuthPopup(false)}
              returnTo={window.location.pathname}
            />
          )}

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
      </div>
    </nav>
  );
};

export default Navbar;
