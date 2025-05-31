import React, { useState } from "react";
import { X, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

const ContributionPopup = ({
  onClose,
  fundraiserTitle,
  fundraiserGoal,
  fundraiserEmail,
  fundraiserGained,
  fundId,
}) => {
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const predefinedAmounts = [
    Math.round((fundraiserGoal - fundraiserGained) / 5),
    Math.round((fundraiserGoal - fundraiserGained) / 3),
    Math.round((fundraiserGoal - fundraiserGained) / 2),
    Math.round((fundraiserGoal - fundraiserGained))
  ];  const displayAmount = customAmount || "0";

  const handleAmountSelect = (value) => {
    const amountStr = value.toString();
    setCustomAmount(amountStr);
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (customAmount > fundraiserGoal) {
      newErrors.amount = "Amount should not be more than required funds"
    }

    if (!customAmount) {
      newErrors.amount = "Please select or enter an amount.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (validateForm()) {
        try {
          await axios.post("https://crowdfund-backend-lsb0.onrender.com/donate",{
              amount: customAmount,
              comment: formData.comment,
              fundId, fundraiserTitle
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setShowSuccess(true);
        } catch (error) {
          setError(error.message);
          console.error("Error processing donation:", error);
        }
      }
    } else {
      alert("Please login to donate.");
    }
  };

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showSuccess ? (
        <div className="bg-white rounded-xl p-6 text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Thank you for your contribution!
          </h2>
          <p className="text-gray-600">
            Your support helps us make a meaningful impact.
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl">
            <h2 className="font-bold text-xl line-clamp-2 text-white">{fundraiserTitle}</h2>
            <button
              onClick={onClose}
              className="text-white cursor-pointer hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Fundraiser Details */}
          <div className="px-6 py-4">
            <p className="text-m text-gray-600">
              <strong>Funds Required:</strong> <span className="text-2xl">${fundraiserGoal}</span>
            </p>
            <p className="text-m text-gray-600">
              <strong>Organizer Email:</strong> <span className="text-xl">{fundraiserEmail}</span>
            </p>
          </div>

          {/* Contribution Form */}
          <div className="px-6 py-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAmountSelect(value)}
                    className={`py-3 rounded-lg font-medium transition-all duration-200 ${
                      customAmount === value.toString()
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-900 hover:bg-blue-100"
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  placeholder="Enter custom amount"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.amount ? "border-red-500" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                />
              </div>
              {errors.amount && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.amount}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Add Comment (Optional)
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                rows={3}
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-colors"
            >
              Proceed to Pay ${displayAmount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionPopup;
