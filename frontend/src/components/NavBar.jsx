import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, LogOut, User, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  console.log(user);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://qr-code-simo.onrender.com/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/get-started');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-cyan-900 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-800/40 rounded-xl backdrop-blur-sm group-hover:bg-blue-700/50 transition-all duration-300">
              <QrCode className="text-cyan-100" size={24} />
            </div>
            <span className="text-xl font-bold text-cyan-50 group-hover:text-white transition-colors duration-300">
              QRCraft
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Desktop menu items remain the same */}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-100 hover:text-white transition-colors duration-300 bg-blue-800/40 p-2 rounded-lg hover:bg-blue-700/50"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 pt-12 pb-8">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                          <User size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Welcome back</p>
                          <p className="text-white font-medium">{user.first_name}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Link
                          to="/qr-code-scanner"
                          className="flex items-center justify-between w-full p-4 text-left text-gray-300 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="font-medium">Scanner</span>
                          <ChevronRight size={20} className="text-gray-500" />
                        </Link>
                        <Link
                          to="/qr-code-generate"
                          className="flex items-center justify-between w-full p-4 text-left text-gray-300 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="font-medium">Generator</span>
                          <ChevronRight size={20} className="text-gray-500" />
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center w-full p-4 mt-4 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl backdrop-blur-sm transition-all duration-200"
                        >
                          <LogOut size={20} className="mr-2" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/qr-code-scanner"
                        className="flex items-center justify-between w-full p-4 text-left text-gray-300 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="font-medium">Scanner</span>
                        <ChevronRight size={20} className="text-gray-500" />
                      </Link>
                      <Link
                        to="/get-started"
                        className="flex items-center justify-between w-full p-4 text-left text-gray-300 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="font-medium">Get Started</span>
                        <ChevronRight size={20} className="text-gray-500" />
                      </Link>
                      <Link
                        to="/sign-up"
                        className="flex items-center justify-center w-full p-4 mt-4 text-white font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;