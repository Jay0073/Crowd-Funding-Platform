import React from 'react';
import { Link } from 'react-router-dom';
import hero_img from '../assets/hero_img.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img src={hero_img} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-red-400/90 z-10" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
        <div className="text-center space-y-8 animate-contentFade">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="block">Make a Difference</span>
            <span className="block mt-2 text-yellow-200">One Donation at a Time</span>
          </h1>

          {/* Inspiring Quote */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
            "The greatest use of life is to spend it for something that will outlast it. 
            Join us in creating lasting impact through community-driven fundraising."
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
            {[
              { value: '10K+', label: 'Donors' },
              { value: '$2M+', label: 'Raised' },
              { value: '500+', label: 'Campaigns' },
              { value: '50+', label: 'Communities' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-yellow-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              to="/donate"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full 
                        overflow-hidden bg-gradient-to-r from-yellow-400 to-red-400 hover:from-yellow-500 hover:to-red-500
                        transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-300 to-red-300 opacity-0 
                            group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Donate Now
                <svg 
                  className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              to="/campaigns"
              className="px-8 py-3 font-bold text-yellow-100 rounded-full border-2 border-yellow-300/30
                        hover:bg-white/10 transform transition-all duration-300 hover:scale-105
                        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              View Campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom animations to tailwind
const style = document.createElement('style');
style.textContent = `
  @keyframes contentFade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-contentFade {
    animation: contentFade 1s ease-out forwards;
  }

  .animate-scrollIndicator {
    animation: scrollIndicator 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default Hero;
