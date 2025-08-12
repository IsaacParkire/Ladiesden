import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Lock, Mail, User, Phone, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    membershipType: 'basic',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }
    
    setErrors(newErrors);
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration successful:', formData);
      
      // Handle successful registration here
      // If user chose premium or VIP Elite membership, redirect to membership page for payment
      if (formData.membershipType === 'premium' || formData.membershipType === 'vip') {
        navigate('/membership');
      } else {
        // For basic (free) membership, redirect to dashboard or home
        navigate('/');
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const membershipTypes = [
    {
      id: 'basic',
      name: 'Basic Member',
      icon: '👤',
      price: 'Free',
      features: ['Basic access', 'Community features', 'Limited services']
    },
    {
      id: 'premium',
      name: 'Premium Member',
      icon: '💎',
      price: 'KSH 5,000/month',
      features: ['Full access', 'Priority booking', 'Exclusive events', 'Concierge service']
    },
    {
      id: 'vip',
      name: 'VIP Elite',
      icon: '👑',
      price: 'KSH 15,000/month',
      features: ['VIP access', 'Personal assistant', 'Private events', '24/7 support', 'Custom experiences']
    }
  ];

  return (
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
            </div>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-zinc-900/50 rounded-2xl p-6 sm:p-8 border border-zinc-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{errors.general}</p>
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
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.firstName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="First name"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.lastName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="Last name"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
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
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone and Date of Birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.phone
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                          placeholder="+254 700 000 000"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.dateOfBirth
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-zinc-700 focus:border-red-500'
                          }`}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>

                  {/* Membership Type Selection */}
                  <div>
                    <label className="block text-gold font-medium mb-4 text-sm">
                      Choose Your Membership
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {membershipTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            formData.membershipType === type.id
                              ? 'border-red-500 bg-red-900/20'
                              : 'border-zinc-700 hover:border-zinc-600'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, membershipType: type.id }))}
                        >
                          <div className="text-center">
                            <span className="text-2xl mb-2 block">{type.icon}</span>
                            <h3 className="font-bold text-white mb-1">{type.name}</h3>
                            <p className="text-gold font-semibold mb-2">{type.price}</p>
                            <div className="space-y-1">
                              {type.features.map((feature, index) => (
                                <p key={index} className="text-xs text-zinc-400">{feature}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

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
                          onChange={handleChange}
                          className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.password
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
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gold font-medium mb-2 text-sm">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-12 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.confirmPassword
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
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
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
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-red-400 text-xs mt-1 ml-6">{errors.agreeToTerms}</p>
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
                  </div>

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
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
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