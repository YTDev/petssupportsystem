import React from "react";

import RegisterForm from "../components/forms/RegisterForm";

function SignUp() {
  return (
    <div className="bg-[#faf9f7] ">
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% pb-[260px] text-[#f9e5bd]">
        <header className="flex justify-between max-w-5xl mx-auto items-center pt-8 pb-16 px-2 sm:px-7">
          <a href="#" className="text-xl font-bold">
            Logo
          </a>
          <div>
            <span className="text-amber-300 text-xs mr-2 sm:text-sm sm:mr-4">
              Already have an account?
            </span>
            <a
              href="#"
              className="px-3 py-1.5 font-medium border border-amber-500 border-solid rounded-md  hover:bg-amber-500 hover:text-blue-950 transition duration-300"
            >
              Log in
            </a>
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
