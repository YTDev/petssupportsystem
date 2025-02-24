import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 shadow p-4 flex justify-between items-center">
      <div className="text-gray-800 text-xl font-semibold invisible sm:visible">
        Welcome, {user ? user.fullName : "User"}!
      </div>

      <button
        className="flex items-center focus:outline-none cursor-pointer"
        onClick={() => navigate("/dashboard/profile")}
      >
        <div className="w-12 h-12  rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
          {user?.fullName?.charAt(0) || "U"}
        </div>
      </button>
    </div>
  );
};

export default Topbar;
