import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const slides = [
    {
      id: 1,
      title: "Exclusive Luxury",
      subtitle: "Experience",
      description: "Step into a world of unparalleled elegance and sophistication",
      image: "/images/hero-slide-1.jpg",
      cta: "Explore Collection",
      link: "/boutique"
    },
    {
      id: 2,
      title: "Premium Wellness",
      subtitle: "& Beauty",
      description: "Indulge in our curated selection of wellness and beauty experiences",
      image: "/images/hero-slide-2.jpg",
      cta: "Book Session",
      link: "/book"
    },
    {
      id: 3,
      title: "VIP Members",
      subtitle: "Only",
      description: "Unlock exclusive perks and experiences designed just for you",
      image: "/images/hero-slide-3.jpg",
      cta: "Join VIP",
      link: "/register"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Video/Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Slide Indicator */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 text-sm font-medium tracking-wide uppercase">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </motion.div>

            {/* Main Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <motion.h2
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.h2>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to={slides[currentSlide].link}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {slides[currentSlide].cta}
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 group backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Video
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
            >
              {[
                { number: "500+", label: "Premium Products" },
                { number: "10K+", label: "Happy Members" },
                { number: "24/7", label: "VIP Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-pink-500 scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium tracking-wide">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernHero;
