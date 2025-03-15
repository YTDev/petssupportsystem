import React from "react";
import Steps from "./Steps";
import journey from "../assets/journey.webp";

function AdoptionJourney() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start gap-16 md:gap-24  ">
      <div className="order-2 md:order-1 md:w-1/2">
        <img
          src={journey}
          alt="Adoption Journey"
          className="w-full object-cover"
        />
      </div>

      <div className="order-1 md:order-2 md:w-1/2">
        <Steps />
      </div>
    </div>
  );
}

export default AdoptionJourney;
