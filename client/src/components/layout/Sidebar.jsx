import React from "react";
import { NavLink } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { TbDog } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  return (
    <aside
      className={`bg-[#17588D] text-white transition-all  duration-300 rounded-lg h-screen flex flex-col   ${
        sidebarOpen ? "w-64 p-2" : "w-16 p-0"
      }`}
    >
      <button
        className="flex items-center justify-center
          w-16 h-16 
          text-xl hover:text-2xl text-white
          hover:text-black hover:bg-amber-500 
          rounded-md
          transition-all duration-300 ease-linear
          cursor-pointer
          bg-transparent"
        onClick={toggleSidebar}
      >
        <LuAlignJustify />
      </button>

      <nav className="mt-4 flex-1">
        <ul className="list-none space-y-2 flex flex-col h-full">
          {/* Dashboard*/}
          <li
            className={`transition-[background-color, width] duration-200 ease-linear flex flex-col
              ${sidebarOpen ? "" : "hover:w-50"}
              `}
          >
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => `grid grid-cols-[4rem_1fr] 
                    items-center
                    w-full h-16  
                    hover:bg-amber-500
                    hover:text-black
                    rounded-md
                    cursor-pointer 
                    overflow-hidden
                    ${
                      isActive
                        ? "bg-amber-500 text-black "
                        : "bg-transparent text-white"
                    }`}
            >
              <LuLayoutDashboard className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2`}>Dashboard</span>
            </NavLink>
          </li>
          {/* Profile */}
          <li
            className={` transition-[background-color, width] duration-200 ease-linear flex flex-col
              ${sidebarOpen ? "" : "hover:w-50"}
              `}
          >
            <NavLink
              to="/dashboard/profile"
              className={({
                isActive,
              }) => `grid grid-cols-[4rem_1fr] items-center
                    w-full h-16  
                    
                    hover:bg-amber-500
                    hover:text-black
                    rounded-md
                    cursor-pointer 
                    overflow-hidden
                    ${
                      isActive
                        ? "bg-amber-500 text-black "
                        : "bg-transparent text-white "
                    }`}
            >
              <CgProfile className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2`}>Profile</span>
            </NavLink>
          </li>
          {/* Applications */}
          <li
            className={` transition-[background-color, width] duration-200 ease-linear flex flex-col
              ${sidebarOpen ? "" : "hover:w-50"}
              `}
          >
            <NavLink
              to="/dashboard/applications"
              className={({
                isActive,
              }) => `grid grid-cols-[4rem_1fr] items-center
                    w-full h-16  
                    
                    hover:bg-amber-500
                    hover:text-black
                    rounded-md
                    cursor-pointer 
                    overflow-hidden
                    ${
                      isActive
                        ? "bg-amber-500 text-black "
                        : "bg-transparent text-white "
                    }`}
            >
              <TbDog className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2`}>Applications</span>
            </NavLink>
          </li>
          {/* Favorites */}
          <li
            className={` transition-[background-color, width] duration-200 ease-linear flex flex-col
              ${sidebarOpen ? "" : "hover:w-50"}
              `}
          >
            <NavLink
              to="/dashboard/favorites"
              className={({
                isActive,
              }) => `grid grid-cols-[4rem_1fr] items-center
                    w-full h-16  
                    hover:bg-amber-500
                    hover:text-black
                    rounded-md
                    cursor-pointer 
                    overflow-hidden
                    ${
                      isActive
                        ? "bg-amber-500 text-black "
                        : "bg-transparent text-white "
                    }`}
            >
              <FaHeart className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2`}>Favorites</span>
            </NavLink>
          </li>
          {/* Logout */}
          <li
            className={` transition-[background-color, width] duration-200 ease-linear flex flex-col mt-auto
              ${sidebarOpen ? "" : "hover:w-50"}
              `}
          >
            <NavLink
              onClick={logout}
              to="/login"
              className={({
                isActive,
              }) => `grid grid-cols-[4rem_1fr] items-center
                    w-full h-16  
                    hover:bg-amber-500
                    hover:text-black
                    rounded-md
                    cursor-pointer 
                  overflow-hidden
                    ${
                      isActive
                        ? "bg-amber-500 text-black "
                        : "bg-transparent text-white "
                    }`}
            >
              <TbLogout2 className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2 `}>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
