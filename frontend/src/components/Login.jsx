import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Loader } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const apiBaseUrl = window.location.hostname === 'localhost' 
    ? "http://localhost:5000" 
    : "https://qr-code-backend-mv59.onrender.com";

  useEffect(() => {
    const state = location.state;
    if (state && state.message) {
      setSuccessMessage(state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${apiBaseUrl}/login`, {
        email: email.trim(),
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setSuccessMessage("Login successful!");
      setError("");
      setPassword('');
      navigate("/qr-code-generate", { replace: true });
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError('Invalid email or password. Please try again.');
            break;
          case 403:
            setError('Account is locked. Please contact support.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-cyan-100">
              Sign in to continue to QRCraft
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-center backdrop-blur-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-200 px-4 py-3 rounded-xl text-center backdrop-blur-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-cyan-100 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300 group-hover:text-cyan-200 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-300/20 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm placeholder-cyan-300/50 transition-all hover:bg-white/10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-100 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300 group-hover:text-cyan-200 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-300/20 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm placeholder-cyan-300/50 transition-all hover:bg-white/10"
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <a
                href="/sign-up"
                className="text-sm text-cyan-100 hover:text-white transition-colors hover:underline"
              >
                Need an account?
              </a>
              <a
                href="/forgot-password"
                className="text-sm text-cyan-100 hover:text-white transition-colors hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-blue-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2" size={20} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-cyan-100">
          {new Date().getFullYear()} QRCraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;