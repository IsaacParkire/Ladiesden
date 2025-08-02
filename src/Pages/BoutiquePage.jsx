import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Filter, Search, Plus } from "lucide-react";

const categories = [
  { id: "all", name: "All Items", icon: "👗" },
  { id: "activewear", name: "Activewear", icon: "🏃‍♀️" },
  { id: "bikinis", name: "Bikinis & Resortwear", icon: "👙" },
  { id: "party", name: "Party Dresses", icon: "🎉" },
  { id: "lounge", name: "Lounge & Bedroom", icon: "🛏️" },
  { id: "accessories", name: "Accessories", icon: "💎" }
];

const products = [
  {
    id: 1,
    name: "Midnight Seduction Set",
    category: "lounge",
    price: 189,
    originalPrice: 249,
    image: "/boutique/lounge-1.jpg",
    rating: 4.9,
    reviews: 34,
    description: "Luxurious silk lingerie set with intricate lace detailing",
    exclusive: true
  },
  {
    id: 2,
    name: "Power Goddess Activewear",
    category: "activewear",
    price: 149,
    image: "/boutique/activewear-1.jpg",
    rating: 4.8,
    reviews: 67,
    description: "High-performance athletic wear that sculpts and supports"
  },
  {
    id: 3,
    name: "Crimson Temptation Bikini",
    category: "bikinis",
    price: 129,
    image: "/boutique/bikini-1.jpg",
    rating: 4.7,
    reviews: 45,
    description: "Brazilian-cut bikini in premium Italian fabric"
  },
  {
    id: 4,
    name: "Velvet Noir Party Dress",
    category: "party",
    price: 299,
    originalPrice: 399,
    image: "/boutique/party-1.jpg",
    rating: 4.9,
    reviews: 23,
    description: "Statement dress for unforgettable nights"
  },
  {
    id: 5,
    name: "Diamond Choker & Gloves Set",
    category: "accessories",
    price: 199,
    image: "/boutique/accessories-1.jpg",
    rating: 4.8,
    reviews: 56,
    description: "Crystal choker with matching satin opera gloves"
  },
  {
    id: 6,
    name: "Scarlet Heels Collection",
    category: "accessories",
    price: 249,
    image: "/boutique/heels-1.jpg",
    rating: 4.6,
    reviews: 78,
    description: "Italian leather heels in signature red"
  }
];

export default function BoutiquePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="pt-24 bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-6xl mb-4 block">👑</span>
            <h1 className="text-5xl font-bold text-gold mb-4">Her Boutique</h1>
            <p className="text-2xl text-red-500 font-medium">"Luxury made wearable."</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto"
          >
            Discover our curated collection of luxury fashion designed exclusively for the woman who commands attention and demands perfection.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white scale-105"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.originalPrice && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        SALE
                      </span>
                    )}
                    {product.exclusive && (
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                    />
                  </button>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-zinc-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-zinc-400 text-sm">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-zinc-500 line-through text-lg">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-semibold hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 bg-gradient-to-t from-red-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-12"
          >
            Signature Collections
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Power Collection", desc: "Activewear for the confident woman", image: "/collections/power.jpg" },
              { name: "Midnight Edition", desc: "Exclusive evening and intimate wear", image: "/collections/midnight.jpg" },
              { name: "Golden Goddess", desc: "Luxury accessories and statement pieces", image: "/collections/goddess.jpg" }
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-900/30 rounded-2xl overflow-hidden hover:bg-zinc-900/50 transition-all group cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-zinc-300">{collection.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 p-4 rounded-xl shadow-xl border border-zinc-700 z-50">
          <div className="text-white">
            <p className="font-semibold mb-2">Cart ({cart.length} items)</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all text-sm font-semibold">
              View Cart & Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
