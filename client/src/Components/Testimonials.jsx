import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import img1 from '../assets/testimonyImg1.jpeg';
import img2 from '../assets/testimonyImg2.jpeg';
import img3 from '../assets/testimonyImg3.jpeg';


const TestimonialCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
    <div className="flex flex-col md:flex-row h-[300px]"> {/* Reduced height */}
      {/* Image Section - Reduced width */}
      <div className="md:w-1/3 relative">
        <img 
          src={data.image} 
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content Section - Increased width for better text display */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          {/* Quote Icon */}
          <div className="mb-4">
            <Quote className="text-blue-600" size={24} />
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
            {data.testimonial}
          </p>

          {/* Success Stats - Made more compact */}
          <div className="flex gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg px-4 py-2">
            <div>
              <h3 className="font-semibold text-gray-900">{data.name}</h3>
              <p className="text-sm text-gray-600">{data.location}</p>
            </div>
            <p className="outline rounded-2xl justify-self-center my-2 py-1 px-2 text-sm text-blue-600">{data.causeType}</p>
          </div>
            <div className="bg-blue-50 rounded-lg px-4 py-2">
              <div className="text-blue-600 font-semibold">
                ${data.amountRaised.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Amount Raised</div>
            </div>
            <div className="bg-blue-50 rounded-lg px-4 py-2">
              <div className="text-blue-600 font-semibold">
                {data.supporters.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Supporters</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      name: "Sarah Khan",
      location: "New Delhi, India",
      causeType: "Medical Emergency",
      image: img2,
      testimonial: "When my daughter needed urgent medical treatment, I didn't know where to turn. Starting a fundraiser on this platform changed everything. The support from the community was overwhelming, and the platform made it incredibly easy to reach out to potential donors. Within weeks, we raised enough for her treatment.",
      amountRaised: 450,
      supporters: 384
    },
    {
      name: "Ram Chandra",
      location: "Chennai, TamilNadu",
      causeType: "Education",
      image: img1,
      testimonial: "As an educator, I dreamed of providing underprivileged students with access to technology. Through this platform, we not only raised funds but built a community of supporters who shared our vision. The social sharing tools helped us reach donors worldwide.",
      amountRaised: 7500,
      supporters: 629
    },
    {
      name: "Ali Bada",
      location: "Ahmedabad, Gujarat",
      causeType: "Animal Shelter",
      image: img3,
      testimonial: "Running an animal shelter during the pandemic was challenging. This platform became our lifeline. The intuitive interface made it simple to share our story and updates about the animals. The zero platform fee meant every donation counted more.",
      amountRaised: 620,
      supporters: 289
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="py-2 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - More compact */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-900 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Success</span> Stories
          </h2>
          <p className="text-gray-600">
            Hear from our community of successful fundraisers
          </p>
        </div>

        {/* Carousel Section */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <div className="px-4">
                      <TestimonialCard data={testimonial} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 h-2 bg-blue-600' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
