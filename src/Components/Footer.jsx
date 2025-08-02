import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Heart,
  Star,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/laydies-logo.png';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Her Boutique', path: '/boutique' },
    { name: 'Her Touch', path: '/touch' },
    { name: 'Her Strength', path: '/strength' }
  ];

  const services = [
    { name: 'Her Night', path: '/night' },
    { name: 'Her Secrets', path: '/secrets' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Session', path: '/book' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gold mb-4">
              💌 Stay Connected
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Be the first to know about exclusive experiences, new arrivals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-zinc-400"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-6">
              <img src={logo} alt="Laydies Den" className="h-16 object-contain" />
            </Link>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Where sophistication meets desire. Luxury experiences crafted exclusively for the modern woman.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-1">
                <Shield size={16} className="text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500" />
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={16} className="text-red-500" />
                <span>Trusted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-red-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-zinc-400 hover:text-red-400 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone size={18} className="text-red-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail size={18} className="text-red-400" />
                <span>info@laydiesden.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={18} className="text-red-400" />
                <span>123 Luxury Lane, Elite District</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Clock size={18} className="text-red-400" />
                <span>24/7 Concierge Service</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-gold font-medium mb-4">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-500 text-sm">
              © 2024 Laydies Den. All rights reserved. Luxury redefined.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-zinc-500 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-zinc-500 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-zinc-500 hover:text-red-400 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
