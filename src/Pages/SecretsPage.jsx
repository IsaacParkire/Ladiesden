import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Crown, Star, Eye, Key, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const secretServices = [
  {
    id: 1,
    name: "Level 1 The Velvet Collar",
    icon: <Crown className="w-8 h-8 text-red-500" />,
    description: "your first taste of surrender, wrapped in elegance. For the curious—where fantasies take their first breath.",
    features: [
      "Foot Worship",
      "Lingerie/Outfit Fetish",
      "Roleplay",
      "Praise Kink",
      "Confession Booth"
    ],
    duration: "Varies",
    price: "KSH 25,000+",
    image: "/secrets/femdom.jpg",
    memberTier: "Premium"
  },
  {
    id: 2,
    name: "Level 2 The Crimson Chains",
    icon: <Star className="w-8 h-8 text-gold" />,
    description: "restraint becomes luxury, bondage dressed in silk and steel. When desire demands discipline and touch turns to control.",
    features: [
      "Impact Play",
      "Bondage/Restraints",
      "Sensory Play",
      "Femdom Worship",
      "Financial Tribute"
    ],
    duration: "Varies",
    price: "KSH 39,000+",
    image: "/secrets/foot.jpg",
    memberTier: "Premium"
  },
  {
    id: 3,
    name: "Level 3 The Golden Whip",
    icon: <Key className="w-8 h-8 text-red-500" />,
    description: "discipline kissed with decadence, pain laced in pleasure. Pleasure becomes obedience, and obedience becomes truth.",
    features: [
      "Obedience Training",
      "Orgasm Control",
      "Humiliation",
      "Pet Play",
      "Mirror Talks"
    ],
    duration: "Varies",
    price: "KSH 65,000+",
    image: "/secrets/obedience.jpg",
    memberTier: "VIP Elite"
  },
  {
    id: 4,
    name: "Level 4 The Obsidian Dungeon",
    icon: <Eye className="w-8 h-8 text-gold" />,
    description: "where shadows reign, and your devotion is absolute. This is no longer kink—it is worship.",
    features: [
      "Ritual Play",
      "Group/Masked Sessions",
      "Objectification/Degradation",
      "Dark Confession",
      "Symbolic Contracts"
    ],
    duration: "Varies",
    price: "KSH 78,000+",
    image: "/secrets/roleplay.jpg",
    memberTier: "VIP Elite"
  }
];

const membershipTiers = [
  {
    tier: "Basic",
    price: "Free",
    benefits: ["Basic access to products", "Public events only", "Standard bookings", "Limited features"],
    color: "from-gray-400 to-gray-600",
    access: false
  },
  {
    tier: "Premium",
    price: "KSH 25,000/month",
    benefits: ["Access to Her Secrets", "Premium themed nights", "Priority booking", "Premium gallery", "Special sessions"],
    color: "from-yellow-400 to-yellow-600",
    access: true
  },
  {
    tier: "VIP Elite",
    price: "KSH 65,000/month",
    benefits: ["Full VIP access", "Private events", "Custom experiences", "24/7 concierge", "Exclusive content"],
    color: "from-purple-400 via-red-500 to-yellow-500",
    access: true
  }
];

const specialists = [
  {
    id: 1,
    name: "Master Devon",
    specialties: ["Femdom Training", "Roleplay", "Protocol Training"],
    experience: "10+ years",
    rating: 4.9,
    image: "/specialists/devon.jpg",
    description: "Expert in female dominance dynamics and submission training with extensive experience in power exchange."
  },
  {
    id: 2,
    name: "Servant Lucas",
    specialties: ["Foot Worship", "Service Training", "Devotion Rituals"],
    experience: "7+ years",
    rating: 4.8,
    image: "/specialists/lucas.jpg",
    description: "Dedicated servant specializing in worship practices and devotional service with ultimate respect."
  },
  {
    id: 3,
    name: "Actor James",
    specialties: ["Roleplay", "Character Development", "Fantasy Scenarios"],
    experience: "8+ years",
    rating: 4.9,
    image: "/specialists/james.jpg",
    description: "Professional actor and fantasy specialist bringing your deepest roleplay scenarios to vivid life."
  }
];

export default function SecretsPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [showMembership, setShowMembership] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Use real membership type from context
  const userMembership = user?.membership_type
    ? (user.membership_type === 'vip' ? 'VIP Elite' : user.membership_type.charAt(0).toUpperCase() + user.membership_type.slice(1))
    : 'Basic';

  // Updated unlock logic: Premium and VIP Elite can access all services
  const handleUnlock = (service) => {
    const requiredTier = service.memberTier;
    if (userMembership === 'Basic') {
      navigate('/membership');
    } else if (
      userMembership === 'Premium' || userMembership === 'VIP Elite'
    ) {
      setSelectedService(service);
      alert(`Unlocked: ${service.name}! Redirecting to booking...`);
    } else {
      navigate('/membership');
    }
  };

  return (<div className="pt-24 bg-black text-white">      {/* Hero Section with Age Verification */}
      <section className="py-8 px-6 relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/hersecret1.jpeg"
            alt="Her Secrets Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-3xl mb-2 block">🗝️</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gold mb-2">Her Secrets</h1>
            <p className="text-base text-red-500 font-medium mb-3">"Desire. Served Discreetly."</p>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-4">
              Enter our exclusive private fetish lounge where your deepest desires are explored with complete discretion.
            </p>
            
            {/* Compact Age Verification */}
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3 max-w-md mx-auto mb-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-red-300 font-semibold text-sm">Adults Only - 21+ Required</span>
              </div>
              <p className="text-zinc-300 text-xs text-center">
                Membership verification and age confirmation required for access.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3"
          >            <button 
              onClick={() => navigate('/membership')}
              className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm"
            >
              View Membership
            </button>
            <button className="px-5 py-2 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm">
              Member Login
            </button>
          </motion.div>
        </div>
      </section>

      {/* Membership Access */}
      <section className="py-12 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 rounded-2xl p-8"
          >
            <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gold mb-4">Premium Member-Only Access</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Her Secrets is an exclusive private lounge accessible only to verified premium members. 
              Our membership program ensures the highest level of discretion and quality for all experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">              <button
                onClick={() => navigate('/membership')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              >
                View Membership Options
              </button>
              <button className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-xl font-semibold transition-all">
                Member Login
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview (Blurred/Teaser) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Exclusive Experiences
          </motion.h2>
          
          <div className="grid lg:grid-cols-2  gap-8">
            {secretServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >                {/* Blur overlay for non-members */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gold mx-auto mb-3" />
                    <p className="text-white font-semibold mb-2">{service.memberTier} Members Only</p>                    <button 
                      onClick={() => navigate('/membership')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105"
                    >
                      Unlock Access
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    {service.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                      <p className="text-gold font-semibold">{service.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-zinc-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-zinc-400 text-sm">
                    Duration: {service.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      {showMembership && (
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gold text-center mb-16"
            >
              Membership Tiers
            </motion.h2>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {membershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`bg-gradient-to-br ${tier.color} p-[1px] rounded-2xl`}
                >
                  <div className="bg-black rounded-2xl p-6 h-full">
                    <h3 className="text-2xl font-bold text-white text-center mb-2">{tier.tier}</h3>
                    <p className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-gold to-red-500 bg-clip-text text-transparent">
                      {tier.price}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                          <div className="w-2 h-2 bg-gold rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                      <button 
                      onClick={() => navigate('/membership')}
                      className="w-full bg-gradient-to-r from-red-600 to-gold hover:from-red-700 hover:to-yellow-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105"
                    >
                      Select {tier.tier}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specialists (Partially Visible) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Expert Specialists
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {specialists.map((specialist, index) => (
              <motion.div
                key={specialist.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-64 object-cover filter blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{specialist.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gold font-bold">{specialist.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-zinc-300 text-sm mb-4">
                    {specialist.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-zinc-400 text-sm">{specialist.experience}</span>
                  </div>
                  
                  <button className="w-full bg-zinc-700 text-zinc-400 py-3 rounded-xl font-semibold cursor-not-allowed">
                    Members Only Access
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Discretion */}
      <section className="py-20 px-6 bg-gradient-to-t from-red-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-900/20 border border-green-600/30 rounded-2xl p-8"
          >
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-4">Ultimate Privacy & Discretion</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Her Secrets operates under the strictest confidentiality protocols. All activities are consensual, 
              safe, and conducted by trained professionals. Your privacy and safety are our absolute priority.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Complete Anonymity</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Safe Words Protocol</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Professional Standards</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8"
          >            <button 
              onClick={() => navigate('/membership')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              Begin Membership Application
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}