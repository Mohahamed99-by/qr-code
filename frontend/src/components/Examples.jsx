import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Link as LinkIcon, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';

const Examples = () => {
  const examples = [
    {
      title: 'Website URL',
      description: 'Direct customers to your website',
      icon: Globe,
      qrData: 'https://example.com',
      bgColor: 'from-purple-500 to-pink-500',
      example: 'www.yourwebsite.com'
    },
    {
      title: 'Social Media',
      description: 'Connect to your social profiles',
      icon: LinkIcon,
      qrData: 'https://linkedin.com/in/example',
      bgColor: 'from-purple-400 to-pink-400',
      example: 'linkedin.com/in/yourprofile'
    },
    {
      title: 'Email',
      description: 'Start email conversations instantly',
      icon: Mail,
      qrData: 'mailto:example@email.com',
      bgColor: 'from-purple-500 to-pink-500',
      example: 'your@email.com'
    },
    {
      title: 'Phone Number',
      description: 'Make it easy to call your business',
      icon: Phone,
      qrData: 'tel:+1234567890',
      bgColor: 'from-purple-400 to-pink-400',
      example: '+1 (234) 567-890'
    },
    {
      title: 'Location',
      description: 'Guide people to your location',
      icon: MapPin,
      qrData: 'geo:37.7749,-122.4194',
      bgColor: 'from-purple-500 to-pink-500',
      example: '123 Business St, City'
    },
    {
      title: 'Event',
      description: 'Share event details and dates',
      icon: Calendar,
      qrData: 'BEGIN:VEVENT\nSUMMARY:Event Title\nEND:VEVENT',
      bgColor: 'from-purple-400 to-pink-400',
      example: 'Conference - June 15, 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            QR Code Examples
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore different types of QR codes you can create with our modern QR code generator
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${example.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {example.description}
                </p>
                <div className="bg-purple-50/50 rounded-lg p-4 mb-4 border border-purple-100">
                  <p className="text-gray-600 font-mono text-sm">
                    Example: {example.example}
                  </p>
                </div>
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(example.qrData)}`}
                    alt={`QR Code for ${example.title}`}
                    className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow-lg"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to create your own QR code?
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-gray-800 font-semibold mb-2">Dynamic Updates</h3>
            <p className="text-gray-600">
              Change your QR code content anytime without reprinting
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-gray-800 font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track scans and engagement with detailed insights
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-gray-800 font-semibold mb-2">Customization</h3>
            <p className="text-gray-600">
              Brand your QR codes with colors and logos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
