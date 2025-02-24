import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col ">
        <Topbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="p-6 flex-1 bg-gray-100 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
