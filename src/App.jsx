import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Lineup from "./Components/Lineup";
import VIP from "./Components/VIP";
import Gallery from "./Components/Gallery";
import Gym from "./Components/Gym";
import Stretches from "./Components/Stretches";
import Bookings from "./Components/Bookings";
import Contacts from "./Components/Contacts";

export default function App() {
  return (
    <main className="bg-black text-white font-sans scroll-smooth">
      <Navbar />

      <Hero />

      <Lineup />

      <VIP />

      <Gallery />

      <Gym />

      <Stretches />

      <Bookings />

      <Contacts />
    </main>
  );
}
