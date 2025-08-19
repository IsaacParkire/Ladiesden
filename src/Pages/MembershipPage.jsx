import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Star, 
  Heart, 
  Check, 
  Lock, 
  Phone, 
  Mail, 
  MessageCircle,
  Shield,
  Users,
  Calendar,
  Eye,
  Gift,
  Sparkles,
  ChevronRight,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { membershipAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const assistanceContacts = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: 'WhatsApp',
    value: '+254712527543',
    href: 'https://wa.me/254712527543',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'thelaydiesden@gmail.com',
    href: 'mailto:thelaydiesden@gmail.com',
    color: 'bg-red-500 hover:bg-red-600'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: 'Phone',
    value: '0712527543',
    href: 'tel:+254712527543',
    color: 'bg-blue-500 hover:bg-blue-600'
  }
];

export default function MembershipPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Get data from registration flow if coming from registration
  const fromRegistration = location.state?.fromRegistration;
  const preSelectedPlan = location.state?.selectedPlan;

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await membershipAPI.getPlans();
        setMembershipPlans(Array.isArray(response.data) ? response.data : response.data.results || []);
        // Set pre-selected plan if coming from registration
        if (preSelectedPlan) {
          setSelectedPlan(preSelectedPlan.plan_type);
        }
      } catch (error) {
        console.error('Failed to fetch membership plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembershipPlans();
  }, [preSelectedPlan]);

  const getPlanIcon = (planType) => {
    switch (planType) {
      case 'basic': return <Shield className="w-8 h-8" />;
      case 'premium': return <Star className="w-8 h-8" />;
      case 'vip': return <Crown className="w-8 h-8" />;
      default: return <Users className="w-8 h-8" />;
    }
  };

  const getPlanColors = (planType) => {
    switch (planType) {
      case 'basic': return { 
        gradient: 'from-gray-400 to-gray-600', 
        border: 'border-gray-500',
        bg: 'bg-gray-500'
      };
      case 'premium': return { 
        gradient: 'from-yellow-400 to-yellow-600', 
        border: 'border-yellow-500',
        bg: 'bg-yellow-500'
      };
      case 'vip': return { 
        gradient: 'from-purple-400 via-red-500 to-yellow-500', 
        border: 'border-purple-500',
        bg: 'bg-purple-500'
      };
      default: return { 
        gradient: 'from-gray-400 to-gray-600', 
        border: 'border-gray-500',
        bg: 'bg-gray-500'
      };
    }
  };

  const handleSelectPlan = (planType) => {
    const selectedPlanData = membershipPlans.find(plan => plan.plan_type === planType);
    if (planType === 'basic') {
      if (fromRegistration) {
        navigate('/profile');
      } else {
        navigate('/register');
      }
    } else {
      navigate('/payment', { state: { plan: selectedPlanData } });
    }
  };

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-purple-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-4">
              {fromRegistration ? 'Complete Your Registration' : 'Membership Plans'}
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 mb-6 max-w-3xl mx-auto">
              {fromRegistration 
                ? 'Choose your membership plan to complete your account setup'
                : 'Choose your level of luxury and unlock exclusive experiences'
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Secure payments • Cancel anytime • 30-day guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-300">Loading membership plans...</p>
          </div>
        </section>
      )}

      {/* Membership Plans */}
      {!loading && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {membershipPlans.map((plan, index) => {
                const colors = getPlanColors(plan.plan_type);
                const isPopular = plan.plan_type === 'premium';
                
                return (
                  <motion.div
                    key={plan.plan_type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-8 border-2 ${
                      isPopular 
                        ? 'border-yellow-500 shadow-yellow-500/20 shadow-2xl' 
                        : colors.border
                    } hover:shadow-2xl transition-all duration-300`}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        {getPlanIcon(plan.plan_type)}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
                      
                      {/* Pricing */}
                      <div className="mb-6">
                        <span className="text-3xl sm:text-4xl font-bold text-white">
                          {plan.price === 0 ? 'FREE' : `${plan.currency} ${plan.price.toLocaleString()}`}
                        </span>
                        <span className="text-zinc-400 text-lg">/month</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {plan.features_list?.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-zinc-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Restrictions (if any) */}
                    {plan.restrictions_list && plan.restrictions_list.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          Limitations
                        </h4>
                        <ul className="space-y-2">
                          {plan.restrictions_list.map((restriction, restrictionIndex) => (
                            <li key={restrictionIndex} className="flex items-start gap-3">
                              <Lock className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-zinc-400 text-sm">{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Select Button */}
                    <button
                      className={`w-full mt-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                        ${plan.plan_type === 'basic'
                          ? 'bg-zinc-700 text-white hover:bg-zinc-800'
                          : 'bg-gradient-to-r from-red-600 to-yellow-400 text-white hover:from-yellow-500 hover:to-red-700'}
                      `}
                      onClick={() => handleSelectPlan(plan.plan_type)}
                    >
                      {plan.plan_type === 'basic' ? 'Get Started Free' : plan.plan_type === 'premium' ? 'Go Premium' : 'Choose Plan'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Comparison */}
      {!loading && membershipPlans.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4">
                Compare Plans
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                See exactly what each membership level offers
              </p>
            </motion.div>

            <div className="bg-zinc-900/50 rounded-2xl p-8 backdrop-blur-sm border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-white mb-6">Access Levels</h3>
                </div>
                <div className="md:col-span-3 grid grid-cols-3 gap-4">
                  {membershipPlans.map((plan) => {
                    const colors = getPlanColors(plan.plan_type);
                    return (
                      <div key={plan.plan_type} className="text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center mx-auto mb-2`}>
                          {getPlanIcon(plan.plan_type)}
                        </div>
                        <h4 className="font-semibold text-white">{plan.name}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  { 
                    feature: 'Her Secrets Access', 
                    getValue: (plan) => plan.her_secrets_access ? '✅' : '❌'
                  },
                  { 
                    feature: 'Premium Events', 
                    getValue: (plan) => plan.premium_events_access ? '✅' : '❌'
                  },
                  { 
                    feature: 'VIP Events', 
                    getValue: (plan) => plan.vip_events_access ? '✅ VIP Access' : '❌'
                  },
                  { 
                    feature: 'Priority Booking', 
                    getValue: (plan) => plan.priority_booking ? '✅ Priority' : 'Standard'
                  },
                  { 
                    feature: 'Premium Gallery', 
                    getValue: (plan) => plan.premium_gallery_access ? '✅' : '❌'
                  },
                  { 
                    feature: 'VIP Gallery', 
                    getValue: (plan) => plan.vip_gallery_access ? '✅ Exclusive' : '❌'
                  },
                  { 
                    feature: 'Custom Experiences', 
                    getValue: (plan) => plan.custom_experiences ? '✅ Available' : '❌'
                  },
                  { 
                    feature: 'Concierge Service', 
                    getValue: (plan) => plan.concierge_service ? '✅ 24/7' : '❌'
                  }
                ].map((row, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b border-zinc-800 last:border-b-0">
                    <div className="font-medium text-zinc-300">{row.feature}</div>
                    {membershipPlans.map((plan) => {
                      const value = row.getValue(plan);
                      const colorClass = plan.plan_type === 'basic' ? 'text-zinc-400' :
                                       plan.plan_type === 'premium' ? 'text-yellow-400' : 'text-purple-400';
                      return (
                        <div key={plan.plan_type} className={`text-center ${colorClass}`}>
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Assistance Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4">
              Need Assistance?
            </h2>
            <p className="text-zinc-400 text-lg">
              Our team is here to help you choose the perfect membership plan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {assistanceContacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`${contact.color} rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <div className="flex justify-center mb-4">
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{contact.label}</h3>
                <p className="text-white/90 text-sm">{contact.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
              <h3 className="text-xl font-bold text-gold mb-4">Business Hours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
                <div>
                  <p className="font-medium">Customer Support</p>
                  <p className="text-sm text-zinc-400">24/7 Available</p>
                </div>
                <div>
                  <p className="font-medium">VIP Concierge</p>
                  <p className="text-sm text-zinc-400">24/7 for VIP Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Join thousands of women who have discovered their ultimate luxury experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelectPlan('premium');
                }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Go Premium Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
