import React from "react";
import { NavLink } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-blue-950 text-white  transition-all  duration-[3000ms]  ${
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

      <nav className="mt-4">
        <ul className="list-none space-y-2 overflow-visible">
          <li
            className={` transition-[background-color, width] duration-200  ease-linear
              ${sidebarOpen ? "" : "hover:w-50 "}
              `}
          >
            <NavLink
              to="/dashboard"
              end
              className={({
                isActive,
              }) => `grid grid-cols-[4rem_1fr] items-center
                    w-full  h-16  
                    hover:bg-amber-500 
                    rounded-md
                    cursor-pointer 
                    
                    ${
                      isActive
                        ? "bg-amber-500 text-black"
                        : "bg-transparent text-white"
                    }`}
            >
              <LuLayoutDashboard className="flex items-center justify-center w-16 text-xl " />
              <span className={`ml-2 ${sidebarOpen ? "" : "opacity-0"}`}>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center
              rounded-md cursor-pointer
               text-white
              transition-colors duration-200
              overflow-hidden
              px-2 h-12"
            >
              <CgProfile />
              <span className="ml-2">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/applications"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              My Applications
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
