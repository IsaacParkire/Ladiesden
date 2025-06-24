import { Calendar, User, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Bookings() {
  return (
    <section id="bookings" className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Book Your Spot</h2>
        <p className="text-zinc-400">Reserve your session with Ladies Den today.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-zinc-900 rounded-xl p-8 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Booking submitted! We will contact you soon.");
        }}
      >
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="relative">
            <User className="absolute top-3 left-3 w-5 h-5 text-gold" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div className="relative">
            <Calendar className="absolute top-3 left-3 w-5 h-5 text-gold" />
            <input
              type="date"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div className="relative md:col-span-2">
            <Clock className="absolute top-3 left-3 w-5 h-5 text-gold" />
            <select
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-red-600"
              required
            >
              <option value="">Select Time Slot</option>
              <option>10:00 AM - 11:00 AM</option>
              <option>2:00 PM - 3:00 PM</option>
              <option>6:00 PM - 7:00 PM</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Submit Booking
        </button>
      </motion.form>
    </section>
  );
}
