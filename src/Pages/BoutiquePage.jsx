import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Filter, Search, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

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
    price: "KSH 24,570",
    originalPrice: "KSH 32,370",
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
    price: "KSH 19,370",
    image: "/boutique/activewear-1.jpg",
    rating: 4.8,
    reviews: 67,
    description: "High-performance athletic wear that sculpts and supports"
  },
  {
    id: 3,
    name: "Crimson Temptation Bikini",
    category: "bikinis",
    price: "KSH 16,770",
    image: "/boutique/bikini-1.jpg",
    rating: 4.7,
    reviews: 45,
    description: "Brazilian-cut bikini in premium Italian fabric"
  },
  {
    id: 4,
    name: "Velvet Noir Party Dress",
    category: "party",
    price: "KSH 38,870",
    originalPrice: "KSH 51,870",
    image: "/boutique/party-1.jpg",
    rating: 4.9,
    reviews: 23,
    description: "Statement dress for unforgettable nights"
  },
  {
    id: 5,
    name: "Diamond Choker & Gloves Set",
    category: "accessories",
    price: "KSH 25,870",
    image: "/boutique/accessories-1.jpg",
    rating: 4.8,
    reviews: 56,
    description: "Crystal choker with matching satin opera gloves"
  },
  {
    id: 6,
    name: "Scarlet Heels Collection",
    category: "accessories",
    price: "KSH 32,370",
    image: "/boutique/heels-1.jpg",
    rating: 4.6,
    reviews: 78,
    description: "Italian leather heels in signature red"
  }
];

export default function BoutiquePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const { addItem } = useCart();

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    addItem(product);
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
      {/* Compact Modern Hero Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-4xl mb-3 block">👗💃</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">Her Boutique</h1>
            <p className="text-lg text-red-500 font-medium">"Luxury made wearable."</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto"
          >
            Discover our curated collection of luxury fashion designed exclusively for the woman who commands attention.
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
        <div className="max-w-7xl mx-auto">          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all group hover:shadow-lg hover:shadow-red-500/10 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Compact Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.originalPrice && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        SALE
                      </span>
                    )}
                    {product.exclusive && (
                      <span className="bg-gold text-black px-2 py-0.5 rounded-full text-xs font-bold">
                        VIP
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Heart 
                      className={`w-3 h-3 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                    />
                  </button>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="p-3">                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-zinc-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-zinc-400 text-xs">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-zinc-300 text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-gold">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-zinc-500 line-through text-sm">{product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-all text-xs font-semibold hover:scale-105"
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
          </div>        </div>
      </section>
    </div>
  );
}
