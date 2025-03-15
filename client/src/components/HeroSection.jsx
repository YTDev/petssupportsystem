import React from "react";
import ImageCardSwiper from "./ImageCardSwiper";
import HeroContent from "./HeroContent";

function HeroSection() {
  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/dog-paw.svg"
          alt="Decorative dog paw"
          className="absolute top-20 left-20 w-[80%] md:w-[500px] transform rotate-45 opacity-20 object-fit "
        />
      </div>
      <div className="relative z-10 flex justify-between items-center flex-col lg:flex-row px-4 sm:px-6 lg:px-8 lg:py-24 py-4 sm:py-20 overflow-hidden gap-16">
        <HeroContent />
        <ImageCardSwiper />
      </div>
    </div>
  );
}

export default HeroSection;
