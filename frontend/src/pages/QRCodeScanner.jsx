import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { QrCode, Upload, Scan, Clipboard, Camera } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const QRCodeScanner = () => {
  const [scannedLink, setScannedLink] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const result = await QrScanner.scanImage(file);
      setScannedLink(result);
    } catch (error) {
      console.error('Error scanning QR code:', error);
      toast.error('Could not read QR code. Please try a different image.', {
        style: {
          border: '1px solid #FCA5A5',
          padding: '16px',
          color: '#DC2626',
        },
        iconTheme: {
          primary: '#DC2626',
          secondary: '#FEE2E2',
        },
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!', {
      style: {
        border: '1px solid #E9D5FF',
        padding: '16px',
        background: '#FAF5FF',
        color: '#6B46C1',
      },
      iconTheme: {
        primary: '#9333EA',
        secondary: '#FAF5FF',
      },
    });
  };

  const startCameraScan = () => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
        setScannedLink(result);
      });
      qrScannerRef.current.start();
      setIsScanning(true);
    }
  };

  const stopCameraScan = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    setIsScanning(false);
  };

  const captureQRCode = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      QrScanner.scanImage(canvas)
        .then((result) => {
          setScannedLink(result);
        })
        .catch((error) => {
          console.error('Error capturing QR code:', error);
          toast.error('Failed to capture QR code. Please try again.', {
            style: {
              border: '1px solid #FCA5A5',
              padding: '16px',
              color: '#DC2626',
            },
            iconTheme: {
              primary: '#DC2626',
              secondary: '#FEE2E2',
            },
          });
        });
    }
  };

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Scanner Controls */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-200 shadow-xl space-y-4 sm:space-y-6 lg:space-y-8 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-200">
                <QrCode className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                QR Scanner
              </h1>
            </div>

            {/* File Upload */}
            <div className="space-y-3 sm:space-y-4">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={triggerFileInput}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-purple-500/25"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Upload QR Code</span>
              </button>
            </div>

            {/* Camera Scanning */}
            <div className="space-y-3 sm:space-y-4">
              {!isScanning ? (
                <button 
                  onClick={startCameraScan}
                  className="w-full bg-white hover:bg-purple-50 text-gray-700 border border-purple-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Start Camera Scan</span>
                </button>
              ) : (
                <button 
                  onClick={stopCameraScan}
                  className="w-full bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Stop Camera Scan</span>
                </button>
              )}
              <div className="relative rounded-xl overflow-hidden border border-purple-200 shadow-lg">
                <video 
                  ref={videoRef} 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover bg-purple-900/10" 
                />
                <button
                  onClick={captureQRCode}
                  className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm hover:bg-purple-50 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 border border-purple-200"
                >
                  <Scan className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <span className="text-sm sm:text-base">Capture QR Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Result and Preview */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-200 shadow-xl hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
            {(previewImage || scannedLink) ? (
              <div className="space-y-4 sm:space-y-6">
                {previewImage && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200 shadow-lg">
                    <img 
                      src={previewImage} 
                      alt="QR Code Preview" 
                      className="max-w-full h-48 sm:h-56 lg:h-64 object-contain rounded-lg mx-auto"
                    />
                  </div>
                )}

                {scannedLink && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                      <h2 className="text-xs sm:text-sm font-medium mb-2 flex items-center text-purple-700">
                        <Scan className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                        Scanned Link
                      </h2>
                      <p className="text-gray-700 break-all font-mono text-xs sm:text-sm">{scannedLink}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(scannedLink)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-purple-500/25"
                    >
                      <Clipboard className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      <span className="text-sm sm:text-base">Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 text-center">
                <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                  <QrCode className="text-purple-500 w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-gray-700 font-medium text-base sm:text-lg">
                    No QR Code Detected
                  </p>
                  <p className="text-purple-600 text-xs sm:text-sm">
                    Upload a QR code image or use your camera to scan
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default QRCodeScanner;