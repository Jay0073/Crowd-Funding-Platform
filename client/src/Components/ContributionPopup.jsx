import React, { useState } from 'react';
import { X, DollarSign, AlertCircle } from 'lucide-react';

// Move InputField outside so it doesn’t get re-created on every render.
const InputField = ({ label, name, type = 'text', placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-200'
      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
    />
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle size={14} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const ContributionPopup = ({ onClose, fundraiserName }) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});

  const predefinedAmounts = [100, 300, 500];

  // Get the final amount to display
  const displayAmount = customAmount || '0';

  const handleAmountSelect = (value) => {
    const amountStr = value.toString();
    setSelectedAmount(amountStr);
    setCustomAmount(amountStr); // Sync with input field
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(value); // Keep both synced
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Log to verify input handles changes correctly
    // console.log("Input change:", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate amount
    if (!customAmount) {
      newErrors.amount = 'Please select or enter an amount';
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate mobile
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim() || !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', {
        amount: customAmount,
        ...formData
      });
      // Handle payment processing here
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <div className="mb-2">
            <p className="text-sm text-gray-600">Contributing to</p>
            <p className="font-medium text-2xl text-gray-900">{fundraiserName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-3">
          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => handleAmountSelect(value)}
                  className={`py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedAmount === value.toString()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-900 hover:bg-blue-100'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
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
                  errors.amount ? 'border-red-500' : 'border-gray-200'
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

          {/* Donor Information Form */}
          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />

          <InputField
            label="Mobile Number"
            name="mobile"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          {/* Proceed Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Proceed to Pay ${displayAmount}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionPopup;
