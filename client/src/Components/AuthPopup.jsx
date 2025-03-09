import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  Phone,
  User,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "./InputField"; // Import the InputField component

const AuthPopup = ({ onClose, returnTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [useMobile, setUseMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const quotes = {
    login: {
      title: "Welcome Back!",
      subtitle: "Good to see you again. Let's continue making a difference.",
    },
    signup: {
      title: "Join Our Community",
      subtitle: "Start your journey of making positive changes in lives.",
    },
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (useMobile) {
        if (!formData.mobile.match(/^\d{10}$/)) {
          newErrors.mobile = "Please enter a valid 10-digit mobile number";
        }
      } else {
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          newErrors.email = "Please enter a valid email address";
        }
      }
    } else {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.mobile.match(/^\d{10}$/)) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number";
      }
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const resData = await response.json();
          console.log("User created successfully:", resData);
          // Handle successful signup logic here
          window.location.href = returnTo || "/";
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          // Handle error logic here
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle network error here
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      x: isLogin ? -20 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: isLogin ? 20 : -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-blue-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? quotes.login.title : quotes.signup.title}
            </h2>
            <p className="text-white/80">
              {isLogin ? quotes.login.subtitle : quotes.signup.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              isLogin ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
            {isLogin && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              !isLogin ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
            {!isLogin && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
            >
              {isLogin ? (
                // Login Form
                <>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setUseMobile(!useMobile)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Use {useMobile ? "email" : "mobile number"} instead
                    </button>
                  </div>
                  {useMobile ? (
                    <InputField
                      icon={Phone}
                      label="Mobile Number"
                      name="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      error={errors.mobile}
                    />
                  ) : (
                    <InputField
                      icon={Mail}
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                  )}
                  <InputField
                    icon={Lock}
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    togglePassword={togglePasswordVisibility}
                    showPassword={showPassword}
                  />
                  <div className="text-right mb-4">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </>
              ) : (
                // Signup Form
                <>
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />
                  <InputField
                    icon={Mail}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                  <InputField
                    icon={Phone}
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    error={errors.mobile}
                  />
                  <InputField
                    icon={Lock}
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    togglePassword={togglePasswordVisibility}
                    showPassword={showPassword}
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
              >
                {isLogin ? "Login" : "Create Account"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Google", "Facebook", "Apple"].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPopup;
