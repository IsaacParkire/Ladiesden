import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, CreditCard, User, MapPin, Shield, CheckCircle, UserPlus, Smartphone, Bitcoin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const { items: cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  // Check authentication on mount
  useEffect(() => {
    if (isAuthenticated === false) {
      setShowLoginPrompt(true);
    }
  }, [isAuthenticated]);
  // If cart is empty, redirect to boutique
  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      navigate('/boutique');
    }
  }, [cartItems, navigate]);
  const [formData, setFormData] = useState({
    // Personal Info - pre-fill with user data if authenticated
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    mpesaPhone: '',
    cryptoWallet: '',
    cryptoType: 'bitcoin',
    
    // Preferences
    giftMessage: '',    
    deliveryInstructions: ''
  });

  // Handle input changes for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Define Mombasa delivery zones and fees
  const mombasaZones = [
    { name: 'Sabasaba', fee: 0 },
    { name: 'Majengo', fee: 0 },
    { name: 'Tononoka', fee: 200 },
    { name: 'Makadara', fee: 250 },
    { name: 'Kongowea', fee: 300 },
    { name: 'Nyali', fee: 400 },
    { name: 'Likoni', fee: 500 },
    { name: 'Bamburi', fee: 600 },
    { name: 'Mtwapa', fee: 800 },
    // ...add more as needed
    { name: 'Other (enter location)', fee: null },
  ];
  const [selectedZone, setSelectedZone] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Update delivery fee when zone changes
  useEffect(() => {
    const zone = mombasaZones.find(z => z.name === selectedZone);
    if (zone) {
      setDeliveryFee(zone.fee || 0);
    }
    if (zone && zone.fee === null) {
      setDeliveryFee(1000); // Default fee for custom/unknown area
    }
  }, [selectedZone]);

  // Use actual cart items instead of hardcoded items
  const subtotal = typeof totalPrice === 'number' ? totalPrice : 0;
  const shipping = deliveryFee;
  const vat = Math.round(subtotal * 0.16); // VAT at 16%, rounded to nearest KSH
  const total = subtotal + shipping + vat;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      setStep(4); // Success page
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Shipping", icon: MapPin },
    { number: 3, title: "Payment", icon: CreditCard },
    { number: 4, title: "Complete", icon: CheckCircle }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />, // smaller for checkout
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Kenya\'s leading mobile money service',
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="w-5 h-5" />,
      description: 'Bitcoin, Ethereum, USDT',
    },
  ];
  const [selectedMethod, setSelectedMethod] = useState('mpesa');

  return (
    <div className="pt-24 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">        {/* Login Prompt for Anonymous Users */}
        {showLoginPrompt && isAuthenticated === false && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-900/20 border border-red-600/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <UserPlus className="text-red-400 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Account Required for Checkout
                </h3>
                <p className="text-zinc-300 mb-4">
                  Please log in to your account or create a new one to continue with your purchase. 
                  This helps us secure your order and provide better service.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/login"
                    state={{ from: '/checkout' }}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    state={{ from: '/checkout' }}
                    className="flex items-center justify-center gap-2 border border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Create Account
                  </Link>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="text-zinc-400 hover:text-white px-4 py-3 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-gold hover:text-red-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="text-green-500" size={20} />
            <span className="text-sm text-zinc-400">Secure Checkout</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((stepItem, index) => {
                const StepIcon = stepItem.icon;
                const isActive = step === stepItem.number;
                const isComplete = step > stepItem.number;
                
                return (
                  <div key={stepItem.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          isComplete
                            ? 'bg-green-600 border-green-600 text-white'
                            : isActive
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'border-zinc-600 text-zinc-400'
                        }`}
                      >
                        <StepIcon size={20} />
                      </div>
                      <span
                        className={`mt-2 text-sm ${
                          isActive ? 'text-red-400' : isComplete ? 'text-green-400' : 'text-zinc-400'
                        }`}
                      >
                        {stepItem.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${
                          step > stepItem.number ? 'bg-green-600' : 'bg-zinc-600'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {step < 4 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900/50 rounded-xl p-6"
              >
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Delivery Area (Mombasa Only)</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Select Your Area *
                          </label>
                          <select
                            name="deliveryZone"
                            value={selectedZone}
                            onChange={e => setSelectedZone(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">-- Choose Area --</option>
                            {mombasaZones.map(zone => (
                              <option key={zone.name} value={zone.name}>{zone.name}</option>
                            ))}
                          </select>
                        </div>
                        {selectedZone === 'Other (enter location)' && (
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                              Enter Your Location
                            </label>
                            <input
                              type="text"
                              name="customLocation"
                              value={customLocation}
                              onChange={e => setCustomLocation(e.target.value)}
                              required
                              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="e.g. Tudor, Changamwe, etc."
                            />
                          </div>
                        )}
                        <div className="text-sm text-zinc-300 mt-2">
                          {selectedZone && (
                            deliveryFee === 0
                              ? <span className="text-green-400 font-semibold">Free delivery in {selectedZone}!</span>
                              : <span>Delivery fee to {selectedZone === 'Other (enter location)' ? customLocation || 'your area' : selectedZone}: <span className="text-gold font-semibold">KSH {deliveryFee}</span></span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Delivery Instructions (Optional)
                          </label>
                          <textarea
                            name="deliveryInstructions"
                            value={formData.deliveryInstructions}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Special delivery instructions..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {paymentMethods.map((method) => (
                          <button
                            type="button"
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-300 w-full text-left ${selectedMethod === method.id ? 'border-red-500 bg-red-500/10' : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'}`}
                          >
                            <div className="mb-2">{method.icon}</div>
                            <span className="font-semibold text-white text-sm">{method.name}</span>
                            <span className="text-zinc-400 text-xs">{method.description}</span>
                          </button>
                        ))}
                      </div>
                      {/* Payment Fields */}
                      {selectedMethod === 'mpesa' && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-zinc-300 mb-2">M-Pesa Phone Number *</label>
                          <input
                            type="tel"
                            name="mpesaPhone"
                            value={formData.mpesaPhone || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="07XXXXXXXX"
                          />
                        </div>
                      )}
                      {selectedMethod === 'card' && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber || ''}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-zinc-300 mb-2">Expiry Date *</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate || ''}
                                onChange={handleInputChange}
                                required
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-zinc-300 mb-2">CVV *</label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv || ''}
                                onChange={handleInputChange}
                                required
                                placeholder="123"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedMethod === 'crypto' && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Crypto Wallet Address *</label>
                          <input
                            type="text"
                            name="cryptoWallet"
                            value={formData.cryptoWallet || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter your wallet address"
                          />
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Crypto Type</label>
                          <select
                            name="cryptoType"
                            value={formData.cryptoType || 'bitcoin'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="bitcoin">Bitcoin</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="usdt">USDT</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      {step === 3 ? 'Place Order' : 'Continue'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image || item.primary_image || (item.images && item.images[0]?.image) || 'https://via.placeholder.com/64?text=Product'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-white text-sm">{item.name}</h3>
                        <p className="text-zinc-400 text-xs">Qty: {item.quantity}</p>
                        <p className="text-gold font-semibold">
                          {typeof item.price === 'string' ? item.price : `KSH ${item.price?.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>                <div className="border-t border-zinc-700 pt-4 space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span>KSH {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `KSH ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>VAT (16%)</span>
                    <span>KSH {vat.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-zinc-700 pt-2">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-gold">KSH {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Page */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-zinc-300 mb-2">Thank you for your purchase</p>
            <p className="text-zinc-400 mb-8">Order #LD-{Date.now().toString().slice(-6)}</p>
            
            <div className="max-w-md mx-auto bg-zinc-900/50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">What's Next?</h2>
              <div className="text-left space-y-2 text-zinc-300">
                <p>• Order confirmation sent to your email</p>
                <p>• Processing time: 1-2 business days</p>
                <p>• Estimated delivery: 3-5 business days</p>
                <p>• Tracking information will be provided</p>
              </div>
            </div>

            <div className="space-x-4">
              <Link
                to="/"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/connect"
                className="inline-block border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-8 py-3 rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
