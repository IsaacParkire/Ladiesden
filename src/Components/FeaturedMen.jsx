import React from "react";
import { motion } from "framer-motion";
import { Star, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featuredMen = [
  {
    id: 1,
    name: "Alexander Divine",
    specialty: "Sophisticated Companion",
    image: "/men/alexander-featured.jpg",
    rating: 4.9,
    experience: "5+ years",
    quote: "I believe that true intimacy begins with genuine connection and understanding.",
    availability: "Available",
    specialties: ["Business Events", "Cultural Experiences", "International Travel"]
  },
  {
    id: 2,
    name: "Marcus Steel",
    specialty: "Dominant Experience",
    image: "/men/marcus-featured.jpg",
    rating: 4.8,
    experience: "7+ years",
    quote: "Trust is the foundation of every powerful exchange between two souls.",
    availability: "Limited",
    specialties: ["BDSM", "Fetish Exploration", "Power Exchange"]
  },
  {
    id: 3,
    name: "Julian Noir",
    specialty: "Sensual Artist",
    image: "/men/julian-featured.jpg",
    rating: 4.9,
    experience: "4+ years",
    quote: "Every touch should tell a story, every movement should speak to the soul.",
    availability: "Available",
    specialties: ["Sensual Massage", "Tantric Practices", "Dance Performance"]
  }
];

export default function FeaturedMen() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-zinc-900/30 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-4"
          >
            Featured Elite Gentlemen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 max-w-3xl mx-auto"
          >
            Meet our most sought-after professionals, each bringing unique talents and expertise to create unforgettable experiences.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredMen.map((man, index) => (
            <motion.div
              key={man.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={man.image}
                  alt={man.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    man.availability === 'Available' ? 'bg-green-600 text-white' :
                    'bg-yellow-600 text-white'
                  }`}>
                    {man.availability}
                  </span>
                </div>
                
                {/* Name and Specialty */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{man.name}</h3>
                  <p className="text-gold">{man.specialty}</p>
                </div>
              </div>
              
              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gold font-bold">{man.rating}</span>
                  </div>
                  <span className="text-zinc-400 text-sm">{man.experience}</span>
                </div>
                
                {/* Quote */}
                <blockquote className="text-zinc-300 italic text-sm mb-4 leading-relaxed">
                  "{man.quote}"
                </blockquote>
                
                {/* Specialties */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {man.specialties.slice(0, 2).map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                      >
                        {specialty}
                      </span>
                    ))}
                    {man.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-zinc-700 text-zinc-400 text-xs rounded-full">
                        +{man.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Button */}
                <button 
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    man.availability === 'Available' ? 
                    'bg-red-600 hover:bg-red-700 text-white hover:scale-105' :
                    'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {man.availability === 'Available' ? 'Book Now' : 'Limited Availability'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Meet All Our Gentlemen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
