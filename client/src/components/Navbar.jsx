import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      console.log("Menu Closed");
    } else {
      console.log("Menu Opened");
    }
  }

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="font-display flex-shrink-0 flex items-center">
              <a href="#" className="text-xl font-bold">
                Logo
              </a>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden font-medium lg:flex md:gap-4 ">
            <a
              href="#"
              className="px-3 py-1 hover:text-amber-400 underline-offset-[8px]"
            >
              About us
            </a>
            <a
              href="#"
              className="px-3 py-1 hover:text-amber-400 underline-offset-[8px]"
            >
              How it works
            </a>
            <a
              href="#"
              className="px-3 py-1 hover:text-amber-400 underline-offset-[8px]"
            >
              Testimonials
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-2 font-medium">
            <a
              href="#"
              className="px-4 py-2 border border-[#fff] border-solid rounded-md  hover:border-[#e89b3d] hover:text-[#e89b3d] transition duration-300"
            >
              Log in
            </a>
            <a
              href="#"
              className="hidden tracking-wider lg:block px-4 py-2 bg-amber-500 border border-amber-500 rounded-md text-blue-950 hover:text-[#e89b3d] hover:bg-transparent transition duration-300"
            >
              Start now
            </a>

            <div
              className={`lg:hidden relative z-100 ${
                isMenuOpen ? "text-blue-950" : " text-[#f9e5bd]"
              }`}
            >
              <Hamburger size={25} toggled={isMenuOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute z-20 top-1 left-1 right-1 font-medium bg-[#f9e5bd] flex flex-col rounded-md shadow-md text-blue-950">
          <div className="flex flex-col m-4 mt- mb-4 px-3 py-1 gap-7">
            <a href="#" className="text-xl font-bold">
              Logo
            </a>
            <a href="#" className="text-xl">
              About us
            </a>
            <a href="#" className="text-xl">
              How it works
            </a>
            <a href="#" className="text-xl">
              Testimonials
            </a>
            <hr className="border-t border-gray-300" />
            <a
              href="#"
              className="p-4 tracking-wider text-center bg-amber-500   rounded-sm text-blue-950 "
            >
              Start Now
            </a>
            <p className="font-normal text-center">
              Already have an account?{" "}
              <a href="" className="text-[#007bc8] underline hover:text-black">
                Log in →
              </a>
            </p>
          </div>
        </div>
      )}
      {/* another implementation for the mobile menu (check with the team) */}
      {/* {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-1 hover:bg-[#e6c40e]">
              About us
            </a>
            <a href="#" className="block px-3 py-1 hover:bg-[#e6c40e]">
              How it works
            </a>
            <a href="#" className="block px-3 py-1 hover:bg-[#e6c40e]">
              Testimonials
            </a>
          </div>
          <div className="px-2 pb-3">
            <a
              href="#"
              className="block text-center  mt-1 px-4 py-2 bg-[#007bc8] border border-[#007bc8] rounded-md text-white hover:bg-[#005a91] transition duration-300"
            >
              Start now
            </a>
            <p className="font-normal text-center px-4 py-2">
              Already have an account?{" "}
              <a href="" className="text-[#007bc8] underline hover:text-black ">
                Log in →
              </a>
            </p>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
