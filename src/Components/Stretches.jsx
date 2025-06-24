import { Move, Repeat, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stretchItems = [
  {
    title: "Dynamic Warmups",
    description: "Prepare your body with fluid, rhythmic movements.",
    icon: <Move className="w-8 h-8 text-gold" />,
  },
  {
    title: "Active Stretching",
    description: "Increase range of motion with controlled stretches.",
    icon: <Repeat className="w-8 h-8 text-gold" />,
  },
  {
    title: "Explosive Power",
    description: "Unlock agility and speed with power-focused drills.",
    icon: <Zap className="w-8 h-8 text-gold" />,
  },
];

export default function Stretches() {
  return (
    <section id="stretches" className="bg-black text-white py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Stretching & Mobility</h2>
        <p className="text-zinc-400">Stay limber, stay ready</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {stretchItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="bg-zinc-900 p-6 rounded-xl shadow-md hover:shadow-red-600/30 transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gold mb-2">{item.title}</h3>
            <p className="text-zinc-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
