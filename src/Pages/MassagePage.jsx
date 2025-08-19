import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Star, Flame, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const massageServices = [
  {
    id: 1,
    name: "Erotic Massage",
    icon: <Flame className="w-8 h-8 text-red-500" />,
    duration: "60-90 minutes",
    price: "KSH 39,000-58,500",
    description: "Intimate full-body massage experience with skilled male therapists, designed to awaken your senses and provide deep relaxation.",
    features: ["Full body massage", "Aromatic oils", "Private suite", "Professional male therapist"],
    image: "/massage/erotic.jpg"
  },
  {
    id: 2,
    name: "Sensual Therapy",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    duration: "90-120 minutes",
    price: "KSH 52,000-71,500",
    description: "Therapeutic massage combining traditional techniques with sensual elements for ultimate mind-body connection.",
    features: ["Therapeutic techniques", "Sensual elements", "Extended session", "Aftercare included"],
    image: "/massage/therapy.jpg"
  },
  {
    id: 3,
    name: "Candle Oil Experience",
    icon: <Flame className="w-8 h-8 text-gold" />,
    duration: "75-105 minutes",
    price: "KSH 45,500-65,000",
    description: "Luxurious massage using warm candle oils in a romantic candlelit atmosphere with expert male masseurs.",
    features: ["Warm candle oils", "Candlelit ambiance", "Aromatherapy", "Romantic setting"],
    image: "/massage/candle.jpg"
  },
  {
    id: 4,
    name: "Custom Sessions",
    icon: <Star className="w-8 h-8 text-gold" />,
    duration: "60-180 minutes",
    price: "KSH 52,000-104,000",
    description: "Personalized massage experiences tailored to your specific desires and preferences with our elite male masseurs.",
    features: ["Fully customized", "Choice of therapist", "Special requests", "Extended options"],
    image: "/massage/custom.jpg"
  }
];

const masseurs = [
  {
    id: 1,
    name: "Julian Rivers",
    specialties: ["Tantric Massage", "Deep Tissue", "Sensual Touch"],
    experience: "6+ years",
    rating: 4.9,
    image: "/masseurs/julian.jpg",
    description: "Certified massage therapist with expertise in tantric and sensual massage techniques.",
    availability: "Available"
  },
  {
    id: 2,
    name: "Marcus Stone",
    specialties: ["Therapeutic Massage", "Aromatherapy", "Hot Stone"],
    experience: "8+ years",
    rating: 4.8,
    image: "/masseurs/marcus.jpg",
    description: "Licensed therapeutic massage specialist focusing on relaxation and sensual wellness.",
    availability: "Limited"
  },
  {
    id: 3,
    name: "Adrian Cross",
    specialties: ["Swedish Massage", "Reflexology", "Body Work"],
    experience: "5+ years",
    rating: 4.9,
    image: "/masseurs/adrian.jpg",
    description: "Expert in traditional and modern massage techniques with a focus on client comfort.",
    availability: "Available"
  }
];

const massageLevels = [
  {
    level: 1,
    name: "The Innocent Caress",
    price: "KES 3,000-5,000",
    description: "Level 1 is for when you want to relax, loosen up, and keep it light. Soft, safe, spa-like — a taste of the Den’s touch.",
    clientFeels: "Relaxed and pampered. Curiosity is sparked for higher levels.",
    cta: "View Level 1 Services",
  },
  {
    level: 2,
    name: "The Lingering Stroke",
    price: "KES 6,000-10,000",
    description: "Level 2 is where your body starts noticing more than just relaxation. Every touch is slower, longer, and designed to make you linger in the moment. This is the stage where curiosity becomes desire — gentle, sensual, and teasing.",
    clientFeels: "Relaxed but aware, intimate and indulgent.",
    cta: "View Level 2 Services",
  },
  {
    level: 3,
    name: "The Forbidden Press",
    price: "KES 14,000-20,000",
    description: "Level 3 is where indulgence meets temptation. Her body starts responding before her mind catches up. It’s deeper, slower, more deliberate — a premium experience that makes her feel like she’s entering Den territory. Everything here is about heightened sensation and exclusive attention.",
    clientFeels: "Premium indulgence. She feels exclusive, spoiled, and craving more.",
    cta: "View Level 3 Services",
  },
  {
    level: 4,
    name: "The Queen’s Secret",
    price: "KES 30,000+",
    description: "Level 4 is private, secret, and by invitation only. It’s not on the public menu. Every touch is deliberate, every sensation heightened, designed to give her a multi-layered, unforgettable experience.",
    clientFeels: "Exclusive, elite, forbidden, accessing something very special.",
    cta: "Unlock VIP Access",
    locked: true,
  },
];

const massageAddOns = [
  { name: "Gold Wax", price: 6500, desc: "Full-body or intimate-area waxing with high-end, gentle products.", duration: "30-45 mins" },
  { name: "Hot Stones Seduction", price: 3500, desc: "Heated stones trace your curves, releasing tension while stimulating every sensitive point of your body.", duration: "15-25 mins" },
  { name: "Body-to-Body Flow", price: 5500, desc: "A massage where my body slides over yours — oil-covered, slow, and deliberate.", duration: "10-20 mins" },
  { name: "Mirror Play", price: 4000, desc: "Watch yourself being touched in real-time — the ultimate visual indulgence.", duration: "Full session in front of a mirror" },
  { name: "Silk and Glow Scrub", price: 8000, desc: "Full-body exfoliation, combined with hydrating oils for a soft, silky finish.", duration: "30-60 mins" },
];

const waxingMenu = [
  {
    name: "The Sweet Escape – Basic Wax",
    duration: "20–30 min",
    items: [
      { name: "Eyebrow Shaping", price: 1500 },
      { name: "Underarm Glow", price: 2500 },
      { name: "Lip or Chin Touch-Up", price: 2000 },
    ],
    clientFeel: "Quick pampering → looks clean, feels refreshed.",
  },
  {
    name: "The Satin Touch – Body Essentials",
    duration: "30–45 min",
    items: [
      { name: "Arms & Hands", price: 3500 },
      { name: "Legs & Thighs", price: 4500 },
      { name: "Back or Shoulders", price: 5000 },
    ],
    clientFeel: "Clean, polished, ready for more indulgence.",
  },
  {
    name: "The Queen’s Secret – Intimate / Full-Body Wax",
    duration: "60–90 min",
    items: [
      { name: "Brazilian / Bikini", price: 8500 },
      { name: "Full-Body Glow", price: 12500 },
      { name: "Luxury Oils Finish", price: 10000 },
    ],
    clientFeel: "Ultra-premium, indulgent experience.",
  },
];

const waxingAddOns = [
  { name: "Exfoliating Pre-Wax Scrub", price: 2500, duration: "15 min" },
  { name: "Post-Wax Hydrating Oil", price: 1000, duration: "10 min" },
  { name: "Aromatherapy Scent Infusion", price: 800, duration: "Included" },
];

export default function MassagePage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMasseur, setSelectedMasseur] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="pt-24 bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-[70vh] px-6 flex items-center relative">
        {/* Background Image - cover entire hero */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/hertouch3.jpeg"
            alt="Her Touch Background"
            className="w-full h-full object-contain object-center md:object-cover md:object-top"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-6xl sm:text-7xl mb-4 block">💆‍♀️</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-4 leading-tight">
              Her Touch
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-red-500 font-medium mb-6 italic">
              "Relaxation as Worship."
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-zinc-200 leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Experience the ultimate in sensual wellness with our expert male masseurs in luxurious private suites.
            Indulge in therapeutic bliss designed specifically for sophisticated women.
          </motion.p>
        </div>
      </section>

      {/* Massage Menu Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-8 sm:mb-12 md:mb-16"
          >
            Her Touch Massage Menu
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {massageLevels.map((level, idx) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className={`bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group relative flex flex-col cursor-pointer border-2 ${level.locked ? 'border-red-600' : 'border-zinc-800'}`}
              >
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide leading-tight">{level.name}</h3>
                    <p className="text-xl text-red-500 font-semibold mb-2">{level.price}</p>
                    <p className="text-zinc-300 mb-4 leading-relaxed">{level.description}</p>
                    <p className="text-blue-400 italic mb-6 text-sm font-semibold">Client feels: {level.clientFeels}</p>
                  </div>
                  {level.locked ? (
                    <button
                      className="w-full bg-gradient-to-r from-zinc-800 to-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg mt-4 hover:from-red-700 hover:to-zinc-800 hover:text-red-400 text-lg flex items-center justify-center gap-2 transition-all border-2 border-red-600"
                      onClick={() => navigate('/membership')}
                    >
                      <span className="inline-block mr-2">🔒</span> Unlock VIP Access
                    </button>
                  ) : (
                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      onClick={() => navigate('/servicestouchpage?level=' + level.level)}
                    >
                      {level.cta}
                    </button>
                  )}
                  {level.locked && (
                    <div className="absolute top-6 right-6 bg-red-700 text-white px-6 py-2 rounded-full text-lg font-black shadow-lg uppercase tracking-wider border-2 border-red-400">VIP</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massage Add-Ons */}
      <section className="py-16 px-6 bg-zinc-900/60">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-gold mb-12 text-center tracking-tight drop-shadow-lg">Massage Add-Ons</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {massageAddOns.map((addon, idx) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-gold/10 border-2 border-gold p-7 flex flex-col justify-between shadow-xl hover:scale-105 hover:shadow-gold/30 transition-transform duration-300"
              >
                <div>
                  <h4 className="text-2xl font-bold text-gold mb-2 uppercase tracking-wide">{addon.name}</h4>
                  <p className="text-zinc-200 mb-2 text-base font-medium">{addon.desc}</p>
                  <span className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full text-xs font-semibold mr-2">{addon.duration}</span>
                </div>
                <button
                  className="mt-6 bg-gradient-to-r from-red-600 to-gold text-black font-bold py-3 px-4 rounded-xl shadow hover:from-gold hover:to-red-700 hover:text-white transition-all text-lg"
                  onClick={() => navigate('/book', { state: { selectedService: addon.name, skipServiceStep: true } })}
                >
                  Book with Add-On (KES {addon.price.toLocaleString()})
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waxing Menu */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-8 sm:mb-12 md:mb-16"
          >
            Waxing Menu
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {waxingMenu.map((menu, idx) => (
              <motion.div
                key={menu.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group relative flex flex-col border-2 border-zinc-800"
              >
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide leading-tight">{menu.name}</h3>
                    <p className="text-red-500 font-semibold mb-2">{menu.duration}</p>
                    <ul className="mb-4">
                      {menu.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          <span className="text-white font-semibold">{item.name}</span>
                          <span className="text-red-400 font-bold ml-auto">KES {item.price.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-blue-400 italic mb-6 text-sm font-semibold">Client feels: {menu.clientFeel}</p>
                  </div>
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 mt-2"
                    onClick={() => navigate('/book', { state: { selectedService: menu.name, skipServiceStep: true } })}
                  >
                    Book This Waxing
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waxing Add-Ons */}
      <section className="py-12 px-6 bg-zinc-900/60">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-gold mb-10 text-center tracking-tight drop-shadow-lg">Waxing Add-On Enhancements</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {waxingAddOns.map((addon, idx) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-gold/10 border-2 border-gold p-7 flex flex-col justify-between shadow-xl hover:scale-105 hover:shadow-gold/30 transition-transform duration-300"
              >
                <div>
                  <h4 className="text-xl font-bold text-gold mb-2 uppercase tracking-wide">{addon.name}</h4>
                  <span className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full text-xs font-semibold mr-2">{addon.duration}</span>
                </div>
                <button
                  className="mt-6 bg-gradient-to-r from-gold to-red-600 text-black font-bold py-3 px-4 rounded-xl shadow hover:from-red-600 hover:to-gold hover:text-white transition-all text-lg"
                  onClick={() => navigate('/book', { state: { selectedService: addon.name, skipServiceStep: true } })}
                >
                  Book Add-On (KES {addon.price.toLocaleString()})
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masseurs Section */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Our Expert Male Masseurs
          </motion.h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {masseurs.map((masseur, index) => (
              <motion.div
                key={masseur.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-black/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={masseur.image}
                    alt={masseur.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      masseur.availability === 'Available' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {masseur.availability}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{masseur.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gold font-bold">{masseur.rating}</span>
                    </div>
                    <span className="text-zinc-400 text-sm">{masseur.experience}</span>
                  </div>
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {masseur.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {masseur.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                      masseur.availability === 'Available' ? 
                      'bg-red-600 hover:bg-red-700 text-white hover:scale-105' :
                      'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {masseur.availability === 'Available' ? 'Book Session' : 'Check Availability'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-900/20 border border-green-600/30 rounded-2xl p-8 text-center"
          >
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-4">Your Safety & Privacy</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">
              All our male masseurs are professionally trained, background-checked, and committed to maintaining 
              the highest standards of discretion and professionalism. Your comfort and privacy are our top priorities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Complete Discretion</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Private Suites</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-red-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-6"
          >
            Ready to Experience Her Touch?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Book your personalized massage experience and discover the ultimate in sensual wellness.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            Book Your Session Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}