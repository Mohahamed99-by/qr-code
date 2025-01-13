import React from 'react';
import { motion } from 'framer-motion';


const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-gray-200 rounded-full"
            style={{ borderTopColor: '#3B82F6' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700">Loading</h3>
            <p className="text-sm text-gray-500">Please wait a moment...</p>
          </motion.div>
        </div>
      </div>
    );
  };

export default LoadingSpinner;