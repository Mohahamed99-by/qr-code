import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent'
import {motion} from 'framer-motion'
import CountrySelect from '../components/CountrySelect';
import ConfirmDialog from '../components/ConfirmDialog';
import SEO from '../components/SEO';
import { 
  QrCode, 
  Trash2, 
  Download, 
  Plus, 
  Link as LinkIcon, 
  Mail, 
  Wifi, 
  Phone,
  Sparkles,
  MessageCircle,
  MapPin,
} from 'lucide-react';

const LinkQRGenerator = () => {
  const [qrType, setQrType] = useState('url');
  const [qrData, setQrData] = useState({});
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'MA', name: 'Morocco', phone: '+212', flag: '🇲🇦' });
  const [apiBaseUrl, setApiBaseUrl] = useState("https://qr-code-db.onrender.com");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    qrCodeId: null
  });

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch token from localStorage
      if (!token) throw new Error('Authentication token is missing');

      const response = await fetch(`${apiBaseUrl}/qr-codes`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
   

      setQrCodes(data);
    } catch (error) {
      console.error('Error fetching QR codes:', error.message);
    }
  };

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token is missing');
  
      let formattedData = qrData;
  
      // Format WhatsApp data
      if (qrType === 'whatsapp') {
        const phoneNumber = `${qrData.phoneNumber}`.replace(/[^0-9+]/g, '');
        const message = encodeURIComponent(qrData.message || '');
        formattedData = {
          ...qrData,
          whatsappUrl: `https://wa.me/${phoneNumber}${message ? `?text=${message}` : ''}`,
        };
      }
  
      const response = await fetch(`${apiBaseUrl}/generate-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: qrType,
          data: formattedData,
        }),
      });
  
      const responseBody = await response.text();  // Capture the raw response text
      if (!response.ok) {
        throw new Error(responseBody);
      }
  
      const data = JSON.parse(responseBody);
      setQrCodes([data, ...qrCodes]);
      setQrData({});
    } catch (error) {
      console.error('Error generating QR code:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteQR = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Fetch token from localStorage
      if (!token) throw new Error('Authentication token is missing');

      const response = await fetch(`${apiBaseUrl}/qr-codes/${id}`, { // Use dynamic apiBaseUrl
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setQrCodes(qrCodes.filter((qr) => qr.id !== id));
    } catch (error) {
      console.error('Error deleting QR code:', error.message);
    }
  };
  const handleDownloadQR = (qrCode) => {
    const link = document.createElement('a');
    link.href = qrCode.qr_code;
    link.download = `qr-code-${qrCode.id}.png`;
    link.click();
  };

  const qrTypeIcons = {
    url: LinkIcon,
    email: Mail,
    wifi: Wifi,
    phone: Phone,
    whatsapp: MessageCircle,
    location: MapPin // Add this line
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const number = value.replace(/\D/g, '');
    
    // Format based on length
    if (number.length <= 3) {
      return number;
    } else if (number.length <= 6) {
      return `${number.slice(0, 3)}-${number.slice(3)}`;
    } else if (number.length <= 9) {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
    }
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
  };

  const handlePhoneChange = (e, type) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    // Store raw number with country code for API
    const rawNumber = selectedCountry.phone + e.target.value.replace(/\D/g, '');
    
    if (type === 'whatsapp') {
      setQrData({
        ...qrData,
        phoneNumber: rawNumber,
        displayNumber: formattedNumber
      });
    } else {
      setQrData({
        ...qrData,
        phoneNumber: rawNumber,
        displayNumber: formattedNumber
      });
    }
  };

  const renderInputFields = () => {
    switch (qrType) {
      case 'url':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Website URL</label>
            <input
              type="url"
              value={qrData.url || ''}
              onChange={(e) => setQrData({ ...qrData, url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="https://example.com"
              required
            />
          </div>
        );
  
      case 'email':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={qrData.email || ''}
              onChange={(e) => setQrData({ ...qrData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="user@example.com"
              required
            />
            <label className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
            <input
              type="text"
              value={qrData.subject || ''}
              onChange={(e) => setQrData({ ...qrData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Email Subject"
            />
          </div>
        );
  
      case 'phone':
        return (
          <div className="space-y-4">
            <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
            <div className="flex gap-2">
              <CountrySelect
                selectedCountry={selectedCountry}
                onSelect={setSelectedCountry}
              />
              <div className="flex-1 relative">
                <input
                  type="tel"
                  value={qrData.displayNumber || ''}
                  onChange={(e) => handlePhoneChange(e, 'phone')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="123-456-789"
                  required
                />
                <div className="absolute left-4 -top-2 px-2 bg-white text-xs text-gray-500">
                  {selectedCountry.phone}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Example: {selectedCountry.phone} 123-456-789
            </p>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
            <div className="flex gap-2">
              <CountrySelect
                selectedCountry={selectedCountry}
                onSelect={setSelectedCountry}
              />
              <div className="flex-1 relative">
                <input
                  type="tel"
                  value={qrData.displayNumber || ''}
                  onChange={(e) => handlePhoneChange(e, 'whatsapp')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="123-456-789"
                  required
                />
                <div className="absolute left-4 -top-2 px-2 bg-white text-xs text-gray-500">
                  {selectedCountry.phone}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Example: {selectedCountry.phone} 123-456-789
            </p>
            <label className="block text-sm font-medium text-gray-700">Pre-filled Message (Optional)</label>
            <textarea
              value={qrData.message || ''}
              onChange={(e) => setQrData({ ...qrData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Enter your message here"
              rows={3}
            />
          </div>
        );
  
      case 'wifi':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">WiFi Network Name (SSID)</label>
            <input
              type="text"
              value={qrData.ssid || ''}
              onChange={(e) => setQrData({ ...qrData, ssid: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Network Name"
              required
            />
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={qrData.password || ''}
              onChange={(e) => setQrData({ ...qrData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Password"
              required
            />
            <label className="block text-sm font-medium text-gray-700">Encryption</label>
            <select
              value={qrData.encryption || ''}
              onChange={(e) => setQrData({ ...qrData, encryption: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        );
        case 'location':
          return (
            <div className="space-y-4">
              <div id="map" className="h-[300px] rounded-xl border-2 border-purple-100">
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                />
                <MapComponent
                  latitude={qrData.latitude || 0}
                  longitude={qrData.longitude || 0}
                  onLocationSelect={(lat, lng) => {
                    setQrData({
                      ...qrData,
                      latitude: lat.toFixed(6),
                      longitude: lng.toFixed(6)
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={qrData.latitude || ''}
                    onChange={(e) => setQrData({ ...qrData, latitude: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="e.g., 34.0209"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={qrData.longitude || ''}
                    onChange={(e) => setQrData({ ...qrData, longitude: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="e.g., -6.8416"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label (Optional)</label>
                <input
                  type="text"
                  value={qrData.label || ''}
                  onChange={(e) => setQrData({ ...qrData, label: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="e.g., Rabat, Morocco"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setQrData({
                            ...qrData,
                            latitude: position.coords.latitude.toFixed(6),
                            longitude: position.coords.longitude.toFixed(6)
                          });
                        },
                        (error) => {
                          console.error('Error getting location:', error);
                          alert('Unable to get current location. Please enter coordinates manually.');
                        }
                      );
                    } else {
                      alert('Geolocation is not supported by your browser');
                    }
                  }}
                  className="flex-1 bg-purple-100 text-purple-700 p-3 rounded-xl hover:bg-purple-200 transition-all duration-200"
                >
                  Use Current Location
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQrData({
                      ...qrData,
                      latitude: "34.0209",
                      longitude: "-6.8416",
                      label: "Rabat, Morocco"
                    });
                  }}
                  className="flex-1 bg-purple-100 text-purple-700 p-3 rounded-xl hover:bg-purple-200 transition-all duration-200"
                >
                  Go to Rabat
                </button>
              </div>
            </div>
          );
        

  
      default:
        return null;
    }
  };

  return (
    <>
      <SEO 
        title="Generate QR Code for Links - Free QR Code Generator"
        description="Create custom QR codes for your URLs and links. Our free QR code generator makes it easy to share your website or any web link through QR codes."
        keywords="URL QR code, link to QR code, website QR code generator, QR code for links, free QR code generator"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-6 lg:p-8">
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, qrCodeId: null })}
          onConfirm={() => handleDeleteQR(confirmDialog.qrCodeId)}
          title="Delete QR Code"
          message="Are you sure you want to delete this QR code? This action cannot be undone."
        />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              QR Code <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Generator</span>
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <p className="text-sm sm:text-base text-gray-600">Transform your links into QR codes instantly</p>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/5"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg shadow-purple-100/50 p-4 sm:p-6 lg:p-8 border border-purple-100">
                <form onSubmit={handleGenerateQR} className="space-y-6 sm:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Choose QR Type</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
                      {Object.entries(qrTypeIcons).map(([type, Icon]) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => {
                            setQrType(type);
                            setQrData({});
                          }}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center gap-1.5 sm:gap-2 ${
                            qrType === type
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-2 ring-purple-300'
                              : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100'
                          }`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="capitalize text-xs sm:text-sm font-medium">{type}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {renderInputFields()}

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center space-x-2 font-medium text-sm sm:text-base shadow-lg shadow-purple-200"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Create QR Code</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Generated QR Codes Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-3/5"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg shadow-purple-100/50 p-4 sm:p-6 lg:p-8 border border-purple-100">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    Generated QR Codes
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">{qrCodes.length} codes</span>
                </div>

                <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50">
                  {qrCodes.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 sm:py-16"
                    >
                      <QrCode className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-purple-200" />
                      <p className="text-sm sm:text-base text-gray-500">Your generated QR codes will appear here</p>
                    </motion.div>
                  ) : (
                    qrCodes.map((qr) => {
                      const TypeIcon = qrTypeIcons[qr.type] || QrCode;
                      return (
                        <motion.div
                          key={qr.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-br from-white to-purple-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group hover:shadow-md transition-all duration-300 border border-purple-100"
                        >
                          <img
                            src={qr.qr_code}
                            alt="QR Code"
                            className="w-24 h-24 sm:w-28 sm:h-28 object-contain bg-white rounded-lg sm:rounded-xl p-2 shadow-sm ring-1 ring-purple-100"
                          />
                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <TypeIcon className="w-3 h-3" />
                                {qr.type}
                              </span>
                              <span className="text-gray-400 text-xs sm:text-sm font-mono">#{qr.short_code}</span>
                            </div>
                            <p className="text-gray-700 truncate text-sm sm:text-base font-medium">{qr.content}</p>
                          </div>
                          <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDownloadQR(qr)}
                              className="text-purple-600 hover:text-purple-700 bg-purple-50 p-1.5 sm:p-2 rounded-lg sm:rounded-xl"
                              title="Download QR Code"
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setConfirmDialog({ isOpen: true, qrCodeId: qr.id })}
                              className="text-rose-600 hover:text-rose-700 bg-rose-50 p-1.5 sm:p-2 rounded-lg sm:rounded-xl"
                              title="Delete QR Code"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkQRGenerator;