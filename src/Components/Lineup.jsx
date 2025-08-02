import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Sample dancers array
const dancers = [
  {
    name: "Sasha Blaze",
    specialty: "Fire Dance",
    image: "/dancers/sasha.jpg",
  },
  {
    name: "Luna Noir",
    specialty: "Pole Acrobatics",
    image: "/dancers/luna.jpg",
  },
  {
    name: "Jade Ember",
    specialty: "Contemporary Flow",
    image: "/dancers/jade.jpg",
  },
];

export default function Lineup() {
  return (
    <section
      id="lineup"
      className="relative bg-gradient-to-b from-[#1a0000] via-black to-black text-white py-32 px-6 scroll-mt-24 overflow-hidden"
    >
      {/* Top Fade for Seamless Transition */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>

      {/* Header */}
      <div className="text-center mb-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gold mb-4 drop-shadow-md"
        >
          Featured Lineup
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg"
        >
          Meet our elite performers bringing your fantasies to life
        </motion.p>
      </div>

      {/* Dancer Cards */}
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto relative z-20">
        {dancers.map((dancer, index) => (
          <motion.div
            key={dancer.name}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            className="relative bg-zinc-900 rounded-2xl shadow-lg overflow-hidden group hover:shadow-red-600/40 transition-all duration-300 hover:scale-105"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none"></div>

            <div className="overflow-hidden">
              <img
                src={dancer.image}
                alt={dancer.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-white mb-1">
                {dancer.name}
              </h3>
              <p className="text-red-500 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" /> {dancer.specialty}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Fade for Seamless Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
}
