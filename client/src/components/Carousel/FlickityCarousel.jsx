import React, { useRef, useEffect } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import "flickity-as-nav-for";
import "flickity-fade";
import carousel1 from "../../assets/carousel-1.webp";
import carousel2 from "../../assets/carousel-2.webp";
import "./FlickityCarousel.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const FlickityCarousel = () => {
  const imageSliderRef = useRef(null);
  const blogSliderRef = useRef(null);

  const imageFlickity = useRef(null);
  const blogFlickity = useRef(null);

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

    blogFlickity.current = new Flickity(blogSliderRef.current, {

      pageDots: false,
      prevNextButtons: false,
      draggable: true,
      wrapAround: true,

    });

    return () => {
      imageFlickity.current?.destroy();
      blogFlickity.current?.destroy();
    };
  }, []);

  return (
    <div className="flex relative flex-wrap md:flex-row">
      {/* Left: Image Slider */}
      <div className="w-full md:w-1/2 relative">
        <div
          ref={imageSliderRef}
          id="imageSlider"
          className="relative md:h-full rounded-l-xl overflow-hidden "
        >
          <div className="carousel-cell block w-full h-full">
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
      <div className="w-full md:w-1/2 bg-blue-50 rounded-r-xl overflow-hidden">
        <div
          ref={blogSliderRef}
          id="blogSlider"
          className="md:h-full "
        >
          <div className="carousel-cell block w-full h-fullcarousel-cell block w-full h-full p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-6">
              <p className="text-2xl font-serif text-center leading-relaxed max-w-2xl text-gray-700">
                "After adopting Max from the shelter, our lives changed completely. His playful energy and unconditional love have made our house feel like a true home. The support from the shelter staff was incredible throughout the process."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600">Emily & James Wilson</p>
          </div>
          <div className="carousel-cell block w-full h-full p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-6">
              <p className="text-2xl font-serif text-center leading-relaxed max-w-2xl text-gray-700">
                "Bella was so shy when we first met her, but with patience and care, she's become the most loving companion. The shelter's guidance helped us create the perfect environment for her to thrive."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600">Sarah Thompson</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center space-x-4">
      <button className="block cursor-pointer" onClick={()=>blogFlickity.current.previous()}>
        <FaLongArrowAltLeft />
      </button>
      <button className="block cursor-pointer" onClick={()=>blogFlickity.current.next()}>
        <FaLongArrowAltRight />
      </button>
      </div>
      
    </div>
  );
};

export default FlickityCarousel;
