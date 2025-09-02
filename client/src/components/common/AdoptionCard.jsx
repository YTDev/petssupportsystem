import React from "react";
import { useAdoptions } from "../../context/AdoptionContext";
import { useAuth } from "../../hooks/useAuth";

const AdoptionCard = ({ adoption }) => {
  const { cancelAdoption } = useAdoptions();
  const { user } = useAuth();
  console.log("Adoption data:", adoption);
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        Info Request: {adoption.animalName}
      </h2>

      <div className="mb-2">
        <h3 className="text-md font-medium text-gray-700">
          <span className="font-semibold">Shelter Name:</span>
        </h3>
        <br />
        <p>{adoption.shelterName}</p>
        <br />
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-700">
          <span className="font-semibold">Message:</span>
        </h3>
        <br />
        <p>{adoption.message}</p>
      </div>
      <div>
        <button
          onClick={() => {
            cancelAdoption(user.userID, adoption.animalID);
          }}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default AdoptionCard;
