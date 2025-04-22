import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PiPawPrint } from "react-icons/pi";
import { Link as Scroll} from 'react-scroll';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }



  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="font-display flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                {/* change img */}
                <img src="/vite.svg" alt="" />
              </Link>
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
            <Scroll className="cursor-pointer px-3 py-1 hover:text-amber-400 underline-offset-[8px]" 
                    to="how-it-works" smooth={true} duration={500}>How It Works</Scroll>
            
            <Scroll className="cursor-pointer px-3 py-1 hover:text-amber-400 underline-offset-[8px]" 
                    to="success-stories" smooth={true} duration={500}>Testimonials</Scroll>
              
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-2 font-medium">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard/favorites" className="cursor-pointer">
                    <PiPawPrint size={30} className="text-[#f9e5bd]" />
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-[#fff] border-solid rounded-3xl  hover:border-[#e89b3d] hover:text-[#e89b3d] transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="px-4 py-2 border border-[#fff] border-solid rounded-3xl  hover:border-[#e89b3d] hover:text-[#e89b3d] transition duration-300"
                >
                  Log in
                </Link>
              </>
            )}

            <Link
              to="/sign_up"
              className="hidden tracking-wider lg:block px-4 py-2 bg-amber-500 border border-amber-500 rounded-3xl text-blue-950 hover:text-[#e89b3d] hover:bg-transparent transition duration-300"
            >
              Start now
            </Link>

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
            <Link to="/" className="text-xl font-bold">
              Logo
            </Link>
            <a href="#" className="text-xl">
              About us
            </a>
            <Scroll 
              className="cursor-pointer text-xl" 
              to="how-it-works" 
              smooth={true} 
              duration={500}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Scroll>
            <Scroll 
              className="cursor-pointer text-xl" 
              to="success-stories" 
              smooth={true} 
              duration={500}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Scroll>
            <hr className="border-t border-gray-300" />
            <Link
              to="/sign_up"
              className="p-4 tracking-wider text-center bg-amber-500   rounded-sm text-blue-950 "
            >
              Start Now
            </Link>
            {user ? (
              <></>
            ) : (
              <p className="font-normal text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#007bc8] underline hover:text-black"
                >
                  Log in →
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
