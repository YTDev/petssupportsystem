import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "./ImageCardSwiper.module.css";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.webp";
import image5 from "../assets/image5.webp";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.webp";

const imageData = [
  {
    id: 1,
    src: image1,
    alt: "Image 1",
    race: "Persian Cat",
    homeDetails: "Indoor Cat",
    location: "Lisbon, Portugal",
  },
  {
    id: 2,
    src: image2,
    alt: "Image 2",
    race: "Beagle",
    homeDetails: "House Dog",
    location: "Coimbra, Portugal",
  },
  {
    id: 3,
    src: image3,
    alt: "Image 3",
    race: "Labrador",
    homeDetails: "Large House Cat",
    location: "Porto, Portugal",
  },
  {
    id: 4,
    src: image4,
    alt: "Image 4",
    race: "Husky",
    homeDetails: "Energetic Dog",
    location: "Faro, Portugal",
  },
  {
    id: 5,
    src: image5,
    alt: "Image 5",
    race: "Ragdoll",
    homeDetails: "Affectionate Cat",
    location: "Braga, Portugal",
  },
  {
    id: 6,
    src: image6,
    alt: "Image 6",
    race: "French Bulldog",
    homeDetails: "House Dog",
    location: "Aveiro, Portugal",
  },
  {
    id: 7,
    src: image7,
    alt: "Image 7",
    race: "Siamese Cat",
    homeDetails: "Elegant Cat",
    location: "Porto, Portugal",
  },
];

function ImageCardSwiper() {
  return (
    <div className="sm:mr-20">
      <div className="w-[300px] h-[500px] sm:w-[400px] sm:h-[600px]">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {imageData.map((image) => (
            <SwiperSlide key={image.id} className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className="p-4 relative z-10 top-[80%] w-full bg-transparent text-[#103D62] text-xs md:text-sm">
                <span className="bg-white px-6 py-2 rounded-3xl  ">
                  {image.race}
                </span>
                <span className="bg-white px-6 py-2 rounded-3xl  ml-4">
                  {image.homeDetails}
                </span>
                <span className="inline-block mt-4 bg-white px-6 py-2 rounded-3xl ">
                  <MapPinIcon className="inline-block w-6 h-6 mr-2" />
                  {image.location}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ImageCardSwiper;
