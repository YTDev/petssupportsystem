import React, { useRef, useEffect } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import "flickity-as-nav-for";
import "flickity-fade";
import carousel1 from "../../assets/testimonials-1.jpg";
import carousel2 from "../../assets/testimonials-2.jpg";
import carousel3 from "../../assets/testimonials-3.jpg";
import carousel4 from "../../assets/testimonials-4.jpg";
import carousel5 from "../../assets/testimonials-5.jpg";
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
          className="relative md:h-full rounded-t-xl md:rounded-l-xl md:rounded-r-none overflow-hidden shadow-xl"
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
          <div className="carousel-cell block w-full h-full">
            <img
              src={carousel3}
              alt="Carousel 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="carousel-cell block w-full h-full">
            <img
              src={carousel4}
              alt="Carousel 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="carousel-cell block w-full h-full">
            <img
              src={carousel5}
              alt="Carousel 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right: Testimonial Slider */}
      <div className="w-full md:w-1/2 bg-blue-100 rounded-b-xl md:rounded-r-xl overflow-hidden">
        <div
          ref={blogSliderRef}
          id="blogSlider"
          className="relative md:h-full  overflow-hidden shadow-xl"
        >
          <div className="carousel-cell block w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-4 md:mb-6">
              <p className="text-lg md:text-2xl font-['Playfair_Display'] text-center leading-relaxed max-w-2xl text-gray-700 px-4">
                "Adopting Rex changed my life in ways I never expected. As a young professional living alone in the city, I was hesitant at first about getting a larger dog. But his gentle nature and protective spirit make him the perfect companion. He's not just a pet, he's family."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600 text-sm md:text-base font-['Inter']">Sofia Martinez</p>
          </div>
          <div className="carousel-cell block w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-4 md:mb-6">
              <p className="text-lg md:text-2xl font-['Playfair_Display'] text-center leading-relaxed max-w-2xl text-gray-700 px-4">
                "Finding Snowball at the shelter was like finding a piece of pure joy. Our daily walks in the park have become the highlight of my day. Her playful spirit and loving nature bring so much happiness - you can't help but smile when you're around her!"
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600 text-sm md:text-base font-['Inter']">Jasmine Taylor</p>
          </div>
          <div className="carousel-cell block w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-4 md:mb-6">
              <p className="text-lg md:text-2xl font-['Playfair_Display'] text-center leading-relaxed max-w-2xl text-gray-700 px-4">
                "Adopting Buddy in our retirement years was the best decision we've made. He keeps us active with daily walks in the park, and his cheerful personality brings so much laughter to our lives. The shelter helped us find the perfect companion for our golden years."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600 text-sm md:text-base font-['Inter']">Margaret & Harold Peterson</p>
          </div>

          <div className="carousel-cell block w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-4 md:mb-6">
              <p className="text-lg md:text-2xl font-['Playfair_Display'] text-center leading-relaxed max-w-2xl text-gray-700 px-4">
                "Living alone after 40 years of marriage was challenging, but adopting Lucy changed everything. She's more than just a companion - she gives me a reason to get up every morning. We spend our afternoons in the garden, and her gentle presence has brought warmth back into my life."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600 text-sm md:text-base font-['Inter']">Thomas Richardson</p>
          </div>

          <div className="carousel-cell block w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
            <blockquote className="mb-4 md:mb-6">
              <p className="text-lg md:text-2xl font-['Playfair_Display'] text-center leading-relaxed max-w-2xl text-gray-700 px-4">
                "When I first saw Leo at the shelter, it was an instant connection. That fluffy red coat and happy smile just drew me in! Now we spend our afternoons in the backyard, and his joyful personality makes every day brighter. He's taught me that the best friendships come with four paws."
              </p>
            </blockquote>
            <p className="uppercase tracking-wider font-medium text-blue-600 text-sm md:text-base font-['Inter']">Marcus Johnson</p>
          </div>

        </div>
      </div>
      <div className="flex w-full justify-center space-x-8 p-6">
        <button className="block p-2 cursor-pointer text-3xl text-blue-950 hover:bg-gray-300 rounded-xl" onClick={() => blogFlickity.current.previous()}>
          <FaLongArrowAltLeft />
        </button>
        <button className="block p-2 cursor-pointer text-3xl text-blue-950 hover:bg-gray-300 rounded-xl" onClick={() => blogFlickity.current.next()}>
          <FaLongArrowAltRight />
        </button>
      </div>

    </div>
  );
};

export default FlickityCarousel;
