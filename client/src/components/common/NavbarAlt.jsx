import React from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useAuth } from "../../hooks/useAuth";
import { PiPawPrint } from "react-icons/pi";

const NavbarAlt = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-900">
              <img src="/OnlyPawsShadeless.svg" alt="" width="70vw" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard/favorites" className="cursor-pointer">
                  <PiPawPrint size={30} className="text-blue-950" />
                </Link>
                <AvatarDropdown />
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="px-4 py-2 border border-white rounded-3xl hover:border-amber-500 hover:text-amber-500 transition duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/sign_up"
                  className="tracking-wider lg:block px-4 py-2 bg-amber-500 border border-amber-500 rounded-3xl text-blue-950 hover:text-[#e89b3d] hover:bg-transparent transition duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAlt;
