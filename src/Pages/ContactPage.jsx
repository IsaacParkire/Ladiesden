import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, Music2, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["0712527543", "Available 24/7"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["thelaydiesden@gmail.com", "Professional inquiries welcome"]
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Kenya, Mombasa", "Private & Discreet"]
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["24/7 Available", "Private sessions by appointment"]
    }
  ];

  const services = [
    "Her Boutique - Personal Shopping",
    "Her Touch - Massage Therapy",
    "Her Strength - Personal Training",
    "Her Night - Event Planning",
    "Her Secrets - VIP Membership",
    "General Inquiry"
  ];
  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-24">      {/* Hero Section */}
      <section className="h-[40vh] sm:h-[45vh] md:h-[50vh] px-4 sm:px-6 flex items-center bg-gradient-to-br from-red-900/30 via-black to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gold"
          >
            Connect With Us 💎
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8"
          >
            Ready to experience luxury redefined? Get in touch with our concierge team for personalized service and exclusive access.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base min-h-[48px] flex items-center justify-center">
              Book Consultation
            </button>
            <button className="px-6 sm:px-8 py-3 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center">
              VIP Access
            </button>
          </motion.div>
        </div>
      </section>      {/* Contact Information */}
      <section className="py-12 sm:py-16 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-black/50 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gold mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-lg rounded-2xl border border-red-500/20 p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
                Get In Touch ✨
              </h2>
              <p className="text-gray-300 text-lg">
                Tell us about your desires, and we'll make them reality
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-gold font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-gold font-medium mb-2">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gold font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your desires and preferences..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-16 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gold mb-8">Follow Our Journey</h3>
            <div className="flex justify-center gap-6 mb-8">
            {[
              { 
                icon: Instagram, 
                color: "from-purple-500 to-pink-500", 
                href: "https://www.instagram.com/laydies_den?igsh=MWg2M3dpM25zdDF5aA==",
                label: "Instagram"
              },
              { 
                icon: Music2, 
                color: "from-black to-gray-900", 
                href: "https://www.tiktok.com/@laydiesden?_t=ZM-8yY4lo3U1gL&_r=1",
                label: "TikTok"
              },
              { 
                icon: Facebook, 
                color: "from-blue-600 to-blue-800", 
                href: "https://www.facebook.com/share/16xC7jqYca/",
                label: "Facebook"
              },
              { 
                icon: MessageCircle, 
                color: "from-green-500 to-green-600", 
                href: "https://wa.me/254712527543",
                label: "WhatsApp"
              },
              { 
                icon: Mail, 
                color: "from-red-600 to-red-700", 
                href: "mailto:thelaydiesden@gmail.com",
                label: "Email"
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                title={social.label}
              >
                <social.icon size={24} className="text-white" />
              </motion.a>
            ))}
          </div>

          <div className="bg-black/50 rounded-xl p-6 border border-red-500/20">
            <h4 className="text-xl font-bold text-gold mb-3">Privacy & Discretion</h4>
            <p className="text-gray-300">
              Your privacy is our priority. All communications are confidential and secure. 
              We maintain the highest standards of discretion for all our valued clients.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
