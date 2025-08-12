import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutIntro() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gold mb-6">Welcome to Laydies Den</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Where sophistication meets desire, and every fantasy becomes reality. We've created 
              an exclusive sanctuary where discerning individuals can explore their deepest desires 
              in complete privacy and luxury.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              Our carefully selected elite gentlemen and luxurious facilities provide an 
              unparalleled experience that transcends the ordinary.            </p>            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >            <img
              src="/Ladiesden/images/aboutintro1.jpg"
              alt="Laydies Den Experience"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-2xl"></div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gold">5+</div>
                  <div className="text-xs text-zinc-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">1000+</div>
                  <div className="text-xs text-zinc-300">Satisfied Clients</div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <div className="text-2xl font-bold text-gold">4.9</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
