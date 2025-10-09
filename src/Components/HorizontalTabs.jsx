import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";

const tabLinks = [
  { name: "Her Boutique", href: "/boutique" },
  { name: "Her Touch", href: "/touch" },
  { name: "Her Strength", href: "/strength" },
  { name: "Her Scent", href: "/scent" },
  { name: "Her Beauty", href: "/beauty" },
  { name: "Her Night", href: "/night" },
  { name: "Her Secrets", href: "/secrets" },
  { name: "Book Session", href: "/book" },
];

export default function HorizontalTabs() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (href) => {
    return location.pathname === href;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed top-[88px] left-0 right-0 z-40 bg-transparent backdrop-blur-sm border-b border-zinc-800/30">
      <div className="w-full">
        {/* Desktop View - Centered Distribution */}
        <div className="hidden md:flex items-center justify-center py-3 px-4">
          <div className="flex items-center space-x-3">
            {tabLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300
                    ${isActive(link.href) 
                      ? "bg-red-600/90 text-white shadow-lg backdrop-blur-sm" 
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/50 backdrop-blur-sm"
                    }
                  `}
                >
                  {link.name}
                </motion.div>
                
                {/* Active indicator */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View - Three Dots Dropdown */}
        <div className="md:hidden flex items-center justify-end py-3 px-4">
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
              className="p-2 rounded-lg bg-zinc-800/50 backdrop-blur-sm text-zinc-300 hover:text-white hover:bg-zinc-700/50 transition-all duration-300"
            >
              {isDropdownOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-sm border border-zinc-800/50 rounded-lg shadow-xl overflow-hidden"
                >
                  {tabLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          px-4 py-3 text-sm font-medium border-b border-zinc-800/30 last:border-b-0 transition-all duration-300
                          ${isActive(link.href) 
                            ? "bg-red-600/20 text-red-400 border-l-2 border-l-red-500" 
                            : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                          }
                        `}
                      >
                        {link.name}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
