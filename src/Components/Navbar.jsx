import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Name */}
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                                <span className="text-white text-[25px] font-bold">CF</span>
                            </div>
                        </div>
                        <div className="text-[30px] font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                            CrowdFund
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link
                            to="/campaigns"
                            className="text-gray-900 hover:text-yellow-500 dark:text-gray-700 dark:hover:text-yellow-400 transition-colors duration-300"
                            style={{ fontWeight: "600" , fontSize: "1.2rem"}}
                        >
                            Campaigns
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-900 hover:text-yellow-500 dark:text-gray-700 dark:hover:text-yellow-400 transition-colors duration-300"
                            style={{ fontWeight: "600" , fontSize: "1.2rem"}}
                        >
                            About Us
                        </Link>

                        {/* Login Button with Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsLoginHovered(true)}
                                onMouseLeave={() => setIsLoginHovered(false)}
                                onClick={() => setIsLoginClicked(!isLoginClicked)}
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 text-white font-medium 
                                                                                                transform transition-all duration-300 hover:scale-105 hover:shadow-lg 
                                                                                                active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                            >
                                Login
                                <ChevronDown size={24} className="inline-block ml-2" />
                            </button>

                            {/* Dropdown Menu */}
                            {(isLoginHovered || isLoginClicked) && (
                                <div
                                    className="absolute right-0 mt-2 w-56 rounded-xl bg-yellow-50 dark:bg-white-700 shadow-xl border border-gray-100 dark:border-blue-700 
                                                                                                        transform origin-top animate-dropdownEnter"
                                    onMouseEnter={() => setIsLoginHovered(true)}
                                    onMouseLeave={() => {
                                        setIsLoginHovered(false);
                                        setIsLoginClicked(false);
                                    }}
                                >
                                    <div className="p-2 space-y-1">
                                        <Link
                                            to="/donor-login"
                                            className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-800 hover:bg-yellow-100 dark:hover:bg-orange-200 
                                                                                                                        transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200 dark:bg-yellow-500">
                                                👤
                                            </span>
                                            <div>
                                                <div className="font-medium">Donor Login</div>
                                                <div className="text-xs text-gray-700 ">
                                                    For individual supporters
                                                </div>
                                            </div>
                                        </Link>

                                        <Link
                                            to="/org-login"
                                            className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-800 hover:bg-yellow-100 dark:hover:bg-orange-200 
                                                                                                                        transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-200 dark:bg-red-500">
                                                🏢
                                            </span>
                                            <div>
                                                <div className="font-medium">Organization Login</div>
                                                <div className="text-xs text-gray-700">
                                                    For campaign creators
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Add custom animation to tailwind
const style = document.createElement("style");
style.textContent = `
    @keyframes dropdownEnter {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    .animate-dropdownEnter {
        animation: dropdownEnter 0.2s ease-out forwards;
    }
`;
document.head.appendChild(style);

export default Navbar;
