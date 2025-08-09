import React from 'react';
import { motion } from 'framer-motion';
import { Download, Crown, Flame, Heart, Shield, Star } from 'lucide-react';

const AboutPage = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/ABOUT US.pdf';
    link.download = 'ABOUT US.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const universeItems = [
    {
      name: "Her Boutique",
      description: "Curated fashion for the woman who walks into rooms and owns them—whether she's wrapped in silk or sin.",
      icon: Crown
    },
    {
      name: "Her Touch", 
      description: "Sensual and erotic massage experiences for those craving intimacy beyond the surface.",
      icon: Heart
    },
    {
      name: "Her Strength",
      description: "Tailored fitness and nutrition plans to sculpt the body into a weapon of confidence.",
      icon: Shield
    },
    {
      name: "Her Secrets",
      description: "A velvet box of fetishes, kinks, and hidden desires. Including exclusive sessions with elite male strippers.",
      icon: Star
    },
    {
      name: "Her Night",
      description: "From decadent parties to private dates—her nightlife, unfiltered.",
      icon: Flame
    },
    {
      name: "Her Scent",
      description: "Seductive, hand-crafted perfumes and colognes designed to leave traces of you on their skin.",
      icon: Heart
    },
    {
      name: "Her Toys",
      description: "Bedroom accessories—whips, cuffs, chokers, restraints. Each item a key to the version of her that doesn't ask permission.",
      icon: Crown
    }
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
            About The Laydies' Den
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-5xl mx-auto leading-relaxed space-y-4"
          >
            <p className="italic text-red-300">Not just a brand. Not just a service.</p>
            <p>We are the unexplored room in your fantasies. Where your desires are not only welcomed— <em className="text-red-400">they're celebrated.</em></p>
            <p>The whisper behind the closed door. The touch you didn't know you needed.</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Download size={20} />
            <span>Download Our Story (PDF)</span>
          </motion.button>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">Our Story</h2>
            <div className="max-w-5xl mx-auto text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
              <p>
                Born in the shadows of pleasure and power, <strong className="text-red-400">The Laydies' Den</strong> isn't just a brand—it's an experience, a sanctuary, and a movement.
              </p>
              <p>
                What started as a private circle of curated indulgence has grown into a bold empire rooted in <strong className="text-red-400">femininity, strength</strong>, and <strong className="text-red-400">style</strong>. We saw a need, not just for luxury, but for liberation. Not just for beauty, but for boldness. And we answered.
              </p>
              <p>
                From the streets of <strong className="text-red-400">Mombasa</strong> to the whispers of after-hours fantasies, The Laydies' Den is where secrets come alive, where touch becomes ritual, and where every woman owns her narrative.
              </p>
              <div className="text-center py-8">
                <p className="text-xl md:text-2xl italic text-red-300">
                  In a world that teaches women to shrink, we built a sanctuary where she expands.<br/>
                  Where curves are crowned.<br/>
                  Where desires are not only permitted—they're worshipped.
                </p>
              </div>
              <p>
                The Laydies' Den was born from <strong className="text-red-400">a vision</strong>:<br/>
                To create a space where pleasure, power, and presence collide.<br/>
                A movement crafted for women who know they are art, and for those brave enough to adore them properly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Universe Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Universe</h2>
            <p className="text-xl text-zinc-300 max-w-4xl mx-auto">
              Each page of our world is a reflection of her—divine, dynamic, and untamed:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universeItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/80 p-6 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-500 transition-colors">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-red-400">{item.name}</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
            
            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-black/80 p-6 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-500 transition-colors">
                  <Star size={20} />
                </div>
                <h3 className="text-xl font-bold text-red-400">Gallery</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">Snapshots and clips from inside the Den. The life others only fantasize about.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-black/80 p-6 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-500 transition-colors">
                  <Heart size={20} />
                </div>
                <h3 className="text-xl font-bold text-red-400">Get in Touch</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">Where invitations are extended… but never begged for.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
              <p>To awaken the divine feminine.<br/>
              To amplify confidence.<br/>
              To give space for healing, exploration, and expression through curated experiences and exclusive indulgence.</p>
              
              <div className="py-8">
                <p className="text-xl md:text-2xl italic text-red-300">
                  We are here to remind every woman:<br/>
                  You were never too much. You were never not enough.<br/>
                  You were always <em className="text-red-400">the one</em>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Code Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Our Code</h2>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
              <p>We serve those who deserve exclusivity.</p>
              <p>
                Our Den is for the powerful. For the sensual. For the woman who knows her worth… and for the few who can match it. We attract <strong className="text-red-400">elite clientele</strong>, <strong className="text-red-400">independent women</strong>, and men who know how to respect power wrapped in pleasure.
              </p>
              <p className="text-red-300 italic">
                If you're here, you're not just a visitor—you've already been chosen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Age Restriction */}
      <section className="py-12 px-4 bg-red-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Age Restriction</h2>
            <div className="text-lg md:text-xl text-zinc-300 leading-relaxed space-y-4">
              <p className="italic">This is a sacred space.</p>
              <p className="text-2xl font-bold text-red-400">18+ only.</p>
              <p className="italic">If you need to ask why, you're not ready.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join the Experience CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-800 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Join the Experience
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-red-100 leading-relaxed space-y-6 mb-12"
          >
            <p className="italic">This isn't business.<br/>This is an initiation.</p>
            <p>
              When you step into the Den, you're not just buying a product or booking a service.<br/>
              You're claiming a seat at the table of indulgence.<br/>
              You're choosing a lifestyle, not just a look.
            </p>
            <div className="py-6">
              <p className="text-xl md:text-2xl">
                So come closer.<br/>
                Linger longer.<br/>
                We're not just what you want.<br/>
                <strong className="text-white">We are what you've been waiting for.</strong>
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <button className="bg-white text-red-800 px-8 py-4 rounded-lg font-semibold hover:bg-zinc-100 transition-colors text-lg">
              Enter the Den
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors text-lg">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
