import React from "react";
import Step from "./Step";
import { Link } from "react-router-dom";
const Steps = () => {
  return (
    <div className="">
      <h2 className="text-3xl tracking-wider font-semibold">
        Start Your Adoption Journey
      </h2>
      <Step
        stepNumber="1"
        title="Search for Your Perfect Match"
        description="Browse adoptable pets in shelters and rescues near you and find the perfect match for your family."
      />
      <Step
        stepNumber="2"
        title="Connect with a Shelter"
        description="Reach out directly to shelters and rescues to arrange a meeting with your chosen pet."
      />
      <Step
        stepNumber="3"
        title="Prepare for Adoption"
        description="Use our comprehensive adoption checklist to ensure you're ready to welcome your new pet home."
      >
        <div className="hidden md:flex flex-col lg:flex-row text-center gap-4">
          <Link
            to="/pets"
            className=" lg:block px-6 py-3 font-semibold text-sm bg-amber-500 border border-amber-500 rounded-3xl text-black
              "
          >
            Search Adoptable Pets
          </Link>
          <Link
            to="/pets"
            className=" tracking-wider lg:block px-6 py-3 font-semibold text-sm bg-amber-200 border border-amber-200 
            rounded-3xl text-amber-700"
          >
            See Our Adoption Checklist
          </Link>
        </div>
      </Step>
      <div className="mt-8 flex md:hidden flex-col lg:flex-row text-center gap-4">
        <Link
          to="/pets"
          className=" lg:block px-6 py-3 font-semibold text-sm bg-amber-500 border border-amber-500 rounded-3xl text-black
              "
        >
          Search Adoptable Pets
        </Link>
        <Link
          to="/pets"
          className=" tracking-wider lg:block px-6 py-3 font-semibold text-sm bg-amber-200 border border-amber-200 
            rounded-3xl text-amber-700 "
        >
          See Our Adoption Checklist
        </Link>
      </div>
    </div>
  );
};

export default Steps;
