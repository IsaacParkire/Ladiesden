import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, Calendar, MessageCircle } from "lucide-react";

const menStaff = [
  {
    id: 1,
    name: "Alexander Divine",
    age: 28,
    specialty: "Sophisticated Companion",
    bio: "With a background in international business and fluency in five languages, Alexander brings elegance and intelligence to every encounter. His passion for art and culture makes him the perfect companion for gallery openings, business dinners, and intimate conversations.",
    quote: "I believe that true intimacy begins with genuine connection and understanding.",
    image: "/men/alexander.jpg",
    stats: {
      experience: "5+ years",
      languages: "5 languages",
      rating: 4.9
    },
    specialties: ["Business Events", "Cultural Experiences", "International Travel", "Intellectual Conversations"],
    availability: "Available"
  },
  {
    id: 2,
    name: "Marcus Steel",
    age: 32,
    specialty: "Dominant Experience",
    bio: "A former military officer turned professional dominant, Marcus combines discipline with sensuality. His expertise in various fetish practices and commitment to safety make him ideal for those seeking to explore their submissive side in a controlled environment.",
    quote: "Trust is the foundation of every powerful exchange between two souls.",
    image: "/men/marcus.jpg",
    stats: {
      experience: "7+ years",
      languages: "3 languages",
      rating: 4.8
    },
    specialties: ["BDSM", "Fetish Exploration", "Power Exchange", "Aftercare"],
    availability: "Limited"
  },
  {
    id: 3,
    name: "Julian Noir",
    age: 26,
    specialty: "Sensual Artist",
    bio: "A professional dancer and massage therapist, Julian specializes in the art of sensual touch and movement. His background in contemporary dance and tantric practices creates an experience that awakens both body and spirit.",
    quote: "Every touch should tell a story, every movement should speak to the soul.",
    image: "/men/julian.jpg",
    stats: {
      experience: "4+ years",
      languages: "4 languages",
      rating: 4.9
    },
    specialties: ["Sensual Massage", "Tantric Practices", "Dance Performance", "Body Worship"],
    availability: "Available"
  },
  {
    id: 4,
    name: "Sebastian Cross",
    age: 30,
    specialty: "Couples Specialist",
    bio: "A certified relationship counselor and tantric practitioner, Sebastian helps couples explore new dimensions of their intimacy. His gentle approach and deep understanding of human psychology create safe spaces for vulnerability and growth.",
    quote: "Love is not just felt, it's practiced, explored, and celebrated.",
    image: "/men/sebastian.jpg",
    stats: {
      experience: "6+ years",
      languages: "3 languages",
      rating: 4.8
    },
    specialties: ["Couples Therapy", "Tantra", "Communication", "Intimacy Coaching"],
    availability: "Available"
  },
  {
    id: 5,
    name: "Damien Luxe",
    age: 29,
    specialty: "Elite Escort",
    bio: "Former model and current entrepreneur, Damien embodies sophistication and charm. His experience in high society and natural charisma make him the perfect companion for exclusive events, romantic getaways, and private encounters.",
    quote: "Elegance is not about being noticed, it's about being remembered.",
    image: "/men/damien.jpg",
    stats: {
      experience: "5+ years",
      languages: "4 languages",
      rating: 4.9
    },
    specialties: ["High Society Events", "Travel Companion", "Romantic Dates", "Private Parties"],
    availability: "Booked"
  },
  {
    id: 6,
    name: "Phoenix King",
    age: 27,
    specialty: "Fantasy Fulfillment",
    bio: "A creative professional with expertise in role-playing and fantasy scenarios, Phoenix brings imagination to life. His theatrical background and commitment to character development create immersive experiences tailored to your specific fantasies.",
    quote: "In the realm of fantasy, we discover truths about ourselves we never knew existed.",
    image: "/men/phoenix.jpg",
    stats: {
      experience: "3+ years",
      languages: "2 languages",
      rating: 4.7
    },
    specialties: ["Role Playing", "Fantasy Scenarios", "Costume Play", "Character Development"],
    availability: "Available"
  }
];

export default function MenPage() {
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
            Our Elite Gentlemen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Meet our carefully selected professionals, each bringing unique talents and personalities to create unforgettable experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Meet The Team
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Book Session
            </button>
          </motion.div>
        </div>
      </section>
      </section>

      {/* Men Profiles */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {menStaff.map((man, index) => (
              <motion.div
                key={man.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 rounded-2xl overflow-hidden hover:from-zinc-900/70 hover:to-zinc-900/50 transition-all group"
              >
                <div className="relative">
                  <img
                    src={man.image}
                    alt={man.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      man.availability === 'Available' ? 'bg-green-600 text-white' :
                      man.availability === 'Limited' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {man.availability}
                    </span>
                  </div>
                  
                  {/* Name and Age */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-3xl font-bold text-white mb-1">{man.name}</h3>
                    <p className="text-gold text-lg">{man.specialty} • Age {man.age}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold">{man.stats.experience}</div>
                      <div className="text-sm text-zinc-400">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold">{man.stats.languages}</div>
                      <div className="text-sm text-zinc-400">Speaks</div>
                    </div>
                    <div className="text-center flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <div className="text-2xl font-bold text-gold">{man.stats.rating}</div>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {man.bio}
                  </p>
                  
                  {/* Quote */}
                  <div className="bg-black/30 p-4 rounded-xl mb-6 relative">
                    <Quote className="w-6 h-6 text-red-500 mb-2" />
                    <p className="text-white italic text-sm leading-relaxed">
                      "{man.quote}"
                    </p>
                  </div>
                  
                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {man.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                        man.availability === 'Available' ? 
                        'bg-red-600 hover:bg-red-700 text-white hover:scale-105' :
                        'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      }`}
                      disabled={man.availability === 'Booked'}
                    >
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {man.availability === 'Available' ? 'Book Now' : 'Fully Booked'}
                    </button>
                    <button className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all">
                      <MessageCircle className="w-4 h-4" />
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
            Find Your Perfect Match
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Not sure who would be the best fit? Our concierge team can help match you with the perfect companion.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            Get Personalized Recommendation
          </motion.button>
        </div>
      </section>
    </div>
  );
}
