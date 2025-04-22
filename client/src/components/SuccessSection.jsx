import React from "react";
import FlickityCarousel from "./Carousel/FlickityCarousel";
import { Element } from 'react-scroll';


function SuccessSection() {
  return (
    <Element name="success-stories">
      <section className="bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8  rounded-xl ">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center py-8 md:py-12 lg:py-16 ">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-black tracking-wider">
              Success Stories
            </h2>
            <p className="text-base md:text-lg lg:text-xl mt-3 md:mt-4 text-gray-600">
              Check our latest success stories
            </p>
          </div>

          <div className="container mx-auto max-w-7xl">
            <FlickityCarousel />
          </div>
        </div>
        <div className="relative w-full">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120V48.4C240 96.8 480 120 720 96.8C960 73.6 1200 24.2 1440 0V120H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </Element>
  );
}

export default SuccessSection;
