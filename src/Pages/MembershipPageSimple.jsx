import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const membershipPlans = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'FREE',
    icon: <Users className="w-8 h-8" />,
    price: 'Free',
    originalPrice: null,
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-500',
    popular: false,
    description: 'Perfect for getting started with our community',
    features: [
      'Basic access to products and services',
      'Public events only',
      'Standard massage and service bookings',
      'Public album photos',
      'Community forum access',
      'Basic customer support'
    ],
    restrictions: [
      'No access to Her Secrets page',
      'Limited to public events only',
      'Standard booking priority',
      'Basic gallery access only'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'MOST POPULAR',
    icon: <Star className="w-8 h-8" />,
    price: 'KSH 25,000',
    originalPrice: 'KSH 30,000',
    billing: '/month',
    color: 'from-yellow-400 to-yellow-600',
    borderColor: 'border-yellow-500',
    popular: true,
    description: 'Unlock exclusive experiences and premium content',
    features: [
      'Access to premium themed nights and Her Secrets',
      'Priority bookings and early RSVP access',
      'Access to all public events + select VIP nights',
      'Premium uncensored gallery access',
      'More explicit shots and premium dancer profiles',
      'Access to special themed sessions',
      'Seasonal packages and exclusive content',
      'Premium customer support',
      'Monthly exclusive newsletter'
    ],
    restrictions: [
      'Limited VIP night access',
      'Standard VIP amenities only'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Elite',
    subtitle: 'ULTIMATE EXPERIENCE',
    icon: <Crown className="w-8 h-8" />,
    price: 'KSH 65,000',
    originalPrice: 'KSH 80,000',
    billing: '/month',
    color: 'from-purple-400 via-red-500 to-yellow-500',
    borderColor: 'border-purple-500',
    popular: false,
    description: 'The ultimate luxury experience with exclusive privileges',
    features: [
      'Guaranteed access to ALL VIP nights and secrets',
      'Front lounge seats and premium positioning',
      'Private invitation to inner circle nights',
      'Priority RSVPs for all events',
      'VIP-only albums: uncensored, intimate, private photos',
      'Secret after parties and exclusive gatherings',
      'Special event creation on request',
      'Exclusive gifts and early product access',
      'Exclusive fetish shows and private dancer access',
      'Custom content and one-on-one experiences',
      'Complimentary fantasy add-ons',
      'First pick of masseuse/companion',
      'Fully tailored sessions',
      '24/7 VIP concierge service',
      'Private entrance access'
    ],
    restrictions: []
  }
];

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
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    console.log('handleSelectPlan called with planId:', planId);
    alert(`You clicked ${planId} plan button!`); // Simple test
    
    setSelectedPlan(planId);
    if (planId === 'basic') {
      alert('Basic membership is free! You can register directly.');
      navigate('/register');
    } else {
      const selectedPlanData = membershipPlans.find(plan => plan.id === planId);
      console.log('Navigating to payment with plan:', selectedPlanData);
      navigate('/payment', { 
        state: { 
          plan: selectedPlanData
        } 
      });
    }
  };

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-purple-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-4">
            Membership Plans
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-300 mb-6 max-w-3xl mx-auto">
            Choose your level of luxury and unlock exclusive experiences
          </p>
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Secure payments • Cancel anytime • 30-day guarantee</span>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-8 border-2 ${
                  plan.popular 
                    ? 'border-yellow-500 shadow-yellow-500/20 shadow-2xl' 
                    : plan.borderColor
                } hover:shadow-2xl transition-all duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold">
                      {plan.subtitle}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  {!plan.popular && (
                    <p className="text-sm text-zinc-400 mb-4">{plan.subtitle}</p>
                  )}
                  <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <span className="text-zinc-500 line-through text-lg mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.billing && (
                      <span className="text-zinc-400 text-lg">{plan.billing}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions (if any) */}
                {plan.restrictions.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, restrictionIndex) => (
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
                  onClick={() => handleSelectPlan(plan.id)}
                  type="button"
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.id === 'basic'
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : plan.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black'
                      : 'bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white'
                  } hover:scale-105 shadow-lg`}
                >
                  {plan.id === 'basic' ? 'Get Started Free' : 'Choose Plan'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistance Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4">
              Need Assistance?
            </h2>
            <p className="text-zinc-400 text-lg">
              Our team is here to help you choose the perfect membership plan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {assistanceContacts.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`${contact.color} rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <div className="flex justify-center mb-4">
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{contact.label}</h3>
                <p className="text-white/90 text-sm">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
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
              onClick={() => handleSelectPlan('premium')}
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Go Premium Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
