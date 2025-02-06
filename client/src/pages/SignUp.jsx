import React from "react";

import RegisterForm from "../components/forms/RegisterForm";

function SignUp() {
  return (
    <div className="bg-[#faf9f7] h-[1000vh]">
      <div className="bg-yellow-300 pb-[260px]">
        <header className="flex justify-between max-w-5xl mx-auto items-center pt-8 pb-16 px-2 sm:px-7">
          <a href="#" className="text-xl font-bold">
            Logo
          </a>
          <div>
            <span className="text-[#6f5718] text-xs mr-2 sm:text-sm sm:mr-4">
              Already have an account?
            </span>
            <a
              href="#"
              className="px-3 py-1.5 font-medium border border-[#e6c40e] border-solid rounded-md  hover:bg-[#e6c40e] transition duration-300"
            >
              Log in
            </a>
          </div>
        </header>

        <div className="text-center text-4xl font-medium mt-52 px-2 sm:px-7">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </div>
      </div>
      <div className="max-w-[500px]">
        <RegisterForm />
      </div>
    </div>
  );
}

export default SignUp;
