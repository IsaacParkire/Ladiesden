import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, Crown, Heart, Star, Wand2, Droplet, Diamond, Sun, Smile } from "lucide-react";
import ProductsGrid from "../Components/ProductsGrid";

const categories = [
  { id: "all", name: "All Beauty", icon: "💄" },
  { id: "wigs", name: "Wigs & Hair", icon: "👑" },
  { id: "makeup", name: "Makeup", icon: "💋" },
  { id: "nails", name: "Nails", icon: "💅" },
  { id: "skincare", name: "Skincare & Body", icon: "🧴" },
  { id: "sets", name: "Beauty Sets", icon: "🎁" }
];

export default function BeautyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Beauty line sections for card rendering
  const beautySections = [
    {
      title: "Crown of Seduction",
      icon: <Crown className="w-8 h-8 text-gold" />,
      items: [
        "Lace Front Wigs (straight, body wave, curly, colored)",
        "Human Hair Bundles (18”–30” premium)",
        "Highlight & Ombre Wigs (scarlet streaks, luxury blonde, purple tips)",
        "Ponytails & Clip-Ins (quick seductive switch-ups)",
        "Braided Luxury Wigs (knotless, loc-styled, goddess braids)"
      ]
    },
    {
      title: "Face of Temptation",
      icon: <Heart className="w-8 h-8 text-red-600" />,
      items: [
        "Lip Glosses (scarlet red, nude, clear shine, purple tint)",
        "Lipsticks (matte, velvet, glossy)",
        "Lashes (3D mink, wispy, dramatic)",
        "Foundations & Powders (variety of shades for flawless glow)",
        "Eye Palettes (smokey, scarlet, golden tones)",
        "Highlighters (golden glow, diamond shimmer)"
      ]
    },
    {
      title: "Seduction at Her Fingertips",
      icon: <Star className="w-8 h-8 text-gold" />,
      items: [
        "Press-On Nails (scarlet, black, nude, French tips)",
        "Gel Nail Kits (UV lamp sets + polish)",
        "Nail Accessories (stickers, rhinestones, charms)",
        "Long Luxury Acrylics (dramatic designs, coffin/stiletto shapes)"
      ]
    },
    {
      title: "Luxury Glow",
      icon: <Droplet className="w-8 h-8 text-gold" />,
      items: [
        "Body Oils (vanilla, coconut, scarlet rose scents)",
        "Body Scrubs (coffee, sugar, luxury rose petal blends)",
        "Lotions & Butters (shea butter infused, luxury glow creams)",
        "Face Masks (hydrating, detoxifying, gold sheet masks)",
        "Bath Bombs & Salts (relaxing, scented, luxury spa feels)"
      ]
    },
    {
      title: "The Den Vanity Kits",
      icon: <Diamond className="w-8 h-8 text-gold" />,
      items: [
        "Night Out Look (lashes + gloss + wig)",
        "Poolside Glow (sunscreen oil + gloss + wig bandana)",
        "Boss Lady Kit (lipstick + luxury nails + fragrance sample)",
        "Den Mystery Vanity Box (curated surprise products)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] px-6 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/herbeauty-hero.jpg"
            alt="Her Beauty Background"
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
            <h1 className="text-5xl md:text-7xl font-bold text-gold mb-6 drop-shadow-lg">
              Her Beauty 💄
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Seductive luxury for every look. Wigs, makeup, nails, skincare, and curated beauty sets for the modern Den queen.
            </p>
            <div className="flex items-center justify-center gap-6 text-gold">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <span>Luxury Hairlines</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Heart className="w-6 h-6" />
                <span>Seductive Glam</span>
              </div>
              <div className="flex items-center gap-2">
                <Diamond className="w-6 h-6" />
                <span>Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-8 border-b border-red-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "bg-gold text-black shadow-lg"
                    : "bg-zinc-900 hover:bg-red-900 text-gold border border-gold"
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

      {/* Products Grid - uses same card as Boutique/Scent */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <ProductsGrid 
            page="beauty"
            category={selectedCategory}
          />
        </div>
      </section>

      {/* Explore Our Beauty Line - Card Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-black/60 via-zinc-900/40 to-black/80">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {beautySections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group border border-gold shadow-lg"
            >
              <div className="flex items-center gap-4 px-6 pt-6">
                {section.icon}
                <h3 className="text-2xl font-bold text-gold mb-2">{section.title}</h3>
              </div>
              <ul className="list-disc ml-10 mb-6 mt-4 text-zinc-200 text-base">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gold mb-4">Ready to Seduce?</h2>
          <p className="text-lg text-zinc-300 mb-8">Shop our luxury beauty line and transform your look for every Den occasion.</p>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Shop Her Beauty Now
          </button>
        </motion.div>
      </section>
    </div>
  );
}