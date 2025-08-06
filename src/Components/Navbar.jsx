import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/laydies-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur bg-black/70 py-2 shadow-md" : "bg-black py-4"}`}>
      <div className="max-w-7xl mx-auto w-full px-4 grid grid-cols-3 items-center">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Laydies Den Logo" className="h-14 md:h-16 object-contain max-w-[200px]" />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/gallery' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Gallery
          </Link>
          <Link 
            to="/connect" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/connect' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Connect
          </Link>
        </div>

        {/* Right: Search, Cart, VIP */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          {/* Search Bar */}
          <div className="flex items-center bg-zinc-900 px-3 py-1.5 rounded-full text-gold focus-within:ring-2 focus-within:ring-red-600 transition-all">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-400 ml-2 w-32"
            />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all relative"
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Book VIP Button */}
          <a
            href="#vip"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-sm"
          >
            <Star size={14} /> Book VIP
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-end">
          <button className="text-gold" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 z-[60] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex justify-between items-center border-b border-zinc-800">
          <img src={logo} alt="Laydies Den" className="h-12 object-contain" />
          <X className="text-gold cursor-pointer" size={24} onClick={() => setOpen(false)} />
        </div>
        
        <nav className="flex flex-col items-start px-6 pt-6 space-y-4">
          {/* Mobile navigation links */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`text-lg font-medium transition-colors ${location.pathname === '/' ? "text-red-500" : "text-gold"}`}
          >
            Home
          </Link>

          <Link
            to="/gallery"
            onClick={() => setOpen(false)}
            className={`text-lg font-medium transition-colors ${location.pathname === '/gallery' ? "text-red-500" : "text-gold"}`}
          >
            Gallery
          </Link>

          <Link
            to="/connect"
            onClick={() => setOpen(false)}
            className={`text-lg font-medium transition-colors ${location.pathname === '/connect' ? "text-red-500" : "text-gold"}`}
          >
            Connect
          </Link>

          {/* Mobile Cart */}
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all relative"
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
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
