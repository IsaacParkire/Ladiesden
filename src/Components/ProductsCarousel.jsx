import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const products = [
  {
    id: 1,
    name: "Luxury Silk Dress",
    price: "KSH 38,870",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    category: "Fashion",
    rating: 5,
    sale: true
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: "KSH 77,870",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    category: "Accessories",
    rating: 5,
    sale: false
  },
  {
    id: 3,
    name: "Premium Skincare Set",
    price: "KSH 19,370",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=600&fit=crop",
    category: "Beauty",
    rating: 4,
    sale: true
  },
  {
    id: 4,
    name: "Elegant Jewelry Set",
    price: "KSH 116,870",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    category: "Jewelry",
    rating: 5,
    sale: false
  },
  {
    id: 5,
    name: "Luxury Perfume",
    price: "KSH 25,870",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=600&fit=crop",
    category: "Fragrance",
    rating: 5,
    sale: true
  },
  {
    id: 6,
    name: "Designer Heels",
    price: "KSH 51,870",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
    category: "Footwear",
    rating: 4,
    sale: false
  }
];

export default function ProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - 2)) % (products.length - 2));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full bg-gradient-to-r from-zinc-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-2">
            ✨ Featured Luxuries
          </h2>
          <p className="text-zinc-400">Curated exclusively for the sophisticated woman</p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Products Grid */}
          <div className="overflow-hidden rounded-2xl">
            <div className="flex gap-6">
              <AnimatePresence mode="wait">
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={`${product.id}-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    className="flex-1 min-w-0 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Sale Badge */}
                      {product.sale && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                        {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-gray-100 text-[#1a5d1a] hover:bg-green-100 p-3 rounded-full mx-2 transition-colors"
                        >
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-red-400 font-medium uppercase tracking-wide">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          {[...Array(product.rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gold font-bold text-lg">
                          {product.price}
                        </span>
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: products.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-red-500 w-6' : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
            Shop All Products
          </button>
        </div>
      </div>
    </div>
  );
}
