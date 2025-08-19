import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar,
  Crown,
  Star,
  Heart,
  ArrowRight,
  Phone
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const location = useLocation();
  const { plan, method, transactionId } = location.state || {};

  if (!plan) {
    return (
      <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Payment information not found</h1>
          <Link to="/membership" className="text-gold hover:text-yellow-300">
            Return to Membership Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-zinc-300 mb-6">
            Welcome to {plan.name} Membership
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 rounded-full">
            <span className="text-zinc-400">Transaction ID:</span>
            <span className="text-white font-mono">{transactionId}</span>
          </div>
        </motion.div>

        {/* Plan Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-8 border border-zinc-800 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center`}>
                {plan.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{plan.name} Membership</h2>
                <p className="text-zinc-400">{plan.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{plan.price}</p>
              {plan.billing && <p className="text-zinc-400">{plan.billing}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gold mb-3">Payment Method</h3>
              <p className="text-zinc-300 capitalize">{method?.replace('_', ' ')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-3">Billing Cycle</h3>
              <p className="text-zinc-300">Monthly recurring</p>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          {/* Account Access */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Account Activated</h3>
            <p className="text-zinc-400 mb-4">
              Your {plan.name} membership has been activated immediately. You now have access to all premium features.
            </p>
            <Link
              to="/secrets"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Explore Her Secrets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Confirmation Email */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Confirmation Email</h3>
            <p className="text-zinc-400 mb-4">
              A confirmation email with your receipt and membership details has been sent to your email address.
            </p>
            <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </motion.div>

        {/* Membership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 border border-red-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Your {plan.name} Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(plan.features || []).slice(0, 8).map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
          {plan.features && plan.features.length > 8 && (
            <div className="text-center mt-6">
              <p className="text-zinc-400">And {plan.features.length - 8} more exclusive benefits...</p>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Link
            to="/secrets"
            className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-8 h-8 text-white mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Her Secrets</h3>
            <p className="text-red-100 text-sm">Explore exclusive content</p>
          </Link>

          <Link
            to="/gallery"
            className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
          >
            <Star className="w-8 h-8 text-white mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">VIP Gallery</h3>
            <p className="text-purple-100 text-sm">Premium photos & videos</p>
          </Link>

          <Link
            to="/night"
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">VIP Events</h3>
            <p className="text-yellow-100 text-sm">Book premium nights</p>
          </Link>

          <Link
            to="/touch"
            className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
          >
            <Crown className="w-8 h-8 text-white mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Priority Booking</h3>
            <p className="text-green-100 text-sm">Skip the queue</p>
          </Link>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
          <p className="text-zinc-400 mb-6">
            Our {plan.id === 'vip' ? 'VIP concierge team' : 'support team'} is here to help you get the most out of your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254712527543"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Support
            </a>
            <a
              href="mailto:thelaydiesden@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
          </div>
        </motion.div>

        {/* Return to Site */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            Continue to Laydies Den
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}