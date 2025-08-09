import React from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, AlertTriangle, Scale, Users, Lock, Phone, Mail, MapPin } from 'lucide-react';

const TermsPage = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/TERMS AND CONDITIONS.pdf';
    link.download = 'TERMS AND CONDITIONS.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const services = [
    { name: "Her Boutique", description: "Ladies' fashion, including sensual, elegant, luxury, and statement clothing." },
    { name: "Her Touch", description: "Book erotic and sensual massage sessions designed to awaken and empower." },
    { name: "Her Strength", description: "Engage with fitness, wellness, and nutritional services for the mind and body." },
    { name: "Her Secrets", description: "Content and sessions focused on desires, fetishes, kinks, and male entertainment." },
    { name: "Her Night", description: "Nightlife, curated date experiences, and social engagements." },
    { name: "Her Scent", description: "Seductive, custom pocket perfumes and colognes made by The Den." },
    { name: "Her Toys", description: "Intimate bedroom accessories—cuffs, chokers, whips, and more—for personal empowerment and play." },
    { name: "Gallery", description: "Recaps of events and exclusive media clips." }
  ];

  const userConduct = [
    "Harass, threaten, or misuse our platform, models, or service providers.",
    "Reproduce, share, or commercially exploit our content or services.",
    "Use false identities, impersonate others, or attempt to bypass our age verification.",
    "Violate any laws while engaging with our platform."
  ];

  const clientObligations = [
    "Provide honest, accurate personal and contact information.",
    "Maintain respectful conduct during all interactions—online or in person.",
    "Arrive on time for any scheduled service or session.",
    "Not share, record, or distribute any private content or media from The Den."
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-black to-black"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent"
          >
            Terms & Conditions
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            <p>Your agreement to enter <strong className="text-red-400">The Laydies' Den</strong></p>
            <p className="text-lg mt-4">
              <strong>Effective Date:</strong> 6th August 2025 | 
              <strong> Location:</strong> Mombasa, Kenya | 
              <strong> Age Restriction:</strong> <span className="text-red-400">18+</span>
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Download size={20} />
            <span>Download Terms & Conditions (PDF)</span>
          </motion.button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="text-red-500" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">Introduction</h2>
            </div>
            <div className="max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed">
              <p>
                Welcome to <strong className="text-red-400">The Laydies' Den</strong>—a curated sanctuary of pleasure, power, and personal indulgence. By accessing our website or services, you agree to be bound by these Terms & Conditions. 
              </p>
              <p className="mt-4 text-red-300 italic">
                If you do not agree, kindly exit the site.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <AlertTriangle className="text-red-500" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">Eligibility</h2>
            </div>
            <div className="max-w-4xl mx-auto bg-red-900/30 border border-red-500/50 rounded-xl p-8">
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
                Access to The Laydies' Den is strictly limited to individuals who are <strong className="text-red-400 text-3xl">18 years or older</strong>.
              </p>
              <p className="text-lg mt-4 text-zinc-300">
                You confirm that you meet this legal age requirement when accessing or using any part of our website or services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Users className="text-red-500" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">Pages and Services</h2>
            </div>
            <p className="text-xl text-zinc-300 mb-8 max-w-4xl">
              We offer a lifestyle experience across these pages:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/80 p-6 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-red-400 mb-3">{service.name}</h3>
                  <p className="text-zinc-300 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-lg text-red-200 italic">
                Some services may be explicit in nature and are designed solely for consenting adults.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Conduct Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="text-red-500" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">User Conduct</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-6">You agree NOT to:</h3>
                <div className="space-y-4">
                  {userConduct.map((conduct, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-zinc-300 leading-relaxed">{conduct}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/50">
                <h4 className="text-xl font-bold text-red-300 mb-4">Consequences</h4>
                <p className="text-zinc-300 leading-relaxed">
                  Violation of any of these will result in <strong className="text-red-400">permanent removal</strong> and 
                  <strong className="text-red-400"> legal action</strong> where necessary.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payments & Refunds Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Payments & Refunds</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/80 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">Final Sales</h3>
                <p className="text-zinc-300 leading-relaxed">
                  All purchases and bookings are final. Due to the intimate and custom nature of our services, 
                  no refunds are offered for massage sessions, events, or digital content.
                </p>
              </div>
              
              <div className="bg-black/80 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">Clothing Exchange</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Clothing purchases may be exchanged only (not refunded) within 48 hours of receipt 
                  if unworn and in original state.
                </p>
              </div>
              
              <div className="bg-black/80 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">Late Arrivals</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Late arrivals to in-person sessions may result in reduced service time or 
                  cancellation without refund.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Obligations Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Client Obligations</h2>
            <p className="text-xl text-zinc-300 mb-8">Clients are expected to:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {clientObligations.map((obligation, index) => (
                <div key={index} className="flex items-start space-x-3 bg-black/50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-zinc-300 leading-relaxed">{obligation}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-lg text-red-200">
                <strong>Failure to comply will result in bans or legal steps depending on the violation.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* User Accounts */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-black/80 p-8 rounded-lg border border-red-900/30"
            >
              <h2 className="text-3xl font-bold mb-6">User Accounts</h2>
              <div className="space-y-4 text-zinc-300">
                <p>• You may be required to create an account for personalized services, bookings, or accessing premium content.</p>
                <p>• You are solely responsible for maintaining the confidentiality of your login details.</p>
                <p>• We reserve the right to suspend or delete any account for breach of terms or suspicious activity.</p>
                <p>• You may not create an account on behalf of another person without authorization.</p>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-black/80 p-8 rounded-lg border border-red-900/30"
            >
              <h2 className="text-3xl font-bold mb-6">Intellectual Property</h2>
              <p className="text-zinc-300 leading-relaxed">
                All content on this platform—including text, branding, designs, photos, and videos—is the 
                exclusive property of The Laydies' Den. <strong className="text-red-400">Unauthorized use, distribution, 
                or reproduction is strictly forbidden</strong> and subject to legal consequences.
              </p>
            </motion.div>

            {/* Disclaimers */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-black/80 p-8 rounded-lg border border-red-900/30"
            >
              <h2 className="text-3xl font-bold mb-6">Disclaimers</h2>
              <div className="space-y-4 text-zinc-300">
                <p>• All adult-themed services are consensual, and client boundaries are always respected. However, no service will proceed if a client violates rules or behaves inappropriately.</p>
                <p>• Events and experiences are subject to change without prior notice. We do not take responsibility for external disruptions (e.g., weather, transport, power outages).</p>
                <p>• We are not liable for misuse of our content outside the platform, including but not limited to third-party reposts or leaks.</p>
              </div>
            </motion.div>

            {/* Privacy & Modifications */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-black/80 p-8 rounded-lg border border-red-900/30"
            >
              <h2 className="text-3xl font-bold mb-6">Privacy & Modifications</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  <strong className="text-red-400">Privacy:</strong> We are committed to protecting your personal data. 
                  Refer to our Privacy Policy for a full breakdown of how we collect, store, and use your information.
                </p>
                <p>
                  <strong className="text-red-400">Modifications:</strong> These Terms may be updated without prior notice. 
                  Continued use of the site implies your acceptance of any updates.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Lock className="text-red-500" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">Contact Us</h2>
            </div>
            
            <p className="text-xl text-zinc-300 mb-8">
              For inquiries, concerns, or feedback, you can reach us through:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3 bg-black/50 p-6 rounded-lg">
                <MapPin className="text-red-500" size={24} />
                <span className="text-zinc-300">Mombasa, Kenya</span>
              </div>
              
              <div className="flex flex-col items-center space-y-3 bg-black/50 p-6 rounded-lg">
                <Phone className="text-red-500" size={24} />
                <span className="text-zinc-300">+254 712 527543</span>
              </div>
              
              <div className="flex flex-col items-center space-y-3 bg-black/50 p-6 rounded-lg">
                <Mail className="text-red-500" size={24} />
                <span className="text-zinc-300">thelaydiesden@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Agreement */}
      <section className="py-12 px-4 bg-red-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-lg md:text-xl text-red-100 leading-relaxed italic">
              By continuing to use The Laydies' Den, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms & Conditions.
            </p>
            
            <motion.button
              onClick={handleDownloadPDF}
              className="mt-6 inline-flex items-center space-x-2 bg-white text-red-800 px-6 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-colors"
            >
              <Download size={18} />
              <span>Download Complete Terms (PDF)</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
