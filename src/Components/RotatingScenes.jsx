import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const scenes = [
  {
    id: 1,
    title: "Fashion & Style",
    subtitle: "Luxury made wearable",
    image: "/scenes/fashion.jpg",
    description: "Discover our exclusive boutique collection designed for the modern woman who demands both elegance and sensuality.",
    cta: "Shop Boutique",
    link: "/boutique"
  },
  {
    id: 2,
    title: "Sensual Wellness",
    subtitle: "Relaxation as worship",
    image: "/scenes/massage.jpg",
    description: "Experience our signature touch therapy with skilled male masseurs in luxurious private suites.",
    cta: "Book Massage",
    link: "/massage"
  },
  {
    id: 3,
    title: "Strength & Beauty",
    subtitle: "Built by him. Ruled by her",
    image: "/scenes/fitness.jpg",
    description: "Private fitness training with elite male trainers focused on your body transformation goals.",
    cta: "Start Training",
    link: "/fitness"
  },
  {
    id: 4,
    title: "Exclusive Lounge",
    subtitle: "Pleasure after dark",
    image: "/scenes/lounge.jpg",
    description: "Female-only events, private shows, and VIP experiences with trained male hosts.",
    cta: "Join Events",
    link: "/events"
  },
  {
    id: 5,
    title: "Private Desires",
    subtitle: "Desire. Served discreetly",
    image: "/scenes/secrets.jpg",
    description: "Explore your deepest fantasies in our exclusive members-only private lounge.",
    cta: "Discover Secrets",
    link: "/secrets"
  }
];

export default function RotatingScenes() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
    setIsAutoPlaying(false);
  };

  const prevScene = () => {
    setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);
    setIsAutoPlaying(false);
  };

  const goToScene = (index) => {
    setCurrentScene(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={scenes[currentScene].image}
              alt={scenes[currentScene].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-6">
            <div className="text-center max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gold text-lg md:text-xl font-medium mb-4"
              >
                {scenes[currentScene].subtitle}
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                {scenes[currentScene].title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-zinc-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {scenes[currentScene].description}
              </motion.p>
              
              <motion.a
                href={scenes[currentScene].link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-xl transition-all"
              >
                {scenes[currentScene].cta}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevScene}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextScene}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scene Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {scenes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToScene(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentScene
                ? "bg-red-600 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scene Counter */}
      <div className="absolute top-8 right-8 z-20 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white">
        <span className="text-gold font-bold">{currentScene + 1}</span>
        <span className="text-zinc-300 mx-1">/</span>
        <span className="text-zinc-300">{scenes.length}</span>
      </div>
    </section>
  );
}
