import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play, Heart, Filter, Grid, List } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    category: "boutique",
    title: "Luxury Fashion Collection",
    image: "/gallery/boutique-1.jpg",
    description: "Exclusive designer pieces from Her Boutique collection"
  },
  {
    id: 2,
    type: "video",
    category: "touch",
    title: "Professional Massage Session",
    image: "/gallery/massage-1.jpg",
    videoUrl: "/gallery/massage-preview.mp4",
    description: "Expert male therapists providing therapeutic wellness"
  },
  {
    id: 3,
    type: "photo",
    category: "strength",
    title: "Personal Training Excellence",
    image: "/gallery/fitness-1.jpg",
    description: "Professional male trainers guiding fitness journeys"
  },
  {
    id: 4,
    type: "photo",
    category: "night",
    title: "VIP Event Elegance",
    image: "/gallery/event-1.jpg",
    description: "Exclusive moments from Her Night experiences"
  },
  {
    id: 5,
    type: "video",
    category: "secrets",
    title: "Private Lounge Atmosphere",
    image: "/gallery/secrets-1.jpg",
    videoUrl: "/gallery/secrets-preview.mp4",
    description: "Glimpse into our exclusive members-only space"
  },
  {
    id: 6,
    type: "photo",
    category: "boutique",
    title: "Designer Styling Session",
    image: "/gallery/boutique-2.jpg",
    description: "Personal styling with our fashion consultants"
  },
  {
    id: 7,
    type: "photo",
    category: "touch",
    title: "Wellness Sanctuary",
    image: "/gallery/massage-2.jpg",
    description: "Our serene spa environment and expert therapists"
  },
  {
    id: 8,
    type: "photo",
    category: "strength",
    title: "Fitness Excellence",
    image: "/gallery/fitness-2.jpg",
    description: "State-of-the-art equipment with professional guidance"
  },
  {
    id: 9,
    type: "video",
    category: "night",
    title: "Event Highlights",
    image: "/gallery/event-2.jpg",
    videoUrl: "/gallery/event-preview.mp4",
    description: "Memorable moments from our signature events"
  }
];

const categories = [
  { id: "all", name: "All", count: galleryItems.length },
  { id: "boutique", name: "Her Boutique", count: galleryItems.filter(item => item.category === "boutique").length },
  { id: "touch", name: "Her Touch", count: galleryItems.filter(item => item.category === "touch").length },
  { id: "strength", name: "Her Strength", count: galleryItems.filter(item => item.category === "strength").length },
  { id: "night", name: "Her Night", count: galleryItems.filter(item => item.category === "night").length },
  { id: "secrets", name: "Her Secrets", count: galleryItems.filter(item => item.category === "secrets").length }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6"
          >
            Gallery ✨
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gold leading-relaxed"
          >
            Discover our world of luxury services, exclusive experiences, and elegant moments crafted for the modern woman.
          </motion.p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-red-600 text-white" : "text-zinc-400"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-red-600 text-white" : "text-zinc-400"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-zinc-300 text-sm">{item.description}</p>
                      </div>
                    </div>

                    {/* Media Type Indicator */}
                    <div className="absolute top-4 right-4">
                      {item.type === "video" ? (
                        <div className="bg-red-600 p-2 rounded-full">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="bg-gold p-2 rounded-full">
                          <Camera className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-4 left-4 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-400 capitalize">{item.category}</span>
                      <span className="text-xs text-zinc-500">{item.type.toUpperCase()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex gap-6 bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900/70 transition-all cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-48 h-32 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      {item.type === "video" ? (
                        <Play className="w-5 h-5 text-red-500" />
                      ) : (
                        <Camera className="w-5 h-5 text-gold" />
                      )}
                    </div>
                    <p className="text-zinc-300 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-400 capitalize">{item.category}</span>
                      <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for Selected Item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full bg-zinc-900 rounded-2xl overflow-hidden"
          >
            <div className="relative">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.videoUrl}
                  controls
                  className="w-full h-96 object-cover"
                />
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover"
                />
              )}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
              <p className="text-zinc-300 mb-4">{selectedItem.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400 capitalize">{selectedItem.category}</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
