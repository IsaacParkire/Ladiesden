import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, Crown } from "lucide-react";
import ProductsGrid from "../Components/ProductsGrid";
import { productsAPI } from "../services/api";

export default function ScentPage() {
  const [categories, setCategories] = useState([
    { id: "all", name: "All Fragrances", slug: "all", icon: "✨" }
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getSubCategories({ page: 'scent' });
      const subCategories = response.data.map(cat => ({
        id: cat.slug,
        name: cat.name,
        slug: cat.slug,
        icon: getCategoryIcon(cat.slug)
      }));
      setCategories([
        { id: "all", name: "All Fragrances", slug: "all", icon: "✨" },
        ...subCategories
      ]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const getCategoryIcon = (slug) => {
    const iconMap = {
      'signature': '👑',
      'exotic': '🌺',
      'aphrodisiac': '💋',
      'custom': '🎨',
      'oils': '🌿'
    };
    return iconMap[slug] || '✨';
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] px-6 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/herscent2.jpeg"
            alt="Her Scent Background"
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
              Her Scent ✨
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover intoxicating fragrances that capture your essence and leave an unforgettable impression
            </p>
            <div className="flex items-center justify-center gap-6 text-gold">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <span>Exclusive Blends</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                <span>Custom Scents</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span>Premium Quality</span>
              </div>
            </div>
          </motion.div>
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
            page="scent"
            category={selectedCategory}
          />
        </div>
      </section>

      {/* Custom Scent Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gold mb-6">Create Your Signature Scent</h2>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Work with our master perfumers to craft a bespoke fragrance that's uniquely yours. 
              Every blend is tailored to your personality, preferences, and body chemistry.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Personal Consultation</h3>
                <p className="text-zinc-400 text-sm">One-on-one session with expert perfumer</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Crown className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium Ingredients</h3>
                <p className="text-zinc-400 text-sm">Finest oils and essences from around the world</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <Award className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Exclusive Formula</h3>
                <p className="text-zinc-400 text-sm">Your unique recipe, never to be duplicated</p>
              </div>
            </div>
            <button className="bg-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105">
              Book Custom Scent Session - KSH 25,870
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
