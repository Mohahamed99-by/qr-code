import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  QrCode,
  LogOut,
  Menu,
  ScanLine,
  PlusCircle,
  UserPlus,
  ArrowRight,
  Power
} from 'lucide-react';

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

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://qr-code-db.onrender.com/user/profile', {
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
    <nav className="bg-gradient-to-r from-purple-900 to-pink-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-purple-800/40 rounded-xl backdrop-blur-sm group-hover:bg-purple-700/50 transition-all duration-300">
              <QrCode className="text-pink-100" size={24} />
            </div>
            <span className="text-xl font-bold text-pink-50 group-hover:text-white transition-colors duration-300">
              QRCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to='/examples'>
              <span className="text-pink-100 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-800/40">
                <QrCode size={18} />
                <span>Examples</span>
              </span>
            </Link>
            {user ? (
              <>

                <div className="flex items-center space-x-6">

                  <Link
                    to="/qr-code-scanner"
                    className="text-pink-100 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-800/40"
                  >
                    <ScanLine size={18} />
                    <span>Scanner</span>
                  </Link>
                  <Link
                    to="/qr-code-generate"
                    className="text-pink-100 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-800/40"
                  >
                    <PlusCircle size={18} />
                    <span>Generator</span>
                  </Link>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    className="flex items-center space-x-2 bg-purple-800/40 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-purple-700/50 transition-all duration-300"
                  >
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {user.first_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-purple-100 overflow-hidden">
                      <div className="p-4 bg-purple-50">
                        {user.profile_image ? (
                          <img
                            src={user.profile_image}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-purple-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto">
                            <span className="text-3xl font-bold text-white">
                              {user.first_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-purple-900 font-medium text-center mt-2 truncate">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-purple-600 text-center">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-300 flex items-center"
                      >
                        <Power size={16} className="mr-2" />
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
                  className="text-pink-100 hover:text-white font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-purple-800/40 flex items-center space-x-2"
                >
                  <ScanLine size={18} />
                  <span>Scanner</span>
                </Link>
                <Link
                  to="/get-started"
                  className="text-pink-100 hover:text-white font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-purple-800/40 flex items-center space-x-2"
                >
                  <ArrowRight size={18} />
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-md flex items-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-pink-100 hover:text-white transition-colors duration-300 bg-purple-800/40 p-2 rounded-lg hover:bg-purple-700/50"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-purple-100">
          <div className="px-4 pt-2 pb-3 space-y-1">

            {user ? (
              <>
                <div className="flex items-center space-x-3 p-2">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {user.first_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm text-purple-900 font-medium truncate">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-purple-600">{user.email}</p>
                  </div>
                </div>
                <Link to="/examples" className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 flex items-center space-x-2">
                  <QrCode size={18} />
                  <span>Examples</span>
                </Link>

                <Link
                  to="/qr-code-scanner"
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <ScanLine size={18} />
                  <span>Scanner</span>
                </Link>
                <Link
                  to="/qr-code-generate"
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <PlusCircle size={18} />
                  <span>Generator</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Power size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/qr-code-scanner"
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <ScanLine size={18} />
                  <span>Scanner</span>
                </Link>
                <Link
                  to="/get-started"
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowRight size={18} />
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-center mt-2 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
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