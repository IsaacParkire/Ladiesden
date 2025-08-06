import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ScentIntro() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gold mb-6 flex items-center gap-3">
              <Sparkles className="w-10 h-10" />
              Her Scent
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Discover intoxicating fragrances that capture your unique essence and leave an 
              unforgettable impression wherever you go. From signature blends to custom creations, 
              find the perfect scent that speaks to your soul.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              Our exclusive collection features rare ingredients, aphrodisiac blends, and 
              bespoke fragrances crafted by master perfumers just for you.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Exclusive Blends</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Custom Scents</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Aphrodisiac Formulas</span>
              </div>
            </div>
            
            <Link
              to="/scent"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Explore Fragrances
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop"
              alt="Luxury Fragrances"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gold">50+</div>
                  <div className="text-xs text-zinc-300">Exclusive Scents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">Custom</div>
                  <div className="text-xs text-zinc-300">Bespoke Blends</div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <div className="text-2xl font-bold text-gold">5.0</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gold text-black px-4 py-2 rounded-full text-sm font-bold">
              ✨ New Arrivals
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
