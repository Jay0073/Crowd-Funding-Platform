import React from 'react';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Heart,
  ExternalLink,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-700 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Crowdfund</h3>
            <p className="text-blue-100 leading-relaxed">
              Empowering individuals to raise funds for their causes and make a difference in the world. Every donation counts, every cause matters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-200" />
                <a href="tel:+1234567890" className="text-blue-100 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-200" />
                <a href="mailto:support@crowdfund.com" className="text-blue-100 hover:text-white transition-colors">
                  support@crowdfund.com
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Have Questions?</h5>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                Send us a message
              </button>
            </div>
          </div>

          {/* Newsletter & Quote */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full bg-amber-50 text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-blue-800 px-4 py-2 rounded-r-full hover:bg-blue-700 transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>
            <div className="mt-8 p-6 bg-white rounded-xl">
              <p className="text-[23px] font-semibold italic text-blue-900">
                "Start your crowdfunding journey with Crowdfund"
              </p>
              <div className="mt-4 flex items-center gap-2 text-gray-800">
                <Heart size={16} />
                <span className="text-sm">Join thousands of successful fundraisers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-blue-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-100 text-sm">
              © {currentYear} Crowdfund. All rights reserved.
            </div>
            <div className="flex gap-8 text-sm text-blue-100">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
