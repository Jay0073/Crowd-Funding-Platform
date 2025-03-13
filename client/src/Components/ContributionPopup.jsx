import React, { useState } from 'react';
import { X, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

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

const SuccessPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
      <CheckCircle size={48} className="text-green-500 mx-auto mb-4 animate-bounce" />
      <p className="text-lg font-semibold mb-4">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Close
      </button>
    </div>
  </div>
);

const ContributionPopup = ({ onClose, fundraiserName }) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const predefinedAmounts = [100, 300, 500];

  const displayAmount = customAmount || '0';

  const handleAmountSelect = (value) => {
    const amountStr = value.toString();
    setSelectedAmount(amountStr);
    setCustomAmount(amountStr);
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customAmount) {
      newErrors.amount = 'Please select or enter an amount';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // await axios.post('http://localhost:5000/donate', {
        //   userId: 
        //   amount: customAmount,
        //   ...formData,
        // });

        setShowSuccess(true);
      } catch (error) {
        console.error('Error processing donation:', error);
        alert('Error processing donation. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showSuccess && <SuccessPopup message="Thank you for your contribution!" onClose={onClose} />}
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
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

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Full Name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} error={errors.name} />
            <InputField label="Email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} error={errors.email} />
          </div>

          <InputField label="Add Comment" name="comment" placeholder="Express your concern here..." value={formData.comment} onChange={handleInputChange} />

          <button onClick={handleSubmit} className="w-full mt-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Proceed to Pay ${displayAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributionPopup;
