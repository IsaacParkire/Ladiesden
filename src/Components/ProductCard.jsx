import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <motion.img
          src={product.image || product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
          variants={imageVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {/* Sale Badge */}
        {product.on_sale && (
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -15 }}
            className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            SALE
          </motion.div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick Actions Overlay */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="p-3 bg-white rounded-full text-gray-700 hover:text-pink-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isAdding}
              className="p-3 bg-white rounded-full text-gray-700 hover:text-pink-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating || 4) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-gray-400 text-xs ml-1">({product.reviews_count || 0})</span>
        </div>
        
        <p className="text-xs text-pink-600 uppercase tracking-wide mb-1">
          {product.category?.name || 'Fashion'}
        </p>
        
        <h3 className="font-semibold text-sm text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              KSH {product.sale_price || product.price}
            </span>
            {product.sale_price && (
              <span className="text-xs text-gray-500 line-through">
                KSH {product.price}
              </span>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={isAdding}
            className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-[#1a5d1a] hover:bg-green-100 w-full justify-center disabled:opacity-50"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>  );
}

export default ProductCard;
