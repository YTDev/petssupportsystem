import React, { useRef, useEffect } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import "flickity-as-nav-for";
import "flickity-fade";
import carousel1 from "../../assets/carousel-1.webp";
import carousel2 from "../../assets/carousel-2.webp";
import "./FlickityCarousel.css";

const FlickityCarousel = () => {
  const imageSliderRef = useRef(null);

  const imageFlickity = useRef(null);

  useEffect(() => {
    imageFlickity.current = new Flickity(imageSliderRef.current, {
      fade: true,
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: false,
      draggable: false,
      asNavFor: "#blogSlider",
      setGallerySize: false,
    });

    return () => {
      imageFlickity.current?.destroy();
    };
  }, []);

  return (
    <div className="flex relative flex-wrap md:flex-row">
      {/* Left: Image Slider */}
      <div className="w-full md:w-1/2 relative">
        <div
          ref={imageSliderRef}
          id="imageSlider"
          className="relative  md:h-full"
        >
          <div className="carousel-cell  block w-full h-full">
            <img
              src={carousel1}
              alt="Carousel 1"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="carousel-cell block w-full h-full">
            <img
              src={carousel2}
              alt="Carousel 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right: Testimonial Slider */}
    </div>
  );
};

export default FlickityCarousel;
