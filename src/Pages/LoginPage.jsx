import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const { syncCartWithBackend, items: cartItems } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        // Sync local cart with backend if user has items in local cart
        if (cartItems.length > 0) {
          await syncCartWithBackend(cartItems);
        }
        
        // Redirect to profile page
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-400">
            Sign in to your Laydies Den account
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}          className="mt-8 space-y-6 bg-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-800"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-100 transition-colors border border-gray-200"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/accounts/oauth/google/login/`}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition-colors border border-gray-800"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/accounts/oauth/apple/login/`}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {/* Correct Apple SVG icon, larger and visually balanced */}
                <svg className="w-6 h-6 mr-2 align-middle" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.6 17.6c-.032-3.2 2.624-4.736 2.736-4.8-1.504-2.176-3.84-2.496-4.672-2.528-1.984-.208-3.872 1.152-4.864 1.152-.992 0-2.528-1.12-4.16-1.088-2.144.032-4.128 1.248-5.248 3.168-2.24 3.872-.576 9.6 1.6 12.736 1.12 1.6 2.432 3.392 4.16 3.328 1.664-.064 2.288-1.056 4.288-1.056 2 0 2.56 1.056 4.288 1.024 1.728-.032 2.816-1.6 3.904-3.2 1.248-1.824 1.76-3.584 1.792-3.68-.032-.016-3.424-1.312-3.456-5.184zm-6.464-11.36c.832-1.024 1.408-2.432 1.248-3.84-1.216.048-2.656.8-3.52 1.792-.768.896-1.472 2.336-1.216 3.712 1.344.096 2.72-.672 3.488-1.664z"/>
                </svg>
              </span>
              Continue with Apple
            </button>
          </div>
          {/* End Social Login Buttons */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-black/50 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-600 rounded bg-black"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-pink-400 hover:text-pink-300 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>          <motion.button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing you in...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>          {/* Success message */}
          {loading && (
            <div className="text-center text-sm text-green-400 mt-2">
              Welcome back! Redirecting to your profile...
            </div>
          )}

          <div className="text-center">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
              Sign up
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}