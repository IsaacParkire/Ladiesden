import React from 'react';
import { motion } from 'framer-motion';
import { Download, Truck, Clock, MapPin, Shield, Package, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const ShippingPage = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/SHIPPING POLICY.pdf';
    link.download = 'Shipping Policy - The Laydies Den.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deliveryTimes = [
    { location: "Mombasa", time: "1–2 business days", icon: "🏠" },
    { location: "Nairobi & Major Cities", time: "2–3 business days", icon: "🏙️" },
    { location: "Remote Areas", time: "3–5 business days", icon: "🌍" }
  ];

  const deliveryCharges = [
    { service: "Standard delivery (Mombasa)", price: "Ksh 250", icon: Truck },
    { service: "Outside Mombasa", price: "Ksh 400-1000", note: "(based on location)", icon: MapPin },
    { service: "Same-day delivery (Mombasa only)", price: "Ksh 300", note: "(must be ordered before 6 PM)", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-black to-black"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <Package className="text-red-500" size={40} />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent">
              Shipping Policy
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            <p className="italic text-red-300">Effective Date: 6th August 2025</p>
            <p className="mt-4">We handle every order like a love letter—sealed, sent, and meant to please. 💌</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Download size={20} />
            <span>Download Shipping Policy (PDF)</span>
          </motion.button>
        </div>
      </section>

      {/* Where We Ship */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Where We Ship</h2>
            <p className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              <strong className="text-red-400">The Laydies' Den</strong> currently delivers <strong className="text-red-400">within Kenya</strong>, with plans to expand regionally. For special or international deliveries, contact us directly—we may just surprise you.
            </p>
          </motion.div>

          {/* Processing Time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 rounded-xl p-8 border border-red-900/30 mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-red-600 rounded-lg">
                <Clock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-red-400">Processing Time</h3>
            </div>
            <p className="text-lg text-zinc-300">
              We process and dispatch all paid orders <strong className="text-red-400">within 1–5 business days</strong>.
            </p>
          </motion.div>

          {/* Delivery Timeframes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-center mb-8">Delivery Timeframes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {deliveryTimes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/80 rounded-lg p-6 border border-red-900/30 text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.location}</h4>
                  <p className="text-red-400 font-semibold">{item.time}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-zinc-400 italic">
                * Weekends and public holidays are excluded from delivery days unless otherwise arranged.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Delivery Charges */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Delivery Charges</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {deliveryCharges.map((charge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/80 rounded-lg p-6 border border-red-900/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <charge.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{charge.service}</h3>
                </div>
                <div className="text-2xl font-bold text-red-400 mb-2">{charge.price}</div>
                {charge.note && (
                  <p className="text-zinc-400 text-sm">{charge.note}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-red-900/20 rounded-lg p-6 border border-red-500/30"
          >
            <p className="text-zinc-300 text-center">
              <em>Delivery fee is paid together with the order amount unless arranged via WhatsApp.</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-zinc-900/50 rounded-xl p-8 border border-red-900/30"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-red-600 rounded-lg">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-red-400">Order Tracking & Updates</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Once your order is confirmed, you'll receive:</h3>
                <div className="space-y-3">
                  {[
                    "A WhatsApp confirmation",
                    "Delivery timelines and rider contact (if applicable)"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">For questions about your order status, reach us anytime via:</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-red-400" />
                    <span className="text-zinc-300">WhatsApp: +254 712 527543</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-red-400" />
                    <span className="text-zinc-300">thelaydiesden@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discreet Packaging */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Shield className="text-red-500" size={40} />
              <h2 className="text-4xl md:text-5xl font-bold">Discreet Packaging</h2>
            </div>
            <p className="text-xl text-red-300 italic mb-8">
              Because your privacy is our pleasure:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-black/80 rounded-lg p-6 border border-red-900/30"
            >
              <h3 className="text-lg font-bold text-white mb-3">Packaging Options</h3>
              <p className="text-zinc-300">
                Items may be packaged with branding unless requested otherwise for discretion purposes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/80 rounded-lg p-6 border border-red-900/30"
            >
              <h3 className="text-lg font-bold text-white mb-3">Special Items</h3>
              <p className="text-zinc-300">
                Especially important for items from <strong className="text-red-400">Her Toys</strong>, <strong className="text-red-400">Her Scent</strong>, or <strong className="text-red-400">Secrets</strong>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/80 rounded-lg p-6 border border-red-900/30"
            >
              <h3 className="text-lg font-bold text-white mb-3">Rider Privacy</h3>
              <p className="text-zinc-300">
                Rider only knows the delivery address—nothing else about the contents
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Policies */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Failed Deliveries */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/50 rounded-xl p-8 border border-red-900/30"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-red-600 rounded-lg">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-2xl font-bold text-red-400">Failed Deliveries / Missed Pickups</h3>
              </div>
              <div className="space-y-4 text-zinc-300">
                <p>If you're unavailable during delivery:</p>
                <div className="space-y-2">
                  {[
                    "We'll attempt 1 follow-up",
                    "If unreachable for 48 hours, the item is returned to us",
                    "Re-delivery will attract an additional delivery fee"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pickup Option */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/50 rounded-xl p-8 border border-red-900/30"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-red-600 rounded-lg">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl font-bold text-red-400">Pickup Option</h3>
              </div>
              <div className="space-y-4 text-zinc-300">
                <p className="font-semibold">For Mombasa Clients</p>
                <p>
                  Pickup is available on request at a secure location in <strong className="text-red-400">Nyali</strong>, <strong className="text-red-400">Bamburi</strong>, and <strong className="text-red-400">Tudor</strong>. Details shared privately after payment.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Proof of Delivery & Damaged Items */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-black/80 rounded-lg p-6 border border-red-900/30"
            >
              <h3 className="text-xl font-bold text-white mb-4">Proof of Delivery</h3>
              <p className="text-zinc-300 mb-4">We may request:</p>
              <div className="space-y-2">
                {[
                  "A photo of the delivered parcel at your doorstep OR",
                  "Your name/signature (for pickup orders)"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/80 rounded-lg p-6 border border-red-900/30"
            >
              <h3 className="text-xl font-bold text-white mb-4">Damaged or Missing Items</h3>
              <p className="text-zinc-300 mb-4">If your item arrives damaged or incomplete:</p>
              <div className="space-y-2">
                {[
                  "Contact us within 24 hours",
                  "Share photos/video as evidence",
                  "We will assess and, if valid, send a replacement or exchange at no extra cost"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-800 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions About Shipping?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              We're here to ensure your order reaches you safely and discreetly.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-black/30 rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center space-x-3 text-white mb-3">
                  <Phone size={24} />
                  <span className="text-lg font-semibold">WhatsApp</span>
                </div>
                <p className="text-red-100 text-xl">+254 712 527543</p>
              </div>

              <div className="bg-black/30 rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center space-x-3 text-white mb-3">
                  <Mail size={24} />
                  <span className="text-lg font-semibold">Email</span>
                </div>
                <p className="text-red-100 text-xl">thelaydiesden@gmail.com</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-x-4"
            >
              <button className="bg-white text-red-800 px-8 py-4 rounded-lg font-semibold hover:bg-zinc-100 transition-colors text-lg">
                Contact Us
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors text-lg">
                WhatsApp Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPage;
