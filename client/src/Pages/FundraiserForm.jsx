import React, { useState } from "react";
import {
  UserCircle,
  FileText,
  DollarSign,
  Landmark,
  Image as ImageIcon,
  Upload,
  Calendar,
  X,
  Check,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  LucideUpload,
} from "lucide-react";
import InputField from "../Components/InputField.jsx";
import axios from "axios";

const FundraiserForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    // Cause Details
    title: "",
    category: "",
    description: "",
    targetAmount: "",
    endDate: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    upiNumber: "",
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [errors, setErrors] = useState({});

  const quotes = [
    {
      title: "Tell Your Story",
      subtitle:
        "Every cause has a story. Share yours and inspire others to help.",
    },
    {
      title: "Financial Details",
      subtitle: "Secure your fundraising with proper banking information.",
    },
    {
      title: "Supporting Documents",
      subtitle: "Add credibility to your cause with relevant documentation.",
    },
  ];

  const steps = [
    {
      title: "Cause Details",
      icon: FileText,
      fields: ["title", "category", "description", "targetAmount", "endDate"],
    },
    {
      title: "Bank Details",
      icon: Landmark,
      fields: ["accountHolderName", "accountNumber", "bankName", "upiNumber"],
    },
    {
      title: "Documents",
      icon: ImageIcon,
      fields: ["documents", "profileImage"],
    },
  ];

  const categories = [
    "Medical Emergency",
    "Education",
    "Natural Disaster",
    "Animal Welfare",
    "Community Development",
    "Others",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];

    const validFiles = uploadedFiles.filter((file) => {
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          files: `${file.name} is too large. Maximum size is 5MB`,
        }));
        return false;
      }
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          files: `${file.name} is not a valid file type. Please upload images or PDFs`,
        }));
        return false;
      }
      return true;
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...validFiles],
    }));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    const currentFields = steps[currentStep].fields;

    currentFields.forEach((field) => {
      if (field === "documents" && currentStep === 2) {
        if (files.length === 0) {
          newErrors[field] = "Please upload at least one supporting document";
        }
        return;
      }

      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }

      // Specific validations
      switch (field) {
        case "targetAmount":
          if (isNaN(formData[field]) || parseFloat(formData[field]) <= 0) {
            newErrors[field] = "Please enter a valid amount greater than 0";
          }
          break;
        // case "accountNumber":
        //   if (formData[field] && !/^\d{9,18}$/.test(formData[field])) {
        //     newErrors[field] = "Please enter a valid account number";
        //   }
        //   break;
        // case "upiNumber":
        //   if (formData[field] && !/^[\w.-]+@[\w.-]+$/.test(formData[field])) {
        //     newErrors[field] = "Please enter a valid UPI ID";
        //   }
        //   break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to upload images and return their URLs
  const uploadImages = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("documents", file)); // Append all images

      // Upload images to backend
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct content-type for file uploads
          },
        }
      );

      if (response.status !== 200) throw new Error("Image upload failed");

      return response.data.fileUrls; // Return list of image URLs
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const createFundraiser = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const token = localStorage.getItem("token");

    try {
      const imageUrls = await uploadImages(formData.documents);

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "documents") {
          imageUrls.forEach((url) => formDataToSend.append("documents", url));
        } else if (typeof value === "object") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // 3. Submit fundraiser
      const response = await axios.post(
        "http://localhost:5000/fundraise",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
        console.log("Fundraiser created successfully:", response.data);
      }
    } catch (error) {
      console.error(
        "Error creating fundraiser:",
        error.response?.data || error.message
      );
      setSubmitError(error.response?.data?.error || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      window.scrollTo(0, 0);
      validateStep();
      if (Object.keys(errors).length === 0) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    } else {
      await createFundraiser();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={FileText}
              label="Fundraiser Title"
              name="title"
              placeholder="Enter a clear title for your fundraiser"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.category}</span>
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell your story and explain why you're raising funds..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              />
              {errors.description && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            <InputField
              icon={DollarSign}
              label="Target Amount"
              name="targetAmount"
              type="number"
              placeholder="Enter target amount"
              value={formData.targetAmount}
              onChange={handleInputChange}
              error={errors.targetAmount}
            />

            <InputField
              icon={Calendar}
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              error={errors.endDate}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={UserCircle}
              label="Account Holder Name"
              name="accountHolderName"
              placeholder="Enter account holder name"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              error={errors.accountHolderName}
            />

            <InputField
              icon={UserCircle}
              label="Account Number"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              error={errors.accountNumber}
            />

            <InputField
              icon={Landmark}
              label="Bank Name"
              name="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleInputChange}
              error={errors.bankName}
            />

            <InputField
              icon={LucideUpload}
              label="UPI Number"
              name="upiNumber"
              placeholder="Enter UPI Number"
              value={formData.upiNumber}
              onChange={handleInputChange}
              error={errors.upiNumber}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload size={40} className="text-gray-400 mb-2" />
                  <span className="text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-sm text-gray-500">
                    Support for multiple files
                  </span>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="mr-2" />
            {submitError}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold mb-2">
              {quotes[currentStep].title}
            </h1>
            <p className="text-blue-100">{quotes[currentStep].subtitle}</p>
          </div>

          {/* Progress Steps */}
          <div className="px-4 py-2 border-b">
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= currentStep ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {index < currentStep ? (
                          <Check size={20} />
                        ) : (
                          <StepIcon size={20} />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 ${
                            index < currentStep ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 0
                      ? "invisible"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentStep === steps.length - 1 ? "Submit" : "Next"}
                  <ChevronRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Document is Submitted!
            </h2>
            <p className="text-gray-600">
              we're here to support you on every step of the way.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                window.location.href = "/";
              }}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundraiserForm;
