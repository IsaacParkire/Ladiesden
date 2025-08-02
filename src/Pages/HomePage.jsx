import React from "react";
import Hero from "../Components/Hero";
import AboutIntro from "../Components/AboutIntro";
import ServicesPreview from "../Components/ServicesPreview";
import RotatingScenes from "../Components/RotatingScenes";
import BookingButton from "../Components/BookingButton";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutIntro />
      <RotatingScenes />
      <ServicesPreview />
      <BookingButton />
    </div>
  );
}
