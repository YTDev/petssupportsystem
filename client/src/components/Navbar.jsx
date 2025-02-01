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
    <nav className="bg-[#ffde00] shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden font-medium md:flex md:gap-4 ">
            <a href="#" className="px-3 py-1 hover:bg-[#e6c40e]">
              About us
            </a>
            <a href="#" className="px-3 py-1 hover:bg-[#e6c40e]">
              How it works
            </a>
            <a href="#" className="px-3 py-1 hover:bg-[#e6c40e]">
              Testimonials
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-2 font-medium">
            <a
              href="#"
              className="px-4 py-2 border border-[#e6c40e] border-solid rounded-md  hover:bg-[#e6c40e] transition duration-300"
            >
              Log in
            </a>
            <a
              href="#"
              className="hidden tracking-wider md:block px-4 py-2 bg-[#007bc8] border border-[#007bc8] rounded-md text-white hover:bg-[#005a91] transition duration-300"
            >
              Start now
            </a>
            <div className="md:hidden relative z-100">
              <Hamburger size={25} toggled={isMenuOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-1 left-1 right-1 font-medium bg-white flex flex-col rounded-md shadow-md">
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
              className="px-4 py-2 tracking-wider text-center bg-[#007bc8] border border-[#007bc8] rounded-sm text-white hover:bg-[#005a91] transition duration-300"
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
