import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, Users, Sparkles, Heart, Crown } from "lucide-react";

const services = [  {
    id: 1,
    title: "VIP Concierge Services",
    description: "Exclusive personal assistance and lifestyle management with our elite gentlemen for sophisticated events, dinners, and private consultations.",
    image: "/services/vip-concierge.jpg",
    icon: <Crown className="w-8 h-8 text-gold" />,
    features: ["Discreet & Professional", "Background Verified", "Multilingual", "Personal Assistant"],
    price: "From KSH 65,000/hour",
    cta: "Book VIP Experience"
  },
  {
    id: 2,
    title: "Sensual Massage",
    description: "Therapeutic and sensual massage experiences designed to relax, rejuvenate, and awaken your senses.",
    image: "/services/massage.jpg",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    features: ["Licensed Therapists", "Private Suites", "Aromatherapy", "Full Body Treatment"],
    price: "From KSH 26,000/session",
    cta: "Schedule Massage"
  },
  {
    id: 3,
    title: "Private Dance Shows",
    description: "Intimate performances tailored to your preferences in luxurious private settings.",
    image: "/services/dance.jpg",
    icon: <Sparkles className="w-8 h-8 text-gold" />,
    features: ["Custom Choreography", "Costume Selection", "Private Venue", "Multiple Performers"],
    price: "From KSH 39,000/show",
    cta: "Book Performance"
  },
  {
    id: 4,
    title: "Fetish & Fantasy",
    description: "Safe exploration of fetishes and fantasies with experienced professionals in a judgment-free environment.",
    image: "/services/fetish.jpg",
    icon: <Star className="w-8 h-8 text-red-500" />,
    features: ["Safe Words Protocol", "Equipment Provided", "Experienced Dominants", "Aftercare Included"],
    price: "From KSH 52,000/session",
    cta: "Explore Fantasies"
  },
  {
    id: 5,
    title: "Couples Experiences",
    description: "Enhance intimacy and explore new dimensions of pleasure together in a supportive environment.",
    image: "/services/couples.jpg",
    icon: <Users className="w-8 h-8 text-gold" />,
    features: ["Relationship Enhancement", "Communication Guidance", "Tantra Sessions", "Joint Exploration"],
    price: "From KSH 78,000/session",
    cta: "Book Couples Session"
  },
  {
    id: 6,
    title: "Overnight Companionship",
    description: "Extended companionship services for overnight stays, travel, and extended engagements.",
    image: "/services/overnight.jpg",
    icon: <Clock className="w-8 h-8 text-red-500" />,
    features: ["12+ Hour Packages", "Travel Companion", "Overnight Stays", "Weekend Packages"],
    price: "From KSH 260,000/night",
    cta: "Plan Extended Stay"
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-24 bg-black text-white">      {/* Hero Section */}
      <section className="h-[20vh] px-6 flex items-center bg-gradient-to-br from-red-900/30 via-black to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gold mb-4"
          >
            Our Premium Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Discover our carefully curated selection of intimate experiences designed to fulfill your deepest desires.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Explore Services
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Book Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    {service.icon}
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold">{service.price}</span>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                      {service.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-red-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-6"
          >
            Ready to Begin Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Contact us to discuss your desires and create a personalized experience.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            Book Consultation
          </motion.button>
        </div>
      </section>
    </div>
  );
}
