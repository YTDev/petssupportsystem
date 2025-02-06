import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";

const imageData = [
  {
    id: 1,
    src: "https://picsum.photos/id/237/200/300",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://picsum.photos/id/238/200/300",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://picsum.photos/id/239/200/300",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://picsum.photos/id/237/200/300",
    alt: "Image 4",
  },
];

function ImageCardSwiper() {
  return (
    <div className="w-[400px] h-[600px] ">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-full h-full"
      >
        {imageData.map((image) => (
          <SwiperSlide key={image.id} className="relative w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageCardSwiper;
