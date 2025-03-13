import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  // Animation variants for different elements
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const iconVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.4 }
    },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden text-center p-8"
      >
        {/* Animated Icon */}
        <motion.div
          variants={iconVariants}
          className="mb-6"
        >
          <motion.div
            variants={floatingAnimation}
            animate="animate"
            className="inline-block"
          >
            <AlertCircle size={80} className="text-blue-600" />
          </motion.div>
        </motion.div>

        {/* Error Code */}
        <motion.h1 
          variants={containerVariants}
          className="text-7xl font-bold text-blue-600 mb-4"
        >
          404
        </motion.h1>

        {/* Messages */}
        <motion.h2 
          variants={containerVariants}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          variants={containerVariants}
          className="text-gray-600 mb-8"
        >
          Oops! The page you're looking for seems to have vanished into thin air.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            Go Home
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <RefreshCcw size={20} />
            Reload Page
          </motion.button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              transition: { duration: 3, repeat: Infinity }
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              transition: { duration: 3, repeat: Infinity, delay: 1 }
            }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
