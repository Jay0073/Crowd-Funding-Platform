import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import FundraiserCard from "@/Components/FundraiserCard.jsx";
import axios from "axios";

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recent");
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://crowdfund-backend-lsb0.onrender.com/fetchfundraises"
        );
        setFundraisers(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching fundraisers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFundraisers();
  }, []);

  const categories = [
    "All",
    "Medical Emergency",
    "Education",
    "Natural Disaster",
    "Animal Welfare",
    "Community Development",
    "Others",
  ];

  if (isLoading) {
    return (
      <div className="explore min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-600 flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {" "}
              Fundraisers
            </span>
          </h1>
          <p className="text-gray-600">
            Discover and support causes that matter to you
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Search & Filters (2/5) */}
          <div className="w-2/5">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search fundraisers by title..."
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              {/* Filters Section */}
              <div className="space-y-6">
                {/* Filter Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Clear all
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2 flex flex-wrap gap-x-4">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amount Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Amount Range
                  </h4>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="Recent">Most Recent</option>
                      <option value="Popular">Most Popular</option>
                      <option value="AmountHigh">Amount (High to Low)</option>
                      <option value="AmountLow">Amount (Low to High)</option>
                      <option value="Urgent">Most Urgent</option>
                    </select>
                    <ArrowDownUp
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Fundraiser Cards (3/5) */}
          <div className="w-3/5">
            <div className="grid grid-cols-2 gap-6">
              {fundraisers.map((fundraiser, index) => (
                <FundraiserCard key={fundraiser.id || index} {...fundraiser} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
