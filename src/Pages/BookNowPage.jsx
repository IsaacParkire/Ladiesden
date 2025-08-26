import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Shield, Instagram, Music2, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { appointmentsAPI } from "../services/api";

const services = [
  { id: "boutique", name: "Her Boutique - Personal Shopping", price: "KSH 19,500-65,000", duration: "2-4 hours", description: "Personal styling with luxury fashion consultants" },
  { id: "touch", name: "Her Touch - Massage Therapy", price: "KSH 26,000-52,000", duration: "1-2 hours", description: "Professional therapeutic massage by expert male therapists" },
  { id: "strength", name: "Her Strength - Personal Training", price: "KSH 13,000-32,500", duration: "1-2 hours", description: "Customized fitness programs with certified male trainers" },
  { id: "night", name: "Her Night - Event Experiences", price: "KSH 39,000-195,000", duration: "3-8 hours", description: "VIP access to exclusive events and entertainment" },
  { id: "secrets", name: "Her Secrets - VIP Lounge", price: "KSH 65,000-260,000", duration: "2-6 hours", description: "Private membership experiences in our exclusive lounge" },
  { id: "combination", name: "Combination Package", price: "KSH 52,000-130,000", duration: "4-8 hours", description: "Multiple services combined for the ultimate experience" }
];

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
];

export default function BookNowPage() {
  const location = useLocation();
  // Check if a service is preselected (from navigation state)
  const preselectedService = location.state?.selectedService || "";
  const skipServiceStep = location.state?.skipServiceStep || false;
  const [step, setStep] = useState(skipServiceStep ? 2 : 1);
  const [formData, setFormData] = useState({
    service: preselectedService,
    date: "",
    time: "",
    duration: "",
    companion: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    location: "our-location",
    customLocation: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Map frontend formData to backend booking fields
    // Backend expects: service_id, therapist_id, booking_date, booking_time, notes, addon_ids (optional)
    // For MVP, we'll use only service_id, booking_date, booking_time, notes
    // Therapist selection is not present in the form, so pick a default or null
    // You may want to extend this to allow therapist selection in the future
    const bookingData = {
      service_id: formData.service,
      // therapist_id: null, // If therapist selection is added, include this
      booking_date: formData.date,
      booking_time: formData.time,
      notes: [
        formData.duration && `Duration: ${formData.duration}`,
        formData.location === "hotel"
          ? `Location: ${formData.customLocation}`
          : "Location: Our Luxury Facility",
        formData.specialRequests && `Special Requests: ${formData.specialRequests}`,
        formData.phone && `Phone: ${formData.phone}`,
        formData.name && `Name: ${formData.name}`,
        formData.email && `Email: ${formData.email}`,
      ]
        .filter(Boolean)
        .join(" | "),
    };
    try {
      await appointmentsAPI.create(bookingData);
      alert("Booking request submitted! We will contact you within 24 hours to confirm your appointment.");
      // Optionally reset form or redirect
    } catch (error) {
      alert(
        error?.response?.data?.detail ||
          "There was an error submitting your booking. Please try again or contact support."
      );
    }
  };

  return (
    <div className="pt-24 bg-black text-white min-h-screen">      {/* Hero Section */}
      <section className="py-8 px-6 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center"><motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6"
          >
            Book Your Session 💎
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gold leading-relaxed"
          >
            Schedule your personalized luxury experience. All bookings are confidential and professionally managed.
          </motion.p>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= stepNumber
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all ${
                    step > stepNumber ? "bg-red-600" : "bg-zinc-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="text-center">
            <p className="text-zinc-400 text-sm">
              Step {step} of 4: {
                step === 1 ? "Service Selection" :
                step === 2 ? "Date & Time" :
                step === 3 ? "Personal Information" :
                "Review & Confirm"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-8">Select Your Service</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.service === service.id
                            ? "border-red-600 bg-red-600/10"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                        onClick={() => setFormData({ ...formData, service: service.id })}                      >
                        <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                        <p className="text-gold text-lg font-semibold">{service.price}</p>
                        <p className="text-zinc-400 text-sm mb-2">{service.duration}</p>
                        <p className="text-zinc-300 text-xs">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-8">Choose Date & Time</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        <Calendar className="inline w-5 h-5 mr-2" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        <Clock className="inline w-5 h-5 mr-2" />
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <label className="block text-white font-semibold mb-3">Duration</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["1 hour", "2 hours", "3 hours", "4+ hours"].map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => setFormData({ ...formData, duration })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.duration === duration
                              ? "border-red-600 bg-red-600/10 text-red-400"
                              : "border-zinc-700 text-zinc-300 hover:border-zinc-600"
                          }`}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <label className="block text-white font-semibold mb-3">Location</label>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="location"
                          value="our-location"
                          checked={formData.location === "our-location"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />                        <span>Our Luxury Facility</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="location"
                          value="hotel"
                          checked={formData.location === "hotel"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>Your Location (Hotel/Home - Additional fees apply)</span>
                      </label>
                    </div>
                    {formData.location === "hotel" && (
                      <input
                        type="text"
                        name="customLocation"
                        value={formData.customLocation}
                        onChange={handleInputChange}
                        placeholder="Enter hotel name or address"
                        className="w-full mt-4 p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Personal Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-8">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        <User className="inline w-5 h-5 mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">
                        <Mail className="inline w-5 h-5 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-3">
                        <Phone className="inline w-5 h-5 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-3">
                        Special Requests or Preferences
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-red-600 outline-none resize-none"
                        placeholder="Any specific requests, preferences, or questions..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-8">Review Your Booking</h2>
                  <div className="bg-zinc-800/50 rounded-xl p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-white font-semibold mb-4">Service Details</h3>
                        <p className="text-zinc-300 mb-2">
                          <strong>Service:</strong> {services.find(s => s.id === formData.service)?.name}
                        </p>
                        <p className="text-zinc-300 mb-2">
                          <strong>Date:</strong> {formData.date}
                        </p>
                        <p className="text-zinc-300 mb-2">
                          <strong>Time:</strong> {formData.time}
                        </p>
                        <p className="text-zinc-300 mb-2">
                          <strong>Duration:</strong> {formData.duration}
                        </p>                        <p className="text-zinc-300">
                          <strong>Location:</strong> {formData.location === "our-location" ? "Our Luxury Facility" : formData.customLocation}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-4">Contact Information</h3>
                        <p className="text-zinc-300 mb-2">
                          <strong>Name:</strong> {formData.name}
                        </p>
                        <p className="text-zinc-300 mb-2">
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p className="text-zinc-300 mb-2">
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                        {formData.specialRequests && (
                          <p className="text-zinc-300">
                            <strong>Special Requests:</strong> {formData.specialRequests}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Security Notice */}
                  <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-500 mt-1" />
                      <div>
                        <h3 className="text-green-400 font-semibold mb-2">Privacy & Security</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                          Your information is completely confidential and encrypted. We never share client details 
                          with third parties. All payment processing is secure and discreet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-zinc-700">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl transition-all"
                  >
                    Previous
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (step === 1 && !formData.service) ||
                      (step === 2 && (!formData.date || !formData.time || !formData.duration)) ||
                      (step === 3 && (!formData.name || !formData.email || !formData.phone))
                    }
                    className="ml-auto px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-xl transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    Submit Booking Request
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>      {/* Contact Information */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center">          <h2 className="text-3xl font-bold text-gold mb-6">Need Assistance? 💬</h2>
          <p className="text-zinc-300 mb-8">
            Our team is available 24/7 to help you with your booking and answer any questions.
          </p>
          
          {/* Contact Details */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500" />
              <span className="text-white">0712527543</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-red-500" />
              <span className="text-white">thelaydiesden@gmail.com</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://www.instagram.com/laydies_den?igsh=MWg2M3dpM25zdDF5aA=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@laydiesden?_t=ZM-8yY4lo3U1gL&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <Music2 className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://wa.me/254712527543"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
