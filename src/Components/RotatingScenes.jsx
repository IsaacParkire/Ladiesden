import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const scenes = [
  {
    id: 1,
    title: "Fashion & Style",
    subtitle: "Luxury made wearable",
    image: "/Ladiesden/images/about-intro.jpeg",
    description: "Discover our exclusive boutique collection designed for the modern woman who demands both elegance and sensuality.",
    cta: "Shop Boutique",
    link: "/boutique"
  },
  {
    id: 2,
    title: "Sensual Wellness",
    subtitle: "Relaxation as worship",
    image: "/Ladiesden/images/hertouch1.jpeg",
    description: "Experience our signature touch therapy with skilled male masseurs in luxurious private suites.",
    cta: "Book Massage",
    link: "/touch"
  },
  {
    id: 3,
    title: "Strength & Beauty",
    subtitle: "Built by him. Ruled by her",
    image: "/Ladiesden/images/hertouch2.jpeg",
    description: "Private fitness training with elite male trainers focused on your body transformation goals.",
    cta: "Start Training",
    link: "/strength"
  },
  {
    id: 4,
    title: "Exclusive Events",
    subtitle: "Pleasure after dark",
    image: "/Ladiesden/images/hernight2.jpeg",
    description: "Female-only events, private shows, and VIP experiences with trained male hosts.",
    cta: "Join Events",
    link: "/night"
  },
  {
    id: 5,
    title: "Private Desires",
    subtitle: "Desire. Served discreetly",
    image: "/Ladiesden/images/hersecret1.jpeg",
    description: "Explore your deepest fantasies in our exclusive members-only private lounge.",
    cta: "Discover Secrets",
    link: "/secrets"
  },
  {
    id: 6,
    title: "Signature Scents",
    subtitle: "Fragrance that captivates",
    image: "/Ladiesden/images/herscent1.jpeg",
    description: "Discover our exclusive collection of intoxicating fragrances designed to enhance your natural allure.",
    cta: "Explore Scents",
    link: "/scent"
  },
  {
    id: 7,
    title: "Intimate Collection",
    subtitle: "Pleasure redefined",
    image: "/Ladiesden/images/hertoys1.jpeg",
    description: "Premium intimate accessories and luxury items curated for the sophisticated woman.",
    cta: "Browse Collection",
    link: "/toys"
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
    <section className="relative h-[60vh] overflow-hidden bg-black rounded-2xl mx-4 my-8 shadow-2xl">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-6">
            <div className="text-center max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gold text-sm md:text-base font-medium mb-3"
              >
                {scenes[currentScene].subtitle}
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-4xl font-bold text-white mb-4"
              >
                {scenes[currentScene].title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-zinc-300 text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed"
              >
                {scenes[currentScene].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={scenes[currentScene].link}
                  className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {scenes[currentScene].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>      {/* Elegant Navigation Arrows */}
      <button
        onClick={prevScene}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextScene}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Modern Scene Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {scenes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToScene(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentScene
                ? "bg-red-600 scale-125 shadow-lg"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Minimal Scene Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        <span className="text-gold font-medium">{currentScene + 1}</span>
        <span className="text-zinc-400 mx-1">/</span>
        <span className="text-zinc-400">{scenes.length}</span>
      </div>
    </section>
  );
}
