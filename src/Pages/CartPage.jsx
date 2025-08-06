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
    <div className="pt-24 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gold hover:text-red-400 transition-colors"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-red-500" size={24} />
            <h1 className="text-3xl font-bold text-gold">Shopping Cart</h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingBag size={80} className="mx-auto text-zinc-600 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-zinc-400 mb-8">Add some luxurious items to get started</p>
            <Link
              to="/boutique"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-zinc-400">{item.category}</p>
                            {item.size && (
                              <p className="text-xs text-zinc-500">Size: {item.size}</p>
                            )}
                            {item.color && (
                              <p className="text-xs text-zinc-500">Color: {item.color}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-medium text-white w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>                          <div className="text-right">
                            <p className="font-bold text-gold text-lg">
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
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 pt-6 border-t border-zinc-700">
                  <Link
                    to="/boutique"
                    className="inline-flex items-center gap-2 text-gold hover:text-red-400 transition-colors"
                  >
                    <ArrowLeft size={16} />
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
                className="bg-zinc-900/50 rounded-xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                  <div className="space-y-4">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>KSH {subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `KSH ${shipping.toLocaleString()}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-zinc-300">
                    <span>VAT (16%)</span>
                    <span>KSH {tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-gold">KSH {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 50000 && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                    <p className="text-sm text-red-300">
                      Add KSH {(50000 - subtotal).toLocaleString()} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <Heart size={18} />
                </Link>

                {/* Additional Actions */}
                <div className="mt-4 space-y-2">
                  <button className="w-full text-gold hover:text-red-400 transition-colors text-sm py-2">
                    Save for Later
                  </button>
                  <button className="w-full text-gold hover:text-red-400 transition-colors text-sm py-2">
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
