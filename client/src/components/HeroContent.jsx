import React from "react";
import HeroButton from "./HeroButton";
import CatDog from "./icons/CatDog";

function HeroContent() {
  return (
    <div className=" text-[#f9e5bd]">
      <h1 className="text-4xl md:text-7xl font-bold max-w-xl">
        Find pets from shelters across Portugal
      </h1>

      <p className="text-xl font-thin sm:font-light  mt-6 sm:mt-10 max-w-xl">
        Choose adoption over buying and offer a pet in need the chance for a
        better life
      </p>

      {/* <button className="mt-10 block mx-auto lg:mx-0  hover:bg-blue-950 hover:text-amber-500 bg-amber-500  text-blue-950  text-xl px-12 py-4 rounded-2xl cursor-pointer ">
        ADOPT NOW
      </button> */}

      <div className="flex">
        <HeroButton
          className="z-10 mt-10 block 
      mx-auto lg:mx-0  text-lg sm:text-xl px-8 sm:px-12  py-3 sm:py-6 rounded-2xl cursor-pointer"
          icon={<CatDog className="w-8 text-amber-500" />}
        />
      </div>
    </div>
  );
}

//# 207dc9

export default HeroContent;
