import React from "react";
import { motion } from "framer-motion";
import { Crown, Heart, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const previewServices = [  {
    icon: <Crown className="w-8 h-8 text-gold" />,
    title: "VIP Concierge Services",
    description: "Elite personal assistance for sophisticated events and lifestyle management.",
    price: "From KSH 65,000/hour",
    image: "/services/vip-preview.jpg"
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Sensual Massage",
    description: "Therapeutic and sensual experiences to awaken your senses.",
    price: "From KSH 26,000/session",
    image: "/services/massage-preview.jpg"
  },
  {
    icon: <Star className="w-8 h-8 text-gold" />,
    title: "Fantasy Fulfillment",
    description: "Safe exploration of your deepest fantasies and desires.",
    price: "From KSH 52,000/session",
    image: "/services/fantasy-preview.jpg"
  },
  {
    icon: <Users className="w-8 h-8 text-red-500" />,
    title: "Couples Experiences",
    description: "Enhance intimacy and explore new dimensions together.",
    price: "From KSH 78,000/session",
    image: "/services/couples-preview.jpg"
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-20 px-6 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-4"
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 max-w-3xl mx-auto"
          >
            Discover our carefully curated selection of intimate experiences designed to fulfill your deepest desires.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {previewServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group bg-black/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  {service.icon}
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-gold font-semibold">{service.price}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-zinc-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button className="text-red-500 hover:text-red-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
