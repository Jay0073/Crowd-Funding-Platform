import React from 'react';
import { 
  Users, 
  Target, 
  Heart, 
  TrendingUp,
  CheckCircle,
  Award
} from 'lucide-react';
import heroimg from '../assets/hero_img.png';
import donateimg from '../assets/donate.jpg';
import teammember1 from '../assets/teammember1.jpeg'
import teammember2 from '../assets/teammember2.jpeg'
import teammember3 from '../assets/teammember3.jpeg'
import Features from '../Components/Features.jsx';
import Testimonials from '../Components/Testimonials,jsx';

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { number: "100K+", label: "Fundraisers" },
      { number: "$50M+", label: "Funds Raised" },
      { number: "1M+", label: "Donors" },
      { number: "95%", label: "Success Rate" }
    ].map((stat, index) => (
      <div key={index} className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
        <div className="text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

const Mission = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        We believe everyone deserves the opportunity to create positive change. Our mission is to empower individuals and organizations to raise funds efficiently and transparently for causes that matter.
      </p>
      <ul className="space-y-4">
        {[
          "Empowering global change-makers",
          "Ensuring transparent fundraising",
          "Building trusted communities",
          "Making impact accessible"
        ].map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="text-blue-600" size={20} />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="relative">
      {/* Replace with your image */}
      <img 
        src={donateimg}
        alt="Our Mission"
        className="rounded-2xl shadow-xl w-2xl"
      />
      <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Award className="text-blue-600" size={24} />
          <div>
            <div className="font-semibold text-gray-900">Trusted Platform</div>
            <div className="text-sm text-gray-600">Verified by thousands</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Team = () => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
      Our dedicated team works tirelessly to ensure your fundraising journey is smooth, successful, and impactful.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { name: "Emma Wilson", role: "CEO & Founder", teammember: teammember1 },
        { name: "Michael Chen", role: "Head of Operations", teammember: teammember2 },
        { name: "Sarah Johnson", role: "Community Director", teammember: teammember3 }
      ].map((member, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          {/* Replace with your team member images */}
          <img 
            src={member.teammember} 
            alt={member.name}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
);

const Values = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        icon: Heart,
        title: "Community First",
        description: "We prioritize building strong, supportive communities around causes."
      },
      {
        icon: Target,
        title: "Transparency",
        description: "Clear, honest, and open communication in all our operations."
      },
      {
        icon: TrendingUp,
        title: "Impact Driven",
        description: "Focused on creating measurable positive change in society."
      }
    ].map((value, index) => (
      <div key={index} className="bg-white rounded-xl shadow-lg p-8">
        <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600 mb-4">
          <value.icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
        <p className="text-gray-600">{value.description}</p>
      </div>
    ))}
  </div>
);

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-64" style={{backgroundImage: `url(${heroimg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-gray-900 font-bold mb-6">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> CrowdFund</span></h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            We're on a mission to make fundraising accessible, transparent, and impactful for everyone.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6">
        <div className="space-y-24">
          {/* Stats Section */}
          <Stats />

          {/* Mission Section */}
          <Mission />

          {/* Values Section */}
          <Values />

          {/* Features Section */}
          <Features />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Make a Difference?
            </h2>
            <button className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg transition-all duration-200 hover:bg-blue-700 hover:scale-105">
              Start Fundraising Now
            </button>
          </div>
          
          {/* Team Section */}
          <Team />

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
