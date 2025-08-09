import React from "react";
import Hero from "../Components/Hero";
import ModernHero from "../Components/ModernHero";
import AboutIntro from "../Components/AboutIntro";
import ModernProductsCarousel from "../Components/ModernProductsCarousel";
import ServicesPreview from "../Components/ServicesPreview";
import RotatingScenes from "../Components/RotatingScenes";
import ScentIntro from "../Components/ScentIntro";
import ToysIntro from "../Components/ToysIntro";
import BookingButton from "../Components/BookingButton";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutIntro />
      <ModernProductsCarousel />
      <RotatingScenes />
      <ServicesPreview />
      <ScentIntro />
      <ToysIntro />
      <BookingButton />
    </div>
  );
}
