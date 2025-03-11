import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';
import FundraiserCard from "./FundraiserCard";

const TrendingFundraisers = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fundraisers, setFundraisers] = useState([]);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetchfundraises");
        setFundraisers(response.data);
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchFundraisers();
  }, []);

  useEffect(() => {
    let intervalId;
    if (!isHovered && !isAnimating) {
      intervalId = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, isAnimating]);

  const getVisibleSlides = () => {
    const slides = [...fundraisers];
    const result = [];
    for (let i = activeIndex - 1; i <= activeIndex + 1; i++) {
      const normalizedIndex = ((i % slides.length) + slides.length) % slides.length;
      result.push({ ...slides[normalizedIndex], position: i - activeIndex });
    }
    return result;
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % fundraisers.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + fundraisers.length) % fundraisers.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <div className="pt-0 pb-18 bg-gradient-to-b from-yellow-100 to-white">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Fundraisers</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Support these popular causes that are making a significant impact
        </p>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-white disabled:opacity-50"
        >
          <ChevronLeft size={52} color="blue" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-white disabled:opacity-50"
        >
          <ChevronRight size={52} color="blue" />
        </button>

        {/* Carousel */}
        <div 
          className="relative h-[600px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute w-full h-full">
            {getVisibleSlides().map((slide, index) => (
              <div
                key={slide.id}
                className="absolute top-1/2 left-1/2 w-[400px] transition-all duration-700 ease-out"
                style={{
                  transform: `translate(${slide.position * 120 - 50}%, -50%) 
                             scale(${slide.position === 0 ? 1.1 : 0.9})`,
                  zIndex: slide.position === 0 ? 2 : 1,
                  opacity: slide.position === 0 ? 1 : 0.7,
                  filter: slide.position === 0 ? 'blur(0)' : 'blur(2px)'
                }}
              >
                <FundraiserCard {...slide} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-3">
          {fundraisers.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setActiveIndex(index)}
              className={`transition-all duration-300 ${
                activeIndex === index 
                  ? 'w-12 h-3 bg-blue-600' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingFundraisers;