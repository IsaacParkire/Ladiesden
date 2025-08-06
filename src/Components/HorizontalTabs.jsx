import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabLinks = [
  { name: "Her Boutique", href: "/boutique" },
  { name: "Her Touch", href: "/touch" },
  { name: "Her Strength", href: "/strength" },
  { name: "Her Scent", href: "/scent" },
  { name: "Her Toys", href: "/toys" },
  { name: "Her Night", href: "/night" },
  { name: "Her Secrets", href: "/secrets" },
  { name: "Book Session", href: "/book" },
];

export default function HorizontalTabs() {
  const location = useLocation();

  const isActive = (href) => {
    return location.pathname === href;
  };
  return (
    <div className="fixed top-[88px] left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 py-3">
            {tabLinks.map((link) => (
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
                      ? "bg-red-600 text-white shadow-lg" 
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800"
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
      </div>
    </div>
  );
}
