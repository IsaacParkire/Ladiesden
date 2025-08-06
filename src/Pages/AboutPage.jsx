import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 bg-black text-white">      {/* Hero Section */}
      <section className="h-[20vh] px-6 flex items-center bg-gradient-to-br from-red-900/30 via-black to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gold mb-4"
          >
            About Laydies Den
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Where elegance meets desire, and fantasies become reality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Our Story
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gold mb-6">Our Story</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Founded with a vision to create an exclusive sanctuary where sophistication and sensuality 
              unite, Laydies Den has become the premier destination for discerning individuals seeking 
              extraordinary experiences.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Our carefully curated environment combines luxury, privacy, and unparalleled service 
              to deliver moments that transcend the ordinary and embrace the extraordinary.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="/about-story.jpg"
              alt="Our Story"
              className="rounded-xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-8"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 leading-relaxed"
          >
            To provide an exclusive, safe, and luxurious environment where our clients can explore 
            their desires with complete discretion and uncompromising quality. We believe in creating 
            unforgettable experiences that celebrate individuality and personal expression.
          </motion.p>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Our Values
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Heart className="w-12 h-12 text-red-500" />,
                title: "Passion",
                description: "We bring genuine passion to every interaction, ensuring authentic and meaningful experiences that resonate deeply with our clients."
              },
              {
                icon: <Users className="w-12 h-12 text-gold" />,
                title: "Discretion",
                description: "Privacy and confidentiality are paramount. We maintain the highest standards of discretion in all our services and client relationships."
              },
              {
                icon: <Award className="w-12 h-12 text-red-500" />,
                title: "Excellence",
                description: "We are committed to excellence in every aspect of our service, from our facilities to our staff to the experiences we create."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center bg-zinc-900/30 p-8 rounded-xl hover:bg-zinc-900/50 transition-all"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
