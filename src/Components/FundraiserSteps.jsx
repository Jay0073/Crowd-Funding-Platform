import React from 'react';
import { ClipboardEdit, Share2, Banknote, ArrowRight } from 'lucide-react';
import video from '../assets/video.mp4'

const StepCard = ({ number, icon: Icon, title, description }) => (
  <div className="flex gap-6 group mb-10">
    {/* Step Number */}
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {number}
      </div>
      {number !== 3 && (
        <div className="absolute top-12 left-1/2 w-px h-24 bg-blue-100 -translate-x-1/2" />
      )}
    </div>
    
    {/* Step Content */}
    <div className="flex-1 pb-8">
      <div className="flex gap-3 items-center p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-all duration-300">
        <Icon size={28} />
      <h3 className="text-[20px] font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const FundraiserSteps = () => {
  const steps = [
    {
      icon: ClipboardEdit,
      title: "Start your fundraiser",
      description: "It takes just 2 minutes. Share details about you and the ones you're raising funds for."
    },
    {
      icon: Share2,
      title: "Share your fundraiser",
      description: "Share it with friends and family. Watch support pour in via social media from the dashboard."
    },
    {
      icon: Banknote,
      title: "Withdraw Funds",
      description: "Withdraw funds easily to your bank account in just 5 minutes—fast and hassle-free!"
    }
  ];

  return (
    <div className="pt-4 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900">
            Start a Fundraiser in 
            <span className="text-blue-600"> Three Simple Steps</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Steps Section */}
          <div>
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                number={index + 1}
                {...step}
              />
            ))}

            {/* CTA Button */}
            <div className="mt-8">
              <a href="/fundraisingform">
              <button className="inline-flex text-[20px] items-center px-6 py-3 rounded-full bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-700 ml-10">
                Start Fundraising Now
                <ArrowRight className="ml-2" size={28} />
              </button>
              </a>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative rounded-xl overflow-hidden shadow-lg max-w-sm mx-auto lg:mx-0">
            <div className="relative" style={{ width: '384px', height: '680px' }}> 
              <video
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                poster="https://placehold.co/1080x1920?text=Fundraising+Video"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserSteps;
