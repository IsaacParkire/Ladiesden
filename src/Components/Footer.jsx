import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Music2, MessageCircle, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/laydies_den?igsh=MWg2M3dpM25zdDF5aA==', label: 'Instagram' },
  { icon: Music2, href: 'https://www.tiktok.com/@laydiesden?_t=ZM-8yY4lo3U1gL&_r=1', label: 'TikTok' },
  { icon: Facebook, href: 'https://www.facebook.com/share/16xC7jqYca/', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/254712527543', label: 'WhatsApp' },
  { icon: Mail, href: 'mailto:thelaydiesden@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-4 flex flex-col items-center text-xs text-gray-500">
      <nav className="flex flex-wrap justify-center gap-6 mb-3 w-full">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <Link to="/connect" className="hover:text-black transition">Connect</Link>
        <Link to="/gallery" className="hover:text-black transition">Gallery</Link>
        <Link to="/shop" className="hover:text-black transition">Shop</Link>
      </nav>
      <div className="flex gap-4 mb-2">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            title={social.label}
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
      <div className="text-center text-xs text-gray-400">© {new Date().getFullYear()} Laydies Den</div>
    </footer>
  );
}
