import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function ToysIntro() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pink-900/10 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop"
              alt="Luxury Wellness Products"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-2xl"></div>
            
            {/* Privacy Badge */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-white">100% Discreet</span>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gold">Premium</div>
                  <div className="text-xs text-zinc-300">Medical Grade</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">Secure</div>
                  <div className="text-xs text-zinc-300">Private Shipping</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">30-Day</div>
                  <div className="text-xs text-zinc-300">Guarantee</div>
                </div>
              </div>
            </div>
            
            {/* 18+ Badge */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              🔞 18+ Only
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl font-bold text-gold mb-6 flex items-center gap-3">
              <Lock className="w-10 h-10" />
              Her Toys
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Explore our exclusive collection of luxury wellness and intimacy products, 
              designed for the discerning woman who values quality, privacy, and sophistication.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              From premium materials to innovative technology, every item is carefully 
              selected to ensure the highest standards of safety, discretion, and pleasure.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Discreet Packaging</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Secure & Private</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gold" />
                <span className="text-zinc-300">Latest Technology</span>
              </div>
            </div>
            
            {/* Age Warning */}
            <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">Age Restricted Content</span>
              </div>
              <p className="text-sm text-zinc-400">
                This section contains adult wellness products. You must be 18+ to access this area.
              </p>
            </div>
            
            <Link
              to="/toys"
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Explore Collection (18+)
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
