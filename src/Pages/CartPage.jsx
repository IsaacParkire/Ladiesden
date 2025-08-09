import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, totalPrice } = useCart();

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `KSH ${price.toLocaleString()}`;
  };

  // Helper function to get numeric price
  const getNumericPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^\d.]/g, ''));
    }
    return price;
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 50000 ? 0 : 2500; // Adjusted for KSH
  const tax = subtotal * 0.16; // Kenya VAT rate
  const total = subtotal + shipping + tax;
  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-gold hover:text-red-400 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Continue Shopping</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <ShoppingBag className="text-red-500" size={20} />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gold">Shopping Cart</h1>
          </div>
        </div>

        {cartItems.length === 0 ? (          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16 px-4"
          >
            <ShoppingBag size={60} className="sm:w-20 sm:h-20 mx-auto text-zinc-600 mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-zinc-400 mb-6 sm:mb-8 text-sm sm:text-base">Add some luxurious items to get started</p>
            <Link
              to="/boutique"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base min-h-[48px] flex items-center justify-center"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/50 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-3 sm:mb-2 gap-2">
                          <div className="flex-grow">
                            <h3 className="font-semibold text-white text-sm sm:text-base">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-zinc-400">{item.category}</p>
                            {item.size && (
                              <p className="text-xs text-zinc-500">Size: {item.size}</p>
                            )}
                            {item.color && (
                              <p className="text-xs text-zinc-500">Color: {item.color}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-medium text-white w-8 text-center text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-center sm:text-right">
                            <p className="font-bold text-gold text-base sm:text-lg">
                              {formatPrice(getNumericPrice(item.price) * item.quantity)}
                            </p>
                            <p className="text-xs text-zinc-400">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>                {/* Continue Shopping */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-700">
                  <Link
                    to="/boutique"
                    className="inline-flex items-center gap-2 text-gold hover:text-red-400 transition-colors text-sm sm:text-base"
                  >
                    <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/50 rounded-xl p-4 sm:p-6 sticky top-20 sm:top-24"
              >
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Order Summary</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-zinc-300 text-sm sm:text-base">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>KSH {subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-zinc-300 text-sm sm:text-base">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `KSH ${shipping.toLocaleString()}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-zinc-300 text-sm sm:text-base">
                    <span>VAT (16%)</span>
                    <span>KSH {tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-zinc-700 pt-3 sm:pt-4">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-gold">KSH {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 50000 && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-red-300">
                      Add KSH {(50000 - subtotal).toLocaleString()} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px]"
                >
                  Proceed to Checkout
                  <Heart size={16} className="sm:w-5 sm:h-5" />
                </Link>

                {/* Additional Actions */}
                <div className="mt-3 sm:mt-4 space-y-2">
                  <button className="w-full text-gold hover:text-red-400 transition-colors text-xs sm:text-sm py-2 min-h-[44px]">
                    Save for Later
                  </button>
                  <button className="w-full text-gold hover:text-red-400 transition-colors text-xs sm:text-sm py-2 min-h-[44px]">
                    Add Promo Code
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
