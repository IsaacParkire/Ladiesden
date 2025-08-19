import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Lock, Mail, User, Phone, Calendar, Crown, Star, Shield, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { membershipAPI } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const { syncCartWithBackend, items: cartItems } = useCart();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    password: '',
    password_confirm: '',
    agreeToTerms: false,
    agreeToMarketing: false,
    selectedMembership: 'basic'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);  // Fetch membership plans on component mount
  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        console.log('Fetching membership plans...');
        const response = await membershipAPI.getPlans();
        console.log('Membership plans response:', response);
        console.log('Response data:', response.data);
        
        // Handle different response structures
        let plans = [];
        if (Array.isArray(response.data)) {
          plans = response.data;
        } else if (response.data && Array.isArray(response.data.results)) {
          plans = response.data.results;
        } else if (response.data) {
          plans = [response.data];
        }
        
        console.log('Setting membership plans:', plans);
        setMembershipPlans(plans);
      } catch (error) {
        console.error('Failed to fetch membership plans:', error);
        console.error('Error details:', error.response);
        setMembershipPlans([]); // Ensure it's always an array
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchMembershipPlans();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }
    
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.date_of_birth = 'You must be at least 18 years old';
      }
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Please confirm your password';
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({});
    }
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    try {
      console.log('Starting registration process...');
      console.log('Form data:', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        selectedMembership: formData.selectedMembership
      });
      
      // Register using AuthContext
      const result = await register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        password: formData.password,
        password_confirm: formData.password_confirm
      });
      
      console.log('Registration result:', result);
      
      if (result && result.success) {
        console.log('Registration successful, processing membership...');
        
        // Sync cart after successful registration and login
        if (cartItems.length > 0) {
          await syncCartWithBackend();
        }
        
        // Handle membership-based redirection
        const selectedPlan = membershipPlans.find(plan => plan.plan_type === formData.selectedMembership);
        console.log('Selected plan:', selectedPlan);
        
        if (!selectedPlan || selectedPlan.plan_type === 'basic') {
          // Basic membership - redirect to profile
          console.log('Redirecting to profile for basic membership');
          navigate('/profile');
        } else {
          // Premium/VIP membership - redirect to payment page with plan info
          console.log('Redirecting to payment page for premium/VIP');
          navigate('/payment', {
            state: {
              plan: selectedPlan,
              fromRegistration: true,
              userData: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone_number: formData.phone_number,
                date_of_birth: formData.date_of_birth,
                password: formData.password,
                password_confirm: formData.password_confirm
              }
            }
          });
        }
      } else {
        console.error('Registration failed - result not successful:', result);
        if (result && result.error) {
          console.error('Registration error details:', result.error);
        }
        // Error is already set in AuthContext state
      }
      
    } catch (error) {
      console.error('Registration exception:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Error is handled by AuthContext
    }
  };return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
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
              Join Laydies Den
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base">
              Create your exclusive account and enter a world of luxury
            </p>
          </motion.div>

          {/* Social Register Buttons */}
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
              <span className="w-5 h-5 flex items-center justify-center">
                {/* Apple SVG icon inline */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.04 0-.08 0-.12-.01-.17-1.09.95-2.08 2.07-2.06.08 0 .12 0 .12.01zm3.44 6.99c-1.14-.13-2.09.62-2.63.62-.55 0-1.39-.6-2.3-.58-.89.01-1.72.52-2.18 1.32-.93 1.61-.24 3.99.66 5.3.44.65.97 1.37 1.67 1.34.67-.03.93-.43 1.74-.43.8 0 1.04.43 1.74.42.72-.01 1.18-.66 1.62-1.31.51-.74.72-1.46.73-1.5-.02-.01-1.41-.54-1.43-2.13-.01-1.33 1.09-1.97 1.14-2.01-.62-.91-1.59-1.01-1.93-1.02zm-3.13-3.41c.38-.46.64-1.1.57-1.74-.55.02-1.21.37-1.6.83-.35.41-.66 1.07-.54 1.7.6.05 1.19-.31 1.57-.79zm-1.7 4.67c.03-1.13.93-1.67.97-1.7-.53-.77-1.36-.88-1.65-.89-.7-.07-1.36.41-1.72.41-.36 0-.91-.4-1.5-.39-.77.01-1.48.45-1.87 1.14-.8 1.39-.21 3.45.57 4.58.38.56.84 1.18 1.45 1.16.6-.02.82-.39 1.54-.39.72 0 .92.39 1.54.38.63-.01 1.03-.57 1.41-1.13.44-.64.62-1.27.63-1.3-.02-.01-1.19-.46-1.21-1.81zm-2.13-3.41c.32-.39.54-.93.48-1.47-.47.02-1.03.31-1.36.7-.3.35-.56.91-.46 1.45.51.04 1.01-.27 1.34-.68z"/></svg>
              </span>
              Continue with Apple
            </button>
          </div>
          {/* End Social Register Buttons */}

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 transition-all ${
                currentStep > 1 ? 'bg-red-600' : 'bg-zinc-800'
              }`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 transition-all ${
                currentStep > 2 ? 'bg-red-600' : 'bg-zinc-800'
              }`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-zinc-900/50 rounded-2xl p-6 sm:p-8 border border-zinc-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">              {/* General Error */}
              {error && (
                <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.first_name
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="First name"
                        />
                      </div>
                      {validationErrors.first_name && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.first_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.last_name
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="Last name"
                        />
                      </div>
                      {validationErrors.last_name && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.last_name}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
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
                        onChange={handleChange}                        className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                          validationErrors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Phone and Date of Birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.phone_number
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="+254 700 000 000"
                        />
                      </div>
                      {validationErrors.phone_number && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.phone_number}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.date_of_birth
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                        />
                      </div>
                      {validationErrors.date_of_birth && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.date_of_birth}</p>
                      )}
                    </div>                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Next Step
                  </button>
                </div>
              )}

              {/* Step 2: Password and Agreements */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Security & Agreements</h2>
                  
                  {/* Password Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          onChange={handleChange}                          className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.password
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {validationErrors.password && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="password_confirm"
                          value={formData.password_confirm}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            validationErrors.password_confirm
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {validationErrors.password_confirm && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.password_confirm}</p>
                      )}
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-red-600 bg-zinc-800 border-zinc-700 rounded focus:ring-red-500 focus:ring-2 mt-1"
                        />
                        <span className="ml-2 text-zinc-300 text-sm">
                          I agree to the{' '}
                          <Link to="/terms" className="text-red-400 hover:text-red-300">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-red-400 hover:text-red-300">
                            Privacy Policy
                          </Link>
                          {' '}*
                        </span>
                      </label>                      {validationErrors.agreeToTerms && (
                        <p className="text-red-400 text-xs mt-1 ml-6">{validationErrors.agreeToTerms}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToMarketing"
                          checked={formData.agreeToMarketing}
                          onChange={handleChange}
                          className="w-4 h-4 text-red-600 bg-zinc-800 border-zinc-700 rounded focus:ring-red-500 focus:ring-2 mt-1"
                        />
                        <span className="ml-2 text-zinc-300 text-sm">
                          I would like to receive marketing communications and exclusive offers
                        </span>
                      </label>
                    </div>
                  </div>                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      Next: Choose Membership
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Membership Selection */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Choose Your Membership</h2>
                  <p className="text-zinc-300 text-sm mb-6">
                    Select the membership plan that best fits your lifestyle. You can always upgrade later.
                  </p>                  {loadingPlans ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-3 text-zinc-300">Loading membership plans...</span>
                    </div>
                  ) : membershipPlans.length === 0 ? (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <p className="text-zinc-300 mb-4">Unable to load membership plans. Using default options:</p>
                      </div>
                      {/* Fallback plans */}
                      {[
                        { plan_type: 'basic', name: 'Basic', price: 0, currency: 'KSH', description: 'Free membership with basic access' },
                        { plan_type: 'premium', name: 'Premium', price: 25000, currency: 'KSH', description: 'Premium membership with exclusive features' },
                        { plan_type: 'vip', name: 'VIP Elite', price: 65000, currency: 'KSH', description: 'Ultimate VIP experience' }
                      ].map((plan) => {
                        const isSelected = formData.selectedMembership === plan.plan_type;
                        const planIcon = plan.plan_type === 'basic' ? Shield : 
                                       plan.plan_type === 'premium' ? Star : Crown;
                        const IconComponent = planIcon;
                        
                        return (
                          <motion.div
                            key={plan.plan_type}
                            whileHover={{ scale: 1.02 }}
                            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? 'border-red-500 bg-red-500/10' 
                                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, selectedMembership: plan.plan_type }))}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  plan.plan_type === 'basic' ? 'bg-zinc-700' :
                                  plan.plan_type === 'premium' ? 'bg-yellow-600' : 'bg-purple-600'
                                }`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                  <p className="text-zinc-300 text-sm">{plan.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-gold">
                                  {plan.price === 0 ? 'FREE' : `${plan.currency} ${plan.price.toLocaleString()}`}
                                </div>
                                <div className="text-xs text-zinc-400">per month</div>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-red-500" />
                            )}
                          </motion.div>
                        );
                      })}                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(membershipPlans || []).map((plan) => {
                        const isSelected = formData.selectedMembership === plan.plan_type;
                        const planIcon = plan.plan_type === 'basic' ? Shield : 
                                       plan.plan_type === 'premium' ? Star : Crown;
                        const IconComponent = planIcon;
                        
                        return (
                          <motion.div
                            key={plan.plan_type}
                            whileHover={{ scale: 1.02 }}
                            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? 'border-red-500 bg-red-500/10' 
                                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, selectedMembership: plan.plan_type }))}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  plan.plan_type === 'basic' ? 'bg-zinc-700' :
                                  plan.plan_type === 'premium' ? 'bg-yellow-600' : 'bg-purple-600'
                                }`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                  <p className="text-zinc-300 text-sm">{plan.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-gold">
                                  {plan.price === 0 ? 'FREE' : `${plan.currency} ${plan.price.toLocaleString()}`}
                                </div>
                                <div className="text-xs text-zinc-400">per month</div>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-red-500" />
                            )}
                            
                            <div className="mt-4 space-y-2">
                              <h4 className="text-sm font-semibold text-gold">Key Features:</h4>
                              <ul className="space-y-1">
                                {plan.features_list?.slice(0, 3).map((feature, index) => (
                                  <li key={index} className="text-xs text-zinc-300 flex items-start">
                                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                                {plan.features_list?.length > 3 && (
                                  <li className="text-xs text-zinc-400">
                                    +{plan.features_list.length - 3} more features...
                                  </li>
                                )}
                              </ul>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-zinc-400 text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}