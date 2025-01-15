import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="relative flex flex-col items-center">
        {/* Outer spinning circle */}
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-purple-200 rounded-full"
            style={{ 
              borderTopColor: '#DB2777',
              borderRightColor: '#9D174D',
              borderBottomColor: '#6B46C1'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner QR code icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <QrCode className="w-8 h-8 text-purple-600" />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Loading
          </h3>
          <p className="text-sm text-gray-600 mt-1">Please wait a moment...</p>
        </motion.div>

        {/* Background decoration */}
        <motion.div
          className="absolute -inset-8 -z-10 bg-white/50 backdrop-blur-lg rounded-2xl border border-purple-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;