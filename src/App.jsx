import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./Components/Navbar";
import HorizontalTabs from "./Components/HorizontalTabs";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import FloatingCart from "./Components/FloatingCart";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
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
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPage from "./Pages/PrivacyPage";
import FAQsPage from "./Pages/FAQsPage";
import ShippingPage from "./Pages/ShippingPage";
import MembershipPage from "./Pages/MembershipPage";
import PaymentPage from "./Pages/PaymentPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import ServicesTouchPage from "./Pages/ServicesTouchPage";

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
    <AuthProvider>
      <CartProvider>
        <Router basename="/Ladiesden">
          <ScrollToTop />
          <main className="bg-black text-white font-sans">
            <Navbar />
            <HorizontalTabs />
            <div className="pt-[130px]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/boutique" element={<BoutiquePage />} />
                <Route path="/touch" element={<MassagePage />} />
                <Route path="/strength" element={<FitnessPage />} />
                <Route path="/night" element={<EventsPage />} />
                <Route path="/secrets" element={<SecretsPage />} />
                <Route path="/scent" element={<ScentPage />} />
                <Route path="/toys" element={<ToysPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/book" element={<BookNowPage />} />
                <Route path="/servicestouchpage" element={<ServicesTouchPage />} />
                <Route path="/connect" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={
                  <ProtectedRoute requireAuth={false}>
                    <LoginPage />
                  </ProtectedRoute>
                } />
                <Route path="/register" element={
                  <ProtectedRoute requireAuth={false}>
                    <RegisterPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
              </Routes>
            </div>
            <Footer />
            <FloatingCart />
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
