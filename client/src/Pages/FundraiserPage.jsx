import React, { useState, useEffect } from "react";
import {
  Share2,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Copy,
  UserCircleIcon,
} from "lucide-react";
import axios from "axios";
import ContributionPopup from "../Components/ContributionPopup";
import donate2 from "../assets/donate2.jpeg";
import { useParams } from "react-router-dom";

const SocialShareButton = ({ icon: Icon, color, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
    style={{ color }}
  >
    <Icon size={20} />
    <span className="text-gray-700">{label}</span>
  </button>
);

const ProgressBar = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="absolute h-full bg-blue-600 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 py-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Document ${index + 1}`}
                className="h-40 w-auto rounded-lg hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white p-2"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Full size document"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
};

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} className="py-6">
    {children}
  </div>
);

const FundraiserPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [fundraiser, setFundraiser] = useState([]);

  const { id: fundId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFundraiser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://localhost:5000/fetchfundraise/${fundId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
          setFundraiser(response.data);
          console.log("response ", response.data);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching fundraiser:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        alert("Please login to fundraise")
      }
    };
    fetchFundraiser();
  }, [fundId]);

  // Sample data
  const fundrr = {
    imageUrl: donate2,
    fundraiserName: "John Doe",
    title: "Help Save City Animal Shelter",
    currentAmount: 45000,
    goalAmount: 60000,
    endDate: "2025-04-01",
    description:
      "Our local animal shelter needs urgent repairs and upgrades to continue providing care for abandoned pets...",
    documents: [
      "https://placehold.co/400x600",
      "https://placehold.co/400x600",
      "https://placehold.co/400x600",
      "https://placehold.co/400x600",
    ],
    supporters: [
      {
        name: "John Doe",
        amount: 500,
        message: "Keep up the great work!",
        date: "2024-03-01",
      },
      {
        name: "Jane Smith",
        amount: 1000,
        message: "Happy to help!",
        date: "2024-03-02",
      },
      // Add more supporters...
    ],
    comments: [
      {
        name: "Alice Brown",
        message: "This is such an important cause!",
        date: "2024-03-01",
      },
      {
        name: "Bob Wilson",
        message: "Thank you for organizing this!",
        date: "2024-03-02",
      },
      // Add more comments...
    ],
  };

  const formattedDate = new Date(fundraiser.endDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleShare = (platform) => {
    // Implement sharing logic for each platform
    console.log(`Sharing on ${platform}`);
    setIsShareMenuOpen(false);
  };

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    // Function to prevent scrolling
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event bubbling
      return false;
    };

    if (showPaymentPopup) {
      // Add event listeners to prevent scrolling
      window.addEventListener("wheel", preventScroll, { passive: false }); // Modern browsers
      window.addEventListener("touchmove", preventScroll, { passive: false }); // For touch devices
      document.body.style.overflow = "hidden"; // fallback for some cases
    } else {
      // Remove event listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "unset";
    }

    // Cleanup function to remove listeners when component unmounts or state changes
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "unset";
    };
  }, [showPaymentPopup]);

  useEffect(() => {
    if (showPaymentPopup) {
      window.scrollTo(0, 0);
    }
  }, [showPaymentPopup]);


  if (isLoading) {
    return (
      <div className="fundraisepage min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {fundraiser.title}
        </h1>

        <div className="flex gap-8">
          {/* Left Column - Main Content */}
          <div className="w-2/3">
            {/* Main Image */}
            <div className="mb-8">
              <img
                src={fundraiser.documents?.[0] || "/placeholder.jpg"}
                alt={fundraiser.title}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>

            {/* Tabs Navigation */}
            <div className="border-b ">
              <div className="flex gap-8 ">
                {["About", "Documents", "Comments"].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`py-4 px-2 relative ${
                      activeTab === index
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 cursor-pointer"
                    }`}
                  >
                    {tab}
                    {activeTab === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Panels */}
            <TabPanel value={activeTab} index={0}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  Hi, I am {fundraiser.name}
                </h2>

                <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
                  You can contact us at {fundraiser.email} or{" "}
                  {fundraiser.mobile}
                </h3>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {fundraiser.description}
                </p>
              </div>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <ImageCarousel images={fundraiser.documents} />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <div className="space-y-6">
                {fundrr.comments.map((comment, index) => (
                  <div key={index} className="bg-white p-2 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h2 className="flex justify-center gap-2 items-center font-semibold text-[20px] text-gray-900">
                        <UserCircleIcon size={30} />
                        {comment.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.message}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
          </div>

          {/* Right Column - Donation Info */}
          <div className="w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${fundraiser.raisedAmount}{" "}
                    <span className="text-[15px] ml-[-5] font-medium">
                      raised
                    </span>
                  </span>
                  <span className="text-gray-800">
                    of{" "}
                    <span className="text-2xl font-bold">
                      ${fundraiser.targetAmount}
                    </span>
                  </span>
                </div>
                <ProgressBar
                  current={fundraiser.raisedAmount}
                  goal={fundraiser.targetAmount}
                />
              </div>

              {/* Time Left */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Calendar size={20} />
                <span>Ends {formattedDate}</span>
              </div>

              {/* Contribute Button */}
              <button
                className="w-full py-4 bg-blue-600 cursor-pointer text-white rounded-xl font-medium mb-4 hover:bg-blue-700 transition-colors"
                onClick={() => setShowPaymentPopup(true)}
              >
                Contribute Now
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                  className="w-full py-4 border cursor-pointer border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4"
                >
                  Share this fundraiser
                </button>

                {/* Share Menu */}
                {isShareMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg p-4 z-10">
                    <SocialShareButton
                      icon={Facebook}
                      color="#1877F2"
                      label="Facebook"
                      onClick={() => handleShare("facebook")}
                    />
                    <SocialShareButton
                      icon={Twitter}
                      color="#1DA1F2"
                      label="Twitter"
                      onClick={() => handleShare("twitter")}
                    />
                    <SocialShareButton
                      icon={Mail}
                      color="#EA4335"
                      label="Email"
                      onClick={() => handleShare("email")}
                    />
                    <SocialShareButton
                      icon={Copy}
                      color="#6B7280"
                      label="Copy Link"
                      onClick={() => handleShare("copy")}
                    />
                  </div>
                )}
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Payment Options Available
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {["Visa", "Mastercard", "PayPal"].map((option) => (
                    <div
                      key={option}
                      className="bg-blue-200 p-2 rounded-3xl text-center text-sm"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Supporters */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-gray-600" />
                  <h4 className="font-medium text-gray-900">
                    Recent Supporters
                  </h4>
                </div>
                <div className="space-y-4">
                  {fundrr.supporters
                    .slice(0, showAllSupporters ? undefined : 3)
                    .map((supporter, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h5 className="font-medium text-gray-900">
                            {supporter.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {supporter.message}
                          </p>
                        </div>
                        <span className="font-medium text-blue-600">
                          ${supporter.amount}
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => setShowAllSupporters(!showAllSupporters)}
                  className="text-blue-600 text-sm mt-4 cursor-pointer hover:underline"
                >
                  {showAllSupporters ? "Show Less" : "See All Supporters"}
                </button>
              </div>
            </div>
          </div>
          {showPaymentPopup && (
            <ContributionPopup
              onClose={() => setShowPaymentPopup(false)}
              fundraiserName="Help Save City Animal Shelter"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FundraiserPage;
