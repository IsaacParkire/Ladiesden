import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgVideo from "../assets/video.webm";
import sideImage from "../assets/side-image.jpg";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative w-full h-[100vh] sm:h-[80vh] md:h-[70vh] overflow-hidden flex items-center justify-start text-left px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 lg:pt-40"
      >
        {/* Blurred Background Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 filter blur-[2px]">
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
          <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3 overflow-hidden">
            <img
              src={sideImage}
              alt="Decorative"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 sm:from-black/80 sm:via-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-full sm:max-w-2xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gold drop-shadow-md leading-tight"
          >
            Where <span className="text-red-600">Her</span> desires become reality{" "}
            <span className="text-red-600">Laydies Den</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-zinc-300 mb-6 sm:mb-8 max-w-full sm:max-w-lg leading-relaxed"
          >
            Luxury experiences crafted exclusively for the modern woman. Where sophistication meets desire.
          </motion.p>

          {/* Modern CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              to="/boutique"
              className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base min-h-[48px] flex items-center justify-center"
            >
              <span className="relative z-10">Explore Her World</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </motion.div>

          {/* Elegant Scroll Hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 sm:mt-8 flex items-center gap-2 text-gold/60"
          >
            <span className="text-xs sm:text-sm font-light">Discover more</span>
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce" />        </motion.div>
        </div>

        {/* Optional: Fade-out at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>
    </>
  );
}
