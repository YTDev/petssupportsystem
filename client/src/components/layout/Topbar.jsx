import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Topbar = ({ toggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 focus:outline-none"
      >
        {sidebarOpen ? "<" : ">"}
      </button>
      <div className="text-gray-800">
        Welcome, {user ? user.fullName : "User"}!
      </div>
      <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
