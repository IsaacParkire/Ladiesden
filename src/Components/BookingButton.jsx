import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookingButton() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-red-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-sm rounded-2xl p-12 border border-zinc-700/50"
        >
          <h2 className="text-4xl font-bold text-gold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience the pinnacle of luxury and intimacy. Our concierge team is standing by 
            to create your perfect, personalized experience.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-red-600/30"
              >
                <Calendar className="w-6 h-6" />
                Book Your Experience
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/connect"
                className="inline-flex items-center gap-3 border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Get Consultation
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-zinc-700/50">
            <p className="text-sm text-zinc-400 mb-4">
              Available 24/7 for your convenience
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Immediate Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Discreet Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
