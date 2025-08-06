import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Heart, Users, Trophy, Calendar, Star, Clock } from "lucide-react";

const fitnessPrograms = [
  {
    id: 1,
    name: "Private Personal Training",
    icon: <Dumbbell className="w-8 h-8 text-red-500" />,
    duration: "60-90 minutes",
    price: "KSH 19,500-32,500",
    description: "One-on-one training sessions with elite male trainers focused on your specific body transformation goals.",
    features: ["Personalized workout plan", "Form correction", "Motivation coaching", "Progress tracking"],
    image: "/fitness/personal.jpg"
  },
  {
    id: 2,
    name: "Sensual Strength Classes",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    duration: "75-105 minutes",
    price: "KSH 13,000-23,400",
    description: "Partner-based flexibility and mobility classes that combine fitness with sensual movement.",
    features: ["Partner exercises", "Flexibility training", "Sensual movement", "Core strengthening"],
    image: "/fitness/sensual.jpg"
  },
  {
    id: 3,
    name: "Body Transformation Program",
    icon: <Trophy className="w-8 h-8 text-gold" />,
    duration: "12-week program",
    price: "KSH 260,000-455,000",
    description: "Comprehensive transformation program designed specifically for women, with dedicated male trainers.",
    features: ["12-week commitment", "Nutrition guidance", "Weekly assessments", "Lifestyle coaching"],
    image: "/fitness/transformation.jpg"
  },
  {
    id: 4,
    name: "Couples Fitness Sessions",
    icon: <Users className="w-8 h-8 text-gold" />,
    duration: "60-90 minutes",
    price: "KSH 26,000-39,000",
    description: "Partner workouts designed to strengthen both your relationship and your bodies together.",
    features: ["Partner exercises", "Communication building", "Trust exercises", "Fun challenges"],
    image: "/fitness/couples.jpg"
  }
];

const trainers = [
  {
    id: 1,
    name: "Ryan Atlas",
    specialties: ["Strength Training", "Body Sculpting", "Athletic Performance"],
    experience: "8+ years",
    rating: 4.9,
    image: "/trainers/ryan.jpg",
    description: "Former competitive athlete specializing in female body transformation and strength building.",
    certifications: ["NASM-CPT", "Corrective Exercise", "Nutrition Coach"],
    availability: "Available"
  },
  {
    id: 2,
    name: "Marcus Power",
    specialties: ["Functional Fitness", "Flexibility", "Core Training"],
    experience: "6+ years",
    rating: 4.8,
    image: "/trainers/marcus-fit.jpg",
    description: "Expert in functional movement and flexibility training with focus on feminine strength.",
    certifications: ["ACE-CPT", "Yoga Instructor", "Pilates Certified"],
    availability: "Limited"
  },
  {
    id: 3,
    name: "Jordan Steel",
    specialties: ["HIIT Training", "Weight Loss", "Endurance"],
    experience: "7+ years",
    rating: 4.9,
    image: "/trainers/jordan.jpg",
    description: "High-intensity training specialist focused on helping women achieve their fitness goals.",
    certifications: ["ACSM-CPT", "CrossFit Level 2", "TRX Instructor"],
    availability: "Available"
  }
];

const transformationStories = [
  {
    name: "Sarah M.",
    program: "12-Week Transformation",
    trainer: "Ryan Atlas",
    result: "Lost 25lbs, gained confidence",
    image: "/transformations/sarah.jpg",
    quote: "Ryan helped me discover strength I never knew I had. The program changed my life."
  },
  {
    name: "Jessica L.",
    program: "Sensual Strength Classes",
    trainer: "Marcus Power",
    result: "Improved flexibility, body awareness",
    image: "/transformations/jessica.jpg",
    quote: "These classes taught me to move with grace and power. I feel more connected to my body."
  },
  {
    name: "Amanda R.",
    program: "Private Training",
    trainer: "Jordan Steel",
    result: "Built lean muscle, increased energy",
    image: "/transformations/amanda.jpg",
    quote: "Jordan's training methods are incredible. I've never felt stronger or more empowered."
  }
];

export default function FitnessPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (    <div className="pt-24 bg-black text-white">      {/* Hero Section */}
      <section className="h-[20vh] px-6 flex items-center bg-gradient-to-br from-red-900/30 via-black to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-5xl mb-3 block">🏋️‍♀️</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gold mb-2">Her Strength</h1>
            <p className="text-xl text-red-500 font-medium">"Built by Him. Ruled by Her."</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Discover your inner strength with our elite male trainers in a luxurious fitness environment designed exclusively for women.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Start Free Consultation
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              View Programs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Signature Fitness Programs
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {fitnessPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="relative">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    {program.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                      <p className="text-gold font-semibold">{program.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-zinc-300 text-sm">{program.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                    Start This Program
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Elite Male Trainers
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-black/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      trainer.availability === 'Available' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {trainer.availability}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gold font-bold">{trainer.rating}</span>
                    </div>
                    <span className="text-zinc-400 text-sm">{trainer.experience}</span>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {trainer.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Certifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full border border-gold/30"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                      trainer.availability === 'Available' ? 
                      'bg-red-600 hover:bg-red-700 text-white hover:scale-105' :
                      'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {trainer.availability === 'Available' ? 'Book Session' : 'Check Schedule'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Transformation Stories
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {transformationStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 rounded-2xl p-6 hover:from-zinc-900/70 hover:to-zinc-900/50 transition-all"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white text-center mb-2">{story.name}</h3>
                <p className="text-gold text-center text-sm mb-2">{story.program}</p>
                <p className="text-zinc-400 text-center text-sm mb-4">Trainer: {story.trainer}</p>
                <p className="text-red-500 text-center font-semibold mb-4">{story.result}</p>
                <blockquote className="text-zinc-300 italic text-sm text-center">
                  "{story.quote}"
                </blockquote>
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
            Ready to Discover Your Strength?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Start your transformation journey with our elite male trainers in a luxurious environment designed for your success.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Start Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              View Programs
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
