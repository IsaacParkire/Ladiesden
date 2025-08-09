import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductsGrid = ({ categoryId, searchQuery, featured = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    inStock: false,
  });

  useEffect(() => {
    fetchProducts();
  }, [categoryId, searchQuery, featured, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (featured) {
        response = await productsAPI.getFeatured();
      } else if (searchQuery) {
        response = await productsAPI.search(searchQuery);
      } else {
        const params = {
          category: categoryId,
          ordering: sortBy === 'newest' ? '-created_at' : 
                   sortBy === 'price_low' ? 'price' : 
                   sortBy === 'price_high' ? '-price' : 
                   sortBy === 'rating' ? '-rating' : '-created_at',
          ...filters,
        };
        response = await productsAPI.getAll(params);
      }
      
      setProducts(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product) => {
    // TODO: Open product quick view modal
    console.log('Quick view:', product);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={fetchProducts}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      {!featured && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm">
          {/* Sort & Filter */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* View Mode & Results Count */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {products.length} products
            </span>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200'
                } transition-colors`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200'
                } transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-500 text-lg mb-4">No products found</div>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              {viewMode === 'grid' ? (
                <ProductCard 
                  product={product} 
                  onQuickView={handleQuickView}
                />
              ) : (
                <ProductListItem 
                  product={product} 
                  onQuickView={handleQuickView}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
      {products.length > 0 && products.length % 12 === 0 && (
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-medium hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Load More Products
          </motion.button>
        </div>
      )}
    </div>
  );
};

// List view component for products
const ProductListItem = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product.id);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-xl shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow"
    >
      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-pink-600 uppercase tracking-wide">
              {product.category?.name}
            </p>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">
              KSH {product.sale_price || product.price}
            </div>
            {product.sale_price && (
              <div className="text-sm text-gray-500 line-through">
                KSH {product.price}
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => onQuickView(product)}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm"
          >
            View Details
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAdding}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsGrid;
