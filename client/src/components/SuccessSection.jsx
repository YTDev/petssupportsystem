import React from "react";
import FlickityCarousel from "./Carousel/FlickityCarousel";

function SuccessSection() {
  return (
    <section className="py-16  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-black tracking-wider">
            Success stories
          </h2>
          <p className="text-lg md:text-xl mt-4 text-gray-600 md:mt-5">
            Check our latest success stories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <FlickityCarousel />
      </div>
    </section>
  );
}

export default SuccessSection;
