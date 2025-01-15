import React from 'react';
import { Link } from 'react-router-dom';
import { Home, QrCode } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - QR Code Generator"
        description="The page you're looking for could not be found. Return to our QR code generator to create custom QR codes for free."
        keywords="404, page not found, QR code generator"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-200 shadow-xl hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-200">
              <QrCode className="w-16 h-16 text-purple-500" />
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-gray-600">
              Oops! The page you're looking for seems to have disappeared into the digital void.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-purple-500/25"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              to="/examples"
              className="w-full bg-white hover:bg-purple-50 text-gray-700 border border-purple-200 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              <QrCode className="w-5 h-5" />
              <span>View Examples</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
