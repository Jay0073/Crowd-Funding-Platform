import React, { Component } from "react";
import { Share2, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const FundraiserCard = ({
  fundId,
  category,
  title,
  name,
  raisedAmount,
  targetAmount,
  endDate,
  documents,
}) => {
  // Format date
  const formattedDate = new Date(endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const images = documents.map(item => images.append(item))
  console.log(documents)

  const handleDonate = (fundId) => {
    console.log("donate is clicked and id is", fundId);
  };

  const handleShare = () => {
    sonsole.log("share is clicked");
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
      {/* Image Container */}
      <div className="relative h-58 overflow-hidden">
        <img
          src={documents?.[0] || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700">
            Ends {formattedDate}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-4">
        {/* Title and Fundraiser Info */}
        <div>
          <NavLink to={`/donate/${fundId}`} className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {title}
          </NavLink>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              from <span className="font-medium text-gray-900">{name}</span>
            </p>
            <p className="outline rounded-2xl justify-self-center px-2 text-sm text-blue-600">
              {category}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <ProgressBar current={raisedAmount} goal={targetAmount} />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleShare(id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium transition-all duration-200 hover:border-blue-600 hover:text-blue-600 hover:scale-105 active:scale-100"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <NavLink
            to={`/donate/${fundId}`}
            onClick={() => handleDonate(fundId)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-100"
          >
            <Heart size={18} />
            <span>Donate</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FundraiserCard;
