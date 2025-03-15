import React from 'react';
import { Shield, Globe, CreditCard, Heart, Share2, Zap, Users, MessageCircle } from 'lucide-react';
import FeatureCard from './FeatureCard.jsx';

const Features = () => {
  const features = [
    {
      icon: CreditCard,
      title: "100% Free Platform",
      description: "No hidden fees or platform charges. Every penny donated goes directly to your cause, with only standard payment processing fees applied.",
      quote: "We believe in transparency and ensuring maximum impact for every donation made.",
      author: "- Our Promise"
    },
    {
      icon: Shield,
      title: "Secure Direct Transfers",
      description: "Funds are transferred directly to fundraisers with bank-level security and encryption, ensuring safe and immediate access to donations.",
      quote: "Your security is our top priority. Every transaction is protected.",
      author: "- Security Team"
    },
    {
      icon: Share2,
      title: "Enhanced Visibility",
      description: "Built-in social sharing tools and SEO optimization help your campaign reach a wider audience and gain more support.",
      quote: "Our campaign reached 10x more people than expected!",
      author: "- Sarah, Successful Fundraiser"
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Launch your fundraiser in minutes with our intuitive platform. No technical expertise required.",
      quote: "From idea to live campaign in just 5 minutes!",
      author: "- Michael, Community Organizer"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a supportive community of fundraisers and donors. Share experiences and get advice from successful campaigners.",
      quote: "The community support made all the difference.",
      author: "- Emma, Wildlife Conservation"
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to help you with any questions or concerns about your fundraiser.",
      quote: "Responsive and helpful support whenever needed.",
      author: "- David, Education Fund"
    }
  ];

  return (
    <div className="pt-0 pb-12 bg-gray-50">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-0">
          <div className="inline-flex items-center px-4 py-2 gap-2 rounded-full bg-blue-100 text-blue-600 mb-6">
            <Heart size={48} className="mr-2" />
            <span className="font-semibold text-5xl">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Empowering Your Cause with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Zero Platform Fees</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe in maximizing the impact of every donation. Our platform is designed to help you reach more donors and manage funds effectively, all while keeping 100% of the donations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-20 text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-xl">
            <Globe className="mx-auto mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">
              Trusted by Thousands Worldwide
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              "Our platform has helped raise over $10 million for causes across the globe, connecting passionate individuals with generous donors to make real change happen."
            </p>
            
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-100">Active Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">$10M+</div>
                <div className="text-blue-100">Funds Raised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-blue-100">Secure Transfers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
