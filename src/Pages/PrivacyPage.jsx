import React from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Eye, Lock, User, FileText, Globe, Phone, Mail, MapPin } from 'lucide-react';

const PrivacyPage = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/PRIVACY POLICY.pdf';
    link.download = 'Privacy Policy - The Laydies Den.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const privacySections = [
    {
      title: "Information We Collect",
      icon: User,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Full Name",
            "Phone Number", 
            "Email Address",
            "Delivery Address (for purchases)",
            "Age confirmation",
            "Booking details",
            "Payment information (via secure third-party gateways)"
          ]
        },
        {
          subtitle: "Non-Personal Information",
          items: [
            "Device type & browser info",
            "Pages visited & session duration",
            "Location data (approximate)",
            "IP address",
            "Cookies and analytics"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "We collect your data to:",
          items: [
            "Process orders and bookings",
            "Communicate with you about services, confirmations, or updates",
            "Personalize your experience within the Den",
            "Recommend products, services, or events tailored to your vibe",
            "Improve our website, offerings, and customer service",
            "Send newsletters or marketing updates (only with your consent)"
          ]
        }
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "You have the right to:",
          items: [
            "Request a copy of your data",
            "Ask us to delete your data",
            "Withdraw consent for marketing",
            "Correct or update your personal info"
          ]
        }
      ]
    }
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
            <Lock className="text-red-500" size={40} />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            <p className="italic text-red-300">At The Laydies' Den, your privacy is sacred.</p>
            <p className="mt-4">This policy outlines how we collect, use, protect, and share your personal information when you interact with our site or services.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center space-x-6 text-sm text-zinc-400 mb-8"
          >
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Effective: 6th August 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Mombasa, Kenya</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>18+ Only</span>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Download size={20} />
            <span>Download Privacy Policy (PDF)</span>
          </motion.button>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg text-zinc-300 leading-relaxed"
          >
            By using our platform, you agree to the practices described in this Privacy Policy.
          </motion.p>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            {privacySections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-zinc-900/50 rounded-xl p-8 border border-red-900/30"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-red-600 rounded-lg">
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-red-400">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      {subsection.subtitle && (
                        <h3 className="text-xl font-semibold text-white mb-4">{subsection.subtitle}</h3>
                      )}
                      <div className="grid md:grid-cols-2 gap-3">
                        {subsection.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-zinc-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies & Tracking */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-black/80 rounded-xl p-8 border border-red-900/30"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-red-600 rounded-lg">
                <Globe size={24} />
              </div>
              <h2 className="text-3xl font-bold text-red-400">Cookies & Tracking Technologies</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">We use cookies to:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Remember your preferences",
                  "Analyze site traffic (Google Analytics, Meta Pixel, etc.)",
                  "Monitor performance and user behavior",
                  "Personalize your browsing experience"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
              <p className="text-zinc-300 leading-relaxed">
                You can choose to disable cookies in your browser settings, but certain features of the website may not function optimally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Sharing */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Share Your Information</h2>
            <p className="text-xl text-red-300 font-semibold mb-8">
              We do not sell, trade, or rent your personal data to outside parties.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/50 rounded-xl p-6 border border-red-900/30"
            >
              <h3 className="text-xl font-bold text-white mb-4">We may share information with trusted third parties only when necessary:</h3>
              <div className="space-y-3">
                {[
                  "Payment processors (e.g., M-Pesa, card gateways)",
                  "Delivery providers",
                  "Marketing platforms (with consent)",
                  "Legal authorities (when required by law or to protect our rights)"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-red-900/20 rounded-xl p-6 border border-red-500/30"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lock size={24} className="text-red-400" />
                <h3 className="text-xl font-bold text-white">Security Promise</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                All third-party partners are required to keep your data confidential. We implement strong security measures to protect your data from unauthorized access, loss, or misuse.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marketing & Age Restriction */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-black/80 rounded-xl p-8 border border-red-900/30"
            >
              <h2 className="text-3xl font-bold text-red-400 mb-6">Marketing & Communications</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  If you opt in, we may send you <em className="text-red-300">seductive updates</em>—about perfumes, events, new drops, and experiences.
                </p>
                <p>
                  You can unsubscribe at any time via the link in our emails or by contacting us directly.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-900/30 rounded-xl p-8 border border-red-500/30"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Age Restriction & Content Warning</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Our site is designed <strong className="text-red-400">exclusively for adults</strong>. Users under 18 are not permitted to access or provide information on this platform.
                </p>
                <p>
                  Some pages contain <em className="text-red-300">erotic, sensual, and mature content</em>. By using the site, you acknowledge and accept this nature.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-800 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 text-red-100"
          >
            For questions, requests, or concerns about your privacy:
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="flex items-center justify-center space-x-3 text-white">
              <MapPin size={20} />
              <span>Mombasa, Kenya</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone size={20} />
              <span>+254 712 527543</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail size={20} />
              <span>thelaydiesden@gmail.com</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black/30 rounded-lg p-6 border border-white/20"
          >
            <p className="text-red-100 italic">
              To exercise your rights regarding your data, contact us at <strong className="text-white">thelaydiesden@gmail.com</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold text-red-400 mb-4">Changes to this Policy</h3>
            <p className="text-zinc-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
