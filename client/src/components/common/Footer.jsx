import React from "react";
import { Link } from "react-router-dom";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute pointer-events-none w-full h-auto bottom-0 overflow-hidden">
          <svg
            className="scale-[6]"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
              className="fill-blue-200"
            ></path>
          </svg>
        </div>
      </div>
      <footer className="bg-blue-200 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 lg:col-span-1">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="/vite.svg"
                  alt="Logo"
                  className="w-12 h-12 rounded-full"
                />
              </Link>

              <p className="mt-4 max-w-md">Adopt a pet, change a life.</p>
              <div className="flex space-x-4 mt-5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-black border-2 rounded-full hover:bg-[#f9e5bd] flex items-center justify-center"
                >
                  <LuFacebook className="text-black" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-black border-2 rounded-full hover:bg-[#f9e5bd] flex items-center justify-center"
                >
                  <LuInstagram className="text-black" />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-black border-2 rounded-full hover:bg-[#f9e5bd] flex items-center justify-center"
                >
                  <FaPinterestP className="text-black" />
                </a>
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-1 flex flex-col items-start  space-y-4">
              <h2 className="text-lg font-semibold">Quick Links</h2>
              <Link to="/" className="hover:underline ">
                Home
              </Link>
              <Link to="/pets" className="hover:underline">
                Pets
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-2">
                Subscribe to our Newsletter
              </h2>
              <p className="mb-4 text-sm text-gray-800">
                Get the latest updates on pet adoption news and exclusive offers
                delivered straight to your inbox.
              </p>
              <form className="flex max-w-md overflow-hidden rounded-lg shadow-lg">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-black bg-white placeholder-gray-500 focus:outline-none "
                  required
                />
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 sm:px-6 sm:py-3 bg-amber-200 text-black font-semibold transition-colors duration-300 hover:bg-amber-500 focus:outline-none "
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-white pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs flex space-x-4">
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="text-xs text-center mt-4 md:mt-0">
              <p>© 2025 All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
