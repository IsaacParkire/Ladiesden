import { ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const vipPackages = [
  {
    name: "Gold Lounge",
    price: "$299",
    features: [
      { icon: ShieldCheck, label: "Private Booth" },
      { icon: Sparkles, label: "Complimentary Bottle" },
      { icon: Star, label: "Meet & Greet" },
    ],
  },
  {
    name: "Red Velvet",
    price: "$499",
    features: [
      { icon: Star, label: "Front-Row Seating" },
      { icon: Sparkles, label: "2 Premium Bottles" },
      { icon: ShieldCheck, label: "Backstage Access" },
    ],
  },
];

export default function VIP() {
  return (
    <section id="vip" className="bg-zinc-900 text-white py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">VIP Packages</h2>
        <p className="text-zinc-400">Indulge in an elite experience</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        {vipPackages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-black rounded-2xl shadow-xl border border-zinc-700 hover:border-red-600 transition-colors"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gold">{pkg.name}</h3>
              <p className="text-red-500 text-xl font-bold">{pkg.price}</p>

              <ul className="space-y-2">
                {pkg.features.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-zinc-300">
                    <Icon className="w-5 h-5 text-gold" />
                    {label}
                  </li>
                ))}
              </ul>

              <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition-all">
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
