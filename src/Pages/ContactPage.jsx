import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Instagram, Twitter, Facebook } from 'lucide-react';

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
      details: ["+1 (555) 123-4567", "Available 24/7"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@laydiesden.com", "reservations@laydiesden.com"]
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Downtown Elite District", "Private & Discreet"]
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Sun: 10 AM - 2 AM", "Private sessions by appointment"]
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
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-900/20 to-black">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
          >
            Connect With Us 💎
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gold max-w-3xl mx-auto"
          >
            Ready to experience luxury redefined? Let's create something extraordinary together.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              { icon: Instagram, color: "from-pink-500 to-purple-500" },
              { icon: Twitter, color: "from-blue-400 to-blue-600" },
              { icon: Facebook, color: "from-blue-600 to-blue-800" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300`}
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
