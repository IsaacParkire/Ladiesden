import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `KSH ${price.toLocaleString()}`;
  };

  return (
    <>      {/* Floating Cart Button */}
      <motion.button
        onClick={toggleCart}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg z-50 transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >        <div className="relative">
          <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
          {totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={totalItems}
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
            />

            {/* Cart Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 text-white shadow-xl z-50 overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gold">Shopping Cart</h2>
                  <button
                    onClick={toggleCart}
                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (                  <div className="text-center py-12">
                    <svg className='w-12 h-12 mx-auto text-zinc-600 mb-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                    <p className="text-zinc-400 mb-4">Your cart is empty</p>
                    <Link
                      to="/boutique"
                      onClick={toggleCart}
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-zinc-800 rounded-lg p-4"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Product Image */}
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {item.name}
                            </h3>
                            <p className="text-red-400 font-medium text-sm">
                              {formatPrice(item.price)}
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-zinc-700 rounded transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-zinc-700 rounded transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-600 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-gold">
                      KSH {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/cart"
                      onClick={toggleCart}
                      className="block w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-4 rounded-lg text-center font-semibold transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={toggleCart}
                      className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg text-center font-semibold transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
