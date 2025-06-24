import { Dumbbell, HeartPulse, Flame } from "lucide-react";
import { motion } from "framer-motion";

const gymFeatures = [
  {
    title: "Strength Training",
    description: "Boost endurance and power for peak performances.",
    icon: <Dumbbell className="w-8 h-8 text-gold" />,
  },
  {
    title: "Cardio Burn",
    description: "High-energy routines to keep the rhythm flowing.",
    icon: <HeartPulse className="w-8 h-8 text-gold" />,
  },
  {
    title: "Flexibility & Core",
    description: "Dynamic stretches and core-focused drills.",
    icon: <Flame className="w-8 h-8 text-gold" />,
  },
];

export default function Gym() {
  return (
    <section id="gym" className="bg-black text-white py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Ladies Den Gym</h2>
        <p className="text-zinc-400">Where strength meets elegance</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {gymFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="bg-zinc-900 p-6 rounded-xl shadow-md hover:shadow-red-600/30 transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gold mb-2">{feature.title}</h3>
            <p className="text-zinc-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional CTA */}
      <div className="mt-16 text-center">
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition"
        >
          Book a Private Session
        </motion.a>
      </div>
    </section>
  );
}
