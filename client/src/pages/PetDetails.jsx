import React from "react";
import { useParams, Link } from "react-router-dom";
import pets from "../data/pets";
import NavbarAlt from "../components/common/NavbarAlt";
import DesktopGrid from "../components/layout/DesktopGrid";

const PetDetails = () => {
  const { id } = useParams();
  const petId = parseInt(id, 10);
  const pet = pets.find((p) => p.id === petId);

  if (!pet) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Pet Not Found</h1>
        <Link to="/pets" className="text-blue-600 underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <NavbarAlt />
      {/* <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow rounded overflow-hidden">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
            <p className="text-gray-600 mb-4">
              {pet.breed} - {pet.type} | Age: {pet.age}
            </p>
            <p className="text-gray-700">{pet.description}</p>
            <Link
              to="/pets"
              className="mt-4 inline-block text-blue-600 underline"
            >
              Back to Listings
            </Link>
          </div>
        </div>
      </div> */}
      <DesktopGrid
        images={[
          pet.imageUrl,
          pet.imageUrl,
          pet.imageUrl,
          pet.imageUrl,
          pet.imageUrl,
        ]}
      />
      <div className="max-w-7xl relative mx-auto flex w-full flex-col px-6 md:flex-row">
        <div className="mb-4 w-full md:mb-0 md:w-2/3 md:pr-12">
          <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
          <div className="">
            <p className="text-gray-600 mb-4">
              {pet.breed} - {pet.type} | Age: {pet.age}
            </p>
            <p className="text-gray-700">{pet.description}</p>
            <Link
              to="/pets"
              className="mt-4 inline-block text-blue-600 underline"
            >
              Back to Listings
            </Link>
          </div>
        </div>
        {/* the second sticky col */}
        <div className="w-full md:w-1/3"></div>
      </div>
    </div>
  );
};

export default PetDetails;
