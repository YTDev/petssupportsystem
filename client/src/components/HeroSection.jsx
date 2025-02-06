import React from "react";
import ImageCardSwiper from "./ImageCardSwiper";
import HeroContent from "./HeroContent";

function HeroSection() {
  return (
    <div className = "flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 items-center ">
      
      <HeroContent />
      <ImageCardSwiper />
    </div>
  );
}

export default HeroSection;
