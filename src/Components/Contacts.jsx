import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 text-white py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Get In Touch</h2>
        <p className="text-zinc-400">Bookings, inquiries or feedback — we’re here for you</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <MapPin className="text-gold w-6 h-6" />
            <p className="text-zinc-300">123 Gold Avenue, Night City</p>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-gold w-6 h-6" />
            <p className="text-zinc-300">+1 234 567 8901</p>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-gold w-6 h-6" />
            <p className="text-zinc-300">info@ladiesden.com</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent!");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-xl focus:border-red-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-xl focus:border-red-500 outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 h-32 bg-zinc-800 text-white border border-zinc-700 rounded-xl focus:border-red-500 outline-none resize-none"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
