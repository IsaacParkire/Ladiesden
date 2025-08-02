import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Pages/HomePage";
import BoutiquePage from "./Pages/BoutiquePage";
import MassagePage from "./Pages/MassagePage";
import FitnessPage from "./Pages/FitnessPage";
import EventsPage from "./Pages/EventsPage";
import SecretsPage from "./Pages/SecretsPage";
import GalleryPage from "./Pages/GalleryPage";
import BookNowPage from "./Pages/BookNowPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

export default function App() {
  // Force scroll to top on app initialization
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <main className="bg-black text-white font-sans scroll-smooth">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boutique" element={<BoutiquePage />} />
          <Route path="/touch" element={<MassagePage />} />
          <Route path="/strength" element={<FitnessPage />} />
          <Route path="/night" element={<EventsPage />} />
          <Route path="/secrets" element={<SecretsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/book" element={<BookNowPage />} />
          <Route path="/connect" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
