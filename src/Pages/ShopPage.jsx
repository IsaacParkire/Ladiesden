import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Filter, Search, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const products = [
  {
    id: 1,
    name: "Silk Seduction Robe",
    category: "lingerie",
    price: 189,
    originalPrice: 249,
    image: "/shop/robe-1.jpg",
    images: ["/shop/robe-1.jpg", "/shop/robe-1-2.jpg"],
    rating: 4.8,
    reviews: 24,
    description: "Luxurious silk robe with intricate lace detailing. Perfect for intimate moments.",
    features: ["100% Pure Silk", "Hand-stitched lace", "Available in 5 colors", "One size fits most"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Red", "Gold", "White", "Purple"]
  },
  {
    id: 2,
    name: "Sensual Massage Oil Set",
    category: "wellness",
    price: 79,
    image: "/shop/oils-1.jpg",
    images: ["/shop/oils-1.jpg", "/shop/oils-1-2.jpg"],
    rating: 4.9,
    reviews: 45,
    description: "Premium massage oil collection with aphrodisiac scents to enhance intimacy.",
    features: ["3 different scents", "Natural ingredients", "Long-lasting formula", "Beautiful gift box"],
    variants: ["Vanilla & Sandalwood", "Rose & Jasmine", "Ylang-Ylang & Bergamot"]
  },
  {
    id: 3,
    name: "Crystal Pleasure Collection",
    category: "accessories",
    price: 299,
    originalPrice: 399,
    image: "/shop/crystals-1.jpg",
    images: ["/shop/crystals-1.jpg", "/shop/crystals-1-2.jpg"],
    rating: 4.7,
    reviews: 18,
    description: "Handcrafted crystal accessories designed for sensual exploration and healing.",
    features: ["Rose quartz & amethyst", "Smooth finish", "Discreet packaging", "Care instructions included"],
    exclusive: true
  },
  {
    id: 4,
    name: "Midnight Elegance Lingerie Set",
    category: "lingerie",
    price: 149,
    image: "/shop/lingerie-1.jpg",
    images: ["/shop/lingerie-1.jpg", "/shop/lingerie-1-2.jpg"],
    rating: 4.6,
    reviews: 32,
    description: "Exquisite lace lingerie set that combines comfort with allure.",
    features: ["French lace", "Adjustable straps", "Matching set", "Luxury packaging"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Red", "Navy", "Champagne"]
  },
  {
    id: 5,
    name: "Aromatherapy Candle Collection",
    category: "wellness",
    price: 95,
    image: "/shop/candles-1.jpg",
    images: ["/shop/candles-1.jpg", "/shop/candles-1-2.jpg"],
    rating: 4.8,
    reviews: 67,
    description: "Hand-poured soy candles with sensual fragrances to set the perfect mood.",
    features: ["3 luxury candles", "40-hour burn time each", "Lead-free wicks", "Reusable containers"],
    scents: ["Passion Fruit & Vanilla", "Sandalwood & Amber", "Cherry Blossom & Musk"]
  },
  {
    id: 6,
    name: "Luxury Feather Accessories",
    category: "accessories",
    price: 69,
    image: "/shop/feathers-1.jpg",
    images: ["/shop/feathers-1.jpg", "/shop/feathers-1-2.jpg"],
    rating: 4.5,
    reviews: 29,
    description: "Soft, ethically sourced feathers for sensual play and massage.",
    features: ["Ethically sourced", "Multiple textures", "Easy to clean", "Storage pouch included"],
    types: ["Ostrich plume", "Peacock feathers", "Swan down", "Mixed collection"]
  }
];

const categories = [
  { id: "all", name: "All Items", count: products.length },
  { id: "lingerie", name: "Lingerie", count: products.filter(p => p.category === "lingerie").length },
  { id: "wellness", name: "Wellness", count: products.filter(p => p.category === "wellness").length },
  { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const { addItem, totalItems } = useCart();

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });
  const addToCart = (product, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-4 sm:mb-6"
          >
            Boutique Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed"
          >
            Discover our curated selection of luxury items designed to enhance your intimate experiences.
          </motion.p>
        </div>
      </section>      {/* Filters and Controls */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[44px] flex items-center justify-center ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort & Search */}
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-800 text-white px-2 sm:px-3 py-2 rounded-lg border border-zinc-700 focus:border-red-600 outline-none text-xs sm:text-sm min-h-[44px] flex-1 sm:flex-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>              {/* Cart Button */}
              <button className="relative bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all min-h-[44px] flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>      {/* Products Grid */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative group mx-auto"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.originalPrice && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        SALE
                      </span>
                    )}
                    {product.exclusive && (
                      <span className="bg-gold text-black px-2 py-1 rounded text-xs font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                    />
                  </button>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-zinc-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-zinc-400 text-xs">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-black mb-2 cursor-pointer hover:text-gold transition-colors line-clamp-2"
                      onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </h3>
                  
                  <p className="text-zinc-600 text-xs mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-col items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-zinc-500 line-through text-sm">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-[#1a5d1a] hover:bg-green-100 w-full justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full bg-zinc-900 rounded-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 sm:h-80 md:h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              
              {/* Product Details */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-500 fill-current' : 'text-zinc-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-zinc-400 text-sm">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gold">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-zinc-500 line-through text-xl">${selectedProduct.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Features:</h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Options */}
                {selectedProduct.sizes && (
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3">Size:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-3 py-2 border border-zinc-600 rounded-lg hover:border-red-600 transition-colors text-sm"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedProduct.colors && (
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3">Color:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          className="px-3 py-2 border border-zinc-600 rounded-lg hover:border-red-600 transition-colors text-sm"
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add to Cart */}
                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all"
                  >
                    Add to Cart - ${selectedProduct.price}
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className="p-3 border border-zinc-600 rounded-xl hover:border-red-600 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                    />
                  </button>
                </div>
              </div>
            </div>          </motion.div>
        </div>
      )}
    </div>
  );
}
