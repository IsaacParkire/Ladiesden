import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook,
  Heart,
  Star,
  Shield,
  Music2,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/laydies-logo.png';

export default function Footer() {
  const services = [
    { name: 'Her Touch (Massage)', path: '/massage' },
    { name: 'Her Strength (Fitness)', path: '/fitness' },
    { name: 'Her Night (Events)', path: '/events' },
    { name: 'Her Secrets (VIP)', path: '/secrets' }
  ];

  const products = [
    { name: 'Her Boutique', path: '/boutique' },
    { name: 'Her Scent', path: '/scent' },
    { name: 'Her Toys', path: '/toys' }
  ];
  const legalLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQs', path: '/faqs' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/laydies_den?igsh=MWg2M3dpM25zdDF5aA==', label: 'Instagram' },
    { icon: Music2, href: 'https://www.tiktok.com/@laydiesden?_t=ZM-8yY4lo3U1gL&_r=1', label: 'TikTok' },
    { icon: Facebook, href: 'https://www.facebook.com/share/16xC7jqYca/', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/254712527543', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Main Footer Content - Compact */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">          {/* Brand Section */}
          <div>
            <Link to="/" className="block mb-4">
              <img src={logo} alt="Laydies Den" className="h-12 object-contain" />
            </Link>
            <p className="text-zinc-400 mb-4 leading-relaxed text-sm">
              Where sophistication meets desire. Luxury experiences crafted exclusively for the modern woman.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-red-500" />
                <span>Trusted</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-semibold text-base mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-zinc-400 hover:text-red-400 transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gold font-semibold text-base mb-4">Shop</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    to={product.path}
                    className="text-zinc-400 hover:text-red-400 transition-colors duration-200 text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold font-semibold text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-red-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-gold font-semibold text-base mb-4">Connect With Us</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Phone size={16} className="text-red-400" />
                <span>0712527543</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Mail size={16} className="text-red-400" />
                <span>thelaydiesden@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Clock size={16} className="text-red-400" />
                <span>24/7 Available</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-gold font-medium mb-3 text-sm">Follow Us</h5>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-zinc-500 text-xs">
              © 2025 Laydies Den. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <span className="text-zinc-500">Made with ❤️ for modern women</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
