import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Star, Heart, ChevronDown, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/laydies-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
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
  const navLinks = [
    { to: "/", label: "Home", emoji: "🏠" },
    { to: "/boutique", label: "Her Boutique", emoji: "👗" },
    { to: "/touch", label: "Her Touch", emoji: "💆" },
    { to: "/strength", label: "Her Strength", emoji: "💪" },
    { to: "/night", label: "Her Night", emoji: "🌙" },
    { to: "/secrets", label: "Her Secrets", emoji: "🤫" },
    { to: "/scent", label: "Her Scent", emoji: "🌸" },
    { to: "/toys", label: "Her Toys", emoji: "🎭" },
    { to: "/gallery", label: "Gallery", emoji: "📸" },
    { to: "/book", label: "Book Now", emoji: "📅" },
    { to: "/connect", label: "Connect", emoji: "📞" },
  ];

  return (    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur bg-black/80 py-2 shadow-xl border-b border-red-900/20" : "bg-black/90 py-3 sm:py-4"}`}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 flex items-center justify-between">
          {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Laydies Den Logo" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain max-w-[150px] sm:max-w-[200px]" />
          </Link>
        </div>        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <nav className="flex items-center space-x-4 xl:space-x-6">
            <Link
              to="/"
              className={`text-xs xl:text-sm font-medium transition-all duration-300 ${
                location.pathname === "/" ? "text-red-400" : "text-gold hover:text-red-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`text-xs xl:text-sm font-medium transition-all duration-300 ${
                location.pathname === "/gallery" ? "text-red-400" : "text-gold hover:text-red-400"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/connect"
              className={`text-xs xl:text-sm font-medium transition-all duration-300 ${
                location.pathname === "/connect" ? "text-red-400" : "text-gold hover:text-red-400"
              }`}
            >
              Connect
            </Link>
          </nav>
        </div>{/* Right: Search Bar & Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
          {/* Search Bar (Desktop) - Smaller */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-zinc-900/50 text-white placeholder-zinc-400 pl-7 pr-3 py-1.5 rounded-full text-xs w-28 xl:w-32 focus:outline-none focus:ring-1 focus:ring-red-500 border border-zinc-800 transition-all focus:w-36 xl:focus:w-40"
            />
          </div>
          
          {/* Cart Icon */}          <Link
            to="/cart"
            className="relative flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900/80 text-white rounded-full hover:bg-red-600 transition-all hover:scale-105 duration-200 backdrop-blur"
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
            <span className="hidden xl:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
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
                  <p className="text-sm font-medium text-gray-900">
                    {isAuthenticated ? `Hello, ${user?.first_name || user?.email}!` : 'Account'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAuthenticated ? 'Manage your account' : 'Sign in to your account'}
                  </p>
                </div>
                
                <div className="py-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Profile</span>
                      </Link>
                        <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/></svg>
                        <span className="text-sm">My Orders</span>
                      </Link>
                      
                      <hr className="my-2" />
                      
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            )}
          </div>          {/* Book VIP Button */}
          <Link
            to="/membership"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-sm hover:scale-105 duration-200"
          >
            <Star size={14} /> <span className="hidden xl:inline">Book</span> VIP
          </Link>
        </div>        {/* Mobile Actions & Toggle */}
        <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
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
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
            onClick={() => setOpen(!open)}
            className="mobile-menu p-2 text-gold hover:text-red-400 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div className={`mobile-menu lg:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-black/95 backdrop-blur transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"} z-50 overflow-y-auto`}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Laydies Den" className="h-12" />
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gold hover:text-red-400 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-900/50 text-white placeholder-zinc-400 pl-10 pr-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-600/20 hover:text-red-400 transition-all ${
                  location.pathname === link.to ? "bg-red-600/30 text-red-400" : ""
                }`}
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile VIP Button */}          <div className="mt-8 pt-6 border-t border-zinc-800">
            <Link
              to="/membership"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all"
              onClick={() => setOpen(false)}
            >
              <Star size={16} />
              <span className="font-semibold">Book VIP Experience</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
