import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getFeatured();
      setProducts(response.data.slice(0, 8)); // Show only 8 featured products
    } catch (err) {
      console.error('Failed to fetch featured products:', err);
      setError('Failed to load featured products');
      // Fallback to mock data for demo
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demo purposes
  const mockProducts = [
    {
      id: 1,
      name: "Luxury Silk Scarf",
      price: 2500,
      sale_price: 1999,
      image: "/images/product-1.jpg",
      category: { name: "Accessories" },
      rating: 4.8,
      review_count: 124,
      in_stock: true,
      on_sale: true
    },
    {
      id: 2,
      name: "Premium Wellness Kit",
      price: 5000,
      image: "/images/product-2.jpg",
      category: { name: "Wellness" },
      rating: 4.9,
      review_count: 89,
      in_stock: true,
      on_sale: false
    },
    {
      id: 3,
      name: "VIP Experience Package",
      price: 15000,
      sale_price: 12000,
      image: "/images/product-3.jpg",
      category: { name: "Experiences" },
      rating: 5.0,
      review_count: 45,
      in_stock: true,
      on_sale: true
    },
    {
      id: 4,
      name: "Designer Jewelry Set",
      price: 8500,
      image: "/images/product-4.jpg",
      category: { name: "Jewelry" },
      rating: 4.7,
      review_count: 203,
      in_stock: true,
      on_sale: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <LoadingSpinner size="lg" color="pink" />
            <p className="mt-4 text-zinc-300">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-pink-600" />
            <span className="text-pink-600 font-semibold tracking-wide uppercase text-sm">
              Featured Collection
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Handpicked
            <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              For You
            </span>
          </h2>
          
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium products, 
            each selected for its exceptional quality and luxury appeal.
          </p>
        </motion.div>        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <ProductCard 
                product={product} 
                onQuickView={(product) => console.log('Quick view:', product)}
              />
            </motion.div>
          ))}        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
