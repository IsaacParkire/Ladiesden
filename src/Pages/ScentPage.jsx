import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Sparkles, Award, Crown } from "lucide-react";

const categories = [
  { id: "all", name: "All Fragrances", icon: "✨" },
  { id: "signature", name: "Signature Collection", icon: "👑" },
  { id: "exotic", name: "Exotic Blends", icon: "🌺" },
  { id: "aphrodisiac", name: "Aphrodisiac", icon: "💋" },
  { id: "custom", name: "Custom Blends", icon: "🎨" },
  { id: "oils", name: "Essential Oils", icon: "🌿" }
];

const fragrances = [
  {
    id: 1,
    name: "Midnight Temptation",
    category: "signature",    price: "KSH 38,870",
    originalPrice: "KSH 51,870",
    image: "/scent/signature-1.jpg",
    rating: 4.9,
    reviews: 127,
    description: "Intoxicating blend of jasmine, sandalwood, and amber",
    notes: ["Top: Bergamot, Pink Pepper", "Heart: Jasmine, Rose", "Base: Sandalwood, Amber"],
    exclusive: true,
    limited: true
  },
  {
    id: 2,
    name: "Golden Goddess",
    category: "signature",
    price: "KSH 33,670",
    image: "/scent/signature-2.jpg",
    rating: 4.8,
    reviews: 89,
    description: "Radiant floral bouquet with golden honey undertones",
    notes: ["Top: Honey, Citrus", "Heart: White Flowers", "Base: Vanilla, Musk"],
    exclusive: true
  },
  {
    id: 3,
    name: "Mystic Orchid",
    category: "exotic",
    price: "KSH 42,770",
    image: "/scent/exotic-1.jpg",
    rating: 4.9,
    reviews: 156,
    description: "Rare orchid essence with mysterious oriental spices",
    notes: ["Top: Black Pepper, Cardamom", "Heart: Orchid, Ylang", "Base: Oud, Patchouli"],
    exclusive: false
  },
  {
    id: 4,
    name: "Desire Elixir",
    category: "aphrodisiac",    price: "KSH 51,870",
    originalPrice: "KSH 64,870",
    image: "/scent/aphrodisiac-1.jpg",
    rating: 5.0,
    reviews: 203,
    description: "Potent aphrodisiac blend crafted for ultimate allure",
    notes: ["Top: Pink Grapefruit", "Heart: Damask Rose, Pheromones", "Base: Ambergris, Musk"],
    exclusive: true,
    limited: true
  },
  {
    id: 5,
    name: "Vanilla Seduction",
    category: "custom",
    price: "KSH 58,370",
    image: "/scent/custom-1.jpg",
    rating: 4.9,
    reviews: 78,
    description: "Bespoke vanilla blend tailored to your unique chemistry",
    notes: ["Customizable", "Personal Consultation Included"],
    exclusive: true,
    custom: true
  },
  {
    id: 6,
    name: "Goddess Oil Blend",
    category: "oils",
    price: "KSH 23,270",
    image: "/scent/oils-1.jpg",
    rating: 4.7,
    reviews: 94,
    description: "Pure essential oil blend for body and aromatherapy",
    notes: ["Rose, Neroli, Frankincense", "100% Natural", "Vegan & Cruelty-Free"],
    exclusive: false
  }
];

export default function ScentPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  const filteredFragrances = selectedCategory === "all" 
    ? fragrances 
    : fragrances.filter(fragrance => fragrance.category === selectedCategory);

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

  return (
    <div className="min-h-screen bg-black text-white pt-24">      {/* Hero Section */}
      <section className="relative py-8 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredFragrances.map((fragrance, index) => (              <motion.div
                key={fragrance.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative group"
              >                {/* Product Image */}
                <div className="relative h-44 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop";
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {fragrance.exclusive && (
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                    {fragrance.limited && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LIMITED
                      </span>
                    )}
                    {fragrance.custom && (
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        CUSTOM
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(fragrance.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.has(fragrance.id)
                          ? "text-red-500 fill-current"
                          : "text-white"
                      }`}
                    />
                  </button>                  {/* Sale Badge */}
                  {fragrance.originalPrice && (
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SAVE KSH 13,000+
                    </div>
                  )}                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(fragrance.rating)                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}                    <span className="text-sm text-gray-600 ml-2">
                      {fragrance.rating} ({fragrance.reviews})
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{fragrance.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {fragrance.description}
                  </p>                  {/* Fragrance Notes */}
                  <div className="mb-4">
                    <h4 className="text-green-700 text-sm font-semibold mb-2">Notes:</h4>
                    <div className="space-y-1">
                      {fragrance.notes.map((note, i) => (
                        <p key={i} className="text-xs text-gray-600">{note}</p>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}                  <div className="flex items-center justify-between">                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        {fragrance.price}
                      </span>
                      {fragrance.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {fragrance.originalPrice}
                        </span>
                      )}
                    </div><button
                      onClick={() => addToCart(fragrance.id)}
                      disabled={cart.has(fragrance.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                        cart.has(fragrance.id)
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-[#1a5d1a] hover:bg-green-100 hover:scale-105"
                      }`}
                    >
                      <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                      {cart.has(fragrance.id) ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
