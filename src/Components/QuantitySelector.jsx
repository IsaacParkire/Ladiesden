import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 999, 
  disabled = false,
  size = 'md',
  className = '' 
}) {
  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    onQuantityChange(clampedValue);
  };

  // Size variants
  const sizeClasses = {
    sm: {
      button: 'w-6 h-6',
      input: 'w-12 h-6 text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      button: 'w-8 h-8',
      input: 'w-16 h-8 text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      button: 'w-10 h-10',
      input: 'w-20 h-10 text-base',
      icon: 'w-5 h-5'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Decrement Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className={`
          ${currentSize.button}
          bg-zinc-800 hover:bg-zinc-700 
          disabled:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50
          border border-zinc-700 rounded-lg
          flex items-center justify-center
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-red-500/50
        `}
        aria-label="Decrease quantity"
      >
        <Minus className={`${currentSize.icon} text-zinc-300`} />
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`
          ${currentSize.input}
          bg-zinc-800 border border-zinc-700 rounded-lg
          text-white text-center font-medium
          focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500
          disabled:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        `}
        aria-label="Product quantity"
      />

      {/* Increment Button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className={`
          ${currentSize.button}
          bg-zinc-800 hover:bg-zinc-700 
          disabled:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50
          border border-zinc-700 rounded-lg
          flex items-center justify-center
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-red-500/50
        `}
        aria-label="Increase quantity"
      >
        <Plus className={`${currentSize.icon} text-zinc-300`} />
      </button>
    </div>
  );
}
