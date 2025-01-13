import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Rocket, Shield, BarChart, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16">
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Generate <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Professional QR Codes</span> Instantly
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Elevate your business with smart, trackable QR codes. Perfect for marketing, events, and digital engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link 
                  to="/get-started" 
                  className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto transform hover:scale-105"
                >
                  <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Create Your QR Code
                </Link>
                <Link 
                  to="/examples" 
                  className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 w-full sm:w-auto transform hover:scale-105"
                >
                  View Examples
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl transform rotate-6 scale-95 opacity-50 blur-xl"></div>
              <div className="relative bg-white p-3 sm:p-4 lg:p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                )}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=https://example.com" 
                  alt="Dynamic QR Code Example"
                  className={`w-full rounded-2xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setIsImageLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-16">
            Powerful Features for Modern Needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 max-w-5xl mx-auto">
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left transform hover:scale-105">
              <Shield className="text-blue-600 mb-3 sm:mb-4 lg:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4">Secure & Reliable</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee for your QR codes.
              </p>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left transform hover:scale-105">
              <BarChart className="text-blue-600 mb-3 sm:mb-4 lg:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4">Real-time Analytics</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Track scans, user behavior, and engagement metrics in real-time.
              </p>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left transform hover:scale-105">
              <QrCode className="text-blue-600 mb-3 sm:mb-4 lg:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4">Dynamic Content</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Update QR code destinations anytime without reprinting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
