import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Heart, Diamond } from "lucide-react";

export default function BeautyIntro() {
  return (
    <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-br from-black via-zinc-900/80 to-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-2xl" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gold via-red-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-lg"
        >
          Unveil Your Signature Beauty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          From luxury wigs to radiant skin, <span className="text-gold font-semibold">Her Beauty</span> is your passport to confidence, creativity, and allure. Curated for the bold, the playful, and the unapologetically glamorous.
        </motion.p>
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-gold" />
            <span className="text-gold font-medium">Crowning Moments</span>
          </div>
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-6 h-6" />
            <span className="font-medium">Glamour & Glow</span>
          </div>
          <div className="flex items-center gap-2">
            <Diamond className="w-6 h-6 text-gold" />
            <span className="text-gold font-medium">Finest Quality</span>
          </div>
        </div>
        <Link
          to="/beauty"
          className="inline-block bg-gradient-to-r from-pink-600 via-red-600 to-gold hover:from-red-700 hover:to-gold text-black font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 text-lg tracking-wide border-2 border-gold"
        >
          Shop Her Beauty Now
        </Link>
      </div>
    </section>
  );
}
