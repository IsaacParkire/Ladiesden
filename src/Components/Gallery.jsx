import { motion } from "framer-motion";

const images = [
  { src: "/gallery/1.jpg", alt: "Live Performance" },
  { src: "/gallery/2.jpg", alt: "VIP Lounge" },
  { src: "/gallery/3.jpg", alt: "Crowd Vibes" },
  { src: "/gallery/4.jpg", alt: "Dancer Spotlight" },
  { src: "/gallery/5.jpg", alt: "Stage Show" },
  { src: "/gallery/6.jpg", alt: "Backstage Fun" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-black text-white py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Gallery</h2>
        <p className="text-zinc-400">Sneak peek into our electrifying nights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-red-500/40"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-semibold">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
