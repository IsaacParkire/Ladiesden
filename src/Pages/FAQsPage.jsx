import React from 'react';
import { motion } from 'framer-motion';
import { Download, HelpCircle, Users, ShoppingBag, Heart, Dumbbell, Eye, Music, Droplets, Gamepad2, Camera, Handshake, Phone, Mail } from 'lucide-react';

const FAQsPage = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/FAQs.pdf';
    link.download = 'FAQs - The Laydies Den.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqSections = [
    {
      title: "GENERAL",
      icon: Users,
      faqs: [
        {
          question: "Who is The Laydies' Den for?",
          answer: "The Den is crafted for bold, confident women—and those who appreciate them. All services, products, and experiences are for individuals 18 years and older."
        },
        {
          question: "How can I contact you directly?",
          answer: "Use the \"Get in Touch\" page or WhatsApp us at +254 712 527543. We keep it personal and discreet."
        }
      ]
    },
    {
      title: "HER BOUTIQUE",
      subtitle: "Sensual. Sophisticated. Statement wear.",
      icon: ShoppingBag,
      faqs: [
        {
          question: "Do you deliver outside Mombasa?",
          answer: "Yes. We deliver across Kenya. Delivery fees depend on your location. For specific shipping arrangements, DM us directly."
        },
        {
          question: "Can I return a clothing item?",
          answer: "We allow exchanges only, within 48 hours of delivery. Items must be unworn and returned in perfect condition."
        },
        {
          question: "Are sizes standard?",
          answer: "Yes, our sizing is standard. If you're unsure, reach out and we'll guide you based on your measurements."
        }
      ]
    },
    {
      title: "HER TOUCH",
      subtitle: "Erotic energy meets elite relaxation.",
      icon: Heart,
      faqs: [
        {
          question: "How do I book a massage?",
          answer: "Bookings are made via the \"Get in Touch\" page or WhatsApp, or directly on the website. A deposit confirms your session."
        },
        {
          question: "Is it just massage or something more?",
          answer: "Our sessions are sensual, not sexual. They're designed to awaken, not overstep. Boundaries are respected."
        },
        {
          question: "Are your massages erotic or therapeutic?",
          answer: "We offer both. \"Touch\" sessions are designed to blend sensuality with relaxation, tailored to your comfort and boundaries."
        },
        {
          question: "Can I request a custom session?",
          answer: "Yes. Share your preferences privately—we'll tailor your experience within our code of conduct."
        }
      ]
    },
    {
      title: "HER STRENGTH",
      subtitle: "Because seduction starts from within.",
      icon: Dumbbell,
      faqs: [
        {
          question: "Do you offer personal training or meal plans?",
          answer: "Yes. We provide custom fitness and nutrition coaching aligned with your body goals and lifestyle."
        },
        {
          question: "Is Strength only for women?",
          answer: "The Den is femme-centered, but we empower anyone who resonates with our philosophy. Custom plans for couples can be developed."
        }
      ]
    },
    {
      title: "HER SECRETS",
      subtitle: "Desire has no filter here.",
      icon: Eye,
      faqs: [
        {
          question: "What is this section about?",
          answer: "SECRETS explores deep fantasies—fetishes, kinks, and curated male entertainment. Discretion is sacred."
        },
        {
          question: "Is everything shown publicly?",
          answer: "No. Explicit content is protected and requires user confirmation. Only 18+ may access it."
        },
        {
          question: "Can I book a private fantasy session?",
          answer: "Yes—confidentially. Submit your idea via \"Get in Touch.\" We'll make it real."
        }
      ]
    },
    {
      title: "HER NIGHT",
      subtitle: "Where unforgettable memories begin.",
      icon: Music,
      faqs: [
        {
          question: "Are your events public or private?",
          answer: "Most events are invite-only or ticketed. We curate experiences for intimacy, not crowd."
        },
        {
          question: "Can I host my party with The Den?",
          answer: "Yes. From birthdays to private seduction nights—if you want it sensual and elite, we'll build it."
        }
      ]
    },
    {
      title: "HER SCENT",
      subtitle: "Seduction, bottled.",
      icon: Droplets,
      faqs: [
        {
          question: "Are the perfumes unisex?",
          answer: "Yes. All scents are designed for attraction and presence—regardless of gender."
        },
        {
          question: "Do you offer custom scents?",
          answer: "Select limited-edition custom drops are released quarterly. Stay tuned on our socials."
        }
      ]
    },
    {
      title: "HER TOYS",
      subtitle: "Power. Pleasure. Play.",
      icon: Gamepad2,
      faqs: [
        {
          question: "Are your toys beginner-friendly?",
          answer: "Yes. We stock a range for first-timers and seasoned players, always with guides and safety in mind."
        },
        {
          question: "Can I return or exchange toys?",
          answer: "No. For hygiene and safety, all intimate items are final sale. Please shop intentionally."
        }
      ]
    },
    {
      title: "GALLERY",
      subtitle: "Our world, in moments.",
      icon: Camera,
      faqs: [
        {
          question: "Are the photos real from past events?",
          answer: "Yes. Every image is authentic and captured during Den-curated experiences."
        },
        {
          question: "Can I get access to past event footage?",
          answer: "Yes. Some visuals are public, others are exclusive for registered users or VIP clients."
        },
        {
          question: "Can I choose not to appear in photos?",
          answer: "Absolutely. Your privacy comes first. Let us know in advance, and we'll honor that."
        }
      ]
    },
    {
      title: "PARTNERSHIPS & COLLABS",
      subtitle: "",
      icon: Handshake,
      faqs: [
        {
          question: "Can I work with The Den or model for the brand?",
          answer: "If you embody the vibe—confident, discreet, magnetic—we're listening. Pitch yourself via \"Get in Touch.\""
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
            <HelpCircle className="text-red-500" size={40} />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent">
              FAQs
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            <p className="italic text-red-300">Where elegance meets experience.</p>
            <p className="mt-4">Everything you need to know about The Laydies' Den</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Download size={20} />
            <span>Download FAQs (PDF)</span>
          </motion.button>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {faqSections.map((section, sectionIndex) => (
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
                  <div>
                    <h2 className="text-3xl font-bold text-red-400">{section.title}</h2>
                    {section.subtitle && (
                      <p className="text-zinc-400 italic mt-1">{section.subtitle}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {section.faqs.map((faq, faqIndex) => (
                    <motion.div
                      key={faqIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (faqIndex * 0.05) }}
                      className="bg-black/50 rounded-lg p-6 border border-zinc-800 hover:border-red-500/30 transition-all duration-300"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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
              Need something more personal?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Reach out directly—we don't do bots here.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-black/30 rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-3 text-white mb-3">
                  <Phone size={24} />
                  <span className="text-lg font-semibold">WhatsApp</span>
                </div>
                <p className="text-red-100 text-xl">+254 712 527543</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-black/30 rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-3 text-white mb-3">
                  <Mail size={24} />
                  <span className="text-lg font-semibold">Email</span>
                </div>
                <p className="text-red-100 text-xl">thelaydiesden@gmail.com</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-x-4"
            >
              <button className="bg-white text-red-800 px-8 py-4 rounded-lg font-semibold hover:bg-zinc-100 transition-colors text-lg">
                Get in Touch
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors text-lg">
                WhatsApp Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold text-red-400 mb-4">Still Have Questions?</h3>
            <p className="text-zinc-300 leading-relaxed">
              If you didn't find what you were looking for, don't hesitate to reach out. 
              We're here to make your experience at The Laydies' Den as smooth and satisfying as possible.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
