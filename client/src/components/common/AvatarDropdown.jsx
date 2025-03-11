import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative">
      <button
        className="p-1 flex items-center space-x-2 focus:outline-none cursor-pointer rounded-3xl outline-none transition duration-300 ease-in-out  
        border-2 border-gray-200 bg-white hover:bg-blue-50"
        onClick={toggleDropdown}
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500  text-black text-sm font-semibold hover:scale-105 ">
          {user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>

        <IoChevronDown
          className={`text-gray-700 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
          <ul className="text-gray-800">
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <CgProfile className="mr-2 text-lg" />
                Profile
              </Link>
            </li>

            <li className="block md:hidden">
              <Link
                to="/dashboard/favorites"
                className="flex items-center px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <FaHeart className="mr-2 text-lg" />
                Favorites
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-200"
              >
                <TbLogout2 className="mr-2 text-lg" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
