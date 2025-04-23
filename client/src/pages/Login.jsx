import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { user } = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% pb-[260px] text-[#f9e5bd]">
        <header className="flex justify-between max-w-5xl mx-auto items-center pt-8 pb-16 px-2 sm:px-7">
          <Link to="/" className="text-xl font-bold">
            <img src="/OnlyPawsShadeless.svg" alt="" width="70vw" />
          </Link>
        </header>
      </div>
      <div className="-mt-48 pb-30">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
