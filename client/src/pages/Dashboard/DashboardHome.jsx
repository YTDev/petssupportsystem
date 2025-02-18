import React from "react";
import { useAuth } from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
      {user ? (
        <p className="mt-2">
          Welcome, {user.fullName}! Here you can view your latest activities and
          updates.
        </p>
      ) : (
        <p className="mt-2">Loading user information...</p>
      )}
    </div>
  );
};

export default DashboardHome;
