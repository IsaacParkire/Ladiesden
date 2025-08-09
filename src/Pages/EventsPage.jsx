import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Star, Wine, Music, Crown, Ticket } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Midnight Masquerade",
    date: "2025-08-15",
    time: "9:00 PM - 2:00 AM",
    type: "Female-Only Event",
    description: "An elegant masquerade ball with live entertainment, premium cocktails, and exclusive networking.",
    price: "KSH 19,500",
    capacity: "50 ladies",
    hosts: ["Adrian", "Marcus", "Julian"],
    image: "/events/masquerade.jpg",
    features: ["Live DJ", "Premium Bar", "Gourmet Appetizers", "Professional Photography"]
  },
  {
    id: 2,
    title: "VIP Wine & Desire",
    date: "2025-08-22",
    time: "7:00 PM - 11:00 PM",
    type: "Private Show",
    description: "Intimate wine tasting with private performances and personalized male host service.",
    price: "KSH 26,000",
    capacity: "25 ladies",
    hosts: ["Sebastian", "Phoenix", "Damien"],
    image: "/events/wine.jpg",
    features: ["Wine Tasting", "Private Shows", "Personal Hosts", "Luxury Appetizers"]
  },
  {
    id: 3,
    title: "Ladies Night Takeover",
    date: "2025-08-29",
    time: "8:00 PM - 1:00 AM",
    type: "Bartender Experience",
    description: "Exclusive ladies night with skilled male bartenders creating custom cocktails and entertainment.",
    price: "KSH 13,000",
    capacity: "40 ladies",
    hosts: ["Ryan", "Blake", "Carter"],
    image: "/events/takeover.jpg",
    features: ["Custom Cocktails", "Bartender Shows", "Dancing", "Late Night Snacks"]
  }
];

const vipTables = [
  {
    id: 1,
    name: "Golden Goddess Table",
    capacity: "Up to 6 ladies",
    price: "KSH 104,000",
    hosts: 2,
    description: "Premium table service with dedicated male hosts, champagne service, and VIP treatment.",
    features: ["2 Dedicated Hosts", "Champagne Service", "Premium Location", "Personal Concierge"],
    image: "/vip/golden.jpg"
  },
  {
    id: 2,
    name: "Ruby Empress Suite",
    capacity: "Up to 8 ladies",
    price: "KSH 156,000",
    hosts: 3,
    description: "Exclusive private suite with multiple male hosts, full bar service, and luxury amenities.",
    features: ["3 Dedicated Hosts", "Full Bar Service", "Private Suite", "Luxury Amenities"],
    image: "/vip/ruby.jpg"
  },
  {
    id: 3,
    name: "Diamond Diva Experience",
    capacity: "Up to 10 ladies",
    price: "KSH 234,000",
    hosts: 4,
    description: "Ultimate VIP experience with full host team, premium entertainment, and exclusive perks.",
    features: ["4 Dedicated Hosts", "Premium Entertainment", "Exclusive Perks", "Personal Chef"],
    image: "/vip/diamond.jpg"
  }
];

const maleHosts = [
  {
    id: 1,
    name: "Adrian Luxe",
    specialties: ["Event Hosting", "Conversation", "Entertainment"],
    rating: 4.9,
    image: "/hosts/adrian.jpg",
    description: "Charismatic host with expertise in creating memorable social experiences."
  },
  {
    id: 2,
    name: "Sebastian Cross",
    specialties: ["Wine Service", "Sophistication", "Elegance"],
    rating: 4.8,
    image: "/hosts/sebastian.jpg",
    description: "Refined gentleman specializing in luxury service and elegant entertainment."
  },
  {
    id: 3,
    name: "Marcus Elite",
    specialties: ["Bartending", "Mixology", "Entertainment"],
    rating: 4.9,
    image: "/hosts/marcus-host.jpg",
    description: "Master bartender and entertainer, creating unforgettable night experiences."
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVipTable, setSelectedVipTable] = useState(null);
  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-black text-white">      {/* Hero Section */}
      <section className="min-h-[70vh] px-4 sm:px-6 flex items-center relative">        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Ladiesden/images/hernight3.jpeg"
            alt="Her Night Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-6xl sm:text-7xl mb-4 block">🍸</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-4 leading-tight">
              Her Night
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-red-500 font-medium mb-6 italic">
              "Pleasure After Dark."
            </p>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 leading-relaxed max-w-3xl mx-auto mb-8">
              Exclusive female-only events, private shows, and VIP experiences with our trained male hosts.
              Indulge in luxury nightlife designed specifically for sophisticated women.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 text-base sm:text-lg shadow-lg backdrop-blur-sm">
              View Events
            </button>
            <button className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black rounded-xl font-bold transition-all duration-300 hover:scale-105 text-base sm:text-lg backdrop-blur-sm">
              Book VIP Table
            </button>
          </motion.div>
        </div>
      </section>{/* Upcoming Events */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold text-center mb-8 sm:mb-12 md:mb-16"
          >
            Upcoming Exclusive Events
          </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-gold font-semibold">{event.price}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span className="text-zinc-300 text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-zinc-300 text-sm">{event.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-4 leading-relaxed text-sm">
                    {event.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Users className="w-4 h-4 text-gold" />
                      <span className="text-zinc-400 text-sm">{event.capacity}</span>
                    </div>
                    <div className="text-zinc-400 text-sm">
                      Hosts: {event.hosts.join(", ")}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 mb-6">
                    {event.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-zinc-400">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                    <Ticket className="w-4 h-4 inline mr-2" />
                    Reserve Spot
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Tables */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Curated VIP Tables with Male Hosts
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {vipTables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-br from-black/70 to-zinc-900/50 rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all group"
              >
                <div className="relative">
                  <img
                    src={table.image}
                    alt={table.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Crown className="w-6 h-6 text-gold" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{table.name}</h3>
                    <p className="text-gold font-bold text-xl">{table.price}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-300 text-sm">{table.capacity}</span>
                    <span className="text-red-500 text-sm font-semibold">{table.hosts} Hosts</span>
                  </div>
                  
                  <p className="text-zinc-300 mb-6 leading-relaxed text-sm">
                    {table.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {table.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-red-600 to-gold hover:from-red-700 hover:to-yellow-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                    Book VIP Table
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Male Hosts */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold text-center mb-16"
          >
            Our Elite Male Hosts
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {maleHosts.map((host, index) => (
              <motion.div
                key={host.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all group"
              >
                <div className="relative">
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{host.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gold font-bold">{host.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {host.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {host.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                    Request This Host
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar Preview */}
      <section className="py-20 px-6 bg-gradient-to-t from-red-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gold mb-6"
          >
            Join the Exclusive Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-zinc-300 mb-8"
          >
            Be part of the most exclusive nightlife experiences designed specifically for sophisticated women.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              View Full Calendar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Book VIP Table
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
