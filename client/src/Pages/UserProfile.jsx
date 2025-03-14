import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Heart,
  HandHeart,
  UserCircle,
  ExternalLink,
  AlertCircle,
  Check,
  Download,
} from "lucide-react";
import axios from "axios";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("donations");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    mobile: "+1234567890",
    joinedDate: "2023-01-15",
    donations: [],
    fundraises: [],
  });

  useEffect(() => {
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/profileInfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const TabButton = ({ name, icon: Icon, active }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(name.toLowerCase())}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={20} />
      {name}
    </motion.button>
  );

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white p-6 rounded-xl shadow-sm border"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "donations":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {userData.donations.map((donation) => (
              <motion.div
          key={donation._id}
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition-shadow"
              >
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div>
              {/* Fundraise Title */}
              <h3 className="font-bold text-md text-gray-800 hover:text-blue-600 transition-colors">
                {donation.fundraiseTitle || "No Title Provided"}
              </h3>

              {/* Recipient Information */}
              <p className="text-xs text-gray-500 mt-1">
                Donated to <span className="text-blue-600 font-medium">{donation.fundraiseId}</span>
              </p>
            </div>

            {/* Receipt Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                console.log(`Downloading receipt for donation ID: ${donation._id}`);
              }}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs"
            >
              <Download size={14} />
              <span>Receipt</span>
            </motion.button>
          </div>

          {/* Donation Details Section */}
          <div className="mt-2 grid grid-cols-2 gap-2 items-center">
            <div>
              <p className="text-xs text-gray-500">Amount Donated</p>
              <p className="text-xl font-extrabold text-blue-600">
                ${donation.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date(donation.donatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Optional Comment */}
          {donation.comment && (
            <div className="mt-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
              <p className="text-xs text-gray-500">Comment</p>
              <p className="text-gray-800 italic mt-1">"{donation.comment}"</p>
            </div>
          )}

          {/* Status Information */}
          <div className="mt-4 flex items-center justify-between border-t pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-green-600"
            >
              <Check size={18} />
              <span className="text-sm font-medium">Transaction Successful</span>
            </motion.div>

            {/* Donation ID */}
            <p className="text-xs text-gray-400">ID: {donation._id}</p>
          </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "fundraises":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          >
            {userData.fundraises.map((fundraise) => (
              <motion.div
          key={fundraise.fundId}
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
          {/* Status Banner */}
          <div
            className={`w-full h-2 ${
              fundraise.status === "active"
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-yellow-400 to-yellow-600"
            }`}
          />

          <div className="p-6 space-y-4">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {fundraise.title}
                </h3>
                <p className="text-gray-500 text-base line-clamp-2">
            {fundraise.description}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate(`/fundraiser/${fundraise.fundId}`)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
              >
                <ExternalLink size={16} />
                Details
              </motion.button>
            </div>

            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500 text-sm">Progress</span>
                <span className="text-blue-600 font-bold">
            {Math.round(
              (fundraise.raisedAmount / fundraise.targetAmount) * 100
            )}
            %
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            style={{
              width: `${Math.min(
                (fundraise.raisedAmount / fundraise.targetAmount) * 100,
                100
              )}%`,
            }}
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-base font-bold text-gray-800">
            {fundraise.category}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-base font-bold text-gray-800">
            ${fundraise.targetAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Raised</p>
                <p className="text-base font-bold text-green-600">
            ${fundraise.raisedAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Days Left</p>
                <p className="text-base font-bold text-gray-800">
            {Math.max(
              0,
              Math.ceil(
                (new Date(fundraise.endDate) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )
            )}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                fundraise.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {fundraise?.status && fundraise.status.charAt(0).toUpperCase() + fundraise.status.slice(1)}
            </span>
          </div>
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="userprofile min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 pb-12 pt-26">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
          >
            <div className="bg-blue-600 px-6 py-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User size={40} className="text-blue-600" />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{userData.user.name}</h1>
                  <div className="flex items-start gap-4 mt-2">
                    <div>
                      <p className="flex items-center gap-2">
                        <Mail size={18} />
                        {userData.user.email}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone size={18} />
                        {userData.user.mobile}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>
                        Joined{" "}
                        {new Date(userData.user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Total Donations"
                  value={`$${
                    userData.donations?.reduce(
                      (total, donation) => total + parseInt(donation.amount),
                      0
                    ) || 0
                  }`}
                  icon={Heart}
                  color="bg-pink-500"
                />

                <StatCard
                  title="Fundraises Created"
                  value={userData.fundraises?.length || 0}
                  icon={HandHeart}
                  color="bg-blue-500"
                />

                <StatCard
                  title="Active Campaigns"
                  value={
                    // userData.fundraises?.filter((f) => f.status === "active").length || 0
                    userData.fundraises?.length || 0
                  }
                  icon={DollarSign}
                  color="bg-green-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Tabs and Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b px-6 py-4">
              <div className="flex gap-4">
                <TabButton
                  name="Donations"
                  icon={Heart}
                  active={activeTab === "donations"}
                />
                <TabButton
                  name="Fundraises"
                  icon={HandHeart}
                  active={activeTab === "fundraises"}
                />
              </div>
            </div>

            <div className="p-6">{renderContent()}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
