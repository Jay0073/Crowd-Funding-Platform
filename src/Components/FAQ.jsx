import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQCard = ({ question, answer, isOpen, onClick }) => (
  <div 
    className="bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-blue-100 transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <ChevronDown 
          className={`text-blue-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`} 
          size={20} 
        />
      </div>
      
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start a fundraiser?",
      answer: "Starting a fundraiser is simple and takes only 2 minutes. Click on 'Start Fundraising Now', fill in basic details about your cause, add photos or videos, set your fundraising goal, and share your story. Our platform guides you through each step to ensure your fundraiser is compelling and effective."
    },
    {
      question: "Are there any platform fees?",
      answer: "No, our platform is completely free to use. We don't charge any platform fees on donations. The only charges that apply are standard payment processing fees from payment providers, which are minimal and transparent. This means more of your donations go directly to your cause."
    },
    {
      question: "How quickly can I withdraw funds?",
      answer: "You can withdraw funds directly to your bank account within 5 minutes of receiving donations. Our quick withdrawal process ensures you have immediate access to the funds when you need them. The process is secure and hassle-free."
    },
    {
      question: "Is my donation information secure?",
      answer: "Yes, we take security very seriously. All payment information is encrypted using bank-level security protocols. We never store sensitive payment details on our servers. Our platform complies with all relevant data protection regulations to ensure your information is safe."
    },
    {
      question: "Can I share my fundraiser on social media?",
      answer: "Absolutely! You can easily share your fundraiser on all major social media platforms directly from your dashboard. We provide ready-to-use sharing buttons for Facebook, Twitter, WhatsApp, Instagram, and more. You can also copy your fundraiser link to share via email or messaging apps."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 customer support through multiple channels. You can reach us via email, chat, or phone. Our support team is trained to help you with technical issues, fundraising advice, and any questions about using the platform. We also provide extensive fundraising resources and guides."
    }
  ];

  return (
    <div className="pt-18 pb-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about starting your fundraiser
          </p>
        </div>

        {/* FAQ Cards Grid */}
        <div className="grid gap-2">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
