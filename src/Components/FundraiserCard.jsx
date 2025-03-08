import React from 'react';
import { Share2, Heart } from 'lucide-react';

const ProgressBar = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="relative w-full">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="font-medium text-blue-600">${current.toLocaleString()}</span>
        <span className="text-gray-500">raised of ${goal.toLocaleString()}</span>
      </div>
    </div>
  );
};

const ShareButton = ({ onShare }) => {
  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium transition-all duration-200 hover:border-blue-600 hover:text-blue-600 hover:scale-105 active:scale-100"
    >
      <Share2 size={18} />
      <span>Share</span>
    </button>
  );
};

const DonateButton = ({ onDonate }) => {
  const handleDonate = () => {
    if (onDonate) {
      onDonate();
    }
  };

  return (
    <button 
      onClick={handleDonate}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-100"
    >
      <Heart size={18} />
      <span>Donate</span>
    </button>
  );
};

const FundraiserCard = ({
  imageUrl,
  title,
  fundraiserName,
  currentAmount,
  goalAmount,
  endDate,
  onShare,
  onDonate
}) => {
  // Format date
  const formattedDate = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
      {/* Image Container */}
      <div className="relative h-58 overflow-hidden">
        <img 
          src={imageUrl} 
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
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            by <span className="font-medium text-gray-900">{fundraiserName}</span>
          </p>
        </div>

        {/* Progress Section */}
        <ProgressBar 
          current={currentAmount} 
          goal={goalAmount}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <ShareButton onShare={onShare} />
          <DonateButton onDonate={onDonate} />
        </div>
      </div>
    </div>
  );
};

// Example usage with dummy data
const CampaignCard = () => {
  const handleShare = () => {
    console.log('Share clicked');
  };

  const handleDonate = () => {
    console.log('Donate clicked');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-sm mx-auto">
        <FundraiserCard
          imageUrl="https://placehold.co/600x400"
          title="Help Save the Local Animal Shelter"
          fundraiserName="John Doe"
          currentAmount={25000}
          goalAmount={50000}
          endDate="2024-04-15"
          onShare={handleShare}
          onDonate={handleDonate}
        />
      </div>
    </div>
  );
};

export default FundraiserCard;
