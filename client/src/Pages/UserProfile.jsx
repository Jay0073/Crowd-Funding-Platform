import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, Calendar, DollarSign, Heart,
  HandHeart, Edit, LogOut, ChevronRight, ExternalLink,
  AlertCircle, Check, Download
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
    fundraises: []
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      // const response = await axios.get('http://localhost:5000/profileInfo', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setUserData(response.data);
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
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const TabButton = ({ name, icon: Icon, active }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(name.toLowerCase())}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? "bg-blue-600 text-white" 
          : "text-gray-600 hover:bg-gray-100"
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
            {userData.donations.map((donation, index) => (
              <motion.div
                key={donation.id}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{donation.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Donated to {donation.recipientName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-blue-600 font-medium">
                        ${donation.amount}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(donation.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {/* Handle receipt download */}}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Download size={16} />
                    Receipt
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check size={16} />
                    <span className="text-sm">Transaction Successful</span>
                  </div>
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
            className="space-y-4"
          >
            {userData.fundraises.map((fundraise, index) => (
              <motion.div
                key={fundraise.id}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{fundraise.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {fundraise.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Target</p>
                        <p className="font-medium text-gray-800">
                          ${fundraise.targetAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Raised</p>
                        <p className="font-medium text-green-600">
                          ${fundraise.raisedAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          fundraise.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {fundraise.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {/* Handle view details */}}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink size={16} />
                    View
                  </button>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (fundraise.raisedAmount / fundraise.targetAmount) * 100,
                          100
                        )}%`
                      }}
                    />
                  </div>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Joined {new Date(userData.joinedDate).toLocaleDateString()}</span>
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
                  value={`$${userData.donations?.reduce((acc, curr) => acc + curr.amount, 0) || 0}`}
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
                  value={userData.fundraises?.filter(f => f.status === 'active').length || 0}
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

            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
