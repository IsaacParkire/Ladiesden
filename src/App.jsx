import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./Components/Navbar";
import HorizontalTabs from "./Components/HorizontalTabs";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import FloatingCart from "./Components/FloatingCart";
import HomePage from "./Pages/HomePage";
import BoutiquePage from "./Pages/BoutiquePage";
import MassagePage from "./Pages/MassagePage";
import FitnessPage from "./Pages/FitnessPage";
import EventsPage from "./Pages/EventsPage";
import SecretsPage from "./Pages/SecretsPage";
import ScentPage from "./Pages/ScentPage";
import ToysPage from "./Pages/ToysPage";
import GalleryPage from "./Pages/GalleryPage";
import BookNowPage from "./Pages/BookNowPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

export default function App() {
  // Force scroll to top on app initialization and prevent scroll restoration
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();
    
    // Also after a small delay
    const timer = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <Router basename="/Ladiesden">
        <ScrollToTop />
        <main className="bg-black text-white font-sans"> {/* Removed scroll-smooth to prevent conflicts */}
          <Navbar />
          <HorizontalTabs />
          <div className="pt-[130px]"> {/* Added padding to account for fixed navbar + tabs */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boutique" element={<BoutiquePage />} />
              <Route path="/touch" element={<MassagePage />} />
              <Route path="/strength" element={<FitnessPage />} />
              <Route path="/night" element={<EventsPage />} />
              <Route path="/secrets" element={<SecretsPage />} />
              <Route path="/scent" element={<ScentPage />} />
              <Route path="/toys" element={<ToysPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/book" element={<BookNowPage />} />
              <Route path="/connect" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
          <Footer />
          <FloatingCart />
        </main>
      </Router>
    </CartProvider>
  );
}
