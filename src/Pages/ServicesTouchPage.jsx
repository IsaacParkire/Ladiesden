import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Massage services data by level
const massageLevels = [
  {
    level: 1,
    name: "The Innocent Caress",
    services: [
      {
        name: "Whisper Hands",
        description: "A light, fingertip-style massage — gentle, feathery touches that relax her nerves and awaken her skin.",
        price: 3000,
        duration: "45-60 mins",
      },
      {
        name: "Velvet Flow",
        description: "Full-body oil massage that melts away tension. It’s pure and innocent but hints of sensuality.",
        price: 3500,
        duration: "60 mins",
      },
      {
        name: "Candle Glow",
        description: "Warm aromatherapy candle oils drip over her skin, giving her that melting body sensation — deep relaxation, very sensual but still safe.",
        price: 4500,
        duration: "60-90 mins",
      },
    ],
  },
  {
    level: 2,
    name: "The Lingering Stroke",
    services: [
      {
        name: "The Siren’s Glide",
        description: "Long, teasing strokes that blur the line between calm and craving — she’s aware of every trail of your hands.",
        price: 6500,
        duration: "90 mins",
      },
      {
        name: "Silk and Skin",
        description: "Heated oils are applied with fingertips that pause at all the right places for just a moment too long.",
        price: 8000,
        duration: "2hrs",
      },
      {
        name: "Bated Breath",
        description: "Light touch combined with warm breath near the ear and neck, pulses of anticipation that make her heart rate quicken.",
        price: 9500,
        duration: "2-2.5hrs",
      },
    ],
  },
  {
    level: 3,
    name: "The Forbidden Press",
    services: [
      {
        name: "Eden’s Edge",
        description: "Alternating deep pressure with slow, sensual strokes over thighs, hips, and lower back. Designed to tease, please, and excite in ways she hasn’t felt before or for a long time.",
        price: 15000,
        duration: "120 mins",
      },
      {
        name: "Temptation Hold",
        description: "Focused pressure on pleasure zones, prolonging the anticipation and building desire. Ice and temperature play induced.",
        price: 19000,
        duration: "2-3 hrs",
      },
    ],
  },
  {
    level: 4,
    name: "The Queen’s Secret",
    services: [
      {
        name: "Eve’s Whisper",
        description: "A discreet, full release after a long sensual build-up.",
        price: 30000,
        duration: "3hrs",
      },
      {
        name: "Queen’s Surrender",
        description: "An extended session where mutual touch is invited, making her feel truly empowered and desired.",
        price: 40000,
        duration: "4hrs",
      },
      {
        name: "Divine Sin",
        description: "Multi-round pampering with her chosen male companion — an experience that’s both luxurious and private, designed for maximum satisfaction.",
        price: 50000,
        duration: "4hrs+",
      },
    ],
    locked: true,
  },
];

export default function ServicesTouchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // Get selected level from query param or state
  const params = new URLSearchParams(location.search);
  const selectedLevel = parseInt(params.get("level"), 10) || location.state?.level || 1;
  const levelData = massageLevels.find((l) => l.level === selectedLevel);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-gold mb-12 text-center tracking-tight drop-shadow-lg"
        >
          {levelData?.name || "Massage Level"} Services
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-10">
          {levelData?.services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-gradient-to-br from-zinc-900 to-gold/10 border-2 border-gold rounded-3xl p-8 shadow-2xl flex flex-col justify-between hover:scale-105 hover:shadow-gold/30 transition-transform duration-300 min-h-[320px]"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gold mb-2 uppercase tracking-wide">{service.name}</h2>
                <p className="text-zinc-200 mb-3 text-base font-medium">{service.description}</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xl text-red-400 font-bold">KES {service.price.toLocaleString()}</span>
                  <span className="text-sm text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full font-semibold">{service.duration}</span>
                </div>
              </div>
              <button
                className="mt-6 bg-gradient-to-r from-red-600 to-gold hover:from-gold hover:to-red-700 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg hover:text-white"
                onClick={() => navigate("/book", { state: { selectedService: service.name, skipServiceStep: true } })}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
        {levelData?.locked && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-zinc-900 to-red-900 border-4 border-red-600 rounded-3xl px-12 py-12 shadow-2xl">
              <h2 className="text-4xl font-extrabold text-red-600 mb-4 tracking-wide uppercase">Level 4 Locked</h2>
              <p className="text-zinc-300 mb-6 text-lg font-medium">This level is exclusive to VIP members only. Unlock the Queen’s Secret for the ultimate experience.</p>
              <button
                className="bg-gradient-to-r from-gold to-red-600 hover:from-red-600 hover:to-gold text-black font-bold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 text-xl hover:text-white"
                onClick={() => navigate("/membership")}
              >
                Unlock VIP Access
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
