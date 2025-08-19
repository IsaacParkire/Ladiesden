import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Lock, Shield, Zap, Award } from "lucide-react";
import ProductsGrid from "../Components/ProductsGrid";

const categories = [
  { id: "all", name: "All Products", icon: "✨" },
  { id: "luxury", name: "Luxury Collection", icon: "💎" },
  { id: "couples", name: "For Couples", icon: "💕" },
  { id: "wellness", name: "Wellness & Care", icon: "🌸" },
  { id: "accessories", name: "Accessories", icon: "🎀" },
  { id: "limited", name: "Limited Edition", icon: "👑" },
];

export default function ToysPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ageVerified, setAgeVerified] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
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
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] px-6 overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/hertoys1.jpeg"
            alt="Her Toys Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
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
          <ProductsGrid 
            page="toys"
            category={selectedCategory}
          />
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
