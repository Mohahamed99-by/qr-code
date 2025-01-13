import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
      const response = await fetch('http://localhost:5000/protected', {
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
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-cyan-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-800/40 rounded-xl backdrop-blur-sm group-hover:bg-blue-700/50 transition-all duration-300">
              <QrCode className="text-cyan-100" size={24} />
            </div>
            <span className="text-xl font-bold text-cyan-50 group-hover:text-white transition-colors duration-300">
              QRCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <div className="flex items-center space-x-6">
                  <Link
                    to="/qr-code-scanner"
                    className="text-cyan-100 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800/40"
                  >
                    <span>Scanner</span>
                  </Link>
                  <Link
                    to="/qr-code-generate"
                    className="text-cyan-100 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800/40"
                  >
                    <span>Generator</span>
                  </Link>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-blue-800/40 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-blue-700/50 transition-all duration-300"
                  >
                    <User size={20} className="text-cyan-100" />
                    <span className="text-cyan-100 font-medium">Account</span>
                  </button>

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden"
                    >
                      <div className="p-4 bg-blue-50">
                        <p className="text-sm text-blue-900 font-medium truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-300 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/qr-code-scanner"
                  className="text-cyan-100 hover:text-white font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-800/40"
                >
                  Scanner
                </Link>
                <Link
                  to="/get-started"
                  className="text-cyan-100 hover:text-white font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-800/40"
                >
                  Get Started
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-cyan-500 text-white px-5 py-2 rounded-lg hover:bg-cyan-400 transition-all duration-300 font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-100 hover:text-white transition-colors duration-300 bg-blue-800/40 p-2 rounded-lg hover:bg-blue-700/50"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-blue-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-blue-900 font-medium">
                  {user.email}
                </div>
                <Link
                  to="/qr-code-scanner"
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  Scanner
                </Link>
                <Link
                  to="/qr-code-generate"
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  Generator
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/qr-code-scanner"
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  Scanner
                </Link>
                <Link
                  to="/get-started"
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/sign-up"
                  className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-center mt-2 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;