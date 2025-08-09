import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../Components/LoadingSpinner';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await login(formData);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base">
              Sign in to your exclusive account
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-zinc-900/50 rounded-2xl p-6 sm:p-8 border border-zinc-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {(errors.general || error) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{errors.general || error}</p>
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gold font-medium mb-2 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-700 focus:border-red-500'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gold font-medium mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-700 focus:border-red-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-600 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-zinc-300">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900 text-zinc-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors border border-zinc-700"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-lg mr-2">🔥</span>
                    VIP
                  </div>
                </button>
                <button
                  type="button"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors border border-zinc-700"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-lg mr-2">💎</span>
                    Premium
                  </div>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-zinc-400 text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-zinc-500 text-xs">
              By signing in, you agree to our{' '}
              <Link to="/privacy" className="text-red-400 hover:text-red-300">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="text-red-400 hover:text-red-300">
                Terms of Service
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
