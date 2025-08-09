import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'pink' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    pink: 'border-pink-600',
    purple: 'border-purple-600',
    blue: 'border-blue-600',
    white: 'border-white',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
    />
  );
};

export default LoadingSpinner;
