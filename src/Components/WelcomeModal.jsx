import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Award, Gift } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose, userName, membershipType, isNewUser }) => {
  const getMembershipIcon = (type) => {
    switch(type) {
      case 'Basic': return '👤';
      case 'Premium': return '⭐';
      case 'VIP Elite': return '💎';
      default: return '👤';
    }
  };

  const getMembershipColor = (type) => {
    switch(type) {
      case 'Basic': return 'from-gray-400 to-gray-500';
      case 'Premium': return 'from-yellow-400 to-yellow-600';
      case 'VIP Elite': return 'from-pink-500 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const benefits = {
    'Basic': [
      'Access to community features',
      'Basic service bookings',
      'Monthly newsletters',
      'Exclusive member pricing'
    ],
    'Premium': [
      'Priority booking access',
      'Exclusive premium services',
      '15% discount on all services',
      'Monthly wellness package',
      'VIP customer support'
    ],
    'VIP Elite': [
      'All premium benefits',
      'Unlimited service access',
      '25% discount on everything',
      'Personal wellness consultant',
      'Exclusive VIP events',
      'Complimentary monthly treatments'
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-2xl"
              >
                🎉
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isNewUser ? 'Welcome to Laydies Den!' : 'Welcome back!'}
              </h2>
              
              <p className="text-gray-600">
                {isNewUser 
                  ? `Hi ${userName}! Thank you for joining our community.`
                  : `Hi ${userName}! Great to see you again.`
                }
              </p>
            </div>

            {/* Membership Badge */}
            <div className={`bg-gradient-to-r ${getMembershipColor(membershipType)} rounded-xl p-4 text-white text-center mb-6`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">{membershipType} Member</span>
                <span className="text-2xl">{getMembershipIcon(membershipType)}</span>
              </div>
              <p className="text-sm opacity-90">
                {isNewUser ? 'Your membership is now active!' : 'Your membership status is active'}
              </p>
            </div>

            {/* Membership Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-pink-500" />
                Your Benefits
              </h3>
              <ul className="space-y-2">
                {benefits[membershipType]?.slice(0, 4).map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="space-y-3">
              {isNewUser && (
                <button
                  onClick={() => {
                    onClose();
                    // Navigate to services or booking page
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
                >
                  Explore Our Services
                </button>
              )}
              
              {membershipType === 'Basic' && (
                <button
                  onClick={() => {
                    onClose();
                    // Navigate to membership upgrade page
                  }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all text-sm"
                >
                  Upgrade Membership
                </button>
              )}
              
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Continue to Profile
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact our support team anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
