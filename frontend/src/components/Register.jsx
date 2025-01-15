import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader } from 'lucide-react';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const apiBaseUrl = "https://qr-code-db.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${apiBaseUrl}/register`, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate('/get-started', {
        state: {
          message: 'Registration successful! Please log in.'
        }
      });
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError(err.response.data.message || 'Invalid registration details.');
            break;
          case 409:
            setError('This email is already registered. Please sign in instead.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(err.response.data.message || 'Registration failed.');
        }
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-purple-200 transform hover:scale-[1.01] transition-all duration-300">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              Join QRCraft
            </h2>
            <p className="text-gray-600">
              Create your account to get started
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 group-hover:text-purple-500 transition-colors" size={20} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all hover:border-purple-300"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 group-hover:text-purple-500 transition-colors" size={20} />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all hover:border-purple-300"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 group-hover:text-purple-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all hover:border-purple-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 group-hover:text-purple-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all hover:border-purple-300"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 group-hover:text-purple-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all hover:border-purple-300"
                  placeholder="********"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-pink-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2" size={20} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a
                  href="/get-started"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white/80">
          {new Date().getFullYear()} QRCraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;