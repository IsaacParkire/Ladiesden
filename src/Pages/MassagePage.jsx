import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Star, Flame, Heart, Shield } from "lucide-react";

const massageServices = [
  {
    id: 1,
    name: "Erotic Massage",
    icon: <Flame className="w-8 h-8 text-red-500" />,
    duration: "60-90 minutes",
    price: "$300-450",
    description: "Intimate full-body massage experience with skilled male therapists, designed to awaken your senses and provide deep relaxation.",
    features: ["Full body massage", "Aromatic oils", "Private suite", "Professional male therapist"],
    image: "/massage/erotic.jpg"
  },
  {
    id: 2,
    name: "Sensual Therapy",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    duration: "90-120 minutes",
    price: "$400-550",
    description: "Therapeutic massage combining traditional techniques with sensual elements for ultimate mind-body connection.",
    features: ["Therapeutic techniques", "Sensual elements", "Extended session", "Aftercare included"],
    image: "/massage/therapy.jpg"
  },
  {
    id: 3,
    name: "Candle Oil Experience",
    icon: <Flame className="w-8 h-8 text-gold" />,
    duration: "75-105 minutes",
    price: "$350-500",
    description: "Luxurious massage using warm candle oils in a romantic candlelit atmosphere with expert male masseurs.",
    features: ["Warm candle oils", "Candlelit ambiance", "Aromatherapy", "Romantic setting"],
    image: "/massage/candle.jpg"
  },
  {
    id: 4,
    name: "Custom Sessions",
    icon: <Star className="w-8 h-8 text-gold" />,
    duration: "60-180 minutes",
    price: "$400-800",
    description: "Personalized massage experiences tailored to your specific desires and preferences with our elite male masseurs.",
    features: ["Fully customized", "Choice of therapist", "Special requests", "Extended options"],
    image: "/massage/custom.jpg"
  }
];

const masseurs = [
  {
    id: 1,
    name: "Julian Rivers",
    specialties: ["Tantric Massage", "Deep Tissue", "Sensual Touch"],
    experience: "6+ years",
    rating: 4.9,
    image: "/masseurs/julian.jpg",
    description: "Certified massage therapist with expertise in tantric and sensual massage techniques.",
    availability: "Available"
  },
  {
    id: 2,
    name: "Marcus Stone",
    specialties: ["Therapeutic Massage", "Aromatherapy", "Hot Stone"],
    experience: "8+ years",
    rating: 4.8,
    image: "/masseurs/marcus.jpg",
    description: "Licensed therapeutic massage specialist focusing on relaxation and sensual wellness.",
    availability: "Limited"
  },
  {
    id: 3,
    name: "Adrian Cross",
    specialties: ["Swedish Massage", "Reflexology", "Body Work"],
    experience: "5+ years",
    rating: 4.9,
    image: "/masseurs/adrian.jpg",
    description: "Expert in traditional and modern massage techniques with a focus on client comfort.",
    availability: "Available"
  }
];

export default function MassagePage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMasseur, setSelectedMasseur] = useState(null);

  return (
    <div className="pt-24 bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-6xl mb-4 block">💆‍♀️</span>
            <h1 className="text-5xl font-bold text-gold mb-4">Her Touch</h1>
            <p className="text-2xl text-red-500 font-medium">"Relaxation as Worship."</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto"
          >
            Experience the ultimate in sensual wellness with our expert male masseurs in luxurious private suites designed for your complete relaxation and awakening.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Signature Experiences
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {massageServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-zinc-300 text-sm">{service.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                    Book This Experience
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masseurs Section */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Our Expert Male Masseurs
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {masseurs.map((masseur, index) => (
              <motion.div
                key={masseur.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-black/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={masseur.image}
                    alt={masseur.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      masseur.availability === 'Available' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {masseur.availability}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{masseur.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gold font-bold">{masseur.rating}</span>
                    </div>
                    <span className="text-zinc-400 text-sm">{masseur.experience}</span>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {masseur.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {masseur.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                      masseur.availability === 'Available' ? 
                      'bg-red-600 hover:bg-red-700 text-white hover:scale-105' :
                      'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {masseur.availability === 'Available' ? 'Book Session' : 'Check Availability'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-900/20 border border-green-600/30 rounded-2xl p-8 text-center"
          >
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-4">Your Safety & Privacy</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">
              All our male masseurs are professionally trained, background-checked, and committed to maintaining 
              the highest standards of discretion and professionalism. Your comfort and privacy are our top priorities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Complete Discretion</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Private Suites</span>
              </div>
            </div>
          </motion.div>
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
            Ready to Experience Her Touch?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Book your personalized massage experience and discover the ultimate in sensual wellness.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            Book Your Session Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}
