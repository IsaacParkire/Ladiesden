import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgVideo from "../assets/hero-bg.mp4";
import sideImage from "../assets/side-image.jpg"; // Ensure this exists
// import ProductsCarousel from "./ProductsCarousel";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-start text-left px-6 pt-32 md:pt-40"
      >
        {/* ...existing code... */}
        {/* Blurred Background Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 filter blur-[3px]">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Side Image */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 overflow-hidden">
            <img
              src={sideImage}
              alt="Decorative"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gold drop-shadow-md leading-tight"
          >
            Where <span className="text-red-600">Her</span> desires become reality{" "}
            <span className="text-red-600">Laydies Den</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl text-zinc-300 mb-8 max-w-xl leading-relaxed"
          >
            Luxury experiences crafted exclusively for the modern woman. Where sophistication meets desire.
          </motion.p>          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/boutique"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl shadow-xl transition-all duration-300 animate-pulse"
            >
              Explore Her World
            </Link>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-14 animate-bounce"
          >
            <ArrowDown className="text-red-500 w-8 h-8" />
          </motion.div>
        </div>

        {/* Optional: Fade-out at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>      </section>

      {/* Products Carousel Section */}
      {/* <ProductsCarousel /> */}
    </>
  );
}
