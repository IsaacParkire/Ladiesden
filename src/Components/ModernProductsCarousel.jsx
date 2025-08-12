import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Luxury Silk Dress",
    price: "KSH 38,870",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    category: "Fashion",
    rating: 5,
    sale: true
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: "KSH 77,870",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop",
    category: "Accessories",
    rating: 5,
    sale: false
  },
  {
    id: 3,
    name: "Premium Skincare Set",
    price: "KSH 19,370",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=400&fit=crop",
    category: "Beauty",
    rating: 4,
    sale: true
  },
  {
    id: 4,
    name: "Elegant Jewelry Set",
    price: "KSH 116,870",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop",
    category: "Jewelry",
    rating: 5,
    sale: false
  },
  {
    id: 5,
    name: "Luxury Perfume",
    price: "KSH 25,870",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=400&fit=crop",
    category: "Fragrance",
    rating: 5,
    sale: true
  },
  {
    id: 6,
    name: "Designer Heels",
    price: "KSH 51,870",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop",
    category: "Footwear",
    rating: 4,
    sale: false
  }
];

export default function ProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const productsPerView = 4;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + 1 >= products.length - productsPerView + 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= products.length - productsPerView + 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? products.length - productsPerView : prev - 1
    );
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-zinc-900/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gold mb-1">
            ✨ Featured Luxuries
          </h3>
          <p className="text-zinc-400 text-sm">
            Curated exclusively for the modern woman
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800/50"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Products Horizontal Scroll */}
          <div className="overflow-hidden rounded-xl">
            <motion.div 
              className="flex gap-3"
              animate={{ x: `${-currentIndex * (100 / productsPerView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 w-1/4 bg-white/5 backdrop-blur-sm border border-zinc-700/30 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-red-500/10"
                  whileHover={{ y: -5 }}
                >
                  {/* Compact Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Sale Badge */}
                    {product.sale && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        SALE
                      </div>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 rounded-full transition-all duration-300 hover:scale-110 mb-2">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-gray-100 text-[#1a5d1a] hover:bg-green-100 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:scale-110">
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Compact Product Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-white font-medium text-xs mb-1 truncate">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-red-500 font-bold text-sm">
                        {product.price}
                      </span>                      <button className="text-green-600 hover:text-green-700 transition-colors duration-300">
                        <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Minimal Dots Indicator */}
          <div className="flex justify-center mt-3 gap-1">
            {Array.from({ length: products.length - productsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-red-600 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>        {/* Modern CTA */}
        <div className="text-center mt-6">
          <Link 
            to="/boutique"
            className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            <span className="relative z-10">Shop All Products</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
