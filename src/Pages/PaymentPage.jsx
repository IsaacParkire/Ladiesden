import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Bitcoin, 
  Shield, 
  Lock, 
  CheckCircle,
  ArrowLeft,
  Crown,
  Star,
  AlertCircle,
  Phone,
  Mail,
  Users
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// Icon mapping for plan types
const getPlanIcon = (planId) => {
  const iconMap = {
    basic: <Users className="w-8 h-8" />,
    premium: <Star className="w-8 h-8" />,
    vip: <Crown className="w-8 h-8" />
  };
  return iconMap[planId] || <Star className="w-8 h-8" />;
};

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Visa, Mastercard, American Express',
    color: 'from-blue-500 to-blue-600',
    popular: true
  },
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Kenya\'s leading mobile money service',
    color: 'from-green-500 to-green-600',
    popular: true
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Bitcoin, Ethereum, USDT',
    color: 'from-orange-500 to-orange-600',
    popular: false
  }
];

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Card payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // M-Pesa
    mpesaPhone: '',
    // Crypto
    cryptoWallet: '',
    cryptoType: 'bitcoin',
    // Billing
    email: '',
    phone: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});  // Get the selected plan from location state or use default for testing
  const defaultPlan = {
    id: 'premium',
    name: 'Premium',
    subtitle: 'MOST POPULAR',
    price: 'KSH 25,000',
    originalPrice: 'KSH 30,000',
    billing: '/month',
    color: 'from-yellow-400 to-yellow-600',
    popular: true,
    description: 'Unlock exclusive experiences and premium content',
    features: [
      'Access to premium themed nights and Her Secrets',
      'Priority bookings and early RSVP access',
      'Access to all public events + select VIP nights',
      'Premium uncensored gallery access',
      'Premium customer support'
    ]
  };
  
  const selectedPlan = location.state?.plan || defaultPlan;

  // Only redirect if accessed without plan and not in development mode
  useEffect(() => {
    if (!location.state?.plan && process.env.NODE_ENV === 'production') {
      navigate('/membership');
    }
  }, [location.state?.plan, navigate]);

  const handleInputChange = (e) => {
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

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    // Payment method specific validations
    if (selectedMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      }
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    } else if (selectedMethod === 'mpesa') {
      if (!formData.mpesaPhone.trim()) {
        newErrors.mpesaPhone = 'M-Pesa phone number is required';
      }
    } else if (selectedMethod === 'crypto') {
      if (!formData.cryptoWallet.trim()) {
        newErrors.cryptoWallet = 'Wallet address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would integrate with actual payment providers
      console.log('Payment data:', { selectedPlan, selectedMethod, formData });
      
      // Redirect to success page or dashboard
      navigate('/payment-success', { 
        state: { 
          plan: selectedPlan,
          method: selectedMethod,
          transactionId: 'TXN' + Date.now()
        } 
      });
    } catch (error) {
      setErrors({ general: 'Payment processing failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove non-digits and format with spaces
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Payment Form */}
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Membership Plans
              </Link>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-4">
                Complete Your Payment
              </h1>
              <p className="text-zinc-400">
                Secure payment processing with 256-bit SSL encryption
              </p>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedMethod === method.id
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-3`}>
                      {method.icon}
                    </div>
                    <h4 className="font-semibold text-white text-sm">{method.name}</h4>
                    <p className="text-zinc-400 text-xs">{method.description}</p>
                    {method.popular && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-black text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Card Payment Fields */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Card Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      {errors.cvv && (
                        <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.cardName && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* M-Pesa Payment Fields */}
              {selectedMethod === 'mpesa' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">M-Pesa Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      name="mpesaPhone"
                      value={formData.mpesaPhone}
                      onChange={handleInputChange}
                      placeholder="+254 712 345 678"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.mpesaPhone && (
                      <p className="text-red-400 text-sm mt-1">{errors.mpesaPhone}</p>
                    )}
                    <p className="text-zinc-400 text-sm mt-1">
                      You will receive an M-Pesa prompt on this number
                    </p>
                  </div>
                </div>
              )}

              {/* Crypto Payment Fields */}
              {selectedMethod === 'crypto' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Cryptocurrency Payment</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Cryptocurrency Type
                    </label>
                    <select
                      name="cryptoType"
                      value={formData.cryptoType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="bitcoin">Bitcoin (BTC)</option>
                      <option value="ethereum">Ethereum (ETH)</option>
                      <option value="usdt">Tether (USDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Your Wallet Address
                    </label>
                    <input
                      type="text"
                      name="cryptoWallet"
                      value={formData.cryptoWallet}
                      onChange={handleInputChange}
                      placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.cryptoWallet && (
                      <p className="text-red-400 text-sm mt-1">{errors.cryptoWallet}</p>
                    )}
                    <p className="text-zinc-400 text-sm mt-1">
                      We'll send payment instructions to your email
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Contact Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 712 345 678"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-red-600 bg-zinc-900 border-zinc-700 rounded focus:ring-red-500"
                />
                <div className="text-sm">
                  <p className="text-zinc-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-red-400 hover:text-red-300">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-red-400 hover:text-red-300">
                      Privacy Policy
                    </Link>
                  </p>
                  {errors.agreeToTerms && (
                    <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </>                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay {selectedPlan.price} {selectedPlan.billing}
                  </>
                )}
              </button>
            </motion.form>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-8 border border-zinc-800 sticky top-24"
            >              {/* Plan Details */}              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${selectedPlan.color || 'from-yellow-400 to-yellow-600'} rounded-full flex items-center justify-center`}>
                  {getPlanIcon(selectedPlan.id)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedPlan.name} Membership</h3>
                  <p className="text-zinc-400">{selectedPlan.description}</p>
                </div>
              </div>{/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">Monthly Subscription</span>
                  <span className="text-white font-semibold">{selectedPlan.price}</span>
                </div>{selectedPlan.originalPrice && (
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Savings</span>
                    <span className="text-green-400 font-semibold">
                      {(() => {
                        const originalPrice = typeof selectedPlan.originalPrice === 'string' 
                          ? parseInt(selectedPlan.originalPrice.replace(/[^0-9]/g, ''))
                          : selectedPlan.originalPrice;
                        const currentPrice = typeof selectedPlan.price === 'string'
                          ? parseInt(selectedPlan.price.replace(/[^0-9]/g, ''))
                          : selectedPlan.price;
                        return `KSH ${(originalPrice - currentPrice).toLocaleString()}`;
                      })()}
                    </span>
                  </div>
                )}
                <hr className="border-zinc-700" />
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-semibold">Total Due Today</span>
                  <span className="text-white font-bold">{selectedPlan.price}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 mb-6">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Secure Payment
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    256-bit SSL encryption
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    PCI DSS compliant
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cancel anytime
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/254712527543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    +254 712 527 543
                  </a>
                  <a
                    href="mailto:thelaydiesden@gmail.com"
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    thelaydiesden@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
