import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Lock, Shield, Zap, Award } from "lucide-react";

const categories = [
  { id: "all", name: "All Products", icon: "✨" },
  { id: "luxury", name: "Luxury Collection", icon: "💎" },
  { id: "couples", name: "For Couples", icon: "💕" },
  { id: "wellness", name: "Wellness & Care", icon: "🌸" },
  { id: "accessories", name: "Accessories", icon: "🎀" },
  { id: "limited", name: "Limited Edition", icon: "👑" }
];

const products = [
  {
    id: 1,
    name: "Golden Goddess Deluxe",
    category: "luxury",    price: "KSH 77,870",
    originalPrice: "KSH 103,870",
    image: "/toys/luxury-1.jpg",
    rating: 4.9,
    reviews: 234,
    description: "Premium gold-plated luxury item with advanced features",
    features: ["24k Gold Plating", "10 Intensity Levels", "Waterproof", "USB Rechargeable"],
    exclusive: true,
    limited: true,
    discrete: true
  },
  {
    id: 2,
    name: "Couples' Paradise Set",
    category: "couples",    price: "KSH 51,870",
    originalPrice: "KSH 64,870",
    image: "/toys/couples-1.jpg",
    rating: 4.8,
    reviews: 189,
    description: "Complete intimate wellness set designed for couples",
    features: ["App Controlled", "Remote Control", "Multiple Modes", "Travel Case"],
    exclusive: true,
    discrete: true
  },
  {
    id: 3,
    name: "Wellness Wand Pro",
    category: "wellness",
    price: "KSH 38,870",
    image: "/toys/wellness-1.jpg",
    rating: 4.9,
    reviews: 345,
    description: "Therapeutic wellness device for personal care and relaxation",
    features: ["Medical Grade Silicone", "Heated Technology", "5 Programs", "Quiet Motor"],
    exclusive: false,
    discrete: true
  },
  {
    id: 4,
    name: "Diamond Elite Collection",
    category: "limited",    price: "KSH 116,870",
    originalPrice: "KSH 155,870",
    image: "/toys/limited-1.jpg",
    rating: 5.0,
    reviews: 156,
    description: "Ultra-premium limited edition with Swarovski crystals",
    features: ["Swarovski Crystals", "Platinum Finish", "Custom Engraving", "Lifetime Warranty"],
    exclusive: true,
    limited: true,
    discrete: true
  },
  {
    id: 5,
    name: "Silk & Lace Accessory Kit",
    category: "accessories",
    price: "KSH 20,670",
    image: "/toys/accessories-1.jpg",
    rating: 4.7,
    reviews: 278,
    description: "Luxurious silk and lace accessories for enhanced intimacy",
    features: ["100% Silk", "Handcrafted Lace", "Adjustable Fit", "Gift Box"],
    exclusive: false,
    discrete: true
  },  {
    id: 6,
    name: "Couples' Remote Harmony",
    category: "couples",
    price: "KSH 58,370",
    image: "/toys/couples-2.jpg",
    rating: 4.8,
    reviews: 203,
    description: "Long-distance couples' connectivity device with app control",
    features: ["Global Connectivity", "Video Call Sync", "Custom Patterns", "Travel Lock"],
    exclusive: true,
    discrete: true
  }
];

export default function ToysPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());
  const [ageVerified, setAgeVerified] = useState(false);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (id) => {
    const newCart = new Set(cart);
    newCart.add(id);
    setCart(newCart);
  };

  // Age verification overlay
  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-md mx-6 text-center"
        >
          <Lock className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gold mb-4">Age Verification Required</h2>
          <p className="text-zinc-300 mb-6">
            You must be 18 years or older to access this section. This area contains adult wellness products.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setAgeVerified(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all"
            >
              I am 18+ years old
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-6 rounded-xl font-semibold transition-all"
            >
              Take me back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">      {/* Hero Section */}
      <section className="relative py-8 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 to-purple-900/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gold mb-6">
              Her Toys 💎
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our exclusive collection of luxury wellness and intimacy products, crafted for the discerning woman
            </p>
            <div className="flex items-center justify-center gap-6 text-gold">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                <span>Discreet Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                <span>Private & Secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="px-6 py-4 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
            <Shield className="w-5 h-5 text-gold" />
            <span>All orders shipped in discreet, unmarked packaging</span>
            <span>•</span>
            <span>30-day money-back guarantee</span>
            <span>•</span>
            <span>Medical-grade materials only</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-8 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "bg-gold text-black"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-gold/50 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-pink-900/20 to-purple-900/20 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm group-hover:blur-none"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop";
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.exclusive && (
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                    {product.limited && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LIMITED
                      </span>
                    )}
                    {product.discrete && (
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        DISCREET
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.has(product.id)
                          ? "text-red-500 fill-current"
                          : "text-white"
                      }`}
                    />
                  </button>                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      SAVE KSH {parseInt(product.originalPrice.replace(/[^\d]/g, '')) - parseInt(product.price.replace(/[^\d]/g, ''))}
                    </div>
                  )}
                </div>                {/* Product Info */}
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500 fill-current"
                            : "text-zinc-600"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-zinc-400 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-zinc-400 text-xs mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-2">
                    <h4 className="text-gold text-xs font-semibold mb-1">Features:</h4>
                    <div className="space-y-0.5">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <p key={i} className="text-xs text-zinc-400 flex items-center gap-1">
                          <Zap className="w-2 h-2 text-gold" />
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gold">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={cart.has(product.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                        cart.has(product.id)
                          ? "bg-green-600 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white hover:scale-105"
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      {cart.has(product.id) ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gold mb-6">Privacy & Quality Guaranteed</h2>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Your privacy is our priority. Every product is carefully selected for quality, safety, and discretion.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Shield className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Discreet Shipping</h3>
                <p className="text-zinc-400 text-sm">Unmarked packaging with secure delivery</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Award className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Medical Grade</h3>
                <p className="text-zinc-400 text-sm">Only body-safe, premium materials</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Lock className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-zinc-400 text-sm">Encrypted checkout and data protection</p>
              </div>
            </div>
            <div className="text-sm text-zinc-400">
              <p className="mb-2">All products are intended for adults 18+ only</p>
              <p>Consult healthcare providers for any medical concerns</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
