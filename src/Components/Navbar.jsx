import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, Search, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/laydies-logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Her Boutique", href: "/boutique" },
  { name: "Her Touch", href: "/touch" },
  { name: "Her Strength", href: "/strength" },
];

const categories = [
  { name: "Her Night", href: "/night" },
  { name: "Her Secrets", href: "/secrets" },
  { name: "Gallery", href: "/gallery" },
  { name: "Book Session", href: "/book" },
  { name: "Connect", href: "/connect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const getActiveLink = () => {
    const currentPath = location.pathname;
    const allLinks = [...navLinks, ...categories];
    const activeLink = allLinks.find(link => link.href === currentPath);
    return activeLink ? activeLink.name : "Home";
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur bg-black/70 py-2 shadow-md" : "bg-black py-4"}`}>
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Laydies Den Logo" className="h-14 md:h-16 object-contain max-w-[200px]" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative font-medium tracking-wide text-sm transition-colors ${getActiveLink() === link.name ? "text-red-500" : "text-gold"}`}
            >
              {link.name}
              {getActiveLink() === link.name && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>}
            </Link>
          ))}

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              Categories <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 w-44 bg-black border border-zinc-800 rounded-lg shadow-lg z-50"
                >                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gold hover:bg-red-600 hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-zinc-900 px-3 py-1.5 rounded-full text-gold focus-within:ring-2 focus-within:ring-red-600 transition-all">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm placeholder-zinc-400 text-white"
            />
          </div>          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all"
          >
            <ShoppingCart size={16} /> Cart
          </Link>

          {/* Book VIP Button */}
          <a
            href="#vip"
            className="ml-2 flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-sm"
          >
            <Star size={14} /> Book VIP
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="text-gold md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Slide-in Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex justify-between items-center border-b border-zinc-800">
          <img src={logo} alt="Laydies Den" className="h-12 object-contain" />
          <X className="text-gold cursor-pointer" size={24} onClick={() => setOpen(false)} />
        </div>        <nav className="flex flex-col items-start px-6 pt-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium ${getActiveLink() === link.name ? "text-red-500" : "text-gold"}`}
            >
              {link.name}
            </Link>
          ))}

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium ${getActiveLink() === cat.name ? "text-red-500" : "text-gold"}`}
            >
              {cat.name}
            </Link>
          ))}          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all"
          >
            <ShoppingCart size={16} /> Cart
          </Link>

          <a
            href="#vip"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-all mt-2"
          >
            <Star size={14} /> Book VIP
          </a>
        </nav>
      </div>
    </header>
  );
}
