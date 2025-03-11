import React, { Component } from "react";
import { Share2, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProgressBar from "./ProgressBar";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// : `FUND-${uuidv4()}`,
  // title,
  // category
  // targetAmount,
  // raisedAmount: raisedAmount || 0,
  // endDate,
  // name: user.name,

const FundraiserCard = ({
  fundId,
  documents,
  category,
  title,
  name,
  raisedAmount,
  targetAmount,
  endDate,
}) => {
  // Format date
  const formattedDate = new Date(endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDonate = (fundId) => {
    console.log("donate is clicked and id is", id);
  };

  const handleShare = () => {
    sonsole.log("share is clicked");
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
      {/* Image Container */}
      <div className="relative h-58 overflow-hidden">
        <img
          src={`http://localhost:5000${documents[0]}`}
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
            by{" "}
            <span className="font-medium text-gray-900">{fundraiserName}</span>
          </p>
        </div>

        <ErrorBoundary>
          {/* Progress Section */}
          <ProgressBar current={currentAmount} goal={goalAmount} />
        </ErrorBoundary>

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
            to={`/donate/${id}`}
            onClick={() => handleDonate(id)}
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

// Example usage with dummy data
// const CampaignCard = () => {
//   const handleShare = () => {
//     console.log("Share clicked");
//   };

//   const handleDonate = () => {
//     console.log("Donate clicked");
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-sm mx-auto">
//         <FundraiserCard
//           imageUrl="https://placehold.co/600x400"
//           title="Help Save the Local Animal Shelter"
//           fundraiserName="John Doe"
//           currentAmount={25000}
//           goalAmount={50000}
//           endDate="2024-04-15"
//           onShare={handleShare}
//           onDonate={handleDonate}
//         />
//       </div>
//     </div>
//   );
// };

export default FundraiserCard;
