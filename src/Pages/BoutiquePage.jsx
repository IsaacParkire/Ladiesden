import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductsGrid from "../Components/ProductsGrid";
import { productsAPI } from "../services/api";

export default function BoutiquePage() {
  const [categories, setCategories] = useState([
    { id: "all", name: "All Items", slug: "all", icon: "👗" }
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getSubCategories({ page: 'boutique' });
      const subCategories = response.data.map(cat => ({
        id: cat.slug,
        name: cat.name,
        slug: cat.slug,
        icon: getCategoryIcon(cat.slug)
      }));
      setCategories([
        { id: "all", name: "All Items", slug: "all", icon: "👗" },
        ...subCategories
      ]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const getCategoryIcon = (slug) => {
    const iconMap = {
      'activewear': '🏃‍♀️',
      'bikinis-resortwear': '👙',
      'party-dresses': '🎉',
      'lounge-bedroom': '🛏️',
      'accessories': '💎'
    };
    return iconMap[slug] || '👗';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Header */}
      <motion.div 
        className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Exclusive Boutique
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our curated collection of luxury fashion, intimate wear, and accessories designed for the modern woman
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all backdrop-blur"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-xl hover:from-pink-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/70 hover:text-white backdrop-blur'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProductsGrid 
          page="boutique"
          category={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
