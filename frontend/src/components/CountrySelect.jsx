import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
  { code: 'MA', name: 'Morocco', phone: '+212', flag: '🇲🇦' },
  { code: 'US', name: 'United States', phone: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', phone: '+44', flag: '🇬🇧' },
  { code: 'FR', name: 'France', phone: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', phone: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', phone: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', phone: '+34', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', phone: '+351', flag: '🇵🇹' },
  { code: 'BE', name: 'Belgium', phone: '+32', flag: '🇧🇪' },
  { code: 'NL', name: 'Netherlands', phone: '+31', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', phone: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', phone: '+43', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', phone: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', phone: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', phone: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', phone: '+358', flag: '🇫🇮' },
  { code: 'IE', name: 'Ireland', phone: '+353', flag: '🇮🇪' },
  { code: 'CA', name: 'Canada', phone: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', phone: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', phone: '+64', flag: '🇳🇿' },
];

const CountrySelect = ({ selectedCountry, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.phone.includes(searchQuery)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-colors duration-200 bg-white"
      >
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="text-gray-700 font-medium">{selectedCountry.phone}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-72 bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden"
          >
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 text-sm"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    onSelect(country);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-purple-50 transition-colors duration-200"
                >
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-700">{country.name}</p>
                    <p className="text-xs text-gray-500">{country.phone}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelect;
