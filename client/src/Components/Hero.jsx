import React from 'react';
import { ArrowRight, Users, TrendingUp, Globe, } from 'lucide-react';
import children from '../assets/children.webp';

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl">
    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
      <Icon size={24} className="text-blue-600" />
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-5 overflow-hidden bg-gradient-to-b from-yellow-300 to-yellow-100 ">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Make a difference with</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  crowdfunding that works
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 leading-relaxed">
                Launch your campaign today and turn your cause into a movement. 
                Join thousands making real impact through collective giving.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href='/fundraisingform'>
                <button className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:bg-blue-700 active:scale-100 flex items-center gap-2">
                  Start Fundraising
                  <ArrowRight size={20} />
                </button>
                </a>
                <a href='/aboutus'>
                <button className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg transition-all duration-200 hover:border-blue-600 hover:text-blue-600">
                  Learn More
                </button>
                </a>
              </div>
            </div>

            {/* Right Column - Image & Stats */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src={children} 
                  alt="Crowdfunding Success" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -left-12 top-1/4 transform -translate-y-1/2">
                <StatCard 
                  icon={Users} 
                  value="50K+" 
                  label="Active Users" 
                />
              </div>
              <div className="absolute -right-8 top-2/3">
                <StatCard 
                  icon={TrendingUp} 
                  value="$10M+" 
                  label="Funds Raised" 
                />
              </div>
              <div className="absolute left-1/4 -bottom-8">
                <StatCard 
                  icon={Globe} 
                  value="150+" 
                  label="Countries" 
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-20">
            <p className="text-center text-gray-600 text-sm mb-6">Trusted by leading organizations worldwide</p>
            <div className="flex justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8">
                  <img
                    src={`https://placehold.co/120x30?text=LOGO${i}`}
                    alt={`Partner ${i}`}
                    className="h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
