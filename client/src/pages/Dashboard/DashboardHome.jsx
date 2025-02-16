import React from "react";
import { useAuth } from "../../hooks/useAuth";

function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Dashboard Home</h1>
      {user ? (
        <p className="mt-2">Welcome, {user.name}!</p>
      ) : (
        <p className="mt-2">Loading user information...</p>
      )}
    </div>
  );
}

export default DashboardHome;
