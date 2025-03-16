import React from "react";

import RegisterForm from "../components/forms/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function SignUp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#faf9f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/animals" replace />;
  }

  return (
    <div className="bg-[#faf9f7] ">
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% pb-[260px] text-[#f9e5bd]">
        <header className="flex justify-between max-w-5xl mx-auto items-center pt-8 pb-16 px-2 sm:px-7">
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          <div>
            <span className="text-amber-300 text-xs mr-2 sm:text-sm sm:mr-4">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="px-3 py-1.5 font-medium border border-amber-500 border-solid rounded-md  hover:bg-amber-500 hover:text-blue-950 transition duration-300"
            >
              Log in
            </Link>
          </div>
        </header>

        <div className="text-center text-4xl font-medium mt-52 px-2 sm:px-7">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </div>
      </div>
      <div className="-mt-48 pb-30">
        <RegisterForm />
      </div>
    </div>
  );
}

export default SignUp;
