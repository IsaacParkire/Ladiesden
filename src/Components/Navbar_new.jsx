import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Star, Heart, ChevronDown, User, LogIn, UserPlus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/laydies-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.mobile-menu')) {
        setOpen(false);
      }
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open, isProfileDropdownOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur bg-black/80 py-2 shadow-xl border-b border-red-900/20" : "bg-black/90 py-3 sm:py-4"}`}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 grid grid-cols-3 items-center">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img src={logo} alt="Laydies Den Logo" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain max-w-[150px] sm:max-w-[200px]" />
          </Link>
        </div>        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-6">
          <Link 
            to="/" 
            className={`text-xs xl:text-sm font-medium transition-colors hover:scale-105 duration-200 ${location.pathname === '/' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`text-xs xl:text-sm font-medium transition-colors hover:scale-105 duration-200 ${location.pathname === '/gallery' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Gallery
          </Link>
          <Link 
            to="/connect"
            className={`text-xs xl:text-sm font-medium transition-colors hover:scale-105 duration-200 ${location.pathname === '/connect' ? "text-red-500" : "text-gold hover:text-red-400"}`}
          >
            Connect
          </Link>
        </div>

        {/* Right: Search, Cart, Love Icon, VIP */}
        <div className="hidden lg:flex items-center justify-end space-x-3 xl:space-x-4">
          {/* Search Bar */}
          <div className="flex items-center bg-zinc-900/80 px-3 py-1.5 rounded-full text-gold focus-within:ring-2 focus-within:ring-red-600 transition-all backdrop-blur">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-400 ml-2 w-24 xl:w-32"
            />
          </div>

          {/* Cart */}          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900/80 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all relative hover:scale-105 duration-200 backdrop-blur"
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
            <span className="hidden xl:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Love Icon Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900/80 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-105 duration-200 backdrop-blur"
              aria-label="Account menu"
            >
              <Heart className="w-4 h-4 fill-current" />
              <ChevronDown className={`w-3 h-3 transition-transform ${
                isProfileDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Account</p>
                  <p className="text-xs text-gray-500">Manage your account and preferences</p>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm">Login</span>
                  </Link>
                  
                  <Link
                    to="/register"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="text-sm">Register</span>
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">My Profile</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Book VIP Button */}
          <a
            href="#vip"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-sm hover:scale-105 duration-200"
          >
            <Star size={14} /> <span className="hidden xl:inline">Book</span> VIP
          </a>
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="lg:hidden flex items-center justify-end space-x-2 sm:space-x-3">
          {/* Mobile Love Icon Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="p-2 text-gold hover:text-red-400 transition-colors"
              aria-label="Account menu"
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
            
            {/* Mobile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">Login</span>
                </Link>
                
                <Link
                  to="/register"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm">Register</span>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">My Profile</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Cart Icon */}          <Link
            to="/cart"
            className="relative p-2 text-gold hover:text-red-400 transition-colors"
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="text-gold p-2 hover:text-red-400 transition-colors mobile-menu" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
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

          {/* Mobile Cart */}          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 text-gold rounded-full hover:bg-red-600 hover:text-white transition-all relative"
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
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
